---
title: "Vectoree - 调研报告 - Coolify vs Dokploy 集成对照"
description: "客观拆 Coolify / Dokploy 的实现链路，按 Vectoree 业务模式（装配层、CLI/Skill、四块已有、平台养机器）判断适配；选型不以旧版 Dashboard 截图为准。"
author: "PM + AI"
created: "2026-09-15"
updated: "2026-09-16"
status: "DRAFT"
version: "0.3"
tags: ["research", "deploy", "coolify", "dokploy", "integration"]
owners: ["PM"]
---

# Vectoree - 调研报告 - Coolify vs Dokploy 集成对照

> 选型口径：**实现链路 + Vectoree 业务模式**。旧版截图只说明历史上 Dashboard 长什么样，不作为选引擎的依据。
> 截图还原另见：[旧版 Deploy 后台要填什么](./Vectoree_Legacy_Deploy_Dashboard.md)（UI 考古，不是本页结论的前提）。

## 结论

**按业务模式，更适配当隐藏引擎的是自托管 Dokploy。** Coolify 是更完整的「给人用的 PaaS 产品」；Vectoree 不会把那套控制台交给租户，那些产品能力大部分用不上，还要关掉一键数据库。Dokploy 更薄：API 创建应用或 Compose、灌环境变量、绑域名、在 Swarm 上跑——更接近「Vectoree 后端的执行层」。

前提：只调 Apache-2.0 核心 API，永不露出 Dokploy UI，不碰 `/proprietary`（白标 / SSO / 审计）。法务不接受 Open Core，再退到 Coolify（全文 Apache-2.0）。

Dokploy **Cloud**（让最终用户填 IP）不是 Vectoree 的用法。这里说的是你们机房里的自托管实例。

---

## 0. Vectoree 业务模式（适配标准）

产品定位是 **装配层 + 商业闭环**，不是再做一家基础设施公司（拆解报告 / Roadmap：不自建全球 CDN；代码重心在向导、分润、门户、交易市场）。和 Deploy 引擎有关的约束只有这些：

1. **租户要 ship Agent**，不养机器。机房是 Vectoree 的。
2. **主路径是 CLI + Skill**，和 Dashboard 同一套 API。引擎必须能被程序调用，不能靠人点对方网页。
3. **Gateway / Auth / Database / Storage 已有。** 引擎不要再提供一套给租户的数据库/登录。
4. **Agent 工作负载** 往往不是单个静态站：网页门面 + 可能的 worker / webhook / 常驻进程。
5. **多租户**：很多租户应用跑在你们的机器上；隔离和配额在 Vectoree 控制面，不在对方的「团队/组织」产品里。
6. **现网** `vercel.provider.ts` 是「租户自备 Vercel」。换 Coolify/Dokploy 的原因是：不想让租户再开一家托管账号，由 Vectoree 当机房。

旧版 Deploy 四页（Overview / Logs / Env / Domains）是历史 UI，**不进入上面的适配标准**。租户以后看见什么，由 Vectoree 自己的产品定。

---

## 1. 实现链路（两边客观在干什么）

物理上两边同类：源码 → 构建镜像 → 容器跑 → Traefik 按域名转发 → Let's Encrypt。都不是 Vercel 边缘 CDN。

### 1.1 Coolify

控制面是 PHP/Laravel。资源模型是 **Application**（再加一堆 Service/Database 模板）。

程序化路径大致是：

```
平台 Token（绑在某个 Team）
  → POST /api/v1/applications/{public|dockerfile|…}
       必填：project_uuid、server_uuid、environment、git、build_pack、端口
  → 目标机上 Nixpacks / Dockerfile / Compose 构建
  → 以 Docker 容器跑在指定 server
  → 平台给容器打 Traefik 标签（域名、证书）
  → GET/POST /api/v1/deploy?uuid=… 触发再发布
```

多机：SSH 管多台独立服务器，Swarm 偏实验。一键 Postgres/Redis/WordPress 是一等公民。空闲约 0.5–1.2GB。API 是 REST + Bearer，文档按「人在 Coolify 里先建好 Project/Server」来写。

它优化的是：**有 VPS 的人打开 Coolify 网页，把各种应用管起来。**

### 1.2 Dokploy

控制面是 TypeScript（tRPC 风格：`/api/{router}.{procedure}`）。资源模型是 **Application** 和一等公民的 **Compose**。运行时默认是 **Docker Swarm 服务**（单机时 Swarm 几乎无感）。

程序化路径大致是：

```
平台 API Key
  → POST /api/application.create（或 compose.create）
  → saveGithubProvider / 设 Dockerfile / 提交 compose 文件
  → application.saveEnvironment（整段 .env）
  → domain 路由绑域名
  → POST /api/application.deploy 或 compose.deploy
  → Swarm 起服务，Traefik 接入
```

Cloud 版创建应用时强制 `serverId`（用户必须先挂机器）。自托管可以跑在你们自己的节点上，不经过「租户填 IP」。空闲约 0.3–0.4GB。核心 Apache-2.0；SSO/白标/审计在 `/proprietary`。

它优化的是：**用 API 或网页，把 Compose/服务按 Docker 的方式发布到集群。**

### 1.3 链路差在哪（与「像不像 Heroku 后台」无关）

| | Coolify | Dokploy |
|--|---------|---------|
| 调用姿势 | REST，创建时就要选中一台 `server_uuid` | tRPC，先建资源再配源/环境/域名再 deploy |
| 编排 | 单机容器为主 | Swarm 服务；Compose 原生 |
| 多进程 Agent | Compose 能跑，但是后加的，网络/代理常有摩擦 | `compose.create` 就是主路径 |
| 多租户扩机 | 加独立服务器，自己做负载 | 加 Swarm worker，滚动更新更顺 |
| 多余表面 | 大：一键数据库/模板/向导 | 小：也有数据库模板，但产品更瘦 |
| 控制面语言 | PHP | TypeScript（和 Vectoree 后端同族） |
| 许可 | 全文 Apache-2.0 | 核心 Apache-2.0 + 企业目录收费 |

---

## 2. 哪个更适配 Vectoree 的业务模式

把引擎当成 **看不见的执行后端** 来打分，不看对方 Dashboard 好不好用。

| 业务约束 | Coolify | Dokploy 自托管 |
|----------|---------|----------------|
| CLI/Skill 调 API 发布 | 能，但 API 围绕 Application/Server 网页模型 | 能，步骤更接近「建资源 → 灌 env → 绑域 → 发布」 |
| 已有四块，不要第二套 BaaS | 必须关掉大半产品（这是它的卖点） | 要关的更少 |
| Agent = 网页 + 可能的 worker | 单容器顺，多容器次 | Compose / Swarm 更顺 |
| 你们养机器、租户不碰 infra | 自托管可以 | 自托管可以；**不要用它的 Cloud 产品** |
| 很多租户应用挤在你们集群 | 多机模型偏「多台单机」 | Swarm 更像一个池 |
| 工程集成成本 | 要包一套 PHP PaaS | 源码 TS，占用更低 |
| 嵌进商业产品的许可 | 更干净 | 核心可用；只要保证不碰 proprietary |

**Coolify 更适配的业务** 是：卖给「自己有 VPS、要一个 Heroku」的人。那不是 Vectoree。把它嵌进来，等于买了一整家竞品 PaaS，再用 API 削成执行层。

**Dokploy 更适配的业务** 是：平台自己当机房，用 API 把租户的应用（尤其是 Compose 栈）跑起来。这和「装配层调底层、CLI 驱动、四块已在 Vectoree」同向。

原先主推 Coolify，混进了两件不该当选型依据的事：（1）旧版后台有 Domains/Env 页，Coolify 作为完整 PaaS 更「像」；（2）Dokploy Cloud 要填 IP，误当成 Dokploy 引擎本身不能用。IP 那条只否定 **Dokploy Cloud 当租户产品**，不否定自托管当引擎。

---

## 3. 和现有 Vercel provider 的关系

`vercel.provider.ts`：租户自备 Vercel，偏 **Sites**（前端构建上边缘）。

Coolify/Dokploy：Vectoree 自备机器，偏 **Compute**（容器常驻）。

Roadmap 曾写默认 Vercel Host Platform、永不自建 CDN。若业务仍是「纯网页门面 + 推理全走 Gateway」，Vercel API（平台账号，不是租户自备）可能仍更贴「不自建基础设施」。Coolify/Dokploy 回答的是另一句：租户不能再开托管账号，Agent 还可能需要常驻进程。两者不要混成一个产品承诺（不要写「全球边缘」）。

---

## 4. 建议

1. **默认方案：自托管 Dokploy 当隐藏引擎。** Vectoree API 调 `application.*` / `compose.*` / `domain` / 环境变量；控制台不对公网、不对租户。
2. **法务红线：** 只用 Apache-2.0 核心；白标对方 UI、用对方 SSO/审计则改 Coolify。
3. **Coolify 的位置：** 法律更干净的备选；或第一版确认「只发单个 Web 容器、永不 Compose」时也可以。不是更贴业务，是更贴「零许可争议」。
4. **集成时不做：** 把对方 Dashboard 给租户；开放对方一键数据库；让租户填 IP/SSH；在 landing 写全球边缘。

租户侧产品长什么样（要不要独立 Domains 页、env 是 CLI 注入还是表单）由 Vectoree 自己定，不由引擎选型倒推。

---
title: "Vectoree - 调研报告 - Coolify vs Dokploy 集成对照"
description: "讲清 Coolify / Dokploy 各自做什么 Deploy、方案差在哪、侧重什么；对照 Vectoree 旧版 Deploy 给出隐藏引擎建议。"
author: "PM + AI"
created: "2026-09-15"
updated: "2026-09-16"
status: "DRAFT"
version: "0.2"
tags: ["research", "deploy", "coolify", "dokploy", "integration"]
owners: ["PM"]
---

# Vectoree - 调研报告 - Coolify vs Dokploy 集成对照

> 配套画布：[Coolify vs Dokploy 给 Vectoree](/cursor/stores/user/canvases/3fc59a6f-58b6-4361-a5c0-e9a7e8880aeb/source.canvas.tsx)
> 租户侧表单以旧版 Dashboard 为准：[旧版 Deploy 后台要填什么](./Vectoree_Legacy_Deploy_Dashboard.md)

## 结论

**给 Vectoree 用：默认嵌 Coolify 当隐藏引擎。** 租户只面对 Vectoree 的 Deploy（slug / 自有域名 / 环境变量 + CLI/Prompt）；Coolify 装在你们的 Linux 上，只负责构建、跑容器、按域名转发、证书。

Dokploy 做的是同一类事，更轻、更贴 Docker Compose / Swarm，适合当对照和以后的备选。它的 Cloud 产品假设「用户自己有机器」，白标 / SSO / 细权限 / 审计走收费许可——和「我们当平台卖给租户」不完全同向。未做法务确认前，不当产品默认。

---

## 0. 两个产品到底在做什么 Deploy

两边都不是 Vercel 那种全球边缘 CDN，也不是「帮你写代码」。它们是 **自托管 PaaS**：你自己准备一台（或多台）Linux 机器，它们在上面当「迷你 Heroku」。

一次发布，两边走的是同一条物理链路：

```
代码（Git / Dockerfile / 现成镜像 / Compose）
  → 在机器上构建（打成 Docker 镜像）
  → 用容器跑起来
  → Traefik 按域名把 https 流量转到这个容器
  → Let's Encrypt 自动证书
```

**差的不是「能不能上线一个网址」，而是：产品以为用户是谁、编排离 Docker 有多近、多出来的一键数据库/模板多不多。**

---

## 1. 方案区别与各自侧重

| | Coolify | Dokploy |
|--|---------|---------|
| 一句话 | 功能更全的自建 Heroku | 更贴 Docker 的自建 PaaS |
| Deploy 对象 | Application：Git / Dockerfile / 镜像 / Compose | Application + **Compose 一等公民** |
| 机器上怎么跑 | 默认单机 Docker 容器；多机 / Swarm 偏实验或 SSH 管多台 | 默认 Docker Swarm 服务；单机时 Swarm 几乎看不见 |
| 反向代理 | Traefik（Caddy 实验） | Traefik |
| 构建 | Nixpacks / Dockerfile / Compose / 静态 | Nixpacks / Buildpacks / Dockerfile / Compose |
| 额外卖点 | 大量一键服务（Postgres、Redis、WordPress…）、向导、预览 | 原样吃 `docker-compose.yml`、滚动更新、多节点更顺 |
| 控制面 | PHP / Laravel，更重（空闲约 0.5–1.2GB） | TypeScript / Node，更轻（约 0.3–0.4GB） |
| 用户是谁 | 「我有 VPS，想像 Heroku 一样点发布」 | 自托管同上；**Cloud 要你填公网 IP + SSH** |
| 许可 | 全文 Apache-2.0 | 核心 Apache-2.0；`/proprietary` 里 SSO / 白标 / 审计等要买 |

**Coolify 侧重：** 把「一台 VPS → 能上线很多种应用」做成完整产品。抽象多、模板多、向导多。适合「平台替你管好常见路径」。复杂 Compose 有时会和它的网络/代理注入打架。

**Dokploy 侧重：** 少挡在 Docker 前面。你本地能跑的 Compose，线上尽量还是那份。多容器、多节点、滚动发布更顺。适合「已经按容器想问题的人」。产品目录和护栏比 Coolify 窄。

对 **Vectoree 租户** 这两套 UI 都不该露出来。他们要看见的是旧版那四页：Overview / Logs / Env / Domains。

Vectoree 的用户不是「有 VPS 的人」，是「要 ship 一个 Agent」。所以不能把这两家的控制台交给租户，尤其不能让用户填 IP。

这不等于租户侧表单为零。旧版 Dashboard 已经要用户配 **域名 + 环境变量**（见 `Vectoree_Legacy_Deploy_Dashboard.md` 与截图 `dashboard-project-deploy.png`）。隐藏 Coolify 只是不让用户养机器；**slug / 自有域名 / env** 仍走 Vectoree 的 Deploy 页。

正确嵌法：

```
租户 → Vectoree Dashboard / CLI
         → Vectoree API
              → Coolify（或 Dokploy）API
                   → 你们的 VPS 上 Docker + Traefik
应用环境变量 ← Vectoree 的 Gateway / Auth / DB / Storage
```

---

## 2. 技术方案（机器上在干什么）

两边都是：源代码 → 构建（常常打成镜像）→ 容器运行 → Traefik 按域名转发 → 自动证书。

| 层 | Coolify | Dokploy |
|----|---------|---------|
| 控制面 | PHP / Laravel | TypeScript / Node |
| 编排 | Docker；多机 Swarm 偏实验 | Docker Swarm 更原生 |
| Compose | 有；零停机较弱 | 一等公民 |
| 空闲占用 | 约 0.5–1.2 GB | 约 0.3–0.4 GB |
| API | Bearer Token，按团队 | API Key，按组织；另有 CLI |
| 许可 | 全文 Apache-2.0 | 核心 Apache-2.0；`/proprietary` 生产付费 |

Coolify 2026-01 有过控制台相关 CVE，已在后续版本修补；若集成，控制台不要对公网暴露，只内网/API。

---

## 3. 对上 Vectoree

| Vectoree 逻辑 | Coolify | Dokploy |
|---------------|---------|---------|
| 用户不买服务器 | 你们养 VPS 即可 | Cloud 不行；自托管 + 你们的 VPS 才行 |
| CLI / Skill 发布 | 包它的 API | 同样；源码是 TS，更好读 |
| 注入四块 Key | 环境变量 | 环境变量 |
| 不要第二套后端 | 关掉给租户的一键数据库 | 同样关 |
| 多租户 | 一项目一 Application + 子域 | 同上，组织模型是给人用 Dokploy 的 |
| 商业嵌进 vectoree.ai | 许可清楚 | 核心部署通常可用；白标/企业权限可能要买 |

现有 `vercel.provider.ts` 是「租户自己有 Vercel」。嵌 Coolify 是「Vectoree 当机房」。两条不是同一产品；InsForge 用 Vercel 做 Sites、另开 Compute，是因为网页边缘托管和常驻容器不是同一层。

---

## 4. 结合 Vectoree：为什么默认 Coolify

Vectoree 要的不是「再做一个给开发者用的 PaaS 控制台」，而是：

- 租户仍走旧版 Deploy：改 slug、绑自有域名、填环境变量、用 CLI/Prompt 发布
- 四块（Gateway / Auth / Database / Storage）已经有了，不要对方的一键数据库
- 机器由你们养，租户不填 IP
- 要把引擎嵌进自己卖的产品里，许可必须清楚

对照下来：

1. **许可证**：Coolify 全文 Apache-2.0，改、嵌、商用清楚。Dokploy 核心同样 Apache-2.0，但白标 / SSO / 细 RBAC / 审计在 `/proprietary`，而这些正是「我们当平台」时容易碰到的。
2. **第一版形态**：先在少量 VPS 上把「构建 + 跑 + 域名 + 证书」跑通。Coolify 的主场就是单机 PaaS。Dokploy 的 Swarm / 多节点优势，要等到你们真的要多机滚动发布才划算。
3. **Dokploy Cloud 不能当租户路径**：它要用户有服务器。自托管 Dokploy 可以藏在你们机房里，但那是备选实现，不是产品默认。

Dokploy 仍建议做对照 spike：占用更低、Compose 更适合以后「前端 + worker」的 Agent、源码是 TS 更好读。若法务确认「只调 Apache-2.0 核心 API、永不露出 Dokploy UI、不依赖 proprietary」，它可以当更省机器的引擎。未确认前，不要把它当产品默认。

---

## 5. 集成时明确不做

- 不把「连接服务器 / 填 IP」做给租户
- 不把对方的一键 Postgres/Auth 开放给租户
- 不把对方 Dashboard 暴露到公网
- 不在 landing 写「全球边缘」（这些项目不是 Vercel CDN）
- 不要用「一键发布、什么都不填」盖掉旧版 Deploy：侧栏仍应有 Domains / Environment Variables；Free 配 `*.vectoree.app` slug，Pro 再绑自有域名

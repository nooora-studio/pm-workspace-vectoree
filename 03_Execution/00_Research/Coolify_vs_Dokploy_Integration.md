---
title: "Vectoree - 调研报告 - Coolify vs Dokploy 集成对照"
description: "从产品方案与技术方案拆解 Coolify、Dokploy，并对照 Vectoree 现有四块 + CLI 逻辑，给出更适合作为隐藏 Deploy 引擎的选择。"
author: "PM + AI"
created: "2026-09-15"
updated: "2026-09-15"
status: "DRAFT"
version: "0.1"
tags: ["research", "deploy", "coolify", "dokploy", "integration"]
owners: ["PM"]
---

# Vectoree - 调研报告 - Coolify vs Dokploy 集成对照

> 配套画布：[Coolify vs Dokploy 给 Vectoree](/cursor/stores/user/canvases/3fc59a6f-58b6-4361-a5c0-e9a7e8880aeb/source.canvas.tsx)
> 租户侧表单以旧版 Dashboard 为准：[旧版 Deploy 后台要填什么](./Vectoree_Legacy_Deploy_Dashboard.md)

## 结论

**更适合嵌进 Vectoree 产品的是 Coolify。** 集成姿势必须是：租户只面对 Vectoree；Coolify 装在你们的 Linux 机器上，只给 Vectoree 后端当「构建 + 运行 + 域名 + 证书」引擎。

Dokploy 更轻、TypeScript、Compose 更好，适合当对照和备选，但 Open Core（白标 / SSO / 细权限 / 审计走收费许可）和「做成商业 SaaS 底层」不完全同向。你在 `app.dokploy.com` 卡在填服务器 IP，也说明它的 Cloud 产品假设**最终用户自己有机器**。Vectoree 旧版是「用户不养机器，但要在 Deploy 里填域名和环境变量」，不是「发布零表单」。

---

## 1. 两家产品方案（它们以为用户是谁）

| | Coolify | Dokploy |
|--|---------|---------|
| 一句话 | 功能更全的自建 Heroku | 更轻的自建 PaaS，核心开源、企业能力以后收费 |
| 用户是谁 | 自己买了 VPS 的开发者/小团队 | 同上；另卖 Cloud，要你挂一台远程服务器 |
| 用户要做什么 | 在 Linux 上安装控制台，以后在网页里点发布 | Cloud：填公网 IP + SSH 授权；自托管：自己有 Linux |
| 品牌 | 自托管可改，许可不拦 | 官方白标是企业卖点 |
| 一键数据库等 | 模板很多 | 也有 |

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

## 4. 为什么主推 Coolify

1. **许可证**：Vectoree 要卖自己的产品。Coolify 允许改、嵌、商用。Dokploy 把白标、SSO、细 RBAC、审计划进收费，而这些恰恰是「我们当平台」时容易用到的。
2. **产品同构**：预览、团队、API 都在开源里，少踩「用着用着要付上游企业费」。
3. **Dokploy Cloud 的用户模型反例**：要用户有服务器——不能当 Vectoree 的租户路径。

Dokploy 仍建议做对照：占用更低、Compose 更适合「应用 + worker」的 Agent、技术栈和 Vectoree 更近。若法务确认「仅使用 Apache-2.0 核心 API、永不露出 Dokploy UI、不依赖 proprietary」，它可以当更省机器的引擎。未确认前，不要把它当产品默认。

---

## 5. 集成时明确不做

- 不把「连接服务器 / 填 IP」做给租户
- 不把对方的一键 Postgres/Auth 开放给租户
- 不把对方 Dashboard 暴露到公网
- 不在 landing 写「全球边缘」（这些项目不是 Vercel CDN）
- 不要用「一键发布、什么都不填」盖掉旧版 Deploy：侧栏仍应有 Domains / Environment Variables；Free 配 `*.vectoree.app` slug，Pro 再绑自有域名

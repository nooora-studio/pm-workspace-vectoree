---
title: "Vercel - Features"
description: "Vercel 间接竞品功能拆解：有什么/没什么/能力边界 + 与 Vectoree 重叠度矩阵"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://vercel.com/"
tags: ["competitor", "vercel", "features", "indirect", "deployment", "nextjs", "ai-cloud", "v0", "agent-infra"]
owners: ["PM"]
sources: ["https://vercel.com/docs", "https://vercel.com/", "https://workflowautomation.net/reviews/vercel", "https://aiwiki.ai/wiki/vercel"]
---

# Vercel · 功能模块拆解（间接竞品）

> 一句话产品形态：**「Next.js 作者做的全栈云平台」** — 2024 前是「部署 Next.js 最快的托管平台」；2026 是「Agent OS」级别的 AI 云：从开源框架（Next.js/Eve）、AI UI 生成（v0）、模型网关（AI Gateway）、后端基建（Durable Postgres/KV/Blob）、Sandbox 沙箱、全球部署、到企业身份（Passport），**Vectoree 原本想做的很多层都被它覆盖了**。
>
> **⚠️ 与前 3 家最大的不同**：InsForge 是直接竞品（做 Agent SaaS 无代码平台），OpenRouter/Supabase 是纯粹互补（分别做模型层和后端层），但 **Vercel 在 2025-2026 的战略升级让它成了 Vectoree 价值层上方的「上层平台威胁」**——它不只是托管 Vectoree 的底层，它自己正在做「0→1 AI SaaS 上线器」。

---

## 🧱 总览：7 大产品域 + 1 个开源生态飞轮 + 明确不做的事

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                      OPEN SOURCE ECOSYSTEM (MOAT)                                │
│     Next.js (125K★) · Turborepo · SWR · Eve Agent Framework                      │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F1 Deploy & Hosting（部署托管，传统核心）                                         │
│    Git Push Deploy / Preview URLs / Prod Deploy / Global Edge CDN / 18+ Regions    │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F2 Compute（算力层 2026 扩展：Functions → Fluid → Containers → Sandboxed VMs）   │
│    Serverless / Edge / Durable / Fluid / Docker / Firecracker Sandboxes          │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F3 AI Suite（2024-2026 战略新增 ★ Vectoree 核心重叠）                             │
│    AI SDK · v0 UI Gen · AI Model Gateway · Sandboxed VMs · Eve Agent Orchestrator │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F4 Durable Backends（持久化后端，直接拼 Supabase）                                 │
│    Durable Postgres · KV(Redis) · Blob(S3) · Cron Jobs · AI Gateway Cache        │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F5 Optimizations（性能优化，Next.js 独家）                                        │
│    Next/Image · Partial Prerendering (PPR) · Font/Script opt · Speed Insights    │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F6 Observability & Security（可观测 + 安全）                                       │
│    Analytics / Monitoring / Log Drains · WAF · Rate Limiting · Preview Protection │
├──────────────────────────────────────────────────────────────────────────────────┤
│  F7 Enterprise & Platform（企业 + 宿主平台）                                         │
│    Passport SSO · Host Platform API · Multi-tenant · Custom Domains at Scale     │
├──────────────────────────────────────────────────────────────────────────────────┤
│  ❌ WHAT VERCEL EXPLICITLY DOES NOT TOUCH (硬战略边界)                             │
│   ❌ Stripe Connect 级 B2B2C 分润（永远不做代商户体系）                              │
│   ❌ 「模板市场 + 开发者分润结算」的 Shopify 生态                                   │
│   ❌ 代码托管（纯 Git 集成，不做 GitHub 替代）                                       │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 功能域 F1：Deploy & Hosting（部署托管 · 传统核心 · 行业最强）

| # | 子功能 | 说明 |
|---|--------|------|
| F1-1 | **Git Push Deploy（1-click）** | 连 GitHub / GitLab / Bitbucket，任何 push 自动 Build → Deploy → 生产域名上线；无需 YAML / Dockerfile（纯 Next.js 项目）；2026 起加原生 Dockerfile 支持（任意项目都能部署） |
| F1-2 | **Preview Deployments（每 PR 预览 URL）** | 每一个 Pull Request 都自动生成 `xxx-preview.vercel.app` 独立 URL；评论里直接附 Link；前端团队协作的标准范式；**行业最佳实践由 Vercel 定义** |
| F1-3 | **Production Deployments（生产部署 + 全球边缘）** | 100+ PoP 的 Edge Network，静态资源全球 CDN；Next.js 独家 Partial Prerendering；99.99% Uptime SLA（Enterprise 档） |
| F1-4 | **Automatic HTTPS & Custom Domains（自动证书）** | 绑定自定义域名 → 自动申请 Let's Encrypt 证书 + 自动续期；零配置；支持 *Wildcard 域名（付费档）* |
| F1-5 | **Monorepo / Turborepo 支持** | 官方出品 Turborepo，Monorepo 构建速度提升 10x；Vercel 对 Monorepo 的支持是行业标杆（其他平台都要配） |
| F1-6 | **Incremental Static Regeneration (ISR)** | Next.js 独家：静态页面在用户访问时后台重新渲染；不用全量 Rebuild；大幅降本 + 提升首屏速度 |
| F1-7 | **Branch Permalinks + Deployment Rollback** | 每个 Git 分支都有永久链接；一键回滚到任意历史版本（因为每次部署都是 Immutable） |
| F1-8 | **Teams & Roles（团队协作）** | Hobby → Owner 单人；Pro 档支持 Team 管理；Enterprise 精细 RBAC + SSO/SAML |

---

## 📦 功能域 F2：Compute（算力层 2026 大幅扩展）

一句话：**从纯 Serverless Functions 扩展到 Agent 时代的所有算力形态：Edge / Durable / Docker VM / Sandbox**。

| # | 子功能 | 说明 | 典型场景 |
|---|--------|------|---------|
| F2-1 | **Serverless Functions (Node.js Runtime)** | 传统 Lambda 式函数，45 秒超时（Pro 档）；冷启动数百 ms | 普通 API 调用、表单提交 |
| F2-2 | **Edge Functions（Deno / V8 Isolate）** | 全球 18+ 边缘执行，**毫秒冷启动**（比 AWS Lambda 快 10x）；30 秒超时 | 低延迟 API、A/B Test、个性化中间件 |
| F2-3 | **Durable Functions & Execution（持久化执行）** | 长时间运行（分钟/小时/天级），失败自动 Resume；2026 与 Eve Agent 框架深度绑定 | Agent 长工作流、自动化任务、RAG 大数据处理 |
| F2-4 | **Fluid Compute（2026 新品）** | 智能调度：代码在 Serverless / Edge / 长驻容器 / GPU 之间自动迁移；用户不用关心算力类型；类似 AWS Step Functions 但 DX 100x 简单 | 所有通用工作负载统一抽象 |
| F2-5 | **Native Dockerfile Support（2026 新品）** | 任何带 Dockerfile 的项目直接 `vercel deploy`；镜像存在 Vercel 私有 Registry；部署到 Fluid Compute | 打破 Serverless 限制，任意语言/框架可上 |
| F2-6 | **Sandboxed VMs（Firecracker，Agent 用）** | 基于 AWS Firecracker 微虚机，强隔离安全沙箱；Agent 写了/跑了任意代码不会污染宿主环境；Vectoree 原计划自己搭的部分 | 代码执行型 Agent（Coding Agent、数据清理 Agent）、在线 IDE |
| F2-7 | **GPU Inference（路线图 / Beta）** | 自有 GPU 节点做轻量推理；主推理还是走 AI Gateway 连模型厂商 | 小模型本地精调、Embedding、图像推理加速 |

---

## 📦 功能域 F3：AI Suite（2024-2026 战略新增 ★ Vectoree 核心重叠判断）

> **Vectoree 必须认真评估这一层**：这 5 大 AI 功能里，Vercel 做了前 4 个（UI 生成 / 网关 / 沙箱 / Agent 编排），和 Vectoree 的「装配线」定位高度重叠；只有第 5 个（商业闭环分润）Vercel 明确不做。

| # | AI 子功能 | 做什么 | Vectoree 对应蓝图 | 重叠度判断 & 建议 |
|---|----------|--------|-----------------|-----------------|
| F3-1 | **Vercel AI SDK（开源）** | JS/TS + Python 双语言：统一接口调用 70+ 模型（OpenAI/Anthropic/Google/LangChain 等）、内置流式 UI React 组件、Tool Calling 封装、RSC（React Server Components）流式渲染；**事实上的前端 AI UI 标准库** | Vectoree 模型接入层 SDK | ✅ **直接复用，不要重写**。Vercel 已经把 DX 打磨到极致，我们只要封装好 Token 计量 + 配额逻辑即可 |
| F3-2 | **v0（AI UI 生成器，SaaS 产品独立运营）** | 用自然语言描述 UI → 生成**生产可用 React + shadcn/ui + Tailwind 代码**；支持多次迭代对话 + 点击局部编辑；可以把代码 Push 到 GitHub 分支；**4M+ 用户，$50M+ ARR** | Vectoree 「模板向导 UI 生成」模块 | ⚠️⚠️ **高度重叠（用户体验层），但商业逻辑不同**：v0 输出的是代码，用户要自己接 Supabase/Stripe/部署；Vectoree 输出的是「已接好后端 + 接好定价 + 接好分润 + 已绑定域名的可上线产品」。**策略：Vectoree 把 v0 作为一个「可选 UI 生成器集成」，用户可以在模板向导里选「用 v0 生成 UI → 自动装配」** |
| F3-3 | **AI Model Gateway（通用模型网关）** | 路由 70+ 模型；Token 计量 + 限流（Rate Limiting）+ Prompt/Response Caching（缓存降本）+ Failover（同模型多 Provider 切流）+ Tokens 观测面板 | Vectoree Model Plaza & Gateway | ⚠️ **中度重叠**：Vercel AI Gateway 是通用模型层，不区分「开发者用的 Tokens」和「开发者卖给他用户的 Tokens」两层计价。Vectoree 的网关要多一层：**把模型用量按「开发者应用的终端用户维度」做配额 & 计费**（这是 Vercel 网关没有的）。**策略：Vectoree 默认接 Vercel AI Gateway + OpenRouter 双 Provider 可切换，自己只在其之上加 B2B2C 计价封装层** |
| F3-4 | **Sandboxed VMs（代码执行沙箱）** | Firecracker 强隔离沙箱，Agent 能安全运行代码、写文件、装库、运行测试；与 Eve 框架原生集成；Sandbox 里生成的 Artifact（代码输出/报告）能直接在 Vercel Deploy | Vectoree Coding Agent 沙箱 | ✅ **直接复用，不要重造 Firecracker 集群**。Vectoree 的 Coding Agent 模板默认把代码执行请求路由到 Vercel Sandboxes |
| F3-5 | **Eve（Durable Agent 编排框架，2026）** | 开源 Agent 框架：长时 Agent 工作流持久化、步骤失败自动 Resume、工具调用标准接口、Sandboxed 执行、Memory 层（接 Durable Postgres/KV）；与 Next.js / React 深度原生集成 | Vectoree Agent Workflow Engine / Skill 装配 | ⚠️ **中度重叠**：Eve 是「开发者写代码级」的编排框架，Vectoree 是「拖拖拽拽模板级」的装配层。**策略：Vectoree 模板的底层默认生成基于 Eve 的代码（就像现在模板默认是 Next.js 一样），用户装配完导出的代码就是 Eve 标准格式，可随时脱离 Vectoree 自托管在 Vercel** |

---

## 📦 功能域 F4：Durable Backends（持久化后端 · 直接拼 Supabase）

> Vercel 2024 起一口气出了 Postgres / KV / Blob / Cron 四件套，**跟 Supabase 的核心产品矩阵 1:1 对标**，但更轻量、和 Vercel 部署一体化（env 自动注入、零配置）。

| # | 子功能 | 对比 Supabase | 说明 |
|---|--------|--------------|------|
| F4-1 | **Vercel Postgres（Durable，基于 Neon 技术）** | Supabase Postgres | Serverless Postgres，**Scale-to-0（自动缩 0，冷项目不花钱）**（Supabase 没有的能力）；和 Vercel 项目同 Region 低延迟；缺点：扩展生态（pgvector / pg_cron）和 RLS 体系成熟度不如 Supabase |
| F4-2 | **Vercel KV（Redis 兼容）** | Supabase 没有原生 KV（通常自装 Upstash） | 基于 Upstash Redis，全球边缘；Durable 数据；适合 Session / Cache / Rate Limit / Feature Flags |
| F4-3 | **Vercel Blob（S3 兼容存储）** | Supabase Storage（S3 兼容 + RLS + CDN） | 对象存储，CDN 全球分发；上传预签名 URL、直传下载；**与 Postgres 隔离**（不像 Supabase 能一条 RLS 策略同时控表和文件） |
| F4-4 | **Vercel Cron Jobs（定时任务）** | Supabase pg_cron（SQL 层定时） | 基于 Edge Functions 的 cron，`vercel.json` 里写 `{ cron: { schedule: "0 5 * * *", path:"/api/daily" } }` 搞定；比 pg_cron 轻但和代码深度绑定 |
| F4-5 | **AI Gateway Cache + Semantic Cache** | Supabase pgvector + 用户自建缓存 | Prompt/Response 级精确缓存 + 语义缓存；重复请求降本 30-60%；和 AI Gateway 一体化不用额外接 |

---

## 📦 功能域 F5：Performance Optimizations（Next.js 独家性能优化）

| # | 子功能 | 说明 |
|---|--------|------|
| F5-1 | **Next/image 自动图片优化** | `<Image>` 组件自动 WebP/AVIF 转码、按设备分辨率裁剪、全球 CDN 缓存；Hobby 含 5K 次/月变换额度 |
| F5-2 | **Partial Prerendering (PPR)（Next.js 16 主打）** | 同一个路由：静态壳子预渲染（毫秒级首屏）+ 动态内容流式渲染（边缘注水）；兼顾 SSR 性能和 SSG 的 CDN 成本 |
| F5-3 | **Font Optimization（next/font）** | 自动把 Google Font 下到本地、去重、预加载；LCP（最大内容绘制）分数显著提升 |
| F5-4 | **Script Optimization（next/script）** | 第三方脚本按策略（beforeInteractive / afterInteractive / lazyOnload）调度；避免脚本阻塞首屏 |
| F5-5 | **Speed Insights（真实用户测速）** | Core Web Vitals（LCP / FID / CLS）按真实用户采样；Hobby 含 10K events / 月 |

---

## 📦 功能域 F6：Observability & Security（可观测 + 安全）

| # | 子功能 | 说明 |
|---|--------|------|
| F6-1 | **Web Analytics（基础版 / Plus 版）** | 事件级分析；Plus 版 $250/年起支持自定义事件 8 属性 + UTM 参数 + 24 个月留存（Hobby 只有 1 月） |
| F6-2 | **Monitoring + Observability Plus（2026）** | Functions 错误率 / 冷启动 / Tokens / AI Gateway Latency 一屏监控；与 Datadog/Axiom/New Relic Log Drains 打通 |
| F6-3 | **Log Drains（日志下沉）** | Pro 档起支持 $0.50 / GB 日志流出；每个项目独立配置 |
| F6-4 | **WAF（Web 应用防火墙，Enterprise）** | OWASP Top 10 防护、IP 黑白名单、Geo 封禁、Bot Management；按规则条数计费 |
| F6-5 | **Rate Limiting（全层级限流）** | Functions 级 / AI Gateway 模型级 / API 级 统一配置；基于 Vercel KV 实现分布式限流 |
| F6-6 | **Preview Deployment Protection（预览环境保护）** | 非 Team 成员不能访问预览 URL；SAML SSO 登录后才能看；防止泄密 |

---

## 📦 功能域 F7：Enterprise & Host Platform（企业 + 宿主平台 API）

| # | 子功能 | 说明 | Vectoree 对应逻辑 |
|---|--------|------|-----------------|
| F7-1 | **Vercel Passport（2026 新品，企业 IdP）** | SSO/SAML/OIDC 统一登录；企业内部所有 Vercel 部署的 App、Agent、Dashboard 一套身份搞定；替代部分 Clerk / Auth0 + Supabase Auth 的企业场景 | Vectoree Enterprise 的 SSO 可以直接接 Vercel Passport，不用自研 |
| F7-2 | **Host Platform API（SaaS 宿主平台 API）** | 多租户平台级客户（Mintlify / Resend / Loops.so）通过 API 「给子客户创建独立 Vercel 项目 + 绑定独立域名 + 自动 SSL + 隔离环境」；2 万家文档站 Mintlify 就是这么跑的 | **Vectoree 模板市场的底层可以直接搭在 Host Platform API 上**：开发者上架一个模板，Vectoree 用户购买时一键在 Vercel 开独立子项目，我们不用自己搭多租户部署集群 |
| F7-3 | **Dedicated Infrastructure（专属节点，Enterprise）** | 客户独占的 VPC / 物理机 / GPU；性能稳定、合规友好；BYO IP（自带 IP 段）| Vectoree Enterprise 档可以包装「Vercel Dedicated + Supabase BYO Cloud」一体化合规方案 |
| F7-4 | **Audit Logs + SOC2 / ISO27001 + HIPAA 路径** | 合规体系齐全，企业客户安全问卷已准备好；HIPAA 加购 Enterprise 起 | 复用，不用自己跑认证流程 |

---

## 🧩 生态 & 集成矩阵

| 类别 | 项目 | 说明 |
|------|------|------|
| **AI 框架集成** | Next.js App Router + Vercel AI SDK + Eve + LangChain / LlamaIndex + OpenAI Function Calling | Vectoree 模板的底层代码栈就是这一套 |
| **代码托管** | GitHub（90%） / GitLab / Bitbucket / Self-hosted Git | Vercel 不做代码托管，纯集成 |
| **后端集成（可选）** | Supabase / Firebase / Strapi / Neon / PlanetScale / Prisma | Vercel 的 4 件套 Durable Backends 是推荐默认，但开发者也能外接这些 |
| **支付 & 计费集成（模板级别）** | Stripe Checkout / Customer Portal / Paddle / Lemon Squeezy | **有官方 Example 但永远不会做 Stripe Connect 分润体系**（这是 Vectoree 的锚点） |
| **观测 & 日志** | Datadog / New Relic / Axiom / Logtail / Sentry | 全量支持 Log Drains |
| **Headless CMS（内容层）** | Contentful / Sanity / Strapi / Storyblok | 和 Next.js 深度生态绑定 |

---

## ❌ 明确不做 / 能力边界（对 Vectoree 极其重要的「安全区」）

| 维度 | Vercel 明确不做的事 | 根因 & 对 Vectoree 的机会 |
|------|------------------|-----------------------|
| **B2B2C 终用户计费 & 分润** | ❌❌ **永远不做 Stripe Connect 级代商户 + 自动分润**；开发者要向终用户收费，必须自己去申请 Stripe 商户号 / 接 Paddle / 自己做 PCI 合规 | **Vectoree 的 1 号护城河 + 永久安全区**。Vercel 的客户就是开发者，Vercel 直接向开发者收费；**Vercel 绝不可能做让开发者在其平台上开店卖应用给终用户并抽成的事**——否则 Vercel 就和它的客户（SaaS 开发者）直接竞争了。这是 Vercel 商业模型的硬边界 |
| **模板市场 + 生态交易（Shopify App Store 级）** | ❌ 只有官方 Next.js Examples GitHub 仓库；没有「第三方开发者上传模板 → 其他用户购买 → 双方分润结算」的市场 | **Vectoree 2 号护城河**：我们把模板 / Skill / Connector / Agent Workflow 做成真正的 Shopify App Store 生态，第三方开发者上传，Vectoree 平台抽成结算，飞轮效应起来后 Vercel 不可能跟进（会得罪它自己的开发者客户） |
| **代码托管（GitHub 替代）** | ❌ 永远只做 Git 集成，不做代码仓库本身 | 无冲突 |
| **No-Code 业务配置向导（产品经理可用）** | ⚠️ Vercel Studio + v0 正在往这方向走，但 v0 输出的是代码还是需要工程师读一下、改 env、接后端；**PM / 非技术创始人依然不能用 Vercel 从 0 到上线一个有定价有收款的 SaaS** | Vectoree 的「3 步向导」核心区隔：不用看到一行代码，非技术也能上线一个收款的 Agent SaaS |
| **「行业垂直 Agent」的模板级积累** | ❌ Vercel 是通用平台，不会做「客服行业 Agent」「律师合同审查 Agent」「YouTube 脚本生成 Agent」这种垂直细分模板 | Vectoree 的模板飞轮：100+ 垂直行业模板上架，每一个都是一个「已定价 + 可卖」的产品雏形，Vercel 永远不会做这些垂直层 |
| **开发者面向终端用户的后台/仪表盘** | ❌ 不做「开发者的用户能登录进去看用量/改订阅/付账单」的 SaaS 仪表盘端 | Vectoree 帮开发者内置这个端：每个 Agent 自动有 Customer Portal 页面，开发者用户登录看配额、升级套餐、改卡、看历史账单 |

---

## 🧠 和 Vectoree 的功能重叠度 & 关系矩阵（⚠️ 最关键一页）

> 综合结论：Vercel + Supabase + OpenRouter 这三家组合起来，已经把 Vectoree 蓝图的「技术栈底层」90% 都做完了；Vectoree 不需要自己再做任何一层基础设施，只要做 **「上层商业封装 + 模板装配 + 生态市场 + 分润结算」** 这四件他们不会做的事，就能稳稳立住。

| Vectoree 蓝图模块 | Vercel 是否有？ | Supabase 是否有？ | OpenRouter 是否有？ | Vectoree 的策略（做 / 封装 / 不做） |
|------------------|--------------|-----------------|------------------|---------------------------------|
| 开源框架层（Next.js/Eve）| ✅ Vercel 自家产品 | ❌ | ❌ | **直接复用（不做）** |
| 前端部署 + 域名 + HTTPS | ✅✅✅ 行业最强（F1） | ❌ | ❌ | **封装（接 Vercel Deploy API），不做全球 CDN 自建** |
| 模型商城 + 接入 | ✅ Vercel AI Gateway + 70+ 模型 | ❌ | ✅✅✅ 400+ 模型 + 路由最强 | **双 Provider 封装（用户可切 Vercel / OpenRouter）**，Vectoree 只加 B2B2C 计价层 |
| 数据库 DB | ✅ Durable Postgres（Neon 技术） | ✅✅✅ 最强 Postgres + pgvector + RLS | ❌ | **双 Provider 可选：默认 Supabase（RLS + pgvector 成熟），轻项目用 Vercel Postgres（自动 Scale-to-0 省成本）** |
| KV / Blob / Cron | ✅ 有（F4） | ✅ 有（Cron 是 pg_cron） | ❌ | 默认跟随 DB Provider，不单独选 |
| 鉴权 Auth + 用户系统 | ✅ Passport（企业 IdP）+ 外接 Clerk | ✅✅ Supabase Auth + RLS 深度绑定 | ❌ | **Vectoree 分两层**：开发者账号（Vercel Passport 或 Vectoree 自有）+ 终端用户账号（默认 Supabase Auth） |
| 代码执行沙箱（Coding Agent） | ✅✅✅ Firecracker Sandboxed VMs（F2-6） | ❌（只存数据，不跑代码） | ❌ | **直接接 Vercel Sandboxes，不自建集群** |
| AI UI 组件生成 | ✅✅✅ v0 行业第一（F3-2） | ❌ | ❌ | **把 v0 作为可选集成：模板向导里「UI 风格自定义」按钮走 v0 API 生成 → 自动装配进模板** |
| Agent 工作流编排 | ✅ Eve Agent 框架（开源，F3-5） | ❌ | ❌ | **Vectoree 模板的底层工作流默认基于 Eve 生成**；Vectoree 不重写工作流引擎，只封装成「模板装配 UI」 |
| **模板装配向导（非工程师可用）** | ❌ 只做代码级 Examples | ❌ 只做 SQL/函数级模板 | ❌ | ✅✅✅ **Vectoree 1 号核心差异化，100% 自研** |
| **B2B2C 终用户计费 + Stripe Connect 分润** | ❌❌ 永远不做（商业模型硬边界） | ❌ 只提供 Example，不做代商户 | ❌ 只收开发者充值费 | ✅✅✅ **Vectoree 2 号核心差异化，100% 自研 + Stripe Connect 深度集成** |
| **开发者向终端用户的 SaaS 仪表盘（Customer Portal）** | ❌ 不做 | ❌ 只给开发者自己的 Dashboard | ❌ | ✅ **Vectoree 3 号差异化**：自动为每个 Agent 生成 Customer Portal 页面（升级/降级/看账单/用量/改支付方式） |
| **模板 / Skill / Connector 应用市场 + 分润结算** | ❌ 只有 Examples 仓库，不是交易市场 | ❌ 只有 Extensions 仓库，不是交易市场 | ❌ 只有 Apps 展示广场，不是交易市场 | ✅✅✅ **Vectoree 4 号差异化（长期飞轮护城河）**：Shopify App Store 级交易生态，第三方开发者上传 → 交易 → 分润结算 → 评分推荐 |
| **UI / 品牌白标能力** | ⚠️ 只有自定义域名，不支持 UI 白标 | ❌ 不做 | ❌ | ✅ Vectoree Pro 起提供白标：Vectoree Logo 换成客户品牌、域名全自定义、无 Powered by |
| **Preview URLs 协作** | ✅✅✅ 行业标准（F1-2） | ❌ | ❌ | **直接复用 Vercel Preview，包装进 Vectoree 模板向导的「预览 → 发布」流程** |
| 观测 & 日志 | ✅ Analytics / Monitoring / Drains | ✅ Advisors / Logs | ✅ Activity Dashboard | 聚合三方看板到 Vectoree 单一视图，不用跳 3 个控制台 |

---

## 🔗 参考资料

- [Vercel Docs 首页（产品矩阵总览）](https://vercel.com/docs)
- [Vercel 官网首页 2026（Agentic Infrastructure 新版）](https://vercel.com/)
- [Vercel AI SDK 官方仓库（GitHub）](https://github.com/vercel/ai)
- [Vercel v0 产品页（AI UI 生成器）](https://v0.dev/)
- [Vercel Eve 框架介绍页（Durable Agent Orchestrator 2026）](https://vercel.com/eve)
- [Vercel Passport（企业级 IdP 2026）](https://vercel.com/passport)
- [WorkflowAutomation Review: 38 Projects / 12 Months 真实生产评测（功能全面性 8.5/10、集成 8.5/10、易用 9.5/10）](https://workflowautomation.net/reviews/vercel)
- [AIWiki: Vercel Full Wiki（产品演进全历史）](https://aiwiki.ai/wiki/vercel)

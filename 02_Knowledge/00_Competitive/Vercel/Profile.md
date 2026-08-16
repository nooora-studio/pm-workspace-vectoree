---
title: "Vercel - Profile"
description: "Vercel 间接竞品简介：定位、融资、规模、背景 + 与 Vectoree 价值链关系"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://vercel.com/"
tags: ["competitor", "vercel", "profile", "indirect", "frontend-cloud", "nextjs", "deployment", "ai-gateway"]
owners: ["PM"]
sources: ["https://vercel.com/", "https://sacra.com/c/vercel/", "https://workflowautomation.net/reviews/vercel", "https://aiwiki.ai/wiki/vercel", "https://www.taskade.com/blog/vercel-v0-history"]
---

# Vercel · 竞品简介（间接竞品）

## 🎯 一句话定位
**From Frontend Cloud → AI Cloud** — Vercel 原先是「部署 Next.js/React 最快的平台」，2024-2025 战略升级为「AI 时代全栈应用开发云」，在部署托管之上叠加 AI SDK、v0 AI UI 生成、Eve Agent 编排、AI 模型网关、Sandboxed VMs 一整套能力。
> 2025-09 Series F 路演中 CEO Guillermo Rauch 原话：*"There has to be a cloud that's designed and purpose-built for AI applications — and Vercel has built this from the ground up with the AI Cloud."*

---

## 🏷️ 官方 Slogan & 三大当前主张（2026 首页最新）

| 来源 | 文案 |
|------|------|
| 首页 H1（2026 新版） | **Agentic Infrastructure** — Build agents. Ship apps. Host platforms.（AI Agent 基建层） |
| 首页三条核心故事线 | ① **For coding agents**：以 Agent 原生语言（API / CLI / MCP / Skills）部署，Sandboxed VMs + Durable Backends + 数百模型<br>② **Ship apps & agents**：Zapier 100M+ 月访级别的全球交付、部署环境、Serverless Functions、WAF<br>③ **Host platforms**：Mintlify 2 万家公司级别的租户隔离、域名管理、Custom SSL、Preview URLs |
| 对比 Heroku 的官方定位（Sacra 解读） | 「Heroku 为 Ruby on Rails 发明了 Push-button Deploy，Vercel 为现代 JS/TS/AI 应用做了同样的事」 |
| v0 产品 Slogan | **Design with words, ship with code.**（用文字描述 UI，拿生产 React 代码直接用） |
| Eve Agent 框架 Slogan | **A framework for building durable agents.**（一个做「持久化 Agent」的框架） |

---

## 👥 创始团队 & 背景

| 角色 | 姓名 | 履历 |
|------|------|------|
| **Founder & CEO** | **Guillermo Rauch**（阿根廷裔） | Node.js 早期传奇开发者；[Socket.IO](https://socket.io/) 作者（实时通信时代标配）；2015 年创立 ZEIT（2020 改名 Vercel）；**Next.js 作者 + 首席布道者** — 他一人定义了现代 React 开发范式；行业公认的「Developer Experience 大师」 |
| Co-founders | Tony Kovanen (ex-CTO)、Naoyuki Kanezawa | 三位都是 Socket.IO / LearnBoost 时代老同事 |
| 公司总部 | 美国旧金山 San Francisco, CA | 2015 年立项 |
| 公司规模 | **600+ 员工**（2025-11） | 2020 改名时仅 50 人，5 年 ×12 扩张 |

> 关键文化：**Design Engineering 文化（设计与工程融合）** — Guillermo 本人极度推崇「设计即代码」，v0（AI 生成生产 React UI）就是这种文化的产品化。

---

## 💰 融资与背书（7 轮 $863M → $9.3B 独角兽×3）

| 轮次 | 时间 | 金额 | 估值 | 投资方与备注 |
|------|------|------|------|------------|
| Seed / A / B / C / D / E 前 6 轮累计 | 2015-2024.05 | **~$563M** | Series E: **$3.25B** | CRV、Accel、Bedrock、**GV（Google Ventures）**、Salesforce Ventures 等 |
| **Series F** | **2025.09.30** | **$300M**（超额认购） | **$9.3B** | 联合领投：**Accel + GIC（新加坡主权基金）**；同步开启 ~$300M 员工 Tender Offer（回报早期员工） |
| **总融资额** | 截至 2025-09 | **$863M** | — | 现金储备极其充裕 |

> **关键融资信号解读**：
> - Series F 距 Series E 仅 16 个月，估值从 $3.25B → $9.3B，**近 3× 跳涨**，是同期 DevTools 中增长最猛的一家
> - **GIC（新加坡政府投资公司）入场** — 对标 Supabase 总部在新加坡，Vercel 在东南亚/亚太布局将会加速
> - GV（Google Ventures）早轮就进 + Accel 连续加注 = 云厂商 + 顶级 VC 双背书

---

## 📊 产品规模与指标（截至 2026-Q2，多源交叉）

| 指标 | 数值 | 来源 |
|------|------|------|
| ARR（年经常性收入） | **$340M**（2026.02）；2025 年末 $305M → 2 月新增 $35M = 月增 $17.5M 速度 | Sacra（2026-08-04 更新，行业权威数据源） |
| ARR 同比增速（YoY） | **80% – 111.8%**（2025 vs 2024，不同口径） | Sacra + Taskade 交叉 |
| 累计部署服务次数 | **1B+ Deployments**（2025-09 官宣） | 官方案例区 + Taskade |
| Next.js 月度活跃开发者（MAD） | **6M+ developers / month**（2025-09 官宣） | AIWiki + 官方博客 |
| Next.js 过去 12 个月下载量 | **500M+ downloads**（超过 2016-2024 总和） | 官方 F 轮公开数据 |
| v0（AI UI 生成器）累计用户 | **4M+ people**（2026-02，距上线 18 个月） | Sacra（v0 本身已经是一个 $50M+ ARR 的独立 SaaS 产品） |
| 典型标杆客户 | **OpenAI**（ChatGPT 官网的一部分跑在 Vercel 上）、**Perplexity**、Under Armour、Washington Post、Notion、Nike、Walmart、**TikTok Web 版**、Hulu、DoorDash、Spotify、Uber、Zapier（100M+ 月访问量）、Mintlify（20K+ 文档站） | Sacra + 官网 Customer Stories + WorkflowAutomation 三方评测 |
| 全球边缘节点数 | **18+ regions / 100+ PoP**（Functions/Edge Network） | WorkflowAutomation 评测 |
| GitHub Stars 总生态 | **Next.js = 125K+**、**SWR = 30K+**、**Turborepo = 25K+** — 合计 180K+ 级开源矩阵 | GitHub 实时数据 |
| G2 / Capterra 评分 | 4.7 / 5.0（数千条评论），Deployment Platform 类别 Top 2 | WorkflowAutomation |
| 安全合规认证 | SOC 2 Type II、ISO 27001、GDPR Ready、99.99% Uptime SLA（Enterprise 起） | WorkflowAutomation |

---

## 🎯 目标用户（按优先级 & 战略演进）

| 优先级 | 用户画像 | 2024 前用 Vercel 做什么 | 2025 后加的 AI 用例 |
|--------|---------|----------------------|-------------------|
| P0 | **Indie Hacker / 1-3 人 SaaS 团队** | 部署 Next.js 前端 + Serverless Functions 做 MVP，Preview URLs 做 PR review | 用 Vercel AI SDK + v0 + AI Gateway 拼 AI Agent，不用再接 OpenRouter + Supabase 自己拼 |
| P1 | **Next.js / React 核心开发者社区** | Next.js SSR / ISR / App Router 最佳实践 + Vercel 独家优化（Partial Prerendering 等） | AI SDK 聊天 UI / RSC Streaming / Server Actions + v0 生成组件 |
| P2 | **AI / Agent Native 创业团队（YC 系为主）** | 前端托管 + Edge Functions 调 LLM | Eve Agent 编排、Sandboxed VMs 跑代码执行型 Agent、AI Gateway 路由 + 限流 + 缓存、Durable Backends 替代部分 Supabase 功能 |
| P3 | **中大型企业（Walmart / Nike / TikTok）** | 官网 / 电商前台的性能优化（全球 CDN + 边缘渲染）、Design System 工程化、预览协作 | 企业级 AI 应用（内部知识库助手、客服 Agent） |
| P4 | **「Host Platform」级客户（Mintlify / Resend / Loops）** | 把自己的 SaaS 底层托管在 Vercel 上，同时对外提供「子租户」服务：每个客户一个自定义域名 + SSL + 独立部署环境 | 多租户 AI Platform-as-a-Service：给 B 端客户开独立 Agent 实例 |

---

## 💡 核心问题 & 解决方案（Vercel 官方叙事 2.0）

### 2024 前叙事（Frontend Cloud 时代）：
> **问题**：部署一个 React/Next.js 应用，你要 AWS 配 Load Balancer + S3 + CloudFront + Lambda@Edge + WAF + CI/CD + 证书，一堆 YAML 还要维护全球节点。
> **解决**：`git push` → Vercel 自动 Build + Deploy + 全球 CDN + HTTPS。

### 2025-2026 新叙事（AI Cloud 时代，新增）：
> **问题**：搭一个 Agent / AI SaaS，你现在还要额外拼：
> - ① 模型接入（OpenRouter 级网关 + 限流 + 缓存 + Tokens 计费）
> - ② Agent 工作流持久化（失败重跑 / 长时记忆）
> - ③ 代码执行型 Agent（Sandboxed 安全环境，怕删库跑路）
> - ④ AI UI 组件生成（v0 级）
> - ⑤ 多租户隔离（每个客户独立部署 + 独立域名）
> **解决**：这些 Vercel 一家在 2025 年里全做了 —— **AI Gateway / Eve / Sandboxed VMs / v0 / Host Platform 能力**。

---

## 🗺️ 产品矩阵全景（2026-AI Cloud 时代 7 大模块）

```
Vercel Platform（前端/AI 全栈）
├─ 开源框架层（Moat 的根）
│   ├─ Next.js 16+（React 全栈范式定义者，App Router / RSC / Partial Prerendering）
│   ├─ Turborepo（Monorepo 构建加速）
│   ├─ SWR / React Query 竞品（数据抓取）
│   └─ Eve（2026 最新：Durable Agent 编排框架）
├─ 部署/托管层（传统核心）
│   ├─ Git Push Deploy（GitHub/GitLab/Bitbucket，1-click）
│   ├─ Preview Deployments（每 PR 一个预览 URL）
│   ├─ Production Deployments（全球边缘，100+ PoP）
│   ├─ Edge / Serverless Functions（毫秒冷启）
│   └─ Fluid Compute + Containers（2026：Dockerfile 直接部署，VM 级）
├─ AI 能力矩阵（2024-2026 战略新增，Vectoree 的关注焦点）
│   ├─ Vercel AI SDK（聊天/流式 UI / 工具调用标准库，JS/TS + Python）
│   ├─ v0（AI 生成生产 React + shadcn/ui 代码，文字描述 → UI）
│   ├─ AI Model Gateway（路由 70+ 模型，限流、缓存、观测、Tokens 计量）
│   ├─ Sandboxed VMs（Agent 沙箱代码执行，Firecracker 级隔离）
│   └─ Durable Backends（Postgres + KV + Blob + Cron，与 Supabase 重叠）
├─ 性能/优化模块
│   ├─ Next/image 自动图片优化（CDN 缓存 + WebP/AVIF）
│   ├─ Partial Prerendering（PPR，边缘级混合渲染）
│   ├─ Font Optimization / Script Optimization
│   └─ Speed Insights（真实用户性能数据）
├─ 可观测 & 安全
│   ├─ Web Analytics（Plus 付费，24 月留存）
│   ├─ Monitoring / Log Drains（Datadog / Axiom 等）
│   ├─ Observability Plus（2026 新品）
│   └─ WAF（Web 应用防火墙，Enterprise 标配）
├─ 托管平台级能力（Host Platform）
│   ├─ Multi-tenant 子项目隔离
│   ├─ 自定义域名管理（每个客户独立域名 + 自动 SSL）
│   └─ Preview URL per Customer（多租户预览）
└─ 身份/企业级（2026 Passport 新品）
    └─ Vercel Passport：企业级 IdP（SSO/SAML/OIDC），统一管理内部 App + Agent + Deploy 的身份
```

---

## 🚀 他们宣称的未来（Where Vercel is Going）

> 综合 2025-09 F 轮 CEO 访谈 + 2026 首页新方向 + Eve/Passport/Fluid Compute 连续发布：
> 1. **从「部署平台」全面转成「AI Agent 的操作系统」**：Eve Agent 框架 + Sandboxed VMs + AI Gateway + Durable Backends = 一个 Agent 从开发、部署、运行、监控、计费的完整 OS。
> 2. **v0 生态继续扩大（Design Engineering 飞轮）**：v0 不只是 AI UI 生成器，未来是「用自然语言生成整个 SaaS 前端骨架」，然后一键部署到 Vercel，接 Vercel 内置的 Durable Postgres + KV + AI Gateway —— 这对 Vectoree 的「模板装配线」定位是直接战略重叠。
> 3. **Host Platform（SaaS 平台宿主）路线**：Mintlify 2 万家文档站、Resend 邮件 SaaS、Loops 营销邮件 SaaS 都把自己的多租户底层跑在 Vercel 上；Vercel 会把「每个客户独立域名 + SSL + 隔离环境」做成标准化 API，让任何 SaaS 都能 1 天搭出 Multi-tenant 能力。
> 4. **Passport 身份统一（2026 新品）**：企业内部的 App、Agent、Deployment 全走一套 IdP，替代部分 Clerk / Auth0 的场景，对 Supabase Auth 也是间接竞争。
> 5. **Fluid Compute + Dockerfile 原生支持（2026）**：从纯 Serverless 扩展到容器 / VM 级，能跑任意长驻服务（不仅是函数），开始与 Render / Railway / Fly.io 抢通用 PaaS 的蛋糕。

---

## 🧭 相对位置：Vercel 在 Vectoree 价值链中的定位（⚠️ 关键判断）

> **与前 3 家竞品（InsForge / OpenRouter / Supabase）最大的区别是：Vercel 从 2025 开始向上扩张，正在吃掉 Vectoree 计划中的一大块价值层。**

| 维度 | Vercel（2026 AI Cloud 版） | Vectoree 的蓝图定位 | 关系判断（⚠️ 有战略重叠） |
|------|-------------------------|------------------|------------------------|
| **开源框架层（Next.js / Eve）** | ✅✅✅ 定义行业标准 | ❌ 不做框架层，复用 Next.js | 复用、无冲突 |
| **部署/域名/HTTPS（部署层）** | ✅✅✅ 行业最强 | ✅ Vectoree 也要做一键部署 + 域名 | **Vectoree 可以接 Vercel 作为 Hosting Provider，不用自建全球 CDN**；或者战略上把 Vercel 的部署能力封装进装配线 |
| **模型接入/AI 网关** | ✅ 2024 发布 AI Gateway，70+ 模型路由、限流、缓存、Token 计量 | ✅ Vectoree Model Plaza（原计划接 OpenRouter 级能力） | ⚠️ **轻度重叠**：Vercel AI Gateway 是「通用网关」，Vectoree 的是「Agent 垂直网关 + 计价与配额」；可二选一或都接 |
| **AI UI 生成 / 装配线** | ✅ v0 + 2026 路线图上的「自然语言生成完整 SaaS 前端」 | ✅✅✅ Vectoree 的核心：模板向导装配 + 定价 + 一键上线 | ⚠️⚠️ **核心战略重叠区**：v0 生成的是「代码」，Vectoree 要做的是「业务模板 + 定价 + 收款 + 上线」全流程；v0 只管 UI 部分，Vectoree 管商业闭环 |
| **后端基建（DB/KV/Blob/Cron）** | ✅ Durable Postgres + KV + Blob + Cron（与 Supabase 直接竞争） | ✅ 原计划默认接 Supabase，不自己做 DB | ⚠️ **轻度重叠 + 机会**：Vercel Durable Postgres 上线后，Vectoree 可以默认接 Vercel 的全套（部署 + DB + AI Gateway 一站式），减少跨平台摩擦；或继续保持 Supabase 优先 |
| **B2B2C 终用户计费分润**（Vectoree 第一护城河） | ❌ 不做 Stripe Connect 级分润；只收开发者订阅费 + 用量费；开发者要接 Stripe 自己搞 | ✅✅✅ 原计划第一护城河：Stripe Connect 分润 + 终用户计费 | ✅ **无冲突 + 巨大差异化区隔**：这是 Vectoree 在 Vercel 时代依然能立住的根本 |
| **Host Platform（多租户隔离 + 自定义域名 API）** | ✅ Mintlify 2 万家用的就是 Vercel Host Platform 能力 | ✅✅ Vectoree 模板市场 + 给开发者开子租户能力 | ⚠️ **中度重叠**：Vercel Host Platform 是基础设施 API，Vectoree 要做的是在 API 之上包装出「模板市场 + 交易抽成」的生态（Shopify App Store 级），两者依然是分层互补 |
| **企业身份（SSO/SAML）** | ✅ Vercel Passport（2026 新品） | ✅ 原计划 Enterprise 档的 SSO | 可复用 Vercel Passport，不用自己做 |

---

## 🔗 参考资料

- [Vercel 官网首页（2026 AI Cloud 新版）](https://vercel.com/)
- [Vercel Docs / Pricing（功能与计费矩阵）](https://vercel.com/docs/pricing)
- [Sacra Research: Vercel（$340M ARR / $9.3B Valuation，2026-08-04 最新，数据最权威来源之一）](https://sacra.com/c/vercel/)
- [WorkflowAutomation.net: Vercel Review（9.0/10，12 个月 38 项目真实生产评测，2026-03）](https://workflowautomation.net/reviews/vercel)
- [AIWiki: Vercel（全历史 26 min 读长，36 条引用，2026-07-24 更新）](https://aiwiki.ai/wiki/vercel)
- [Taskade Blog: Vercel & v0 Complete History（完整公司史 + 产品路线，2026-01）](https://www.taskade.com/blog/vercel-v0-history)
- [官方博客：Eve Durable Agent Framework、Passport SSO、Fluid Compute + Dockerfile 三大 2026 新品发布合集](https://vercel.com/blog)

---
title: "Clerk - Features"
description: "Clerk 间接竞品功能拆解：7 大产品域 + 明确不做的 6 件事（永久边界） + Vectoree 模块 vs Clerk/Supabase Auth/Vercel Passport 关系矩阵"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://clerk.com/"
tags: ["competitor", "clerk", "features", "indirect", "auth", "b2b-auth", "organizations", "clerk-billing"]
owners: ["PM"]
sources: ["https://clerk.com/", "https://sacra.com/c/clerk/", "https://cadence.withremote.ai/blog/clerk-review", "https://aibizhub.io/articles/clerk-vs-auth0-vs-supabase-auth-pricing-2026/"]
---

# Clerk · Features 功能拆解（用户认证 BaaS · 组件级 Auth · 2024 涨价事件后战略调整）

> **核心判断**：
> - Clerk 的核心竞争力是「**React/Next.js 生态最成熟的预构建认证 UI 组件库**」——Drop-in `<SignIn />` / `<UserProfile />` / `<OrganizationSwitcher />` 三个组件能省开发者 2-3 周的 UI 开发时间，这是它在 Supabase Auth + Vercel Passport 双重夹击下的生存根基
> - Clerk 的 7 大功能域 = 「用户认证全流程」到「组织/SSO/SCIM 企业级特性」再到「Clerk Billing 订阅组件（2025 GA）」；**明确不做的 6 件事 = Vectoree 的安全边界 + 差异化锚点**
> - **与 Vectoree 关系总结**：Clerk 只做「L5 Auth + L6 开发者侧 Billing UI」两层，其余 6 层全不做；Vectoree 默认 Supabase Auth + Vercel Passport，Clerk 作为**可插拔第三选项**，同时做 Clerk→Supabase 迁移工具吃 2024 涨价迁出流

---

## 7 大产品功能域（F1-F7）

### F1 · 核心认证域（Drop-in Auth Components）— Clerk 灵魂功能

| 功能点 | 说明 | Supabase Auth 对比 | Vectoree 策略 |
|--------|------|-------------------|-------------|
| **`<SignIn />` + `<SignUp />` 组件** | React/Next.js/Remix/Expo/Vue/Nuxt 全栈覆盖；一行 import 完成注册/登录 UI，内置 Email/Password + Magic Link + 20+ Social OAuth | Supabase 有 Auth UI 组件库但体验不如 Clerk 精美；样式定制 Clerk 完胜 | ✅ Vectoree 模板的登录/注册 UI 默认用 **Clerk 组件（第二选项）** 或 **Supabase Auth UI（默认）**，用户在 Wizard 里切换 |
| **`<UserProfile />` 个人中心组件** | 内置：修改密码/邮箱、会话管理、设备列表、MFA 配置、Passkeys、社交账号绑定、个人资料字段 | Supabase 无官方 UserProfile UI，需要自己写 20+ 页面；这块 Clerk 节省时间最多（≈1.5 周工程师工作量） | ✅ Vectoree 模板的「终用户个人中心」默认复用 Clerk 的 `<UserProfile />`（如果用户选了 Clerk Provider）；选 Supabase Auth 则 Vectoree 提供自己定制的 Profile 页面 |
| **Middleware 会话中间件** | Next.js App Router `middleware.ts` 一行配置会话鉴权 + 路由守卫；`auth()` Server Component + `useUser()` Client Component Hooks 全套 | Supabase 有同等能力（middleware + RSC Hooks），但 Clerk 的 API 设计更简洁 10-20% 代码量 | 无冲突，直接走 Provider 层抽象 |
| **Bot 防护 + 风控** | 内置 Arkose Labs / Turnstile 人机验证 + 异常登录风控（IP 异常、位置异常自动触发 MFA）+ 速率限制 | Supabase 需要自己接入 Cloudflare Turnstile，无内置风控 | 复用 Clerk 的风控（如选 Clerk）；Supabase 方案默认配 Turnstile |
| **Passkeys（无密码登录）** | WebAuthn Passkeys 2025 GA；iOS/Android/桌面端 Safari 都兼容；面向 B2C 场景降低注册摩擦 30%+ | Supabase Auth 支持 Passkeys 但无 UI 组件，需要自己写前端 | ✅ Vectoree 模板的 Passkeys 默认复用 Clerk UI（如选 Clerk） |

---

### F2 · 多因素认证（MFA）域

| 功能点 | 说明 |
|--------|------|
| **TOTP（Google Authenticator/Authy）** | Pro 档及以上包含；`<UserProfile />` 内置 TOTP 配置 UI，无需自己写 QR Code 扫描页 |
| **SMS MFA** | 支持但单独计费；ToolRadar 统计 US/CA 每条 $0.01；大量 MFA 的 B2B 场景月账单可能加 $50-$200 |
| **Elevated Session（敏感操作临时二次验证）** | 支付/改邮箱等高风险操作前强制 MFA；一行 Server API 调用完成会话升级 |
| **Backup Codes** | 10 个备用码自动生成，用户 Profile 页内置管理 UI；Supabase Auth 需要自己生成和存备用码 |

> **Vectoree 借势**：MFA 是「终用户计费系统」（Stripe 支付页面前）的必备能力；Vectoree 模板直接复用 Clerk MFA UI 或 Supabase Auth MFA API，不自建。

---

### F3 · B2B Organizations（组织 & 多租户）域 — Clerk Growth 档核心收入来源

| 功能点 | 说明 | 计费影响（Trap 点） | Vectoree 策略 |
|--------|------|------------------|-------------|
| **`<OrganizationSwitcher />` 组件** | SaaS 客户在多个 Team / Org 之间切换；内置组织创建、邀请成员、角色配置 UI | Organizations 每月单独计费：Free/Pro 档含 100 个 Org，超出 **$1/Org/月**（Cadence Review 2026 实测） | ⚠️ Vectoree 模板的多租户模式：**默认走 Supabase RLS + 自建 Tenant 表**（$0 额外成本）；用户如果选 Clerk Provider，明确提醒「组织计费加钱，建议超过 100 组织后切到 Vectoree 自建多租户方案」 |
| **RBAC 自定义角色** | 5 个预置角色（owner/admin/member 等）+ 无限自定义角色；Server 端 JWT Claims 自带 role/organization_id | 免费包含在 Pro 档以上 | 复用，无自建 |
| **域验证自动加入（Domain-based Enrollment）** | 企业客户员工用 @company.com 邮箱自动加入对应 Organization；减少管理员手动邀请工作量 | Pro 档包含 | 复用 |
| **SCIM 目录同步（2026-04 GA）** | Okta / Azure AD / Google Workspace 目录自动同步成员 + 离职自动注销；之前 Enterprise 专属，现在 Pro 档包含（Clerk 挽回 2024 流失客户的关键让利） | Pro 档包含，不加价 | 复用 Clerk SCIM；企业客户的 IdP 同步省大量工程时间 |

---

### F4 · Enterprise SSO（SAML / OIDC）域

| 功能点 | 说明 | 计费陷阱 | Vectoree 策略 |
|--------|------|---------|-------------|
| **SAML 2.0 / OIDC SSO** | 企业客户用 Okta / Azure AD / OneLogin / Google Workspace 单点登录；`<SignIn />` 组件内置企业 SSO 按钮，自动识别企业邮箱跳转对应 IdP | **SSO 连接单独计费**：Pro 档 $75/连接/月（ToolRadar 2026 实测）；Cadence 说旧价是 $50/连接 2025 涨过一次 | ✅ Vectoree 的 Business $499/月档 SSO 不按连接数收费（复用 Vercel Passport 能力），**这点可以作为 Clerk 的反打卖点**：「Clerk 5 个 SSO 连接 = $375/月单独加，Vectoree Business 无限 SSO 连接打包 $499/月含」 |
| **Just-in-Time 置备** | SSO 首次登录自动创建用户 + 分配组织角色 | 包含 | 复用 |
| **IdP-initiated Login** | 企业员工从 Okta 面板点图标直接登录应用 | 包含 | 复用 |

---

### F5 · Sessions & JWT 会话域（技术细节，架构相关）

| 功能点 | 说明 | 对 Vectoree 架构的影响 |
|--------|------|-------------------|
| **JWT Custom Claims** | 会话 Token 里带自定义字段（plan_id、organization_id、role、stripe_customer_id 等）；后端 API 直接读 JWT 不用查 DB | ✅ Vectoree 的 M2 Stripe Connect 分润引擎依赖用户的 plan_id / customer_id；Clerk JWT Claims 可以把这两个字段直接塞进 Session，减少一次 Supabase 查询 |
| **Short-lived JWT + 长有效期 Refresh Token** | JWT 60s 过期，Refresh Token 7 天；滚动更新策略防 Token 泄露；业内最佳实践 | 复用 |
| **User Impersonation（管理员模拟登录）** | SaaS 客服后台模拟用户登录排查问题；一行 API 生成 Impersonate Session | ✅ Vectoree M3 Customer Portal 的「客服协助」功能复用 Clerk Impersonation |
| **多设备会话列表 + 远程注销** | `<UserProfile />` 里内置设备列表，用户可踢掉可疑设备 | 复用 Clerk UI；选 Supabase Auth 则 Vectoree 自写页面 |

---

### F6 · Clerk Billing（2025 Beta / 2026 GA · Stripe 战投后的战略新品）

> ⚠️ **高风险信号区域（Vectoree L6 边界防御）**：Clerk Billing 是 Clerk 在 Stripe 战略投资后推出来的新功能，位置就在 Vectoree 的 L6 层（终用户订阅 UI）。但注意：它**只做「开发者自己的订阅管理 UI」不做 Stripe Connect 分润**，硬边界还在。

| 功能点 | 说明 | 和 Vectoree M1 + M2 的重叠度 | Vectoree 防御 & 借势 |
|--------|------|---------------------------|------------------|
| **`<PricingTable />` 定价表组件** | 一行 import 展示 SaaS 月/年订阅定价；样式可定制；和 Stripe Price ID 1:1 绑定 | **重叠度 ~30%**（Vectoree M1 Wizard 也会生成 Stripe Pricing Table 配置） | ✅ 借势：Vectoree 模板的终用户定价页面，默认复用 Clerk `<PricingTable />`（用户选了 Clerk Provider 的情况下）；选 Supabase Auth 的话 Vectoree 自己提供 Pricing 模板 |
| **`<CustomerPortal />` 组件** | 订阅升级/降级/取消/付款方式管理 UI；底层接 Stripe Customer Portal API | **重叠度 ~20%**（Vectoree M3 Customer Portal 做的是「开发者看终用户收入」，Clerk 做的是「终用户自己管订阅」 — 面向用户不同，互补） | ✅ 纯互补：Vectoree M3 的仪表盘（开发者视角：收入/MAU/Token）和 Clerk Billing CustomerPortal（终用户视角：管自己订阅）是两个不同的页面，同时存在不冲突 |
| **Stripe Subscriptions 深度集成** | Webhook 事件自动同步；Invoice、Tax、Dunning（催收）全走 Stripe | 100% 互补（Vectoree M2 分润引擎就是接 Stripe Webhook） | ✅ 借势：Clerk Billing 处理的是「单商户 Stripe Subscriptions」，Vectoree M2 处理的是「多商户 Connect 分润」；两层完全不冲突，可以集成 |
| **❌ Stripe Connect B2B2C 分润** | **明确不做**（商业伦理：做了就抽 SaaS 开发者终用户的钱，和客户竞争） | 0% 重叠 | ✅ **Vectoree 永久安全区**：Clerk Billing 永远到不了 Connect 分润这层 |
| **❌ 代收款 / 代报税 / Express 商户** | 明确不做（没有全球商户合规资质 + 风控团队） | 0% 重叠 | ✅ Vectoree 代收款服务（护城河 1 的 Express Mode）完全独占 |

---

### F7 · 平台 & 生态域（集成 + DX）

| 功能点 | 说明 |
|--------|------|
| **框架/语言覆盖** | Next.js（最佳）/ React / Remix / Expo / Vue / Nuxt.js / Node.js / Go / Ruby / Python；SwiftUI iOS + Android + Flutter 原生 SDK 2025-2026 补齐 |
| **Webhook + 审计日志** | 所有用户事件（登录/注册/MFA/SSO/组织变更）Webhook 推送到客户后端；Business 档以上 90 天审计日志，Enterprise 1 年 |
| **Dashboard + 分析** | 用户增长、MRU 统计、登录失败原因、地域分布；但分析深度不如 Supabase（Supabase 可以用 SQL 自己查 Auth 表） |
| **Vercel / Supabase Marketplace 官方收录** | 三家生态打通；Vercel Deploy 一键配置 Clerk Env Vars；Supabase 有官方 Clerk-Supabase RLS 集成教程 |
| **EU 数据驻留（2026 计划中）** | Cadence 2026 Review 里说「目前不支持 EU Residency」是 Clerk 最大硬伤之一；2026 Roadmap 承诺 H2 上线 EU West 节点 |

---

## 🚫 6 件 Clerk 明确不做的事（= Vectoree 永久安全边界 + 差异化锚点）

| # | Clerk 明确不做的事 | 为什么不做（商业/定位逻辑） | Vectoree 在这一层的做法 |
|---|----------------|------------------------|-------------------|
| ❌ 1 | **Stripe Connect B2B2C 分润 & 代商户网络** | 做了 = 和自己的 SaaS 开发者客户竞争（Clerk 客户是开发者，抽他们终用户的钱 = 砸自己饭碗） | ✅ Vectoree 护城河 1：Stripe Connect Platform 全能力；代收款 + 全球分润 + 代报税 + Chargeback 处理 |
| ❌ 2 | **数据库 & 后端基建（Postgres / pgvector / RLS）** | 定位专注 Auth，不碰 Supabase / Vercel Postgres 的业务层；**最大代价：用户数据存在 Clerk 云，开发者无法用 Supabase RLS 直接 join Clerk 用户表做行级权限**（这是 Supabase Auth 比 Clerk 最大的架构优势！） | ✅ Vectoree 默认后端 = Supabase Auth + Postgres + RLS 一体化架构；用户数据归属自己 DB，直接 join pgvector 做知识库 RLS，无数据孤岛 |
| ❌ 3 | **模型接入 / LLM Gateway / Agent 编排** | 定位纯 Identity，不碰 AI 层（这是 Vercel AI Gateway + OpenRouter 的地盘） | ✅ Vectoree 复用 OpenRouter + Vercel AI Gateway 双 Provider |
| ❌ 4 | **部署托管 / 全球 CDN / Serverless** | 纯 BaaS，不做基础设施；和 Vercel 深度集成 | ✅ Vercel 默认 + CF/Netlify 备 |
| ❌ 5 | **模板装配 Wizard（No-Code 3 步上线 Agent SaaS）** | 只给组件不给装配体验；Clerk 的用户是工程师，做 No-Code 稀释品牌心智 | ✅ Vectoree M1 核心模块；非工程师 10 分钟上线 |
| ❌ 6 | **模板 / Skill / Connector 交易市场 & 分润** | 做交易市场 = 和开发者客户的插件市场抢钱；商业伦理不允许（同 Vercel 为什么不做 App Store） | ✅ Vectoree 护城河 2：Shopify App Store 级交易市场 + 分润飞轮 |

---

## 📊 Vectoree 蓝图模块 vs Clerk + Supabase Auth + Vercel Passport 关系矩阵（18 行 ×5 列）

> 与 Vercel Features.md 20 行超级矩阵格式 100% 对齐；只看「Auth 层三角」的分工关系

| # | Vectoree 蓝图模块 | Clerk（组件 Auth BaaS） | Supabase Auth（数据库级 Auth） | Vercel Passport（企业 IdP SSO） | Vectoree 的策略 & 边界 |
|---|---------------|----------------------|-----------------------------|------------------------------|-------------------|
| 1 | 终用户注册/登录 UI | ✅ **强**（`<SignIn />` Drop-in 最佳） | ✅ 可用（Auth UI 组件，体验差 20%） | ❌ 不做终用户登录 | **默认 Supabase Auth UI / 可选 Clerk UI**（用户在 Wizard 选；Clerk 做第二选项不做默认） |
| 2 | 终用户 Profile 个人中心 | ✅ **强**（`<UserProfile />` 省 1.5 周开发） | ❌ 需自建 UI（无官方组件） | ❌ 不做 | **Clerk 选了就复用 / Supabase 方案 Vectoree 给预置 Profile 页** |
| 3 | 多租户 Organizations & RBAC | ✅ **强**（但 $1/Org/月 ⚠️ 加钱陷阱） | ✅ 原生 RLS 多租户（$0 额外成本） | ❌ 不做 | **默认 Supabase RLS（$0 无陷阱） / Clerk 可选 + 明确提醒加钱** |
| 4 | 会话鉴权 & 中间件 | ✅ 强（Next.js 代码最简洁） | ✅ 强（同等能力） | ❌ 不做 | Provider 抽象层；两边 API 都走，用户无感切换 |
| 5 | MFA（TOTP/SMS/Passkeys） | ✅ 强（UI 全内置） | ✅ 强（API 可用但需自建 UI） | ❌ 不做 | 同上；Clerk 选了就复用 UI |
| 6 | Enterprise SSO（SAML/OIDC） | ✅ 中（**$75/连接/月 ⚠️ 连接数计费陷阱**） | ✅ 中（SAML 需 Supabase Team 档以上） | ✅ **强（无限 SSO 连接打包在 Vercel Passport）** | **默认 Vercel Passport（Business 档无限连接）/ Clerk 可选 + 反打卖点：Clerk 5 连接 = $375/月，我们打包 $499 无限** |
| 7 | SCIM 目录同步 | ✅ 2026-04 GA（Pro 档包含） | 🟡 部分支持（需自己集成第三方工具） | ✅ 强（和 SSO 一体） | 企业客户优先走 Vercel Passport + Clerk SCIM 第二选项 |
| 8 | 自定义 JWT Claims（带 plan_id/stripe_customer_id） | ✅ 强（Dashboard UI 配置） | ✅ 强（SQL 触发器自定义） | ❌ 不做 | 两边都能满足；Vectoree 分润引擎 M2 通用适配 |
| 9 | Stripe Connect 分润引擎 | ❌ 永远不做（商业伦理） | ❌ 不做 | ❌ 不做 | **✅ Vectoree M2 独占（护城河 1 核心）** |
| 10 | Stripe Subscriptions 计费 UI（`<PricingTable />`） | ✅ Clerk Billing 2026 GA（`<PricingTable />` 组件） | ❌ 无官方组件 | ❌ 不做 | ✅ Vectoree 模板默认复用 Clerk Billing 定价表组件（选 Clerk 的情况下），否则 Vectoree 自己预置 |
| 11 | 终用户 Customer Portal（管理订阅） | ✅ Clerk Billing 有（终用户视角：升级/取消） | ❌ 不做 | ❌ 不做 | ✅ 互补：Clerk 做终用户自管订阅，Vectoree M3 做开发者看收入仪表盘（两个不同页面不冲突） |
| 12 | 代收款 / Express 商户（无主体开发者） | ❌ 不做（缺全球商户资质+风控） | ❌ 不做 | ❌ 不做 | **✅ Vectoree 独占护城河 1 Express Mode** |
| 13 | 用户数据在自己 Postgres + 可 join 做 RLS | ❌ **硬伤**（用户数据在 Clerk 云黑盒，不能直接 SQL join Supabase 业务表做 RLS） | ✅ **天然强**（Auth users 表 = Postgres 原生表，直接 join pgvector / 业务表，RLS 一体化） | ❌ 不做 | **✅ Vectoree 默认推荐 Supabase Auth 的核心架构理由！** Agent SaaS 需要 Auth 用户 ID → 知识库（pgvector）→ 聊天记录 三表 join + RLS，Clerk 做不到或者极其痛苦 |
| 14 | 模板装配 3 步 Wizard | ❌ 不做（只给组件不给装配体验） | ❌ 不做 | ❌ 不做 | **✅ Vectoree M1 独占** |
| 15 | Agent 模板市场 + 交易分润 | ❌ 不做（做了=和客户竞争） | ❌ 不做（只有 Examples 不是交易市场） | ❌ 不做 | **✅ Vectoree M4 独占（护城河 2 核心）** |
| 16 | 模型接入 & LLM Gateway | ❌ 不做 | ❌ 不做 | ❌ 不做 | ✅ 复用 OpenRouter + Vercel AI Gateway 双活 |
| 17 | Postgres + pgvector 知识库 | ❌ 不做 | ✅ 强（Supabase 核心） | ❌ 不做 | ✅ 默认 Supabase（pgvector + RLS 成熟） |
| 18 | Deploy 永不休眠 + 全球 CDN | ❌ 不做（只接 Vercel） | ❌ 不做（Supabase 免费版每周休眠） | ❌ 不做 | ✅ Vectoree 独家差异化功能：Deploy Never Sleeps（同时 Warm-up Vercel + Supabase） |

---

## 🔗 参考资料

- [Clerk Docs（Features 官方说明）](https://clerk.com/docs)
- [Sacra Research: Clerk（Clerk Billing 产品介绍 + Stripe 战略投资背景，最权威来源）](https://sacra.com/c/clerk/)
- [Cadence withremote.ai: Clerk Review 2026（F1/F3/F4 功能实测 + EU Residency 缺失硬伤分析）](https://cadence.withremote.ai/blog/clerk-review)
- [AIBizHub: Clerk vs Auth0 vs Supabase Auth 2026（三家 Auth Provider F1/F2 功能横向对比）](https://aibizhub.io/articles/clerk-vs-auth0-vs-supabase-auth-pricing-2026/)
- [ToolRadar: Clerk Pricing 2026（隐藏成本项：SSO $75/连接、Satellite 域 $10/月、SMS $0.01/条，F3/F4 陷阱数据来源）](https://toolradar.com/tools/clerk/pricing)
- [APICostCalc: Clerk（2026-02 MRU 计费模式切换 + F5 Sessions 技术细节）](https://apicostcalc.com/clerk.html)
- [Bitsfolio: Clerk vs Auth0（2024 涨价事件对 F3 Organizations 计费调整的背景）](https://www.bitsfolio.com/clerk-vs-auth0-indie-developers-pricing-dx/)

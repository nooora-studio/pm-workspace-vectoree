---
title: "Clerk - Profile"
description: "Clerk 间接竞品简介：用户认证 BaaS 定位、融资规模、增长、2024 涨价事件、与 Vectoree 的关系（互斥 + 可接入 Provider）"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://clerk.com/"
tags: ["competitor", "clerk", "profile", "indirect", "auth", "user-management", "saas"]
owners: ["PM"]
sources: ["https://clerk.com/", "https://sacra.com/c/clerk/", "https://apicostcalc.com/clerk.html", "https://toolradar.com/tools/clerk/pricing", "https://cadence.withremote.ai/blog/clerk-review"]
pricing_last_verified: "2026-07-19"
---

# Clerk · 间接竞品 Profile（用户认证 & 用户管理 BaaS · 可插拔 Provider）

> **核心关系判断**：
> - Clerk 与 Vectoree 的关系 = **🔴 终用户 Auth 层直接竞争（vs Supabase GoTrue + Vercel Passport 双默认）+ 🟢「可选第三方 Provider」可接入**
> - Clerk 的最大风险是**向上扩张（Clerk Billing 2025 年推出）**，但它的商业定位永远是「开发者侧的 Auth 服务商」而不是「SaaS 装配平台」，所以不会碰 B2B2C 分润与交易市场
> - Clerk 的最大机会是**2024 年 MAU 涨价事件**让大量开发者主动迁出（Clerk → Supabase Auth 是全球第一大 Auth 迁移路径），Vectoree 默认推荐 Supabase Auth + 提供 Clerk 可插拔选项，吃「迁出客户」和「习惯 Clerk 组件」两批人群

---

## 1. 基本信息

| 字段 | 内容 |
|------|------|
| **公司名** | Clerk Inc. |
| **成立时间** | 2019 年（San Francisco, CA, US） |
| **创始人 / CEO** | Colin Sidoti |
| **官网** | https://clerk.com/ |
| **产品一句话定位** | Drop-in Authentication & User Management for Modern Apps（React/Next.js 优先的组件化认证 + 用户管理 BaaS） |
| **一句话价值主张** | `<SignIn />` 一个组件 = 完整的注册/登录/MFA/组织/用户 Profile 界面；2 小时上线生产级 Auth，不用自己写 2 周 UI |

---

## 2. 融资 & 规模（截至 2026-07 权威来源汇总）

| 指标 | 数据 | 来源 |
|------|------|------|
| **总融资额** | **$55.5M（5 轮）** | [Sacra Research: Clerk](https://sacra.com/c/clerk/)（最权威，2026 版） |
| **Seed** | ~$10.5M（未公开具体轮次时间，Madrona Ventures 等早期基金） | Sacra |
| **Series A** | **$15M · 2023 年 3 月** · 领投 Andreessen Horowitz（a16z） | Sacra |
| **Series B** | **$30M · 2024 年 1 月** · 领投 CRV · **战略投资方 = Stripe**（关键信号！Clerk Billing 深度绑定 Stripe 的原因） + a16z + Madrona 跟投 | Sacra |
| **估值（2024 Series B 后）** | ~$120M-$150M（PrivCo 估 $123M；SaaS 估值倍率 5-8x ARR，Sacra 未公开具体 ARR 但估在 $10M-$50M 区间） | [PrivCo: Clerk](https://system.privco.com/company/clerk-2) |
| **年营收（ARR 估算）** | **$10M-$50M**（PrivCo Revenue 区间；100-200 员工对应 SaaS 人均产出 ~$150K-$250K/人·年 → 落在 $15M-$50M，和 Series B $30M 时点匹配） | PrivCo + Sacra 交叉验证 |
| **员工数** | 100-200 人（2026-07 PrivCo） | PrivCo |
| **客户规模（间接估算）** | 付费客户 3000-8000 家（按 $10M-$50M ARR ÷ 平均客单价 $1500-$2500/年 → 区间内）+ 免费客户 50K+ | 交叉推导 |
| **标杆客户** | Loom、Notion（早期）、Vercel Marketplace 官方推荐 Auth、Linear、Resend、Mintlify 文档站生态、大量 Next.js 生态 SaaS | 官网 Customer Showcase + Sacra |

---

## 3. 战略里程碑时间线（关键转折点 3 个）

| 时间 | 事件 | 对 Vectoree 的意义 |
|------|------|----------------|
| **2019-2022** | 公司成立 + 产品打磨期；定位「Next.js 生态最好的组件化 Auth」；早期客户以 B2C Indie SaaS 为主 | Vectoree 默认技术栈也是 Next.js → 重叠度天然高 |
| **2024-01** | **Series B $30M · Stripe 战略投资** + 同年底开始推进「涨价 + 更严格 MAU 计费」；同时秘密研发 **Clerk Billing（订阅组件 + Stripe 集成）** | Stripe 战略投资 = Clerk 永远和 Stripe 生态高度绑定，对 Vectoree（同样 Stripe Connect 核心）有利有弊：好 = 集成容易，坏 = Clerk Billing 轻度侵蚀 Vectoree 终用户计费界面层 |
| **2024-H2 → 2025-Q1** | **⚠️ Clerk MAU 涨价事件（全球社区反弹的导火索）**：免费档 10K MAU 保留但 Pro 档超流量计费从 $0.01 → $0.02 翻倍 + B2B 组织计费从免费到 $1/org/月 + SSO $50/连接/月；大量 1-10 人 SaaS 月账单从 $50 跳到 $500-$1500，Reddit/Hacker News/Indie Hackers 爆发「离开 Clerk」运动，首选迁入地 = Supabase Auth | ✅ **Vectoree 最大 O1 机会点**：Clerk → Supabase Auth 迁移路径在 2024-2026 持续有高搜索量，Vectoree 默认推荐 Supabase Auth + 出「Clerk 一键迁移到 Vectoree + Supabase Auth」工具包，定向截流这批客户 |
| **2026-02** | **Clerk 定价模式大改（MRU 替代 MAU）**：为了挽回 2024 涨价事件流失的客户，免费档从 10K MAU 上调到 **50K MRU（Monthly Retained Users，回流用户计数）**，Pro 档年付降至 $20/月（月付 $25）；Clerk Billing 正式 GA（定价表组件 + Stripe 订阅管理组件） | 🔶 对 Vectoree 意义：① Clerk 免费档变厚道 → 习惯 Clerk 组件的开发者更多 → Vectoree 要做 Clerk Provider 可插拔选项接这批人 ② Clerk Billing GA → Auth + 开发者自己订阅管理一体化，但**不做 Stripe Connect B2B2C 分润**（和护城河 1 仍有硬边界） |
| **2026-04** | SCIM 企业目录同步 GA + Organizations 企业级功能完善；Pro 档首次包含 SCIM（之前是 Enterprise 专属） | 进一步巩固 Clerk 在 10-200 人 B2B SaaS 的渗透率 |

---

## 4. 核心用户画像

| 画像层 | Clerk 最爱客户 | Vectoree 和他们的关系 |
|--------|-------------|-------------------|
| **🌱 Indie / Hobby（免费档主力）** | 单人创始人 / 2-3 人小团队，Next.js 技术栈，B2C 产品为主（<50K MRU）；用 Clerk 省 2 周 UI 开发 | Vectoree 免费档 + Pro 档的目标客户群之一：他们关心「组件体验好 + 便宜」，Vectoree 默认 Supabase Auth 给不想迁移的，提供 Clerk 可插拔给习惯 Clerk 的 |
| **🚀 Growth（付费档主力）** | 10-50 人 B2B SaaS 团队，Next.js/React，已过 PMF，ARR $500K-$5M；用 Clerk Organizations（多租户）+ SSO + SCIM；2024 涨价事件最受伤的一群（$50→$500 账单暴涨） | Vectoree Business $499/月（含 SSO/SAML/HIPAA）的高价值客户群；2024 涨价迁出的就是这批，Vectoree 定价透明 + Supabase Auth 原生集成比 Clerk 便宜 30-50% 是核心卖点 |
| **🏢 Enterprise** | 50-200 人中型企业，99.99% SLA + HIPAA + 独立合规；通常也是 Stripe 大客户（Clerk + Stripe 双重签约） | Vectoree Enterprise 客户，通常有自己的 Stripe 主体 → Clerk 作为可插拔 Auth Provider 接入即可 |

---

## 5. Clerk vs Vectoree 价值链定位总表（与 Vercel Profile 9 行矩阵对齐格式）

| 价值链层 | Clerk 做了吗？ | Vectoree 做了吗？ | 重叠度 | 关系 |
|---------|-------------|----------------|--------|------|
| L1 · 部署 & 托管 CDN | ❌ 不做（集成 Vercel） | ✅ 深度集成 Vercel | 0% | 纯互补 |
| L2 · 模型接入 & LLM 路由 | ❌ 完全不碰 | ✅ OpenRouter + Vercel AI Gateway 双活 | 0% | 纯互补 |
| L3 · 数据 & 后端 & DB & pgvector | ❌ 不碰数据层（用户数据存在 Clerk 云，无法做 RLS 级深度集成 — Clerk W4） | ✅ Supabase 默认 + Vercel Postgres 备 | 0% | 互补 + 轻度冲突（用户数据归属） |
| L4 · UI 组件 & 应用框架 | ✅ 强（SignUp/SignIn/UserProfile，Next.js 优先） | ✅ 自己做装配向导 UI（v0 生成） | **~10%**（UI 层重叠，位置不同：Clerk 做登录页/Vectoree 做装配页） | Clerk UI 组件可以被 Vectoree 模板直接复用；可插拔 |
| **L5 · 用户系统 / Auth / SSO / SAML** | **✅ 核心主业（SignIn/SSO/MFA/Organizations/SCIM）** | ✅ 默认 Supabase GoTrue（终用户）+ Vercel Passport（企业 IdP）；**Clerk 是可插拔第三选项** | **~70% 重叠**（这一层是 Clerk vs Supabase Auth 的正面战场） | Vectoree 默认给 Supabase Auth，给喜欢 Clerk 组件的用户做「一键切换到 Clerk」；同时做「Clerk → Supabase Auth 迁移工具」吃迁出客户 |
| L6 · 终用户订阅 & Stripe 集成（开发者自己的订阅 UI） | ✅ 2025 Clerk Billing（定价表组件 + Stripe Subscriptions 绑定） | ✅ Vectoree M1 Wizard 自动生成 Stripe Checkout 配置 + Customer Portal | **~20% 重叠**（Clerk 做开发者自己的 Billing UI，不做 B2B2C 分润；Vectoree 做整个闭环） | 互补为主：Vectoree 模板可以用 Clerk Billing 做 UI 层，底层仍走 Vectoree Stripe Connect 分润 |
| **L6+ · B2B2C 终用户计费分润 & 代收款（护城河 1）** | **❌ 永远不做（做了 = 和 SaaS 客户竞争）· Clerk 客户是 SaaS 开发者，Clerk 向开发者收费，不会抽开发者终用户的交易** | ✅ Vectoree 1 号护城河：Stripe Connect Platform 代商户 + 全球分润 | **0%** | **Vectoree 永久安全区 1**；Clerk 商业模型硬边界和 Vercel、Supabase 完全一致 |
| L7 · 模板装配 Wizard（No-Code） | ❌ 不做（只给组件，不给装配体验） | ✅ Vectoree M1 核心模块；3 步向导 | 0% | 纯互补 |
| **L8 · 模板/Skill 市场 & 交易分润（护城河 2）** | **❌ 永远不做（做交易市场会和 SaaS 开发者客户抢生态位）** | ✅ Vectoree M4 核心；Shopify App Store 级交易市场 | **0%** | **Vectoree 永久安全区 2** |

> **关键洞察（Profile 最高优先级结论）**：
> Clerk 与 Vectoree 唯一的正面重叠层在 **L5 Auth**；其余所有层要么纯互补（UI 组件可复用、Billing UI 可接入、部署/模型/数据 0 重叠），要么 Vectoree 独占安全区（L6+ Connect 分润 / L8 交易市场）。**Clerk 对 Vectoree 不是威胁，是「可接入 Provider + 客户流出金矿（2024 涨价事件迁移流）」的双重身份。**

---

## 6. 关键风险信号（给 Vectoree 的监控清单）

每周/月监控以下信号：

1. **Clerk Billing 是否加了 Stripe Connect 分润？**（一旦加了 = 突破商业伦理硬边界，触发 T 级威胁；目前概率 <5%）
2. **Clerk 是否收购 Supabase 级的 BaaS 玩家 / 自己出 Postgres？**（目前 Stripe 战投 + Clerk 定位专注 Auth，概率 <10%）
3. **Clerk 免费档 / Pro 档是否再次涨价？**（2026 年 2 月刚改 MRU，未来 12 个月再次涨价概率 >50%，每涨一次 → 给 Vectoree 带来一波客户迁出流）
4. **Stripe 是否推出自己的「Stripe Auth」官方产品？**（Stripe 战投 Clerk = 短期不会自己做 Auth；但 3 年以上窗口是中等概率，一旦发生 = Clerk 失去 Stripe 独家战略优势）

---

## 🔗 参考资料

- [Clerk 官网](https://clerk.com/)
- [Sacra Research: Clerk（Series B $30M CRV + Stripe 战投资料，最权威来源）](https://sacra.com/c/clerk/)
- [APICostCalc: Clerk Pricing（2026-07 MRU 计费模式最详细拆解）](https://apicostcalc.com/clerk.html)
- [ToolRadar: Clerk Pricing 2026（隐藏成本 & 隐性陷阱统计，SSO $75/连接、Satellite 域 $10/月等细节）](https://toolradar.com/tools/clerk/pricing)
- [Cadence withremote.ai: Clerk Review 2026（真实 B2B SaaS 画像账单，100K MAU + 200 Org + 5 SSO = $1300-$1500/月实测数据）](https://cadence.withremote.ai/blog/clerk-review)
- [AIBizHub: Clerk vs Auth0 vs Supabase Auth Pricing 2026（三家 Auth Provider 横向对比，Supabase Pro 100K MAU vs Clerk Pro 50K MRU 对比数据）](https://aibizhub.io/articles/clerk-vs-auth0-vs-supabase-auth-pricing-2026/)
- [Bitsfolio: Clerk vs Auth0 Indie Developer Review（2024 涨价事件原始触发点分析，Indie Hacker 社区第一手反馈）](https://www.bitsfolio.com/clerk-vs-auth0-indie-developers-pricing-dx/)
- [PrivCo: Clerk（估值 $123M + ARR 区间估算数据）](https://system.privco.com/company/clerk-2)

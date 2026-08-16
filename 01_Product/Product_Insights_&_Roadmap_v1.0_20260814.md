---
title: "Vectoree 产品洞察与后续规划思路 v1.0"
description: "整合 InsForge（直接竞品）+ OpenRouter + Supabase + Vercel（3 家间接竞品）四家分析结论后的综合产品洞察、定位锚点、技术架构决策、四大护城河、定价模型、冷启动路径与季度里程碑路线图"
author: "PM"
created: "2026-08-14"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
tags: ["product", "insights", "roadmap", "strategy", "vectoree", "positioning", "moats"]
owners: ["PM"]
confidentiality: "INTERNAL"
sources: [
  "02_Knowledge/00_Competitive/Insforge/Profile.md",
  "02_Knowledge/00_Competitive/Insforge/Features.md",
  "02_Knowledge/00_Competitive/Insforge/Pricing.md",
  "02_Knowledge/00_Competitive/Insforge/SWOT.md",
  "02_Knowledge/00_Competitive/OpenRouter/Profile.md",
  "02_Knowledge/00_Competitive/OpenRouter/Features.md",
  "02_Knowledge/00_Competitive/OpenRouter/Pricing.md",
  "02_Knowledge/00_Competitive/OpenRouter/SWOT.md",
  "02_Knowledge/00_Competitive/Supabase/Profile.md",
  "02_Knowledge/00_Competitive/Supabase/Features.md",
  "02_Knowledge/00_Competitive/Supabase/Pricing.md",
  "02_Knowledge/00_Competitive/Supabase/SWOT.md",
  "02_Knowledge/00_Competitive/Vercel/Profile.md",
  "02_Knowledge/00_Competitive/Vercel/Features.md",
  "02_Knowledge/00_Competitive/Vercel/Pricing.md",
  "02_Knowledge/00_Competitive/Vercel/SWOT.md"
]
---

# Vectoree · 产品洞察与后续规划思路 v1.0（2026-08-14）

> **一句话战略锚点（最核心的一句话，贯穿所有决策）**：
> 
> **Vectoree = AI Agent SaaS 领域的 Shopify**。Vercel 做 AI 时代的操作系统（Next.js + Eve + Sandboxes + Durable Backends），Supabase 做数据库层（Postgres + pgvector + RLS），OpenRouter 做模型接入层（400+ 模型统一 API）—— 这三家加起来做了底层技术基建的 90%。Vectoree 做剩余 10% 但商业价值最高的那一层：
> 
> **把「模型接入 + 后端基建 + 部署托管 + 终用户计费分润」四层做成 3 步装配线，让非工程师 10 分钟上线一个能收款的 Agent SaaS**。
> 
> 我们不重造任何一家已经做好的轮子；我们只做他们因为商业伦理（会和客户竞争）或定位（通用平台）而**永远不会做**的四件事。

---

## 📊 Part 1 · 竞品全局图谱（4 家覆盖 · 关系矩阵总览）

### 1.1 竞品地图 · 直接 vs 间接 × 价值层定位

| 竞品 | 类型 | 融资/估值/ARR | 核心价值层 | 与 Vectoree 重叠度 | Vectoree 的关系策略 |
|------|------|-------------|----------|----------------|------------------|
| **[InsForge](https://insforge.ai/)** | 🔴 **直接竞品**（正面对打） | Seed 未公开；用户量 <10K | 无代码/低代码 Agent SaaS Builder；模板市场 + 发布到自有域名；不做终用户计费分润 | **重叠度 ~60-70%**（模板 + 装配体验高度重合；InsForge 缺终用户计费 & 交易市场） | 正面差异化 + 正面获客；通过多出来的「B2B2C 分润 + 交易市场飞轮」打穿 |
| **[Vercel](https://vercel.com/)** | 🟡 **间接竞品 · ⚠️ 上边界风险** | 总融资 $863M · 估值 $9.3B · ARR $340M（×111% YoY） | 前端云 → AI Cloud；Next.js + Eve Agent 框架 + v0 AI UI + AI Gateway + Sandboxed VMs + Host Platform API | **重叠度 ~30%**（2024 前 0%；2025 AI Suite 后开始向上触达装配层） | 70% 深度复用（默认技术栈）+ 30% 边界防守（商业伦理硬边界是永久安全区） |
| **[Supabase](https://supabase.com/)** | 🟢 **100% 互补合作伙伴** | 总融资 $544M · 估值 $5B · ARR $70M（×4.4x YoY） | Postgres BaaS；pgvector + RLS + Auth + Storage + Edge Functions + MCP | **重叠度 <5%**（Vectoree 的数据/存储模块全靠它） | 核心后端首选；深度 API 级集成；模板底层 Schema 全部基于 Supabase SQL |
| **[OpenRouter](https://openrouter.ai/)** | 🟢 **100% 互补合作伙伴** | 总融资 $173M · 估值 $1.3B · 200T+ Tokens/月 · 8M+ 开发者 | LLM 网关 + 路由 + 模型商城 + 自研模型 + 企业控本 | **重叠度 <3%**（Vectoree 不做 LLM Gateway，直接接入） | 默认模型接入 Provider；Vercel AI Gateway + OpenRouter 双活；永不重造 LLM 路由层 |

### 1.2 价值链分层图 · 各家坐哪一层

```
┌─────────────────────────────────────────────────────────────────────────┐
│  L7 · 终用户交易市场层（Shopify App Store / App Exchange）              │  ← ✅ VECTOREE 永久独占
│    模板交易 / Skill 交易 / Connector 交易 / 自动分润结算飞轮            │     （Vercel/Supabase/OpenRouter 商业伦理不允许做）
├─────────────────────────────────────────────────────────────────────────┤
│  L6 · B2B2C 终用户计费 & 分润层（Stripe Connect 代商户体系）            │  ← ✅ VECTOREE 永久独占
│    代收款 / 自动分润 / 代报税 / Chargeback 处理 / 合规风控             │     （3 家做了 = 客户竞争对手）
├─────────────────────────────────────────────────────────────────────────┤
│  L5 · 模板装配 & 向导层（No-Code / Low-Code Wizard）                   │  ← 🛡️ VECTOREE 核心 · InsForge 重叠 60%
│    3 步装配向导 / 参数配置 / 模板市场预览 / Customer Portal           │     （Vercel v0 只出代码不出装配向导；Supabase 只做后端）
├─────────────────────────────────────────────────────────────────────────┤
│  L4 · 应用框架层                                                        │  ← VERCEL 主导（Eve + Next.js）
│    Next.js App Router / Eve Agent 编排 / RSC Streaming / PPR           │     Vectoree 模板底层直接生成 Eve 代码
├─────────────────────────────────────────────────────────────────────────┤
│  L3 · AI Suite 基础件层                                                 │  ← VERCEL 主导
│    v0 AI UI / AI SDK ChatUI / AI Gateway 模型路由 / Firecracker 沙盒  │     Vectoree 全部复用不重造
├─────────────────────────────────────────────────────────────────────────┤
│  L3 · 数据 & 后端层                                                     │  ← SUPABASE 主导
│    Postgres / RLS / pgvector / GoTrue Auth / Storage / Edge Functions │     Vectoree 默认后端 + 可插拔
├─────────────────────────────────────────────────────────────────────────┤
│  L2 · 模型接入层                                                        │  ← OPENROUTER 主导 + VERCEL AI Gateway 双活
│    400+ 模型商城 / 路由容灾 / 企业控本 / 自研模型                      │     Vectoree 统一接双 Provider 不重造
├─────────────────────────────────────────────────────────────────────────┤
│  L1 · 部署 & 基础设施层                                                 │  ← VERCEL 主导 + Cloudflare/Netlify 备用
│    Deploy Hosting / 全球 CDN / Preview URL / Host Platform API        │     Vectoree 全部 API 级集成
└─────────────────────────────────────────────────────────────────────────┘
```

**核心洞察 1**：Vercel / Supabase / OpenRouter 三家在 2024-2026 年的战略升级做了 L1-L4 四层，而且都是开源/开放 API 级，没有 Lock-in。这意味着 **Vectoree 完全不需要自建这四层**，甚至不需要写一行对应层的核心代码；我们只做 L5-L7 三件他们不会做的事，再加 L5 的差异化（InsForge 缺 L6/L7）。

**核心洞察 2**：L6-L7 两层不是技术问题，是**商业伦理问题**（3 家做了会变成客户的竞争对手，AWS 不做 Shopify 这个行业分工逻辑已经在 10 年前被验证成立）。Vectoree 可以永久安心占据 L6-L7，技术对手永远不会从这 3 家里出。

---

## 🎯 Part 2 · Vectoree 产品定位 · 一句话 + 用户画像 + 5 Why 验证

### 2.1 一句话定位（15 秒电梯版）

> **"Shopify for AI Agent SaaS" — 用 3 步向导，10 分钟上线一个能收款的 AI Agent SaaS。**

更细一点的 30 秒版：

> 你想做一个卖 AI 简历润色、卖 AI 客服、卖 AI YouTube 脚本、卖 AI 法律合同审查的 SaaS 赚钱吗？以前你要接 Stripe、接 OpenRouter、接 Supabase、接 Vercel、拼 Next.js 代码，一周起步。现在在 Vectoree 里选个模板 → 调个价 → 点上线，10 分钟后你的客户就能刷卡付你钱。

### 2.2 用户画像 3 层（从种子客户到 Enterprise）

| 段位 | 画像 | 规模 | 痛点 | Vectoree 给他的核心价值 | 付费档 |
|------|------|------|------|---------------------|--------|
| **🌱 Seed（种子客户）** | **亚洲/东欧 Indie Hacker / 单人创始人**（1 人，无公司主体，不会写代码或只会一点前端，月收入 < $2K） | 全球潜在 500K+；Supabase 81.5% 客户就在这个档位 | ① 没有美国主体申请不到 Stripe 商户号（50%+ 被拒）② 不会写全栈代码拼 SDK ③ 免费版项目一周就休眠，Demo 给 VC 看打不开 | ✅ Stripe Express 代收款（Vectoree 做主体，抽 5-7%）✅ 3 步向导，0 代码 ✅ Deploy Never Sleeps 免费项目永不休眠 | **Free（0元，交易抽 3%）** |
| **🚀 Growth（增长档主力）** | **出海 1-10 人微型 SaaS 团队**（产品经理 + 1 全栈 + 1 设计师；ARR $50K-$2M） | Supabase/Vercel 客户主流群；全球潜在 50K-100K | ① 工程师时间全用来拼 SDK 没做产品差异化 ② 多账号账单管理混乱（Vercel 30 维度计费混乱）③ 想做模板市场但没精力搭 | ✅ 打包 Vercel+Supabase+OpenRouter 配额，$49/Seat 比单独买省 25% ✅ Customer Portal 仪表盘直接看终用户收入 ✅ 一键上架自己的模板到 Vectoree 交易市场赚二次收入 | **Indie Pro $49/Seat/月（交易抽 1.5%）** |
| **🏢 Enterprise（中大型 SaaS 宿主平台）** | **Mintlify/Resend/Loops 级别的 SaaS 宿主平台** 和 **20-100 人中型出海 SaaS（ARR $1M-$10M，需要 SSO/HIPAA）** | 被 Vercel Enterprise $24K/年门槛拦在门外的那一批；全球潜在 1K-5K | ① Vercel Enterprise 门槛太高（合同 ≥$24K/年）② 自己的客户需要 Agent 插件市场，造轮子成本高 ③ SSO/SAML + HIPAA 合规拿不到 | ✅ Business $499/月含 SSO/SAML + HIPAA 打包（$6K/年，是 Vercel 门槛的 1/4）✅ 作为宿主平台的 Agent App Store 引擎，API 级嵌入宿主后台 ✅ 独立 VPC + 专属合规专员 | **Business $499/月（交易抽 1%）** + **Enterprise 定制（年单 $50K+，交易抽 0.5%）** |

### 2.3 Why Now？为什么是 2026 年做 Vectoree？

| 层级 | 为什么现在是最佳时间窗口（不会早，也不会太晚） |
|------|--------------------------------------------|
| **Why not earlier (2023-2025)** | 2023-2024：Next.js App Router 不稳定、Eve Agent 框架还没发布、Supabase pgvector 扩展 + RLS 生态不成熟、OpenRouter 模型只有 100+ 款、Vercel Host Platform API 还没发布——**四大基础设施各自都还没到 v1.0 可用度**，Vectoree 2023 做的话要自己把这四家的轮子各造一半，成本巨大。 |
| **Why 2026** | ① 2026 年 Q1 Eve 框架 1.0 发布 + v0 用户破 4M；② Supabase pgvector + Branching + MCP 成熟；③ OpenRouter 破独角兽，400+ 模型 + 企业控本体系完整；④ Vercel Host Platform API 被 Mintlify 等 2 万家客户验证过——**L1-L4 四层基础设施已经全部到 GA 成熟度**，Vectoree 做装配层的前置条件全部满足。 |
| **Why not later (2027)** | ① InsForge 已经在拿 Seed 钱推进；② Shopify 本身已经看到 AI Agent 机会（Shop Magic AI），2027 可能把 Shopify App Store 扩展到 Agent 市场；③ 3 家基础设施如果在 2027 做「官方生态合作伙伴」认证，越早入场拿越高级别认证（例如 Shopify Plus 级合作伙伴）——**先发优势窗口 18 个月，现在开跑刚好。** |

---

## 🧱 Part 3 · 四大护城河（3 家竞争对手 + InsForge 都复制不了的）

> **护城河铁律**：4 条护城河必须同时满足「技术上可以做」+「商业伦理或定位上 3 家绝对不会做」或「InsForge 做了就亏」两个条件。缺一条不叫护城河。

| 编号 | 护城河名称 | 具体内容 | 为什么 3 家不会做 / 为什么 InsForge 做不动 |
|------|---------|---------|----------------------------------------|
| 🏰 1 | **Stripe Connect 代商户分润结算网络** | 全球多币种分润 + 代收款 + 代报税 + KYC + Chargeback 风控 + 100+ 国家提现支持；Vectoree 作为 Platform 商户，开发者不用自己拿 Stripe 主体就能上线收钱 | 🔴 **3 家绝对不会做**：做了 = 直接和自己的 SaaS 开发者客户抽终用户的钱，立刻被全行业封杀（AWS 不会做 Shopify 的分润网络，商业伦理 + 行业分工逻辑）<br>🟡 **InsForge 做不动**：Stripe Connect Platform 资质需要 $1M+ 保证金 + 全球合规团队 + 风控团队，InsForge Seed 阶段资金量够不上这条线，即使拿到也要 12-18 个月才能拉到同等合规度。 |
| 🏰 2 | **100+ 垂直行业 Agent 模板 Know-How 飞轮** | 客服、求职、YouTube 脚本、法律、医疗、教育、代码审计、产品经理…每个模板预置：模型配置 + 工作流（Eve）+ 知识库 Schema（pgvector）+ 建议售价 + 终用户配额 + 行业提示词；第三方开发者上传模板拿分润 | 🔴 **3 家绝对不会做**：Vercel/Supabase/OpenRouter 定位是通用基础设施层，做 100 个垂直行业模板会分散产品精力（相当于 AWS 自己开电商卖东西），和通用平台定位不符；他们只会放 Examples，不会做「带售价的模板交易」<br>🟡 **InsForge 做得到但慢**：InsForge 也在做模板，但因为缺护城河 1（代商户分润），开发者做模板只能一次性卖授权不能拿持续交易分润——分润飞轮转不起来，供给端密度永远追不上 Vectoree。 |
| 🏰 3 | **模板/Skill/Connector 交易市场 + 分润结算飞轮** | Shopify App Store 式生态：第三方开发者上传模板/插件/Skill → Vectoree 用户一键购买安装 → 平台自动抽成（5-30%）+ 自动周结给开发者；评分、评论、担保交易、开发者结算后台全有 | 🔴 **3 家绝对不会做**：同上，做交易市场 = 和自己的生态合作伙伴直接竞争（Mintlify 自己做了文档市场，Vercel 再做一个文档模板市场就和 Mintlify 抢客户，立刻失去宿主客户）。商业伦理不允许<br>🟡 **InsForge 能做但缺护城河 1**：InsForge 本身的定价是开发者按月订阅，缺 Stripe Connect 代商户能力做「交易抽成」——没有分润的市场是死海，开发者没有持续供给动力。 |
| 🏰 4 | **面向非工程师的 3 步向导装配体验** | 选模板 → 调参数（模型档位 / 自己的定价 / 自定义域名 / 上传知识库 PDF）→ 上线收钱；完全看不到代码；后台自动翻译成 Eve + Supabase SQL + Stripe Checkout + Vercel Deploy | 🔴 **3 家绝对不会做**：Vercel/Supabase/OpenRouter 的核心用户画像就是工程师，产品路线图全部围绕工程师的高效（代码化 / CLI / Git）设计；做 No-Code 会稀释品牌心智，得罪自己的核心付费用户<br>🟡 **InsForge 也在做，这是正面战场**：这是唯一 InsForge 和 Vectoree 正面打的领域。Vectoree 的反打点是——InsForge 向导做完只能出「一个能跑的 Agent 页面」，Vectoree 向导做完能出「一个**能立刻收款**的 Agent SaaS」——差一个护城河 1。 |

---

## 🛠️ Part 4 · 技术架构总决策（复用 3 家 + 只做 4 件事）

### 4.1 Provider 可插拔总表（每一层都不绑定一家，避免单一供应商风险）

| 层级 | 默认 Provider（首选深度集成） | 备选 Provider（Secondary） | Vectoree 是否自建 |
|------|------------------------------|--------------------------|----------------|
| **部署 & 托管** | [Vercel](https://vercel.com/) Deploy API + Host Platform API | Cloudflare Pages / Netlify | ❌ 永不自建全球 CDN |
| **前端/Agent 框架** | Next.js 16 App Router + [Eve Agent Framework](https://vercel.com/blog/introducing-eve) | SvelteKit（未来备选） | ❌ 只生成模板代码，不重写框架 |
| **UI 生成** | [v0 AI UI API](https://v0.dev/) | 无（v0 领先至少 12 个月） | ❌ 永不自建 AI UI 模型 |
| **后端数据层 (Postgres + pgvector + RLS)** | [Supabase](https://supabase.com/) Management API + SQL 模板 | Vercel Postgres (Neon) / Neon 直连 | ❌ 默认 Supabase；给轻项目第二选项 |
| **用户系统 (Auth)** | Supabase GoTrue（终用户 Auth） + [Vercel Passport](https://vercel.com/docs/passport)（企业 IdP SSO） | Clerk（可外接选项，吃迁出客户） | ❌ 永不自建 Auth（除了 Vectoree 自身后台） |
| **存储 (文件/图片)** | Supabase Storage | Vercel Blob / Cloudflare R2 | ❌ |
| **模型接入 (LLM Gateway)** | [OpenRouter](https://openrouter.ai/) API（400+ 模型默认） + Vercel AI Gateway（双活路由 + 缓存） | 直连 OpenAI / Anthropic / Groq | ❌ 永不自建 LLM 路由层（参照 OpenRouter Features.md 的「7 件战略性不做的事」第一条） |
| **Serverless / Edge Functions** | Vercel Functions (Node/Go/Rust + Firecracker Sandboxes) | Supabase Edge Functions (Deno) | ❌ |
| **持久化 Agent 编排** | Eve Framework（Vercel 官方 Agent 框架） | Inngest（可选） | ❌ Vectoree 向导只输出 Eve 标准 YAML |
| **终用户支付 & 分润** | **Stripe Connect**（Express/Standard/Custom 三级） | Paddle（备用 Merchant of Record） | ✅ 唯一 Vectoree 自建核心模块：分润结算逻辑 + KYC + 对账 |
| **域名 / SSL / CDN** | Vercel（自动配） + 用户自有 DNS | Cloudflare DNS（备选） | ❌ |

### 4.2 Vectoree 自己真正要写代码的 4 个模块（100% 原创，没有 Provider 可复用）

> **记住**：Vectoree 不是基础设施公司，是**装配层 + 商业闭环层公司**。我们 90% 的代码量应该集中在下面这 4 个模块；其他层都是 API 调调用、配置拼拼接。

| 模块编号 | 模块名称 | 核心代码工作内容 | 为什么没有 Provider 能复用 |
|---------|---------|----------------|------------------------|
| **M1 🏪** | **模板装配 Wizard 引擎（向导层）** | ① 模板元数据 Schema 定义引擎（模板包含什么可配置项：模型/定价/知识库/域名…）② 3 步向导前端（React + Vercel v0 生成的 UI）③ 配置翻译管线（把用户在 Wizard 填的表单 → 翻译成 Eve YAML + Supabase SQL schema + Stripe Price API 调用 + Vercel Deploy 参数）④ 实时 Preview（Wizard 每一步都有真实 Preview URL） | 没有任何 Provider 做「从表单 → 全栈 4 层配置」的翻译器；这是 Vectoree 的产品差异化核心代码。 |
| **M2 💰** | **Stripe Connect 分润结算系统（护城河 1 + 2 核心）** | ① 开发者入驻 KYC（Stripe Express Onboarding API 封装 + 自定义风控规则）② 终用户支付事件监听（Stripe Webhook → 分润计算引擎 → 分配给：开发者% + Vectoree 抽成% + 第三方模板作者%）③ 周/月结 + 批量 Payout（全球 100+ 国家）④ 代收款（Express Mode）特殊处理 + 代报税报表生成⑤ Chargeback 处理后台 + 规则引擎 | Stripe Connect 只给 API，不给「分润规则引擎」；Shopify 有但不开放 API，必须用 Shopify 生态。Vectoree 自己写这块，是整条产品链上代码量最大、最复杂、但 Moat 最深的模块。 |
| **M3 📊** | **Customer Portal 仪表盘（终用户侧管理台）** | ① 开发者能看到自己的 Agent SaaS 的终用户列表 + MAU + Token 使用 + 收入金额（日/周/月/年）② 终用户自助管理订阅（升级/降级/取消/查 Token 用量）③ 开发者一键导出 Stripe + Supabase + Vercel 的三账合一账单④ 代收款商户的报税报表导出 | Vercel/Supabase/Stripe 三家的仪表盘都是给**开发者看自己的资源用量**，没有一家做「**开发者看终用户给他付了多少钱**」的仪表盘。 |
| **M4 🛍️** | **交易市场生态引擎（模板 / Skill / Connector）** | ① 开发者上传模板/Skill/Connector 后台（含版本管理、测试环境、代码安全扫描）② 买家浏览/搜索/评分/评论系统（Shopify App Store UI 级别）③ 购买后的一键安装到买家的 Vectoree 项目（调用 M1 配置翻译管线）④ 自动分润结算（接入 M2：每笔收入自动分给模板作者 + Vectoree 平台）⑤ 开发者结算后台（提现、看月度报表、税务文档） | 3 家基础设施的 Examples/Gallery 都是**免费下载代码**，没有「付费交易 + 自动安装 + 分润」功能。GitHub Marketplace 有交易但不卖「全栈 Agent SaaS 模板 + 一键安装 + 分润」这种垂直品类。 |

---

## 💸 Part 5 · 定价模型（透明 Pass-through + 平台利润只来自 2 处：订阅 + 交易抽成）

### 5.1 4 档定价总表

| 维度 | **Free（🌱 Indie）** | **Pro（🚀 Growth）** | **Business（🏢 Mid-Market）** | **Enterprise（🏛️ Big）** |
|------|-------------------|-------------------|----------------------------|----------------------|
| **月费** | $0 | $49 / Seat / 月 | $499 / 月（含 10 Seats，额外 $39/Seat） | 定制（年单 ≥ $50K） |
| **打包 Provider 配额（Pass-through 不加价）** | Vercel Hobby 级（Unlimited 项目，100GB Egress） + Supabase Free（永不自动休眠 Vectoree 帮你 Resume） + OpenRouter $5 Credits | Vercel Pro 配额（1TB Egress） + Supabase Pro（$25 值，永不休眠） + OpenRouter $20 Credits | Vercel Team 配额（10TB Egress） + Supabase Team（$599 值） + OpenRouter $200 Credits + Vercel Passport SSO/SAML | 独立 VPC + 专属 Supabase Instance + 定制 OpenRouter 企业合同 + 独立合规 |
| **Deploy Never Sleeps（免费项目永不休眠）** | ✅ 所有 Production 项目，Vectoree 定期 Warm-up + 自动 Resume Supabase | ✅ 全量 + 独立预热池 | ✅ 企业级 SLA 99.99% | ✅ 定制 SLA 99.995%+ |
| **Stripe Express 代收款（无美国主体开发者）** | ✅ **可用** · 交易抽成额外 +7%（Vectoree 做主体代报税） | ✅ 可用 · 额外 +5% | ✅ 可用 · 额外 +3% | 🚫 不提供（企业客户自己有 Stripe 主体） |
| **Stripe Standard（开发者自己主体）交易抽成** | 3%（上线赚钱再扣） | **1.5%**（比 Shopify Payments 2.9% + $0.30 低） | **1%** | **0.5%**（定制） |
| **Customer Portal 仪表盘** | ✅ 标准版 | ✅ 高级版（终用户用量 + 收入 + 导出） | ✅ 企业版（多项目聚合 + API） | ✅ 定制报表 + 数据仓库同步 |
| **模板交易市场权限** | 👁️ 只能买模板（发布模板要先升级） | 🏪 可以上传模板卖（赚被动收入） | 🏪 私有模板市场（给团队自己用） | 🏪 白标交易市场（宿主平台嵌自己后台） |
| **SSO/SAML + HIPAA 合规** | 🚫 | 🚫 | ✅ **打包包含**（对标 Vercel Enterprise $24K/年门槛的 1/4 价格） | ✅ + 独立合规审计 + BAA |
| **是否 Lock-in** | ✅ 代码永不 Lock-in，随时导出 ZIP 部署到你自己的 Vercel | ✅ 同左 | ✅ 同左 + 独立 DB 导出 | ✅ 专属代码仓，100% 客户自管 |
| **目标客户群** | 单人 Indie Hacker / 无 Stripe 主体 / 冷启动验证 | 1-10 人出海团队 / 月收入 $1K-$50K SaaS | 20-100 人出海 SaaS / SaaS 宿主平台 | 大型 SaaS 宿主 / 大型出海集团 |

### 5.2 定价铁律（两条红线，永不突破）

1. **红线 1（模型 + 基础设施费用 100% Pass-through，不加暗点）**：
   - OpenRouter Token 原价 + Supabase 原价 + Vercel 原价，用户在 Vectoree 后台能看到每一笔底层费用的明细；Vectoree 不在里面加哪怕 1 分钱。
   - **为什么**：OpenRouter 就是靠「Token 直通 + 手续费透明 5.5%」从 2025 年起建立的信任感（OpenRouter Pricing.md 里的战略转型）；Vectoree 同样要建立这种透明信任感。
2. **红线 2（Vectoree 平台利润只来自两个透明口袋）**：
   - **口袋 1：订阅费**（$0 / $49 / $499 / 定制）
   - **口袋 2：交易抽成**（终用户付费 Vectoree 抽 0.5-3%；代收款额外抽 3-7%；模板市场交易抽 5-30% 分给作者+平台）
   - 没有第三个暗收入来源（不卖用户数据、不在底层加暗点、不做定向广告）。

---

## 🚀 Part 6 · 冷启动获客路径（从 0 → 1000 付费客户的 18 个月路线）

### 6.1 冷启动 3 条精准渠道（不投品牌广告，全是精准 ROI 驱动）

| 渠道 | 具体动作 | 预期转化 | 优先级 |
|------|---------|---------|--------|
| **🎯 渠道 1：Supabase 官方 `nextjs-subscription-payments` 模板仓库截流（最高 ROI）** | GitHub repo 有 8K+ Stars，每天 Issue/Discussion 区至少 20-30 个新问题都是「怎么加计费 / 怎么接 Stripe / 怎么从 Demo 上线收钱」；写一篇官方级别 Tutorial 《Turn your Supabase + Next.js Project into a Monetizable Agent SaaS in 10 min》，放 Issue/Discussion 区+ Supabase Discord + Vercel Discussions | 单篇文章 → 5000 UV → 5% 注册 → 5% 转 Pro = **12 个付费客户**，单次成本 ≈ 一篇文章时间。 | P0 · Week 1-2 发布 |
| **🎯 渠道 2：Vercel v0 用户群精准定向** | v0 有 4M+ 用户；真实工作流是「v0 生成 UI → 自己接后端接 Stripe 再花 2 天」；在 v0 Discord + Twitter（现在叫 X）上做「Import to Vectoree 一键把 v0 UI 变成可收钱 SaaS」Demo 视频；提前和 v0 团队谈 Partner 做官方 Import 入口 | 官方 Partner 入口 → 月均 10K UV → 3% 注册 → 3% 转 Pro = **9 付费/月**；非官方内容营销 → 月均 1K UV → 同转化 = 1 付费/月。 | P1 · Week 3-6 推进 |
| **🎯 渠道 3：无 Stripe 主体的亚洲/东欧 Indie Hacker 社群（出海论坛 / Discord）** | 全球范围内大量东南亚、印度、东欧、中国大陆的开发者有产品能力但申请不到 Stripe（拒率 50%+）；Indie Hacker 中文站（即刻出海群）、Reddit r/saas、Hacker News、Indie Hackers 论坛定向推「Vectoree Stripe Express 代收款服务 — 没有美国主体也能上线收美元」 | Reddit/IH 单帖爆款 → 10K UV → 8% 注册（痛点够强）→ 6% 转 Free 生成收入 = **48 代收款客户**。 | P0 · Week 2-4 启动 |

### 6.2 冷启动里程碑（v1.0 GA 前 6 个月）

| 阶段 | 时间 | 核心目标 | 关键验收指标 |
|------|------|---------|------------|
| **M0 · MVP 内测** | 第 1-2 个月 | M1（Wizard）+ M2（分润最小可用版）跑通 10 家种子客户 | ✅ 10 家种子客户每家在 Vectoree 上线一个真收钱的 Agent SaaS<br>✅ 累计终用户收入 $1K+<br>✅ Stripe Connect API 无 Bug |
| **M1 · v0.5 公测** | 第 3-4 个月 | +M3（Customer Portal）上线；模板市场首批 20 个官方模板 | ✅ 100 家注册客户<br>✅ 20 个模板（至少覆盖 10 个垂直行业）<br>✅ 累计终用户收入 $10K+<br>✅ 交易抽成流水过 $500 |
| **M2 · v0.9 GA 前最后验证** | 第 5-6 个月 | +M4（交易市场）上线；Vercel + Supabase + OpenRouter 三家 Partner 认证拿到 | ✅ 三家 Partner Badge 全挂首页<br>✅ 500 家注册客户<br>✅ 第三方模板作者 ≥ 20 人 + 非官方模板 ≥ 30 个<br>✅ 月交易流水 ≥ $10K<br>✅ 商业合规：Stripe Connect Platform 资质 + PCI SAQ A 到手 |
| **M3 · v1.0 GA 正式发布** | 第 7 个月 | 全产品 v1.0 发布 + 定价页面上线 + 渠道 1-3 全量推开 | ✅ 月度新注册 ≥ 2000 家<br>✅ 付费客户（Pro+Business）≥ 100 家<br>✅ 月交易流水 ≥ $50K<br>✅ 社区评分 ≥ 4.5/5（G2 / Product Hunt） |

---

## 📅 Part 7 · 季度里程碑路线图 v1.0（18 个月规划）

### Phase 1 · 基础建设 & PMF 验证（Q3-Q4 2026，6 个月）
核心目标：**4 模块 MVP 全部上线 + 100 付费客户 + PMF 验证（40% 留存率）**

| 月份 | 关键交付 |
|------|---------|
| **2026-08（现在）** | 本洞察文档定版 + 技术架构定版 + 4 模块代码架构设计启动；同步提交 Vercel/Supabase/OpenRouter Partner 申请 |
| **2026-09** | M1 模板装配 Wizard MVP（支持 5 个预置行业模板 + 生成 Next.js/Eve 代码 + 一键 Vercel 部署）+ Stripe Connect Platform 资质申请提交 |
| **2026-10** | M2 分润结算 MVP（支持 Stripe Standard 交易抽成）+ 10 家种子客户内测；渠道 3 第一批内容发布 |
| **2026-11** | M3 Customer Portal MVP（开发者看收入）+ Deploy Never Sleeps 功能上线（自动 Resume Supabase）+ 渠道 1 Tutorial 发布 |
| **2026-12** | M4 交易市场 MVP（20 个官方模板 + 支持第三方上传）+ PCI SAQ A + SOC 2 Type I 启动；Stripe Express 代收款 Beta |
| **2027-01** | v0.9 公测；3 家 Partner 认证拿到挂首页；Pro $49 / Business $499 定价上线；PMF 调查（NPS + Sean Ellis Test） |

### Phase 2 · 增长飞轮启动（Q1-Q2 2027，6 个月）
核心目标：**1000 付费客户 + 模板市场第三方密度达临界点 + 月交易流水 ≥ $500K**

| 季度 | 关键交付 |
|------|---------|
| **Q1 2027** | v1.0 GA 正式发布 + Product Hunt 上线（目标 Top 3 of the Day）；Business $499 档（SSO/SAML + HIPAA）上线；v0 Import 官方入口上线（如 P1 合作成功） |
| **Q2 2027** | 宿主平台嵌入模式（Mintlify/Resend/Loops 级合作）Beta；交易市场模板量 ≥ 500 个，第三方作者 ≥ 200 人；月度新注册 ≥ 10K |

### Phase 3 · 平台化 & 生态护城河加固（Q3-Q4 2027，6 个月）
核心目标：**5000 付费客户 + 年交易流水 ≥ $10M + 准备 Series A**

| 季度 | 关键交付 |
|------|---------|
| **Q3 2027** | Enterprise 白标方案上线（宿主平台自定义交易市场）；全球税务合规扩展到 50+ 国家；A 轮材料准备 |
| **Q4 2027** | ARR ≥ $3M + 年交易流水 ≥ $10M；社区驱动：Vectoree Conf 第一届开发者大会；Series A 融资启动 |

---

## 📋 Part 8 · 5 大风险防御清单（与 4 家 SWOT 的 Threat 一一对应）

| 风险编号 | 风险描述 | 触发方 | 概率 | 防御策略（与各 SWOT Threat 对齐） |
|---------|---------|--------|------|------------------------------|
| R1 | **Vercel 内置 Stripe Connect 一键 Agent SaaS 按钮** | Vercel T1 | 低（<10%）但影响极大 | ① 商业伦理护城河（Vercel 99% 收入来自开发者订阅，做 Connect 抽成等于得罪全部客户）② 官方 Partner 绑定，成为 v0 Import 官方出口，Vercel 自己不做而由 Vectoree 做（双赢）③ 100 垂直模板密度 6 个月做够，跟进 ROI 变负 |
| R2 | **InsForge 拿到大融资 + 补 Stripe Connect 能力** | InsForge（直接竞品） | 中（40%） | ① InsForge 补 Connect 至少 12-18 个月合规时间，我们提前建密度② 3 家 Partner 联合品牌背书碾压（Vectoree = 官方生态推荐，InsForge = 独立竞品）③ 模板市场供给端密度 InsForge 永远追不上 |
| R3 | **单一供应商故障传导（Vercel 宕机 4h / Supabase 区域封禁 40 天 / OpenRouter 涨价）** | 3 家任意 | 中高（70% 至少发生一次） | ① **Provider 可插拔强制要求**：每一层都有 Primary + Secondary；部署层 Vercel/CF，后端层 Supabase/Vercel Postgres，模型层 OpenRouter + Vercel AI Gateway 双活；支付层 Stripe + Paddle 双主② 故障时 1 小时内切换的 Runbook 提前写好，季度故障演练 |
| R4 | **Shopify 扩展 App Store 到 AI Agent 通用场景** | Shopify（新进入者） | 低（20%） | ① 市场分层卡位：Shopify = 商品电商商家；Vectoree = 纯数字 SaaS / 通用垂直 Agent；两边不冲突② 必要时主动集成 Shopify：Vectoree 模板作为 Shopify App 上架，利用 Shopify 4M+ 商家获客 |
| R5 | **Clerk 推出一体化 Clerk Billing + 代收款产品** | Clerk（间接） | 中（35%） | ① Vectoree 默认用户系统 = Supabase Auth + Vercel Passport，Clerk 只做外接选项② 定向吃 Clerk 涨价迁出客户：迁移指南 + 1 个月 Pro 免费 |

---

## 📚 Part 9 · 交付物总索引（所有已完成工作的导航）

> 所有竞品调研文档、产品洞察、后续规划，全部可以从这里跳转。

| 分类 | 文档 | 路径 | 状态 |
|------|------|------|------|
| **直接竞品** | InsForge（4 文档） | [Profile](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Insforge/Profile.md) / [Features](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Insforge/Features.md) / [Pricing](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Insforge/Pricing.md) / [SWOT](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Insforge/SWOT.md) | REVIEW 1.0 |
| **间接竞品 1 · 模型层** | OpenRouter（4 文档） | [Profile](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/OpenRouter/Profile.md) / [Features](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/OpenRouter/Features.md) / [Pricing](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/OpenRouter/Pricing.md) / [SWOT](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/OpenRouter/SWOT.md) | REVIEW 1.0 |
| **间接竞品 2 · 后端层** | Supabase（4 文档） | [Profile](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Supabase/Profile.md) / [Features](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Supabase/Features.md) / [Pricing](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Supabase/Pricing.md) / [SWOT](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Supabase/SWOT.md) | REVIEW 1.0 |
| **间接竞品 3 · 部署层（⚠️ 上边界风险）** | Vercel（4 文档） | [Profile](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Vercel/Profile.md) / [Features](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Vercel/Features.md) / [Pricing](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Vercel/Pricing.md) / [SWOT](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Vercel/SWOT.md) | REVIEW 1.0 |
| **🏆 综合洞察 & 规划（本文档）** | 产品洞察与后续规划思路 v1.0 | [01_Product/Product_Insights_&_Roadmap_v1.0_20260814.md](file:///Users/yuke/Documents/pm-workspace-vect/01_Product/Product_Insights_%26_Roadmap_v1.0_20260814.md) | REVIEW 1.0 |
| **标杆产品** | Vectoree 标杆解构报告 | [20260813_Vectoree_Product_Deconstruction_Report.md](file:///Users/yuke/Documents/pm-workspace-vect/01_Product/00_Overview/20260813_Vectoree_Product_Deconstruction_Report.md) | REVIEW 1.0 |
| **知识库根索引** | README.md（目录结构 + 规范） | [README.md](file:///Users/yuke/Documents/pm-workspace-vect/README.md) | FINAL |

---

## ✅ Next Action（马上要做的 3 件事，优先级排序）

| 优先级 | 动作 | 负责模块 | 时间节点 |
|--------|------|---------|---------|
| 🔴 P0 | 提交 **Vercel Technology Partner + Supabase Partner + OpenRouter Partner** 三家合作伙伴申请（首页挂 Badge + 联合内容分发是冷启动根基） | 商务 / PM | 本周内（2026-08-21 前） |
| 🔴 P0 | 输出 **M1 模板装配 Wizard 的技术规格说明书 v0.1**（模块代码结构 + 5 个种子模板的 Schema 定义 + 配置翻译管线设计） | 工程 / 架构 | 2026-08-31 前 |
| 🟡 P1 | 提交 **Stripe Connect Platform 资质申请**（需要美国主体 + $1M 保证金或替代方案；同步评估是否走 Stripe Express 聚合模式先跑 MVP） | 法务 / 商务 | 2026-09-15 前 |

---

> **最后再记住一句话（所有决策的北极星指标）**：
> 
> **如果 Vercel/Supabase/OpenRouter 三家能做 Vectoree，他们 3 年前就做了。他们不做，不是不会，是不能（商业伦理不允许）。Vectoree 就站在这个「不能」里面，把 Shopify 十年前在电商领域做过的事，在 AI Agent SaaS 领域再做一遍。**

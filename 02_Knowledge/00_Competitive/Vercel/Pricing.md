---
title: "Vercel - Pricing"
description: "Vercel 间接竞品定价分析：套餐档位、隐性计费逻辑、AI Suite 加项 + 对 Vectoree 定价的启示"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://vercel.com/"
tags: ["competitor", "vercel", "pricing", "indirect", "deployment", "ai-cloud", "nextjs", "usage-based"]
owners: ["PM"]
sources: ["https://vercel.com/pricing", "https://vercel.com/docs/pricing", "https://workflowautomation.net/reviews/vercel", "https://sacra.com/c/vercel/"]
pricing_last_verified: "2026-08-14 (official pricing page + docs + real-user review cross-checked)"
---

# Vercel · 定价分析（间接竞品）

> 定价定位：**Hobby（免费个人）/ Pro（按人按用）/ Enterprise（定制）** 三档，整体是 **Seat 订阅 + 大量 Usage-based Add-ons** 的混合模式；其中 **Hobby 是获客引擎（业界最慷慨的免费版）、Pro 是主力收入（$20 / Seat / 月 + 用量溢出）、Enterprise 是品牌背书 + 大客合同**。
>
> 对 Vectoree 的锚点：**Vercel Pro $20 / Seat / 月 + Supabase Pro $25 / 月 + OpenRouter 5.5% 手续费 ≈ Indie SaaS 生产最低技术栈月费基准**。Vectoree Indie Pro 档位要在这个基准之上加 30-50% 打包优惠价，并把「B2B2C 分润 + 模板装配 + Customer Portal」这些独家价值做进去。

---

## 💰 定价结构总览

```
Organization-level Billing（组织级统一开票，与 Supabase 同哲学）
├─ Plan Base（按档位 + 按人头 Seat）
│   ├─ Hobby       $0        / 1 Seat（永久免费个人）
│   ├─ Pro         $20/Seat/月  + $120 团队 Pro Tote 额外 Team Pro（可选）
│   └─ Enterprise  定制 Contact Sales（≥ $2000/月合同起，行业经验值）
├─ Managed Infrastructure（按用量计费，Hobby 含免费额度，超了升级，Pro 可按需付）
│   ├─ Functions（Active CPU / Provisioned Memory / Invocations 三维）
│   ├─ Edge Functions / Edge Config（KV 级配置读写）
│   ├─ Image Optimization（Transformations / Cache）
│   └─ Bandwidth Egress（全球出口流量）
├─ Durable Backends（持久化后端，按独立产品计费）
│   ├─ Durable Postgres（Compute + Storage + I/O 三层，基于 Neon）
│   ├─ KV（Redis 兼容，读/写/存储三维）
│   ├─ Blob（S3 兼容，存 + 流 + 写三维）
│   └─ Cron（Edge Function + 基础免费）
├─ AI Suite 增值（v0 / AI Gateway / Sandboxes 独立计费）
│   ├─ v0（$20/mo Pro 档 → 另有团队 / 企业档）
│   ├─ AI Model Gateway（模型费用 Pass-through + 平台缓存/限流免费）
│   └─ Sandboxed VMs / Eve（按 Compute 用量，未公开独立价）
└─ Observability + Security 加项
    ├─ Web Analytics Plus（$250/年起，24 月事件留存）
    ├─ Observability Plus（$1.20 / 1M Events 2026 新品）
    ├─ Log Drains（$0.50/GB 流出）
    └─ WAF + Preview Protection（Enterprise）
```

---

## 📦 三档主套餐横向对比（Base Plan）

| 项目 | **Hobby（Free）** $0 | **Pro（Team Pro）** $20 / Seat / 月（团队另 + $120/月 Team Pro） | **Enterprise** 定制 |
|------|----------------------|-----------------------------------------------------------------|-------------------|
| 适合人群 | 个人开发者 / 作品集 / Demo | 1-20 人小团队生产环境 | 20+ 人 / 合规 / 大流量 / 白标 / 专属节点 |
| **Seats（开发席位）** | 1 Owner（不可多人） | 按 Seat 购买，最小 1 Seat，通常 2-20 | 定制，≥25 Seats |
| **部署项目数** | **Unlimited 个人项目** | Unlimited（所有 Pro 档位都是） | Unlimited |
| **Preview Deployments 预览 URL** | 无限 PR，每个分支一个预览 URL | 无限 PR + 预览 Protection 可选 | 无限 + Preview SAML SSO |
| **Custom Domains 自定义域名** | 免费版支持，自动 HTTPS，数量 Unlimited | 免费，支持 Wildcard（付费档解锁） | Unlimited + 白标子域名 |
| **并发 Builds** | 1 个并发 Build | 6 个并发 Builds（默认，可加） | 定制，20+ |
| **Functions（Serverless）免费含** | Hobby 4h Active CPU / 360 GB-hrs Memory / 1M Invocations/月 | Pro 团队档有团队共享 Usage Credit；超出可按 Region 续购 | 企业合同级配额 |
| **Edge Functions** | 100万次/月 Invocation / 500K Edge Config Reads | 超出按需付费，按 Region 分层 | 定制 |
| **Durable Postgres（数据库）** | Hobby 级：500MB 磁盘 + 共享 CPU + 冷项目 Scale-to-0（与 Neon Free 同规格） | Neon Team 级：1–20 个 Branch 可建 + 10 GB Disk + Pro 专用 CPU | 专属 VPC + 无限存储 |
| **KV / Blob / Cron** | 256MB KV + 1GB Blob / 100K KV Reads / 月 | KV 超量 $0.10 / GB-hrs 存 + $1.00 / M writes + $0.50 / G reads；Blob 超量 $0.06 / GB 月存 + $0.01 / M 写 + $0.50 / G 流 | 企业合同级 |
| **Image Optimization** | Hobby 含 5K Transforms/月 + 300K Cache Rds + 100K Cache Wrs | Pro 起按需 $0.05 – $0.0812 / K Transforms + Cache 读写分级 | 企业级价格 |
| **Bandwidth Egress（全球流量）** | Hobby **100 GB / 月**（业界最慷慨免费版） | Pro 1 TB / Seat 免费，超量 $0.05 – $0.09 / GB（按区域分层） | 定制 TB 级 |
| **SSO / SAML（企业身份）** | ❌ | ❌（Pro 只有 Invite Link / GitHub OAuth） | ✅ 自定义 SSO/SAML + Passport IdP 集成 |
| **合规认证** | ❌（只适合非生产） | SOC 2 Type II（自有 Vercel 层面）；客户数据合规自己负责 | SOC 2 / ISO 27001 / GDPR DPA / HIPAA BAA / Dedicated Infra |
| **Support（技术支持）** | Community Discord（仅论坛） | ⭐ Pro 专属 Email Support（官方承诺 P95 <48h） | ⭐⭐⭐⭐ 7×24 + Dedicated CSM + Slack 直连 |
| **Usage 用量超额后行为** | 软配额 → 超了会停 Functions 并提醒升级，不会产生惊喜账单 | **按需自动计费（On-demand）**，信用卡每月自动扣，超额无硬停 | 合同级硬配额 + 预警 + 企业信用账单 |

---

## 📊 AI Suite 独立定价（Vercel AI 时代的新增收费项）

> 这部分是 2024-2026 新增的，Hobby 含试用额度，Pro 用户通常要再开订阅。

| AI 产品 | Hobby 免费试用 | Pro 起订阅 | 超额费 | 备注 |
|---------|---------------|-----------|--------|------|
| **v0（AI UI 生成器）** | 200 次生成 / 月；含 Push to GitHub Branch；UI 组件可导出 React 代码 | **v0 Pro：$20 / 月 / Seat**（1,000 次生成；更快模型；高并发）；**v0 Enterprise：Contact Sales** | 超量生成 $0.03 / 次（约 $30 / K） | 4M+ 用户；本身已形成 $50M+ ARR 独立产品线；对 Vectoree UI 生成模块是参考锚点 |
| **AI Model Gateway** | 无独立订阅；模型 Token 费 Pass-through + 限流 + 缓存 + Failover 完全免费 | 同 Hobby 规则，Token 费完全按模型官网原价 | Prompt / Response Cache 省 30-60% 成本（免费能力）；Observability 看 Token 消耗 + 延迟面板（免费） | 与 OpenRouter 5.5% 手续费模式不同：**Vercel 不在 Token 上加价，靠 Functions / Compute / 订阅赚钱** |
| **Sandboxed VMs（Firecracker 沙箱）** | Hobby 级 1000 沙箱小时 / 月免费（约每小时 $0.01 CPU 基准估算） | Pro Team 超出按 Fluid Compute 费率，约 $0.02-$0.05 / hr-vCPU | 未明码，按 Fluid 计算量统一计费 | Coding Agent 必需；对 Vectoree Coding Agent 模板是成本参考锚 |
| **Eve Agent 框架** | 开源免费；计费通过底层 Durable Backends + Sandboxes 收 | 与 Hobby 规则一致；随用随付 | 无独立订阅费 | 2026 新品，还在快速迭代 |

---

## 🖥️ Durable Backends 细化费率（参考 Neon Pro，因为 Vercel Postgres 基于 Neon）

| 层级 | Compute（运行时） | Storage（持久化磁盘） | I/O（读写吞吐） | 备注 |
|------|-----------------|-------------------|----------------|------|
| **Hobby Free（同 Neon Free）** | 共享 CPU，冷项目 5 min 无活动 Scale-to-0；每月 Pro 时长 有限 | 500 MB | 1 GB / 月 I/O | 只能建 1 个 Branch；适合 Demo |
| **Pro（Launch / Scale）** | Launch：$19/月 起含 1 vCPU + 4 GB RAM，秒级自动 Branch；Scale：$69/月起 4 vCPU + 16 GB RAM | 10 GB 含 + $1.50/GB 超量 | 10 GB I/O 含 + $0.15 / GB 超量 | 实际生产最小配置 Launch $19/月通常够用；10 人小团队 SaaS 大约 $30-80/月 Postgres |
| **Enterprise** | 专属 VPC / GPU / 裸金属；定制小时费率 | 100GB+；HA 跨区域 | 合同级 TCO | 大型企业合规场景 |

---

## 📉 真实用户计费示例（3 个画像 · WorkflowAutomation 评测真实账单拆解）

> 注：以下示例为 Pro 档 2 Seat（通常是 Indie 1 Owner + 1 Contributor = $40/月 Pro 基础），额外列出各项加项。

### 画像 1：Indie Hacker 上线 MVP（1 个 Next.js SaaS 小流量）
| 项 | 配置 / 用量 | 月费估算 |
|----|----------|---------|
| Plan Base | Pro 1 Seat = $20（Owner 一个人） | $20 |
| Functions + Edge | 在免费额度内（1000 MAU 内流量不高） | $0 |
| Durable Postgres | 小团队 Launch $19/月（Pro 级别最低档） | $19 |
| KV + Blob | Hobby 配额内（Session Cache + 少量 PDF） | $0 |
| Bandwidth Egress | 20 GB（在 1 TB Pro 配额内） | $0 |
| Image Optimization | 1000 次（5 K 额度内） | $0 |
| v0 | v0 Pro 订阅（快速生成 UI，Indie 常见） | $20 |
| AI Gateway Tokens | 开发者自己接 Stripe/OpenAI 账单，不在此列 | $0（不在 Vercel 列） |
| **合计月度总账单** | | **≈ $59 / 月** |

### 画像 2：YC Pre-A 团队（8 Seats，中流量 SaaS 带 AI 聊天）
| 项 | 配置 / 用量 | 月费估算 |
|----|----------|---------|
| Plan Base | Team Pro 8 Seats × $20/Seat + $120 Team 费 = $160 + $120 | $280 |
| Functions + Edge | 中等流量：20M Invoc. / 120h CPU 超量 | ~$150 |
| Durable Postgres | Scale Tier $69/月 + 超 40 GB Disk（$1.50 × 30 GB = $45） | ~$114 |
| KV / Blob / Cron | KV Cache 读 30M × $0.50/G；Blob 100 GB 存 + 500G 流量 | ~$90 |
| Bandwidth Egress | 3.5 TB 总流量（8 Seats × 1 TB = 8 TB 配额内？实际 3.5 TB 在 8TB 内） | $0（配额内） |
| Image Opt + Analytics | 60K Images × $0.05/K = $3；Analytics Plus（Pro 含） | $3 |
| v0 × 4 Seats + AI Gateway 缓存 | 4 × $20 v0 = $80；AI Gateway 免费（Pass-through） | $80 |
| **合计月度总账单** | | **≈ $717 / 月** |

### 画像 3：中大型 SaaS（Mintlify 级宿主平台，2 万家客户）
| 项 | 配置 / 用量 | 月费估算（参考级） |
|----|----------|-----------------|
| Enterprise Contract Base | 年度合同，50+ Seats + Dedicated Infra + Passport SSO + WAF + SLA | $25K / 月起（行业经验值） |
| Host Platform API 子项目 | 20K 子项目独立域名 / SSL / 隔离环境 + Custom Domains API | 按量加项，合同内打包 |
| Global Edge Functions Egress | PB 级全球流量，Dedicated 独享池 | 合同级打包 |
| Durable Postgres / KV / Blob | 专属 VPC + HA 跨区域；TB 级存储 + 100TB 月流量 | 合同级打包 |
| v0 Enterprise AI / Eve / Sandboxed VMs | 内部团队 + 宿主客户用沙箱 | 合同级 Enterprise 许可 |
| **合计年度总合同**（估算） | **$300K – $800K / 年 ARR**（大客户 Mintlify / Resend / Loops 级别） | — |

---

## 🔍 定价策略拆解（Why Vercel 这么定价？）

### 1. 「Hobby 是免费获客引擎」—— 业界最慷慨免费版
- **Unlimited 项目 + Unlimited 自定义域名 + 100 GB Egress / 月**：对 Indie Hacker 来说甚至可以把作品集 + 3 个小产品永远跑在 Hobby 上而不花钱（只要流量不爆）。
- 对比 Supabase Free：2 项目上限 + 1 周自动休眠，体验差 10 倍。
- **对 Vectoree 的启示**：**Vectoree Free Plan 对标 Vercel Hobby 的慷慨度**：Unlimited 草稿项目 + 有限个永不休眠 Production 部署 + 集成 Hobby 级 Supabase/Vercel 的免费额度 — 让 Indie Hacker 有「Vectoree Free = 可以真的上线东西，不是玩具」的强认知。

### 2. 「Pro 按 Seat + 大量按需加项」—— 可预测 + 随团队增长自然 upsell
- $20/Seat 是出海小团队的心理甜点（每人每天 $0.66，一杯咖啡不到）。
- Functions/Postgres/KV/Image/Egress 全部是按实际使用量付费，**不会像 Firebase 那样有爆单惊喜（因为超了直接升级，默认不自动扣，Pro 档的话才 On-demand 扣）**。
- **对 Vectoree 的启示**：**Indie Pro 单 Seat 月费锚 $29 或 $49/月**，包含打包好的 Supabase Pro ($25) + Vercel Deploy + OpenRouter Credits ($20-$30)；看起来单独买这些要 $70+，打包只要 $49，锚定心理价位。

### 3. 「Token Pass-through + 缓存/限流免费」—— 和 OpenRouter 5.5% 手续费模式差异化
- Vercel 不在 AI Gateway 的 Token 上加一分钱，全走模型厂商原价 Pass-through；**Prompt/Response Cache、语义缓存、限流、Failover 全免费**。
- 利润模型是：你用 AI Gateway 的时候一定会跑 Edge Functions，而 Functions 的 Active CPU 才是 Vercel 赚钱的地方。
- **对 Vectoree 的启示**：**Vectoree 模型层同样走 Pass-through 透明，不要加暗点**。平台价值体现在：「装配 + 部署 + 面向终用户的 B2B2C 计价与分润」（这是 Vercel / OpenRouter 都不会做的）。

### 4. 「v0 独立订阅」—— AI UI 生成已经变成一个可独立收费的 SKU
- v0 已经 $20/月独立订阅，4M 用户 + $50M+ ARR。
- **对 Vectoree 的启示**：**「AI UI 自定义生成」可以在 Vectoree 做增值项**。模板基础版 Free/Pro，用户想「定制 UI 风格」时在向导里点一下用 v0 生成，额外消耗 Vectoree Credits 或作为 Pro 档 N 次免费。

---

## 🚨 隐性成本 & 客户异议点（Vectoree 要避免的坑）

| 坑项 | 说明 | 风险等级 | Vectoree 规避方式 |
|------|------|---------|----------------|
| **Usage-based 多维度叠加，账单不好预测** | 同时按 Functions（3 维）+ Postgres（3 维）+ KV（3 维）+ Blob（3 维）+ Image（3 维）+ Egress 计费；用户每月账单常常 "$20/Seat 以为只要 $40，结果变 $300+"。WorkflowAutomation 评测里最常见的投诉就是 "Pricing Transparency 只有 8.0/10" | ⚠️ 高（Pro 档用户最大痛点） | Vectoree Indie Pro 档做「**打包月费，含固定配额，超了软配额预警，不自动扣**」：比如 $49/月含 100K End-User MAU + 500万 Tokens + 20 GB Egress，超了只发邮件提醒不自动扣费；把多维度复杂度封装掉 |
| **Durable Postgres 超 Disk 费 $1.50/GB 月**（未宣传，实际常超） | 很多小团队做 SaaS 含文件 + RAG 向量，Postgres DB 2-3 个月就涨 30-50 GB，每月 $45 超支是常态 | ⚠️ 中高 | Vectoree 模板默认把大文件/向量存在 Supabase（支持 8 GB quota 内免费 + pgvector 成熟）或 Vercel Blob（便宜），不堆在 Postgres 主表磁盘里；给用户做「存储成本优化最佳实践」 |
| **Hobby 冷项目 5 分钟 Scale-to-0，首请求冷启动 2-3s** | Hobby Postgres + Functions 同时 0→1，偶尔冷启动慢到 5s，用户体验差 | ⚠️ 中（Portfolio 展示站被吐槽） | Vectoree Free 版首访前自动 Warm-up（通过全球健康检查预热）；Pro 版 Postgres 选 Launch Tier 常驻，Function 有 Provisioned Concurrency 常开，0 冷启动 |
| **v0 只生成代码不生成业务闭环** | 用户花 $20/月 v0 生成了好看的 UI，但接 Stripe Checkout + Supabase + 定价 + 部署还要自己拼 5 家 SDK；非工程师根本搞不定 | ⚠️ 中（Vercel 用户最大的「还差点什么」感） | **Vectoree 模板 + v0 集成**：「v0 生成 UI → Vectoree 一键装配接 Stripe + Supabase + 域名 + 上线收款」，完成最后 1 公里 |
| **Team Pro Tote $120/月强制收费**（多人团队场景容易忽略） | 多人团队不是 Seats × $20 就完了；Team Pro 功能还要再加 $120/月的基础费；账单瞬间翻倍 | ⚠️ 中高（YC 小团队常踩） | Vectoree Team 档不要搞隐性的 Team 基础费，明牌 Team 档 $X99/月含 N 个 Seats |
| **Enterprsie 门槛高（合同 ≥ $2000/月）** | 20-100 人的中型出海 SaaS，需要 SSO/SAML 但 Enterprise 合同要 $20K/年起步，很多客户被卡在门外 | ⚠️ 中（中型出海客户被拦） | Vectoree Business 档明码标 $499/月起（含 SSO/SAML + 基础 HIPAA 合规），不要强制 Contact Sales |

---

## 🧠 与 Vectoree 定价模式对比参考（关键）

| 定价维度 | Vercel | Vectoree（建议策略） | 机会 & 差异化点 |
|---------|--------|-------------------|--------------|
| **免费版慷慨度** | Hobby $0：Unlimited 项目 + Unlimited 域名 + 100GB Egress（业内最慷慨免费版） | ✅ Vectoree Free 对标：Unlimited Draft 草稿部署 + N 个 Production 自定义域名（永不休眠）+ 含 Hobby 级 Supabase + Vercel + OpenRouter 免费额度 | 比 Supabase Free（2 项目/1 周休眠）体验强 10 倍，和 Vercel Hobby 同量级，但 Vectoree Free 额外含「**装配线 + 定价配置 Wizard**」（Vercel Hobby 没有） |
| **Pro 档位锚** | Pro $20 / Seat / 月（只是部署平台） | Vectoree Indie Pro $49 / Seat / 月（= Vercel Pro $20 + Supabase Pro $25 + OpenRouter $20 Credits + Vectoree 装配线 + B2B2C 分润能力打包） | 对比用户单独买这四家 ($20 + $25 + $20) = $65/月，Vectoree 打包 $49 有 25% 折扣感；而且独有 Stripe Connect 分润（Vercel 永远不会做） |
| **模型层赚钱方式** | Token Pass-through 完全不加价；通过 Functions 运行时赚钱 | 模型层同样不加价（Trust & Transparency）；Vectoree 的利润来自：平台订阅费 + B2B2C 交易抽成 | 两边都不赚模型黑心钱，用户信任度高 |
| **计费复杂度** | 30+ 维度 Usage-based（用户最大投诉） | Vectoree 做**「少维度 + 配额打包」**：把 Supabase/Vercel/OpenRouter 的 30 个用量维度封装成 3-5 个用户能懂的指标（End-User MAU、Agent 对话数、Egress GB、Token Credits）；超了先发邮件「你超了 120%，要不要升级？」而不是直接扣钱 | 用户体验大幅简化；出海 Indie 最怕惊喜账单 |
| **B2B2C 交易抽成** | ❌ 永远不碰（商业模型硬边界） | ✅ Vectoree 核心利润池之一：开发者通过 Vectoree 向终用户收费时，Stripe Connect 代扣 X% 作为平台费（比如基础版 3%，Pro 档降为 1.5%） | 真正的价值层收入；Supabase/Vercel/OpenRouter 三家都不可能做（会与客户竞争） |
| **合规门槛价格** | Enterprise ≥ $24K/年才含 SSO/SAML + HIPAA | Vectoree Business $499/月（$6K/年）就含 SSO + 基础 HIPAA；真正 Enterprise 档再走定制 | 卡住 20-100 人中型出海 SaaS 的合规空档 |
| **UI 生成增值项** | v0 Pro $20 / Seat / 月（独立订阅） | Vectoree Pro 档每月送 N 次 v0 调用（「AI 自定义 UI」按钮）；Pro Plus 无限 | 把 v0 做成装配线增值能力而不是单独让用户买 v0 订阅 |

---

## 🔗 参考资料

- [Vercel Official Pricing Page（所有档位 + 加项费率完整列表）](https://vercel.com/pricing)
- [Vercel Docs: Pricing & Resource Metering（每资源触发规则 + How Calculated）](https://vercel.com/docs/pricing)
- [WorkflowAutomation 12-Month Real-User Review: Pricing Value 8.0/10, Ease of Use 9.5/10（38 Projects 真实账单分析）](https://workflowautomation.net/reviews/vercel)
- [Sacra Research: Vercel ($340M ARR, $9.3B Valuation, 4M v0 Users，定价策略隐含估值逻辑)](https://sacra.com/c/vercel/)
- [Vercel + Neon Postgres Launch Pricing Blog（Durable Backends 价格结构博客）](https://vercel.com/blog/storage-partnerships)
- [Vercel v0 Pricing Page（独立产品订阅与团队版）](https://v0.dev/pricing)

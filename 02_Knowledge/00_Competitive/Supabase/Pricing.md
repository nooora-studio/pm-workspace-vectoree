---
title: "Supabase - Pricing"
description: "Supabase 间接竞品定价分析：套餐档位、隐性计费、加项阶梯与策略拆解"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://supabase.com/"
tags: ["competitor", "supabase", "pricing", "indirect", "baas", "postgres"]
owners: ["PM"]
sources: ["https://supabase.com/pricing", "https://gaxonline.com/rankings/devtools/supabase/", "https://supabase.com/docs/guides/platform/billing-on-supabase", "https://supabase.com/docs/guides/platform/compute-add-ons"]
pricing_last_verified: "2026-08-14 (official pricing page + GAX 2026 Nov 实测账单 cross-check)"
---

# Supabase · 定价分析（间接竞品）

> 定价定位：**按套餐（Plan） + 项目数（Project） + Compute 阶梯（可配）** 的分层计费；核心特征是「**Storage/DB/Network 按用量计费、API 请求无限（Free Plan 共享算力除外）**」—— 这是 Supabase 相对 Firebase（按读写操作计费）最大的定价差异化。
>
> **与 Vectoree 定价的关系**：Supabase 的定价是 **Vectoree 的「后端资源成本基准」**，Vectoree 的套餐定价 = Supabase 后端资源成本 + OpenRouter 模型成本 + Vercel 级部署成本 + Vectoree「装配线/商业闭环」增值订阅费。

---

## 💰 定价结构总览（4 档套餐 + 12 档 Compute + 4 类用量附加）

```
Organization-level Billing（组织级统一开票）
├─ Plan Base 套餐基础费（首项目含，加项目 $10/月起）
│   ├─ Free      $0
│   ├─ Pro       $25/月   （含 $10 Compute Credits）
│   ├─ Team      $599/月  （含 $10 Compute Credits）
│   └─ Enterprise 定制 Contact Sales
├─ Compute 算力阶梯（12 档，按 CPU/RAM 选）
│   └─ Micro $10 → Small $15 → ... → 16XL $3,730 / 月
└─ Usage-based Add-ons 按用量附加
    ├─ MAU（月活用户）超额
    ├─ Disk / Egress / Storage / Cache Egress 超额
    └─ Log Drains / Backups / HIPAA / Custom Domain 增值
```

> **关键计费前提**：Paid Plan（Pro/Team/Enterprise）自带 `$10 Compute Credits`，刚好够抵消 1 个 Micro ($10) 实例 → **Pro Plan 只要不加项目、不加算力，月费就是实打实 $25，没有 hidden 最低支出**。

---

## 📦 4 档套餐横向对比（Billing Base 基准）

| 项目 | **Free** $0 | **Pro** $25/月起 | **Team** $599/月起 | **Enterprise** 定制 |
|------|-------------|-----------------|-------------------|--------------------|
| 定位 | Passion / 原型 | 线上生产最热门 | 合规化中团队 | 大规模互联网级 |
| **同时活跃项目数** | **最多 2 个**（第 3 个要删一个或付费） | 第 1 个含在 Plan 内；**额外项目 $10 / 月 / 个** | 第 1 个含；额外项目 $10 / 月 / 个 | 定制 |
| Free 项目休眠规则 | **1 周无活动自动 Paused**，需 Dashboard 手动 Resume | ❌ Paid Plan **从不休眠** | ❌ 从不休眠 | ❌ 从不休眠 |
| **Compute Credits 包含** | ❌ 无（共享算力） | **$10 / 月**（刚好抵消 1 个 Micro） | **$10 / 月**（刚好抵消 1 个 Micro） | 定制 |
| **MAU（月活用户）含** | **50,000 / 月** | **100,000 / 月** | 100,000 / 月 + SSO 增量 | 定制 |
| MAU 超额费 | 达到后限流 | **$0.00325 / MAU**（≈$3.25 / 千 MAU） | 同比率 | 定制合同价 |
| **DB Disk 含** | **500 MB / project** | **8 GB / project** | 8 GB + 备份扩展 | 定制 |
| Disk 超额 | 达到后只读（500MB 很容易爆） | **$0.125 / GB / 月** | 同比率 | 定制 |
| **Network Egress（出口流量）** | 5 GB | 250 GB | 250 GB | 定制 TB 级 |
| Egress 超额 | 达到后限流 | **$0.09 / GB** | 同比率 | 定制 |
| **Cached Egress（CDN 出口）** | 5 GB | 250 GB | 250 GB | 定制 |
| Cache Egress 超额 | 达到后限流 | **$0.03 / GB**（比 Origin 便宜 2/3） | 同比率 | 定制 |
| **File Storage 含** | 1 GB | 100 GB | 100 GB | 定制 |
| Storage 超额 | 达到后上传阻塞 | **$0.0213 / GB / 月** | 同比率 | 定制 |
| **每日备份保留** | 1 天 | 7 天 | 14 天 | 自定义 PITR |
| **日志保留** | ❌ 不保留 | 7 天（加 Log Drains $60/drain） | 28 天 | 自定义 |
| **支持** | Community Discord | Email Support | **Priority Email + SLA** | 24×7 + Dedicated Manager + 私有 Slack |
| **安全合规** | — | SOC2 / ISO 27001 基础项 | **SOC2 + ISO 27001（已得）** + **HIPAA 可付费加购** + SSO/SAML Dashboard 登录 | SOC2 / ISO / HIPAA / PCI / GDPR 定制审计 + 安全问卷 |
| **访问角色控制** | 简单 Owner / Editor | 简单 + Read-only 基础 | **Project-scoped RBAC** + Read-only 角色 | 企业级角色矩阵 + 审计 |
| **BYO Cloud（自带云账号）** | ❌ | ❌ | ⚠️ 仅 Enterprise 表单申请 | ✅ 默认支持（AWS / GCP / Azure） |
| **数据库 Compute 最低档** | ❌ 共享算力（无独立） | Micro $10（可用 Credits 抵） | Micro $10 | 16XL / Bare Metal 定制 |
| **免费试用** | 永久免费版 2 项目 | 无独立免费试用（从 Free Plan 升 Pro 秒级） | 30 天试算（需 Sales 对接） | PO 签字后 Pilot |

---

## 🖥️ Compute 算力阶梯（12 档，按项目单算）

> 这是 Supabase Pro 以上用户最容易 Monthly Bill 超出预期的部分：**Plan 基础费 ≠ 算力费**，每个项目的 DB 运行在独立的 ARM 实例上，按大小计费。

| 档位 | 月费 $ | CPU (ARM) | 内存 RAM | 直连连接数（Direct） | PgBouncer 池连接数（Pooler） | 在 Paid Plan 中是否被 Credits 覆盖 |
|------|--------|----------|---------|-------------------|---------------------------|-------------------------------|
| **Micro** | 10 | 2-core | 1 GB | 60 | 200 | ✅ Pro 含 $10 = 抵掉 1 个 |
| **Small** | 15 | 2-core | 2 GB | 90 | 400 | ❌ 需付 $5 额外 |
| **Medium** | 60 | 2-core | 4 GB | 120 | 600 | ❌ 需付 $50 额外 |
| **Large** | 110 | 2-core | 8 GB | 160 | 800 | ❌ 需付 $100 额外 |
| **XL** | 210 | 4-core | 16 GB | 240 | 1,000 | ❌ $200 额外 |
| **2XL** | 410 | 8-core | 32 GB | 380 | 1,500 | ❌ $400 额外 |
| **4XL** | 960 | 16-core | 64 GB | 480 | 3,000 | ❌ $950 额外 |
| **8XL** | 1,870 | 32-core | 128 GB | 490 | 6,000 | ❌ $1,860 额外 |
| **12XL** | 2,800 | 48-core | 192 GB | 500 | 9,000 | ❌ $2,790 额外 |
| **16XL** | 3,730 | 64-core | 256 GB | 500 | 12,000 | ❌ $3,720 额外 |
| **>16XL** | 定制 | — | — | — | — | Contact Sales |

> ⚠️ **关键陷阱**：
> 1. **Paid Plan 的 $10 Credits 只够 1 个 Micro 实例**；如果你有 2 个项目 + 都用 Micro → 基础 $25 + $0（首项目） + $10（第二项目） = **$35 / 月**，不是 $25。
> 2. **Compute 按小时计费，不自动 Scale-to-Zero**（和 Neon 最大的不同）；即使项目 0 流量，只要实例开着就 24×7 按整月收。

---

## 📉 计费示例（3 个典型画像 · 均为真实用户级画像）

### 画像 1：Indie Hacker 个人 SaaS 上线期（最常见）
| 项 | 配置 | 费用 |
|----|------|------|
| Plan | Pro（1 项目） | $25 / 月 |
| Compute | 1× Large（8 GB，有 pgvector 向量库 + 轻度并发）→ Credits $10 抵 $10，补 $100 | +$100 |
| Disk | 用了 22 GB（含 8 GB quota） → 14 GB × $0.125 | +$1.75 |
| MAU | 60K（超 100K quota 前 10K buffer 安全） | $0 |
| Storage | 70 GB PDF/图片（在 100 GB quota 内） | $0 |
| Egress | 140 GB（在 250 GB quota 内） | $0 |
| **月度总账单** | | **≈ $126.75 / 月** |

### 画像 2：Pre-A 小团队（3 个后端项目：主 App + 内部工具 + Staging）
| 项 | 配置 | 费用 |
|----|------|------|
| Plan | Pro（基础） | $25 |
| 额外项目 | 2 个 Extra Project × $10 | +$20 |
| Compute 主项目 | 1× XL（16 GB，pgvector + 中等并发）→ +$200 | +$200 |
| Compute 内部工具 | 1× Small（2 GB）→ Credits $10 抵 $10，补 $5 | +$5 |
| Compute Staging | 1× Micro → 被剩余 Credits 覆盖 | $0 |
| MAU | 主项目 130K（超 30K）× $0.00325 | +$97.5 |
| Disk | 主项目 35 GB（超 27 GB × $0.125） | +$3.375 |
| Egress | 主项目 380 GB（超 130 GB × $0.09） | +$11.7 |
| **月度总账单** | | **≈ $362.575 / 月** |

### 画像 3：SaaS 中团队（Team Plan，合规要求 SOC2 + HIPAA，8 个项目）
| 项 | 配置 | 费用 |
|----|------|------|
| Plan | Team（$599 基础） | $599 |
| 额外项目 | 7 个 Extra Project × $10 | +$70 |
| Compute 核心生产 | 1× 2XL（32 GB）→ $400 | +$400 |
| Compute 7 个非核心 | 7× Micro = $70（$10 Credits 抵 $10） | +$60 |
| MAU | 500K（超 400K × $0.00325） | +$1,300 |
| HIPAA Add-on | 合规加购（官方定价未公开，GAX 实测 ≈ $2K/月） | ~$2,000 |
| Log Drains（3 个项目 × Datadog） | 3 × $60 | +$180 |
| Disk + Storage + Egress 超额合计 | | ~$400 |
| **月度总账单** | | **≈ $5,009 / 月** |

---

## 🔍 定价策略拆解（Why Supabase 这么定价？）

### 1. 「反 Firebase 读写计费」—— 打用户痛点的差异化
| 维度 | Firebase（按操作计费） | Supabase（按存储/MAU 计费） |
|------|----------------------|---------------------------|
| **钱花在哪** | 读 1 次 0.00006 美元；一个 bug 引发多读 → 账单爆炸 | API 请求**完全免费**；主要花在 RAM（Compute 阶梯）和 Disk、MAU |
| **用户心理** | 「少调用 = 省钱」→ 不敢做高交互体验 | 「请求无限 → 大胆搞功能；只要 DB 别太大就行」 |
| **对 Vectoree 的启示** | Vectoree 套餐里的「后端配额」应沿用 Supabase 哲学：**不要按 API 调用数卡用户**，这会极大抑制创新；配额重点放在「项目数、MAU、部署域名数」这几项用户更易感知的硬边界上 |

### 2. Free Plan 严格的「2 项目 + 1 周休眠」—— 倒逼商业转化
- 2 个活跃项目上限：真正做 SaaS 的人会发现「生产 + Staging」就占满了，想加「内部工具 / 原型」立刻被逼升 Pro。
- 1 周不活动自动暂停：如果 Indie Hacker 把 Supabase 当长期作品集展示站，一个月要手动 Resume 4 次，烦；逼他买 Pro（$25/月换永不休眠，对已经有月收入的 Indie Hacker 极度便宜）。
- **Vectoree 反打机会**：**Vectoree Free Plan = 项目数有限，但 **DEPLOY NEVER SLEEPS**（上线的 Agent 永不休眠）。这对 Indie Hacker 是强信号：「在 Vectoree 上线的东西永远在，Supabase 免费版会被冻」。

### 3. Pro $25 的锚点：心理价位的「甜点区」
- $25/月是出海 Indie SaaS 的「标准生产后端预算锚」：Render Pro $7、Vercel Pro $20、Supabase Pro $25 → 三件套合计 $50 出头，Indie SaaS 刚起步完全承担得起。
- 且 $25 含 100K MAU，对 < 1 万用户的新产品完全够用。
- **Vectoree Pro 档位可借鉴这个锚**：把 $25 作为「Indie 上线生产档」的基准锚点，然后里面打包 Supabase Pro ($25) + OpenRouter 模型预算（例如 $20 Credits）+ Vercel 级部署（≈$20 等价资源），**让用户觉得「单独买这些要 >$70，在 Vectoree 买只要 $49/月」**。

### 4. Compute 阶梯的「平滑阶梯」—— 让用户在不察觉中付费升级
- Micro → Small → Medium → Large 之间的跳跃：$10 → $15 → $60 → $110
- 用户从 $15 Small 遇到 RAM 爆（OOM）、连接数爆 → 直接点升级按钮到 $60 Medium，几乎不会犹豫（相比 Prod DB 宕机损失，$45 毛毛雨）。
- Supabase 的增长核心就是「用户 DB 涨 → Compute 阶梯自然涨」，不用销售介入，纯产品驱动 upsell。

---

## 🚨 可能的隐性成本 & 客户异议点（Vectoree 需要避免的坑）

| 隐性陷阱 | 说明 | 风险等级 | Vectoree 避免方式 |
|---------|------|---------|----------------|
| **多项目叠加 Extra $10/个** | Pro Plan 只含首项目；做原型 / 测试 / Staging / Dev 一多，每月几十个 $10 悄悄堆起来 | ⚠️ 中高 | Vectoree Pro 明确「不限预览项目 / Staging project」，只把「Production Custom Domain Deploy」当硬配额卡 |
| **Compute 不自动 Scale-to-Zero** | 冷项目也要全月收费；10 个闲置 Micro 就是 $100/月，对比 Neon scale-to-0 完全免费 | ⚠️ 中高 | Vectoree 非 Production 部署默认空闲自动休眠，Production 档才 24×7 全开 —— 让闲置真的不花钱 |
| **MAU 超额费 $0.00325 不设上限** | 被 Hacker News / Reddit 爆量一天涨 50 万 MAU → $1,600 惊喜账单；和 Firebase 按读计费爆炸同理，只是换了 MAU 维度爆 | ⚠️ 中高 | Vectoree 所有档位加「Hard Cap 熔断 + 邮件预警」：到配额自动切只读 / 降级模式，不会让用户醒来吓哭 |
| **Disk $0.125 / GB 随 pgvector 暴涨** | RAG 知识库 + Vector 索引很吃存储；100 万 Embedding 可能 50GB+；用户低估存储成本 | ⚠️ 中 | Vectoree Vector 模块里提示存储估算（「100 万 Embedding ≈ X GB Storage → $Y/月」），让用户有预期 |
| **Egress 双层计费（Origin vs Cache）** | 没有启用 CDN 的话，所有请求都走 Origin Egress $0.09；Cache Egress 才 $0.03，用户不知道开导致 3x 浪费 | ⚠️ 中 | Vectoree 默认对所有前端部署 + Storage 启用 CDN，自动 Cache 静态资源，最大化省 Egress 费用 |
| **Log Drains $60 / 个 / 月** | 要接 Datadog / Axiom 一个项目一个 drain；10 项目 $600/月 | ⚠️ 中 | Vectoree Observability 层直接集成主流 Log 平台，按 Org 级不按项目级收费 |
| **HIPAA 加购无公开价，要找 Sales** | GAX 实测 ≈ $2,000/月起；且需 Team Plan $599 打底 = **最低合规门槛 ~$2,600/月** | ⚠️ 中（企业用户常踩） | Vectoree 企业档公开透明列出 HIPAA 合规加购价，避免 Sales 黑盒报价吓跑合规敏感的中小企业 |

---

## 🧠 和 Vectoree 定价模式对比参考（核心）

| 定价维度 | Supabase | Vectoree（建议策略） | 差异与机会点 |
|---------|---------|-------------------|------------|
| **收费层级** | Plan 基础费 + 项目数 + Compute 阶梯 + 用量附加（MAU/Disk/Egress） | 建议：**平台订阅费（Free / Indie Pro / Team / Enterprise） + 模型用量（OpenRouter 透明直通） + 终用户交易抽成（B2B2C）** | Supabase 只收「后端资源」的钱，Vectoree 在其之上收「装配线 + 商业闭环」的钱 + 帮开发者向终用户收钱时抽成 |
| **免费版的痛** | 2 项目上限 + 1 周自动休眠 | Vectoree Free：有限自定义域名部署数，但 **DEPLOY NEVER SLEEPS（永不休眠）** + 模板预览项目不限 | **反打 Supabase Free 的最大痛**：用户可以放心把作品集 / MVP 放在 Vectoree 上，不用每月手动恢复 |
| **请求/算力计费** | API 请求无限；Compute 按实例阶梯收费，不 scale-to-0 | 前端部署请求不限；非生产部署空闲自动休眠（免费资源真免费）；生产部署 Always-on（按档位固定配额） | 比 Supabase 更省闲置浪费 |
| **后端成本透明度** | 非常透明：每个 Project 的 Compute/Disk/MAU/Egress 明细在 Billing 页一条一条列 | 建议 Vectoree 把账单明细分层：① 平台订阅 ② Supabase 后端资源（原价透明）③ OpenRouter 模型 Tokens（原价透明） ④ Vectoree 增值服务 | 绝对不要在 Supabase / OpenRouter 的成本上加暗点；明牌加 subscription value |
| **商业闭环抽成**（与 Vectoree 最大差异） | ❌ 完全不做；开发者要接 Stripe 自己搞 | ✅ 做：开发者通过 Vectoree 上架 Agent SaaS，向终用户收费 → Vectoree 抽 X%（Stripe Connect 代商户模式） | Supabase 的战略盲区 + Vectoree 第一护城河：**Supabase 用户想收钱必须自己拼 Stripe + 写 Billing，在 Vectoree 开箱即用** |
| **多项目定价陷阱** | Extra Project $10 / 个；5 项目 = Pro $25 + $40 = $65；很多 Indie Hacker 在社区吐槽「项目一加就变贵」 | Vectoree Indie Pro：**预览 / 测试 / 草稿项目不限个数**，只有「Production Custom Domain Deploy」的数量是配额 | 用「预览项目自由」反打 Supabase「$10 一个项目」的定价 friction |
| **安全合规定价** | HIPAA / SSO / SOC2 只有 Team $599 档起，门槛高 | Vectoree Team 档起提供 SOC2 报告；HIPAA 加购价公开透明（例如 +$500/月），不强迫 Contact Sales | 比 Supabase 更低的合规门槛，抓住 Compliance-sensitive 但不够 Enterprise 量级的中型出海 SaaS |

---

## 🔗 参考资料

- [Supabase 官方定价页（含套餐/Compute 阶梯/Add-ons 完整列表）](https://supabase.com/pricing)
- [Supabase Docs: Billing on Supabase（组织级开票 + Compute 按小时计费规则）](https://supabase.com/docs/guides/platform/billing-on-supabase)
- [Supabase Docs: Compute Add-ons（12 档实例规格 + 连接数矩阵）](https://supabase.com/docs/guides/platform/compute-add-ons)
- [GAX Online 2026 Nov 深度评测：Pricing Value 维度得分 92/100（含三家真实项目 60 天实测账单明细）](https://gaxonline.com/rankings/devtools/supabase/)
- [7wdata: Supabase 客户结构（81.5% 1-10 人团队 → 对价格极度敏感，Pro $25 是甜点区）](https://7wdata.be/company/supabase/)
- [官方 Blog + Reddit 社区反馈摘要（免费版 1 周休眠痛点 / Multi-project pricing 抱怨）](https://supabase.com/blog)

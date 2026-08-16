---
title: "OpenRouter - Pricing"
description: "OpenRouter 间接竞品定价分析：各模型单价、档位、套餐策略"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://openrouter.ai/"
tags: ["competitor", "openrouter", "pricing", "indirect", "llm-gateway", "cost-control"]
owners: ["PM"]
sources: ["https://openrouter.ai/models", "https://toolchase.com/tool/openrouter/", "https://dev.to/playfulprogramming/openrouter-one-api-key-to-rule-them-all-304b", "https://agenticindex.io/vendors/openrouter"]
pricing_last_verified: "2026-08-14 (official site + ToolChase + dev.to Aug 2026 post cross-checked)"
---

# OpenRouter · 定价分析（间接竞品）

> 定价定位：**纯 Pay-as-you-go（按量）+ 充值手续费模式**，无订阅、无最低消费、无月度承诺；2025 年后从「每 Token 加价」模式切换为「Token 原价直通 + 充值手续费 5.5%」模式，对多模型用户显著降价。
>
> ⚠️ 注意：下面各模型单价为 **Underlying Provider 直接定价（Pass-through）**，不同 Provider 同模型价格略有差异；OpenRouter 商城页每个模型的详情页会列出具体单价。

---

## 💰 定价结构总览（3 层收费项 + 2 个免费机制）

| 层级 | 收费项 | 费率 / 规则 | 说明 |
|------|--------|------------|------|
| **L1 充值手续费（核心收入）** | 信用卡充值 | **5.5%**，单笔最低 **$0.80** | 充 $100 → 实际到账余额 $100，你额外支付 $5.50 |
| | 加密货币（Crypto）充值 | **5%** | 比信用卡略便宜 0.5% |
| **L2 Token 推理费（Pass-through 原价）** | 输入/输出 Token | 按各 Provider 官方定价 **1:1 直通，不加价** | 模型之间差异极大：$0.07/MTok → $150+/MTok 跨度 2000x |
| **L3 BYOK 超额路由费** | 每月 1M 次请求以内 | **免费** | 自带官方 Key 的用户，小流量完全免费走 OpenRouter 网关 |
| | 每月 > 1M 请求 | 超出部分 **5%** 手续费 | 仍远低于自建网关的运维成本 |
| **Credits 有效期** | 所有充值余额 | **365 天（1 年）** | 过期清零，充值时需注意 |

| 免费机制 | 规则 |
|---------|------|
| **免费模型池（28+ 款）** | 通常为 Llama / Gemma / Qwen / DeepSeek Flash 等开源模型社区托管版；**20 requests/minute** 限流 |
| **每日免费请求额度** | ❌ 无充值用户：**50 次请求 / 天**（仅免费模型）；✅ 充值过 $10+ 的用户：**1000 次请求 / 天**（仅免费模型） |

---

## 📊 典型模型参考单价（2026 年中 Pass-through 参考区间）

> 具体价格请以 https://openrouter.ai/models 实时价为准；下表仅展示**量级跨度**帮助感知价格分布。

| 档位 | 代表模型 | 输入 Token（$/MTok） | 输出 Token（$/MTok） | 典型用途 |
|------|---------|---------------------|---------------------|---------|
| **顶级推理（Opus / GPT-级）** | Claude Opus 5 / GPT-5.6 Sol / Gemini Ultra | $15 – $75 | $75 – $150+ | 复杂推理、研究报告、代码重构、错不起的任务 |
| **主力平衡（Sonnet / GPT-级）** | Claude Sonnet 4.6 / GPT-4o / Gemini Flash Pro | $2 – $5 | $8 – $15 | 日常对话、Agent 工作流、通用代码生成 |
| **高性价比快速响应** | DeepSeek V3 / Qwen 3 / Llama 4 Maverick / Muse Spark | $0.1 – $0.8 | $0.3 – $3 | 摘要、分类、客服、低价值的高并发任务 |
| **免费 / 极致低价** | Llama 3.1 / Gemma 4 / DeepSeek Flash / Qwen3 小参 | $0 – $0.07 | $0 – $0.1 | 原型、Demo、压测、低价值任务批处理 |
| **Embedding 向量** | text-embedding 系列 / BGE 系列 | $0.02 – $0.5（通常比 Chat 便宜 1-2 个量级） | N/A | RAG 检索、语义搜索 |
| **自研路由增值（Fusion 等）** | Fusion（陪审团模式） | 按实际调用的所有专家模型 + Judge 模型**汇总计费**（成本更高，但质量更高） | 研究、专家评审、风险敏感任务 |

---

## 🧾 计费示例（3 个典型画像）

### 画像 1：Indie Hacker（原型 + 小流量上线）
| 项目 | 月费用估算 |
|------|-----------|
| 充值 $20（手续费 5.5% → $1.10） | **$21.10** |
| 其中：免费模型 1000 请求/天 + 少量 Sonnet 级 Token 调用（约 $15 Token） | 余额剩余约 $5 |
| **月度总支出** | **≈ $21** |

### 画像 2：AI Native 小团队（5 人，日均 ~50 万 Tokens）
| 项目 | 月费用估算 |
|------|-----------|
| 月度 Token 用量：主力 Sonnet 级 + 少量 Opus（混合 $3/$15 均摊约 $5/MTok 入 × $12/MTok 出） | **$800 – $1,500** |
| 充值手续费 5.5%（月充 $1,200 → 手续费 $66） | **+$66** |
| **月度总支出** | **≈ $866 – $1,566** |

### 画像 3：中大型企业（高并发 + 多模型 A/B 测试）
| 项目 | 月费用估算 |
|------|-----------|
| 月度 Token 用量：~5,000 万 – 2 亿 Tokens（混合档位） | **$5,000 – $25,000+** |
| 企业定制：高限流、SLA、合同商务折扣（可能跳过充值手续费模式，直接签合同） | 商务定价 case by case |
| **月度总支出** | **Contact Sales 定制合同价** |

---

## 🔍 定价策略拆解（Why 这么定价？）

### 1. 核心收入来源：充值手续费 5.5%，不在 Token 上加价
| 维度 | 旧模式（~2024 及以前） | **新模式（2025 后，当前）** |
|------|----------------------|--------------------------|
| **收什么钱** | 每笔 Token 加价 5-20%（你看不到 Provider 实价） | Token **原价直通**，只在你充值的时候收 5.5% |
| **用户感知** | 「OpenRouter 比官网贵，是不是在薅我？」 | 「价格透明，5.5% 买网关、容灾、路由、统一账单，值不值我自己算」 |
| **对 Vectoree 的启示** | — | Vectoree 如果也做模型层，可以考虑**同样的透明定价策略**：模型原价不赚差价，平台价值体现在「装配线 + 部署 + 商业闭环」的订阅费中，避免用户被「加价薅羊毛」的负面认知 |

### 2. 免费模型 + 免费额度：极强的钩子（Hook）
- 零成本启动：不绑信用卡（或仅邮箱注册）就能跑 50 次免费请求/天，**Indie Hacker 的最爱**
- 充值后自动升级到 1000 次/天：**充值金额门槛极低（$10 即可解锁）**，极大降低首次付费转化难度
- 28+ 款免费模型：足够支撑 90% 的原型验证，开发者很容易在「免费期」把产品深度接入 → 再迁移的成本高

### 3. 无订阅、无月费、无承诺：消除所有付费焦虑
- 对比很多 AI 基础设施（Supabase $25/月起、Render $7/月起）：OpenRouter 是**纯用量、无死费**
- 开发者心理账户：「项目死了就停止烧钱，没有每个月固定支出」，对试错型团队特别友好

### 4. BYOK 定价：企业客户的「软着陆」方案
- 1M 请求/月内免费：绝大多数中团队实际用不到阈值，相当于**免费享受 OpenRouter 的路由/Failover/控制台**
- 超过才收 5%：自建一套同级别网关 + 观测 + 容灾的工程师人力成本 >> 5%，所以企业也觉得划算
- 战略价值：用极低门槛把已有官方 Direct Key 的企业客户「勾」进 OpenRouter 生态，后续慢慢引导迁到 Pass-through 模式

---

## 📉 可能的隐性成本 & 客户异议点

| 隐性项 | 说明 | 风险等级 |
|--------|------|---------|
| **充值手续费叠加模型价格波动** | 5.5% 看似低，但如果你月消费 $10k，手续费就是 $550/月（一年 $6,600） | ⚠️ 中（企业大客户会觉得） |
| **免费模型不保证稳定性 & 会随时下架** | 免费模型是社区 Provider 托管，Provider 政策变了就下；限流也可能随时调整；**不能用于生产关键路径** | ⚠️ 中高（开发者被坑过就会记住） |
| **Credits 1 年过期清零** | 充多了用不完会过期；大团队可能还好，小团队一次性充大金额要注意 | ⚠️ 中低 |
| **最低 $0.80 手续费** | 小额充值（如 $5 → 手续费 $0.80 = 16%）手续费率显得高；但对中大型用户无感 | ⚠️ 低（仅小额尝鲜用户在意） |
| **企业合规发票流程** | SaaS-only 平台，跨国开票、合同流程可能不如大厂成熟；高合规行业（金融/医疗）可能需要走 Enterprise 定制 | ⚠️ 中（出海企业的常见痛点） |
| **数据驻留 & 节点不可选（当前）** | 没有 Region Pinning，请求可能走全球任意节点；GDPR、数据不出境的场景需要等官方功能落地 | ⚠️ 中高（强合规行业的硬门槛） |

---

## 🧠 和 Vectoree 定价模式对比参考（关键）

| 定价维度 | OpenRouter | Vectoree（当前认知） | 差异 & Vectoree 机会点 |
|---------|-----------|---------------------|----------------------|
| **核心收费逻辑** | 充值手续费 5.5%（Pass-through 模型价） + BYOK 超额 5% | 预计是「平台胶水订阅（Free/Pro/Enterprise） + B2B2C 变现抽成」 | 模式完全不同；**Vectoree 收的是「上线 + 变现」价值，OpenRouter 收的是「接入 + 路由」价值**，不冲突 |
| **模型层赚不赚钱** | 不赚（原价直通），只收手续费；利润靠**规模效应**的充值流水 | 建议同样不赚模型差价，和 OpenRouter 拉平模型成本基础，差异化价值放在上层商业闭环 | 👉 Vectoree 如果模型层也加价，会在用户心中形成「中间商薅羊毛」印象；建议**直通价 + 平台订阅费**分开 |
| **免费版机制** | 免费模型池 + 每日免费请求（充值后额度提升）；没有「休眠」概念 | 建议 Vectoree 免费版：有限模板/部署数，但部署**不休眠**（打 InsForge 痛点） | Vectoree 免费版更有「作品感」—— 上线的东西一直在线，是 Indie Hacker 强需求 |
| **B2B2C 终用户计费抽成** | ❌ 完全不碰（只收开发者的钱） | ✅ Vectoree 核心价值区：帮开发者向他的终用户收钱，抽成 | **Vectoree 最大定价差异化护城河**。OpenRouter 用户想要这功能必须自己再接 Stripe Connect + Clerk + Billing，工程量巨大 |
| **定价透明度** | ✅ 极高（每个模型 Token 价公开对比 + 5.5% 明牌） | 建议 Vectoree 同样做**极度透明**的定价表：每个档位的部署数、模型配额（原价直通公开）、B2B2C 抽成比例，不要模糊地带 | 出海用户对「暗箱超额」极其反感，透明度就是信任 |
| **企业级合同路径** | Enterprise Contact Sales（高限流 + SLA + 商务折扣） | Vectoree 需要从 Day 1 就设计 Enterprise 档的 SSO/SAML/审计/私有化部署路线图 | 企业客户需要的不只是模型，还有「全栈部署 + 合规」 |

---

## 🔗 参考资料

- [OpenRouter Models 商城（含每个模型实时单价）](https://openrouter.ai/models)
- [ToolChase Review: Pricing 详解 + FAQ](https://toolchase.com/tool/openrouter/)
- [dev.to Aug 2026: OpenRouter Pricing Deep Dive（5.5% + 原价直通模式验证）](https://dev.to/playfulprogramming/openrouter-one-api-key-to-rule-them-all-304b)
- [AgenticIndex: OpenRouter Pricing Model（按供应商档案）](https://agenticindex.io/vendors/openrouter)
- [OpenRouter Blog: Governing Team AI Spend（企业控本定价策略联动）](https://openrouter.ai/blog/insights/governing-team-ai-spend/)


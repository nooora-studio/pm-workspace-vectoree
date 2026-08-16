---
title: "Insforge - Pricing"
description: "Insforge 直接竞品定价分析：各模型单价、档位、套餐策略"
author: "PM"
created: "2026-08-13"
updated: "2026-08-13"
status: "REVIEW"
version: "1.0"
competitor_type: "DIRECT"
website: "https://insforge.dev/"
tags: ["competitor", "insforge", "pricing", "direct"]
owners: ["PM"]
sources: ["https://www.toolworthy.ai/tool/insforge-dev", "https://docs.insforge.dev/"]
pricing_last_verified: "2026-08-13 (via third-party ToolWorthy review; official pricing page not fetched directly)"
---

# InsForge · 定价分析（直接竞品）

> 定价定位：**平台席位/项目级订阅（基础包） + 用量超额计费（按量）**，不是模型单价的纯加价转售模式
>
> ⚠️ 说明：官方首页的定价导航未能直接抓取，以下基于 ToolWorthy 第三方评测 + Docs 信息综合整理，后续建议以官网 Pricing 页实际数据为准进行二次核对

---

## 💰 三档套餐总览（含核心定价维度对比）

| 维度 | 🆓 Free（免费版） | 💼 Pro（专业版） | 🏢 Enterprise（企业版） |
|------|------------------|----------------|----------------------|
| **月费** | **$0 / month** | **$25 / month** (≈ ¥180) | 联系销售定制 |
| **定位** | 原型、Side projects、个人开发者尝鲜 | 生产环境、小团队、正式上线的应用 | 中大型团队、定制化合规/支持 |
| **适用人数** | 个人开发者 | 小团队（通常 1-10 人，具体席位限未披露） | 企业级，自定义席位 |
| **项目数 / 数据库** | 有限（未披露具体上限） | 更宽松配额，支持多个生产项目 | 不限 / 按需定制 |
| **免费项目休眠规则** | ⚠️ **1 周无活动自动休眠**，需手动唤醒 | ✅ 不休眠，持续在线 | ✅ 不休眠 |
| **数据库 (Postgres + pgvector)** | 有配额限制（如 500MB？未披露具体） | 更高配额，生产级可用，支持较大数据量 | 按需扩容 |
| **存储 (S3 Compatible)** | 有限（如 1GB？未披露） | 更高配额（如 100GB 级？未披露） | 无限 / 自定义 |
| **Edge Functions** | 有调用次数限制 | 更多调用次数 + 更长执行时长 | 不限 |
| **Model Gateway 模型调用** | 包含（按模型厂商原价 + 平台加价？具体未披露；通常 Pro 档有更优费率） | 包含，更高调用配额；部分低价模型可能包在月费内 | 自定义合同价 + 商务折扣 |
| **Realtime / Compute** | 有限使用 | 生产级配额 | 定制 |
| **优先级技术支持** | ❌ 社区 Discord | ✅ 邮件/工单支持，更高响应优先级 | ✅ 专属客户成功经理 + SLA + 电话支持 |
| **合规 / SSO / SAML** | ❌ | ❌（可能部分） | ✅ 可选，SSO/SAML/审计日志/自定义合同条款 |
| **SLA 服务等级承诺** | ❌ 尽力而为 | 生产级（如 99.5%？具体未披露） | ✅ 99.9%+ SLA，写入合同 |
| **可自托管** | ✅ 支持（GCE 一键部署） | ✅ 支持 | ✅ 支持私有部署 + 专属集群 |

> 📝 注：上表中带「？」的具体配额数值来自第三方评测推断，需以官方 Pricing 页实价为准

---

## 🔍 定价策略拆解（InsForge vs 纯模型聚合平台）

### 1. 核心收入来源：**「平台胶水费」而非「模型通道费」**
| 模式 | 模型聚合平台（如 OpenRouter / Together AI） | InsForge（Agent-Native BaaS） |
|------|------------------------------------------|-----------------------------|
| **主要收什么钱** | LLM 推理 Token 单价的 5-20% 加价（通道费） | **平台订阅费（$25/月起步）** + 基础设施（DB/Storage/Compute）**按量超额** |
| **模型本身赚不赚钱** | 核心利润来源 | 可能只是成本平价转售，或者薄利多销，甚至不赚 — 重点是卖平台 |
| **客户 LTV 驱动因素** | 模型调用量越大越赚 | 用户的后端基础设施用量（项目数、DB 大小、函数调用数）越多越赚 |

→ 💡 这点和 **Vectoree 的商业模式非常相似**：模型本身可能不赚大钱，核心利润来自「胶水层」的平台/部署/认证/支付打包费。

### 2. 免费版策略：**1 周休眠 = 倒逼付费转化**
- 免费用户做 Side Project，只要一周没动就自动休眠 → 想稳定展示 Demo / 上线给客户用，必须升级 Pro（$25/月）
- 非常经典的「Heroku-style」休眠策略，Pro 版门槛（$25）是 Indie Hacker 可接受的心理阈值

### 3. Pro 档的锚点设计：**$25 是小团队生产环境的标准定价锚点**
- $25/月 ≈ Supabase Pro / Render Starter / Neon Pro 同一档位
- 锚定了「替代 Supabase + Vercel + Clerk 三个组合订阅 = $25 打包一套 Agent-Native 基建」的性价比认知

### 4. 企业版：**合规 / 私有部署 / SLA 驱动溢价**
- 文档已显式提供 Self-hosting on GCE 方案，企业客户对合规（数据不出境）、审计、SSO 有强需求的，走 Enterprise 签合同

---

## 📊 可能的隐性计费项（基于第三方评测披露）

| 可能的超额项 | 说明 | 风险等级 |
|-------------|------|---------|
| **Pro 版数据库超额** | 超出基础配额的 DB 存储/连接数按量计费 | ⚠️ 中高（高流量应用容易超） |
| **Pro 版 Edge Functions 调用次数 / 执行时间超限** | 调用次数超配额，额外收费 | ⚠️ 中 |
| **Pro 版带宽 / 出站流量** | 大文件存储或大流量站点，出站流量可能超额 | ⚠️ 中 |
| **Model Gateway 模型调用成本** | 虽然包含网关，但模型本身的推理 Token 费按实付，不同模型单价不同 | ⚠️ 中高（高 Token 用量应用费用会很高） |
| **团队额外席位** | 小团队超过默认席位数，可能需要加购 | ⚠️ 低（Pro 默认席位数未披露，可能足够 5-10 人） |

> ToolWorthy 第三方评测明确指出：*"Pricing overages on the Pro plan can accumulate unpredictably for high-traffic applications"* — Pro 档「超额」是公认的模糊地带和潜在客户异议点

---

## 🧠 和 Vectoree 定价模式对比参考

| 定价维度 | Vectoree（已知公开信息参考） | InsForge | 差异/机会点 |
|---------|---------------------------|----------|-----------|
| **核心收费逻辑** | 平台「胶水」年费（Free / Pro / Enterprise 三档） + 按部署数/用户数？ | 平台订阅 $25/月 起 + 基础设施用量超额 | 模式趋同；Vectoree 如在 Pro 档提供更透明的「全包无限」模型可能是差异化 |
| **模型费用加价** | 可能不赚或薄利（核心价值在部署和 B2B2C） | 平价转售为主，通道费不是利润核心 | 双方在模型价格本身难拉开差距 |
| **B2B2C 终用户计费抽成** | ✅ Vectoree 核心卖点（开发者直接在平台上给终用户收费） | ❌ InsForge 未见集成 Stripe Connect 帮开发者收钱的能力 | **Vectoree 最大定价差异化点**：帮助开发者「变现」，而不只是「收费」 |
| **免费版转化机制** | 免费版有限功能 + 有限部署数 | 免费版 1 周休眠倒逼付费 | 都是免费→付费，但 Vectoree 若在免费版提供「不休眠」可以打 InsForge 的痛点 |
| **Sites/部署实验期** | 部署/域名绑定作为核心功能强推 | Sites 标注 EXPERIMENTAL（借 Vercel API） | Vectoree 的部署稳定体验可以拉开差距 |

---

## 🔗 参考资料

- [ToolWorthy Review — Pricing & Plans 板块](https://www.toolworthy.ai/tool/insforge-dev)
- [InsForge Docs](https://docs.insforge.dev/)
- ⚠️ **待补充**：官方 Pricing 页（未直接抓取到，建议二次核对时直接访问 https://insforge.dev/pricing）

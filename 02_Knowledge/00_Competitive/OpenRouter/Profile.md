---
title: "OpenRouter - Profile"
description: "OpenRouter 间接竞品简介：定位、融资、规模、背景"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://openrouter.ai/"
tags: ["competitor", "openrouter", "profile", "indirect", "llm-gateway", "model-routing"]
owners: ["PM"]
sources: ["https://openrouter.ai/", "https://openrouter.ai/blog/insights/llm-gateway/", "https://agenticindex.io/vendors/openrouter", "https://toolchase.com/tool/openrouter/", "https://openrouter.ai/blog/announcements/series-b/"]
pricing_last_verified: "2026-08-14 (official site + multiple third-party reviews cross-checked)"
---

# OpenRouter · 竞品简介（间接竞品）

## 🎯 一句话定位
**The Unified Interface For LLMs** — 一个 API Key、一个信用余额，打通 400+ 模型的 LLM 网关与路由平台，解决多模型时代「接入碎片化、账单混乱、容灾困难」三大痛点。

---

## 🏷️ 官方 Slogan & 核心主张

| 来源 | 文案 |
|------|------|
| 首页 Headline | **The Unified Interface For LLMs** |
| 首页 Sub-headline | Better **prices**, better **uptime**, no subscriptions. |
| 三大卖点锚点 | ① One API for Any Model ② Higher Availability ③ Price and Performance ④ Custom Data Policies |
| LLM Gateway 博客定位 | One of the largest LLM gateway platforms in production — routing **billions of requests and trillions of tokens every week** across hundreds of models and dozens of providers. |
| 第三方评测总结 | One API key, one credit balance, 300+ models. |

---

## 👥 创始团队 & 背景

| 角色 | 姓名 | 履历 |
|------|------|------|
| Founder & CEO | **Alex Atallah** | 前 OpenSea CTO / Co-founder（全球最大 NFT 交易平台，巅峰估值 $13.3B）；技术型创始人，对基础设施层的稳定性与扩展性有深厚积累 |

> 公司总部：美国纽约 New York City
> 公司性质：Independent（独立运营，非大厂孵化）

---

## 💰 融资与背书

| 轮次 | 时间 | 金额 | 领投/投资方 | 估值 |
|------|------|------|------------|------|
| 种子轮/Pre-A（推测） | 2023-2025 | ~$60M（推测，基于总额反推） | 早期天使/VC（未公开具体名单） | — |
| **Series B** | **2026 年 5 月** | **$113M** | **CapitalG**（Google 旗下成长型基金，曾投资 Stripe、Airbnb、Databricks 等标杆） | **~$1.3B（独角兽级）** |
| **总融资** | 截至 2026-05 | **~$173M** | — | — |

> CapitalG 背书意义：等于 Google 家族对 OpenRouter 作为「LLM 时代基础设施层」地位的战略认可，后续可能获得 Google Cloud / DeepMind 深度合作通道。

---

## 📊 产品规模与指标（截至 2026-08）

| 指标 | 数值 | 来源 |
|------|------|------|
| 月处理 Token 量 | **200T+ tokens / month** | 官网首页大字指标 |
| 周处理 Token 量 | **25T+ tokens / week** | AgenticIndex 供应商档案（2026-07） |
| 全球用户数（平台级） | **10M+ global users** | 官网首页 |
| 注册开发者数 | **8M+ developers** | AgenticIndex |
| 接入应用数（Apps） | **250K+ apps** using OpenRouter，服务 **4.2M+ end users** | 官网 Featured Agents 区块 |
| 模型提供商数 | **70+ providers** | 官网首页 |
| 上架模型总数 | **400+ active models** | 官网首页 + AgenticIndex 交叉验证 |
| 免费模型数 | **28+ completely free models** | ToolChase / dev.to 第三方评测交叉验证 |
| 附加延迟（网关层） | **~25ms** overhead（请求转发） | AgenticIndex 技术调研 |
| 自研模型 | 5+ 款：Auto Router(Beta) / Fusion / Owl Alpha / Pareto Code / Elephant Alpha | 官网 Models 详情页 |
| 企业级支出管控能力 | 5 种控制手段（Org 共享池 / Preset 模型域 / Key 限额 / Guardrails 成员预算 / Activity 看板） | 2026-08 官方博客《Set Up Team AI Spend Controls》 |

---

## 🎯 目标用户

| 优先级 | 用户画像 | 典型场景 |
|--------|---------|---------|
| P0 | **Indie Hacker / 独立开发者** | 原型快速出 Demo，不想接 5 家 SDK，用免费模型 + 少量充值测概念 |
| P1 | **Agent Builders / AI Native 开发团队** | 多模型路由 + Failover + 成本追踪，给 Agent 一个永远在线的模型层 |
| P2 | **中大型团队 / 企业（AI 用量大）** | 统一 API 账单、按人按项目控成本、SSO/审计、自定义数据策略（不允许数据流入特定 Provider） |
| P3 | **模型评测 / 基准测试团队** | 一个平台横向对比 400+ 模型在真实任务上的表现，A/B Test 成本极低 |

---

## 💡 核心问题 & 解决方案（官方叙事）

### 他们定义的问题：
> （来自官方博客《What Is an LLM Gateway?》）
1. **多模型接入是必然趋势，但 SDK 和账单是灾难**：单模型 App 原型阶段足够，但一旦进入生产，你就需要贵的模型做推理、便宜的做分类、主 Provider 挂了要秒切 — 每家 SDK 不一样、每家账单独立，你已经在不知不觉中造了一个网关。
2. **Provider 宕机/限流是日常，不是黑天鹅**：Anthropic 高峰期 429，Google 亚太节点抖动，OpenAI 偶发 5xx — 纯直连的话 App 直接挂给用户看。
3. **团队 AI 支出失控**：每人一把 API Key，月底 10 张账单，谁在用什么花了多少钱完全不可追溯；更糟的是有人误把实验 Key 上生产直接烧钱。

### 他们的解决方案：
> Build **one unified interface to every major LLM on the planet**，并在网关层解决以上所有问题：
> - ① **统一 API**（OpenAI SDK 兼容，一个 base_url + api_key 顶所有）
> - ② **分布式容灾**（多 Provider 自动 Failover，一个挂了秒切另一家同档模型）
> - ③ **智能路由**（Auto Router / Fusion / Pareto Code — 按任务类型自动挑性价比最高的模型组合）
> - ④ **精细支出管控**（5 层控制：Org → Preset → Key → Guardrails → Activity Dashboard）
> - ⑤ **数据策略防火墙**（Provider-level 开关，禁止特定厂商训练用你的数据；支持 BYOK 自带厂商 Key）

---

## 🗺️ 路线图 & 生态连接

| 项目 | 链接 | 说明 |
|------|------|------|
| 官方模型商城（核心产品入口） | https://openrouter.ai/models | 400+ 模型按周 Token 量/价格/上下文长度/能力维度筛选排序 |
| Docs（开发者文档） | https://openrouter.ai/docs | Quickstart / Routing / Privacy / Uptime / Enterprise |
| 官方博客（产品+洞察双栏） | https://openrouter.ai/blog | Announcements（重大发布） / Tutorials（教程） / Insights（行业洞见） |
| Activity Dashboard | https://openrouter.ai/activity | 按模型/Key/时间粒度的 Token 用量与成本追踪 |
| Apps / Featured Agents | https://openrouter.ai/apps | 250K+ 使用 OpenRouter 的应用展示广场 |
| API Key 管理 | https://openrouter.ai/settings/keys | 多 Key 生成、权限域、Spend Cap 设置 |
| 模型排名开放数据 | openrouter.ai 公开榜单 | 每周各模型真实 Token 用量排名，已成为行业参考信号 |

---

## 🚀 他们宣称的未来（Where We're Going）

> 从官方 Series B 公告 + LLM Gateway 长文综合推断：
> 1. **从纯模型路由 → 企业级 AI Governance 平台**：不止接模型，还要帮企业管住「谁能用什么模型、花多少钱、数据流向哪里」
> 2. **自研路由与模型生态持续加码**：Auto Router / Fusion / Owl Alpha 只是开始，未来会有更多针对特定场景（Agent、Code、RAG 检索）的专用路由 Preset
> 3. **多模态全覆盖**：文本 → 图像 → 音频 → 视频 → Embedding，网关层成为真正的「AI 能力统一总线」
> 4. **数据驻留 / 合规体系完善**：针对欧盟 GDPR、金融、医疗等强合规行业，增加 Region Pinning + 审计日志 + SSO/SAML

---

## 🧭 相对位置：OpenRouter 在 Vectoree 价值链中的定位

| 维度 | OpenRouter | Vectoree | 关系 |
|------|-----------|----------|------|
| **核心产品层** | 纯 LLM 网关 & 路由（模型接入层） | Agent 全栈 PaaS（模型 + 鉴权 + DB + 支付 + 部署 + 收款） | **Vectoree 可以把 OpenRouter 作为底层模型供应商之一**，而非竞品 |
| **收费逻辑** | 充值手续费 5.5% + BYOK 超额 5%（通道费模式） | 平台「胶水」订阅 + B2B2C 变现抽成（价值在上层商业闭环） | 价值层不冲突 |
| **不做的事** | 不碰 Auth / DB / Storage / Deploy / Billing（开发者自己接） | 把这些做成端到端的「装配线」 | 高度互补 |
| **对 Vectoree 的启示** | 如果 Vectoree 自研模型网关成本过高，可以直接深度集成 OpenRouter 官方能力，把精力聚焦在装配线 + 商业闭环 |

---

## 🔗 参考资料

- [OpenRouter 官网](https://openrouter.ai/)
- [OpenRouter Blog: What Is an LLM Gateway? (2026-06)](https://openrouter.ai/blog/insights/llm-gateway/)
- [OpenRouter Series B Announcement (2026-05, CapitalG $113M)](https://openrouter.ai/blog/announcements/series-b/)
- [AgenticIndex Vendor Profile: OpenRouter (2026-07 verified)](https://agenticindex.io/vendors/openrouter)
- [ToolChase Review: OpenRouter (pricing + pros/cons)](https://toolchase.com/tool/openrouter/)
- [dev.to: OpenRouter — One API Key to Rule Them All (2026-08)](https://dev.to/playfulprogramming/openrouter-one-api-key-to-rule-them-all-304b)
- [OpenRouter Docs: Team AI Spend Controls (2026-08 blog)](https://openrouter.ai/blog/tutorials/team-spend-controls-setup/)


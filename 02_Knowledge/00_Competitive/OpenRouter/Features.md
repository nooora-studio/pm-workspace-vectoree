---
title: "OpenRouter - Features"
description: "OpenRouter 间接竞品功能拆解：有什么/没什么/能力边界"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://openrouter.ai/"
tags: ["competitor", "openrouter", "features", "indirect", "llm-gateway", "model-routing"]
owners: ["PM"]
sources: ["https://openrouter.ai/docs", "https://openrouter.ai/blog/insights/llm-gateway/", "https://openrouter.ai/models", "https://toolchase.com/tool/openrouter/", "https://agenticindex.io/vendors/openrouter"]
---

# OpenRouter · 功能模块拆解（间接竞品）

> 一句话产品形态：**纯 LLM 接入层中间件（Gateway + Smart Router + Marketplace）**，不碰上层业务逻辑与后端基建；把「接 400+ 模型、路由、容灾、成本控制」这一件事做到极致。

---

## 🧱 总览：7 大功能域 + 1 个接入协议 + 2 类自研增值能力

```
┌───────────────────────────────────────────────────────────────────┐
│                    UNIFIED ACCESS PROTOCOL                         │
│          OpenAI-Compatible REST API + SDK Drop-in Replacement      │
├───────────────────────────────────────────────────────────────────┤
│                  7 CORE FUNCTIONAL DOMAINS                         │
│                                                                     │
│  F1 模型商城         F2 智能路由与容灾    F3 自研增值模型/路由器        │
│  (400+ Models)      (Failover/Routing)   (Auto/Fusion/Owl/etc.)    │
│                                                                     │
│  F4 企业支出管控     F5 数据策略与隐私     F6 多模态能力覆盖            │
│  (5-layer Controls)  (BYOK/Logging)    (Text/Img/Audio/Video)    │
│                                                                     │
│  F7 可观测性 & 生态                                                  │
│  (Activity Dashboard / Apps Plaza / Open Rankings)                 │
├───────────────────────────────────────────────────────────────────┤
│                 WHAT IT DOES NOT TOUCH (BY DESIGN)                 │
│   ❌ Auth ❌ DB ❌ Storage ❌ Deploy ❌ Hosting ❌ User Billing      │
└───────────────────────────────────────────────────────────────────┘
```

---

## 📦 功能域 F1：模型商城（Model Marketplace）

一句话：行业最全模型货架，70+ Provider × 400+ 模型，按能力/价格/用量多维筛选。

| # | 子功能 | 说明 |
|---|--------|------|
| F1-1 | **400+ 活跃模型** | 覆盖文本 LLM、Embedding、图像生成/理解、音频、语音转录、视频模型；主流厂商全覆盖（OpenAI/Anthropic/Google/Meta/Mistral/xAI/DeepSeek/Qwen/NVIDIA 等） |
| F1-2 | **模型详情页** | 每个模型独立页面：输入/输出 Token 单价、上下文长度、能力标签（Tool Call / Structured Output / Image / Long Context）、周 Token 用量、周环比趋势、Benchmark 得分 |
| F1-3 | **多维筛选器** | 按价格从低到高、按上下文长度、按周用量 Top、按能力标签（Tool/Image/Code/Structured）组合筛选 |
| F1-4 | **Featured Models 榜单** | 首页默认展示周 Token 量 Top 模型，带 Weekly Trend ↑↓ 百分比；成为行业真实模型采用率参考信号 |
| F1-5 | **28+ 免费模型池** | 通常是 Llama / Gemma / Qwen / DeepSeek Flash 等开源模型的社区托管版本，用于原型阶段零成本验证 |
| F1-6 | **多 Provider 同模型** | 热门模型（如 Claude/GPT 系列）同时由多家基础设施 Provider 提供服务，用户可自动或手动选择具体 Provider（按延迟/价格/可用性排序） |

---

## 📦 功能域 F2：智能路由与容灾（Smart Routing & High Availability）

一句话：OpenRouter 的「硬核价值核心」，把模型接入的可靠性和性价比拉满。

| # | 子功能 | 说明 |
|---|--------|------|
| F2-1 | **多 Provider 自动 Failover** | 同一款模型如果主 Provider 返错/限流/超时，**静默秒切**到其他同模型 Provider，用户无感；是生产级可用性的关键 |
| F2-2 | **Provider Sorting（排序）** | 同款模型多 Provider 时，可按 `cheapest`（最低单价）、`fastest`（最低延迟）、`throughput`（最高吞吐）等策略自动排序选最优 |
| F2-3 | **Fallback 链（模型级降级）** | 不只是同模型切 Provider，还可定义「如果 Claude Opus 全挂 → 自动降级到 Claude Sonnet → 再降级到 Llama」的跨模型降级链 |
| F2-4 | **Nitro Variant（极速版）** | 各 Router 可加 `:nitro` 后缀，按测量吞吐路由到当前最快节点，牺牲少量模型多样性换最低延迟 |
| F2-5 | **Uptime 优化文档（官方 SOP）** | 官方公开 Best Practices：Provider Selection、Fallback、Retry、如何在高峰期限流时保持服务稳定 |
| F2-6 | **网关层附加延迟** | 仅 ≈25ms overhead（AgenticIndex 实测），对 LLM 推理总延迟（通常 1-10s）几乎可忽略 |

---

## 📦 功能域 F3：自研增值模型 / 路由器（OpenRouter 自有 IP）

一句话：在纯通道之上叠加自研算法层，提升用户价值、建立产品差异化。

| # | 自研能力名 | 定位 | 核心原理 | 典型场景 |
|---|-----------|------|---------|---------|
| F3-1 | **Auto Router (Beta)** | 任务感知智能路由 | 对每一个请求先做任务分类，然后基于「数百万人已验证的真实消费数据」选出该任务类最受欢迎的模型（同时支持成本/质量权衡参数）；官方宣称比传统任务分类器在广谱任务上表现更好 | 不知道用哪个模型时的默认选择 |
| F3-2 | **Fusion** | 多模型陪审团综合 | 并行调用一组专家模型（可选 Quality/Budget 预设）+ 开 Web Search/Fetch 联网 → 然后用 Judge 模型合成：列出共识点、矛盾点、盲区、独立洞见 → 写最终答案 | 研究报告、专家评审、错不起的高风险决策 |
| F3-3 | **Pareto Code Router** | 代码专用分层路由 | 维护一个代码性能分层榜单（基于 Artificial Analysis 编码百分位），通过 `min_coding_score` 参数控制你要哪一档；默认 High 档；可加 Nitro 按吞吐优先 | 代码生成、重构、调试 |
| F3-4 | **Owl Alpha** | Agent 工作流专用基础模型 | 1.05M 上下文，原生支持 Tool Use、长上下文任务；代码生成、自动化工作流、复杂指令执行表现强；兼容 Claude Code / OpenClaw 等主流 Agent 工具 | 长流程 Agent、自动化编排 |
| F3-5 | **Elephant Alpha** | 100B 参数高效推理模型 | 主打「高智能 + Token 省」：256K 上下文，32K 输出 Token，支持 Function Call / Structured Output / Prompt Caching；适合代码补全、文档快速处理、轻量 Agent | 高 Token 用量场景降本 |
| F3-6 | **openrouter/free 免费路由** | 自动选免费模型 | 根据请求需要的能力（结构化输出、工具调用、图像理解），从 28+ 免费模型池中自动匹配最合适的 | 零成本原型 / 低价值任务 |

---

## 📦 功能域 F4：企业级 AI 支出管控（5 层控制体系）

一句话：团队从 1 人到 1000 人的 AI 账单管理全套方案。

| # | 控制层级 | 说明 |
|---|---------|------|
| F4-1 | **Organization 共享信用池** | 多人团队共用一个充值余额；按 Org 维度统一开票、统一充值 |
| F4-2 | **Presets（工作负载预设）** | 为不同场景（生产/测试/客服/代码）预定义「允许使用的模型集合 + 路由策略」，工程师不用自己选，避免乱用贵模型 |
| F4-3 | **Per-Key Spend Cap（单 Key 限额）** | 每个 API Key 独立设消费上限；到额自动熔断，避免单项目烧穿预算 |
| F4-4 | **Guardrails（成员级预算）** | 按团队成员设每月预算，个人 Key 消耗计入个人额度；适合大团队横向控费 |
| F4-5 | **Activity Dashboard（消费追溯）** | 按模型 / Key / 时间粒度看谁花了什么、Token 用在哪；支持导出；2026-08 官方专门出了一篇 Setup 教程讲如何 5 步搭完这套体系 |

---

## 📦 功能域 F5：数据策略与隐私（Provider-Level 控制）

一句话：企业合规的刚需能力，避免数据被拿去做模型训练。

| # | 子功能 | 说明 |
|---|--------|------|
| F5-1 | **Provider Logging Toggle** | 每个模型/Provider 可以单独开关「是否允许 Provider 用我的 Prompt 训练模型」；Docs 里有完整的 Provider 级隐私政策对照表 |
| F5-2 | **BYOK（Bring Your Own Key）** | 可以把你自己的 Anthropic / OpenAI 官方 Key 挂进来，流量从 OpenRouter 网关过但计费直接走厂商；适合已有厂商合同商务折扣价的企业 |
| F5-3 | **BYOK 超额费用** | 每月 1M 次请求以内 BYOK 免费路由；超出部分收 5% 手续费（仍远低于企业自建网关维护成本） |
| F5-4 | **自定义 Provider 黑名单** | 企业可设规则：禁止用任何中国厂商模型 / 禁止数据流向欧盟以外节点（配合数据驻留路线图） |

---

## 📦 功能域 F6：多模态能力覆盖

| 模态 | 支持情况 | 说明 |
|------|---------|------|
| **文本 LLM（Chat/Completions）** | ✅✅ 核心能力 | 400+ 模型主体 |
| **Embedding（向量）** | ✅ | 多家厂商 Embedding 模型接入，支持向量搜索场景 |
| **图像理解（Vision）** | ✅ | 支持 GPT-4o、Claude Opus with Vision、Gemini Ultra 等看图模型 |
| **图像生成（Image Gen）** | ✅ | DALL·E 3、Stable Diffusion 系列、Midjourney（若接入）等 |
| **音频（TTS 语音合成）** | ✅ | OpenAI TTS 等 |
| **语音转录（ASR / STT）** | ✅ | Whisper 系列、Google STT 等 |
| **视频生成 / 理解** | ✅ | 2026 年新增能力，覆盖 Sora 竞品等视频模型 |

---

## 📦 功能域 F7：可观测性 + 生态飞轮

| # | 子功能 | 说明 |
|---|--------|------|
| F7-1 | **Activity Dashboard** | 实时看到每个请求：用了哪个模型、哪个 Provider、多少 Prompt/Completion Token、花了多少钱、延迟多少 |
| F7-2 | **Token 消耗与成本追踪** | 按模型 / 按 Key / 按日期聚合；一眼看出哪个模型在烧钱 |
| F7-3 | **Featured Apps / Agents Plaza** | 展示 250K+ 使用 OpenRouter 的应用，带简介与直达链接；相当于生态展示 + 免费流量分发 |
| F7-4 | **开放模型排行榜** | 周 Token 用量 Top 榜 + 趋势百分比 → 已经成为「真实世界模型采用率」的行业参考信号，创投、研究都会看 |
| F7-5 | **官方博客（双栏）** | Tutorials 教用户怎么省钱/控本，Insights 输出行业洞见（如 LLM Gateway 长文），建立思想领导力 |

---

## 🧰 接入协议 & 生态兼容

| 维度 | 支持项 |
|------|-------|
| **API 协议** | **100% OpenAI REST API 兼容**：改 `base_url` + `api_key` 两个字段，原 OpenAI 代码不用动 |
| **SDK 兼容** | OpenAI 官方 Python / JS/TS SDK 直接能用；其他语言只要支持 OpenAI 格式即可 |
| **Agent 工具兼容** | Claude Code / Cursor / Windsurf / OpenClaw 等主流 AI IDE / Agent 产品均内置或支持接入 OpenRouter |
| **支付方式** | 信用卡、加密货币（Crypto） |
| **自托管** | ❌ SaaS-only（官方没有自托管版；这点和 LiteLLM 开源网关有本质区别） |
| **部署区域** | SaaS 全球边缘节点（官方说 runs at the edge 降低延迟）；但具体 Region Pinning 正在路线图中 |

---

## ❌ 明确不做 / 能力边界（BY DESIGN，战略性不碰）

| 维度 | 不做的事情 | 原因分析 |
|------|-----------|---------|
| **后端基建** | ❌ Authentication / ❌ Database / ❌ Storage / ❌ Edge Functions | 战略定位纯 Gateway，不与 Supabase/Firebase/Vercel 正面竞争 |
| **部署 & 托管** | ❌ 前端托管 / ❌ 容器部署 / ❌ 域名与 HTTPS | 用户自己接 Vercel / Render / AWS |
| **应用层商业闭环** | ❌ 帮开发者向终端用户收费（Stripe Connect 级）/ ❌ 终端用户系统 / ❌ 发票与分润 | 只收开发者的钱，不碰开发者和他用户的关系 |
| **Agent 编排** | ❌ 端到端 Agent Workflow 编排 / ❌ 记忆层 / ❌ RAG Pipeline | 纯模型层，不与 LangChain / Crew AI / Vectoree 这类上层抢饭碗 |
| **开源 & 自托管** | ❌ 没有自托管版 / ❌ 核心路由不开源 | 商业壁垒在于规模效应（200T Token/月带来的议价权+路由数据），和 LiteLLM 等开源网关定位完全不同 |
| **企业 SSO/SAML 成熟度** | ⚠️ 正在完善中（2026 年路线图项），目前可能不如大厂成熟 | 企业客户早期痛点，但 CapitalG 背书后预计加速补齐 |
| **数据驻留 / 区域锁定** | ⚠️ 公开路线图项，尚未全量支持 | 欧盟 GDPR、金融行业合规的硬需求，预计 2026 H2-H2 推出 |

---

## 🧠 和 Vectoree 的功能重叠度 & 关系定位（关键）

| Vectoree 核心模块 | OpenRouter 是否已有 | 对比 & 关系建议 |
|------------------|------------------|----------------|
| 模型商城 / Model Plaza | ✅✅ 做得比 Vectoree 更深（400+ 模型 + 多维筛选 + 开放排名） | **建议：深度集成 OpenRouter，不重复造模型商城轮子**。Vectoree 自己的 Model Plaza 只做「精选 + 定价包装 + 装配线模板适配」，底层接入 OpenRouter 的 400+ 模型池；省下来的精力打上层商业闭环 |
| 模型网关 / 路由 / Failover | ✅✅ 行业最强（200T Token/月规模） | **建议：Vectoree 的模型接入层直接走 OpenRouter**，把容灾、路由、多 Provider 切流全部让给专业层，自己只做「用户侧配额/计价封装」 |
| 模板 Templates / 一键启动 | ❌ 完全没有 | Vectoree 核心差异化，继续深耕 |
| 技能中心 / Skill / Agent 装配线 | ❌ 纯 Gateway 不碰 | Vectoree 核心价值区 |
| 认证 Auth / 多租户 | ❌ 完全不碰（纯开发者 Key 制） | Vectoree 核心差异化（B2B2C：开发者的用户直接登录 Vectoree 部署的 Agent） |
| 支付 & 钱包 Billing（给开发者向终用户收费） | ❌ 完全不碰（只收开发者充值） | **Vectoree 最大护城河之一**，必须端到端自己做 |
| 数据库 DB / Storage | ❌ 完全不碰 | Vectoree 可集成 Supabase / Neon 等 Best-in-Class，不必自研 |
| 部署 / 域名绑定 / HTTPS | ❌ 完全不碰 | Vectoree 核心体验区（一键上线） |
| 成本控制 / 消费洞察 | ✅ 5 层控制体系非常成熟 | Vectoree 可以学习 OpenRouter 的控本分层设计，但 Vectoree 还要加一层「开发者把模型成本转嫁给终端用户」的计价逻辑 |
| 自研模型 / 专用路由 | ✅ 有 Auto Router / Fusion / Owl Alpha 等 | Vectoree 短期不用自研模型，深度整合 OpenRouter 的自研路由即可；等有了规模数据再考虑训练自己的装配线专用模型 |

---

## 🔗 参考资料

- [OpenRouter Docs 首页](https://openrouter.ai/docs)
- [OpenRouter Models 商城](https://openrouter.ai/models)
- [OpenRouter Blog: What Is an LLM Gateway? (2026-06)](https://openrouter.ai/blog/insights/llm-gateway/)
- [OpenRouter Blog: Set Up Team AI Spend Controls (2026-08)](https://openrouter.ai/blog/tutorials/team-spend-controls-setup/)
- [AgenticIndex Vendor Capability Matrix](https://agenticindex.io/vendors/openrouter)
- [ToolChase: OpenRouter Key Features + Pros/Cons](https://toolchase.com/tool/openrouter/)


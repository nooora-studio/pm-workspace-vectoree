---
title: "Supabase - Profile"
description: "Supabase 间接竞品简介：定位、融资、规模、背景"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://supabase.com/"
tags: ["competitor", "supabase", "profile", "indirect", "baas", "postgres", "auth", "vector-db"]
owners: ["PM"]
sources: ["https://supabase.com/", "https://7wdata.be/company/supabase/", "https://gaxonline.com/rankings/devtools/supabase/", "https://www.aiwiki.ai/wiki/supabase", "https://blog.csdn.net/yeqinglengjin/article/details/153107963"]
---

# Supabase · 竞品简介（间接竞品）

## 🎯 一句话定位
**The Open Source Firebase Alternative** — 基于 PostgreSQL 的开源 BaaS（后端即服务），把「托管数据库 + 认证 + 存储 + 实时同步 + 边缘函数 + 向量搜索」打包成一个开发者友好的平台，替代 Firebase 的 NoSQL 厂商锁定。

---

## 🏷️ 官方 Slogan & 核心主张

| 来源 | 文案 |
|------|------|
| 首页 Headline | **Build in a weekend. Scale to millions.** |
| 首页 Sub-headline | Start your project with a **Postgres database**. Add **Authentication, Data APIs, Edge Functions, Realtime Data, Storage, and Vector embeddings**. |
| 官方定位锚点 | ① Every project is **a full Postgres database** ② **100% portable**（不锁厂商，随时可以把数据库导出来自己跑） ③ **Built-in Auth with RLS**（行级安全开箱即用） ④ Easy to extend（40+ Postgres 扩展预装） |
| 第三方评测总结（GAX 2026） | the BaaS the modern indie SaaS **actually defaults to in 2026** — 默认后端选项 |
| CSDN 增长分析 | Stack Overflow 2025 **唯一保持正增长的主流 BaaS 平台**（使用率 3.8% → 5.4%，Firebase 同期下降） |

---

## 👥 创始团队 & 背景

| 角色 | 姓名 | 履历 |
|------|------|------|
| Co-founder & CEO | **Paul Copplestone** | 新加坡 Entrepreneur First（EF）加速器项目出身；连续创业者，偏运营与开发者社区型 CEO |
| Co-founder & CTO | **Ant Wilson** | 与 Paul 共同在 EF 搭档；负责 Supabase 底层 Postgres 架构与工程体系 |
| 公司总部 | 新加坡 Singapore | 2020 年 1 月立项，EF 新加坡批次 |

> 关键文化：**反主流 enterprise contract 策略** — 公开拒接百万美元级大企业定制合同，刻意保持产品聚焦在开发者 / 小团队，不被大客户需求牵着走（7wdata 2026 报道公开确认）。

---

## 💰 融资与背书

| 轮次 | 时间 | 金额 | 估值 | 背景备注 |
|------|------|------|------|---------|
| 种子 / Pre-A / A / B / C（4 轮累计） | 2020-2024 | ~$232M | — | EF Singapore 出道，多轮 VC 加注 |
| **Series D** | **2025 年 3 月** | **$202M** | **$2B** | 正式迈入独角兽级 |
| **Series E** | **2025 年 10 月** | **$100M** | **$5B** | 7 个月估值再翻 2.5 倍 |
| **总融资额** | 截至 2025-10 | **$544M**（6 轮） | — | 现金储备充足 |

> **关键信号（2025 年 12 月）**：与 AWS 达成战略合作伙伴关系，推出 **S3 Analytics Buckets** 和 **Vector Buckets** —— 允许用户把分析型和向量工作负载从 Postgres 卸载到成本更优的 S3 原生基础设施，标志着从纯托管 Postgres 向「Postgres + S3 双引擎」数据层演进。

---

## 📊 产品规模与指标（截至 2026-Q2）

| 指标 | 数值 | 来源 |
|------|------|------|
| 累计注册开发者 | **4M+ developers**（2024 年 1M → 2025 年 4M，×4 增长） | 7wdata / CSDN 交叉 |
| 员工人数 | **351 人**（2025 年 112 人 → 2026-04 351 人，×3.1 扩张） | 7wdata |
| 总数据库创建数 | **15.1M+ databases**（仅 2025 年单年新增量 = 过去所有年份总和） | 7wdata |
| 活跃项目（估算） | 数百万级活跃项目（Free Plan 限 2 个/人，Pro Plan 多项目无限） | 结合 Developer 数 × 平均项目密度推测 |
| ARR（年经常性收入） | **~$70M ARR（2025 年）**（2024 年 $16M → **4.4× 增长**） | 7wdata |
| GitHub Stars | **82,900+**（Apache 2.0 开源，社区热度顶级） | CSDN / GitHub 官方页 |
| Discord 社区成员 | **20,000+** | CSDN |
| GAX 综合评分 | **87 / 100**（3,920 条真实用户评论加权，DX=94，Pricing Value=92） | GAX 2026 Nov Review |
| Stack Overflow 2025 BaaS 使用率 | **5.4%**（同比 3.8% → 5.4%，唯一正增长） | CSDN |
| YC 公司渗透率 | **1,000+ Y Combinator 公司**在用 Supabase 做后端 | 7wdata / GAX |
| 公开客户标杆 | Mobbin、Firecrawl、Rally、Hyper、E2B、Brevo、eXp Realty、Pebblely、Kayhan Space、Shotgun、Chatbase | 官网 Customer Stories + 7wdata |

### ⚠️ 客户结构公开数据（非常重要的信号）
> 来自 7wdata 2026 深度画像：
> - **81.5% 的 Supabase 付费客户是 1–10 人小团队**
> - **60.2% 的客户是 2020 年后才成立的新公司**
> - 客户画像：BaaS 行业里最年轻、团队最小的客户群
> - Supabase 官方主动拒接百万美元级企业大单，刻意维持这一结构

---

## 🎯 目标用户（按 Supabase 自己的产品定位排序）

| 优先级 | 用户画像 | 典型场景 | 为什么选 Supabase 而不是 Firebase / AWS 自搭 |
|--------|---------|---------|-------------------------------------------|
| P0 | **Indie Hacker / 单人/两人 SaaS 创始人** | 周末花 2 天出 MVP，下周拿 Vercel 部署上线收钱 | 免费版就够用；Postgres 比 Firestore 强 100x；RLS 不用自己写鉴权中间件 |
| P1 | **YC / 天使轮 / Pre-A 早期 AI 创业团队** | 做 AI Native 应用，Postgres + pgvector 存 embeddings，Auth 做用户系统，Edge Functions 调 LLM | Vectoree 的**直接集成目标客户**：这些团队本来就要拼 Supabase + Vercel + Clerk + Stripe + OpenRouter，Vectoree 可以把他们的拼装配线 1 键完成 |
| P2 | **AI/ML 团队（pgvector 刚需）** | RAG 检索、向量搜索、Semantic Cache | 不用额外维护 Pinecone/Weaviate，pgvector 就够，一张表存 metadata + vector 省了跨库关联 |
| P3 | **Firebase 难民（逃离 NoSQL 锁定）** | Mobbin 这种 20W+ 用户产品从 Firebase 迁过来，解决 Auth 麻烦 + 省成本 | 迁移后立刻解决历史 Auth 问题；数据 100% 可导出到任何 Postgres |
| P4 | **中大型团队（< 200 人）的非核心业务** | 内部工具、运营后台、原型实验 | 核心业务还是 AWS RDS / GCP Cloud SQL，但非核心 / 原型用 Supabase 几天就能出结果 |

---

## 💡 核心问题 & 解决方案（官方叙事 + 第三方验证）

### 他们定义的问题（官方 + 第三方共识）：
1. **Firebase 的 NoSQL 厂商锁死 + 定价黑盒**：用 Firestore 做 SaaS 超过一定规模会发现 — NoSQL 连表、事务、复杂统计都要绕；定价按读写计费 unpredictable，一个 bug 就烧掉几千美元。
2. **纯自搭 AWS/RDS 成本高、速度慢**：团队小、要 MVP，根本没时间搞 VPC + 安全组 + RLS + Auth 服务 + 存储桶 + CDN + 边缘函数 + 连接池。
3. **多服务拼接 DX 差**：用 Postgres (Neon/RDS) + Clerk (Auth) + AWS S3 (Storage) + Cloudflare Workers (Edge) + Pusher (Realtime) 每个都好，但连起来要写 5 种 SDK、5 种安全规则、5 套控制台。

### Supabase 的解决方案：
> 在一个 Studio Dashboard 里用一套 SDK 一次性提供：
> - ① **100% 原生 PostgreSQL（可随时搬走）**
> - ② **Auth (GoTrue) + RLS 安全深度绑定**（在 DB 层鉴权，API 层绕不开）
> - ③ **Realtime（DB WAL 监听 → WebSocket）**（不用写 Polling）
> - ④ **Storage（S3 兼容 + RLS 同样生效）**（文件权限也走 DB 策略）
> - ⑤ **Edge Functions（Deno + TypeScript）**（毫秒级冷启动，285+ 城市边缘）
> - ⑥ **pgvector 原生内置**（Vector 模块首屏推荐）
> - ⑦ **自动生成 REST / GraphQL API（PostgREST）**（改 schema 立刻生效，OpenAPI 文档自动出）

---

## 🗺️ 产品矩阵全景（6 大模块 + 1 平台管理 + 生态连接）

```
Supabase Studio Dashboard（统一控制台）
├─ Postgres Database   ← 核心底座，40+ 扩展（pgvector / pg_cron / PostGIS / pg_net …）
├─ Authentication      ← GoTrue：邮箱/OTP/OAuth/Magic Link/MFA + RLS
├─ Data APIs           ← PostgREST：REST/GraphQL 自动生成，RPC 支持
├─ Edge Functions      ← Deno + TS：全球边缘，毫秒冷启，+ Database Webhooks
├─ Realtime            ← Elixir：DB 变更流 / Broadcast / Presence 三种模式
├─ Storage             ← S3 兼容 + 全球 CDN + RLS 统一权限 + 图片实时转换
├─ Vector (pgvector)   ← 向量搜索：HNSW / IVFFlat 索引，SQL 原生 join
└─ 平台层：Branching / Backups / Log Drains / Advisors（AI 安全+性能 linter）
```

---

## 🚀 他们宣称的未来（Where They're Going）

> 结合 2025-12 AWS 合作 + 2025-10 Series E 资金用途 + CEO 公开访谈：
> 1. **从「Postgres BaaS」升级为「Postgres + S3 双引擎数据平台」**：热 OLTP 留在 Postgres，冷分析/大向量工作负载卸载 S3 Buckets，成本再降一截（对标 Snowflake 的分离存储计算架构思路）
> 2. **AI Workflow 进一步原生集成**：更多 AI Advisor（数据库安全顾问、性能顾问、RLS 策略编写助手）+ MCP（Model Context Protocol）官方支持 —— 让 Claude Code / Cursor / Windsurf 这些 AI IDE 直接操作 Supabase
> 3. **Preview Branching 全面推广**：数据库像 Git 一样建分支，PR 预览环境自动带对应 DB 快照分支 — Vercel Preview Deployments 的完美拍档
> 4. **生态市场（Templates/Integrations）**：不做 SaaS 应用市场，但会做「开发者模板 + 第三方集成」市场；Stripe、Vercel、OpenAI、LangChain 深度联动模板会越来越多
> 5. **企业端继续克制但不缺席**：HIPAA add-on（Team Plan $599+）、SOC2/ISO27001 认证（已有）、SSO/SAML（Dashboard 已有）、但不会为了大客户定制破坏开发者体验

---

## 🧭 相对位置：Supabase 在 Vectoree 价值链中的定位（核心判断）

| 维度 | Supabase | Vectoree | 关系判断 |
|------|---------|----------|---------|
| **核心产品层** | BaaS（后端即服务）：DB / Auth / Storage / Edge / Realtime / Vector — **纯后端基建层** | Agent SaaS 全栈 PaaS：**模型层（接 OpenRouter） + 后端层（集成 Supabase） + 部署层（Vercel 级） + 变现层（Stripe Connect 分润）** | **Vectoree = Supabase + OpenRouter + Vercel + Stripe Connect + 模板装配线** 的全栈胶水组合 |
| **不做的事** | ❌ 不做终用户 SaaS 计费（只收开发者 DB 月租）<br>❌ 不做前端托管/部署/域名绑定<br>❌ 不做 Agent 工作流装配/模板市场<br>❌ 不做 B2B2C 分润体系（Stripe Connect 级） | ✅ 这些 Supabase 不做的全是 Vectoree 要做的 | **完美互补，零价值冲突** |
| **目标用户重合** | 开发者 / 小团队 后端基建选型 | 想把 Agent 做成 SaaS 上线赚钱的 PM / 创始人 | 高度重叠 → Vectoree 精准用户 = 「已经在用 Supabase + Vercel + Stripe + OpenRouter 拼产品的那群人」 |
| **对 Vectoree 的最高价值启示** | 建议 Vectoree **把 Supabase 作为默认后端 Provider 深度集成**，不自己造数据库/鉴权轮子；Vectoree 的后端价值是「自动帮用户生成符合 RLS 的表结构、预设 Storage 桶、Edge Functions 模板」，而不是重写一套 Postgres 托管服务 |  |  |

---

## 🔗 参考资料

- [Supabase 官网](https://supabase.com/)
- [Supabase 定价页（含套餐明细 + Compute 阶梯）](https://supabase.com/pricing)
- [7wdata 公司档案（融资/客户结构/ARR/近期新闻）2026-08 更新](https://7wdata.be/company/supabase/)
- [GAX Online 深度评测（87 分，60 天实测三家项目，2026 Nov 发布）](https://gaxonline.com/rankings/devtools/supabase/)
- [AIWiki 产品定位 + 技术栈简介](https://www.aiwiki.ai/wiki/supabase)
- [CSDN 中文深度分析（开源社区 + 架构拆解 + 增长路径）2025-10 发布](https://blog.csdn.net/yeqinglengjin/article/details/153107963)
- [官方案例：Firecrawl（从 Pinecone 迁到 Supabase Vector）](https://supabase.com/customers/firecrawl)
- [官方案例：Mobbin（20W 用户从 Firebase 迁移）](https://supabase.com/customers/mobbin)


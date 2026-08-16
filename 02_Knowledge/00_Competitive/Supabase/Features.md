---
title: "Supabase - Features"
description: "Supabase 间接竞品功能拆解：有什么/没什么/能力边界"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "REVIEW"
version: "1.0"
competitor_type: "INDIRECT"
website: "https://supabase.com/"
tags: ["competitor", "supabase", "features", "indirect", "baas", "postgres", "auth"]
owners: ["PM"]
sources: ["https://supabase.com/docs", "https://supabase.com/database", "https://gaxonline.com/rankings/devtools/supabase/", "https://www.aiwiki.ai/wiki/supabase", "https://blog.csdn.net/yeqinglengjin/article/details/153107963"]
---

# Supabase · 功能模块拆解（间接竞品）

> 一句话产品形态：**Postgres 后端基建一体化打包 BaaS**（Auth / Storage / Realtime / Edge Functions / Vector），核心价值是把后端从「AWS 自搭 2 周 + 拼 5 家 SDK」压缩到「Studio 点几下 10 分钟 + 一个 SDK」。
>
> **与 Vectoree 的互补逻辑**：Vectoree 要做的是把 Supabase 的「后端基建能力」、OpenRouter 的「模型接入能力」、Vercel 的「前端部署能力」、Stripe Connect 的「分润能力」**用装配线串起来**，让用户不用一个一个账号注册配置。

---

## 🧱 总览：6 大产品域 + 3 个平台工具 + 1 个统一 SDK

```
┌──────────────────────────────────────────────────────────────────────┐
│                        Supabase Unified SDK                           │
│               JS / TS / Python / Go / Dart / Flutter …                │
├──────────────────────────────────────────────────────────────────────┤
│              F1 Postgres Database     │        F2 Authentication     │
│         (pgvector / pg_cron /        │   (GoTrue + RLS 深度绑定)       │
│         PostGIS / pg_net / 40+ 扩展) │   OAuth / OTP / MFA / Magic    │
├──────────────────────────────────────────────────────────────────────┤
│              F3 Data APIs (PostgREST) │       F4 Edge Functions       │
│     REST / GraphQL / RPC 自动生成    │   Deno + TypeScript 全球边缘     │
│    OpenAPI 自动文档 / 类型自动生成   │   毫秒冷启动 / Database Webhook   │
├──────────────────────────────────────────────────────────────────────┤
│              F5 Realtime (Elixir)     │         F6 Storage + Vector    │
│   DB WAL 监听 → Broadcast / Presence │   S3 兼容 + 全球 CDN + 图片转换  │
│       / Postgres Changes             │   pgvector 向量 / HNSW / IVFFlat │
├──────────────────────────────────────────────────────────────────────┤
│          F7 平台增强：Branching / Backups / Advisors / Log Drains    │
├──────────────────────────────────────────────────────────────────────┤
│   WHAT SUPABASE DOES NOT TOUCH (BY DESIGN OR INCAPABILITY)            │
│  ❌ B2B2C 终用户计费 ❌ 前端托管/部署/域名  ❌ Agent 装配线/模板市场   │
│  ❌ 模型商城/LM Gateway ❌ 私有化/自托管(除 K8s Helm /自编译外非官方)   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📦 功能域 F1：Postgres Database（绝对核心，占 Supabase 70% 价值）

一句话：**不是「封装了的 Postgres」，是「100% 原生 Postgres」** — 你可以用任何 Postgres 客户端（psql / pgAdmin / DBeaver）直接连，随时把 pg_dump 导出来自己跑。

| # | 子功能 | 说明 |
|---|--------|------|
| F1-1 | **100% 原生 PostgreSQL 15+** | 没有魔改版本，标准的 Postgres 实例 —— 这是 Supabase 和 Firebase 的根本差异（Firebase 是自研 NoSQL 黑盒） |
| F1-2 | **40+ 预装扩展（Extensions）** | pgvector（向量）、pg_cron（定时任务）、PostGIS（地理空间）、pg_net（SQL 里发 HTTP 请求）、pg_trgm（模糊搜索）、hstore（KV）、uuid-ossp 等 |
| F1-3 | **pgvector 向量能力**（AI 时代最大加速器） | HNSW / IVFFlat 两种索引；SQL 原生 JOIN 元数据表 + 向量搜索；不用额外学 Pinecone/Weaviate 查询语法；**2025-12 AWS S3 Vector Buckets 支持**（大向量卸载到 S3 降本） |
| F1-4 | **Table Editor（表格编辑器）** | Studio 内建 Notion 式表格 UI，非工程师也能增删改表 / 字段 / 外键 / 索引 |
| F1-5 | **SQL Editor（带 AI 助手）** | Studio 内置 SQL 编辑器 + AI 助手：自然语言写 SQL / RLS 策略 + Advisor 给出性能 / 安全建议；历史 + 保存共享片段 |
| F1-6 | **行级安全 RLS（Row Level Security）** | Postgres 原生 RLS + Supabase 深度整合：Auth JWT 的 `auth.uid()` / `auth.role()` 在 SQL 里直接用；API 层 / Storage 层 / Realtime 层**全部统一生效**，无法被绕过 —— 这是 Supabase 安全架构的灵魂 |
| F1-7 | **Schema 自省 + API 自动生成（PostgREST）** | 改表结构 → REST/GraphQL API 立刻同步更新 + OpenAPI 文档自动出 + TypeScript 类型自动生成；0 后端代码 |
| F1-8 | **Supavisor 连接池**（自研 Elixir） | 云原生多租户连接池，支持 Transaction Mode（6543 端口，Serverless 场景）和 Session Mode（5432 端口，长连接场景）；解决 Postgres 连接数天花板问题 |
| F1-9 | **Compute 阶梯可平滑伸缩** | Micro (2C1G / $10) → 16XL (64C256G / $3,730)；生产项目 Free 升 Pro 不用停机，按量平滑切档 |
| F1-10| **Database Advisors（AI 安全 + 性能 Linter）** | Studio 自动扫描：RLS 策略是否有洞、索引是否缺失、查询是否慢、外键是否有孤儿行、pgvector 索引是否选错类型 → 一键建议修复 |
| F1-11| **pg_cron 调度** | 直接在 SQL 里 `SELECT cron.schedule('0 0 * * *', $$DELETE FROM ...$$)`；省掉写 Lambda / Cloud Scheduler |
| F1-12| **AWS S3 Analytics / Vector Buckets（2025-12）** | 分析型 SQL（大 Scan、聚合统计）和超大向量数据集自动卸载到 S3 原生对象存储，按 TB 计费比 Postgres SSD 便宜 10x；热数据留 Postgres，冷数据走 S3，对应用层透明 |

---

## 📦 功能域 F2：Authentication（GoTrue + RLS 深度整合）

一句话：**行业里唯一一个「鉴权在数据库层生效」的 BaaS**；Clerk / Auth0 等外部 Auth 做不到 RLS 在 DB 里直接鉴权。

| # | 子功能 | 说明 |
|---|--------|------|
| F2-1 | **邮箱 + 密码注册 / 登录** | 标准流程，邮箱验证邮件、重置密码邮件模板可自定义（自定义 SMTP） |
| F2-2 | **Magic Link（无密码登录）** | 发一封带 token 的邮件，点链接直接进 — 适合不想记密码的场景 |
| F2-3 | **OTP（一次性密码）** | 邮箱 OTP / 短信 OTP（集成 Twilio / MessageBird 等） |
| F2-4 | **OAuth 15+ 提供商** | Google / Apple / GitHub / Facebook / X(Twitter) / Discord / Slack / Azure / GitLab / LinkedIn / Spotify / Twitch / 微信（需自定义）等全量 |
| F2-5 | **SSO / SAML**（Team Plan 起） | 企业级 SSO：Okta / Azure AD / OneLogin 等 SAML/OIDC 对接；Dashboard SSO + 应用内 SSO 双用 |
| F2-6 | **MFA（多因素认证）** | TOTP（Google Authenticator / 1Password）官方原生支持 |
| F2-7 | **JWT 与 RLS 深度绑定** | Auth 签发的 JWT 携带 `sub`（用户 ID）、`role`、`email` 等 claim；在 Postgres SQL 里直接 `auth.uid()` / `auth.jwt() ->> 'email'` 拿，RLS 策略直接写 `user_id = auth.uid()` 就能在 DB 级把别人的行拦掉 — API / Realtime / Storage 全链路一致生效 |
| F2-8 | **匿名用户（Anonymous Sign-In）** | 先以匿名身份记录数据（购物车 / 草稿），再在用户真正注册时把匿名数据 merge 到正式账号 |
| F2-9 | **登录 IP 限制 / 防暴力破解** | 密码尝试限流、IP 粒度封禁策略 |
| F2-10| **MAU 计费（Monthly Active Users）** | 不按注册用户数收，按月活收 — 测试用户 / 僵尸用户不收费；免费版 50K MAU，Pro 100K MAU（超了 $0.00325 / MAU） |

---

## 📦 功能域 F3：Data APIs（PostgREST + pg_graphql）

| # | 子功能 | 说明 |
|---|--------|------|
| F3-1 | **REST API（PostgREST，Haskell 写的）** | 表 schema 一改自动 reflect；支持复杂条件：过滤 / 排序 / 分页 / 任意 JOIN（一对一 / 一对多 / 多对多嵌套 select）；官方实测读取比 Firebase 快 4x，写入快 3.1x |
| F3-2 | **GraphQL API（pg_graphql）** | Postgres 扩展，SQL schema 自动生成 GraphQL type；Resolver 直接在 DB 层执行，比传统 Node GraphQL Server 少了一跳 |
| F3-3 | **RPC（Remote Procedure Calls）** | 写 Postgres Function（PL/pgSQL / PL/Python / PLV8 等都行）→ PostgREST 自动暴露成 API 端点 — 复杂业务逻辑不用写后端服务 |
| F3-4 | **API Key 两档（anon / service_role）** | `anon key`：浏览器公开使用，严格受 RLS 约束；`service_role key`：后端/服务端绕过 RLS 直操 DB —— 泄露就完蛋，SDK 严格区分 |
| F3-5 | **OpenAPI 3.x 自动文档** | `GET /rest/v1/` 直接返回 Swagger/OpenAPI 规范 |
| F3-6 | **TypeScript 类型自动生成** | CLI `supabase gen types typescript` 扫表结构 → 生成完整 `Database` 类型，前端 `supabase.from<T>('todos').select('*')` 完全类型安全 |

---

## 📦 功能域 F4：Edge Functions（Deno + TypeScript 全球边缘）

| # | 子功能 | 说明 |
|---|--------|------|
| F4-1 | **Deno Runtime** | 标准 V8 Isolate，毫秒冷启动（比 AWS Lambda 冷启动快 5-10x）；Node 包大部分兼容（通过 `npm:` 前缀） |
| F4-2 | **TypeScript 原生支持** | 不用 tsc 打包，写 .ts 直接 deploy |
| F4-3 | **全球 285+ 边缘节点** | 用户最近的边缘执行，延迟 < 100ms |
| F4-4 | **Database Webhook 触发器** | Postgres 的 INSERT / UPDATE / DELETE 事件直接触发 Edge Function — 不用写 pg_notify + 监听服务 |
| F4-5 | **调用认证** | 自动把 Supabase Auth JWT 注入函数上下文；`ctx.user` 直接拿用户 |
| F4-6 | **内置 Secret Manager** | Dashboard 存 ENV / Secret，不用 .env；Edge 函数自动加载 |
| F4-7 | **CLI 本地开发** | `supabase functions serve` 本地起 Deno，断点调试，部署 `supabase functions deploy` |
| F4-8 | **与 Scheduled Extension（pg_cron）配合** | `pg_cron.schedule(...)` 每天定时调用 Edge Function —— 完整的定时任务闭环 |

---

## 📦 功能域 F5：Realtime（Elixir / Phoenix Channel 实现）

一句话：**Postgres WAL → WebSocket**，不用写 Polling / Pusher / Socket.IO。

| # | 子功能 | 说明 |
|---|--------|------|
| F5-1 | **Postgres Changes** | 监听某张表的 INSERT / UPDATE / DELETE → 浏览器 WebSocket 实时拿到变更行；RLS 同样生效（用户只能收到自己有权限的变更） |
| F5-2 | **Broadcast** | 客户端 Pub/Sub：A 用户发 `channel.send({ type: 'cursor_move', x })` → 同频道 B 用户立刻收到；多人协作光标、在线白板、聊天室 |
| F5-3 | **Presence（状态同步）** | 共享状态追踪（例如「哪些用户在线」「他们的光标在哪」）；Elixir CRDT 实现，跨机房自动路由，**百万级并发连接**已验证 |
| F5-4 | **全球分布式 Elixir 集群** | 地理就近接入，延迟 < 100ms；断线自动重连 + 补发消息 |
| F5-5 | **Channel 级权限** | 基于 Auth JWT + RLS 策略，用户能 join 哪些频道、能发什么事件都能在 DB 层控制 |

---

## 📦 功能域 F6：Storage + Vector（存储与 AI 能力）

| # | 子功能 | 说明 |
|---|--------|------|
| F6-1 | **对象存储（S3 兼容）** | Bucket 概念，和 AWS S3 语义 1:1 — 可以直接用 S3 SDK 连 Supabase Storage endpoint |
| F6-2 | **RLS 级文件权限** | 存储桶权限 = Postgres RLS 策略写；「用户只能下载自己上传的文件」直接一条 SQL RLS 搞定 — 不用写 Lambda@Edge / 预签名 URL 中间件 |
| F6-3 | **全球 CDN（285+ 城市）** | 上传后自动 CDN；图片 URL 加 query params 实时转换尺寸 / 格式 / 质量（`?width=200&format=webp&quality=75`），不用预先处理 |
| F6-4 | **大文件支持 + 分片上传** | 视频、安装包、模型文件都没问题 |
| F6-5 | **pgvector 向量（见 F1-3 详）** | HNSW / IVFFlat 索引；SQL 原生 join；和 metadata 一张表，不跨库 |
| F6-6 | **Embedding 生成的官方合作伙伴模板** | OpenAI、HuggingFace、LangChain 等模板一键初始化 Edge Function，把 pgvector + LLM 连起来（见首页 6 大模板示例） |

---

## 📦 功能域 F7：平台增强（Branching / Backups / Advisors / Log Drains）

| # | 子功能 | 说明 |
|---|--------|------|
| F7-1 | **Database Branching** | 像 Git 一样给数据库建分支 — PR 对应 DB 分支，每个 Vercel Preview Deployment 自动连自己的 DB 分支快照；合并主分支后 schema 自动 diff/migrate |
| F7-2 | **自动备份 + PITR（Point-in-Time Recovery）** | 免费版：每日备份保留 1 天；Pro：每日备份保留 7 天；Team：保留 14 天；付费 add-on 支持 PITR 任意秒级回滚 |
| F7-3 | **Advisors（AI 顾问）** | 安全 Advisor：RLS 缺失 / Key 泄露风险 / 弱密码；性能 Advisor：慢查询 / 缺索引 / 连接数堆积；Schema Advisor：孤儿外键 / 冗余字段 |
| F7-4 | **Log Drains** | 把 Postgres 日志 / Auth 日志 / Edge 日志 / API 日志推去 Datadog / New Relic / Axiom / Logtail；每个 drain $60 / project / month（Pro Plan 起） |
| F7-5 | **Observability Dashboard** | CPU / RAM / Disk / Connection 数 / Query 延迟 / API 请求量 / 错误率图表；慢查询 Top N 一键揪出 |
| F7-6 | **Custom Domain（API 自定义域名）** | 把 `xxxxx.supabase.co` 换成 `api.yourstartup.com`，增强品牌识别 |
| F7-7 | **MCP（Model Context Protocol）官方支持（2026）** | Claude Code / Cursor / Windsurf 这些 AI IDE 直接操作 Supabase：建表、写 RLS、查数据 — 不用切浏览器 |

---

## 🧩 生态 & 集成矩阵（Vectoree 可复用的部分）

| 类别 | 具体项目 / 厂商 | 说明 |
|------|---------------|------|
| **官方合作模板** | [Next.js + Stripe Subscriptions](https://github.com/supabase-community/nextjs-subscription-payments) | 最高星模板：Vercel + Supabase Auth + Stripe Checkout + Customer Portal，全栈 SaaS 起步包 — **Vectoree 可直接作为内部参考模板的骨架** |
| | [Vercel AI SDK AI Chatbot](https://github.com/supabase-community/vercel-ai-chatbot) | Next.js + Vercel AI SDK + OpenAI + Supabase pgvector 对话历史 RAG |
| | [LangChain + Next.js 模板](https://github.com/langchain-ai/langchain-nextjs-template) | LangChain 官方维护的 Supabase Vector 检索模板 |
| | [Flutter / Expo 移动端模板](https://github.com/supabase/supabase/tree/master/examples/user-management/flutter-user-management) | 移动端双端起步包 |
| **部署伙伴** | Vercel（默认推荐）/ Netlify / Render / Fly.io / Railway | Supabase 和 Vercel 是事实黄金搭档 — **Vectoree 如果底层托管用 Vercel 兼容结构，迁移成本极低** |
| **支付伙伴** | Stripe（官方文档主推） / Lemon Squeezy / Paddle | Stripe 有官方 nextjs-subscription-payments 模板；但 Supabase **只提供模板，不提供 Stripe Connect 代签账户能力**（开发者必须自己去 Stripe 申请商户号，这是 Vectoree 的机会点） |
| **AI 模型伙伴** | OpenAI / Anthropic / HuggingFace / LangChain / Firecrawl | Firecrawl 案例：从 Pinecone 迁到 Supabase Vector 获得更好性能 + 更低复杂度 |
| **SDK 语言** | JS/TS（React / Vue / Svelte / Next.js / Nuxt）、Python、Go、Dart（Flutter）、Swift、Kotlin、C#、Rust（社区）、Ruby（社区） | 语言覆盖几乎等于 Postgres 生态 |
| **自托管选项（社区向）** | Supabase K8s Helm Chart / Docker Compose 自部署 | 官方不提供商业支持，但源码全开源可以自己搭；适合极端合规场景 |

---

## ❌ 明确不做 / 能力边界

| 维度 | 不做的事情 | 根因 / 影响 |
|------|-----------|------------|
| **B2B2C 终用户计费分润** | ❌ 不会做「开发者的用户在 Supabase 部署的应用里付钱、Supabase 抽成」 | 这是 Supabase 的战略边界 — 他们只收开发者的 DB 订阅费，**绝不会碰 Stripe Connect 级的代商户体系**（会与客户直接竞争） |
| **前端托管 + 部署 + 域名 HTTPS** | ❌ 不做 Vercel / Netlify 级托管；只有 Edge Functions（纯函数，不能发静态资源） | 战略上和 Vercel 深度绑定合作，自己不做这一层 |
| **Agent 装配线 + 模板市场** | ❌ 不做「选模板 → 配模型 → 配权限 → 一键上线 SaaS」的向导式装配；只有代码级 examples 仓库 | 他们的 DX 是「开发者写代码」，不是「非工程师拖拖拽拽」 |
| **LLM Gateway / 模型商城** | ❌ 自己不接模型路由 / 比价 / Failover；只留 Edge Functions 调 LLM API | OpenRouter / Together AI / Anarchy AI 这一层他们明确不碰 |
| **私有化官方支持** | ⚠️ 有开源自部署路径，但官方 Enterprise 的 BYO Cloud 仅支持通过合作表单对接，不是第一优先（对比 Firebase 有 GCP 原生自部署路径） | 金融/政府/强合规场景需要客户自己折腾或走 Enterprise 定制 |
| **大规模实时协作（Figma 级）** | ⚠️ Realtime 的 Broadcast/Presence 好用，但真正 1000+ 人同频协作大文档还是要自搭 CRDT / Yjs 层 | 不是实时协作基础设施，只是 DB 变更广播通道 |
| **Free Tier 项目休眠** | ❗ 免费计划项目 **1 周不活动自动暂停**，需要人工重新激活；免费版最多同时 2 个项目 | Indie Hacker 做长期展示站会被休眠（这是 Vectoree 免费版可以反打的痛点 — 我们的免费版「上线即永不休眠」） |
| **Serverless 数据库 Scale-to-Zero** | ❌ Compute 层不自动缩到 0（和 Neon 有本质区别）；最低档 Micro 也要 $10/月（Pro 含 1 个 Micro free credit） | 冷项目持续花钱，对有大量闲置项目的团队不如 Neon 经济 |

---

## 🧠 和 Vectoree 的功能重叠度 & 互补矩阵（关键）

> 结论先行：**两者重叠 < 10%，互补 > 90%；是 Vectoree 最理想的「默认后端 Provider」候选，不是敌人。**

| Vectoree 核心模块 | Supabase 是否已有 | 对比 & 关系建议 |
|------------------|------------------|----------------|
| 模型接入层（Model Plaza） | ❌ 完全没有 | Vectoree 接 OpenRouter，和 Supabase 没关系 |
| 模板 Templates / 一键启动 | ❌ 只有代码级 Examples 仓库（要 clone、要改 env、要部署） | **Vectoree 的最大差异化**：把 Supabase + OpenRouter + Vercel + Stripe 要做的 20 步配置（每个都要注册账号、填 env、写胶水代码）压缩成 3 步向导 |
| 数据库 DB | ✅✅✅ 行业最强之一 | **强烈建议 Vectoree 把 Supabase 作为默认后端选择**，同时给高级用户选项：接自己的 Supabase 项目 OR 自己的 Postgres（Neon/RDS）；Vectoree 自己不维护 Postgres 集群（省掉 SRE 级重投入） |
| 鉴权 Auth / 用户系统 | ✅✅ 深度整合 RLS（行业最佳） | Vectoree 的用户分两层：①「开发者账号」（Vectoree 自己的 Auth） ②「开发者的终端用户账号」（默认用 Supabase Auth + MAU 定价，给高级用户选项：接自己的 Clerk / Auth0） |
| 对象存储 Storage | ✅ RLS 统一权限 + 全球 CDN | 默认用 Supabase Storage（pgvector + 存上传文件同一套 auth）；高级用户可选自己的 S3 / Cloudflare R2 |
| 边缘计算 Edge Functions | ✅ Deno 全球边缘 + DB Webhook | Vectoree 的 Agent 工作流默认跑在 Supabase Edge Functions 上（LLM 调用、API 请求、RAG 检索），开发者不用单独管 Cloudflare Workers 账号 |
| 部署 & 域名 & HTTPS（前端托管） | ❌ 完全没有（只提供 Edge Functions，不发 HTML/JS/CSS） | **Vectoree 核心差异化（与 Vercel 层对应）**：前端项目一键 Build & Deploy & Bind Domain；如果 Vectoree 底层直接托管在 Vercel（最理想），Supabase + Vercel 就是开发者原有的黄金组合 |
| B2B2C 终用户计费 & 分润 | ❌ 完全没有（开发者要自己拼 Stripe Checkout + Webhook + 计费表） | **Vectoree 第一护城河**：开发者在 Vectoree 上架 Agent SaaS，他的用户直接付费 → Vectoree 自带 Stripe Connect 分润能力，开发者不用自己申请商户号 / 做 PCI 合规；这是 Supabase「永远不会做」的事（做了就和开发者客户竞争） |
| 消费洞察 & 成本控制 | ✅ MAU 计费 + Compute 阶梯 + 日志导出 | Vectoree 在 Supabase 粒度之上再加一层：「开发者把 DB + 模型 + 部署打包成订阅计划，卖给终用户」的 B2B2C 计价层 |
| 生态市场（Template / Skill 市场） | ❌ 只有 GitHub Examples（无售卖、无抽成、无评分） | **Vectoree 第二护城河**：Shopify App Store 模式 — 第三方开发者卖 Agent 模板 / Connector / Skill，终用户一键购买安装，Vectoree 抽成 + 结算 |

---

## 🔗 参考资料

- [Supabase Docs 首页](https://supabase.com/docs)
- [Supabase Database 官方介绍页](https://supabase.com/database)
- [Supabase Auth 官方介绍页](https://supabase.com/auth)
- [Supabase Edge Functions 介绍页](https://supabase.com/edge-functions)
- [Supabase Realtime 介绍页](https://supabase.com/realtime)
- [Supabase Vector 介绍页](https://supabase.com/modules/vector)
- [GAX 2026 深度评测（87/100，三家项目实测 60 天）](https://gaxonline.com/rankings/devtools/supabase/)
- [AIWiki 架构概览 + 组件技术栈](https://www.aiwiki.ai/wiki/supabase)
- [CSDN 中文深度拆解（架构创新：RLS 集成 / 自省 / Elixir 实时集群三大点）](https://blog.csdn.net/yeqinglengjin/article/details/153107963)
- [7wdata 客户结构画像（81.5% 客户 1-10 人）](https://7wdata.be/company/supabase/)
- [GitHub: nextjs-subscription-payments（Stripe 官方模板，Vectoree 装配线骨架参考）](https://github.com/supabase-community/nextjs-subscription-payments)

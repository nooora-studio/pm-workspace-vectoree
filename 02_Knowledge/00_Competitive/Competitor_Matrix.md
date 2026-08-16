---
title: "Competitor Matrix"
description: "竞品横向对比矩阵：直接竞品(Insforge) vs 间接竞品(OpenRouter/Clerk/Supabase/Vercel) 核心维度对比"
author: "PM"
created: "2026-08-13"
updated: "2026-08-13"
status: "IN_PROGRESS"
version: "0.5"
competitors: ["Insforge (DIRECT)", "OpenRouter (INDIRECT)", "Clerk (INDIRECT)", "Supabase (INDIRECT)", "Vercel (INDIRECT)"]
tags: ["competitive", "matrix", "analysis", "overview"]
owners: ["PM"]
---

# 竞品横向对比矩阵（Competitor Matrix）

> 第一版已完成：直接竞品 **InsForge** 的所有核心维度已填入；其余 4 家间接竞品待后续调研补全。

---

## 🎯 核心定位 & 品牌叙事对比

| 维度 | 🟥 InsForge (DIRECT) | ⚪ OpenRouter | ⚪ Clerk | ⚪ Supabase | ⚪ Vercel |
|------|---------------------|---------------|----------|-------------|-----------|
| **官方一句话定位** | **The Agent-Native AWS** | 待补 | 待补 | 待补 | 待补 |
| **Slogan/Headline** | The Agent-NativeCloud Infrastructure Platform | 待补 | 待补 | 待补 | 待补 |
| **目标用户（主）** | 用 Claude Code/Cursor 开发的 Agent Native 开发者 | 待补 | 待补 | 待补 | 待补 |
| **目标用户（次）** | 早期创业团队（2-5人技术栈） | 待补 | 待补 | 待补 | 待补 |
| **融资/背书** | YC P26（Spring 2026，Active） | 待补 | 待补 | 待补 | 待补 |
| **团队大本营** | 旧金山 Bay Area（美） | 待补 | 待补 | 待补 | 待补 |

---

## 📊 产品规模 & 量化指标对比

| 维度 | 🟥 InsForge (DIRECT) | ⚪ OpenRouter | ⚪ Clerk | ⚪ Supabase | ⚪ Vercel |
|------|---------------------|---------------|----------|-------------|-----------|
| **GitHub Stars** | **12.4K ⭐** | 待补 | 待补 | 待补 | 待补 |
| **GitHub Commits（主干）** | **4,433+** | 待补 | 待补 | 待补 | 待补 |
| **开源协议** | ✅ 开源（主仓库公开） | 待补 | 待补 | 待补 | 待补 |
| **自托管能力** | ✅ GCE 一键部署文档 | 待补 | 待补 | 待补 | 待补 |
| **MCP Benchmark（Pass⁴ DB Task）** | **47.6%**（vs Supabase 28.6% / Postgres 38.1%） | 待补 | N/A | 28.6%（基准已知） | N/A |
| **MCP Benchmark（平均耗时）** | **150s**（1.6x 快于 Supabase/Postgres） | 待补 | N/A | 239.2s | N/A |
| **MCP Benchmark（Token 消耗）** | **8.2M**（比 Supabase 少 ~30%） | 待补 | N/A | 11.6M | N/A |

---

## 🧱 后端原语 & 核心模块对比（Vectoree 相关）

| 维度 | 🟥 InsForge (DIRECT) | ⚪ OpenRouter | ⚪ Clerk | ⚪ Supabase | ⚪ Vercel |
|------|---------------------|---------------|----------|-------------|-----------|
| **🔑 Authentication（鉴权）** | ✅ Users/Sessions/OAuth/JWT + RLS + 内置 OAuth Server | ❌ | ✅✅ 核心产品 | ✅ Auth 模块 | ⚠️ 第三方集成 |
| **💾 Database（数据库）** | ✅ Postgres + Migrations + **pgvector 向量** | ❌ | ❌ | ✅✅ 核心产品（Postgres） | ❌ |
| **☁️ Storage（对象存储）** | ✅ S3 Compatible API | ❌ | ❌ | ✅ Storage 模块 | ❌ |
| **🤖 Model Gateway（模型网关）** | ✅ OpenAI 兼容格式 + 多 Provider（含 Kimi K2.5） | ✅✅ 核心产品 | ❌ | ⚠️ 仅有基础 AI 集成 | ❌ |
| **⚡ Edge Functions（边缘函数）** | ✅ Deno Runtime + Webhook + Cron | ❌ | ❌ | ✅ Edge Functions（Deno） | ✅✅ 核心产品（Functions） |
| **🔴 Realtime（实时通信）** | ✅ DB Changes + Pub/Sub（WebSocket） | ❌ | ❌ | ✅ Realtime 模块 | ❌ |
| **🌐 Sites（前端部署）** | ⚠️ **EXPERIMENTAL**（借 Vercel Platform API 转发，非自研） | ❌ | ❌ | ✅ Hosting（但弱） | ✅✅ 核心产品（Next.js 首推） |
| **🐳 Compute（长时容器）** | ✅ Long-running Containers | ❌ | ❌ | ❌（需配第三方） | ⚠️ 需 Serverless Functions + 队列 |
| **📦 总模块数（自研+整合）** | **8 个原语**（Auth/DB/Storage/Gateway/Functions/Realtime/Sites/Compute） | 1 个核心 | 1 个核心 | 5 个核心 | 2 个核心 + 扩展 |

---

## 🛠️ Agent 集成能力对比（Agent-Native 深度）

| 维度 | 🟥 InsForge (DIRECT) | ⚪ OpenRouter | ⚪ Clerk | ⚪ Supabase | ⚪ Vercel |
|------|---------------------|---------------|----------|-------------|-----------|
| **CLI 接入（任意终端通用）** | ✅ `npx @insforge/cli`，官方推荐 | ❌ | ❌ | ⚠️ 有 CLI 但非 Agent-first 设计 | ✅ `vercel` CLI |
| **MCP Server（编辑器直连）** | ✅✅ 云版 + 自托管双支持；**MCPMark 性能第一** | ⚠️ 若有也是基础层 | ❌ | ⚠️ 有，但性能差（Pass⁴ 28.6%） | ❌ |
| **Skill / 插件体系（Agent 级）** | ✅✅ CLI + MCP Skills + `insforge.dev/skill.md`（官方强制 AI 先读） | ❌ | ❌ | ❌ | ❌ |
| **支持的 Agent 编辑器** | ✅ Claude Code / Cursor / Windsurf / Codex 每款独立 Setup Guide | ❌ | ❌ | ❌ | ❌ |
| **Agent 结构化返回** | ✅ 每个原语 JSON Schema + Readable Errors | ❌ | ❌ | ❌ | ❌ |
| **Agent 可回滚写入** | ✅ 分支 + Dry Run + 可回滚 | ❌ | ❌ | ❌ | ❌ |
| **Agent 细粒度权限** | ✅ CLI/MCP 权限隔离 + 人类 Review | ❌ | ❌ | ❌ | ❌ |
| **Config-as-Code** | ✅ 所有配置版本控制 | ❌ | ❌ | ✅ Supabase 部分支持 | ✅ Vercel 配置代码化 |

---

## 💰 定价 & 商业化对比

| 维度 | 🟥 InsForge (DIRECT) | ⚪ OpenRouter | ⚪ Clerk | ⚪ Supabase | ⚪ Vercel |
|------|---------------------|---------------|----------|-------------|-----------|
| **Free 版月费** | **$0** | 待补 | 待补 | 待补 | 待补 |
| **Free 版机制** | ⚠️ **1 周无活动自动休眠**（需手动唤醒） | 待补 | 待补 | 待补 | 待补 |
| **Pro 版月费** | **$25 / month** | 待补 | 待补 | 待补 | 待补 |
| **Enterprise 版** | ✅ 联系销售定制（SSO/SAML/SLA 承诺） | 待补 | 待补 | 待补 | 待补 |
| **核心计费逻辑** | 平台订阅费 $25 起 + 基础设施（DB/Storage/Functions）**按量超额**（模型平价转售或薄利） | 待补 | 待补 | 待补 | 待补 |
| **计费透明度** | ⚠️ 模糊：Pro 超额项（DB/存储/带宽/函数）未在官方明确披露；第三方评测称 high-traffic 会爆账单 | 待补 | 待补 | 待补 | 待补 |
| **B2B2C 终用户收款集成（Stripe Connect 等）** | ❌ 未见 | ❌ | ❌ | ❌ | ❌ |
| **利润来源优先级** | 1. 平台订阅费 2. 基础设施超额 3. 模型薄利（非核心） | 待补 | 待补 | 待补 | 待补 |

---

## 🚀 Human（人类开发者体验）对比

| 维度 | 🟥 InsForge (DIRECT) | ⚪ OpenRouter | ⚪ Clerk | ⚪ Supabase | ⚪ Vercel |
|------|---------------------|---------------|----------|-------------|-----------|
| **Dashboard 可视化体验** | ⚠️ CLI/MCP 优先，人类 Dashboard 相比 Supabase/Firebase 弱（第三方 Cons 明确点出） | 待补 | 待补 | ✅✅ 优秀可视化 Dashboard | ✅✅ 业界标杆 Dashboard |
| **可视化拖配置** | ❌ 几乎没有，以 Code + CLI 为主 | 待补 | 待补 | ✅ SQL 编辑器 + 表结构可视化 | ✅ 部署可视化 |
| **上手文档友好度（给人读的）** | ⚠️ Docs 给 Agent 看的更多（强制要求读 `skill.md`），给人看的教程相对少 | 待补 | 待补 | ✅✅ Docs 完善，Quickstarts 齐全 | ✅✅ Docs 业界标杆 |
| **框架 Quickstarts** | ✅ Next/React/Vue/Nuxt/Svelte 5 款 | 待补 | 待补 | 待补 | 待补 |
| **SDK 支持** | ✅ TypeScript SDK 齐全 | 待补 | 待补 | 待补 | 待补 |

---

## 🧠 对 Vectoree 的优劣势总评

### 🟥 InsForge 的强项（Vectoree 需要差异化规避）
1. **YC 品牌背书 + 豪华创始团队履历**（Ex-Amazon/Databricks/Meta）
2. **开源社区势能（12.4K Stars + 4.4K commits）**，教育心智已经占坑
3. **MCP 基准性能第一（Pass⁴ 47.6%）**，有 CTO 亲写的官方 Benchmark 背书
4. **后端原语配齐（8 个模块）**，一站式能力已达生产可用
5. **Agent 工作流入口卡位（CLI + Skill + MCP 三管齐下）**

### 🟢 Vectoree 可切入的差异化（InsForge 的明确弱项）
1. **Dashboard / Human 体验极差** → 我们打 Human + Agent 双优（Shopify 级 UI）
2. **Sites 部署是实验性且依赖 Vercel 转发** → 我们打自研部署引擎+域名+HTTPS 核心体验
3. **免费版 1 周休眠机制是用户公认痛点** → 我们用「不休眠 + 配额限制」拉早期用户
4. **缺乏 B2B2C 终用户支付集成** → 我们打「部署上线 + 全球收款（Stripe Connect 级）+ 发票分润」商业闭环（核心差异化）
5. **Pro 版超额计费模糊，用户账单焦虑** → 我们打「透明全包档位，超额封顶」
6. **出海区域合规包（东南亚/中东/拉美）** → InsForge 无针对性，我们作为出海属性平台重点打

---

## 📌 补全状态说明

| 竞品 | 类型 | 完成度 | 最后更新 |
|------|------|--------|---------|
| 🟥 **InsForge** | DIRECT | ✅ **100%（核心维度全部填充）** | 2026-08-13 |
| ⚪ OpenRouter | INDIRECT | 🔴 0%（待调研） | - |
| ⚪ Clerk | INDIRECT | 🔴 0%（待调研） | - |
| ⚪ Supabase | INDIRECT | 🔴 0%（部分已知值来自 MCPMark 基准，其余待补） | - |
| ⚪ Vercel | INDIRECT | 🔴 0%（待调研） | - |

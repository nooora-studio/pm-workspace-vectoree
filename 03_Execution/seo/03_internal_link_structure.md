---
title: "Vectoree 内链结构：现状与目标"
description: "产品站可索引内链关系：生产环境现状与 P1 目标结构"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.2"
tags: ["seo", "internal_links"]
owners: ["PM"]
---

# 内链结构：现状 → 目标

> **现状：** 生产环境 `https://vectoree.ai/`（2026-10-14）  
> **目标：** P1 完成后的六模块可索引内链（按产品确认）

---

## 1. 现状

### 1.1 结构图

```text
[/] https://vectoree.ai/
│
├─ [header 锚点]
│     PRODUCT      → #blocks
│     WORKFLOW     → #line
│     DEVELOPERS   → #code
│     CODEX        → #codex
│     PRICING      → #pricing
│     FAQ          → #faq
│     Logo         → #top
│
├─ [header/正文 站内路径]
│     GET STARTED / OPEN CONSOLE → /dashboard/login  (×5)
│
├─ [header 外链]
│     DOCS  → https://docs.vectoree.ai/introduction
│     BLOG  → https://blog.vectoree.ai
│     Discord / X / GitHub
│
├─ [section #blocks]  ← “One console. Four blocks.”
│     Model Plaza | Auth | Database | Storage
│     四张卡片均无链接（不可跳转）
│
├─ [footer · Product]
│     Model Plaza → #blocks
│     Auth        → #blocks
│     Database    → #blocks
│     Storage     → #blocks
│     Pricing     → #pricing
│     FAQ         → #faq
│
├─ [footer · Developers]
│     Documentation → docs.vectoree.ai/introduction
│     Codex         → docs.vectoree.ai/codex
│     Blog          → blog.vectoree.ai
│     @vectoree/cli → npmjs.com/package/@vectoree/cli
│     Agent Skill   → github.com/VectoreeAI/vectoree-skills
│
└─ [footer · Company]
      Feedback → /feedback?source=web-landing&entrypoint=footer
      X / Discord / GitHub

sitemap.xml 仅声明：
  - https://vectoree.ai/
  - https://vectoree.ai/SKILL.md

可索引产品主题节点 /product/* ：0（全部 404）
```

### 1.2 首页链接计数

| 类型 | 目标 | 次数 | 锚文本示例 |
|---|---|---|---|
| 锚点 | `#blocks` | 5 | PRODUCT, Model Plaza, Auth, Database, Storage |
| 锚点 | `#pricing` | 2 | PRICING / Pricing |
| 锚点 | `#faq` | 2 | FAQ |
| 锚点 | `#top` / `#line` / `#code` / `#codex` | 各 1 | Logo / WORKFLOW / DEVELOPERS / CODEX |
| 同站路径 | `/dashboard/login` | 5 | GET STARTED →, OPEN CONSOLE → |
| 同站路径 | `/feedback?...` | 1 | Feedback |
| 家族站 | `docs.../introduction` | 4 | DOCS, READ THE DOCS, Documentation, More in docs |
| 家族站 | `docs.../codex` | 2 | Full guide, Codex → Vectoree |
| 家族站 | `blog.vectoree.ai` | 2 | BLOG / Blog |

### 1.3 现状含义

| 现象 | SEO 影响 |
|---|---|
| 模块没有独立 URL | 模块主题无法被单独收录 |
| Blocks 卡片无链接；Footer 只指锚点 | 爬虫得不到新页面节点；权重挤在 `/` |
| 站内唯一强路径是 login | 索引信号导向转化/登录，而非产品主题 |
| 能力说明在 docs / Dashboard | docs 可检索；Dashboard Disallow；营销域无承接页 |
| 现网 UI 只露出 4 模块 | P1 改首页时需补齐 Tool Hub / Templates 入口 |

---

## 2. 目标

> P1 完成后的目标内链，按已确认 6 模块设计。

```text
[/] Home
  ├─→ /product/model-plaza  ⇄  tool-hub / database
  ├─→ /product/tool-hub     →  model-plaza
  ├─→ /product/templates    →  model-plaza
  │         └─(P2 按需)→ /product/templates/:slug
  ├─→ /product/auth         ⇄  database
  ├─→ /product/database     ⇄  storage / auth
  └─→ /product/storage      →  database

各 /product/*
  ├─→ 对应 docs 篇章（说明，互补）
  ├─→ /dashboard/login（转化）
  └─→ / （回首页）

sitemap 声明：/ + 6 个一级模块页（SKILL.md 可选）
Dashboard / admin：继续 robots Disallow，不进入 SEO 内链网
```

### 目标链接规则

1. **首页 → 六模块**：Blocks 卡片与 Footer 使用 `<a href="/product/...">`  
2. **模块 → 相关模块**：每页 1–2 条，不刷满  
3. **模块 → docs**：链对应说明，不替代营销页正文  
4. **模块 → login**：统一 CTA  
5. **不链**：Dashboard 深链、未上线二级 URL  

模块互链（如 `model-plaza ⇄ tool-hub`）为落地页默认相关边；「首页必须链到 6 个一级页」为硬规则。

---

## 3. P1 验收（内链）

- [ ] 首页六模块均可点进独立 URL（非 `#blocks`，且卡片本身可点）  
- [ ] Footer Product 含六项且均为 `/product/*`  
- [ ] 每个模块页至少：回首页、1 个相关模块、1 个 docs、1 个 login  
- [ ] `/product/*` 匿名 200；源码可见正文与上述链接  
- [ ] sitemap 已包含 `/` + 6 模块页  

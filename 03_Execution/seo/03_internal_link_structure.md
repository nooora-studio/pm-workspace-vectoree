---
title: "Vectoree 内链结构：现状与目标"
description: "产品站可索引内链关系；用于指导首页/模块页链接改造与验收"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.0"
tags: ["seo", "internal_links"]
owners: ["PM"]
---

# 内链结构：现状 → 目标

> 数据基准：2026-10-14 对 `https://vectoree.ai/` 首页 HTML 抓取  
> 用途：SEO「可发现」改造的结构依据；P1 上线后应用目标态复验

---

## 1. 现状：单页锚点网

```text
[/] Home
  ├─ 锚点 → #blocks   ← Footer: Model Plaza / Auth / Database / Storage 全指向这里
  ├─ 锚点 → #pricing / #faq / #line / #code / #codex / #top
  ├─ 路径 → /dashboard/login   （站内几乎唯一业务路径）
  ├─ 路径 → /feedback?...
  └─ 外链 → docs.vectoree.ai · blog.vectoree.ai · GitHub · npm · X …

sitemap 声明： /  +  /SKILL.md
可索引产品主题节点（/product/*）：0
```

### 现状含义

| 现象 | SEO 影响 |
|---|---|
| 模块没有独立 URL | 模块主题无法被单独收录与排序 |
| Footer/卡片指向 `#blocks` | 爬虫得不到新页面节点，权重挤在首页 |
| 能力说明在 docs / Dashboard | docs 可检索；Dashboard 被 Disallow；营销域承接弱 |

### 抓取计数（首页 href，节选）

| 类型 | 示例 | 约出现次数 |
|---|---|---|
| 锚点 | `#blocks` | 5 |
| 锚点 | `#pricing` / `#faq` | 各 2 |
| 站内路径 | `/dashboard/login` | 5 |
| docs | `docs.vectoree.ai/introduction` 等 | 若干 |

---

## 2. 目标：中心辐射 + 模块互链

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

### 目标链接规则（执行用）

1. **首页 → 六模块**：Blocks 卡片与 Footer 必须是 `<a href="/product/...">`  
2. **模块 → 相关模块**：每页 1–2 条即可，不刷满  
3. **模块 → docs**：链到对应说明，不替代营销页正文  
4. **模块 → login**：统一 CTA  
5. **不链**：Dashboard 深链、未上线二级 URL  

---

## 3. P1 验收（内链）

- [ ] 首页六模块均可点进独立 URL（非 `#blocks`）  
- [ ] Footer Product 六项均为 `/product/*`  
- [ ] 每个模块页至少：回首页、1 个相关模块、1 个 docs、1 个 login  
- [ ] 爬虫视角：匿名打开模块页源码可见正文与上述链接  

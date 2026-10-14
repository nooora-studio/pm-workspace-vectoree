---
title: "Vectoree 现网 SEO 评估"
description: "基于 2026-10-14 对 vectoree.ai / docs / blog 的只读抓取；侧重代码结构与信息架构"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.0"
tags: ["seo", "audit"]
owners: ["PM"]
---

# 现网 SEO 评估

> 抓取日期：2026-10-14  
> 范围：`vectoree.ai`、`docs.vectoree.ai`、`blog.vectoree.ai`  
> 视角：可索引结构 / 信息布局（非投放、非外链数据库）

交互版参考：[Vectoree SEO 评估报告 Canvas](https://cursor.com/canvas/store-48fd5195-0e44-47f6-8b03-472b63c3e757/ef473559-de4d-454b-8b35-bb5d26cea2d2)

---

## 1. 核心结论

技术标签（title / description / canonical / OG / JSON-LD / SSR）**已及格**。  
营销站几乎是**单页网站**：无模块级 URL、sitemap 极薄、模块入口不可跳转到独立主题页。  

**瓶颈在信息架构与可索引内容面，不在再堆 meta。**

综合就绪度约 **42/100**（结构向自评，非第三方打分站）。

---

## 2. 维度评分

| 维度 | 分数 | 说明 |
|---|---|---|
| 技术基础（可抓取/元信息） | 72 | title/desc/canonical/OG/JSON-LD/SSR 已具备 |
| 信息架构与 URL 深度 | 18 | 无产品模块独立 URL；页脚指向锚点 |
| Sitemap / 索引覆盖 | 22 | 主站仅 2 条 URL |
| 内容深度（营销域） | 35 | 首页有概览；FAQ 答案未进 SSR |
| 内链与导航 | 28 | 模块卡片不可跳独立页；能力外溢 docs/dashboard |
| 国际化（中英） | 20 | 有语言切换 UI，无 hreflang / 独立中文 URL |
| 文档站 SEO | 82 | docs 有完整 sitemap（约 135 URL）与 meta |
| 品牌与外链资产 | 55 | Blog/GitHub/X/Discord 存在；主站承接弱 |

---

## 3. 关键发现

### P0

| 领域 | 发现 | 证据 | 建议 |
|---|---|---|---|
| 信息架构 | 主站无 `/product/*` | 探测均为 404 | 落地 6 个一级模块页 |
| Sitemap | 仅 `/` 与 `/SKILL.md` | `sitemap.xml` | 与模块页同步扩写 |
| 内链 | 模块与 Footer 指向 `#blocks` | 首页 HTML | 改为 `/product/...` 真链接 |

### P1

| 领域 | 发现 | 建议 |
|---|---|---|
| 内容可抓取 | FAQ 仅问题按钮，答案不在首屏 HTML | 答案写入 DOM（可折叠） |
| 口径 | 抓取时首页为 Four blocks；规划为六模块 | 以产品确认的 6 模块为准推进 |
| 公私分层 | 细节在 Dashboard（已 Disallow）与 docs | 主站做营销页；docs how-to；dashboard 配置 |

### P2

| 领域 | 发现 | 建议 |
|---|---|---|
| 国际化 | 中英按钮无独立 URL | 业务确认后再做 `/zh` + hreflang |
| 分享图 | `og-home.png` 约 1.1MB | 压缩到约 200KB |
| 结构化数据 | 已有 Organization / SoftwareApplication | 模块页可补 Breadcrumb；FAQ 可补 FAQPage |

### 已做好（保持）

- `robots`: `index,follow`；Disallow `/dashboard` `/admin` 等  
- canonical + Open Graph + Twitter Card  
- 首页 H1/H2/H3 与正文在 SSR HTML 中  
- docs：sitemap、页面 meta、`llms.txt`  

---

## 4. 抓取快照（关键）

**robots.txt**

- Allow: `/`
- Disallow: `/dashboard`、`/admin`、`/cli`、`/cloud`
- Sitemap: `https://vectoree.ai/sitemap.xml`

**sitemap.xml（当时）**

- `https://vectoree.ai/`
- `https://vectoree.ai/SKILL.md`

**首页内链特征**

- 锚点：`#blocks`、`#pricing`、`#faq`、`#line`、`#code`、`#codex`
- 站内路径几乎只有：`/dashboard/login`
- 外链：docs / blog / GitHub / npm 等
- Footer 产品项均指向 `#blocks`

**首页公开模块（抓取时文案）**

- Model Plaza、Auth、Database、Storage（Four blocks）  
- 后续产品确认：另含 Tool Hub、Templates，共 6 个，且后两者已在 Dashboard 上线  

---

## 5. 权威工具（执行/验收用）

| 工具 | 用途 |
|---|---|
| Google Search Console | 索引覆盖、sitemap、查询词 |
| Bing Webmaster Tools | Bing 侧索引 |
| Screaming Frog / Sitebulb | 全站抓取审计 |
| Rich Results Test / Schema Validator | 结构化数据 |
| PageSpeed Insights | CWV 参考 |

优先：Search Console + 爬虫审计。在线「SEO 打分站」不宜作验收标准。

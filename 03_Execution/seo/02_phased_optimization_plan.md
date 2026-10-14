---
title: "Vectoree 产品页 SEO 分阶段优化方案"
description: "P0–P2 执行主线：可索引页面结构、信息布局、sitemap 同步原则"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.1"
tags: ["seo", "plan", "information_architecture"]
owners: ["PM"]
---

# 产品页 SEO 分阶段优化方案

> **主目标：** 做好产品页 SEO（可索引结构 + 信息布局）  
> **文档角色：** 执行方案；阶段结论可继续沉淀到本目录其他文件  
> 约束：不大改首页结构；只补有价值页面；可分阶段迭代  
> 模块（已确认）：Model Plaza、Auth、Database、Storage、Tool Hub、Templates（后两者已在 Dashboard 上线）

相关：[评估 01](./01_site_seo_audit.md) · [内链 03](./03_internal_link_structure.md) · [决策 04](./04_key_decisions_and_concepts.md) · [robots/sitemap 05](./05_robots_and_sitemap_notes.md)

---

## 0. 问题定义

核心能力藏在需登录的 Dashboard，公开站几乎是单页；模块没有独立可索引 URL。  
SEO 短板在**可发现的信息架构**，不在再堆 meta。

---

## 1. 五个大方向（执行框架）

| 方向 | 白话 | 本产品动作 |
|---|---|---|
| 可发现 | 有没有门 | 6 模块页 + 真链接 + sitemap |
| 可理解 | 机器懂不懂 | 一页一主题；H1/title；FAQ 进 HTML |
| 有价值 | 值不值得收 | 公开页：是什么 / 为什么 / 能做什么 |
| 体验健康 | 打得开 | 无死链；抽检 |
| 测量迭代 | 是否有效 | GSC 收录/查询词 → 再决定二级页 |

---

## 2. 分阶段执行

### P0 — 定结构

1. 冻结 6 个 URL  
2. 理清内链现状 → 目标（见 [03](./03_internal_link_structure.md)）  
3. 可索引页面树 + 公私边界  
4. robots/sitemap 原则（与页面同步；不多堆 URL）  
5. 6 页内容纲要（先纲要后正文）

**不做：** 首页视觉大改、二级页、开放 Dashboard 索引

### P1 — 最小闭环（页面 / 链接 / sitemap 同步）

等同于此前讨论的 **W1** 范围：

1. 上线 6 个 `/product/*` 一级页  
2. 首页 Six blocks + Footer 真链  
3. FAQ 答案进 HTML  
4. **同发**更新 sitemap（`/` + 6 模块 + `lastmod`）  
5. 匿名抽检：有 H1/正文、无 404  

**原则：** sitemap 与页面同步，不放到最后；未上线 URL 不写进 sitemap。

### P2 — 测量与按需增强

1. 提交 GSC/Bing，看覆盖与查询词  
2. 可选：Breadcrumb/FAQ schema、OG 压缩  
3. 有稳定公开**实体**时，再试点少量二级页（优先 Templates）  
4. 中文站仅业务确认后做  

---

## 3. 目标页面树

| URL | 阶段 | 职责 | 主要内链 |
|---|---|---|---|
| `/` | 已有 | 总览 + 入口 | → 6 模块 |
| `/product/model-plaza` | P1 | 模型网关 | → tool-hub, database, docs |
| `/product/tool-hub` | P1 | 工具中心 | → model-plaza, docs |
| `/product/templates` | P1 | 模板 | → model-plaza, docs |
| `/product/auth` | P1 | 应用用户认证 | → database, docs/auth |
| `/product/database` | P1 | 托管数据 | → storage, auth, docs |
| `/product/storage` | P1 | 对象存储 | → database, docs |
| `/product/templates/:slug` | P2 按需 | 单模板实体 | → templates 一级 |

**刻意不做：** `/product` 空总览；独立 `/pricing`、`/faq` 站；Dashboard 镜像页。

---

## 4. 首页改动（小改，不重构）

| 改 | 不改 |
|---|---|
| Blocks：Four→Six；卡片链到 `/product/*` | section 顺序与主视觉 |
| Footer Product：真 URL | 把首页拆成多路由营销站 |
| FAQ 答案写入 DOM | 首屏塞模块详情/统计 |

---

## 5. 每页信息布局

| 区块 | 要 | 不要 |
|---|---|---|
| H1 + 一句话 | 模块名锚定 | 关键词堆砌 |
| 是什么 | 1 段定位 | 粘贴 docs |
| 为什么 | 2–4 条痛点/替代 | 竞品文案战 |
| 能做什么 | 3–6 条能力边界 | Dashboard 操作步骤 |
| CTA | Get Started + Docs | 多主按钮互抢 |
| 内链 | 相关模块 1–2 个 | 强行链满刷量 |

篇幅建议：每页约 400–800 英文词信息量；Storage 可更薄。

---

## 6. 站点职责边界

| 层级 | 承载 | 不承载 |
|---|---|---|
| 首页 | 品牌、总览、入口、定价摘要、FAQ | 模块深度、操作步骤 |
| `/product/*` | 模块营销页 | 密钥、账单、SQL 配置 |
| docs | How-to、API、CLI | 替代产品营销首页 |
| Dashboard | 登录后使用 | SEO 收录（保持 Disallow） |

---

## 7. 不在范围

首页视觉/导航大改；批量薄页；Dashboard 索引；投放/外链采购型 SEO；未确认的全面中文化。

---

## 8. 下一步

1. P0：冻结 URL（§3 已可作草案）+ 补 6 页纲要  
2. 工程仓可用后进入 P1（页面与 sitemap 同发）  
3. P1 完成后做验收沉淀；有 GSC 数据再进 P2  

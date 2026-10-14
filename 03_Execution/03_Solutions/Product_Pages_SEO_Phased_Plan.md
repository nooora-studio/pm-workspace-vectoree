---
title: "Vectoree 产品页 SEO 分阶段优化总方案"
description: "从可索引页面结构与信息布局出发的 SEO 执行规划；阶段门产出为工作沉淀，非汇报驱动"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.1"
tags: ["seo", "information_architecture", "landing", "product_pages", "internal_links"]
owners: ["PM"]
---

# Vectoree 产品页 SEO 分阶段优化总方案

> **主目标：** 做好产品页 SEO（可索引结构 + 信息布局）  
> **次要：** 沟通过程中的关键判断与阶段结论，沉淀为文档（需要时可拿去同步，但不为汇报而设计）  
> 约束：不大改首页结构；只补有价值页面；可分阶段迭代  
> 模块（已确认）：Model Plaza、Auth、Database、Storage、Tool Hub、Templates

交互版：[Canvas](https://cursor.com/canvas/store-48fd5195-0e44-47f6-8b03-472b63c3e757/f2211c4e-b8e5-464a-a915-e3888d235286)

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

## 2. 分阶段执行（主线）

### P0 — 定结构

1. 冻结 6 个 URL  
2. 理清内链现状 → 目标结构  
3. 可索引页面树 + 公私边界  
4. robots/sitemap 原则（与页面同步；不多堆 URL）  
5. 6 页内容纲要（先纲要后正文）

**不做：** 首页视觉大改、二级页、开放 Dashboard 索引

### P1 — 最小闭环（页面 / 链接 / sitemap 同步）

1. 上线 6 个 `/product/*`  
2. 首页 Six blocks + Footer 真链  
3. FAQ 答案进 HTML  
4. 同发更新 sitemap（`/` + 6 模块 + lastmod）  
5. 匿名抽检：有 H1/正文、无 404

### P2 — 测量与按需增强

1. 提交 GSC/Bing，看覆盖与查询词  
2. 可选：Breadcrumb/FAQ schema、OG 压缩  
3. 有稳定公开实体时，再试点少量二级页（优先 Templates）  
4. 中文站仅业务确认后做

---

## 3. 目标页面树与内链

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

### 内链：现状 → 目标（SEO 结构本身的一部分）

**现状：** 单页锚点网——模块挤在 `#blocks`；站内几乎只指向 login；能力外溢 docs；sitemap 仅 `/` + `SKILL.md`。

**目标：** 首页辐射 6 个 `/product/*`；模块间少量相关互链；模块 → docs（说明）+ login（转化）；Dashboard 不进 SEO 网。

---

## 4. 每页信息布局

| 区块 | 要 | 不要 |
|---|---|---|
| H1 + 一句话 | 模块名锚定 | 关键词堆砌 |
| 是什么 | 1 段定位 | 粘贴 docs |
| 为什么 | 2–4 条痛点/替代 | 竞品文案战 |
| 能做什么 | 3–6 条能力边界 | Dashboard 操作步骤 |
| CTA | Get Started + Docs | 多主按钮互抢 |
| 内链 | 相关模块 1–2 个 | 强行链满刷量 |

---

## 5. 工作沉淀（附带，非主线）

沉淀原则：**因决策或阶段完成而写，不为汇报而写。**  
下列是做 SEO 时自然值得留下的文档；需要同步时再用。

| 沉淀点 | 触发条件 | 文档内容 |
|---|---|---|
| 诊断结论 | 问题定义清楚时 | 短板在 IA / 单页站（本文 §0） |
| 内链结构 | P0 定结构 / P1 上线后 | 现状图 → 目标图（§3） |
| 页面树 | URL 冻结时 | 6 URL + 公私边界 |
| 模块纲要 | 写页面前 | 每页三类信息提纲 |
| robots/sitemap 原则 | 定收录策略时 | 同步写入；少而准 |
| 上线验收 | P1 完成时 | URL 可访问、内链、sitemap 已同步 |
| 数据复盘 | P2 有 GSC 数据时 | 收录/查询词 → 是否做二级 |

沟通过程中若出现新的关键判断（例如「实体」「lastmod」「sitemap 是否越多越好」），可单独落一条短备忘进 `03_Solutions/` 或本文附录，避免只留在聊天里。

---

## 6. 不在范围

首页视觉/导航大改；批量薄页；Dashboard 索引；投放/外链采购型 SEO；未确认的全面中文化。

---

## 7. 下一步

1. 按 P0 冻结 URL + 内链目标（可直接用 §3）  
2. 补齐 6 页纲要  
3. 工程仓可用后进入 P1（页面与 sitemap 同发）

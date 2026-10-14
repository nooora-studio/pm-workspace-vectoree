---
title: "Vectoree 产品页 SEO 分阶段优化总方案"
description: "从可索引页面结构与信息布局出发的 SEO 规划；含内链现状/目标、分阶段动作与周会可同步研究产出"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.0"
tags: ["seo", "information_architecture", "landing", "product_pages", "internal_links"]
owners: ["PM"]
---

# Vectoree 产品页 SEO 分阶段优化总方案

> 视角：产品经理 / 代码结构与信息布局（非市场投放型 SEO）  
> 约束：不大改首页结构；只补有价值页面；可分阶段快速迭代  
> 模块范围（已确认）：Model Plaza、Auth、Database、Storage、Tool Hub、Templates（后两者已在 Dashboard 上线）

交互版总览：[产品页 SEO 分阶段优化总方案（Canvas）](https://cursor.com/canvas/store-48fd5195-0e44-47f6-8b03-472b63c3e757/f2211c4e-b8e5-464a-a915-e3888d235286)

---

## 0. 一句话问题定义

核心能力藏在需登录的 Dashboard，公开站几乎是**单页**；模块没有独立可索引 URL。  
SEO 短板在 **可发现的信息架构**，不在再堆 meta 标签。

---

## 1. 五个大方向（PM 工作框架）

| 方向 | 白话 | 本产品对应动作 |
|---|---|---|
| 可发现 | 有没有门 | 6 个模块页 + 真链接 + sitemap |
| 可理解 | 机器懂不懂 | 一页一主题；H1/title；FAQ 进 HTML |
| 有价值 | 值不值得收 | 公开页只写是什么/为什么/能做什么 |
| 体验健康 | 打得开、别太慢 | 无死链；抽检；OG 等靠后 |
| 测量迭代 | 怎么知道有效 | GSC 看收录/查询词；再决定二级页 |

---

## 2. 周会研究产出设计（建议当作项目附带交付）

| ID | 产出件 | 何时 | 周会讲法 |
|---|---|---|---|
| A | SEO 现状诊断一页纸 | 现在 | 问题在 IA，不在标签 |
| **B** | **内链关系网：现状 vs 目标** | P0 出图 / P1 出对比 | **主视觉产出，强烈建议** |
| C | 可索引页面树 | P0 | 6 URL + 公私边界 |
| D | 6 页内容纲要填空 | P0→P1 | 每页只写三类信息 |
| E | robots/sitemap 评估备忘 | P0 | 不是 URL 越多越好 |
| F | 上线验收清单 + 前后对比 | P1 | 闭环交付 |
| G | GSC 两周复盘 | P2 | 用数据决定是否扩二级 |
| H | Agent/SEO 同源备忘（可选） | 任意 | sitemap / llms.txt / SKILL.md 同一逻辑 |

### 2.1 产出 B：内链关系网（你提到的方向，建议做）

**现状（2026-10-14 首页抓取）——单页锚点网**

```text
                    ┌─ #blocks  ← Footer: Model Plaza/Auth/DB/Storage 全指向这里
[/] Home ──锚点──┼─ #pricing / #faq / #line / #code / #codex
                    └─（无 /product/*）

[/] Home ──转化──→ /dashboard/login
[/] Home ──外链──→ docs.vectoree.ai · blog.vectoree.ai
sitemap 仅声明： /  +  /SKILL.md
可索引产品主题节点：0
```

**目标（P1 后）——中心辐射 + 模块互链**

```text
                 ┌→ /product/model-plaza ⇄ tool-hub / database
                 ├→ /product/tool-hub
[/] Home ────────┼→ /product/templates ──(P2 按需)──→ /templates/:slug
                 ├→ /product/auth ⇄ database
                 ├→ /product/database ⇄ storage / auth
                 └→ /product/storage

各 /product/* ──→ 对应 docs 篇（互补）
各 /product/* ──→ /dashboard/login（转化）
sitemap 声明：/ + 6 个模块页（SKILL.md 可选）
Dashboard 继续 robots Disallow，不进 SEO 网
```

**周会讲法：**  
「优化前模块在信息结构上不存在，只是首页锚点；优化后每个模块是独立可索引节点，首页是枢纽，docs 是深度说明，Dashboard 不参与 SEO。」

---

## 3. 分阶段规划

### P0 — 定结构与研究基线

**做**

1. 冻结 6 个 URL 命名  
2. 画内链现状图（产出 B）  
3. 可索引页面树 + 公私边界（产出 C）  
4. robots/sitemap 结论（产出 E）  
5. 6 页内容纲要（产出 D）

**不做：** 首页视觉大改、二级页、开放 Dashboard 索引  

**周会：** A + B 现状 + C  

---

### P1 — 最小闭环落地（页面 / 链接 / sitemap **同步**）

**做**

1. 上线 6 个 `/product/*` 一级页  
2. 首页 Six blocks + Footer 改为真链接  
3. FAQ 答案进入 HTML  
4. **同次发布**更新 sitemap（`/` + 6 模块；补 `lastmod`）  
5. 匿名抽检：源码有 H1/正文；无 404  

**原则：** sitemap 与页面同步，不放到最后；未上线 URL 不写进 sitemap。  

**周会：** B 前后对比 + F 验收 + 线上演示  

---

### P2 — 测量与按需增强

**做**

1. GSC/Bing 提交 sitemap；看覆盖与查询词（产出 G）  
2. 可选：FAQPage / Breadcrumb、OG 压缩  
3. 仅当 Templates（或模型）有稳定公开**实体**时，试点少量二级页  
4. 中文站：仅业务确认后再做  

**周会：** 数据复盘 → 是否做二级页  

---

## 4. 目标页面树（P1）

| URL | 公开页职责 | 主要内链 |
|---|---|---|
| `/` | 总览 + 六模块入口 | → 6 模块 |
| `/product/model-plaza` | 模型网关 | → tool-hub, database, docs |
| `/product/tool-hub` | 工具中心 | → model-plaza, docs |
| `/product/templates` | 模板 | → model-plaza, docs |
| `/product/auth` | 应用用户认证 | → database, docs/auth |
| `/product/database` | 托管数据 | → storage, auth, docs |
| `/product/storage` | 对象存储 | → database, docs |
| `/product/templates/:slug` | P2 按需 | → templates 一级 |

---

## 5. 每页信息布局（防过度 SEO）

| 区块 | 要 | 不要 |
|---|---|---|
| H1 + 一句话 | 模块名锚定 | 关键词堆砌 |
| 是什么 | 1 段定位 | 粘贴 docs 教程 |
| 为什么 | 2–4 条痛点/替代 | 竞品攻击战 |
| 能做什么 | 3–6 条能力边界 | Dashboard 操作步骤 |
| CTA | Get Started + Docs | 多个主按钮互抢 |
| 内链 | 相关模块 1–2 个 | 强行链满 6 个刷量 |

---

## 6. 周会叙事（三次同步）

1. **P0：** 诊断 + 现状内链图 + 页面树 → 为什么做、做什么、不做什么  
2. **P1：** 6 页上线 + 内链前后对比 + 验收 → 闭环已完成  
3. **P2：** 收录/查询词 → 是否扩二级；方法可复用  

---

## 7. 明确不在范围

- 首页视觉/导航大改  
- 为 SEO 批量薄页  
- Dashboard 开放索引  
- 外链采购/投放型 SEO（另案）  
- 未确认前的全面中文化  

---

## 8. 下一步（立即）

不必等工程仓即可完成：

1. 产出 A：诊断一页纸（可从本文件 §0–§1 压缩）  
2. 产出 B：把 §2.1 画成一页图（现状）  
3. 产出 C：冻结 URL 表  

工程仓接入后进入 P1 改页面；sitemap 与模块页同发。

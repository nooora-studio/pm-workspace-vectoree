---
title: "SEO 关键决策与概念备忘"
description: "沟通过程中形成的产品决策与 SEO 概念澄清，避免只留在聊天记录"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.0"
tags: ["seo", "decisions", "glossary"]
owners: ["PM"]
---

# 关键决策与概念备忘

> 来源：产品页 SEO 需求澄清与方案讨论（2026-10-14）  
> 原则：因决策或概念澄清而沉淀，不为汇报而写

---

## A. 已拍板的产品决策

| # | 决策 | 说明 |
|---|---|---|
| D1 | 一级 + 部分二级 | 先做 6 个一级模块页；二级仅有公开实体时再做 |
| D2 | 公开页内容边界 | 只写「是什么 / 为什么 / 能做什么」 |
| D3 | 六个模块 | Model Plaza、Auth、Database、Storage、Tool Hub、Templates |
| D4 | Tool Hub / Templates 进 P1 | 已在 Dashboard 上线，不再等到后期 |
| D5 | 首页不大改骨架 | 可改链接与口径；不重排 section / 不大改视觉 |
| D6 | 不为 SEO 堆薄页 | 只补有检索意图与稳定卖点的页 |
| D7 | sitemap 与页面同步 | 不上线不写进 sitemap；不放到项目最后一步 |
| D8 | Dashboard 不索引 | 保持 robots Disallow；公私分层 |

### URL 命名（草案，P0 冻结用）

| 模块 | URL |
|---|---|
| 模型 | `/product/model-plaza` |
| 认证 | `/product/auth` |
| 数据库 | `/product/database` |
| 存储 | `/product/storage` |
| 工具中心 | `/product/tool-hub` |
| 模板 | `/product/templates` |

---

## B. 概念澄清

### 可索引页面结构（Indexable IA）

比「信息架构」更贴切本任务的说法：决定**哪些 URL 存在、每页讲什么、如何互相链接、sitemap 收哪些**。  
不要求重做整站导航体系。

### 实体（Entity）

可单独命名、可列表、值得做详情页的**具体对象**（如某个模板、某个模型）。  
模块能力本身（如 Auth）用一级页即可，不必硬拆二级。  
规则：**有稳定公开实体才做二级页**。

### lastmod

sitemap 里表示页面**实质内容上次更新时间**的字段。  
辅助爬虫决定是否再抓；**不是排名因子魔法**。  
只在真更新时改；乱刷日期有害。新模块页首次写入上线日即可。

### Sitemap 是不是越多越好？

**不是。** 应收录：值得被索引、可稳定访问、有独特价值的规范 URL。  
不收录：Dashboard、登录页、空壳、参数重复页、未上线页。  
经验：W1/P1 约 7 个核心 URL（首页 + 6 模块）优于堆几十个薄页。

### 五个 SEO 大方向（PM 记忆框架）

1. **可发现** — 有没有门（URL / 内链 / sitemap）  
2. **可理解** — 机器懂不懂（一页一主题 / H1 / title / 正文在 HTML）  
3. **有价值** — 值不值得收（内容厚度 / 少而准）  
4. **体验健康** — 打得开、别太烂  
5. **测量迭代** — GSC 看收录与查询词再增强  

市场投放、外链公关不在本任务主范围。

### AI Agent 视角（同源）

Agent 与爬虫都依赖：稳定 URL + 可读文本 + 清单（sitemap / `llms.txt` / `SKILL.md`）。  
产品站 SEO 结构优化与 Agent 可消费信息架构是同一逻辑的不同消费方。

---

## C. P1（原称 W1）范围清单

**做**

- 6 个 `/product/*` 一级页  
- 首页/页脚真链接；Six blocks 口径  
- FAQ 答案进 HTML  
- sitemap 扩为 `/` + 6 模块（`SKILL.md` 可选）  

**不做**

- `/product` 总览、独立 pricing/faq  
- 二级详情、中文站、首页视觉大改  
- 动 Dashboard / 后端  

---

## D. 工程落点线索（尚未在本仓改线上）

本仓为 `pm-workspace-vectoree`（知识库）。线上 landing 线索：

- `packages/dashboard/.../LandingPage.tsx`  
- `packages/dashboard/.../locales/{en,zh-CN}/landing.ts`  
- 公开地址：`https://vectoree.ai/sitemap.xml`、`https://vectoree.ai/robots.txt`  

页面类改动通常无后端依赖；需主站工程仓写入权限才能改现网。

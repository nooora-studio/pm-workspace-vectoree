---
title: "W1 任务拆分"
description: "产品页 SEO W1：6 模块可发现闭环的任务拆分与验收；供逐项执行"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.0"
tags: ["seo", "w1", "tasks"]
owners: ["PM"]
---

# W1 任务拆分

> **W1 目标：** 6 个模块可被发现 + 可打开 + 被 sitemap 声明  
> **Done 定义：** 6 页在线 + 首页能点进去 + sitemap 已声明 + FAQ 答案在 HTML  
> 关联：[分阶段方案](./02_phased_optimization_plan.md) · [内链结构](./03_internal_link_structure.md)

建议节奏：`T0 → T1 ∥ T2 →（T3 + T4 + T5 同发）→ T6`  
**T2–T5 同一发版最干净。**

---

## T0 · 冻结清单

- [ ] 确认 6 个 URL 最终命名（草案见下表）
- [ ] 确认每页对应 docs 链接（没有则暂链 docs 总览）
- [ ] 确认首页文案：Four → Six；补 Tool Hub、Templates 卡片

**产出：** URL 表（模块名 / path / docs / CTA）

| 模块 | path（草案） | docs（待填） | CTA |
|---|---|---|---|
| Model Plaza | `/product/model-plaza` | | `/dashboard/login` |
| Auth | `/product/auth` | | `/dashboard/login` |
| Database | `/product/database` | | `/dashboard/login` |
| Storage | `/product/storage` | | `/dashboard/login` |
| Tool Hub | `/product/tool-hub` | | `/dashboard/login` |
| Templates | `/product/templates` | | `/dashboard/login` |

---

## T1 · 6 页内容纲要

每页只填 4 块（先纲要后扩写）：

- [ ] Model Plaza：H1+一句话 / 为什么 / 能做什么 / title+description
- [ ] Auth：同上
- [ ] Database：同上
- [ ] Storage：同上
- [ ] Tool Hub：同上
- [ ] Templates：同上

**产出：** 6 份填空；可与 T2 并行，纲要可先上再打磨。

---

## T2 · 模块页落地（工程）

- [ ] 复用同一 product 页模板（layout + head）
- [ ] 建 6 个路由/页面，挂上 T1 文案
- [ ] 每页含：回首页、1–2 相关模块、docs、Get Started → login
- [ ] 匿名打开 6 页均为 200；源代码有 H1/正文

**依赖：** T0；文案可用纲要先上。

---

## T3 · 首页入口接通

与 T2 同发或紧随（勿链到 404）：

- [ ] `#blocks` 区：6 张卡片改为链到 `/product/*`（现网 4 张且无链接）
- [ ] Footer Product：6 项真链（现网 4 项且为 `#blocks`）
- [ ] 文案改为 Six blocks；去掉与已上线能力冲突的「未上线」口径

**依赖：** T2 的 URL 已可访问。

---

## T4 · FAQ 可抓取

可与 T3 并行：

- [ ] FAQ 答案写入 HTML（可默认折叠）
- [ ] 源代码能搜到答案正文

---

## T5 · Sitemap 同步

与 T2/T3 **同次发布**：

- [ ] `sitemap.xml` 写入：`/` + 6 个 `/product/*`
- [ ] 补 `lastmod`（上线日）
- [ ] `/SKILL.md` 可选保留
- [ ] 发布后访问 sitemap 目视确认

---

## T6 · 验收

- [ ] 首页六模块可点进独立页
- [ ] Footer 六项非 `#` 锚点
- [ ] 6 页源码有 title / H1 / 正文
- [ ] FAQ 源码有答案
- [ ] sitemap 含 7 个核心 URL（`/` + 6 模块）
- [ ] （若有 GSC）提交 sitemap

---

## 执行备注

- 主目标是 SEO 闭环；工程落点在主站仓（landing / 路由 / sitemap），本 PM 仓只存方案与任务。
- 模块互链默认见 [03_internal_link_structure.md](./03_internal_link_structure.md) 目标节。
- W1 **不做：** 二级详情页、中文站、Dashboard 索引、首页视觉大改。

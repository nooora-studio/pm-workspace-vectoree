---
title: "Vectoree 设计系统提取报告（线上真实数据）"
description: "从 vectoree.ai 线上 CSS/JS 提取的真实设计 token、字体、文案、动画——1:1 还原的事实来源"
author: "PM + AI"
created: "2026-08-14"
updated: "2026-08-14"
status: "ACTIVE"
version: "1.0"
tags: ["design-system", "vectoree", "tokens", "extraction"]
owners: ["PM"]
---

# Vectoree 设计系统提取报告

> 数据来源：`https://vectoree.ai/` 线上 CSS（`/assets/index-DG8hT7cx.css`）+ JS（`/assets/index-qhNAUR4y.js`）直接提取，非猜测。本文档是原型 1:1 还原的唯一事实来源。

---

## 1. 颜色 Token（真实）

| 变量 | 值 | 用途 |
|------|-----|------|
| `--acid` | `#d8ff00` | 荧光黄（品牌主色） |
| `--ink` | `#101010` | 墨黑（文字/边框） |
| `--paper` | `#f1f1e8` | 米白（页面底色） |
| `--white` | `#fff` | 卡片白 |
| `--gray` | `#6b6b60` | 次要文字（偏绿调灰） |
| `--ink-60` | `#333` | 次级文字 |
| `--ink-40` | `#555` | 三级文字 |
| `--ink-30` | `#999` | 弱文字 |
| `--line-soft` | `#c9c9bd` | 软分隔线 |
| `--row-line` | `#e2e2d6` | 表格行线 |
| `--acid-soft` | `#fbffea` | 荧光黄极浅底 |
| `--grid-line` | `#00000009` | 网格线（极淡黑） |

## 2. 字体栈（真实）

```css
--font-display: "Archivo Black", "Arial Black", "PingFang SC", sans-serif;
--font-body:    "Space Grotesk", "Helvetica Neue", "PingFang SC", Arial, sans-serif;
--font-mono:    "JetBrains Mono", ui-monospace, monospace;
```

**用法**：标题用 Archivo Black（粗黑无衬线），正文用 Space Grotesk，代码/终端/标签/UI 小字用 JetBrains Mono。

## 3. 阴影（硬阴影风格）

| 变量 | 值 |
|------|-----|
| `--shadow-hard-sm` | `3px 3px 0 #101010` |
| `--shadow-hard-md` | `4px 4px 0 #101010` |
| `--shadow-hard-lg` | `6px 6px 0 #101010` |
| `--shadow-hard-acid` | `4px 4px 0 #d8ff00` |
| `--shadow-hard-acid-lg` | `5px 5px 0 #d8ff00` |
| `--shadow-press` | `1px 1px 0 #101010`（按下） |

交互规范：默认 `hard-md`，hover 升 `hard-lg`，按下变 `press`。

## 4. 尺寸 / 间距（真实）

```css
--spacing-xs:4px --spacing-sm:8px --spacing-md:12px --spacing-lg:16px
--spacing-xl:22px --spacing-2xl:28px --spacing-3xl:40px
--baseSpacing:2rem(32px) --smSpacing:1.25rem --xsSpacing:1rem
--topbar-height:58px --sidebar-width:232px --marquee-height:34px
--rounded-none:0px   ← 全直角，无圆角
```

## 5. 动画（真实 keyframes）

| 动画 | 定义 | 用途 |
|------|------|------|
| `marquee-scroll` | `22s linear infinite` | Provider/流程滚动条 |
| `vee-think-block` | 1.2s ease-in-out infinite，50% 时 translateY(-4px) opacity .85 | Vee 思考方块 |
| `vee-thinking-bob` | 1.1s ease-in-out infinite，50% translateY(-2px) | Vee 上下浮动 |
| `vee-think-dot` | 1.1s，40% 时 opacity 1 translateY(-3px) | 思考点（…） |
| `login-brand-in` | .55s ease-out，fade + translateY(10px) | 登录页品牌入场 |
| `login-form-in` | .7s ease-out 80ms，fade + translateY(12px) | 登录页表单入场 |

---

## 6. 首页完整文案（线上逐字提取）

### Nav
`PRODUCT · WORKFLOW · DEVELOPERS · PRICING · SIGN IN · OPEN CONSOLE · START BUILDING →` + 语言切换 `EN / 中文`

### Hero
- sticker: `v1.0 · NOW LIVE`
- title: **Ship / your / agent.**
- stack: `models · templates · skills · auth · payments · data · deploy`
- sub: `Vectoree fuses [stack] into one console. The OpenRouter + Clerk + Stripe + Supabase + Vercel stack — pre-assembled, so you stop gluing five SaaS tools and start shipping.`
- ctaPrimary: `START BUILDING →` / ctaDocs: `READ THE DOCS`
- meta: `// FREE TIER · NO CREDIT CARD · 1M TOKENS/MO INCLUDED`
- veeCaption: `VEE · YOUR AGENT FOREMAN`

### 终端块（4 行）
```
$ npx vectoree init my-agent
▲ 6 blocks wired: models · skills · auth · pay · data · deploy
$ vee deploy --prod
→ live at my-agent.vectoree.app  ⚡ 1.8s
```

### Provider 滚动条
`One key · every provider` | 5 个 provider 名 | `36 models · 99.2% uptime`

### App Stack（6 块积木）
标题 `One console. Six blocks.` / sticker `APP STACK` / note `// every block replaces a SaaS you were about to glue in`
- Model Plaza (OPENROUTER SLOT) → replaces raw provider SDKs
- Templates (VERCEL SLOT) → replaces boilerplate repos
- Skills Hub (SKILLS HUB) → replaces hand-wired integrations
- Auth (CLERK SLOT) → replaces Clerk / Auth0
- Payments (STRIPE SLOT) → replaces Stripe Billing
- Data & Storage (SUPABASE SLOT) → replaces Supabase / S3

### Assembly Line（6 步）
`The assembly line.` / sticker `6 STEPS TO PROD` / note `// the same loop every shipped agent on Vectoree went through`
01 Pick a model · 02 Fork a template · 03 Install skills · 04 Add auth · 05 Charge users · 06 Deploy & ship

### SDK 代码区
file `AGENT.TS` / sdk `VECTOREE SDK · v1.0`
标题 `Five SaaS docs. One SDK.`
body: `Every block speaks the same SDK. No OAuth dance across five dashboards, no webhook spaghetti — the glue is our job, the agent is yours.`
3 点：TypeScript-first SDK + OpenAI-compatible endpoint / Usage metering flows straight into billing / Fallback & routing policies from the Admin Console

### Pricing（3 档）
`Pay for glue, not for seats.` / sticker `PRICING` / note `// model tokens billed at cost — we charge for the platform, not the markup` / hotTag `MOST SHIPPED`
- FREE `$0` forever · side projects | 4 items | `START FREE`
- PRO `$19` per month · solo builders | 4 items | `GO PRO →`
- TEAM `$49` per month · org space | 4 items | `CONTACT SALES`

### Vee Band
`“Vee is watching your deploys.”` — `EVERY AGENT FOREMAN, EVER`

### Final CTA
`Stop gluing. Start shipping.` / `YOUR AGENT COULD BE LIVE BEFORE THIS PAGE FINISHES SCROLLING.` / `START BUILDING — FREE →`

### Footer
brand `VECTOREE · THE AGENT FACTORY FLOOR` / pipeline `MODELS → SKILLS → AUTH → PAYMENTS → DEPLOY` / `© 2026 VECTOREE INC.`
链接：Product(Model Plaza/Templates/Skills Hub/Auth & Payments/Pricing) · Developers(Documentation/SDK Reference/API Status/Changelog) · Company(Blog/Twitter / X/GitHub/Careers)

### 底部 marquee
`PICK A MODEL → FORK A TEMPLATE → INSTALL SKILLS → ADD AUTH → CHARGE USERS → DEPLOY → SHIP YOUR AGENT · VECTOREE ·`

---

## 7. 交互规范（真实）

1. **按钮**：黑边 2px（`--border` = ink）+ 硬阴影 `hard-md`；hover 阴影变大（`hard-lg`）；按下阴影变 `press`（下沉 1px 效果）
2. **Provider 滚动条**：`marquee-scroll` 22s 循环无缝滚动
3. **Vee 吉祥物**：`vee-think-block` + `vee-thinking-bob` 无限循环浮动
4. **登录页**：品牌区 `login-brand-in`（0.55s）、表单区 `login-form-in`（0.7s delay 80ms）入场动画
5. **语言切换**：EN/中文 双语，`aria` 属性支持
6. **直角设计**：全站 `border-radius: 0`，无圆角

---

## 8. 与初版原型的差异修正清单

| 项 | 初版（猜测） | 线上真实 | 已修正 |
|----|------------|---------|--------|
| 荧光黄 | `#DFFF00` | `#d8ff00` | ✅ |
| 墨黑 | `#0A0A0A` | `#101010` | ✅ |
| 米白 | `#F1EDE2` | `#f1f1e8` | ✅ |
| 灰 | `#6B6B6B` | `#6b6b60` | ✅ |
| 标题字体 | 等宽 | Archivo Black | ✅ |
| 正文字体 | 等宽 | Space Grotesk | ✅ |
| 等宽字体 | 全站 | 仅代码/标签 | ✅ |
| 圆角 | 部分圆角 | 全直角 0 | ✅ |
| 阴影 | 2px 边框+黄影 | 3-6px 硬阴影 | ✅ |
| 吉祥物 | 自绘 | 官方 favicon 简化版 | ✅ |

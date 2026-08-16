---
title: "Vectoree 原型库 — 维护说明"
description: "产品原型 demo 的目录结构、设计系统、改版流程、新增页面指南"
author: "PM + AI"
created: "2026-08-14"
updated: "2026-08-14"
status: "ACTIVE"
version: "1.2"
tags: ["prototype", "vectoree", "maintenance", "design-system"]
owners: ["PM"]
---

# Vectoree 原型库 — 维护说明

> 用途：内部维护一套高保真产品原型 demo，便于后续更新迭代。
> 来源：**v1.1 起为 1:1 还原**——设计 token、字体、文案、动画全部提取自线上 CSS/JS（见 `_Assets/Design_System_Extraction_Report.md`），非猜测。

---

## 1. 目录结构

> 打开 `http://localhost:7842/` 直接进入完整首页（根 `index.html` 就是 home 页，无中间索引页）。

```
05_Prototypes/
├── index.html                      ← 完整首页（1:1 还原：真实字体/颜色/文案/动画 + 交互）← 根入口
├── _Assets/                        ← 共享资源（任何修改都会全局生效）
│   ├── tokens.css                  ← 设计系统：颜色 / 字体 / 间距 / 网格（1:1 真实 token）
│   ├── components.css              ← 通用组件：按钮 / 卡片 / 终端 / 表单
│   ├── layout.css                  ← 布局：Header / Footer / Dashboard Sidebar
│   ├── vee-logo.svg                ← 吉祥物 Vee（官方 favicon 提取）
│   └── Design_System_Extraction_Report.md  ← 设计系统提取报告（线上数据唯一事实来源）
│
├── 02_Auth/
│   ├── signin.html                 ← 登录页
│   └── signup.html                 ← 注册页
│
├── 03_Dashboard/
│   ├── _generator.py               ← 批量生成脚本（修改后重跑可重新生成所有页面）
│   ├── overview.html               ← 默认项目主控台
│   ├── model-plaza.html
│   ├── templates.html
│   ├── skills-hub.html
│   ├── api-keys.html
│   ├── auth.html
│   ├── payments.html
│   ├── database.html
│   ├── storage.html
│   ├── deploy.html
│   ├── logs.html
│   └── settings.html
```

> 首页导航：`START BUILDING →` → `02_Auth/signup.html`；`SIGN IN` → `02_Auth/signin.html`；登录/注册提交 → `03_Dashboard/overview.html`。

---

## 2. 本地预览

在原型根目录跑：

```bash
cd /Users/yuke/Documents/pm-workspace-vect/01_Product/05_Prototypes
python3 -m http.server 7842
# 然后浏览器打开 http://localhost:7842
```

或直接双击 `index.html`（CSS 资源相对路径都对，可以 file:// 打开）。

---

## 3. 设计系统（Design Tokens）

所有视觉规范集中在 `_Assets/tokens.css`（**真实 token，提取自线上 CSS**），改一处全局生效。核心变量：

| 变量 | 真实值 | 用途 |
|------|--------|------|
| `--paper` / `--color-bg` | `#f1f1e8` | 米白底色 |
| `--ink` / `--color-bg-dark` | `#101010` | 墨黑（文字/边框/黑底区块） |
| `--acid` / `--color-accent` | `#d8ff00` | 荧光黄（品牌主色） |
| `--gray` / `--color-text-muted` | `#6b6b60` | 次要文字（偏绿调） |
| `--line-soft` | `#c9c9bd` | 软分隔线 |
| `--acid-soft` | `#fbffea` | 荧光黄极浅底 |
| `--font-display` | Archivo Black | 标题（粗黑体） |
| `--font-body` | Space Grotesk | 正文 |
| `--font-mono` | JetBrains Mono | 代码/终端/标签/UI 小字 |
| `--shadow-hard-md` | `4px 4px 0 #101010` | 默认硬阴影（hover 升 `lg`，按下降 `press`） |
| `--topbar-height` | `58px` | Dashboard 顶栏高 |
| `--sidebar-width` | `232px` | Dashboard 侧边栏宽 |
| `--animate-marquee` | `22s linear infinite` | Provider/Footer 滚动条 |

> 完整 token + 逐字文案字典见 `_Assets/Design_System_Extraction_Report.md`（线上数据唯一事实来源）。

**改版原则**：先改 tokens.css，再改组件，最后改页面。避免直接改单页面样式。

---

## 4. 改版流程

### 场景 A：线上某个页面变了
1. 用 `WebFetch` 抓取线上最新页面结构/文案
2. 对比现有原型，定位差异
3. 修改对应 HTML 文件（通常是文案/区块调整）
4. 验证：本地 server 打开对比

### 场景 B：设计系统升级（如换主色、换字体）
1. 修改 `_Assets/tokens.css` 对应变量
2. 验证各页面视觉一致性
3. 改完所有页面自动同步（因为共享 CSS）

### 场景 C：新增页面
1. 参考根 `index.html`（home 页）或 `03_Dashboard/overview.html` 的结构
2. 复用 `_Assets/*.css` 共享样式
3. 更新本 README 目录结构

### 场景 D：新增 Dashboard 模块
1. 修改 `03_Dashboard/_generator.py`，在 `pages` 列表中添加新页面配置
2. 跑 `python3 _generator.py` 批量生成
3. 更新本 README 目录结构

---

## 5. 维护建议

- **不要在单个页面里 hardcode 颜色/字号**，全部用 `var(--xxx)` 引用
- **每个 Dashboard 页面共享 sidebar/topbar**，由 `_generator.py` 统一管理，避免重复维护
- **新增组件前先看 `_Assets/components.css`**，可能已有可复用组件
- **首页改动直接改根 `index.html`**（它就是 home 页）；改版前对照线上 https://vectoree.ai/ 逐区块确认
- **截图归档**：线上页面变更后，把新截图存到 `01_Product/_Assets/Screenshots/` 并按 `PageName-Feature.png` 命名

---

## 6. 与现有工作区集成

原型库与你的产品资料并存：

```
01_Product/
├── 00_Overview/                    ← 拆解报告（产品文档）
│   └── 20260813_Vectoree_Product_Deconstruction_Report.md
├── _Assets/Screenshots/            ← 线上截图（事实层）
└── 05_Prototypes/                  ← 原型库（这个目录，视觉层）
    ├── _Assets/
    ├── index.html                  ← 首页（根入口）
    ├── 02_Auth/
    └── 03_Dashboard/
```

改版时建议流程：**截图变化** → 拆解报告更新 → 原型 demo 同步。

---

## 7. 已知限制

- **响应式**：当前主要按桌面 1280px+ 优化，移动端布局做了基础适配但未深度优化
- **交互**：首页已还原 marquee 滚动 / Vee 动画 / 滚动浮现 / 语言切换 / 移动端菜单 / 按钮 hover+press；Dashboard 与 Auth 为 hover/active 状态
- **数据**：Dashboard 内所有数据为静态 mock（Token 用量/金额/日志），不代表真实线上状态
- **视觉**：以线上 CSS/JS 提取的 token 与文案为准；Dashboard 布局基于截图还原（登录后页面无法直接抓取），如线上有更新以截图 + WebFetch 内容为准

---

> 后续：可在此基础上做（路线 C）线框级 + 组件库变体，作为改版脚手架。视需要再启动。

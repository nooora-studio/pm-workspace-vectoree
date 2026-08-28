---
title: "Vectoree 原型库 — 维护说明"
description: "产品原型 demo 的目录结构、设计系统、改版流程、新增页面指南、1:1 还原校准源"
author: "PM + AI"
created: "2026-08-14"
updated: "2026-08-26"
status: "ACTIVE"
version: "1.3"
tags: ["prototype", "vectoree", "maintenance", "design-system", "admin", "model-entry"]
owners: ["PM"]
---

# Vectoree 原型库 — 维护说明

> 用途：内部维护一套高保真产品原型 demo，作为产品需求的 1:1 工作面。
> 来源：**线上 CSS 不可达区域（Dashboard / Admin）以截图为准**——见 `01_Product/_Assets/Screenshots/`。Marketing / Auth 等可抓取区域仍以 `_Assets/Design_System_Extraction_Report.md` 的 token 为准。

---

## 1. 入口

| 入口 | 用途 |
|---|---|
| `demo.html` | **首选**。原型 demo 启动器，列出 5 个区块 + Meta，可一键跳到任一页面。 |
| `index.html` | 完整首页（vectoree.ai 1:1 还原：真实字体/颜色/文案/动画 + 交互）。 |
| `02_Auth/signin.html` · `02_Auth/signup.html` | 登录/注册。 |

本地预览：

```bash
cd /Users/yuke/Documents/pm-workspace-vect/01_Product/05_Prototypes
python3 -m http.server 7842
# 浏览器打开 http://localhost:7842/demo.html
```

---

## 2. 目录结构

```
05_Prototypes/
├── demo.html                       ← 原型启动器（首选入口）
├── index.html                      ← 完整首页（1:1）
│
├── _Assets/                        ← 共享资源（任何修改全局生效）
│   ├── tokens.css                  ← 设计系统：颜色 / 字体 / 间距 / 网格（1:1 真实 token）
│   ├── layout.css                  ← 布局：topbar (黑底) / sidebar (分组酸黄激活) / content / modal / wizard 等
│   ├── components.css              ← 通用组件
│   ├── vee-logo.svg                ← 吉祥物 Vee
│   ├── Design_System_Extraction_Report.md
│   └── figma_vectoree_design_system.js · figma_vectoree_ui.html
│
├── 02_Auth/                        ← 登录 / 注册
│   ├── signin.html
│   └── signup.html
│
├── 03_Dashboard/                   ← 项目级（默认项目）
│   ├── overview.html               ★ 1:1 重建（生产校准）
│   ├── model-plaza.html            ◷ shell only
│   ├── templates.html              ◷ shell only
│   ├── skills-hub.html             ◷ shell only
│   ├── api-keys.html               ◷ shell only
│   ├── auth.html                   ◷ shell only
│   ├── payments.html               ◷ shell only
│   ├── database.html               ◷ shell only
│   ├── storage.html                ◷ shell only
│   ├── deploy.html                 ◷ shell only
│   ├── logs.html                   ◷ shell only
│   └── settings.html               ◷ shell only
│
├── 04_Organization/                ← 组织级（NORA 的组织）— 新增
│   ├── overview.html               ★ 1:1 重建
│   ├── members.html                ◷ stub
│   ├── employee-ai.html            ◷ stub
│   ├── my-ai.html                  ◷ stub
│   ├── billing.html                ◷ stub
│   ├── usage.html                  ◷ stub
│   ├── audit-log.html              ◷ stub
│   └── org-settings.html           ◷ stub
│
└── 05_Admin/                       ← Admin 独立 app（中文）— 新增，本次需求落地位置
    ├── index.html                  ★ 1:1 概览（Admin 入口）
    ├── channels.html               ★ 1:1 模型渠道
    ├── models.html                 ★ 1:1 模型列表（含「+ 添加模型」弹窗）
    ├── models-add.html             ★★ 需求交付：模型录入向导（5 步）
    ├── models-edit-billing.html    ★ 1:1 编辑模型价格（计费模式下拉）
    ├── routing-policies.html       ◷ stub
    ├── fault-tolerance.html        ◷ stub
    ├── logs.html                   ◷ stub
    ├── organizations.html          ◷ stub
    └── billing-reconciliation.html ◷ stub
```

> **图例**：★ 1:1 重建 ｜ ★★ 需求交付物 ｜ ◷ stub（已用新 shell，页面体待补）

---

## 3. 设计系统

### 3.1 Tokens（`_Assets/tokens.css`）

| 变量 | 真实值 | 用途 |
|------|--------|------|
| `--acid` | `#d8ff00` | 荧光黄（品牌主色，激活态、CTA、stickers） |
| `--ink` | `#101010` | 墨黑（文字、边框、topbar 底、硬阴影） |
| `--paper` | `#f1f1e8` | 米白底（页面、卡片底、sidebar 底） |
| `--white` | `#fff` | 白（卡片表面、按钮底） |
| `--gray` | `#6b6b60` | 次要文字（偏绿调） |
| `--line-soft` | `#c9c9bd` | 软分隔线 |
| `--acid-soft` | `#fbffea` | 荧光黄极浅底（hover） |
| `--grid-line` | `rgba(16,16,16,0.035)` | 纸面网格（24px 间距） |
| `--font-display` | Archivo Black | 标题（粗黑体） |
| `--font-body` | Space Grotesk | 正文 |
| `--font-mono` | JetBrains Mono | 代码 / 终端 / 标签 / UI 小字 / 价格 |
| `--shadow-hard-md` | `4px 4px 0 #101010` | 默认硬阴影（hover 升 `lg`） |
| `--topbar-height` | `58px` | Topbar 高度 |
| `--sidebar-width` | `232px` | Sidebar 宽度 |

> 完整 token 字典见 `_Assets/Design_System_Extraction_Report.md`（线上数据事实来源）。

### 3.2 Layout（`_Assets/layout.css`）— **生产级 App 外壳**

新增（2026-08-26 截图校准）：

- **`.app` / `.app__main`** — 232px sidebar + main grid
- **`.topbar` + 变体** — 黑底 ink，brand / switchers（acid pill）/ sep / actions / lang / ⌘K / avatar / logout
  - 变体：`.topbar__switcher--admin`（ink bg, acid text）
  - 变体：`.topbar__switcher--ghost`（白底）
- **`.sidebar` + 变体** — paper 底，1px ink 右边界
  - `.sidebar__group` + `.sidebar__group-title`（uppercase mono gray）
  - `.sidebar__link` + `.sidebar__link--active`（**酸黄整块 + ink 左边框 + 粗体**）
  - `.sidebar__icon`（16px 线条图标）
  - `.sidebar__back`（底部「← 返回」按钮）
  - `.sidebar__cmd-box`（底部 ⌘I 提示）
- **`.content`** — paper + 24px 网格背景
- **`.page-header` / `.page-title` / `.page-title__icon` / `.page-title__sub` / `.page-sub` / `.page-actions`**
- **`.card`** — 2px ink 边 + 4px ink 硬阴影
- **`.stats` / `.stat`** — 4 列统计卡
- **`.connect`** — ink 底 + **酸黄硬阴影** 的"Connect your coding agent"块
- **`.badge` + `.badge--acid / --ok / --warn / --off`**
- **`.btn` + `.btn--primary / --dark / --sm / --icon / --block`**
- **`.tabs` / `.tab` / `.tab--active`**
- **`.table`**（100% 宽，header ink bg acid text）
- **`.field` / `.field__label` / `.field__opt` / `.input` / `.select` / `.textarea` / `.row-2` / `.row-3`**
- **`.toggle`**（酸黄开关，44×22）
- **`.modal-backdrop` / `.modal` / `.modal--wide` / `.modal__head / __body / __foot / __close`**
- **`.filter-row`**（admin 模型列表筛选行）
- **`.model-card` + 子类**（admin 模型列表卡片）
- **`.channel-name` + `.channel-name__main / __sub`**
- **`.wizard` / `.wizard__step` + `--on / --done` / `.wizard__card` / `.wizard__actions` / `.wizard__hidden`**
- **`.banner` + `--ok / --warn`** / **`.calc`** / **`.checklist`**
- **`.hint` / `.divider` / `.muted` / `.mono` / `.row / .row-between` / `.gap-*` / `.mt-*` / `.mb-*`**

**改版原则**：先改 `tokens.css`，再改 `layout.css`，最后改页面。避免直接改单页面样式（除非该页是孤岛）。

---

## 4. 1:1 还原校准源

`Dashboard` 与 `Admin` 是登录后页面，无法直接抓 CSS，**以下截图是事实来源**（`01_Product/_Assets/Screenshots/`）：

| 截图 | 对应原型页 |
|---|---|
| `dashboard-project-01.png` ~ `-03.png` | `03_Dashboard/overview.html` |
| `dashboard-project-api-keys.png` | `03_Dashboard/api-keys.html`（待补） |
| `dashboard-project-auth/database/storage/payments/deploy/logs/...` | 同名页（待补） |
| `dashboard-organization-overview.png` | `04_Organization/overview.html` |
| `dashboard-organization-*` | `04_Organization/<name>.html`（待补） |
| `admin-model.png` · `admin-channels.png` · `admin-creat-models.png` · `admin-edit-model-billing mode.png` · `admin-channels-modle-add key.png` · `admin-logs-gateway.png` · `admin-policies.png` · `admin-routes.png` | `05_Admin/*.html` |
| `homepage-01.png` ~ `-06.png` · `startbuilding-*.png` | `index.html` · `02_Auth/*` |
| `dashboard-login.png` | `02_Auth/*`（参考） |

新增/改版流程：

1. 改版前先 **WebFetch** 抓取线上（如可达）+ 核对 `Screenshots/` 中相关截图
2. 修改对应 HTML 文件
3. 验证：本地 `python3 -m http.server 7842` 打开对比

---

## 5. 当前已知 TODO（按优先级）

> 这些 stub / shell-only 页面已用新 `.app / .topbar / .sidebar / .content` 外壳，**只剩页面体待补**。可以直接编辑该文件把页面内容填进去。

1. **03_Dashboard 子页面**（model-plaza, templates, skills-hub, api-keys, auth, payments, database, storage, deploy, logs, settings）— 12 个页面的页面体按截图重建。
2. **04_Organization 子页面**（members, billing, usage, audit-log, org-settings, employee-ai, my-ai）— 7 个页面体。
3. **05_Admin 子页面**（routing-policies, fault-tolerance, logs, organizations, billing-reconciliation）— 5 个页面体。
4. **index.html（首页）** — 当前反映旧 6 块愿景，与"Four blocks"现行定位存在差异（见 working memory）。建议作为独立改版任务处理。

---

## 6. 本次产品需求：模型录入

**需求位置**：`05_Admin/models-add.html`（5 步向导）。

| 步骤 | 内容 | 业务逻辑来源 |
|---|---|---|
| 01 基础信息 | 对外显示名 / slug / 模态 / 计费模式 / 计量单位 | 逻辑模型层（v2 表单 + 概念文档） |
| 02 货源与渠道 | 渠道决策 / 主渠道 / 上游 ID / 备 1 备 2 优先级 / 新建渠道抽屉 | 渠道层 + 绑定层（v2 + 运营表） |
| 03 价格组件化 | 三态（手填 / 跟随上游 / 免费） + 4 维度（波峰波谷 / 区域 / 调用类型 / 限时折扣） + 利差计算 | 价格组件化（v2 + 8.25 会议） |
| 04 预检验收 | 5 项 checklist（连通 / 上游 ID / 价格毛利 / 折扣期 / 试打） | v2 预检逻辑 |
| 05 上架 | Summary + 系统自动生成 channelBindings + 路由策略 + 容错策略 | v2 + 模型网关概念文档 |

**入口路径**：
- `05_Admin/models.html` → 点击「+ 添加模型」→ 弹窗 4 字段快创 / 点击「创建」→ `models-add.html` 完整向导
- `05_Admin/models.html` → 点击任意模型卡的「编辑」→ `models-edit-billing.html`（计费模式下拉 1:1）

**保留的业务判断**（v2 表单里的关键校准，迁移到 acid 风格后保留）：
- 阿里 `wan` 模型计量单位归一为 `second`（官网口径有误）
- `vectoree/` 前缀是否统一包裹对外 slug（决策待拍板，已在页面内 callout）
- 限时折扣「时间待定」必须填预计区间，预检拦截上架（对应 update.csv wan3.0）
- 利差 ≤ 0（成本折扣 ≥ 售价折扣）预检拦截
- 「是否调用」列 = 渠道决策来源（调供应商 vs 走 openrouter 默认聚合）

**已废弃的旧原型**（不再维护，仅供溯源）：
- `01_Product/admin-上架模型原型演示.html`
- `01_Product/admin-上架模型录入表单v2.html`
- `01_Product/_Demo_Deploy/index.html`（v1 蓝色 SaaS 风格拷贝）

---

## 7. 改版流程（沿用 + 微调）

### 场景 A：线上某个页面变了
1. WebFetch 抓取线上（如可达）+ 核对 `Screenshots/` 相关图
2. 对比现有原型，定位差异
3. 修改对应 HTML（通常文案 / 区块调整）
4. 验证：本地 server 打开对比

### 场景 B：设计系统升级（如换主色、换字体）
1. 改 `_Assets/tokens.css`
2. 验证各页一致性（共享 CSS 自动生效）
3. 改完所有页面自动同步

### 场景 C：新增页面
1. 参考 `03_Dashboard/overview.html`（项目级） / `04_Organization/overview.html`（组织级） / `05_Admin/index.html`（admin）
2. 复用 `_Assets/tokens.css` + `_Assets/layout.css`
3. 更新本 README 目录结构
4. 在 `demo.html` 添加入口

### 场景 D：新增 Dashboard 模块（项目级）
1. 复制 `03_Dashboard/overview.html` 作模板
2. 改 sidebar 链接、page title、内容
3. 更新本 README 目录结构
4. 在 `demo.html` 添加入口

### 场景 E：新增 Admin 模块
1. 复制 `05_Admin/index.html` 作模板（admin 专属 topbar/sidebar）
2. 改 sidebar 链接、page title、内容
3. 更新本 README 目录结构
4. 在 `demo.html` 添加入口

---

## 8. 维护建议

- **不要在单页面里 hardcode 颜色/字号**，全部用 `var(--xxx)` 引用
- **共享 shell 来自 `_Assets/layout.css`**，所有页面都应使用 `.app / .topbar / .sidebar / .content`，不要重复写
- **新增组件前先看 `_Assets/components.css` + `_Assets/layout.css`**，可能已有可复用
- **截图归档**：线上页面变更后，把新截图存到 `01_Product/_Assets/Screenshots/` 并按 `PageName-Feature.png` 命名

---

## 9. 已知限制

- **响应式**：当前主要按桌面 1280px+ 优化
- **交互**：Dashboard / Admin 均为 hover/active 状态，预检 / 价格计算 / 模态等核心 JS 已在 `models.html` + `models-add.html` 实装
- **数据**：所有数据为静态 mock，不代表真实线上状态
- **视觉**：以线上 CSS 提取的 token + `Screenshots/` 截图校准为准

---

> 后续：可在此基础上做（路线 C）线框级 + 组件库变体，作为改版脚手架。视需要再启动。

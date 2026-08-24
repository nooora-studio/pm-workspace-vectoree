# Vectoree Design System Plugin v3.0 — 使用指南

## 📁 文件位置

```
01_Product/05_Prototypes/_Assets/figma_vectoree_design_system.js
```

---

## 🚀 操作步骤（30 秒）

### Step 1: 打开 Figma

👉 https://www.figma.com/design/vMNYJ3iUQ5xBmRgIGsoEeJ/Vectroee

### Step 2: 导入 Plugin（关键：必须选 manifest.json）

> ⚠️ Figma 不能直接导入单独的 `.js` 文件，必须通过一个 `manifest.json` 清单导入。本目录已附带 `manifest.json`（指向 `figma_vectoree_design_system.js`），两者需放在同一文件夹。

**在桌面版 Figma（推荐）操作：**

```
菜单栏（左上角 Figma 图标 / “Figma” 字样）→ Plugins → Development → Import plugin from manifest…
→ 在文件选择框里定位到本目录，选中 manifest.json（或直接选整个文件夹）
→ 确定后，插件会出现在 Development 列表里
```

**如果找不到菜单入口：**
- 画布任意处 **右键 → Plugins → Development** 也能看到已导入的开发插件；但「导入」动作只在顶部菜单栏的 Plugins → Development 下。
- 顶部右侧「Resources（资源）」面板（`</>` 图标）→ Plugins → Development 标签页，也可管理开发插件。
- 浏览器版 Figma 也能导入，但**桌面版最稳**，建议用桌面版。

### Step 3: 运行

```
菜单栏 → Plugins → Vectoree DS v3 → Run
UI 面板 → 点击 🚀 Generate 3 Pages
⏳ 等待 5-10 秒...
✅ 自动生成 3 个页面！
```

> **无需手动删页**：插件会**复用文件中已有的前 3 个页面**（清空旧内容），只在不足 3 页时才新建。所以不管你文件里剩 1 页、2 页还是 3 页都能直接跑，不会触发免费版「最多 3 页」限制。

---

## 📐 页面结构（3 页 × 25 模块）

### Page 1: 🎨 01-Design-Tokens（设计规范总览）— 5 模块

| # | 模块名 | 内容 | 尺寸 |
|---|--------|------|------|
| **1-A** | Color Palette | 9 色色块 + HEX + RGB + 用途说明 | 1120×220px |
| **1-B** | Typography | 3 套字体预览（Archivo Black / Space Grotesk / JetBrains Mono） | 1120×200px |
| **1-C** | Spacing Scale | 8 级间距可视化方块（4px → 64px）+ CSS 变量名 | 1120×140px |
| **1-D** | Shadow System | 4 种硬阴影示例（SM/MD/LG/Acid）+ CSS 值 | 1120×160px |
| **1-E** | Border & Radius | 边框粗细对比（1-4px）+ 圆角说明 | 1120×100px |

### Page 2: 🔘 02-Components（可复用组件库）— 5 模块

| # | 模块名 | 内容 | 变体数 |
|---|--------|------|--------|
| **2-A** | Buttons | Primary / Ghost / Dark / Small | 4 |
| **2-B** | Cards | White / Paper / Featured (Acid) | 3 |
| **2-C** | Terminals | Hero 终端 / SDK 黄边终端（含代码高亮） | 2 |
| **2-D** | Stickers & Labels | Acid Sticker / Ink Sticker / Step Number / Eyebrow / Command Tag | 5 |
| **2-E** | Pricing Cards | Free / Pro / Enterprise（含按钮） | 3 |

### Page 3: 📄 03-Page-Modules（生产环境 1:1 反推 UI 切片）— 15 模块

> 全部按生产环境页面拆分，文案 100% 来自 overview.html / signin.html / signup.html。

**🏠 Homepage（7 模块）**

| # | 模块名 | 内容 | 尺寸 |
|---|--------|------|------|
| **3-A** | Hero Section | 标题 + Vee 卡片 + 终端 + CTA 按钮（2 栏布局） | 1120×540px |
| **3-B** | App Stack | 6 个应用卡片（3×2 网格） | 1120×420px |
| **3-C** | Assembly Line | **4 步流程**卡片 + 箭头 | 1120×290px |
| **3-D** | SDK Section | 左右两栏（SERVER.TS 终端 + SKILL+CLI 信息） | 1120×450px |
| **3-E** | Pricing Section | 标语 + Free/Pro 定价卡 | 1120×380px |
| **3-F** | CTA Section | 黄色全宽 CTA 区块 | 1120×200px |
| **3-G** | Footer Section | 黑底导航（Logo + 链接 + Copyright） | 1120×180px |

**📊 Dashboard（6 模块，Sidebar 232px + Main 888px）**

| # | 模块名 | 内容 |
|---|--------|------|
| **D-1** | Sidebar | 品牌 + Org/Proj pill + Overview/Build/App Stack/Ship 导航（Active=acid） |
| **D-2** | Topbar | 面包屑 + EN/中文切换 + ⌘K + CONNECT + 头像 |
| **D-3** | Connect Block | 终端式「连接你的 coding agent」（`npx @vectoree/cli login/link`） |
| **D-4** | Stats Grid | 4 张统计卡（Token / Spend / API / CLI） |
| **D-5** | Trends Chart | Model Gateway 趋势图（7d/30d/90d chips + acid 面积） |
| **D-6** | Quick Start | 3 张引导卡（Try model / Fork template / API key） |

**🔐 Auth（2 模块，Console Card 设计，50/50 分栏）**

| # | 模块名 | 内容 |
|---|--------|------|
| **A-1** | Sign In Page | 左=黑底斜纹品牌区（绿色 Logo 框 / `AGENT BACKEND CONSOLE` / `ANYONE CAN` + `SHIP AGENTS` / tags）；右=grid 纸背景 + `EN/中文` 切换 + Console 卡片（`Sign In` tab / Email+Password / `SIGN IN` / Google+GitHub / Settings note / 底部链接） |
| **A-2** | Sign Up Page | 同样 Console Card 布局，`Sign up` tab 激活，含 Email / Password / Terms / `SIGN UP` / Google+GitHub |

---

## 🎨 Design Tokens 完整值

### 颜色

| Token | HEX | RGB | 用途 |
|-------|-----|-----|------|
| `--color-acid` | `#D8FF00` | rgb(216,255,0) | 主色、CTA、高亮 |
| `--color-ink` | `#101010` | rgb(16,16,16) | 文字、边框、背景 |
| `--color-paper` | `#F1F1E8` | rgb(241,241,232) | 米白背景 |
| `--color-white` | `#FFFFFF` | rgb(255,255,255) | 纯白卡片 |
| `--color-gray` | `#6B6B60` | rgb(107,107,96) | 次要文字 |
| `--color-ink-40` | `#3A3A32` | rgb(58,58,50) | 副标题 |
| `--color-ink-30` | `#555555` | rgb(85,85,85) | 注释灰 |
| `--color-line-soft` | `#C9C9BD` | rgb(201,201,189) | 分割线 |
| `--color-acid-soft` | `#F5FFCC` | rgb(245,255,204) | 浅黄背景 |

### 字体

| Token | Font Family | Style | Use Case |
|-------|-------------|-------|----------|
| `--font-display` | Archivo Black | Regular | 标题（全大写） |
| `--font-body` | Space Grotesk | Regular | 正文、描述 |
| `--font-mono` | JetBrains Mono | Regular | 代码、标签、终端 |

### 间距

| Token | Value | Use Case |
|-------|-------|----------|
| `--spacing-xs` | 4px | 紧凑间距 |
| `--spacing-sm` | 8px | 小间距 |
| `--spacing-md` | 12px | 默认间距 |
| `--spacing-lg` | 16px | 中等间距 |
| `--spacing-xl` | 24px | 大间距 |
| `--spacing-2xl` | 32px | 区块内间距 |
| `--spacing-3xl` | 48px | Section 间距 |
| `--spacing-4xl` | 64px | 大区块间距 |

### 阴影（Hard Shadow — 无模糊）

| Name | CSS | Use Case |
|------|-----|----------|
| Hard SM | `3px 3px 0 #101010` | 小元素（标签、按钮） |
| Hard MD | `4px 4px 0 #101010` | 卡片、普通元素 |
| Hard LG | `6px 6px 0 #101010` | 重要卡片（Vee Card） |
| Hard Acid | `6px 6px 0 #D8FF00` | 终端、强调元素 |

---

## ⚠️ 注意事项

1. **字体安装**：需安装 Archivo Black、Space Grotesk、JetBrains Mono。未安装时 Figma 会自动替换。
2. **重复运行**：每次运行会复用并清空前 3 个页面重新生成（不会新建超出免费版 3 页限制）。若文件已有同名页面会被覆盖，不会重复堆叠。
3. **所有元素可编辑**：生成的都是原生 Figma 节点，可直接修改。
4. **排错**：若点击按钮后没反应，**看插件面板是否出现红色报错文字**——现在任何生成异常都会显示在面板上（不再静默失败）。若仍无任何反应，确认：① 已打开一个设计文件（编辑器内）；② 面板按钮为黄色「🚀 Generate 3 Pages」。开发版插件每次 Run 都从磁盘重新读取 .js，改完无需重新导入。

---

## 📊 数据来源

- ✅ Puppeteer + Chrome 渲染 vectoree.ai 提取真实 DOM
- ✅ Tailwind utility classes 精确解析
- ✅ 142KB CSS → 99 个 Tokens
- ✅ 3.6MB JS → 169 条 i18n 文案
- ✅ 生产环境截图逐区块校准

---

**版本**: v3.0 | **生成时间**: 2026-08-14 | **精度**: 像素级 1:1

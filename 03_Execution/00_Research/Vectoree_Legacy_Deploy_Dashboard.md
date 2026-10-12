---
title: "Vectoree - 调研报告 - 旧版 Deploy 后台要填什么"
description: "按工程库产品截图 + Dashboard 原型 + 旧版 Deploy 页结构，还原租户在 Deploy 里填写的域名与环境变量，纠正「点发布什么都不填」的口径。"
author: "PM + AI"
created: "2026-09-15"
updated: "2026-09-15"
status: "DRAFT"
version: "0.1"
tags: ["research", "deploy", "dashboard", "domains", "env-vars"]
owners: ["PM"]
---

# Vectoree - 调研报告 - 旧版 Deploy 后台要填什么

> 性质：对照**已上过线 / 已截过图**的旧版 Dashboard，还原租户要填什么。不是选型拍板，也不改「VPS 由项目方养、租户不填 IP」这条。
> 截图目录：`01_Product/_Assets/Screenshots/`（Dashboard 事实源，见 `01_Product/05_Prototypes/README.md` §4）

---

## 0. 先纠正一句

之前调研里把「用户不填 VPS / SSH / 公网 IP」说成「发布时什么都不用填」。后半句和旧版产品不一致。

旧版 **Deploy 是配置台**，不是一键空白按钮。租户要管 **域名** 和 **环境变量**；机器从哪来，后台不让租户填。

| 租户要填 / 要配（旧版已有） | 租户不要填（仍然成立） |
|------------------------------|-------------------------|
| 平台子域 slug（`xxx.vectoree.app`） | VPS IP、SSH、Dokploy「连接服务器」 |
| 自己的域名（如 `agent.yourcompany.com`）+ 去域名商加 DNS | 对方 PaaS 控制台账号 |
| 站点环境变量 Key / Value | 第二套 Auth / Database（Vectoree 已有四块） |

---

## 1. 截图里实际长什么样

### 1.1 `dashboard-project-deploy.png`（项目 Deploy 页，事实源）

侧栏 **Ship → Deploy** 点开后，中间还有一层子导航，四项齐全：

1. **Overview**
2. **Deployment Logs**
3. **Environment Variables**
4. **Domains**

截到的是 Overview 空态，不是 Domains 填完的样子，但信息架构已经写死：**域名和环境变量是一等公民页**，不是发布成功后才偶尔出现的高级项。

空态文案（英文现网）：

- 标题：`NO DEPLOYMENTS YET`
- 说明：把下面这段 prompt 发给已连接的 AI agent，做第一次部署
- 可复制 prompt：`Deploy my app to Vectoree`
- 补充：`You can also deploy using your own workflow.`

含义：第一次上线走 **复制 Prompt → 编程代理 / 自己的 CLI 工作流**，Dashboard 负责事后看状态、填域名、填环境变量。不是「后台点一下、表单为零」。

同构页还在截图里的 Auth / Storage：左边子导航 + 右边配置。Deploy 是同一套壳。

### 1.2 `dashboard-template-detail.png` / `dashboard-template-detail-deploy.png`

模板详情主按钮是 **DEPLOY**，点开不是域名表单，而是 **CONNECT YOUR CODING AGENT**：复制 Skill + `cli login` / `link` / `ai status`。和 Overview 空态同一条「人填 Prompt、代理去部署」的路径。

### 1.3 `Homepage-05-Pricing.png`

定价把域名分成两档，说明产品从一开始就把「填 / 绑域名」当成卖点，而不是隐藏实现细节：

| 档位 | 截图原文 |
|------|----------|
| Free | `Deploy to vectoree.app subdomain` |
| Pro | `Custom domains · usage analytics` |

### 1.4 原型 `01_Product/05_Prototypes/03_Dashboard/deploy.html`（标注 shell only，但 Domains 模块已画）

Figma 映射里 Deploy 拆成 `deploy-status` + **`domain-config`**（`20260819-vectoree-figma-structure-map.md`）。

原型页面体：

- 发布结果：`vee deploy --prod` → live at **`my-agent.vectoree.app`**
- **Domains** 表两行：
  - `my-agent.vectoree.app` · **LIVE** · Configure
  - `agent.yourcompany.com` · **DNS pending** · Configure
- **Deploy history**（提交、生产、回滚）

这就是截图里 **Domains** 页填完之后应有的列表：一条平台子域，一条用户自己的域名（等 DNS）。

---

## 2. 租户在后台到底填哪些字段

截图没有单独拍到 Domains / Environment Variables 填完态。下面字段来自**同一套 Deploy 四页结构**（Overview / Logs / Env / Domains）的页面实现，以及原型已画出的两行域名。Vectoree 旧 Dashboard 与这套 IA 一致；平台后缀在定价和原型里是 **`vectoree.app`**，不是 `.insforge.site`。

### 2.1 Domains 页

分两块，不要混成「一个 URL 输入框」。

**A. 平台子域（Free 就有）**

| 用户动作 | 填什么 | 得到什么 |
|----------|--------|----------|
| Create / Edit slug | 一段短名，如 `my-agent` | `https://my-agent.vectoree.app` |
| Copy / Visit | 不填 | 打开或复制已生效地址 |

系统可以先给一个默认地址；用户仍被设计成**可以改 slug**。原型把这条画成 LIVE。定价 Free 文案对应的就是这一块。

**B. 自己的域名（Pro：Custom domains）**

| 用户动作 | 填什么 | 之后发生什么 |
|----------|--------|----------------|
| Add domain | 自己拥有的域名，如 `myapp.com` 或 `www.myapp.com` / 原型示例 `agent.yourcompany.com` | 后台登记，返回 DNS 说明 |
| 去域名商改 DNS | 不在 Vectoree 里填 IP；按表格加 **CNAME**（子域）或 **A**（apex）以及验证用 **TXT** | 状态：Pending verification → Verified；失败则 Invalid configuration |
| Verify | 不填新字段，点验证 | 对上 DNS 后变 LIVE |
| Configure（原型按钮） | 展开记录 / 改绑 | 对应截图里尚未拍到的展开态 |

用户**不会**在这页填 Vercel 账号、服务器 IP、SSH 公钥。填的是**名字**（slug 或自有域名），DNS 值由平台回写。

### 2.2 Environment Variables 页（截图里的「等信息」）

| 字段 | 说明 |
|------|------|
| Key | 如 `CLIENT_KEY`、`VITE_*` / `NEXT_PUBLIC_*`（浏览器可见的才用 public 前缀） |
| Value | 对应值；支持多行 / 粘贴 `.env` |
| 列表 | Key、Value、Updated at；可改可删 |

这是站点构建/运行要用的变量，和 Vectoree 四块（Gateway / Auth / Database / Storage）的连接信息通常从这里或 CLI `env set` 灌进去。空态时 Overview 仍允许先部署，但连上自己的后端往往要先配这些。

### 2.3 Overview / Deployment Logs

这两页**几乎不填表**：看是否已有部署、复制 Prompt、看历史/状态/取消进行中的发布。发布动作在 Prompt 或 CLI（原型：`vee deploy --prod`）。

---

## 3. 和「嵌 Coolify / 不填 IP」怎么并存

两件事叠在同一产品上，不要互相覆盖：

```
租户在 Vectoree 填：slug / 自有域名 / 环境变量
        ↓
Vectoree API（和 CLI 同一套）
        ↓
隐藏引擎（Coolify 等）在你们的机器上：构建、跑、按域名转发、证书
```

- **旧版租户路径要保留的：** Domains + Environment Variables + 用 Prompt/CLI 触发发布。
- **旧版租户路径没有、也不该加的：** 连接服务器、填公网 IP、贴 SSH 命令。那是 Dokploy Cloud 的用户模型，不是 Vectoree Dashboard。
- **定价含义：** Free = 只用 `*.vectoree.app`；Pro = 再开「Your own domains」。自定义域名不是「以后再说的隐藏能力」，是旧版已经画在侧栏和价目上的配置。

---

## 4. 证据清单

| 材料 | 证明什么 |
|------|----------|
| `01_Product/_Assets/Screenshots/dashboard-project-deploy.png` | Deploy 四页：Overview / Logs / Env / Domains；空态靠 Prompt |
| `.../dashboard-template-detail.png` + `...-deploy.png` | 模板 DEPLOY → 连 Agent，不是空表单一键 |
| `.../Homepage-05-Pricing.png` | Free 子域 / Pro 自定义域名 |
| `01_Product/05_Prototypes/03_Dashboard/deploy.html` | 平台子域 LIVE + 自有域 DNS pending + Configure |
| `01_Product/00_Overview/20260819-vectoree-figma-structure-map.md` | Deploy 模块含 `domain-config` |
| 拆解报告装配线 | Fork 模板 → 配置 → `vectoree.app` 子域或自定义域名 |

工程库**没有**单独的 Domains 填表截图；还原填项时，截图负责「有哪些页」，原型 + 同构四页实现负责「页里有哪些字段」。若之后补拍 Domains / Env 填完态，以新截图覆盖本节字段表。

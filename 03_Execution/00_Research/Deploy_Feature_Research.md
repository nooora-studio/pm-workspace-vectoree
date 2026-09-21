---
title: "Vectoree - 调研报告 - Deploy 功能认知与规划"
description: "把 Deploy 拆成可决策的产品能力：行业默认形态、竞品四类打法、Vectoree 现状与口径冲突、分阶段规划与 P0 spike。"
author: "PM + AI"
created: "2026-09-15"
updated: "2026-09-15"
status: "DRAFT"
version: "0.1"
tags: ["research", "deploy", "planning", "sites", "paas"]
owners: ["PM"]
sources:
  - "launch-checklist.md"
  - "01_Product/00_Overview/20260813_Vectoree_Product_Deconstruction_Report.md"
  - "01_Product/Product_Insights_&_Roadmap_v1.0_20260814.md"
  - "02_Knowledge/00_Competitive/Competitor_Matrix.md"
  - "02_Knowledge/00_Competitive/Vercel/Features.md"
  - "02_Knowledge/00_Competitive/Insforge/Features.md"
  - "02_Knowledge/00_Competitive/GitHub_Spark_Paradigm_Breakdown.md"
  - "03_Execution/03_Solutions/Onboarding_Template_Solution.md"
  - "https://insforge.dev/blog/insforge-deployment"
  - "https://docs.insforge.dev/core-concepts/sites/overview"
  - "https://docs.replit.com/features/publishing/deployment-types"
---

# Vectoree - 调研报告 - Deploy 功能认知与规划

> 配套可视化：[Deploy 功能规划画布](file:///Users/yuke/.cursor/projects/Users-yuke-Documents-pm-workspace-vect/canvases/deploy-feature-briefing.canvas.tsx)
> 调研日期：2026-09-15
> 结论状态：**DRAFT**，P0 需拍板 Sites 底层后再升 REVIEW

---

## 1. 为什么现在要搞懂 Deploy

Vectoree 当前上线的是四块后端：**Gateway / Auth / Database / Storage**。Launch 口径明确 **no deploy**；Dashboard 的 Deployments 入口按清单隐藏；工程里已有 `backend/src/providers/deployments/vercel.provider.ts`，走的是**租户自备 Vercel**。

但产品叙事一直把 Deploy 画在装配线终点：

- 官网/拆解报告：选模 → 装技能 → 认证 → 支付 → **部署**
- 口号：Anyone can ship an agent / Ship Your Agent
- 模板方案：现在是「克隆到本地跑」，**不是平台代部署**
- launch-checklist：模板开闸的前提是「部署能把模板真正跑起来」

所以 Deploy 不是又一个可有可无的 Tab。它是把「Agent 在开发者电脑里能跑」变成「别人用浏览器打得开」的最后一公里，也是模板、自定义域名、Never Sleeps 这些后续卖点的前置依赖。

直接竞品 **InsForge Sites 已正式上线**（2026-01 官方博文 + 现行文档），不再是 2026-08 档案里的 EXPERIMENTAL。窗口在变窄。

---

## 2. Deploy 到底是什么（先建立心智，再看竞品）

### 2.1 一句话

**Deploy 不是「把代码放到某台服务器上」。** 对用户来说，它是：

> 一份能跑的源码 → 变成一个别人打得开、并且已经接好 Vectoree 后端的公网 URL。

「接好后端」这一步才是 Vectoree 该卖的胶水。纯托管商（Vercel/Netlify）只负责「代码上线」；Builder（Lovable/Replit）把后端和上线绑在一起；InsForge 把上线做成 Agent 可调用的原语。

### 2.2 用户真正买到的 7 件事

竞品按钮上写「Deploy / Publish / Sites」，拆开都是同一包能力：

| # | 能力 | 行业默认形态 | 对 Vectoree 的含义 |
|---|------|--------------|-------------------|
| 1 | 源码入口 | Git 仓库 / 本地目录 / Agent 上传 | 现在只有本地 clone 模板，平台接不住产物 |
| 2 | 构建 | 识别 Next / Vite / 静态站并编译 | 用户自己 `npm run`，失败只能自己看 |
| 3 | 配置注入 | 把 Gateway/Auth/DB/Storage 的 URL 与 Key 写入运行环境 | **这是 Vectoree 真正该做的胶水** |
| 4 | 运行时 | 静态 CDN、Serverless、或常驻容器 | 三类成本与能力完全不同，不能混成一个按钮 |
| 5 | 公网身份 | 默认子域 + HTTPS；以后才是自定义域名 | 没有这一步，Agent 只能在开发者电脑上跑 |
| 6 | 观测与回滚 | 状态、构建日志、上一版本一键回切 | Agent 需要结构化失败，而不是一坨终端输出 |
| 7 | 隔离与配额 | 项目级隔离、构建次数、流量上限 | 没有计量就不要对租户收「部署月费」 |

### 2.3 两个必须先分清的概念

**Sites ≠ Compute**

- **Sites**：浏览器能打开的前端（静态站、Next.js、Vite）。InsForge 把这一层交给 Vercel。
- **Compute**：常驻进程（队列、WebSocket、Discord bot、定时研究 Agent）。InsForge 另开 Compute；Replit 用 Reserved VM。

混成一个「部署」按钮，等于 v1 同时做两朵云。

**Publish ≠ 自建云**

- 用户要的是 **Publish**：点一下或让 Agent 说一句，拿到 URL。
- 自建云是 Vectoree 自己当机房老板：隔离、证书、回滚、账单都要自己扛。

内部目前三句话互相打架，见第 4 节。

---

## 3. 竞品怎么做（市场上是四类产品）

不要按「八家都有 Deploy」做功能清单。按**用户完成的动作**分类。

### 3.1 类型 A · Git-push PaaS（体验标准制定者）

**代表：** Vercel、Netlify、Cloudflare Pages

**用户动作：** 连 Git，push 即部署；每个 PR 自动 Preview URL；生产绑定自定义域名和自动证书。

**Vercel 对 Vectoree 特别重要的三点：**

1. 它定义了「现代前端部署」的默认体验（Preview / Rollback / HTTPS）。
2. 它提供 **Host Platform API**：宿主平台可以给子客户创建独立 Vercel 项目、绑域名、自动 SSL。Mintlify 等 2 万站点是这么跑的。这正好是「用户看不见 Vercel、Vectoree 当宿主」的官方路径。
3. 它**不会**做 B2B2C 分润和模板交易市场——Deploy 层可以复用，商业闭环层仍是安全区。

**不要学：** 自建全球 CDN、Fluid Compute、PPR。那是操作系统层，不是装配层。

### 3.2 类型 B · Agent 可编程部署（直接对标）

**代表：** InsForge Sites

2026-01 InsForge 正式推出 Deployment。现行文档口径：

- CLI：`npx @insforge/cli deployments deploy ./frontend`
- 平台上传前端源码（跳过 `node_modules` / `.git` / `.env`），在 **Vercel 上做生产构建**
- Dashboard 跟踪 URL、状态、历史、环境变量、域名
- 默认 URL：`https://*.insforge.site`
- 长时容器**不走 Sites**，走 Compute
- 自托管 InsForge 平台 ≠ 给用户的 app 做 Sites

更关键的产品哲学（来自官方博文）：

> 传统 Deploy 是流水线（人看日志）；Agent 时代 Deploy 是**控制环**（观察状态 → 解释失败 → 修复 → 重试）。

为此他们做了：

- 每个 Cloud 项目 1:1 映射一个 Vercel 项目（隔离）
- Vercel token **不暴露给 Agent**，上传经 InsForge 中转
- 部署状态进表：`WAITING / INITIALIZING / READY / ERROR`
- 失败返回结构化 metadata（errorCode、失败命令、涉及哪些 env），Agent 不用解析原始日志

**这是 Vectoree 最该抄的形态**，尤其我们已经有 Skill + CLI，zedong 也在维护 CLI/skill。

内部档案 `Insforge/Features.md` 仍写 Sites = EXPERIMENTAL，**已过时**，建议后续回刷四件套。

### 3.3 类型 C · Builder 一键 Publish（小白路径）

**代表：** Lovable、Bolt.new、v0、Replit；反面教材 GitHub Spark

共性：在产品里「做完」和「上线」是同一步。用户要的是可分享链接，不是一套云账号。

| 产品 | 发布方式 | 后端怎么来 | 启示 |
|------|----------|------------|------|
| Lovable | 内置托管 + 自定义域名（付费档） | 深度接 Supabase | 前端发布必须带着 Auth/DB 一起活 |
| Bolt | Bolt Cloud / `.bolt.host`，也可导出 Vercel/Netlify | 从「纯前端」补到自带 DB/Auth | 没有 Publish，生成器只是玩具 |
| v0 | 一键上 Vercel | Vercel 生态（Postgres 等） | Next.js 团队的最短路径，锁区也最深 |
| Replit | Autoscale / Static / Reserved VM / Scheduled 四选一 | 同平台 Postgres + secrets | **Agent 不只是网站**，常驻运行时是另一类产品 |
| GitHub Spark | 一键 Publish 到 Azure Container Apps | Cosmos + GitHub 登录 + GitHub Models | 2026-08 关停：独立 builder 败给「在用户已有工具里帮忙」；导出带不走托管后端 |

Spark 对 Vectoree 的三条硬约束仍然有效：

1. 不要另造独立 builder，把 Deploy 注入 CLI / Skill / Dashboard。
2. 导出必须真可带走（标准框架 + 标准连接串，而不是专属 `llm()`）。
3. 不要让线上应用绑死单一专属推理/运行时。

### 3.4 类型 D · 自建 / 长驻 PaaS（launch-checklist 的 spike 对象）

**Dokploy / Coolify：** 在自己的 VPS 上做出 git-push + SSL + 回滚。Coolify 功能更全、更重；Dokploy 更轻、Compose 更原生。共同代价：多租户隔离、配额、白标、Agent API 都要自己包一层控制面。

**Railway / Render：** 托管容器 PaaS，适合 Web + worker + 数据库同项目。运维比自建少，但和 Vectoree 已有的四块后端是**并列的另一朵云**，账单和数据主权会裂开。

**结论：** 类型 D 适合 **Compute / 成本对冲**，不适合当 Sites 的 v1。

---

## 4. Vectoree 现状与口径冲突

### 4.1 事实

| 项 | 现状 |
|----|------|
| 用户能用的 | Gateway + Auth + DB + Storage + 组织钱包 PAYG + CLI login/link |
| 用户不能用的 | Templates / Skills Hub / Deployments（隐藏）；Functions / Realtime / Compute 同样隐藏 |
| 工程 | `vercel.provider.ts`，租户要自备 Vercel |
| 模板方案 | 引导本地安装已集成四块的仓库，明确「不是平台代部署」 |
| 定价 | 部署未对租户开放，没有机器成本可转嫁；清单建议没部署就不要收部署月费 |

### 4.2 三份文档三句话

| 来源 | 说法 |
|------|------|
| 产品洞察 2026-08-14 | 部署层封装 Vercel Deploy / Host Platform API，**永不自建全球 CDN** |
| 竞品矩阵 | InsForge Sites 是实验性转发 → **我们打自研部署引擎 + 域名 + HTTPS** |
| launch-checklist | 现有是 BYO Vercel；开闸前 **Dokploy vs Coolify spike**；landing 不要写「push → 全球边缘」 |

这不是细节分歧，是三种产品：

1. **宿主封装 Vercel**（用户无感）
2. **自研 PaaS**
3. **自建 VPS PaaS（Dokploy/Coolify）**

P0 必须收成一句。下面第 5 节给出建议句。

---

## 5. 建议怎么规划

### 5.1 建议拍板的一句话

> **v1 Deploy = Vectoree 托管的 Sites。** 用户和 Agent 都看不见 Vercel；平台用 Host Platform API（或等价的可编程前端托管）代建项目、代配证书、把四块后端的环境变量注入进去。Dokploy / Coolify 只作为 Compute 与成本对冲的 spike，不进入第一期用户路径。现有 BYO Vercel 不当产品卖。

为什么这句同时满足旧战略和新竞品：

- 符合「不做 L1 基础设施、只做装配层」
- 与 InsForge 同构，但我们可以把 **Vectoree 四块自动注入**做成差异（InsForge 仍要用户/Agent 自己 `env set`）
- 避开自建 CDN 和自建多租户容器平台的工期
- 给 P4 Compute 留了后路，不把长时运行塞进 v1

### 5.2 P1 做什么 / 不做什么

**做：**

- 每个已 `link` 的项目一条生产 URL（如 `xxx.vectoree.app`）
- 发布时自动写入 Gateway / Auth / DB / Storage 的浏览器可公开配置（公开前缀的 URL、anon key、project id）
- Dashboard 一键 Publish + CLI `deploy`
- 三态：构建中 / 成功 / 失败；失败原因人话可读
- 项目级隔离（一个 Vectoree 项目 = 一个托管单元）

**不做（P1 砍掉）：**

- 自建全球 CDN / 边缘网络
- 让用户去注册自己的 Vercel
- 自定义域名、Preview URL、WAF
- 长时容器、队列、定时任务
- landing 上写「push → 全球边缘」

### 5.3 分阶段

| 阶段 | 时间盒 | 做什么 | 完成标准 |
|------|--------|--------|----------|
| **P0 对齐 + spike** | 1–2 周 | 同一份已接四块的前端模板，分别打到 Vercel Host Platform / Dokploy / Coolify | 一页决策：Sites 选谁、Compute 备选谁、BYO 是否下线 |
| **P1 Publish MVP** | 随后 1 个迭代 | 生产 URL + 自动 env + Dashboard/CLI | 用户或 Agent 能打开 `https://xxx.vectoree.app` |
| **P2 可运营** | 1–2 个迭代 | 历史、日志、回滚、自定义域名、给 Agent 的失败码 | 坏了能修、能换域名、Agent 能自己重试 |
| **P3 协作与计量** | 视用量 | Preview URL、Never Sleeps、构建/流量进钱包 | 模板「一键开通」真正成立；开始覆盖机器成本 |
| **P4 Compute** | 刻意延后 | 长时容器 / worker / cron | Sites 稳定后再碰 |

### 5.4 P0 spike 怎么打才算数

不要分别 demo 三个工具的官方示例。用**同一份**已接 Vectoree 四块的前端模板，只比这 6 项：

1. 多租户隔离（项目 A 打不到项目 B）
2. 是否有可编程 API（Agent/CLI 能否不打开对方 Dashboard 完成发布）
3. env 注入能否由我们服务端完成（用户零配置）
4. 默认域名 + HTTPS 是否零操作
5. 单租户月成本（空闲 + 1000 次访问）
6. 回滚是否一等公民

### 5.5 入口优先级（取决于一个产品问题）

两条合法的 v1，不能假装同时都是主路径：

| 主用户 | 主入口 | 对标 |
|--------|--------|------|
| 小白 / Onboarding | Dashboard「Publish」 | Lovable / Replit |
| Cursor / Claude Code 用户 | CLI + Skill：`deploy` | InsForge |

建议：**CLI/Skill 必须可调用**（和现有开发者路径一致），Dashboard 给一个最小 Publish 按钮满足「看到就敢点」。不要先做华丽的部署控制台。

### 5.6 定价

延续 launch-checklist 的结构：**订阅卖功能，PAYG 卖烧云的东西。**

- 没稳定机器成本前，不要单卖「部署月费」
- Free：1 条生产子域 + 有限构建次数
- 超出：进组织钱包
- 自定义域名：放到付费能力，而不是按流量收「成长税」

### 5.7 和模板 / Onboarding 的耦合

建议把规则写死：

> 模板「开通成功」= 本地可跑 **或** 已拿到公网 URL。若 Onboarding 要兑现 ship，P1 结束后模板主 CTA 应从「Clone」改为「Publish」。

在 P1 完成前，模板继续维持「本地脚手架」口径，避免再出现 landing 承诺一键部署、产品却只能本地跑的落差。

---

## 6. 建议先确认的 3 个产品问题

1. **第一期主用户是「小白点 Publish」，还是「Agent 说 deploy」？** 决定 Dashboard 文案和 Skill 文档谁先写。
2. **模板是否约定：没有公网 URL 就不算开通成功？** 会把 Deploy 绑进 Onboarding 主路径，排期立刻上升。
3. **是否接受「产品叫 Vectoree Sites，账单背后是 Vercel」？** 这是最快的 v1，也是和 InsForge 同构的打法；若商业上不能接受，P0 spike 必须证明 Dokploy/Coolify 能在多租户 + Agent API 上达到同一完成标准。

---

## 7. 建议的下一步（不阻塞当前 Onboarding）

| 优先级 | 动作 | 产出 |
|--------|------|------|
| P0 | 评审本文 + 画布，拍板第 6 节三个问题 | 会议纪要里留下「Sites 底层 = ?」 |
| P0 | 工程 spike（staging VPS + Vercel 团队号） | 一页对比，补进 launch-checklist「部署方向」 |
| P1 | 出方案文档 `Vectoree - 方案文档 - Sites Publish MVP` | 再写 PRD |
| 文档债 | 回刷 InsForge Features：Sites 已正式，不再写 EXPERIMENTAL | 竞品档案与事实一致 |

Deploy 可以晚于 Onboarding 做，但**认知和底层选型不应再拖到「要开闸时再想」**。InsForge 已经把「Deploy my app」做成 Agent 闭环；Vectoree 若继续只有四块后端，装配线在用户感知上是断的。

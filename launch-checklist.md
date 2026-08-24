# Vectoree 正式上线清单

面向团队内部：从现在到 `https://vectoree.ai` 对用户开放。随时改本文件追踪进度。

相关文档（不要在这里重复抄）：

| 文档 | 用途 |
| --- | --- |
| [staging-prod.md](./staging-prod.md) | 测试 `vectoree.net` / 生产 `vectoree.ai` 的机器、DNS、CI |
| [feature-availability.md](./feature-availability.md) | Dashboard 各 Tab 现在能不能当真用 |
| [proenv/README.md](../proenv/README.md) | Cloudflare + Nginx |
| [prd-vectoree-platform-cli.md](../.internal/prd/prd-vectoree-platform-cli.md) | CLI 产品规格（命令面、里程碑、平台缺口） |

**状态：** `未开始` · `进行中` · `阻塞` · `完成`  
勾选 `[x]` 表示该项已完成。改状态时顺手更新文末变更记录。

---

## 总览

| # | 事项 | 上线是否必须 | 状态 | 负责人 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 1 | 登录：Google + 邮箱验证码 | 必须 | 进行中 | | 后端 OAuth / OTP 已有；登录页 Google 仍关掉；SMTP 未接生产 |
| 2 | Landing 文案：skill/CLI + PAYG | 必须 | 未开始 | | 现在还在卖 SDK、订阅档、一键部署 |
| 3 | 发布 `@vectoree/cli` + Skill | 必须（和 2 绑在一起） | 进行中 | | `packages/cli` 已落地；skill 草稿在 `docs/agent-native/vectoree-skill.md`；外仓待建 |
| 4 | 测试 / 生产环境拆开 | 必须 | 未开始 | | 方案已写，现网仍是单机 demo |
| 5 | 未就绪功能先藏 | 必须 | 未开始 | | 模板 / 能力中心 / 部署；Functions/Realtime/Compute 已藏 |
| 6 | Stripe 切生产 key | 必须（收款能走通） | 未开始 | | staging 用 test；生产 webhook 必须挂 `.ai` |
| 7 | 定价：覆盖 DB / 部署等 | 建议上线前拍板 | 未开始 | | 结论倾向：先 PAYG 钱包；订阅后补 |
| 8 | 模型上架运营流程 | 必须（能持续上架） | 未开始 | | Admin 能配，但运营路径不丝滑 |
| 9 | 博客 SEO | 可上线后立刻跟 | 未开始 | | 文档站已链到 `vectoree.ai/blog`，页面还不存在 |

建议上线日只承诺这些：**模型网关 + 密钥、Auth、Database、Storage、组织钱包充值、Google/邮箱登录、CLI `login`/`link` + db/storage/ai + Agent Skill。**  
模板、能力中心、自建部署不写进 landing，侧栏也先关掉；对应 CLI 命令（`template` / `skills install` / `deploy`）上线也不宣传。

建议顺序：`4 环境` → `1 登录` + `6 Stripe` → `5 隐藏` → `3 CLI` → `2 Landing` → `8 上架` → `7 定价文案` → `9 博客`。

---

## 1. 登录：Google + 邮箱验证码

**目标：** 用户能用 Google 一键进控制台；邮箱注册/登录必须收到验证码才能用。

### 现状

- 控制台登录页已接通 Google / GitHub（PKCE）与 Google One Tap；同邮箱会自动关联到同一 `auth.users` 账户。
- 后端：`/api/auth/oauth/:provider`、`/api/auth/oauth/exchange`、`/api/auth/id-token`；启动时从 `GOOGLE_*` / `GITHUB_*` env 同步到 `auth.oauth_configs`。
- 邮箱验证码 UI 已有：`EmailVerificationStep.tsx`（8 位码 + 重发冷却）；`AuthOTPService` 已能发码。
- 发信走 SMTP（租户可配）或 cloud provider 回退。**平台自己的注册验证邮件**需要一套生产 SMTP / Resend / SES，staging 和 production 分开。

### 清单

- [x] Google OAuth Client redirect：`https://vectoree.ai/api/auth/oauth/google/callback`；JS origin：`https://vectoree.ai`（One Tap）
- [x] GitHub OAuth callback：`https://vectoree.ai/api/auth/oauth/github/callback`
- [x] 生产 `.env`：`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
- [x] 登录页 Google / GitHub + One Tap
- [ ] 平台级发信：选 Resend 或 SES；staging / 生产各一个 from 域名（`noreply@vectoree.net` / `noreply@vectoree.ai`）
- [ ] 注册、登录验证、重发验证码在 staging 真人跑通（含进垃圾箱、冷却、错误码）
- [ ] 生产 SPF / DKIM / DMARC 配好，抽测到达率
- [ ] 未配 SMTP 时不能「注册成功但永远收不到信」——要有明确错误，不要静默成功

**相关文件：**  
`packages/dashboard/src/features/login/pages/LoginPage.tsx`  
`packages/dashboard/src/features/login/components/GoogleOneTap.tsx`  
`packages/dashboard/src/features/login/components/EmailVerificationStep.tsx`  
`backend/src/services/auth/auth-otp.service.ts`  
`backend/src/services/email/email.service.ts`

---

## 2. Landing page：主推 Skill + CLI；定价改成充值 PAYG

**目标：** 首页只说我们现在真能交付的东西。人和 Agent 的入口按 CLI PRD（D13）：**Skill 编排场景，CLI 做原子命令。** 对标 SurgeDev，丢一行给 Cursor / Claude Code：

```text
set up Vectoree: follow the skill at:
https://raw.githubusercontent.com/Vectoree/vectoree-skills/main/skill.md
```

（raw URL 以 `vectoree-skills` 仓库实际路径为准，见第 3 项。）

终端动画用已拍板的包名：`npx @vectoree/cli login` → `npx @vectoree/cli link`。不要写还不存在的 `vee deploy` / SDK 大一统。

### 现状（和事实不符，必须改）

`packages/dashboard/src/lib/i18n/locales/{en,zh-CN}/landing.ts` + `LandingPage.tsx`：

| 现在写的 | 实际上 |
| --- | --- |
| `$ npx vectoree init` / `vee deploy` / `my-agent.vectoree.app` | `@vectoree/cli` 未发布；没有 `.vectoree.app` 一键部署 |
| 「一个 SDK」「SDK 参考」 | `@vectoree/sdk` 在 CLI PRD 里是应用运行时，**上线不交付**；Agent 走 Skill + CLI |
| Free / Pro $19 / Team $49 订阅档 | 只有组织钱包 Stripe 充值，按量扣模型费 |
| 六块积木含模板、技能、部署、向用户收费 | 上线要藏模板 / 能力中心 / 部署；Payments 是租户接 Stripe，不是我们卖订阅 |
| Hero「每月含 100 万 tokens」 | 钱包未充值不能打网关 |

### 清单

- [ ] Hero / 终端动画改成：`set up` skill URL，或 `npx @vectoree/cli login` / `link`
- [ ] 开发者区块：Skill 一键安装 + CLI 原子命令 + OpenAI 兼容网关；不要把 `@vectoree/sdk` 写成已上线
- [ ] 产品积木只留上线真开的：模型广场、Auth、Database、Storage（支付如果只做「组织充值」就不要写成「给你的用户做订阅」）
- [ ] 工作流改短（登录/link → 选模型 → 调网关 / 建表），不要 Fork 模板、装 Hub skill、push 部署
- [ ] 定价区改成 PAYG：充值进钱包、按模型用量扣、无月费（若第 7 项后来加订阅，再回来改这一块）
- [ ] Footer：死链（Blog / SDK / Changelog / Careers）要么接上要么拿掉
- [ ] 中英 i18n 一起改
- [ ] 文档站、README 与 landing 一致：上线推 CLI/Skill，不推未发布 SDK / 订阅档

**依赖：** 第 3 项 CLI 已能 `npx`、Skill raw URL 可打开；第 5 项藏哪些功能；第 7 项定价拍板。

---

## 3. 发布 `@vectoree/cli` + Agent Skill

规格以 [prd-vectoree-platform-cli.md](../.internal/prd/prd-vectoree-platform-cli.md) 为准（Draft v4.2）。本清单只裁 **上线必须交付的切片**，不重开 PRD 已拍板的决策。

**目标：** 人和 Coding Agent 用同一套原子命令操作 Cloud；Agent 的场景剧本走 Skill（内部调 CLI）。凭证：PKCE `login` → `link` 写入项目 API Key → 之后只认一把 `VECTOREE_API_KEY`。

### 已拍板（不要再议）

来自 PRD Decision Log / §8：

| # | 结论 |
| --- | --- |
| 包 | npm `@vectoree/cli`，binary `vectoree`，推荐 `npx @vectoree/cli`；源码在本仓库 `packages/cli` |
| CLI vs Skill | CLI = 原子能力；Skill = 场景编排（D13）。新能力先落 CLI |
| 登录 | `login` 默认 PKCE；`login --use-device-code` 手动开（D2/D3） |
| 绑定 | `link` 交互选/建项目，自动新建 CLI scoped key 写入 `.vectoree/`（D4–D8）；用户路径不出现 project id |
| 范围 | 仅 Vectoree Cloud（D10）。staging 用 `https://vectoree.net`，生产 `https://vectoree.ai` |
| 不做 | MCP（D1）；账号级 Token（D9）；自托管 |
| 全局 | 所有命令 `--json`；危险操作本地确认 + `--yes`（D11）；验收 Mac + Windows（D12） |
| SDK | `@vectoree/sdk` 是**应用运行时**（用户侧 auth / CRUD / 调模型），不是 Agent 主路径；上线不挡 CLI，也不在 landing 当已交付 |

对标 Agent 入口：<https://raw.githubusercontent.com/surgedevai/surgedev-skill/main/skill.md>。我们的 Skill 放 [Vectoree/vectoree-skills](https://github.com/Vectoree/vectoree-skills)，只编排、不另造平台 API。

### 现状

- 仓库 **没有** `packages/cli` / `packages/sdk`。Dashboard Connect、agent docs 已经在写 `npx @vectoree/cli login|link|...`。
- CLI 走与 Dashboard **同一套** `/api/*`。PRD §7：db / storage / ai / auth 配置 / payments / deploy / keys / docs get 可薄封装；缺的是平台 login、Templates 下载 API、Hosted Auth UI、Skills install。
- 上线会藏模板 / 能力中心 / 部署（第 5 项），因此这些 CLI 模块即使能封装，**对外也不宣传**。

### 上线切片 vs 完整 PRD

PRD 里程碑 M0–M6 是完整产品。上线只做能对上「真开的 Dashboard Tab」的部分：

| 阶段 | PRD | 上线是否必须 | 说明 |
| --- | --- | --- | --- |
| M3 | `login`（PKCE + device code）+ `link` + `.vectoree/` + `logout` / `whoami` / `current` | **必须** | Connect Dialog、Skill 初始化、landing 都靠这条 |
| M1 | `--json` / `--yes`；`docs get`；`db *`；`storage *`；纯 `VECTOREE_API_KEY` 也能跑 | **必须** | 已有 API，薄封装即可演示 |
| AI | `ai models list/search/get`、`ai status`、`ai chat` 探测、`ai snippet` | **必须** | 模型网关是上线主产品；search/snippet 可客户端拼 |
| Auth 配置 | `auth status` / `methods` / `oauth` / `users` / `email smtp`（不含托管 UI） | 建议 | 配置类 API 已有；`auth ui` / `--without-ui` 是 M5，上线不做 |
| Payments | `payments stripe status/config/sync/webhooks` | 可后置 | 租户给自己用户收款，不是我们钱包充值 |
| Deploy `deploy *` | M2 | **上线不宣传** | 与第 5 项藏 Deploy 一致 |
| Template `template *` | M4 | **上线不宣传** | 无 catalog/download API；侧栏也藏 |
| Skills Hub `skills install` | M6 | **上线不宣传** | catalog 只读；install API 没有 |
| Hosted Auth UI | M5 | 后置 | 平台缺口 |
| `@vectoree/sdk` | PRD §6/§8 | 后置 | 应用内 CRUD/Chat 主路径；Agent 先用 CLI |

若工期紧：先 M3 + `ai` + `docs get`，db/storage 可以紧随，但 landing / Skill 至少要能 `login` → `link` → `ai chat` 验通。

PRD 写「若业务要求先 login/link，把 M3 提到 M1 之前」——**上线采用这个顺序。**

### 上线必须有的命令

```text
vectoree login | login --use-device-code | logout | whoami
vectoree link | unlink | current | keys list
vectoree docs list | docs get <docType>
vectoree db list | schema | create | query | insert | sql
vectoree storage buckets list | create | ls | upload
vectoree ai models list | search | get
vectoree ai status | chat | snippet
```

CI / Agent 无浏览器：`VECTOREE_API_KEY`（+ 可选 `VECTOREE_API_URL`）即可，不强制 project id（D5/D6）。

### 平台缺口（阻塞完整 PRD，不阻塞本次上线切片）

来自 PRD §7.5，上线后继续跟：

| 缺口 | 阻塞的命令 | 上线态度 |
| --- | --- | --- |
| CLI 平台账号 login（PKCE + device code + whoami） | `login` / `logout` / `whoami` | **必须补**，否则切片不成立 |
| Templates 服务端 catalog + 下载 + search | `template *` | 上线不做 |
| Hosted Auth UI + `--without-ui` | `auth ui *` | 上线不做 |
| Skills 安装到项目 | `skills install` 族 | 上线不做 |
| Docs search | `docs search` | 可选 |

### 清单

**包与发布**

- [x] 本仓库加 `packages/cli`（不要另开 CLI 仓库；Skill 仍在 `vectoree-skills`）
- [x] 全局 `--json`、`--yes`；配置目录 `.vectoree/`
- [x] staging / 生产 API origin：`VECTOREE_API_URL` 默认生产 `https://vectoree.ai`，文档写明测试用 `https://vectoree.net`
- [ ] 发布 npm `@vectoree/cli`，`npx @vectoree/cli` 能跑
- [ ] Mac + Windows 各走一遍 login → link → ai chat

**M3 登录绑定（先做）**

- [x] 补平台 PKCE login + device code（PRD §7.5 #1）
- [x] `link` 调现有 `/api/gateway/keys` 新建 CLI scoped key，写入 `.vectoree/`
- [x] Dashboard Connect 卡片改成真实命令（现在已经在用 `@vectoree/cli`）

**M1 + AI 薄封装**

- [x] `docs list/get` → `/api/docs`
- [x] `db` 主路径（list/schema/create/query/insert/sql）；危险命令要确认
- [x] `storage` 桶/对象主路径
- [x] `ai models *` / `status` / `chat` / `snippet`（snippet 可本地拼）

**Skill（给 Agent，不是 Hub）**

- [x] 本仓草稿 `docs/agent-native/vectoree-skill.md`（三场景）
- [ ] 推到 `Vectoree/vectoree-skills` 根 `skill.md`（外仓尚无权限创建时先用草稿）
- [x] 不要写 `template get` / `skills install` / `deploy` / SDK 已上线
- [ ] landing（第 2 项）换成这条 skill URL

**明确不做（上线）**

- [x] 不发布 MCP
- [x] 不把 `deploy` / `template` / Hub `skills install` 写进 landing 或 skill 主路径
- [x] 不把 `@vectoree/sdk` 当上线交付（PRD 后置）

---

## 4. 测试环境 `vectoree.net` / 生产环境 `vectoree.ai`

**目标：** 两台机器、两套数据、两套密钥。`main` 自动发测试；生产跟 tag + 人工审批。

方案和勾选清单以 [staging-prod.md](./staging-prod.md) 为准，这里只盯上线卡点：

- [ ] Cloudflare：`vectoree.net` zone；`.site` / `.space` 301 到 `.ai`
- [ ] 现网 `8.219.73.36` 改成 staging，bake `VITE_API_BASE_URL=https://vectoree.net`
- [ ] 新购生产机；`.ai` DNS 切过去
- [ ] `deploy-demo-server.yml` → staging；新建 production workflow + GitHub Environment 审批
- [ ] Redis 进 compose；`7130` 只绑 `127.0.0.1`
- [ ] 两边独立：`JWT_SECRET`、`ENCRYPTION_KEY`、DB、Redis、OAuth、Stripe、模型渠道 key
- [ ] R2 生产桶 + 每日 `pg_dump`
- [ ] 健康检查：`https://vectoree.net/api/health`、`https://vectoree.ai/api/health`

**硬约束：** 不要在现网这台继续攒要当生产的用户数据和 live Stripe。

---

## 5. 未就绪功能先隐藏

**目标：** 租户侧栏和路由看不到做不完的东西；landing 也不提。

改 `packages/dashboard/src/navigation/featureAvailability.ts` 的 `DASHBOARD_HIDDEN_MENU_ITEM_IDS`，并确认 `AppRoutes` 会 redirect。细节对照 [feature-availability.md](./feature-availability.md)。

### 上线要藏

| Tab | id | 为什么 | 何时再开 |
| --- | --- | --- | --- |
| 模板 | `templates` | 只是静态 prompt 库，一键开通依赖部署 | 部署能把模板真正跑起来 |
| 能力中心 | `skills` | 现在是目录浏览，不是可调用的工具 API。对标 [qveris 工具发现](https://qveris.cn/discover?view=tools) 那种「能接的 API」 | 我们提供真实可订阅/可调的工具端点 |
| 部署 | `deployments` | 现在绑 Vercel provider，不是我们自己的 PaaS | 见下面「部署方向」 |

已经藏了、保持藏：`functions`、`realtime`、`compute`。

Analytics / Web Scraper：当前 `vectoree.ai` 域名门控下租户本来就进不去，上线不用额外藏，也先不要宣传。

### 部署方向（开闸前调研，不阻塞本次上线）

现在：`backend/src/providers/deployments/vercel.provider.ts`，租户要自备 Vercel。

| 选项 | 适合 | 代价 |
| --- | --- | --- |
| **Dokploy** | 轻、Docker Compose / Traefik，接近「我们帮你在 VPS 上跑应用」 | 要评估 API / 多租户隔离 / 我们是否自建一层控制面 |
| **Coolify** | 更成熟的自建 PaaS（数据库、预览、更多构建器） | 更重；白标和计费要自己包 |
| 自研 agent（SurgeDev 那种） | 控制面 + 目标机 agent，不 SSH | 工期最长，和现有 Vercel 路径也不兼容 |

**建议：** 上线藏 Deploy；开闸前用一台 staging VPS 分别装 Dokploy、Coolify 做 spike（同一应用 compose 部署、日志、域名、回滚），再写一页对比进本文件。在那之前不要在 landing 写「push → 全球边缘」。

### 清单

- [ ] `DASHBOARD_HIDDEN_MENU_ITEM_IDS` 加上 `templates`、`skills`、`deployments`
- [ ] 直链 `/dashboard/templates` 等会踢回 `/dashboard`
- [ ] landing / footer / 文档不再出现这三项
- [ ] 能力中心开闸标准写清楚：至少 N 个可调 API、鉴权、计费、发现页（可参考 qveris）
- [ ] （上线后）Dokploy vs Coolify spike 文档

---

## 6. Stripe 换成生产 key

**目标：** 组织钱包充值在 `vectoree.ai` 用 live 模式真实扣款；测试环境只用 test。

代码已按环境拆：`STRIPE_SECRET_KEY` / `STRIPE_LIVE_SECRET_KEY`，webhook `test` vs `live`。组织充值：`OrganizationBillingPage` → Stripe Checkout → webhook 入账钱包。

### 清单

- [ ] Stripe 生产账号（或同一账号的 live mode）KYC 完成
- [ ] staging `.env` 只留 `sk_test_` + test webhook → `https://vectoree.net/api/webhooks/stripe/test`
- [ ] 生产 `.env`：`STRIPE_LIVE_SECRET_KEY`、`STRIPE_LIVE_WEBHOOK_SECRET`
- [ ] live webhook 端点 → `https://vectoree.ai/api/webhooks/stripe/live`（路径以代码为准）
- [ ] Checkout success / cancel URL 是 `.ai`，不要指到 `.net`
- [ ] staging 用测试卡跑通：创建 session → 支付 → webhook → 钱包余额增加 → 网关能扣费
- [ ] 生产用小额真卡跑同一条路径，再退款
- [ ] 账单描述、收据、失败重试、重复 webhook 幂等抽测
- [ ] 生产禁止误配 `sk_test_`（启动时校验前缀）

**注意：** 租户应用内 Payments（给租户自己的用户收款）不是我们上线收款路径。我们收的是 **组织钱包充值**。

---

## 7. 定价：怎么覆盖数据库、部署等

**目标：** 上线页和账单逻辑一致；后面加 DB / 部署时知道怎么收费。

### 我们现在有什么

- 实现：**组织钱包预充值 + 按模型用量扣**（OpenRouter 同类）。
- Landing 却在卖 Free / Pro $19 / Team $49，和代码无关。
- Database / Storage / Auth 跑在共享实例上，**还没有**按项目计量账单。
- 部署未对租户开放，没有机器成本可转嫁。

### 竞品怎么收（2026-08 调研，拍板前再对官网）

| 产品 | 固定费 | 用量 | 对我们的启示 |
| --- | --- | --- | --- |
| **OpenRouter** | 无月费；Enterprise 另议 | 预充值 credits；卡充约 5.5%（最低约 $0.80）；模型价透传 | 模型网关就该这样。我们钱包已经是这条 |
| **Supabase** | Free $0 / Pro $25 / Team $599 | 计划内配额 + 超出 PAYG（磁盘、egress、MAU、存储）；计算按项目另计 | 数据库/存储不要只靠模型加价来养；配额 + 超出 |
| **Vercel** | Hobby $0 / Pro $20/人 | 含一点额度，超出按 CPU / 带宽 / 请求 | 部署必须计量；没部署就不要收「部署月费」 |
| **Clerk** | Hobby $0 / Pro $25 / Business $300 | 超出按 MRU；SSO 等插件另计 | 订阅卖的是功能档（MFA、SSO、座位数），不是请求本身 |

共同结构：**订阅卖功能/配额/协作，PAYG 卖真正耗云资源的东西。** 几乎没有人用「纯订阅、用量随便打」。纯 PAYG 只适合网关（OpenRouter）。

### 建议（待拍板，先当默认）

**上线（v1）**

1. 对外只说 PAYG：充值钱包，按模型价（可加平台费率）扣。
2. Auth / Database / Storage 先打包进免费配额（共享实例能扛的量），不单独出账。
3. 不卖 $19/$49 订阅——现在没有对应功能，也没有计量。
4. 钱包未激活不能打网关（代码已是这样），landing 不要写「免费用 100 万 tokens」。

**平台费率（对标 OpenRouter 5.5% 充值费 或 模型加价）**

- [ ] 拍板：充值手续费 vs 模型价 markup vs 两者都要
- [ ] 写进 Admin 定价和用户账单明细，landing 说清楚

**v1.5+（有独立 DB 规格或自建部署之后）**

| 层级 | 收什么 | 覆盖什么 |
| --- | --- | --- |
| Free | $0，硬配额（库大小、存储、项目数），可暂停 | 获客 |
| 订阅（Pro 一类） | 月费：更高配额、不暂停、成员/审计、以后的自定义域 | 固定人力 + 控制面 |
| PAYG 钱包 | 模型 tokens（现在就有） | 上游模型账单 |
| PAYG 超出 | 超额 DB GB、存储、egress | 磁盘和带宽 |
| PAYG 部署 | 按实例规格 / 小时（有 Dokploy/Coolify 之后） | VPS |

没有计量器就不要收那一项。部署没做 = 定价表不准出现「自定义域名部署」。

### 清单

- [ ] 拍板 v1：仅钱包 PAYG，还是「免费档配额 + 钱包」
- [ ] 拍板平台费率（充值费 / markup）
- [ ] 列出共享 Postgres / R2 的免费配额上限（超了先人工，再做自动账单）
- [ ] landing 定价区按拍板结果改（第 2 项）
- [ ] Organization Billing 文案与对外一致
- [ ] （后）DB / 存储 / 部署计量设计，不进本次上线

---

## 8. 模型上架：运营可独立完成

**目标：** 运营能把「一个对外模型」从上架到可玩，不必改代码、不必找研发绑供应商。

### 现状

Platform Admin 已有：Channels（供应商 + 密钥）→ Models（slug、价格、上下架）→ Routes / Policies。  
模型上有 `channelBindings`（渠道 + `upstreamModelId`）。OpenRouter 可同步 / 修价。

还不够丝滑的地方（按真实运营路径补）：

1. 新模型要先有渠道，再手工建模型、再绑 upstream id，步骤分散。
2. 多供应商同一对外 slug（failover）的引导弱。
3. 价格：上游同步 vs 我们卖价 vs 免费/零价开关，运营容易配错导致 `billingPriceStatus` 异常。
4. 上架后 Plaza 是否立刻可见、Playground 能否打通，缺少「一键验收」。
5. 没有运营 runbook（字段含义、谁先谁后、出问题看哪）。

### 理想路径（运营）

```text
1. 渠道已存在（OpenRouter / 直连厂商）且密钥健康
2. 「上架模型」向导：对外名、slug、模态、计费模式
3. 绑定 1..N 个供应商（选渠道 + 填上游 model id）+ 优先级
4. 填卖价或「跟随上游」
5. 预检：密钥、上游 id、价格完整、试打一条
6. 上架 → Plaza 可见
```

### 清单

- [ ] 写一页运营 runbook（Channels → Models → 绑定 → 价格 → 试打 → 上架）
- [ ] 评估要不要做「上架向导」（可先 runbook，痛了再做 UI）
- [ ] 上架预检：无绑定 / 无价格 / 渠道不健康时禁止 enabled
- [ ] Plaza 与 Admin 列表延迟、缓存说清楚
- [ ] 常用模型（text / image / video / embedding）各走一遍，当回归清单
- [ ] 权限：运营角色 vs platform admin，避免运营能改渠道密钥策略时误伤

**相关：** `/admin/channels`、`/admin/models`、`AdminModelsPage.tsx`、OpenRouter sync/repair 对话框。

---

## 9. 博客当 SEO，运营能发文

**目标：** 有可索引的文章站，运营用 Markdown 发，不靠研发发版。文档站已经链到 `https://vectoree.ai/blog`（`docs/docs.json`），现在是空的。

### 选型（推荐 GitHub Pages，但不要挂在 SPA 同源路径上硬扛）

| 方案 | 优点 | 缺点 |
| --- | --- | --- |
| **独立仓库 + GitHub Pages**（`blog.vectoree.ai`） | 运营 PR/直推 Markdown 即发；免费；和产品发版解耦 | 要单独域名或 Cloudflare 反代；主题要自己选 |
| Mintlify 文档站里开 Blog | 已有 docs 流水线 | 偏产品文档气质；运营权限绑 docs 仓库 |
| 主站 React 里写 `/blog` | 品牌统一 | 每篇要进 dashboard 发版，运营不能独立发 |
| 主站 Nginx 反代 `/blog` → Pages | 保住 `vectoree.ai/blog` 这个已公开链接 | Cloudflare / Nginx 多一段配置 |

**建议：** 公开仓库 `Vectoree/blog`（或 `vectoree-blog`），GitHub Pages + 自定义域。  
优先 `https://blog.vectoree.ai`，同时 Cloudflare 把 `https://vectoree.ai/blog` 301 或反代过去，避免文档死链。工具：Astro / Hugo 均可；运营只改 `content/posts/*.md`。

不要用私有仓库 Pages 当 SEO 站（索引和贡献都差）。不要用 Medium 当主站（权重不在自己域名）。

### 清单

- [ ] 定域名：`blog.vectoree.ai` 和/或 `vectoree.ai/blog`
- [ ] 建公开仓库 + Pages + 自定义域 + HTTPS
- [ ] 模板：title / description / date / tags，自动 sitemap、RSS、OG
- [ ] 运营手册：怎么开 PR、预览、合并即上线
- [ ] landing footer 和 docs 的 Blog 锚点改成真 URL
- [ ] 先发 3～5 篇（模型网关、怎么充值、CLI/skill、和 OpenRouter 的差别）再谈关键词矩阵
- [ ] Search Console / 百度（若做国内）提交 sitemap

上线当天可以没有文章，但链接不能 404。没有站时 footer 先拿掉 Blog。

---

## 上线门禁（Go / No-Go）

全部打勾才能把 DNS / 宣传切到「已开放」：

- [ ] `vectoree.net` 与 `vectoree.ai` 两套环境活着，密钥不共用
- [ ] Google 登录 + 邮箱验证码在生产可收到信
- [ ] 组织充值 live Stripe 小额跑通
- [ ] 模板 / 能力中心 / 部署已从侧栏和 landing 消失
- [ ] landing 不再出现 SDK、订阅价、假部署
- [ ] `npx @vectoree/cli login` → `link` → `ai chat` 在生产可跑；Skill raw URL 可被 Cursor 打开
- [ ] Plaza 至少有一组运营验收过的 text 模型可玩
- [ ] 健康检查、备份 dump、回滚演练做过一次（见 staging-prod.md）

---

## 变更记录

| 日期 | 说明 |
| --- | --- |
| 2026-08-14 | 初稿：9 项拆成可勾选任务，补现状、竞品定价结论、隐藏范围、CLI/博客选型 |
| 2026-08-14 | CLI 项对齐 `.internal/prd/prd-vectoree-platform-cli.md`：沿用已拍板决策；上线切 M3+M1+AI；template/deploy/skills install 不宣传 |
| 2026-08-14 | 落地 `packages/cli`、CLI PKCE/device auth、`database:*`/`storage:*` scopes、skill 草稿与 Connect 文案 |

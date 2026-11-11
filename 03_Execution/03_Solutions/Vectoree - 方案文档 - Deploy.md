# Vectoree - 方案文档 - Deploy

> 用途：评审前对齐 Deploy 第一期做什么。供评审逐条拍板。  
> 写于 2026-11-11（北京时间）。  
> 事实截止：公开文档与 [vectoree-starter](https://github.com/VectoreeAI/vectoree-starter) `main`（GitHub 更新于 2026-11-10）。**没有读到 GitLab `dev`。** 见第 1 节。

---

## 1. 背景概述

- **需求来源**：公开文档已经把 Deploy 写成装配线的下一站（[Overview](https://docs.vectoree.ai/introduction)、[Products](https://docs.vectoree.ai/products)、[Deploy](https://docs.vectoree.ai/deploy)）。本库 9 月调研（`03_Execution/00_Research/Deploy_Feature_Research.md`）和未合并的引擎对照，都还停在「选 Vercel 还是 Dokploy」。
- **背景上下文**：现在能用的是同一个 Cloud 项目上的 Model Gateway、Tool Hub、Auth、Database、Storage，外加组织钱包。用户路径停在本地：clone 或空目录 → `login` → `link`。别人用浏览器打不开这个 Agent。
- **这次没拉到的代码**：本仓库 GitHub `origin` 没有 `dev` 分支，`main` 最新提交是 2026-10-13 00:05（北京时间）。工程 GitLab 在 `https://vectoree.space`，未登录返回 401，当前环境没有凭证。starter 的 CI 写明：GitLab `dev` 部署 `vectoree.net`，`main` 部署 `vectoree.ai` 之后才镜像到 GitHub。所以 GitHub 上的 `main` 不是研发当天的 `dev`。
- **关联**：上线清单里的「部署方向」；模板「一键开通」；Payments 排在 Deploy 后面，不进本文。

## 2. 问题说明

- **目前存在的问题**：开发者自己的电脑上能跑，合上电脑别人就进不去。文档对用户的承诺已经是「Vectoree 帮你托管，给出公网 HTTPS，已接上的四块后端还在」，控制台里这条能力仍是即将上线。
- **相关问题**：内部同时存在四种说法，不能一起做。
  1. 租户自备 Vercel（清单里的 `vercel.provider.ts`）。
  2. 平台账号走 Vercel，用户无感（8 月产品洞察）。
  3. 自建 PaaS，或用 Dokploy / Coolify 当隐藏引擎（9 月调研，未合并进 `main`）。
  4. 平台读一份 Compose，在自己的机器上构建并运行（starter 仓库 2026-11-10 已写进导入契约）。
- **佐证**：starter 的 `docker-compose.yml` 头注释写的是平台行为，不是概念：托管从 Git 或 ZIP 导入时只读这一个文件；不发布端口、不读宿主文件、不写 `container_name`；镜像要么 `build`，要么固定 digest；平台会改写这个文件。本机端口、`.env`、`.vectoree` 挂载放在 `docker-compose.local.yml`，托管导入不读它。

## 3. 方案概述

- **整体思路**：第一期 Deploy = 把已经 `link` 的项目，按那份受控 Compose，发布成一条 Vectoree 托管的公网 HTTPS URL。用户和 Agent 拿到 URL；Gateway / Auth / Database / Storage 仍是这一个项目。
- **关键共识**：
  1. 卖的是 Publish，不是第二家云账号，也不是全球边缘网络。
  2. 产品契约以 starter 已经公开的 Compose 托管为准。不再并行做一条「用户自己的 Vercel」或「平台悄悄建 Vercel 项目」的第一期路径。
  3. 模板 Preview（一次性 ticket、访客各自的临时项目、空闲约 12 小时过期）不是 Deploy。Deploy 是这个用户自己的项目，发布后别人反复打开仍是同一个应用。
  4. Edge Functions、Realtime、Compute 继续不在本期。常驻机器人、定时任务、自定义域名都不进第一期。

## 4. 方案说明

- **核心机制**：源码进来 → 只认 `docker-compose.yml` → 平台校验策略 → 平台构建 → 把项目凭证注入到服务端进程 → 平台反代到一条子域并上 HTTPS → 把 URL 和状态交回 CLI / Dashboard。租户的 Compose 自己不对外发布端口，所以流量入口只有平台这一层。
- **模块 / 边界**：

| 做 | 不做 |
| --- | --- |
| 每个已 link 项目一条生产 URL | 自定义域名、按 PR 的 Preview URL、WAF |
| Git 地址或 ZIP 导入，只读根目录 `docker-compose.yml` | 导入时改写用户仓库里的业务代码 |
| 平台构建；失败不上线，已有旧版本就留着 | 让用户本机打好镜像再上传 |
| 项目 Key、数据库口令只进服务端环境 | Key 进前端包、进仓库、进浏览器 |
| CLI 与 Dashboard 调同一套平台接口 | Skill 里另写一套 HTTP |
| 构建中 / 成功 / 失败；失败原因人能读懂 | 把 Dokploy、Coolify、Vercel 的控制台给租户 |
| 默认子域 + 自动证书 | 落地页写「push 到全球边缘」 |

- **分层视角**：
  - 用户侧：Dashboard 一个 Publish，或对 Agent 说 deploy。成功看到 URL，失败看到哪一步坏了。
  - 研发侧：控制面负责校验、构建、注入、反代、状态。执行面负责按 Compose 把容器跑起来。执行面可以是自研，也可以是只对内的引擎；租户看不见。
  - 和「我们自己怎么发版」分开：starter 的 GitLab CI（`dev` → `vectoree.net`，`main` → `vectoree.ai`，服务器只拉镜像）是 Vectoree 发自己的组件。租户 Deploy 不走这条 SSH 流水线。

## 5. 方案详细拆解

### 5.1 用户主链路

1. 项目已经 `link`。没有 link 的目录不能发布。
2. 仓库根目录有一份过策略的 `docker-compose.yml`。本机开发继续用 `docker-compose.local.yml` 叠加，平台忽略它。
3. 用户在 Dashboard 点 Publish，或 Agent 走 CLI。两边提交的是同一份「发布当前已 link 项目」。
4. 平台拉取 Git 或接收 ZIP，丢弃 `.git`、`node_modules`、本地 `.env`。
5. 校验 Compose。不过就停，不构建。
6. 构建。构建机用完即弃。
7. 注入这个项目的服务端环境：API origin、项目身份，以及 Auth / Database / Storage 里只能放在服务端的值。浏览器可公开的地址可以进前端构建，项目 Key 不可以。
8. 分配 `*.vectoree` 子域（具体父域评审时定），签发证书，反代到 Compose 里那个对内暴露的 Web 端口。starter 今天对内暴露的是 web 的 `5173`，平台策略本身不把端口号写死成 5173。
9. 返回 URL。状态进入成功。再次发布时，新版本没就绪之前，旧 URL 仍指向旧版本。

### 5.2 Compose 策略（与 starter 注释对齐，作为准入）

平台改写并拒绝的规则：

1. 不接受 `ports` 发布到宿主。对内用 `expose`。
2. 不接受绑定宿主路径的 volume。具名 volume 可以留，平台会改写声明。
3. 不接受 `container_name`。
4. 镜像要么 `build`，要么写死 digest。不接受浮动 tag 当生产镜像。
5. 不接受 `env_file` 指向仓库里的秘密文件。秘密由平台注入。

starter 里那句约束继续有效：具名 volume 要写成 `name: {}`。平台改写后如果变成空字符串，Compose 会直接拒绝启动。

### 5.3 状态

| 状态 | 用户看到 | Agent 拿到 |
| --- | --- | --- |
| 排队 / 构建中 | 进行中，没有新 URL 切换 | 状态码 + 部署 id |
| 成功 | 可打开的 HTTPS URL | URL、版本 id |
| 失败 | 哪一步失败（校验、构建、启动、证书） | 失败步骤、失败命令或策略条目、缺了哪类环境变量；不要求 Agent 去读原始日志才能重试 |

日志可以在 Dashboard 里展开。第一期不承诺按行检索。

### 5.4 和模板、Preview、Payments 的分界

- **模板**：Deploy 开闸前，开通成功仍是「clone 下来，`link` 之后本地能跑」。不要把 landing 写成一键上云。
- **Preview**：Dashboard 的模板 Preview 继续用 ticket 换一次临时项目，用来试。它和「把我的项目发布给别人」是两个按钮、两套生命周期。运行时可以共用，产品名词不要混。
- **Payments**：文档顺序是先有公网 URL，再让使用者付钱。第一期 Deploy 不接收款。

### 5.5 分步落地

| 步 | 交付 | 完成标准 |
| --- | --- | --- |
| 1 | 把第 5.2 节写成平台校验，用 starter 的 `docker-compose.yml` 当通过样例，用带 `ports` / 宿主挂载 / `container_name` 的文件当拒绝样例 | 合法文件能进构建队列；非法文件在构建前失败，并指出哪一条策略 |
| 2 | 一条生产 URL：构建、注入、反代、证书、三态 | 已 link 的 starter 形态应用能被另一台电脑的浏览器打开，模型调用走该项目网关，项目 Key 不出现在浏览器包里 |
| 3 | CLI 与 Dashboard 接到同一次发布 | 两处看到同一个 URL 和同一个状态 |
| 4 | 开闸 | 侧栏放出 Deploy；文档从 Coming soon 改成上述步骤。在这之前继续藏 |

引擎（自研控制面，或只对内调用的 Dokploy 核心 API）放在第 6 节。第一步和第 2 步的验收不依赖控制台皮肤。

### 5.6 定价

沿用现有结构：功能用产品边界包住，烧云的部分进组织钱包。

- 第一期先不单卖「部署月费」。机器成本还没有稳定计量。
- 每个项目先给一条生产子域。
- 构建次数和流量的额度，等第 2 步有真实用量再定数字，不在本文里写死。
- 自定义域名留到后面的付费能力，不按流量收。

## 6. 待确认项

| 项 | 责任人 | 待决策 / 确认 | 截止 |
| - | --- | -------- | -- |
| GitLab `dev` 上是否已经有托管控制面，以及它是自研还是 Dokploy | 研发 | 有则本期顺着它做，不另起 Vercel 路径；没有则按第 5 节从校验和一条 URL 做起。需要 `vectoree.space` 读权限才能核对 | 评审会上 |
| 第一期主按钮放 Dashboard 还是 CLI | 产品 | 建议两边同一接口，文案先保证 Agent 能调用；Dashboard 只保留一个 Publish | 评审会上 |
| 一个项目是否只保留一条生产 URL，失败是否一定留旧版本 | 产品 | 建议：一条生产 URL；有旧版本时失败不切换 | 评审会上 |
| 子域父域名用哪一个 | 研发 | 与现网 `vectoree.ai` / `vectoree.net` 的环境拆分对齐，测试环境不发到生产父域 | 开闸前 |
| 模板 Preview 与 Deploy 是否共用运行时 | 研发 | 建议共用执行面，产品入口和生命周期分开 | 第 2 步开始前 |

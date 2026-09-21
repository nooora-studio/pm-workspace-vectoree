# 新研发同步提纲｜2026-09-21

> **对象**：王旭（入职首日）  
> **场合**：产研管理流程 + 需求分工  
> **依据**：0911 / 0917 / 0918 周会与规划结论  
> **本周迭代**：Sprint 1（09-21 ~ 09-24，4 个工作日；09-25 中秋）  
> **本周发版**：周三（onboarding + 首页）；**不阻塞王旭这条线**

总述：王旭本周不进 onboarding 发版主线。他接的是 Epic「构建 Github 生态」下的**一条需求**，口径就是 0918 那句：**Awesome list 仓库先建；5 个 template 集成 Vectoree 后发到 public GitHub + Dashboard。**

---

## 一、会上要讲清楚的三件事

1. 产研怎么跑（飞书为准、一周一个 Sprint、验收门）。
2. 他负责哪条需求、验收是什么、跟吴则东怎么切。
3. 前两天怎么熟悉产品，再动手集成。

---

## 二、产品一句话（给研发的上下文）

Vectoree = 给 Agent 的后端（模型网关 / Auth / Database / Storage）。开发者路径是 **CLI：**`login` **→** `link`，不是平台代部署。

当前 1.0 能用的是这四块 + CLI / Skill。**Templates 模块、Skills Hub、一键部署还没对外作为正式能力。** 所以这期做的是 GitHub 上能 clone 的 Starter，用来缩短 onboarding、给种子用户一个可跑样本——不是做控制台里的模板商店。

---



## 三、产研管理流程（按现行口径讲）



### 1. 单一事实源


| 载体           | 放什么                             |
| ------------ | ------------------------------- |
| 飞书「需求管理」多维表格 | **需求唯一入口**。每周正在做的、Backlog、估点都在这 |
| 飞书 Sprint 看板 | 更直观的迭代视图。看「本周迭代任务进度」，不要只看人员看板   |
| GitLab 产品知识库 | 产品事实、竞品、方案 / PRD、会议纪要（本仓库）      |
| 飞书文档         | 方案讨论期（评论、批注）；**定稿后导出 md 进工程库**  |


需求描述以飞书里那条为准。方案没拍板前可以先飞书讨论，拍板了必须归档到仓库。

### 2. 迭代节奏

- **一周 = 一个 Sprint。** S0 / S1 / S2 是第几个 Sprint，不是优先级。  
- 当前是 **Sprint 1**（4 个工作日）。未进本周看板的进 Backlog。  
- **一周一发。** 本周发版日 = 周三。流转：**开发自测 → 魏琼冰验收 → 合 main / 生产。**  
- 状态变了立刻改看板：未开始 / 开发中 / 测试中 / 已完成。



### 3. 需求怎么进迭代

1. 先写清可执行、可验收的描述。
2. **先估 Story Point，对齐后再捞进需求管理。** 1 点 ≈ 1 天。
3. 类型只用下面五种（Epic 不是需求类型，是上方容器）：


| 类型      | 何时用                 |
| ------- | ------------------- |
| Story   | 默认。完整用户故事           |
| Feature | 简单功能                |
| Spike   | 调研                  |
| Task    | 杂活（搭环境、建仓、改 README） |
| Bug     | 单独管，不进需求池           |


小任务（0.5 点、界面、小 bug）当天合；连库 / 接口按估点对齐，不要假一天。  
写代码前先落 md，再基于 md 出 plan。

### 4. 协作分工


| 人   | 这周重心                                                                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 吴则东 | Sprint 1 发版主线：onboarding bug、测试环境、国内短信登录；CLI / Skill。本地环境按他写的[研发新人入门指南](https://zcnkxp2salss.feishu.cn/wiki/N0tPwlpUAiR6SNkREzfcOL1Vn0e) |
| 魏琼冰 | 需求描述、估点、验收、首页 QA                                                                                                                         |
| 佘泽鹏 | GitHub 仓先建好（Awesome list / Starter 的公开仓）                                                                                                 |
| 王旭  | Template 集成 Vectoree（GitHub Starter）；不插队周三发版                                                                                             |


交付物习惯：产品给 **需求文档 +（如有）Demo**。Demo 脚本必须和业务代码隔离，改 Demo 不能误触主逻辑。  
Docs 跟代码走，过期就是错的。

### 5. 两条必须守的产品口径（集成时会碰到）

- **Project 与本地目录 1:1。** CLI `link` 时目录名不一致直接拒绝；只有 owner 能换绑。  
- 用户成功路径是 **clone → 登录 → link → 拿到额度**，不要做成「必须先逛完 Dashboard 才能跑」。

---



## 四、他的需求（一条）

挂在 Epic **构建 Github 生态（awesome agent template 建设等）**。  
0918 原文：**Awesome list 仓库先建；5 个 template 集成 Vectoree 后发到 public GitHub + Dashboard。** 老佘建仓，王旭做集成。

这是一件事的前后两步，不是两条需求：先有 List 仓，再把 5 个模板集成进去，最后同时出现在公开 GitHub 和 Dashboard。

### 要做成什么样

用户从 GitHub clone 下来，按 README 走完 **login → link**，本地已接上 Vectoree，能调模型 /（能接的）Auth、DB、Storage，并拿到额度。同一批模板也上到 Dashboard。

现有仓 [VectoreeAI/awesome-ai-agents-templates](https://github.com/VectoreeAI/awesome-ai-agents-templates) 只完成了「仓库先建」：目前是 README 目录，5 条还链到 Dashboard，**集成代码还没有**。王旭从这里接着做。

### 这条需求里的步骤


| # | 事项 | Owner | 说明 |
| --- | --- | --- | --- |
| 1 | Awesome list 仓库先建 | 佘泽鹏 | 已有：`awesome-ai-agents-templates`（会上写的是单数 agent，以现仓为准） |
| 2 | 5 个 template 集成 Vectoree | 王旭 | fork 后改接 Gateway / 能接的 Auth、DB、Storage；端到端跑通 |
| 3 | 发到 public GitHub + Dashboard | 王旭（Dashboard 上架对产品） | GitHub 上可 clone；Dashboard 能看到同一批模板。List 的 CTA 指向可跑的集成仓，不要只链控制台空页 |

向别人的 Awesome List 提 PR 人家不一定 merge：样本能跑之前不必提。

### 集成技术口径（方案 4.2）

对每一个模板：

1. Clone / fork 到自有仓。
2. LLM 调用改成 Vectoree Gateway（OpenAI 兼容 + 项目 Key）。
3. 能接的：Postgres → Vectoree Database；登录 → Auth；文件 → Storage。四块不必一次全满，但模型网关必须通。
4. 验收：登录（或至少 CLI login）→ 调模型成功 → 能落库 / 能传文件的要验证对应块。
5. README 写清环境、命令、在哪创建 Vectoree 账号、如何 `link`。

不是安装时把任意仓库即时改写成 Vectoree，而是 **预先集成好再让用户拉已集成版本**。

### 候选与 License

需求口径是 5 个 template。方案里 P0 候选：open-webui、dify、anything-llm、FastGPT、langflow；DeepTutor 已在 onboarding 文档里出现，可作为已有线索。先做哪几个、什么顺序，等王旭熟悉项目后再对齐。

**约束：** open-webui / dify / FastGPT 是自定义许可（禁去品牌、禁多租户 SaaS 竞品），正式当官方模板分发前要过法律评估。**公开 publish 前跟佘泽鹏确认 License。** MIT / Apache（anything-llm、langflow、DeepTutor）分发风险更低。

### 这条需求之外

- 向外部 Awesome List 提 PR（样本能跑之前不必提）。  
- 插队周三 onboarding 发版、国内短信、测试环境。  
- 一键部署 / Stripe Connect。  
- Gallery 当海量可运行 Agent 叙事（会上单独说过，依赖部署，不并进这条）。

---



## 五、快速熟悉项目（会后 1～2 天）

顺序固定，先用起来再改别人的仓库。

**Day 0（今天，流程 + 账号）**

1. 飞书：需求管理表、本周 Sprint 看板、他这条需求的卡片（没有就会后建）。
2. 本地环境：按吴则东 [研发新人入门指南](https://zcnkxp2salss.feishu.cn/wiki/N0tPwlpUAiR6SNkREzfcOL1Vn0e) 从头走完。顺序就是文档里的：**软件篇 → 常用网址（GitLab** `vectoree.space`**、火山云权限、主站）→ 前置依赖（Docker / Postgres）→ pnpm 跑起前后端 → 问题篇**。跑不通先看问题篇，再找吴则东。验收走测试环境，少动生产。
3. 产品：自己注册 → `npx @vectoree/cli login` → `link` 一个最小项目，走完 onboarding。不知道用户卡在哪，就写不好 README。

**Day 1（需求上下文）**

1. 方案：`03_Execution/03_Solutions/Onboarding_Template_Solution.md` 第四节（集成步骤 + License）。
2. 会议结论：`20260918_Weekly_Meeting.md` 下周表那一行 + 第六节（方案 1 / 4 已并进这一条）。
3. CLI：重点看 `login` / `link` / 目录 1:1。吴则东是 CLI 负责人，接口问题找他，不要分叉做一套。
4. 读完、自己跑通过 CLI 之后，再写集成 md、出 plan、动手。做几个、先做哪个，熟悉后再定。

**卡住时**

- 流程 / 验收 / 文案：魏琼冰（飞书需求评论）。  
- CLI / 环境 / 网关：吴则东（环境问题先对照[入门指南·问题篇](https://zcnkxp2salss.feishu.cn/wiki/N0tPwlpUAiR6SNkREzfcOL1Vn0e)）。  
- 公开仓权限 / License / 发布：佘泽鹏。

---



## 六、会上建议拍板的口径

1. 飞书就这一条 Story，原文对齐 0918：Awesome list 仓库先建；5 个 template 集成后发到 public GitHub + Dashboard。排期和估点等他熟悉后再对齐。
2. 现仓王旭是否有 push 权限。
3. 建仓已完成，不另拆需求；集成和上架仍写在同一条下。
4. 与吴则东的边界：王旭不改 onboarding 发版分支；Gateway / CLI 问题提给吴则东，不另起炉灶。
5. 公开 publish 前 License 跟佘泽鹏确认。

---

跟进：会后把结论写回飞书需求，并更新 Sprint 看板。完整过程可另存实录。
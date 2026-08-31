# Vectoree 产品文档规划（GitHub docs：创建 / 维护 / 结构与内容）

> 生成时间：2026-08-28
> 关联：9.4 首版交付项（会议记录 `20260827_Onboarding_Optimization_Meeting.md` 行动项「产品文档」）；参照 `launch-checklist.md` 中 `docs/` 与 `vectoree docs get` 现状
> 受众：产品文档面向「小白用户（onboarding）/ 开发者 / 内部（销售·投资人查阅）」三类

---

## 1. 目标与范围

- 9.4 首版交付项之一：规划并产出产品文档（操作手册 / 功能介绍 / QA），存放于 GitHub 工程的 `docs/`。
- 本次先完成**规划**（结构 + 内容大纲 + 维护方法），实际文档产出在规划确认后推进。
- 文档需呼应 onboarding 主线：让**不会写代码的人**也能一步步上手（连接项目 → clone 模板 → 使用四块模块）。

---

## 2. 如何在 GitHub 工程里创建并维护（方法）

### 2.1 目标仓库与位置（先对齐）

- **目标仓库**：Vectoree 主工程仓库（含 `packages/cli`，已有 `docs/agent-native/vectoree-skill.md` 草稿约定）。**不是本 pm-workspace**（本工作区是产品知识库，不放对外产品文档）。
- **目录约定**：`docs/<分类>/<文档>.md`，与现有 `docs/agent-native/` 平级扩展，不破坏已有结构。
- 待确认：具体仓库地址、PM 是否具备写权限（若无，走 PR 由研发合并）。
- **重要更正（2026-08-28 核实）**：官方 GitHub 上可见的 `docs/` 属于 **Mintlify 托管的文档站镜像**（`docs.vectoree.ai` 的来源），页面明确标注「请勿手动编辑此处的页面——下次同步时所有编辑将被覆盖」。因此**不能在 GitHub 镜像仓库手建 / 手改 docs**；真正的编辑源是（a）Mintlify 项目本身（后台编辑器 / CMS），或（b）Mintlify 所连接的主源仓库的 `docs/`。需先向研发确认 docs.vectoree.ai 的 Mintlify 绑定的是哪个仓库 / 分支，再去那里维护。

### 2.2 创建（非技术也能做，两条路径）

| 路径 | 适合 | 怎么做 |
|---|---|---|
| **GitHub 网页直接编辑** | 不装任何工具 | 进仓库 `docs/` 目录 → New file / 点铅笔图标编辑 → 写 Markdown → 提 PR |
| **GitHub Desktop + 编辑器** | 习惯本地写 | Clone 仓库 → 用任意 Markdown 编辑器写 → Commit → Push → 开 PR |

- 格式：**Markdown（.md）**，每篇带轻量 Front Matter（`title` / `description` / `updated` / `audience`）。
- 命名：小写中划线，如 `clone-template.md`、`billing.md`。

### 2.3 维护流程（闭环）

1. **编辑** → 2. **Commit**（写明改了什么） → 3. **开 PR** → 4. **研发 / leader review**（技术准确性） → 5. **Merge**。
- **Owner 机制**：PM 主责内容与时序；研发审技术正确性；leader 拍板对外口径。
- **随产品同步**：每次产品改动（计费规则、CLI 命令、模块能力）必须同步更新对应文档 + `06_changelog`。
- **版本对齐**：产品发版号 ↔ 文档更新记录一一对应，避免"文档说一套、产品做一套"。

### 2.4 文档如何被用户看到（关键，两套路径需区分）

- **公开文档站 `docs.vectoree.ai`**：由 **Mintlify** 托管，源是镜像仓库 `docs/`，内容来自主源同步，**不可在 GitHub 镜像手改**（见 2.1 更正）。9.4 交付的「产品文档（操作手册 / 功能介绍 / QA）」面向终端用户，优先落到 **Mintlify 源**，即 docs.vectoree.ai 上能直接看到的内容。
- **产品内文档 `vectoree docs get <docType>`**：走 `/api/docs`，由产品代码侧的 `docs/` 消费。它与公开站可能是同一份源、也可能是独立一份——**待研发确认两者是否同源**。
- 原「启用 GitHub Pages 从 `docs/` 构建」的设想作废：公开站已由 Mintlify 承担，不再另行搭 Pages。

### 2.5 现有文档站实况（2026-08-28 抓取 docs.vectoree.ai）

经现场抓取，**文档站已建好并上线**（所有页面 `lastmod` 均为 2026-08-18），由 Mintlify 托管。现有一级结构：

| 路径 | 标题 | 内容要点 |
|---|---|---|
| `/introduction` | Overview | 平台定位（model gateway + Auth + Database + Storage + PAYG wallet）；"What ships now" 明确写明 **Templates / Skills Hub / Sites·deploy / Edge Functions / Realtime / Compute 不在本次 launch** |
| `/products` | Products | 四块能力 + "How you operate it" + "Billing"（无月费，组织钱包充值，Auth/DB/Storage 共用基础设施暂无独立计量） |
| `/quickstart` | CLI setup | 实际是命令行快速开始：建账号 → 装 Skill → `login`/`link` → 校验 gateway；**全程假设用户会 CLI / 终端** |
| `/api-reference/*` | API Reference | 自动生成的一整套接口（admin / client / gateway / s3-access-keys / s3-protocol），数量大、覆盖全 |

**结论**：不需要"从零创建空结构"——骨架已存在。9.4 的工作是**在现有 Mintlify 源上补齐缺口**，而不是另起一套 `00_getting-started/...` 目录（除非研发确认 Mintlify 导航要新增这些顶层分组）。

### 2.6 重大口径冲突（须立即对齐，否则文档自相矛盾）

`/introduction` 的 "What ships now" 与 9.4 决策**正面冲突**：

- **官方文档已上线口径**：Templates **不在本次 launch**（与 Skills Hub / deploy 等并列排除）。
- **会议决策（leader 已拍板）**：首版（9.4）把 templates 占位区重定位为「高星项目 clone」入口，**纳入上线**。

若 9.4 真上线 templates，则 `/introduction` 文案与新增的 `/templates` 页必须同步改写，否则对外文档自相矛盾。**在动手写文档前，须先由 leader 再次确认"9.4 是否真的把 templates 从隐藏改为开放"**；确认后，文档站与 launch-checklist（按你此前指示，launch-checklist 本次不改动，仅在此提示风险）的同步一并处理。

---

## 3. 文档结构规划（目录树）

```
docs/
├── README.md                  # 文档站首页 / 总索引
├── 00_getting-started/        # 小白快速开始（onboarding 主线）
│   ├── index.md               # 三步上手：连接 → clone 模板 → 调模型
│   ├── connect-cursor.md      # Cursor 零配置连接（设想一，待研发确认可行）
│   └── clone-template.md      # 一键 clone 高星项目（设想二）
├── 01_guides/                 # 操作手册（How-to，逐步教）
│   ├── gateway-models.md      # 选模型 / 调 Gateway（OpenAI 兼容）
│   ├── auth.md                # 邮箱 + Google 登录接入
│   ├── database.md            # Postgres 数据库接入
│   ├── storage.md             # Storage / Buckets 文件接入
│   └── billing.md             # 充值 / 余额 / 用量查看
├── 02_concepts/               # 功能介绍（概念与定位）
│   ├── what-is-vectoree.md    # 平台定位（"Everything an agent needs"）
│   ├── four-blocks.md         # Gateway / Auth / DB / Storage 四块能力
│   ├── projects-orgs.md       # 项目 / 组织 / 项目 Key 概念
│   └── pricing-model.md       # PAYG 计费模式与余额
├── 03_reference/              # 参考（查用）
│   ├── cli.md                 # CLI 命令全览（login/link/ai/db/storage/docs…）
│   ├── api.md                 # API 概览
│   ├── models.md              # 模型列表与单价区间
│   └── error-codes.md         # 常见错误与处理（余额不足 / 连接失败 / 权限）
├── 04_templates/              # 模板库（高星项目，按行业分类）
│   ├── index.md               # 分类索引（教育 / 求职 / 自动化 / 对话…）
│   ├── deeptutor.md           # 示例：DeepTutor 挂载 Vectoree 后端指南
│   ├── deer-flow.md           # 示例：deer-flow 挂载指南
│   └── ……                     # 每个入选模板一页
├── 05_faq/                    # QA（高频疑问）
│   └── index.md               # 计费 / 连接失败 / 充值 / 报错 等问答
└── 06_changelog/
    └── index.md               # 文档与产品版本对应记录
```

> 设计原则：一级分类按**用户目标**组织（上手 / 操作 / 概念 / 查用 / 模板 / 答疑），而非按内部模块平铺；与 onboarding "任务引导" 思路一致。

### 3.1 现有文档 vs 9.4 缺口对照（2026-08-28 抓取结论）

> 说明：下方"我们的 9.4 规划"指本文第 3 节目录树；"现有站点"指 docs.vectoree.ai 实况。

| 我们的 9.4 规划 | 现有站点是否已覆盖 | 处置 |
|---|---|---|
| 功能介绍（概念） | ✅ `/products` + `/introduction` 已覆盖四块与 PAYG | 不重复建；仅补「小白语言」改写或新增子页 |
| 操作手册（How-to） | ⚠️ `/quickstart` 仅命令行版，无小白路径 | **缺口**：需新增非技术用户上手路径 |
| 小白 onboarding | ❌ 无 | **缺口**：连接项目 / clone 模板 / 调模型 的小白三步 |
| 计费透明（小白） | ⚠️ `/products` 提到 Billing 但极简，无「余额不足前置提醒」 | **缺口**：补 proactive 计费引导（直击"报错才知道要充值"痛点） |
| 模板库（按行业分类） | ❌ 且官方明确「不在 launch」 | **缺口 + 冲突**：9.4 若纳入则新建 `/templates`，但须先解 2.6 冲突 |
| FAQ | ❌ 无 | **缺口**：新增 `/faq` |
| 参考（CLI / API / 错误码） | ✅ `/api-reference` 已自动生成（API 全）；CLI 见 `/quickstart` | 不重复；必要时补 CLI 速查页 |
| 更新日志 | ❌ 无 | 可补，优先级低 |

---

## 4. 内容规划（每类写什么）

| 文档 | 受众 | 核心内容 | 备注 |
|---|---|---|---|
| 00_getting-started/index | 小白 | 3 步流程图：连接项目 → clone 模板 → 首次调模型；每步"是否要钱 / 是否可跳过" | onboarding 核心页 |
| connect-cursor | 小白 | Cursor 安装即带指令（设想一）；当前回退方案：网页内连接 | 可行性待研发 |
| clone-template | 小白 | 从模板库选行业 → 一键 clone → 自动挂 DB/Auth/Storage | 设想二 |
| 01_guides/* | 开发者+小白 | 每篇"前置条件 → 步骤 → 验证 → 排错"四段式 | 操作手册主体 |
| billing | 小白+开发者 | 钱包余额、单价、充值、用量查看、余额不足前置提醒 | 直击"报错才知道要充值"痛点 |
| 02_concepts/* | 全部 | 四块能力说明、项目/组织/Key 概念、PAYG 模式 | 功能介绍 |
| 03_reference/* | 开发者 | CLI/API/模型/错误码 | 查用 |
| 04_templates/* | 小白 | 每个模板：是什么 / 适合谁 / clone 步骤 / 如何挂 Vectoree 模块 / License 说明 | 链接候选清单 `07_Template_Candidates.md` |
| 05_faq | 全部 | 高频问答：要不要钱、连接失败怎么办、充值多少、模板能否商用 | QA |
| 06_changelog | 内部 | 版本 ↔ 文档更新对应 | 维护 |

---

## 5. 落地步骤（建议时序）

1. **对齐（今天/近期，最高优先）**：先解 2.6 口径冲突——由 leader 确认 9.4 是否真把 templates 从隐藏改为开放；同时与研发确认 Mintlify 绑定源仓库（PM 真正能编辑的地方）、PM 写权限、`docs get` 的 `docType` 枚举。
2. **不要从零建骨架**：文档站已存在（见 2.5）。改在现有 Mintlify 源上**补缺口**——新增 `/faq`、`/templates`（若冲突已解）、非技术用户上手路径；不重复建 `/introduction`、`/products`、`/api-reference`。
3. **先产核心缺口 3 项**：非技术用户 onboarding 路径（小白三步）、计费透明引导、FAQ—— 这三项对 9.4 首版最紧迫，且现有站点完全没有。
4. **补操作手册与模板库**：随模板候选定稿（见 `07_Template_Candidates.md`）同步产出；模板页须含 License 说明与「Vectoree 模块挂载」指引。
5. **9.4 前完成** 联调：确认新增页在 docs.vectoree.ai 可见、且（若同源）`vectoree docs get` 可消费。

---

## 6. 待确认项

| 项 | 责任人 | 说明 |
|---|---|---|
| 目标仓库地址与 PM 写权限 | nora + 研发 | 主工程仓库 `docs/` 具体位置 |
| `docType` 枚举与分类映射 | 研发 | 决定一级目录如何被 `vectoree docs get` 消费 |
| 是否启用公开文档站（GitHub Pages） | nora + leader | in-product 已够用；网页版另议 |
| 文档语言（中文 / 双语） | nora | 建议中文为主，关键页可英 |
| connect-cursor 可行性 | 研发 | 设想一未确认，文档需留回退方案 |
| **docs.vectoree.ai 的 Mintlify 绑定源** | 研发 | 确认 Mintlify 项目连的是哪个仓库 / 分支的 `docs/`；这是 PM 真正要维护的源，而非 GitHub 镜像（镜像手改会被覆盖） |
| **in-product `/api/docs` 与 Mintlify 公开站是否同源** | 研发 | 决定 9.4 文档写一份还是两份 |
| **⚠️ 9.4 是否真把 templates 从隐藏改为开放（口径冲突）** | **leader** | `/introduction` 已上线 "Templates not part of this launch"；若 9.4 纳入 templates，须先由 leader 拍板，再同步改文档站 + launch-checklist（launch-checklist 按用户指示本次不改动，仅此处提示风险） |

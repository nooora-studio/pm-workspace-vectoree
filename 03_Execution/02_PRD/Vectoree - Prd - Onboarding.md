# Vectoree - 需求文档 - Onboarding 连接全链路

> **怎么读这份文档。** 按 §1 → §8 顺序推进：先弄清谁能看到（§2），再看怎么流转（§3），然后是每个界面的规则（§4）与跨界面的业务规则（§5），最后是数据契约（§6）与验收（§8）。本文是交付稿，正文只含已定口径，**规则以本文为准**。
>
> **每条规则只在一个地方定义**，其他位置只引用章节号、不复述。看到引用就去那一节，那里是唯一的事实来源。
>
> **Demo 怎么用。** `pm-demo-v2` 用来看首次弹窗、Onboarding Tab、Header CONNECT 按钮 / 弹窗、飞轨和双轨步骤。**不要整仓 1:1 抄 demo。** 不要抄：左下角 Demo 面板、mock 登录、Dashboard / 安装页 / 模板详情上的现网 `ConnectCodingAgentCard`、项目设置 Connect 页签（那是 Connection String）。校验五态、发奖文案、礼花开关以本文 §5.2 为准——demo 把三种「连通但不发奖」收成了一种静默成功，且成功就会喷花。实现细节、踩坑与对接清单见 [技术笔记](../03_Solutions/Vectoree%20-%20Tech%20Note%20-%20Onboarding.md)。`pm-demo-v1` 仅作对照，不再作为交付源。

---

## 0 文档信息

### 0.1 变更记录

> 本表只记**交付定稿之后**的改动。定稿前的修订不列入，需要考古时查 git。

| 日期 | 变更摘要 |
| - | - |
| 2026-09-18 | 首轮验收：侧边栏不再展示 Install（与 Onboarding 抢入口）；校验 `checking` 最长 10s，超时按 `FAILED` + Retry。View Docs / Copy 口径不变，见 §4.4 §4.6 |
| 2026-09-14 | 去掉文档头部 meta；清空定稿前变更记录 |
| 2026-09-14 | 对照 `pm-demo-v2` 同步：交付以最新 main 上的连接引导为准；与现网 `/dashboard/install` 并存；云托管 overlay 桥接不再作为现状 |
| 2026-09-14 | **禁止登录后落入安装页。** 现网 `shouldLandOnInstall` → `/dashboard/install` 与 R1 冲突，必须删除（§3.4） |
| 2026-09-14 | Header CONNECT 是本期改动的现网模块：用 §4.3–§4.4 替换按钮态、点击与弹窗内容；不是和安装页抢入口 |
| 2026-09-14 | 触达角色：新注册用户 = 默认组织 `owner`；被邀请用户不弹。去掉会和 `member` 角色撞车的「Member」统称 |

### 0.2 发布计划

计划发布时间待研发确认排期后填入。

### 0.3 关联文档

| 文档 | 关系 |
| - | - |
| [技术笔记 - Onboarding 实现与交接](../03_Solutions/Vectoree%20-%20Tech%20Note%20-%20Onboarding.md) | **配套文档**。实现约束、踩坑记录、对接替换点清单、交付约束偏差 |
| [方案文档 - Onboarding Dashboard 页面结构设计](../03_Solutions/Solution_Onboarding_Dashboard_Page.md) | 前置方案 |
| [Onboarding Template 功能产品方案](../03_Solutions/Onboarding_Template_Solution.md) | 模板能力方案 |
| [2026-08-27 Onboarding 体验优化对齐会议](../05_Meetings/2026_08/20260827_Onboarding_Optimization_Meeting.md) | 需求来源 |
| [2026-09-04 周会](../05_Meetings/2026_09/20260904_Weekly_Meeting.md) | 需求来源 |
| 现网 `InstallBonusService` | 发奖判定的生产权威，§5.2 与其对齐 |

---

## 1 背景与目标

### 1.1 要解决的问题

Vectoree 的价值只有在用户**把本地工程接上 Vectoree 后端**之后才成立。当前新用户注册后进入 Dashboard，面对的是一个空壳：没有明确的下一步，没有连接状态反馈，没有激励。本需求解决的是**激活（Activation）**。

三条产品判断是后续所有设计的依据：

1. **不教用户敲命令，让编程代理替用户干活。** 所有连接动作封装成一段可复制的自然语言 Prompt，用户粘贴到 Cursor / Claude Code / Codex，由代理完成 `login → link → ai status`。用户全程不需要理解 CLI。
2. **双轨分流。** 已有工程的开发者和完全没有工程的新手路径不同，第一步就让用户自选，避免一条流程同时服务两类人。
3. **连接状态是项目的属性，不是账号的属性。** 一个账号可以有多个组织、多个项目，用户切到没连过的项目时必须显示未连接。

### 1.2 本期范围

**做：** 首次进入弹窗、左侧常驻引导页、Header CONNECT（改现网按钮与弹窗内容）、说明文档页、双轨引导流程、连接校验与 $5 发奖、项目命名约束。安装页 `/dashboard/install` **不承担登录落地、不再承接 Header CONNECT、侧边栏也不再展示入口**（2026-09-18 首轮验收确认，避免与 Onboarding 抢路径）。

本期改动面：

| 类型 | 模块 |
| - | - |
| 新做，相对独立 | 首次进入弹窗（§4.1）、Onboarding Tab / 引导页（§4.2） |
| 改现有模块 | Header CONNECT 按钮与 CONNECT 弹窗（§4.3 §4.4） |
| 必须删的现网逻辑 | 登录后 `shouldLandOnInstall` → `/dashboard/install`（§3.4）；侧边栏 Install 入口 |

**不做（明确排除）：**

| 项 | 说明 |
| - | - |
| 心跳保活 | 连接一次握手即永久成立，见 §5.1 |
| 模板列表运营化配置 | 本期硬编码，后续单独提需求 |
| 额度补发的运营后台入口 | 本期不做 |
| 前端到账二次核对 | 以服务端发放记录为准 |
| URL 深链定位项目 | 本期不做。dashboard 路由不含 project id，分享 URL 不会带上当前项目 |
| 现网安装引导改版 | 安装页 `/dashboard/install`、欢迎额度领取、`DTestConnectTip` **页面本身可保留、侧边栏入口必须隐藏**。**登录后强制落入安装页必须删除**，见 §3.4 |
| 云托管宿主 overlay 桥接 | 最新 main / `pm-demo-v2` 布局里已无 `SHOW_ONBOARDING_OVERLAY` / `SHOW_CONNECT_OVERLAY` 监听。本期不恢复 v1 那套 postMessage |

### 1.3 成功度量

注册 → 首次连接成功的转化率与中位时长；校验失败后 24h 内重试率；$5 欢迎额度领取率。埋点口径见 §7。

---

## 2 用户与触达规则

> **这是全文关于「谁能看到什么」的唯一定义。** §3 §4 只引用本节，不重复判定条件。

主动引导只服务 **新注册用户第一次进 Dashboard**：系统已经给她建好默认组织和默认项目，她就是这个组织的 `owner`。**被邀请加入的人一律不弹。** 三个入口的触达范围各不相同：

| 入口 | 触达范围 | 性质 |
| - | - | - |
| 首次进入弹窗（§4.1） | 仅命中 §2.1 五条件的新注册用户（默认组织 `owner`） | 一次性主动引导 |
| 侧边栏 Onboarding 入口（§4.2） | 默认组织 + 默认项目 + `owner` + 该项目未物理连通 | 非侵入式提示，可随时回来 |
| Header `CONNECT` 按钮（§4.3） | **全员常驻**，无条件 | 被邀请用户以及已切走默认组织的人，都走这里连接 |

> **`owner` 是组织成员角色，不是登录账号角色。** 前端读当前组织的 `selectedOrganization.role`（表 `organization_memberships.role`）。登录成功后账号对象上的 `user.role` 只表示「这是不是登录用户 / 平台超管」，取值是 `anon` / `authenticated` / `platform_admin` / `platform_ops`，**没有** `owner`。写 `user.role === 'owner'` 永远为 false。
>
> | 字段值 | 产品含义 | 谁会是 | 本期引导 / $5 |
> | - | - | - | - |
> | `owner` | 这个组织的创建者 / 主人 | **新注册用户。** 注册时系统创建默认组织、默认项目，并把创建者写成 `owner`。邀请时不能选这个值 | **命中**（还要满足默认组织 + 默认项目等其余条件） |
> | `admin` / `developer` / `member` / `viewer` | 被请进来的人 | 邀请加入时赋予。`admin` 能管日常事务，但不是创建者 | **不命中。** 被邀请的不弹引导、不走庆典，只用 Header CONNECT |
>
> 现网 `InstallBonusService` 发欢迎额度也是 `membership.role === 'owner'`，与引导对齐。不要改成 `role === 'admin'`。

### 2.1 主动弹窗权限

五条件**同时满足**才展示：

| # | 条件 | 判定 |
| - | - | - |
| 1 | 当前组织是账号的**默认组织** | 注册时系统初始化创建的那个组织，不是后续自建 / 被邀请加入的 |
| 2 | 当前项目是该组织的**默认项目** | 固化名为 `default` 的系统项目，见 §5.4 |
| 3 | 当前用户是这个组织的创建者 | `selectedOrganization.role === 'owner'` |
| 4 | 当前默认项目处于**未连接**状态 | `isProjectConnected === false`，见 §5.1 |
| 5 | 引导未完成且从未展示过弹窗 | `onboarding_status !== 'completed'` 且 `modal_revealed === false` |

新注册用户第一次进 Dashboard 时，1–3 自然成立：默认组织、默认项目、她就是 `owner`。之后被邀请进别人组织、或自己再建模组织，都不满足这三条，不再弹。

### 2.2 侧边栏入口显隐

显示条件：`处于项目空间（非组织空间） && 默认组织 && 默认项目 && selectedOrganization.role === 'owner' && 该默认项目尚未物理连通成功`。

位于**侧边栏底部区域首位**（与 Settings 等底部项同组、排在它们之前），图标 `Rocket`。放底部而非顶部的理由：引导是「需要时回来找」的入口，不该每次访问都挡在 Dashboard 前面被划过。

欢迎额度未领完时，同一底部组里还会出现现网 **Install** 入口。两条入口可以同时在，**互不替代**：Onboarding 仍排该组首位。

销毁前，命中用户可随时点此入口回到引导页，**并自动定位到上次停留的步骤**（§4.2）。

> **显隐绑定的是触达资格 + 物理连通，不是账号级 `has_ever_connected`。** 这条口径的三个直接后果在 §2.3 展开。

### 2.3 各类用户的确定行为

| 用户 | Modal | 侧边栏入口 | 落地重定向 | 礼花 / 额度提示 | 连接方式 |
| - | - | - | - | - | - |
| **新注册用户 · 还在默认组织 + 默认项目 + 未连接**（`role === 'owner'`） | 弹一次 | 显示 | 走 R1（§3.4） | 按 §5.2 矩阵 | 弹窗内 / 引导页 / Header |
| **同一账号切到非默认组织或非默认项目**（即使仍是那个组织的 `owner`） | 不弹 | 隐藏 | 不走 | **无庆典 UI**，但发奖仍由服务端按 §5.2 四条件判定 | Header `CONNECT` |
| **被邀请加入的人**（`admin` / `developer` / `member` / `viewer`） | **严格禁止** | **严格禁止** | 不走 | **严格禁止** | Header `CONNECT` 或 Docs |

被邀请用户看不到「你没有资格」这类文案——他们根本走不到 §5.2 那张矩阵。

**边界：**

| 场景 | 处理 |
| - | - |
| 处于组织空间（非项目空间） | 侧边栏不显示 Onboarding 入口 |
| 新注册用户未完成连接时新建或切换到其他组织 | 禁止弹 Modal、禁止展示 Tab——非默认组织不在触达范围。Header 按该组织当前项目连接态渲染 |
| 新注册用户切到未连接的非默认组织 / 项目 | Header 按钮恢复黄色呼吸灯 `CONNECT`（§4.3），侧边栏入口**不得出现**。两者判定源不同：按钮读项目级 `isProjectConnected`，入口读触达资格 |
| 站外先连上再回站 | 接口返回 `has_ever_connected: true` + `completed_offsite: true`，前端直接呈现完成态，不再引导。该用户已连接，本就落在触达范围外 |
| 被邀请用户登录后进入 Dashboard | 零 Modal、零 Tab、零礼花、零额度提示。连通后 Header 转 `CONNECTED`，无迎新反馈 |

---

## 3 主流程

### 3.1 端到端流程

```
用户注册 → 进入 /dashboard
    ↓
判断触达资格（§2.1）
    ├─ 不在触达范围
    │     → 停留当前页，不弹 Modal、不展示 Tab
    │     → Header 按项目连接态渲染；挂载走 CONNECT / Docs
    └─ 在触达范围
          ├─ modal_revealed = false → 默认落在引导页并弹出首次弹窗（R1）
          └─ modal_revealed = true  → 停留当前页，侧边栏保留入口
          ↓
     步骤 0：选择轨道（§3.3）
          ├─ developer → 复制 Prompt → 校验
          └─ newbie    → 选代理 → 选模板复制 Prompt → 校验
          ↓
     校验（接口 C → 现网 InstallBonusService）
          ├─ FAILED        → 见 §5.2，不销毁 Tab、不写 modal_revealed
          └─ 物理连通       → 按 §5.2 矩阵渲染四种 SUCCESS_* 之一
          ↓
     收尾（两种容器结局，§4.7）
          ↓
     onboarding_status = completed → 侧边栏入口销毁 → 跳转 /dashboard
```

### 3.2 状态机

**主状态：**

```
not_started ──选择 track──▶ in_progress ──校验成功且完成收尾──▶ completed
```

关闭 Modal 不改变主状态，仅写 `modal_revealed: true`；`track` / `step` / `selected_agent` / `selected_starter` 原样保留。

**校验子状态**（纯前端瞬时态，不入库，见 §6.1）：

```
idle ──点击 Verify / 自动探测──▶ checking ──┬──▶ success
                                            └──▶ failed ──Retry──▶ checking
```

**Step 语义随轨道变化：**

| track | step 0 | step 1 | step 2 | step 3 | 计步显示 |
| - | - | - | - | - | - |
| `none` | 选择开始方式 | — | — | — | 不显示 |
| `developer` | 选择开始方式 | 复制 Prompt 到代理 | 校验连接并领 $5 | — | `1/2`、`2/2` |
| `newbie` | 选择开始方式 | 打开编程代理 | 选模板并复制 Prompt | 校验连接并领 $5 | `1/3`、`2/3`、`3/3` |

### 3.3 双轨步骤明细

**Developer 轨（已有工程，2 步）：**

| 步骤 | 界面 | 用户动作 | 状态变更 |
| - | - | - | - |
| 0 | 双卡选择 | 点「已有工程」 | `track='developer'`、`step=1`、`onboarding_status='in_progress'` |
| 1 | Prompt 框 + Copy | 复制 → 粘贴到代理 → 点「已执行，下一步 →」 | `step=2`、`verify_state='idle'` |
| 2 | Verify Connection | 点击校验 | 见 §5.2 |

**Newbie 轨（从模板开始，3 步）：**

| 步骤 | 界面 | 用户动作 | 状态变更 |
| - | - | - | - |
| 0 | 双卡选择 | 点「从模板开始」 | `track='newbie'`、`step=1` |
| 1 | 5 个代理选项 | 点某代理（新窗口打开其下载页）→ 点「已就绪，下一步 →」 | `selected_agent=<id>`、`step=2` |
| 2 | 4 个模板卡 | 点某模板（**点击即自动复制该模板 Prompt**）→ 点「已执行，下一步 →」 | `selected_starter=<key>`、`step=3` |
| 3 | Verify Connection | 点击校验 | 见 §5.2 |

> **Newbie Step 1 定位说明（重要，避免研发误实现）**
>
> 本步骤是**纯前端的确认动作与下载入口引导**，目的只有两个：帮没装代理的用户找到下载地址，以及让用户自己确认「我已经准备好了」。
>
> - **不做任何本地 Agent 物理检测**：不探测本机进程、不读文件系统、不验证安装路径、不调用任何接口
> - `selected_agent` 仅作埋点与后续文案个性化之用，**不参与任何校验或分支逻辑**
> - 未选代理也允许点「已就绪，下一步 →」推进（用户可能早就装好了），**该步骤不存在失败态**

**编程代理选项**（前端常量，不需要接口）：

| id | 显示名 | 下载链接 |
| - | - | - |
| `claude-code` | Claude Code | https://claude.ai/download |
| `cursor` | Cursor | https://cursor.com |
| `copilot` | GitHub Copilot | https://github.com/features/copilot |
| `windsurf` | Windsurf | https://codeium.com/windsurf |
| `cline` | Cline | https://cline.bot |

**模板选项**（前端常量，不需要接口）：

| key | 名称 | 定位 | 仓库 |
| - | - | - | - |
| `deeptutor` | DeepTutor | 创建我自己的 AI 学习教练 | https://github.com/HKUDS/DeepTutor |
| `ragflow` | RAGFlow | 创建一个能检索我资料库的问答 Agent | https://github.com/infiniflow/ragflow |
| `deerflow` | DeerFlow | 创建一个能帮我调研、编程和干长任务的 Agent | https://github.com/bytedance/deer-flow |
| `librechat` | LibreChat | 创建一个我自己的私有 AI 聊天助手 | https://github.com/danny-avila/LibreChat |

### 3.4 路由与落地规则

| 路径 | 页面 | 条件 |
| - | - | - |
| `/dashboard/onboarding` | 引导页（§4.2） | 需登录，无 feature flag |
| `/dashboard/onboarding/docs` | 说明文档页（§4.5） | 需登录，无 feature flag |
| `/dashboard/install` | 现网安装 / 欢迎额度页 | 路由可保留。**侧边栏不得再展示入口**（2026-09-18 验收：与 Onboarding 抢路径）。欢迎额度改走 Onboarding 发奖（§5.2），不再靠 Install 页领取 |

**落地重定向：**

| 规则 | 条件 | 行为 |
| - | - | - |
| R1 | 在触达范围内（§2.1）且 `modal_revealed === false` 且路径为 `/dashboard` | `replace` 到 `/dashboard/onboarding`，选中侧边栏 Onboarding 项，并弹出首次弹窗。**被邀请用户与非触达用户一律不走 R1**，停在 `/dashboard` |
| R2 | 引导已完成且路径为 `/dashboard/onboarding` | `replace` 跳 `/dashboard` |

> **R1 是落地默认，不是锁定。** 一旦用户关闭 Modal 或主动切走，不再有任何重定向。

**禁止登录后落入安装页（与本期冲突，必须改现网）。**

现网 `LoginPage` 在登录成功后若 `shouldLandOnInstall(installBonus)` 为真，会 `navigate('/dashboard/install')`。这条路径会把命中 §2.1 的新注册用户拦在安装页，R1 永远不会触发，连接引导弹不出来。

研发对接时必须：

1. **删除**登录成功后的 `shouldLandOnInstall` → `/dashboard/install` 重定向（`LoginPage.tsx`）。
2. 登录后的默认落地一律是 `/dashboard`。命中 §2.1 的用户由 R1 带到引导页并弹出首次弹窗；未命中的用户停在 Dashboard。
3. **任何角色、任何欢迎额度状态，登录 / 注册成功后都不得被重定向到 `/dashboard/install`。** 没有「先装再连」的顺序。
4. **侧边栏不得再展示 Install 入口。** `/dashboard/install` 路由可保留，但用户不能从导航点进去；CONNECT 与登录落地都不走这条页。

不要把 demo 里 mock 登录跳过安装页理解成「只有 demo 才这样」——那是产品口径，上线也必须如此。

**不阻断浏览原则**（强约束，验收重点）：

- 关闭 Modal 后**停留在当前页面**，不跳转、不刷新、不回弹
- 可自由切换到任意 Tab，引导未完成不构成任何功能阻断
- 再次访问 `/dashboard` **不会**被拉回引导页
- 引导的存续感由「侧边栏入口（仅触达范围内的新注册用户）」+「Header 黄色呼吸灯（全员）」两个非侵入式提示承载，不靠路由强制

---

## 4 功能规格

### 4.1 首次进入弹窗

**弹出条件**：§2.1 五条件同时满足。宽 600px，遮罩黑色 65% + 背景模糊。

| 区域 | 规则 | 验收 |
| - | - | - |
| 标题 | 随进度变化：`none/0` → Welcome to Vectoree；`developer/1` → Connect your project；`newbie/1` → Check your coding agent；`newbie/2` → Pick a starter；其余 → Verify connection | B1 |
| 主体 | 内嵌完整向导，与引导页共用同一套步骤组件 | B2 |
| 弹出频次 | 仅触达范围内的新注册用户自动弹一次。`modal_revealed` 只在 Modal 被用户关闭（✕ / 遮罩 / Esc）或 `SUCCESS_*` 收尾时写入；**展示瞬间不写，`FAILED` 探针也不得写** | B3 |
| 关闭行为 | 三种关闭方式均只收起弹窗，**不改动任何进度** | B4 |
| 成功结局 | 走 **CTA 结局**，时长见 §4.7 | B10 |

**边界：**

| 场景 | 处理 |
| - | - |
| 中途关闭（未完成） | **保留全部进度**：仅写 `modal_revealed: true`，`track` / `step` / `selected_agent` / `selected_starter` 原样保留。切回引导页或重开弹窗时自动恢复并定位到对应步骤，不回到第一步 |
| 已完成后再触发 | 不改变进度，只写 `modal_revealed: true` |
| 关闭后切走再从侧边栏切回 | 引导页按保留的 `track` / `step` 展开对应步骤，已选代理 / 模板保持选中态 |

### 4.2 左侧 Onboarding 引导页

路径 `/dashboard/onboarding`。入口显隐见 §2.2。

| 区域 | 规则 | 验收 |
| - | - | - |
| 页头 | 大标题 `Get started` + 贴纸 `🎁 $5.00 Welcome Credit` + 一行副标题。**连接状态不在此处展示**，统一由 Header 按钮承载 | B5 |
| 清单容器 | 手风琴式，同一时刻只展开当前步骤 | B6 |
| 步骤项三态 | `done`：黑底 acid 勾，可点击回退；`current`：acid 底黑方块，展开；`upcoming`：白底空心圆，禁用、50% 透明、折叠 | B6 |
| 导航约束 | 只能回看已完成步骤，**不能跳到未完成步骤**（前端显式拦截向前跳） | B7 |
| 成功结局 | 走 **Banner 结局**，时长见 §4.7 | B11 |
| Tab 销毁 | 跳转完成后侧边栏菜单项消失 | B8 |

**边界：探针返回任一 `SUCCESS_*` 但用户未关闭 Modal。** 物理连通态**立即**置位，侧边栏入口按 3s 延迟销毁，**与 Modal 开关状态无关**。`FAILED` 时入口必须继续在。

### 4.3 Header 连接状态按钮

右上角常驻，**全员可见**。

| 状态 | 判定 | 圆点 | 文案 | 文字色 |
| - | - | - | - | - |
| 未连接 | `isProjectConnected === false` | 黄色 `#FFB300` + 呼吸扩散动画 | `CONNECT` | `ink-30` |
| 已连接 | `isProjectConnected === true` | 绿色 `#00C853` 实心，**无动画** | `CONNECTED` | 白色 |

判定口径见 §5.1，此处不重复。

| 规则 | 说明 | 验收 |
| - | - | - |
| 项目绑定 | 状态跟随 Header 当前选中 Project，切组织 / 切项目后若新项目未连接则立刻退回黄色 | B12 |
| 点击行为 | 未连接 / 已连接都打开同一个 CONNECT 弹窗（§4.4）。不跳路由、不进安装页 | B13 |
| 无项目兜底 | 尚未解析出项目时按未连接渲染。账号一个项目都没有时确实没有任何连接，显示 `CONNECT` 是正确语义 | B14 |

> **这是对现网 Header CONNECT 的替换，不是另做一套入口。** 按钮还在右上角原来的位置，改的是状态表现、点击结果和弹窗内容。

现网实现里，`AppHeader.handleConnectClick` 在 `DASHBOARD_V4_EXPERIMENT = D_TEST` 时会 `navigate('/dashboard/install')`，安装页上按钮还会 `disabled`。对接时按本期规格覆盖掉：

1. 点击一律 `openConnectDialog()`，打开 §4.4 弹窗。
2. 去掉 `isDTest` 跳转和 `isConnectDisabled`。
3. 黄 / 绿态只由当前项目的 `isProjectConnected` 驱动（§5.1）。

### 4.4 CONNECT 弹窗

宽 640px，自上而下四区块。该弹窗就是 Header CONNECT 点开后的内容。**用本节替换现网 Header CONNECT 弹窗**（含现网弹窗里的 skill 安装文案、Discord CTA、Connect later）。

不要和下面这些现网表面搞混：Dashboard 页、安装页、模板详情里的 `ConnectCodingAgentCard` 本期不改；项目设置页 Connect 页签是 Connection String（`canShowConnect` = `isVectoreeCloudProject()`），**不是**本弹窗，不要替换成 §4.4。

| 区域 | 规则 | 验收 |
| - | - | - |
| ① Header | 主标题 `CONNECT YOUR CODING AGENT`；副标题 `Paste into Claude Code, Cursor, Codex, or any coding agent.`；右上角极简 ✕ | B15 |
| ② 工程状态条 | 见下方展开 | B16 B17 |
| ③ Prompt 代码框 | 黑边内嵌框，等宽字体。格式见 §4.6。**必须随 Header 选中项目实时更新** | B18 |
| ④ 底部操作行 | 左下轻量图标链接 `📖 View Docs ↗`，点击关闭弹窗并跳 `/dashboard/onboarding/docs`；右下主按钮 `📋 COPY PROMPT`，复制 ③ 全部内容，成功后文案短暂变 `Copied!` | B19 |

**② 工程状态条展开：**

独立黑边卡片，左右两侧规则不同。

- **左侧**：文件夹图标 + **本地工程目录名**，取 `local_folder_path` 的最后一段（`/Users/dev/workspace/my-agent-app` → `my-agent-app`）。超长截断；`title` 用**完整绝对路径**（没有路径时用当前展示的项目名）。**未拿到本地路径时回退展示云端项目名。**
- **右侧**：**仅已连接时**渲染绿色实心圆点 + `CONNECTED`；未连接时为空。圆点规格与 Header 已连接态相同（§4.3）。
- **不含任何心跳 / 时间读数**（§5.1）。
- **不重复展示云端项目名与 id**——③ 已经完整给出，同屏重复两遍没有价值，而且状态条一条里混着「本地目录」和「云端 id」两种身份反而更难读。
- 左右两侧都为空时整条卡片一并不渲染，不留空条。

**边界：**

| 场景 | 处理 |
| - | - |
| 当前项目未连接 | 右侧不显示 `CONNECTED` 标记，左侧回退为云端项目名。**这是预期行为，不是 bug** |
| 切组织 / 切项目后项目列表尚未返回 | **不得出现通用占位名**（如 `My Vectoree Project`）——平台上没有同名项目，CLI 按名解析必然落空。状态条与 Prompt 共用同一解析器，两处要么同时是真实项目，要么同时是兜底，不允许一处真一处假。详见 §4.6 |

### 4.5 说明文档页

路径 `/dashboard/onboarding/docs`，纯静态，三个章节：`Have a project` / `Start from a template` / `Troubleshoot`。**无后端依赖。**

### 4.6 Prompt 模板规格

**已有工程（developer 轨 + CONNECT 弹窗共用）：**

```
set up https://vectoree.ai/SKILL.md

Connect Vectoree as the backend for this project.
Dashboard project: {projectName} ({projectId})
Follow the skill: login, link this directory, then run ai status.
```

**模板起步（newbie 轨）：**

```
set up https://vectoree.ai/SKILL.md
Clone {starter.repo}
Replace model serving, search, login/signup, database, and storage with Vectoree.
Dashboard project: {projectName} ({projectId})
Follow the skill: login, link this directory, then run ai status.
```

**变量取值：**

| 变量 | 取值 |
| - | - |
| `projectName` | 当前选中项目 name，否则项目列表第一项 name |
| `projectId` | 当前选中项目 id，否则项目列表第一项 id |

`projectId` 为 `null` 时，`Dashboard project:` 行退化为只有项目名、不带括号 id。

> **不得使用通用占位名。** `My Vectoree Project`、`Default project` 这类前端自造的名字在平台上并不存在同名项目，CLI 按名解析时必然落空，会把代理引向一个不存在的目标。状态条（§4.4）与 Prompt 两处同此约束。
>
> **两处必须共用同一个项目解析器。** 各自解析一次就会出现「状态条显示 A、指令连到 B」。
>
> **项目身份的来源不是 URL。** dashboard 路由不含 project id，项目选择由 `OrganizationContext` 持有。分享 URL 不会带上当前项目，对方打开看到的是他自己上次选中的那个。链路细节见技术笔记 §3.4。

> **后端注意**：Prompt 里的 `{projectId}` 是 CLI 侧建立绑定关系的凭据来源。CLI 执行 `link` 时带上这个 id，服务端据此把本地目录与 Project 关联，并回传 `local_folder_path`（§6.2 接口 C / E）。该链路由 CLI 团队负责，本文只约定 Dashboard 侧必须把真实 `projectId` 拼进 Prompt。

### 4.7 动效与时长参数

**两种容器结局**（与探针码正交）：

| 结局 | 使用场景 | 时长与销毁规则 |
| - | - | - |
| CTA | 首次进入**弹窗**（§4.1） | **观赏 8s** 展示成功文案 / 礼花；点 CTA 或满 8s 后进入 **3s 销毁延迟**（等 Socket 闭环或过渡），再飞轨离开。仅 `SUCCESS_BONUS_GRANTED` 喷彩花 |
| Banner | 左侧**引导页**（§4.2） | 原位 Card 停留 **3s** 后平滑路由至 `/dashboard` 并销毁 Tab。仅 `SUCCESS_*`；`FAILED` 不销毁 |

**两个时长解耦，不要求一致。** 8s 只负责「让用户看完」；3s 只负责「点完 / 看完之后不要瞬间卸掉」。

**场景 A：弹窗飞轨收起。** 触发：探针 `SUCCESS_*` 后用户点主 CTA，或满 8s 观赏结束。两者都先走完 **3s 销毁延迟**，再进入下表（表内 0ms = 延迟结束的那一瞬）。

| 阶段 | 时刻 | 行为 |
| - | - | - |
| 销毁延迟 | CTA 点击或满 8s 之后的 0 → 3000ms | 成功态继续留在屏幕上。Socket 若还在飞，用这段时间等 `connection:verify_result` 闭环（技术笔记 §3.6）。**禁止**在 3s 内卸弹窗 |
| 写入完成态并跳转 | **延迟结束的 0ms（最先发生）** | 写 `onboarding_status: completed`，由落地重定向 `replace` 跳 `/dashboard`，侧边栏选中项切到 Dashboard。弹窗与引导页随即卸载 |
| 幕布淡出 | 0 → 300ms | 遮罩 opacity → 0、模糊归零，露出**已经是 Dashboard 的**页面 |
| 卡片飞轨 | 0 → 700ms | 抛物线飞向 Header 右上角 CONNECT 按钮，`scale: 1 → 0.55 → 0.1`，opacity 末段归零 |
| 按钮接应 | 700ms | 卡片落点。Header 按钮触发脉冲（450ms），圆点切绿，文案切 `CONNECTED` |

**场景 B：引导页原位收尾（无飞轨）。** 礼花 8000ms（4 波 × 108 粒，仅 `SUCCESS_BONUS_GRANTED`），胜利 Card 停留 3000ms 后路由至 `/dashboard` 并销毁 Tab。

**产品可感知的时长参数：**

| 参数 | 值 |
| - | - |
| 弹窗成功态观赏时长 / 礼花总时长 | 8000ms |
| 弹窗 CTA 后 / 观赏结束后的销毁延迟 | 3000ms |
| 引导页胜利 Card 停留 / Tab 销毁延迟 | 3000ms |
| 飞轨时长 | 700ms |
| 幕布淡出 | 300ms |
| 按钮接应脉冲 | 450ms |
| 复制反馈停留 | 2000ms |
| 校验 `checking` 等待上限 | 10000ms |
| 校验 `checking` 等待上限 | 10000ms |

> 这两个场景有八条实现约束（DOM 克隆脱离组件树、Tailwind v4 的 `translate` 陷阱、飞行看门狗、路由单驱动方等），每一条都对应一次实际踩坑，全部记在技术笔记 §3.1。**研发实现飞轨前请务必先读那一节。**

**边界：用户在弹窗里走完整条流程（身后引导页从未推进）。** 点 CTA 或满 8s 后先留 3s，再关闭 Modal；飞轨散开时背后已是 Dashboard，全程不得再出现引导页或侧边栏入口。

---

## 5 业务规则

### 5.1 连接判定

> **这是全文关于「什么算已连接」的唯一定义。**

| 规则 | 内容 |
| - | - |
| 作用域 | **项目级**。当前选中项目 id 是否在 `connected_project_ids` 中 |
| 不得回退到账号级 | **严禁**用 `has_ever_connected` 兜底。已走完引导的账号切到未连接的项目，必须显示未连接 |
| 永久性 | 一次握手成功即恒为已连接，**不因 CLI 退出 / 关机 / 断网回退**。连接是「这个项目被 link 过」的事实，不是「此刻有进程活着」 |
| 不做心跳保活 | 不轮询、不倒计时、不展示任何秒数读数。全链路无轮询 |

消费方：Header 按钮黄 / 绿（§4.3）、CONNECT 弹窗是否显示 `CONNECTED` 标记、状态条左侧取目录名还是回退项目名（§4.4）。

**边界：**

| 场景 | 处理 |
| - | - |
| 账号下一个项目都没有 | `projectId` 为 `null`，按未连接渲染；Prompt 退化为只有项目名不带括号 id（§4.6） |
| 用户重新选择轨道 / 校验失败 / 删除项目 | **均不得**把 `has_ever_connected` 改回 `false`，亦不得绕过 `InstallBonusService` 再发一次 $5 |

### 5.2 $5 欢迎额度与探针生命周期矩阵

> **这是全文关于「发不发奖、喷不喷花、说哪句文案」的唯一定义。** 判定方是现网 `InstallBonusService`，前端传的任何东西都不可信。

**发奖粒度：账号首次连通一次。** 以 `has_ever_connected` 为闸门——该账号历史上第一次物理连通成功，才进入发奖判定；之后在任何组织 / 项目再连，只记账连接态，不再发奖。额度**统一入账该账号的默认组织钱包**，与本次连接发生在哪个组织无关。

第一次连通仍须过四条件，缺一不可（组织状态看**默认组织**）：

| # | 条件 | 判定 | 不满足时的探针码 |
| - | - | - | - |
| 1 | 邮箱状态 | `email_verified === true` 且**非 Disposable 一次性邮箱** | `SUCCESS_EMAIL_UNVERIFIED` |
| 2 | 当前组织成员角色 | 默认组织上 `selectedOrganization.role === 'owner'`（新注册创建者）。被邀请的 `admin` / `member` 等一律不算 | 被邀请用户不进入迎新 UI；接口仍返回连通，但无庆典 |
| 3 | 默认组织状态 | **默认组织** `is_funded === false` | `SUCCESS_NO_BONUS_ORG_FUNDED` |
| 4 | 风控规则 | 通过 `device_hash`、账号维度及 IP 日限额校验（§5.3） | `SUCCESS_NO_BONUS_DEVICE_LIMIT` |

| 项 | 规则 |
| - | - |
| 金额 | $5.00 USD 等值 token 额度 |
| 入账去向 | **账号默认组织的钱包**（`reward.credited_org_id` = 默认组织 id） |
| 触发时机 | 接口 C 返回 `probe_status: "SUCCESS_BONUS_GRANTED"` 的那一刻 |
| 幂等 / 防刷 | **必须**。服务端以账号为键落发放记录，并发重复调用只发一次 |
| 前端禁止自行放行 | 不得在本地用「组织首次」或自行翻转 `has_ever_connected` 发奖 |

**生命周期矩阵：**

物理连通与发奖资格相互独立。探针连通成功只表示握手完成；前端**禁止**自行合并为「发奖 / 不发奖」两态。

| 场景代码 | 物理连接 | 发奖 | 面向用户的文案 | 礼花 | Tab / Modal 销毁 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `FAILED` | ❌ 离线 | N/A | `⚠️ No active connection detected` + Troubleshooting 排查项 + `Retry` + Discord 求助入口 | 否 | **不销毁 Tab，不写 `modal_revealed`** |
| `SUCCESS_BONUS_GRANTED` | 🟢 连通 | 💥 已发奖 | `$5.00 welcome bonus credited` | **是** | Tab 3s 销毁；Modal 观赏 8s，点 CTA 或满 8s 后再留 3s 才销毁 |
| `SUCCESS_EMAIL_UNVERIFIED` | 🟢 连通 | ✉️ 邮箱未验 | 请验证邮箱以解锁 $5.00 额度 + `[ 重发验证邮件 ]` | 否 | 同上 |
| `SUCCESS_NO_BONUS_DEVICE_LIMIT` | 🟢 连通 | 🟢 设备已领 | **连接成功！设备已绑定。**（不解释原因） | 否 | 同上 |
| `SUCCESS_NO_BONUS_ORG_FUNDED` | 🟢 连通 | 🟢 组织已充 | **连接成功！设备已绑定。**（与上一行同一句，不解释原因） | 否 | 同上 |

**双语锁定文案**（研发不得改写成打击性表述）：

| 场景代码 | EN | ZH |
| - | - | - |
| `FAILED` | `⚠️ No active connection detected` + Troubleshooting | 未检测到有效连接 + 排查项 |
| `SUCCESS_BONUS_GRANTED` | `$5.00 welcome bonus credited` | `$5.00 欢迎额度已发放` |
| `SUCCESS_EMAIL_UNVERIFIED` | Verify your email to unlock the $5.00 credit + `[ Resend verification email ]` | 请验证邮箱以解锁 $5.00 额度 + `[ 重发验证邮件 ]` |
| `SUCCESS_NO_BONUS_DEVICE_LIMIT` | Connected! Device is bound. | 连接成功！设备已绑定。 |
| `SUCCESS_NO_BONUS_ORG_FUNDED` | Connected! Device is bound. | 连接成功！设备已绑定。 |

**边界：**

| 场景 | 处理 |
| - | - |
| 新注册用户在非默认组织的项目上完成连接 | 不弹迎新 Modal。若该账号从未连通且四条件全过，额度仍入**默认组织钱包**，无庆典 UI；该账号已连通过则只记连接态 |
| 已连过的账号在其他组织连接新项目 | Header 该项目转绿。**不再发奖**（账号闸门已关上） |
| 重新挂载一个已连过的老项目 | 同上，只记连接态 |
| 新注册用户已连通但邮箱未验或为 Disposable | `SUCCESS_EMAIL_UNVERIFIED`，不播礼花、不发奖（可行动文案，见上表） |
| 默认组织 `is_funded === true` | `SUCCESS_NO_BONUS_ORG_FUNDED`，不播礼花、不发奖；**用户只看到「连接成功！设备已绑定。」** |
| 校验失败 | `FAILED`。**不清空已选轨道和步骤**，不销毁 Tab，不写 `modal_revealed` |

### 5.3 设备 / 账号 / IP 风控（Anti-Sybil）

| 项 | 规则 |
| - | - |
| 上报方 | **CLI**。执行 `link` 时自动在 Request Header / Payload 带上本地设备的硬件特征 |
| 上报内容 | 硬件特征的 **Hash**，不是原始 MAC。原始硬件标识属于个人信息，不得明文落库 |
| 拦截逻辑 | 该 Hash 已在平台任意账号 / 组织下触发过 $5 发放，或账号维度 / IP 日限额命中 → `SUCCESS_NO_BONUS_DEVICE_LIMIT` |
| 拦截后表现 | **物理连通成功，不发奖、不喷花**，文案走正向（§5.2） |
| 缺失兜底 | CLI 版本过旧、容器 / 虚拟机等取不到硬件特征时 Hash 为空：**不拦截、记一条日志**，其余三条件仍由服务端判定。不得因为指纹缺失把用户挡在连通之外 |

**边界：**

| 场景 | 处理 |
| - | - |
| 同一台设备换个账号 / 组织再连一次 | `device_hash` 命中，`SUCCESS_NO_BONUS_DEVICE_LIMIT`，物理连通成功但不播礼花 |
| CLI 取不到硬件特征 | 指纹为空，**不因此拦截**，其余三条件仍由服务端判定并记录 |
| 账号维度或 IP 日限额命中 | 与设备指纹命中**共用同一探针码**，走同一套正向文案，**不另开打击性状态码** |

### 5.4 项目命名约束

CLI 挂载时按项目名解析目标项目，同名项目会造成歧义。

| 场景 | 规则 |
| - | - |
| 系统初始化创建的默认项目 | 固化命名为 `default` |
| 用户手动新建项目 | `Project Name` **必填**，不允许空白或纯空格 |
| 用户手动新建项目 | **禁用 `default` 作为项目名**（大小写不敏感），前端即时校验拦截并提示「该名称为系统保留」 |
| 同组织内重名 | 一并拦截，理由同上：CLI 按名解析时无法区分 |
| 用户删除已连接项目 | 后端**级联**从 `connected_project_ids` 去掉该 id。不得留下指向已删项目的连接记录 |
| 组织被删除后重建 | **不再发奖**。发奖闸门是账号级 `has_ever_connected`，组织重建不把它打回 `false` |

> 前端校验只是体验优化，**后端必须独立校验**——CLI 与 API 可以绕过界面直接创建项目。

### 5.5 文案撰写原则

- 全线 UI 文案**必须采用 Positive Framing（正向引导）**
- 物理连通成功但因风控 / 付费组织未发奖时，**只确认连通，不披露原因**。锁定句：「连接成功！设备已绑定。」（EN：`Connected! Device is bound.`）
- **严禁**出现「设备数超限 / IP 异常 / 本次不发放奖励」等负面或对抗性词汇；也严禁 `Denied`、`Ineligible`、`Error`、`拒绝`、`不合格`、`失败发奖`
- 例外：`SUCCESS_EMAIL_UNVERIFIED` 仍给可行动文案（重发验证邮件）。这是用户能处理的账号状态，不是风控规则泄漏
- 英文主文本 + 中文注解，中英文不串用

---

## 6 数据契约

### 6.1 前端状态模型

这是整个功能的**唯一状态源**，前端所有组件都从这个对象派生渲染。

```typescript
interface OnboardingSnapshot {
  onboarding_status: 'not_started' | 'in_progress' | 'completed';
  modal_revealed: boolean;          // 首次弹窗是否展示过
  track: 'none' | 'developer' | 'newbie';
  step: 0 | 1 | 2 | 3;              // 语义随 track 变化，见 §3.2
  selected_agent: string | null;    // newbie 轨选中的代理 id
  selected_starter: string | null;  // newbie 轨选中的模板 key
  verify_state: 'idle' | 'checking' | 'failed' | 'success';  // 前端瞬时态
  has_ever_connected: boolean;      // 账号级：是否曾成功连接过任意项目（单向）
  connected_project_ids: string[];  // 已连接的项目 id 列表
  user_rewarded_now: boolean;       // 本次校验是否触发 $5 发放
  probe_status: 'FAILED' | 'SUCCESS_BONUS_GRANTED' | 'SUCCESS_EMAIL_UNVERIFIED'
              | 'SUCCESS_NO_BONUS_DEVICE_LIMIT' | 'SUCCESS_NO_BONUS_ORG_FUNDED' | null;
  completed_offsite: boolean;       // 是否在站外完成连接后回站
}
```

**三层生命周期边界（本功能最容易实现错的地方）：**

| 层级 | 字段 | 语义 | 切换组织时 |
| - | - | - | - |
| **账号** | `has_ever_connected` | 是否连过任意项目。**单向，一旦为 true 永不回退** | 不变 |
| **账号** | `onboarding_status` / `modal_revealed` / `track` / `step` | 引导流程进度 | 不变 |
| **组织成员** | `selectedOrganization.role` / `is_default_org` / `is_funded` | 触达资格与发奖条件。来自现有组织 / 成员接口，**不是 onboarding state**，也**不是**登录账号上的 `user.role` | **随切换变化** |
| **项目** | `connected_project_ids` / `is_default_project` | 逐项目的连接关系 | 列表不变，派生值随选中项目变化 |

**字段来源：**

| 字段 | 归属 | 当前来源 | 目标来源 |
| - | - | - | - |
| `onboarding_status` / `modal_revealed` / `track` / `step` | 账号 | localStorage | 服务端（接口 A / B）。**跨设备以服务端为准**，后到的写入覆盖先到的 |
| `selected_agent` / `selected_starter` | 账号 | localStorage | 服务端（接口 A / B） |
| `has_ever_connected` | 账号 | localStorage | 服务端，单向标志 |
| `connected_project_ids` | 账号 | localStorage | 服务端（接口 A / C / E） |
| `completed_offsite` | 账号 | localStorage | 服务端（接口 A） |
| `user_rewarded_now` | 会话 | localStorage | 接口 C 的 `reward.granted` |
| `probe_status` | 会话 | 内存 | 接口 C。**纯前端瞬时态，不入库** |
| `verify_state` | 会话 | 内存 | **纯前端，不入库** |

> **`verify_state` 绝不可持久化。** 它描述的是「当前这一次点击校验按钮的进行程度」，刷新后没有任何探测在跑。若把 `checking` 恢复出来，界面会渲染转圈而不是「校验」按钮，而自动校验只从 `idle` 触发，该步骤将**永久死锁**。前端读取本地缓存时已强制把 `checking` 归一为 `idle`，后端同样不得存储此字段。

**派生状态**（前端计算，后端不需提供但需理解语义）：

| 派生值 | 计算规则 | 消费方 |
| - | - | - |
| `isIncomplete` | `onboarding_status !== 'completed'` | 落地重定向（还要叠加触达资格） |
| `canShowOnboardingModal` | §2.1 五条件 AND | 首次弹窗是否可弹。被邀请用户永远为 false |
| `canShowOnboardingTab` | §2.2 条件 AND | 侧边栏入口显隐。被邀请用户 / 非默认组织项目永远为 false |
| `isProjectConnected` | 见 §5.1 | Header 按钮、CONNECT 弹窗状态条 |
| `backgroundState` | 弹窗打开期间冻结的快照副本 | 保证弹窗内进度不漏到背后页面。**关闭弹窗时必须解冻并同步到最新进度**，否则引导页会显示关闭前的旧步骤。实现坑见技术笔记 §3.3 |

### 6.2 接口定义

> 当前**没有任何真实接口**。以下路径为建议命名，后端可按团队规范调整，但**字段名请保持不变**——前端状态模型直接按这套字段消费。

| # | 接口 | 方法 | 用途 | 调用时机 |
| - | - | - | - | - |
| A | `/v1/onboarding/state` | GET | 拉取账号引导状态 | Dashboard 首次挂载 |
| B | `/v1/onboarding/state` | PATCH | 增量保存引导进度 | 每次 track / step / 选择项变更 |
| C | `/v1/projects/{projectId}/connection/verify` | POST | 校验连接并调用 `InstallBonusService` 发奖 | 用户点 Verify |
| E | `/v1/onboarding/connections` | GET | 批量返回已连接项目及其本地目录 | 与 A 合并返回亦可 |
| F | `/organizations`、`/organizations/{id}/projects` | GET | 组织与项目列表 | **已存在，直接复用** |

> 曾经设计过的 `GET /v1/projects/{projectId}/connection`（5s 轮询心跳）**已整体废弃，不需要实现**。它存在的唯一目的是驱动秒数读数，而该读数已从产品中移除（§5.1）。

#### 接口 A：拉取引导状态

```
GET /v1/onboarding/state

Response 200:
{
  "onboarding_status": "in_progress",
  "modal_revealed": true,
  "track": "developer",
  "step": 2,
  "selected_agent": null,
  "selected_starter": null,
  "has_ever_connected": false,
  "connected_project_ids": ["3f2b...e91a"],
  "completed_offsite": false
}
```

- 账号维度，不带 project 参数。引导进度字段切换组织不重新请求
- **触达资格不在本接口**：默认组织 / 默认项目 / `role` / `email_verified` / `is_funded` 来自现有组织、成员、账号接口。前端用它们与本接口字段做 AND，决定弹不弹 Modal、显不显示 Tab
- `has_ever_connected` 是单向标志，只能 `false → true`。**服务端以它为 $5 账号闸门**（§5.2）；前端仍不得自行据此放行
- `verify_state` 不在响应中；`user_rewarded_now` / `probe_status` 由接口 C 返回
- 新账号从未写入过时返回全默认值：`onboarding_status='not_started'`、`modal_revealed=false`、`track='none'`、`step=0`，其余为 `null` / `false` / `[]`
- **`completed_offsite` 判定由后端负责**：`has_ever_connected = true` 但从未收到过 Dashboard 侧的 verify 请求，即判定为站外完成

#### 接口 B：保存引导进度

```
PATCH /v1/onboarding/state
Body: { "track": "developer", "step": 1, "onboarding_status": "in_progress" }

Response 200: 更新后的完整状态对象（同接口 A 结构）
```

- **增量语义**：只更新请求体中出现的字段，未出现的保持不变
- **允许进度回退**：用户在手风琴里点回已完成的步骤时会提交更小的 `step`，后端需照单全收，**不要做「进度只能前进」的保护**
- **关闭 Modal 不重置**：关闭弹窗时前端只提交 `{ "modal_revealed": true }` 这一个字段。后端不得因此清空 `track` / `step` / `selected_agent` / `selected_starter`
- 低频写，一次完整引导约 4~6 次，可直接落库

**触发点清单：**

| 前端动作 | 提交字段 |
| - | - |
| 首次弹窗被用户关闭（✕ / 遮罩 / Esc） | **仅** `modal_revealed: true`。展示瞬间不写；`FAILED` 探针也不得写 |
| 选择轨道 | `onboarding_status: 'in_progress'`、`track`、`step: 1` |
| newbie 选中代理 | `selected_agent` |
| newbie 点下一步 | `step: 2` |
| newbie 选中模板 | `selected_starter` |
| 点「已执行，下一步 →」 | `step: 2` 或 `3` |
| 手风琴回退到已完成步骤 | `step` |
| `SUCCESS_*` 收尾 | `modal_revealed: true`、`onboarding_status: 'completed'`。**不要**在此提交 `has_ever_connected`——该字段由接口 C 在物理连通成功时置位，前端不得自行翻转 |

**边界：**

| 场景 | 处理 |
| - | - |
| 同一账号多设备并发引导 | 以服务端状态为准，后到的写入覆盖先到的 |
| 保存失败 | **不阻断用户操作**，前端保留本地状态继续走流程并静默重试。进度丢失的代价远小于把用户卡住 |

#### 接口 C：校验连接（核心）

本接口在确认物理连通后，**必须同步调用现网 `InstallBonusService`**，把四条件校验结果折叠为 `probe_status` 返回前端。前端只消费 `probe_status`，不得自行拼装发奖资格（§5.2）。

```
POST /v1/projects/{projectId}/connection/verify

Response 200（SUCCESS_BONUS_GRANTED · 四条件全过，已发奖）:
{
  "connection_success": true,
  "probe_status": "SUCCESS_BONUS_GRANTED",
  "reward": {
    "granted": true,
    "amount_usd": "5.00",
    "currency": "USD",
    "credited_org_id": "a91c...44f0"
  },
  "local_folder_path": "/Users/dev/workspace/my-agent-app",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（SUCCESS_EMAIL_UNVERIFIED · 已连通，邮箱未验或 Disposable）:
{
  "connection_success": true,
  "probe_status": "SUCCESS_EMAIL_UNVERIFIED",
  "reward": { "granted": false },
  "local_folder_path": "/Users/dev/workspace/my-agent-app",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（SUCCESS_NO_BONUS_DEVICE_LIMIT · 已连通，设备 / 账号 / IP 风控命中）:
{
  "connection_success": true,
  "probe_status": "SUCCESS_NO_BONUS_DEVICE_LIMIT",
  "reward": { "granted": false },
  "local_folder_path": "/Users/dev/workspace/my-agent-app",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（SUCCESS_NO_BONUS_ORG_FUNDED · 已连通，组织已付费激活）:
{
  "connection_success": true,
  "probe_status": "SUCCESS_NO_BONUS_ORG_FUNDED",
  "reward": { "granted": false },
  "local_folder_path": "/Users/dev/workspace/my-agent-app",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（FAILED · 未检测到连接）:
{
  "connection_success": false,
  "probe_status": "FAILED",
  "reward": { "granted": false },
  "reason": "no_connection_detected"
}
```

| 字段 | 类型 | 说明 |
| - | - | - |
| `connection_success` | boolean | 物理连通与否，与发奖无关 |
| `probe_status` | enum | 五态之一，驱动 §5.2 矩阵的全部前端表现 |
| `reward.granted` | boolean | 本次是否实际发放。仅 `SUCCESS_BONUS_GRANTED` 为 `true` |
| `reward.credited_org_id` | string | 额度入账的组织 id，**固定为该账号的默认组织**，与本次连接发生在哪个组织无关 |
| `reward.amount_usd` | string | 发放金额，用字符串避免浮点误差 |
| `local_folder_path` | string | CLI `link` 时上报的本地工程绝对路径。**弹窗状态条只展示最后一段目录名**，全路径仅作 `title` 悬浮提示（§4.4） |
| `connected_project_ids` | string[] | 该账号全部已连接项目，前端整体覆盖本地列表 |
| `reason` | string | 仅内部日志与分析，**不直接展示给用户**（用户文案走 §5.2 矩阵） |

> **「没检测到连接」是业务上的正常结果，不是 HTTP 错误。** 请返回 200 + `probe_status: "FAILED"`，不要返回 4xx。只有真正的系统故障（鉴权失败、服务不可用）才返回非 2xx。
>
> 被邀请用户走 CONNECT 完成挂载时，本接口仍返回物理连通结果，但 Dashboard **不得**据此弹出迎新 Modal 或庆典（§2.3）。

**性能要求**：用户点了按钮后正盯着 Loader，本接口按**同步返回**实现，控制在 **2s 内**。检测本身若必然超过 2s，HTTP 立即返回 `{ "pending": true }`（**不要**把 `pending` 写成 `probe_status`），前端保持 `verify_state='checking'`，最终结果走现有 socket.io，payload **必须带与下方五态相同的 `probe_status`**。前端 `checking` 态两种都能接。**不要引入轮询兜底**。事件名、过滤规则与 UI 分发见技术笔记 §3.6。

**前端等待上限（2026-09-18 验收）**：`checking` **最长 10s**。10s 内未收到同步结果或 socket `connection:verify_result`，按 `FAILED` 渲染排查项 + Retry，**禁止空转约 60s**。10s 是 UI 超时，不是把接口 SLA 放宽到 10s；HTTP 仍按上面 2s / `pending` 处理。

**发奖入账**：额度由现网 `InstallBonusService` 写入**该账号默认组织钱包**。前端凭证就是响应里的 `reward` 对象（`granted` / `amount_usd` / `currency` / `credited_org_id`），本期不另开对账接口。Disposable 邮箱名单、IP 日限额阈值一律沿用该服务现网配置，前端不自行判断。

#### 接口 E：已连接项目列表

```
GET /v1/onboarding/connections

Response 200:
{
  "connections": [
    { "project_id": "3f2b...e91a", "local_folder_path": "/Users/dev/workspace/my-agent-app" },
    { "project_id": "77c1...0b42", "local_folder_path": null }
  ]
}
```

用于判断 Header 按钮在任意项目下的状态，以及 CONNECT 弹窗状态条展示哪个目录名。若接口 A 已带同等信息，本接口可省略。

- **一次性读取，不轮询**：连接是既成事实，打开弹窗时读一次即可
- `local_folder_path` 允许为 `null`（老连接没留存路径、或站外连接未上报），前端按「回退展示云端项目名」处理，**不得因此把项目判为未连接**
- **新连接必须落库**：CLI `link` 时上报绝对路径，服务端写入并随 C / E 返回。本期若 CLI 还没有该字段，由 CLI 补上报，Dashboard 不另开通道

#### 错误处理约定

| 场景 | HTTP | 前端表现 |
| - | - | - |
| 未检测到连接 | 200 + `probe_status: "FAILED"` | 走 §5.2 的 `FAILED` 行 |
| 未登录 / token 失效 | 401 | 走全局登录兜底 |
| 项目不存在或无权限 | 403 / 404 | 提示「项目不可用」，引导切换项目 |
| 服务异常 | 5xx | 沿用《登录错误兜底规范》：不透传原始错误，统一「服务暂时异常，请稍后重试」 |

### 6.3 字段映射总表（前端 ← 接口）

| 前端字段 | 来源接口 | 接口字段 | 消费位置 |
| - | - | - | - |
| `onboarding_status` | A / B | 同名 | 侧边栏显隐、落地重定向 |
| `modal_revealed` | A / B | 同名 | 首次弹窗是否自动弹 |
| `track` / `step` | A / B | 同名 | 清单展开项、计步器 |
| `selected_agent` / `selected_starter` | A / B | 同名 | newbie 轨选中态 |
| `has_ever_connected` | A / C | 同名（A）；物理连通成功时置位（C） | 账号级连通记忆，兼作 $5 闸门（§5.2）。**不参与连接态判定** |
| `connected_project_ids` | A / C / E | 同名 | `isProjectConnected` 判定（§5.1） |
| `local_folder_path` | C / E | 同名 | CONNECT 弹窗状态条左侧目录名（§4.4） |
| `user_rewarded_now` | C | `reward.granted` | 礼花开关 |
| `probe_status` | C | 同名 | §5.2 矩阵：文案、CTA、Tab / Modal 销毁 |
| `completed_offsite` | A | 同名 | 站外完成的静默处理 |
| `projectName` / `projectId` | F | `name` / `id` | Prompt 模板变量（§4.6）；本地目录缺失时状态条的回退展示 |
| `verify_state` | — | — | **纯前端瞬时态，无接口** |

---

## 7 埋点

现有 `SocketContext` 已在 MCP 连接成功时上报 PostHog `ONBOARDING_COMPLETED`。本期补充：

| 事件 | 触发点 | 附带属性 |
| - | - | - |
| `onboarding_modal_shown` | 首次弹窗展示 | — |
| `onboarding_track_selected` | 选择轨道 | `track` |
| `onboarding_prompt_copied` | 复制 Prompt | `track` / `starter` |
| `onboarding_verify_attempted` | 点击校验 | — |
| `onboarding_verify_result` | 校验返回 | `connection_success` / `probe_status` / `reward.granted` |
| `onboarding_abandoned` | 关闭首次弹窗且未完成 | `step` |

> **数据埋点命名约束**：
> 所有 PostHog 埋点事件（如 `onboarding_modal_shown`）及属性字段必须统一采用 **snake_case（小写下划线）**，必须在研发提测阶段与 Data Team 完成元数据（Metadata）校验与录入。

---

## 8 验收标准

编号规则：**A = 触达（§2）、B = 功能规格（§4）、C = 业务规则（§5）、D = 数据契约（§6）**。「对应章节」列提供反向索引。

### A · 触达范围

| # | 验收项 | 对应章节 | 检查方式 |
| - | - | - | - |
| A1 | **仅**新注册用户在默认组织 + 默认项目 + 未连接时自动弹出引导弹窗 | §2.1 | 新账号清状态后进 `/dashboard`；切到非默认项目不得弹 |
| A2 | 被邀请用户进入 Dashboard：**零** Modal、**零** Tab、**零**礼花 / 额度提示；Header `CONNECT` 可用 | §2.3 | 用被邀请的 `admin` 或 `member` 登录观察 |
| A3 | 新注册用户切到非默认组织 / 非默认项目：不弹 Modal、不展示 Tab，Header 按项目连接态显示 | §2.3 | 切组织 / 切项目观察 |
| A4 | 未完成连接时切换 / 新建组织，不再自动弹出 Modal | §2.3 | 弹过一次或切走后观察 |
| A5 | 默认项目 `SUCCESS_*` 后，切到其他组织侧边栏也无 Onboarding 入口 | §2.2 | 连接成功后切 Org B 看侧边栏 |
| A6 | 引导完成后侧边栏入口消失，手敲 URL 重定向回 `/dashboard` | §3.4 R2 | 视觉 + URL 检查 |
| A7 | 登录 / 注册成功后落地为 `/dashboard`（命中 §2.1 则走 R1），**不得**出现 `/dashboard/install`。额度未领完也不例外 | §3.4 | 用未领欢迎额度的新注册用户登录，断言首屏 URL |
| A8 | 侧边栏**无** Install 入口；手敲 `/dashboard/install` 不得成为连接主路径 | §3.4 | 视觉检查侧边栏；CONNECT 点击仍开 §4.4 弹窗 |

### B · 功能规格

| # | 验收项 | 对应章节 | 检查方式 |
| - | - | - | - |
| B1 | 弹窗标题随进度变化，五种取值与规格一致 | §4.1 | 逐步骤比对 |
| B2 | developer 轨 2 步、newbie 轨 3 步均可在弹窗内走通，计步器正确 | §4.1 §3.3 | 交互检查 |
| B3 | 新注册用户首次弹出并关闭后，切到 Org B 不再弹；`FAILED` 不写 `modal_revealed` | §4.1 | mock `FAILED` 后刷新，弹窗应仍可弹 |
| B4 | 走到第 2 步后关闭 Modal，切回引导页仍停在第 2 步，已选代理 / 模板保持选中 | §4.1 | 交互检查 |
| B5 | 引导页标题区无任何连接态文案 | §4.2 | 视觉检查 |
| B6 | 手风琴同一时刻只展开当前步骤；三态视觉与 demo 一致 | §4.2 | 切换步骤观察 |
| B7 | 点击 upcoming 项无响应，无法跳到未完成步骤 | §4.2 | 交互检查 |
| B8 | `SUCCESS_*` 后 Tab 停留 3s 销毁；`FAILED` 时 Tab 继续在 | §4.2 §4.7 | 分别 mock 成功 / 失败观察左侧 Tab |
| B9 | 关闭 Modal 后停留当前页，可自由切到任意 Tab；再次访问 `/dashboard` 不被拉回 | §3.4 | 交互检查 |
| B10 | Modal 在 `SUCCESS_*` 后观赏 8s；点 CTA 或满 8s 后再留 3s 才关闭 | §4.7 | 录屏比对 |
| B11 | 引导页结局 3s 后自动离开 | §4.7 | 录屏 + 监听 history 调用次数 |
| B12 | 切到未连接项目，Header 按钮 1 帧内变黄 | §4.3 | 切项目观察 |
| B13 | 未连接 / 已连接点击都打开同一个 CONNECT 弹窗（§4.4），不跳 `/dashboard/install`；已连接时状态条右侧多出 `CONNECTED` | §4.3 §4.4 | 含 D_TEST / 安装页路径各点一次 |
| B14 | 项目列表为空时 Header 为黄色，不显示 `CONNECTED` | §4.3 | 清空项目列表观察 |
| B15 | CONNECT 弹窗标题与副标题文案与规格一致 | §4.4 | 文案断言 |
| B16 | 弹窗内无任何心跳 / 秒数文案，打开 30s 无新增网络请求 | §4.4 §5.1 | 断言不含 `HEARTBEAT` / `ACTIVE`；Network 面板观察 30s |
| B17 | 已连接时状态条左侧为本地目录名、右侧为 `CONNECTED`；未连接时左侧回退为云端项目名、右侧为空 | §4.4 | 切连接态对比 |
| B18 | Prompt 为完整五行且项目名与 id 与 Header 选中项目一致，切项目实时更新；任意场景下不出现通用占位名 | §4.6 | 切项目后比对代码框，读全文断言 |
| B19 | 复制内容与代码框完全一致；文档链接可达 | §4.4 | 粘贴比对 |
| B20 | Newbie 轨 Step 1 不选任何代理也能推进到 Step 2 | §3.3 | 交互检查 |
| B21 | 弹窗结局顺序：点 CTA 或满 8s 后先留 3s，再跳 `/dashboard` 且侧边栏选中 Dashboard、弹窗已卸载；卡片继续飞满 700ms 不被中断；落点时 Header 才转 `CONNECTED` | §4.7 | 采样 path / 侧边栏选中项 / 克隆卡片 `scale` / header 文案 |
| B22 | 飞行路径起点与弹窗中心重合、终点落在 Header 按钮中心，结束后无残留节点 | §4.7 | 逐帧采样克隆卡片中心坐标 |
| B23 | 弹窗退出全程只有一层礼花，页面侧不得补播第二次；未发奖态礼花层数为 0 | §4.7 §5.2 | 采样礼花层数量，全程 ≤ 1 |
| B24 | 路由变化不得重挂载布局：跨页面导航前后 `header` / `aside` 为同一 DOM 节点 | 技术笔记 §3.2 | 导航前后比较节点引用 |

### C · 业务规则

| # | 验收项 | 对应章节 | 检查方式 |
| - | - | - | - |
| C1 | 切换到未连接的项目**或组织**，Header 退回黄色呼吸灯；已走完引导也不例外 | §5.1 | 切项目 / 切组织观察按钮 |
| C2 | CLI 进程退出 / 断网后连接态不变，仍显示已连接 | §5.1 | 关闭 CLI 后刷新页面观察 |
| C3 | 账号首次连通且四条件全过才发放 $5 并喷彩花；额度入默认组织钱包；同一账号再连不重复发放 | §5.2 | mock `SUCCESS_BONUS_GRANTED` 后换组织再 verify，查发放记录仍为 1 条 |
| C4 | `FAILED` 返回 200 且前端渲染排查项 + Retry；**不销毁 Tab、不写 `modal_revealed`**。`checking` 满 10s 无结果时同样走本态，不得空转约 60s | §5.2 §6.2 | mock `probe_status: "FAILED"`；另测 10s 超时 |
| C5 | 邮箱未验证或 Disposable：连通成功，文案为「请验证邮箱以解锁 $5.00 额度」且出现 `[ 重发验证邮件 ]`，不喷花 | §5.2 | mock `SUCCESS_EMAIL_UNVERIFIED` |
| C6 | 默认组织 `is_funded === true`：连通成功不发奖，文案仅为「连接成功！设备已绑定。」，不喷花、不提付费 / 额度 | §5.2 | mock `SUCCESS_NO_BONUS_ORG_FUNDED` |
| C7 | 设备 / 账号 / IP 风控命中：连通成功，文案仅为「连接成功！设备已绑定。」，不喷花、不提风控原因 | §5.2 §5.3 | mock `SUCCESS_NO_BONUS_DEVICE_LIMIT` |
| C8 | 被邀请用户通过 CONNECT 挂载成功：Header 转 `CONNECTED`，无任何迎新 UI | §2.3 §5.2 | 用 `admin` 或 `member` 走 CONNECT 流程 |
| C9 | 未发奖文案不得出现 `Denied` / `Ineligible` / `Error` / 「拒绝」「不合格」 | §5.5 | 对三态成功文案做字符串断言 |
| C10 | 新建项目名为空或为 `default` 时无法提交并给出提示 | §5.4 | 组织切换器里输入 `default` |

### D · 数据契约

| # | 验收项 | 对应章节 | 检查方式 |
| - | - | - | - |
| D1 | 刷新页面后引导进度从服务端恢复，不再依赖 localStorage | §6.1 §6.2 A | 清 localStorage 后刷新，进度仍在 |
| D2 | 校验进行中刷新页面，界面回到「校验」按钮而非转圈 | §6.1 | `checking` 态下刷新 |
| D3 | 手风琴回退提交更小的 `step`，后端照单全收 | §6.2 B | 回退后刷新，`step` 应为回退值 |
| D4 | 关闭 Modal 只提交 `modal_revealed`，进度字段不被清空 | §6.2 B | 抓包检查请求体 |
| D5 | Demo 面板与 `force_*` 开关已全部移除 | 技术笔记 §2 | 代码审查（上线时） |

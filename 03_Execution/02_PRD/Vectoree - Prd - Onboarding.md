---
title: "Vectoree - 需求文档 - Onboarding 连接全链路"
description: "基于已交付 demo 的 onboarding 与编程代理连接需求文档：双轨引导流程、首次弹窗、Header 连接态、校验与 $5 奖励规则、完整后端接口契约与字段映射，供研发直接照此实现数据接口"
author: "PM"
created: "2026-09-10"
updated: "2026-09-11"
status: "REVIEW"
version: "1.5"
tags: ["prd", "onboarding", "connect", "activation", "api_contract"]
owners: ["PM"]
---

# Vectoree - 需求文档 - Onboarding 连接全链路

> 用途：方案对齐后，落定"要做什么、做成什么样算完"，供研发按条实现与验收。
> 写法：本需求的 UI / 交互 / 动效已由 demo 承载并验收完毕，故本文不重复描述长相，重点落在**规则、边界、异常与接口契约**上；细节直接跑 demo 看。
> 目标：研发拿到本文即可开工，**不需要打开页面**——第「关键设计」章的数据结构与接口定义、附录 A 的字段映射、附录 B 的替换点清单三者合起来是完整的后端开发依据。

---

## 文档更新记录

| 版本 | 日期 | 更新人 | 变更摘要 |
| - | - | - | - |
| v1.0 | 2026-09-10 | PM | 初稿：基于 pm-demo-v1 分支已交付 demo 逆向产出，含双轨流程、首次弹窗、Header 连接态、6 个接口契约与字段映射 |
| v1.1 | 2026-09-11 | PM | 四处规则调整：① 取消未完成用户的强制重定向，改为默认落点 + 不阻断浏览；② 关闭 Modal 由「整体重置进度」改为「保留进度、仅记录已展示」；③ 明确 Newbie 轨 Step 1 不做本地 Agent 物理检测；④ 侧边栏 Onboarding 入口由 overview 分组首位移至底部区域。demo 代码已同步 |
| v1.2 | 2026-09-11 | PM | 明确账号-组织-项目三层生命周期边界：① 新增账号级 `has_ever_connected` 字段，取代 `connection_success` 作为奖励与侧边栏入口的唯一依据；② **修正 v1.0 的奖励范围规则**——改为「在任意组织的任意项目首次连接均可得奖，奖励统一入账默认组织钱包」；③ 明确 Modal 每账号仅自动弹一次（靠 `modal_revealed` 的账号级作用域保证），切换/新建组织不再弹；④ 侧边栏 Tab 由 onboarding 进度绑定改为账号级 `has_ever_connected` 绑定，跨组织继承；⑤ 非首次连接不播礼花、不展示额度提示，仅轻量绿色成功态。demo 代码已同步 |
| v1.3 | 2026-09-11 | PM | 按拍板结论封版：① 奖励范围确认按 v1.2 执行（任意组织首连即发，统一入账默认组织钱包，校验条件 `Account.has_ever_connected === false`）；② 成功态时长**拆为双参数**——`CONFETTI_CELEBRATION_DURATION = 8000`（Modal 礼花，不自动跳转，等用户点击）与 `ONBOARDING_TAB_DESTROY_DELAY = 3000`（页面胜利 Card 停留后销毁 Tab），附录 C3 待决项关闭；③ 修复路由竞态：`completeOnboarding` 与 `navigate` 双重驱动同一次跳转，现改为页面侧只标记完成、路由由落地重定向单点处理，并对停留定时器加单次闩锁；④ 确认 `modal_revealed` 维持「关闭/收起/完成时写入」，不因重定向或组件重挂载被秒关。demo 代码已同步 |
| v1.4 | 2026-09-11 | PM | 多成员、防刷与命名补充：① **奖励口径第三次修订**——由「每账号一次、入账默认组织」改为「**每组织一次、入账该组织钱包**」，新增 `is_org_first_connection`，团队第二位成员仅连通不发奖；② 新增**设备级防刷**：CLI link 时上报硬件特征 Hash，已在别处领过奖则 `reward_eligible: false`，仅连通不发奖；③ 明确侧边栏 Tab 与全局连接态的**强联动**约束，禁止出现关闭 Modal 后 Tab 残余；④ 新增**项目命名约束**：默认项目固化为 `default`，用户新建项目名必填且禁用 `default`。demo 代码已同步 |
| v1.5 | 2026-09-11 | PM | Header 连接态口径收紧：① `isProjectConnected` **严格按项目判定，取消对账号级 `has_ever_connected` 的兜底回退**——已走完引导的账号切到未连接的组织/项目时，Header 必须恢复黄色呼吸灯 `CONNECT`，而侧边栏入口仍不回来（新增边界 #25）；② 团队成员二次连接在界面上与「设备指纹已领奖」走同一套非首次分支，无独立 UI 状态，demo 面板据此撤销该独立场景，验收改为 mock 接口 C 返回 `is_org_first_connection: false`；③ 清理 v1.2 遗留的「入账默认组织钱包」表述，统一为 v1.4 的组织钱包口径。demo 代码已同步 |

## 发布计划

- **计划发布时间**：待研发确认排期后填入
- **发布倒计时**：—

## 背景描述

Vectoree 的价值只有在用户**把本地工程接上 Vectoree 后端**之后才成立。当前新用户注册后进入 Dashboard，面对的是一个空壳：没有明确的下一步，没有连接状态反馈，没有激励。本需求要解决的是**激活（Activation）**问题。

产品策略上有三条核心判断，是后续所有交互设计的依据：

1. **不教用户敲命令，让编程代理替用户干活。** 所有连接动作封装成一段可复制的自然语言 Prompt，用户粘贴到 Cursor / Claude Code / Codex，由代理完成 `login → link → ai status`。用户全程不需要理解 CLI。这是本次相较上一版需求（直接给 `npx @vectoree/cli login` 命令行）最大的方向调整。
2. **双轨分流。** 已有工程的开发者和完全没有工程的新手路径不同，第一步就让用户自选，避免一条流程同时服务两类人。
3. **连接状态是项目的属性，不是账号的属性。** 一个账号可以有多个组织、多个项目，用户切到没连过的项目时 Header 必须显示未连接。

**衡量指标**：注册 → 首次连接成功的转化率与中位时长；校验失败后 24h 内重试率；$5 欢迎额度领取率。

## 相关文档

- [方案文档：Onboarding Dashboard 页面结构设计](../03_Solutions/Solution_Onboarding_Dashboard_Page.md)
- [Onboarding Template 功能产品方案](../03_Solutions/Onboarding_Template_Solution.md)
- [前置需求文档：Onboarding Dashboard 页面](./Vectoree%20-%20需求文档%20-%20Onboarding%20Dashboard%20页面.md)（v1.0，本文为其方向调整后的替代版本，详见「产品现状」）
- [2026-08-27 Onboarding 体验优化对齐会议](../05_Meetings/2026_08/20260827_Onboarding_Optimization_Meeting.md)
- [2026-09-04 周会](../05_Meetings/2026_09/20260904_Weekly_Meeting.md)
- 交付约束：`vectoree` 仓库 `design/DEMO_DELIVERY_CONSTRAINTS.md`

## 产品现状

### 与上一版需求的差异

上一版《Onboarding Dashboard 页面》定义的是**四步横向向导 + CLI 命令行**方案。demo 迭代过程中方向发生了实质调整，本文覆盖以下变化：

| 维度 | 上一版 | 本版 |
| - | - | - |
| 连接方式 | 展示 `npx @vectoree/cli login` / `link` 命令让用户执行 | 展示自然语言 Prompt，由编程代理代为执行 |
| 步骤结构 | 固定 4 步（选 agent → 连项目 → 验证 → 奖励） | 双轨：developer 2 步 / newbie 3 步 |
| 入口 | Dashboard 首页内嵌区域 + `/dashboard/install` | 首次进入弹窗 + 左侧常驻 Onboarding 页 + Header 右上角连接按钮 |
| 连接状态 | 账号级 | **项目级**，随 Header 选中项目切换 |
| 状态持久化 | localStorage，不做服务端 | **服务端存储**，跨设备同步 |
| 验证方式 | 前端每 3s 轮询 cli-activity，最多 60s | 后端一次性判定并返回，前端只管 UI 态 |
| 奖励条件 | 新用户（注册 7 天内且未加入组织） | **默认组织的默认项目**首次连接 |

### 当前实现状态

功能已在 `vectoree@pm-demo-v1` 分支完成 demo，UI / 交互 / 动效 / 空态 / 加载态 / 失败态 / 成功态全部实现并验收。**所有数据为前端 mock**：

- 状态用 `localStorage`（key `vectoree_onboarding_demo_v2`）持久化
- 校验用 `setTimeout(1500)` 模拟
- 心跳用 `Date.now()` 自刷
- 经全仓库确认，onboarding / connect / verify / heartbeat / reward 相关**没有任何真实接口调用**

## 需求说明

| 模块 | 变更点 |
| - | - |
| 首次进入弹窗 | 新用户首次进 Dashboard 自动弹出引导弹窗，内嵌完整向导；**关闭保留进度**，仅额外记录"已展示过"，关闭后停留当前页不阻断浏览 |
| 左侧 Onboarding 页 | 新增 `/dashboard/onboarding` 常驻页，入口置于**侧边栏底部**，手风琴式清单，可随时回来继续并**自动定位到上次停留的步骤**；引导完成后菜单项自动销毁 |
| 双轨引导流程 | 第一步分流：developer（已有工程，2 步）/ newbie（从模板开始，3 步） |
| Prompt 生成 | 按轨道与选中模板拼接自然语言 Prompt，自动带入当前 project 名称与 id，随 Header 切换项目实时更新 |
| Header 连接状态按钮 | 右上角常驻按钮：未连接为黄色呼吸灯 + `CONNECT`，已连接为绿色实心 + `CONNECTED`；状态**绑定当前选中项目** |
| CONNECT 弹窗 | 点击 Header 按钮展开，含项目状态条（含心跳读数）+ Prompt 代码框 + 复制按钮 + 文档入口 |
| 连接校验 | 用户主动点击校验，后端判定并返回是否连接成功、是否首次连接 |
| $5 欢迎额度 | **每组织一次**：该组织生命周期内首次成功连接时发放至该组织钱包。团队后续成员仅连通不发奖；跨账号刷奖由 CLI 上报的**设备指纹**拦截 |
| 多组织继承 | Modal 每账号只自动弹一次，切换/新建组织不再弹；侧边栏 Onboarding 入口按账号级 `has_ever_connected` 跨组织持续展示，首次连接成功后在所有组织同时销毁 |
| 心跳保活 | 已连接项目每 5s 拉取一次心跳时间，UI 显示 `ACTIVE · HEARTBEAT {n}s ago` |
| 成功动效 | 弹窗内走飞轨收起，Onboarding 页内走原位胜利横幅 + 自动跳转 |
| 说明文档页 | 新增 `/dashboard/onboarding/docs` 静态页，承载连接说明与排查指引 |

## 流程及逻辑

### 主流程

```
用户注册 → 进入 /dashboard
    ↓
判断 onboarding_status
    ├─ completed → 停留 /dashboard，Header 按钮按项目连接态渲染
    └─ 未完成 → 侧边栏常驻 Onboarding 入口 + Header 黄色呼吸灯提示
                 ├─ modal_revealed = false（从未展示过）
                 │     → 默认落在 Onboarding 页并弹出首次引导弹窗
                 └─ modal_revealed = true
                       → 停留当前页，不跳转、不弹窗，用户可自由浏览
                 ↓
            （以下为用户在弹窗内或引导页内推进时的流程）
                 ↓
            步骤 0：选择轨道
                 ├─ developer → 步骤 1 复制 Prompt → 步骤 2 校验
                 └─ newbie    → 步骤 1 选代理 → 步骤 2 选模板复制 Prompt → 步骤 3 校验
                 ↓
            校验（POST verify）
                 ├─ 失败 → 排查建议 + 重试（保留轨道与步骤）
                 └─ 成功 → 判断是否首次连接
                              ├─ 是 → 发放 $5 + 礼花 + $5 文案
                              └─ 否 → 礼花 + 普通成功文案
                 ↓
            收尾（两种结局，见「功能点说明」）
                 ↓
            onboarding_status = completed
                 ↓
            侧边栏 Onboarding 菜单项销毁，跳转 /dashboard
```

### 状态机

**主状态：**

```
not_started ──选择 track──▶ in_progress ──校验成功且完成收尾──▶ completed

关闭 Modal 不改变主状态，仅写 modal_revealed: true；
track / step / selected_agent / selected_starter 原样保留。
```

**校验子状态（纯前端 UI 态）：**

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

### 路由与入口规则

| 路径 | 页面 | 条件 |
| - | - | - |
| `/dashboard/onboarding` | Onboarding 引导页 | 需登录，无 feature flag |
| `/dashboard/onboarding/docs` | 说明文档页 | 需登录，无 feature flag |
| `/dashboard/install` | D_TEST 安装页 | 仅 `DASHBOARD_V4_EXPERIMENT = D_TEST` 命中，否则重定向 `/dashboard` |

**落地与导航规则**（`AppLayout.tsx` 的 `OnboardingLandingRedirect`）：

| 规则 | 条件 | 行为 |
| - | - | - |
| R1 | 引导未完成 且 `modal_revealed === false`（即从未展示过引导）且 路径为 `/dashboard` | **默认选中侧边栏 Onboarding 菜单项并展示引导页**。这是一次性的默认落点，不是锁定 |
| R2 | 引导已完成 且 路径为 `/dashboard/onboarding` | `replace` 跳 `/dashboard` |

> **R1 是本版的重点调整：取消强制重定向。** 旧版对所有未完成用户在每次访问 `/dashboard` 时都执行 `replace` 跳转，等于把用户锁死在引导页。新规则只在「从未展示过引导」时把默认落点放到 Onboarding 页，一旦用户关闭 Modal 或主动切走，**不再有任何重定向**。

**不阻断浏览原则**（强约束，验收重点）：

- 用户关闭 Modal 后**停留在当前页面**，不跳转、不刷新、不回弹
- 用户可自由切换到 Dashboard、模型广场、Tool Hub 等**任意 Tab**，引导未完成不构成任何功能阻断
- 用户再次访问 `/dashboard` **不会**被拉回引导页
- 引导的存续感由「侧边栏常驻的 Onboarding 入口」+「Header 黄色呼吸灯 CONNECT 按钮」两个非侵入式提示承载，不靠路由强制

**侧边栏入口**：显示条件为 `处于项目空间（非组织空间） && account.has_ever_connected === false`，位于**侧边栏底部区域首位**（左下角，与 Settings 等底部项同组，排在它们之前），图标 `Rocket`。放底部而非顶部的理由：引导是「需要时回来找」的入口，不该每次访问都挡在 Dashboard 前面被划过。

> **显隐绑定的是全局连接态 `has_ever_connected`（即变更指令中的 `is_connected`），不是引导进度、更不是组织维度。** 两条直接后果：
>
> 1. **跨组织继承**：只要账号全平台从未连过任何项目，无论用户切到默认组织还是 Org B / Org C，该入口都**持续展示**。
> 2. **一次性全局销毁**：账号在**任意组织的任意项目**完成全平台首次连接后，`has_ever_connected` 转 `true`，该入口在**所有组织内同时**从 DOM 移除，不再出现。销毁是渲染条件的自然结果，无需额外清理逻辑。
>
> 销毁**不是立即发生**的：页面内连接成功后，胜利 Card 先原位停留 `ONBOARDING_TAB_DESTROY_DELAY`（3 秒），再平滑路由至 `/dashboard` 并销毁 Tab，给用户一个视觉确认的缓冲（见附录 C3）。
>
> 销毁前，用户可随时点此入口回到引导页，**并自动定位到上次停留的步骤**（见「异常与边界」第 4 条）。

> **⚠️ 状态联动的实现约束（易踩坑）：** 侧边栏入口必须读**实时**全局连接态。弹窗打开期间，页面底层读的是一份被冻结的背景快照（用于避免弹窗内的进度泄漏到底层清单）；如果侧边栏误接这份快照，就会出现**探针校验已成功、礼花已触发，但左侧 Tab 要等用户手动关闭 Modal 才消失**的残余现象。正确行为是：校验成功的瞬间全局连接态即置 `true`，侧边栏入口同帧销毁，与 Modal 开关状态无关。

### 项目命名约束

CLI 挂载时按项目名解析目标项目，同名项目会造成歧义，因此命名需要约束。

| 场景 | 规则 |
| - | - |
| 系统初始化创建的默认项目 | 固化命名为 `default` |
| 用户手动新建项目 | `Project Name` **必填**，不允许空白或纯空格 |
| 用户手动新建项目 | **禁用 `default` 作为项目名**（大小写不敏感），前端即时校验拦截并提示 |
| 同组织内重名 | 一并拦截，理由同上：CLI 按名解析时无法区分 |

> 前端校验只是体验优化，**后端必须独立校验**——CLI 与 API 可以绕过界面直接创建项目。

**云托管宿主桥接**：`hostMode === 'cloud-hosting'` 时监听来自 `window.parent` / `window.opener` 的 `SHOW_ONBOARDING_OVERLAY` 与 `SHOW_CONNECT_OVERLAY` 消息，D_TEST 变体跳 `/dashboard/install`，否则打开 CONNECT 弹窗。本次不改动。

### 异常与边界

| # | 场景 | 处理 |
| - | - | - |
| 1 | 用户切到未连接项目 | Header 退回黄色 `CONNECT`，弹窗不显示心跳条。**这是预期行为，不是 bug** |
| 2 | 账号下一个项目都没有 | `projectId` 为 `null`，Prompt 退化为只有项目名不带括号 id；Header 连接态按未连接渲染（黄色呼吸灯），**不回退读账号级 `has_ever_connected`** |
| 3 | 站外先连上再回站 | 接口返回 `has_ever_connected: true` + `completed_offsite: true`，前端直接呈现完成态，不再引导 |
| 4 | 中途关闭首次弹窗（未完成） | **保留全部进度**：仅写 `modal_revealed: true` 并收起弹窗，`track` / `step` / `selected_agent` / `selected_starter` 原样保留。用户切回 Onboarding Tab 或重新打开弹窗时，**自动恢复并定位到对应步骤**，不回到第一步 |
| 5 | 已完成后再触发首次弹窗 | 不改变进度，只写 `modal_revealed: true` |
| 6 | 校验失败 | 展示排查建议清单 + Retry + Discord 求助链接，**不清空已选轨道和步骤** |
| 7 | 已完成用户手敲 `/dashboard/onboarding` | 重定向回 `/dashboard` |
| 8 | 处于组织空间 | 侧边栏不显示 Onboarding 入口 |
| 9 | CLI 心跳中断超过阈值 | `connected` 转 `false`，Header 退回黄色。**阈值待后端确认，建议 60s** |
| 10 | 同一账号多设备并发引导 | 以服务端状态为准，后到的写入覆盖先到的 |
| 11 | 进度保存接口失败 | **不阻断用户操作**，前端保留本地状态继续走流程并静默重试。进度丢失的代价远小于把用户卡住 |
| 12 | newbie 轨用户未选代理直接点下一步 | 允许通过，不阻断。**本步骤不做本地 Agent 物理检测**，详见「功能点说明 · Newbie 轨 Step 1」 |
| 13 | 用户关闭 Modal 后切走，再从侧边栏切回 Onboarding Tab | 引导页按保留的 `track` / `step` 展开对应步骤，已选的代理 / 模板保持选中态 |
| 14 | 未完成连接时新建或切换到其他组织（Org B / Org C） | **禁止再次自动弹出 Modal**。`modal_revealed` 是账号级且在弹窗展示时即写入，每账号只自动弹一次。侧边栏 Onboarding 入口继续展示 |
| 15 | 在 Org B 的项目上完成账号首次连接 | 若同时也是 Org B 的生命周期首连，$5 **入账 Org B 自己的钱包**；所有组织的侧边栏 Onboarding 入口同时销毁 |
| 16 | 已连过的账号在 Org B 连接新项目 | Org B 若从未连接过，仍算**该组织首次**，`is_org_first_connection: true`，正常发奖至 Org B 钱包——除非设备指纹命中拦截。Header 该项目转绿 |
| 17 | 重新挂载一个已连过的老项目 | 同第 16 条，按重复连接处理 |
| 18 | 用户重新选择轨道 / 校验失败 / 删除项目 | **均不得把 `has_ever_connected` 改回 `false`**，否则可反复领取 $5 |
| 20 | 团队第二位成员在本地挂载同组织的项目 | `is_org_first_connection: false`。仅连通，**不播礼花、不发奖、不展示额度文案**，只显示 `🟢 项目已成功连接` |
| 21 | 同一台设备换个账号/组织再连一次 | 设备指纹命中，`reward_eligible: false`。表现同第 20 条 |
| 22 | CLI 取不到硬件特征（旧版本 / 容器 / 虚拟机） | 指纹为空。**不因此拦截**，正常按组织首连判定并记录，避免误伤。见附录 C2 |
| 23 | 校验成功但用户未关闭 Modal | 全局连接态**立即**置为 `true`，侧边栏 Onboarding 入口**同步销毁**，不得等到弹窗关闭才消失 |
| 24 | 用户新建项目时输入 `default` | 前端即时校验拦截，禁止提交并提示「该名称为系统保留」 |
| 25 | 已走完引导的账号切到未连接的组织 / 项目 | Header 按钮**恢复黄色呼吸灯 `CONNECT`**，但侧边栏 Onboarding 入口**不得回来**。两者判定源不同：按钮读项目级 `isProjectConnected`，入口读账号级 `has_ever_connected`。混用会导致「已引导完的老用户被重新当成新手」 |
| 19 | 校验进行中用户刷新页面 / 关闭浏览器 | **`verify_state` 绝不可持久化**。它是在途探测的瞬时态，重载后没有任何探测在跑；若把 `checking` 恢复出来，界面会渲染转圈而不是「校验」按钮，而自动校验只从 `idle` 触发，该步骤将**永久死锁**。前端在读取本地缓存时已强制把 `checking` 归一为 `idle`，后端同样不得存储此字段 |

---

## Demo 地址

- **分支**：`vectoree@pm-demo-v1`
- **启动**：`/Users/yuke/Desktop/启动Demo.command`，访问 `http://localhost:7131`
- **路径**：
  - 首次弹窗：清空 `localStorage` 后进入 `/dashboard`
  - 引导页：`/dashboard/onboarding`
  - CONNECT 弹窗：右上角 Header 按钮
  - 说明页：`/dashboard/onboarding/docs`
- **状态切换**：左下角 Demo 面板提供 9 个场景按钮 + 2 个强制开关，可直接跳到任意状态
- **源码位置**：`packages/dashboard/src/features/dashboard/components/onboarding/` 与 `.../components/connect/`

---

## 功能点说明

> UI 长相以 demo 为准，研发 1:1 实现。下表只讲规则、边界、异常与验收。

### 页面一：首次进入弹窗

**弹出条件**：`引导未完成 && modal_revealed === false`。宽 600px，遮罩黑色 65% + 背景模糊。

| 区域 | 说明（规则·边界·异常） | 验收标准 |
| - | - | - |
| 标题 | 随进度变化：`none/0` → Welcome to Vectoree；`developer/1` → Connect your project；`newbie/1` → Check your coding agent；`newbie/2` → Pick a starter；其余 → Verify connection | 每步标题与上表一致 |
| 主体 | 内嵌完整向导，与引导页共用同一套步骤组件 | 双轨流程均可在弹窗内走完 |
| 弹出频次 | **每账号仅自动弹一次**。保证机制是 `modal_revealed` 属于**账号维度**而非组织维度——只要写过一次，之后新建或切换到任何组织都不会再弹 | 首次弹出并关闭后，切换到 Org B 不再自动弹窗 |
| 关闭行为 | 点 ✕ / 点遮罩 / 按 Esc 均只收起弹窗，**不改动任何进度**：`track` / `step` / `selected_agent` / `selected_starter` 全部保留。关闭后**停留在当前页面**，不跳转、不回弹 | 切回 Onboarding Tab 或重开弹窗时定位到关闭前的步骤，已选项仍为选中态 |
| 成功结局 | 走 **CTA 结局**：礼花（`CONFETTI_CELEBRATION_DURATION` = 8 秒）+ 大卡片 + 主按钮 `🚀 Ship my agent →`，**不自动关闭、不自动跳转**，等用户点击才触发飞轨收起 | 礼花播放期间弹窗保持打开；未点击不跳转 |
| 收起动效 | 见「关键设计 · 交互逻辑」场景 A | 卡片准确吸附到 Header 按钮，按钮触发脉冲并切绿 |

### 页面二：左侧 Onboarding 引导页

| 区域 | 说明（规则·边界·异常） | 验收标准 |
| - | - | - |
| 页头 | 大标题 `Get started` + 贴纸 `🎁 $5.00 Welcome Credit` + 一行副标题。**连接状态不在此处展示**，统一由 Header 按钮承载 | 标题区无连接态文案 |
| 清单容器 | 手风琴式，同一时刻只展开当前步骤 | 切换步骤时其余折叠 |
| 步骤项三态 | `done`：黑底 acid 勾，可点击回退；`current`：acid 底黑方块，展开；`upcoming`：白底空心圆，禁用、50% 透明、折叠 | 三态视觉与 demo 一致 |
| 导航约束 | 只能回看已完成步骤，**不能跳到未完成步骤**（前端显式拦截向前跳） | 点击 upcoming 项无响应 |
| 成功结局 | 走 **banner 结局**：原位胜利 Card 展示 **3 秒**（`ONBOARDING_TAB_DESTROY_DELAY`）后平滑路由至 `/dashboard`，同时销毁侧边栏 Tab | 3 秒后自动离开；全程只发生**一次**路由变更 |
| Tab 销毁 | 跳转完成后侧边栏 Onboarding 菜单项消失 | 完成后侧边栏无该项，手敲 URL 被重定向 |

### 页面三：Header 连接状态按钮

| 状态 | 判定 | 圆点 | 文案 | 文字色 |
| - | - | - | - | - |
| 未连接 | 当前选中项目不在已连接列表中 | 黄色 `#FFB300` + 呼吸扩散动画 | `CONNECT` | `ink-30` |
| 已连接 | 当前选中项目在已连接列表中 | 绿色 `#00C853` 实心，**无动画** | `CONNECTED` | 白色 |

| 规则 | 说明 | 验收标准 |
| - | - | - |
| 项目绑定 | 状态跟随 Header 当前选中 Project，切组织 / 切项目后若新项目未连接则立刻退回黄色 | 切到未连接项目，按钮 1 帧内变黄 |
| 点击行为 | 两种状态都打开同一个 CONNECT 弹窗 | 已连接时弹窗多出心跳状态条 |
| 完成引导后仍可回黄 | `onboarding_status: completed` 且账号 `has_ever_connected: true`，只要当前项目自身未连接，按钮依旧是黄色呼吸灯 `CONNECT`。**账号级标记不参与本按钮判定** | demo 面板「已完成后再切组织/项目」场景下按钮为黄色且呼吸 |
| 无项目兜底 | 尚未解析出项目时按未连接渲染（黄色）。账号一个项目都没有时确实没有任何连接，显示 `CONNECT` 是正确语义 | 项目列表为空时按钮为黄色，不显示 `CONNECTED` |

### 页面四：CONNECT 弹窗

宽 640px，自上而下四区块：

| 区域 | 说明（规则·边界·异常） | 验收标准 |
| - | - | - |
| ① Header | 主标题 `CONNECT YOUR CODING AGENT`；副标题 `Paste into Claude Code, Cursor, Codex, or any coding agent.`；右上角极简 ✕ | 文案与截图一致 |
| ② 项目状态条 | 独立黑边卡片。左：灰色大写 `PROJECT` + 项目名 + 灰色短 id（前 8 位）；右：**仅已连接时**渲染绿色实心方块 + `ACTIVE` + `·` + `HEARTBEAT {n}s ago`，未连接时右侧为空 | 未连接不出现心跳条；已连接读数每秒递增 |
| ③ Prompt 代码框 | 黑边内嵌框，等宽字体。**必须随 Header 选中项目实时更新**：项目名与 id 变化时 `Dashboard project:` 行同步变化 | 切换项目后代码框内容立即变更 |
| ④ 底部操作行 | 左下：轻量图标链接 `📖 View Docs ↗`，点击关闭弹窗并跳 `/dashboard/onboarding/docs`；右下：主按钮 `📋 COPY PROMPT`（`#CCFF00` 底 + 2px 黑边 + 4px 硬阴影），复制 ③ 全部内容，成功后文案短暂变 `Copied!` | 复制内容与代码框完全一致；文档链接可达 |

> 该弹窗复用于项目设置页的 Connect 页签（受 `canShowConnect` / `canUseCloudHost` 两个 feature flag 控制）。

### 页面五：说明文档页

路径 `/dashboard/onboarding/docs`，纯静态，三个章节：`Have a project` / `Start from a template` / `Troubleshoot`。**无后端依赖。**

### 双轨步骤明细

**Developer 轨（已有工程，2 步）：**

| 步骤 | 界面 | 用户动作 | 状态变更 |
| - | - | - | - |
| 0 | 双卡选择 | 点「已有工程」 | `track='developer'`、`step=1`、`onboarding_status='in_progress'` |
| 1 | Prompt 框 + Copy | 复制 → 粘贴到代理 → 点「已执行，下一步 →」 | `step=2`、`verify_state='idle'` |
| 2 | Verify Connection | 点击校验 | 见「校验与领奖」 |

**Newbie 轨（从模板开始，3 步）：**

| 步骤 | 界面 | 用户动作 | 状态变更 |
| - | - | - | - |
| 0 | 双卡选择 | 点「从模板开始」 | `track='newbie'`、`step=1` |
| 1 | 5 个代理选项 | 点某代理（新窗口打开其下载页）→ 点「已就绪，下一步 →」 | `selected_agent=<id>`、`step=2` |

> **Step 1 定位说明（重要，避免研发误实现）**
>
> 本步骤是**纯前端的确认动作与下载入口引导**，目的只有两个：帮没装代理的用户找到下载地址，以及让用户自己确认"我已经准备好了"。
>
> - **不做任何本地 Agent 物理检测**：不探测本机进程、不读文件系统、不验证安装路径、不调用任何接口
> - `selected_agent` 仅作埋点与后续文案个性化之用，**不参与任何校验或分支逻辑**
> - 用户点击「已就绪，下一步 →」即可**无障碍推进至 Step 2**，未选代理也允许通过（用户可能早就装好了）
> - 该步骤**不存在失败态**
| 2 | 4 个模板卡 | 点某模板（**点击即自动复制该模板 Prompt 到剪贴板**）→ 点「已执行，下一步 →」 | `selected_starter=<key>`、`step=3` |
| 3 | Verify Connection | 点击校验 | 见「校验与领奖」 |

**编程代理选项**（前端常量，不需要接口）：

| id | 显示名 | 下载链接 |
| - | - | - |
| `claude-code` | Claude Code | https://claude.ai/download |
| `cursor` | Cursor | https://cursor.com |
| `copilot` | GitHub Copilot | https://github.com/features/copilot |
| `windsurf` | Windsurf | https://codeium.com/windsurf |
| `cline` | Cline | https://cline.bot |

**模板选项**（前端常量，不需要接口；后续若需运营配置再单独提需求）：

| key | 名称 | 定位 | 仓库 |
| - | - | - | - |
| `deeptutor` | DeepTutor | 创建我自己的 AI 学习教练 | https://github.com/HKUDS/DeepTutor |
| `ragflow` | RAGFlow | 创建一个能检索我资料库的问答 Agent | https://github.com/infiniflow/ragflow |
| `deerflow` | DeerFlow | 创建一个能帮我调研、编程和干长任务的 Agent | https://github.com/bytedance/deer-flow |
| `librechat` | LibreChat | 创建一个我自己的私有 AI 聊天助手 | https://github.com/danny-avila/LibreChat |

### Prompt 模板规格

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

**变量取值规则：**

| 变量 | 取值 | 兜底 |
| - | - | - |
| `projectName` | 当前选中项目 name，否则项目列表第一项 name | i18n `dashboard.defaultProjectName` = `My Vectoree Project` |
| `projectId` | 当前选中项目 id，否则项目列表第一项 id | `null` |

`projectId` 为 `null` 时，`Dashboard project:` 行退化为只有项目名、不带括号 id。

> **后端注意**：Prompt 里的 `{projectId}` 是 CLI 侧建立绑定关系的凭据来源。CLI 执行 `link` 时会带上这个 id，服务端据此把本地目录与 Project 关联。该链路由 CLI 团队负责，本文只约定 Dashboard 侧必须把真实 `projectId` 拼进 Prompt。

### 校验与领奖

| `verify_state` | UI |
| - | - |
| `idle` | 主按钮 `Verify Connection`（自动探测模式下跳过此态直接发起） |
| `checking` | Loader 旋转 + 文案「正在检测心跳…」 |
| `success` | 成功反馈，样式取决于结局类型与是否首次连接 |
| `failed` | 排查建议列表 + `Retry` 按钮 + Discord 求助入口 |

**两种成功结局：**

| 结局 | 使用场景 | 表现 |
| - | - | - |
| CTA | 首次进入**弹窗** | 礼花 + 大卡片（首次连接显示 Gift 图标与 $5 文案，非首次显示 🟢）+ 主按钮 `🚀 Ship my agent →`，不自动关闭 |
| Banner | 左侧 **Onboarding 页** | 原位胜利 Card，展示 3 秒后自动路由至 `/dashboard` 并销毁 Tab |

**首次 / 非首次的表现差异（防刷体验，重点）：**

| 维度 | 发奖（`reward.granted: true`） | 不发奖（团队后续成员 / 设备指纹拦截） |
| - | - | - |
| 礼花动画 | ✅ 播放 Canvas Confetti | ❌ **不播放** |
| 额度提示 | ✅ 展示 $5 到账文案 | ❌ **不展示、不发放** |
| 横幅文案 | `🎉 项目连接成功！$5.00 欢迎额度已发放至你的组织钱包。` | `🟢 项目已成功连接。` |
| 底色 | `#CCFF00`（荧光黄） | `card`（常规卡片底） |
| 图标（CTA 结局） | `Gift` 礼物图标 | `🟢` |

> 重复连接的反馈必须是**轻量绿色成功态**，不能带 🎉 或任何"又拿到奖励"的暗示，否则会诱导用户反复尝试刷额度。

---

## 关键设计

### 一、数据结构

这是整个功能的**唯一状态源**，前端所有组件都从这个对象派生渲染。

```typescript
interface OnboardingSnapshot {
  onboarding_status: 'not_started' | 'in_progress' | 'completed';
  modal_revealed: boolean;          // 首次弹窗是否展示过
  track: 'none' | 'developer' | 'newbie';
  step: 0 | 1 | 2 | 3;              // 语义随 track 变化
  selected_agent: string | null;    // newbie 轨选中的代理 id
  selected_starter: string | null;  // newbie 轨选中的模板 key
  verify_state: 'idle' | 'checking' | 'failed' | 'success';  // 前端瞬时态
  has_ever_connected: boolean;      // 账号级：全平台是否曾成功连接过任意项目（单向）
  connected_project_ids: string[];  // 已连接的项目 id 列表
  user_rewarded_now: boolean;       // 本次校验是否触发 $5 发放
  completed_offsite: boolean;       // 是否在站外完成连接后回站
}
```

**三层生命周期边界（本功能最容易实现错的地方）：**

| 层级 | 字段 | 语义 | 切换组织时 |
| - | - | - | - |
| **账号 Account** | `has_ever_connected` | 全平台是否连过任意项目。**单向，一旦为 true 永不回退** | 不变 |
| **账号 Account** | `onboarding_status` / `modal_revealed` / `track` / `step` | 引导流程进度 | 不变 |
| **项目 Project** | `connected_project_ids` | 逐项目的连接关系 | 不变（是列表），但派生的 `isProjectConnected` 随选中项目变化 |

> **`has_ever_connected` 绝不可被重置。** 重新选择轨道、校验失败、切换组织、删除项目都不得把它改回 `false`，否则用户可以反复领取 $5。后端务必把它实现为只能由 `false → true` 的单向标志。

| 字段 | 归属 | 当前来源 | 目标来源 |
| - | - | - | - |
| `onboarding_status` | 账号 | localStorage | 服务端 |
| `modal_revealed` | 账号 | localStorage | 服务端 |
| `track` / `step` | 账号 | localStorage | 服务端 |
| `selected_agent` / `selected_starter` | 账号 | localStorage | 服务端 |
| `verify_state` | 会话 | 内存 | **纯前端，不入库** |
| `has_ever_connected` | 账号 | localStorage | 服务端（单向标志） |
| `connected_project_ids` | 账号 | localStorage | 服务端 |
| `user_rewarded_now` | 会话 | localStorage | 校验接口响应 |
| `completed_offsite` | 账号 | localStorage | 服务端 |

> `verify_state` 请务必理解为**前端瞬时 UI 态**，不要设计成后端字段。它描述的是"当前这一次点击校验按钮的进行程度"，刷新页面后应回到 `idle`。

**派生状态**（前端计算，后端不需提供，但需理解语义）：

| 派生值 | 计算规则 | 消费方 |
| - | - | - |
| `isIncomplete` | `onboarding_status !== 'completed'` | 落地默认路由、首次弹窗是否可弹 |
| `hasEverConnected` | 直接取账号级 `has_ever_connected` | **侧边栏 Onboarding 入口显隐**（跨组织继承） |
| `isProjectConnected` | 当前选中项目 id 是否在 `connected_project_ids` 中。**严格按项目判定，不得回退到账号级 `has_ever_connected`** | Header 按钮黄/绿、弹窗是否显示心跳条 |
| `backgroundState` | 弹窗打开期间冻结的快照副本 | 保证弹窗内进度不漏到背后页面。**关闭弹窗时必须解冻并同步到保留下来的最新进度**，否则引导页会显示关闭前的旧步骤 |

### 二、接口定义 ★

> 当前**没有任何真实接口**。以下路径为建议命名，后端可按团队规范调整，但**字段名请保持不变**——前端状态模型直接按这套字段消费。

#### 接口总览

| # | 接口 | 方法 | 用途 | 调用时机 |
| - | - | - | - | - |
| A | `/v1/onboarding/state` | GET | 拉取账号引导状态 | Dashboard 首次挂载 |
| B | `/v1/onboarding/state` | PATCH | 增量保存引导进度 | 每次 track/step/选择项变更 |
| C | `/v1/projects/{projectId}/connection/verify` | POST | 主动校验连接并触发发奖 | 用户点 Verify |
| D | `/v1/projects/{projectId}/connection` | GET | 查询连接与心跳 | CONNECT 弹窗打开后每 5s |
| E | `/v1/onboarding/connections` | GET | 批量返回已连接项目 id | 与 A 合并返回亦可 |
| F | `/organizations`、`/organizations/{id}/projects` | GET | 组织与项目列表 | **已存在，直接复用** |

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

- 账号维度，不带 project 参数。**所有字段均为账号级，切换组织不重新请求、也不会变化**
- `has_ever_connected` 是单向标志，只能 `false → true`
- `verify_state` / `user_rewarded_now` 不在响应中，前者是前端瞬时态，后者由接口 C 返回
- 新账号从未写入过时返回全默认值：`onboarding_status='not_started'`、`modal_revealed=false`、`track='none'`、`step=0`，其余为 `null` / `false` / `[]`
- **`completed_offsite` 判定规则由后端负责**：`has_ever_connected = true` 但从未收到过 Dashboard 侧的 verify 请求，即判定为站外完成

#### 接口 B：保存引导进度

```
PATCH /v1/onboarding/state
Body: { "track": "developer", "step": 1, "onboarding_status": "in_progress" }

Response 200: 更新后的完整状态对象（同接口 A 结构）
```

- **增量语义**：只更新请求体中出现的字段，未出现的保持不变
- **允许进度回退**：用户在手风琴里点回已完成的步骤时会提交更小的 `step`，后端需照单全收，**不要做"进度只能前进"的保护**
- **关闭 Modal 不重置**：关闭首次弹窗时前端只提交 `{ "modal_revealed": true }` 这一个字段，不带任何进度字段。后端不得因此清空 `track` / `step` / `selected_agent` / `selected_starter`
- 低频写，一次完整引导约 4~6 次，可直接落库

**触发点清单：**

| 前端动作 | 提交字段 |
| - | - |
| 首次弹窗被展示 | `modal_revealed: true` |
| 选择轨道 | `onboarding_status: 'in_progress'`、`track`、`step: 1` |
| newbie 选中代理 | `selected_agent` |
| newbie 点下一步 | `step: 2` |
| newbie 选中模板 | `selected_starter` |
| 点「已执行，下一步 →」 | `step: 2` 或 `3` |
| 手风琴回退到已完成步骤 | `step` |
| 关闭首次弹窗 | **仅** `modal_revealed: true`（无论是否完成，进度字段一律不提交）。这是"每账号只弹一次"的落点 |
| 引导完成 | `onboarding_status: 'completed'`、`has_ever_connected: true` |

#### 接口 C：校验连接（核心）

```
POST /v1/projects/{projectId}/connection/verify

Response 200（已连接 · 该组织首次，且设备有领奖资格）:
{
  "connection_success": true,
  "is_org_first_connection": true,
  "reward_eligible": true,
  "reward": {
    "granted": true,
    "amount_usd": "5.00",
    "currency": "USD",
    "credited_org_id": "a91c...44f0"
  },
  "last_heartbeat_at": "2026-09-10T08:12:33Z",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（已连接 · 团队第二位成员，组织已领过）:
{
  "connection_success": true,
  "is_org_first_connection": false,
  "reward_eligible": true,
  "reward": { "granted": false },
  "last_heartbeat_at": "2026-09-11T02:41:07Z",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（已连接 · 设备指纹已在别处领过奖，拦截）:
{
  "connection_success": true,
  "is_org_first_connection": true,
  "reward_eligible": false,
  "reward": { "granted": false },
  "reason": "device_fingerprint_already_rewarded",
  "last_heartbeat_at": "2026-09-11T02:41:07Z",
  "connected_project_ids": ["3f2b...e91a"]
}

Response 200（未检测到连接）:
{
  "connection_success": false,
  "is_org_first_connection": false,
  "reward_eligible": false,
  "reward": { "granted": false },
  "reason": "no_heartbeat_received"
}
```

> **"没检测到连接"是业务上的正常结果，不是 HTTP 错误。** 请返回 200 + `connection_success: false`，不要返回 4xx。前端据此渲染失败态与排查建议。只有真正的系统故障（鉴权失败、服务不可用）才返回非 2xx。

| 字段 | 类型 | 说明 |
| - | - | - |
| `connection_success` | boolean | 该项目当前是否处于已连接状态（本次校验结果，非账号级） |
| `is_org_first_connection` | boolean | 是否为**当前组织**生命周期内的首次成功连接。团队第二位成员挂载同组织项目时为 `false` |
| `reward_eligible` | boolean | 设备指纹是否具备领奖资格。该硬件 Hash 已在别处领过奖时为 `false` |
| `reward.granted` | boolean | 本次是否实际发放额度，等价于 `is_org_first_connection && reward_eligible`。前端据此决定**礼花放不放、$5 文案显不显示** |
| `reward.credited_org_id` | string | 额度入账的组织 id，即发生本次连接的组织自己 |
| `reward.amount_usd` | string | 发放金额，用字符串避免浮点误差 |
| `last_heartbeat_at` | ISO8601 | 最近一次心跳时间，用于弹窗心跳读数初值 |
| `connected_project_ids` | string[] | 该账号全部已连接项目，前端整体覆盖本地列表 |
| `reason` | string | 仅失败时返回，用于日志与分析，**不直接展示给用户** |

> 前端把 `reward.granted` 映射为 `user_rewarded_now`。**`is_org_first_connection` 与 `reward_eligible` 需分别返回、不要合并**：两者都为 `false` 时前端表现完全一致（都只显示 `🟢 项目已成功连接`），但运营侧要能区分「团队第二人正常连接」和「疑似刷奖被设备指纹拦截」。

**性能要求**：这是用户点了按钮后正盯着 Loader 等的接口，请控制在 **2s 内响应**。若检测本身耗时不可控，改为「立即返回 checking，前端轮询接口 D」或复用现有 socket.io 通道推送结果——前端已有 `checking` 态，两种方案都能直接接。

#### 接口 D：连接与心跳状态

```
GET /v1/projects/{projectId}/connection

Response 200:
{ "connected": true, "last_heartbeat_at": "2026-09-10T08:12:33Z" }
```

- 前端每 5s 轮询，**仅在 CONNECT 弹窗打开且当前项目已连接时**轮询，弹窗关闭立即停止
- 前端自己按秒 tick 计算 `HEARTBEAT {n}s ago`，接口只给绝对时间戳
- 高频只读接口，请走缓存 / 轻量查询，勿打 DB 主库
- **活性判定阈值需后端定义**：多久没收到 CLI 上报算断开，建议 60s，超时后 `connected` 转 `false`

#### 接口 E：已连接项目列表

```
GET /v1/onboarding/connections

Response 200:
{ "connected_project_ids": ["3f2b...e91a", "77c1...0b42"] }
```

用于判断 Header 按钮在任意项目下的状态。若接口 A 已带 `connected_project_ids`，本接口可省略。

#### 错误处理约定

| 场景 | HTTP | 前端表现 |
| - | - | - |
| 未检测到连接 | 200 + `connection_success: false` | 失败态 + 排查建议 + Retry |
| 未登录 / token 失效 | 401 | 走全局登录兜底 |
| 项目不存在或无权限 | 403 / 404 | 提示「项目不可用」，引导切换项目 |
| 服务异常 | 5xx | 沿用《登录错误兜底规范》：不透传原始错误，统一「服务暂时异常，请稍后重试」 |

### 三、$5 奖励规则

| 项 | 规则 |
| - | - |
| 金额 | $5.00 USD 等值 token 额度 |
| 频次 | **每组织一次**（按组织生命周期计，不是按账号、也不是按人） |
| 发放条件 | **同时**满足两个条件：① `is_org_first_connection === true`，即该组织生命周期内第一次成功连接；② `reward_eligible === true`，即 CLI 上报的设备指纹从未在平台任何账号/组织下领过奖 |
| 入账去向 | **该组织自己的钱包** |
| 团队成员二次连接 | 同组织的后续成员在本地挂载该项目时，返回 `is_org_first_connection: false`。只完成连通，**不发奖励** |
| 设备指纹拦截 | 见下方「设备级防刷」。命中时 `reward_eligible: false`，同样只连通不发奖 |
| 判定方 | **服务端权威**，前端传的任何东西都不可信 |
| 触发时机 | 接口 C 返回 `reward.granted: true` 的那一刻 |
| 幂等 / 防刷 | **必须**。以「组织」为唯一键落一条发放记录，并发重复调用只发一次 |
| 到账校验 | 本期不做前端二次核对 |

> **⚠️ 本条是奖励规则的第三版，前两版均已作废，请以本条为准：**
>
> | 版本 | 口径 | 状态 |
> | - | - | - |
> | v1.0 | 仅**默认组织的默认项目**连接成功才发 | ❌ 作废 |
> | v1.2 / v1.3 | **每账号一次**，在哪连都发，统一入账默认组织钱包 | ❌ 作废 |
> | **v1.4（现行）** | **每组织一次**，发放至该组织自己的钱包；跨账号刷奖由**设备指纹**拦截 | ✅ 生效 |
>
> 口径从「账号级」改为「组织级」是为了适配团队场景：组织钱包只应进账一次，不论是哪位成员完成的连接。原本由「账号级唯一」承担的防刷职责，**转由设备指纹承担**——这一点是本次变更成立的前提，后端必须两者同时实现，只做其一会留下刷奖漏洞。

#### 设备级防刷（Anti-Sybil Device Fingerprint）

| 项 | 规则 |
| - | - |
| 上报方 | **CLI**。执行 `link` 指令时自动在 Request Header / Payload 中带上本地设备的 MAC 地址或硬件特征 Hash |
| 上报内容 | 硬件特征的 **Hash**，不是原始 MAC。原始硬件标识属于个人信息，不得明文落库 |
| 拦截逻辑 | 若该 Hash 已在平台**任意其他账号或组织**下触发过 $5 发放，本次强制 `reward_eligible: false` |
| 拦截后表现 | **仅完成连通，不发奖励**。前端按「非首次」渲染：不播礼花、不展示额度文案，只显示 `🟢 项目已成功连接` |
| 缺失兜底 | CLI 版本过旧、容器/虚拟机等取不到硬件特征时，Hash 为空。**建议按「不拦截但记录」处理**，避免误伤正常用户——此项需后端确认，见附录 C2 |

### 四、交互逻辑（动效规格）

**场景 A：弹窗飞轨收起（Fly-to-Corner）**

触发：用户在首次进入弹窗里校验成功后，主动点击 `🚀 Ship my agent →`。

| 阶段 | 时长 | 行为 |
| - | - | - |
| 遮罩淡出 | 300ms | opacity → 0，同步解除背景模糊，露出背后 Dashboard |
| 卡片飞轨 | 700ms | 抛物线飞向 Header 右上角 CONNECT 按钮，`scale: 1 → 0.55 → 0.1`，opacity 末段归零 |
| 按钮接应 | 450ms | Header 按钮触发 `scale: [1, 1.15, 1]` 脉冲，圆点切绿，文案切 `CONNECTED` |
| 路由 | — | 飞轨结束后写入 completed 并 `replace` 跳 `/dashboard` |

> 实现要点：抛物线靠 `x` 与 `y` 的关键帧进度不同步造出（`y` 在中间帧已走完 80%，`x` 才走 30%）。三个属性必须写在**同一个 `animate()` 调用**里——`x`/`y`/`scale` 都编译成同一个 `transform` 属性，拆成多次调用会互相打架导致动画中途卡死。

**场景 B：Onboarding 页原位收尾（无飞轨）**

| 阶段 | 时长 | 行为 |
| - | - | - |
| 礼花（`CONFETTI_CELEBRATION_DURATION`） | 8000ms | 4 波 × 108 粒，每波间隔 1700ms。仅首次连接播放 |
| 胜利横幅 / Tab 销毁延迟（`ONBOARDING_TAB_DESTROY_DELAY`） | 3000ms | 原位展示胜利 Card，随后路由至 `/dashboard` 并销毁侧边栏 Tab |
| 自动跳转 | — | 8s 后 `replace` 跳 `/dashboard` |
| Tab 销毁 | — | `onboarding_status` 转 completed 后侧边栏自动移除该项 |

> **两个时长是独立参数，不要求一致。** Modal 结局无自动跳转，礼花可以完整播完 8 秒；页面结局 3 秒后路由离开，礼花随页面卸载一并结束，这是有意为之的取舍——胜利 Card 是交接而非庆典，让用户盯着一个即将消失的入口更糟。

**时长常量总表：**

| 常量 | 值 | 位置 |
| - | - | - |
| 心跳轮询间隔 | 5000ms | `ConnectHeartbeatBadge.tsx:11` |
| 心跳读数 tick | 1000ms | `ConnectHeartbeatBadge.tsx:25` |
| 校验 mock 延迟 | 1500ms | `OnboardingDemoState.tsx:309`（上线后由真实接口耗时替代） |
| 礼花总时长 `CONFETTI_CELEBRATION_DURATION` | 8000ms | `FireworksEffect.tsx` |
| Tab 销毁延迟 `ONBOARDING_TAB_DESTROY_DELAY` | 3000ms | `OnboardingSteps.tsx` |
| 飞轨时长 | 700ms | `OnboardingFirstRunModal.tsx:18` |
| 遮罩淡出 | 300ms | `OnboardingFirstRunModal.tsx` |
| 接应脉冲 | 450ms | `AppHeader.tsx` |
| 复制反馈停留 | 2000ms | `OnboardingSteps.tsx:24` |

### 五、埋点

现有 `SocketContext.tsx:233-241` 已在 MCP 连接成功时上报 PostHog `ONBOARDING_COMPLETED`。建议本期补充：

| 事件 | 触发点 |
| - | - |
| `onboarding_modal_shown` | 首次弹窗展示 |
| `onboarding_track_selected` | 选择轨道，带 `track` |
| `onboarding_prompt_copied` | 复制 Prompt，带 `track` / `starter` |
| `onboarding_verify_attempted` | 点击校验 |
| `onboarding_verify_result` | 校验返回，带 `connection_success` / `is_org_first_connection` / `reward_eligible` |
| `onboarding_abandoned` | 关闭首次弹窗且未完成，带 `step` |

---

## 附录 A：字段映射总表（前端 ← 接口）

| 前端字段 | 来源接口 | 接口字段 | 消费位置 |
| - | - | - | - |
| `onboarding_status` | A / B | `onboarding_status` | 侧边栏显隐、落地重定向 |
| `modal_revealed` | A / B | `modal_revealed` | 首次弹窗是否自动弹 |
| `track` / `step` | A / B | 同名 | 清单展开项、计步器 |
| `selected_agent` / `selected_starter` | A / B | 同名 | newbie 轨选中态 |
| `has_ever_connected` | A / C | `has_ever_connected`（A）；`connection_success` 为 true 时置位（C） | 侧边栏入口显隐、$5 发放门槛。**不参与 Header 连接态判定** |
| `connected_project_ids` | A / C / E | `connected_project_ids` | `isProjectConnected` 判定 |
| `user_rewarded_now` | C | `reward.granted` | 成功页 $5 文案与礼花开关 |
| `connected_org_ids` | C | 服务端维护 | 判定该组织是否已发生过首次连接 |
| `completed_offsite` | A | `completed_offsite` | 站外完成的静默处理 |
| 心跳读数 | D | `last_heartbeat_at` | CONNECT 弹窗状态条 |
| `projectName` / `projectId` | F | `name` / `id` | Prompt 模板变量、弹窗状态条 |
| `verify_state` | — | — | **纯前端瞬时态，无接口** |

## 附录 B：研发替换点清单

> 路径均为 `vectoree` 仓库 `packages/dashboard/src/` 下的相对路径。按此清单逐条替换即可完成对接，**不需要打开页面**。

**需要改的：**

- [ ] `.../onboarding/OnboardingDemoState.tsx:176-188` — 删除 `readStored()` / `persist()`（localStorage 读写），替换为接口 A（初始化拉取）+ 接口 B（`patch()` 内提交）
- [ ] `.../onboarding/OnboardingDemoState.tsx` — `verifyConnection()` 内的 `setTimeout(1500)` 替换为接口 C 的真实请求；响应 `reward.granted` 映射到 `user_rewarded_now`，`is_org_first_connection` / `reward_eligible` 原样透传
- [ ] `.../onboarding/OnboardingDemoState.tsx` — 删除 `STORAGE_KEY` 常量（当前为 `vectoree_onboarding_demo_v3`）
- [ ] `.../onboarding/OnboardingDemoState.tsx` — 删除 `force_verify_fail` / `force_device_rewarded` 两个 demo 字段及其全部引用（后者是设备指纹拦截的本地模拟，真实判定在服务端）
- [ ] `.../onboarding/OnboardingDemoState.tsx:62-174` — 删除 `DEMO_SCENARIOS` 常量
- [ ] `.../connect/ConnectHeartbeatBadge.tsx:23-30` — 轮询体内的 `Date.now()` 替换为接口 D，用响应的 `last_heartbeat_at`（epoch ms）更新 `lastHeartbeatAt`；文件头 `TODO(backend)` 注释已标注同一件事
- [ ] `layout/AppLayout.tsx` — 移除 `<OnboardingDemoPanel />` 及其 import
- [ ] 删除 `.../onboarding/OnboardingDemoPanel.tsx`
- [ ] 顺手清理（当前已无人引用）：`.../onboarding/ConnectProjectStep.tsx`、`.../onboarding/ExploreStep.tsx`、`.../connect/CLISection.tsx`

**不需要改的**（它们只消费 `useOnboardingDemo()` 这一个 Hook，接口换完自动生效）：

`OnboardingPage.tsx`、`OnboardingChecklist.tsx`、`OnboardingWizard.tsx`、`OnboardingSteps.tsx`、`OnboardingFirstRunModal.tsx`、`ConnectDialog.tsx`、`ConnectCodingAgentCard.tsx`、`ConnectStatusDot.tsx`、`AgentSelector.tsx`、`AppHeader.tsx`、`AppSidebar.tsx`、`FireworksEffect.tsx`、`ConnectFlyContext.tsx`

## 附录 C：已知偏差与待确认

### C1. Demo 对交付约束的偏差（需拍板）

`design/DEMO_DELIVERY_CONSTRAINTS.md` 第 10 章验收清单要求"未引入新依赖"，第 3.2 节禁止修改 `packages/*/package.json`。本次 demo 为实现飞轨动效，**引入了 `framer-motion@^13.2.0` 到 `packages/dashboard`**，并因此变更了 `package.json` 与 `pnpm-lock.yaml`。同时为支持弹窗遮罩自定义，修改了 `packages/ui/src/components/Dialog.tsx`（新增 `showCloseButton` / `overlayClassName` 两个可选 prop，向后兼容）。

三处均超出白名单，**需 PM 与前端负责人确认是否接受**。若不接受，飞轨动效需改用 CSS `@keyframes` 重写。

### C2. 待确认问题

| # | 问题 | 建议 | 需谁拍板 |
| - | - | - | - |
| 1 | 心跳多久没上报算断开？ | 60s | 后端 |
| 2 | `verify` 同步返回还是异步推送？ | 若检测 > 2s 则改异步，复用现有 socket.io | 后端 |
| 3 | $5 额度走哪个计费系统？返回什么凭证？ | — | 后端 / 计费 |
| 4 | 引导进度是否需要跨设备同步？ | 需要，故设计为服务端存储 | PM |
| 5 | 用户删除已连接项目，`connected_project_ids` 如何清理？ | 后端在项目删除时级联清理 | 后端 |
| 6 | 模板列表是否需要可运营配置？ | 本期硬编码，后续单独提需求 | PM |
| 7 | 是否需要补发额度的运营后台入口？ | 本期不做 | PM |
| ~~8~~ | ~~成功态停留时长：2~3 秒 还是 8 秒？~~ | **已拍板，见 C3：拆为双参数（8000 / 3000）** | ✅ 已关闭 |
| ~~9~~ | ~~用户删除「默认组织」后，$5 应入账到哪个组织钱包？~~ | **已失效**：v1.4 起奖励入账「发生连接的那个组织」，不再依赖默认组织 | ✅ 已关闭 |
| 10 | CLI 取不到硬件特征（旧版本 / 容器 / 虚拟机）时如何处理？ | 建议「不拦截但记录」，避免误伤正常用户 | 后端 |
| 11 | 设备指纹 Hash 的保留期限与合规口径？原始 MAC 不得明文落库 | 需法务或安全确认 | 后端 / 安全 |
| 12 | 组织被删除后重建，是否算新组织从而可再领一次 $5？ | 建议以组织 id 为准（重建即新 id，可再领），刷奖风险由设备指纹兜底 | 后端 / PM |

### C3. 成功态停留时长（已拍板封版 · 2026-09-11）

原冲突：新指令要求「2~3 秒后销毁侧边栏 Tab」，而此前已定「成功动效展示 8 秒」。

**裁决：拆成两个独立参数，不再共用一个时长。**

| 常量 | 取值 | 作用域 | 行为 |
| - | - | - | - |
| `CONFETTI_CELEBRATION_DURATION` | `8000ms` | 首次进入 **Modal** | 连接成功后**不自动跳转**。礼花播放 8 秒，弹窗保持打开，等用户主动点击 `🚀 Ship my agent →` 才触发飞轨收起 |
| `ONBOARDING_TAB_DESTROY_DELAY` | `3000ms` | 左侧 **Onboarding Tab 页** | 原位展示胜利 Card 3 秒，随后平滑路由至 `/dashboard` 并销毁 Tab |

**同时修复的路由竞态：** 原 `finish()` 先调 `completeOnboarding()` 再调 `navigate('/dashboard')`，而 `completeOnboarding` 把 `onboarding_status` 置为 `completed` 的瞬间，`AppLayout` 中的落地重定向（`!isIncomplete && path === '/dashboard/onboarding'` → `<Navigate>`）**已经会把用户带离引导页**。一次跳转被两套路由机制同时驱动，导致引导页可能在自己的停留时长走完之前就被提前带走。

修复方式：页面侧 `finish()` **只负责标记完成，不再自己导航**，路由交由落地重定向单点处理；同时给停留定时器加了单次闩锁，避免 React StrictMode 重挂载触发两次完成、进而引发两次路由变更。

---

## 验收标准

| # | 验收项 | 检查方式 |
| - | - | - |
| 1 | 新账号首次登录自动弹出引导弹窗；关闭后不再自动弹，但侧边栏保留入口 | 清 localStorage 后进 `/dashboard` |
| 2 | developer 轨 2 步、newbie 轨 3 步均可走通，计步器显示正确 | 交互检查 |
| 3 | Prompt 中项目名与 id 与 Header 选中项目一致，切换项目实时更新 | 切项目后比对代码框 |
| 4 | 校验失败返回 200 且前端渲染失败态与 Retry，不出现裸错误 | 接口 mock 返回 `connection_success: false` |
| 5 | 首次校验成功发放 $5，重复校验不重复发放 | 连续调用两次 verify，查发放记录 |
| 6 | 在 Org B 的项目完成该组织生命周期首次连接，$5 入账 **Org B 自己的**钱包 | 切到自建组织走完流程，查两个组织的钱包余额 |
| 16 | 团队第二位成员连接不播礼花、不显示额度文案，只显示 `🟢 项目已成功连接` | 接口 C mock 返回 `is_org_first_connection: false` 后走校验（与第 19 条同一套前端分支，demo 面板不单列场景） |
| 19 | 设备指纹已领过奖时，仅连通不发奖，表现同第 16 条 | 勾选 demo 面板「Device already claimed · 设备已领过奖励」后走校验 |
| 20 | 校验成功瞬间侧边栏 Onboarding Tab 即销毁，**无需关闭 Modal** | 弹窗内完成校验，弹窗仍开着时观察左侧 Tab |
| 21 | 新建项目名为空或为 `default` 时无法提交并给出提示 | 组织切换器里输入 `default` |
| 17 | 未完成连接时切换/新建组织，不再自动弹出 Modal | 弹过一次后切组织观察 |
| 18 | 首次连接成功后，切到其他组织，侧边栏 Onboarding 入口也已消失 | 连接成功后切 Org B 看侧边栏 |
| 7 | 引导完成后侧边栏入口消失，手敲 URL 重定向回 `/dashboard` | 视觉 + URL 检查 |
| 8 | 切换到未连接的项目**或组织**，Header 退回黄色呼吸灯 `CONNECT`；已走完引导、账号连过项目也不例外 | 切项目/切组织观察按钮；demo 面板点「Completed · switch org · 已完成后再切组织/项目」 |
| 9 | CONNECT 弹窗心跳读数每秒递增，5s 轮询后归零重算 | 打开弹窗观察 10s |
| 10 | 刷新页面后引导进度从服务端恢复（不再依赖 localStorage） | 清 localStorage 后刷新，进度仍在 |
| 11 | 走到第 2 步后关闭 Modal，切回 Onboarding Tab 仍停在第 2 步，已选代理/模板保持选中 | 交互检查 |
| 14 | 关闭 Modal 后停留在当前页，可自由切到任意 Tab；再次访问 `/dashboard` 不被拉回引导页 | 交互检查 |
| 15 | Newbie 轨 Step 1 不选任何代理也能点「已就绪，下一步 →」进入 Step 2 | 交互检查 |
| 12 | Demo 面板与 `force_*` 开关已全部移除 | 代码审查 |
| 13 | Modal 结局不自动跳转，礼花播满 8 秒且需用户点击才收起；页面结局 3 秒后自动离开，且**全程只发生一次路由变更** | 录屏比对 + 监听 history 调用次数 |

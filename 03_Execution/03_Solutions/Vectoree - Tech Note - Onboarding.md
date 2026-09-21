# Vectoree - 技术笔记 - Onboarding 实现与交接

> **本文与 [需求文档](../02_PRD/Vectoree%20-%20Prd%20-%20Onboarding.md) 配套。** 分工：PRD 只讲「做什么、做成什么样算完」，是产品与后端的共同依据；本文讲「怎么做到的、哪里踩过坑、接后端时该动哪个文件」，读者是前端。
>
> 之所以拆开：PRD 里混进 DOM 克隆、Tailwind 编译行为、组件树重挂载这类内容，会让后端和产品在找规则时反复跳过大段与自己无关的段落；而这些踩坑记录本身有保留价值，删掉下一个人还会再踩一遍。
>
> **基线是 `pm-demo-v2`。** 登录落地、Header CONNECT 点击、CONNECT 弹窗内容已按 PRD 改完。下面这些不要当生产规格：Demo 面板、mock 登录、`DEMO_PROJECT` 名叫 `my-app`（生产默认项目名是 `default`）、Dashboard / 安装页上的现网卡片、校验 UI 把三种不发奖收成 `SUCCESS_NO_BONUS` 且成功就喷花。五态、邮箱未验重发按钮、仅 `SUCCESS_BONUS_GRANTED` 礼花，一律按 PRD §5.2。

---

## 1 Demo 现状

### 1.1 分支与启动

| 项 | 值 |
| - | - |
| 仓库 | `/Users/yuke/Documents/vectoree` |
| 交付分支 | `pm-demo-v2`（基于最新 `main` 接上连接引导） |
| 对照分支 | `pm-demo-v1` 保留，**不要再拿它对接生产** |
| 启动 | 在 `pm-demo-v2` 上跑仓库根目录 `pnpm dev`。地址 `http://localhost:7131` |
| 源码 | `packages/dashboard/src/features/dashboard/components/onboarding/` 与 `.../components/connect/` |

**不要双击** `/Users/yuke/Desktop/启动Demo.command`：脚本仍会把工作区切回 `pm-demo-v1`。

演示路径：首次弹窗需清空 `localStorage` 后进入 `/dashboard`；引导页 `/dashboard/onboarding`；CONNECT 弹窗点右上角 Header 按钮；说明页 `/dashboard/onboarding/docs`。

Console 登录走 mock，**任意邮箱即可**进 Dashboard（`login.service.ts` 的 `loginWithEmail` 不打后端）。登录后落 `/dashboard`，由 R1 弹出首次引导。**上线后也必须如此**：不得恢复 `shouldLandOnInstall` → `/dashboard/install`（PRD §3.4）。

左下角 Demo 面板用来切触达角色（新注册用户 · 默认组织 / 同一账号 · 其他组织 / 被邀请用户）和三种连通结果（失败 / 发奖 / 静默成功）。Demo 的 `owner_default` 对应「新注册用户、默认组织 `role === 'owner'`」；`owner_other` 是同一账号切到非默认组织；`member` 是被邀请用户。不要把它理解成组织角色枚举里的 `member`。**静默成功在 demo 里是一态**，对应 PRD 的邮箱未验 / 设备已领 / 组织已充；上线不要抄这个合并，按 PRD 五态分别渲染。

### 1.2 Mock 面

UI / 交互 / 动效 / 空态 / 加载态 / 失败态 / 成功态全部实现并验收。**onboarding / connect / verify / reward 相关没有任何真实接口调用**，经全仓库确认。假的部分：

| 项 | 实现 |
| - | - |
| 状态持久化 | `localStorage`，key `vectoree_onboarding_demo_v9` |
| 校验 | `mockVerifyProbe` 内 `setTimeout(1500)` 模拟请求耗时 |
| 项目身份与本地目录 | `DEMO_PROJECT` 常量：`my-app` / `9f4c2a1b-7e63-4d58-b0a2-1c8f5e9d3a47` / `/Users/dev/workspace/my-agent-app` |
| Console 登录 | `login.service.ts`：`loginWithEmail` / `registerWithEmail` 直接 `activateDemoSession` |
| 组织 / 项目列表 | `OrganizationContext.tsx` 在 `isDemoConsoleSession()` 时返回 `demoOrganization()` + `demoProject()`，不打 `organizationService` |

`DEMO_PROJECT.localFolderPath` 故意与 `name` 不同，用来演示「本地目录名 ≠ 云端项目名」。引导向导与 CONNECT 弹窗都按这个分叉来写：Prompt 里是云端项目，状态条左侧是本地目录名。demo 的 `title` 目前只挂了目录名；上线按 PRD：`title` 用完整 `local_folder_path`。

Mock 快照里的 `connected_org_ids` / `bonus_status` 是 demo 字段。上线不要建组织级发奖列表；`$5` 是账号闸门（PRD §5.2）。前端消费字段名是 `probe_status`，不是 `bonus_status`。

> **对接注意（CONNECT 是改现网模块，不是另做入口）：** Header 按钮与弹窗内容以 PRD §4.3–§4.4 为准，整段替换现网点击与弹窗。`pm-demo-v2` 已按规格改完：登录后一律 `/dashboard`；CONNECT 点击一律打开弹窗；弹窗含本地目录名、§4.6 Prompt、View Docs / Copy，无 Discord / Connect later。全局 `ConnectCodingAgentCard` 仍给 Dashboard / Install / 模板详情用，不要把生产卡片再套回 CONNECT 弹窗。引导向导内 Prompt 与 CONNECT 弹窗 Prompt 同为 §4.6。

### 1.3 与现网安装引导并存

`pm-demo-v2` 没有拿连接引导替换生产安装引导。同时存在：

| 现网（main 已有） | 本期加上 |
| - | - |
| `/dashboard/install`、`DTestConnectTip`、侧边栏 Install、欢迎额度 | `/dashboard/onboarding`、首次弹窗、Header CONNECT / 飞轨、Demo 面板 |

登录后**禁止**再走 `shouldLandOnInstall` → `/dashboard/install`。Demo 的 `LoginPage.tsx` 已按 PRD §3.4 停用这条现网逻辑；对接真实登录时不要从 main 把它接回来。**侧边栏不得再展示 Install 入口**（2026-09-18 验收）；安装页路由可保留，但用户不能从导航点进去。

`AppLayout` 不再包含 v1 的 `ConnectOverlayBridge`（`SHOW_ONBOARDING_OVERLAY` / `SHOW_CONNECT_OVERLAY`）。本期不恢复。

---

## 2 对接替换点清单

> 路径均为 `vectoree` 仓库 `packages/dashboard/src/` 下的相对路径。按此清单逐条替换即可完成对接，**不需要打开页面**。

代码已按「对接时的命运」分成三层，替换只发生在第一层：

| 层 | 文件 | 对接时的命运 |
| - | - | - |
| Mock 接口层 | `.../onboarding/OnboardingMockApi.tsx` | **整体替换**为真实接口 |
| 状态派生层 | `.../onboarding/OnboardingDemoState.tsx` | 保留，只换数据来源 |
| 动画编排层 | `.../onboarding/OnboardingHandoff.tsx` | 与后端无关，不动 |

**需要改的：**

- [ ] `OnboardingMockApi.tsx` — `readStored()` / `persist()`（localStorage 读写）替换为接口 A（初始化拉取）+ 接口 B（`patch()` 内提交）
- [ ] `OnboardingMockApi.tsx` — `mockVerifyProbe()` 内的 `setTimeout(1500)` 替换为接口 C 的真实请求；响应 `probe_status` 驱动生命周期矩阵，`reward.granted` 映射到 `user_rewarded_now`
- [ ] `OnboardingMockApi.tsx` — 删除 `STORAGE_KEY` 常量
- [ ] `OnboardingMockApi.tsx` — 删除 `force_verify_fail` / `force_device_rewarded` 两个 demo 字段及其全部引用（后者是设备指纹拦截的本地模拟，真实判定在服务端）
- [ ] `OnboardingMockApi.tsx` — 删除 `DEMO_SCENARIOS` 常量
- [ ] `OnboardingMockApi.tsx` — 删除 `DEMO_PROJECT` 常量；`useDemoProject` 改为真实选中项目 + 接口 E 的 `local_folder_path`
- [ ] `layout/AppLayout.tsx` — 移除 `<OnboardingDemoPanel />` 及其 import；**保留** `OnboardingLandingRedirect`（PRD §3.4 R1：`/dashboard` → `/dashboard/onboarding`；R2：引导完成后从 onboarding 回 dashboard）
- [ ] 删除 `.../onboarding/OnboardingDemoPanel.tsx`
- [ ] `features/login/services/login.service.ts` — 恢复真实 `loginWithEmail` / `registerWithEmail`；删除 `activateDemoSession` / `DEMO_CONSOLE_*` / `isDemoConsoleSession` 及相关分支
- [x] `features/login/pages/LoginPage.tsx` — **v2 已改完**：去掉 `shouldLandOnInstall` / `useInstallBonus`，登录后默认一律 `/dashboard`（显式 `storedRedirect` / `postAuthRedirect` 仍可走）。若从 `main` 另开分支而不是以 v2 为基线，这三项仍要做。接后端时勿把旧跳转接回来
- [x] `layout/AppHeader.tsx` — **v2 已改完**：删除 `isDTest` → `/dashboard/install` 与 `isConnectDisabled`，点击一律 `openConnectDialog()`
- [x] `.../connect/ConnectDialog.tsx` — **v2 已改完**：按 PRD §4.4 自绘弹窗（本地目录名、§4.6 Prompt、View Docs / Copy，无 Discord / Connect later）。不要再套现网 `ConnectCodingAgentCard`。项目设置 Connect 页签不是这个弹窗，不要改 Connection String
- [ ] `lib/contexts/OrganizationContext.tsx` — 去掉 `isDemoConsoleSession()` 分支、`demoOrganization()` / `demoProject()` 与对 `DEMO_PROJECT` 的 import
- [x] `.../connect/ConnectHeartbeatBadge.tsx` — **已整文件删除**（心跳读数下线，无替换项）
- [x] `ConnectProjectStep.tsx` / `VerifyStep.tsx` / `ExploreStep.tsx` — **已整文件删除**（零引用的旧向导步骤）

**受交付约束阻塞（等豁免）：**

- [ ] 删除 `.../connect/CLISection.tsx` — 当前无人使用，但删除需同步改 `connect/index.ts` 的 re-export，而 `.ts` 在 `DEMO_DELIVERY_CONSTRAINTS.md` §3.2 禁区内。与第 5 章的已知越界打包拍板

**不需要改的**（它们只消费 `useOnboardingDemo()` 这一个 Hook，接口换完自动生效）：

`OnboardingPage.tsx`、`OnboardingChecklist.tsx`、`OnboardingWizard.tsx`、`OnboardingSteps.tsx`、`VerifyRewardStep.tsx`、`OnboardingPromptBlocks.tsx`、`OnboardingFirstRunModal.tsx`、`OnboardingBonus.tsx`、`ConnectStatusDot.tsx`、`AgentSelector.tsx`、`AppSidebar.tsx`、`FireworksEffect.tsx`、`ConnectFlyContext.tsx`

`AppHeader.tsx` / `ConnectDialog.tsx` 是现网 CONNECT 模块的改动面；demo 已按 §4.3–§4.4 改完，对接时保留这套点击与弹窗，不要当「只换数据、UI 不动」。

---

## 3 实现约束与踩坑记录

### 3.1 弹窗退出飞轨（PRD §4.7 场景 A）

触发：用户在首次进入弹窗里探针返回 `SUCCESS_*` 后，主动点击主 CTA，或满 8s 观赏结束。两者都先走完 **3s 销毁延迟**（等 Socket 闭环或过渡），再进入飞轨。时序见 PRD §4.7。

时序见 PRD §4.7。以下八条是实现时必须满足的约束，每一条都对应一次实际踩坑。

**① 跳转必须发生在动画之前。** 用户在弹窗里完成连接后，Dashboard 上不得再出现任何 onboarding 相关的东西——连接一旦完成，引导对这个用户就结束了，退出动画背后该露出的是 Dashboard 而不是引导页。先播动画再换页，等于在用户已经完成之后又把引导页展示了一遍（哪怕只有几百毫秒），并且还要再跳一次，观感是多余的一次跳切。

**② Header 按钮必须等卡片落下才变绿。** 完成态在 0ms 就写入了，实时连接态会立刻变为已连接，因此 Header 单独冻结一份起飞前的快照，直到卡片落点才释放。按钮是飞轨的靶子，若它在卡片起飞时就已变绿，这段动画就失去了它唯一要传达的信息。

**③ 飞行中的卡片必须脱离 React 组件树。** 它在 0ms 就要跳路由，而跳路由会卸载弹窗；仍由弹窗持有的卡片会在半空中被删除（实测飞到 `scale ≈ 0.92` 即消失）。实现方式是在跳转前把卡片 DOM 克隆一份挂到 `<body>`，连同一块同样脱离组件树的幕布，由普通 DOM 动画驱动，动画结束后自行移除。克隆节点须去掉 `id` / `role` 并置 `aria-hidden`，避免出现第二个 dialog 语义节点。

**④ 克隆体必须清空全部居中偏移，否则飞行路径起点是错的。** 克隆体用 `getBoundingClientRect()` 的结果显式定位，而该结果**已经包含**了弹窗的居中位移；任何残留的偏移都会被再叠加一次，卡片会从偏离弹窗半个身位的地方起飞。注意 **Tailwind v4 把 `-translate-x-1/2` 编译到独立的 `translate` 属性而不是 `transform`**，因此只清 `transform` 不够，`translate` / `rotate` / `scale` 都要一并置 `none`。验收：起飞第一帧的卡片中心必须与点击前弹窗中心完全重合。

**⑤ 飞行需要超时兜底。** 克隆节点不归任何组件管，清理只能由动画结束回调触发；一旦动画因故不兑现，页面上会永久残留一张卡片和一层全屏压暗，Header 也会卡在 `CONNECT`。实现上以 `FLY_MS + 400ms` 作为看门狗与动画结束竞速，谁先到谁清理。正常路径实测在约 790ms 由动画自身完成，不会走到兜底。

**⑥ 引导页在卸载前的那一两帧必须保持安静。** 完成态写入后它的冻结快照会被释放并追上成功态，从而触发第二次礼花（礼花层级高于弹窗，会盖在所有内容之上）和它自己那条 `ONBOARDING_TAB_DESTROY_DELAY` 自动跳转。两者都归弹窗所有。该抑制需加闩锁，实时读取会在解除的那一帧漏出一串礼花。

**⑦ 抛物线靠关键帧进度不同步造出。** `y` 在中间帧已走完 80%、`x` 才走 30%。三个属性必须写在**同一个 `animate()` 调用**里——`x` / `y` / `scale` 都编译成同一个 `transform` 属性，拆成多次调用会互相打架导致动画中途卡死。

**⑧ 路由只能有一个驱动方。** 弹窗结局此前既调 `completeOnboarding` 又自己 `navigate`，而前者已经会触发落地重定向，两套机制抢同一次跳转，导致跳转早于动画结束。现已移除弹窗内的命令式跳转，与页面结局保持一致：谁都不跳，只标记完成，路由由落地重定向单点处理。

### 3.2 前置缺陷：AppErrorBoundary 按 pathname 重挂载全树

**影响面超出本需求，已修复，值得所有人知道。**

`AppErrorBoundary` 原先以 `key={location.pathname}` 包裹整个应用，导致每次路由变化都把整棵树连根重建——Header、侧边栏、所有 Provider 及其状态全部重新挂载。这使得任何布局级状态都无法跨导航存活：飞行中的动画被删除、Header 的冻结快照丢失、接应脉冲的通知发到了已卸载的旧 Provider 上、demo 面板每次点击都自动收起。

现改为保留组件、在 `resetKey` 变化时清除错误标记，错误恢复行为不变。**任何依赖「跨路由存活」的交互都以此为前提。**

### 3.3 背景快照与侧边栏状态联动

侧边栏入口必须读**实时**物理连通结果。弹窗打开期间，页面底层读的是一份被冻结的背景快照（用于避免弹窗内的进度泄漏到底层清单）；如果侧边栏误接这份快照，就会出现「探针校验已成功、礼花已触发，但左侧 Tab 要等用户手动关闭 Modal 才消失」的残余现象。

正确行为：`SUCCESS_*` 的瞬间连通态即置位，侧边栏入口按 3s 延迟销毁，与 Modal 开关状态无关。`FAILED` 时入口必须继续在。

### 3.4 项目身份的真实来源不是 URL

dashboard 路由**不含 project id**（无 `:projectId`、无 `?project=`），全库唯一的 `useParams` 用在邀请 token 和日志源上。项目选择由 `OrganizationContext` 持有：

```
GET /organizations/{orgId}/projects  ─┐
localStorage vectoree_selected_project_id ─┼─▶ selectedProject ──▶ apiClient 的 X-Project-Id 头
```

`PlatformProjectContext` 只是它的转发壳，不是独立的事实来源。

直接后果：**深链无法指定项目**。分享一个 dashboard URL 不会带上当前项目，对方打开看到的是他自己上次选中的那个。本期不改路由。

### 3.5 已知代码异味（本次未改）

`OnboardingDemoState.tsx` 在 render 期调用 `setBackgroundFreeze`，而不是放在 effect 里。这么写的原因是弹窗的 effect 先于 Provider 的 effect 执行，用 effect 更新会慢一拍。改成 `useLayoutEffect` 在理论上更干净，但涉及 StrictMode 双调用下的行为差异，有回归风险，本次保持原样。

### 3.6 Socket 超时后的事件接收标准

> 产品原文写「补到 §3.2」。§3.2 已被 PRD 验收 B24 占用（AppErrorBoundary 重挂载），本节独立编号，避免冲掉那条引用。

接口 C 按同步返回实现，控制在 **2s 内**。检测本身若必然超过 2s，HTTP 立即回 `{ pending: true }`，最终结果走现有 socket.io。**不要引入轮询兜底。**

事件必须带 `projectId` 与 PRD §5.2 的 **`probe_status` 五态**。不要做成 `SUCCESS` / `FAILED` + `isSilent`：那种形状表达不了 `SUCCESS_EMAIL_UNVERIFIED`（要出重发验证邮件，不是静默句）。

```typescript
socket.on("connection:verify_result", (data: {
  projectId: string;
  probe_status: 'FAILED' | 'SUCCESS_BONUS_GRANTED' | 'SUCCESS_EMAIL_UNVERIFIED'
    | 'SUCCESS_NO_BONUS_DEVICE_LIMIT' | 'SUCCESS_NO_BONUS_ORG_FUNDED';
  connection_success: boolean;
  reward?: { granted: boolean; amount_usd?: string; credited_org_id?: string };
  local_folder_path?: string | null;
  connected_project_ids?: string[];
}) => {
  if (data.projectId !== currentProjectId) return;
  // 按 PRD §5.2 矩阵分发 UI，不要在前端把四态 SUCCESS_* 再合并
});
```

约束：

- 必须按 `projectId` 过滤，忽略其他项目的迟到事件
- `SUCCESS_*` 进入成功态；仅 `SUCCESS_BONUS_GRANTED` 喷花。点 CTA 或满 8s 后再走 3s 销毁延迟（PRD §4.7）
- `FAILED` 留在校验步，不写 `modal_revealed`、不销毁 Tab
- 前端不得把 socket 超时自行重试成轮询
- **`checking` 最长 10s**（PRD §6.2）。超时按 `FAILED` 出排查项 + Retry，禁止空转约 60s

---

## 4 时长常量与代码位置

| 常量 | 值 | 位置 |
| - | - | - |
| 校验 mock 延迟 | 1500ms | `OnboardingMockApi.tsx`（上线后由真实接口耗时替代） |
| 礼花总时长 / 弹窗观赏 `CONFETTI_CELEBRATION_DURATION` | 8000ms | `OnboardingBonus.tsx` / `FireworksEffect.tsx` |
| 弹窗 CTA 后 / 观赏结束后的销毁延迟 `POST_CTA_SETTLE_MS` | 3000ms | `OnboardingBonus.tsx` / `VerifyRewardStep.tsx` |
| Tab 销毁延迟 `ONBOARDING_TAB_DESTROY_DELAY` | 3000ms | `OnboardingBonus.tsx` / `VerifyRewardStep.tsx` |
| 飞轨时长 `FLY_MS` | 700ms | `OnboardingFirstRunModal.tsx` |
| 幕布淡出 `VEIL_FADE_MS` | 300ms | `OnboardingFirstRunModal.tsx` |
| 飞行看门狗 `FLIGHT_WATCHDOG_MS` | `FLY_MS + 400` = 1100ms | `OnboardingFirstRunModal.tsx`，仅兜底 |
| 接应脉冲 | 450ms | `AppHeader.tsx` |
| 复制反馈停留 | 2000ms | `OnboardingPromptBlocks.tsx` / `OnboardingSteps.tsx` / `ConnectDialog.tsx` |
| 校验 `checking` 等待上限 | 10000ms | 前端超时 → `FAILED` + Retry；HTTP 仍按 §3.6 的 2s / `pending` |

礼花参数：4 波 × 108 粒，每波间隔 1700ms，仅 `SUCCESS_BONUS_GRANTED` 播放。

---

## 5 对交付约束的已知越界（实现按 demo 现状交付）

`vectoree` 仓库 `design/DEMO_DELIVERY_CONSTRAINTS.md` 第 10 章要求「未引入新依赖」，第 3.2 节禁止改 `packages/*/package.json` 与纯 `.ts`。本期页面按 `pm-demo-v2` 已落地的方案交付，研发不要自行改回 CSS 飞轨或拆掉 Dialog 扩展：

| # | 越界项 | 原因 | 交付时怎么处理 |
| - | - | - | - |
| 1 | 引入 `framer-motion@^13.2.0`，变更 `package.json` 与 `pnpm-lock.yaml` | 飞轨动效 | **保留**，与 demo 一致 |
| 2 | 修改 `packages/ui/src/components/Dialog.tsx`，新增可选 prop `showCloseButton` / `overlayClassName` | 弹窗遮罩自定义 | **保留**，向后兼容 |
| 3 | `connect/CLISection.tsx` 无人引用，删它要改 `connect/index.ts` | 死代码 | **本期不删**，避免动纯 `.ts` |
| 4 | 修改 `features/login/services/login.service.ts` | mock 登录，无本地后端也能进 Dashboard | 上线时按 §2 清单恢复真实登录 |
| 5 | 修改 `lib/contexts/OrganizationContext.tsx` | mock 会话下返回 demo 组织 / 项目 | 上线时按 §2 清单去掉 demo 分支 |

### 5.1 技术债务与遗留文件清理

- **遗留文件**：`CLISection.tsx`（因本次限制仅改动 `.ts` 文件而暂时保留）。
- **清理计划**：已建立技术债工单 `#TECH-DEBT-001`，计划在需求上线后的第一个日常敏捷迭代中物理删除该孤儿文件。

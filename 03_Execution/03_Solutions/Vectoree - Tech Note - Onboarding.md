# Vectoree - 技术笔记 - Onboarding 实现与交接

> **本文与 [需求文档](../02_PRD/Vectoree%20-%20Prd%20-%20Onboarding.md) 配套。** 分工：PRD 只讲「做什么、做成什么样算完」，是产品与后端的共同依据；本文讲「怎么做到的、哪里踩过坑、接后端时该动哪个文件」，读者是前端。
>
> 之所以拆开：PRD 里混进 DOM 克隆、Tailwind 编译行为、组件树重挂载这类内容，会让后端和产品在找规则时反复跳过大段与自己无关的段落；而这些踩坑记录本身有保留价值，删掉下一个人还会再踩一遍。

---

## 1 Demo 现状

### 1.1 分支与启动

| 项 | 值 |
| - | - |
| 仓库 | `/Users/yuke/Documents/vectoree` |
| 分支 | `pm-demo-v1` |
| 启动 | `/Users/yuke/Desktop/启动Demo.command` |
| 地址 | `http://localhost:7131` |
| 源码 | `packages/dashboard/src/features/dashboard/components/onboarding/` 与 `.../components/connect/` |

演示路径：首次弹窗需清空 `localStorage` 后进入 `/dashboard`；引导页 `/dashboard/onboarding`；CONNECT 弹窗点右上角 Header 按钮；说明页 `/dashboard/onboarding/docs`。

左下角 Demo 面板需覆盖触达角色（Owner 默认组织 / Owner 其他组织 / Member）与探针五态（`FAILED` / `SUCCESS_BONUS_GRANTED` / `SUCCESS_EMAIL_UNVERIFIED` / `SUCCESS_NO_BONUS_DEVICE_LIMIT` / `SUCCESS_NO_BONUS_ORG_FUNDED`）。

### 1.2 Mock 面

UI / 交互 / 动效 / 空态 / 加载态 / 失败态 / 成功态全部实现并验收。**onboarding / connect / verify / reward 相关没有任何真实接口调用**，经全仓库确认。假的部分：

| 项 | 实现 |
| - | - |
| 状态持久化 | `localStorage`，key `vectoree_onboarding_demo_v9` |
| 校验 | `mockVerifyProbe` 内 `setTimeout(1500)` 模拟请求耗时 |
| 项目身份与本地目录 | `DEMO_PROJECT` 常量：`my-app` / `9f4c2a1b-7e63-4d58-b0a2-1c8f5e9d3a47` / `/Users/dev/workspace/my-agent-app` |

`DEMO_PROJECT.localFolderPath` 故意与 `name` 不同。CONNECT 弹窗状态条展示的是本地目录名、Prompt 里是云端项目名，两者在真实使用中本就会分叉；如果 demo 里让它们相同，这个功能的意义在演示时看不出来。

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
- [ ] `layout/AppLayout.tsx` — 移除 `<OnboardingDemoPanel />` 及其 import
- [ ] 删除 `.../onboarding/OnboardingDemoPanel.tsx`
- [x] `.../connect/ConnectHeartbeatBadge.tsx` — **已整文件删除**（心跳读数下线，无替换项）
- [x] `ConnectProjectStep.tsx` / `VerifyStep.tsx` / `ExploreStep.tsx` — **已整文件删除**（零引用的旧向导步骤）

**受交付约束阻塞（等豁免）：**

- [ ] 删除 `.../connect/CLISection.tsx` — 当前无人使用，但删除需同步改 `connect/index.ts` 的 re-export，而 `.ts` 在 `DEMO_DELIVERY_CONSTRAINTS.md` §3.2 禁区内。与第 5 章的三处违规打包拍板

**不需要改的**（它们只消费 `useOnboardingDemo()` 这一个 Hook，接口换完自动生效）：

`OnboardingPage.tsx`、`OnboardingChecklist.tsx`、`OnboardingWizard.tsx`、`OnboardingSteps.tsx`、`VerifyRewardStep.tsx`、`OnboardingPromptBlocks.tsx`、`OnboardingFirstRunModal.tsx`、`OnboardingBonus.tsx`、`ConnectDialog.tsx`、`ConnectCodingAgentCard.tsx`、`ConnectStatusDot.tsx`、`AgentSelector.tsx`、`AppHeader.tsx`、`AppSidebar.tsx`、`FireworksEffect.tsx`、`ConnectFlyContext.tsx`

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

接口 C 按同步返回实现，控制在 **2s 内**。检测本身若必然超过 2s，HTTP 立即回 `checking`，最终结果走现有 socket.io。**不要引入轮询兜底。**

事件名、过滤与分发必须按下面这份契约实现。`isSilent === true` 对应风控 / 付费组织未发奖：只切成功态，文案走 PRD §5.2 的锁定句，不披露原因。

```typescript
socket.on("connection:verify_result", (data: {
  projectId: string;
  status: 'SUCCESS' | 'FAILED';
  isSilent?: boolean;
}) => {
  if (data.projectId !== currentProjectId) return;

  if (data.status === 'SUCCESS') {
    // 成功态 UI + 开启 8s 观赏倒计时；isSilent 只改文案，不改连通
    dispatchState({ type: 'VERIFY_SUCCESS', isSilent: data.isSilent });
  } else {
    dispatchState({ type: 'VERIFY_FAILED' });
  }
});
```

约束：

- 必须按 `projectId` 过滤，忽略其他项目的迟到事件
- `SUCCESS` 进入成功态并启动 8s 观赏；点 CTA 或满 8s 后再走 3s 销毁延迟（PRD §4.7）
- `FAILED` 留在校验步，不写 `modal_revealed`、不销毁 Tab
- 前端不得把 socket 超时自行重试成轮询

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
| 复制反馈停留 | 2000ms | `OnboardingPromptBlocks.tsx` |

礼花参数：4 波 × 108 粒，每波间隔 1700ms，仅 `SUCCESS_BONUS_GRANTED` 播放。

---

## 5 对交付约束的已知越界（实现按 demo 现状交付）

`vectoree` 仓库 `design/DEMO_DELIVERY_CONSTRAINTS.md` 第 10 章要求「未引入新依赖」，第 3.2 节禁止改 `packages/*/package.json` 与纯 `.ts`。本期页面按 demo 已落地的方案交付，研发不要自行改回 CSS 飞轨或拆掉 Dialog 扩展：

| # | 越界项 | 原因 | 交付时怎么处理 |
| - | - | - | - |
| 1 | 引入 `framer-motion@^13.2.0`，变更 `package.json` 与 `pnpm-lock.yaml` | 飞轨动效 | **保留**，与 demo 一致 |
| 2 | 修改 `packages/ui/src/components/Dialog.tsx`，新增可选 prop `showCloseButton` / `overlayClassName` | 弹窗遮罩自定义 | **保留**，向后兼容 |
| 3 | `connect/CLISection.tsx` 无人引用，删它要改 `connect/index.ts` | 死代码 | **本期不删**，避免动纯 `.ts` |

### 5.1 技术债务与遗留文件清理

- **遗留文件**：`CLISection.tsx`（因本次限制仅改动 `.ts` 文件而暂时保留）。
- **清理计划**：已建立技术债工单 `#TECH-DEBT-001`，计划在需求上线后的第一个日常敏捷迭代中物理删除该孤儿文件。

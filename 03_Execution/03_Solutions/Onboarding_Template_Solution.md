# Vectoree Template 功能产品方案

## 一、定位

Vectoree 是 AI MaaS 平台（"Give your agent a backend"），为 AI agent 提供模型网关、登录、数据库、存储四块后端能力，覆盖从 demo 到 production。

本方案是 Vectoree Onboarding 的一环，目标是把「高星开源 agent 项目」变成平台内的可选模板：用户无需从零搭建，选择一个模板即可在本地生成并运行属于自己的 agent，后端统一由 Vectoree 托管。

方案在 Vectoree 产品体系中的边界：

- 属于 9.4 拟纳入的新能力（当前 launch 明确 no templates / no deploy）。
- 复用现有四块后端与 Skill + CLI 开发者路径（`login → link` 关联用户项目）。
- 模板不是平台代部署，而是引导用户在本地拉起已集成 Vectoree 后端的项目。

## 二、背景

Onboarding 的对外标语是 "Anyone can ship an agent!"——让非技术用户也能把 agent 跑起来。

现实瓶颈：从零构建一个可用 agent，需要选模型、配 Key、接数据库、处理登录与文件存储，对非技术用户门槛过高；多数用户卡在「第一步怎么开始」。

解决思路：用市场已验证的高星 GitHub agent 项目当「小白模板」。

- 这些项目本身已有完整可运行的 agent 逻辑，用户只需选、装、跑。
- 把项目的后端替换为 Vectoree 四块，用户获得统一的项目 Key、钱包计费与后端托管，无需自行管理多家 API。
- 优先选 agent 类项目：Vectoree 定位是「帮用户做自己的 agent」，基于 agent 产品最易把 Vectoree 后端自然融入，演示价值最高。

由此形成方案闭环：研发收录并集成项目 → 平台罗列模板 → 用户一键安装并运行自己的 agent。

## 三、方案概述

方案分两侧、两段闭环。

**研发侧（前置，一次性）**：选定高星项目 → 二次集成（LLM / Auth / DB / Storage 改接 Vectoree 四块）→ 产出「已集成模板 + 安装指令」入库。

**用户侧（每次使用）**：Onboarding 罗列模板 → 点击开 detail → 执行 detail 内携带的安装指令 → 模板克隆到本地并绑定用户默认 project → 用户运行自己的 agent。

关键共识：

- 安装不是「把一个裸 GitHub 仓库即时改写后端」，而是拉取研发已集成好的版本。
- 用户进入模板步骤时已有 Vectoree 默认 project，指令携带该 project id，`link` 自动完成，无需额外建项目。

## 四、方案说明

### 4.1 项目候选池（已筛选）

按「高星活跃 / 小白可部署 / 契合四块 / agent 类优先」四标准，从市场筛出 19 个候选，分三档优先级。P0 为最贴合「用户做自己的 agent」、部署门槛低（以低为主，FastGPT 因四块全中且中文社区强放宽至中等）、且至少契合模型 + 数据库 + 存储三块以上的项目。

| 优先级 | 项目                                                                                            | Star   | License    | 部署难度 | 接入 Vectoree 模块 | 说明                                   |
| --- | --------------------------------------------------------------------------------------------- | ------ | ---------- | ---- | -------------- | ------------------------------------ |
| P0  | [open-webui/open-webui](https://github.com/open-webui/open-webui)                             | 150.5k | 自定义*       | 低    | 四块全中           | 自托管 AI 平台，内置 RAG / 多模型 / RBAC         |
| P0  | [langgenius/dify](https://github.com/langgenius/dify)                                         | 153.9k | 自定义\*\*    | 低    | 四块全中           | 低代码 agent 构建平台，最贴合「用户做自己的 agent」      |
| P0  | [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)                   | 65.4k  | MIT        | 低    | 四块全中           | 全栈本地优先 agent 体验                       |
| P0  | [labring/FastGPT](https://github.com/labring/FastGPT)                                         | 29.5k  | 自定义\*\*    | 中    | 四块全中           | 知识库 + RAG + 可视化工作流，中文社区强              |
| P1  | [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor)                                         | 37.7k  | Apache-2.0 | 中    | 四块全中           | 教育标杆，已在集成验证中                         |
| P1  | [browser-use/browser-use](https://github.com/browser-use/browser-use)                         | 111k   | MIT        | 中    | 模型             | 浏览器自动化，让网站对 AI 可操作                    |
| P1  | [bytedance/deer-flow](https://github.com/bytedance/deer-flow)                                 | 81k    | MIT        | 中    | 模型 + 数据库 + 存储  | 字节 SuperAgent，调研 / 编码 / 长链条任务           |
| P0  | [langflow-ai/langflow](https://github.com/langflow-ai/langflow)                               | 153.9k | MIT        | 低    | 模型 + 数据库 + 存储  | 可视化拖拽搭 agent / 工作流                    |
| P1  | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)                                     | 55.4k  | Apache-2.0 | 低    | 模型 + 数据库 + 存储  | 拖拽式搭 AI agent                         |
| P1  | [TencentCloud/TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) | 25.4k  | MIT        | 低    | 模型 + 数据库 + 存储  | 团队级 Agent 记忆中枢                        |
| P2  | [ChatGPTNextWeb/NextChat](https://github.com/ChatGPTNextWeb/NextChat)                         | 88.7k  | MIT        | 极低   | 模型（轻）          | 前端优先，仅需 API Key，可改接 Vectoree Gateway      |
| P2  | [MadsLorentsen/ai-job-search](https://github.com/MadsLorentsen/ai-job-search)                 | 36.9k  | MIT        | 中    | 模型 + 存储        | 求职 / HR 垂直场景                         |
| P2  | [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book)                             | 42.7k  | Apache-2.0 | 低    | 模型             | 知识型模板（书 + 代码）                        |
| P2  | [virgilioj94/book-to-skill](https://github.com/virgilioj94/book-to-skill)                     | 26k    | 待确认        | 低    | 模型             | 技术书转可复用 skill（License 待确认）            |
| P2  | [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman)                           | 38.4k  | GPL-3.0    | 中    | 模型 + 存储        | 个人 AI，强 copyleft，慎用                     |
| P2  | [n8n-io/n8n](https://github.com/n8n-io/n8n)                                                   | 202.9k | fair-code  | 低    | 模型             | 工作流自动化含 AI agent 节点，禁托管竞品             |
| P2  | [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet)                                         | 37k+   | AGPL-3.0   | 低    | 模型 + 数据库       | 低代码应用构建器，强 copyleft，需法律评估               |
| P2  | [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)                           | 85.7k  | MIT        | 中    | 模型 + 代码 / 沙箱   | AI 软件工程师 agent，偏开发者                   |
| P2  | [block/buzz](https://github.com/block/buzz)                                                   | 31.6k  | Apache-2.0 | 中    | 模型（其余需改造）      | 人类 + agent 协作 workspace，概念贴合但偏自托管        |

**License 脚注**

- \* Open WebUI 自定义许可：可商用，禁止去品牌（白标需授权）。
- \** Dify / FastGPT 自定义许可（类 Apache-2.0）：可商用，禁止多租户 SaaS 竞品、禁止去品牌。
- openhuman（GPL-3.0）、ToolJet（AGPL-3.0）为强 copyleft，作为官方模板分发前需法律评估。
- n8n（fair-code）禁止提供托管竞品服务。

### 4.2 研发侧前置工程：模板收录与集成

要让一个 GitHub 项目成为可一键安装的 Vectoree 模板，研发须先做二次集成（即「接入验证步骤」）：

1. Clone 目标仓库到本地。
2. 接模型：把 LLM 调用改为 Vectoree Gateway（OpenAI 兼容 + 项目 Key）。
3. 接数据 / 登录 / 存储：数据库切 Vectoree Postgres、登录走 Vectoree Auth、文件走 Storage。
4. 端到端跑通：登录 → 调模型 → 数据落库 → 文件上传，全部成功即视为跑通。

跑通后，将该「已集成版本」与对应的安装指令一并入库，供用户侧调用。这一工程是模板可用的前提，不在用户安装时执行。

### 4.3 用户侧安装交互

1. 罗列展示：Onboarding 界面以列表陈列候选模板（高星 GitHub 项目）。
2. 点击开 detail：用户点某模板 → 打开详情页。
3. 携带安装指令：detail 内嵌一段「发给 Vectoree 的指令」，把该模板安装到用户本地。

指令执行时：

- 克隆研发已集成 Vectoree 后端的模板到本地；
- 关联到用户默认 project（指令携带默认 project id，`link` 自动完成）；
- 用户即可得到已绑定自己项目、可直接运行的 agent。

前提说明：用户在 Vectoree 拥有默认 project，进入模板步骤即已有项目，故无需「自动建项目」步骤；「本地无代码项目」由 clone 解决。

### 4.4 实现边界

- 安装指令拉取的是研发已集成后端的版本，不是安装时把任意仓库的网关 / Auth / DB 改写为 Vectoree。
- 对未经集成的任意 GitHub 仓库，无法一键变 Vectoree，须先走 4.2 收录集成。
- 对清单内已集成模板，用户侧可一键（一条指令 → 克隆 + 关联项目）。

### 4.5 License 与合规

作为官方模板分发前，以下项目需法律评估：

- open-webui（自定义，禁去品牌）、Dify / FastGPT（自定义类 Apache-2.0，禁多租户 SaaS 竞品、禁去品牌）；
- openhuman（GPL-3.0）、ToolJet（AGPL-3.0）强 copyleft；
- n8n（fair-code，禁托管竞品服务）。

其余 MIT / Apache-2.0 核心部分可商用。

### 4.6 首批验证路线

建议 P0 五个（open-webui、dify、anything-llm、FastGPT、langflow）作为首批「clone + 接 Vectoree 后端」样板先行验证；DeepTutor 作为已在进行的教育场景参考同步验证。跑通后形成可复用的收录集成 SOP，再向 P1 / P2 扩展。

注意：P0 中 open-webui / dify / FastGPT 为自定义许可（禁去品牌、禁多租户 SaaS 竞品），正式作为官方模板分发前须先过法律评估，否则不得进入首批分发。

## 待确认项

- detail 页「发给 Vectoree 的指令」具体形态（CLI 命令 / Skill 调用 / 界面内一键触发）待研发确认；本方案仅定交互框架，指令格式待补。

## 状态说明

- 当前 19 个候选均未在 Vectoree 环境跑通，状态均为「待验证」。
- Star / License / 部署难度为评估时公开信息快照，以仓库最新为准；带 \* / \** 的项目在作为官方模板分发前需法律评估。

# Vectoree 模板项目候选清单（高星 / 可部署 / 多行业）

> 生成时间：2026-08-27  
> 参照标准：HKUDS/DeepTutor、bytedance/deer-flow（AI Agent / LLM 应用，依赖「模型 + 数据库 + 登录 + 文件存储」四块后端能力）  
> 数据来源：GitHub Trending（本月，2026-08-27 抓取）；Open WebUI、NextChat 为「一键部署」标杆，star 以仓库主页为准

## 选型标准（对齐两个参考项目）

1. **高星 + 近期活跃**：Trending 本月榜在榜，社区验证充分
2. **小白可部署**：Docker 一键 / Vercel 一键 / 脚本引导，文档完整
3. **契合 Vectoree 四块**：越需要「模型 + 数据库 + 登录 + 文件存储」，越值得接入 Vectoree 后端

---

## 候选清单（按行业）

| 行业方向             | 项目                                      | Star（月增）       | License（商业化）                    | 部署难度                  | 适配 Vectoree 模块     | 说明                                                                                  |
| ---------------- | --------------------------------------- | -------------- | ------------------------------- | --------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| 教育 / 学习          | **HKUDS/DeepTutor**                     | 37.7k（+7.7k/月） | Apache-2.0（可商用）                 | 中（需 Python/Node）      | 模型 + 数据库 + 登录 + 存储 | 标杆参考，已在榜；个性化辅导 Agent                                                                |
| 教育 / 知识          | **bojieli/ai-agent-book**               | 42.7k（+22k/月）  | Apache-2.0（可商用）                 | 低（文档型）                | 模型（可选）             | 《深入理解 AI Agent》书+代码，知识型模板                                                           |
| 教育 / 知识          | **virgilioj94/book-to-skill**           | 26k（+15.9k/月）  | 待确认（GitHub API 404，路径存疑）        | 低                     | 模型                 | 把技术书转成可复用 skill，学习/知识沉淀                                                             |
| 求职 / HR          | **MadsLorentzen/ai-job-search**         | 36.9k（+1.3k/月） | MIT（可商用）                        | 中（本地脚本）               | 模型 + 存储            | 本地 AI 求职：评岗、改简历、写求职信                                                                |
| 通用 Agent / 自动化   | **browser-use/browser-use**             | 111k           | MIT（可商用）                        | 中                     | 模型（+可选 DB）         | 浏览器自动化，让网站对 AI 可操作；运营/爬虫/表单                                                         |
| 通用 Agent / 自动化   | **bytedance/deer-flow**                 | 81k            | MIT（可商用）                        | 中（Docker/Node22/pnpm） | 模型 + 数据库（可选）+ 存储   | 字节开源 SuperAgent：调研 / 写代码 / 子代理 / 沙箱 / 记忆，长链条任务                                      |
| 个人 AI / 研究       | **tinyhumansai/openhuman**              | 38.4k          | GPL-3.0（谨慎·强 copyleft）          | 中（本地优先）               | 模型 + 存储            | 个人 AI：本地记忆 + 代理编排 + 深度研究                                                            |
| 对话 / 知识库（一键部署标杆） | **open-webui/open-webui**               | 高星（主页查）        | 自定义（可商用·禁去品牌*）                  | 低（Docker 一条命令）        | 模型 + 数据库 + 登录 + 存储 | 自托管 AI 平台，内置 RAG、多模型、RBAC，**四块全中**                                                  |
| 对话客户端（一键部署标杆）    | **ChatGPTNextWeb/NextChat**             | 高星（主页查）        | MIT（可商用）                        | 极低（Vercel 1 分钟）       | 模型（轻）              | 前端优先，仅需 API Key；可改为接 Vectoree Gateway                                               |
| 低代码 / 应用构建       | **ToolJet/ToolJet**                     | 37k+（主页查）      | AGPL-3.0（⚠️ 强 copyleft·商业化评估待办） | 低（Docker / 云一键）       | 模型 + 数据库           | 低代码 AI 应用构建器，内置 Postgres、80+ 集成、AI Agent Builder；可自托管，需接 Vectoree 模型网关；AGPL 分发需法律评估 |
| 记忆 / 知识库         | **TencentCloud/TencentDB-Agent-Memory** | 高星（主页查）        | MIT（可商用）                        | 低（Docker 一键）          | 模型 + 数据库 + 存储      | 团队级 Agent 记忆中枢（Chat/Skill/Wiki/CodeGraph，L0–L3），补足「记忆/知识库」分类；需 LLM Key              |

> \* Open WebUI 为自定义许可：允许商用，但禁止去除 / 替换 "Open WebUI" 品牌（≤50 终端用户或获书面授权除外）。若 Vectoree 要将其白标为自有模板，需法律评估或申请企业许可。

> 更新：2026-08-28 根据 **AIGeeks 视频号发布的 GitHub 本周热榜**，已完成筛查并落地——新增 **ToolJet、TencentDB-Agent-Memory** 两个候选（已计入上表），并排除 8 个不适合项目（macro / holehe / diagram-design / semantica / prime-agent / code-graph-rag / Switchyard / needle，理由见下「热榜筛查结论」）。来源：GitHub 本周 Trending；因原图无法读取，项目清单经 WebSearch 核实。

### 本周热榜筛查结论（AIGeeks 视频号榜单）

对 AIGeeks 视频号发布的 GitHub 本周热榜共核查 10 个项目，按「小白可部署 + 挂 Vectoree 后端」模板标准筛选。完整对照如下（已计入候选表的项目同步给出 GitHub 链接）：

| 项目 | 定位 | License | 小白可部署 | 契合 Vectoree 四块 | 筛查结果 | 未入选原因 |
|---|---|---|---|---|---|---|
| [ToolJet](https://github.com/ToolJet/ToolJet) | 低代码 AI 应用构建器 | AGPL-3.0 | ✅ Docker/云一键 | 中高（模型+DB） | ✅ 入选（待评估） | — |
| [TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) | 团队级 Agent 记忆中枢 | MIT | ✅ Docker 一键 | 中（模型+DB+存储） | ✅ 入选 | — |
| [macro](https://github.com/macro-inc/macro) | 统一工作空间（邮件/聊天/文档/CRM/agents） | AGPL-3.0 | ⚠️ 偏 SaaS、自托管文档缺 | 低 | ❌ 未入选 | 强 copyleft（AGPL）+ SaaS 优先、自托管文档缺失，作商用模板风险高 |
| [holehe](https://github.com/megadose/holehe) | OSINT 邮箱足迹枚举工具 | GPL-3.0 | ❌ 安全类工具 | 不契合 | ❌ 未入选 | 安全/OSINT 工具，且 GPL-3.0 强 copyleft，不适合商用模板 |
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | Claude Code 图表 Skill（HTML+SVG） | MIT | ❌ 是 Skill 非应用 | 低 | ❌ 未入选 | 面向开发者的编辑器 Skill，不是可部署应用 |
| [semantica](https://github.com/semantica-agi/semantica) | 图原生 Agent 上下文/决策层 | MIT | ❌ 基础设施 | 低 | ❌ 未入选 | 底层基础设施，非终端用户产品 |
| [prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | 自改进编码/研究 agent harness | MIT | ❌ 开发者工具 | 低 | ❌ 未入选 | 面向工程师的 agent 框架，非小白可部署 |
| [code-graph-rag](https://github.com/vitali87/code-graph-rag) | 代码知识图谱 RAG | MIT | ❌ 需 Docker+Memgraph | 低 | ❌ 未入选 | 开发者工具，依赖图数据库，部署门槛高 |
| [Switchyard](https://github.com/NVIDIA-NeMo/Switchyard) | Rust LLM 路由代理/网关 | Apache-2.0 | ❌ pre-alpha | 低 | ❌ 未入选 | 早期（pre-alpha）基础设施，尚不稳定 |
| [needle](https://github.com/cactus-compute/needle) | 14MB 端侧工具调用模型权重 | MIT/Apache-2.0 | ❌ 模型权重 | 低 | ❌ 未入选 | 是模型权重而非可部署应用，无法作为 clone 模板 |

**小结：**
- 入选 2 个：ToolJet、TencentDB-Agent-Memory（已计入上方候选表）。
- 排除 8 个：均因「非小白可部署（开发者工具 / 基础设施 / 模型权重）」或「强 copyleft 商用风险（macro、holehe）」，不适合作为面向小白的商业化模板。

---

## 推荐优先级（按「接入 Vectoree 价值」排序）

1. [open-webui](https://github.com/open-webui/open-webui) — 四块全中、一键部署，是「小白 clone + Vectoree 后端」最完整的样板。
2. [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) — 标杆参考，验证「教育 + 四块」闭环。
3. [browser-use](https://github.com/browser-use/browser-use) — 自动化赛道，概念直观、容易讲清楚「AI 替你操作网页」。
4. [bytedance/deer-flow](https://github.com/bytedance/deer-flow) — 字节开源 SuperAgent（81k⭐，MIT，持续活跃），验证「研究 + 编码」长链条赛道，与 browser-use 同属自动化方向。
5. [ai-job-search](https://github.com/MadsLorentzen/ai-job-search) — 求职/HR 垂直场景，用户感知强、转化清晰。
6. [ai-agent-book](https://github.com/bojieli/ai-agent-book) / [book-to-skill](https://github.com/virgilioj94/book-to-skill) — 知识/教育补充，适合「学习类」分类。
7. [TencentDB-Agent-Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) — 团队级 Agent 记忆中枢（MIT，Docker 一键），补足「记忆/知识库」分类，与 Open WebUI 同属知识沉淀方向。
8. [ToolJet](https://github.com/ToolJet/ToolJet) — 低代码 AI 应用构建器（37k+⭐，AGPL-3.0 需评估），验证「小白也能搭应用」赛道，需先过商业化法律评估再作为官方模板。

## 覆盖的行业方向

教育、求职/HR、通用自动化、个人研究、对话/知识库、低代码/应用构建、记忆/知识库 —— 已覆盖 7 个方向；若需补「金融」「电商」「客服」「数据分析」，可再按同样标准从 Trending 或 GitHub Search 拉对应领域高星项目。

## 两道硬指标确认方法（选型必过）

### 1. License 是否允许商业化 —— 怎么确认

**方法（任何人都能做，3 步）：**

1. 打开仓库主页 → 看文件列表或右侧边栏的 **LICENSE** 文件；
2. 点开看协议名称；
3. 对照下表判断能否商用。

**协议速查（是否可商用）：**

| 协议                  | 可商用？               | 注意点                           |
| ------------------- | ------------------ | ----------------------------- |
| MIT / BSD           | ✅ 可以               | 保留版权声明即可                      |
| Apache-2.0          | ✅ 可以               | 保留声明 + 注明改动                   |
| MPL-2.0             | ✅ 可以               | 改了的文件需开源                      |
| GPL / AGPL-3.0      | ⚠️ 能商用但有强 copyleft | 分发 / 修改衍生版须开源；SaaS 用 AGPL 风险高 |
| 自定义许可（如 Open WebUI） | ⚠️ 看条款             | 常有反白标 / 反去除品牌条款               |
| 无 LICENSE 文件        | ❌ 默认保留所有权利         | 商用需单独授权                       |

### 2. 是否已在 Vectoree 环境跑通 —— 怎么确认

**这不是 GitHub 上的属性，而是研发做一次「集成验证」**：把项目 clone 下来，把它的后端换成 Vectoree 四块（模型网关 / 数据库 / 登录 / 存储），跑通端到端。

**方法（研发 4 步验证）：**

1. **Clone**：拉取仓库到本地；
2. **接模型**：把项目里的 LLM 调用改为 Vectoree Gateway（OpenAI 兼容 + 项目 Key）；
3. **接数据 / 登录 / 存储**：确认其数据库可切到 Vectoree Postgres、登录走 Vectoree Auth、文件走 Storage；
4. **端到端跑通**：登录 → 调用模型 → 数据落库 → 文件上传，全部成功即「跑通」。

**验证矩阵（每个候选填一张）：**

| 项目    | 模型网关 | 数据库 | 登录 | 存储 | 端到端 | 结论  |
| ----- | ---- | --- | -- | -- | --- | --- |
| （候选名） | ☐    | ☐   | ☐  | ☐  | ☐   | 待验证 |

> 当前 11 个候选的「Vectoree 跑通」状态均为 **待研发验证**；License 已实查见上表（其中 ToolJet 为 AGPL-3.0，商业化分发前需法律评估）。

## 下一步

- 两道硬指标确认方法见上节。优先把 **open-webui** 与 **DeepTutor** 做首批「License 已可商用 + Vectoree 跑通」验证。
- 优先把 **open-webui** 与 **DeepTutor** 作为首批「高星模板 + Vectoree 后端」验证对象。
- 新增 **ToolJet**（AGPL-3.0）需在「License 可商用」确认环节加一道法律评估；**TencentDB-Agent-Memory**（MIT）可直接进入 Vectoree 跑通验证。
- 后续可把本清单扩展为「模板分类页」所需的结构化数据（分类、描述、一键 clone 链接、依赖清单）。

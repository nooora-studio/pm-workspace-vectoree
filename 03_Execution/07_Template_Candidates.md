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

| 行业方向 | 项目 | Star（月增） | 部署难度 | 适配 Vectoree 模块 | 说明 |
|---|---|---|---|---|---|
| 教育 / 学习 | **HKUDS/DeepTutor** | 37.7k（+7.7k/月） | 中（需 Python/Node） | 模型 + 数据库 + 登录 + 存储 | 标杆参考，已在榜；个性化辅导 Agent |
| 教育 / 知识 | **bojieli/ai-agent-book** | 42.7k（+22k/月） | 低（文档型） | 模型（可选） | 《深入理解 AI Agent》书+代码，知识型模板 |
| 教育 / 知识 | **virgilioj *94/book-to-skill** | 26k（+15.9k/月） | 低 | 模型 | 把技术书转成可复用 skill，学习/知识沉淀 |
| 求职 / HR | **MadsLorentzen/ai-job-search** | 36.9k（+1.3k/月） | 中（本地脚本） | 模型 + 存储 | 本地 AI 求职：评岗、改简历、写求职信 |
| 通用 Agent / 自动化 | **browser-use/browser-use** | 111k | 中 | 模型（+可选 DB） | 浏览器自动化，让网站对 AI 可操作；运营/爬虫/表单 |
| 个人 AI / 研究 | **tinyhumansai/openhuman** | 38.4k | 中（本地优先） | 模型 + 存储 | 个人 AI：本地记忆 + 代理编排 + 深度研究 |
| 对话 / 知识库（一键部署标杆） | **open-webui/open-webui** | 高星（主页查） | 低（Docker 一条命令） | 模型 + 数据库 + 登录 + 存储 | 自托管 AI 平台，内置 RAG、多模型、RBAC，**四块全中** |
| 对话客户端（一键部署标杆） | **ChatGPTNextWeb/NextChat** | 高星（主页查） | 极低（Vercel 1 分钟） | 模型（轻） | 前端优先，仅需 API Key；可改为接 Vectoree Gateway |

---

## 推荐优先级（按「接入 Vectoree 价值」排序）

1. **open-webui** — 四块全中、一键部署，是「小白 clone + Vectoree 后端」最完整的样板。
2. **HKUDS/DeepTutor** — 标杆参考，验证「教育 + 四块」闭环。
3. **browser-use** — 自动化赛道，概念直观、容易讲清楚「AI 替你操作网页」。
4. **ai-job-search** — 求职/HR 垂直场景，用户感知强、转化清晰。
5. **ai-agent-book / book-to-skill** — 知识/教育补充，适合「学习类」分类。

## 覆盖的行业方向

教育、求职/HR、通用自动化、个人研究、对话/知识库 —— 已覆盖 5 个方向；若需补「金融」「电商」「客服」「数据分析」，可再按同样标准从 Trending 或 GitHub Search 拉对应领域高星项目。

## 下一步

- 对每个候选：需人工确认 star 最新值、License 是否允许商业化、是否已在 Vectoree 环境跑通。
- 优先把 **open-webui** 与 **DeepTutor** 作为首批「高星模板 + Vectoree 后端」验证对象。
- 后续可把本清单扩展为「模板分类页」所需的结构化数据（分类、描述、一键 clone 链接、依赖清单）。

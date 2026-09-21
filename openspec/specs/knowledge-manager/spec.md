# knowledge-manager Specification

## Purpose
定义知识库管家如何按 PM 的真实节奏触发、成稿、落盘，以及交付文档与内部档案的元数据分档。本能力约束 AI 对知识库的写入行为，不描述 Vectoree 产品功能。

## Requirements

### Requirement: 三态工作模式

管家 MUST 先判定工作模式再决定是否写盘：问询、对话成稿、显式落盘。未听到「存档」「写入工程」或同等明确指令时，MUST NOT 创建或覆盖共享区文件。

#### Scenario: 口述会议先成稿

- **GIVEN** 用户口述会议内容并要求整理成可同步的纪要
- **WHEN** 用户未说存档或写入工程
- **THEN** 成品只出现在对话中，工程内 `03_Execution/05_Meetings/` 无新文件

#### Scenario: 显式存档才落盘

- **GIVEN** 对话里已有完整会议总结
- **WHEN** 用户说把会议记录存档到工程
- **THEN** 写入 `03_Execution/05_Meetings/YYYY_MM/`，文首用引用块放时间与参会，文件无 YAML Front Matter

#### Scenario: 只问归类

- **GIVEN** 用户问某段内容应该放哪
- **WHEN** 现有目录语义能容纳
- **THEN** 只给出目标路径建议，不创建目录或文件

### Requirement: 新建目录仍须确认

同一类内容连续出现且现有目录放不下时，管家 MUST 提出新增目录方案并等待用户确认。MUST NOT 自动创建目录。

#### Scenario: 未确认不建目录

- **GIVEN** 某类内容现有目录都放不下
- **WHEN** 用户尚未确认新增目录方案
- **THEN** 不创建任何新目录，只给出方案等确认

### Requirement: 交付文档不写 YAML 头

会议纪要、会议结论、PRD、规则定稿、方案、技术笔记 MUST NOT 以 YAML Front Matter 开头。必要元数据 MUST 写在正文（文首引用块或「文档信息」表）。YAML 齐全 MUST NOT 作为落盘门槛。

`00_Meta/` 规范与 `02_Knowledge/00_Competitive/` 竞品档案 MAY 保留 YAML。既有旧文档的 YAML MUST NOT 因本能力被批量删除。

#### Scenario: 新建会议无 YAML

- **GIVEN** 用户要求存档一篇新周会总结
- **WHEN** 文件写入 `05_Meetings/`
- **THEN** 文件以标题或引用块开头，不以 `---` YAML 块开头

#### Scenario: 竞品档案可保留 YAML

- **GIVEN** 更新已有竞品矩阵或四件套
- **WHEN** 原文已含 YAML Front Matter
- **THEN** 允许保留该 YAML，不强制删除

### Requirement: 映射表反映 As-Is 且需求池在飞书

管家映射表 MUST 按已落地路径路由，不得把已存在目录标成「规划中」。需求池 MUST 指向飞书多维表格，MUST NOT 在本仓创建 `03_Execution/01_Backlog/`。

#### Scenario: 会议路由

- **GIVEN** 用户要存档产研周会
- **WHEN** 管家归类
- **THEN** 目标为 `03_Execution/05_Meetings/`，结构遵循 `.cursor/rules/meeting-notes.mdc`

#### Scenario: 需求写入飞书而非本仓

- **GIVEN** 用户要补 Epic 或需求池字段
- **WHEN** 管家选择落点
- **THEN** 不新建本仓 Backlog 目录或需求文件，引导或写入飞书多维表格

### Requirement: 禁止补未拍板规则

用户未明确拍板的规则、数字、期限、收回逻辑 MUST NOT 写入交付文档或对话定稿。S0/S1/S2 MUST 视为 sprint 序号，不得当作优先级。

#### Scenario: 不发明收回规则

- **GIVEN** 用户只定了额度有效期一个月
- **WHEN** 整理规则定稿
- **THEN** 文中不出现「到期未充值收回」或用户未说过的领奖窗口

#### Scenario: Sprint 不是优先级

- **GIVEN** 用户提到 S0 或 Sprint 0
- **WHEN** 写入会议或规划文档
- **THEN** 将其表述为第几个 sprint，而不是优先级等级

### Requirement: 内容与规矩分流

写一篇知识库内容走管家 Skill。改目录结构、改 `SKILL.md`、改 `00_Dir_Structure.md` 这类规矩 MUST 走 OpenSpec 变更（`/opsx-propose`），MUST NOT 在闲聊中直接改规范文件。

#### Scenario: 改 Skill 走 OpenSpec

- **GIVEN** 用户要求优化管家 Skill 的落盘纪律
- **WHEN** 该改动属于一类规矩
- **THEN** 先产生或遵循 OpenSpec change，而不是直接覆盖 `SKILL.md` 且无变更记录

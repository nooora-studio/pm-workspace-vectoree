# Design

## Context

见 `proposal.md` 的 Why。当前执行纪律在 [`SKILL.md`](../../../SKILL.md) v1.0，结构 SSOT 在 [`00_Meta/00_Dir_Structure.md`](../../../00_Meta/00_Dir_Structure.md) §8 仍写「共享区 YAML 必填」，与近几周交付文档（周会、PRD）已去 meta 的习惯冲突。会议写法已沉淀在 [`.cursor/rules/meeting-notes.mdc`](../../../.cursor/rules/meeting-notes.mdc)，Skill 未引用。不涉及数据库或应用代码。

## Goals / Non-Goals

**Goals:**

- Skill 成为工作手册：三态、As-Is 映射、会议指针、防幻觉、人名口径、与 OpenSpec 分工。
- 结构规范 §8 与 Skill 同一分档，避免双源。
- OpenSpec apply 指引跟上新闭环。

**Non-Goals:**

- 不改会议 rule 正文、不改命名词表、不迁飞书需求池。
- 不批量清洗旧 YAML。
- 不 fork 自定义 OpenSpec schema。

## Decisions

### 1. 元数据分档，不全面废除

- 交付文档（会议/结论/PRD/规则定稿/方案/技术笔记）：正文承载日期、状态、来源；无 YAML 头。
- 内部档案（`00_Meta/`、竞品四件套与矩阵）：可保留 YAML。
- 备选：全部取消 YAML。否决原因：规范与竞品档案很少外发，保留档案卡仍便于检索字段。

### 2. Skill 重写而不是打补丁

v1.0 的方案特赦段、过期「规划中」表、文末 As-Is 副本应删除或收进正文路由。备选：只加三态附录。否决原因：附录会被旧闭环盖过。

### 3. 映射表示例（As-Is，不新建目录）

| 类型 | 路径 |
|------|------|
| 会议/结论 | `03_Execution/05_Meetings/YYYY_MM/` |
| PRD、规则定稿 | `03_Execution/02_PRD/` |
| 方案、技术笔记 | `03_Execution/03_Solutions/` |
| 调研报告 | `03_Execution/00_Research/` |
| 原型 | `01_Product/05_Prototypes/` |
| Badcase | `01_Product/Badcase/` |
| Figma 插件工程 | `03_Execution/06_Figma_Plugin/` |
| 需求池 | 飞书多维表格，不建 `01_Backlog/` |
| 周报 | `_Personal/Weekly_Reports/` |
| 竞品 | `02_Knowledge/00_Competitive/` |

会议正文结构不重写，只指针到 meeting-notes.mdc。

### 4. Front Matter 相关字段（内部档案）

内部档案若写 YAML，沿用 §8 现有字段：`title, description, author, created, updated, status, version, tags, owners`。交付文档不填这些字段到文件头。

### 5. 数据流（文档，非系统）

```
口述/讨论 → 对话成稿 → 用户确认存档 → 按映射表写入 Markdown
改一类规矩 → OpenSpec proposal/specs/design/tasks → 确认 → apply → archive
```

无数据库 migration。旧交付文档 YAML 留在原处，属文档形态兼容，不是数据迁移。

## Risks / Trade-offs

- [Skill 与 Dir_Structure 改一处漏一处] → 同一次 apply 改两份；README 只改「全员必填 YAML」那句。
- [agent 仍给会议加 YAML] → Skill Step 明确禁止，并在验收场景写死。
- [映射表再次过期] → Skill 删掉本地 As-Is 副本，结构树只指向 Dir_Structure。

# Tasks

## 1. 重写管家 Skill

- [x] 1.1 将 `SKILL.md` 升为 v1.1：写入三态（问询 / 对话成稿 / 显式落盘）、As-Is 映射表、会议 rule 指针、防幻觉、人名与 Sprint 口径、与 OpenSpec 分工；删除过期「规划中」表、方案特赦补丁、文末结构现状副本。验收：文件 version 为 1.1，正文含三态与「未说存档不写盘」，不含「Front Matter 齐全才落盘」。
- [x] 1.2 更新 Skill 的 description/触发列表，覆盖口述纪要、存档、规则打磨、飞书 Epic、技术笔记、周报、新人同步。验收：YAML description 不再把竞品调研写在第一位且包含「存档」「会议」。

## 2. 同步结构 SSOT

- [x] 2.1 改 `00_Meta/00_Dir_Structure.md` §1「Front Matter 必填」为分档原则；§8 写明交付文档不写 YAML、内部档案可保留；§4 As-Is 补上 `00_Research/`、已落地 PRD/会议/原型/Skill v1.1；变更日志记 3.4。验收：全文搜索不到「共享区所有文档必须含」YAML 必填句，As-Is 含 `05_Meetings` 与 `00_Research`。
- [x] 2.2 将 §10.2 提升条件中的「Front Matter」改为「结构已规范化（命名 + 交付文档用文首信息 / 内部档案可用 YAML）」。验收：提升流不再把 YAML 当作共享区唯一门槛。

## 3. 索引与 OpenSpec 配置

- [x] 3.1 改 `README.md` 协作规范：去掉「所有 Markdown 必须含 YAML Front Matter」，改为分档说明；更新记录加一行。验收：README 不再要求全员 YAML。
- [x] 3.2 更新 `openspec/config.yaml` 的 apply.guidance 为字符串数组（修复 CLI 警告），写入三态与「交付文档无 YAML」。验收：`openspec context --json` 不再打印 apply guidance 忽略警告。

## 4. 校验

- [x] 4.1 运行 `openspec validate adapt-knowledge-manager-skill --strict` 并通过。验收：命令退出码 0。

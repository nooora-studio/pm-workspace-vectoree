# Proposal

## Why

管家 Skill v1.0 仍按「建库守门」写：映射表过期、Front Matter 当落盘硬门槛、默认先不写盘。实际节奏是口述成稿、改口径后再存档，YAML 头对外展示会乱。现在要对齐习惯。

## What Changes

- 将 `SKILL.md` 升到 v1.1：问询 / 对话成稿 / 显式落盘三态；映射表改 As-Is；会议指向现有 rule；禁止补用户未拍板规则。
- `00_Dir_Structure.md` §8 改为分档：交付文档不写 YAML，内部档案可保留；As-Is 跟上现状。
- `openspec/config.yaml` 的 apply 指引改成新闭环。
- README 协作摘要去掉「全员必填 YAML」。

## IN SCOPE

- L0：`SKILL.md`、`00_Meta/00_Dir_Structure.md` §1/§8/§4 As-Is、`openspec/config.yaml`、README 一句索引。
- 不新建目录。

## OUT OF SCOPE

- 不改会议 rule 正文、飞书需求池、命名规范词表。
- 不回溯删除旧文档 YAML。
- 不把个人认知写入共享区；不预建空目录。
- 不改 Vectoree 产品功能规格。

## Capabilities

### New Capabilities

- `knowledge-manager`: 知识库管家如何触发、成稿、落盘、与 OpenSpec 分工。

### Modified Capabilities

- （无已有 capability）

## Impact

影响 AI 落盘纪律与交付文档形态。不改产品代码、飞书表格、旧交付文件内容。

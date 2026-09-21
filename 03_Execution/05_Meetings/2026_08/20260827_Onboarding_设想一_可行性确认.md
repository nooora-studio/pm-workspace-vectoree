---
title: "设想一可行性确认：Cursor 安装能否携带 Vectoree 指令并默认后端为 Vectoree"
description: "针对 2026-08-27 Onboarding 会议「设想一：Cursor 安装即携带 Vectoree 指令，实现零配置连接」的可行性确认，区分「指令注入 / 后端默认 / 安装即全局注入」三层，给出结论与推荐落地形态"
author: "魏琼冰"
created: "2026-08-31"
updated: "2026-08-31"
status: "DRAFT"
version: "1.0"
tags: ["onboarding", "cursor", "zero-config", "feasibility", "follow-up"]
owners: ["魏琼冰"]
---

# 设想一可行性确认：Cursor 安装携带 Vectoree 指令 + 默认后端为 Vectoree

**关联会议**：[20260827_Onboarding_Optimization_Meeting.md](./20260827_Onboarding_Optimization_Meeting.md)（设想一，原状态「技术可行性：待评估」）
**确认日期**：2026-08-31
**结论一句话**：指令注入完全可行（机制明确）；「项目后端默认 Vectoree」可行但须厘清边界；「安装 Cursor 时全局注入」不可行，应改为「模板仓库作为载体」实现同等用户效果。

---

## 1. 三层可行性结论

| 维度 | 是否可行 | 说明 |
|------|----------|------|
| A. 把 Vectoree 指令带进 Cursor 项目 | 可行（零配置） | 通过项目级规则 + 官方 skill 实现，Cursor 打开项目即自动加载 |
| B. 项目后端默认设为 Vectoree | 可行（有前提） | 指「用户项目 app 的后端」指向 Vectoree 网关，非 Cursor 编辑器本体；真实调用仍需一次 login + 钱包余额 |
| C. 安装 Cursor 时全局注入 Vectoree 指令 | 不可行 | Cursor 无第三方在安装期注入全局规则的官方钩子，须改走模板仓库载体 |

---

## 2. A 层：指令注入（可行，零配置）

Cursor 提供**项目级规则（Project Rules）**，写入项目即随 Git 版本控制，用户打开项目自动生效，无需任何手动操作：

- **机制一：`.cursor/rules/*.mdc`（推荐，细粒度可控）**
  - 在项目根建 `.cursor/rules/vectoree.mdc`，frontmatter 设 `alwaysApply: true`，内容写 Vectoree 接入规范。
  - Cursor 每次对话自动把该规则注入模型上下文开头。
- **机制二：根目录 `AGENTS.md` / `CLAUDE.md`（纯 Markdown，最简）**
  - Cursor 自动识别并 always-applied 到每次对话，与 Claude Code 兼容。
- **机制三（官方推荐路径）：`npx skills add VectoreeAI/vectoree-skills`**
  - 这是 Vectoree 既定开发者路径中「把指令带进项目」的标准做法，本质就是把 Vectoree 的 skill（agent 指令）写入项目，Cursor / Claude Code 即获得 Vectoree 能力。

> 结论：A 层无需研发造轮子，利用 Cursor 既有规则系统 + Vectoree 既有 skill 即可，对小白是「打开即用」的零配置体验。

示意 `.cursor/rules/vectoree.mdc`：

```mdc
---
description: Vectoree 后端接入规范（默认后端）
globs: **/*
alwaysApply: true
---

# Vectoree 后端规范（本项目默认后端）

本项目后端默认使用 Vectoree（AI MaaS 平台，"Give your agent a backend"）。

## 模型调用（Gateway / Model Plaza）
- OpenAI 兼容接口，base_url 指向 Vectoree 网关：`https://gateway.vectoree.ai/v1`
- 鉴权：请求头 `Authorization: Bearer <VECTOREE_API_KEY>`，Key 来自本项目关联的 Vectoree 项目（执行 `npx @vectoree/cli link` 自动绑定默认 project）
- 选模型：优先 `vectoree/auto`（约 Flash 一半价、同等智能），或 `vectoree/free` 试用

## 其他后端能力
- 用户登录：Vectoree Auth（邮箱 + Google）
- 数据库：Vectoree Postgres（dashboard 或 `vectoree db`）
- 文件存储：Vectoree Storage（Buckets / 上传）

## 本地配置
- 复制 `.env.example` 为 `.env`，填入 `VECTOREE_API_KEY`
- 组织钱包需有余额，网关方可调用（避免「运行才报错」）
```

---

## 3. B 层：后端默认设为 Vectoree（可行，但有边界）

需厘清「默认后端」的准确含义，避免与会议原话产生歧义：

- **可做到**：让「用户 clone 下来的项目（app）」默认把后端指向 Vectoree——即在模板仓库预置环境配置：
  - `.env.example`：`VECTOREE_API_BASE=https://gateway.vectoree.ai/v1`、`VECTOREE_API_KEY=`（占位）、`VECTOREE_AUTH_PROVIDER=vectoree` 等；
  - 项目代码中的模型 / Auth / DB / Storage 调用已改写对接 Vectoree 四块（即《模板方案》4.2 的研发侧二次集成）；
  - 用户执行 `link` 后，默认 project id 写入本地 config，项目即「绑定 Vectoree 后端」。
- **做不到**：把 **Cursor 编辑器自身的模型推理**改指 Vectoree。Cursor 是 IDE，其内置 Agent 用自家模型，第三方无法重定向。可重定向的是「用户自己项目的后端」，不是 Cursor 本体。
- **前提未消除**：指令注入是零配置，但**真实调通网关仍需** ① 用户 Vectoree 账户 ② `login` 拿 Key ③ 组织钱包有余额。所以「打开就能用」= 指令零配置 + 连接一次 login；「报错才知道要充值」的痛点要靠《模板方案》提到的 proactive 余额前置提醒解决，不属于本确认范围。

---

## 4. C 层：安装 Cursor 时全局注入（不可行，改走模板载体）

会议原话设想「用户下载 / 安装 Cursor 的过程中，直接把指令打包带过去」。现实约束：

- Cursor **没有**允许第三方在安装期向用户全局规则注入内容的官方机制（无安装钩子、无第三方全局注入 API）。
- 可行的替代载体，按可控度排序：
  1. **模板仓库内置规则（推荐）**：Vectoree 掌控模板仓库，把 `.cursor/rules/vectoree.mdc` + `AGENTS.md` + `.env.example` 直接提交进模板。小白 clone → 用 Cursor 打开 → 指令已在、后端已指 Vectoree。**这把「设想一」通过「设想二（clone 模板）」落地，用户侧效果与「安装即携带」一致。**
  2. **Cursor Team / Enterprise 规则**：若 Vectoree 建 Cursor 组织并邀用户入队，可用 Team Rules（enforced）对成员强制注入。但仅适用于「已在 Vectoree Cursor 团队内」的用户，覆盖不到泛小白。
  3. **发布 Cursor 扩展**：扩展激活时可写项目规则 / 配置；但仍需用户主动装扩展，非「安装 Cursor 即生效」。

> 建议：把设想一的验收标准从「安装 Cursor 时注入」调整为「clone Vectoree 模板后用 Cursor 打开，Vectoree 指令与默认后端已就绪」。这样既满足小白「打开就用」的体验目标，又落在 Vectoree 可掌控的工程范围内。

---

## 5. 推荐落地形态（结合设想二）

模板仓库（研发侧二次集成后入库，见《模板方案》4.2）建议预置：

| 文件 | 作用 |
|------|------|
| `.cursor/rules/vectoree.mdc` | 项目规则（alwaysApply），Cursor Agent 自动遵循 Vectoree 后端规范 |
| `AGENTS.md` / `CLAUDE.md` | 纯 Markdown 兜底指令，Cursor / Claude Code 通用 |
| `.env.example` | 预置 `VECTOREE_API_BASE` 与占位 Key，小白复制即填 |
| `vectoree.config` / `.vectoree/` | 默认 gateway、默认 project 占位，`link` 后自动补全 |
| 已改写四块的代码 | 模型 / Auth / DB / Storage 对接 Vectoree（研发侧一次性完成） |

用户侧链路：Onboarding 选模板 → 一键 clone（携 `link` 绑默认 project）→ 用 Cursor 打开 → 指令已在、后端已指 Vectoree → 仅补一次 `login` + 充钱包即可跑通。

---

## 6. 对会议待办的更新建议

- 原「技术可行性：Cursor 安装后能否携带提示词 / 项目上下文 | 吴则东 | 待评估」→ 建议更新为：**已确认机制可行，但载体从「Cursor 安装期」调整为「模板仓库内置规则」；指令注入零配置，真实连接仍需一次 login + 钱包余额。**
- 设想一与设想二非互斥，本确认进一步说明：**设想二是设想一的天然载体**，二者合并落地即可实现小白「打开就用 Vectoree 当后端」。

## 7. 待吴则东确认 / 补充

- 模板仓库内 `.cursor/rules` + `AGENTS.md` 双写是否必要，还是仅 `.mdc` 即可（建议双写以兼容 Claude Code 用户）。
- `link` 写入默认 project 的具体落盘路径与字段，需与 CLI 团队对齐。
- 余额前置提醒的触发时机（clone 后 / 首次调用前），归属《模板方案》计费透明子项。

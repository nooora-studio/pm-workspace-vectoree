---
title: "Onboarding 体验优化对齐会议（面向小白用户 · 零配置连接设想）"
description: "围绕董事长反馈的 onboarding 体验问题，对齐「小白用户也能用」的目标与两条架构级设想：Cursor 安装即携带 Vectoree 指令实现零配置连接、Dashboard 模板升级为一键 clone 高星 GitHub 项目"
author: "PM"
created: "2026-08-27"
updated: "2026-08-27"
status: "FINAL"
version: "1.0"
tags: ["meeting", "onboarding", "no-code", "cursor", "architecture", "zero-config"]
owners: ["PM"]
---

# Onboarding 体验优化对齐会议（面向小白用户 · 零配置连接设想）

**会议日期**：2026-08-27
**参会人**：leader、nora
**会议主题**：Onboarding 体验优化方向对齐 —— 从「专业开发者」扩展到「小白用户」，并讨论降低连接门槛的架构级设想

---

## 1. 会议背景与议程

本次会议是 onboarding 优化系列讨论的延续。此前已基于董事长「onboarding 体验不好」的反馈，对 Dashboard 首页、导航结构、计费透明度做了初步体验分析（详见关联资料）。本次会议 leader 给出更明确的方向：**目标用户要从专业开发者 / 研发团队，扩展到「小白用户」，且这是一个架构设计问题，不是局部 UI 优化。**

核心议程：
1. 明确「小白用户」的可达范围与当前最大门槛
2. 讨论降低「安装 + 连接」门槛的设想（Cursor 携带指令）
3. 讨论 Dashboard「模板」区的优化设想（高星 GitHub 项目一键 clone）
4. 确认本需求需要从全局架构视角把控

相关前置背景：
- 董事长反馈 onboarding 体验问题（2026-08-26 沟通）
- Dashboard 体验问题分层分析、Insforge 竞品 UX 借鉴分析（2026-08-27 上午，nora 与 leader 对谈）

---

## 2. 核心讨论要点

### 2.1 目标用户重新定义：从开发者扩展到「小白」

- 此前产品默认用户是会用 CLI / 编程代理的开发者，而董事长与 leader 的共同判断是：**平台希望「小白」也能用**。
- 关键洞察：小白用户可能**连 Cursor 都没安装**。这意味着当前「复制提示词 → 粘贴到编程代理」的链路对这群人是断的——他们连起点工具都不具备。
- 推论：onboarding 的第一道门槛不是「怎么用 Vectoree」，而是「怎么让一个没装工具的人，也能把 agent 跑起来」。

### 2.2 设想一：Cursor 安装即携带 Vectoree 指令，实现零配置连接

- **设想内容**：在用户下载 / 安装 Cursor 的过程中，直接把 Vectoree 的连接指令（prompt / skill / 项目 Key）打包带过去，安装完成后用户侧的 Vectoree 后端已经自动连接好。
- **目标**：消除「先装工具 → 再手动复制提示词 → 再连接」的多步摩擦，让小白用户「打开就能用 Vectoree 当后端」。
- **对标参考**：Insforge 的 CLI / MCP 深度集成思路（见 `02_Knowledge/00_Competitive/Insforge/CLI_MCP_Deep_Integration.md`）——把平台能力前置注入到开发工具链中，而不是让用户回到网页手动配置。
- **待确认（技术可行性）**：Cursor 安装后是否可以把提示词 / 项目上下文携带过去？当前为开放问题，需研发评估安装器 / 扩展机制是否支持注入。

### 2.3 设想二：Dashboard「模板」升级为「高星 GitHub 项目一键 clone」

- **设想内容**：把 Dashboard 里现有的模板区，优化为**精选成熟 / 高 Star 的 GitHub 项目**，用户可一键 clone 到自己的环境；clone 后直接基于该项目，使用 Vectoree 提供的数据库、登录（Auth）等模块。
- **项目来源（leader 原话澄清）**：leader 提到的项目来源具体指 **GitHub Trending（趋势榜）按月 / 年筛选的热门项目**。原话语音转写为「github traing montly yearly」（traing=trending，montly yearly=monthly/yearly 时间维度）；已确认即 GitHub Trending，而非 training。即去 [GitHub Trending](https://github.com/trending) 按 Date range 选 This month / This year，挑选当下活跃、星多的成熟项目作为模板候选。GitHub 官方 Trending 原生支持 Daily / Weekly / Monthly；"年度"维度可借助第三方榜单（如 gitstar-ranking）或 GitHub "best of year" 合集补足。
- **目标**：给小白一个「现成的、能跑的项目」作为起点，而不是从空白项目开始搭。降低「我该做一个什么」的决策成本。
- **分类维度（补充）**：高星项目需按**行业 / 场景**分类呈现（如金融、教育、电商、内容创作、客服、数据分析等），让小白用户能按自身需求快速定位合适的起点项目，而不是在一个大而全的列表里大海捞针。分类标准后续在筛选候选时同步定义（是否按行业、按技术栈、还是按"适合小白"程度混合）。
- **与现有产品模块的衔接**：clone 下来的项目天然可以挂接 Vectoree 的 Database（Postgres）、Auth（邮箱 + Google 登录）、Storage 等模块，形成「模板项目 + Vectoree 后端能力」的组合。
- **结论（leader 已拍板）**：首版（预计 2026-09-04）将 templates 占位区重定位为「高星 GitHub 项目 clone」入口，作为小白 onboarding 核心起点。nora 需从 GitHub Trending 筛选高星、成熟、近期活跃的项目（按金融、教育等行业 / 场景分类）放入 template。
- **待定（架构）**：一键 clone 后的「项目」落在 Vectoree 的什么层级（组织 / 项目 / 模块），需研发定义。

### 2.4 共识：这是架构设计问题，需全局视角

- leader 与 nora 一致认为：本需求**不是局部 UI 优化**，而是涉及「用户从哪进来、工具链怎么接、项目从哪来、模块怎么挂」的全链路架构设计。
- 需要在动手前，先从全局视角把以下链路梳理清楚：
  1. 用户入口（下载 Cursor / 进入网站 / 看到模板）
  2. 连接机制（安装即带指令 / 网页内连接 / 项目 Key 注入）
  3. 项目来源（空白项目 / 一键 clone 高星项目）
  4. 模块挂载（DB / Auth / Storage 如何被小白用户「无感」接入）
  5. 计费透明（小白用户何时知道要充值，见前序体验分析）

---

## 3. 待确认 / 待拍板项

| 类别 | 事项 | 责任方 | 状态 |
|------|------|--------|------|
| 技术可行性 | Cursor 安装后能否携带提示词 / 项目上下文 | 研发 | 待评估 |
| 架构定义 | 一键 clone 项目的层级归属与模块挂载方式 | 产品 + 研发 | 待设计 |
| 范围边界 | 小白链路与开发者链路是否共用同一套入口 / Dashboard | 产品 | 待定 |

---

## 4. 行动项（Action Items）

| 类别 | 责任人 | 事项 | 产出 / 目标 |
|------|--------|------|-------------|
| 会议沉淀 | nora | 本次会议记录沉淀至工程 | 本文件 |
| 产品设计 | nora | 从全局视角拆解 onboarding 架构需求，输出产品设计框架 | 下一步交付（PRD / 方案草案） |
| 技术预研 | 研发 | 评估 Cursor 携带指令 / 提示词的可行性 | 可行性结论 |
| 全局把控 | nora | onboarding 结构全局优化 —— 总体把控 | 架构方案 / 全链路设计，贯穿首版与后续迭代 |
| 首版上线（9.4） | nora + 研发 | 找高星 GitHub 项目（按金融、教育等行业 / 场景分类）替换 Dashboard 当前占位的 templates，支持小白一键 clone | 2026-09-04 上线 |
| 首版上线（9.4） | nora | 规划并产出产品文档（操作手册 / 功能介绍 / QA），存放于 GitHub docs，先规划文档结构 | 2026-09-04 上线 |

### 4.1 首版发布范围（预计 2026-09-04）

首版上线需包含以下两项 onboarding 相关交付，均目标 **2026-09-04** 发布：

1. **templates 占位替换（已确认纳入首版）**：将 Dashboard 当前占位的 templates 区，替换为从 GitHub Trending 筛选的**高星、成熟、近期活跃**的开源项目（按金融、教育等行业 / 场景分类），使小白用户可一键 clone 并基于此使用 Vectoree 的 DB / Auth / Storage 模块。项目筛选标准见 2.3；clone 后层级归属见待确认项（架构待设计）。
2. **产品文档（GitHub docs）**：需在 GitHub 仓库的 `docs/` 下规划并产出产品文档，建议结构包含三类：
   - **操作手册（How-to / 操作指南）**：逐步教用户完成连接、clone、挂载模块等动作；
   - **功能介绍（Features / 概览）**：各模块（Gateway / Auth / Database / Storage）能做什么、适用场景；
   - **QA（常见问题）**：计费、连接失败、充值等高频疑问的直答。
   - 文档结构（目录树、命名、语言）需先规划再产出，避免首版文档零散。

---

## 5. 关键判断（供后续设计参考）

- **门槛顺序**：小白用户的最大门槛是「没装工具」，其次才是「不会连」。设想一针对前者，设想二针对「没有项目起点」。
- **两条设想是互补而非互斥**：设想一解决「连接」，设想二解决「起点」，二者共同构成「小白也能 ship an agent」的闭环。
- **必须守住的产品事实**：模型（Gateway / Model Plaza）仍是核心资产，不能因为做小白链路而弱化；DB / Auth / Storage 是设想二落地的关键后端能力。

---

## 6. 关联资料

- 上线范围事实来源：[launch-checklist.md](file:///Users/yuke/Documents/pm-workspace-vect/launch-checklist.md)
- Insforge 深度集成参考：[CLI_MCP_Deep_Integration.md](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Insforge/CLI_MCP_Deep_Integration.md)
- 前序体验分析：Dashboard 体验问题分层、Insforge UX 借鉴（2026-08-27 上午对谈，待沉淀为独立产出文档）
- 关联会议：[20260825_Model_Onboarding_Meeting.md](file:///Users/yuke/Documents/pm-workspace-vect/03_Execution/05_Meetings/2026_08/20260825_Model_Onboarding_Meeting.md)

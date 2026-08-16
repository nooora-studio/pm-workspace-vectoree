---
title: "Vectoree 知识库"
description: "[Vectoree](https://vectoree.ai/) 对标产品知识库，覆盖产品拆解、竞品分析、调研沉淀"
author: "PM"
created: "2026-08-13"
updated: "2026-08-14"
status: "ACTIVE"
version: "0.8"
tags: ["readme", "knowledge-base", "index", "vectoree", "ai-platform"]
owners: ["PM"]
---

# Vectoree 知识库

> **对标产品**：[Vectoree](https://vectoree.ai/) — 一站式 Agent 开发与上线平台
> **核心目标**：系统化沉淀 Vectoree 产品拆解、竞品分析、调研成果，支撑从 0 到 1 的产品决策
> **阶段**：产品调研 & 拆解期

---

## 这是什么

本知识库是围绕 [Vectoree](https://vectoree.ai/) 建立的产品调研与决策中枢，用于：

1. **产品拆解** — 对 [Vectoree](https://vectoree.ai/) 进行从定位到功能模块的系统化拆解，作为产品设计输入
2. **竞品分析** — 建立直接/间接竞品档案（Insforge / OpenRouter / Clerk / Supabase / Vercel），输出对比矩阵，明确差异化定位
3. **调研沉淀** — 将个人调研草稿、AI 协作工作区、思考日志规范化归档，支持 AI 检索与复用

> 本知识库与 AI 协作深度结合：所有文档均包含结构化 Front Matter，便于 QA 索引与上下文加载。

---

## 目录结构（已实现）

```
pm-workspace-vect/
├── README.md                                                              ← 你在这里
├── SKILL.md                                                               ← 知识库管家 Skill（v1.0）
│
├── 00_Meta/                                                               ← 元规则区
│   ├── 00_Dir_Structure.md                                                ← 知识库结构规范（全库唯一事实来源）
│   └── Knowledge_Structure_Map.html                                       ← 可视化结构图谱（对外展示）
│
├── 01_Product/                                                            ← 事实层 · 产品事实（团队共享）
│   ├── 00_Overview/                                                       ← 产品概述
│   │   └── 20260813_Vectoree_Product_Deconstruction_Report.md            ← Vectoree 产品拆解报告
│   ├── 05_Prototypes/                                                     ← ✅ 新增：Vectoree 高保真原型 demo（15 页）
│   │   ├── README.md                                                      ← 维护说明
│   │   ├── index.html                                                     ← 完整首页（根入口）
│   │   ├── _Assets/                                                       ← 共享设计系统
│   │   ├── 02_Auth/                                                       ← 登录注册
│   │   └── 03_Dashboard/                                                  ← 控制台 12 模块
│   └── _Assets/                                                           ← 产品素材
│       └── Screenshots/                                                   ← 产品截图存档（22 张）
│
├── 02_Knowledge/                                                          ← 事实层 · 外部事实（团队共享）
│   └── 00_Competitive/                                                    ← 竞品档案（矩阵 + 四件套）
│       ├── Competitor_Matrix.md                                           ← 竞品横向对比矩阵
│       ├── Insforge/                                                      ← 直接竞品
│       │   ├── Profile.md
│       │   ├── Features.md
│       │   ├── Pricing.md
│       │   └── SWOT.md
│       ├── OpenRouter/                                                    ← 间接竞品：模型聚合网关
│       │   ├── Profile.md
│       │   ├── Features.md
│       │   ├── Pricing.md
│       │   └── SWOT.md
│       ├── Clerk/                                                         ← 间接竞品：用户认证
│       │   ├── Profile.md
│       │   ├── Features.md
│       │   ├── Pricing.md
│       │   └── SWOT.md
│       ├── Supabase/                                                      ← 间接竞品：BaaS 数据库
│       │   ├── Profile.md
│       │   ├── Features.md
│       │   ├── Pricing.md
│       │   └── SWOT.md
│       └── Vercel/                                                        ← 间接竞品：部署平台
│           ├── Profile.md
│           ├── Features.md
│           ├── Pricing.md
│           └── SWOT.md
│
└── _Personal/                                                             ← 个人认知层（不共享）
    ├── Glossary.md                                                        ← 术语词典
    ├── Industry_Notes.md                                                  ← 行业认知
    ├── Learning_Notes.md                                                  ← 学习笔记
    ├── Product_Discovery_Journal.md                                       ← 调研日志（思考/疑问/假设）
    └── Drafts/                                                            ← AI 协作草稿
        └── Product_Deconstruction_Workspace.md                            ← 拆解工作台
```

> 完整结构规范见 [00_Dir_Structure.md](file:///Users/yuke/Documents/pm-workspace-vect/00_Meta/00_Dir_Structure.md)。

---

## 模块说明

### 00_Meta — 元规则区

知识库的「规则手册」。定义目录结构、命名规范、版本控制、更新频率等元信息。

| 文件 | 用途 | 状态 |
|------|------|------|
| [00_Dir_Structure.md](file:///Users/yuke/Documents/pm-workspace-vect/00_Meta/00_Dir_Structure.md) | 知识库结构规范：分层架构（事实/产出/认知）、目录结构、命名规范、文档生命周期、操作指南 | ✅ ACTIVE (v3.0) |
| [Knowledge_Structure_Map.html](file:///Users/yuke/Documents/pm-workspace-vect/00_Meta/Knowledge_Structure_Map.html) | 可视化结构图谱：三层架构、目录树、治理流程、命名速查，浏览器打开可对外分享 | ✅ ACTIVE |

### 01_Product — 事实层 · 产品事实（团队共享）

[Vectoree](https://vectoree.ai/) 产品的既定事实：定位、功能逻辑、功能边界、技术模型、设计规范、原型。

| 文件 / 目录 | 用途 | 状态 |
|-------------|------|------|
| [20260813_Vectoree_Product_Deconstruction_Report.md](file:///Users/yuke/Documents/pm-workspace-vect/01_Product/00_Overview/20260813_Vectoree_Product_Deconstruction_Report.md) | [Vectoree](https://vectoree.ai/) 标杆产品拆解报告（定位/功能模块/用户路径/定价） | 📝 DRAFT |
| [05_Prototypes/](file:///Users/yuke/Documents/pm-workspace-vect/01_Product/05_Prototypes/index.html) | [Vectoree](https://vectoree.ai/) 高保真原型 demo（1 Landing + 2 Auth + 12 Dashboard + 设计系统） | ✅ ACTIVE |
| [Screenshots/](file:///Users/yuke/Documents/pm-workspace-vect/01_Product/_Assets/Screenshots/) | [Vectoree](https://vectoree.ai/) 截图存档（首页/Dashboard/注册流程等 22 张） | ✅ 已归档 |

### _Personal — 个人认知层（不共享）

术语词典、行业认知、学习笔记、调研草稿、AI 协作工作区，不随知识库共享给团队。

| 文件 / 目录 | 用途 | 状态 |
|-------------|------|------|
| [Product_Discovery_Journal.md](file:///Users/yuke/Documents/pm-workspace-vect/_Personal/Product_Discovery_Journal.md) | 调研日志：记录思考碎片、疑问、假设、灵感 | 📝 DRAFT |
| [Drafts/Product_Deconstruction_Workspace.md](file:///Users/yuke/Documents/pm-workspace-vect/_Personal/Drafts/Product_Deconstruction_Workspace.md) | 拆解工作台：与 AI 协作拆解产品的主战场，拆完后沉淀至正式文档 | 📝 DRAFT |

### 02_Knowledge — 事实层 · 外部事实

关于外部世界的既定事实档案：竞品、用户画像、市场数据。

#### 00_Competitive 竞品档案

覆盖 **1 家直接竞品 + 4 家间接竞品**，每家竞品采用 4 文档标准结构：

| 竞品 | 类型 | Profile | Features | Pricing | SWOT |
|------|------|---------|----------|---------|------|
| **Insforge** | 🔴 直接竞品 | 🔍 REVIEW | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT |
| **OpenRouter** | 🟡 间接（模型聚合） | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT |
| **Clerk** | 🟡 间接（认证） | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT |
| **Supabase** | 🟡 间接（BaaS） | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT |
| **Vercel** | 🟡 间接（部署） | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT | 📝 DRAFT |

全局对比矩阵：
- [Competitor_Matrix.md](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Competitor_Matrix.md) — 核心维度横向对比

---

## 命名规范

| 规则 | 示例 |
|------|------|
| 文件名：每个单词首字母大写，下划线分隔 | `Product_Discovery_Journal.md` |
| 归档报告：`YYYYMMDD_[Subject]_[Status].md` | `20260813_Vectoree_Product_Deconstruction_Report.md` |
| 个人调研草稿：统一存放于 `_Personal/` 目录 | — |
| 大型图文文档：单文档单目录（README + Content + assets/images） | — |

> 完整规范见 [00_Dir_Structure.md](file:///Users/yuke/Documents/pm-workspace-vect/00_Meta/00_Dir_Structure.md)。

---

## 文档状态说明

每个文档 Front Matter 中的 `status` 字段：

| 状态 | 含义 |
|------|------|
| **DRAFT** | 草稿 / 进行中，内容可能不完整或待确认 |
| **REVIEW** | 待评审，内容基本完整但需要多方确认 |
| **FINAL** | 已定稿，内容可作为决策依据 |
| **ARCHIVED** | 已归档，仅供历史参考 |
| **ACTIVE** | 持续维护中（如本 README） |

---

## 协作工作流

### 产品拆解工作流

```
_Assets/Screenshots/ 截图采集
      ↓
_Personal/Product_Discovery_Journal.md  记录思考/疑问/假设
      ↓
_Personal/Drafts/Product_Deconstruction_Workspace.md  AI 协作拆解主战场
      ↓
01_Product/00_Overview/  输出拆解报告（沉淀至共享区）
```

### 竞品分析工作流

```
Profile.md  竞品基础档案
      ↓
Features.md → Pricing.md → SWOT.md  逐层深入
      ↓
Competitor_Matrix.md  汇总入横向对比矩阵
```

---

## 快速开始

1. **初次了解**：先读本 README → 再看 [00_Dir_Structure.md](file:///Users/yuke/Documents/pm-workspace-vect/00_Meta/00_Dir_Structure.md) 了解完整蓝图
2. **标杆产品体验**：访问 [Vectoree 官网](https://vectoree.ai/) 感受实际产品 → 再读 [拆解报告](file:///Users/yuke/Documents/pm-workspace-vect/01_Product/00_Overview/20260813_Vectoree_Product_Deconstruction_Report.md) 对照理解设计思路
3. **竞争格局**：查阅 [Competitor_Matrix.md](file:///Users/yuke/Documents/pm-workspace-vect/02_Knowledge/00_Competitive/Competitor_Matrix.md) 及各家竞品档案

---

## 文档 Front Matter 模板

所有文档必须包含以下 Front Matter 元数据块：

```yaml
---
title: "文档标题"
description: "一句话描述文档用途与内容范围"
author: "作者"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
status: "DRAFT | REVIEW | FINAL | ARCHIVED | ACTIVE"
version: "x.y"
tags: ["tag1", "tag2"]
owners: ["Owner_Name"]
---
```

---

## 更新记录

- 2026-08-16：工程推送至 GitHub（yuki-studio/pm-workspace-vectorre），启用 git 增量更新流程。

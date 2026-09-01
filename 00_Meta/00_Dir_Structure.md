---
title: "知识库结构规范"
description: "知识库分层架构（事实/产出/认知）、目录结构、命名规范、文档生命周期与操作指南——全库唯一结构事实来源"
author: "PM"
created: "2026-08-13"
updated: "2026-08-28"
status: "ACTIVE"
version: "3.2"
tags: ["meta", "structure", "specification", "governance", "naming"]
owners: ["PM"]
---

# 知识库结构规范 v3.2

> **本文件是全库唯一的结构事实来源。**
> 所有目录创建、文件命名、内容归档都必须遵循本规范。
> 结构变更时，本文件同步更新，README.md 同步引用。

---

## 0. 核心分层模型：事实 · 产出 · 认知

知识库维护的底层逻辑是三层边界。**一切内容先归类，再决定放哪、要不要放。**

### 0.1 三个本质

| 本质 | 定义 | 放什么 | 归属 |
|------|------|--------|------|
| **事实（知识）** | 沉淀的客观真相，团队对齐、可复用 | 产品事实 + 外部事实 | 共享 |
| **产出（文档）** | 工作的交付物，过程性 | 调研报告 / 需求 / 方案 / 规划 / 会议 / 复盘 | 共享 |
| **认知（个人）** | 我学到/理解的，主观 | 术语词典 / 行业认知 / 学习笔记 / 草稿 | 不共享 |

### 0.2 判断规则

- 内容能被团队**直接引用为事实**？→ 事实（知识），进共享区
- 内容是一份**做完的交付物**？→ 产出（文档），进共享区
- 内容是**我个人的理解/学习**？→ 认知（个人），进 `_Personal/`，不共享

### 0.3 调研拆分（关键规则）

一次调研会产生两类东西，**必须分开存放**：

| 调研产出 | 性质 | 去向 |
|----------|------|------|
| 事实档案（竞品 Profile 四件套、用户画像、市场数据） | 事实 | `02_Knowledge/` |
| 调研报告（本次调研的分析结论） | 产出 | `03_Execution/00_Research/` |

> **原则：档案沉淀事实，报告记录过程。** 报告是一次性的，档案要长期维护、持续更新。

---

## 1. 设计原则

| 原则 | 含义 | 反模式（禁止） |
|------|------|----------------|
| **事实/产出/认知分层** | 知识=事实，产出=文档，认知归个人 | 把术语词典/行业认知塞进共享区 |
| **按需创建** | 用到才建目录/文件，不预创空壳 | 提前规划 60 个文件然后 90% 不存在 |
| **单一来源** | 每类信息只有一个权威存放位置 | PRD 模板同时出现在两个目录 |
| **个人/共享分层** | 个人草稿与团队共享内容物理隔离 | 个人思考碎片混在产品知识区 |
| **归档只进不出** | `_ARCHIVED/` 内容不再修改，需更新则新建 | 从归档区拉出来改完再放回去 |
| **Front Matter 必填** | 共享区所有文档必须含结构化元数据 | 裸 Markdown 无元数据 |

---

## 2. 四层架构

```
┌─────────────────────────────────────────────────────┐
│  L0 元规则层 (00_Meta/)                               │
│  结构规范、模板库、索引 —— 全局约束                     │
├─────────────────────────────────────────────────────┤
│  L1 事实层（知识）                                    │
│  01_Product/   产品事实（我们的产品「是什么」）        │
│  02_Knowledge/ 外部事实（竞品/用户/市场「是什么」）     │
├─────────────────────────────────────────────────────┤
│  L2 产出层（文档）                                    │
│  03_Execution/ 决策与交付（我们「决定了/交付了什么」）  │
├─────────────────────────────────────────────────────┤
│  L3 个人认知层 (_Personal/)                           │
│  术语/行业/学习/草稿 —— 不共享，成熟后提升到 L1/L2     │
└─────────────────────────────────────────────────────┘
```

### 层级规则

| 层级 | 目录 | 共享 | Front Matter | 说明 |
|------|------|------|-------------|------|
| L0 元规则 | `00_Meta/` | ✅ | ✅ 必填 | 规范、模板、索引 |
| L1 事实-产品 | `01_Product/` | ✅ | ✅ 必填 | 定位/功能/边界/技术/设计 |
| L1 事实-外部 | `02_Knowledge/` | ✅ | ✅ 必填 | 竞品/用户/市场事实档案 |
| L2 产出 | `03_Execution/` | ✅ | ✅ 必填 | 调研/需求/方案/规划/会议/复盘 |
| L3 个人 | `_Personal/` | ❌ | 推荐 | 术语/行业/学习/草稿 |

---

## 3. 目标结构树（To-Be）

> 规划占位不建实体目录，创建时按此编号落地。当前已存在的目录见第 4 节 As-Is。

```
pm-workspace-vect/
├── README.md                       # 知识库首页入口
├── SKILL.md                        # 知识库管家 Skill（v1.0）
│
├── 00_Meta/                        # L0 元规则层
│   ├── 00_Dir_Structure.md         # ← 本文件：结构规范
│   ├── Knowledge_Structure_Map.html# 可视化结构图谱
│   └── Templates/                  # 模板库（全库唯一模板来源）
│       ├── Template_Product_Overview.md
│       ├── Template_Feature_Spec.md
│       ├── Template_Scope.md
│       ├── Template_Technical_Model.md
│       ├── Template_Design_System.md
│       ├── Template_PRD.md
│       ├── Template_Research_Report.md
│       ├── Template_Competitor_Profile.md
│       ├── Template_Competitor_Features.md
│       ├── Template_Competitor_Pricing.md
│       ├── Template_Competitor_SWOT.md
│       ├── Template_Competitor_Matrix.md
│       ├── Template_Solution.md
│       ├── Template_Roadmap.md
│       ├── Template_Meeting_Notes.md
│       ├── Template_Retrospective.md
│       └── Template_ADR.md
│
├── 01_Product/                     # L1 事实层 · 产品事实
│   ├── 00_Overview/                # 定位与愿景
│   ├── 01_Features/                # 功能逻辑（功能怎么工作、业务规则）
│   ├── 02_Scope/                   # 功能边界（做什么/不做什么）
│   ├── 03_Technical/               # 技术模型（架构/数据/技术栈）
│   ├── 04_Design/                  # 设计规范（主题色/design token/组件）
│   ├── 05_Prototypes/              # 原型与交互说明
│   └── _Assets/                    # 截图/设计资源
│
├── 02_Knowledge/                   # L1 事实层 · 外部事实
│   ├── 00_Competitive/             # 竞品档案（矩阵 + 四件套）
│   ├── 01_User/                    # 用户画像 —— 需要时创建
│   └── 02_Market/                  # 市场数据 —— 需要时创建
│
├── 03_Execution/                   # L2 产出层 · 决策交付
│   ├── 00_Research/                # 调研报告（竞品/用户/市场）
│   ├── 01_Backlog/                 # 需求池
│   ├── 02_PRD/                     # 需求文档
│   ├── 03_Solutions/               # 方案文档
│   ├── 04_Planning/                # 规划文档（路线图/里程碑）
│   ├── 05_Meetings/                # 会议纪要 · 决策记录
│   ├── 06_Retrospective/           # 复盘与数据
│   └── _ARCHIVED/                  # 已归档（只进不出）
│
└── _Personal/                      # L3 个人认知层（不共享）
    ├── Glossary.md                 # 术语词典
    ├── Industry_Notes.md           # 行业认知
    ├── Learning_Notes.md           # 学习笔记
    ├── Product_Discovery_Journal.md# 调研日志
    ├── Drafts/                     # AI 协作草稿
    └── Weekly_Reports/             # 个人周进度汇报（README + 模板 + YYYY_MM/周报文件）
```

---

## 4. 当前实际结构树（As-Is）

> 以下为 v3.0 落地后的实际结构，不含规划占位。

```
pm-workspace-vect/
├── README.md
├── SKILL.md                        # 知识库管家 Skill v1.0
│
├── 00_Meta/
│   ├── 00_Dir_Structure.md         # ← 本文件
│   ├── Knowledge_Structure_Map.html
│   └── Templates/                  # 模板库（全库唯一模板来源；已落 Template_PRD / Template_Solution）
│
├── 01_Product/                     # 事实层 · 产品事实
│   ├── 00_Overview/
│   │   └── 20260813_Vectoree_Product_Deconstruction_Report.md
│   └── _Assets/
│       └── Screenshots/            # 22 张截图
│
├── 02_Knowledge/                   # 事实层 · 外部事实
│   └── 00_Competitive/             # 竞品档案
│       ├── Competitor_Matrix.md    # 对比矩阵（总）
│       ├── Insforge/               # 四件套（分）
│       │   ├── Profile.md  Features.md  Pricing.md  SWOT.md
│       ├── OpenRouter/
│       ├── Clerk/
│       ├── Supabase/
│       └── Vercel/
│
├── 03_Execution/                   # L2 产出层 · 决策交付（需求池在飞书多维表格，暂不落地）
│   ├── 02_PRD/                     # 需求文档（路径就位，文档待 PM 填写）
│   ├── 03_Solutions/               # 方案文档（方案/提案交付物；已落入：Onboarding Template 产品方案、产品文档结构规划）
│   ├── 04_Planning/                # 规划文档（已存在）
│   ├── 05_Meetings/                # 会议纪要（已存在）
│   └── 06_Figma_Plugin/            # Figma 插件（已存在）
└── _Personal/                      # 个人认知层（不共享）
    ├── Product_Discovery_Journal.md
    ├── Drafts/
    │   └── Product_Deconstruction_Workspace.md
    └── Weekly_Reports/
        ├── README.md
        └── Template/
            └── Template_Weekly_Report.md
```

---

## 5. 目录命名规范

| 规则 | 格式 | 示例 |
|------|------|------|
| 顶级目录 | `NN_Name/` 两位数字前缀 + PascalCase | `01_Product/`、`02_Knowledge/` |
| 子目录 | `NN_Name/` 按规划编号（区内独立） | `00_Overview/`、`01_Features/` |
| 特殊目录 | `_Name/` 下划线前缀（排序靠后/非内容目录） | `_Assets/`、`_ARCHIVED/`、`_Personal/` |
| 竞品目录 | 竞品名 PascalCase，**不加数字前缀** | `Insforge/`、`OpenRouter/` |
| 月份归档 | `YYYY_MM/` | `2026_08/` |

### 编号规则（按规划编号，区内独立）

> **核心规则：编号由规划蓝图确定，每个目录内部从 `00` 开始按语义排序；规划中的编号是预留位，创建时按此落地，不做接续 +1。**
>
> - **`01_Product/`** → `00_Overview/`（已有）、`01_Features/`、`02_Scope/`、`03_Technical/`、`04_Design/`、`05_Prototypes/`
> - **`02_Knowledge/`** → `00_Competitive/`（已有）、`01_User/`、`02_Market/`
> - **`03_Execution/`** → `00_Research/`、`01_Backlog/`、`02_PRD/`、`03_Solutions/`、`04_Planning/`、`05_Meetings/`、`06_Retrospective/`
> - 编号是「区内排序」，不是「全局唯一 ID」；规划占位保证同类目录在各区编号一致、排序稳定
> - 未创建的规划目录**不建实体目录**，编号仅作预留；创建时直接使用规划编号

### 数字前缀分配

| 前缀 | 语义 | 示例 |
|------|------|------|
| `00_` | 区内第一个规划位置（概述/首要内容） | `00_Overview/`、`00_Competitive/`、`00_Research/` |
| `01_` ~ `09_` | 后续规划位置，按语义顺序 | `01_Features/`、`01_User/` |
| `_` | 辅助目录（素材/归档/个人） | `_Assets/`、`_ARCHIVED/`、`_Personal/` |

### 依赖创建规则（总分一体）

> **核心规则：存在「总分 / 父子 / 引用」依赖的文件或目录，必须一起创建；不允许只建总不建分、或只建分不建总。**

| 依赖场景 | 创建要求 | 反例（禁止） |
|----------|----------|-------------|
| 竞品目录 vs 档案四件套 | 创建 `Xxx/` 时一次建齐 Profile / Features / Pricing / SWOT | 只建 Profile.md |
| 竞品条目 vs 对比矩阵 | 新增竞品必须同步在 `Competitor_Matrix.md` 登记一行 | 有档案无矩阵行 |
| 产品总览 vs 细分文档 | 创建总览报告时，被引用的功能/技术文档同步建骨架 | 报告链接指向不存在的文档 |
| 调研报告 vs 事实档案 | 调研完成后，事实提炼到 `02_Knowledge/`，报告存 `03_Execution/00_Research/` | 只写报告不沉淀事实 |
| 父目录 vs 子目录 | 创建父目录时，规划中的核心子目录一并创建 | 有父目录无子文件 |

**原则：宁可多建一个模板骨架，不可留一个悬空引用。**

### 竞品档案下一层级规范

```
00_Competitive/
├── Competitor_Matrix.md      ← 总：横向对比矩阵
└── [竞品名]/                 ← 分：每家竞品四件套
    ├── Profile.md            ← 定位/规模/团队/模块/技术栈
    ├── Features.md           ← 功能清单与差异化
    ├── Pricing.md            ← 定价与套餐
    └── SWOT.md               ← 优劣势/机会/威胁
```

> 内容级规范（每个文件写什么）由 `00_Meta/Templates/` 下的竞品模板承载，结构级规范到此为止，不再下探。

### 新增目录时的决策树

```
需要新建目录？
├── 是团队共享内容吗？
│   ├── 是 → 属于事实还是产出？
│   │        ├── 事实 → 01_Product/ 或 02_Knowledge/
│   │        └── 产出 → 03_Execution/
│   │        └── 编号按规划确定（查 §3），通用资源排前
│   └── 否 → 个人认知 → _Personal/（PascalCase，不加数字前缀）
├── 是临时/历史内容吗？
│   └── 是 → 归入对应区的 _ARCHIVED/
├── 是素材/资源吗？
│   └── 是 → 归入 01_Product/_Assets/ 或对应区 _Assets/
└── 与已有/规划文件存在总分依赖吗？（总分/父子/引用）
    └── 是 → 按「依赖创建规则」总分一起创建
```

---

## 6. 文件命名规范

### 6.1 通用文件

| 规则 | 格式 | 示例 |
|------|------|------|
| PascalCase + 下划线分隔 | `Word_Word.md` | `Product_Discovery_Journal.md` |
| 全小写特例 | 仅 README.md、SKILL.md | `README.md` |
| 竞品档案固定四件套 | `Profile.md` / `Features.md` / `Pricing.md` / `SWOT.md` | 每家竞品统一 |
| 对比矩阵 | `Competitor_Matrix.md` | 放在竞品区根目录 |
| 个人认知文件 | PascalCase | `Glossary.md`、`Industry_Notes.md` |

### 6.2 报告类文件（日期前缀）

```
YYYYMMDD_[Target]_[Type].md
```

| 部分 | 说明 | 示例 |
|------|------|------|
| `YYYYMMDD` | 完成日期 | `20260813` |
| `[Target]` | 分析对象名 | `Vectoree`、`Insforge` |
| `[Type]` | 文档类型 | `Product_Deconstruction_Report`、`Competitor_Analysis` |

**示例**：`20260813_Vectoree_Product_Deconstruction_Report.md`，存于 `01_Product/00_Overview/`。

### 6.3 会议纪要

```
YYYYMMDD_[Topic]_Meeting.md
```

**示例**：`20260813_Kickoff_Meeting.md`，存放于 `03_Execution/05_Meetings/YYYY_MM/`。

### 6.4 PRD 文件

```
NN_[Feature_Name]_PRD.md
```

**示例**：`01_Model_Marketplace_PRD.md`，存放于 `03_Execution/02_PRD/`。

### 6.5 版本化文件

同一文档需要保留历史版本时：

```
[Original_Name].md              ← 当前版本
_ARCHIVED/
└── [Original_Name]_v1.md       ← 旧版本（加 _vN 后缀）
```

> 不要用 `v2`、`v3` 覆盖同一文件名——旧版本进 `_ARCHIVED/`，当前版本永远是无后缀的原始名。

---

## 7. 截图与素材命名规范

### 7.1 截图命名

```
[PageName]-[Feature/Section].png
```

| 部分 | 说明 | 示例 |
|------|------|------|
| `[PageName]` | 页面名，PascalCase | `Homepage`、`Dashboard` |
| `[Feature]` | 功能/区块描述，可用连字符多级 | `Auth`、`Model-Plaza`、`Api-Keys` |

**示例**：

| ✅ 正确 | ❌ 错误 | 原因 |
|---------|---------|------|
| `Dashboard-Auth.png` | `Dashboard-01.png` | 编号无语义 |
| `Homepage-03-Workflow.png` | `Homepage-01.png` | 无功能描述 |
| `Dashboard-Api-Keys.png` | `Dashboard- Logs.png` | 多余空格 |

### 7.2 截图存放

- 产品截图 → `01_Product/_Assets/Screenshots/`
- 竞品截图 → `02_Knowledge/00_Competitive/[Competitor]/_Assets/`（按需创建）
- 设计稿导出 → `01_Product/_Assets/Exports/`（按需创建）

---

## 8. Front Matter 规范

### 8.1 必填字段（共享区所有文档）

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

### 8.2 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 文档标题，与文件名语义一致 |
| `description` | string | 一句话描述，用于检索摘要 |
| `author` | string | 创建者 |
| `created` | date | 创建日期 `YYYY-MM-DD` |
| `updated` | date | 最后修改日期 `YYYY-MM-DD` |
| `status` | enum | 文档状态（见第 9 节） |
| `version` | string | 语义版本号 `x.y`，小改 +0.1，大改 +1.0 |
| `tags` | string[] | 分类标签，小写下划线 |
| `owners` | string[] | 负责人列表 |

### 8.3 个人区（_Personal/）

Front Matter 推荐但非必填。个人草稿可以只有 `title` 和 `updated`。

---

## 9. 文档状态流转

```
DRAFT → REVIEW → FINAL → ARCHIVED
  │                        ↑
  └──── 直接归档 ──────────┘

ACTIVE：持续维护型文档（README、本规范），不进入 ARCHIVED
```

| 状态 | 含义 | 谁可以修改 |
|------|------|-----------|
| **DRAFT** | 草稿/进行中，内容可能不完整 | 作者 |
| **REVIEW** | 待评审，内容基本完整，需确认 | 作者 + 评审人 |
| **FINAL** | 已定稿，可作为决策依据 | 仅 Owner 批准后修改 |
| **ARCHIVED** | 已归档，仅供历史参考 | 不再修改，需更新则新建 |
| **ACTIVE** | 持续维护（README、规范文档） | Owner |

### 状态变更规则

- DRAFT → REVIEW：作者确认内容完整，提交评审
- REVIEW → FINAL：评审通过，Owner 确认
- FINAL → ARCHIVED：内容过期或被替代，移入 `_ARCHIVED/`
- FINAL → DRAFT：需要大幅修订时，状态回退并新建版本

---

## 10. 内容提升流（核心治理机制）

### 10.1 提升路径

```
_Personal/（厨房）                    共享区（餐厅）
─────────────────                    ─────────────────

Product_Discovery_Journal.md    →    02_Knowledge/00_Competitive/[竞品]/
（竞品调研笔记，个人思考）              （竞品事实档案，团队可引用）

_Personal/Drafts/[工作台].md    →    01_Product/00_Overview/
（AI 协作草稿，未验证）                （产品拆解报告，已验证结论）

_Personal/Learning_Notes.md     →    02_Knowledge/01_User/ 或 02_Market/
（学习笔记，个人理解）                 （提炼为外部事实，团队共识）

_Personal/Drafts/[调研草稿].md  →    03_Execution/00_Research/
（调研过程草稿）                      （调研报告，决策依据）
```

> 术语词典、行业认知**一般不提升**（属个人认知），除非形成团队需要对齐的客观事实。

### 10.2 提升条件

从个人区提升到共享区，**必须同时满足**：

1. ✅ 内容已验证（非假设/猜测）
2. ✅ 结构已规范化（遵循命名 + Front Matter）
3. ✅ 他人可独立理解（不含个人 shorthand）
4. ✅ Owner 确认可共享

### 10.3 提升操作

```
1. 在共享区目标目录创建文件（遵循命名规范）
2. 填充 Front Matter（status 设为 DRAFT 或 REVIEW）
3. 将内容从个人草稿迁移，清理个人 shorthand
4. 个人区原文件可保留或删除（建议保留并标注"已提升至 [路径]"）
```

---

## 11. 归档规则

### 11.1 何时归档

| 场景 | 操作 |
|------|------|
| 文档被新版本替代 | 旧版本移入 `_ARCHIVED/`，加 `_vN` 后缀 |
| 内容已过期 | 状态改为 ARCHIVED，移入 `_ARCHIVED/` |
| 竞品不再跟踪 | 整个竞品目录移入 `_ARCHIVED/` |
| 调研报告已完成使命 | 报告移入 `_ARCHIVED/`，事实档案保留在 `02_Knowledge/` |
| 需求已实现/废弃 | 需求文档移入 `_ARCHIVED/` |

### 11.2 归档规则

- **只进不出**：一旦进入 `_ARCHIVED/`，不再修改内容
- **保留元数据**：Front Matter 的 `status` 改为 `ARCHIVED`，`updated` 更新为归档日期
- **新建替代**：需要更新归档内容时，在正式目录新建文件，不拉回归档区修改
- **每个区独立归档**：`01_Product/_ARCHIVED/`、`03_Execution/_ARCHIVED/` 各自独立

### 11.3 清理周期

- **每季度盘点**：检查死链、空目录、过期内容
- 空目录立即删除
- 过期内容归档或删除

---

## 12. 新增文档操作指南

### 场景 A：新增竞品档案（事实）

```
1. 在 02_Knowledge/00_Competitive/ 下创建竞品目录（PascalCase 命名）
2. 创建四件套：Profile.md / Features.md / Pricing.md / SWOT.md（一次建齐，总分一体）
3. 使用模板（00_Meta/Templates/Template_Competitor_*.md）填充
4. 在 Competitor_Matrix.md 中添加该竞品行（总分一体，必须同步）
5. 在 README.md 竞品表格中添加该竞品行
```

### 场景 B：新增调研报告（产出）

```
1. 在 03_Execution/00_Research/ 下创建 YYYYMMDD_[Target]_[Type].md
2. 使用模板（00_Meta/Templates/Template_Research_Report.md）
3. 调研得到的事实提炼到 02_Knowledge/ 对应档案（总分一体）
4. 填充 Front Matter（status: DRAFT）
```

### 场景 C：新增产品拆解报告（事实）

```
1. 截图存入 01_Product/_Assets/Screenshots/（遵循截图命名规范）
2. 个人草稿在 _Personal/Drafts/ 中迭代
3. 完成后创建 01_Product/00_Overview/YYYYMMDD_[Target]_Product_Deconstruction_Report.md
4. 填充 Front Matter（status: DRAFT）
5. 在 README.md 产品区表格中添加引用
```

### 场景 D：新增 PRD（产出）

```
1. 在 03_Execution/02_PRD/ 下创建 NN_[Feature_Name]_PRD.md
2. 使用模板（00_Meta/Templates/Template_PRD.md）
3. 填充 Front Matter（status: DRAFT）
4. 需求条目同步到 03_Execution/01_Backlog/
```

### 场景 E：新增会议纪要（产出）

```
1. 在 03_Execution/05_Meetings/YYYY_MM/ 下创建 YYYYMMDD_[Topic]_Meeting.md
2. 月份目录不存在则创建
3. 填充 Front Matter（status: DRAFT）
```

### 场景 F：新增方案 / 规划 / 复盘（产出）

```
方案 → 03_Execution/03_Solutions/ · 用 Template_Solution.md
规划 → 03_Execution/04_Planning/  · 用 Template_Roadmap.md
复盘 → 03_Execution/06_Retrospective/ · 用 Template_Retrospective.md
```

### 场景 G：新增周进度汇报（个人）

```
1. 在 _Personal/Weekly_Reports/YYYY_MM/ 下创建 YYYYMMDD_Weekly_Report.md
2. 使用模板（_Personal/Weekly_Reports/Template/Template_Weekly_Report.md）
3. 填充本周工作重点 / 本周关键产出（索引知识库文件即可）/ 关键需求进度 / 待确认事项 / 需同事同步的事项
4. 若周报反映有共享价值的内容，按对应场景沉淀到 01_Product / 02_Knowledge / 03_Execution
5. 有需要时更新 _Personal/Weekly_Reports/README.md 的周报索引
```

### 场景 H：新思路评估（不确定放哪里？）

```
1. 是可复用的客观事实吗？ → 02_Knowledge/ 或 01_Product/（事实层）
2. 是交付物吗？ → 03_Execution/（产出层）
3. 是个人理解吗？ → _Personal/（认知层，不共享）
4. 现有目录都放不下且反复出现（2-3 次）？ → 提出新增目录方案，Owner 确认后执行
5. 还是不成熟/一次性的？ → 暂不补充，或先放 _Personal/Drafts/ 待成熟
```

---

## 13. 规范维护

| 事项 | 负责人 | 频率 |
|------|--------|------|
| 本规范文件更新 | PM | 结构变更时即时更新 |
| README.md 同步 | PM | 结构变更时即时更新 |
| SKILL.md 同步 | PM | 结构变更时即时更新 |
| 季度盘点 | PM | 每季度末 |
| 死链检查 | PM | 每季度盘点时 |

### 变更日志

| 日期 | 版本 | 变更内容 |
|------|------|---------|
| 2026-08-13 | 1.0 | 初始蓝图创建 |
| 2026-08-14 | 2.0 | 重写为结构规范文档；删除虚构竞品（Together_AI/Anarchy_AI）；同步 P0 迁移后实际结构；新增命名规范、状态流转、提升流、归档规则、操作指南 |
| 2026-08-14 | 2.1 | 统一编号规则：子目录改为**区内独立编号、从 00 开始**（`03_Competitive/` → `02_Competitive/`，`03_Execution` 规划区同步调整）；新增「编号规则」章节 |
| 2026-08-14 | 2.2 | 编号规则修正为**按实际创建顺序编号**：规划蓝图不占编号，只有真实创建的子目录才占用（`02_Competitive/` → `00_Competitive/`；规划区的 Glossary/Industry/Templates 让位，将来新建时依次接续 01/02/03）；同步调整三个规划扩展区的编号表述 |
| 2026-08-14 | 2.3 | 编号规则回归**按规划编号**：common 类资源（Glossary/Templates）固定排前，避免按创建顺序导致基础文件编号靠后；`00_Competitive/` → `02_Competitive/`；**新增「依赖创建规则（总分一体）」**：总分/父子/引用依赖必须一起创建，杜绝悬空引用 |
| 2026-08-14 | 2.4 | 新增 `01_Product/05_Prototypes/`：Vectoree 高保真原型 demo 16 页（1 Landing + 2 Auth + 12 Dashboard + 设计系统 + 维护说明） |
| 2026-08-14 | 3.0 | **核心分层模型重构**：知识=事实（沉淀的客观真相）、产出=文档（工作的交付物）、认知=个人（不共享）。术语词典/行业认知移出共享区归 `_Personal/`；`02_Knowledge/` 重新定位为**外部事实层**（竞品/用户/市场事实档案）；`01_Product/` 扩展为**产品事实层**（定位/功能逻辑/边界/技术模型/设计规范/原型）；`03_Execution/` 重定义为**产出层**（调研报告/需求/方案/规划/会议/复盘）；新增**调研拆分规则**（档案→知识层，报告→产出层）；模板统一至 `00_Meta/Templates/`；竞品目录归位 `02_Competitive/` → `00_Competitive/` |
| 2026-08-25 | 3.1 | 落地 `03_Execution/01_Backlog`、`02_PRD`、`03_Solutions` 三个产出层子目录（Admin 后台模型录入需求 / 方案落位）；新增 `00_Meta/Templates/` 模板库（Template_PRD / Template_Solution，草稿待确认）；同步 README 架构概览 |
| 2026-08-25 | 3.1 | 建立 03_Execution 产出层路径：新增 02_PRD / 03_Solutions 目录与 00_Meta/Templates 路径（文档由 PM 填写，不预建骨架）；需求池（Backlog）维持飞书多维表格，暂不落地工程，故不建 01_Backlog；README 架构概览同步 |
| 2026-08-28 | 3.2 | 新增 `_Personal/Weekly_Reports/` 个人周进度汇报目录：README 使用说明 + Template 周报模板；周报含本周工作重点 / 关键产出 / 关键需求进度 / 待确认事项 / 需同事同步事项 |

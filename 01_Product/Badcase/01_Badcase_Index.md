---
title: "Badcase 汇总索引"
description: "Vectoree 产品 Badcase（劣质/异常案例）汇总索引表。记录所有已登记 Badcase 的清单，字段含编号、发现日期、模块、严重程度、类型、状态、负责人，并预留示例数据供直接参考录入。"
author: "PM"
created: "2026-09-03"
updated: "2026-09-03"
status: "ACTIVE"
version: "1.0"
tags: ["badcase", "index", "质量", "异常案例", "vectoree"]
owners: ["PM"]
---

# Badcase 汇总索引

> 用途：本表是 `01_Product/Badcase/` 模块的总入口，所有 Badcase 登记后须在此追加一行。
> 录入流程：复制 `00_Badcase_Template.md` → 命名为 `BC-YYYYMMDD-X.md` → 填写 → 在下方表格追加一行。
> 编号规则：`BC-[YYYYMMDD]-[当日流水号]`，例 `BC-20260903-001`，全局唯一、不复用。
> 严重等级：P0 致命 / P1 严重 / P2 一般 / P3 轻微。状态：OPEN / IN_PROGRESS / FIXED / VERIFIED / WONTFIX。

---

## 汇总表格

| 编号 | 发现日期 | 模块 | 严重程度 | 简述 | 类型 | 状态 | 负责人 |
| - | - | - | - | - | - | - | - |
| BC-20260820-001 | 2026-08-20 | 网关 / Model Plaza | P1 | 模型 ID 含尾随空格（如 `vectoree/auto `）经网关路由后返回 404，无法命中模型 | 路由映射失效 | VERIFIED | 魏琼冰 |
| BC-20260825-002 | 2026-08-25 | 商业计费 / Billing | P2 | 按 token 计费浮点精度舍入偏差，账单金额与用量明细存在分位误差 | 商业计费 | IN_PROGRESS | 待分配 |
|   |   |   |   |   |   |   |   |

---

## 统计（按需维护）

> 下方为可选看板，登记数量较多时取消注释并定期更新，快速掌握质量态势。

<!--
- 总数：2
- 按状态：VERIFIED 1 / IN_PROGRESS 1
- 按严重等级：P1 1 / P2 1
- 按类型：路由映射失效 1 / 商业计费 1
-->

---

## 示例说明（参考录入）

上表前 2 行为示例数据，演示「网关模型 ID 带空格导致 404」与「计费精度舍入异常」两类典型 Badcase 的登记方式。真实录入时：

1. 新建 `BC-YYYYMMDD-X.md`（复制 `00_Badcase_Template.md` 填写）。
2. 在上方汇总表格追加对应一行，保持字段顺序一致。
3. 示例行可在首次真实录入后保留作为范本，或删除。

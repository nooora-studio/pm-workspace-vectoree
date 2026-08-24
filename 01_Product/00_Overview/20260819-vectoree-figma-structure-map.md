---
title: "Vectoree Figma Structure Map"
description: "基于工程原型与产品拆解，反推 Vectoree 在 Figma 中的页面、模块与组件结构"
author: "PM + AI"
created: "2026-08-19"
updated: "2026-08-19"
status: "ACTIVE"
version: "1.0"
tags: ["figma", "information-architecture", "prototype", "vectoree", "design-system"]
owners: ["PM"]
---

# Vectoree Figma 结构地图

## 1. 目标

把当前工程里已经存在的产品原型与产品拆解，整理成一套适合长期维护的 Figma 结构，用于：

1. 系统沉淀产品页面资产
2. 支撑后续版本迭代与模块复用
3. 将“页面结果”与“模块资产”分开管理

> 当前 Figma 文件：`Vectroee`
> 当前状态：MCP 读取结果只有 `Page 1 / 0:1`，可视为一个空白文件骨架。

## 2. 反推依据

本结构地图基于以下工程事实来源整理：

1. 官网与产品原型  
   `01_Product/05_Prototypes/index.html`
2. Auth 原型  
   `01_Product/05_Prototypes/02_Auth/signin.html`  
   `01_Product/05_Prototypes/02_Auth/signup.html`
3. Dashboard 原型  
   `01_Product/05_Prototypes/03_Dashboard/*.html`
4. 产品拆解报告  
   `01_Product/00_Overview/20260813_Vectoree_Product_Deconstruction_Report.md`
5. 原型维护说明  
   `01_Product/05_Prototypes/README.md`

## 3. 工程中的真实页面清单

### 3.1 Marketing

- `home`

### 3.2 Auth

- `sign-in`
- `sign-up`

### 3.3 Dashboard

- `project-overview`
- `model-plaza`
- `templates`
- `tool-hub`
- `api-keys`
- `auth`
- `payments`
- `database`
- `storage`
- `deploy`
- `logs`
- `settings`

> 说明：工程原型文件仍存在 `skills-hub.html` 命名，但产品术语已统一为 `tool-hub`。  
> Figma 内请统一使用 `tool-hub`，不要继续沉淀旧术语。

## 4. 推荐的 Figma Page 分组

不要把每个真实页面都建成一个 Figma Page。  
推荐做法是：**一个 Figma Page = 一类资产；一个 Frame = 一个真实页面或模块。**

建议在 `Vectroee` 这个 Figma 文件里建立以下 Page：

1. `00-overview`
2. `01-information-architecture`
3. `10-marketing-pages`
4. `20-auth-pages`
5. `30-dashboard-foundation`
6. `31-dashboard-build`
7. `32-dashboard-business`
8. `33-dashboard-data`
9. `34-dashboard-operations`
10. `40-modules-marketing`
11. `41-modules-dashboard`
12. `50-components`
13. `60-history`
14. `90-notes`

## 5. 每个 Figma Page 里放什么

### `00-overview`

放项目总览，不放具体页面设计稿：

- `product-positioning`
- `core-value-proposition`
- `six-blocks-map`
- `version-log`

### `01-information-architecture`

放信息架构与关系图：

- `site-map`
- `dashboard-map`
- `build-flow-map`
- `module-to-page-map`

其中最关键的一张图是：

- `product-surface-map`
  - marketing
  - auth
  - dashboard

### `10-marketing-pages`

放官网层页面 Frame：

- `home`

如果后续补齐官网内页，再继续增加：

- `pricing`
- `developers`
- `docs-entry`
- `company`

但按当前工程事实，先只放 `home`。

### `20-auth-pages`

放认证入口页：

- `sign-in`
- `sign-up`

### `30-dashboard-foundation`

放项目级基础面板：

- `project-overview`
- `api-keys`

### `31-dashboard-build`

放构建期能力页：

- `model-plaza`
- `templates`
- `tool-hub`

### `32-dashboard-business`

放用户与商业化相关页面：

- `auth`
- `payments`

### `33-dashboard-data`

放数据底座页：

- `database`
- `storage`

### `34-dashboard-operations`

放交付与运维页：

- `deploy`
- `logs`
- `settings`

### `40-modules-marketing`

把官网页面拆成可复用模块，不再按整页维护：

- `global-topbar`
- `hero`
- `provider-marquee`
- `six-blocks-grid`
- `assembly-line`
- `sdk-openai-compatible`
- `pricing-grid`
- `vee-band`
- `final-cta`
- `global-footer`

### `41-modules-dashboard`

把 Dashboard 公共区块沉淀成模块：

- `dashboard-sidebar`
- `dashboard-topbar`
- `dashboard-page-header`
- `status-badge`
- `stats-grid`
- `stat-card`
- `panel-shell`
- `chip-filter-bar`
- `data-table`
- `connect-block`
- `template-card`
- `integration-card`
- `settings-form-block`
- `log-list-block`

### `50-components`

放基础组件，不放业务语义：

- `button`
- `input`
- `textarea`
- `select`
- `checkbox`
- `badge`
- `chip`
- `card`
- `table-row`
- `sidebar-nav-item`
- `topbar-action`
- `empty-state`
- `pagination`

### `60-history`

放历史版本，不污染当前设计区：

- `home-v1-archive`
- `dashboard-overview-v1-archive`
- `tool-hub-v0-skills-hub-archive`

### `90-notes`

放设计决策与术语校正：

- `naming-rules`
- `term-corrections`
- `open-questions`
- `iteration-backlog`

## 6. 页面与 Figma 分组映射表

| 工程文件 | Figma Frame 名 | 所属 Figma Page |
|---|---|---|
| `01_Product/05_Prototypes/index.html` | `home` | `10-marketing-pages` |
| `01_Product/05_Prototypes/02_Auth/signin.html` | `sign-in` | `20-auth-pages` |
| `01_Product/05_Prototypes/02_Auth/signup.html` | `sign-up` | `20-auth-pages` |
| `03_Dashboard/overview.html` | `project-overview` | `30-dashboard-foundation` |
| `03_Dashboard/api-keys.html` | `api-keys` | `30-dashboard-foundation` |
| `03_Dashboard/model-plaza.html` | `model-plaza` | `31-dashboard-build` |
| `03_Dashboard/templates.html` | `templates` | `31-dashboard-build` |
| `03_Dashboard/skills-hub.html` | `tool-hub` | `31-dashboard-build` |
| `03_Dashboard/auth.html` | `auth` | `32-dashboard-business` |
| `03_Dashboard/payments.html` | `payments` | `32-dashboard-business` |
| `03_Dashboard/database.html` | `database` | `33-dashboard-data` |
| `03_Dashboard/storage.html` | `storage` | `33-dashboard-data` |
| `03_Dashboard/deploy.html` | `deploy` | `34-dashboard-operations` |
| `03_Dashboard/logs.html` | `logs` | `34-dashboard-operations` |
| `03_Dashboard/settings.html` | `settings` | `34-dashboard-operations` |

## 7. 首页 `home` 的模块拆分方式

当前工程里的首页不是多个独立页面，而是一个由多个区块组成的长页。  
因此在 Figma 中应当：

1. 保留一个整页 Frame：`home`
2. 同时把以下区块拆到 `40-modules-marketing`

建议拆分为：

1. `hero`
2. `provider-marquee`
3. `six-blocks-grid`
4. `assembly-line`
5. `sdk-openai-compatible`
6. `pricing-grid`
7. `vee-band`
8. `final-cta`
9. `global-footer`

这样后面改官网时，可以按模块改，不必反复改整页。

## 8. Dashboard 的模块拆分原则

Dashboard 的页面数量已经不少，但它们的骨架高度一致。  
因此最有价值的不是多画 12 次页面，而是先抽出共同骨架。

### 8.1 公共骨架

所有 Dashboard 页面优先复用：

- `dashboard-sidebar`
- `dashboard-topbar`
- `dashboard-page-header`
- `status-badge`
- `stats-grid`
- `panel-shell`

### 8.2 业务模块

不同页面再叠加自己的业务块：

- `model-plaza`
  - `model-table`
  - `provider-filter`
  - `playground-entry`
- `templates`
  - `template-card-grid`
- `tool-hub`
  - `installed-tools-grid`
  - `tool-market-table`
- `api-keys`
  - `key-create-block`
  - `key-list-table`
- `auth`
  - `sign-in-methods`
  - `session-config`
- `payments`
  - `billing-stats`
  - `plan-table`
  - `payout-summary`
- `database`
  - `table-list`
  - `migration-log`
- `storage`
  - `bucket-list`
  - `usage-breakdown`
- `deploy`
  - `deploy-status`
  - `domain-config`
- `logs`
  - `log-stream`
  - `filter-toolbar`
- `settings`
  - `project-settings-form`

## 9. 命名规范

Figma 内统一使用：

- 全小写
- 连字符分隔
- 不用空格
- 不用 `final-final-v2`

推荐：

- `project-overview`
- `model-plaza`
- `tool-hub`
- `sdk-openai-compatible`
- `dashboard-page-header`

避免：

- `Project Overview`
- `ModelPlaza`
- `skills hub new`
- `final version 2`

## 10. 当前应优先落地的最小集

如果你现在不想一次搭完整套，可以先在 Figma 里只建立这 8 个 Page：

1. `00-overview`
2. `01-information-architecture`
3. `10-marketing-pages`
4. `20-auth-pages`
5. `30-dashboard-foundation`
6. `31-dashboard-build`
7. `41-modules-dashboard`
8. `50-components`

这是当前最小但可持续演化的一版。

## 11. 当前需要校正的术语与开放问题

### 术语校正

1. `skills-hub` → `tool-hub`
2. `project` 拼写必须统一，不得出现错误拼写

### 开放问题

1. 当前官网原型中定价档位为 `free / pro / team`，而产品拆解里出现 `free / pro / enterprise`
2. 官网目前是单页长页结构，后续是否会补齐独立 `pricing`、`developers`、`docs` 页面
3. Dashboard 当前以项目视角组织，后续是否会加入组织层页面并与项目层分离

这些问题不影响首版 Figma 架构落地，但应记录在 `90-notes/open-questions` 中。

## 12. 建议的实际迁移顺序

1. 在 Figma 中先把 `Page 1` 重命名为 `00-overview`
2. 按本文件补齐推荐的 Figma Page
3. 先创建整页 Frame：
   - `home`
   - `sign-in`
   - `sign-up`
   - 12 个 dashboard 页
4. 再抽模块到：
   - `40-modules-marketing`
   - `41-modules-dashboard`
5. 最后抽基础组件到 `50-components`
6. 所有历史方案统一移入 `60-history`

---

一句话原则：

**整页负责表达产品表面，模块负责沉淀复用资产，组件负责支撑长期迭代。**

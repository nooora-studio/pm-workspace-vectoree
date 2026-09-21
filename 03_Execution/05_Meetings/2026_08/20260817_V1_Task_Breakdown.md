---
title: "V1.0 待办任务结构化拆解清单"
description: "基于 launch-checklist 与 V1.0 发版规划会议结论，按研发、前端、运维、运营等维度结构化拆解的行动清单，可直接用于导入飞书多维表格。"
author: "魏琼冰"
created: "2026-08-17"
updated: "2026-08-17"
status: "FINAL"
tags: ["action-items", "v1-launch", "task-breakdown", "meeting-attachment"]
---

# Vectoree V1.0 待办任务结构化拆解清单

> **文档说明**：本文档作为 [20260817 产研管理流程与 V1.0 发版规划会议](20260817_Product_Planning_Meeting.md) 的补充落地执行清单。已将原始散落的待办事项按**产品经理管理研发团队**的视角，拆解为 5 个结构化的工作流。可直接用于录入飞书多维表格（需求管理/任务表）进行排期追踪。

---

## 1. 🏗️ 运维与基建类 (DevOps & Infra)
**业务价值**：V1.0 的地基。物理环境的分离是保障生产环境数据安全、实现正式对外服务的前提（P0 卡点）。
**指派对象**：运维 / 后端负责人

- [ ] **[配置] 拆分物理环境**：将现网服务器改为 `vectoree.net`（Staging 测试环境），新购生产机并绑定域名 `vectoree.ai` (Production 生产环境)。
- [ ] **[配置] 数据与密钥隔离**：两套环境必须使用独立的 DB、Redis、R2 存储桶，并在 `.env` 中物理隔离所有第三方密钥（JWT, OAuth, Stripe, 模型渠道等）。
- [ ] **[配置] CI/CD 流水线**：配置 `main` 分支自动部署到 Staging 环境；新建 Production Workflow 并配置 GitHub Environment 人工审批后才能部署到生产机。
- [ ] **[运维] 健康检查与灾备**：配置 `/api/health` 检查端点，并设置生产环境每日 `pg_dump` 定时自动备份。

## 2. 🔐 核心后端与业务逻辑 (Backend & Logic)
**业务价值**：保障核心业务流（账号体系与收银台）能够顺畅闭环。
**指派对象**：后端开发

- [ ] **[开发] 平台级邮件服务接入**：对接 Resend 或 AWS SES，配置 `noreply@vectoree.net` 和 `noreply@vectoree.ai` 发信域名，并配置 SPF/DKIM/DMARC 保障邮件到达率。
- [ ] **[开发] 完善登录/注册异常逻辑**：确保未配置 SMTP 时，注册/登录会明确报错提示而非静默失败；确保邮箱验证码的边界逻辑（进垃圾箱提示、重发冷却机制、错误码返回）完整可用。
- [ ] **[开发] 平台级 CLI 鉴权**：补充开发 `login` (PKCE + device code) 以及 `logout`、`whoami` 等平台级 CLI 鉴权接口。
- [ ] **[配置] Stripe 生产环境防误配**：生产环境配置 `STRIPE_LIVE_SECRET_KEY` 及 Live Webhook；添加启动前缀校验逻辑，防止在生产环境误用 `sk_test_` 测试密钥。

## 3. 🖥️ 前端展示与交互体验 (Frontend & UI)
**业务价值**：“做减法”与“改文案”，克制地展示 V1.0 真实交付的能力，避免过度承诺。
**指派对象**：前端开发 / UI设计师

- [ ] **[开发] 隐藏未就绪模块**：在 Dashboard 中硬编码隐藏“模板 (Templates)”、“能力中心 (Skills)”、“部署 (Deployments)”菜单入口，并拦截对应直链的重定向。
- [ ] **[文案] 改造 Landing Page (首页)**：
  - 移除 Free / Pro / Team 订阅定价表，全面改为展示 PAYG (预充值按量扣费) 模式。
  - 移除“包含 100万 tokens”、“一键部署”、“模板分发”等未交付特性的宣传语。
  - 修改 Hero 区块终端动画，主推 `npx @vectoree/cli login` 和 `link` 命令及 Skill URL 编排场景。
- [ ] **[文案] 改造 Footer 与账单页面**：清理 Footer 死链（Blog, SDK, Changelog 等）；确保 Organization Billing 页面文案与 Landing Page 的 PAYG 定价逻辑口径一致。

## 4. 📦 CLI 与开发者工具 (Developer Tools)
**业务价值**：V1.0 面向硬核开发者的核心交付物（遥控器）。
**指派对象**：CLI 研发 / 架构师

- [ ] **[开发] 发布 npm 包与基础配置**：完成 `@vectoree/cli` 包的打包与发布，确保 `npx @vectoree/cli` 可正常运行；实现 `--json` 和 `--yes` 全局标志，建立 `.vectoree/` 本地配置目录。
- [ ] **[开发] 核心 CLI 命令实现**：
  - 鉴权族：`login`, `logout`, `whoami`, `link`, `keys list`。
  - 资源族：封装文档 `docs get` 和存储 `storage *` 相关命令。
  - 数据族：封装数据库主路径命令 `db list/schema/create/query/insert/sql`。
  - AI 族：封装 AI 相关命令 `ai models *`, `ai status`, `chat`。
- [ ] **[开发] Agent Skill 文件推送**：将本仓准备好的 `vectoree-skill.md` 推送到外部 `Vectoree/vectoree-skills` 仓库的 main 分支，供 AI Agent 读取调用。

## 5. 🏢 运营、法务与外部协同 (Operations & Biz)
**业务价值**：非代码层面的合规与增长筹备，阻塞最终上线放量，需魏琼冰重点推进。
**指派对象**：魏琼冰 / 石瑜 / 法务

- [ ] **[运营] 模型上架流程测试**：撰写《模型上架运营 Runbook》，由运营人员在测试环境走通 Channels -> Models -> 绑定 -> 定价 -> 试打 -> 上架的全流程验收。
- [ ] **[运营] 搭建博客站点 (SEO)**：使用 GitHub Pages 建立 `blog.vectoree.ai`，准备 3-5 篇冷启动文章（模型网关介绍、CLI 教程、充值指南等），用于产品上线后的搜索导流。
- [ ] **[法务] Stripe 生产账号审核**：跟进并完成 Stripe 生产账号的 KYC 审核认证，确保能合法合规地进行 Live 环境的美元收款。
- [ ] **[魏琼冰] 拍板平台计费规则**：确定充值手续费（如 5.5%）或模型价格 markup 比例，通知吴则东写死到计费逻辑中；明确共享 Postgres 和 R2 存储的免费使用上限，避免被恶意刷爆。

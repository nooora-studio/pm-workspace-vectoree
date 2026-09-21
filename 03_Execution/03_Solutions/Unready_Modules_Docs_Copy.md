---
title: "Vectoree - 方案文档 - 未就绪模块文档叙事"
description: "未就绪模块写入现网 docs 的逐页改法。供产品把关后贴入 Mintlify。"
author: "PM"
created: "2026-09-15"
updated: "2026-09-15"
status: "DRAFT"
version: "0.3"
tags: ["docs", "roadmap", "deploy", "payments", "coming-soon"]
owners:
  - PM
---

# Vectoree - 方案文档 - 未就绪模块文档叙事

> 用途：需求「未就绪模块路线图可见」。先改 docs.vectoree.ai。控制台开关是另一张票，文案复用本文 Overview 里 Deploy / Payments 两段。  
> 状态：**DRAFT v0.3**。相对 v0.2：去掉抽象分层，改成现网页「删 / 留 / 加」清单，方便内容把关。

---

## 你要拍板的就一件事

现在文档把 Vectoree 写成：**五个后端产品 + 一个钱包**。用户读完以为产品到此为止。Deploy 只出现在 Overview 最后一句「没有」。

这次改成：**先告诉用户完整产品是「后端 → 别人能打开 → 能向使用者收费」；再标明前半已上、后半开发中即将上线。**

不新开 `/deploy`、`/payments` 页面。不写操作步骤。不承诺现在就能上线收款。

下面按现网五页写「现在写了什么 / 改哪几句 / 改成什么 / 不改什么」。英文是拟贴入稿，你审的是这些句子。

---

## 页 1 · [Overview](https://docs.vectoree.ai/introduction)（主改这一页）

### 现在页面在干什么

从上到下：

1. 副标题：`Vectoree Cloud: model gateway, Auth, Database, and Storage. Agents use a Skill plus the CLI.`
2. 第一段：`Vectoree Cloud is a backend for coding agents... This launch includes a model gateway... plus an organization wallet...`
3. 四个 Connect 快捷入口（Install Skill / CLI login / Codex / troubleshoot）
4. 标题 `What ships now` + 五个产品短条
5. 文末一句：`Sites/deploy, Edge Functions, Realtime, and Compute are not part of this launch.`

问题在第 1、2、5 句：产品被定义成「四个后端」；Deploy 和 Functions 捆在一起说「都没有」。

### 改 4 处，其余原样留下


| #   | 动作      | 位置                                                           |
| --- | ------- | ------------------------------------------------------------ |
| A   | **改**   | 副标题                                                          |
| B   | **改**   | 开头第一段（可拆成两段）                                                 |
| C   | **留**   | Connect 四个入口，一个字不改                                           |
| D   | **留**   | 五个产品短条（Model Gateway / Tool Hub / Auth / Database / Storage） |
| E   | **改标题** | `What ships now` → `What's live now`（条目正文不动）                 |
| F   | **加**   | 五个产品后面，新增 `Deploy`、`Payments` 两节，各 2～3 句                     |
| G   | **改**   | 文末那句否定，把 Deploy 从「没有」里拆出来                                    |




### A. 副标题

**现在：**

> Vectoree Cloud: model gateway, Auth, Database, and Storage. Agents use a Skill plus the CLI.

**改成：**

> Backend for your agent today. A public URL and a way to charge users — launching soon.



### B. 开头第一段

**现在：**

> Vectoree Cloud is a backend for coding agents and the apps they ship. This launch includes a model gateway (OpenAI-compatible), Tool Hub (hosted MCP), Auth, Database, and Storage, plus an organization wallet you top up to pay for model and tool usage.
>
> The agent path is Skill + CLI for platform operations, and Hosted MCP for web search and page extract.

**改成：**

```markdown
Vectoree Cloud is how you take an agent from a local project to something other people can use — and eventually pay for.

Today that means a backend: model gateway, Tool Hub, Auth, Database, Storage, and an organization wallet you top up for model and tool usage. Agents operate it with a Skill plus the CLI; web search and extract go through hosted MCP.

Two more pieces are in development and launching soon: **Deploy** (a public HTTPS URL) and **Payments** (your end users pay you). They are not in the dashboard yet. Do not expect a one-click “go live and start charging” button today.
```



### E + F. 五个产品后面新增两节

五个产品短条正文不动。只在它们后面插入：

```markdown
## Coming soon

### Deploy

In development, launching soon. Publish the linked project to a public HTTPS URL so someone else can open the app in a browser. The backend you already connected (gateway, Auth, Database, Storage) stays attached. You do not stand up your own host.

Not in the first slice: custom domains, preview URLs, long-running compute.

### Payments

In development, launching soon. This is how people who use your agent pay **you**, and how that money comes back to you.

It is not the organization wallet. The wallet (live today, Stripe top-up) is **you paying Vectoree** for model and tool usage. Payments is the other direction. Platform fees and tax details ship with the feature — do not connect a personal Stripe account as a stand-in.
```



### G. 文末那句

**现在：**

> Sites/deploy, Edge Functions, Realtime, and Compute are not part of this launch. Skills Hub was replaced by Tool Hub. Do not follow old pages that mention ClawHub skills or `@vectoree/sdk` as the agent path.

**改成：**

> Edge Functions, Realtime, and Compute are not part of this launch. Skills Hub was replaced by Tool Hub. Do not follow old pages that mention ClawHub skills or `@vectoree/sdk` as the agent path.

（Deploy 不再出现在这句里，因为它已经写在 Coming soon。）

### 这一页你不改

- Connect 四个入口的标题、一句说明、链接
- 五个产品各自那一行说明
- OpenAPI 那句

---



## 页 2 · [Products](https://docs.vectoree.ai/products)



### 现在

副标题 `What Vectoree Cloud ships in this launch.`  
开头：`This launch is five products on one project, plus a PAYG wallet...`  
然后五个产品 + How you operate it + Billing（组织钱包）。

### 改 3 处


| #   | 动作    | 位置                                           |
| --- | ----- | -------------------------------------------- |
| A   | **改** | 副标题和开头一句                                     |
| B   | **留** | 五个产品、Skill、CLI、Codex 各段正文                    |
| C   | **改** | Billing 段末加一句，把两种钱说清楚                        |
| D   | **加** | 页末两个短节 Deploy / Payments（比 Overview 更短，意思相同） |




### A. 开头

**现在：**

> This launch is five products on one project, plus a PAYG wallet for the gateway and Tool Hub.

**改成：**

```markdown
> Five backend products live today. Deploy and end-user payments are next.

The live launch is five products on one project, plus a PAYG wallet for the gateway and Tool Hub. Everything shares the same project API key after `vectoree link`.

Deploy (public URL) and Payments (your users pay you) are in development and launching soon. They will use this same project — they are not a different product.
```



### C. Billing 段末加一句

现有 Billing 段全部保留，只在最后加：

> This wallet is you paying Vectoree. Charging the people who use your app is Payments, coming soon — see Overview.



### D. 页末新增（各三句，不写步骤）

```markdown
## Deploy — coming soon

Publish the project to a public HTTPS URL. Same backend as local. In development, launching soon. Not in the dashboard yet.

## Payments — coming soon

Charge the people who use the agent. Not the org wallet. In development, launching soon.
```

---



## 页 3 · [CLI setup](https://docs.vectoree.ai/quickstart)



### 现在

步骤 1～4 是安装 Skill、login、link、检查 gateway。  
文末 Next 只链到 Connect & troubleshoot。

### 改 2 处，步骤一个字不改


| #   | 动作    | 位置                                        |
| --- | ----- | ----------------------------------------- |
| A   | **加** | 标题下、步骤 1 之前，两句话                           |
| B   | **留** | 步骤 1～4、Useful commands 全文                 |
| C   | **改** | Next 段，补一句指向 Overview 的 Deploy / Payments |




### A. 步骤前加

```markdown
When this page is done, the agent can call models, Auth, Database, and Storage. It does not have a public URL yet, and it cannot charge your users yet. Deploy and Payments are in development and launching soon — you still start here.
```

现有「You do not pass a project id...」那句保留。

### C. Next

**现在：**

> For team members, multiple projects and orgs, Header heartbeat status, and troubleshooting ... see Connect & troubleshoot.

**改成：**

```markdown
## Next

For team members, multiple projects and orgs, Header heartbeat status, and troubleshooting (`Unauthorized`, yellow CONNECT, missing $5.00 credit), see Connect & troubleshoot.

Deploy (public URL) and Payments (charge your users) are in development and launching soon. They are not in the dashboard yet. Read the short description on Overview. Keep building against this project — that is what those features will attach to.
```

---



## 页 4 · [Billing](https://docs.vectoree.ai/billing)



### 现在

整页只讲：你充值组织钱包，模型/工具按量扣费。Stripe = 你付给 Vectoree。这页操作步骤正确，**不要改 How it works / Top up / Usage**。

### 只加一小节（放在 How it works 之前）

防止用户把「Stripe 充值」理解成「向终端用户收款」。

```markdown
## Two different payments

**Org wallet (live today).** You top up via Stripe. Vectoree deducts model and Tool Hub usage. That is this page.

**End-user payments (in development, launching soon).** People who use your agent pay you. That is not this page, and it is not in the dashboard yet. See Overview.
```

其余表格、Top up 步骤、Insufficient balance **不动**。

---



## 页 5 · [FAQ](https://docs.vectoree.ai/faq)（修事实，不是重写叙事）



### 现在有两处和 Overview 打架

1. `What is included in 1.0?` 写了 **Templates**。Overview 现网没有 Templates。
2. `What is not yet available?` 把 **Deployment** 和 Edge Functions / Realtime / Compute 捆成一句「都没有」。这次要把 Deploy 改成「即将上线」。



### 只改「What ships in this launch」两问

**现在：**

> What is included in 1.0?  
> Model Gateway, Auth, Database, Storage, Tool Hub (hosted MCP), org wallet billing, CLI + Agent Skill, Templates, and Google / email login.
>
> What is not yet available?  
> Deployment, Edge Functions, Realtime, and Compute are not part of this launch. Skills Hub was replaced by Tool Hub.

**改成：**

```markdown
What is included in 1.0?
Model Gateway, Auth, Database, Storage, Tool Hub (hosted MCP), org wallet billing, CLI + Agent Skill, and Google / email login.

What is coming soon?
Deploy — a public HTTPS URL for the app. Payments — charge your end users and get paid. Both are in development and launching soon. Not in the dashboard yet.

What is not in this launch?
Edge Functions, Realtime, and Compute. Skills Hub was replaced by Tool Hub.
```

Billing / Connection / Models / Data 各问 **不动**。  
Templates 从 1.0 清单拿掉；若 leader 坚持 Templates 算 1.0，只改回这一词，不改别的。

---



## 明确不改的页面


| 页面                                          | 为什么不动                         |
| ------------------------------------------- | ----------------------------- |
| [Connect](https://docs.vectoree.ai/connect) | 操作手册。跟「产品讲什么故事」无关。            |
| Models / Auth / Database / Storage / Codex  | 现货 how-to。不往里面塞 Deploy。       |
| Changelog                                   | 历史记录。Edge Functions 旧条目另开票再清。 |


不新开 `/deploy`、`/payments`。没有步骤可写，开了就是空页。

---



## 你审内容时对照这张红线

稿子里出现下面任意一句，整段打回：


| 不能写                                     | 写成这样                              |
| --------------------------------------- | --------------------------------- |
| 生成后一键上线并收款                              | 后端今天能用；上线和向用户收费即将上线               |
| 本月 / 下周上线                               | 只写 in development, launching soon |
| Dokploy / Coolify / Vercel / Cloudflare | 不写底座                              |
| Express、抽成%、deferred、税务                 | 只写「手续费和税务随功能一起公布」                 |
| push → 全球边缘                             | 不写                                |
| 组织钱包即将上线                                | 钱包已经在 Billing，现在时                 |
| 把 Billing 页的 Stripe 说成向用户收款             | 两种 Stripe 必须分开                    |


控制台「Deploy 未就绪入口」复用 Overview 的 Deploy、Payments 两段，不另写。

---



## 建议你怎么审

1. 先只审 **页 1 Overview 的 A/B/F/G**。这四段过了，产品叙事就定了。
2. Products / CLI setup / Billing / FAQ 是同一句话的复述，核对有没有走样、有没有多写步骤。
3. 过完之后再贴 Mintlify。未过之前不要改 docs 源码。

待你确认 Overview 四段后，可以把英文整理成可直接粘贴的完整页。
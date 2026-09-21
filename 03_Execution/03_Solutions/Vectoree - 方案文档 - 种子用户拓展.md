# Vectoree - 方案文档 - 种子用户拓展方案评估

---

## 一、需求背景与原始诉求

**需求来源：** 运营提出，产品处于 0 到 1，需要快速拿到第一批开发者 / 技术背景种子用户。

**运营原始诉求：** 用技术手段抓取 GitHub 上活跃用户的邮箱，批量发营销邮件（Cold Email），邀请注册并体验产品。

**需要拆开的两件事：**


| 层    | 内容                                  | 产品判断      |
| ---- | ----------------------------------- | --------- |
| 业务目标 | 找到正在做 Agent / MCP / 后端拼装的开发者，做成种子客户 | 合理，建议保留   |
| 执行手段 | 从 GitHub 抓邮箱并群发邀请                   | 不合理，建议不采用 |


---

## 二、产品层面的评估与风险分析

判定「GitHub 邮箱爬取 + 批量发信」不可行，主要有四项不可控风险。

### 1. GitHub 平台条款（最高危：可能导致封号）

**条款原文：** [GitHub Acceptable Use Policies · Information Usage Restrictions](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies)

> You may not use information from the Service (whether scraped, collected through our API, or obtained otherwise) for spamming purposes, including for the purposes of sending unsolicited emails to users or selling personal information, such as to recruiters, headhunters, and job boards.

**译文：** 不得将 GitHub 上的信息用于 spam，包括向用户发送未经请求的邮件，或出售个人信息。来源不限：网页抓取、API、其他方式都算。

同页还要求：收集到的个人信息，只能用于**用户授权的那个目的**。用户把邮箱写在 commit / 资料里，授权的是代码署名，不是收产品邀请。

**官方人员表态：** GitHub 的 Martin Woodward 在 Hacker News 回应「公司爬 GitHub 活跃用户邮箱再发营销邮件」时写过：这种行为明确违反条款；抓到会处理，**包括封号**。  
来源：[https://news.ycombinator.com/item?id=47165084](https://news.ycombinator.com/item?id=47165084)

**实际影响：**

- 解析 Commit、Profile 或 API 里的邮箱再发邀请，属于条款写明禁止的行为。
- 产品已接通 GitHub 登录。账号或 OAuth App 被封，会直接打登录链路。
- 额外：高频打 API 还可能触发 [API Terms](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#h-api-terms) 的限流与停权。



### 2. 企业域名与投递率（邮件系统被拖垮）

**依据：** [Google Email Sender Guidelines](https://support.google.com/a/answer/81126) 要求投诉率尽量低于 0.10%，避免达到 0.30% 及以上。

**实际影响：**

- 向未订阅地址群发推广信，退信率和垃圾邮件标记率很容易冲过警戒线。
- 发信域名 / IP 一旦进黑名单，后续**注册验证码、重置密码**等正常业务邮件也会进垃圾箱或被拒收。
- 当前生产 SMTP / SPF / DKIM / DMARC 尚未配完，更不适合在这个阶段做冷邮件。



### 3. 法律合规与隐私（GDPR 等）

**依据：** [GDPR Article 6](https://gdpr-info.eu/art-6-gdpr/)：处理个人数据需要合法基础。向个人发商业邮件，通常需要明确同意，或满足很严格的「正当利益」测试。

**实际影响：** GitHub 上大量开发者在欧美。未经许可用其 GitHub 邮箱发推广，容易被投诉，带来合规与罚款风险。中国《个人信息保护法》同样要求处理个人信息有合法基础。

### 4. 开发者口碑

开发者对爬取数据和未经招揽的推广邮件非常反感。一旦被截图发到 X、Reddit、V2EX、Hacker News，对新产品的伤害是公开且难撤回的。

### 5. 「自己爬、自己发、不碰项目」也不能规避

有一种常见误解：只要不用公司 GitHub 仓库、OAuth、登录去发信，只在外面爬邮箱、自己发，就不会跟产品产生关联，也就不会影响项目。

**结论：会。** 条款禁的是「用 GitHub 上的信息发未经请求的邮件」，不是「用公司仓库去发」。脚本不在主仓里，不等于产品没事。


| 以为能隔开的                    | 实际怎么连到产品上                                                                         |
| ------------------------- | --------------------------------------------------------------------------------- |
| 信里出现 Vectoree / 官网 / 邀请注册 | 收件人举报的是产品名。社区被点名的是公司，不是某个私人 GitHub 号                                              |
| 用 `vectoree.ai` 发         | 退信和投诉会脏掉这张域，注册验证码、重置密码也会进垃圾箱                                                      |
| 换一个马甲域名发                  | 条款和隐私问题还在；用户搜产品名仍能对上                                                              |
| 不用公司 Token，另开号去爬          | 用户把邮件和「我在 GitHub 上的邮箱」一起举报时，GitHub 仍可能处理能对上的账号或 OAuth App。产品已接 GitHub 登录，这是现成的打击面 |
| 爬虫不写进项目仓库                 | GDPR / 个保法看的是处理了谁的邮箱、有没有合法基础，跟代码在哪个 repo 无关                                       |


因此：「自己爬、自己发、不碰项目仓库」只避开了「脚本提交在主仓里」这一层，避不开品牌、域名和条款。原方案仍然不合理。

---



## 三、调研逻辑与解决思路

前提：预算有限、产品几乎还没有用户。种子获客应满足：**精准、低侵入、能立刻给到可试的东西。**

调研中还确认了一件事：GitHub 用户主页上**很少**挂 Twitter 或其他个人联系方式。因此「搜 GitHub 项目 → 主页找 Twitter → 私信」覆盖率不够，不能当主路径。GitHub 适合判断「这人像不像客户」，不适合当通讯录。

开发者接受度较高的两类途径：

1. **针对具体痛点的一对一沟通**（求反馈，不是群发推销），而且要去对方已经在说话的地方（X、Discord、LinkedIn）。
2. **出现在开发者找工具的必经路口**（Awesome List、生态目录、Product Hunt / BetaList、可跑通的开源 Demo）。

邮箱不是没有，只是来源必须换成：用户自己在 Waitlist / 登录时提交的地址。

---



## 四、备选方案（供参考）

以下四条可并行，不依赖抓取 GitHub 邮箱。需评估：**能不能做、谁来做、本周先做哪一条。** 选定后再由产品侧配合落地。

### 方案 1：提交 Awesome List（被动引流）

把 Vectoree 或配套开源件（CLI、Skill、MCP Server）提交到相关 Awesome 仓库的 Tools / Recommended 列表。

**动作：**

1. 梳理与 Agent / MCP / Developer Tools 相关的列表。
2. 向高权重仓库提 PR，例如：
  - [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers)
  - [awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents)
  - [Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM)

**成本：** 写清 PR 说明即可，通常数天内有机会被 Merge。  
**依赖：** 仓库里要有可被列表收录的公开项目（CLI / Skill / Demo），不能只交一个空官网。

### 方案 2：官网 Waitlist + 额度邀请

用等候名单合法收集邮箱，再用邀请奖励做裂变。

**动作：**

1. 官网放极简 Waitlist（可用 Viral Loops 等现成工具，或自建表单）。
2. 提交邮箱后给出专属邀请链接：每成功邀请 1 位开发者，账户额外获得定额度（金额 / Token 以最终定价为准）。
3. 同步挂到：
  - [BetaList 提交](https://betalist.com/submit)
  - [Product Hunt](https://www.producthunt.com/) Coming Soon / Launch

**成本：** 一页收集表 + 3–5 张产品截图 + 约 100 字介绍。  
**说明：** 这里的邮箱来自用户主动提交，可以发产品更新，不是冷邮件。

### 方案 3：痛点信号 + 社交一对一（主外联路径）

放弃批量冷邮件。用「寻求体验反馈」的姿势，先锁定有痛点的人，再在 **X / LinkedIn / Discord** 上一对一联系。GitHub 只用来看 Issue / Discussion 里谁在喊问题，不在仓库下广告，不解析 commit 邮箱。

**1. 找人（两类信号）**

- **GitHub：** 盯 Cursor、LangChain、LlamaIndex、MCP 相关仓库的 Issue / Discussion。出现额度不够、缺轻量网关、多 Agent 难调之类的帖，记下用户名。不盯 Commit / PR 正文——那里几乎不是痛点，也容易和爬邮箱混在一起。
- **社交：** 在 X、LinkedIn、Cursor / Open WebUI / Claude 等 Discord 搜：`looking for MCP gateway`、`Cursor API key limits`、`Agent backend`、`LangChain gateway`。

**2. 联系（在对方已经说话的地方）**

优先在**同一平台**回复或私信（X 帖下、Discord 频道、LinkedIn）。GitHub 主页很少挂 Twitter，不能当通讯录；同名去 X / LinkedIn 搜可以试，搜不到就跳过。不要去别人的 Issue / PR 下留言推广。

**3. 话术（提具体帖子，再邀反馈，不硬广）**

> Hi [Name]，看到你在 [X / Discord / 某条 Issue 标题] 提到 [具体痛点]。我们在做轻量工具 Vectoree，正在找第一批种子用户听反馈。若方便试用：[链接]。

**节奏：** 每天 10–15 条，不追覆盖量。成本是人工（可用平台自带的搜索订阅 / 关键词提醒做半自动），无额外资金。不要写死 20%–30% 转化——冷私信达不到这个数，按回复质量和能否约到试用验收。

### 方案 4：开源 Demo / 脚手架（内容获客）

开发者更吃「能跑起来的代码」。做一个可 Quickstart 的公共仓库，让人从 GitHub 搜到产品。

**动作：**

1. 建公共仓（例如 `vectoree-agent-starter` 或与现有 CLI / Skill 仓合并）。
2. README 写清 3 步上手，顶部放免费额度 / 控制台入口。
3. 分享到 V2EX（`/go/create` 或 `/go/promotions`）、Reddit（`r/SideProject` 等；`r/programming` 对推广很严，需按版规发）。

**成本：** 维护 1 个能跑通的 Demo。这是四条里工程量最大的一条，可排在 Waitlist 和 Awesome 之后。

---



## 五、结论

综上，需综合评估该方案的可行性与替代方案。

1. **原方案不合理。** 从 GitHub 抓邮箱再群发邀请，条款、域名、合规、口碑风险都在，即便自己爬、自己发、不碰项目仓库，也避不开。依据见第二节。
2. **备选方案需评估后选择。** 第四节四条不依赖抓邮箱，请看可行性和本周先做哪 1–2 条。选定后再由产品侧配合落地。

方案 3 能马上开始；方案 2 可以把合法邮箱池建起来；方案 1、4 依赖公开仓库是否已就绪。依据见第二节条款原文与 HN 原帖。
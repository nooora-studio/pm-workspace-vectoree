---
title: "robots.txt 与 sitemap 评估及优化原则"
description: "现网 robots/sitemap 专业评估；收录策略与 P1 扩写清单"
author: "PM"
created: "2026-10-14"
updated: "2026-10-14"
status: "ACTIVE"
version: "1.0"
tags: ["seo", "robots", "sitemap"]
owners: ["PM"]
---

# robots.txt 与 sitemap

> 线上地址（主站）  
> - https://vectoree.ai/robots.txt  
> - https://vectoree.ai/sitemap.xml  
> 抓取基准：2026-10-14

docs / blog 各自有独立 sitemap，不要求并入主站文件。

---

## 1. 搜索引擎如何拿到 sitemap

1. **主路径：** 读 `robots.txt` 中的 `Sitemap:` 行（主站已配置）  
2. **加速/监控：** Google Search Console / Bing Webmaster 手动提交同一 URL  
3. **约定试探：** 爬虫常会请求 `/sitemap.xml`（主站已放在标准路径）  

sitemap 不是排名魔法，作用是声明「该收哪些 URL」。没有它也能靠内链发现；有了但过瘦，新页更容易漏。

---

## 2. robots.txt 评估

当时内容要点：

```txt
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /dashboard/
Disallow: /admin
Disallow: /admin/
Disallow: /cli
Disallow: /cli/
Disallow: /cloud
Disallow: /cloud/

Sitemap: https://vectoree.ai/sitemap.xml
```

| 判断 | 说明 |
|---|---|
| 合格处 | 有 Sitemap 声明；公开 Allow；私有区 Disallow；规则干净 |
| 注意 | Disallow ≠ 防访问（页面仍可能 200）；保密靠登录 |
| 登录页 | `/dashboard/login` 落在 `/dashboard` 前缀下，对 SEO 通常有利 |
| 结论 | robots 写法不是短板；短板是 sitemap 几乎无产品 URL |

---

## 3. sitemap.xml 评估

当时仅 2 条：

- `https://vectoree.ai/`（priority 1.0）  
- `https://vectoree.ai/SKILL.md`（priority 0.9）  

| 问题 | 说明 |
|---|---|
| 严重欠覆盖 | 无任何产品模块 URL |
| 缺 lastmod | 比 changefreq/priority 更有参考价值 |
| priority/changefreq | Google 基本不依赖；不必纠结 |
| SKILL.md | 对 Agent 分发合理；不必高于模块页 |

格式合法、可访问、HTTPS、绝对 URL —— 技术形式及格，作为产品站索引地图不及格（过瘦）。

---

## 4. 优化原则

1. **与页面同步写入**，不放到项目最后  
2. **未上线 / 404 / 空壳不进 sitemap**  
3. **少而准**，不是越多越好  
4. **补 lastmod**（真实更新日）；可弱化或不写 priority/changefreq  
5. **主站不收：** Dashboard、admin、登录、反馈垃圾参数页、未上线二级  
6. **docs/blog** 继续用各自 sitemap  

---

## 5. P1 目标收录清单（主站）

| loc | 备注 |
|---|---|
| `https://vectoree.ai/` | 保留 |
| `https://vectoree.ai/product/model-plaza` | 新建后写入 |
| `https://vectoree.ai/product/auth` | 新建后写入 |
| `https://vectoree.ai/product/database` | 新建后写入 |
| `https://vectoree.ai/product/storage` | 新建后写入 |
| `https://vectoree.ai/product/tool-hub` | 新建后写入 |
| `https://vectoree.ai/product/templates` | 新建后写入 |
| `https://vectoree.ai/SKILL.md` | 可选保留 |

上线后：GSC / Bing 重新提交或等待 robots 发现；用覆盖率报告验收。

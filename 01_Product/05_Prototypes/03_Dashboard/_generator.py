#!/usr/bin/env python3
"""
Vectoree Dashboard 页面批量生成器 v2
基于 overview.html（真实文案版）的 sidebar/topbar 模板，生成 11 个模块页
"""
from pathlib import Path
import re

PROTOTYPES_ROOT = Path("/Users/yuke/Documents/pm-workspace-vect/01_Product/05_Prototypes")
DASH_DIR = PROTOTYPES_ROOT / "03_Dashboard"
TEMPLATE_FILE = DASH_DIR / "overview.html"

template = TEMPLATE_FILE.read_text()

# 提取 sidebar 段
sidebar_match = re.search(r'(<aside class="dash__sidebar">.*?</aside>)', template, re.DOTALL)
sidebar_template = sidebar_match.group(1)

# 提取 topbar 段
topbar_match = re.search(r'(<header class="dash__topbar">.*?</header>)', template, re.DOTALL)
topbar_template = topbar_match.group(1)

# 提取 <style> 块（继承 Dashboard 样式）
style_match = re.search(r'<style>(.*?)</style>', template, re.DOTALL)
base_style = style_match.group(1)


def make_sidebar(active_key):
    s = sidebar_template
    s = re.sub(r' sidebar-nav__item--active', '', s)
    pattern_map = {
        "overview": 'overview.html', "model-plaza": 'model-plaza.html',
        "templates": 'templates.html', "skills-hub": 'skills-hub.html',
        "api-keys": 'api-keys.html', "auth": 'auth.html', "payments": 'payments.html',
        "database": 'database.html', "storage": 'storage.html', "deploy": 'deploy.html',
        "logs": 'logs.html', "settings": 'settings.html',
    }
    target = pattern_map.get(active_key)
    if target:
        s = s.replace(
            f'<li class="sidebar-nav__item"><a href="{target}">',
            f'<li class="sidebar-nav__item sidebar-nav__item--active"><a href="{target}">', 1)
    return s


def make_page(filename, active_key, title, page_title, page_sub, status_badge, content_html, extra_style=""):
    page = template.replace(sidebar_template, make_sidebar(active_key))
    page = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', page, count=1)
    page = re.sub(r'(<h1 class="dash__page-title">).*?(</h1>)', rf'\g<1>{page_title}\g<2>', page, count=1)
    page = re.sub(r'(<p class="dash__page-sub">).*?(</p>)', rf'\g<1>{page_sub}\g<2>', page, count=1)
    if status_badge:
        page = re.sub(r'(<span class="badge badge--status">).*?(</span>)', rf'\g<1>{status_badge}\g<2>', page, count=1)
    else:
        page = re.sub(r'\s*<span class="badge badge--status">.*?</span>', '', page, count=1)
    page = re.sub(
        r'(<div class="dash__content">).*?(</div>\s*</div>\s*</div>\s*</body>)',
        rf'\g<1>{content_html}\g<2>', page, count=1, flags=re.DOTALL)
    if extra_style:
        page = page.replace('</style>', extra_style + '\n  </style>', 1)
    return page


# ============== 各页面（真实文案） ==============
pages = [
    {
        "filename": "model-plaza.html", "active_key": "model-plaza",
        "title": "Model Plaza — Vectoree",
        "page_title": "Model Plaza",
        "page_sub": "36 models across 5 providers behind one API key. Benchmark in the Playground, switch models with one line.",
        "status_badge": "5 PROVIDERS · 36 MODELS",
        "content": """
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">Models</h2>
            <div class="panel__actions" style="display:flex; gap: var(--sp-2);">
              <button class="panel__chip panel__chip--active">All</button>
              <button class="panel__chip">LLM</button>
              <button class="panel__chip">Embedding</button>
              <button class="panel__chip">Multimodal</button>
            </div>
          </div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <thead><tr style="text-align:left; border-bottom: 2px solid var(--ink);">
              <th style="padding:10px;">Model</th><th style="padding:10px;">Provider</th><th style="padding:10px;">Context</th>
              <th style="padding:10px;">Input $/1M</th><th style="padding:10px;">Output $/1M</th><th style="padding:10px;">Latency</th><th style="padding:10px;">Action</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px; font-weight:700;">grok-4.20</td><td style="padding:10px;">xAI</td><td style="padding:10px;">128K</td><td style="padding:10px;">$5.00</td><td style="padding:10px;">$15.00</td><td style="padding:10px;">820ms</td><td style="padding:10px;"><button class="btn btn--primary btn--sm">Try →</button></td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px; font-weight:700;">gpt-4o</td><td style="padding:10px;">OpenAI</td><td style="padding:10px;">128K</td><td style="padding:10px;">$2.50</td><td style="padding:10px;">$10.00</td><td style="padding:10px;">610ms</td><td style="padding:10px;"><button class="btn btn--primary btn--sm">Try →</button></td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px; font-weight:700;">claude-sonnet-4.5</td><td style="padding:10px;">Anthropic</td><td style="padding:10px;">200K</td><td style="padding:10px;">$3.00</td><td style="padding:10px;">$15.00</td><td style="padding:10px;">740ms</td><td style="padding:10px;"><button class="btn btn--primary btn--sm">Try →</button></td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px; font-weight:700;">gemini-2.5-pro</td><td style="padding:10px;">Google</td><td style="padding:10px;">2M</td><td style="padding:10px;">$1.25</td><td style="padding:10px;">$5.00</td><td style="padding:10px;">890ms</td><td style="padding:10px;"><button class="btn btn--primary btn--sm">Try →</button></td></tr>
              <tr><td style="padding:10px; font-weight:700;">deepseek-v3</td><td style="padding:10px;">DeepSeek</td><td style="padding:10px;">64K</td><td style="padding:10px;">$0.27</td><td style="padding:10px;">$1.10</td><td style="padding:10px;">560ms</td><td style="padding:10px;"><button class="btn btn--primary btn--sm">Try →</button></td></tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">Playground</h2>
            <button class="btn btn--ghost btn--sm">Open →</button>
          </div>
          <p style="font-size: var(--fs-sm); color: var(--gray);">After selecting models in Model Plaza, test text / image / video and other modalities here.</p>
        </div>
        """,
    },
    {
        "filename": "templates.html", "active_key": "templates",
        "title": "Templates — Vectoree",
        "page_title": "Templates",
        "page_sub": "Production-ready scaffolds. One click to fork, one more to deploy — your repo, your infra, our plumbing.",
        "status_badge": "12 COMMUNITY · 4 PRO",
        "content": """
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">Featured templates</h2>
            <div class="panel__actions" style="display:flex; gap: var(--sp-2);">
              <button class="panel__chip panel__chip--active">All</button>
              <button class="panel__chip">Agents</button>
              <button class="panel__chip">Apps</button>
              <button class="panel__chip">Pro</button>
            </div>
          </div>
          <div class="grid-3">
            <div class="card">
              <span class="badge" style="margin-bottom: var(--sp-3);">PRO</span>
              <h3 style="margin:0 0 6px; font-family: var(--font-display); font-size: var(--fs-md); text-transform:uppercase;">Quant research agent</h3>
              <p style="font-size:var(--fs-sm); color:var(--gray); margin:0 0 var(--sp-3); line-height:1.5;">RAG + broker APIs + charting. Reads filings, runs DCF.</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom: var(--sp-4);"><span class="panel__chip">gpt-4o</span><span class="panel__chip">pgvector</span><span class="panel__chip">stripe</span></div>
              <button class="btn btn--primary btn--sm">Fork →</button>
            </div>
            <div class="card">
              <h3 style="margin:0 0 6px; font-family: var(--font-display); font-size: var(--fs-md); text-transform:uppercase;">Customer support agent</h3>
              <p style="font-size:var(--fs-sm); color:var(--gray); margin:0 0 var(--sp-3); line-height:1.5;">Multi-channel inbox + KB lookup + escalation.</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom: var(--sp-4);"><span class="panel__chip">claude</span><span class="panel__chip">auth</span><span class="panel__chip">postgres</span></div>
              <button class="btn btn--primary btn--sm">Fork →</button>
            </div>
            <div class="card">
              <h3 style="margin:0 0 6px; font-family: var(--font-display); font-size: var(--fs-md); text-transform:uppercase;">Doc Q&amp;A bot</h3>
              <p style="font-size:var(--fs-sm); color:var(--gray); margin:0 0 var(--sp-3); line-height:1.5;">Upload PDFs, ask questions, cite sources.</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom: var(--sp-4);"><span class="panel__chip">embeddings</span><span class="panel__chip">storage</span></div>
              <button class="btn btn--primary btn--sm">Fork →</button>
            </div>
            <div class="card">
              <h3 style="margin:0 0 6px; font-family: var(--font-display); font-size: var(--fs-md); text-transform:uppercase;">Sales outreach agent</h3>
              <p style="font-size:var(--fs-sm); color:var(--gray); margin:0 0 var(--sp-3); line-height:1.5;">Lead enrichment + personalized emails.</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom: var(--sp-4);"><span class="panel__chip">grok</span><span class="panel__chip">broker-api</span></div>
              <button class="btn btn--primary btn--sm">Fork →</button>
            </div>
            <div class="card">
              <span class="badge" style="margin-bottom: var(--sp-3);">PRO</span>
              <h3 style="margin:0 0 6px; font-family: var(--font-display); font-size: var(--fs-md); text-transform:uppercase;">SaaS starter kit</h3>
              <p style="font-size:var(--fs-sm); color:var(--gray); margin:0 0 var(--sp-3); line-height:1.5;">Auth + billing + dashboard boilerplate.</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom: var(--sp-4);"><span class="panel__chip">auth</span><span class="panel__chip">payments</span><span class="panel__chip">db</span></div>
              <button class="btn btn--primary btn--sm">Fork →</button>
            </div>
            <div class="card">
              <h3 style="margin:0 0 6px; font-family: var(--font-display); font-size: var(--fs-md); text-transform:uppercase;">Code reviewer</h3>
              <p style="font-size:var(--fs-sm); color:var(--gray); margin:0 0 var(--sp-3); line-height:1.5;">PR review agent with style + security checks.</p>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom: var(--sp-4);"><span class="panel__chip">claude</span><span class="panel__chip">cli</span></div>
              <button class="btn btn--primary btn--sm">Fork →</button>
            </div>
          </div>
        </div>
        """,
    },
    {
        "filename": "skills-hub.html", "active_key": "skills-hub",
        "title": "Skills Hub — Vectoree",
        "page_title": "Skills Hub",
        "page_sub": "Install skills like packages. Broker APIs, MCP servers, CLI tools.",
        "status_badge": "47 SKILLS · 3 INSTALLED",
        "content": """
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Installed in this project</h2></div>
          <div class="grid-3">
            <div class="card" style="background: var(--acid);">
              <div style="font-size:var(--fs-xs); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px;">Broker API</div>
              <h3 style="margin:0; font-family: var(--font-display);">broker-mcp</h3>
              <p style="font-size:var(--fs-sm); margin:8px 0 var(--sp-3);">Market data + brokerage execution</p>
              <button class="btn btn--dark btn--sm">Configure →</button>
            </div>
            <div class="card">
              <div style="font-size:var(--fs-xs); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px; color:var(--gray);">MCP Server</div>
              <h3 style="margin:0; font-family: var(--font-display);">@vectoree/cli</h3>
              <p style="font-size:var(--fs-sm); margin:8px 0 var(--sp-3); color:var(--gray);">Local CLI to manage deploys from your agent</p>
              <button class="btn btn--ghost btn--sm">Configure →</button>
            </div>
            <div class="card">
              <div style="font-size:var(--fs-xs); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px; color:var(--gray);">CLI Tool</div>
              <h3 style="margin:0; font-family: var(--font-display);">browser-mcp</h3>
              <p style="font-size:var(--fs-sm); margin:8px 0 var(--sp-3); color:var(--gray);">Headless browser for the agent</p>
              <button class="btn btn--ghost btn--sm">Configure →</button>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">Discover</h2>
            <div class="panel__actions" style="display:flex; gap: var(--sp-2);">
              <button class="panel__chip panel__chip--active">All</button>
              <button class="panel__chip">Broker API</button>
              <button class="panel__chip">MCP</button>
              <button class="panel__chip">CLI</button>
            </div>
          </div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>stripe-billing</strong></td><td style="padding:10px; color:var(--gray);">Broker API · Invoicing + subscription</td><td style="padding:10px; text-align:right;"><button class="btn btn--ghost btn--sm">+ Install</button></td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>sendgrid-mailer</strong></td><td style="padding:10px; color:var(--gray);">Broker API · Transactional email</td><td style="padding:10px; text-align:right;"><button class="btn btn--ghost btn--sm">+ Install</button></td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>postgres-mcp</strong></td><td style="padding:10px; color:var(--gray);">MCP · Schema read + safe SQL exec</td><td style="padding:10px; text-align:right;"><button class="btn btn--ghost btn--sm">+ Install</button></td></tr>
              <tr><td style="padding:10px;"><strong>github-cli</strong></td><td style="padding:10px; color:var(--gray);">CLI · Issues, PRs, code search</td><td style="padding:10px; text-align:right;"><button class="btn btn--ghost btn--sm">+ Install</button></td></tr>
            </tbody>
          </table>
        </div>
        """,
    },
    {
        "filename": "api-keys.html", "active_key": "api-keys",
        "title": "API Keys — Vectoree",
        "page_title": "API Keys",
        "page_sub": "Create scoped project API keys (sk-ve-v1-...) for Model Gateway, Memory, and Usage.",
        "status_badge": "2 ACTIVE KEYS",
        "content": """
        <div class="connect-block">
          <div class="connect-block__head">
            <span class="connect-block__title">&gt;_ CREATE A KEY</span>
            <button class="btn btn--primary btn--sm">+ New API Key</button>
          </div>
          <div class="connect-block__code">
            <span class="prompt">$</span> npx @vectoree/cli keys create --name "production" --scope chat,embed<br>
            <span class="comment">// sk-ve-v1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          </div>
          <div class="connect-block__foot">
            <span>Scoped keys should be kept secure. Do not expose them in frontend code.</span>
            <span style="color: var(--acid);">sk-ve-v1-...</span>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">All keys</h2></div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <thead><tr style="text-align:left; border-bottom: 2px solid var(--ink);">
              <th style="padding:10px;">Name</th><th style="padding:10px;">Key</th><th style="padding:10px;">Last used</th><th style="padding:10px;">Scopes</th><th style="padding:10px;">Action</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>Production</strong></td><td style="padding:10px;">sk-ve-v1_prod_xxxxx...</td><td style="padding:10px;">2 min ago</td><td style="padding:10px;"><span class="panel__chip">chat</span> <span class="panel__chip">embed</span></td><td style="padding:10px;"><button class="btn btn--ghost btn--sm">Rotate</button></td></tr>
              <tr><td style="padding:10px;"><strong>Dev / local</strong></td><td style="padding:10px;">sk-ve-v1_dev_xxxxx...</td><td style="padding:10px;">1 hour ago</td><td style="padding:10px;"><span class="panel__chip">all</span></td><td style="padding:10px;"><button class="btn btn--ghost btn--sm">Rotate</button></td></tr>
            </tbody>
          </table>
        </div>
        """,
    },
    {
        "filename": "auth.html", "active_key": "auth",
        "title": "Auth — Vectoree",
        "page_title": "Auth",
        "page_sub": "Email & Google sign-in for your users. Sessions, orgs, B2B2C — handled, not hand-rolled.",
        "status_badge": "PRO · ENABLED",
        "content": """
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Sign-in methods</h2></div>
          <div class="grid-3">
            <div class="card" style="background: var(--acid);">
              <h3 style="margin:0; font-family: var(--font-display);">Email + password</h3>
              <p style="font-size:var(--fs-sm); margin:8px 0 0;">Default. Magic link, password reset, email verification all included.</p>
            </div>
            <div class="card">
              <h3 style="margin:0; font-family: var(--font-display);">Google OAuth</h3>
              <p style="font-size:var(--fs-sm); margin:8px 0 0; color:var(--gray);">One-click sign-in with Google. Domain restrictions supported.</p>
            </div>
            <div class="card">
              <h3 style="margin:0; font-family: var(--font-display);">Magic link</h3>
              <p style="font-size:var(--fs-sm); margin:8px 0 0; color:var(--gray);">Passwordless email login. 15-minute TTL.</p>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Quick start — your SDK</h2></div>
          <div class="connect-block" style="margin-bottom:0;">
            <div class="connect-block__code">
<span class="comment">// sign in</span><br>
<span class="prompt">const</span> session = <span class="prompt">await</span> auth.<span class="prompt">signIn</span>({ email, password });<br>
<br>
<span class="comment">// verify middleware (any framework)</span><br>
<span class="prompt">await</span> auth.<span class="prompt">requireUser</span>(req);
            </div>
          </div>
        </div>
        """,
    },
    {
        "filename": "payments.html", "active_key": "payments",
        "title": "Payments — Vectoree",
        "page_title": "Payments",
        "page_sub": "Charge your users. You set the price, Vectoree handles invoicing, dunning, payouts.",
        "status_badge": "PRO · ENABLED",
        "content": """
        <div class="stats-grid">
          <div class="stat-card"><div class="stat-card__label">MRR</div><div class="stat-card__value">$0</div><div class="stat-card__sub">From 0 active subscribers</div></div>
          <div class="stat-card"><div class="stat-card__label">Active subs</div><div class="stat-card__value">0</div><div class="stat-card__sub">Across 0 plans</div></div>
          <div class="stat-card"><div class="stat-card__label">Trials</div><div class="stat-card__value">0</div><div class="stat-card__sub">7-day free</div></div>
          <div class="stat-card"><div class="stat-card__label">Payouts</div><div class="stat-card__value">$0</div><div class="stat-card__sub">Next: pending</div></div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Plans</h2><button class="btn btn--primary btn--sm">+ New plan</button></div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <thead><tr style="text-align:left; border-bottom: 2px solid var(--ink);">
              <th style="padding:10px;">Plan</th><th style="padding:10px;">Type</th><th style="padding:10px;">Price</th><th style="padding:10px;">Subscribers</th><th style="padding:10px;">Action</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>Starter</strong></td><td style="padding:10px;">subscription</td><td style="padding:10px;">$9 / mo</td><td style="padding:10px;">0</td><td style="padding:10px;"><button class="btn btn--ghost btn--sm">Edit</button></td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>Pro</strong></td><td style="padding:10px;">subscription</td><td style="padding:10px;">$29 / mo</td><td style="padding:10px;">0</td><td style="padding:10px;"><button class="btn btn--ghost btn--sm">Edit</button></td></tr>
              <tr><td style="padding:10px;"><strong>Usage</strong></td><td style="padding:10px;">metered</td><td style="padding:10px;">$0.01 / request</td><td style="padding:10px;">0</td><td style="padding:10px;"><button class="btn btn--ghost btn--sm">Edit</button></td></tr>
            </tbody>
          </table>
        </div>
        """,
    },
    {
        "filename": "database.html", "active_key": "database",
        "title": "Database — Vectoree",
        "page_title": "Database",
        "page_sub": "Postgres, file storage, vector indexes — wired from day one.",
        "status_badge": "POSTGRES · 1 DB",
        "content": """
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">Tables</h2>
            <div class="panel__actions" style="display:flex; gap: var(--sp-2);">
              <button class="btn btn--ghost btn--sm">SQL editor</button>
              <button class="btn btn--primary btn--sm">+ New table</button>
            </div>
          </div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <thead><tr style="text-align:left; border-bottom: 2px solid var(--ink);">
              <th style="padding:10px;">Table</th><th style="padding:10px;">Rows</th><th style="padding:10px;">Size</th><th style="padding:10px;">RLS</th><th style="padding:10px;">Updated</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>users</strong></td><td style="padding:10px;">1</td><td style="padding:10px;">32 KB</td><td style="padding:10px;">✓</td><td style="padding:10px;">2 min ago</td></tr>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>conversations</strong></td><td style="padding:10px;">0</td><td style="padding:10px;">8 KB</td><td style="padding:10px;">✓</td><td style="padding:10px;">—</td></tr>
              <tr><td style="padding:10px;"><strong>documents (vector)</strong></td><td style="padding:10px;">0</td><td style="padding:10px;">16 KB</td><td style="padding:10px;">✓</td><td style="padding:10px;">—</td></tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Migrations</h2></div>
          <div style="font-family: var(--font-mono); font-size: var(--fs-sm); line-height: 1.8;">
            <div style="padding:8px 0; border-bottom:1px solid var(--row-line);"><span style="color:var(--gray);">2026-08-14 10:42</span> · <strong>init</strong> · create users, organizations</div>
            <div style="padding:8px 0; border-bottom:1px solid var(--row-line);"><span style="color:var(--gray);">2026-08-14 10:43</span> · <strong>conversations</strong> · add chat history table</div>
            <div style="padding:8px 0;"><span style="color:var(--gray);">2026-08-14 10:44</span> · <strong>vector index</strong> · pgvector extension enabled</div>
          </div>
        </div>
        """,
    },
    {
        "filename": "storage.html", "active_key": "storage",
        "title": "Storage — Vectoree",
        "page_title": "Storage",
        "page_sub": "Files + vector indexes. S3-compatible API, signed URLs out of the box.",
        "status_badge": "2 BUCKETS · 0 OBJECTS",
        "content": """
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Buckets</h2><button class="btn btn--primary btn--sm">+ New bucket</button></div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <thead><tr style="text-align:left; border-bottom: 2px solid var(--ink);">
              <th style="padding:10px;">Name</th><th style="padding:10px;">Visibility</th><th style="padding:10px;">Objects</th><th style="padding:10px;">Size</th><th style="padding:10px;">CORS</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);"><td style="padding:10px;"><strong>avatars</strong></td><td style="padding:10px;">public</td><td style="padding:10px;">0</td><td style="padding:10px;">0 KB</td><td style="padding:10px;">✓</td></tr>
              <tr><td style="padding:10px;"><strong>user-uploads</strong></td><td style="padding:10px;">private</td><td style="padding:10px;">0</td><td style="padding:10px;">0 KB</td><td style="padding:10px;">—</td></tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Upload via SDK</h2></div>
          <div class="connect-block" style="margin-bottom:0;">
            <div class="connect-block__code">
<span class="prompt">const</span> { url } = <span class="prompt">await</span> storage.<span class="prompt">upload</span>({<br>
&nbsp;&nbsp;bucket: <span class="prompt">"user-uploads"</span>,<br>
&nbsp;&nbsp;path: <span class="prompt">"docs/q3.pdf"</span>,<br>
&nbsp;&nbsp;file,<br>
});
            </div>
          </div>
        </div>
        """,
    },
    {
        "filename": "deploy.html", "active_key": "deploy",
        "title": "Deploy — Vectoree",
        "page_title": "Deploy",
        "page_sub": "Push → global edge. Subdomain or custom domain.",
        "status_badge": "PRODUCTION · LIVE",
        "content": """
        <div class="connect-block">
          <div class="connect-block__head">
            <span class="connect-block__title">&gt;_ DEPLOY</span>
            <button class="btn btn--primary btn--sm">↻ Re-deploy</button>
          </div>
          <div class="connect-block__code">
<span class="prompt">$</span> vee deploy --prod<br>
▲ 42 files · 8.2 MB · 1.8s build<br>
✓ pushed to global edge · 14 regions<br>
→ live at <span style="color: var(--acid);">my-agent.vectoree.app</span> <span class="prompt">⚡ 1.8s</span>
          </div>
          <div class="connect-block__foot">
            <span>Last deploy: 2 minutes ago · commit a1b2c3d</span>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Domains</h2></div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <tbody>
              <tr style="border-bottom:1px solid var(--row-line);">
                <td style="padding:10px;"><strong>my-agent.vectoree.app</strong></td>
                <td style="padding:10px;"><span class="badge" style="background:#00C853; color:#fff; border-color:#00C853;">● LIVE</span></td>
                <td style="padding:10px; text-align:right;"><button class="btn btn--ghost btn--sm">Configure</button></td>
              </tr>
              <tr>
                <td style="padding:10px;"><strong>agent.yourcompany.com</strong></td>
                <td style="padding:10px; color:var(--gray);">DNS pending</td>
                <td style="padding:10px; text-align:right;"><button class="btn btn--ghost btn--sm">Configure</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Deploy history</h2></div>
          <div style="font-family: var(--font-mono); font-size: var(--fs-sm); line-height: 1.9;">
            <div style="padding:8px 0; border-bottom:1px solid var(--row-line);"><span style="color:#00C853;">●</span> a1b2c3d · 2 min ago · production</div>
            <div style="padding:8px 0; border-bottom:1px solid var(--row-line);"><span style="color:#00C853;">●</span> e4f5g6h · 1 hour ago · production</div>
            <div style="padding:8px 0;"><span style="color:var(--gray);">●</span> i7j8k9l · 3 hours ago · rolled back</div>
          </div>
        </div>
        """,
    },
    {
        "filename": "logs.html", "active_key": "logs",
        "title": "Logs — Vectoree",
        "page_title": "Logs",
        "page_sub": "Live tail of all requests, errors, and platform events.",
        "status_badge": "LIVE · 142 EVENTS / MIN",
        "content": """
        <div class="panel" style="background: var(--ink); color: var(--paper); border-color: var(--ink); box-shadow: var(--shadow-hard-sm);">
          <div class="panel__head" style="border-bottom:1px solid #2a2a2a; padding-bottom: var(--sp-3);">
            <h2 class="panel__title" style="color: var(--acid);">&gt;_ LIVE TAIL</h2>
            <div class="panel__actions" style="display:flex; gap: var(--sp-2);">
              <button class="panel__chip" style="border-color:#2a2a2a; background:#1a1a1a; color:var(--paper);">All</button>
              <button class="panel__chip" style="border-color:#2a2a2a; background:#1a1a1a; color:var(--paper);">Errors</button>
              <button class="panel__chip" style="border-color:#2a2a2a; background:#1a1a1a; color:var(--paper);">Chat</button>
              <button class="panel__chip" style="border-color:#2a2a2a; background:#1a1a1a; color:var(--paper);">Deploy</button>
            </div>
          </div>
          <div style="font-family: var(--font-mono); font-size: var(--fs-xs); line-height: 1.8; padding-top: var(--sp-3);">
            <div><span style="color:var(--gray);">14:23:18</span> <span style="color:#4FC3F7;">INFO</span> chat.completion · model=gpt-4o · 248 tokens · 820ms</div>
            <div><span style="color:var(--gray);">14:23:21</span> <span style="color:#4FC3F7;">INFO</span> chat.completion · model=claude-sonnet-4.5 · 412 tokens · 1.1s</div>
            <div><span style="color:var(--gray);">14:23:24</span> <span style="color:#FF8A3D;">WARN</span> rate.limit · 80% of 1M tokens used</div>
            <div><span style="color:var(--gray);">14:23:27</span> <span style="color:#FF3D3D;">ERR</span> broker-mcp.timeout · request_id=req_4a8b · 30s</div>
            <div><span style="color:var(--gray);">14:23:30</span> <span style="color:#4FC3F7;">INFO</span> deploy.success · a1b2c3d · 14 regions</div>
            <div><span style="color:var(--gray);">14:23:33</span> <span style="color:#4FC3F7;">INFO</span> auth.signin · user=user_a3f2 · google OAuth</div>
            <div style="color: var(--acid);">▌ _</div>
          </div>
        </div>
        """,
    },
    {
        "filename": "settings.html", "active_key": "settings",
        "title": "Settings — Vectoree",
        "page_title": "Settings",
        "page_sub": "Organization, members, billing, security.",
        "status_badge": "PRO · NORA 的组织",
        "content": """
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Organization</h2></div>
          <div class="grid-3">
            <div>
              <label style="display:block; font-family:var(--font-mono); font-size:var(--fs-xs); font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px;">Organization name</label>
              <input style="width:100%; font-family:var(--font-mono); font-size:var(--fs-sm); border:2px solid var(--ink); padding:9px 12px; background:var(--white);" value="NORA 的组织">
            </div>
            <div>
              <label style="display:block; font-family:var(--font-mono); font-size:var(--fs-xs); font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px;">Slug</label>
              <input style="width:100%; font-family:var(--font-mono); font-size:var(--fs-sm); border:2px solid var(--ink); padding:9px 12px; background:var(--white);" value="nora">
            </div>
            <div>
              <label style="display:block; font-family:var(--font-mono); font-size:var(--fs-xs); font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px;">Description</label>
              <input style="width:100%; font-family:var(--font-mono); font-size:var(--fs-sm); border:2px solid var(--ink); padding:9px 12px; background:var(--white);" placeholder="What does this org build?">
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Members · 1</h2><button class="btn btn--primary btn--sm">+ Invite</button></div>
          <table style="width:100%; border-collapse:collapse; font-family: var(--font-mono); font-size: var(--fs-sm);">
            <tbody>
              <tr>
                <td style="padding:10px;"><div style="display:flex; align-items:center; gap:10px;"><div style="width:28px; height:28px; background:var(--acid); display:grid; place-items:center; font-weight:700;">WE</div><strong>we@example.com</strong></div></td>
                <td style="padding:10px;">Owner</td>
                <td style="padding:10px;">Joined 2 min ago</td>
                <td style="padding:10px; text-align:right;">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="panel">
          <div class="panel__head"><h2 class="panel__title">Billing</h2></div>
          <div class="grid-3">
            <div class="card"><strong>Current plan</strong><div style="font-size:var(--fs-sm); color:var(--gray); margin-top:4px;">Free · $0/mo</div></div>
            <div class="card"><strong>Next invoice</strong><div style="font-size:var(--fs-sm); color:var(--gray); margin-top:4px;">No upcoming charges</div></div>
            <div class="card"><strong>Payment method</strong><div style="font-size:var(--fs-sm); color:var(--gray); margin-top:4px;">None · add on upgrade</div></div>
          </div>
          <div style="margin-top: var(--sp-4);"><button class="btn btn--primary">Upgrade to Pro →</button></div>
        </div>
        """,
    },
]

for p in pages:
    out = make_page(
        filename=p["filename"], active_key=p["active_key"], title=p["title"],
        page_title=p["page_title"], page_sub=p["page_sub"],
        status_badge=p["status_badge"], content_html=p["content"])
    (DASH_DIR / p["filename"]).write_text(out)
    print(f"✓ {p['filename']}")

print(f"\n✅ Generated {len(pages)} dashboard pages")

/**
 * ═══════════════════════════════════════════
 *  Vectoree Design System Plugin v3.0
 *  3 个页面 × N 个模块（每个模块独立 Frame）
 *
 *  Page 1: 🎨 Design Tokens（颜色/字体/间距/阴影/边框）— 5 模块
 *  Page 2: 🔘 Components（按钮/卡片/终端/贴纸标签/定价卡）— 5 模块
 *  Page 3: 📄 Page Modules（Homepage 7 · Dashboard 6 · Auth 2，全部生产环境 1:1 反推 UI 切片）— 15 模块
 * ═══════════════════════════════════════════
 */

const TOKENS = {
  colors: {
    acid:     { r: 0.847, g: 1.000, b: 0.000, hex: '#D8FF00', name: 'Acid / 荧光黄' },
    ink:      { r: 0.063, g: 0.063, b: 0.063, hex: '#101010', name: 'Ink / 墨黑' },
    paper:    { r: 0.945, g: 0.945, b: 0.910, hex: '#F1F1E8', name: 'Paper / 米白' },
    white:    { r: 1.000, g: 1.000, b: 1.000, hex: '#FFFFFF', name: 'White / 纯白' },
    gray:     { r: 0.420, g: 0.420, b: 0.375, hex: '#6B6B60', name: 'Gray / 正文灰' },
    ink40:    { r: 0.227, g: 0.227, b: 0.196, hex: '#3A3A32', name: 'Ink-40' },
    ink30:    { r: 0.333, g: 0.333, b: 0.333, hex: '#555555', name: 'Ink-30' },
    lineSoft: { r: 0.788, g: 0.788, b: 0.741, hex: '#C9C9BD', name: 'Line-Soft' },
    acidSoft: { r: 0.961, g: 1.000, b: 0.800, hex: '#F5FFCC', name: 'Acid-Soft' },
  },
  fonts: {
    display: { family: 'Archivo Black', style: 'Regular', usage: 'Display / 标题 (全大写)' },
    body:    { family: 'Space Grotesk', style: 'Regular', usage: 'Body / 正文' },
    mono:    { family: 'JetBrains Mono', style: 'Regular', usage: 'Code / 终端 / 标签' },
  },
  spacing: [
    { token: '--spacing-xs', value: 4, label: 'XS' },
    { token: '--spacing-sm', value: 8, label: 'SM' },
    { token: '--spacing-md', value: 12, label: 'MD' },
    { token: '--spacing-lg', value: 16, label: 'LG' },
    { token: '--spacing-xl', value: 24, label: 'XL' },
    { token: '--spacing-2xl', value: 32, label: '2XL' },
    { token: '--spacing-3xl', value: 48, label: '3XL' },
    { token: '--spacing-4xl', value: 64, label: '4XL' },
  ],
  shadows: [
    { x: 3, y: 3, color: 'ink', name: 'Hard SM', css: '3px 3px 0 #101010' },
    { x: 4, y: 4, color: 'ink', name: 'Hard MD', css: '4px 4px 0 #101010' },
    { x: 6, y: 6, color: 'ink', name: 'Hard LG', css: '6px 6px 0 #101010' },
    { x: 6, y: 6, color: 'acid', name: 'Hard Acid', css: '6px 6px 0 #D8FF00' },
  ],
};

const PAGE_WIDTH = 1120;

// ── 字体加载（Figma 要求先 loadFontAsync 才能设置 fontName）──
const FONTS = [
  { family: 'Archivo Black', style: 'Regular' },
  { family: 'Space Grotesk', style: 'Regular' },
  { family: 'JetBrains Mono', style: 'Regular' },
];
const LOADED_FONTS = [];
async function loadFonts() {
  for (const f of FONTS) {
    try { await figma.loadFontAsync(f); LOADED_FONTS.push(f); }
    catch (e) { console.warn('字体不可用（建议本地安装）:', f.family, e.message); }
  }
  if (LOADED_FONTS.length === 0) {
    for (const fb of [{ family: 'Inter', style: 'Regular' }, { family: 'Roboto', style: 'Regular' }, { family: 'Arial', style: 'Regular' }]) {
      try { await figma.loadFontAsync(fb); LOADED_FONTS.push(fb); break; } catch (e) {}
    }
  }
}
function resolveFont(family, style) {
  if (LOADED_FONTS.some(f => f.family === family && f.style === style)) return { family, style };
  return LOADED_FONTS[0] || null; // 兜底到已加载字体，或 null（用 Figma 默认字体）
}

// ── 工具函数 ──
function rgb(key) {
  const c = TOKENS.colors[key];
  return { r: c.r, g: c.g, b: c.b, a: 1 };
}
function fill(c) { if (typeof c === 'string') { if (c === 'transparent') return null; const col = TOKENS.colors[c]; if (!col) return null; return figma.util.solidPaint({ r: col.r, g: col.g, b: col.b, a: 1 }); } return figma.util.solidPaint(c); }
function stroke(key, w = 2) {
  const s = fill(key);
  return { strokes: s ? [s] : [], strokeWeight: w, strokeAlign: 'OUTSIDE' };
}
function shadow(cfg) {
  const c = cfg.color === 'acid' ? rgb('acid') : rgb('ink');
  return { type: 'DROP_SHADOW', visible: true, radius: 0, offset: { x: cfg.x, y: cfg.y }, spread: 0, color: { ...c, a: 1 } };
}
function rect(name, w, h, o = {}) {
  const r = figma.createRectangle(); r.name = name; r.resize(w, h);
  if (o.fill) { const f = fill(o.fill); r.fills = f ? [f] : []; }
  if (o.stroke) Object.assign(r, stroke(o.stroke, o.strokeWeight));
  if (o.cr !== undefined) r.cornerRadius = o.cr;
  if (o.shadow) r.effects = [shadow(o.shadow)];
  return r;
}
function text(name, content, o = {}) {
  const t = figma.createText(); t.name = name; t.characters = content;
  const fn = resolveFont(o.font || TOKENS.fonts.body.family, o.fontStyle || 'Regular');
  if (fn) t.fontName = fn;
  t.fontSize = o.size || 14;
  const tc = fill(o.color || 'ink'); t.fills = tc ? [tc] : [];
  if (o.ls !== undefined) t.letterSpacing = { value: o.ls, unit: 'PIXELS' };
  if (o.upper) t.textCase = 'UPPER';
  return t;
}
function frame(name, w, h, o = {}) {
  const f = figma.createFrame(); f.name = name;
  if (w != null && h != null) f.resize(w, h);
  f.fills = [];
  if (o.bg) { const fb = fill(o.bg); if (fb) f.fills = [fb]; }
  if (o.stroke) Object.assign(f, stroke(o.stroke, o.strokeWeight));
  if (o.cr !== undefined) f.cornerRadius = o.cr;
  if (o.pad) { f.paddingTop = o.pad.t||0; f.paddingBottom = o.pad.b||0; f.paddingLeft = o.pad.l||0; f.paddingRight = o.pad.r||0; }
  if (o.layout) {
    f.layoutMode = o.layout;
    f.itemSpacing = o.gap || 0;
    f.primaryAxisAlignItems = o.align || 'MIN';
    f.counterAxisAlignItems = o.crossAlign || 'MIN';
  }
  return f;
}
function pos(n, x, y) { n.x = x; n.y = y; return n; }
function spec(content, o = {}) { return text('Spec', content, { font: TOKENS.fonts.mono.family, size: o.size||9, color: o.color||'gray', ...o }); }

// ═══════════════════════════════════════════
// PAGE 1: 🎨 Design Tokens
// ═══════════════════════════════════════════
// 复用已有页面（清空内容），不够再新建 —— 兼容 Figma 免费版「每文件最多 3 页」限制
function getOrCreatePage(index, name) {
  const root = figma.root;
  if (root.children.length > index) {
    const p = root.children[index];
    p.name = name;
    p.children.slice().forEach(c => c.remove()); // 复用：先清空旧内容
    return p;
  }
  const p = figma.createPage();
  p.name = name;
  return p;
}

async function generatePage1_DesignTokens() {
  await loadFonts();
  const page = getOrCreatePage(0, '🎨 01-Design-Tokens');
  page.name = '🎨 01-Design-Tokens';
  let y = 32;

  // 标题
  pos(text('Title', 'VECTOREE DESIGN SYSTEM v3.0', { font: TOKENS.fonts.display.family, size: 32, color: 'ink' }), 48, y);
  y += 48;
  pos(spec('Design Tokens extracted from vectoree.ai production environment via Puppeteer'), 48, y);
  y += 64;

  // ═══ MODULE 1-A: COLOR PALETTE ═══
  const m1a = frame('MODULE: Color Palette', PAGE_WIDTH, 220, { bg: 'white', stroke: 'ink', strokeWeight: 1 });
  pos(m1a, 48, y); page.appendChild(m1a);
  pos(text('MT', 'COLOR PALETTE — 9 Colors', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  // 颜色表格
  let cx = 24, cy = 56;
  Object.entries(TOKENS.colors).forEach(([key, c], i) => {
    const swatch = rect(`${c.name} (${c.hex})`, 80, 80, { fill: key, cr: 0 });
    pos(swatch, cx, cy); m1a.appendChild(swatch);
    pos(spec(c.hex.toUpperCase(), { size: 8 }), cx, cy + 84);
    pos(text('CN', c.name, { size: 9, color: 'ink' }), cx - 5, cy + 98);
    cx += 115;
    if ((i+1) % 5 === 0) { cx = 24; cy += 140; }
  });

  // 用法说明
  pos(spec('Primary: #D8FF00 | Text/Bg: #101010 | Surface: #F1F1E8 | Card: #FFFFFF | Body: #6B6B60 | Subtitle: #3A3A32 | Border: #C9C9BD | Bg-Acid: #F5FFCC'), 24, 190);
  y += 240;

  // ═══ MODULE 1-B: TYPOGRAPHY ═══
  const m1b = frame('MODULE: Typography', PAGE_WIDTH, 200, { bg: 'paper', stroke: 'ink', strokeWeight: 1 });
  pos(m1b, 48, y); page.appendChild(m1b);
  pos(text('MT', 'TYPOGRAPHY — 3 Font Families', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  const fontList = [
    { ...TOKENS.fonts.display, preview: 'THE QUICK BROWN FOX', size: 28 },
    { ...TOKENS.fonts.body, preview: 'The quick brown fox jumps over the lazy dog', size: 22 },
    { ...TOKENS.fonts.mono, preview: '$ npx vectoree init my-agent', size: 20 },
  ];
  fontList.forEach((f, i) => {
    const fy = 60 + i * 44;
    pos(text('FP', f.preview, { font: f.family, size: f.size, color: 'ink' }), 24, fy);
    pos(spec(`${f.family} / ${f.style} — ${f.usage}`, { size: 10 }), 24, fy + f.size + 6);
  });

  pos(spec('Display=Archivo Black(全大写标题) | Body=Space Grotesk(正文) | Code=JetBrains Mono(终端/标签/等宽)'), 24, 180);
  y += 220;

  // ═══ MODULE 1-C: SPACING SCALE ═══
  const m1c = frame('MODULE: Spacing Scale', PAGE_WIDTH, 140, { bg: 'white', stroke: 'ink', strokeWeight: 1 });
  pos(m1c, 48, y); page.appendChild(m1c);
  pos(text('MT', 'SPACING SCALE — 8 Levels', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  TOKENS.spacing.forEach((s, i) => {
    const sx = 24 + i * 130;
    const box = rect(`${s.label}: ${s.value}px`, s.value, s.value, { fill: 'acid', stroke: 'ink', strokeWeight: 1, cr: 0 });
    pos(box, sx, 56); m1c.appendChild(box);
    pos(spec(s.label, { size: 9, fw: 700 }), sx + s.value/2 - 8, s.value + 58);
    pos(spec(`${s.value}px`, { size: 8 }), sx - 2, s.value + 74);
    pos(spec(s.token, { size: 7, color: 'gray' }), sx - 12, s.value + 88);
  });

  pos(spec('XS:4 SM:8 MD:12 LG:16 XL:24 2XL:32 3XL:48 4XL:64 (px)'), 24, 120);
  y += 160;

  // ═══ MODULE 1-D: SHADOW SYSTEM ═══
  const m1d = frame('MODULE: Shadow System', PAGE_WIDTH, 160, { bg: 'paper', stroke: 'ink', strokeWeight: 1 });
  pos(m1d, 48, y); page.appendChild(m1d);
  pos(text('MT', 'SHADOW SYSTEM — Hard Shadow (No Blur)', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  TOKENS.shadows.forEach((s, i) => {
    const sx = 24 + i * 260;
    const box = rect(s.name, 80, 80, { fill: 'white', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: s });
    pos(box, sx, 56); m1d.appendChild(box);
    pos(text('SN', s.name, { font: TOKENS.fonts.mono.family, size: 11, color: 'ink', fw: 700 }), sx - 4, 144);
    pos(spec(s.css, { size: 9 }), sx - 4, 160);
  });

  pos(spec('All shadows: offset-only, no blur, 0 spread. SM=小元素 MD=卡片 LG=重要卡片 Acid=终端/强调'), 24, 180);
  y += 200;

  // ═══ MODULE 1-E: BORDER & RADIUS ═══
  const m1e = frame('MODULE: Border & Radius', PAGE_WIDTH, 100, { bg: 'white', stroke: 'ink', strokeWeight: 1 });
  pos(m1e, 48, y); page.appendChild(m1e);
  pos(text('MT', 'BORDER & CORNER RADIUS', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  // 边框示例
  [[1,'1px'],[2,'2px'],[3,'3px'],[4,'4px']].forEach(([w, label], i) => {
    const bx = 24 + i * 200;
    const b = rect(`Border ${label}`, 120, 60, { fill: 'paper', stroke: 'ink', strokeWeight: w, cr: 0 });
    pos(b, bx, 56); m1e.appendChild(b);
    pos(spec(`border: ${w}px solid #101010`, { size: 9 }), bx, 122);
  });

  pos(spec('Border: 1-4px solid #101010 | Corner Radius: 0px (全直角，无圆角) | Stroke Align: OUTSIDE'), 24, 142);
  y += 160;

  return page;
}

// ═══════════════════════════════════════════
// PAGE 2: 🔘 Components
// ═══════════════════════════════════════════
async function generatePage2_Components() {
  await loadFonts();
  const page = getOrCreatePage(1, '🔘 02-Components');
  page.name = '🔘 02-Components';
  let y = 32;

  pos(text('Title', 'UI COMPONENT LIBRARY', { font: TOKENS.fonts.display.family, size: 32, color: 'ink' }), 48, y);
  y += 64;

  // ═══ MODULE 2-A: BUTTONS ═══
  const m2a = frame('MODULE: Buttons', PAGE_WIDTH, 180, { bg: 'paper', stroke: 'ink', strokeWeight: 1 });
  pos(m2a, 48, y); page.appendChild(m2a);
  pos(text('MT', 'BUTTONS', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  // Primary
  const btnPri = frame('Button / Primary', 180, 48, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(btnPri, 24, 56); m2a.appendChild(btnPri);
  btnPri.appendChild(text('L', 'GET STARTED', { font: TOKENS.fonts.mono.family, size: 12, color: 'ink', ls: 0.06, fw: 700, upper: true }));

  // Ghost
  const btnGhost = frame('Button / Ghost', 180, 48, { fill: 'white', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(btnGhost, 230, 56); m2a.appendChild(btnGhost);
  btnGhost.appendChild(text('L', 'SIGN IN', { font: TOKENS.fonts.mono.family, size: 12, color: 'ink', ls: 0.06, fw: 700, upper: true }));

  // Dark
  const btnDark = frame('Button / Dark', 180, 48, { fill: 'ink', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'acid'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(btnDark, 436, 56); m2a.appendChild(btnDark);
  btnDark.appendChild(text('L', 'VIEW DOCS', { font: TOKENS.fonts.mono.family, size: 12, color: 'paper', ls: 0.06, fw: 700, upper: true }));

  // Small
  const btnSm = frame('Button / Small', 120, 32, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:3,y:3,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(btnSm, 642, 60); m2a.appendChild(btnSm);
  btnSm.appendChild(text('L', 'LEARN MORE', { font: TOKENS.fonts.mono.family, size: 10, color: 'ink', ls: 0.04, fw: 700, upper: true }));

  pos(spec('Primary=AcidBg+InkText | Ghost=WhiteBg+InkText | Dark=InkBg+PaperText | Sizes: 48px(Normal) 32px(Small) | Font: JetBrains Mono 11-12px 700 Uppercase | Shadow: 4px 4px #101010'), 24, 120);
  pos(spec('Hover: translate(-1px,-1px) shadow 5px | Active: translate(2px,2px) shadow 2px'), 24, 136);
  y += 200;

  // ═══ MODULE 2-B: CARDS ═══
  const m2b = frame('MODULE: Cards', PAGE_WIDTH, 280, { bg: 'white', stroke: 'ink', strokeWeight: 1 });
  pos(m2b, 48, y); page.appendChild(m2b);
  pos(text('MT', 'CARDS', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  // White Card
  const cardW = frame('Card / White', 320, 200, { fill: 'white', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', gap: 12, pad: {t:20,b:20,l:20,r:20} });
  pos(cardW, 24, 56); m2b.appendChild(cardW);
  cardW.appendChild(frame('Slot', null, 0, { layout:'HORIZONTAL' }).appendChild(text('L', 'SLOT_01', { font: TOKENS.fonts.mono.family, size: 10, color: 'ink', ls: 0.1, fw: 700, upper: true })));
  cardW.appendChild(text('T', 'Model Gateway', { font: TOKENS.fonts.display.family, size: 18, color: 'ink' }));
  cardW.appendChild(text('D', 'Unified LLM routing across providers with fallback & metering.', { size: 13, color: 'gray' }));
  cardW.appendChild(frame('Foot', null, 0, { stroke: 'lineSoft', strokeWeight: 1 }).appendChild(spec('→ Read docs')));

  // Paper Card
  const cardP = frame('Card / Paper', 320, 200, { fill: 'paper', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', gap: 12, pad: {t:20,b:20,l:20,r:20} });
  pos(cardP, 370, 56); m2b.appendChild(cardP);
  cardP.appendChild(text('L', 'SLOT_02', { font: TOKENS.fonts.mono.family, size: 10, color: 'ink', ls: 0.1, fw: 700, upper: true }));
  cardP.appendChild(text('T', 'Auth Block', { font: TOKENS.fonts.display.family, size: 18, color: 'ink' }));
  cardP.appendChild(text('D', 'Email + OAuth for your users. One-click sign-in.', { size: 13, color: 'gray' }));
  cardP.appendChild(frame('Foot', null, 0, { stroke: 'lineSoft', strokeWeight: 1 }).appendChild(spec('→ Configure')));

  // Acid Card
  const cardA = frame('Card / Featured', 320, 200, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:6,y:6,color:'ink'}, layout:'VERTICAL', gap: 12, pad: {t:20,b:20,l:20,r:20} });
  pos(cardA, 716, 56); m2b.appendChild(cardA);
  cardA.appendChild(text('L', '⭐ RECOMMENDED', { font: TOKENS.fonts.mono.family, size: 10, color: 'ink', ls: 0.1, fw: 700, upper: true }));
  cardA.appendChild(text('T', 'Pro Plan', { font: TOKENS.fonts.display.family, size: 18, color: 'ink' }));
  cardA.appendChild(text('D', 'Unlimited projects & tokens with priority support.', { size: 13, color: 'ink' }));

  pos(spec('White=#FFFFFF | Paper=#F1F1E8 | Featured=#D8FF00 | Border: 2px #101010 | Shadow: 4px(普通) 6px(高亮) | Padding: 20px | Slot: Mono 10px 700 Uppercase'), 24, 268);
  y += 300;

  // ═══ MODULE 2-C: TERMINALS ═══
  const m2c = frame('MODULE: Terminals', PAGE_WIDTH, 240, { bg: 'ink', stroke: 'ink', strokeWeight: 1 });
  pos(m2c, 48, y); page.appendChild(m2c);
  pos(text('MT', 'TERMINALS', { font: TOKENS.fonts.display.family, size: 18, color: 'acid', upper: true }), 24, 20);

  // Hero Terminal
  const termHero = frame('Terminal / Hero', 480, 150, { fill: 'ink', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:6,y:6,color:'acid'}, layout:'VERTICAL', gap: 4, pad: {t:16,b:16,l:20,r:20} });
  pos(termHero, 24, 56); m2c.appendChild(termHero);
  termHero.appendChild(text('P', '$ vectoree init my-agent', { font: TOKENS.fonts.mono.family, size: 13, color: 'acid' }));
  termHero.appendChild(text('O', '→ Model gateway configured', { font: TOKENS.fonts.mono.family, size: 12, color: 'gray' }));
  termHero.appendChild(text('O', '→ Auth block ready', { font: TOKENS.fonts.mono.family, size: 12, color: 'gray' }));
  termHero.appendChild(text('OK', '✓ Agent shipped in 2 hours', { font: TOKENS.fonts.mono.family, size: 12, color: 'acid' }));

  // SDK Terminal (Yellow Border)
  const termSDK = frame('Terminal / SDK Yellow Border', 480, 150, { fill: 'ink', stroke: 'acid', strokeWeight: 3, cr: 0, shadow: {x:6,y:6,color:'acid'}, layout:'VERTICAL', gap: 0 });
  pos(termSDK, 530, 56); m2c.appendChild(termSDK);
  // Header
  const sdkHdr = frame('Header', 480, 36, { fill: {r:0.04,g:0.04,b:0.04,a:1}, stroke: 'acid', strokeWeight: 2, layout:'HORIZONTAL', align:'SPACE_BETWEEN', pad:{l:16,r:16} });
  sdkHdr.appendChild(text('F', 'SERVER.TS', { font: TOKENS.fonts.mono.family, size: 11, color: 'acid', ls: 0.06, upper: true }));
  sdkHdr.appendChild(text('V', 'OPENAI SDK · COMPATIBLE', { font: TOKENS.fonts.mono.family, size: 10, color: 'acid', ls: 0.04, upper: true }));
  termSDK.appendChild(sdkHdr);
  // Body
  const sdkBody = frame('Body', 440, 100, { layout:'VERTICAL', gap: 4, pad:{t:12,l:20,r:20} });
  sdkBody.appendChild(text('C', "import OpenAI from 'openai'", { font: TOKENS.fonts.mono.family, size: 13, color: 'paper' }));
  sdkBody.appendChild(text('C', 'const client = new OpenAI({', { font: TOKENS.fonts.mono.family, size: 13, color: 'paper' }));
  sdkBody.appendChild(text('C', '  baseURL: "https://vectoree.ai/api/v1",', { font: TOKENS.fonts.mono.family, size: 13, color: 'paper' }));
  sdkBody.appendChild(text('C', '  apiKey: process.env.VECTOREE_API_KEY,', { font: TOKENS.fonts.mono.family, size: 13, color: 'paper' }));
  sdkBody.appendChild(text('C', '});', { font: TOKENS.fonts.mono.family, size: 13, color: 'paper' }));
  termSDK.appendChild(sdkBody);

  pos(spec('Bg: #101010 | Font: JetBrains Mono 12-13px | Prompt: #D8FF00 | Output: #6B6B60 | OK: #D8FF00 | Comment: #555555 | Shadow: 6px 6px #D8FF00', {color:'paper'}), 24, 218);
  spec('SDK Variant: 3px Yellow Border (#D8FF00) + File Header Bar', {color:'paper'});
  y += 260;

  // ═══ MODULE 2-D: STICKERS / LABELS ═══
  const m2d = frame('MODULE: Stickers & Labels', PAGE_WIDTH, 140, { bg: 'paper', stroke: 'ink', strokeWeight: 1 });
  pos(m2d, 48, y); page.appendChild(m2d);
  pos(text('MT', 'STICKERS / LABELS', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  // Acid Sticker
  const stA = frame('Sticker / Acid', 140, 36, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:3,y:3,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(stA, 24, 56); m2d.appendChild(stA);
  stA.appendChild(text('L', '4 STEPS', { font: TOKENS.fonts.mono.family, size: 11, color: 'ink', ls: 0.1, fw: 700, upper: true }));

  // Ink Sticker
  const stI = frame('Sticker / Ink', 140, 36, { fill: 'ink', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:3,y:3,color:'acid'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(stI, 185, 56); m2d.appendChild(stI);
  stI.appendChild(text('L', 'PRICING', { font: TOKENS.fonts.mono.family, size: 11, color: 'paper', ls: 0.1, fw: 700, upper: true }));

  // Step Number
  const stN = frame('Step Number', 50, 26, { fill: 'acid', stroke: 'ink', strokeWeight: 1.5, cr: 0, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(stN, 350, 61); m2d.appendChild(stN);
  stN.appendChild(text('N', '01', { font: TOKENS.fonts.mono.family, size: 11, color: 'ink', fw: 700 }));

  // Eyebrow Label
  const stE = frame('Eyebrow', 180, 32, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(stE, 425, 58); m2d.appendChild(stE);
  stE.appendChild(text('L', 'AI AGENT INFRASTRUCTURE', { font: TOKENS.fonts.mono.family, size: 10, color: 'ink', ls: 0.1, fw: 700, upper: true }));

  // Command Tag
  const stC = frame('Command Tag', 300, 32, { stroke: 'acid', strokeWeight: 2, cr: 0, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  pos(stC, 630, 58); m2d.appendChild(stC);
  stC.appendChild(text('L', 'npx skills add VectoreeAI/vectoree-skills', { font: TOKENS.fonts.mono.family, size: 11, color: 'acid' }));

  pos(spec('Acid Sticker: #D8FF00 bg + Ink text | Ink Sticker: #101010 bg + Paper text | StepNum: smaller | CommandTag: transparent + yellow border + text'), 24, 104);
  y += 160;

  // ═══ MODULE 2-E: PRICING CARDS ═══
  const m2e = frame('MODULE: Pricing Cards', PAGE_WIDTH, 320, { bg: 'paper', stroke: 'ink', strokeWeight: 1 });
  pos(m2e, 48, y); page.appendChild(m2e);
  pos(text('MT', 'PRICING CARDS', { font: TOKENS.fonts.display.family, size: 18, color: 'ink', upper: true }), 24, 20);

  // Free
  const pFree = frame('Pricing / Free', 360, 250, { fill: 'white', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', gap: 14, pad: {t:28,b:28,l:28,r:28} });
  pos(pFree, 24, 56); m2e.appendChild(pFree);
  pFree.appendChild(text('PL', 'FREE', { font: TOKENS.fonts.display.family, size: 26, color: 'ink' }));
  pFree.appendChild(text('$', '$0', { font: TOKENS.fonts.display.family, size: 48, color: 'ink' }));
  pFree.appendChild(text('Per', 'forever · side projects', { size: 13, color: 'gray' }));
  pFree.appendChild(spec('✓ 1 project · 1M tokens/mo included'));
  pFree.appendChild(spec('✓ Community support'));
  pFree.appendChild(frame('Btn', 160, 44, { fill: 'white', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' }).appendChild(text('L', 'GET STARTED', { font: TOKENS.fonts.mono.family, size: 11, color: 'ink', ls: 0.06, fw: 700, upper: true })));

  // Pro
  const pPro = frame('Pricing / Pro', 360, 250, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:6,y:6,color:'ink'}, layout:'VERTICAL', gap: 14, pad: {t:28,b:28,l:28,r:28} });
  pos(pPro, 410, 56); m2e.appendChild(pPro);
  pPro.appendChild(text('PL', 'PRO', { font: TOKENS.fonts.display.family, size: 26, color: 'ink' }));
  pPro.appendChild(text('$', '$49', { font: TOKENS.fonts.display.family, size: 48, color: 'ink' }));
  pPro.appendChild(text('Per', '/month per seat', { size: 13, color: 'ink' }));
  pPro.appendChild(spec('✓ Unlimited projects & tokens'));
  pPro.appendChild(spec('✓ Priority support + SLA'));
  pPro.appendChild(frame('Btn', 160, 44, { fill: 'ink', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'acid'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' }).appendChild(text('L', 'UPGRADE NOW', { font: TOKENS.fonts.mono.family, size: 11, color: 'acid', ls: 0.06, fw: 700, upper: true })));

  // Enterprise
  const pEnt = frame('Pricing / Enterprise', 360, 250, { fill: 'ink', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:6,y:6,color:'acid'}, layout:'VERTICAL', gap: 14, pad: {t:28,b:28,l:28,r:28} });
  pos(pEnt, 796, 56); m2e.appendChild(pEnt);
  pEnt.appendChild(text('PL', 'ENTERPRISE', { font: TOKENS.fonts.display.family, size: 26, color: 'acid' }));
  pEnt.appendChild(text('$', 'Custom', { font: TOKENS.fonts.display.family, size: 36, color: 'paper' }));
  pEnt.appendChild(text('Per', 'contact sales', { size: 13, color: 'gray' }));
  pEnt.appendChild(spec('✓ Dedicated infrastructure', { color: 'paper' }));
  pEnt.appendChild(spec('✅ SSO + Audit logs + SLA', { color: 'paper' }));
  pEnt.appendChild(frame('Btn', 160, 44, { fill: 'acid', stroke: 'ink', strokeWeight: 2, cr: 0, shadow: {x:4,y:4,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' }).appendChild(text('L', 'CONTACT US', { font: TOKENS.fonts.mono.family, size: 11, color: 'ink', ls: 0.06, fw: 700, upper: true })));

  pos(spec('Free: White bg | Pro: Acid bg (featured) | Enterprise: Ink bg | Width: 360px | Padding: 28px | Price: Display 48px | Button in card footer'), 24, 318);
  y += 340;

  return page;
}

// ═══════════════════════════════════════════
// PAGE 3: 📄 Homepage Sections
// ═══════════════════════════════════════════
function generateHomepageInto(page, startY) {
  let y = startY;

  page.appendChild(pos(text('Title', 'HOMEPAGE SECTIONS — 1:1 Production Replica', { font: TOKENS.fonts.display.family, size: 32, color: 'ink' }), 48, y));
  y += 64;

  // ═══ MODULE 3-A: HERO SECTION ═══
  const m3a = frame('SECTION: Hero', PAGE_WIDTH, 540, { bg: 'paper', cr: 0 });
  pos(m3a, 48, y); page.appendChild(m3a);
  pos(text('MT', 'HERO SECTION', { font: TOKENS.fonts.display.family, size: 16, color: 'ink', upper: true }), 24, 12);
  pos(spec('1120×540 | Background: #F1F1E8 (Paper) | Layout: 2-column Grid (1.1fr 0.9fr) | Gap: 48px'), 24, 524);

  // Left: Text
  const heroLeft = frame('Hero Left', 520, 440, { layout:'VERTICAL', gap: 16 });
  pos(heroLeft, 48, 40); m3a.appendChild(heroLeft);
  heroLeft.appendChild(frame('Sticker', null, 0, {fill:'acid',stroke:'ink',strokeWeight:2,cr:0,layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER',pad:{t:5,b:5,l:12,r:12}}).appendChild(text('L','AI AGENT INFRASTRUCTURE',{font:TOKENS.fonts.mono.family,size:11,color:'ink',ls:0.1,fw:700,upper:true})));
  heroLeft.appendChild(text('Title','SHIP YOUR\nAI AGENT\nIN HOURS.',{font:TOKENS.fonts.display.family,size:56,color:'ink'}));
  heroLeft.appendChild(text('Sub','The full-stack platform for shipping AI agents — model gateway, auth, billing, storage, and deploy. One SDK, zero infra headaches.',{size:16,color:'ink40'}));

  const ctaRow = frame('CTA Row', 340, 48, { layout:'HORIZONTAL', gap: 12 });
  const cta1 = frame('CTA1', 160, 44, { fill:'acid',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:4,y:4,color:'ink'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
  cta1.appendChild(text('L','GET STARTED',{font:TOKENS.fonts.mono.family,size:11,color:'ink',ls:0.06,fw:700,upper:true}));
  const cta2 = frame('CTA2', 160, 44, { fill:'white',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:4,y:4,color:'ink'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
  cta2.appendChild(text('L','VIEW DOCS',{font:TOKENS.fonts.mono.family,size:11,color:'ink',ls:0.06,fw:700,upper:true}));
  ctaRow.appendChild(cta1); ctaRow.appendChild(cta2);
  heroLeft.appendChild(ctaRow);

  // Right: Vee Card
  const veeCard = frame('Vee Card', 260, 340, { fill:'white',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:6,y:6,color:'ink'},layout:'VERTICAL',gap:16,pad:{t:32,b:32,l:24,r:24},align:'CENTER',crossAlign:'CENTER' });
  pos(veeCard, 600, 40); m3a.appendChild(veeCard);
  veeCard.appendChild(text('Vee','🤖',{size:80}));
  veeCard.appendChild(text('VL','VEE — YOUR AGENT',{font:TOKENS.fonts.mono.family,size:10,color:'ink',ls:0.1,upper:true}));

  // Right: Terminal
  const heroTerm = frame('Hero Terminal', 400, 170, { fill:'ink',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:6,y:6,color:'acid'},pad:{t:16,b:16,l:20,r:20},layout:'VERTICAL',gap:4 });
  pos(heroTerm, 480, 398); m3a.appendChild(heroTerm);
  heroTerm.appendChild(text('P','$ vectoree init my-agent',{font:TOKENS.fonts.mono.family,size:13,color:'acid'}));
  heroTerm.appendChild(text('O','→ Model gateway configured',{font:TOKENS.fonts.mono.family,size:12,color:'gray'}));
  heroTerm.appendChild(text('O','→ Auth block ready',{font:TOKENS.fonts.mono.family,size:12,color:'gray'}));
  heroTerm.appendChild(text('OK','✓ Agent shipped in 2 hours',{font:TOKENS.fonts.mono.family,size:12,color:'acid'}));

  y += 570;

  // ═══ MODULE 3-B: APP STACK SECTION ═══
  const m3b = frame('SECTION: App Stack', PAGE_WIDTH, 420, { bg: 'paper', cr: 0 });
  pos(m3b, 48, y); page.appendChild(m3b);
  pos(text('MT', 'APP STACK SECTION', { font: TOKENS.fonts.display.family, size: 16, color: 'ink', upper: true }), 24, 12);
  pos(spec('1120×420 | Background: #F1F1E8 | Grid: 3 columns × 2 rows | Gap: 16px | Cards: White bg + Ink border + Hard shadow'), 24, 404);

  // 6 cards
  const apps = [
    { slot: 'SLOT_01', title: 'Model Gateway', desc: 'Unified LLM routing across providers with fallback policies.' },
    { slot: 'SLOT_02', title: 'Auth Block', desc: 'Email + OAuth for your users. One-click sign-in flow.' },
    { slot: 'SLOT_03', title: 'Billing Engine', desc: 'Subscriptions & metered billing. Charge per token or per seat.' },
    { slot: 'SLOT_04', title: 'Vector Store', desc: 'Embedded database for agent memory & RAG pipelines.' },
    { slot: 'SLOT_05', title: 'File Storage', desc: 'User uploads & generated artifacts. Auto CDN delivery.' },
    { slot: 'SLOT_06', title: 'Edge Deploy', desc: 'Push to global edge. Zero-config CI/CD for agents.' },
  ];
  apps.forEach((app, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const card = frame(`App ${app.slot}`, 340, 170, { fill:'white',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:4,y:4,color:'ink'},layout:'VERTICAL',gap:10,pad:{t:20,b:20,l:20,r:20} });
    pos(card, 24 + col * 356, 44 + row * 182); m3b.appendChild(card);
    card.appendChild(text('SL', app.slot, { font: TOKENS.fonts.mono.family, size: 9, color: 'ink', ls: 0.14, fw: 700, upper: true }));
    card.appendChild(text('AT', app.title, { font: TOKENS.fonts.display.family, size: 17, color: 'ink' }));
    card.appendChild(text('AD', app.desc, { size: 12, color: 'gray' }));
    card.appendChild(frame('AFoot', null, 0, { stroke: 'lineSoft', strokeWeight: 1, pad:{t:8} }).appendChild(spec('→ Learn more')));
  });

  y += 450;

  // ═══ MODULE 3-C: ASSEMBLY LINE (4 STEPS) ═══
  const m3c = frame('SECTION: Assembly Line', PAGE_WIDTH, 290, { bg: 'paper', stroke: 'ink', strokeWeight: 2, cr: 0 });
  pos(m3c, 48, y); page.appendChild(m3c);
  pos(text('MT', 'ASSEMBLY LINE SECTION (4 Steps)', { font: TOKENS.fonts.display.family, size: 16, color: 'ink', upper: true }), 24, 12);
  pos(spec('1120×290 | Background: #F1F1E8 | Border-Y: 2px #101010 | Grid: 4 columns | Gap: 16px | Step Cards: White bg + 3px shadow'), 24, 272);

  // Title row
  pos(text('ST','THE ASSEMBLY LINE.',{font:TOKENS.fonts.display.family,size:28,color:'ink'}), 24, 44);
  const badge = frame('Badge', 80, 28, { fill:'acid',stroke:'ink',strokeWeight:1.5,cr:0,shadow:{x:2,y:2,color:'ink'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
  pos(badge, 310, 46); m3c.appendChild(badge);
  badge.appendChild(text('L','4 STEPS',{font:TOKENS.fonts.mono.family,size:9,color:'ink',ls:0.1,fw:700,upper:true}));
  pos(text('SD','// login, link, pick a model, then call the gateway or create a table',{font:TOKENS.fonts.mono.family,size:11,color:'gray'}), 24, 82);

  // 4 steps
  const steps = [
    { num: '01', title: 'INSTALL THE SKILL', desc: 'npx skills add VectoreeAI/vectoree-skills' },
    { num: '02', title: 'LOGIN & LINK', desc: 'npx @vectoree/cli login → link' },
    { num: '03', title: 'PICK A MODEL', desc: 'catalog · vectoree/free · vectoree/auto' },
    { num: '04', title: 'CALL THE API', desc: 'gateway HTTP · db create' },
  ];
  const stepW = 252;
  steps.forEach((step, i) => {
    const sc = frame(`Step ${step.num}`, stepW, 130, { fill:'white',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:3,y:3,color:'ink'},layout:'VERTICAL',gap:8,pad:{t:14,b:14,l:14,r:14} });
    pos(sc, 24 + i * (stepW + 16), 116); m3c.appendChild(sc);
    
    const num = frame('Num', 38, 24, { fill:'acid',stroke:'ink',strokeWeight:1.5,cr:0,layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
    num.appendChild(text('N', step.num, { font: TOKENS.fonts.mono.family, size: 10, color: 'ink', fw: 700 }));
    sc.appendChild(num);
    sc.appendChild(text('ST', step.title, { font: TOKENS.fonts.display.family, size: 12, color: 'ink', upper: true }));
    sc.appendChild(text('SS', step.desc, { font: TOKENS.fonts.mono.family, size: 9, color: 'gray' }));

    // Arrow
    if (i < 3) {
      pos(text('Arr','→',{font:TOKENS.fonts.mono.family,size:18,color:'gray',fw:700}), 24 + (i+1)*(stepW+16) - 16, 168);
    }
  });

  y += 320;

  // ═══ MODULE 3-D: SDK SECTION (左右两栏) ═══
  const m3d = frame('SECTION: SDK', PAGE_WIDTH, 450, { bg: 'ink', cr: 0 });
  pos(m3d, 48, y); page.appendChild(m3d);
  pos(text('MT', 'SDK SECTION (SKILL + CLI · OPENAI-COMPATIBLE)', { font: TOKENS.fonts.display.family, size: 16, color: 'acid', upper: true }), 24, 12);
  pos(spec('1120×450 | Background: #101010 (Ink) | Layout: 2-column (Left: Terminal 520px | Right: Info 440px) | Gap: 40px', {color:'paper'}), 24, 434);

  // Left: SDK Terminal
  const sdkTerm = frame('SDK Terminal', 540, 380, { fill:{r:0.04,g:0.04,b:0.04,a:1},stroke:'acid',strokeWeight:3,cr:0,shadow:{x:6,y:6,color:'acid'},layout:'VERTICAL',gap:0 });
  pos(sdkTerm, 40, 44); m3d.appendChild(sdkTerm);

  const sdkHdr = frame('SDK Header', 540, 38, { fill:{r:0.04,g:0.04,b:0.04,a:1},stroke:'acid',strokeWeight:2,cr:0,layout:'HORIZONTAL',align:'SPACE_BETWEEN',pad:{l:16,r:16} });
  sdkHdr.appendChild(text('F','SERVER.TS',{font:TOKENS.fonts.mono.family,size:11,color:'acid',ls:0.06,upper:true}));
  sdkHdr.appendChild(text('V','OPENAI SDK · COMPATIBLE',{font:TOKENS.fonts.mono.family,size:10,color:'acid',ls:0.04,upper:true}));
  sdkTerm.appendChild(sdkHdr);

  const sdkBody = frame('SDK Body', 500, 320, { layout:'VERTICAL',gap:4,pad:{t:20,l:20,r:20} });
  sdkBody.appendChild(text('C',"import OpenAI from 'openai'",{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('C','',{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('C','const client = new OpenAI({',{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('C','  baseURL: "https://vectoree.ai/api/v1",',{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('C','  apiKey: process.env.VECTOREE_API_KEY,',{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('C','});',{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('C','',{font:TOKENS.fonts.mono.family,size:13,color:'paper'}));
  sdkBody.appendChild(text('CM','// one project key. OpenAI-compatible.',{font:TOKENS.fonts.mono.family,size:12,color:{r:0.33,g:0.33,b:0.33,a:1}}));
  sdkTerm.appendChild(sdkBody);

  // Right: Info
  const sdkInfo = frame('SDK Info', 460, 380, { layout:'VERTICAL',gap:20,pad:{t:40,l:0,r:0,b:0} });
  pos(sdkInfo, 610, 44); m3d.appendChild(sdkInfo);
  sdkInfo.appendChild(text('SKT','SKILL + CLI.\nOPENAI-COMPATIBLE.',{font:TOKENS.fonts.display.family,size:30,color:'acid'}));
  sdkInfo.appendChild(text('SKD','The coding agent installs the skill and runs atomic CLI commands. Your app uses the OpenAI SDK against Vectoree. @vectoree/sdk is not a launch deliverable.',{size:14,color:{r:0.67,g:0.67,b:0.67,a:1}}));

  const cmdBox = frame('Cmd Box', 440, 42, { stroke:'acid',strokeWeight:2,cr:0,pad:{l:16,r:16},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
  cmdBox.appendChild(text('CMD','npx skills add VectoreeAI/vectoree-skills',{font:TOKENS.fonts.mono.family,size:12,color:'acid'}));
  sdkInfo.appendChild(cmdBox);

  [
    {num:'01',label:'Install:',desc:'npx skills add VectoreeAI/vectoree-skills'},
    {num:'02',label:'CLI:',desc:'login · link · db · storage · ai'},
    {num:'03',label:'App runtime:',desc:'OpenAI SDK + Vectoree baseURL (server-side key)'},
  ].forEach(s => {
    const sr = frame('StepRow', 440, 28, { layout:'HORIZONTAL', gap: 10 });
    sr.appendChild(text('N', s.num, { font: TOKENS.fonts.mono.family, size: 11, color: 'acid', fw: 700 }));
    sr.appendChild(text('L', `${s.label} ${s.desc}`, { size: 12, color: { r: 0.8, g: 0.8, b: 0.8, a: 1 } }));
    sdkInfo.appendChild(sr);
  });

  y += 480;

  // ═══ MODULE 3-E: PRICING SECTION ═══
  const m3e = frame('SECTION: Pricing', PAGE_WIDTH, 380, { bg: 'paper', cr: 0 });
  pos(m3e, 48, y); page.appendChild(m3e);
  pos(text('MT', 'PRICING SECTION', { font: TOKENS.fonts.display.family, size: 16, color: 'ink', upper: true }), 24, 12);
  pos(spec('1120×380 | Background: #F1F1E8 | Layout: Title + 2 Pricing Cards (Free + Pro) | Cards: 340px wide'), 24, 364);

  pos(text('PT','Pay for glue,\nnot for seats.',{font:TOKENS.fonts.display.family,size:36,color:'ink'}), 24, 44);
  const pb = frame('PB', 80, 28, { fill:'acid',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:2,y:2,color:'ink'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
  pos(pb, 310, 52); m3e.appendChild(pb);
  pb.appendChild(text('L','PRICING',{font:TOKENS.fonts.mono.family,size:10,color:'ink',ls:0.1,fw:700,upper:true}));
  pos(text('PD','// model tokens billed at cost — we charge for the platform, not the markup',{font:TOKENS.fonts.mono.family,size:11,color:'gray'}), 24, 88);

  // Free
  const pf = frame('Pricing Free', 340, 240, { fill:'white',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:4,y:4,color:'ink'},layout:'VERTICAL',gap:12,pad:{t:24,b:24,l:24,r:24} });
  pos(pf, 24, 124); m3e.appendChild(pf);
  pf.appendChild(text('PL','FREE',{font:TOKENS.fonts.display.family,size:22,color:'ink'}));
  pf.appendChild(text('$','$0',{font:TOKENS.fonts.display.family,size:42,color:'ink'}));
  pf.appendChild(text('Pr','forever · side projects',{size:12,color:'gray'}));
  pf.appendChild(spec('✓ 1 project · 1M tokens/mo included'));
  pf.appendChild(spec('✓ Community support'));

  // Pro
  const pp = frame('Pricing Pro', 340, 240, { fill:'acid',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:6,y:6,color:'ink'},layout:'VERTICAL',gap:12,pad:{t:24,b:24,l:24,r:24} });
  pos(pp, 388, 124); m3e.appendChild(pp);
  pp.appendChild(text('PL','PRO',{font:TOKENS.fonts.display.family,size:22,color:'ink'}));
  pp.appendChild(text('$','$49',{font:TOKENS.fonts.display.family,size:42,color:'ink'}));
  pp.appendChild(text('Pr','/month per seat',{size:12,color:'ink'}));
  pp.appendChild(spec('✓ Unlimited projects & tokens'));
  pp.appendChild(spec('✓ Priority support + SLA'));

  y += 410;

  // ═══ MODULE 3-F: CTA SECTION ═══
  const m3f = frame('SECTION: CTA', PAGE_WIDTH, 200, { fill: 'acid', cr: 0 });
  pos(m3f, 48, y); page.appendChild(m3f);
  pos(text('MT', 'CTA SECTION (Full-width Acid Block)', { font: TOKENS.fonts.display.family, size: 16, color: 'ink', upper: true }), 24, 12);
  // 绝对定位摆放（不开启自动布局），内容居中对齐
  pos(text('CT','START BUILDING.\nSHIP IN HOURS.',{font:TOKENS.fonts.display.family,size:36,color:'ink'}), 340, 40);
  const ctaBtn = frame('CTA Btn', 220, 52, { fill:'ink',stroke:'ink',strokeWeight:2,cr:0,shadow:{x:4,y:4,color:'white'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
  pos(ctaBtn, 450, 120); m3f.appendChild(ctaBtn);
  ctaBtn.appendChild(text('L','GET STARTED FREE',{font:TOKENS.fonts.mono.family,size:11,color:'acid',ls:0.06,fw:700,upper:true}));

  pos(spec('Background: #D8FF00 (Acid) | Full width 1120px | Centered content | Button: Ink bg + White shadow'), 24, 184);
  y += 230;

  // ═══ MODULE 3-G: FOOTER SECTION ═══
  const m3g = frame('SECTION: Footer', PAGE_WIDTH, 180, { fill: 'ink', cr: 0 });
  pos(m3g, 48, y); page.appendChild(m3g);
  pos(text('MT', 'FOOTER SECTION', { font: TOKENS.fonts.display.family, size: 16, color: 'acid', upper: true }), 24, 12);
  // 绝对定位摆放（不开启自动布局）
  pos(text('Logo','VECTOREE',{font:TOKENS.fonts.display.family,size:20,color:'acid'}), 48, 48);
  const links = frame('Links', 220, 100, {}); // 非自动布局，子元素用 pos
  pos(links, 700, 40); m3g.appendChild(links);
  ['Product','Docs','Pricing','Blog','GitHub'].forEach((l, i) => {
    pos(text('LK', l.toUpperCase(), { font: TOKENS.fonts.mono.family, size: 11, color: 'paper', ls: 0.08 }), 0, i * 20);
  });
  pos(text('CP','© 2026 Vectoree AI, Inc.',{font:TOKENS.fonts.mono.family,size:10,color:{r:0.4,g:0.4,b:0.4,a:1}}), 48, 152);

  pos(spec('Background: #101010 (Ink) | Logo: Archivo Black 20px #D8FF00 | Links: Space Grotesk 11px #FFFFFF | Copyright: JetBrains Mono 10px #666'), 24, 166);

  return y;
}

// ═══════════════════════════════════════════
// DASHBOARD MODULES — 真实 UI 切片
// ═══════════════════════════════════════════
function generateDashboardInto(page, startY) {
  let y = startY;
  page.appendChild(pos(text('BT','DASHBOARD MODULES — 生产环境真实 UI 切片',{font:TOKENS.fonts.display.family,size:22,color:'ink'}), 48, y));
  y += 44;
  page.appendChild(pos(spec('Dashboard 布局：Sidebar 232px + Main 888px (1120-232)。真实文案来自 overview.html'), 48, y));
  y += 36;

  // ── MODULE: Sidebar ──
  const sbW = 232, sbH = 700;
  const sb = frame('MODULE: Dashboard / Sidebar', sbW, sbH, { bg:'paper', stroke:'ink', strokeWeight:1 });
  pos(sb, 48, y); page.appendChild(sb);
  pos(text('MT','DASHBOARD SIDEBAR',{font:TOKENS.fonts.display.family,size:12,color:'ink',upper:true}), 12, 10);
  pos(rect('Vee',22,22,{fill:'acid',stroke:'ink',strokeWeight:2}), 16, 34);
  pos(text('Brand','VECTOREE',{font:TOKENS.fonts.display.family,size:14,color:'ink'}), 46, 36);
  const org = frame('OrgPill', 200, 30, { fill:'white', stroke:'ink', strokeWeight:1, layout:'HORIZONTAL', align:'SPACE_BETWEEN', crossAlign:'CENTER', pad:{l:10,r:10} });
  pos(org, 16, 68); sb.appendChild(org);
  org.appendChild(text('T','NORA 的组织',{font:TOKENS.fonts.mono.family,size:10,color:'ink',fw:700}));
  org.appendChild(text('A','▾',{font:TOKENS.fonts.mono.family,size:10,color:'ink'}));
  const proj = frame('ProjPill', 200, 30, { fill:'acid', stroke:'ink', strokeWeight:1, layout:'HORIZONTAL', align:'SPACE_BETWEEN', crossAlign:'CENTER', pad:{l:10,r:10} });
  pos(proj, 16, 104); sb.appendChild(proj);
  proj.appendChild(text('T','/ Default Project',{font:TOKENS.fonts.mono.family,size:10,color:'ink',fw:700}));
  proj.appendChild(text('A','▾',{font:TOKENS.fonts.mono.family,size:10,color:'ink'}));
  const navGroups = [
    { title:'OVERVIEW', items:['Dashboard'] },
    { title:'BUILD', items:['Model Plaza','Templates','Skills Hub','API Keys'] },
    { title:'APP STACK', items:['Auth','Payments','Database','Storage'] },
    { title:'SHIP', items:['Deploy','Logs'] },
  ];
  let ny = 152;
  navGroups.forEach(g => {
    pos(text('GT',g.title,{font:TOKENS.fonts.mono.family,size:9,color:'gray',ls:0.12,fw:700,upper:true}), 16, ny);
    ny += 20;
    g.items.forEach(it => {
      const active = (g.title==='OVERVIEW' && it==='Dashboard');
      pos(rect('NavBg', sbW-32, 30, { fill: active?'acid':'transparent' }), 16, ny);
      pos(rect('Icon',14,14,{fill:'ink'}), 20, ny+8);
      pos(text('NI',it,{font:TOKENS.fonts.mono.family,size:12,color:'ink',fw:active?700:400}), 42, ny+7);
      ny += 32;
    });
    ny += 6;
  });
  pos(rect('NavBg2', sbW-32, 30, { fill:'transparent' }), 16, ny);
  pos(rect('Icon2',14,14,{fill:'ink'}), 20, ny+8);
  pos(text('NI','Settings',{font:TOKENS.fonts.mono.family,size:12,color:'ink'}), 42, ny+7);
  pos(spec('Sidebar: 232px | Paper bg | Brand(22px acid square) + Org pill(white) + Proj pill(acid) | Nav: Overview/Build/App Stack/Ship | Active=acid bg', {size:8}), 12, sbH-30);
  y += sbH + 40;

  // ── MODULE: Topbar ──
  const tbW = 888, tbH = 58;
  const tb = frame('MODULE: Dashboard / Topbar', tbW, tbH, { bg:'white', stroke:'ink', strokeWeight:1 });
  pos(tb, 48, y); page.appendChild(tb);
  pos(text('MT','DASHBOARD TOPBAR',{font:TOKENS.fonts.display.family,size:12,color:'ink',upper:true}), 12, 8);
  pos(text('BC','// Default Project',{font:TOKENS.fonts.mono.family,size:10,color:'gray',ls:0.1}), 24, 24);
  const lang = frame('LangSwitch', 84, 28, { stroke:'ink', strokeWeight:1, layout:'HORIZONTAL' });
  pos(lang, 660, 15); tb.appendChild(lang);
  const en = frame('EN',42,28,{fill:'ink',layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER'});
  en.appendChild(text('L','EN',{font:TOKENS.fonts.mono.family,size:10,color:'paper',fw:700}));
  const zh = frame('ZH',42,28,{fill:'white',layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER'});
  zh.appendChild(text('L','中文',{font:TOKENS.fonts.mono.family,size:10,color:'ink',fw:700}));
  lang.appendChild(en); lang.appendChild(zh);
  // 右侧 ⌘K / CONNECT / Avatar：用绝对定位容器包裹（避免 layout frame 内手动 x/y 冲突）
  const right = frame('TopbarRight', 280, 28, {});
  pos(right, 604, 15); tb.appendChild(right);
  const cmdK = frame('CmdK',44,28,{fill:'white',stroke:'ink',strokeWeight:2,shadow:{x:2,y:2,color:'ink'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER'});
  cmdK.appendChild(text('L','⌘K',{font:TOKENS.fonts.mono.family,size:10,color:'ink',fw:700}));
  const connect = frame('Connect',90,28,{fill:'acid',stroke:'ink',strokeWeight:2,shadow:{x:2,y:2,color:'ink'},layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER'});
  connect.appendChild(text('L','CONNECT',{font:TOKENS.fonts.mono.family,size:10,color:'ink',fw:700,upper:true}));
  const avatar = frame('Avatar',30,30,{fill:'acid',stroke:'ink',strokeWeight:2,layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER'});
  avatar.appendChild(text('L','WE',{font:TOKENS.fonts.mono.family,size:10,color:'ink',fw:700}));
  right.appendChild(cmdK); pos(cmdK, 0, 0);
  right.appendChild(connect); pos(connect, 52, 0);
  right.appendChild(avatar); pos(avatar, 150, -1);
  pos(spec('Topbar: 58px | White bg | Breadcrumb(// Default Project) + Lang switch(EN/中文) + ⌘K + CONNECT(acid) + Avatar(WE)', {size:8}), 12, 44);
  y += tbH + 40;

  // ── MODULE: Connect Block (终端) ──
  const cbW = 888, cbH = 180;
  const cb = frame('MODULE: Dashboard / Connect Block', cbW, cbH, { bg:'paper', stroke:'ink', strokeWeight:1 });
  pos(cb, 48, y); page.appendChild(cb);
  pos(text('MT','OVERVIEW — CONNECT BLOCK (终端)',{font:TOKENS.fonts.display.family,size:12,color:'ink',upper:true}), 12, 8);
  const cbInner = frame('ConnectInner', cbW-48, cbH-44, { fill:'ink', stroke:'ink', strokeWeight:2, layout:'VERTICAL', gap:6, pad:{t:14,b:14,l:16,r:16} });
  pos(cbInner, 24, 28); cb.appendChild(cbInner);
  cbInner.appendChild(text('CT','>_ CONNECT YOUR CODING AGENT',{font:TOKENS.fonts.mono.family,size:12,color:'acid',fw:700}));
  cbInner.appendChild(text('CC','// Current project: Default Project (cbe1c29e-...)',{font:TOKENS.fonts.mono.family,size:11,color:'gray'}));
  cbInner.appendChild(text('CC','$ npx @vectoree/cli login',{font:TOKENS.fonts.mono.family,size:12,color:'paper'}));
  cbInner.appendChild(text('CC','$ npx @vectoree/cli link --project-id cbe1c29e-...',{font:TOKENS.fonts.mono.family,size:12,color:'paper'}));
  cbInner.appendChild(text('CC','Copy the prompt and paste it into your coding agent.',{font:TOKENS.fonts.mono.family,size:10,color:'gray'}));
  pos(spec('Ink bg | 黄边右下(4px) | Title: acid | Code: paper | Comment: gray | JetBrains Mono', {color:'gray',size:8}), 12, cbH-22);
  y += cbH + 40;

  // ── MODULE: Stats Grid (4 cards) ──
  const sgW = 888, sgH = 150;
  const sg = frame('MODULE: Dashboard / Stats Grid', sgW, sgH, { bg:'paper', stroke:'ink', strokeWeight:1 });
  pos(sg, 48, y); page.appendChild(sg);
  pos(text('MT','OVERVIEW — STATS GRID (4 卡)',{font:TOKENS.fonts.display.family,size:12,color:'ink',upper:true}), 12, 8);
  const stats = [
    {l:'Token usage (30d)',v:'0',s:'Model Gateway total tokens'},
    {l:'Spend (30d)',v:'$0.00',s:'Monthly billed $0.00'},
    {l:'API requests (30d)',v:'0',s:'Chat, embeddings, image calls'},
    {l:'CLI calls',v:'0',s:'Successful CLI invocations'},
  ];
  stats.forEach((st,i) => {
    const cw = 200, cx = 24 + i*214;
    const sc = frame('Stat:'+st.l, cw, 100, { fill:'white', stroke:'ink', strokeWeight:2, shadow:{x:3,y:3,color:'ink'}, layout:'VERTICAL', gap:6, pad:{t:14,b:14,l:14,r:14} });
    pos(sc, cx, 32); sg.appendChild(sc);
    sc.appendChild(text('SL',st.l,{font:TOKENS.fonts.mono.family,size:9,color:'ink',ls:0.08,fw:700,upper:true}));
    sc.appendChild(text('SV',st.v,{font:TOKENS.fonts.display.family,size:30,color:'ink'}));
    sc.appendChild(text('SS',st.s,{font:TOKENS.fonts.mono.family,size:9,color:'gray'}));
  });
  pos(spec('4 列 Grid | White card + Ink border + 3px hard shadow | Label: Mono 9px | Value: Display 30px | Sub: Mono 9px gray', {size:8}), 12, sgH-22);
  y += sgH + 40;

  // ── MODULE: Model Gateway Trends (chart) ──
  const chW = 888, chH = 280;
  const ch = frame('MODULE: Dashboard / Trends Chart', chW, chH, { bg:'paper', stroke:'ink', strokeWeight:1 });
  pos(ch, 48, y); page.appendChild(ch);
  pos(text('MT','OVERVIEW — MODEL GATEWAY TRENDS (图表)',{font:TOKENS.fonts.display.family,size:12,color:'ink',upper:true}), 12, 8);
  const chInner = frame('ChartPanel', chW-48, chH-44, { fill:'white', stroke:'ink', strokeWeight:2, layout:'VERTICAL', gap:10, pad:{t:14,b:14,l:16,r:16} });
  pos(chInner, 24, 28); ch.appendChild(chInner);
  const chHead = frame('ChartHead', chW-80, 28, { layout:'HORIZONTAL', align:'SPACE_BETWEEN' });
  chHead.appendChild(text('CP','Model Gateway trends',{font:TOKENS.fonts.mono.family,size:13,color:'ink',fw:700,upper:true}));
  const chips = frame('Chips', 160, 28, { layout:'HORIZONTAL' });
  ['7d','30d','90d'].forEach((c,i) => {
    const chip = frame('Chip'+c, 50, 28, { fill: i===1?'ink':'white', stroke:'ink', strokeWeight:1, layout:'VERTICAL',align:'CENTER',crossAlign:'CENTER' });
    chip.appendChild(text('L',c,{font:TOKENS.fonts.mono.family,size:10,color:i===1?'paper':'ink',fw:700}));
    chips.appendChild(chip);
  });
  chHead.appendChild(chips);
  chInner.appendChild(chHead);
  const chart = frame('ChartArea', chW-112, 140, { bg:'paper' });
  for(let gy=0; gy<140; gy+=28){ const g=rect('GridH', chW-112, 1, { fill:'lineSoft' }); pos(g,0,gy); chart.appendChild(g); }
  const area = frame('Area', chW-112, 60, { fill:'acid', cr:0 });
  pos(area, 0, 70); chart.appendChild(area);
  pos(chart, 0, 54); chInner.appendChild(chart);
  pos(spec('Panel: White + Ink border | Title: Mono 13px | Chips: 7d/30d(active=ink)/90d | Chart: 28px grid bg + acid area', {size:8}), 12, chH-22);
  y += chH + 40;

  // ── MODULE: Quick Start (3 cards) ──
  const qsW = 888, qsH = 180;
  const qs = frame('MODULE: Dashboard / Quick Start', qsW, qsH, { bg:'paper', stroke:'ink', strokeWeight:1 });
  pos(qs, 48, y); page.appendChild(qs);
  pos(text('MT','OVERVIEW — QUICK START (3 卡)',{font:TOKENS.fonts.display.family,size:12,color:'ink',upper:true}), 12, 8);
  const qcards = [
    {t:'Try a model →',d:'Open Model Plaza and benchmark models side-by-side.'},
    {t:'Fork a template →',d:'Pick a production-ready scaffold and deploy in one click.'},
    {t:'Create an API key →',d:'Create scoped keys (sk-ve-v1-...) for Model Gateway.'},
  ];
  qcards.forEach((qc,i) => {
    const cw = 270, cx = 24 + i*282;
    const card = frame('QS:'+qc.t, cw, 110, { fill:'white', stroke:'ink', strokeWeight:2, shadow:{x:3,y:3,color:'ink'}, layout:'VERTICAL', gap:8, pad:{t:16,b:16,l:16,r:16} });
    pos(card, cx, 32); qs.appendChild(card);
    card.appendChild(text('QT',qc.t,{font:TOKENS.fonts.display.family,size:15,color:'ink',upper:true}));
    card.appendChild(text('QD',qc.d,{size:11,color:'gray'}));
  });
  pos(spec('3 列 Grid | White card + Ink border + 3px shadow | Title: Display 15px | Desc: 11px gray', {size:8}), 12, qsH-22);
  y += qsH + 60;

  return y;
}

// ═══════════════════════════════════════════
// AUTH MODULES — Console Card（截图 1:1）
// ═══════════════════════════════════════════
function authLogoBox() {
  const b = frame('LogoBox', null, 44, { fill:'transparent', stroke:'acid', strokeWeight:2, layout:'HORIZONTAL', align:'CENTER', crossAlign:'CENTER', gap:10, pad:{l:14,r:14} });
  b.appendChild(rect('Icon',22,22,{fill:'acid'}));
  b.appendChild(text('Brand','VECTOREE',{font:TOKENS.fonts.display.family,size:16,color:'acid',upper:true,ls:0.04}));
  return b;
}
function authLang() {
  const l = frame('LangSwitch', null, 32, { layout:'HORIZONTAL', align:'CENTER', crossAlign:'CENTER', gap:4 });
  const en = frame('EN', null, 32, { fill:'acid', stroke:'ink', strokeWeight:1, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER', pad:{l:10,r:10} });
  en.appendChild(text('L','EN',{font:TOKENS.fonts.mono.family,size:11,color:'ink',fw:700}));
  const zh = frame('ZH', null, 32, { layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER', pad:{l:10,r:10} });
  zh.appendChild(text('L','中文',{font:TOKENS.fonts.mono.family,size:11,color:'gray'}));
  l.appendChild(en); l.appendChild(zh);
  return l;
}
function authTab(label, active) {
  const t = frame(`Tab:${label}`, null, 38, { fill: active ? 'acid' : 'transparent', stroke: active ? 'ink' : 'transparent', strokeWeight:1, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER', pad:{l:18,r:18} });
  if (active) t.effects = [shadow({x:3,y:3,color:'ink'})];
  t.appendChild(text('L',label,{font:TOKENS.fonts.mono.family,size:11,color: active ? 'ink' : 'gray',fw:700,upper:true,ls:0.08}));
  return t;
}
function authField(label, value) {
  const f = frame('Field', null, 0, { layout:'VERTICAL', gap:6 });
  f.appendChild(text('Label',label,{font:TOKENS.fonts.mono.family,size:11,color:'ink',fw:700,upper:true,ls:0.08}));
  const box = frame('Input', null, 40, { fill:'white', stroke:'ink', strokeWeight:2, layout:'VERTICAL', align:'CENTER', crossAlign:'MIN', pad:{l:12,r:12} });
  box.appendChild(text('Value',value,{font:TOKENS.fonts.mono.family,size:12,color:'ink'}));
  f.appendChild(box);
  return f;
}
function authBtn(lbl, primary) {
  const b = frame(`Btn:${lbl}`, null, 44, { fill: primary ? 'acid' : 'white', stroke:'ink', strokeWeight:2, shadow:{x:3,y:3,color:'ink'}, layout:'VERTICAL', align:'CENTER', crossAlign:'CENTER' });
  b.appendChild(text('L',lbl,{font:TOKENS.fonts.mono.family,size:11,color:'ink',fw:700,upper:true,ls:0.06}));
  return b;
}
function authOAuth(name) {
  const b = frame(`OAuth:${name}`, null, 44, { fill:'white', stroke:'ink', strokeWeight:2, shadow:{x:3,y:3,color:'ink'}, layout:'HORIZONTAL', align:'CENTER', crossAlign:'CENTER', gap:8 });
  b.appendChild(rect('Icon',16,16,{fill:'ink'}));
  b.appendChild(text('L',name,{font:TOKENS.fonts.mono.family,size:11,color:'ink',fw:700,upper:true,ls:0.06}));
  return b;
}
function authDivider() {
  const d = frame('Divider', 364, 20, { layout:'HORIZONTAL', align:'SPACE_BETWEEN', crossAlign:'CENTER' });
  d.appendChild(rect('Line',110,1,{fill:'lineSoft'}));
  d.appendChild(text('T','OR CONTINUE WITH',{font:TOKENS.fonts.mono.family,size:10,color:'gray',upper:true,ls:0.1}));
  d.appendChild(rect('Line',110,1,{fill:'lineSoft'}));
  return d;
}
function authConsoleCard(activeTab, isSignUp) {
  const c = frame('Console Card', 420, null, { fill:'white', stroke:'ink', strokeWeight:2, shadow:{x:4,y:4,color:'ink'}, layout:'VERTICAL', gap:16, pad:{t:28,b:28,l:28,r:28} });

  c.appendChild(text('Title','Console',{font:TOKENS.fonts.display.family,size:28,color:'ink',upper:true}));
  c.appendChild(text('Sub','Sign in to access your dashboard',{size:13,color:'gray'}));

  const tabs = frame('Tabs', null, 38, { layout:'HORIZONTAL', align:'MIN', crossAlign:'CENTER', gap:8 });
  tabs.appendChild(authTab('Sign In', activeTab === 'in'));
  tabs.appendChild(authTab('Sign up', activeTab === 'up'));
  c.appendChild(tabs);

  c.appendChild(text('Lead', isSignUp ? 'Sign up with your Vectoree account' : 'Sign in with your Vectoree account',{size:13,color:'ink'}));

  if (isSignUp) {
    c.appendChild(authField('Email','you@company.com'));
    c.appendChild(authField('Password','8+ characters'));
    const check = frame('Check', null, 0, { layout:'HORIZONTAL', gap:8 });
    check.appendChild(rect('Box',14,14,{fill:'white',stroke:'ink',strokeWeight:2}));
    check.appendChild(text('T','I agree to the Terms and Privacy Policy',{size:12,color:'gray'}));
    c.appendChild(check);
    c.appendChild(authBtn('Sign Up', true));
  } else {
    c.appendChild(authField('Email','admin'));
    c.appendChild(authField('Password','••••••••••••••••'));
    c.appendChild(authBtn('Sign In', true));
  }

  c.appendChild(authDivider());

  const oauth = frame('OAuth Row', null, 44, { layout:'HORIZONTAL', align:'MIN', crossAlign:'CENTER', gap:12 });
  oauth.appendChild(authOAuth('Google'));
  oauth.appendChild(authOAuth('GitHub'));
  c.appendChild(oauth);

  if (isSignUp) {
    c.appendChild(text('Note','Already have an account? Sign in →',{font:TOKENS.fonts.mono.family,size:10,color:'gray'}));
  } else {
    c.appendChild(text('Note','Already have an email account? Sign in first, then link Google/GitHub in Settings → Account.',{font:TOKENS.fonts.mono.family,size:10,color:'gray'}));
  }

  const foot = frame('Foot', null, 0, { layout:'HORIZONTAL', align:'SPACE_BETWEEN' });
  foot.appendChild(text('A','← Vectoree home',{font:TOKENS.fonts.mono.family,size:10,color:'gray'}));
  foot.appendChild(text('B','Platform Admin login →',{font:TOKENS.fonts.mono.family,size:10,color:'gray'}));
  c.appendChild(foot);

  return c;
}
function authBrandPanel() {
  const p = frame('Brand Panel', 560, 740, { bg:'ink' }); // 绝对定位容器（不开启自动布局，避免子元素 x/y/rotation 冲突）

  // 斜线纹理：独立叠层（非自动布局），子线用绝对定位 + rotation
  const lines = frame('Lines Overlay', 560, 740, {});
  lines.clipsContent = true;
  pos(lines, 0, 0); p.appendChild(lines);
  for (let i = -4; i < 18; i++) {
    const line = rect('Line', 900, 1, { fill: {r:1,g:1,b:1,a:0.04} });
    line.rotation = 45;
    line.x = -180 + i * 60;
    line.y = -40 + i * 60;
    lines.appendChild(line);
  }

  // 内容层（叠在斜线之上）：用绝对定位摆放
  const logo = authLogoBox();
  pos(logo, 48, 40); p.appendChild(logo);

  const mid = frame('Brand Content', 460, 0, {}); // 非自动布局，子元素用 pos
  pos(mid, 48, 200); p.appendChild(mid);
  mid.appendChild(pos(text('Eyebrow','Agent Backend Console',{font:TOKENS.fonts.mono.family,size:11,color:'acid',fw:700,upper:true,ls:0.14}), 0, 0));
  const title = frame('Title', 460, 120, {});
  pos(title, 0, 28); mid.appendChild(title);
  title.appendChild(text('L1','Anyone can',{font:TOKENS.fonts.display.family,size:54,color:'white',upper:true}));
  title.appendChild(text('L2','Ship Agents',{font:TOKENS.fonts.display.family,size:54,color:'acid',upper:true}));
  pos(text('Desc','Models, templates, skills, auth, payments, and deploy — one console to ship.',{size:14,color:'gray'}), 0, 156);
  pos(text('Tags','Models · Templates · Skills · Auth · Payments · Deploy',{font:TOKENS.fonts.mono.family,size:11,color:'gray',upper:true,ls:0.1}), 0, 200);

  pos(text('Foot','VECTOREE - Self-hosted Backend as a Service',{font:TOKENS.fonts.mono.family,size:10,color:'gray'}), 48, 700);

  return p;
}
function authFormPanel(activeTab, isSignUp) {
  const p = frame('Form Panel', 560, 740, { bg:'paper' }); // 绝对定位容器

  // grid 背景：独立叠层（非自动布局）
  const grid = frame('Grid Overlay', 560, 740, {});
  grid.clipsContent = true;
  pos(grid, 0, 0); p.appendChild(grid);
  for (let i = 0; i <= 23; i++) {
    const h = rect('GH', 560, 1, { fill: {r:0.06,g:0.06,b:0.06,a:0.04} });
    pos(h, 0, i * 32); grid.appendChild(h);
  }
  for (let i = 0; i <= 17; i++) {
    const v = rect('GV', 1, 740, { fill: {r:0.06,g:0.06,b:0.06,a:0.04} });
    pos(v, i * 32, 0); grid.appendChild(v);
  }

  // 语言切换（绝对定位到右上角）
  const lang = authLang();
  pos(lang, 560 - 120, 24); p.appendChild(lang);

  // Console 卡片容器（绝对定位居中）
  const wrap = frame('Card Wrap', 460, 660, {});
  pos(wrap, 50, 60); p.appendChild(wrap);
  const card = authConsoleCard(activeTab, isSignUp);
  pos(card, 20, 0); wrap.appendChild(card);

  return p;
}
function generateAuthPage(page, y, isSignUp) {
  const w = 1120, h = 780;
  const m = frame(`MODULE: Auth / ${isSignUp ? 'Sign Up' : 'Sign In'} Page`, w, h, { bg:'paper', stroke:'ink', strokeWeight:1 });
  pos(m, 48, y); page.appendChild(m);
  pos(text('MT', `${isSignUp ? 'SIGN UP' : 'SIGN IN'} PAGE — Console Card`, {font:TOKENS.fonts.display.family, size:12, color:'ink', upper:true}), 12, 8);

  const brand = authBrandPanel();
  pos(brand, 24, 24); m.appendChild(brand);

  const form = authFormPanel(isSignUp ? 'up' : 'in', isSignUp);
  pos(form, 584, 24); m.appendChild(form);

  return y + h + 60;
}
function generateAuthInto(page, startY) {
  let y = startY;
  page.appendChild(pos(text('BT','AUTH MODULES — Console Card UI（截图 1:1）',{font:TOKENS.fonts.display.family,size:22,color:'ink'}), 48, y));
  y += 44;
  page.appendChild(pos(spec('Auth 布局：50/50 分栏。左=黑底斜纹品牌区（Logo 框 / AGENT BACKEND CONSOLE / ANYONE CAN SHIP AGENTS）。右=grid 纸背景 + EN/中文切换 + Console 卡片（tabs / Email / Password / Google / GitHub）。文案来自 signin.html / signup.html。'), 48, y));
  y += 50;

  y = generateAuthPage(page, y, false); // Sign In
  y = generateAuthPage(page, y, true);  // Sign Up

  return y;
}

// ═══════════════════════════════════════════
// PAGE 3 — 综合（Homepage + Dashboard + Auth）
// ═══════════════════════════════════════════
async function generatePage3_PageModules() {
  await loadFonts();
  const page = getOrCreatePage(2, '📄 03-Page-Modules');
  page.name = '📄 03-Page-Modules';
  let y = 32;
  y = generateHomepageInto(page, y);
  y = generateDashboardInto(page, y);
  y = generateAuthInto(page, y);
  return page;
}

// ═══════════════════════════════════════════
// UI 界面
// ═══════════════════════════════════════════
const __html__ = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#101010;color:#F1F1E8;padding:20px;width:300px}
h1{font-size:15px;font-weight:700;color:#D8FF00;margin-bottom:4px}
.sub{font-size:10px;color:#6B6B60;margin-bottom:16px;line-height:1.4}
.sec{margin-bottom:14px}
.sec-title{font-size:9px;font-weight:600;color:#6B6B60;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
button{width:100%;padding:12px;background:#D8FF00;color:#101010;border:2px solid #101010;border-radius:0;font-family:'SF Mono',Monaco,monospace;font-size:11px;font-weight:700;cursor:pointer;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px;box-shadow:3px 3px 0 #101010}
button:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 #101010}
button:active{transform:translate(2px,2px);box-shadow:1px 1px 0 #101010}
button.sec{background:#FFF}
button.sm{padding:8px;font-size:9px;box-shadow:2px 2px 0 #101010}
.st{font-size:10px;color:#D8FF00;padding:10px;background:rgba(216,255,0,.08);border:1px solid rgba(216,255,0,.2);margin-top:10px;font-family:'SF Mono',monospace;min-height:36px;display:none}
.st.err{color:#f44;background:rgba(255,68,68,.08);border-color:rgba(255,68,68,.2)}
.st.ok{color:#D8FF00}
.div{height:1px;background:#333;margin:14px 0}
.info{font-size:9px;color:#555;line-height:1.5;margin-top:12px;padding-top:10px;border-top:1px solid #222}
</style></head><body>
<h1>🎨 Vectoree DS v3</h1>
<p class="sub">3 Pages × Module-based Layout</p>
<div class="sec"><div class="sec-title">Generate All</div>
<button onclick="gen('all')">🚀 Generate 3 Pages</button></div>
<div class="div"></div>
<div class="sec"><div class="sec-title">Individual</div>
<button class="sec sm" onclick="gen('tokens')">🎨 Tokens</button>
<button class="sec sm" onclick="gen('comp')">🔘 Components</button>
<button class="sec sm" onclick="gen('home')">📄 Pages</button></div>
<div id="st" class="st"></div>
<div class="info"><b>Output:</b><br>• Page1: Foundations (5 modules)<br>• Page2: UI Components (5 modules)<br>• Page3: Page Modules (Homepage 7 · Dashboard 6 · Auth 2)</div>
<script>
function gen(t){const e=document.getElementById('st');e.style.display='block';e.className='st';e.textContent='⏳ Generating...';parent.postMessage({pluginMessage:{type:'gen-'+t}},'*')}
window.addEventListener('message',e=>{const m=e.data.pluginMessage,el=document.getElementById('st');
if(m.type==='st'){el.textContent=m.message;el.className='st'}
if(m.type==='done'){let t=m.message+'\n\nPages:';if(m.pages)m.pages.forEach(p=>t+='\n✓ '+p);el.textContent=t;el.className='st ok'}
if(m.type==='err'){el.textContent=m.message;el.className='st err'}})
</script></body></html>`;

figma.showUI(__html__, { width: 320, height: 330 });

// ═══════════════════════════════════════════
// 主程序入口
// ═══════════════════════════════════════════
figma.ui.onmessage = async msg => {
  const run = async (fn, name) => {
    try {
      figma.ui.postMessage({ type: 'st', message: `⏳ Creating ${name}...` });
      const page = await fn();
      figma.currentPage = page;
      return page.name;
    } catch(e) {
      figma.ui.postMessage({ type: 'err', message: `❌ ${name}: ${e.message}` });
      console.error(`[${name}]`, e);
      return null;
    }
  };
  try {

  if (msg.type === 'gen-all') {
    const pages = [];
    const p1 = await run(generatePage1_DesignTokens, '🎨 Design Tokens'); if(p1) pages.push(p1);
    const p2 = await run(generatePage2_Components, '🔘 Components'); if(p2) pages.push(p2);
    const p3 = await run(generatePage3_PageModules, '📄 Page Modules'); if(p3) pages.push(p3);

    figma.ui.postMessage({ type: 'done', message: `✅ Done! ${pages.length} pages created.`, pages });
  }

  if (msg.type === 'gen-tokens') {
    const p = await run(generatePage1_DesignTokens, '🎨 Design Tokens');
    if(p) figma.ui.postMessage({ type: 'done', message: '✅ Design Tokens created!', pages: [p] });
  }

  if (msg.type === 'gen-comp') {
    const p = await run(generatePage2_Components, '🔘 Components');
    if(p) figma.ui.postMessage({ type: 'done', message: '✅ Components created!', pages: [p] });
  }

  if (msg.type === 'gen-home') {
    const p = await run(generatePage3_PageModules, '📄 Page Modules');
    if(p) figma.ui.postMessage({ type: 'done', message: '✅ Page Modules created!', pages: [p] });
  }
  } catch(e) {
    figma.ui.postMessage({ type: 'err', message: `❌ 主程序异常: ${e.message}` });
    console.error('onmessage fatal', e);
  }
};

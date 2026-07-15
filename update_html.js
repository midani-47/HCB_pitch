const fs = require('fs');

const css = `*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:hsl(190, 61%, 92%);
  --glass:rgba(125, 145, 173, 0.045);
  --gb:rgba(255,255,255,0.08);
  --teal:#3DDBA6;
  --teal-glow:rgba(61,219,166,0.15);
  --purple:#7C63F5;
  --muted:#6A7D97;
  --text:#030f2c;
  --r:18px;
  --sp:110px 60px;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',system-ui,sans-serif;overflow-x:hidden;line-height:1.6}
#particles{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.55}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:20px 56px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,border-color .4s;border-bottom:1px solid transparent}
nav.solid{background:rgba(255,255,255,0.3);backdrop-filter:blur(24px) saturate(160%);border-color:var(--gb)}
.nav-logo{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;color:var(--text);text-decoration:none;letter-spacing:-.3px}
.nav-logo span{color:var(--teal)}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{color:var(--muted);font-size:14px;font-weight:500;text-decoration:none;transition:color .2s;cursor:pointer}
.nav-links a:hover{color:var(--text)}

.nav-actions { display: flex; align-items: center; gap: 20px; }
.lang-switch { display: flex; gap: 6px; align-items: center; font-size: 13px; font-weight: 600; color: var(--muted); }
.lang-btn { background: none; border: none; color: var(--muted); font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: color 0.2s; padding: 0; }
.lang-btn:hover { color: var(--text); }
.lang-btn.active { color: var(--teal); }

.nav-btn{background:var(--teal);color:#030D1F;font-weight:700;font-size:14px;padding:10px 22px;border-radius:100px;text-decoration:none;transition:opacity .2s,transform .2s}
.nav-btn:hover{opacity:.85;transform:translateY(-1px)}

/* HERO */
#hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:120px 48px 80px;overflow:hidden;z-index:1}
#hero::before{content:'';position:absolute;top:5%;left:50%;transform:translateX(-50%);width:900px;height:700px;background:radial-gradient(ellipse,rgba(61,219,166,.07) 0%,rgba(124,99,245,.05) 40%,transparent 68%);pointer-events:none}

/* Orbital rings */
.orbitals{position:absolute;top:50%;left:50%;pointer-events:none;transform:translate(-50%,-50%)}
.or{position:absolute;border-radius:50%;border:1px solid;top:50%;left:50%;transform:translate(-50%,-50%)}
.or1{width:220px;height:220px;border-color:rgba(124,99,245,.28)}
.or2{width:400px;height:400px;border-color:rgba(61,219,166,.2)}
.or3{width:600px;height:600px;border-color:rgba(124,99,245,.11)}
.or4{width:820px;height:820px;border-color:rgba(61,219,166,.08)}

.chip{display:inline-flex;align-items:center;gap:8px;background:rgba(61,219,166,.11);border:1px solid rgba(61,219,166,.28);color:var(--teal);padding:7px 18px;border-radius:100px;font-size:13px;font-weight:600;letter-spacing:.3px;margin-bottom:28px}
.chip-dot{width:6px;height:6px;border-radius:50%;background:var(--teal);animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}

.hero-h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(44px,7.2vw,88px);font-weight:700;line-height:1.0;letter-spacing:-3px;margin-bottom:22px;max-width:820px}
.hero-h1 em{font-style:normal;background:linear-gradient(118deg,var(--teal) 0%,var(--purple) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:clamp(16px,1.9vw,21px);color:var(--muted);max-width:520px;line-height:1.7;margin-bottom:48px}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.btn-p{background:var(--teal);color:#030D1F;font-family:'DM Sans',sans-serif;font-weight:700;font-size:15px;padding:15px 34px;border-radius:100px;text-decoration:none;box-shadow:0 0 28px rgba(61,219,166,.38);transition:transform .25s,box-shadow .25s;cursor:pointer}
.btn-p:hover{transform:translateY(-2px);box-shadow:0 0 46px rgba(61,219,166,.55)}
.btn-g{background:var(--glass);color:var(--text);border:1px solid var(--gb);font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;padding:15px 34px;border-radius:100px;text-decoration:none;backdrop-filter:blur(12px);transition:background .25s,transform .25s;cursor:pointer}
.btn-g:hover{background:rgba(255,255,255,.09);transform:translateY(-2px)}

.scroll-hint{position:absolute;bottom:34px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;color:var(--muted);font-size:11px;letter-spacing:2px;text-transform:uppercase}
.scroll-line{width:1px;height:52px;background:linear-gradient(to bottom,var(--muted),transparent);animation:spulse 2.5s ease-in-out infinite}
@keyframes spulse{0%,100%{opacity:.35}50%{opacity:1}}

/* SECTIONS */
.sec{padding:var(--sp);max-width:1180px;margin:0 auto;position:relative;z-index:1}
.divider{height:1px;background:var(--gb);max-width:1180px;margin:0 auto;position:relative;z-index:1}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--teal);margin-bottom:14px}
.sec-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,4vw,52px);font-weight:700;letter-spacing:-1.5px;line-height:1.08;margin-bottom:14px}
.sec-sub{font-size:17px;color:var(--muted);max-width:540px;line-height:1.65;margin-bottom:56px}

/* PANELS */
.panels-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.pcard {
  background: var(--glass);
  border: 1px solid var(--gb);
  border-radius: var(--r);
  padding: 32px;
  backdrop-filter: blur(14px);
  position: relative;
  overflow: hidden;
  transition: transform .35s, border-color .35s, box-shadow .35s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.pcard:hover {
  transform: translateY(-7px);
  border-color: rgba(61, 219, 166, .26);
  box-shadow: 0 26px 56px rgba(0,0,0,.5), 0 0 32px rgba(61, 219, 166, .07);
}

.pcard-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--teal), transparent);
  opacity: 0;
  transition: opacity .35s;
}

.pcard:hover .pcard-line {
  opacity: 1;
}

/* --- UPDATED RESPONSIVE IMAGE --- */
.pcard-img {
  width: 100%;
  max-width: 450px;             /* Desktop limit: image won't stretch awkwardly */
  height: auto;                 /* Keeps original aspect ratio—no cropping/squishing */
  border-radius: 12px;
  object-fit: contain;          /* Displays the full panel graphic cleanly */
  margin-bottom: 18px;
  border: 1px solid var(--gb);
  display: block;
}

.pcard-brand {
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 8px;
  font-weight: 600;
}

.pcard-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -.4px;
  margin-bottom: 10px;
}

.pcard-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  margin-bottom: 28px;
}

.pcard-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pcard-price {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--teal);
}

.pcard-arr {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--teal-glow);
  border: 1px solid rgba(61, 219, 166, .3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .2s, transform .2s;
  flex-shrink: 0;
}

.pcard:hover .pcard-arr {
  background: var(--teal);
  transform: translateX(3px);
}

.arr-icon {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--teal);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.pcard:hover .arr-icon {
  stroke: #030D1F;
}

/* --- UPDATED WIDE CARD --- */
.pcard.wide {
  grid-column: 1 / -1;
  display: flex;
  gap: 40px;
  align-items: center;
}

.pcard.wide .pcard-img {
  width: 100%;
  max-width: 320px;             /* Fits alongside the text beautifully on desktop */
  height: auto;
  margin-bottom: 0;
  flex-shrink: 0;
  border-radius: 16px;
}

.pcard.wide .pcard-body {
  flex: 1;
}

/* --- MOBILE OPTIMIZATION --- */
@media (max-width: 768px) {
  .pcard.wide {
    flex-direction: column-reverse; /* Stacks image below text on mobile for natural reading order */
    gap: 20px;
    align-items: flex-start;
  }
  
  .pcard.wide .pcard-img {
    max-width: 100%;            /* Allows image to dynamically fill mobile viewport width */
    margin-top: 15px;
  }
}

/* STEPS */
.steps{display:grid;grid-template-columns:repeat(5,1fr);position:relative}
.steps::before{content:'';position:absolute;top:27px;left:calc(10% + 13px);right:calc(10% + 13px);height:1px;background:linear-gradient(90deg,var(--teal),var(--purple));opacity:.22;z-index:0}
.step{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 10px;position:relative;z-index:1}
.step-num{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,rgba(61,219,166,.18),rgba(124,99,245,.18));border:1px solid rgba(61,219,166,.32);display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:18px;flex-shrink:0}
.step-name{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;letter-spacing:-.2px;margin-bottom:8px}
.step-desc{font-size:12.5px;color:var(--muted);line-height:1.6}

/* BIOMARKERS */
.bm-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.bm{background:var(--glass);border:1px solid var(--gb);border-radius:var(--r);padding:36px;backdrop-filter:blur(14px);transition:border-color .3s,transform .3s;position:relative;overflow:hidden}
.bm::after{content:'';position:absolute;bottom:-50px;right:-50px;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(124,99,245,.12),transparent 70%);pointer-events:none}
.bm:hover{border-color:rgba(124,99,245,.28);transform:translateY(-4px)}
.bm-img{width:60px;height:60px;border-radius:12px;object-fit:cover;margin-bottom:18px;border:1px solid var(--gb)}
.bm-title{font-family:'Space Grotesk',sans-serif;font-size:21px;font-weight:700;letter-spacing:-.4px;margin-bottom:10px}
.bm-desc{font-size:14px;color:var(--muted);line-height:1.7}

/* TAGS */
.tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:36px}
.tag{background:var(--glass);border:1px solid var(--gb);border-radius:100px;padding:9px 20px;font-size:14px;color:var(--muted);font-weight:500;transition:background .2s,color .2s,border-color .2s;cursor:default}
.tag:hover{background:var(--teal-glow);border-color:rgba(61,219,166,.35);color:var(--teal)}

/* CTA */
.cta-box{background:linear-gradient(135deg,rgba(61,219,166,.08),rgba(124,99,245,.08));border:1px solid rgba(255,255,255,.1);border-radius:28px;padding:90px 60px;text-align:center;position:relative;overflow:hidden}
.cta-box::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:600px;height:2px;background:linear-gradient(90deg,transparent,var(--teal),var(--purple),transparent);opacity:.6}
.cta-box::after{content:'';position:absolute;bottom:-100px;right:-100px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(124,99,245,.1),transparent 70%);pointer-events:none}
.cta-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,4vw,50px);font-weight:700;letter-spacing:-1.5px;margin-bottom:16px}
.cta-sub{font-size:18px;color:var(--muted);max-width:460px;margin:0 auto 44px;line-height:1.65}
.cta-box .btn-p{box-shadow:0 0 40px rgba(61,219,166,.4)}

/* FOOTER */
footer{padding:38px 60px;border-top:1px solid var(--gb);display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--muted);position:relative;z-index:1;flex-wrap:wrap;gap:16px}
footer a{color:var(--muted);text-decoration:none;transition:color .2s}
footer a:hover{color:var(--text)}
.f-links{display:flex;gap:24px}
.f-logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:var(--text)}
.f-logo span{color:var(--teal)}

/* REVEAL */
.reveal{opacity:0;transform:translateY(26px);transition:opacity .7s ease,transform .7s ease}
.reveal.in{opacity:1;transform:translateY(0)}
.reveal-d1{transition-delay:.1s}
.reveal-d2{transition-delay:.2s}
.reveal-d3{transition-delay:.3s}
.reveal-d4{transition-delay:.4s}

/* RESPONSIVE */
@media(max-width:900px){
  :root{--sp:70px 28px}
  nav{padding:16px 24px}
  .nav-links{display:none}
  .panels-grid{grid-template-columns:1fr}
  .pcard.wide{flex-direction:column;gap:20px}
  .bm-grid{grid-template-columns:1fr}
  .steps{grid-template-columns:1fr 1fr;gap:24px}
  .steps::before{display:none}
  .step:nth-child(5){grid-column:1/-1}
  .hero-h1{letter-spacing:-1.5px}
  .cta-box{padding:56px 28px}
  footer{flex-direction:column;text-align:center}
  .or3,.or4{display:none}
}
@media(max-width:560px){
  .hero-actions{flex-direction:column;align-items:center}
}
@media(prefers-reduced-motion:reduce){
  *,::before,::after{animation-duration:.001ms !important;transition-duration:.001ms !important}
}`;

const htmlContent = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HealthBioCare | Genetic & Epigenetic Analysis</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>

<canvas id="particles"></canvas>

<!-- NAVIGATION -->
<nav id="nav">
  <a class="nav-logo" href="#"><span>Health</span>BioCare</a>
  <ul class="nav-links">
    <li><a href="#panels"><span class="lang-de">Analyse-Panels</span><span class="lang-en" style="display:none">Analysis Panels</span></a></li>
    <li><a href="#process"><span class="lang-de">Ablauf</span><span class="lang-en" style="display:none">Process</span></a></li>
    <li><a href="#science"><span class="lang-de">Wissenschaft</span><span class="lang-en" style="display:none">Science</span></a></li>
    <li><a href="#research"><span class="lang-de">Forschung</span><span class="lang-en" style="display:none">Research</span></a></li>
  </ul>
  <div class="nav-actions">
    <div class="lang-switch">
      <button class="lang-btn active" onclick="setLang('de')" id="btn-de">DE</button>
      <span>|</span>
      <button class="lang-btn" onclick="setLang('en')" id="btn-en">EN</button>
    </div>
    <a class="nav-btn" href="#panels"><span class="lang-de">Shop</span><span class="lang-en" style="display:none">Shop</span></a>
  </div>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="orbitals">
    <div class="or or1"></div>
    <div class="or or2"></div>
    <div class="or or3"></div>
    <div class="or or4"></div>
  </div>

  <div class="chip"><span class="lang-de">EPIGENETIK</span><span class="lang-en" style="display:none">EPIGENETICS</span></div>
  <h1 class="hero-h1">
    <span class="lang-de"><em>Entfalten Sie Ihre Potenziale<br>Schließen Sie Ihre Probleme aus</em></span>
    <span class="lang-en" style="display:none"><em>Unlock your potentials<br>Lock your problems</em></span>
  </h1>
  <p class="hero-sub">
    <span class="lang-de">Genetische und Epigenetische Analysen zu <br> <strong>Stress</strong> | <strong> Sport </strong> | <strong>Alter</strong> | <strong>Ernährung</strong></span>
    <span class="lang-en" style="display:none">Genetic and Epigenetic Analysis for <br> <strong>Stress</strong> | <strong> Sport </strong> | <strong>Age</strong> | <strong>Nutrition</strong></span>
  </p>
  <div class="hero-actions">
    <a class="btn-p" href="#panels"><span class="lang-de">Panels entdecken</span><span class="lang-en" style="display:none">Explore Panels</span></a>
    <a class="btn-g" href="#process"><span class="lang-de">Wie es funktioniert</span><span class="lang-en" style="display:none">How It Works</span></a>
  </div>

  <div class="scroll-hint">
    <span>Scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<div class="divider"></div>

<!-- ANALYSIS PANELS -->
<div class="sec" id="panels">
  <div class="reveal">
    <p class="eyebrow">Geneometry® Panels</p>
    <h2 class="sec-h">
      <span class="lang-de">Ihre Gesundheit, entschlüsselt<br>auf molekularer Ebene</span>
      <span class="lang-en" style="display:none">Your health, decoded<br>at the molecular level</span>
    </h2>
    <p class="sec-sub">
      <span class="lang-de">Jedes Panel analysiert genetische und epigenetische Marker aus einer einfachen Blutprobe aus der Fingerkuppe, die zu Hause entnommen wird.</span>
      <span class="lang-en" style="display:none">Each panel analyses genetic and epigenetic markers from a simple finger-prick blood sample taken at home.</span>
    </p>
  </div>

  <div class="panels-grid">

    <a class="pcard wide reveal" href="https://healthbiocare.com/geneometry-metabolic-health-panel/">
      <div class="pcard-line"></div>
      <img src="assets/images/metabolic-panel.png" class="pcard-img" alt="Metabolic">
      <div class="pcard-body">
        <p class="pcard-brand">Geneometry®</p>
        <h3 class="pcard-name">Metabolic Health Panel</h3>
        <p class="pcard-desc">
          <span class="lang-de">Verstehen Sie, wie Ihr Körper Nahrung verarbeitet. Kombiniert genetische Veranlagungen mit epigenetischen Markern, um Ihre Ernährung und Gewichtsmanagement-Strategie durch Follow-up-Monitoring zu personalisieren.</span>
          <span class="lang-en" style="display:none">Understand how your body processes nutrition. Combines genetic predispositions with epigenetic markers to personalise your diet and weight management strategy with follow-up monitoring.</span>
        </p>
        <div class="pcard-foot">
          <span class="pcard-price">€ 590</span>
          <div class="pcard-arr">
            <svg class="arr-icon" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </div>
        </div>
      </div>
    </a>

    <a class="pcard reveal reveal-d1" href="https://healthbiocare.com/geneometry-healthy-aging-panel/">
      <div class="pcard-line"></div>
      <img src="assets/images/aging-panel.jpg" class="pcard-img" alt="Aging">
      <p class="pcard-brand">Geneometry®</p>
      <h3 class="pcard-name">Healthy Aging Panel</h3>
      <p class="pcard-desc">
        <span class="lang-de">Messen Sie Ihr biologisches Alter und identifizieren Sie die spezifischen epigenetischen Mechanismen, die Entzündungen und Alterung in Ihrem Körper vorantreiben. Personalisierte Prävention, keine allgemeinen Ratschläge.</span>
        <span class="lang-en" style="display:none">Measure your biological age and identify the specific epigenetic mechanisms driving inflammation and ageing in your body. Personalised prevention, not general advice.</span>
      </p>
      <div class="pcard-foot">
        <span class="pcard-price">€ 460</span>
        <div class="pcard-arr">
          <svg class="arr-icon" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </div>
      </div>
    </a>

    <a class="pcard reveal reveal-d2" href="https://healthbiocare.com/geneometry-healthy-sport-panel/">
      <div class="pcard-line"></div>
      <img src="assets/images/sport-panel.jpg" class="pcard-img" alt="Sport">
      <p class="pcard-brand">Geneometry®</p>
      <h3 class="pcard-name">Healthy Sport Panel</h3>
      <p class="pcard-desc">
        <span class="lang-de">Verfolgen Sie Ihre molekularen Fitnessmarker und erhalten Sie Trainings- und Ernährungsempfehlungen, die auf Ihren genetischen Sporttyp und aktuellen epigenetischen Zustand abgestimmt sind.</span>
        <span class="lang-en" style="display:none">Track your molecular fitness markers and receive training and nutrition recommendations calibrated to your genetic sport type and current epigenetic state.</span>
      </p>
      <div class="pcard-foot">
        <span class="pcard-price">€ 229</span>
        <div class="pcard-arr">
          <svg class="arr-icon" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </div>
      </div>
    </a>

    <a class="pcard reveal reveal-d3" href="https://healthbiocare.com/stress-monitor-panel/">
      <div class="pcard-line"></div>
      <img src="assets/images/stress-panel.png" class="pcard-img" alt="Stress">
      <p class="pcard-brand">Geneometry®</p>
      <h3 class="pcard-name">Stress Monitor Panel</h3>
      <p class="pcard-desc">
        <span class="lang-de">Erkennen Sie die epigenetische Signatur von chronischem Stress und Burnout-Risiko, bevor Symptome auftreten. Frühe Erkennung bedeutet frühe Intervention.</span>
        <span class="lang-en" style="display:none">Detect the epigenetic signature of chronic stress and burnout risk before symptoms appear. Early recognition means early intervention.</span>
      </p>
      <div class="pcard-foot">
        <span class="pcard-price">€ 229</span>
        <div class="pcard-arr">
          <svg class="arr-icon" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </div>
      </div>
    </a>

  </div>
</div>

<div class="divider"></div>

<!-- PROCESS -->
<div class="sec" id="process">
  <div class="reveal">
    <p class="eyebrow"><span class="lang-de">Der Ablauf</span><span class="lang-en" style="display:none">The Process</span></p>
    <h2 class="sec-h">
      <span class="lang-de">Von der Fingerspitze zum<br>personalisierten Bericht</span>
      <span class="lang-en" style="display:none">From fingertip to<br>personalised report</span>
    </h2>
    <p class="sec-sub">
      <span class="lang-de">Kein Klinikbesuch erforderlich. Die gesamte Probenentnahme erfolgt in weniger als zehn Minuten bequem zu Hause.</span>
      <span class="lang-en" style="display:none">No clinic visit required. The entire sample collection happens at home in under ten minutes.</span>
    </p>
  </div>

  <div class="steps reveal">
    <div class="step">
      <div class="step-num">📋</div>
      <p class="step-name"><span class="lang-de">Fragebogen ausfüllen</span><span class="lang-en" style="display:none">Fill Questionnaire</span></p>
      <p class="step-desc">
        <span class="lang-de">Teilen Sie Ihre Lebensstil- und Ernährungsgewohnheiten, damit die Ergebnisse richtig eingeordnet werden können.</span>
        <span class="lang-en" style="display:none">Share your lifestyle and nutrition habits so results can be properly contextualised.</span>
      </p>
    </div>
    <div class="step">
      <div class="step-num">💉</div>
      <p class="step-name"><span class="lang-de">Blutprobe entnehmen</span><span class="lang-en" style="display:none">Take Blood Sample</span></p>
      <p class="step-desc">
        <span class="lang-de">Mit der Lanzette im Kit können Sie ein paar Tropfen Blut auf einer Trockenblutkarte sammeln.</span>
        <span class="lang-en" style="display:none">A lancet in the kit lets you collect a few drops of blood onto a dried blood spot card.</span>
      </p>
    </div>
    <div class="step">
      <div class="step-num">📬</div>
      <p class="step-name"><span class="lang-de">Probe einsenden</span><span class="lang-en" style="display:none">Post Your Sample</span></p>
      <p class="step-desc">
        <span class="lang-de">Senden Sie die Karte in dem vorfrankierten Umschlag zurück, der jedem Kit beiliegt.</span>
        <span class="lang-en" style="display:none">Return the card in the pre-paid envelope included with every kit.</span>
      </p>
    </div>
    <div class="step">
      <div class="step-num">🔬</div>
      <p class="step-name"><span class="lang-de">Laboranalyse</span><span class="lang-en" style="display:none">Lab Analysis</span></p>
      <p class="step-desc">
        <span class="lang-de">Ihre Probe wird in unserem zertifizierten Labor auf genetische und epigenetische Marker analysiert.</span>
        <span class="lang-en" style="display:none">Your sample is analysed for genetic and epigenetic markers in our certified lab.</span>
      </p>
    </div>
    <div class="step">
      <div class="step-num">📊</div>
      <p class="step-name"><span class="lang-de">Ergebnisse erhalten</span><span class="lang-en" style="display:none">Receive Results</span></p>
      <p class="step-desc">
        <span class="lang-de">Sie erhalten einen personalisierten Bericht mit konkreten Empfehlungen für Ernährung, Lebensstil und Nahrungsergänzung.</span>
        <span class="lang-en" style="display:none">A personalised report arrives with concrete recommendations for diet, lifestyle, and supplements.</span>
      </p>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- BIOMARKERS / SCIENCE -->
<div class="sec" id="science">
  <div class="reveal">
    <p class="eyebrow"><span class="lang-de">Die Wissenschaft</span><span class="lang-en" style="display:none">The Science</span></p>
    <h2 class="sec-h">
      <span class="lang-de">Vier Ebenen<br>molekularer Einblicke</span>
      <span class="lang-en" style="display:none">Four layers of<br>molecular insight</span>
    </h2>
    <p class="sec-sub">
      <span class="lang-de">HealthBioCare analysiert mehrere Biomarker-Typen gleichzeitig und liefert ein vollständiges Bild, das kein einzelner Test bieten kann.</span>
      <span class="lang-en" style="display:none">HealthBioCare analyses multiple biomarker types simultaneously, giving a complete picture that no single test can provide.</span>
    </p>
  </div>

  <div class="bm-grid">
    <div class="bm reveal">
      <img src="assets/images/snps.jpg" class="bm-img" alt="SNPs">
      <h3 class="bm-title">SNPs</h3>
      <p class="bm-desc">
        <span class="lang-de">Single Nucleotide Polymorphisms sind vererbte genetische Varianten, die Ihren einzigartigen metabolischen Fingerabdruck prägen – Ihre lebenslangen Veranlagungen dazu, wie Sie Nahrung verarbeiten, auf Stress reagieren und altern.</span>
        <span class="lang-en" style="display:none">Single nucleotide polymorphisms are inherited genetic variants that shape your unique metabolic fingerprint , your lifelong predispositions to how you process food, respond to stress, and age.</span>
      </p>
    </div>
    <div class="bm reveal reveal-d1">
      <img src="assets/images/methylation.webp" class="bm-img" alt="DNA Methylation">
      <h3 class="bm-title">
        <span class="lang-de">DNA-Methylierung</span>
        <span class="lang-en" style="display:none">DNA Methylation</span>
      </h3>
      <p class="bm-desc">
        <span class="lang-de">Die epigenetischen Schalter, die bestimmen, welche Gene aktiv oder stummgeschaltet sind. Im Gegensatz zu Ihrer DNA-Sequenz ändern sich Methylierungsmuster mit dem Lebensstil und sind der primäre Marker für das biologische Alter.</span>
        <span class="lang-en" style="display:none">The epigenetic switches that determine which genes are active or silenced. Unlike your DNA sequence, methylation patterns change with lifestyle and are the primary marker of biological age.</span>
      </p>
    </div>
    <div class="bm reveal reveal-d2">
      <img src="assets/images/microrna.jpg" class="bm-img" alt="microRNA">
      <h3 class="bm-title">microRNA</h3>
      <p class="bm-desc">
        <span class="lang-de">Kleine RNA-Moleküle, die die Genexpression in Echtzeit regulieren. miRNA-Muster aus Kapillarblut spiegeln Ihren aktuellen Stoffwechselzustand wider – ein Einblick, den Gentests allein nicht bieten können.</span>
        <span class="lang-en" style="display:none">Small RNA molecules that regulate gene expression in real time. miRNA patterns from capillary blood reflect your current metabolic state, a window that genetic testing alone cannot open.</span>
      </p>
    </div>
    <div class="bm reveal reveal-d3">
      <img src="assets/images/telomeres.png" class="bm-img" alt="Telomeres">
      <h3 class="bm-title">
        <span class="lang-de">Telomere</span>
        <span class="lang-en" style="display:none">Telomeres</span>
      </h3>
      <p class="bm-desc">
        <span class="lang-de">Die Schutzkappen an den Enden der Chromosomen, die sich mit jeder Zellteilung verkürzen. Die Telomerlänge ist einer der zuverlässigsten verfügbaren Indikatoren für zelluläre Alterung und langfristige Gesundheitsrisiken.</span>
        <span class="lang-en" style="display:none">The protective caps at chromosome ends that shorten with each cell division. Telomere length is one of the most reliable available indicators of cellular ageing and long-term health risk.</span>
      </p>
    </div>
  </div>
</div>

<div class="divider"></div>

<!-- RESEARCH AREAS -->
<div class="sec" id="research">
  <div class="reveal">
    <p class="eyebrow"><span class="lang-de">Forschung</span><span class="lang-en" style="display:none">Research</span></p>
    <h2 class="sec-h">
      <span class="lang-de">Aktive Forschungsbereiche</span>
      <span class="lang-en" style="display:none">Active research areas</span>
    </h2>
    <p class="sec-sub">
      <span class="lang-de">HealthBioCare betreibt angewandte Forschung in Zusammenarbeit mit der Universität Wien und der TU Wien, um Molekularbiologie in praktische Gesundheitsprodukte umzusetzen.</span>
      <span class="lang-en" style="display:none">HealthBioCare conducts applied research in collaboration with the University of Vienna and TU Wien, translating molecular biology into practical health products.</span>
    </p>
  </div>
  <div class="tags reveal">
    <span class="tag"><span class="lang-de">Gesundes Altern</span><span class="lang-en" style="display:none">Healthy Ageing</span></span>
    <span class="tag"><span class="lang-de">Stress- &amp; Burnout-Prävention</span><span class="lang-en" style="display:none">Stress &amp; Burnout Prevention</span></span>
    <span class="tag"><span class="lang-de">Ernährungsbedingte Krankheiten</span><span class="lang-en" style="display:none">Nutrition-Related Disease</span></span>
    <span class="tag"><span class="lang-de">Fasten &amp; Fastenmimetika</span><span class="lang-en" style="display:none">Fasting &amp; Fasting Mimetics</span></span>
    <span class="tag"><span class="lang-de">Epigenetisch aktive Pflanzenextrakte</span><span class="lang-en" style="display:none">Epigenetically Active Plant Extracts</span></span>
    <span class="tag"><span class="lang-de">Sportleistung &amp; Monitoring</span><span class="lang-en" style="display:none">Sports Performance &amp; Monitoring</span></span>
    <span class="tag"><span class="lang-de">Gesundheit des Immunsystems</span><span class="lang-en" style="display:none">Immune System Health</span></span>
    <span class="tag"><span class="lang-de">Krebsfrüherkennung</span><span class="lang-en" style="display:none">Early Cancer Detection</span></span>
    <span class="tag"><span class="lang-de">Orales Mikrobiom</span><span class="lang-en" style="display:none">Oral Microbiome</span></span>
    <span class="tag"><span class="lang-de">miRNA aus Kapillarblut</span><span class="lang-en" style="display:none">miRNA from Capillary Blood</span></span>
  </div>
</div>

<!-- CTA -->
<div class="sec">
  <div class="cta-box reveal">
    <h2 class="cta-h">
      <span class="lang-de">Beginnen Sie Ihre<br>Gesundheitsreise</span>
      <span class="lang-en" style="display:none">Begin your<br>health journey</span>
    </h2>
    <p class="cta-sub">
      <span class="lang-de">Eine Blutprobe. Ein vollständiges molekulares Bild. Personalisierte Empfehlungen, die Sie sofort umsetzen können.</span>
      <span class="lang-en" style="display:none">One blood sample. A complete molecular picture. Personalised recommendations you can act on immediately.</span>
    </p>
    <a class="btn-p" href="https://healthbiocare.com/shop/">
      <span class="lang-de">Analyse bestellen</span>
      <span class="lang-en" style="display:none">Order Your Analysis</span>
    </a>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <span class="f-logo"><span>Health</span>BioCare</span>
  <div class="f-links">
    <a href="https://healthbiocare.com/ueber-uns/"><span class="lang-de">Über uns</span><span class="lang-en" style="display:none">About</span></a>
    <a href="https://healthbiocare.com/forschung/"><span class="lang-de">Forschung</span><span class="lang-en" style="display:none">Research</span></a>
    <a href="https://healthbiocare.com/publikationen/"><span class="lang-de">Publikationen</span><span class="lang-en" style="display:none">Publications</span></a>
    <a href="https://healthbiocare.com/kontakt/"><span class="lang-de">Kontakt</span><span class="lang-en" style="display:none">Contact</span></a>
  </div>
  <span>Billrothstraße 4, 1190 Vienna, Austria</span>
</footer>

<script>
// === LANGUAGE TOGGLE ===
function setLang(lang) {
  document.documentElement.lang = lang;
  
  // Toggle active button
  document.getElementById('btn-de').classList.toggle('active', lang === 'de');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  
  // Toggle texts
  const deEls = document.querySelectorAll('.lang-de');
  const enEls = document.querySelectorAll('.lang-en');
  
  if (lang === 'en') {
    deEls.forEach(el => el.style.display = 'none');
    enEls.forEach(el => el.style.display = '');
  } else {
    deEls.forEach(el => el.style.display = '');
    enEls.forEach(el => el.style.display = 'none');
  }
}

// === UPWARD-DRIFTING PARTICLE CANVAS & MAGNETIC ORBITALS ===
(function(){
  const c = document.getElementById('particles');
  const ctx = c.getContext('2d');
  let W, H, pts;
  let mx = -1000, my = -1000;
  
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  window.addEventListener('mouseleave', () => { mx = -1000; my = -1000; });
  
  // Orbital rings configuration (Radius, angle, speed, color, alpha)
  const orbitals = [
    { r: 110, angle: 0, speed: 0.005, color: '#7C63F5', a: 1 }, // purple (was teal)
    { r: 200, angle: 40 * Math.PI/180, speed: 0.003, color: '#3DDBA6', a: 1 }, // teal (was purple)
    { r: 300, angle: -15 * Math.PI/180, speed: 0.002, color: '#7C63F5', a: 0.5 }, // purple (darker)
    { r: 410, angle: 70 * Math.PI/180, speed: 0.0015, color: '#3DDBA6', a: 0.65 } // teal (less dark than 3)
  ];

  function resize(){
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
    build();
  }

  function build(){
    const n = Math.min(80, Math.floor(W * H / 12000));
    pts = Array.from({length:n}, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -(Math.random() * 0.45 + 0.08),   // upward
      a: Math.random() * 0.45 + 0.15,
    }));
  }

  function frame(){
    ctx.clearRect(0, 0, W, H);

    // Draw background particles
    for(const p of pts){
      p.x += p.vx; p.y += p.vy;
      if(p.y < -8){ p.y = H + 8; p.x = Math.random() * W; }
      if(p.x < 0) p.x = W;
      if(p.x > W) p.x = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = \`rgba(61,219,166,\${p.a})\`;
      ctx.fill();
    }

    // Connections between particles
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){
          ctx.beginPath();
          ctx.moveTo(pts[i].x,pts[i].y);
          ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=\`rgba(61,219,166,\${(1-d/110)*0.11})\`;
          ctx.lineWidth=0.5;
          ctx.stroke();
        }
      }
    }
    
    // Draw and animate orbital dots
    const cx = W / 2;
    const cy = H / 2; // Fixed hero center for orbitals

    for (let orb of orbitals) {
      orb.angle += orb.speed;
      
      let base_x = cx + orb.r * Math.cos(orb.angle);
      let base_y = cy + orb.r * Math.sin(orb.angle);
      let draw_x = base_x;
      let draw_y = base_y;

      // Magnetic interaction
      const mdx = mx - base_x;
      const mdy = my - base_y;
      const dist = Math.sqrt(mdx*mdx + mdy*mdy);
      if (dist < 180) {
        // Pull dot towards mouse, up to a certain distance
        const force = (180 - dist) / 180;
        draw_x += mdx * force * 0.45;
        draw_y += mdy * force * 0.45;
      }

      ctx.beginPath();
      ctx.arc(draw_x, draw_y, 3.5, 0, Math.PI*2);
      ctx.fillStyle = orb.color;
      ctx.globalAlpha = orb.a;
      
      ctx.shadowBlur = 9;
      ctx.shadowColor = orb.color;
      
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }

    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  frame();
})();

// === NAV SOLIDIFY ON SCROLL ===
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  navEl.classList.toggle('solid', window.scrollY > 50);
}, {passive:true});

// === SCROLL REVEAL ===
const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, {threshold:0.1, rootMargin:'0px 0px -40px 0px'});
revEls.forEach(el => obs.observe(el));
</script>

</body>
</html>`;

fs.writeFileSync('prototype1.html', htmlContent, 'utf-8');
console.log('prototype1.html successfully updated.');

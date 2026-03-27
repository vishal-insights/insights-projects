"use client";


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// ── DATA ─────────────────────────────────────

const SERVICES = [
  "Company Incorporation", "Secretarial Audit",   "ROC Compliance",
  "FEMA & RBI Advisory",   "Corporate Governance", "Due Diligence",
  "NCLT Matters",          "IPO & SEBI Compliance","Other Services",
];

const QUICK_CONTACTS = [
  { icon:"bi-telephone-fill",   label:"Direct Line",        val:"+91 98100 00000",                                                    href:"tel:+919810000000" },
  { icon:"bi-whatsapp",         label:"WhatsApp",           val:"+91 98100 00000",                                                    href:"https://wa.me/919810000000" },
  { icon:"bi-envelope-fill",    label:"General Enquiries",  val:"info@skdwivedi.com",                                                 href:"mailto:info@skdwivedi.com" },
  { icon:"bi-envelope-at-fill", label:"Compliance Queries", val:"compliance@skdwivedi.com",                                           href:"mailto:compliance@skdwivedi.com" },
  { icon:"bi-geo-alt-fill",     label:"Office Address",     val:"Suite 12, Corporate Tower, Connaught Place, New Delhi – 110 001",    href:"#" },
  { icon:"bi-clock-fill",       label:"Office Hours",       val:"Monday – Saturday · 09:30 AM – 06:30 PM IST",                       href:"#" },
];

// ── CSS ───────────────────────────────────────

const CSS = `
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  :root {
    --bg:       #000000;
    --card:     #0d1117;
    --card2:    #111820;
    --gold:     #d4a843;
    --gold-lt:  #f0c84a;
    --navy:     #1a5fc8;
    --blue:     #4a90e8;
    --white:    #ffffff;
    --owhite:   #f0f4ff;
    --gray:     #b0bdd0;
    --dim:      #6a7d94;
    --bdr:      rgba(255,255,255,0.08);
    --bdr-g:    rgba(212,168,67,0.3);
    --bdr-b:    rgba(74,144,232,0.3);
  }

  html,body { height:100%; overflow-x:hidden; background:#000; }
  body {
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    font-size:16px; color:var(--white); line-height:1.5;
    -webkit-font-smoothing:antialiased;
  }
  ::-webkit-scrollbar { width:5px; }
  ::-webkit-scrollbar-thumb { background:rgba(212,168,67,0.2); border-radius:3px; }

  /* PAGE */
  .pg { min-height:100vh; display:flex; flex-direction:column; background:#000; position:relative; overflow:hidden; }

  /* GLOWS */
  .gl1 { position:fixed; left:-15%; top:5%; width:50vw; height:60vw; background:radial-gradient(circle,rgba(255,122,48,0.06) 0%,transparent 65%); pointer-events:none; z-index:0; }
  .gl2 { position:fixed; right:-10%; bottom:5%; width:45vw; height:45vw; background:radial-gradient(circle,rgba(74,144,232,0.07) 0%,transparent 65%); pointer-events:none; z-index:0; }

  /* HEADER */
  .hdr { position:relative; z-index:10; background:#000; border-bottom:1px solid rgba(212,168,67,0.2); padding:18px 24px; text-align:center; }
  .hdr-name { font-size:clamp(1.1rem,3vw,1.6rem); font-weight:700; color:var(--blue); letter-spacing:0.04em; }
  .hdr-sub  { margin-top:4px; font-size:clamp(0.58rem,1.4vw,0.7rem); letter-spacing:0.22em; text-transform:uppercase; color:var(--gray); }

  /* HERO */
  .hero {
    flex:1; position:relative; z-index:2;
    display:grid; grid-template-columns:1fr 1fr;
    align-items:center; gap:48px;
    padding:clamp(32px,6vw,80px) clamp(20px,5vw,72px);
    min-height:calc(100vh - 80px - 64px);
  }

  /* CLOCK */
  .vis { display:flex; align-items:center; justify-content:center; position:relative; }
  .clock-shell {
    position:relative;
    width:clamp(240px,34vw,460px);
    height:clamp(240px,34vw,460px);
  }
  .clock-cv {
    width:100%; height:100%; border-radius:50%;
    filter:drop-shadow(0 0 40px rgba(212,168,67,0.15)) drop-shadow(0 0 80px rgba(74,144,232,0.1));
  }
  .go { position:absolute; left:-15%; top:8%; width:50%; height:80%; background:radial-gradient(circle,rgba(255,122,48,0.35) 0%,transparent 65%); filter:blur(24px); z-index:-1; }
  .gb { position:absolute; right:-10%; bottom:-5%; width:55%; height:55%; background:radial-gradient(circle,rgba(74,144,232,0.28) 0%,transparent 65%); filter:blur(20px); z-index:-1; }

  /* BADGES */
  .badge { position:absolute; background:rgba(13,17,23,0.95); border:1px solid var(--bdr-b); padding:10px 14px; display:flex; align-items:center; gap:10px; backdrop-filter:blur(10px); }
  .badge.t { top:-5%; left:-8%; }
  .badge.b { bottom:-6%; right:-5%; }
  .bdot { width:8px; height:8px; border-radius:50%; flex-shrink:0; background:#4ade80; box-shadow:0 0 8px #4ade80; animation:blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }
  .bicon { color:var(--blue); font-size:1.15rem; }
  .bnum  { font-size:1.25rem; font-weight:700; color:var(--white); line-height:1; }
  .blbl  { font-size:0.58rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--gray); }
  .btitle{ font-size:0.75rem; font-weight:600; color:var(--owhite); }
  .bsub  { font-size:0.6rem; color:var(--gray); }

  /* CONTENT */
  .tag {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 14px; border-radius:100px;
    background:rgba(74,144,232,0.1); border:1px solid var(--bdr-b);
    font-size:0.67rem; font-weight:500; letter-spacing:0.12em; text-transform:uppercase;
    color:#7ab8f5; margin-bottom:20px;
  }
  .h1 { font-size:clamp(2.6rem,5.5vw,5rem); font-weight:800; line-height:1.0; letter-spacing:-0.02em; margin-bottom:20px; }
  .h1 .w1 { display:block; color:var(--white); }
  .h1 .w3 { display:block; color:var(--gold-lt); font-style:italic; font-weight:600; }
  .desc { font-size:1rem; line-height:1.75; color:var(--gray); max-width:420px; margin-bottom:32px; }

  /* BUTTONS */
  .btns { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:36px; }
  .btn-p {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 28px; border-radius:100px;
    background:var(--navy); border:1px solid var(--blue);
    color:var(--white); font-size:0.85rem; font-weight:600;
    letter-spacing:0.04em; cursor:pointer; text-decoration:none;
    transition:background 0.2s,transform 0.2s,box-shadow 0.2s;
    font-family:inherit;
  }
  .btn-p:hover { background:var(--blue); transform:translateY(-2px); box-shadow:0 8px 24px rgba(74,144,232,0.35); }
  .btn-w {
    display:inline-flex; align-items:center; gap:8px;
    padding:13px 28px; border-radius:100px;
    background:transparent; border:1px solid rgba(74,222,128,0.4);
    color:#4ade80; font-size:0.85rem; font-weight:600;
    letter-spacing:0.04em; cursor:pointer; text-decoration:none;
    transition:background 0.2s,transform 0.2s,border-color 0.2s;
  }
  .btn-w:hover { background:rgba(74,222,128,0.08); border-color:#4ade80; transform:translateY(-2px); }

  /* CHIPS */
  .chips { display:flex; flex-wrap:wrap; gap:10px; padding-top:28px; border-top:1px solid var(--bdr); }
  .chip {
    display:flex; align-items:center; gap:7px;
    padding:7px 14px; background:var(--card); border:1px solid var(--bdr);
    border-radius:6px; font-size:0.78rem; color:var(--owhite);
    transition:border-color 0.2s,background 0.2s;
  }
  .chip i { color:var(--gold); font-size:0.85rem; }
  .chip:hover { border-color:var(--bdr-g); background:var(--card2); }

  /* FOOTER */
  .ftr {
    position:relative; z-index:5; background:#000;
    border-top:1px solid var(--bdr);
    padding:0 clamp(20px,5vw,72px); min-height:64px;
    display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;
  }
  .ftr-copy { font-size:0.72rem; color:var(--dim); }
  .ftr-links { display:flex; gap:24px; }
  .ftr-links a { font-size:0.72rem; color:var(--dim); text-decoration:none; transition:color 0.2s; }
  .ftr-links a:hover { color:var(--owhite); }
  .ftr-soc { display:flex; gap:8px; }
  .soc-icon {
    width:34px; height:34px; border-radius:50%; border:1px solid var(--bdr);
    display:grid; place-items:center; color:var(--dim); font-size:0.9rem; text-decoration:none;
    transition:color 0.2s,border-color 0.2s,background 0.2s;
  }
  .soc-icon:hover { color:var(--white); border-color:var(--bdr-b); background:rgba(74,144,232,0.1); }

  /* OVERLAY */
  .overlay {
    position:fixed; inset:0; z-index:200;
    background:rgba(0,0,0,0.88); backdrop-filter:blur(12px);
    display:flex; align-items:center; justify-content:center; padding:16px;
  }

  /* MODAL */
  .modal {
    background:var(--card); border:1px solid rgba(212,168,67,0.25);
    width:100%; max-width:600px; max-height:92vh; overflow-y:auto;
    border-radius:4px; scrollbar-width:thin; scrollbar-color:rgba(212,168,67,0.2) transparent;
  }
  .modal-bar { height:3px; background:linear-gradient(90deg,var(--navy),var(--blue),var(--navy)); border-radius:4px 4px 0 0; }
  .modal-head { padding:24px 24px 20px; border-bottom:1px solid var(--bdr); display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
  .modal-title { font-size:1.5rem; font-weight:700; color:var(--white); line-height:1.2; }
  .modal-title span { color:var(--gold-lt); }
  .modal-sub { font-size:0.82rem; color:var(--gray); margin-top:4px; }
  .modal-close {
    width:36px; height:36px; flex-shrink:0; border:1px solid var(--bdr);
    background:transparent; color:var(--gray); cursor:pointer; font-size:1rem;
    display:grid; place-items:center; border-radius:4px;
    transition:color 0.2s,border-color 0.2s,background 0.2s;
  }
  .modal-close:hover { color:var(--white); border-color:rgba(255,255,255,0.3); background:rgba(255,255,255,0.06); }

  /* TABS */
  .tabs { display:flex; border-bottom:1px solid var(--bdr); }
  .tab {
    flex:1; padding:13px 12px; display:flex; align-items:center; justify-content:center; gap:7px;
    font-size:0.78rem; font-weight:500; letter-spacing:0.05em; color:var(--gray);
    cursor:pointer; border:none; border-bottom:2px solid transparent;
    background:none; font-family:inherit;
    transition:color 0.2s,border-color 0.2s,background 0.2s;
  }
  .tab:hover { color:var(--owhite); background:rgba(255,255,255,0.03); }
  .tab.on { color:var(--white); border-bottom-color:var(--blue); }
  .tab i { font-size:0.85rem; }

  /* MODAL BODY */
  .mbody { padding:24px; }

  /* QUICK CONTACT */
  .qlist { display:flex; flex-direction:column; gap:2px; }
  .qrow {
    display:flex; align-items:center; gap:14px; padding:14px 12px;
    background:var(--card2); border:1px solid var(--bdr); border-radius:4px;
    text-decoration:none; transition:background 0.2s,border-color 0.2s;
    position:relative; overflow:hidden;
  }
  .qrow::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--blue); transform:scaleY(0); transition:transform 0.25s; transform-origin:bottom; }
  .qrow:hover { background:rgba(74,144,232,0.06); border-color:var(--bdr-b); }
  .qrow:hover::before { transform:scaleY(1); }
  .qicon { width:42px; height:42px; flex-shrink:0; background:rgba(74,144,232,0.1); border:1px solid var(--bdr-b); border-radius:4px; display:grid; place-items:center; font-size:1.05rem; color:var(--blue); }
  .qlabel { font-size:0.65rem; letter-spacing:0.12em; text-transform:uppercase; color:var(--dim); margin-bottom:3px; }
  .qval   { font-size:0.88rem; font-weight:500; color:var(--owhite); }

  /* FORM */
  .fgrid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .fspan { grid-column:1/-1; }
  .fld { position:relative; }
  .flabel {
    display:block; font-size:0.72rem; font-weight:500; color:var(--gray);
    margin-bottom:6px; letter-spacing:0.04em; text-transform:uppercase; transition:color 0.2s;
  }
  .fld:focus-within .flabel { color:var(--owhite); }
  .finput {
    width:100%; background:rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.12);
    border-radius:4px; color:var(--white); font-family:inherit;
    font-size:0.9rem; font-weight:400; padding:11px 14px; outline:none;
    transition:border-color 0.2s,background 0.2s; -webkit-appearance:none;
  }
  .finput:focus { border-color:var(--blue); background:rgba(74,144,232,0.05); }
  .finput::placeholder { color:rgba(160,180,200,0.4); font-size:0.85rem; }
  select.finput {
    cursor:pointer;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a90e8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 14px center;
    background-color:rgba(0,0,0,0.6); padding-right:36px;
  }
  select.finput option { background:#0d1117; color:#fff; }
  textarea.finput { min-height:100px; resize:vertical; line-height:1.7; }
  .fline { position:absolute; bottom:0; left:0; height:2px; width:0%; background:var(--blue); border-radius:0 0 2px 2px; transition:width 0.3s; }
  .fld:focus-within .fline { width:100%; }

  /* FORM BOTTOM */
  .fbot { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-top:20px; padding-top:18px; border-top:1px solid var(--bdr); }
  .sec-note { font-size:0.75rem; color:var(--dim); display:flex; align-items:center; gap:6px; }
  .sec-note i { color:var(--gold); }
  .sbtn {
    display:inline-flex; align-items:center; gap:8px;
    padding:12px 26px; border-radius:100px;
    background:var(--navy); border:1px solid var(--blue);
    color:var(--white); font-family:inherit; font-size:0.85rem; font-weight:600;
    letter-spacing:0.04em; cursor:pointer;
    transition:background 0.2s,transform 0.2s,box-shadow 0.2s;
  }
  .sbtn:hover:not(:disabled) { background:var(--blue); transform:translateY(-1px); box-shadow:0 6px 20px rgba(74,144,232,0.35); }
  .sbtn:disabled { opacity:0.6; cursor:not-allowed; }

  /* ERROR BOX */
  .err-box {
    margin-top:12px; padding:10px 14px; border-radius:4px;
    background:rgba(255,80,80,0.1); border:1px solid rgba(255,80,80,0.3);
    color:#ff8080; font-size:0.82rem; display:flex; align-items:center; gap:8px;
  }

  /* SUCCESS */
  .success { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:48px 24px; text-align:center; }
  .suc-icon { width:72px; height:72px; border-radius:50%; background:rgba(74,144,232,0.15); border:2px solid var(--blue); display:grid; place-items:center; font-size:2rem; color:var(--blue); }
  .suc-title { font-size:1.6rem; font-weight:700; color:var(--white); }
  .suc-msg   { font-size:0.88rem; color:var(--gray); max-width:300px; line-height:1.7; }

  /* RESPONSIVE */
  @media (max-width:860px) {
    .hero { grid-template-columns:1fr; gap:32px; padding:28px 20px 48px; min-height:auto; }
    .vis { order:-1; }
    .clock-shell { width:clamp(200px,62vw,320px) !important; height:clamp(200px,62vw,320px) !important; }
    .badge.t { top:-4%; left:-2%; }
    .badge.b { bottom:-4%; right:-2%; }
    .h1 { font-size:clamp(2.2rem,8vw,3.2rem) !important; }
    .desc { max-width:100% !important; }
  }
  @media (max-width:540px) {
    .fgrid { grid-template-columns:1fr; }
    .fspan { grid-column:1; }
    .btns { flex-direction:column; }
    .btn-p,.btn-w { justify-content:center; }
    .ftr { flex-direction:column; padding:14px 20px; text-align:center; gap:10px; }
    .ftr-links { justify-content:center; flex-wrap:wrap; gap:12px; }
    .ftr-soc { justify-content:center; }
    .fbot { flex-direction:column; align-items:stretch; }
    .sbtn { justify-content:center; }
  }
`;

// ── COMPONENT ─────────────────────────────────

export default function ContactPage() {

  // ── State ──
  const EMPTY = { name:"", email:"", phone:"", company:"", service:"", message:"" };
  const [form,      setForm]      = useState(EMPTY);
  const [focused,   setFocused]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showForm,  setShowForm]  = useState(false);
  const [tab,       setTab]       = useState("form");
  const [loading,   setLoading]   = useState(false);
  const [errMsg,    setErrMsg]    = useState("");

  // ── Refs & Motion ──
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sx = useSpring(mouseX, { stiffness:50, damping:18 });
  const sy = useSpring(mouseY, { stiffness:50, damping:18 });

  // ── FORM SUBMIT — API call ──────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setForm(EMPTY);
        setTimeout(() => {
          setSubmitted(false);
          setShowForm(false);
        }, 5000);
      } else {
        setErrMsg(data.error || "Kuch galat hua. Dobara try karo.");
      }
    } catch (err) {
      setErrMsg("Network error. Internet connection check karo.");
    } finally {
      setLoading(false);
    }
  };

  // ── CLOCK ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, t = 0;

    const resize = () => {
      const d = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * d;
      canvas.height = canvas.offsetHeight * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.007;
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const cx = w/2, cy = h/2, R = Math.min(w,h)*0.43;

      const face = ctx.createRadialGradient(cx-R*.15,cy-R*.15,0,cx,cy,R);
      face.addColorStop(0,"#101a2a"); face.addColorStop(.6,"#080f1a"); face.addColorStop(1,"#030609");
      ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fillStyle=face; ctx.fill();

      [[1,.4],[.82,.09],[.64,.06],[.47,.05]].forEach(([r,a])=>{
        ctx.beginPath(); ctx.arc(cx,cy,R*r,0,Math.PI*2);
        ctx.strokeStyle=r===1?`rgba(212,168,67,${a})`:`rgba(74,144,232,${a})`;
        ctx.lineWidth=r===1?1.5:.6; ctx.stroke();
      });

      for(let i=0;i<60;i++){
        const a=(i/60)*Math.PI*2-Math.PI/2, main=i%5===0;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(a)*R*(main?.87:.93),cy+Math.sin(a)*R*(main?.87:.93));
        ctx.lineTo(cx+Math.cos(a)*R*.98,cy+Math.sin(a)*R*.98);
        ctx.strokeStyle=main?"rgba(212,168,67,.7)":"rgba(255,255,255,.12)";
        ctx.lineWidth=main?1.5:.5; ctx.stroke();
      }

      ["XII","III","VI","IX"].forEach((l,i)=>{
        const a=(i/4)*Math.PI*2-Math.PI/2;
        ctx.font=`600 ${R*.085}px -apple-system,sans-serif`;
        ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillStyle="rgba(212,168,67,.75)";
        ctx.fillText(l,cx+Math.cos(a)*R*.73,cy+Math.sin(a)*R*.73);
      });

      const bA=-Math.PI/2+t*.12;
      ctx.beginPath(); ctx.arc(cx,cy,R*.88,bA-.7,bA+.7);
      ctx.strokeStyle="rgba(74,144,232,.85)"; ctx.lineWidth=2.8; ctx.lineCap="round"; ctx.stroke();

      const oA=-Math.PI/2+t*.35;
      ctx.beginPath(); ctx.arc(cx,cy,R*.72,oA-.45,oA+.45);
      ctx.strokeStyle="rgba(255,122,48,.9)"; ctx.lineWidth=2.2; ctx.lineCap="round"; ctx.stroke();

      ctx.beginPath(); ctx.arc(cx,cy,R*.56,-Math.PI/2,-Math.PI/2+(t*.22)%(Math.PI*2));
      ctx.strokeStyle="rgba(212,168,67,.18)"; ctx.lineWidth=1; ctx.stroke();

      const hnd=(angle,len,w,color,glow=false)=>{
        ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle+Math.PI/2);
        if(glow){ctx.shadowColor=color; ctx.shadowBlur=12;}
        ctx.beginPath(); ctx.moveTo(0,R*.09); ctx.lineTo(0,-R*len);
        ctx.strokeStyle=color; ctx.lineWidth=w; ctx.lineCap="round"; ctx.stroke();
        ctx.shadowBlur=0; ctx.restore();
      };
      hnd((t*.04)%(Math.PI*2)-Math.PI/2,.42,4,"#d0d8e8");
      hnd((t*.55)%(Math.PI*2)-Math.PI/2,.58,2.2,"#d4a843",true);
      hnd((t*5.8)%(Math.PI*2)-Math.PI/2,.67,1.4,"#6fb3ff",true);
      hnd((t*5.8)%(Math.PI*2)-Math.PI/2+Math.PI,.13,3,"rgba(111,179,255,.5)");

      const jg=ctx.createRadialGradient(cx,cy,0,cx,cy,R*.06);
      jg.addColorStop(0,"#f0c84a"); jg.addColorStop(.5,"#d4a843"); jg.addColorStop(1,"rgba(180,130,40,.4)");
      ctx.beginPath(); ctx.arc(cx,cy,R*.055,0,Math.PI*2); ctx.fillStyle=jg; ctx.fill();
      ctx.beginPath(); ctx.arc(cx,cy,R*.026,0,Math.PI*2); ctx.fillStyle="#05090f"; ctx.fill();

      raf=requestAnimationFrame(draw);
    };
    draw();
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  }, []);

  // ── PARALLAX ──
  useEffect(()=>{
    const move=(e)=>{ mouseX.set((e.clientX/window.innerWidth-.5)*22); mouseY.set((e.clientY/window.innerHeight-.5)*14); };
    window.addEventListener("mousemove",move);
    return ()=>window.removeEventListener("mousemove",move);
  },[]);

  // ── FIELDS CONFIG ──
  const FIELDS = [
    { id:"name",    label:"Full Name",             ph:"Mr. Rajesh Kumar",   type:"text",  req:true  },
    { id:"company", label:"Company / Organisation", ph:"ABC Pvt. Ltd.",     type:"text",  req:false },
    { id:"email",   label:"Email Address",          ph:"rajesh@company.com",type:"email", req:true  },
    { id:"phone",   label:"Phone Number",           ph:"+91 98XXX XXXXX",   type:"tel",   req:false },
  ];

  // ── RENDER ──
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="pg">
        <div className="gl1" /><div className="gl2" />

        {/* HEADER */}
        <motion.header className="hdr"
          initial={{ opacity:0, y:-60 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:.65, ease:[.16,1,.3,1] }}
        >
          <div className="hdr-name">S K Dwivedi &amp; Associates</div>
          <div className="hdr-sub">Company Secretaries · ICSI Registered · Est. 2001</div>
        </motion.header>

        {/* HERO */}
        <main className="hero">

          {/* Clock */}
          <motion.div className="vis"
            initial={{ opacity:0, scale:.9 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.1, ease:[.16,1,.3,1] }}
            style={{ x:sx, y:sy }}
          >
            <div className="clock-shell">
              <div className="go" /><div className="gb" />
              <canvas ref={canvasRef} className="clock-cv" />
              <motion.div className="badge t"
                initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }}
                transition={{ delay:.9, duration:.5 }}
              >
                <i className="bi bi-award-fill bicon" />
                <div><div className="bnum">10+</div><div className="blbl">Years of Excellence</div></div>
              </motion.div>
              <motion.div className="badge b"
                initial={{ opacity:0, x:14 }} animate={{ opacity:1, x:0 }}
                transition={{ delay:1.05, duration:.5 }}
              >
                <div className="bdot" />
                <div><div className="btitle">Available Now</div><div className="bsub">Reply within 1 business day</div></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity:0, x:32 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:.85, ease:[.16,1,.3,1], delay:.12 }}
          >
            <motion.div className="tag"
              initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:.4 }}
            >
              <i className="bi bi-patch-check-fill" /> Trusted Corporate Governance Partner
            </motion.div>

            <h1 className="h1">
              <span className="w1">Connect</span>
              <span className="w1">With Our</span>
              <span className="w3">Experts.</span>
            </h1>

            <p className="desc">
              S K Dwivedi &amp; Associates delivers precision-driven secretarial
              compliance, SEBI &amp; ROC advisory, and corporate governance solutions.
              Your compliance — our commitment.
            </p>

            <div className="btns">
              <button className="btn-p" onClick={() => { setShowForm(true); setTab("form"); setErrMsg(""); setSubmitted(false); }}>
                <i className="bi bi-envelope-fill" /> Send Enquiry
              </button>
              <a href="https://wa.me/919699981283" target="_blank" rel="noreferrer" className="btn-w">
                <i className="bi bi-whatsapp" /> WhatsApp Us
              </a>
            </div>

            <div className="chips">
              {[
                { icon:"bi-geo-alt-fill",  t:"Connaught Place, New Delhi" },
                { icon:"bi-telephone-fill",t:"+91 9699981283" },
                { icon:"bi-clock-fill",    t:"Mon–Sat · 9:30–6:30 IST" },
                { icon:"bi-shield-check",  t:"Confidential & Secure" },
              ].map((m,i) => (
                <motion.div key={i} className="chip"
                  initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay:.8+i*.07 }}
                >
                  <i className={`bi ${m.icon}`} />{m.t}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* FOOTER */}
        <motion.footer className="ftr"
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          transition={{ delay:1.2, duration:.5 }}
        >
          <div className="ftr-copy">© 2025 S K Dwivedi &amp; Associates. All rights reserved.</div>
          <div className="ftr-links">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Disclaimer</a>
          </div>
          <div className="ftr-soc">
            {[
              { icon:"bi-linkedin",      href:"#" },
              { icon:"bi-twitter-x",     href:"#" },
              { icon:"bi-envelope-fill", href:"mailto:info@skdwivedi.com" },
              { icon:"bi-whatsapp",      href:"https://wa.me/919699981283" },
            ].map(({ icon, href }, i) => (
              <a key={i} href={href} className="soc-icon"><i className={`bi ${icon}`} /></a>
            ))}
          </div>
        </motion.footer>

        {/* MODAL */}
        <AnimatePresence>
          {showForm && (
            <motion.div className="overlay"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={e => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div className="modal"
                initial={{ opacity:0, scale:.93, y:24 }}
                animate={{ opacity:1, scale:1,   y:0  }}
                exit={{    opacity:0, scale:.95,  y:12 }}
                transition={{ duration:.35, ease:[.16,1,.3,1] }}
              >
                <div className="modal-bar" />

                {/* Modal Head */}
                <div className="modal-head">
                  <div>
                    <div className="modal-title">Get in <span>Touch</span></div>
                    <div className="modal-sub">We respond within one business day.</div>
                  </div>
                  <button className="modal-close" onClick={() => setShowForm(false)}>
                    <i className="bi bi-x-lg" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="tabs">
                  {[
                    { k:"form",    l:"Enquiry Form",  i:"bi-envelope"  },
                    { k:"contact", l:"Quick Contact", i:"bi-telephone" },
                  ].map(t => (
                    <button key={t.k} className={`tab ${tab===t.k?"on":""}`} onClick={() => setTab(t.k)}>
                      <i className={`bi ${t.i}`} />{t.l}
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div className="mbody">
                  <AnimatePresence mode="wait">

                    {/* SUCCESS */}
                    {submitted ? (
                      <motion.div key="ok" className="success"
                        initial={{ opacity:0, scale:.9 }}
                        animate={{ opacity:1, scale:1 }}
                        exit={{ opacity:0 }}
                      >
                        <motion.div className="suc-icon"
                          initial={{ scale:0, rotate:-20 }}
                          animate={{ scale:1, rotate:0 }}
                          transition={{ type:"spring", stiffness:220, damping:16 }}
                        >
                          <i className="bi bi-check-lg" />
                        </motion.div>
                        <div className="suc-title">Enquiry Sent! ✅</div>
                        <p className="suc-msg">
                          Thank you. A senior associate will contact you within one business day.
                        </p>
                      </motion.div>

                    ) : tab === "contact" ? (

                      /* QUICK CONTACT */
                      <motion.div key="qc"
                        initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }}
                      >
                        <div className="qlist">
                          {QUICK_CONTACTS.map((c, i) => (
                            <a key={i} href={c.href} className="qrow">
                              <div className="qicon"><i className={`bi ${c.icon}`} /></div>
                              <div>
                                <div className="qlabel">{c.label}</div>
                                <div className="qval">{c.val}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>

                    ) : (

                      /* ENQUIRY FORM */
                      <motion.form key="form" onSubmit={handleSubmit}
                        initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:16 }}
                      >
                        <div className="fgrid">
                          {FIELDS.map(f => (
                            <div key={f.id} className="fld">
                              <label className="flabel" htmlFor={f.id}>{f.label}</label>
                              <input
                                className="finput" id={f.id} type={f.type}
                                placeholder={f.ph} required={f.req}
                                value={form[f.id]}
                                onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                                onFocus={() => setFocused(f.id)}
                                onBlur={() => setFocused(null)}
                              />
                              <div className="fline" style={{ width: focused===f.id?"100%":"0%" }} />
                            </div>
                          ))}

                          <div className="fld fspan">
                            <label className="flabel" htmlFor="service">Service Required</label>
                            <select className="finput" id="service"
                              value={form.service}
                              onChange={e => setForm({ ...form, service: e.target.value })}
                            >
                              <option value="">— Select a Service —</option>
                              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>

                          <div className="fld fspan">
                            <label className="flabel" htmlFor="msg">Brief Description</label>
                            <textarea className="finput" id="msg"
                              placeholder="Describe your requirement briefly..."
                              value={form.message}
                              onChange={e => setForm({ ...form, message: e.target.value })}
                              onFocus={() => setFocused("msg")}
                              onBlur={() => setFocused(null)}
                            />
                            <div className="fline" style={{ width: focused==="msg"?"100%":"0%" }} />
                          </div>
                        </div>

                        <div className="fbot">
                          <span className="sec-note">
                            <i className="bi bi-shield-lock-fill" /> Strictly confidential
                          </span>
                          <button type="submit" className="sbtn" disabled={loading}>
                            {loading
                              ? <><i className="bi bi-hourglass-split" /> Sending...</>
                              : <><i className="bi bi-send-fill" /> Submit Enquiry</>
                            }
                          </button>
                        </div>

                        {errMsg && (
                          <div className="err-box">
                            <i className="bi bi-exclamation-circle-fill" />{errMsg}
                          </div>
                        )}
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
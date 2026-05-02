"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function About() {
  const videoRef      = useRef(null);
  const canvasRef     = useRef(null);
  const animRef       = useRef(null);
  const particlesRef  = useRef([]);

  const [playing,     setPlaying]     = useState(false);
  const [muted,       setMuted]       = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [volume,      setVolume]      = useState(0.8);
  const [buffered,    setBuffered]    = useState(0);
  const [loaded,      setLoaded]      = useState(false);
  const [showCtrl,    setShowCtrl]    = useState(true);
  const [dragging,    setDragging]    = useState(false);
  const hideTimer     = useRef(null);

  /* ── entrance animation ── */
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  /* ── particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const count = 55;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.4 + 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particlesRef.current;
      pts.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${p.o})`;
        ctx.fill();
      });
      /* draw nearest-neighbour lines */
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(96,165,250,${0.07 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  /* ── auto-hide controls ── */
  const resetHide = useCallback(() => {
    setShowCtrl(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { if (playing) setShowCtrl(false); }, 2800);
  }, [playing]);

  useEffect(() => { resetHide(); }, [playing, resetHide]);

  const fmt = (t = 0) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progress  = duration ? (currentTime / duration) * 100 : 0;
  const bufferedP = duration ? (buffered / duration) * 100 : 0;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) videoRef.current.pause();
    else videoRef.current.play();
    setPlaying(p => !p);
    resetHide();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(m => !m);
  };

  const handleVolume = (v) => {
    if (!videoRef.current) return;
    videoRef.current.volume = v;
    setVolume(v);
    if (v === 0) { videoRef.current.muted = true; setMuted(true); }
    else { videoRef.current.muted = false; setMuted(false); }
  };

  const handleSeek = (e) => {
    const bar  = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const time  = ratio * duration;
    if (videoRef.current) videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleFullscreen = () => { if (videoRef.current) videoRef.current.requestFullscreen(); };

  const volIcon = muted || volume === 0 ? "bi-volume-mute-fill"
    : volume < 0.5 ? "bi-volume-down-fill" : "bi-volume-up-fill";

  /* ─────────────── JSX ─────────────── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --blue:   #3b82f6;
          --blue-l: #60a5fa;
          --blue-d: #1d4ed8;
          --text:   #e8e8f0;
          --muted:  rgba(232,232,240,0.45);
          --border: rgba(96,165,250,0.15);
        }

        .about-root {
          font-family: 'DM Sans', sans-serif;
          background: #04040a;
          min-height: 100vh;
          color: var(--text);
          overflow-x: hidden;
          position: relative;
        }

        /* ── particle canvas ── */
        .particle-canvas {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* ── deep radial vignette ── */
        .vignette {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: radial-gradient(ellipse 80% 80% at 50% 0%,
            rgba(37,99,235,0.12) 0%,
            rgba(4,4,10,0.0)     45%,
            rgba(4,4,10,0.7)     100%
          );
        }

        /* ── entrance animations ── */
        .rise {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 1s cubic-bezier(.16,1,.3,1),
                      transform 1s cubic-bezier(.16,1,.3,1);
        }
        .rise.in { opacity: 1; transform: none; }
        .d1 { transition-delay: .1s; }
        .d2 { transition-delay: .25s; }
        .d3 { transition-delay: .4s; }
        .d4 { transition-delay: .55s; }
        .d5 { transition-delay: .7s; }

        /* ── header ── */
        .site-header {
          text-align: center;
          padding: clamp(3rem,8vw,5.5rem) 1.5rem 2.5rem;
          position: relative;
          z-index: 10;
        }
        .eyebrow {
          font-size: 10px;
          letter-spacing: .45em;
          text-transform: uppercase;
          color: rgba(96,165,250,0.55);
          margin-bottom: 1.4rem;
        }
        .firm-name {
          font-family: 'Playfair Display', serif;
          font-weight: 300;
          font-size: clamp(2rem, 7vw, 4.8rem);
          letter-spacing: .04em;
          line-height: 1.05;
          color: #f2f2fc;
          text-shadow: 0 0 80px rgba(59,130,246,.3);
        }
        .firm-name em {
          font-style: italic;
          color: rgba(96,165,250,.7);
        }
        .tagline {
          margin-top: 1rem;
          font-size: clamp(11px, 1.5vw, 13px);
          letter-spacing: .35em;
          text-transform: uppercase;
          color: rgba(232,232,240,.25);
        }
        .hair-line {
          width: 120px;
          height: 1px;
          margin: 1.8rem auto 0;
          background: linear-gradient(90deg,transparent,rgba(96,165,250,.35),transparent);
        }

        /* ── video wrapper ── */
        .video-wrapper {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 1rem;
          position: relative;
          z-index: 10;
        }

        /* ── cinematic frame ── */
        .cinematic-frame {
          position: relative;
          border-radius: 18px;
          padding: 1.5px;
          background: conic-gradient(
            from 180deg,
            rgba(96,165,250,.7)   0deg,
            rgba(37,99,235,.25)  90deg,
            rgba(96,165,250,.5) 180deg,
            rgba(37,99,235,.15) 270deg,
            rgba(96,165,250,.7) 360deg
          );
          box-shadow:
            0 0 0 1px rgba(96,165,250,.06),
            0 4px 24px rgba(0,0,0,.6),
            0 0 80px rgba(37,99,235,.28),
            0 0 160px rgba(37,99,235,.1);
          transition: box-shadow .4s ease;
        }
        .cinematic-frame:hover {
          box-shadow:
            0 0 0 1px rgba(96,165,250,.1),
            0 4px 32px rgba(0,0,0,.65),
            0 0 100px rgba(37,99,235,.42),
            0 0 200px rgba(37,99,235,.16);
        }
        .cinematic-inner {
          border-radius: 17px;
          overflow: hidden;
          background: #000;
          position: relative;
        }

        /* ── letterbox bars ── */
        .letterbox-top,
        .letterbox-bot {
          position: absolute;
          left: 0; right: 0;
          height: clamp(12px, 3vw, 22px);
          background: #000;
          z-index: 2;
          pointer-events: none;
        }
        .letterbox-top { top: 0; }
        .letterbox-bot { bottom: 0; }

        /* ── big overlay play ── */
        .vid-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          cursor: pointer;
          background: rgba(0,0,0,.2);
          opacity: 0;
          transition: opacity .25s;
        }
        .cinematic-inner:hover .vid-overlay { opacity: 1; }
        .big-play {
          width: 68px; height: 68px;
          border-radius: 50%;
          backdrop-filter: blur(16px) saturate(1.5);
          background: rgba(255,255,255,.08);
          border: 1.5px solid rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 24px; color: #fff;
          transition: transform .22s, background .22s, border-color .22s;
        }
        .big-play:hover {
          transform: scale(1.12);
          background: rgba(59,130,246,.35);
          border-color: rgba(96,165,250,.7);
        }

        /* ── controls panel ── */
        .ctrl-panel {
          margin-top: 14px;
          padding: 14px 18px 12px;
          border-radius: 14px;
          background: rgba(255,255,255,.03);
          border: 1px solid rgba(96,165,250,.1);
          backdrop-filter: blur(20px);
          transition: opacity .3s, transform .3s;
        }
        .ctrl-panel.hidden { opacity: 0; transform: translateY(6px); pointer-events: none; }

        /* ── progress ── */
        .prog-wrap {
          position: relative;
          height: 4px;
          border-radius: 99px;
          background: rgba(255,255,255,.07);
          cursor: pointer;
          margin-bottom: 12px;
          transition: height .2s;
        }
        .prog-wrap:hover { height: 6px; }
        .prog-buf {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          border-radius: 99px;
          background: rgba(255,255,255,.1);
        }
        .prog-fill {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          border-radius: 99px;
          background: linear-gradient(90deg, #1d4ed8, #60a5fa);
          transition: width .1s linear;
        }
        .prog-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #93c5fd;
          box-shadow: 0 0 10px rgba(147,197,253,.9);
          transition: transform .2s;
          pointer-events: none;
        }
        .prog-wrap:hover .prog-thumb { transform: translate(-50%,-50%) scale(1); }

        /* ── ctrl row ── */
        .ctrl-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .ctrl-left  { display: flex; align-items: center; gap: 4px; }
        .ctrl-right { display: flex; align-items: center; gap: 4px; }

        .cbtn {
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,.4);
          font-size: 17px;
          width: 34px; height: 34px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: color .2s, background .2s;
          padding: 0;
        }
        .cbtn:hover { color: #93c5fd; background: rgba(96,165,250,.1); }

        .time-badge {
          font-size: 11px;
          font-variant-numeric: tabular-nums;
          letter-spacing: .04em;
          color: rgba(255,255,255,.3);
          padding: 0 6px;
        }

        /* ── vol slider ── */
        .vol-row {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow: hidden;
          max-width: 34px;
          transition: max-width .3s cubic-bezier(.16,1,.3,1);
        }
        .vol-row:hover, .vol-row:focus-within { max-width: 120px; }
        input.vol-input {
          -webkit-appearance: none;
          appearance: none;
          width: 72px;
          height: 3px;
          border-radius: 99px;
          background: rgba(255,255,255,.15);
          outline: none;
          cursor: pointer;
          flex-shrink: 0;
        }
        input.vol-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 11px; height: 11px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 6px rgba(96,165,250,.8);
          cursor: pointer;
        }

        /* ── stat pills ── */
        .pills-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 2.5rem;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 99px;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(96,165,250,.12);
          font-size: 12.5px;
          color: rgba(232,232,240,.6);
          transition: border-color .3s, box-shadow .3s, color .3s;
          cursor: default;
        }
        .pill:hover {
          border-color: rgba(96,165,250,.35);
          box-shadow: 0 0 16px rgba(59,130,246,.14);
          color: rgba(232,232,240,.85);
        }
        .pill i {
          color: #60a5fa;
          font-size: 14px;
          filter: drop-shadow(0 0 4px rgba(96,165,250,.7));
        }

        /* ── quote block ── */
        .quote-block {
          max-width: 680px;
          margin: 3.5rem auto 0;
          padding: 0 1.5rem;
          text-align: center;
          position: relative;
          z-index: 10;
        }
        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          line-height: .5;
          color: rgba(96,165,250,.18);
          margin-bottom: .5rem;
          display: block;
        }
        .quote-text {
          font-family: 'Playfair Display', serif;
          font-weight: 300;
          font-size: clamp(1.05rem, 2.5vw, 1.28rem);
          line-height: 1.9;
          color: rgba(232,232,240,.55);
          letter-spacing: .01em;
        }
        .quote-rule {
          height: 1px;
          max-width: 200px;
          margin: 2.5rem auto;
          background: linear-gradient(90deg,transparent,rgba(96,165,250,.25),transparent);
        }

        /* ── services grid ── */
        .services-section {
          max-width: 860px;
          margin: 0 auto 5rem;
          padding: 0 1rem;
          position: relative;
          z-index: 10;
        }
        .section-label {
          text-align: center;
          font-size: 10px;
          letter-spacing: .4em;
          text-transform: uppercase;
          color: rgba(96,165,250,.45);
          margin-bottom: 2rem;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 14px;
        }
        .svc-card {
          padding: 20px 22px;
          border-radius: 14px;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(96,165,250,.1);
          transition: border-color .3s, box-shadow .3s, transform .3s;
        }
        .svc-card:hover {
          border-color: rgba(96,165,250,.32);
          box-shadow: 0 0 24px rgba(59,130,246,.12);
          transform: translateY(-2px);
        }
        .svc-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(59,130,246,.1);
          border: 1px solid rgba(59,130,246,.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          margin-bottom: 12px;
          box-shadow: 0 0 10px rgba(59,130,246,.15);
        }
        .svc-icon i { color: #60a5fa; filter: drop-shadow(0 0 4px rgba(96,165,250,.7)); }
        .svc-title {
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(232,232,240,.85);
          margin-bottom: 5px;
        }
        .svc-desc {
          font-size: 12px;
          color: rgba(232,232,240,.35);
          line-height: 1.6;
        }

        /* ── footer ── */
        .site-footer {
          text-align: center;
          padding: 2rem 1rem 2.5rem;
          border-top: 1px solid rgba(255,255,255,.04);
          position: relative;
          z-index: 10;
        }
        .footer-copy {
          font-size: 11px;
          color: rgba(232,232,240,.18);
          letter-spacing: .07em;
        }
        .footer-brand {
          font-size: 11px;
          color: rgba(232,232,240,.15);
          margin-top: 6px;
          letter-spacing: .05em;
        }
        .footer-brand span { color: #60a5fa; font-weight: 500; }

        /* ── dot divider ── */
        .dot { display: inline-block; width: 3px; height: 3px; border-radius: 50%; background: rgba(96,165,250,.35); vertical-align: middle; margin: 0 10px; }
      `}</style>

      <div className="about-root">
        {/* Particle canvas */}
        <canvas ref={canvasRef} className="particle-canvas" />
        <div className="vignette" />

        {/* ═══ HEADER ═══ */}
        <header className="site-header">
          <p className={`eyebrow rise ${loaded ? "in" : ""}`}>Established · Mumbai, India</p>
          <h1 className={`firm-name rise d1 ${loaded ? "in" : ""}`}>
            S K Dwivedi <em>&amp;</em> Associates
          </h1>
          <p className={`tagline rise d2 ${loaded ? "in" : ""}`}>
            Company Secretary · Corporate Governance · Legal Compliance
          </p>
          <div className={`hair-line rise d2 ${loaded ? "in" : ""}`} />
        </header>

        {/* ═══ VIDEO ═══ */}
        <div className={`video-wrapper rise d3 ${loaded ? "in" : ""}`}>
          <div className="cinematic-frame"
            onMouseMove={resetHide}
            onMouseEnter={resetHide}
          >
            <div className="cinematic-inner">
              <div className="letterbox-top" />
              <div className="letterbox-bot" />

              <video
                ref={videoRef}
                src="/videos/introduction.mp4"
                muted
                loop
                autoPlay
                playsInline
                onLoadedMetadata={() => {
                  const d = videoRef.current?.duration || 0;
                  if (d > 0) setDuration(d);
                  setPlaying(true);
                }}
                onTimeUpdate={() => {
                  setCurrentTime(videoRef.current?.currentTime || 0);
                  const buf = videoRef.current?.buffered;
                  if (buf?.length) setBuffered(buf.end(buf.length - 1));
                }}
                className="w-full aspect-video object-contain bg-black block"
                style={{ display: "block" }}
              />

              <div className="vid-overlay" onClick={togglePlay}>
                <div className="big-play">
                  <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className={`ctrl-panel rise d3 ${loaded ? "in" : ""} ${!showCtrl ? "hidden" : ""}`}>

            {/* Progress bar */}
            <div
              className="prog-wrap"
              onClick={handleSeek}
              onMouseDown={() => setDragging(true)}
              onMouseUp={() => setDragging(false)}
            >
              <div className="prog-buf" style={{ width: `${bufferedP}%` }} />
              <div className="prog-fill" style={{ width: `${progress}%` }} />
              <div className="prog-thumb" style={{ left: `${progress}%` }} />
            </div>

            {/* Control row */}
            <div className="ctrl-row">
              <div className="ctrl-left">
                {/* Play/Pause */}
                <button className="cbtn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
                  <i className={`bi ${playing ? "bi-pause-fill" : "bi-play-fill"}`} />
                </button>

                {/* Volume */}
                <div className="vol-row">
                  <button className="cbtn" onClick={toggleMute} aria-label="Toggle mute" style={{ flexShrink: 0 }}>
                    <i className={`bi ${volIcon}`} />
                  </button>
                  <input
                    type="range"
                    className="vol-input"
                    min="0" max="1" step="0.02"
                    value={muted ? 0 : volume}
                    onChange={e => handleVolume(Number(e.target.value))}
                    aria-label="Volume"
                  />
                </div>

                {/* Time */}
                <span className="time-badge">
                  {fmt(currentTime)}<span style={{ margin: "0 4px", opacity: .4 }}>/</span>{fmt(duration)}
                </span>
              </div>

              <div className="ctrl-right">
                {/* Fullscreen */}
                <button className="cbtn" onClick={handleFullscreen} aria-label="Fullscreen">
                  <i className="bi bi-fullscreen" />
                </button>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div className={`pills-row rise d4 ${loaded ? "in" : ""}`}>
            {[
              { icon: "bi-briefcase-fill",     label: "Company Secretary" },
              { icon: "bi-shield-check-fill",  label: "Legal Compliance" },
              { icon: "bi-bank2",              label: "Corporate Governance" },
              { icon: "bi-award-fill",         label: "ICSI Member" },
              { icon: "bi-geo-alt-fill",       label: "Mumbai, India" },
            ].map(p => (
              <div key={p.label} className="pill">
                <i className={`bi ${p.icon}`} />
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ QUOTE ═══ */}
        <div className={`quote-block rise d4 ${loaded ? "in" : ""}`}>
          {/* ✅ FIX: &ldquo; &rdquo; use kiya hai directly " ki jagah */}
          <span className="quote-mark">&ldquo;</span>
          <p className="quote-text">
            A practicing Company Secretary based in Mumbai, specializing in providing a
            comprehensive range of professional services to ensure legal compliance,
            corporate governance, and efficient management of corporate affairs.
          </p>
          <div className="quote-rule" />
        </div>

        {/* ═══ SERVICES ═══ */}
        <div className={`services-section rise d5 ${loaded ? "in" : ""}`}>
          <p className="section-label">Our Expertise</p>
          <div className="services-grid">
            {[
              { icon: "bi-building",            title: "Company Registration",    desc: "Incorporation, name reservation, MOA & AOA drafting." },
              { icon: "bi-file-earmark-text",   title: "ROC Filings",             desc: "Annual returns, event-based filings & compliance calendar." },
              { icon: "bi-people-fill",         title: "Board Secretarial",       desc: "Board meetings, AGMs, minutes & resolutions." },
              { icon: "bi-globe2",              title: "FEMA & RBI Compliance",   desc: "FDI, ODI, ECB reporting and FEMA advisory." },
              { icon: "bi-search",              title: "Due Diligence",           desc: "Legal & secretarial audit for M&A transactions." },
              { icon: "bi-arrow-repeat",        title: "Restructuring",           desc: "Mergers, demergers, capital reorganisation." },
            ].map(s => (
              <div key={s.title} className="svc-card">
                <div className="svc-icon"><i className={`bi ${s.icon}`} /></div>
                <p className="svc-title">{s.title}</p>
                <p className="svc-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <footer className="site-footer">
          <p className="footer-copy">
            © {new Date().getFullYear()} S K Dwivedi &amp; Associates
            <span className="dot" />
            All rights reserved
          </p>
          <p className="footer-brand">
            Powered by <span>WiaGa</span>
          </p>
        </footer>
      </div>
    </>
  );
}
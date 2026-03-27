"use client";

import { useState, useRef, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const SUGGESTED_QUESTIONS = [
  "How to file ROC annual returns for a company?",
  "What documents are required for ROC compliance?",
  "How to handle non-compliance with MCA filings?",
  "What is the process for annual filing under the Companies Act?",
  "What should be checked before signing a corporate agreement?",
  "How to incorporate a company in India?",
];

const FIRM_SERVICES = [
  { icon: "bi-building", title: "Corporate Law", desc: "Company formation, M&A, compliance" },
  { icon: "bi-bank", title: "Civil Litigation", desc: "Court representation & disputes" },
  { icon: "bi-file-earmark-text", title: "Contract Drafting", desc: "Agreements, MOUs, NDAs" },
  { icon: "bi-house-door", title: "Real Estate Law", desc: "Property deals & disputes" },
  { icon: "bi-lightbulb", title: "IP Rights", desc: "Patents, trademarks, copyrights" },
  { icon: "bi-people", title: "Family Law", desc: "Divorce, custody, inheritance" },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 100) + "px";
    }
  }, [input]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMsg = { role: "user", content: messageText, id: Date.now().toString() };
    const asstId = (Date.now() + 1).toString();
    const asstMsg = { role: "assistant", content: "", id: asstId };

    setMessages((prev) => [...prev, userMsg, asstMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error("API error");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) =>
          prev.map((m) => (m.id === asstId ? { ...m, content: m.content + chunk } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === asstId
            ? { ...m, content: "Sorry, a technical issue occurred. Please try again." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowServices(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');

        :root {
          --c-bg:       #050810;
          --c-surface:  #0a0f1e;
          --c-surface2: #0f1628;
          --c-surface3: #141c35;
          --c-border:   rgba(99,140,255,0.12);
          --c-border2:  rgba(99,140,255,0.22);
          --c-blue:     #3b6fff;
          --c-blue2:    #638cff;
          --c-glow:     rgba(59,111,255,0.18);
          --c-glow2:    rgba(59,111,255,0.08);
          --c-gold:     #e0b44a;
          --c-gold2:    #f5d07a;
          --c-text:     #e8eeff;
          --c-text2:    #8a9cc8;
          --c-text3:    #3a4a6a;
          --c-green:    #34d399;
        }

        /* ── FAB ── */
        .lexa-fab {
          position: fixed;
          bottom: 28px; right: 28px;
          z-index: 9999;
          width: 62px; height: 62px;
          border-radius: 50%; border: none;
          cursor: pointer;
          background: linear-gradient(145deg, #3b6fff, #1a3fa8);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 0 rgba(59,111,255,0.5), 0 8px 32px rgba(59,111,255,0.4);
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
          animation: lexaPulse 3s ease-in-out infinite;
        }
        .lexa-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 0 40px rgba(59,111,255,0.6), 0 8px 40px rgba(59,111,255,0.5);
          animation: none;
        }
        .lexa-fab .lexa-fab-icon {
          font-size: 26px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes lexaPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(59,111,255,0.4), 0 8px 32px rgba(59,111,255,0.35); }
          50%     { box-shadow: 0 0 0 14px rgba(59,111,255,0), 0 8px 32px rgba(59,111,255,0.35); }
        }

        /* ── WINDOW ── */
        .lexa-window {
          position: fixed;
          bottom: 104px; right: 28px;
          z-index: 9998;
          width: 400px;
          max-width: calc(100vw - 24px);
          height: 620px;
          max-height: calc(100dvh - 120px);
          border-radius: 24px;
          overflow: hidden;
          display: flex; flex-direction: column;
          background: var(--c-bg);
          border: 1px solid var(--c-border2);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.7),
            0 0 0 1px rgba(59,111,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.04);
          font-family: 'DM Sans', sans-serif;
          animation: lexaSlideUp 0.32s cubic-bezier(0.34,1.4,0.64,1);
        }
        @keyframes lexaSlideUp {
          from { opacity:0; transform: translateY(36px) scale(0.94); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }

        /* ── HEADER ── */
        .lexa-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px;
          background: linear-gradient(180deg, rgba(10,15,30,0.98) 0%, rgba(5,8,16,0.98) 100%);
          border-bottom: 1px solid var(--c-border);
          flex-shrink: 0;
          position: relative;
        }
        .lexa-header::after {
          content: '';
          position: absolute;
          bottom: 0; left: 16px; right: 16px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,111,255,0.4), transparent);
        }
        .lexa-logo { display: flex; align-items: center; gap: 10px; }

        /* THE FIX: icon box with explicit font-size on the i tag */
        .lexa-logo-box {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(145deg, var(--c-surface3), #1a2545);
          border: 1px solid var(--c-border2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 20px rgba(59,111,255,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .lexa-logo-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(59,111,255,0.25), transparent 70%);
        }
        .lexa-logo-box .bi {
          font-size: 18px;
          color: var(--c-blue2);
          position: relative;
          z-index: 1;
          display: flex;
        }

        .lexa-logo-text { line-height: 1.2; }
        .lexa-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-weight: 700;
          color: var(--c-text);
          letter-spacing: 0.5px;
        }
        .lexa-firm {
          font-size: 9.5px; color: var(--c-text2);
          letter-spacing: 0.4px; margin-top: 1px;
        }
        .lexa-badge {
          display: flex; align-items: center; gap: 5px;
          background: rgba(59,111,255,0.1);
          border: 1px solid rgba(59,111,255,0.25);
          border-radius: 20px; padding: 4px 10px;
          font-size: 10px; color: var(--c-blue2);
          font-weight: 500; white-space: nowrap;
        }
        .lexa-badge .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-green);
          box-shadow: 0 0 6px var(--c-green);
          animation: blinkDot 2s ease-in-out infinite;
        }
        @keyframes blinkDot {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        .lexa-actions { display: flex; align-items: center; gap: 5px; }
        .lexa-btn {
          width: 30px; height: 30px; border-radius: 8px;
          border: 1px solid var(--c-border);
          background: rgba(255,255,255,0.02);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.18s;
        }
        .lexa-btn .bi {
          font-size: 13px;
          color: var(--c-text2);
          display: flex;
        }
        .lexa-btn:hover {
          border-color: var(--c-border2);
          background: var(--c-glow2);
        }
        .lexa-btn:hover .bi { color: var(--c-blue2); }

        /* ── SERVICES ── */
        .lexa-services {
          background: rgba(8,12,24,0.99);
          border-bottom: 1px solid var(--c-border);
          padding: 14px 16px;
          animation: fadeDown 0.2s ease;
          flex-shrink: 0;
        }
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .lexa-svc-title {
          font-size: 9px; font-weight: 600; letter-spacing: 1.5px;
          color: var(--c-text3); text-transform: uppercase; margin-bottom: 10px;
        }
        .lexa-svc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; }
        .lexa-svc-card {
          display: flex; align-items: center; gap: 8px;
          background: var(--c-surface2);
          border: 1px solid var(--c-border);
          border-radius: 10px; padding: 9px 10px;
          transition: all 0.18s; cursor: default;
        }
        .lexa-svc-card:hover { border-color: var(--c-border2); background: var(--c-glow2); transform: translateY(-1px); }
        .lexa-svc-card .bi { font-size: 14px; color: var(--c-blue2); flex-shrink: 0; display: flex; }
        .lexa-svc-name { font-size: 11px; font-weight: 500; color: var(--c-text); }
        .lexa-svc-desc { font-size: 9px; color: var(--c-text2); margin-top: 1px; }
        .lexa-contact {
          display: flex; gap: 12px; flex-wrap: wrap;
          padding-top: 10px; border-top: 1px solid var(--c-border);
        }
        .lexa-clink {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: var(--c-text2);
          text-decoration: none; transition: color 0.18s;
        }
        .lexa-clink .bi { font-size: 11px; display: flex; }
        .lexa-clink:hover { color: var(--c-blue2); }
        .lexa-clink.gold { color: var(--c-gold); }
        .lexa-clink.gold:hover { color: var(--c-gold2); }

        /* ── BODY ── */
        .lexa-body {
          flex: 1; overflow-y: auto; padding: 18px 16px;
          display: flex; flex-direction: column; gap: 16px;
          min-height: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(59,111,255,0.04) 0%, transparent 60%);
        }
        .lexa-body::-webkit-scrollbar { width: 3px; }
        .lexa-body::-webkit-scrollbar-thumb { background: var(--c-border2); border-radius: 2px; }

        /* ── WELCOME ── */
        .lexa-welcome {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; height: 100%; gap: 14px; text-align: center;
          padding-bottom: 10px;
        }

        /* WELCOME ICON - explicit sizing */
        .lexa-welcome-box {
          width: 68px; height: 68px;
          border-radius: 20px;
          background: linear-gradient(145deg, var(--c-surface3), #1a2545);
          border: 1px solid var(--c-border2);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(59,111,255,0.2), 0 8px 32px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }
        .lexa-welcome-box::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(59,111,255,0.3), transparent 65%);
        }
        .lexa-welcome-box::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,140,255,0.6), transparent);
        }
        .lexa-welcome-box .bi {
          font-size: 30px;
          color: var(--c-blue2);
          position: relative;
          z-index: 1;
          display: flex;
          filter: drop-shadow(0 0 8px rgba(99,140,255,0.6));
        }

        .lexa-welcome-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600;
          color: var(--c-text);
          letter-spacing: 0.3px;
        }
        .lexa-welcome-sub {
          font-size: 12.5px; color: var(--c-text2);
          line-height: 1.65; max-width: 270px;
        }
        .lexa-welcome-sub strong { color: var(--c-blue2); font-weight: 500; }
        .lexa-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--c-blue), transparent);
          border-radius: 2px;
        }
        .lexa-sugg-list { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .lexa-sugg-btn {
          display: flex; align-items: flex-start; gap: 9px;
          background: var(--c-surface);
          border: 1px solid var(--c-border);
          border-radius: 10px; padding: 10px 12px;
          color: var(--c-text2); font-size: 12px; cursor: pointer;
          text-align: left; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif; line-height: 1.45;
        }
        .lexa-sugg-btn:hover {
          border-color: var(--c-border2);
          background: var(--c-glow2);
          color: var(--c-text);
          transform: translateX(4px);
        }
        .lexa-sugg-btn .bi {
          font-size: 13px; color: var(--c-blue);
          flex-shrink: 0; margin-top: 1px;
          display: flex;
        }

        /* ── MESSAGES ── */
        .lexa-row { display: flex; gap: 9px; align-items: flex-end; }
        .lexa-row.user { flex-direction: row-reverse; }

        /* AVATAR - explicit sizing */
        .lexa-av {
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .lexa-av-ai {
          background: linear-gradient(145deg, var(--c-surface3), #1a2545);
          border: 1px solid var(--c-border2);
          box-shadow: 0 0 12px rgba(59,111,255,0.2);
        }
        .lexa-av-ai .bi {
          font-size: 15px;
          color: var(--c-blue2);
          display: flex;
          filter: drop-shadow(0 0 4px rgba(99,140,255,0.5));
        }
        .lexa-av-user {
          background: linear-gradient(135deg, var(--c-blue), #1a3fa8);
          color: #fff; font-size: 9px; font-weight: 700;
          letter-spacing: 0.3px;
        }

        .lexa-bubble {
          max-width: 78%; border-radius: 16px;
          padding: 11px 14px; font-size: 13px;
          line-height: 1.65; animation: bubblePop 0.22s cubic-bezier(.34,1.4,.64,1);
        }
        @keyframes bubblePop {
          from { opacity:0; transform:scale(0.95) translateY(6px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        .lexa-bubble.assistant {
          background: var(--c-surface2);
          border: 1px solid var(--c-border2);
          color: var(--c-text);
          border-bottom-left-radius: 4px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }
        .lexa-bubble.user {
          background: linear-gradient(135deg, #3b6fff, #1a3fa8);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 20px rgba(59,111,255,0.3);
        }
        .lexa-btext { white-space: pre-wrap; }

        /* DOTS */
        .lexa-dots { display:flex; gap:5px; align-items:center; padding: 2px 0; }
        .lexa-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-blue2); opacity: 0.4;
          animation: lexaDot 1.4s ease-in-out infinite;
        }
        .lexa-dots span:nth-child(2) { animation-delay: .2s; }
        .lexa-dots span:nth-child(3) { animation-delay: .4s; }
        @keyframes lexaDot {
          0%,100% { opacity:.4; transform:scale(1) translateY(0); }
          50%     { opacity:1; transform:scale(1.3) translateY(-2px); }
        }

        /* ── FOOTER ── */
        .lexa-footer {
          padding: 12px 14px 14px;
          background: linear-gradient(0deg, rgba(5,8,16,0.99) 0%, rgba(10,15,30,0.98) 100%);
          border-top: 1px solid var(--c-border);
          flex-shrink: 0;
          position: relative;
        }
        .lexa-footer::before {
          content: '';
          position: absolute;
          top: 0; left: 16px; right: 16px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,111,255,0.3), transparent);
        }
        .lexa-input-row {
          display: flex; gap: 8px; align-items: flex-end;
          background: var(--c-surface2);
          border: 1px solid var(--c-border);
          border-radius: 14px; padding: 8px 8px 8px 14px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lexa-input-row:focus-within {
          border-color: var(--c-border2);
          box-shadow: 0 0 0 3px rgba(59,111,255,0.08), 0 0 20px rgba(59,111,255,0.06);
        }
        .lexa-ta {
          flex: 1; background: transparent; border: none; outline: none;
          color: var(--c-text); font-size: 13px; resize: none;
          font-family: 'DM Sans', sans-serif; line-height: 1.5;
          min-height: 32px; max-height: 100px; overflow-y: auto; padding: 4px 0;
        }
        .lexa-ta::placeholder { color: var(--c-text3); }
        .lexa-send {
          width: 36px; height: 36px; border-radius: 10px; border: none;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }
        .lexa-send .bi {
          font-size: 15px;
          display: flex;
        }
        .lexa-send.on {
          background: linear-gradient(135deg, var(--c-blue), #1a3fa8);
          box-shadow: 0 0 16px rgba(59,111,255,0.4);
        }
        .lexa-send.on .bi { color: #fff; }
        .lexa-send.on:hover { transform: scale(1.1); box-shadow: 0 0 24px rgba(59,111,255,0.5); }
        .lexa-send.off { background: rgba(255,255,255,0.03); cursor: not-allowed; }
        .lexa-send.off .bi { color: var(--c-text3); }
        .lexa-disc {
          text-align: center; font-size: 9px;
          color: var(--c-text3); margin-top: 8px; letter-spacing: 0.3px;
        }

        /* MOBILE */
        @media (max-width: 480px) {
          .lexa-window { bottom: 92px; right: 12px; width: calc(100vw - 24px); height: calc(100dvh - 112px); border-radius: 20px; }
          .lexa-fab { bottom: 20px; right: 16px; width: 56px; height: 56px; }
          .lexa-fab .lexa-fab-icon { font-size: 22px; }
          .lexa-badge { display: none; }
        }
      `}</style>

      {/* FAB */}
      <button className="lexa-fab" onClick={() => setIsOpen(!isOpen)} title="Chat with LEXA">
        <span className="lexa-fab-icon">
          <i className={`bi ${isOpen ? "bi-x-lg" : "bi-chat-dots-fill"}`} style={{ fontSize: "24px", color: "#fff", display: "flex" }} />
        </span>
      </button>

      {isOpen && (
        <div className="lexa-window">

          {/* HEADER */}
          <div className="lexa-header">
            <div className="lexa-logo">
              <div className="lexa-logo-box">
                <i className="bi bi-cpu-fill" style={{ fontSize: "18px", color: "#638cff", display: "flex", position: "relative", zIndex: 1 }} />
              </div>
              <div className="lexa-logo-text">
                <div className="lexa-name">LEXA</div>
                <div className="lexa-firm">S K Dwivedi &amp; Associates</div>
              </div>
            </div>

            <div className="lexa-badge">
              <span className="dot" />
              AI Legal Assistant
            </div>

            <div className="lexa-actions">
              <button className="lexa-btn" title="Services" onClick={() => setShowServices(!showServices)}>
                <i className="bi bi-grid-3x3-gap" style={{ fontSize: "13px", color: "#8a9cc8", display: "flex" }} />
              </button>
              <button className="lexa-btn" title="Clear chat" onClick={clearChat}>
                <i className="bi bi-arrow-counterclockwise" style={{ fontSize: "13px", color: "#8a9cc8", display: "flex" }} />
              </button>
              <button className="lexa-btn" title="Close" onClick={() => setIsOpen(false)}>
                <i className="bi bi-x-lg" style={{ fontSize: "13px", color: "#8a9cc8", display: "flex" }} />
              </button>
            </div>
          </div>

          {/* SERVICES */}
          {showServices && (
            <div className="lexa-services">
              <div className="lexa-svc-title">Our Practice Areas</div>
              <div className="lexa-svc-grid">
                {FIRM_SERVICES.map((s, i) => (
                  <div key={i} className="lexa-svc-card">
                    <i className={`bi ${s.icon}`} style={{ fontSize: "14px", color: "#638cff", display: "flex" }} />
                    <div>
                      <div className="lexa-svc-name">{s.title}</div>
                      <div className="lexa-svc-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lexa-contact">
                <a href="tel:+919699981283" className="lexa-clink">
                  <i className="bi bi-telephone-fill" style={{ fontSize: "11px", display: "flex" }} />
                  +91 9699981283
                </a>
                <a href="mailto:office@skdassociates.com" className="lexa-clink">
                  <i className="bi bi-envelope-fill" style={{ fontSize: "11px", display: "flex" }} />
                  office@skdassociates.com
                </a>
                <span className="lexa-clink gold">
                  <i className="bi bi-shield-check" style={{ fontSize: "11px", display: "flex" }} />
                  Free Consultation
                </span>
              </div>
            </div>
          )}

          {/* BODY */}
          <div className="lexa-body">
            {messages.length === 0 ? (
              <div className="lexa-welcome">
                <div className="lexa-welcome-box">
                  <i className="bi bi-cpu-fill" style={{ fontSize: "30px", color: "#638cff", display: "flex", position: "relative", zIndex: 1, filter: "drop-shadow(0 0 8px rgba(99,140,255,0.6))" }} />
                </div>
                <div className="lexa-welcome-title">Hello, I&apos;m LEXA</div>
                <div className="lexa-divider" />
                <p className="lexa-welcome-sub">
                  AI Legal Assistant of{" "}
                  <strong>S K Dwivedi &amp; Associates</strong>.
                  Ask me any legal question.
                </p>
                <div className="lexa-sugg-list">
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                    <button key={i} className="lexa-sugg-btn" onClick={() => sendMessage(q)}>
                      <i className="bi bi-arrow-right-circle-fill" style={{ fontSize: "13px", color: "#3b6fff", display: "flex", marginTop: "1px" }} />
                      <span>{q}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`lexa-row ${msg.role}`}>
                    {msg.role === "assistant" && (
                      <div className="lexa-av lexa-av-ai">
                        <i className="bi bi-cpu-fill" style={{ fontSize: "15px", color: "#638cff", display: "flex", filter: "drop-shadow(0 0 4px rgba(99,140,255,0.5))" }} />
                      </div>
                    )}
                    <div className={`lexa-bubble ${msg.role}`}>
                      {msg.role === "assistant" && msg.content === "" && isLoading ? (
                        <div className="lexa-dots"><span /><span /><span /></div>
                      ) : (
                        <div className="lexa-btext">{msg.content}</div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="lexa-av lexa-av-user">You</div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="lexa-footer">
            <div className="lexa-input-row">
              <textarea
                ref={textareaRef}
                className="lexa-ta"
                placeholder="Ask a legal question…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                className={`lexa-send ${!input.trim() || isLoading ? "off" : "on"}`}
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
              >
                <i className="bi bi-send-fill" style={{ fontSize: "15px", display: "flex" }} />
              </button>
            </div>
            <p className="lexa-disc">
              General legal info only &nbsp;·&nbsp; Consult a qualified lawyer for your case
            </p>
          </div>

        </div>
      )}
    </>
  );
}
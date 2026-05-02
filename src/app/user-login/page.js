"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function UserLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after {
          box-sizing: border-box; margin: 0; padding: 0;
          -webkit-tap-highlight-color: transparent;
        }

        :root {
          --blue:        #2563eb;
          --blue-bright: #3b82f6;
          --blue-glow:   #60a5fa;
          --black:       #000000;
          --black-card:  #060810;
          --white:       #ffffff;
        }

        html, body { height: 100%; background: var(--black); }

        .root {
          min-height: 100vh;
          min-height: 100dvh;
          background: var(--black);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 72px 16px 24px;
        }

        .bg-deep {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 65% 55% at 50% -10%, rgba(37,99,235,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 100% 100%, rgba(37,99,235,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 0% 90%, rgba(15,40,120,0.15) 0%, transparent 55%);
        }
        .bg-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
        }
        .bg-dot {
          position: fixed; z-index: 0; pointer-events: none;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%);
          filter: blur(40px);
          animation: pdot 6s ease-in-out infinite alternate;
        }
        .dot-tl { top: -80px; left: -80px; }
        .dot-br { bottom: -80px; right: -80px; animation-delay: 3s; }
        @keyframes pdot {
          0%   { opacity: 0.6; transform: scale(1);    }
          100% { opacity: 1;   transform: scale(1.15); }
        }

        /* ── Top header ── */
        .firm-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: clamp(10px, 2vw, 16px) clamp(16px, 4vw, 36px);
          background: rgba(0,0,0,0.8);
          border-bottom: 1px solid rgba(37,99,235,0.14);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .firm-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(13px, 2.2vw, 16px);
          font-weight: 600; color: var(--white); letter-spacing: 0.2px;
        }
        .firm-name span { color: var(--blue-glow); }

        .home-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px 7px 10px;
          background: rgba(37,99,235,0.07);
          border: 1px solid rgba(37,99,235,0.28);
          border-radius: 50px;
          color: var(--blue-bright);
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 1px; text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s ease; cursor: pointer; white-space: nowrap;
        }
        .home-btn i { font-size: 13px; }
        .home-btn:hover {
          background: rgba(37,99,235,0.14);
          border-color: rgba(59,130,246,0.5);
          color: var(--blue-glow);
          box-shadow: 0 0 16px rgba(37,99,235,0.18);
          transform: translateY(-1px);
        }
        .home-label { display: inline; }
        @media (max-width: 360px) { .home-label { display: none; } .home-btn { padding: 7px 9px; } }

        /* ── Card ── */
        .card-wrap {
          position: relative; z-index: 10;
          width: 100%;
          max-width: min(520px, 100%);
          opacity: ${mounted ? 1 : 0};
          transform: ${mounted ? "translateY(0)" : "translateY(24px)"};
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }

        .card-ring {
          padding: 1px; border-radius: 20px;
          background: linear-gradient(145deg,
            rgba(59,130,246,0.55) 0%,
            rgba(15,30,80,0.15)   45%,
            rgba(59,130,246,0.38) 100%
          );
          box-shadow:
            0 24px 60px rgba(0,0,0,0.85),
            0 0 50px rgba(37,99,235,0.09);
        }

        .card {
          background: linear-gradient(150deg, #090c18 0%, #060810 60%, #040610 100%);
          border-radius: 19px;
          overflow: hidden;
        }

        .card-stripe {
          height: 3px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(37,99,235,0.3) 10%,
            var(--blue-bright) 35%, var(--blue-glow) 50%,
            var(--blue-bright) 65%, rgba(37,99,235,0.3) 90%, transparent 100%
          );
        }

        /* ── Horizontal layout: icon+title LEFT, form RIGHT ── */
        .card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 0;
        }

        /* Left panel */
        .card-left {
          padding: clamp(24px, 4vw, 36px) clamp(20px, 3vw, 28px);
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          border-right: 1px solid rgba(37,99,235,0.1);
          position: relative;
          background: linear-gradient(160deg, rgba(37,99,235,0.05) 0%, transparent 70%);
        }
        .card-left::after {
          content: '';
          position: absolute; top: 20%; bottom: 20%; right: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(59,130,246,0.25), transparent);
        }

        .icon-circle {
          display: inline-flex; align-items: center; justify-content: center;
          width: clamp(44px, 7vw, 54px); height: clamp(44px, 7vw, 54px);
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(59,130,246,0.18), rgba(37,99,235,0.05));
          border: 1px solid rgba(59,130,246,0.28);
          margin-bottom: clamp(14px, 2.5vw, 18px);
          box-shadow: 0 0 20px rgba(37,99,235,0.14);
        }
        .icon-circle i {
          font-size: clamp(20px, 3.5vw, 24px);
          color: var(--blue-glow);
          filter: drop-shadow(0 0 6px rgba(96,165,250,0.55));
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(20px, 3.5vw, 26px);
          font-weight: 700; color: var(--white);
          line-height: 1.2; margin-bottom: 8px;
        }
        .card-title span { color: var(--blue-glow); }

        .card-sub {
          font-size: clamp(9px, 1.5vw, 10px);
          color: rgba(96,165,250,0.4);
          letter-spacing: 1.8px; text-transform: uppercase;
          font-weight: 400; line-height: 1.5;
        }

        /* Right panel - form */
        .card-right {
          padding: clamp(20px, 4vw, 32px) clamp(20px, 3.5vw, 28px);
          display: flex; flex-direction: column;
          gap: clamp(12px, 2vw, 14px);
        }

        .error-box {
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px; padding: 8px 12px;
          color: #fca5a5; font-size: 11px;
          text-align: center; letter-spacing: 0.2px;
        }

        .field { display: flex; flex-direction: column; gap: 5px; }
        .field-lbl {
          font-size: 9px; font-weight: 600;
          color: rgba(96,165,250,0.52);
          letter-spacing: 1.8px; text-transform: uppercase;
        }
        .inp-wrap { position: relative; }
        .inp {
          width: 100%;
          padding: 10px 38px 10px 13px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(37,99,235,0.17);
          border-radius: 8px;
          color: rgba(255,255,255,0.88);
          font-size: 13px; font-weight: 300;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all 0.22s ease;
          -webkit-appearance: none; appearance: none;
        }
        .inp::placeholder { color: rgba(255,255,255,0.16); }
        .inp:focus {
          border-color: rgba(59,130,246,0.5);
          background: rgba(37,99,235,0.055);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.09);
        }
        .inp:-webkit-autofill,
        .inp:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #060810 inset;
          -webkit-text-fill-color: rgba(255,255,255,0.88);
          caret-color: white;
          border-color: rgba(37,99,235,0.3);
        }
        .inp-icon {
          position: absolute; right: 11px; top: 50%; transform: translateY(-50%);
          color: rgba(59,130,246,0.32); font-size: 14px;
          cursor: pointer; transition: color 0.2s;
          padding: 4px; margin-right: -4px; line-height: 1;
        }
        .inp-icon:hover { color: var(--blue-glow); }

        .forgot-row { display: flex; justify-content: flex-end; margin-top: -2px; }
        .forgot-a {
          font-size: 10px; color: rgba(96,165,250,0.38);
          text-decoration: none; letter-spacing: 0.2px;
          transition: color 0.2s; padding: 2px 0;
        }
        .forgot-a:hover { color: var(--blue-bright); }

        .submit-btn {
          width: 100%; padding: 11px;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 40%, #3b82f6 70%, #2563eb 100%);
          border: none; border-radius: 8px;
          color: var(--white);
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 18px rgba(37,99,235,0.42), inset 0 1px 0 rgba(255,255,255,0.1);
          touch-action: manipulation;
        }
        .submit-btn::after {
          content: ''; position: absolute;
          top: 0; left: -100%; width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transition: left 0.5s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 26px rgba(37,99,235,0.55);
        }
        .submit-btn:hover:not(:disabled)::after { left: 140%; }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .submit-btn i { font-size: 13px; }

        .spin {
          width: 12px; height: 12px; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.22);
          border-top-color: white; border-radius: 50%;
          animation: rot 0.65s linear infinite;
        }
        @keyframes rot { to { transform: rotate(360deg); } }

        .divider {
          display: flex; align-items: center; gap: 10px;
        }
        .div-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,0.18), transparent);
        }
        .div-txt {
          font-size: 9px; letter-spacing: 1.8px;
          color: rgba(96,165,250,0.28); font-weight: 500;
          text-transform: uppercase; white-space: nowrap;
        }

        .signup-btn {
          width: 100%; padding: 10px;
          background: transparent;
          border: 1px solid rgba(37,99,235,0.26);
          border-radius: 8px;
          color: var(--blue-bright);
          font-family: 'Inter', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          cursor: pointer; text-decoration: none;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.25s ease; touch-action: manipulation;
        }
        .signup-btn i { font-size: 13px; }
        .signup-btn:hover {
          background: rgba(37,99,235,0.08);
          border-color: rgba(59,130,246,0.48);
          color: var(--blue-glow);
          box-shadow: 0 0 18px rgba(37,99,235,0.1);
          transform: translateY(-1px);
        }

        /* Card footer */
        .card-foot {
          padding: 10px clamp(20px, 3.5vw, 28px) 14px;
          text-align: center;
          border-top: 1px solid rgba(37,99,235,0.07);
        }
        .foot-txt {
          font-size: 10px; color: rgba(96,165,250,0.2);
          letter-spacing: 1.5px; text-transform: uppercase;
        }
        .foot-txt span { color: rgba(96,165,250,0.35); }

        /* ── Mobile: stack vertically ── */
        @media (max-width: 540px) {
          .card-inner {
            grid-template-columns: 1fr;
          }
          .card-left {
            padding: 24px 24px 18px;
            border-right: none;
            border-bottom: 1px solid rgba(37,99,235,0.1);
            flex-direction: row; align-items: center; gap: 14px;
          }
          .card-left::after { display: none; }
          .icon-circle { margin-bottom: 0; flex-shrink: 0; }
          .card-title { font-size: 20px; }
          .card-right { padding: 20px 24px; }
        }
      `}</style>

      <div className="root">
        <div className="bg-deep" />
        <div className="bg-grid" />
        <div className="bg-dot dot-tl" />
        <div className="bg-dot dot-br" />

        <header className="firm-header">
          <div className="firm-name">S K Dwivedi <span>&amp;</span> Associates</div>
          <Link href="/" className="home-btn">
            <i className="bi bi-house-fill" />
            <span className="home-label">Home</span>
          </Link>
        </header>

        <div className="card-wrap">
          <div className="card-ring">
            <div className="card">
              <div className="card-stripe" />

              <div className="card-inner">
                {/* Left: branding */}
                <div className="card-left">
                  <div className="icon-circle">
                    <i className="bi bi-shield-lock-fill" />
                  </div>
                  <div>
                    <h1 className="card-title">Welcome <span>Back</span></h1>
                    <p className="card-sub">Secure Client Portal</p>
                  </div>
                </div>

                {/* Right: form */}
                <div className="card-right">
                  {error && <div className="error-box">{error}</div>}

                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div className="field">
                      <label className="field-lbl">Email</label>
                      <div className="inp-wrap">
                        <input className="inp" type="email" name="email"
                          placeholder="your@email.com"
                          onChange={handleChange} required autoComplete="email" />
                        <span className="inp-icon"><i className="bi bi-envelope-fill" /></span>
                      </div>
                    </div>

                    <div className="field">
                      <label className="field-lbl">Password</label>
                      <div className="inp-wrap">
                        <input className="inp"
                          type={showPass ? "text" : "password"} name="password"
                          placeholder="••••••••••"
                          onChange={handleChange} required autoComplete="current-password" />
                        <span className="inp-icon" onClick={() => setShowPass(!showPass)}>
                          <i className={`bi ${showPass ? "bi-eye-slash-fill" : "bi-eye-fill"}`} />
                        </span>
                      </div>
                      <div className="forgot-row">
                        <Link href="/forgot-password" className="forgot-a">Forgot password?</Link>
                      </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                      {loading
                        ? <><span className="spin" /> Authenticating...</>
                        : <><i className="bi bi-box-arrow-in-right" /> Sign In</>
                      }
                    </button>
                  </form>

                  <div className="divider">
                    <div className="div-line" /><span className="div-txt">New Here</span><div className="div-line" />
                  </div>

                  <Link href="/user-register" className="signup-btn">
                    <i className="bi bi-person-plus-fill" /> Create an Account
                  </Link>
                </div>
              </div>

              <div className="card-foot">
                <p className="foot-txt"><span>S K Dwivedi &amp; Associates</span> · Secured Portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
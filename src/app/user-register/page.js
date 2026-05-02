"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserRegister() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const namePattern = /^[a-zA-Z\s]{2,50}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!namePattern.test(form.name)) { setError("Name must contain only letters and spaces (2–50 chars)"); return false; }
    if (!emailPattern.test(form.email)) { setError("Invalid email address"); return false; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      alert(data.message);
      router.push("/user-login");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', sans-serif;
          background: #000;
          color: #fff;
          min-height: 100vh;
        }

        /* ── Navbar ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          z-index: 100;
        }

        .nav-brand {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.01em;
        }

        .nav-home {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 13px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.2s;
        }
        .nav-home:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.05);
        }

        /* ── Page ── */
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 20px 40px;
        }

        /* ── Card ── */
        .card {
          width: 100%;
          max-width: 420px;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 36px 32px;
        }

        /* ── Header ── */
        .card-title {
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 4px;
        }

        .card-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 28px;
        }

        /* ── Error ── */
        .error {
          font-size: 13px;
          color: #f87171;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 18px;
        }

        /* ── Fields ── */
        .fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }

        .field label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          margin-bottom: 6px;
          letter-spacing: 0.03em;
        }

        .input-wrap {
          position: relative;
        }

        .input-wrap input {
          width: 100%;
          padding: 11px 14px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-wrap input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .input-wrap input:focus {
          border-color: rgba(59,130,246,0.6);
          background: #141414;
        }

        .input-wrap.has-toggle input {
          padding-right: 42px;
        }

        .pw-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.3);
          display: flex;
          padding: 4px;
          transition: color 0.2s;
        }
        .pw-toggle:hover { color: rgba(255,255,255,0.7); }

        /* ── Button ── */
        .btn {
          width: 100%;
          padding: 12px;
          background: #2563eb;
          border: none;
          border-radius: 9px;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, opacity 0.2s;
        }
        .btn:hover { background: #1d4ed8; }
        .btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* ── Footer ── */
        .card-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .card-footer a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }
        .card-footer a:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .card { padding: 28px 20px; }
          .nav { padding: 0 18px; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="nav">
        <span className="nav-brand">S K Dwivedi & Associates</span>
        <Link href="/" className="nav-home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Home
        </Link>
      </nav>

      {/* Page */}
      <div className="page">
        <div className="card">
          <h1 className="card-title">Create an account</h1>
          <p className="card-sub">Enter your details to get started</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrap">
                  <input id="name" name="name" type="text" placeholder="John Doe" onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <div className="input-wrap">
                  <input id="email" name="email" type="email" placeholder="you@example.com" onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap has-toggle">
                  <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Min. 6 characters" onChange={handleChange} required autoComplete="new-password" />
                  <button type="button" className="pw-toggle" onClick={() => setShowPassword(v => !v)} tabIndex={-1}>
                    {showPassword ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="company">Company <span style={{color:"rgba(255,255,255,0.25)"}}>— optional</span></label>
                <div className="input-wrap">
                  <input id="company" name="company" type="text" placeholder="Your company name" onChange={handleChange} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div className="card-footer">
            Already have an account? <Link href="/user-login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
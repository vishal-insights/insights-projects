"use client";
import React from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Page() {

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* ===== BACKGROUND (LESS BLUE, MORE BLACK) ===== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b132a_0%,#03040a_65%,#000_100%)]" />
      <div className="absolute -top-[420px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-700/8 blur-[320px]" />
      <div className="absolute bottom-[15%] -left-[380px] w-[700px] h-[700px] bg-cyan-600/6 blur-[280px]" />

      {/* ===== HEADER ===== */}
      <header className="relative z-10 pt-14 text-center px-4">
        <h1 className="text-[11px] tracking-[0.45em] uppercase text-white/70">
          S K Dwivedi & Associates
        </h1>
        <p className="mt-3 text-[10px] tracking-[0.35em] uppercase text-white/40">
          Company Secretaries · Corporate Advisory
        </p>

        {/* ===== HOME BUTTON ===== */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="
              w-12 h-12 rounded-full
              bg-blue-950 text-white text-lg
              flex items-center justify-center
              transition-all duration-300
              hover:bg-blue-700 hover:scale-110
            "
          >
            <i className="bi bi-house-door-fill"></i>
          </button>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-36">

        <section className="text-center max-w-4xl mx-auto">
          <h2
            className="
              font-semibold tracking-tight leading-[1.2]
              text-2xl sm:text-3xl md:text-4xl
            "
          >
            <span className="block text-white">
              Corporate Incorporation
            </span>
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              & Compliance Excellence
            </span>
          </h2>

          <p className="mt-7 text-sm sm:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
            Principal-led Company Secretary firm providing incorporation,
            governance, restructuring and statutory compliance services with
            absolute discretion and precision.
          </p>

          {/* ===== CTA ===== */}
          <div className="mt-12 flex justify-center gap-5 flex-wrap">
            <Link href="/form">
              <button
                className="
                  px-8 py-3 rounded-full
                  bg-white text-black text-sm font-medium
                  transition-all duration-300
                  hover:scale-105
                  hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
                "
              >
                Get Consultation
              </button>
            </Link>

            <button
              onClick={scrollToServices}
              className="
                px-8 py-3 rounded-full
                border border-white/25
                text-sm text-white
                transition-all duration-300
                hover:border-blue-400
                hover:scale-105
              "
            >
              Explore Services
            </button>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section
          id="services"
          className="mt-32 grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >

          <Service title="Company Incorporation">
            <Item>Private / Public Limited Companies</Item>
            <Item>One Person Company (OPC)</Item>
            <Item>Section 8 & Producer Companies</Item>
            <Item>LLP & Partnership Formation</Item>
            <Item>DPIIT Startup Recognition</Item>
          </Service>

          <Service title="Secretarial Compliance">
            <Item>ROC Annual & Event Filings</Item>
            <Item>Statutory Registers & Minutes</Item>
            <Item>Board & General Meetings</Item>
            <Item>Secretarial Audit</Item>
          </Service>

          <Service title="Corporate Restructuring">
            <Item>Share Allotment & Transfers</Item>
            <Item>Capital Alteration</Item>
            <Item>Director & KMP Changes</Item>
            <Item>MOA / AOA Amendments</Item>
          </Service>

          <Service title="Governance & Advisory">
            <Item>Corporate Governance Advisory</Item>
            <Item>Due Diligence</Item>
            <Item>Legal Opinions & Certifications</Item>
            <Item>CSR & ESG Advisory</Item>
          </Service>

          <Service title="Closure & Revival">
            <Item>Company Strike Off</Item>
            <Item>LLP Closure</Item>
            <Item>Revival of Struck-off Companies</Item>
          </Service>

          <Service title="Regulatory Services">
            <Item>DIN & DSC</Item>
            <Item>MSME Registration</Item>
            <Item>FEMA / RBI Compliance</Item>
            <Item>SEBI Advisory</Item>
          </Service>

        </section>
      </main>
    </div>
  );
}

/* ===== SERVICE CARD ===== */
function Service({ title, children }) {
  return (
    <div
      className="
        group rounded-2xl p-7
        bg-white/[0.025]
        border border-white/10
        backdrop-blur-xl
        transition-all duration-500
        hover:-translate-y-2
        hover:border-blue-400
      "
    >
      <h3
        className="
          text-lg font-medium mb-6
          transition-all duration-300
          group-hover:text-blue-300
          group-hover:scale-[1.03]
        "
      >
        {title}
      </h3>

      <ul className="space-y-3">
        {children}
      </ul>
    </div>
  );
}

/* ===== SERVICE ITEM ===== */
function Item({ children }) {
  return (
    <li
      className="
        flex gap-3 text-sm text-white/60
        transition-all duration-300
        group-hover:text-white/80
        group-hover:scale-[1.03]
      "
    >
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/70" />
      {children}
    </li>
  );
}

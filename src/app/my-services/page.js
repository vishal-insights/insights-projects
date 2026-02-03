"use client";

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function GeometricCSServicesPage() {
  const services = [
    { shape: "rhombus", icon: "bi-buildings", title: "Company Incorporation" },
    { shape: "triangle", icon: "bi-journal-check", title: "ROC & MCA Filings" },
    { shape: "hexagon", icon: "bi-shield-check", title: "Secretarial Audit" },
    { shape: "parallelogram", icon: "bi-people", title: "Board / AGM / EGM" },
    { shape: "circle", icon: "bi-diagram-3", title: "Corporate Restructuring" },
    { shape: "pentagon", icon: "bi-graph-up-arrow", title: "SEBI Compliance" },
    { shape: "octagon", icon: "bi-bank", title: "FEMA & RBI" },
    { shape: "rhombus", icon: "bi-key", title: "DIN & DSC" },
    { shape: "triangle", icon: "bi-cash-coin", title: "Share Capital" },
    { shape: "hexagon", icon: "bi-file-earmark-text", title: "XBRL Filings" },
    { shape: "parallelogram", icon: "bi-briefcase", title: "Legal Advisory" },
    { shape: "circle", icon: "bi-patch-check", title: "Charge Management" },
    { shape: "pentagon", icon: "bi-globe", title: "FDI / ODI" },
    { shape: "octagon", icon: "bi-receipt", title: "Annual Reports" },
    { shape: "rhombus", icon: "bi-award", title: "Corporate Governance" },
  ];

  const clipPath = (shape) => {
    switch (shape) {
      case "rhombus":
      case "octagon":
        return "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)";
      case "triangle":
        return "polygon(50% 0%,100% 100%,0% 100%)";
      case "hexagon":
        return "polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0% 50%)";
      case "parallelogram":
        return "polygon(12% 0%,100% 0%,88% 100%,0% 100%)";
      case "pentagon":
        return "polygon(50% 0%,100% 38%,82% 100%,18% 100%,0% 38%)";
      case "circle":
        return "circle(50% at 50% 50%)";
      default:
        return "none";
    }
  };

  return (
    <div
      className="min-h-screen px-6 py-28 overflow-hidden relative"
      style={{
        background: `
          radial-gradient(1400px 700px at 15% -10%, rgba(56,189,248,0.10), transparent 45%),
          radial-gradient(1000px 600px at 85% 5%, rgba(168,85,247,0.10), transparent 45%),
          radial-gradient(800px 500px at 50% 110%, rgba(236,72,153,0.06), transparent 55%),
          linear-gradient(180deg, #020617 0%, #020617 30%, #010409 100%)
        `
      }}
    >
      {/* Luxury Noise Layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
        }}
      />

      {/* HEADER */}
      <div className="relative text-center mb-28">
        <h1 className="text-xs tracking-[0.6em] text-white uppercase">
          Corporate Compliance & Governance
        </h1>
        <div className="relative inline-block mt-6">
          <h2 className="text-4xl sm:text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-orange-400 to-gray-200">
            S K Dwivedi & Associates
          </h2>
        </div>
      </div>

      {/* SERVICES */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-14 place-items-center">
        {services.map((s, i) => (
          <a
            key={i}
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=info@skdassociate.com&su=Consultation%20Request&body=Hello%20SK%20Dwivedi%20%26%20Associates,%0A%0AI%20would%20like%20to%20book%20a%20consultation%20for%20the%20service%3A%20${encodeURIComponent(s.title)}.%0A%0AName:%0AContact:%0ARegards,`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 blur-2xl opacity-25 group-hover:opacity-50 transition duration-700 bg-pink-500/30" />

            <div
              style={{ clipPath: clipPath(s.shape) }}
              className="relative w-40 h-40 flex flex-col items-center justify-center
                         premium-card animate-premium transition-all duration-500
                         group-hover:scale-[1.08]"
            >
              <i className={`${s.icon} text-3xl text-gray-200 group-hover:text-pink-400 transition-colors duration-300`} />
              <p className="mt-3 text-[11px] text-center text-gray-300 group-hover:text-pink-300 px-3 font-medium">
                {s.title}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="relative mt-28 text-center">
        <h3 className="text-xl text-gray-200 font-light">
          Need Expert Corporate Legal Assistance?
        </h3>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=info@skdassociate.com&su=Consultation%20Request"
          target="_blank"
          className="relative inline-flex mt-8 px-10 py-4 text-sm tracking-[0.3em] uppercase font-medium text-white rounded-full overflow-hidden group"
        >
          <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#ec4899,#a855f7,#6366f1,#ec4899)] animate-spin-slow" />
          <span className="absolute inset-[2px] rounded-full bg-black/80 backdrop-blur-xl" />
          <span className="relative z-10 flex items-center gap-3">
            <i className="bi bi-calendar-check text-lg text-pink-400" />
            Book a Consultation
          </span>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="relative mt-32 py-10 flex flex-col items-center gap-3 border-t border-gray-800">
        <p className="text-xs text-gray-400 tracking-widest uppercase">
          © 2025 SK Dwivedi & Associates
        </p>
      </footer>
    </div>
  );
}

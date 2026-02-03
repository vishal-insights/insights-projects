"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from "next/head";

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setShowBottomNav(scrollTop > 160);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>S K Dwivedi & Associates | Startup Advisory</title>
        <meta
          name="description"
          content="Strategic startup advisory for founders and growing businesses."
        />
      </Head>

      <div className="relative min-h-screen flex flex-col pb-28 font-[Inter] transition-colors duration-500 bg-gradient-to-b from-white to-white dark:from-black dark:to-black text-black dark:text-white">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(90deg,#3b82f6,#6366f1,#3b82f6)] dark:bg-[linear-gradient(90deg,#0ea5e9,#818cf8,#0ea5e9)] animate-gradient-slow"></div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@500;600&display=swap');
          @keyframes gradient-slow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-slow {
            background-size: 200% 200%;
            animation: gradient-slow 18s ease infinite;
          }
        `}</style>

        {/* Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-white/15 p-2.5 rounded-full shadow-md transition hover:scale-110"
          >
            {darkMode ? <i className="bi bi-sun-fill" /> : <i className="bi bi-moon-stars-fill" />}
          </button>
        </div>

        {/* Scroll Progress */}
        <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-black/10 dark:bg-white/10">
          <motion.div
            className="h-full bg-blue-500 dark:bg-blue-400"
            style={{ scaleX: scrollProgress }}
            transformOrigin="0%"
          />
        </div>

        {/* Header */}
        <header className="py-8 border-b border-black/10 dark:border-white/10 text-center relative z-10">
          <h1 className="font-[Playfair_Display] text-2xl sm:text-4xl md:text-5xl">
            S K Dwivedi & Associates
          </h1>
          <p className="text-black/40 dark:text-white/40 text-[11px] sm:text-sm mt-1 tracking-wide">
            Share Allotment & Transfer Services
          </p>
        </header>

        {/* Main */}
        <main className="flex-grow px-4 sm:px-12 lg:px-24 py-14 relative z-10">

          {/* Hero */}
          <section className="max-w-3xl mx-auto text-center lg:text-left">
            <h2 className="font-[Playfair_Display] text-[26px] sm:text-4xl md:text-5xl leading-snug bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Share allotment, transfer, and shareholder record management.
            </h2>

            <p className="mt-4 text-black/65 dark:text-white/65 text-sm sm:text-base leading-relaxed">
              Comprehensive Company Secretary support for share allotment and transfer compliances.
            </p>

            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 text-[12px] sm:text-sm text-black/50 dark:text-white/50">
              <span>Share Allotment & Capital Compliance</span>
              <span>Transfer, Transmission & Share Certificates</span>
              <span>Statutory Registers & Shareholder Records</span>


            </div>
          </section>

          {/* Services */}
          <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-black/10 dark:border-white/10 rounded-xl p-5 sm:p-7 hover:border-blue-500/40 dark:hover:border-blue-400 transition hover:shadow-xl"
              >
                <i className={`bi ${s.icon} text-blue-500 dark:text-blue-400 text-lg`} />
                <h3 className="mt-3 text-sm sm:text-base font-medium">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </section>

          {/* Disclaimer */}
          <p className="mt-16 max-w-2xl text-[11px] text-black/40 dark:text-white/40 leading-relaxed">
            Independent Company Secretary support ensuring compliant share allotment, transfer, and maintenance of shareholding records.
          </p>
        </main>

        {/* Footer */}
        <footer className="border-t border-black/10 dark:border-white/10 py-6 px-4 sm:px-12 text-[11px] text-black/40 dark:text-white/40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} S K Dwivedi & Associates</span>
          <span>Share Allotment & Transfer Services</span>
        </footer>

        {/* Bottom Nav */}
        <AnimatePresence>
          {showBottomNav && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="flex gap-6 bg-white/90 dark:bg-black/70 backdrop-blur-xl px-8 py-3 rounded-full border border-black/10 dark:border-white/10 text-sm shadow-lg">
                <Link href="/" className="flex items-center gap-2">
                  <i className="bi bi-house-door-fill text-lg" />
                </Link>
                <Link
                  href="/form"
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/40 dark:border-blue-400/40"
                >
                  <i className="bi bi-chat-dots-fill text-lg" />
                  Advisory
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

const services = [
  {
    title: "Share Allotment Compliance",
    desc: "Advisory and compliance support for allotment of shares in accordance with the Companies Act.",
    icon: "bi-pie-chart"
  },
  {
    title: "PAS-3 & ROC Filings",
    desc: "Preparation and filing of PAS-3 and related ROC forms for share allotment.",
    icon: "bi-file-earmark-check"
  },
  {
    title: "Share Transfer & Transmission",
    desc: "End-to-end support for transfer and transmission of shares with proper documentation.",
    icon: "bi-arrow-left-right"
  },
  {
    title: "Share Certificates Issuance",
    desc: "Issuance of share certificates, including duplicate certificates, as per statutory timelines.",
    icon: "bi-card-checklist"
  },
  {
    title: "Register of Members Maintenance",
    desc: "Maintenance and updating of register of members and shareholding records.",
    icon: "bi-journal-text"
  },
  {
    title: "Stamp Duty & Documentation Support",
    desc: "Guidance on stamp duty compliance and execution of share transfer instruments.",
    icon: "bi-shield-check"
  },
];

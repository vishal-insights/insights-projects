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

  // Tailwind dark mode toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Scroll-based bottom nav & progress
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        setShowBottomNav(scrollTop > 200);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* SEO */}
      <Head>
        <title>S K Dwivedi & Associates | FEMA & RBI Advisory</title>
        <meta
          name="description"
          content="Corporate advisory on FEMA & RBI compliances. Expert guidance for companies and institutions."
        />
        <meta
          property="og:title"
          content="S K Dwivedi & Associates | FEMA & RBI Advisory"
        />
        <meta
          property="og:description"
          content="Corporate advisory on FEMA & RBI compliances. Expert guidance for companies and institutions."
        />
      </Head>

      <div
        className={`relative min-h-screen flex flex-col pb-32 font-[Inter] transition-colors duration-500 bg-gradient-to-b from-white via-white/95 to-white dark:from-black dark:via-black/95 dark:to-black text-black dark:text-white`}
      >
        {/* Animated gradient shimmer */}
        <div className="absolute inset-0 animate-gradient-slow pointer-events-none opacity-20 bg-[linear-gradient(90deg,#3b82f6,#6366f1,#3b82f6)] dark:bg-[linear-gradient(90deg,#0ea5e9,#818cf8,#0ea5e9)]"></div>

        {/* GOOGLE FONTS */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@500;600&display=swap');
          @keyframes gradient-slow {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
          .animate-gradient-slow {
            background-size: 200% 200%;
            animation: gradient-slow 15s ease infinite;
          }
        `}</style>

        {/* LIGHT / DARK ICON TOGGLE */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-white/20 text-black dark:text-white p-2 rounded-full shadow hover:scale-110 transition transform"
            title="Toggle Dark/Light Mode"
          >
            {darkMode ? (
              <i className="bi bi-sun-fill text-lg"></i>
            ) : (
              <i className="bi bi-moon-stars-fill text-lg"></i>
            )}
          </button>
        </div>

        {/* SCROLL PROGRESS BAR */}
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-black/10 dark:bg-white/10">
          <motion.div
            className="h-1 bg-blue-500 dark:bg-blue-400"
            style={{ scaleX: scrollProgress }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollProgress }}
            transformOrigin="0%"
          />
        </div>

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-10 border-b border-black/10 dark:border-white/10 text-center z-10 relative"
        >
          <h1 className="font-[Playfair_Display] text-3xl sm:text-4xl md:text-5xl tracking-wide">
            S K Dwivedi & Associates
          </h1>
          <p className="text-black/40 dark:text-white/40 text-xs sm:text-sm mt-2">
            FEMA & RBI Regulatory Advisory
          </p>
        </motion.header>

        {/* MAIN */}
        <main className="flex-grow px-4 sm:px-12 lg:px-24 py-20 z-10 relative">
          {/* HERO */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl mx-auto lg:mx-0 text-left"
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl md:text-5xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Advising Institutions on FEMA & RBI Risk
            </h2>

            <p className="mt-6 text-black/70 dark:text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
              We provide strategic advisory to corporates, financial institutions
              and foreign investors navigating complex Indian foreign exchange
              and RBI regulations. All engagements are undertaken with strict
              discretion and professional integrity.
            </p>

            {/* TRUST STRIP */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-black/50 dark:text-white/50">
              <span>• Cross-Border Transactions</span>
              <span>• Inbound & Outbound Investments</span>
              <span>• Regulatory Interface & Representation</span>
            </div>
          </motion.section>

          {/* SERVICES */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="border border-black/10 dark:border-white/10 rounded-2xl p-6 hover:border-blue-500/30 dark:hover:border-blue-400 transition transform hover:scale-105 hover:shadow-2xl"
              >
                <i className={`bi ${s.icon} text-blue-500 dark:text-blue-400 text-xl`}></i>
                <h3 className="mt-4 text-base font-medium">{s.title}</h3>
                <p className="mt-2 text-black/60 dark:text-white/60 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.section>

          {/* DISCRETION BLOCK */}
          <section className="mt-24 max-w-3xl text-black/40 dark:text-white/40 text-xs leading-relaxed">
            All advisory and representation is conducted under strict professional
            standards and compliance with FEMA and RBI regulations. No outcomes are
            guaranteed. Engagements are confidential.
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-black/10 dark:border-white/10 py-8 px-6 sm:px-12 text-black/40 dark:text-white/40 text-xs flex flex-col sm:flex-row justify-between gap-4 z-10 relative">
          <span>© {new Date().getFullYear()} S K Dwivedi & Associates</span>
          <span>FEMA & RBI Regulatory Advisory</span>
        </footer>

        {/* BOTTOM FLOATING NAV */}
        <AnimatePresence>
          {showBottomNav && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="flex gap-6 bg-white/80 dark:bg-black/70 backdrop-blur-md px-10 py-3 rounded-full border border-black/10 dark:border-white/10 text-sm shadow-lg">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition transform hover:scale-110"
                >
                  <i className="bi bi-house-door-fill text-lg"></i>
                  Home
                </Link>

                <Link
                  href="/form"
                  className="flex items-center gap-2 px-5 py-1 rounded-full border border-blue-500/30 dark:border-blue-400/30 hover:border-blue-500 dark:hover:border-blue-400 transition transform hover:scale-105 bg-white/20 dark:bg-white/10"
                >
                  <i className="bi bi-chat-dots-fill text-lg"></i>
                  Request Advisory
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ===== ELITE SERVICES ===== */
const services = [
  {
    title: "FEMA & RBI Strategy",
    desc: "Advisory for structuring high-stakes cross-border and domestic transactions.",
    icon: "bi-globe2",
  },
  {
    title: "RBI Regulatory Filings",
    desc: "End-to-end preparation and submission of RBI compliance filings.",
    icon: "bi-bank",
  },
  {
    title: "Foreign Investment Structuring",
    desc: "Inbound and outbound investment compliance & strategic advisory.",
    icon: "bi-arrow-down-circle",
  },
  {
    title: "External Commercial Borrowings",
    desc: "ECB structuring and ongoing compliance with RBI regulations.",
    icon: "bi-currency-exchange",
  },
  {
    title: "FC-GPR / FC-TRS Filings",
    desc: "Precise preparation and filing of FEMA forms for FDI/ODI transactions.",
    icon: "bi-file-earmark-text",
  },
  {
    title: "FEMA Compounding",
    desc: "Advisory and representation for compounding proceedings.",
    icon: "bi-shield-check",
  },
];

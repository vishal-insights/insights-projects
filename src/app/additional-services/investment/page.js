'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const html = document.documentElement
    dark ? html.classList.add('dark') : html.classList.remove('dark')
  }, [dark])

  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-black dark:text-slate-100">

      {/* ✅ NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-slate-200 dark:border-blue-900">
        
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">

          {/* 🔥 LEFT (ICON + TEXT) */}
          <div className="flex items-center gap-2 flex-1 min-w-0">

            <i className="bi bi-piggy-bank text-blue-500 text-sm sm:text-base shrink-0"></i>

            <span className="
              block
              text-[10px] sm:text-xs md:text-sm
              uppercase
              tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.2em]
              text-slate-700 dark:text-blue-300
              font-medium
              leading-tight
              truncate
            ">
              Investment Compliance Solutions
            </span>

          </div>

          {/* 🔥 RIGHT ICONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* THEME */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg border border-slate-300 dark:border-blue-800 text-slate-700 dark:text-blue-300 hover:bg-slate-200 dark:hover:bg-blue-900/30 transition"
            >
              <i className={`bi ${dark ? 'bi-sun' : 'bi-moon'}`}></i>
            </button>

            {/* HOME */}
            <a
              href="/"
              className="p-2 rounded-lg border border-slate-300 dark:border-blue-800 text-slate-700 dark:text-blue-300 hover:bg-slate-200 dark:hover:bg-blue-900/30 transition"
            >
              <i className="bi bi-house-door"></i>
            </a>

            {/* NEXT */}
            <a
              href="/"
              className="p-2 rounded-lg border border-slate-300 dark:border-blue-800 text-slate-700 dark:text-blue-300 hover:bg-slate-200 dark:hover:bg-blue-900/30 transition"
            >
              <i className="bi bi-arrow-right"></i>
            </a>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6
        bg-gradient-to-br from-slate-100 via-white to-slate-200
        dark:from-black dark:via-[#050b1f] dark:to-[#020617]">

        <div className="max-w-4xl mx-auto text-center">

          <div className="mx-auto mb-6 h-[2px] w-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-blue-100"
          >
            S K Dwivedi & Associates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-sm sm:text-base uppercase tracking-[0.2em] text-slate-600 dark:text-blue-400"
          >
            Practising Company Secretaries
          </motion.p>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-blue-400">
            Regulation • Strategy • Risk
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50 dark:bg-black">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-blue-100">
              Professional Services
            </h2>
            <p className="mt-3 text-slate-600 dark:text-blue-400">
              End-to-End Investment Compliance Solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl p-6 bg-white dark:bg-[#020617] border border-blue-600/40 dark:border-blue-800 hover:border-blue-600 shadow-lg hover:-translate-y-2 transition"
              >
                <i className={`bi ${s.icon} text-3xl sm:text-4xl text-blue-600 dark:text-blue-500`}></i>

                <h3 className="mt-4 text-lg sm:text-xl font-semibold text-slate-900 dark:text-blue-100">
                  {s.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-blue-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 sm:py-8 border-t border-slate-200 dark:border-blue-900 text-center text-xs sm:text-sm text-slate-600 dark:text-blue-400 bg-white dark:bg-black">
        © {new Date().getFullYear()} S K Dwivedi & Associates <br />
        Practising Company Secretaries
      </footer>

    </div>
  )
}

const services = [
  {
    icon: 'bi-piggy-bank',
    title: 'Regulatory Compliance Advisory',
    desc: 'Ensuring compliance with SEBI, RBI and Companies Act.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Risk Assessment',
    desc: 'Identifying and minimizing investment risks.',
  },
  {
    icon: 'bi-file-earmark-text',
    title: 'Documentation',
    desc: 'Maintaining agreements and compliance records.',
  },
  {
    icon: 'bi-bar-chart-line',
    title: 'Monitoring',
    desc: 'Tracking performance and compliance.',
  },
  {
    icon: 'bi-journal-check',
    title: 'Policies',
    desc: 'Developing internal frameworks.',
  },
  {
    icon: 'bi-lightning-charge',
    title: 'Audit Support',
    desc: 'Assisting in audits and reconciliation.',
  },
]
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-semibold tracking-wide">
          S K Dwivedi & Associates
        </h1>
        <nav className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition">
            <i className="bi bi-house text-xl"></i>
            Home
          </Link>
          <Link href="#services" className="text-white/80 hover:text-white transition">Services</Link>
          <Link href="#contact" className="text-white/80 hover:text-white transition">Contact</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row justify-between items-center px-12 py-28 gap-12">
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl font-light leading-tight"
          >
            Elite Company Secretary
            <span className="block font-semibold text-amber-400">
              & Secretarial Audit Services
            </span>
          </motion.h2>

          <p className="mt-6 text-white/70 text-lg">
            Trusted advisors delivering world-class corporate compliance,
            governance excellence, and secretarial audit services with
            absolute professionalism.
          </p>

          <Link
            href="#contact"
            className="inline-flex items-center gap-4 mt-12 px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-semibold shadow-[0_20px_60px_rgba(255,193,7,0.35)] hover:scale-105 transition"
          >
            Get Consultancy
            <i className="bi bi-arrow-right text-xl"></i>
          </Link>
        </div>

        {/* Decorative Gradient Box instead of Image */}
        <div className="w-full md:w-1/2 h-64 bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-500 rounded-3xl shadow-2xl flex items-center justify-center">
          <span className="text-3xl font-bold text-black/60">Premium</span>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-12 py-28 bg-gradient-to-b from-black to-zinc-900">
        <h3 className="text-4xl font-semibold mb-20 text-center">
          Professional Services
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            "Secretarial Audit",
            "Company Law & Compliance",
            "Corporate Governance Advisory",
            "ROC & MCA Filings",
            "Due Diligence & Certification",
            "Board & Shareholder Support",
          ].map((service) => (
            <motion.div
              key={service}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur shadow-xl"
            >
              <h4 className="text-2xl font-semibold mb-4 text-amber-400">
                {service}
              </h4>
              <p className="text-white/70">
                Comprehensive, reliable, and regulation-focused solutions
                tailored for modern corporates.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact / Consultancy Form */}
      <section id="contact" className="px-12 py-28">
        <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl">
          <h3 className="text-3xl font-semibold mb-10 text-center">
            Get Consultancy
          </h3>

          <form className="grid grid-cols-1 gap-7">
            <input
              className="bg-black/60 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-400"
              placeholder="Your Full Name"
            />
            <input
              type="email"
              className="bg-black/60 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-400"
              placeholder="Email Address"
            />
            <textarea
              rows={4}
              className="bg-black/60 border border-white/20 rounded-xl px-6 py-4 focus:outline-none focus:border-amber-400"
              placeholder="Briefly describe your requirement"
            />

            <button
              type="submit"
              className="mt-4 px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-semibold hover:scale-105 transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/50 border-t border-white/10">
        © {new Date().getFullYear()} S K Dwivedi & Associates. All rights reserved.
      </footer>
    </main>
  );
}

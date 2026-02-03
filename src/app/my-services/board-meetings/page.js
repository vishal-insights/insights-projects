"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

const services = [
  { title: "Board Meeting Planning", icon: "bi-diagram-3" },
  { title: "Notice & Agenda Drafting", icon: "bi-calendar2-check" },
  { title: "Board Resolutions", icon: "bi-file-earmark-text" },
  { title: "Minutes & Records", icon: "bi-journal-text" },
  { title: "SS-1 Compliance", icon: "bi-shield-check" },
  { title: "ROC Filing (MGT-14)", icon: "bi-cloud-check" },
];

export default function BoardMeetingUltraPremium() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0b132a,_#020308_80%)] text-gray-200">

      {/* HERO */}
      <section className="text-center py-32 px-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-blue-400/50 mb-5">
          board meeting & governance
        </p>

        <h1
          className="text-[28px] md:text-[34px] font-medium tracking-[0.18em]
          bg-gradient-to-r from-blue-300 to-cyan-400
          bg-clip-text text-transparent"
        >
          S K Dwivedi & Associates
        </h1>

        <p className="mt-7 text-[13px] text-gray-400 max-w-lg mx-auto">
          Strategic Board Meetings • Corporate Resolutions • Compliance
        </p>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-24 pb-28 space-y-6 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.12 }}
            whileHover={{ x: 6 }}
            className="
              relative group p-[1px] rounded-xl
              bg-gradient-to-r from-blue-500/60 via-cyan-500/50 to-blue-700/60
            "
          >
            <div
              className="
                flex items-center gap-5 px-6 py-5 rounded-xl
                bg-[#05080f]/95 backdrop-blur-xl
                border border-white/5
              "
            >
              {/* ICON */}
              <motion.i
                className={`bi ${s.icon} text-[20px]`}
                initial={{ color: "#9ca3af" }}
                whileHover={{
                  scale: 1.15,
                  rotate: 8,
                  color: "#60a5fa",
                  filter:
                    "drop-shadow(0 0 10px rgba(96,165,250,0.45))",
                }}
                transition={{ duration: 0.45 }}
              />

              <h3 className="text-[14px] font-medium tracking-wide text-gray-100">
                {s.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="pb-20 flex flex-col sm:flex-row gap-6 justify-center">

        {/* HOME */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="
              px-9 py-3 rounded-full text-[13px] tracking-wide
              border border-white/20
              hover:border-blue-400/60
              transition-all
            "
          >
            ← Home
          </motion.button>
        </Link>

        {/* GET CONSULTATION */}
        <Link href="/form">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="
              px-9 py-3 rounded-full text-[13px] tracking-wide
              bg-gradient-to-r from-blue-500 to-cyan-400
              text-black font-medium
              shadow-[0_0_35px_rgba(59,130,246,0.35)]
            "
          >
            Get Consultation
          </motion.button>
        </Link>

      </section>
    </div>
  );
}

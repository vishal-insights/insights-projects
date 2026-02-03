"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function UltraPremiumForm() {
  const [data, setData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    service: "",
    entityType: "",
    timeline: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // 🔊 SOUNDS
  const hoverSound = () => {
    const a = new Audio("/audio/hover.mp3");
    a.volume = 0.25;
    a.play();
  };

  const clickSound = () => {
    const a = new Audio("/audio/send.mp3");
    a.volume = 0.4;
    a.play();
  };

  const update = (key) => (e) =>
    setData((prev) => ({ ...prev, [key]: e.target.value }));

  const sendGmail = () => {
    clickSound();

    const to = "officeskd@gmail.com";
    const subject = `CS Consultation | ${data.service || "General"}`;

    const body = `
CLIENT DETAILS
--------------
Name: ${data.fullName}
Company: ${data.companyName}
Email: ${data.email}
Phone: ${data.phone}

BUSINESS INFO
-------------
Service: ${data.service}
Entity Type: ${data.entityType}
Timeline: ${data.timeline}

MESSAGE
-------
${data.description}
`;

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(url, "_blank");
    setSubmitted(true);
  };

  const baseInput =
    "w-full h-12 pl-4 pr-4 rounded-lg outline-none transition-all duration-300";

  const themed = darkMode
    ? "bg-[#000209] text-white border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
    : "bg-white text-black border border-black/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-400";

  const hoverGlow = "hover:border-blue-400 hover:ring-1 hover:ring-blue-400";

  return (
    <div
      className={`min-h-screen px-4 py-16 flex justify-center ${
        darkMode ? "bg-[#010101]" : "bg-gray-100"
      }`}
    >
      {submitted && <Confetti width={size.width} height={size.height} />}

      {/* HOME + THEME TOGGLE */}
      <div className="fixed top-6 left-6 z-50 flex gap-3">
        <Link href="/">
          <div
            onMouseEnter={hoverSound}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <i className="bi bi-house-fill text-[#d4af37]" />
          </div>
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          onMouseEnter={hoverSound}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <i
            className={`bi ${
              darkMode ? "bi-sun-fill" : "bi-moon-fill"
            } text-[#d4af37]`}
          />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[920px] rounded-3xl p-[1.2px] bg-gradient-to-r from-[#d4af37] via-[#4aa3a3] to-[#7b5cff]"
      >
        <div
          className={`rounded-3xl px-8 py-10 ${
            darkMode ? "bg-[#07080c]" : "bg-white"
          }`}
        >
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/cat.jpg"
              alt="logo"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div>

          <p className="text-center text-xs tracking-[0.35em] text-[#d4af37]/60">
            CLIENT REQUEST FORM
          </p>

          <h1 className="mt-3 text-center text-3xl font-medium text-[#d4af37]">
            S K Dwivedi & Associates
          </h1>

          {/* BASIC INFO */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Full Name"
              value={data.fullName}
              onChange={update("fullName")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            />
            <input
              placeholder="Company / Firm"
              value={data.companyName}
              onChange={update("companyName")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            />
            <input
              placeholder="Email"
              value={data.email}
              onChange={update("email")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            />
            <input
              placeholder="Mobile"
              value={data.phone}
              onChange={update("phone")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            />
          </div>

          {/* BUSINESS DETAILS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="Service Required"
              value={data.service}
              onChange={update("service")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            />

            <select
              value={data.entityType}
              onChange={update("entityType")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            >
              <option value="">Entity Type</option>
              <option>Private Limited</option>
              <option>LLP</option>
              <option>OPC</option>
              <option>Partnership</option>
              <option>Individual</option>
            </select>

            <select
              value={data.timeline}
              onChange={update("timeline")}
              onMouseEnter={hoverSound}
              className={`${baseInput} ${themed} ${hoverGlow}`}
            >
              <option value="">Timeline / Urgency</option>
              <option>Immediate</option>
              <option>Within 7 Days</option>
              <option>This Month</option>
            </select>
          </div>

          {/* MESSAGE */}
          <textarea
            rows={5}
            placeholder="Describe your requirement..."
            value={data.description}
            onChange={update("description")}
            onMouseEnter={hoverSound}
            className={`${baseInput} ${themed} ${hoverGlow} mt-8`}
          />

          {/* SUBMIT */}
          <button
            onClick={sendGmail}
            onMouseEnter={hoverSound}
            className="mt-10 w-full h-12 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#f2e3a4] text-black font-medium hover:scale-[1.02] transition"
          >
            Submit & Open Gmail
          </button>
        </div>
      </motion.div>
    </div>
  );
}

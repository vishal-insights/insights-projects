"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function HelpSupport() {
  const [theme, setTheme] = useState("dark");
  const [faqOpen, setFaqOpen] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Theme toggle
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const faqs = [
    { q: "How to incorporate a Private Limited Company?", a: "DSC, DIN, Name approval, SPICe+ filing and ROC approval required." },
    { q: "What are annual ROC compliance requirements?", a: "AOC-4, MGT-7, AGM and Board Meeting compliances." },
    { q: "What is DIR-3 KYC?", a: "Annual KYC for Directors mandatory before 30 September." },
    { q: "What is DPT-3 filing?", a: "Return of deposits or outstanding loans to be filed before 30 June." },
    { q: "When is ITR filing for Companies?", a: "Generally 30 September of Assessment Year." },
    { q: "Can you help with GST compliance?", a: "Yes! Our experts guide monthly GST filings and advisory." },
    { q: "Do you provide consultancy for LLPs?", a: "Absolutely, we handle LLP formation, compliance, and advisory." },
    { q: "What services are included in company secretarial support?", a: "ROC filings, AGM support, Board resolutions, statutory registers, and more." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-black dark:via-slate-900 dark:to-blue-950 text-gray-900 dark:text-white transition-all duration-500">

      {/* Navbar */}
      <nav className="fixed w-full bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400">
            S K Dwivedi & Associates
          </h1>

          <div className="flex items-center gap-6 text-xl">
            <Link href="/" className="hover:text-blue-500">
              <i className="bi bi-house-door-fill"></i>
            </Link>
            <button onClick={toggleTheme} className="hover:text-blue-500">
              {theme === "dark" ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-28 px-6 md:px-20 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Help & Support
        </h2>
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg">
          Professional compliance & corporate advisory support at your fingertips.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        <Card icon="bi-telephone-fill" title="Contact Support">9699981283 <br/> Mon–Sat (10AM–6PM)</Card>
        <Card icon="bi-calendar-check-fill" title="Book Consultation">
          <Link href="/form" className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Book Now</Link>
        </Card>
        <Card icon="bi-geo-alt-fill" title="Office Address">32 Bharwadi Rd Navneeth Colony<br/> Andheri West, Mumbai<br/> Maharashtra, India</Card>
      </div>

      {/* FAQ */}
      <div className="mt-20 max-w-3xl mx-auto px-6 md:px-0">
        <h3 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border rounded-lg overflow-hidden dark:border-white/10">
            <button onClick={() => setFaqOpen(faqOpen === index ? null : index)} className="w-full flex justify-between p-4 bg-gray-100 dark:bg-white/5">
              {faq.q} <i className={`bi ${faqOpen === index ? "bi-dash-circle" : "bi-plus-circle"}`}></i>
            </button>
            {faqOpen === index && <div className="p-4 text-gray-600 dark:text-gray-400">{faq.a}</div>}
          </div>
        ))}
      </div>

      {/* Ask Expert Form */}
      <div className="mt-20 max-w-3xl mx-auto px-6 md:px-0">
        <h3 className="text-2xl font-bold text-center mb-6">Ask Our Experts</h3>
        {formSubmitted ? (
          <p className="text-green-400 text-center text-lg">Thank you! Our experts will contact you shortly.</p>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.message.value,
              };
              try {
                const res = await fetch("/api/submit-question", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
                if (res.ok) setFormSubmitted(true);
                else alert("Something went wrong. Try again!");
              } catch (err) {
                console.error(err);
                alert("Error submitting form");
              }
            }}
            className="space-y-4 bg-white/5 dark:bg-black/40 p-8 rounded-2xl shadow-md border dark:border-white/10"
          >
            <input name="name" type="text" placeholder="Full Name" required className="w-full p-3 rounded-lg bg-black/20 border border-white/20"/>
            <input name="email" type="email" placeholder="Email" required className="w-full p-3 rounded-lg bg-black/20 border border-white/20"/>
            <input name="phone" type="tel" placeholder="Phone Number" required className="w-full p-3 rounded-lg bg-black/20 border border-white/20"/>
            <textarea name="message" placeholder="Your Question / Requirement" rows="4" required className="w-full p-3 rounded-lg bg-black/20 border border-white/20"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white">Submit Question</button>
          </form>
        )}
      </div>

      {/* Footer */}
      <div className="mt-24 text-center text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} S K Dwivedi & Associates. All Rights Reserved.
      </div>

      {/* WhatsApp */}
      <a href="https://wa.me/919699981283" target="_blank" className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl text-white">
        <i className="bi bi-whatsapp"></i>
      </a>
    </div>
  );
}

function Card({ icon, title, children }) {
  return (
    <div className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-lg border dark:border-white/10 hover:scale-105 transition">
      <i className={`bi ${icon} text-3xl text-blue-500 dark:text-blue-400`}></i>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <div className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{children}</div>
    </div>
  );
}

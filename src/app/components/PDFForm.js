"use client";
import { useState } from "react";

export default function FloatingPDFForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    date: "",
    docType: "board",
    userPassword: "",
    ownerPassword: "",
  });

  const toggleForm = () => setOpen(!open);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDownload = async () => {
    if (!form.userPassword || !form.ownerPassword) {
      return alert("Both User & Owner passwords required.");
    }

    const paymentDone = confirm(
      "Payment required to unlock PDF. Click OK to simulate payment."
    );
    if (!paymentDone) return alert("Payment not done. PDF locked.");

    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.status === 401) {
      return alert("Owner password is incorrect. Download blocked.");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.docType}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      {/* Floating Icon */}
      <div
        className="fixed bottom-8 left-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
        onClick={toggleForm}
      >
        <i className="bi bi-file-earmark-text text-white text-2xl"></i>
      </div>

      {/* Form */}
      {open && (
        <div className="fixed bottom-24 left-8 w-96 bg-gradient-to-br from-black to-[#07122b] rounded-2xl shadow-2xl border border-blue-500/30 flex flex-col z-50 p-4">
          <div className="flex justify-between items-center text-blue-400 font-semibold mb-2">
            <span>
              <i className="bi bi-file-earmark-text"></i> CS PDF Generator
            </span>
            <button
              onClick={toggleForm}
              className="text-blue-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <input
              className="input px-2 py-2 rounded bg-black border border-blue-500/50 text-white"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              className="input px-2 py-2 rounded bg-black border border-blue-500/50 text-white"
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
            />
            <input
              type="date"
              className="input px-2 py-2 rounded bg-black border border-blue-500/50 text-white"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
            <select
              className="input px-2 py-2 rounded bg-black border border-blue-500/50 text-white"
              name="docType"
              value={form.docType}
              onChange={handleChange}
            >
              <option value="board">Board Resolution</option>
              <option value="agm">AGM Resolution</option>
              <option value="mgt7">Form MGT-7</option>
              <option value="aoc4">Form AOC-4</option>
              <option value="dir12">Form DIR-12</option>
              <option value="share">Share Certificate</option>
              <option value="others">Other MCA Forms</option>
            </select>
            <input
              type="password"
              className="input px-2 py-2 rounded bg-black border border-blue-500/50 text-white"
              name="userPassword"
              placeholder="Enter your PDF password"
              value={form.userPassword}
              onChange={handleChange}
            />
            <input
              type="password"
              className="input px-2 py-2 rounded bg-black border border-blue-500/50 text-white"
              name="ownerPassword"
              placeholder="Enter owner password"
              value={form.ownerPassword}
              onChange={handleChange}
            />
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
            >
              Pay & Download PDF
            </button>
          </div>
        </div>
      )}
    </>
  );
}
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserRegister() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Regex validation patterns
  const namePattern = /^[a-zA-Z\s]{2,50}$/; // only letters and spaces, 2-50 chars
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basic email regex

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!namePattern.test(form.name)) {
      setError("Name must contain only letters and spaces (2-50 characters)");
      return false;
    }
    if (!emailPattern.test(form.email)) {
      setError("Invalid email address");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }
      alert(data.message);
      router.push("/user-login");
    } catch {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  // Floating particles for ultra-luxury style
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random()*3+1, dx: Math.random()*1-0.5, dy: Math.random()*1-0.5 });
    }
    function animate() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(0,100,255,0.3)";
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if(p.x>canvas.width)p.x=0;
        if(p.x<0)p.x=canvas.width;
        if(p.y>canvas.height)p.y=0;
        if(p.y<0)p.y=canvas.height;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4">
      <canvas id="particles" className="absolute inset-0"></canvas>
      <form onSubmit={handleSubmit} className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-400 text-center">User Registration</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 text-blue-400 placeholder-blue-300 border border-white/20"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 text-blue-400 placeholder-blue-300 border border-white/20"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 text-blue-400 placeholder-blue-300 border border-white/20"
          required
        />
        <input
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-white/10 text-blue-400 placeholder-blue-300 border border-white/20"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-lg transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
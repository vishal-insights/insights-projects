"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/user/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch { setError("Something went wrong!"); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-blue-400">
      <form onSubmit={handleSubmit} className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-400">User Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 text-blue-400 placeholder-blue-300 border border-white/20" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 rounded-xl bg-white/10 text-blue-400 placeholder-blue-300 border border-white/20" required />
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-lg transition">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm mt-2"><a href="/forgot-password" className="text-blue-300 hover:underline">Forgot Password?</a></p>
      </form>
    </div>
  );
}
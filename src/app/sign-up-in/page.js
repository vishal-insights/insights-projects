"use client";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Very subtle navy gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#000c1a]/5 to-black"></div>

      {/* Animated Floating Glass Orbs */}
      <div className="absolute top-10 left-1/4 w-36 h-36 bg-white/10 backdrop-blur-xl rounded-full animate-float1"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-white/10 backdrop-blur-xl rounded-full animate-float2"></div>
      <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white/10 backdrop-blur-xl rounded-full animate-float3"></div>

      {/* Left Back Arrow */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 z-10 p-3 rounded-full bg-white/5 hover:bg-white/10 transition shadow-lg"
      >
        <i className="bi bi-arrow-left text-blue-500 text-xl hover:scale-110 transition"></i>
      </button>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 mt-20">

        {/* Premium Company Name */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-4xl animate-fadeup">
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            S K Dwivedi & Associates
          </span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 max-w-2xl text-sm sm:text-base animate-fadeup delay-200 text-blue-400">
          Company Secretary Services | Corporate Compliance | Secretarial Advisory
        </p>

        {/* Glass Card with Motion Buttons */}
        <div className="mt-16 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-xl space-y-6">

          <button
            onClick={() => router.push("/user-register")}
            className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-lg flex items-center justify-center gap-2 text-blue-400"
          >
            <i className="bi bi-person-plus-fill text-blue-400 text-lg"></i>
            User Registration
          </button>

          <button
            onClick={() => router.push("/user-login")}
            className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-lg flex items-center justify-center gap-2 text-blue-400"
          >
            <i className="bi bi-box-arrow-in-right text-blue-400 text-lg"></i>
            User Login
          </button>

          <button
            onClick={() => router.push("/admin-login")}
            className="w-full py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-500 shadow-lg flex items-center justify-center gap-2 text-blue-400"
          >
            <i className="bi bi-shield-lock-fill text-blue-400 text-lg"></i>
            Admin Login
          </button>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce text-blue-400">
          <i className="bi bi-chevron-down text-2xl"></i>
        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-blue-400 text-xs py-8 mt-20 border-t border-white/10">
        © 2026 S K Dwivedi & Associates. Crafted with Excellence.
      </footer>

      {/* Custom Tailwind Animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-25px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(5px); }
        }
        .animate-float1 { animation: float1 7s ease-in-out infinite; }
        .animate-float2 { animation: float2 9s ease-in-out infinite; }
        .animate-float3 { animation: float3 8s ease-in-out infinite; }

        @keyframes fadeup {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        .animate-fadeup { animation: fadeup 1s ease forwards; }
        .animate-fadeup.delay-200 { animation-delay: 0.2s; }
      `}</style>

    </div>
  );
}
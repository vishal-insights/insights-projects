"use client";

import ChromaGrid from "@/components/ChromaGrid";
import Link from "next/link";

const items = [
  {
    image: "/images/csimg2.jpeg",
    title: "Company Secretary",
    // subtitle: "Company Secretary",
    handle: "@Shailendra",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson",
  },
  {
    image: "/images/csimg10.jpeg",
    title: "Practicing Company Secretaries",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor: "#0A1F44",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "/images/csimg3.jpeg",
    title: "Eminent Professionals",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "/images/csimg4.jpeg",
    title: "Distinguished Professionals",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "/images/csimg5.jpeg",
    title: "Professionals",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "/images/csimg6.jpeg",
    title: "Together as One Team",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor:"#3B82F6",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "/images/csimg11.jpeg",
    title: "Professionals",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor:"#3B82F6",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  {
    image: "/images/csimg8.jpeg",
    title: "Management Team",
    // subtitle: "Backend Engineer",
    handle: "@Shailendra",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(180deg, #3B82F6 0%, #0F172A 100%)",
    url: "https://linkedin.com/in/mikechen",
  },
  
];

export default function ImageGalleryPage() {
  return (
    <>
      {/* ===== NAVBAR  ===== */}
     <div className="w-full bg-gradient-to-r from-black via-blue-900 to-black px-6 py-5 flex items-center justify-between shadow-lg">

        
        {/* Spacer */}
        <div className="w-8"></div>

        {/* Center Text */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            S K Dwivedi & Associates
          </h1>
          <p className="text-sm text-white mt-1">
            Welcome to Image Gallery
          </p>
        </div>

        {/* Home Icon */}
        <Link
          href="/"
          className="text-white hover:text-yellow-400 text-2xl transition"
        >
          <i className="bi bi-house-fill"></i>
        </Link>
      </div>

      {/* ===== BODY / GRID (NORMAL BG) ===== */}
      <div className="relative min-h-screen  bg-black">
        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>

      {/* footer */}
      <div>
      
<footer className="w-full">

  {/* Gradient Divider */}
  <div className="h-[2px] bg-gradient-to-r from-black via-blue-900 to-black" />

  <div className="bg-gradient-to-b from-black to-black text-gray-300">
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Brand & Description */}
      <div>
        <h2 className="text-white text-xl font-semibold tracking-wide">
          S K Dwivedi & Associates
        </h2>
        <p className="mt-4 text-gray-400 leading-relaxed max-w-md">
          A professional firm delivering trusted Company Secretary services,
          corporate compliance, governance, and advisory solutions with
          precision, ethics, and excellence.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mt-6 text-xl">
          <a href="#" className="hover:text-blue-400 transition">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <i className="bi bi-envelope"></i>
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div className="md:text-right">
        <h3 className="text-white font-medium mb-4">
          Get in Touch
        </h3>
        <ul className="space-y-3">
          <li className="flex md:justify-end items-center gap-3">
            <i className="bi bi-geo-alt text-blue-400"></i>
            <span>Mumbai, India</span>
          </li>
          <li className="flex md:justify-end items-center gap-3">
            <i className="bi bi-telephone text-blue-400"></i>
            <span>+91 9699981283</span>
          </li>
          <li className="flex md:justify-end items-center gap-3">
            <i className="bi bi-envelope text-blue-400"></i>
            <span>info@skdwivediassociates.com</span>
          </li>
        </ul>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="border-t border-blue-900 py-4 text-center text-xs text-gray-400">
      © {new Date().getFullYear()}{" "}
      <span className="text-gray-200 font-medium">
        S K Dwivedi & Associates
      </span>{" "}
      · All Rights Reserved
    </div>
  </div>
</footer>
</div>

    </>
  );
}

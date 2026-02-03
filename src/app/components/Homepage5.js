// "use client";
// import { motion } from "framer-motion";
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import Tilt from "react-parallax-tilt";
// import { useEffect, useState } from "react";
// import Particles from "react-tsparticles";


// export default function Homepage5() {
//   // Typewriter effect
//   const words = ["Creative", "Animated", "Modern", "Futuristic"];
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % words.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   // particles init
//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   const socialLinks = [
//     { name: "Facebook", icon: "bi-facebook", url: "https://facebook.com", color: "#1877F2" },
//     { name: "Twitter", icon: "bi-twitter", url: "https://twitter.com", color: "#1DA1F2" },
//     { name: "Instagram", icon: "bi-instagram", url: "https://instagram.com", color: "#E4405F" },
//     { name: "LinkedIn", icon: "bi-linkedin", url: "https://linkedin.com", color: "#0A66C2" },
//     { name: "GitHub", icon: "bi-github", url: "https://github.com", color: "#F5F5F5" },
//     { name: "YouTube", icon: "bi-youtube", url: "https://youtube.com", color: "#FF0000" },
//     { name: "WhatsApp", icon: "bi-whatsapp", url: "https://wa.me/919876543210", color: "#25D366" },
//     { name: "Email", icon: "bi-envelope-fill", url: "mailto:youremail@example.com", color: "#FFD700" },
//   ];

//   const features = [
//     { title: "Fast Performance", icon: "bi-lightning-charge-fill", desc: "Super-optimized speed with Next.js." },
//     { title: "Modern Design", icon: "bi-palette-fill", desc: "Stunning UI with TailwindCSS & animations." },
//     { title: "SEO Friendly", icon: "bi-graph-up-arrow", desc: "Rank higher with optimized SEO structure." },
//     { title: "Secure", icon: "bi-shield-lock-fill", desc: "Enterprise level data protection & security." },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden">
//       {/* Animated particles background */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           background: { color: "transparent" },
//           particles: {
//             number: { value: 80 },
//             color: { value: ["#00C6FF", "#FF0080", "#FFD700"] },
//             shape: { type: "circle" },
//             opacity: { value: 0.6 },
//             size: { value: { min: 1, max: 4 } },
//             move: { enable: true, speed: 1, direction: "none", outModes: "out" },
//             links: { enable: true, color: "#ffffff", distance: 120, opacity: 0.2 },
//           },
//           interactivity: {
//             events: {
//               onHover: { enable: true, mode: "repulse" },
//               onClick: { enable: true, mode: "push" },
//             },
//           },
//         }}
//         className="absolute inset-0 -z-0"
//       />

//       {/* Navbar */}
//       <motion.nav
//         className="fixed top-0 left-0 w-full z-20 backdrop-blur-lg bg-black/30 border-b border-gray-700 flex justify-between items-center px-8 py-4"
//         initial={{ y: -80 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-2xl font-bold text-blue-400">MyBrand</h1>
//         <ul className="flex gap-6 text-gray-300">
//           <li className="hover:text-blue-400 cursor-pointer">Home</li>
//           <li className="hover:text-blue-400 cursor-pointer">About</li>
//           <li className="hover:text-blue-400 cursor-pointer">Services</li>
//           <li className="hover:text-blue-400 cursor-pointer">Contact</li>
//         </ul>
//       </motion.nav>

//       {/* Hero Section */}
//       <main className="flex-1 flex flex-col items-center justify-center text-center p-6 relative z-10">
//         <motion.h1
//           className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,255,0.8)]"
//           initial={{ opacity: 0, y: -80 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Welcome to Homepage5
//         </motion.h1>

//         <motion.p
//           key={index}
//           className="text-2xl md:text-3xl text-purple-400 font-semibold h-10"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           {words[index]} ✨
//         </motion.p>
//       </main>

//       {/* Features Section */}
//       <section className="py-20 relative z-10">
//         <motion.h2
//           className="text-4xl font-bold text-center mb-12 text-blue-400"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           Our Features
//         </motion.h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-6">
//           {features.map((f, i) => (
//             <Tilt glareEnable={true} glareColor="#00f" glareMaxOpacity={0.4} key={i}>
//               <motion.div
//                 className="p-8 rounded-2xl bg-gray-800/60 border border-gray-700 hover:shadow-[0_0_30px_rgba(0,200,255,0.6)] text-center"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2, duration: 0.8 }}
//               >
//                 <i className={`bi ${f.icon} text-5xl text-blue-400 mb-4`}></i>
//                 <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
//                 <p className="text-gray-300">{f.desc}</p>
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="backdrop-blur-xl bg-white/5 border-t border-gray-700 py-12 relative z-10">
//         <div className="container mx-auto text-center">
//           <motion.h2
//             className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//           >
//             Connect With Us
//           </motion.h2>

//           {/* Social Icons */}
//           <div className="flex justify-center gap-10 flex-wrap">
//             {socialLinks.map((link, index) => (
//               <motion.a
//                 key={index}
//                 href={link.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="relative text-5xl group"
//                 whileHover={{ scale: 1.4, rotate: 12 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <i
//                   className={`bi ${link.icon}`}
//                   style={{
//                     color: link.color,
//                     textShadow: `0 0 20px ${link.color}, 0 0 40px ${link.color}`,
//                   }}
//                 ></i>
//                 <span
//                   className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition duration-500"
//                   style={{ backgroundColor: link.color }}
//                 ></span>
//               </motion.a>
//             ))}
//           </div>

//           <motion.p
//             className="mt-8 text-gray-400 text-sm"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             © {new Date().getFullYear()} Your Company. All rights reserved.
//           </motion.p>
//         </div>
//       </footer>
//     </div>
//   );
// }

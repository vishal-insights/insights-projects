"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import './styles/home.css';
import AnimatedButton from "./components/AnimatedButton";
import Contact from "./components/Contact";
import Homepage2 from "./components/Homepage2";
import Homepage3 from "./components/Homepage3";
import Homepage4 from "./components/Homepage4";
// import Homepage5 from "./components/Homepage5";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        {/* 🔹 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/bgbg.mp4" type="video/mp4" />
        </video>

        {/* 🔹 Main Content (Navbar + others) */}
        <div className="relative z-10">
          <Navbar />

          {/*  Welcome Screen*/}
          <div className="mobile-welcome-screen">
            <div className="mobile-welcome-content">
              <p className="mobile-welcome-sub">Welcome to</p>
              <h1 className="mobile-welcome-title">SK Dwivedi<br />& Associates</h1>
              <p className="mobile-welcome-tagline">Where Expertise Meets Unmatched Excellence</p>
            </div>
          </div>

          {/* DESKTOP*/}
          <div className="desktop-only">
            {/* 🔹 Heading Section */}
            <div className="bg-black/20 flex items-center justify-center px-4 mt-10">
              <div className="text-center text-white">
                <h1 className="text-4xl font-extrabold leading-tight mb-4 text-gradient bg-clip-text">
                  Introducing SK Dwivedi and Associates
                </h1>
                <p className="text-2xl font-semibold leading-relaxed mb-8 text-amber-200 flex items-center justify-center relative">
                  <i className="bi bi-bar-chart text-4xl mr-3 text-amber-200"></i>
                  <span className="relative">
                    Where Expertise Meets Unmatched Excellence
                    <span className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-black via-gray-950 to-black animate-glowing-underline"></span>
                  </span>
                </p>
              </div>
            </div>

            {/* 🔹 Boxes Section */}
            <div className="flex justify-center gap-8 pt-5 px-4">
              {/* Box 1 */}
              <div className="flex-1 p-12 bg-black/80 text-white rounded-lg relative text-center hover:bg-black/95">
                <div className="gradient-border"></div>
                <h2 className="text-2xl font-extrabold leading-tight mb-4 bg-clip-text text-white hover:text-white">
                  Trusted Company Secretary & Legal Advisory Services in India
                </h2>
                <p className="text-base leading-relaxed text-amber-200 mb-2">
                  Compliance | Governance | Corporate Advisory
                </p>
                <p className="text-base leading-relaxed text-amber-200 mb-2">
                  Welcome to our Legal Advisory Firm – Professional. Reliable. Trusted.
                </p>
                <p className="text-base leading-relaxed text-amber-200 mb-2">
                  Providing Expert Legal Solutions with a Focus on Corporate Law & Secretarial Services.
                </p>
                <p className="text-base leading-relaxed text-amber-200">
                  Empowering Startups, SMEs, and Corporates with End-to-End Legal Compliance.
                </p>
                <div className="mt-4">
                  <AnimatedButton />
                </div>
              </div>

              {/* Box 2 with Background Video */}
              <div className="flex-1 p-8 text-white rounded-lg relative overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-lg"
                >
                  <source src="/videos/triangle.mp4" type="video/mp4" />
                </video>
                <div className="gradient-border"></div>
                <div className="relative z-20">
                  <div className="absolute inset-0 border-2 border-transparent rounded-lg bg-clip-border border-solid pointer-events-none"></div>
                  <div className="relative text-center p-4">
                    <h2 className="text-xl font-bold mb-2">
                      Dynamic Legal Solutions
                    </h2>
                    <p className="text-base text-amber-200">
                      Revolutionizing how companies manage compliance, governance, and growth through tailored legal strategies.
                    </p>
                    <div className="mt-32">
                      <Contact />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END DESKTOP / TABLET */}

        </div>
      </div>

      {/* After scrolling */}
      <div><Homepage2 /></div>
      <div><Homepage3 /></div>
      <div><Homepage4 /></div>
      {/* <div><Homepage5 /></div> */}

      {/* MOBILE-ONLY STYLES */}
      <style jsx global>{`

        /* --- Mobile Welcome: hidden by default (desktop sees nothing) --- */
        .mobile-welcome-screen {
          display: none;
        }

        /* --- Desktop content: visible by default --- */
        .desktop-only {
          display: block;
        }

        @media (max-width: 640px) {

          /* Show welcome screen on mobile */
          .mobile-welcome-screen {
            display: none;
            align-items: center;
            justify-content: center;
            height: calc(100svh - 70px);
            padding: 2rem 1.5rem;
            text-align: center;
          }

          .mobile-welcome-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
          }

          .mobile-welcome-sub {
            font-size: 1rem;
            color: #fde68a;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            font-weight: 500;
          }

          .mobile-welcome-title {
            font-size: 2.2rem;
            font-weight: 900;
            color: #ffffff;
            line-height: 1.15;
          }

          .mobile-welcome-tagline {
            font-size: 0.95rem;
            color: #fbbf24;
            font-style: italic;
            margin-top: 0.5rem;
            max-width: 280px;
          }

          /* Hide all desktop content on mobile */
          .desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
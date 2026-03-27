"use client";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">

      {/* Ambient glow background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24">

        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#60a5fa" }}
          >
            Company Secretarial Services · Mumbai, India
          </p>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5"
            style={{
              fontFamily: "'Georgia', serif",
              textShadow: "0 0 50px rgba(59,130,246,0.45)",
            }}
          >
            S K Dwivedi
            <br />
            <span
              className="text-2xl sm:text-3xl lg:text-4xl font-normal"
              style={{ color: "#60a5fa" }}
            >
              &amp; Associates
            </span>
          </h1>
          <div
            className="mx-auto h-[2px] w-32 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #3b82f6, transparent)",
            }}
          />
        </div>

        {/* About Bio Card */}
        <div
          className="rounded-2xl p-7 sm:p-10 mb-10"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
            border: "1px solid rgba(59,130,246,0.2)",
            boxShadow: "0 0 40px rgba(59,130,246,0.08)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.3)",
                boxShadow: "0 0 12px rgba(59,130,246,0.2)",
              }}
            >
              <i
                className="bi bi-person-badge-fill text-lg"
                style={{ color: "#60a5fa", filter: "drop-shadow(0 0 6px rgba(96,165,250,0.8))" }}
              />
            </div>
            <p
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#3b82f6" }}
            >
              About Us
            </p>
          </div>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-5">
            I am a practicing{" "}
            <span className="text-white font-semibold">Company Secretary</span> based in Mumbai,
            India, specializing in providing a comprehensive range of professional services to
            ensure legal compliance, corporate governance, and efficient management of corporate
            affairs.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            With deep expertise in corporate law and regulatory frameworks, S K Dwivedi &amp;
            Associates is committed to delivering precise, reliable, and client-centric
            professional services. Whether you are a startup or an established enterprise, we
            guide you through every step of your compliance journey.
          </p>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mt-7">
            {[
              "Corporate Governance",
              "Legal Compliance",
              "Company Registration",
              "ROC Filings",
              "Board Secretarial",
              "Due Diligence",
              "FEMA & RBI Compliance",
              "Corporate Restructuring",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                  color: "#93c5fd",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {[
            {
              icon: "bi-geo-alt-fill",
              label: "Office Address",
              lines: [
                "32, Bhardawadi Rd, Navneeth Colony,",
                "Andheri West, Mumbai,",
                "Maharashtra 400053, India",
              ],
            },
            {
              icon: "bi-telephone-fill",
              label: "Phone",
              lines: ["+919699981283"],
            },
            {
              icon: "bi-envelope-fill",
              label: "Email",
              lines: ["office@skdassociate.com/"],
            },
            {
              icon: "bi-clock-fill",
              label: "Working Hours",
              lines: ["Mon – Sat: 10:00 AM – 7:00 PM", "Sunday: Closed"],
            },
          ].map((card, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl p-5 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                border: "1px solid rgba(59,130,246,0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(59,130,246,0.22)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.18)";
              }}
            >
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  boxShadow: "0 0 12px rgba(59,130,246,0.2)",
                }}
              >
                <i
                  className={`bi ${card.icon} text-lg`}
                  style={{
                    color: "#60a5fa",
                    filter: "drop-shadow(0 0 6px rgba(96,165,250,0.8))",
                  }}
                />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-1"
                  style={{ color: "#3b82f6" }}
                >
                  {card.label}
                </p>
                {card.lines.map((line, j) => (
                  <p key={j} className="text-sm text-gray-300 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Connect */}
        <div
          className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row sm:items-center gap-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(59,130,246,0.18)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-widest uppercase flex-shrink-0"
            style={{ color: "#3b82f6" }}
          >
            Connect With Us
          </p>
          <div className="flex gap-4">
            {[
              { icon: "bi-linkedin",      label: "LinkedIn",  href: "https://linkedin.com/in/YOUR_PROFILE" }, // 👈 LinkedIn URL yahan lagao
              { icon: "bi-envelope-fill", label: "Email",     href: "mailto:YOUR_EMAIL@example.com" },        // 👈 Email yahan lagao
              { icon: "bi-whatsapp",      label: "WhatsApp",  href: "https://wa.me/919699981283" },           // 👈 WhatsApp number yahan lagao
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.25)";
                  e.currentTarget.style.boxShadow = "0 0 14px rgba(59,130,246,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                aria-label={s.label}
              >
                <i
                  className={`bi ${s.icon}`}
                  style={{
                    color: "#60a5fa",
                    filter: "drop-shadow(0 0 5px rgba(96,165,250,0.7))",
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
        <div
          className="rounded-2xl overflow-hidden mb-10"
          style={{
            border: "1px solid rgba(59,130,246,0.2)",
            boxShadow: "0 0 30px rgba(59,130,246,0.07)",
          }}
        >
          <div
            className="px-6 py-4 flex items-center gap-2"
            style={{
              borderBottom: "1px solid rgba(59,130,246,0.15)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <i
              className="bi bi-map-fill"
              style={{ color: "#60a5fa", filter: "drop-shadow(0 0 5px rgba(96,165,250,0.8))" }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "#3b82f6" }}
            >
              Our Location
            </span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.3!2d72.8311!3d19.1332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63e2e!2sBhardawadi%20Rd%2C%20Navneeth%20Colony%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400053!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="300"
            style={{
              border: 0,
              filter: "invert(90%) hue-rotate(200deg) saturate(0.6) brightness(0.85)",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>

        {/* Footer */}
        <div className="text-center">
          <div
            className="h-px w-48 mx-auto mb-5"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)",
            }}
          />
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} S K Dwivedi &amp; Associates. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 mt-1">Company Secretary · Mumbai, India</p>
        </div>

      </div>
    </main>
  );
}
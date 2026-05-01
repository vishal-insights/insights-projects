'use client'
import React from 'react'
import LaserFlow from '@/components/LaserFlow'

const Homepage3 = () => {
  return (
    <section className="relative bg-black overflow-hidden min-h-[500px] md:min-h-[650px] hidden md:block">

      {/* 🔥 LaserFlow Background */}
      <div className="hidden md:block absolute inset-0 z-0 scale-110 -translate-y-20">
        <LaserFlow
          horizontalBeamOffset={0.15}
          verticalBeamOffset={-0.2}
          color="#4361EE"
          flowSpeed={0.35}
          flowStrength={0.25}
          fogIntensity={0.5}
        />
      </div>

      {/* 🔥 Dark overlay for smooth look */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* 📱 Mobile fallback */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />

      {/* 🔥 Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 mt-145 ml-73">

        <div className="bg-[#060010]/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6 sm:p-8 md:p-10 text-center">

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Why Compliance Starts With Us
          </h1>

          <hr className="w-16 sm:w-24 border-t-2 border-blue-600 mx-auto my-4" />

          <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium mb-3">
            Led by Founder 
            <span className="text-blue-500"> CS Shailendra Dwivedi</span>, CS, LLB, BCom
          </p>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
            We are one of Mumbai’s leading corporate legal firms with over 12 years of experience.
            We provide expert guidance to keep your business compliant and growing.
          </p>

          <p className="text-sm md:text-base text-orange-500">
            We focus on personalised legal solutions tailored to each client’s needs.
          </p>

        </div>
      </div>

    </section>
  )
}

export default Homepage3
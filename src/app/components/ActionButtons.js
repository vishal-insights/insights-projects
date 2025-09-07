'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import GradientText from './GradientText'


export default function AuthPage() {
  const [showLoginOptions, setShowLoginOptions] = useState(false)
  
  return (
    <>

      <div className="mt-45 text-3xl">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
          >



          
          <i className="bi-lock-fill text-5xl"></i>

        </GradientText>


        <span><GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
          >
          secure Login

        </GradientText></span>


      </div>
      <div className="flex-1 bg- mt-20 flex flex-col items-center justify-center px-45">


        Shield Icon
        <div className="text-9xl text-blue-800">
          <i className="bi-person-lock"></i>
        </div>

        {/* Title */}
        <div className="mt-2 text-lg">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
            >
            Login / Register

          </GradientText>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">

          {/* Login with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLoginOptions(!showLoginOptions)}
              className="flex items-center gap-2 px-6 py-2 rounded-full text-white font-bold text-sm
              bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
              hover:scale-105 transform transition-all duration-500
              shadow-lg hover:shadow-xl"
              >
              <i className="bi bi-box-arrow-in-right"></i>
              Login
            </button>

            {showLoginOptions && (
              <div className="absolute mt-2 left-0 bg-white rounded-md w-40 shadow-lg z-10">
                <Link
                  href="/login/client"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-amber-600 transition-colors"
                  >
                  Client Login
                </Link>
                <Link
                  href="/login/admin"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-amber-600 transition-colors"
                  >
                  Admin Login
                </Link>
              </div>
            )}
          </div>

          {/* Register Button */}
          <Link
            href="/register"
            className="flex items-center gap-2 px-8 py-2 rounded-full text-white font-bold text-sm
            bg-gradient-to-r from-green-400 via-blue-500 to-indigo-500
            hover:scale-105 transform transition-all duration-500
            shadow-lg hover:shadow-xl"
            >
            <i className="bi bi-person-plus"></i>
            Register
          </Link>

          {/* Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-2 rounded-full text-white font-bold text-sm
            bg-gradient-to-r from-fuchsia-500 via-pink-500 to-green-500
            hover:scale-105 transform transition-all duration-500
            shadow-lg hover:shadow-xl"
            >
            <i className="bi bi-house-door"></i>
            Home
          </Link>
        </div>
      </div>
    </>
  )
}

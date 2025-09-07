"use client"
import React from 'react'
import Link from 'next/link'
import ActionButtons from '../components/ActionButtons'
import Navbar2 from '../components/Navbar2'
import { ReactTyped } from "react-typed";
import GradientText from '../components/GradientText'
import ElectricBorder from '../components/ElectricBorder'
import TargetCursor from '../components/TargetCursor'


const Page = () => {
  return (
  
    <>
    <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={false}
      />
      <ElectricBorder
            color="#00f5ff"
            speed={1}
            chaos={1}
            thickness={4}
            style={{
              borderRadius: 12,
              backgroundColor: "black"
            }}
          >
        <div className='flex justify-around h-screen'>


          <div className='flex-1 bg-gray-950 text-amber-400'>


            <h1 className='flex items-center justify-center  text-4xl mt-50'>S K Dwivedi & Associates</h1>

            <div className="flex items-center justify-center mt-8 text-xl text-white">
              <ReactTyped
                strings={[
                  "(Compliance | Governance | Corporate Advisory)",
                  "Welcome to our Legal Advisory Firm Professional. Reliable. Trusted",
                  "Providing Expert Legal Solutions",
                ]}
                typeSpeed={50}
                backSpeed={20}
                loop

              />

            </div>
            <div className="flex items-center justify-center mt-2 text-gray-300 text-lg">
              Your Trusted Partner in Corporate Law & Compliance & Secretrial Services
              
            </div>
          <div>
            
          </div>

            <div className="flex items-center justify-center mt-10 text-8xl">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
              >
                <i className="bi bi-person-circle"></i>

              </GradientText>
            </div>

          </div>

          <ElectricBorder
            color="#00f5ff"
            speed={1}
            chaos={0.5}
            thickness={4}
            style={{
              borderRadius: 12,
              backgroundColor: "black"
            }}
          >
            <div



              className="relative bg-cover bg-center"
              style={{
                backgroundBlendMode: "overlay",     
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >

              <ActionButtons />

            </div>

          </ElectricBorder>
        </div>
      </ElectricBorder>
    </>
  )
}

export default Page


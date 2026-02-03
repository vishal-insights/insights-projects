"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Building2, MapPin } from "lucide-react";
import LaserFlow from "@/components/LaserFlow";

export default function OfficesSection() {
  const [offices, setOffices] = useState([
    {
      city: "Head Office",
      address: "32, Bhardawadi Rd,Navneeth Colony, Andheri West,Mumbai Maharashtra 400053,India.",
      position: { top: "60%", left: "26%" },
    },
    {
      city: "Mumbai",
      address: "5 th floor,Kamar Building,34,38,Cawasji patel Rd,Fort,Mumbai 000014,Maharastra",
      position: { top: "60%", left: "26%" },
    },
    {
      city: "Delhi",
      address: "714, Vishwadeep Building, Plot No. 4,District Centre, Janak Puri, NewDelhi,West Delhi DL 110058.",
      position: { top: "33%", left: "38%" },
    },
    {
      city: "Noida",
      address: "S-15, Shree Jee Complex Sharma Market,Sector-5 Noida -201301,Noida Uttar pradesh",
      position: { top: "36%", left: "43%" },
    },
    
  
  ]);

  // 🟣 Drag & Drop function
  const handleDrag = (e, i) => {
    const map = e.target.offsetParent.getBoundingClientRect();
    const newTop = ((e.clientY - map.top) / map.height) * 100;
    const newLeft = ((e.clientX - map.left) / map.width) * 100;

    const updated = [...offices];
    updated[i].position.top = `${newTop.toFixed(2)}%`;
    updated[i].position.left = `${newLeft.toFixed(2)}%`;
    setOffices(updated);

    // print in console
    console.log(
      `${offices[i].city} => top: ${newTop.toFixed(2)}%, left: ${newLeft.toFixed(2)}%`
    );
  };

  return (
    <>

    <section className="relative w-full py-14 bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black animate-gradient-x opacity-70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-4xl md:text-4xlxl font-extrabold bg-gradient-to-r from-blue-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent"
        >
          Our Presence Across India
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-center text-xl text-shadow-fuchsia-100"
        >
          Connecting with you from India’s leading corporate hubs
        </motion.p>
        {/* Map + Offices */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* India Map */}
          <div className="relative w-full h-[600px] bg-slate-900 rounded-3xl overflow-hidden shadow-3xl border-2 border-b-fuchsia-500">
            <img
              src="/images/mapi.webp"
              alt="India Map"
              className="absolute inset-0 w-full h-full object-contain opacity-80"
            />
 
            {offices.map((office, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-6 bg-amber-400 rounded-full shadow-lg shadow-fuchsia-400 cursor-move"
                style={{
                  top: office.position.top,
                  left: office.position.left,
                  transform: "translate(-50%, -50%)",
                }}
                drag
                dragMomentum={false}
                onDragEnd={(e) => handleDrag(e, i)}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full"></div>
              </motion.div> 
            ))}
          </div>
           
 
          {/* Office Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {offices.map((office, i) => (
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="#6EE7B7"
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                key={i}
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 * i }}
                  whileHover={{ scale: 1.08 }}
                  className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg hover:shadow-fuchsia-500/40 transition-all duration-500"
                >
                  <div className="flex items-center justify-center mb-6">
                    <Building2 className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{office.city}</h3>
                  <p className="mt-3 flex items-center text-shadow-fuchsia-100">
                    <MapPin className="w-5 h-5 mr-2 text-fuchsia-400" />
                    {office.address}
                  </p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </section>
    
    </>
  );
}

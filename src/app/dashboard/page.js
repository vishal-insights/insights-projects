"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import AIChatbot from "../components/AIChatbot";

export default function Dashboard(){

const forms=[

{name:"AOC-4",date:"30 October",fee:"₹4,999",type:"Annual",icon:"bi-file-earmark-text"},
{name:"MGT-7 / MGT-7A",date:"29 November",fee:"₹4,999",type:"Annual",icon:"bi-journal-text"},
{name:"DIR-3 KYC",date:"30 September",fee:"₹999",type:"Annual",icon:"bi-person-badge"},
{name:"DPT-3",date:"30 June",fee:"₹2,499",type:"Annual",icon:"bi-bank"},
{name:"MSME-1",date:"30 April / 31 Oct",fee:"₹2,499",type:"Half-Year",icon:"bi-building"},
{name:"ADT-1",date:"15 days from AGM",fee:"₹1,999",type:"Event",icon:"bi-person-check"},
{name:"PAS-3",date:"30 days",fee:"₹2,999",type:"Event",icon:"bi-cash-coin"},
{name:"SH-7",date:"30 days",fee:"₹2,999",type:"Event",icon:"bi-graph-up"},
{name:"DIR-12",date:"30 days",fee:"₹2,499",type:"Event",icon:"bi-people"},
{name:"MGT-14",date:"30 days",fee:"₹2,499",type:"Event",icon:"bi-file-text"},
{name:"BEN-2",date:"30 days",fee:"₹1,999",type:"Event",icon:"bi-person-vcard"},
{name:"INC-22A",date:"As notified",fee:"₹1,999",type:"Special",icon:"bi-house-door"}

]

const [search,setSearch]=useState("")
const [filter,setFilter]=useState("All")

const filtered=forms.filter(f=>{

const matchSearch=f.name.toLowerCase().includes(search.toLowerCase())
const matchFilter=filter==="All"||f.type===filter

return matchSearch && matchFilter

})

return(
<>
<div className="min-h-screen bg-black text-white flex flex-col">

{/* HEADER */}

<header className="text-center pt-14 pb-8">

<motion.h1
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
transition={{duration:0.7}}
className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
>

S K Dwivedi & Associates

</motion.h1>

<p className="text-gray-400 mt-3 text-sm md:text-base">
Company Secretary – ROC Compliance Services
</p>

</header>

{/* SEARCH */}

<div className="flex justify-center px-6 mb-6">

<input
type="text"
placeholder="Search ROC form..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="bg-white/5 border border-blue-500/30 rounded-xl px-4 py-3 w-full max-w-sm md:max-w-md outline-none"
/>

</div>

{/* FILTER BUTTONS */}

<div className="flex justify-center gap-3 mb-12 flex-wrap px-6">

{["All","Annual","Half-Year","Event"].map((btn)=>(

<button
key={btn}
onClick={()=>setFilter(btn)}
className={`px-4 py-2 text-sm rounded-lg border transition
${filter===btn
? "bg-blue-500 text-white border-blue-400"
: "border-blue-500/30 text-gray-300 hover:border-blue-400"
}`}
>

{btn}

</button>

))}

</div>

{/* CARDS */}

<section className="max-w-6xl mx-auto px-6 pb-20 flex-grow">

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

{filtered.map((form,i)=>(

<Link key={i} href="/contact-us">

<motion.div
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.04}}
whileHover={{y:-6,scale:1.03}}
className="group bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-xl p-6 cursor-pointer backdrop-blur-lg hover:border-blue-400/60 transition flex justify-between items-center"
>

{/* LEFT CONTENT */}

<div>

<div className="h-1 w-12 bg-blue-400 rounded mb-4 group-hover:w-20 transition-all"></div>

<h2 className="text-lg font-semibold text-blue-300">
{form.name}
</h2>

<p className="text-gray-400 text-sm mt-3">Due Date</p>
<p className="text-white text-sm">{form.date}</p>

<p className="text-gray-400 text-sm mt-3">Service Fee</p>
<p className="text-green-400 font-semibold">{form.fee}</p>

<p className="text-blue-300 text-xs mt-4">
Click to file →
</p>

</div>

{/* RIGHT ICON CENTER */}

<div className="text-4xl text-blue-400 opacity-80">
<i className={`bi ${form.icon}`}></i>
</div>

</motion.div>

</Link>

))}

</div>

</section>

{/* FOOTER */}

<footer className="border-t border-blue-900">

<div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

<div>

<h3 className="text-blue-400 font-semibold text-lg">
S K Dwivedi & Associates
</h3>

<p className="text-gray-400 text-sm mt-3">
Professional Company Secretary firm providing
ROC filing and compliance services.
</p>

</div>

<div>

<h3 className="text-blue-400 font-semibold text-lg">
Services
</h3>

<ul className="text-gray-400 text-sm mt-3 space-y-2">
<li>Annual ROC Filing</li>
<li>Director KYC</li>
<li>Corporate Compliance</li>
</ul>

</div>

<div>

<h3 className="text-blue-400 font-semibold text-lg">
Contact
</h3>

<ul className="text-gray-400 text-sm mt-3 space-y-2">
<li>Email: office@skdassociates.com</li>
<li>Phone: +91 9699981283</li>
<li>India</li>
</ul>

</div>

</div>

<div className="text-center text-gray-500 text-xs pb-6">
© {new Date().getFullYear()} S K Dwivedi & Associates
</div>

</footer>

</div>
 <AIChatbot/>
</>
)

}

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import jwt from "jsonwebtoken";
// import AIChatbot from "../components/AIChatbot";
// import PDFForm from "../components/PDFForm";

// export default function Dashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) { router.push("/user-login"); return; }

//     try {
//       const decoded = jwt.decode(token);
//       setUser(decoded);
//     } catch {
//       router.push("/user-login");
//     }
//   }, []);

//   if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-400">Loading...</div>;

//   return (
//     <>
//     <div className="min-h-screen bg-black flex flex-col items-center justify-center text-blue-400 px-4">
//       <h1 className="text-4xl font-bold">Welcome, {user.email}</h1>
//       <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>
//       <p className="mt-4">This is your ultra-luxury dashboard.</p>
//     </div>
//     <div>
// <AIChatbot/>
//     </div>
//      <div>
// <PDFForm/>
//     </div>
//     </>
//   );
// }

"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOTP = async () => {
    setMessage("");
    const res = await fetch("/api/user/forgot-password", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({email}) });
    const data = await res.json();
    if (res.ok) { setStep(2); setMessage(data.message); } else setMessage(data.error);
  };

  const resetPassword = async () => {
    setMessage("");
    const res = await fetch("/api/user/reset-password", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({email, otp, newPassword}) });
    const data = await res.json();
    if (res.ok) { setMessage(data.message); setStep(3); } else setMessage(data.error);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-blue-400">
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl">
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
        {message && <p className="text-center text-green-400">{message}</p>}

        {step === 1 && (
          <>
            <input type="email" placeholder="Email" className="w-full p-3 rounded-xl bg-white/10 text-blue-400" value={email} onChange={e=>setEmail(e.target.value)} />
            <button onClick={sendOTP} className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-lg transition">Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <input type="text" placeholder="OTP" className="w-full p-3 rounded-xl bg-white/10 text-blue-400" value={otp} onChange={e=>setOtp(e.target.value)} />
            <input type="password" placeholder="New Password" className="w-full p-3 rounded-xl bg-white/10 text-blue-400" value={newPassword} onChange={e=>setNewPassword(e.target.value)} />
            <button onClick={resetPassword} className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl text-white font-semibold hover:scale-105 hover:shadow-lg transition">Reset Password</button>
          </>
        )}

        {step === 3 && (
          <p className="text-center">Password reset successful! Go to login page.</p>
        )}
      </div>
    </div>
  );
}
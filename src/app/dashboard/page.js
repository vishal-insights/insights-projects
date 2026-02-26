"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/user-login"); return; }

    try {
      const decoded = jwt.decode(token);
      setUser(decoded);
    } catch {
      router.push("/user-login");
    }
  }, []);

  if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-blue-400 px-4">
      <h1 className="text-4xl font-bold">Welcome, {user.email}</h1>
      <p className="mt-4">This is your ultra-luxury dashboard.</p>
    </div>
  );
}
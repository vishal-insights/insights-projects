// src/app/api/admin/login/route.js
import connect from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connect(); // MongoDB se connect
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Email and password required", { status: 400 });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return new Response("Invalid login", { status: 401 });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return new Response("Invalid login", { status: 401 });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
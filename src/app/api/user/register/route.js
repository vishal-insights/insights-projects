import connect from "@/lib/mongodb";  // points to src/lib/mongodb.js
import User from "@/models/User";      // points to src/models/User.js
import bcrypt from "bcryptjs";
export async function POST(req) {
  try {
    const { name, email, password, company } = await req.json();
    if (!name || !email || !password) return new Response(JSON.stringify({ error: "All fields required" }), { status: 400 });

    await connect();
    const existing = await User.findOne({ email });
    if (existing) return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, company });

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
import connect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json();
    if (!email || !otp || !newPassword) return new Response(JSON.stringify({ error: "All fields required" }), { status: 400 });

    await connect();
    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    if (user.resetOTP !== otp || user.otpExpires < new Date()) return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), { status: 400 });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = null;
    user.otpExpires = null;
    await user.save();

    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Admin model
const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

// Main function
async function createAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI environment variable not set!");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const name = "Super Admin";
  const email = "admin@example.com";
  const password = "Admin@123";

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log("Admin already exists!");
    process.exit(0);
  }

  const admin = new Admin({ name, email, password: hashedPassword });
  await admin.save();
  console.log("Admin created successfully!");
  process.exit(0);
}

createAdmin();
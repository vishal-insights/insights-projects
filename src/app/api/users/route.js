import connect from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET() {

try {

await connect()

const users = await User.find({})

return NextResponse.json(users)

} catch (error) {

console.error(error)

return NextResponse.json(
{ error: "Server error" },
{ status: 500 }
)

}

}
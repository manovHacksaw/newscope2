import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongoDb";
import {MongoClient} from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const client = new MongoClient((process.env.MONGO_DB_URI)?.toString());
await client.connect();

const db = await client.db("test");
const adminCollection = await db.collection("admin")

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    
    

    // Find admin by email
    const admin = await adminCollection.findOne({ email });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-only cookie with the token
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log("Hitting api/admin/auth");

  await client.connect();

  
  


    // Find admin by email
   
  
  // Check if user is authenticated
 
  
 

  try {
    // Verify the token
    
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}


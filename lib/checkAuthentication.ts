import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export default async function checkAuthentication(request: NextRequest) {
    const cookieStore = await cookies();
    const token = await cookieStore.get('token')?.value;

    // Check if the token exists
    if (!token) {
        // If no token, redirect to login page
        return false;
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

        if(decoded && decoded.adminId == process.env.ADMIN_ID){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        
    }
   

 
}

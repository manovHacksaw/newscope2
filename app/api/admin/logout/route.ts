import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully." },
      { status: 200 }
    );

    // Clear the token cookie
    response.cookies.set("token", "", {
      path: "/", // Ensure it's cleared app-wide
      httpOnly: true, // Match the original cookie's settings
      expires: new Date(0), // Expire immediately
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, message: "Failed to log out." },
      { status: 500 }
    );
  }
}

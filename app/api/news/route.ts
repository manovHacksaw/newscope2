import News from "@/models/News";
import User from "@/models/User"; // Import User model
import connectDB from "@/lib/mongoDb";
import {z} from "zod"

import { NextRequest, NextResponse } from "next/server";

const newsFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Invalid thumbnail URL"),
  videoLink: z.string().url("Invalid video URL").optional().nullable(),
  category: z.string().min(1, "Category is required"),
});

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Initialize database connection
    await connectDB();

    // Fetch news with populated author details
    const data = await News.find()
      
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        message: "News items retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve news items.",
        data: [],
      },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("HITTNG POST NEWS")
  try {
    await connectDB();

    const formData = await request.formData();
    console.log("RECIEVED", formData)
    
    // Extract form data
    const newsData = {
      title: formData.get('title'),
      description: formData.get('description'),
      thumbnail: formData.get('thumbnail'),
      videoLink: formData.get('videoLink') || null,
      category: formData.get('category'),
      // TODO: Replace with actual authenticated user ID
      author: "64f5c3d205c6a91bf751e123"
    };

    console.log("NEWS DATA" , newsData)

    // Validate the data
    const validatedData = newsFormSchema.parse(newsData);

    // Create new news entry
    const news = await News.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "News created successfully.",
        data: news,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating news:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create news item.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
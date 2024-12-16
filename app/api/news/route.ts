import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import News from "@/models/News";
import connectDB from "@/lib/mongoDb";
import checkAuthentication from "@/lib/checkAuthentication";



const newsFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().url("Invalid thumbnail URL"),
  videoLink: z.string().url("Invalid video URL").optional().nullable(),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    // Check if the user is authenticated and an admin
    const isAdmin = await checkAuthentication(request);
    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized: Only admins can create news.",
        },
        { status: 403 }
      );
    }

    const formData = await request.formData();

    // Extract form data values
    const newsData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      thumbnail: formData.get('thumbnail') as string,
      videoLink: formData.get('videoLink') as string || null,
      category: formData.get('category') as string,
      author: formData.get('author') as string || "Admin",
    };

    // Validate the data using Zod schema
    const validatedData = newsFormSchema.parse(newsData);

    // Create the new news entry in the database
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

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get("search");

    let query: any = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const data = await News.find(query).sort({ createdAt: -1 });

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
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}


import connectDB from "@/lib/mongoDb";
import News from "@/models/News";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Initialize database connection
    await connectDB();

    const Params = await params;
    console.log(params.id)

    // Fetch news item by ID
    const newsItem = await News.findById(params.id);

    if (!newsItem) {
      return NextResponse.json(
        {
          success: false,
          message: "News item not found.",
          data: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "News item retrieved successfully.",
        data: newsItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching news item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve news item.",
        data: null,
      },
      { status: 500 }
    );
  }
}


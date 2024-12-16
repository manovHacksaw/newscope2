"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor"; // Import the RichTextEditor

export default function EditNewsPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the news ID from the route params
  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoLink: "",
    category: "",
    author: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the existing news data by ID
  useEffect(() => {
    const fetchNewsData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/news/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch news data.");
        }
        const { data } = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
        toast.error("Failed to load news data.");
        router.push("/admin"); // Redirect back if the news cannot be loaded
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchNewsData();
    }
  }, [id, router]);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        throw new Error("Failed to update news.");
      }

      toast.success("News updated successfully.");
      router.push("/admin"); // Redirect to the admin dashboard after a successful update
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error("Failed to update news.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Cloudinary thumbnail upload success
  const handleThumbnailSuccess = (url: string) => {
    setNewsData((prevData) => ({
      ...prevData,
      thumbnail: url, // Update the thumbnail URL in the form data
    }));
    toast.success("Thumbnail uploaded successfully!");
  };

  if (isLoading) {
    return <p>Loading news data...</p>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit News Article</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newsData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <RichTextEditor
            content={newsData.description}
            onChange={(content: string) => setNewsData((prevData) => ({
              ...prevData,
              description: content,
            }))}
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
            Thumbnail
          </label>
          <CldUploadWidget
            uploadPreset="newthumb"
            onSuccess={({ info }) => {
              handleThumbnailSuccess(info.secure_url); // Update the thumbnail URL on success
            }}
          >
            {({ open }) => (
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-300"
                onClick={() => open()}
              >
                <Upload className="mr-2 h-4 w-4" /> Upload Thumbnail
              </Button>
            )}
          </CldUploadWidget>
          {newsData.thumbnail && (
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Thumbnail uploaded: {newsData.thumbnail}
            </p>
          )}
        </div>

        {/* Video Link */}
        <div>
          <label htmlFor="videoLink" className="block text-sm font-medium mb-2">
            Video Link (Optional)
          </label>
          <input
            type="url"
            id="videoLink"
            name="videoLink"
            value={newsData.videoLink}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={newsData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-2">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={newsData.author}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Updating..." : "Update News"}
        </button>
      </form>
    </div>
  );
}

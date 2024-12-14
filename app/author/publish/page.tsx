"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const categories = [
  "Technology",
  "Politics",
  "Sports",
  "Entertainment",
  "Business",
  "Science",
  "Health",
];

export default function CreateNews()  {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoLink: "",
    category: "",
  });

  const requestData = new FormData();
  requestData.append("title", formData.title);
  requestData.append("description", formData.description);
  requestData.append("thumbnail", formData.thumbnail);
  requestData.append("videoLink", formData.videoLink);
  requestData.append("category", formData.category);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(requestData)
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data; boundary=Myborunday",
        },
        body: requestData,
      });

      if (!response.ok) {
        throw new Error("Failed to create news");
      }

      toast.success("News created successfully!");
      router.push("/"); // Redirect to home or news list page
    } catch (error) {
      toast.error("Failed to create news");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create News Article</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter news title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter news description"
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="thumbnail" className="text-sm font-medium">
              Thumbnail URL
            </label>
            <Input
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              required
              placeholder="Enter thumbnail URL"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="videoLink" className="text-sm font-medium">
              Video Link (Optional)
            </label>
            <Input
              id="videoLink"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
              placeholder="Enter video link"
              type="url"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create News"}
          </Button>
        </form>
      </Card>
    </div>
  );
};


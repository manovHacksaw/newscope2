"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CldUploadWidget } from "next-cloudinary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Upload } from 'lucide-react';

const categories = [
  "Technology",
  "Politics",
  "Sports",
  "Entertainment",
  "Business",
  "Science",
  "Health",
];

export default function CreateNews() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoLink: "",
    category: "",
    author: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const requestData = new FormData();
    requestData.append("title", formData.title);
    requestData.append("description", formData.description);

    if (formData.thumbnail) {
      requestData.append("thumbnail", formData.thumbnail);
    }

    requestData.append("videoLink", formData.videoLink);
    requestData.append("category", formData.category);
    requestData.append("author", formData.author);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        body: requestData,
      });

      if (!response.ok) {
        throw new Error("Failed to create news");
      }

      toast.success("News created successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to create news");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center">Create News Article</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
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
              <Label htmlFor="description">Description</Label>
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
              <Label>Thumbnail</Label>
              <CldUploadWidget
                uploadPreset="newthumb"
                onSuccess={({ info }) => {
                  setFormData((prev) => ({ ...prev, thumbnail: info.secure_url }));
                  toast.success("Thumbnail uploaded successfully!");
                }}
              >
                {({ open }) => (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => open()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload Thumbnail
                  </Button>
                )}
              </CldUploadWidget>
              {formData.thumbnail && (
                <p className="text-sm text-muted-foreground">
                  Thumbnail uploaded: {formData.thumbnail}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoLink">Video Link (Optional)</Label>
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
              <Label htmlFor="category">Category</Label>
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
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Creating..." : "Create News"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


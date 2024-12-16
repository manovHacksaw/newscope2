"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all news articles
  const fetchNews = async (search = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/news?search=${search}`);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      const { data } = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to load news articles.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a news article
  const deleteNews = async (id) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete news");
      }
      toast.success("News deleted successfully.");
      fetchNews(); // Refresh the news list
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("Failed to delete news.");
    }
  };

  useEffect(() => {
    fetchNews(); // Fetch news on page load
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchQuery); // Fetch news based on the search query
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage News Articles</h1>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* News List */}
      {isLoading ? (
        <p>Loading news...</p>
      ) : newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <div
              key={news._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col items-center"
            >
              {/* Thumbnail */}
              <img
                src={news.thumbnail}
                alt={news.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 text-center">
                {news.title}
              </h2>
              <div className="flex justify-between w-full mt-2">
                {/* Edit Button */}
                <Link
                  href={`/admin/news/edit/${news._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                {/* Delete Button */}
                <button
                  onClick={() => deleteNews(news._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
}

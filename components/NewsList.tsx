"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewsCard from './NewsCard';

const ARTICLES_PER_PAGE = 12;

// Fetch News function
export async function fetchNews(category?: string, search?: string): Promise<any[]> {
  try {
    let url = "/api/news";

    const queryParams: string[] = [];

    if (category) { 
      queryParams.push(`category=${encodeURIComponent(category)}`);
    }

    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    console.log(url);

    
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
   
    return data.data; // Assuming `data` is an array of news items
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return []; // Return an empty array on error
  }
}

interface NewsListProps {
  category?: string;
  search?:string;
}

export const NewsList: React.FC<NewsListProps> = ( {category, search}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news on component mount
  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        const articles = await fetchNews(category, search);
        setNewsArticles(articles);
        setError(null);
      } catch (err) {
        setError('Failed to load news articles');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [category, search]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(newsArticles.length / ARTICLES_PER_PAGE);

  // Get the articles for the current page
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = newsArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  // Handle pagination
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            ease: "linear" 
          }}
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 text-xl py-8">
        {error}
      </div>
    );
  }

  // Empty state
  if (newsArticles.length === 0) {
    return (
      <div className="text-center text-gray-500 text-xl py-8">
        No news articles found
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
     <h2 className="text-3xl font-bold text-gray-900 mb-8 px-1">
  {category ? `Showing Latest Updates from ${category.toUpperCase()}` : search ? `Search Results for "${search}"` : "Latest News"}
</h2>
      {/* Animated News Cards Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {currentArticles.map((article) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <NewsCard article={article} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        className="flex justify-between items-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md disabled:bg-gray-400 transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
        >
          Prev
        </motion.button>

        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <motion.button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md disabled:bg-gray-400 transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          whileHover={{ scale: 1.05 }}
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  );
};
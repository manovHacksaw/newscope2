"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  thumbnail: string;
  author?: string;
  readTime?: number;
  excerpt?: string;
  link?: string;
}

interface TopReadProps {
  articles: Article[];
  autoScrollInterval?: number;
}

const TopRead: React.FC<TopReadProps> = ({ 
  articles, 
  autoScrollInterval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToArticle = useCallback((index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const articleWidth = container.querySelector('.article-item')?.clientWidth || 0;
      container.scrollTo({
        left: index * articleWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  }, []);

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
    startAutoScroll();
  };

  const startAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
    }

    autoScrollTimerRef.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % articles.length;
      scrollToArticle(nextIndex);
    }, autoScrollInterval);
  }, [currentIndex, articles.length, autoScrollInterval, scrollToArticle]);

  useEffect(() => {
    if (isAutoScrolling) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [isAutoScrolling, startAutoScroll]);

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : articles.length - 1;
    scrollToArticle(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % articles.length;
    scrollToArticle(nextIndex);
  };

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto px-4 py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-0 right-0 z-10 flex justify-between items-center -translate-y-1/2">
        <button
          onClick={handlePrevious}
          aria-label="Previous Article"
          className="bg-gray-800/50 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Article"
          className="bg-gray-800/50 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition-all"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Article Slider */}
      <div 
        ref={containerRef}
        className="flex overflow-hidden scroll-smooth"
      >
        {articles.map((article, index) => (
          <Link href={`/news/${article._id}`} key={article._id} className="article-item flex-shrink-0 w-full md:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
              {/* Image Section */}
              <div className="relative h-72 w-full group">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  width={500}  // You can set a specific width and height
                  height={500}
                  style={{ objectFit: 'cover' }}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Overlay with read more */}
                {article.link && (
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <BookOpen className="text-white w-12 h-12" />
                    </div>
                  </a>
                )}
              </div>

              {/* Article Details */}
              <div className="p-4 flex flex-col h-full">
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                
                {/* Additional article metadata */}
                <div className="flex justify-between text-sm text-gray-600 mt-auto">
                  {article.author && (
                    <span>By {article.author}</span>
                  )}
                  {article.readTime && (
                    <span>{article.readTime} min read</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRead;

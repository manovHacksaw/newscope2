import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface NewsArticle {
  _id: string;
  title: string;
  description: string; // Raw HTML content
  author: string;
  createdAt: string;
  thumbnail: string;
  category: string;
}

interface NewsCardProps {
  article: NewsArticle;
}

// Utility function to truncate HTML content while preserving tags
const truncateHtml = (htmlString: string, maxLength: number = 150): string => {
  let doc = new DOMParser().parseFromString(htmlString, 'text/html');
  let bodyText = doc.body.textContent || "";

  if (bodyText.length > maxLength) {
    bodyText = bodyText.substring(0, maxLength) + '...';
  }

  return doc.body.innerHTML = bodyText;  // Return truncated HTML
};

// Utility function to format date in 'DD MMM YYYY' format
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options);
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  // Truncate HTML description for display
  const truncatedDescription = truncateHtml(article.description, 150);

  return (
    <Link href={`/news/${article._id}`}>
      <div className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 h-full hover:bg-gray-50">
        {/* Image Section */}
        <div className="relative h-48 w-full group">
          <Image
            src={article.thumbnail}
            alt={article.title}
            width={500}  // You can set a specific width and height
            height={500}
            style={{ objectFit: 'cover' }}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 h-[calc(100%-12rem)] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors group-hover:text-blue-500">
              {article.title}
            </h2>
            
            {/* Render parsed and truncated HTML description */}
            <div
              className="text-gray-500 text-base transition-all duration-300 ease-in-out group-hover:text-gray-700"
              style={{ maxHeight: '4.5rem', overflow: 'hidden' }}
              dangerouslySetInnerHTML={{ __html: truncatedDescription }}
            />
          </div>

          {/* Author and Date */}
          <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
            <span>{article.author}</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

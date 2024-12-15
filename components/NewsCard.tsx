import Image from 'next/image';
import Link from 'next/link';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

interface NewsCardProps {
  article: NewsArticle;
}

// Utility function to trim the title to 150 characters
const truncateTitle = (title: string, maxLength: number = 150): string => {
  return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Specify options to format the date
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',    // Pad day with 0 if it's a single digit
    month: 'short',    // Use the abbreviated month name
    year: 'numeric',   // Use the full year
  };

  return date.toLocaleDateString('en-GB', options); // Using en-GB for day-month-year format
}

const formattedDate = formatDate('2024-12-09T00:00:00.000Z');
console.log(formattedDate); // Output: 09 Dec 2024


const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  console.log(article)

  return (
    <Link href={`/news/${article._id}`}> 
        <div className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 h-full hover:bg-gray-50">
      <div className="relative h-48 w-full group">
        <Image
          src={article.thumbnail}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-6 h-[calc(100%-12rem)] flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors group-hover:text-blue-500">
            {truncateTitle(article.title)}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-4 transition-all duration-300 opacity-80 group-hover:opacity-100">
            {article.description}
          </p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
          <span>{article.author}</span>
          <span>{formatDate(article.createdAt)}</span>
        </div>
      </div>
    </div></Link>

  );
};

export default NewsCard;

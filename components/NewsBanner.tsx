"use client";
import Image from 'next/image';
import Link from 'next/link';

interface NewsBannerProps {
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
  id: string;
  category: string;
}

const truncateHtml = (htmlString: string, maxLength: number = 150): string => {
  let doc = new DOMParser().parseFromString(htmlString, 'text/html');
  let bodyText = doc.body.textContent || "";

  if (bodyText.length > maxLength) {
    bodyText = bodyText.substring(0, maxLength) + '...';
  }

  return doc.body.innerHTML = bodyText;  // Return truncated HTML
};

export default function NewsBanner({
  title,
  description,
  author,
  date,
  imageUrl,
  id,
  category,
}: NewsBannerProps) {

  const truncatedDescription = truncateHtml(description, 300);

  return (
    <Link
      href={`/news/${id}`}
      className="block relative w-full group cursor-pointer mt-5 px-5"
    >
      <div className="relative w-full h-[70vh] min-h-[600px] max-h-[800px] overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-102 hover:shadow-2xl">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="object-cover  transform group-hover:scale-105 transition-transform duration-700 ease-out"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw "
          />
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8 lg:p-12">
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-red-600 text-white transform group-hover:translate-y-[-2px] transition-transform duration-300">
                {category}
              </span>
            </div>

            {/* Title with Animation */}
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 
              leading-tight tracking-tight group-hover:text-gray-300 
              transition-colors duration-300"
            >
              {title}
            </h1>

            {/* Description with Line Clamp */}
            <div
              className="text-gray-300 my-2 text-base transition-all duration-300 ease-in-out group-hover:text-gray-700"
              style={{ maxHeight: '4.5rem', overflow: 'hidden' }} // Truncate with overflow hidden
              dangerouslySetInnerHTML={{ __html: truncatedDescription }}
            />

            {/* Author and Date Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{author}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300/60"></span>
              <time className="text-gray-300/90">{date}</time>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { notFound } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { BackLink } from "@/components/BackLink";
import { ArticleMeta } from "@/components/ArticleMeta";
import { VideoEmbed } from "@/components/VideoEmbed";
import { remark } from "remark";
import html from "remark-html";

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(/\s+/).length; // Count words by splitting on whitespace
  const readTime = Math.ceil(wordCount / wordsPerMinute); // Calculate and round up
  return `${readTime} min`;
}

export async function parseMarkdownToHtml(markdown: string) {
  const file = await remark().use(html).process(markdown);
  return file.toString();
}

async function getNewsArticle(id: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${id}` 
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch news article");
  return (await res.json()).data;
}

export default async function NewsArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  let newsArticle;

  try {
    newsArticle = await getNewsArticle(id);
  } catch (error) {
    console.error(error);
    notFound(); // Redirect to a 404 page if the article fetch fails
  }

  if (!newsArticle) {
    notFound();
  }

  // Calculate the read time using the article content
  const readTime = calculateReadTime(newsArticle.description);
  console.log(newsArticle.description)
  const parsedDescription = await parseMarkdownToHtml(newsArticle.description
  );

  console.log(parsedDescription)

  return (
    <main className="container relative mx-auto max-w-4xl px-6 py-8">
      <div className="mb-8">
        <BackLink />
      </div>

      <article className="space-y-8">
        {/* Hero Image */}
        {newsArticle.thumbnail && (
          <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
            <Image
              src={newsArticle.thumbnail}
              alt={`Thumbnail for ${newsArticle.title}`}
              width={1200}
              height={800}
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <Card className="border-none p-8 shadow-lg">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="font-heading text-4xl font-bold tracking-tight lg:text-5xl">
              {newsArticle.title}
            </h1>

            {/* Meta Information */}
            <ArticleMeta
              date={newsArticle.createdAt}
              category={newsArticle.category}
              readTime={readTime} // Pass calculated read time
            />

            {/* Content */}
            <div
              className="prose prose-gray color-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: newsArticle.description }} // Render parsed markdown as HTML
            ></div>

            {/* Video Embed */}
            {newsArticle.videoLink && (
              <div className="mt-8">
                <VideoEmbed
                  url={newsArticle.videoLink}
                  title={newsArticle.title}
                />
              </div>
            )}
          </div>
        </Card>
      </article>
    </main>
  );
}

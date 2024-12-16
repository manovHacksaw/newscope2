
import NewsBanner from "@/components/NewsBanner";
import { NewsList } from "@/components/NewsList";
import TopRead from "@/components/TopRead";
import { fetchNews } from "@/utils/newsArticles";

interface Article {
  _id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  thumbnail: string;
  slug: string;
  category: string;
}


export default async function Home() {
  const news =(await fetchNews());

  const getRandomArticle = (articles: Article[]) => {
    const randomIndex = Math.floor(Math.random() * articles.length);
    return articles[randomIndex];
  };

const randomArticle = getRandomArticle(news.slice(0, 5));

 
  // Example array of top news articles. You should fetch these from an API or state.
  const topArticles =news;


  return (
    <main className="container mx-auto min-h-screen">
      <div className="lg:m-5 rounded-3xl">
        <NewsBanner  title={randomArticle.title}
        description={randomArticle.description}
        author={randomArticle.author}
        date={randomArticle.date}
        imageUrl={randomArticle.thumbnail}
       id={randomArticle._id}
        category={randomArticle.category} />
      </div>

      <div className="container mx-auto px-4 py-12">
        <NewsList />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 pl-14">Top Read</h2>
        <TopRead articles={topArticles} />
      </div>
    </main>
  );
}


import NewsBanner from "@/components/NewsBanner";
import { NewsList } from "@/components/NewsList";
import TopRead from "@/components/TopRead";
import { fetchNews } from "@/utils/newsArticles";


export default async function Home() {
  const news =(await fetchNews());
 
  // Example array of top news articles. You should fetch these from an API or state.
  const topArticles =news;


  return (
    <main className="container mx-auto min-h-screen">
      <div className="lg:m-5 rounded-3xl">
        <NewsBanner />
      </div>

      <div className="container mx-auto px-4 py-12">
        <NewsList />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Read</h2>
        <TopRead articles={topArticles} />
      </div>
    </main>
  );
}

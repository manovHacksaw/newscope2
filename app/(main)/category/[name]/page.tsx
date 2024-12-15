import { NewsList } from '@/components/NewsList';
import { categories } from '@/utils/categories';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
}: {
  params: { name: string };
}) {
  const Params = await params;
  const category = Params.name.toLowerCase(); // Ensure case-insensitive matching.

  const validCategories = categories.map((c) => c.name.toLowerCase());

  if (!validCategories.includes(category)) {
    notFound(); // Trigger a 404 if the category is invalid.
  }

  return (
    <div className="container mx-auto px-4 py-8">
     
      <NewsList category={category} />
    </div>
  );
}

// Generate static params for all valid categories
export async function generateStaticParams() {
  const categories = [
    'politics',
    'sports',
    'technology',
    'health',
    'business',
    'entertainment',
    'science',
    'world',
    'lifestyle',
  ];
  return categories.map((name) => ({
    name, // Ensure it matches the dynamic segment `[name]`.
  }));
}

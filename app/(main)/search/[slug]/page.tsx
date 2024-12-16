import { NewsList } from '@/components/NewsList'
import React from 'react'

export default async function SearchResults({
  params,
}: {
  params: { slug: string };
}) {
  const Params = await params;
  const query = Params.slug;

  return (
    <div className="container mx-auto px-4 py-8">
    
      <NewsList search={query} />
    </div>
  )
}

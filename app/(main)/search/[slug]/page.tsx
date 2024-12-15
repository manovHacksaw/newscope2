import { NewsList } from '@/components/NewsList'
import React from 'react'

export default function SearchResults({ params }: { params: { query: string } }) {
  const decodedQuery = decodeURIComponent(params.query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{decodedQuery}"</h1>
      <NewsList search={decodedQuery} />
    </div>
  )
}

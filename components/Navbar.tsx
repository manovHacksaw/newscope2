'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import Categories from './Categories'
import { categories } from '@/utils/categories'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
    
      router.push(`/search/${searchQuery}`)
    }
  }

  return (
    <header>
      <div className="bg-gray-100 text-red-500 p-4">
        <div className="container mx-auto px-5 flex justify-between items-center">
          <Link href={"/"}>
            <div className="flex items-center cursor-pointer">
              <Image src="/navLogo.png" height={150} width={150} alt="Newscope" className="w-auto h-auto" />
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-6 py-2.5 shadow-sm w-[480px]">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search News..."
              className="focus:outline-none w-full text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-950"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navbar with Animation */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white border-t border-gray-200`}
      >
        <div className="container mx-auto px-5 py-4">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 mb-4">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search News..."
              className="bg-transparent focus:outline-none w-full text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          {/* Mobile Navigation Links */}
          <nav>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href} className="block text-gray-600 hover:text-red-500 py-2">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:block sticky top-0 z-10 bg-gray-800">
        <Categories categories={categories} />
      </div>
    </header>
  )
}


'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, Heart } from 'lucide-react'

export default function Navbar() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue)}`)
      setSearchValue('')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-[#374151]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#FCD34D] to-[#F59E0B] bg-clip-text text-transparent group-hover:from-[#F59E0B] group-hover:to-[#FCD34D] transition-all">
            Universo cinematográfico
          </div>
        </Link>

        {/* Search Bar */}
        {isMounted && (
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-[#111827] border border-[#374151] rounded-lg text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none focus:border-[#FCD34D] focus:ring-1 focus:ring-[#FCD34D] transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-[#D1D5DB]" size={18} />
            </div>
          </form>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search */}
          <Link
            href="/search"
            className="md:hidden p-2 hover:bg-[#111827] rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="text-[#F3F4F6]" size={20} />
          </Link>

          {/* Favorites Link */}
          <Link
            href="/favorites"
            className="flex items-center gap-2 px-3 py-2 hover:bg-[#111827] rounded-lg transition-colors"
            aria-label="Favorites"
          >
            <Heart className="text-[#FCD34D]" size={20} />
            <span className="hidden sm:inline text-sm font-medium">Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

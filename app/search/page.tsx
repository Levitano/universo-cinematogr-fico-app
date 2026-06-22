'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import {MovieCardSkeleton} from '@/components/SkeletonLoader'
import { searchMovies } from '@/lib/api'
import type { Movie } from '@/lib/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => {
    if (query.trim()) {
      const fetchResults = async () => {
        setLoading(true)
        setError('')
        try {
          const results = await searchMovies(query)
          setMovies(results)
          if (results.length === 0) {
            setError(`No movies found for "${query}"`)
          }
        } catch (err) {
          setError('Failed to search movies. Please try again.')
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      fetchResults()
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-6 py-3 rounded-lg bg-[#111827] border border-[#374151] text-[#F3F4F6] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FCD34D]"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#FCD34D] text-[#0B0F19] rounded-lg font-semibold hover:bg-[#F59E0B] transition-colors"
            >
              Pesquisar
            </button>
          </div>
        </form>

        {/* Results Header */}
        {query && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Resultados da Pesquisa para <span className="text-[#FCD34D]">"{query}"</span>
            </h1>
            <p className="text-[#D1D5DB] mt-2">
              {loading ? 'Searching...' : `Found ${movies.length} movie${movies.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg mb-4">{error}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#FCD34D] text-[#0B0F19] rounded-lg font-semibold hover:bg-[#F59E0B] transition-colors"
            >
              Voltar para Home
            </Link>
          </div>
        )}

        {/* Results Grid */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="transform transition-all duration-200 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg">Nenhum filme encontrado. Tente uma busca diferente.</p>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg">Pesquise por um filme para começar</p>
          </div>
        )}
      </main>
    </div>
  )
}

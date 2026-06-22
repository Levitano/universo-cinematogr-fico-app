'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import MovieCard from '@/components/MovieCard'
import { useFavorites } from '@/lib/hooks'
import { getTrendingMovies } from '@/lib/api'
import type { Movie } from '@/lib/types'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // In a real app, you'd fetch specific movies by ID
        // For now, we'll load all trending movies and filter by favorites
        const allMovies = await getTrendingMovies('week')
        const filtered = allMovies.filter((movie) => favorites.includes(movie.id))
        setFavoriteMovies(filtered)
      } catch (error) {
        console.error('Failed to load favorites:', error)
      } finally {
        setLoading(false)
      }
    }
    loadFavorites()
  }, [favorites])

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-2">Meus Favoritos</h1>
        <p className="text-[#D1D5DB] mb-8">
          {favoriteMovies.length} filmes{favoriteMovies.length !== 1 ? 's' : ''} saved
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB]">Carregando...</p>
          </div>
        ) : favoriteMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {favoriteMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="transform transition-all duration-200 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg mb-4">Não há filmes favoritos</p>
            <p className="text-[#9CA3AF] mb-8">Adicione filmes aos seus favoritos para vê-los aqui</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#FCD34D] text-[#0B0F19] rounded-lg font-semibold hover:bg-[#F59E0B] transition-colors"
            >
              Explorar Filmes
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

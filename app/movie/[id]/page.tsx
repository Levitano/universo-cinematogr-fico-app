'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { MovieDetailSkeleton } from '@/components/SkeletonLoader'
import { getMovieDetails, getMovieCredits, getMovieVideos } from '@/lib/api'
import { useFavorites } from '@/lib/hooks'
import type { MovieDetails, Cast, Video } from '@/lib/types'

export default function MovieDetailPage() {
  const params = useParams()
  const movieId = params.id as string
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [credits, setCredits] = useState<Cast[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  const isFavorited = favorites.includes(parseInt(movieId))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
        ])
        setMovie(movieData)
        setCredits(creditsData)
        setVideos(videosData)
      } catch (err) {
        setError('Failed to load movie details.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [movieId])

  const toggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(parseInt(movieId))
    } else {
      addFavorite(parseInt(movieId))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <MovieDetailSkeleton />
            <MovieDetailSkeleton />
          </div>
        </main>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-[#D1D5DB] text-lg mb-4">{error || 'Movie not found'}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#FCD34D] text-[#0B0F19] rounded-lg font-semibold hover:bg-[#F59E0B]"
            >
              Voltar para Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const trailer = videos.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.png'
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : '/placeholder.png'

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Backdrop */}
        <div className="relative h-96 -mx-4 sm:-mx-6 lg:-mx-8 mb-8 rounded-lg overflow-hidden">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Movie Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="relative h-96 rounded-lg overflow-hidden mb-4 shadow-lg">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <button
                onClick={toggleFavorite}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isFavorited
                    ? 'bg-[#FCD34D] text-[#0B0F19] hover:bg-[#F59E0B]'
                    : 'bg-[#111827] text-[#FCD34D] border border-[#FCD34D] hover:bg-[#FCD34D] hover:text-[#0B0F19]'
                }`}
              >
                {isFavorited ? '★ Favorito' : '☆ Adicionar aos Favoritos'}
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="text-[#D1D5DB] text-lg mb-4">
              {movie.release_date && new Date(movie.release_date).getFullYear()}
              {movie.runtime && ` • ${movie.runtime} min`}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#FCD34D]">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-xl">
                      {i < Math.round(movie.vote_average / 2) ? '★' : '☆'}
                    </span>
                  ))}
              </div>
              <span className="text-[#D1D5DB]">{movie.vote_average.toFixed(1)}/10</span>
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-[#D1D5DB] mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-[#111827] border border-[#374151] rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-wider text-[#D1D5DB] mb-2">Overview</h3>
              <p className="text-[#D1D5DB] leading-relaxed">{movie.overview}</p>
            </div>

            {/* Trailer */}
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-[#FCD34D] text-[#0B0F19] rounded-lg font-semibold hover:bg-[#F59E0B] transition-colors"
              >
                ▶ Assistir trailer
              </a>
            )}
          </div>
        </div>

        {/* Cast */}
        {credits.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {credits.slice(0, 12).map((actor) => (
                <div
                  key={actor.id}
                  className="bg-[#111827] rounded-lg overflow-hidden border border-[#374151]"
                >
                  {actor.profile_path ? (
                    <div className="relative h-48 mb-3">
                      <Image
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-[#1F2937] flex items-center justify-center mb-3">
                      <span className="text-[#9CA3AF]">Foto não disponível</span>
                    </div>
                  )}
                  <div className="p-3">
                    <p className="font-semibold text-sm truncate">{actor.name}</p>
                    <p className="text-xs text-[#D1D5DB] truncate">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

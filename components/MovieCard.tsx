'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl, type Movie } from '@/lib/api'
import { Heart } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
  isFavorite?: boolean
  onToggleFavorite?: (movie: Movie) => void
}

export default function MovieCard({
  movie,
  isFavorite = false,
  onToggleFavorite,
}: MovieCardProps) {
  const [imageError, setImageError] = useState(false)

  const posterUrl = getImageUrl(movie.poster_path, 'w500')
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite?.(movie)
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="group relative w-full max-w-xs cursor-pointer">
        {/* Card Container */}
        <div className="card-premium relative overflow-hidden hover-lift">
          {/* Poster Image */}
          <div className="relative h-64 w-full overflow-hidden bg-[#1F2937]">
            {posterUrl && !imageError ? (
              <Image
                    src={posterUrl}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
/>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#1F2937] to-[#111827]">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="text-xs text-[#D1D5DB]">Foto não disponível</p>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Favorite Button */}
            <button
              onClick={handleFavoriteClick}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
              aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Heart
                size={20}
                className={isFavorite ? 'fill-[#FCD34D] text-[#FCD34D]' : 'text-[#F3F4F6]'}
              />
            </button>
          </div>

          {/* Movie Info */}
          <div className="p-3 space-y-2">
            {/* Title */}
            <h3 className="font-bold text-sm text-[#F3F4F6] line-clamp-2 group-hover:text-[#FCD34D] transition-colors">
              {movie.title}
            </h3>

            {/* Year and Rating */}
            <div className="flex items-center justify-between text-xs text-[#D1D5DB]">
              <span>{year}</span>
              <div className="flex items-center gap-1">
                <span className="text-[#FCD34D]">★</span>
                <span className="font-semibold">
                  {(movie.vote_average / 2).toFixed(1)}
                </span>
              </div>
            </div>

            {/* Genres/Overview Preview */}
            <p className="text-xs text-[#D1D5DB] line-clamp-2 italic">
              {movie.overview?.slice(0, 60)}...
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

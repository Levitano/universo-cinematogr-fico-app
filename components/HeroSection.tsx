'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl, type Movie } from '@/lib/api'
import { HeroSkeleton } from './SkeletonLoader'

interface HeroSectionProps {
  movie: Movie | null
  isLoading?: boolean
}

export default function HeroSection({ movie, isLoading }: HeroSectionProps) {
  if (isLoading || !movie) {
    return <HeroSkeleton />
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'w780')
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  return (
    <div className="relative w-full h-96 md:h-screen overflow-hidden rounded-lg mb-8 group">
      {/* Background Image */}
      {backdropUrl ? (
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-[#1F2937] to-[#111827]" />
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-6 md:p-12">
        <div className="max-w-2xl space-y-4">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#F3F4F6] text-balance">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-[#D1D5DB]">
            <span className="text-lg">{year}</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-[#FCD34D]">★</span>
              <span className="font-semibold">
                {(movie.vote_average / 2).toFixed(1)}/5
              </span>
            </div>
            {movie.runtime && (
              <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            )}
          </div>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {movie.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-[#FCD34D]/20 border border-[#FCD34D]/50 rounded-full text-sm text-[#FCD34D]"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-[#D1D5DB] line-clamp-3 text-sm md:text-base">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              href={`/movie/${movie.id}`}
              className="px-6 py-3 bg-[#FCD34D] text-[#0B0F19] rounded-lg font-bold hover:bg-[#F59E0B] transition-colors inline-block"
            >
              Detalhes
            </Link>
            <button className="px-6 py-3 border border-[#D1D5DB] text-[#F3F4F6] rounded-lg font-bold hover:bg-[#111827] transition-colors">
              ▶ Assistir Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

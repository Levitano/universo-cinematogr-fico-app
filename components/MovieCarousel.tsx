'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import type { Movie } from '@/lib/api'
import { useFavorites } from '@/lib/hooks'

interface MovieCarouselProps {
  title: string
  movies: Movie[]
  isLoading?: boolean
}

export default function MovieCarousel({
  title,
  movies,
  isLoading = false,
}: MovieCarouselProps) {
  const scrollContainer = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const { favorites, toggleFavorite } = useFavorites()

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [movies])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = 400
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
      setTimeout(checkScroll, 300)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-[#F3F4F6]">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-40 h-64 skeleton rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (!movies || movies.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[#F3F4F6] mb-4">{title}</h2>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#FCD34D]/80 hover:bg-[#FCD34D] text-[#0B0F19] transition-all opacity-0 group-hover:opacity-100 md:-left-12"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-[#FCD34D]/80 hover:bg-[#FCD34D] text-[#0B0F19] transition-all opacity-0 group-hover:opacity-100 md:-right-12"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Movies Scroll Container */}
        <div
          ref={scrollContainer}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-40 md:w-48"
            >
              <MovieCard
                movie={movie}
                isFavorite={favorites.some((fav) => fav.id === movie.id)}
                onToggleFavorite={(movie) => {
                  toggleFavorite({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                  })
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

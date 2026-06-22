'use client'

import { useState, useEffect, useCallback } from 'react'

export interface Favorite {
  id: number
  title: string
  poster_path: string | null
  addedAt: number
}

// Hook for managing favorites with localStorage
export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('movieverse_favorites')
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('movieverse_favorites', JSON.stringify(favorites))
      } catch (error) {
        console.error('Failed to save favorites:', error)
      }
    }
  }, [favorites, isLoading])

  const addFavorite = useCallback((movie: Favorite) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === movie.id)
      if (exists) return prev
      return [...prev, { ...movie, addedAt: Date.now() }]
    })
  }, [])

  const removeFavorite = useCallback((movieId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId))
  }, [])

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((fav) => fav.id === movieId),
    [favorites]
  )

  const toggleFavorite = useCallback(
    (movie: Favorite) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id)
      } else {
        addFavorite(movie)
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  )

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  }
}

// Hook for debounced search
export function useDebouncedValue<T>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// Hook for theme management
export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('movieverse_theme') as 'dark' | 'light' | null
      if (stored) {
        setTheme(stored)
      }
    } catch (error) {
      console.error('Failed to load theme:', error)
    }
    setIsLoaded(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('movieverse_theme', newTheme)
      } catch (error) {
        console.error('Failed to save theme:', error)
      }
      return newTheme
    })
  }, [])

  return { theme, toggleTheme, isLoaded }
}

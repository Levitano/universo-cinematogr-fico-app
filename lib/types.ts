export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
}

export interface MovieDetails extends Movie {
  runtime: number
  budget: number
  revenue: number
  status: string
  tagline: string
  genres: Genre[]
}

export interface Genre {
  id: number
  name: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Video {
  id: string
  name: string
  key: string
  site: string
  type: string
  official: boolean
  published_at: string
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

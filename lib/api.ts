import axios from 'axios'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

// Create axios instance
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
})

// Error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[TMDB API Error]', error.response?.data || error.message)
    throw error
  }
)

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids?: number[]
  genres?: Array<{ id: number; name: string }>
  runtime?: number
  revenue?: number
  budget?: number
  status?: string
  cast?: Cast[]
  crew?: Crew[]
  videos?: Video[]
  recommendations?: { results: Movie[] }
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface Crew {
  id: number
  name: string
  department: string
  job: string
  profile_path: string | null
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface Genre {
  id: number
  name: string
}

// Fetch trending movies
export async function getTrendingMovies(timeWindow: 'day' | 'week' = 'week') {
  try {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`)
    return response.data.results as Movie[]
  } catch (error) {
    console.error('Failed to fetch trending movies:', error)
    return []
  }
}

// Fetch top rated movies
export async function getTopRatedMovies(page = 1) {
  try {
    const response = await tmdbApi.get('/movie/top_rated', {
      params: { page },
    })
    return response.data.results as Movie[]
  } catch (error) {
    console.error('Failed to fetch top rated movies:', error)
    return []
  }
}

// Fetch popular movies
export async function getPopularMovies(page = 1) {
  try {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page },
    })
    return response.data.results as Movie[]
  } catch (error) {
    console.error('Failed to fetch popular movies:', error)
    return []
  }
}

// Fetch upcoming movies
export async function getUpcomingMovies(page = 1) {
  try {
    const response = await tmdbApi.get('/movie/upcoming', {
      params: { page },
    })
    return response.data.results as Movie[]
  } catch (error) {
    console.error('Failed to fetch upcoming movies:', error)
    return []
  }
}

// Fetch movie details
export async function getMovieDetails(movieId: number) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'cast,crew,videos,recommendations',
      },
    })
    return response.data as Movie
  } catch (error) {
    console.error(`Failed to fetch movie details for ID ${movieId}:`, error)
    return null
  }
}

// Search movies
export async function searchMovies(query: string, page = 1) {
  try {
    const response = await tmdbApi.get('/search/movie', {
      params: {
        query,
        page,
        include_adult: false,
      },
    })
    return response.data.results as Movie[]
  } catch (error) {
    console.error('Failed to search movies:', error)
    return []
  }
}

// Fetch genres
export async function getGenres() {
  try {
    const response = await tmdbApi.get('/genre/movie/list')
    return response.data.genres as Genre[]
  } catch (error) {
    console.error('Failed to fetch genres:', error)
    return []
  }
}

// Get movies by genre
export async function getMoviesByGenre(genreId: number, page = 1) {
  try {
    const response = await tmdbApi.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      },
    })
    return response.data.results as Movie[]
  } catch (error) {
    console.error(`Failed to fetch movies for genre ${genreId}:`, error)
    return []
  }
}

// Get movie credits
export async function getMovieCredits(movieId: number | string) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`)
    return response.data.cast as Cast[]
  } catch (error) {
    console.error(`Failed to fetch credits for movie ${movieId}:`, error)
    return []
  }
}

// Get movie videos
export async function getMovieVideos(movieId: number | string) {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`)
    return response.data.results as Video[]
  } catch (error) {
    console.error(`Failed to fetch videos for movie ${movieId}:`, error)
    return []
  }
}

// Construct image URL
export function getImageUrl(
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
) {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

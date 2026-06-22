import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MovieCarousel from '@/components/MovieCarousel'
import {
  getTrendingMovies,
  getTopRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
} from '@/lib/api'

export default async function Home() {
  // Fetch data in parallel
  const [trendingMovies, topRatedMovies, popularMovies, upcomingMovies] =
    await Promise.all([
      getTrendingMovies('week'),
      getTopRatedMovies(),
      getPopularMovies(),
      getUpcomingMovies(),
    ])

  const featuredMovie = trendingMovies[0]

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection movie={featuredMovie} />

        {/* Carousels */}
        <div className="space-y-12">
          <MovieCarousel title="Em Alta" movies={trendingMovies} />
          <MovieCarousel title="Melhores Avaliados" movies={topRatedMovies} />
          <MovieCarousel title="Populares" movies={popularMovies} />
          <MovieCarousel title="Lançamentos" movies={upcomingMovies} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#374151] bg-[#111827] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#D1D5DB]">
          <p>
            Universo Cinematográfico © 2024. Data provided by{' '}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FCD34D] hover:underline"
            >
              The Movie Database (TMDB)
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

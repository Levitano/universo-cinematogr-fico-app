# MovieVerse - Premium Movie Discovery Platform

MovieVerse is a modern, responsive movie discovery platform built with Next.js 16, Tailwind CSS, and Framer Motion. It provides real-time movie data from The Movie Database (TMDB) API.

## Features

- **Homepage with Carousels**: Browse trending, top-rated, popular, and upcoming movies
- **Search Functionality**: Real-time search with autocomplete for discovering movies
- **Movie Details**: Comprehensive movie information including cast, ratings, trailers, and reviews
- **Favorites System**: Save your favorite movies with persistent local storage
- **Premium Dark Theme**: Beautiful dark interface with golden accents (Netflix/IMDb aesthetic)
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Performance Optimized**: Lazy loading, skeleton loaders, and image optimization
- **SEO Optimized**: Complete metadata, sitemap, and structured data

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **API Client**: Axios
- **Icons**: Lucide React
- **Data Source**: The Movie Database (TMDB) API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- TMDB API Key (free at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd app-filmes
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
# Create .env.local
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

4. Run the development server
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app-filmes/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── search/
│   │   └── page.tsx         # Search results page
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx     # Movie detail page
│   ├── favorites/
│   │   └── page.tsx         # Favorites page
│   ├── globals.css          # Global styles and theme
│   └── sitemap.ts           # SEO sitemap
├── components/
│   ├── Navbar.tsx           # Navigation bar
│   ├── HeroSection.tsx      # Featured movie section
│   ├── MovieCarousel.tsx    # Carousel component
│   ├── MovieCard.tsx        # Movie card component
│   └── SkeletonLoader.tsx   # Loading skeleton
├── lib/
│   ├── api.ts               # TMDB API client
│   ├── hooks.ts             # Custom React hooks
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
├── public/
│   └── robots.txt           # SEO robots.txt
└── package.json             # Dependencies
```

## Key Features Explained

### Homepage
Displays featured movies and multiple carousels showcasing:
- Trending movies (weekly)
- Top-rated movies
- Popular movies
- Upcoming movies

### Search
Real-time movie search with instant results and filtering capabilities.

### Movie Details
Comprehensive movie information including:
- Movie poster and backdrop
- Title, release date, runtime
- Rating and vote statistics
- Genres and overview
- Cast information with profile images
- Trailer links

### Favorites
Persistent favorite movies saved to local storage with quick access.

## Customization

### Theme Colors
Edit the color variables in `app/globals.css`:
- `--background`: #0B0F19 (dark blue)
- `--accent`: #FCD34D (golden yellow)
- `--accent-dark`: #F59E0B (darker gold)

### API Configuration
Modify API settings in `lib/api.ts` to customize:
- Base URL
- Request parameters
- Error handling
- Cache strategies

## Performance Optimization

- **Image Optimization**: Using Next.js Image component
- **Code Splitting**: Route-based code splitting
- **Lazy Loading**: Movies load on scroll
- **Caching**: TMDB API responses cached
- **Skeleton Loaders**: Better perceived performance

## SEO

- Dynamic metadata for each page
- Open Graph support for social sharing
- Twitter card integration
- Sitemap.xml for search engines
- robots.txt for crawlers

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `NEXT_PUBLIC_TMDB_API_KEY` environment variable
4. Deploy

```bash
vercel deploy
```

### Environment Variables for Production

```
NEXT_PUBLIC_TMDB_API_KEY=your_production_key
```

## API Reference

### TMDB API Endpoints Used

- `/trending/movie/{time_window}` - Trending movies
- `/movie/top_rated` - Top-rated movies
- `/movie/popular` - Popular movies
- `/movie/upcoming` - Upcoming movies
- `/movie/{movie_id}` - Movie details
- `/movie/{movie_id}/credits` - Cast information
- `/movie/{movie_id}/videos` - Movie videos/trailers
- `/search/movie` - Search movies
- `/genre/movie/list` - Movie genres

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org)
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion)

## Support

For issues or questions, please create an issue on GitHub or visit the TMDB documentation at https://developer.themoviedb.org/docs

---

Made with ❤️ using v0 by Vercel

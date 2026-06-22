import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MovieVerse - Discover Amazing Films',
  description: 'Explore trending, top-rated, and upcoming movies with MovieVerse. Your premium movie discovery platform featuring real-time data from TMDB.',
  keywords: ['movies', 'film', 'tv shows', 'streaming', 'watch', 'reviews', 'ratings'],
  authors: [{ name: 'MovieVerse Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://movieverse.vercel.app',
    siteName: 'MovieVerse',
    title: 'MovieVerse - Discover Amazing Films',
    description: 'Explore trending, top-rated, and upcoming movies with MovieVerse. Your premium movie discovery platform.',
    images: [
      {
        url: 'https://movieverse.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MovieVerse - Discover Amazing Films',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MovieVerse - Discover Amazing Films',
    description: 'Explore trending, top-rated, and upcoming movies with MovieVerse.',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  alternates: {
    canonical: 'https://movieverse.vercel.app',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B0F19' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'Weather App',
  description: 'Check the weather and get city suggestions with our interactive weather app built with Next.js.',
  keywords: 'weather, weather app, city suggestions, next.js, react, api',
  openGraph: {
    title: 'Weather App',
    description: 'Get the latest weather updates and city suggestions.',
    url: 'https://yourdomain.com', // Replace with your actual domain
    siteName: 'Weather App',
    images: [
      {
        url: '/path-to-image.jpg', // Replace with the path to your app’s image
        width: 800,
        height: 600,
        alt: 'Weather App Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather App',
    description: 'Get the latest weather updates and city suggestions.',
    image: '/path-to-image.jpg', // Replace with your image path
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Shreyash Borkar" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yourdomain.com" />
        {/* Add more SEO-friendly meta tags here */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </head>
      <body>{children}</body>
    </html>
  )
}

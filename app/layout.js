import Head from 'next/head';

export const metadata = {
  title: 'Weather App',
  description: 'Check the weather and get city suggestions with our interactive weather app built with Next.js.',
  openGraph: {
    title: 'Weather App',
    description: 'Get the latest weather updates and city suggestions.',
    url: 'https://weather-sb.vercel.app/',
    siteName: 'Weather App',
    images: [
      {
        url: '/images/weather.png',
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
    image: '/images/weather.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

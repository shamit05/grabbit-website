import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'
import ClientScripts from '../components/ClientScripts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Grabbit',
    default: 'Grabbit - Community Errands Made Easy'
  },
  description: 'Join your community to streamline everyday errands through location-based notifications and community assistance. Download the Grabbit app today!',
  keywords: ['community', 'errands', 'neighbors', 'app', 'location-based', 'notifications'],
  authors: [{ name: 'Grabbit Team', url: 'https://grabbit.tech' }],
  openGraph: {
    title: 'Grabbit - Community Errands Made Easy',
    description: 'Connect with neighbors to streamline everyday tasks',
    url: 'https://grabbit.tech',
    siteName: 'Grabbit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grabbit - Community Errands Made Easy',
    description: 'Connect with neighbors to streamline everyday tasks',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Grabbit.ico" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className={inter.className}>
        {children}
        <ClientScripts />
        <Script 
          src="/js/main.js" 
          strategy="afterInteractive"
          id="main-script"
        />
      </body>
    </html>
  )
}

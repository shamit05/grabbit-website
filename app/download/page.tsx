import type { Metadata } from 'next'
import DownloadPageComponent from '../download-page'

export const metadata: Metadata = {
  title: 'Download Grabbit - Community-Based Errand Assistance App',
  description: 'Download the Grabbit app for iOS. Join your community to streamline everyday errands through location-based notifications and community assistance.',
  openGraph: {
    title: 'Download Grabbit - Community-Based Errand Assistance App',
    description: 'Download the Grabbit app for iOS. Join your community to streamline everyday errands through location-based notifications and community assistance.',
    url: 'https://shamit05.github.io/grabbit-website/download',
    siteName: 'Grabbit',
    type: 'website',
  },
}

export default function DownloadPage() {
  return <DownloadPageComponent />
}

import type { Metadata } from 'next'
import HomePage from './home-page'

export const metadata: Metadata = {
  title: 'Grabbit - Community Errands Made Easy',
  description: 'Join your community to streamline everyday errands through location-based notifications and community assistance. Download the Grabbit app today!',
}

export default function Page() {
  return <HomePage />
}

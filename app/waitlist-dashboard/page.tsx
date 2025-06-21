import { Suspense } from 'react'
import type { Metadata } from 'next'
import WaitlistDashboard from '../../components/WaitlistDashboard'

export const metadata: Metadata = {
  title: 'Your Waitlist Dashboard - Grabbit',
  description: 'Track your waitlist position, points, and referrals for Grabbit.',
  robots: 'noindex, nofollow'
}

function WaitlistDashboardWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WaitlistDashboard />
    </Suspense>
  )
}

export default function WaitlistDashboardPage() {
  return <WaitlistDashboardWrapper />
}

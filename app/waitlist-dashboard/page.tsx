import { Suspense } from 'react'
import type { Metadata } from 'next'
import WaitlistDashboard from '../../components/WaitlistDashboard'
import SkeletonLoader from '../../components/SkeletonLoader'

export const metadata: Metadata = {
  title: 'Your Waitlist Dashboard - Grabbit',
  description: 'Track your waitlist position, points, and referrals for Grabbit.',
  robots: 'noindex, nofollow'
}

function WaitlistDashboardWrapper() {
  return (
    <Suspense fallback={<SkeletonLoader variant="dashboard" />}>
      <WaitlistDashboard />
    </Suspense>
  )
}

export default function WaitlistDashboardPage() {
  return <WaitlistDashboardWrapper />
}

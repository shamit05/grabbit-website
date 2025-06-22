import { Suspense } from 'react'
import type { Metadata } from 'next'
import WaitlistPageContent from '../../components/WaitlistPageContent'
import SkeletonLoader from '../../components/SkeletonLoader'

export const metadata: Metadata = {
  title: 'Join the Waitlist - Grabbit',
  description: 'Join the Grabbit waitlist and get a chance to win $10! Community-powered delivery coming soon.',
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={<SkeletonLoader variant="form" />}>
      <WaitlistPageContent />
    </Suspense>
  )
}

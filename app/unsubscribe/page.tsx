import { Suspense } from 'react'
import type { Metadata } from 'next'
import UnsubscribeContent from '../../components/UnsubscribeContent'
import SkeletonLoader from '../../components/SkeletonLoader'

export const metadata: Metadata = {
  title: 'Unsubscribe - Grabbit',
  description: 'Unsubscribe from Grabbit email communications.',
  robots: 'noindex, nofollow'
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<SkeletonLoader variant="card" />}>
      <UnsubscribeContent />
    </Suspense>
  )
}

import { Suspense } from 'react'
import type { Metadata } from 'next'
import EmailVerification from '../../components/EmailVerification'
import SkeletonLoader from '../../components/SkeletonLoader'

export const metadata: Metadata = {
  title: 'Verify Your Email - Grabbit',
  description: 'Verify your email address to complete your Grabbit waitlist registration.',
  robots: 'noindex, nofollow'
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<SkeletonLoader variant="card" />}>
      <EmailVerification />
    </Suspense>
  )
}

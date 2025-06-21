import { Suspense } from 'react'
import type { Metadata } from 'next'
import EmailVerification from '../../components/EmailVerification'

export const metadata: Metadata = {
  title: 'Verify Your Email - Grabbit',
  description: 'Verify your email address to complete your Grabbit waitlist registration.',
  robots: 'noindex, nofollow'
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerification />
    </Suspense>
  )
}

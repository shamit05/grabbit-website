import { Suspense } from 'react'
import type { Metadata } from 'next'
import WaitlistPageContent from '../../components/WaitlistPageContent'

export const metadata: Metadata = {
  title: 'Join the Waitlist - Grabbit',
  description: 'Join the Grabbit waitlist and get a chance to win $10! Community-powered delivery coming soon.',
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={<div></div>}>
      <WaitlistPageContent />
    </Suspense>
  )
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EmailVerification() {
  const router = useRouter()

  useEffect(() => {
    // This component is deprecated - we now use magic links
    // Redirect users to the waitlist page
    router.push('/waitlist')
  }, [router])

  return (
    <div className="verification-container">
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="verification-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <h1>Redirecting...</h1>
        <p>Taking you to the waitlist page...</p>
      </div>
    </div>
  )
}

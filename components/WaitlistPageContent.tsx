'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import WaitlistForm from './WaitlistForm'

export default function WaitlistPageContent() {
  const searchParams = useSearchParams()
  const [referralCode, setReferralCode] = useState<string | undefined>()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const ref = searchParams?.get('ref')
    if (ref) {
      setReferralCode(ref)
    }
  }, [searchParams])

  if (!isClient) {
    return (
      <div className="waitlist-page">
        <div className="waitlist-page-content">
          <div className="waitlist-header">
            <h1><i className="fas fa-dice"></i> Join the Grabbit Waitlist</h1>
            <p className="subtitle">Be the first to experience community-powered delivery</p>
            <p className="description">
              Sign up now and get raffle tickets for a chance to win $10! 
              We'll randomly select 5 winners when Grabbit launches.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </div>
    )
  }

  return (
    <div className="waitlist-page">
      {isClient && (
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      )}
      
      <div className="waitlist-page-content">
        <div className="waitlist-header">
          <h1><i className="fas fa-dice"></i> Join the Grabbit Waitlist</h1>
          <p className="subtitle">Be the first to experience community-powered delivery</p>
          <p className="description">
            Sign up now and get raffle tickets for a chance to win $10! 
            We'll randomly select 5 winners when Grabbit launches.
          </p>
        </div>

        <WaitlistForm initialReferralCode={referralCode} />

        {/* About the Lottery */}
        <div className="lottery-info-section">
          <h2><i className="fas fa-bullseye"></i> How the Lottery Works</h2>
          <div className="lottery-steps">
            <div className="lottery-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up & Verify</h3>
                <p>Join the waitlist and verify your email to get your first raffle ticket</p>
              </div>
            </div>
            <div className="lottery-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Refer Friends</h3>
                <p>Share your referral code - each friend who joins gives you another ticket</p>
              </div>
            </div>
            <div className="lottery-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Win $10!</h3>
                <p>We'll randomly pick 5 winners to receive $10 Grabbit credit each</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

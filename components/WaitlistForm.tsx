'use client'

import { useState, useEffect } from 'react'
import { addToWaitlist, getWaitlistCount, validateReferralCode } from '../lib/waitlist'

interface WaitlistFormProps {
  initialReferralCode?: string;
}

export default function WaitlistForm({ initialReferralCode }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [referralCode, setReferralCode] = useState(initialReferralCode || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    loadWaitlistCount()
  }, [])

  const loadWaitlistCount = async () => {
    try {
      const count = await getWaitlistCount() + 200;
      setWaitlistCount(count)
    } catch (error) {
      // Error loading waitlist count - will retry on next form submission
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // Clean referral code (remove whitespace, convert to uppercase)
      const trimmedReferralCode = referralCode.trim().toUpperCase()
      const cleanReferralCode = trimmedReferralCode || undefined
      
      // Add to waitlist and send magic link email
      await addToWaitlist(email, cleanReferralCode)
      
      // Show success message
      setSubmitStatus('success')
      
      // Refresh waitlist count
      await loadWaitlistCount()
    } catch (error) {
      if (error instanceof Error && error.message.includes('already signed up but not verified')) {
        // Special case: resent verification email
        setSubmitStatus('success')
        setErrorMessage('')
      } else if (error instanceof Error && error.message.includes('already registered and verified')) {
        // Special case: already verified user
        setSubmitStatus('error')
        setErrorMessage('This email is already registered! If you need to access your dashboard, check your email for the original magic link or contact support.')
      } else {
        setSubmitStatus('error')
        if (error instanceof Error) {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="waitlist-form-section">
      {submitStatus === 'success' ? (
        <div className="success-state">
          <div className="success-card">
            <h3><i className="fas fa-envelope"></i> Check Your Email!</h3>
            <p>
              We've sent a verification email to <strong>{email}</strong>
            </p>
            <p>
              Click the link in your email to access your waitlist dashboard and get your raffle tickets!
            </p>
            <small>Don't see the email? Check your spam folder or try signing up again to get another email.</small>
          </div>
        </div>
      ) : (
        <>
          <div className="waitlist-count-display">
            <p className="waitlist-count">{waitlistCount} people have joined so far!</p>
          </div>
          
          <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="email-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="referralCode">Referral Code (Optional)</label>
            <div className="referral-input-container">
              <input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Enter referral code"
                disabled={isSubmitting}
                className="referral-input"
              />
            </div>
            <small className="form-hint">Have a friend&apos;s referral code? Enter it to get a bonus raffle ticket!</small>
          </div>

          {submitStatus === 'error' && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist & Get Tickets'}
          </button>
        </form>
        </>
      )}

      {/* Lottery Section */}
      <div className="lottery-section">
        <h3><i className="fas fa-trophy"></i> Win $10 Grabbit Credit!</h3>
        <p className="lottery-description">
          Every raffle ticket increases your chances! We'll randomly select 5 winners when we launch.
        </p>
        <div className="lottery-info">
          <div className="lottery-stat">
            <div className="stat-number">{waitlistCount}</div>
            <div className="stat-label">People Joined</div>
          </div>
          <div className="lottery-stat">
            <div className="stat-number">5</div>
            <div className="stat-label">Lucky Winners</div>
          </div>
          <div className="lottery-stat">
            <div className="stat-number">$10</div>
            <div className="stat-label">Each Prize</div>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h3><i className="fas fa-ticket-alt"></i> How to Earn Raffle Tickets</h3>
        <div className="points-grid">
          <div className="point-item">
            <div className="point-icon"><i className="fas fa-ticket-alt"></i></div>
            <h4>Join the Waitlist</h4>
            <p>Get 1 raffle ticket automatically when you verify your email</p>
          </div>
          <div className="point-item">
            <div className="point-icon"><i className="fas fa-gift"></i></div>
            <h4>Use a Referral Code</h4>
            <p>Get an extra raffle ticket when you join with someone's code</p>
          </div>
          <div className="point-item">
            <div className="point-icon"><i className="fas fa-user-friends"></i></div>
            <h4>Refer Friends</h4>
            <p>Get 1 raffle ticket for each friend who joins with your code</p>
          </div>
        </div>
      </div>
    </div>
  )
}
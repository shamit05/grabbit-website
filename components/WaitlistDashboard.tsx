'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { verifyEmailAndActivateUser, getWaitlistCount, WaitlistUser } from '../lib/waitlist'

export default function WaitlistDashboard() {
  const searchParams = useSearchParams()
  const [user, setUser] = useState<WaitlistUser | null>(null)
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [shareableLink, setShareableLink] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const loadUserData = async (token: string) => {
      try {
        // This will verify email and activate user if not already done
        const userData = await verifyEmailAndActivateUser(token)
        if (userData) {
          setUser(userData)
          setShareableLink(`${window.location.origin}/waitlist?ref=${userData.referralCode}`)
          await loadWaitlistStats()
        } else {
          setError('Invalid access token')
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('Error loading your data')
        }
      } finally {
        setLoading(false)
      }
    }

    const token = searchParams?.get('token')
    if (token) {
      loadUserData(token)
    } else {
      setError('Invalid or missing access token')
      setLoading(false)
    }
  }, [searchParams])

  const loadWaitlistStats = async () => {
    try {
      const count = await getWaitlistCount() + 200
      setWaitlistCount(count)
    } catch (error) {
      // Error loading stats - non-critical
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareableLink
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <h2><i className="fas fa-exclamation-triangle"></i> Access Error</h2>
          <p>{error}</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {isClient && (
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      )}

      <div className="dashboard-header">
        <h1><i className="fas fa-dice"></i> Your Grabbit Dashboard</h1>
        <p>Welcome to the community! Track your raffle tickets and share with friends.</p>
      </div>

      {user && (
        <>
          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon"><i className="fas fa-ticket-alt"></i></div>
              <div className="stat-content">
                <div className="stat-number">{user.points}</div>
                <div className="stat-label">Raffle Tickets</div>
                <div className="stat-sublabel">Your entries in the lottery!</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-content">
                <div className="stat-number">{waitlistCount}</div>
                <div className="stat-label">Total Members</div>
                <div className="stat-sublabel">People in the waitlist</div>
              </div>
            </div>
          </div>

          <div className="lottery-info-card">
            <h2><i className="fas fa-trophy"></i> $10 Lottery Details</h2>
            <div className="lottery-details">
              <div className="lottery-detail">
                <strong>5 Winners</strong>
                <span>will be randomly selected</span>
              </div>
              <div className="lottery-detail">
                <strong>$10 Each</strong>
                <span>Grabbit credit prize</span>
              </div>
              <div className="lottery-detail">
                <strong>At Launch</strong>
                <span>Winners announced when we go live</span>
              </div>
            </div>
          </div>

          <div className="referral-section">
            <h2><i className="fas fa-share-alt"></i> Earn More Tickets</h2>
            <p>Share your referral link with friends. Each friend who joins gives you 1 more raffle ticket!</p>
            
            <div className="referral-code-display">
              <div className="code-section">
                <label>Your Referral Code:</label>
                <div className="code-value">{user.referralCode}</div>
              </div>
              
              <div className="link-section">
                <label>Your Referral Link:</label>
                <div className="referral-link">
                  <input 
                    type="text" 
                    value={shareableLink} 
                    readOnly 
                    className="link-input"
                  />
                  <button 
                    onClick={copyToClipboard} 
                    className="copy-btn"
                  >
                    {copySuccess ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="share-buttons">
              <a 
                href={`https://twitter.com/intent/tweet?text=Join me on the Grabbit waitlist and get a chance to win $10! �&url=${encodeURIComponent(shareableLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn twitter"
              >
                Share on Twitter
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn facebook"
              >
                Share on Facebook
              </a>
            </div>
          </div>

          <div className="earn-more-section">
            <h2><i className="fas fa-bullseye"></i> How to Earn More Tickets</h2>
            <div className="earn-methods">
              <div className="earn-method">
                <div className="method-icon"><i className="fas fa-ticket-alt"></i></div>
                <div className="method-content">
                  <h3>Joined with Referral</h3>
                  <p>You got 1 ticket when you signed up{user.referredBy ? ' with a referral code' : ''}</p>
                </div>
              </div>
              <div className="earn-method">
                <div className="method-icon"><i className="fas fa-users"></i></div>
                <div className="method-content">
                  <h3>Refer Friends</h3>
                  <p>Get 1 ticket for each friend who joins with your referral code</p>
                </div>
              </div>
              <div className="earn-method">
                <div className="method-icon"><i className="fas fa-dice"></i></div>
                <div className="method-content">
                  <h3>Random Drawing</h3>
                  <p>We'll randomly select 5 winners when Grabbit launches</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="dashboard-footer">
        <a href="/" className="btn-secondary">Back to Home</a>
      </div>
    </div>
  )
}

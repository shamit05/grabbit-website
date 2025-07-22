'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { unsubscribeUser } from '../lib/waitlist'

export default function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isClient, setIsClient] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    setIsClient(true)
    const tokenParam = searchParams?.get('token')
    const emailParam = searchParams?.get('email')
    
    if (tokenParam) {
      // New token-based unsubscribe
      setToken(tokenParam)
      handleTokenUnsubscribe(tokenParam)
    } else if (emailParam) {
      // Legacy email-based unsubscribe (for backward compatibility)
      setEmail(decodeURIComponent(emailParam))
      const autoUnsubscribe = searchParams?.get('confirm')
      
      if (autoUnsubscribe === 'true') {
        handleLegacyUnsubscribe(decodeURIComponent(emailParam))
      }
    }
  }, [searchParams])

  const handleTokenUnsubscribe = async (magicToken: string) => {
    setLoading(true)
    setError('')

    try {
      const result = await unsubscribeUser(magicToken)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('An error occurred while processing your request')
    } finally {
      setLoading(false)
    }
  }

  const handleLegacyUnsubscribe = async (emailAddress: string) => {
    // Note: Legacy email unsubscribe is no longer supported for security
    setError('This unsubscribe link format is no longer supported. Please contact support.')
  }

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    // Manual form unsubscribe is no longer supported for security
    setError('Manual unsubscribe is no longer available. Please use the link from your email.')
  }

  if (loading) {
    return (
      <div className="unsubscribe-container">
        <div className="unsubscribe-card">
          <div className="unsubscribe-icon">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <h1>Processing...</h1>
          <p>Please wait while we process your unsubscribe request.</p>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="unsubscribe-container">
        <div className="unsubscribe-card success">
          <div className="unsubscribe-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Successfully Unsubscribed</h1>
          <p>You have been removed from our email list. You will no longer receive promotional or marketing emails from Grabbit.</p>
          {userEmail && (
            <p className="user-email">Email address: <strong>{userEmail}</strong></p>
          )}
          <p>If you change your mind, you can always rejoin our waitlist.</p>
          <div className="unsubscribe-actions">
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/waitlist" className="btn-secondary">Rejoin Waitlist</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="unsubscribe-container">
      {isClient && (
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      )}

      <div className="unsubscribe-card">
        <div className="unsubscribe-icon">
          <i className="fas fa-envelope-open"></i>
        </div>
        <h1>Unsubscribe from Emails</h1>
        
        {token ? (
          <div>
            <p>Processing your unsubscribe request...</p>
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>To unsubscribe, please use the link provided in your email.</p>
            <p>Manual unsubscribe is no longer available for security reasons.</p>
            
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                {error}
              </div>
            )}
          </div>
        )}

        <div className="unsubscribe-note">
          <p>Note: Unsubscribing will remove you from all future email communications from Grabbit, including product updates and promotional emails.</p>
        </div>

        <div className="unsubscribe-actions">
          <Link href="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

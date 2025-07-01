'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { unsubscribeUser } from '../lib/waitlist'

export default function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const emailParam = searchParams?.get('email')
    const autoUnsubscribe = searchParams?.get('confirm')
    
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
      
      // Auto-unsubscribe if confirm=true in URL
      if (autoUnsubscribe === 'true') {
        handleAutoUnsubscribe(decodeURIComponent(emailParam))
      }
    }
  }, [searchParams])

  const handleAutoUnsubscribe = async (emailAddress: string) => {
    setLoading(true)
    setError('')

    try {
      const result = await unsubscribeUser(emailAddress)
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

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await unsubscribeUser(email.trim())
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
          <p>You have been removed from our email list. You will no longer receive emails from Grabbit.</p>
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
        <p>We're sorry to see you go! Enter your email below to unsubscribe from all Grabbit communications.</p>

        <form onSubmit={handleUnsubscribe} className="unsubscribe-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={loading}
              className="form-input"
            />
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary unsubscribe-btn"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Processing...
              </>
            ) : (
              'Unsubscribe'
            )}
          </button>
        </form>

        <div className="unsubscribe-note">
          <p>Note: This will remove you from all future email communications from Grabbit, including product updates and promotional emails.</p>
        </div>

        <div className="unsubscribe-actions">
          <Link href="/" className="btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

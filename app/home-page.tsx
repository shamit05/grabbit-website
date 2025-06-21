'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function HomePageContent() {
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

  const waitlistUrl = referralCode ? `/waitlist?ref=${referralCode}` : '/waitlist'

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        {isClient && (
          <div className="floating-shapes">
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
        )}
        <div className="hero-content">
          <h1>Grabbit. Rethinking Delivery.</h1>
          <p className="subtitle">Community-powered delivery that saves time, money, and builds connections</p>
          <p className="description">
            Join thousands of people waiting for the future of delivery. 
            Sign up for our waitlist and get a chance to win $10!
          </p>
          <div className="hero-buttons">
            <Link href={waitlistUrl} className="btn-primary">
              Join Waitlist & Win $10
            </Link>
          </div>
        </div>
      </section>

      {/* About Grabbit Section */}
      <section className="about-section" id="about">
        <div className="section-header">
          <h2>What is Grabbit?</h2>
          <p>
            Grabbit connects tight-knit communities to streamline everyday errands. 
            Let friends see what others need in real time and pool small requests, 
            so one trip can help many — saving time and cutting out the hassle of those everyday must-haves.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <h2>How Grabbit Works</h2>
          <p>
            Leveraging location-based notifications and an intuitive app to help people help each other.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Location-based notifications</h3>
            <p>
              When someone walks into a store, they get a ping on their phone if another Grabbit user needs something from there.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Intuitive App With Live Requestboard</h3>
            <p>
              Our Grabbit app lets users easily create groups with friends or dorm mates to see each others&apos; requests.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <h3>Automatic Prepayment System</h3>
            <p>
              In development. Will send automatic pre-payments along with Grabbit requests.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="team mission-section" id="mission">
        <div className="section-header">
          <h2>Our Mission</h2>
        </div>
        <div className="mission-content">
          <blockquote>
            &ldquo;We&apos;re reimagining delivery as it should be: clean, efficient, inexpensive and community-powered.&rdquo;
          </blockquote>
          <p>
            We are building Grabbit because we are annoyed by all the runs we make every week to CVS, grocery stores or take-out joints. 
            Grabbit eliminates the wasteful zig-zag of traditional delivery by connecting people already at stores with others who need something grabbed.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="cta-content">
          <h2>Ready to Join the Revolution?</h2>
          <p>Be among the first to experience community-powered delivery</p>
          <Link href={waitlistUrl} className="btn-primary">
            Join the Waitlist
          </Link>
        </div>
      </section>
    </>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}
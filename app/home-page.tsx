'use client'

import { useState } from 'react'
import Link from 'next/link'
import { db } from '../lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
import Header from '../components/Header'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'emailList'), {
        email,
        timestamp: new Date(),
        source: 'homepage'
      })
      
      setEmail('')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error adding email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Header currentPage="home" />

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="hero-content">
          <h1>Community Errands Made Easy</h1>
          <p className="subtitle">Connect with neighbors to streamline everyday tasks</p>
          <p className="description">
            Grabbit helps you coordinate with your community to make errands more efficient. 
            Get notified when someone nearby needs something you can help with, or find someone 
            who&apos;s already heading where you need to go.
          </p>
          <div className="cta-buttons">
            <a href="https://testflight.apple.com/join/8Sk691jF" className="btn-primary">
              <i className="fab fa-apple"></i>
              Download for iOS
            </a>
            <button onClick={() => scrollToSection('contact')} className="btn-secondary">
              Join Our Email List
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>How Grabbit Works</h2>
          <p>Simple, smart, and community-focused</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-bell"></i>
            </div>
            <h3>Smart Notifications</h3>
            <p>Get notified when someone in your area needs something you can help with, making community support effortless.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>Community Building</h3>
            <p>Connect with friends, neighbors, and colleagues to create a supportive network that helps everyone save time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Safe & Secure</h3>
            <p>Built with privacy in mind, ensuring your personal information and location data are always protected.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Time Saving</h3>
            <p>Reduce redundant trips by coordinating with others who are already heading to the same places.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3>Location-Based</h3>
            <p>Smart location matching ensures you only see relevant requests from people in your immediate area.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Feel Good</h3>
            <p>Experience the joy of helping others while building stronger connections within your community.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team">
        <div className="section-header">
          <h2>Meet the Team</h2>
          <p>The people behind Grabbit</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user"></i>
            </div>
            <h3>Shamit Surana</h3>
            <p>Founder & CEO - Passionate about building technology that brings communities together and makes everyday life easier.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-header">
          <h2>Stay Updated</h2>
          <p>Join our email list to be the first to know about new features and updates</p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isSubmitting}
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting}
              style={{ width: '100%' }}
            >
              {isSubmitting ? 'Joining...' : 'Join Email List'}
            </button>
          </form>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Have questions? Reach out to us at{' '}
              <a href="mailto:contact@grabbit.tech" style={{ color: '#ff6b35' }}>
                contact@grabbit.tech
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccess && (
        <>
          <div className="success-overlay show"></div>
          <div className="success-message show">
            <div className="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>You&apos;ve been added to our email list. We&apos;ll keep you updated on our progress!</p>
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <span>&copy; 2025 Grabbit. All rights reserved.</span>
            <Link href="/download">Download</Link>
            <a href="mailto:contact@grabbit.tech">Contact</a>
          </div>
          <div className="social-links">
            <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="mailto:contact@grabbit.tech" title="Email"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
      </footer>
    </>
  )
}

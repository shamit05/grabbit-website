'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function DownloadPageComponent() {
  return (
    <>
      {/* Invite Banner (will be shown dynamically for app redirects) */}
      <div id="invite-banner" className="invite-banner">
        <button className="banner-close" onClick={(e) => e.currentTarget.parentElement?.classList.remove('show')} aria-label="Close invite banner">
          <i className="fas fa-times"></i>
        </button>
        <h3><i className="fas fa-users"></i> You're invited to join a group!</h3>
        <p>Download the Grabbit app to accept this group invitation and start collaborating with your community.</p>
      </div>

      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay">
        <nav className="mobile-nav-links">
          <Link href="/">Home</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#team">Our Team</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="mobile-buttons">
          <a href="https://testflight.apple.com/join/8Sk691jF" className="download-btn active">
            <i className="fab fa-apple"></i>
            Download TestFlight
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="hero-content">
          <h1>Download Grabbit</h1>
          <p className="subtitle">Join your community and streamline everyday errands</p>
          <div className="download-buttons">
            <a href="https://testflight.apple.com/join/8Sk691jF" className="app-store-btn">
              <i className="fab fa-apple"></i>
              Download TestFlight Beta
            </a>
            <div className="coming-soon-btn">
              <i className="fab fa-google-play"></i>
              Android Coming Soon
            </div>
          </div>
          <div className="compatibility-info">
            <h3>iOS Requirements</h3>
            <p>Requires iOS 15.1 or later. Compatible with iPhone and iPod touch.</p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots">
        <div className="section-header">
          <h2>See Grabbit in Action</h2>
          <p>Take a look at our intuitive interface designed for seamless community collaboration</p>
        </div>
        <div className="screenshots-grid">
          <div className="screenshot-card">
            <Image src="/assets/screenshots/home.png" alt="Grabbit Home Screen" width={300} height={600} />
            <h3>Community Feed</h3>
            <p>See what your friends and neighbors need in real-time</p>
          </div>
          <div className="screenshot-card">
            <Image src="/assets/screenshots/make_request.png" alt="Grabbit Request Creation" width={300} height={600} />
            <h3>Easy Requests</h3>
            <p>Create and manage your errands with just a few taps</p>
          </div>
          <div className="screenshot-card">
            <Image src="/assets/screenshots/groups.png" alt="Grabbit Group Management" width={300} height={600} />
            <h3>Group Management</h3>
            <p>Stay connected with your community groups and track deliveries</p>
          </div>
          <div className="screenshot-card">
            <Image src="/assets/screenshots/settings.png" alt="Grabbit Settings" width={300} height={600} />
            <h3>Settings & Profile</h3>
            <p>Customize your preferences and manage your account settings</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose Grabbit?</h2>
          <p>Discover the features that make community collaboration effortless</p>
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

      {/* Terms of Service Modal */}
      <div id="terms-modal" className="modal" style={{display:'none', position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100vw', height: '100vh', overflow: 'auto', background: 'rgba(0,0,0,0.45)'}}>
        <div className="modal-content" style={{background: '#fff', margin: '5vh auto', borderRadius: '18px', maxWidth: '540px', padding: '2.5rem 2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', position: 'relative'}}>
          <span id="close-terms" style={{position: 'absolute', top: '1rem', right: '1.2rem', fontSize: '1.8rem', fontWeight: 'bold', cursor: 'pointer', color: '#aaa'}}>&times;</span>
          <h2>Terms of Service</h2>
          <p><strong>Effective Date:</strong> January 1, 2025</p>
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using Grabbit, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <h3>2. Description of Service</h3>
          <p>Grabbit is a community-based platform that helps users coordinate errands and deliveries within their local communities.</p>
          <h3>3. User Responsibilities</h3>
          <p>You are responsible for your conduct while using our service and for any content you post or share.</p>
          <h3>4. Privacy</h3>
          <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
          <h3>5. Prohibited Uses</h3>
          <p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts.</p>
          <h3>6. Termination</h3>
          <p>We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms.</p>
          <h3>7. Limitation of Liability</h3>
          <p>To the fullest extent allowed by law, Grabbit and its team are not liable for any damages resulting from your use of the site or reliance on its content.</p>
          <h3>8. Changes to These Terms</h3>
          <p>We may update these Terms from time to time. Changes will be posted here, and your continued use of the site means you accept the revised terms.</p>
          <h3>9. Contact</h3>
          <p>Questions? Reach out to us at <a href="mailto:contact@grabbit.tech">contact@grabbit.tech</a>.</p>
        </div>
      </div>
    </>
  )
}

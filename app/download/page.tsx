import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../../components/Header'

export const metadata: Metadata = {
  title: 'Download Grabbit App',
  description: 'Download the Grabbit app for iOS. Connect with your community and streamline everyday errands through location-based notifications.',
}

export default function DownloadPage() {
  return (
    <>
      <Header currentPage="download" />
      
      <main className="download-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Download Grabbit</h1>
            <p className="subtitle">Get the app and start connecting with your community</p>
            
            <div className="download-options">
              <div className="download-card">
                <div className="platform-icon">
                  <i className="fab fa-apple"></i>
                </div>
                <h3>iOS App</h3>
                <p>Available for iPhone and iPad</p>
                <a href="https://testflight.apple.com/join/8Sk691jF" className="btn-primary">
                  <i className="fab fa-apple"></i>
                  Download for iOS
                </a>
                <p className="beta-note">Currently in TestFlight Beta</p>
              </div>
              
              <div className="download-card coming-soon">
                <div className="platform-icon">
                  <i className="fab fa-google-play"></i>
                </div>
                <h3>Android App</h3>
                <p>Coming soon to Google Play Store</p>
                <button className="btn-secondary" disabled>
                  <i className="fab fa-google-play"></i>
                  Coming Soon
                </button>
                <p className="beta-note">Sign up for our email list to get notified</p>
              </div>
            </div>

            <div className="app-preview">
              <Image 
                src="/assets/3d Phone mockup.png" 
                alt="Grabbit app preview on phone" 
                className="phone-mockup"
                width={300}
                height={600}
                priority
              />
            </div>

            <div className="features-preview">
              <h2>What you&apos;ll get</h2>
              <div className="feature-list">
                <div className="feature-item">
                  <i className="fas fa-bell"></i>
                  <span>Real-time notifications when neighbors need help</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Location-based matching with people nearby</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-users"></i>
                  <span>Build connections with your community</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>Safe and secure messaging</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <span>&copy; 2025 Grabbit. All rights reserved.</span>
            <Link href="/">Home</Link>
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

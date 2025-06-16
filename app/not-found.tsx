'use client'

import Link from 'next/link'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <>
      <Header currentPage="" />
      
      <main className="not-found-page">
        <section className="hero">
          <div className="hero-content">
            <div className="error-content">
              <h1 className="error-code">404</h1>
              <h2 className="error-title">Oops! Page not found</h2>
              <p className="error-description">
                The page you&apos;re looking for seems to have wandered off. 
                Don&apos;t worry, it happens to the best of us!
              </p>
              
              <div className="error-actions">
                <Link href="/" className="btn-primary">
                  <i className="fas fa-home"></i>
                  Go Home
                </Link>
                <Link href="/download" className="btn-secondary">
                  <i className="fas fa-download"></i>
                  Download App
                </Link>
              </div>
              
              <div className="help-text">
                <p>
                  If you think this is a mistake, please{' '}
                  <a href="mailto:contact@grabbit.tech">contact us</a>
                </p>
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

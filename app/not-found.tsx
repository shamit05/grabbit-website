'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function NotFound() {
  useEffect(() => {
    // Check for app route redirects immediately (for 404 page)
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    
    // Check if this is an app route that should redirect to download
    if (currentPath.startsWith('/app')) {
      // Create download URL with all query parameters preserved
      const downloadUrl = new URL('/download', window.location.origin);
      
      // Add the original path as 'from' parameter
      downloadUrl.searchParams.set('from', currentPath);
      
      // Preserve all existing query parameters
      if (currentSearch) {
        const existingParams = new URLSearchParams(currentSearch);
        for (const [key, value] of existingParams) {
          downloadUrl.searchParams.set(key, value);
        }
      }
      
      window.location.replace(downloadUrl.toString());
    }
  }, [])

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay">
        <nav className="mobile-nav-links">
          <Link href="/">Home</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#team">Our Team</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <div className="mobile-buttons">
          <a href="https://testflight.apple.com/join/8Sk691jF" className="download-btn">
            <i className="fab fa-apple"></i>
            Download TestFlight
          </a>
        </div>
      </div>

      {/* 404 message */}
      <main className="error-page">
        <div className="container text-center">
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! This page doesn&apos;t exist.</p>
          <Link href="/" className="btn-primary">Go to Home</Link>
        </div>
      </main>
    </>
  )
}
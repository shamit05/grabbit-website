'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} id="header">
        <div className="logo">
          <Image src="/assets/GRABBIT_no_background_logo.png" alt="Grabbit Logo" width={32} height={32} />
          <Link href="/" className="logo-text">grabbit</Link>
        </div>
        <div className="nav-container">
          <nav className="nav-links">
            <Link href="/" className={currentPage === 'home' ? 'active' : ''}>Home</Link>
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
            <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Our Team</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            <Link href="/download" className={`download-btn ${currentPage === 'download' ? 'active' : ''}`}>
              <i className="fab fa-apple"></i>
              Download
            </Link>
          </nav>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav-links">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>Features</a>
          <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Our Team</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
        </nav>
        <div className="mobile-buttons">
          <Link href="https://testflight.apple.com/join/8Sk691jF" className="download-btn active" onClick={closeMenu}>
            <i className="fab fa-apple"></i>
            Download TestFlight
          </Link>
        </div>
      </div>
    </>
  )
}

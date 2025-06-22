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
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // If user is at the very top, set hero as active
      if (window.scrollY < 100) {
        setActiveSection('hero')
      }
    }

    // Intersection Observer for better section tracking
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px', // Only trigger when section is well into view
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = ['hero', 'about', 'features', 'mission']
    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId)
      if (section) {
        observer.observe(section)
      }
    })

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
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
      setActiveSection(sectionId) // Immediately update active state
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
            <Link href="/" className={currentPage === 'home' && activeSection === 'hero' ? 'active' : ''}>Home</Link>
            <a 
              href="/#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              About
            </a>
            <a 
              href="/#features" 
              className={activeSection === 'features' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
            >
              Features
            </a>
            <a 
              href="/#mission" 
              className={activeSection === 'mission' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('mission'); }}
            >
              Our Mission
            </a>
            <Link href="/waitlist" className={`download-btn ${currentPage === 'waitlist' ? 'active' : ''}`} onClick={closeMenu}>
                Join Waitlist
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
          <Link href="/" onClick={closeMenu} className={currentPage === 'home' && activeSection === 'hero' ? 'active' : ''}>Home</Link>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            About
          </a>
          <a 
            href="#features" 
            className={activeSection === 'features' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}
          >
            Features
          </a>
          <a 
            href="#mission" 
            className={activeSection === 'mission' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('mission'); }}
          >
            Our Mission
          </a>
          </nav>
        <div className="mobile-buttons">
          <Link href="/waitlist" className={`download-btn ${currentPage === 'waitlist' ? 'active' : ''}`} onClick={closeMenu}>
            Join Waitlist
          </Link>
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect } from 'react'

export default function ClientScripts() {
  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    // Initialize animations
    const initializeAnimations = () => {
      // Observe section headers
      document.querySelectorAll('.section-header').forEach(el => {
        observer.observe(el)
      })

      // Observe screenshot cards with staggered animation
      document.querySelectorAll('.screenshot-card').forEach((el, index) => {
        setTimeout(() => {
          observer.observe(el)
        }, index * 100)
      })

      // Observe feature cards with staggered animation
      document.querySelectorAll('.feature-card').forEach((el, index) => {
        setTimeout(() => {
          observer.observe(el)
        }, index * 100)
      })
    }

    // Parallax effect for floating shapes
    const handleParallax = () => {
      const scrolled = window.pageYOffset
      const shapes = document.querySelectorAll('.shape')
      
      shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1)
        const yPos = -(scrolled * speed)
        ;(shape as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    // Smooth scroll for navigation links
    const handleSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute('href') || '')
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        })
      })
    }

    // Handle invite banner functionality
    const handleInviteBanner = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const inviteBanner = document.getElementById('invite-banner')
      
      if (inviteBanner && (urlParams.has('invite') || urlParams.has('groupName') || urlParams.has('from'))) {
        const groupName = urlParams.get('groupName') || 'a group'
        
        // Update banner content
        const bannerTitle = inviteBanner.querySelector('h3')
        const bannerText = inviteBanner.querySelector('p')
        
        if (bannerTitle && bannerText) {
          bannerTitle.innerHTML = `<i class="fas fa-users"></i> You're invited to join ${decodeURIComponent(groupName)}!`
          bannerText.textContent = 'Download the Grabbit app to accept this group invitation and start collaborating with your community.'
        }
        
        // Show banner
        inviteBanner.classList.add('show')
        document.body.classList.add('invite-shown')
        
        // Handle close button
        const closeBtn = inviteBanner.querySelector('.banner-close')
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            inviteBanner.classList.remove('show')
            document.body.classList.remove('invite-shown')
          })
        }
      }
    }

    // Initialize all functionality
    initializeAnimations()
    handleSmoothScroll()
    handleInviteBanner()

    // Add event listeners
    window.addEventListener('scroll', handleParallax)

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleParallax)
      observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}

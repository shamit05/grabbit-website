'use client'

export default function HomePage() {
  return (
    <>
      {/* Mobile Menu Overlay */}
      <div className="mobile-menu-overlay">
        <nav className="mobile-nav-links">
          <a href="#features">Features</a>
          <a href="#team">Our Mission</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="mobile-buttons">
          <a href="https://testflight.apple.com/join/8Sk691jF" className="download-btn">
            <i className="fab fa-apple"></i>
            Download
          </a>
          <a href="#" className="email-list-link" id="email-list-mobile-btn">
            Join Email List
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
          <h1>Grabbit. Rethinking Delivery.</h1>
          <p className="subtitle">Saving time, money and building community.</p>
          <p className="description">
            Grabbit connects tight-knit communities to streamline everyday errands. 
            Let friends see what others need in real time and pool small requests, 
            so one trip can help many — saving time and cutting out the hassle of those everyday must-haves.
          </p>
          <div className="cta-buttons">
            <a href="https://testflight.apple.com/join/8Sk691jF" className="btn-primary">
              <i className="fab fa-apple"></i>
              Download TestFlight Beta
            </a>
            <a href="#features" className="btn-secondary">Learn More</a>
          </div>
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
              When someone walks into a store, they get a ping on their phone if another Grabbit user needs something from there. This way users don't have to call their friends or check unwieldy shopping lists on shared docs documents to see if anyone needs something from the store they are at. We are enabling friends to be better friends. And neighbours better neighbours.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>Intuitive App With Live Requestboard</h3>
            <p>
              Our Grabbit app lets users easily create groups with friends or dorm mates (up to hundreds of people!) to see each others' requests. The app also tracks your requests and helps ensure the delivery arrives where it is supposed to. 
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <h3>Automatic Prepayment System</h3>
            <p>
              In development. Will send automatic pre-payments along with Grabbit requests to ensure the person doing the delivering never carries a financial burden for doing someone a solid. No awkward chasing friends for those Venmo's!
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="team mission-section" id="team">
        <div className="section-header">
          <h2>Our Mission</h2>
        </div>
        <div className="mission-content" style={{maxWidth: '820px', margin: '0 auto', background: '#fff', borderRadius: '22px', boxShadow: '0 6px 32px rgba(0,0,0,0.09)', padding: '3rem 2.5rem 2.5rem 2.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
          <blockquote style={{fontSize: '1.25rem', color: '#333', fontStyle: 'italic', borderLeft: '4px solid #ff8800', margin: '0 auto 1.5rem auto', paddingLeft: '1.2rem', maxWidth: '650px', background: '#fff7ed', borderRadius: '8px'}}>
            "We're reimagining delivery as it should be: clean, efficient, inexpensive and community-powered."
          </blockquote>
          <p style={{fontSize: '1.13rem', color: '#444', marginBottom: '1.2rem', lineHeight: '1.7'}}>
            To make our lives easier. We are building Grabbit because we are annoyed by all the runs we make every week to CVS, grocery stores or take-out joints. What's worse? Our friends do the exact same thing, often at the same places, grabbing just a few things each time. It's inefficient. The first version of Grabbit aims to help us see what our friends and neighbors need so we can combine errands, cut down on redundant trips, and spend less time hiking around for sticky notes or burritos.
          </p>
          <p style={{fontSize: '1.13rem', color: '#444', lineHeight: '1.7'}}>
            Grabbit eliminates the wasteful zig-zag of traditional delivery by connecting people already at stores getting something for themselves with others who need something grabbed. It just makes more sense and didn't exist until now.
          </p>
        </div>
      </section>

      {/* Email List Section */}
      <section className="email-list-section" style={{textAlign: 'center', padding: '3.5rem 1rem 2.5rem 1rem', background: '#f6faff'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '1rem', color: '#1a73e8', fontWeight: 800, letterSpacing: '-1px'}}>Sign up to our email list</h2>
        <p style={{maxWidth: '540px', margin: '0 auto 2rem auto', color: '#333', fontSize: '1.15rem'}}>
          Excited about Grabbit? Sign up below and we'll keep you in the loop (no spam, we promiseee).
        </p>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem'}}>
          <form action="https://docs.google.com/forms/d/e/1FAIpQLSdGebxkQ3jG-ZPffN_JoSdQwfb7xoZE7e44pgtwVYfVGh70Ww/viewform?usp=dialog" style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'center'}}>
            <input type="email" name="entry.181124231" placeholder="Enter your email" required style={{padding: '16px 20px', border: '2px solid #e2e8f0', borderRadius: '12px', fontSize: '1rem', fontFamily: 'Inter, sans-serif', fontWeight: 500, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', color: '#374151', minWidth: '300px', transition: 'all 0.3s ease'}} />
            <button type="submit" className="btn-primary" style={{padding: '16px 24px', background: '#ff6b35', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)', transition: 'all 0.3s ease'}}>
              <i className="fas fa-envelope"></i> Join Email List
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>
            Interested in bringing Grabbit to your community? 
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>
        
        <div className="contact-form">
          <form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeg1xiK5UJ2Yf71BkBc8DtPSFSSGJfKwIxxDoK5UJfyMI1Okw/formResponse" method="post">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="entry.40530263" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="entry.851084073" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="entry.2131159433" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn-primary">
              <i className="fas fa-paper-plane"></i>
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      <div id="privacy-modal" className="modal" style={{display:'none', position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100vw', height: '100vh', overflow: 'auto', background: 'rgba(0,0,0,0.45)'}}>
        <div className="modal-content" style={{background: '#fff', margin: '5vh auto', borderRadius: '18px', maxWidth: '540px', padding: '2.5rem 2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', position: 'relative'}}>
          <span className="close" id="close-privacy" style={{position: 'absolute', top: '18px', right: '24px', fontSize: '2rem', cursor: 'pointer', color: '#888'}}>&times;</span>
          <h2 style={{marginTop: 0}}>Privacy Policy for Grabbit</h2>
          <p><strong>Last updated: 06/04/2025</strong></p>
          <p>At Grabbit, your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website or services.</p>
          <h3>1. Information We Collect</h3>
          <p>When you visit our landing page, we may collect personal information you voluntarily provide (e.g., your email address if you sign up for updates) and usage data via cookies or analytics tools, such as your browser type, pages visited, and time spent on the site.</p>
          <h3>2. How We Use Your Information</h3>
          <p>We use the information we collect to improve our website and user experience, communicate with you (e.g., sending updates if you sign up), and understand general trends in usage. We will never sell your data to third parties.</p>
          <h3>3. Third-Party Services</h3>
          <p>We may use third-party services (such as Google Analytics or Mailchimp) to help operate our website or communicate with you. These services may collect information in accordance with their own privacy policies.</p>
          <h3>4. Cookies</h3>
          <p>We use cookies to understand how users navigate our site and to improve performance. You can choose to disable cookies in your browser settings, but some features may not function properly.</p>
          <h3>5. Your Rights</h3>
          <p>You may request that we update or delete your personal information, or stop sending you emails. To do so, email us at <a href="mailto:contact@grabbit.tech">contact@grabbit.tech</a>.</p>
          <h3>6. Data Security</h3>
          <p>We take reasonable precautions to protect your data, but no method of transmission over the internet is 100% secure.</p>
          <h3>7. Updates to This Policy</h3>
          <p>We may update this policy from time to time. When we do, we will update the "Last updated" date at the top of this page.</p>
        </div>
      </div>

      {/* Terms of Service Modal */}
      <div id="terms-modal" className="modal" style={{display:'none', position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100vw', height: '100vh', overflow: 'auto', background: 'rgba(0,0,0,0.45)'}}>
        <div className="modal-content" style={{background: '#fff', margin: '5vh auto', borderRadius: '18px', maxWidth: '540px', padding: '2.5rem 2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', position: 'relative'}}>
          <span className="close" id="close-terms" style={{position: 'absolute', top: '18px', right: '24px', fontSize: '2rem', cursor: 'pointer', color: '#888'}}>&times;</span>
          <h2 style={{marginTop: 0}}>Terms of Service for Grabbit</h2>
          <p><strong>Last updated: 06/04/2025</strong></p>
          <p>Welcome to Grabbit! By accessing or using our website, you agree to the following Terms of Service. Please read them carefully.</p>
          <h3>1. Acceptance of Terms</h3>
          <p>By using our site, signing up for updates, or otherwise interacting with Grabbit, you agree to be bound by these Terms. If you do not agree, please do not use our website.</p>
          <h3>2. Who We Are</h3>
          <p>Grabbit is a community-powered concept reimagining everyday delivery. Our platform is currently in development and the site is for informational and pre-launch purposes only.</p>
          <h3>3. User Conduct</h3>
          <p>You agree not to use the site for any illegal or unauthorized purpose, attempt to disrupt or harm the website, services, or other users, or misrepresent your identity when signing up for updates or contacting us.</p>
          <h3>4. Intellectual Property</h3>
          <p>All content on this site — including text, branding, graphics, and design — is the property of Grabbit (unless otherwise noted) and may not be copied or used without permission.</p>
          <h3>5. Sign-Ups and Communication</h3>
          <p>If you provide your email to join our email list or receive updates, you agree to let us contact you occasionally. You can unsubscribe at any time.</p>
          <h3>6. No Warranties</h3>
          <p>Our website and its content are provided "as is." We make no guarantees that the site will be error-free, interrupted, or fully secure. Grabbit is not yet a commercial service.</p>
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

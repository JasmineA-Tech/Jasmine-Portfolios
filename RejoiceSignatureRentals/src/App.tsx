import { useEffect, useState } from 'react'
import './App.css'

const services = [
  {
    number: '01',
    title: '360 Photo Booth',
    description:
      'A fully immersive 360° video experience that captures every angle of your celebration.',
    tag: 'MOST POPULAR',
    booqableId: '360-video-booth',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '02',
    title: 'iPad Photo Booth',
    description:
      'Sleek, modern photo booth with instant prints and digital sharing for your guests.',
    booqableId: 'ipad-photo-booth',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '03',
    title: 'Floral Backdrops',
    description:
      'Lush, custom floral walls that transform any space into a breathtaking backdrop.',
    booqableId: 'floral-backdrop',
    image:
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '04',
    title: 'Heart Arches',
    description:
      'Romantic heart-shaped arches adorned with florals for ceremonies and photo moments.',
    booqableId: 'heart-arch',
    image:
      'https://images.unsplash.com/photo-1519225421980-888cb8d075de?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '05',
    title: 'Tables & Chairs',
    description:
      'Elegant furniture rentals to seat your guests in style and comfort.',
    booqableId: 'tables-chairs',
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85',
  },
  {
    number: '06',
    title: 'Event Décor',
    description:
      'Curated décor packages that bring your vision to life with luxury details.',
    booqableId: 'party-decour',
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1519225421980-888cb8d075de?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85',
]

const reasons = [
  {
    number: '01',
    title: 'Luxury Experience',
    description:
      'Thoughtfully selected rentals and details that give every celebration an elevated feel.',
  },
  {
    number: '02',
    title: 'Seamless Rentals',
    description:
      'A straightforward rental experience that helps you focus on enjoying your event.',
  },
  {
    number: '03',
    title: 'Unforgettable Memories',
    description:
      'Beautiful settings and memorable experiences for the people who matter most.',
  },
]


function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Load Booqable script dynamically after React mounts
  useEffect(() => {
    if (document.getElementById('booqable-script')) return

    const script = document.createElement('script')
    script.id = 'booqable-script'
    script.src =
      'https://641751eb-ca89-416c-8fb9-f59540ee7412.assets.booqable.com/v2/booqable.js'
    script.async = true

    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll(
      '.services-section, .about-section, .gallery-section, .testimonials-section, .final-cta'
    )

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add('is-visible')
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    elements.forEach((element) => {
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="Rejoice Signature Rentals Home">
          <img
            className="brand-logo"
            src="/Rejoice%20Website%20Logo.png"
            alt="Rejoice Signature Rentals"
          />
        </a>
                  
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={`nav-links ${menuOpen ? 'nav-open' : ''}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>


        <a className="nav-cta" href="#contact">
          Book Now <span>↗</span>
        </a>
      </header>

      <section className="hero" id="home">
       

        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">ELEVATED EVENTS. UNFORGETTABLE MOMENTS.</p>

          <h1>
            Making Every
            <br />
            Moment <em>Memorable.</em>
          </h1>

          <p className="hero-description">
            Luxury event experiences &amp; rentals for weddings, birthdays,
            baby showers, graduations, and every celebration in between.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#services">
              Book Your Experience <span>↗</span>
            </a>
            <a className="secondary-button" href="#services">
              Explore Services
            </a>
          </div>
        </div>

        <div className="hero-index">
          <span>01</span> / SIGNATURE EXPERIENCES
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <p className="eyebrow dark-eyebrow">THE ART OF CELEBRATING</p>
          <h2>
            Our Signature
            <br />
            <em>Experiences.</em>
          </h2>
          <p>
            Discover the details and experiences that make your celebration
            uniquely yours.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="service-image-wrap">
                <img src={service.image} alt={service.title} />
                <span className="service-number">{service.number}</span>
                {service.tag && (
                  <span className="service-tag">{service.tag}</span>
                )}
              </div>

              <div className="service-info">
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {service.booqableId && (
                    <div
                      className="booqable-product-button"
                      data-id={service.booqableId}
                    />
                  )}
                </div>
                <a
                  href="#contact"
                  aria-label={`Ask about ${service.title}`}
                >
                  ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <p className="eyebrow dark-eyebrow">WHY CHOOSE US</p>
        <h2>
          The details matter.
          <br />
          <em>So do your memories.</em>
        </h2>

        <div className="reasons-grid">
          {reasons.map((reason) => (
            <article className="reason-card" key={reason.number}>
              <span>{reason.number}</span>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">A LOOK AT THE MAGIC</p>
          <h2>
            Events We’ve Brought
            <br />
            <em>to Life.</em>
          </h2>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div className="gallery-item" key={image + index}>
              <img src={image} alt={`Celebration gallery ${index + 1}`} />
            </div>
          ))}
        </div>

        <a className="secondary-button gallery-button" href="#contact">
          View Full Gallery
        </a>
      </section>

      <section className="testimonials-section">
        <p className="eyebrow dark-eyebrow">KIND WORDS</p>
        <h2>
          Moments worth
          <br />
          <em>remembering.</em>
        </h2>

        <div className="testimonial-grid">
          <blockquote>
            <span className="quote-mark">“</span>
            <p>
              The setup was beautiful, and every detail felt thoughtfully
              planned. It made our celebration feel truly special.
            </p>
            <footer>— A Happy Client</footer>
          </blockquote>

          <blockquote>
            <span className="quote-mark">“</span>
            <p>
              Everything came together so beautifully. Our guests loved the
              experience, and we made memories we will always treasure.
            </p>
            <footer>— A Happy Client</footer>
          </blockquote>
        </div>
      </section>

      <section className="final-cta" id="contact">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2>
          Ready to Create
          <br />
          Something <em>Extraordinary?</em>
        </h2>
        <p>
          Let’s bring your vision to life with thoughtful details and
          unforgettable experiences.
        </p>
        <a className="primary-button" href="mailto:hello@rejoicesignaturerentals.com">
          Book Your Experience <span>↗</span>
        </a>
      </section>

      <footer className="footer">
        <div className="footer-main">

            {/* Left column: Logo and business description */}
            <div className="footer-about">
              <a
                className="footer-brand"
                href="#home"
                aria-label="Rejoice Signature Rentals Home"
              >
                <img
                  src="/Rejoice%20Website%20Logo.png"
                  alt="Rejoice Signature Rentals"
                  className="footer-logo"
                />
              </a>

              <p className="footer-description">
                Making Every Moment Memorable. Luxury
                event experiences and rentals for your most
                cherished celebrations.
              </p>

              <div className="footer-socials">
                <a href="#" aria-label="Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                <a href="#" aria-label="Facebook" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z"/>
                  </svg>
                </a>

                <a href="#" aria-label="X" title="X">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-6.8 7.78L23.2 22h-6.3l-4.94-7.5L5.4 22H2.3l7.28-8.33L1.8 2h6.46l4.47 6.83L18.9 2Zm-1.1 18h1.74L7.3 3.9H5.43L17.8 20Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle column: Navigation */}
            <div className="footer-navigation">
              <h3>NAVIGATION</h3>
              <nav aria-label="Footer navigation">
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#gallery">Gallery</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
                <a href="#contact">Book Now</a>
              </nav>
            </div>

            {/* Right column: Contact information */}
            <div className="footer-contact">
              <h3>GET IN TOUCH</h3>
              <a href="mailto:rejoicesignaturerentals@gmail.com">
                rejoicesignaturerentals@gmail.com
              </a>
              <a href="tel:+15714496075">+1 (571) 449-6075</a>
              <p>Available for events within United States</p>
            </div>

          </div>
          {/* Bottom copyright section */}
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} Rejoice Signature Rentals.
              All rights reserved.
            </p>
            <p className="footer-tagline">
              Making Every Moment Memorable.
            </p>
          </div>
        </footer>
      </main>
  )
}

export default App

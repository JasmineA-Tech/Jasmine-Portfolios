import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

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

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main>
      {/* ── Navbar ── */}
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <a className="brand" href="/" aria-label="Rejoice Signature Rentals Home">
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
          <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <a className="nav-cta" href="/#contact">
          Book Now <span>↗</span>
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="about-page-hero">
        <div className="hero-overlay" />
        <div className="about-page-hero-content">
          <p className="eyebrow">OUR STORY</p>
          <h1>
            The Heart Behind
            <br />
            <em>Rejoice.</em>
          </h1>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="about-page-story">
        <div className="about-page-story-inner">
          <div className="about-page-story-text">
            <p className="eyebrow dark-eyebrow">WHO WE ARE</p>
            <h2>
              Built with
              <br />
              <em>purpose.</em>
            </h2>
            <p className="about-story-body">
              I&apos;m the founder of Rejoice Signature Rentals and it started in 2026.
            </p>
            {/* Add more of your story here later */}
          </div>

          <div className="about-page-story-image">
            {/* Replace this placeholder with your photo when ready */}
            <div className="about-photo-placeholder">
              <span>Photo coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="about-section">
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

      {/* ── CTA ── */}
      <section className="final-cta about-page-cta">
        <p className="eyebrow">LET&apos;S CELEBRATE TOGETHER</p>
        <h2>
          Ready to Create
          <br />
          Something <em>Extraordinary?</em>
        </h2>
        <Link to="/services" className="primary-button">
          Explore Our Services <span>↗</span>
        </Link>
      </section>
    </main>
  )
}

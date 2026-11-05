import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const galleryImages = [
  'https://images.unsplash.com/photo-1519225421980-888cb8d075de?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1519225421980-888cb8d075de?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85',
]

export default function GalleryPage() {
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
      <section className="gallery-page-hero">
        <div className="hero-overlay" />
        <div className="gallery-page-hero-content">
          <p className="eyebrow">A LOOK AT THE MAGIC</p>
          <h1>
            Events We've Brought
            <br />
            <em>to Life.</em>
          </h1>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="gallery-page-section">
        <div className="section-heading">
          <p className="eyebrow dark-eyebrow">OUR WORK</p>
          <h2>
            Moments
            <br />
            <em>Captured.</em>
          </h2>
          <p>
            Real events, real celebrations. Photos coming soon — check back for
            a full look at our work.
          </p>
        </div>

        <div className="gallery-page-grid">
          {galleryImages.map((image, index) => (
            <div className="gallery-item" key={image + index}>
              <img src={image} alt={`Celebration gallery ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="final-cta gallery-page-cta">
        <p className="eyebrow">READY TO CELEBRATE?</p>
        <h2>
          Let's Create Your
          <br />
          <em>Perfect Event.</em>
        </h2>
        <Link to="/services" className="primary-button">
          View Our Services <span>↗</span>
        </Link>
      </section>
    </main>
  )
}

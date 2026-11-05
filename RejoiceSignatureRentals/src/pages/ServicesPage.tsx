import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'
import type { Service } from '../data/services'
import '../App.css'

const extraServices: Service[] = [
  {
    number: '07',
    title: 'Chafing Pans',
    description:
      'Keep your food warm and beautifully presented with our elegant chafing pan rentals.',
    booqableId: '',
    image: '/rejoice_chat_pans.PNG',
  },
  {
    number: '08',
    title: 'Popcorn Machine',
    description:
      'Add a fun and delicious touch to your event with a classic popcorn machine rental.',
    booqableId: '',
    image: '/rejoice_chat_popcorn.PNG',
  },
  {
    number: '09',
    title: 'Slushy Machine',
    description:
      'Cool down your guests with refreshing slushy drinks served fresh at your celebration.',
    booqableId: '',
    image: '/rejoice_chat_slushy.PNG',
  },
  {
    number: '10',
    title: 'Drink Spouts',
    description:
      'Keep beverages flowing smoothly with our stylish drink spout dispensers for any event.',
    booqableId: '',
    image: '/rejoice_chat_spouts1.PNG',
  },
  {
    number: '11',
    title: 'Swing',
    description:
      'A whimsical and eye-catching swing rental that doubles as a stunning photo backdrop.',
    booqableId: '',
    image: '/rejoice_chat_swing.PNG',
  },
]

const QUOTE_KEY = 'rejoice-quote-items'

function quoteMailto(items: string[]) {
  const body = `Hello,\n\nI'd like a quote for the following rentals:\n\n${items
    .map((i) => `- ${i}`)
    .join('\n')}\n\nEvent date:\nLocation:\n`
  return `mailto:rejoicesignaturerentals@gmail.com?subject=${encodeURIComponent(
    'Quote Request'
  )}&body=${encodeURIComponent(body)}`
}

function ServiceModal({
  service,
  onClose,
  quoteItems,
  onToggleQuote,
}: {
  service: Service
  onClose: () => void
  quoteItems: string[]
  onToggleQuote: (title: string) => void
}) {
  const inQuote = quoteItems.includes(service.title)

  // Close on Escape key and lock scroll
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    // Re-init Booqable so it finds the product button rendered inside the modal
    // Booqable's script may still be loading, so retry until the button renders
    type BooqableWindow = Window & { Booqable?: { init?: () => void } }
    let attempts = 0
    const timer = setInterval(() => {
      attempts += 1
      const rendered = document.querySelector(
        '.service-modal-cart .booqable-product-button-wrapper'
      )
      if (rendered || attempts > 40) {
        clearInterval(timer)
        return
      }
      const bq = (window as BooqableWindow).Booqable
      if (bq?.init) bq.init()
    }, 500)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      clearInterval(timer)
    }
  }, [onClose])

  return (
    <div
      className="service-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      <div
        className="service-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="service-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Photo */}
        <div className="service-modal-image">
          <img
            src={service.image}
            alt={service.title}
            onError={(e) => {
              // Fallback to a gradient if image fails to load
              const target = e.currentTarget
              target.style.display = 'none'
              target.parentElement!.style.background = '#e7e0d6'
            }}
          />
          {service.tag && (
            <span className="service-tag">{service.tag}</span>
          )}
        </div>

        {/* Details */}
        <div className="service-modal-body">
          <span className="service-modal-number">{service.number}</span>
          <h2>{service.title}</h2>
          <p className="service-modal-description">{service.description}</p>

          {service.booqableId ? (
            // Booqable renders the add-to-cart button and adds to the Booqable cart
            <div className="service-modal-cart">
              <div
                className="booqable-product-button"
                data-id={service.booqableId}
              />
            </div>
          ) : (
          <div className="service-modal-quote">
            <button
              type="button"
              className="primary-button"
              onClick={() => onToggleQuote(service.title)}
            >
              {inQuote ? '✓ Added to Quote — Remove' : 'Add to Quote'}
            </button>
            {quoteItems.length > 0 && (
              <a
                className="service-modal-quote-link"
                href={quoteMailto(quoteItems)}
              >
                Request quote for {quoteItems.length} item{quoteItems.length > 1 ? 's' : ''}
              </a>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [quoteItems, setQuoteItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(QUOTE_KEY) ?? '[]')
    } catch {
      return []
    }
  })

  const toggleQuote = (title: string) =>
    setQuoteItems((prev) => {
      const next = prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
      localStorage.setItem(QUOTE_KEY, JSON.stringify(next))
      return next
    })

  // Sticky navbar scroll behavior
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll('.services-page-grid')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
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
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* ── Service Detail Modal ── */}
      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
          quoteItems={quoteItems}
          onToggleQuote={toggleQuote}
        />
      )}

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

      {/* ── Page Hero ── */}
      <section className="services-page-hero">
        <div className="hero-overlay" />
        <div className="services-page-hero-content">
          <p className="eyebrow">THE ART OF CELEBRATING</p>
          <h1>
            Our Signature
            <br />
            <em>Experiences.</em>
          </h1>
          <p className="hero-description">
            Browse our full collection of luxury rental experiences. Select your
            dates below to check availability and pricing in real time.
          </p>
        </div>
      </section>

      {/* ── Date Picker ── */}
      <section className="services-page-datepicker">
        <p className="eyebrow dark-eyebrow">STEP 1 — CHOOSE YOUR DATES</p>
        <h2>When is your <em>event?</em></h2>
        <p className="datepicker-subtitle">
          Select your rental period to see live pricing and availability across all products.
        </p>
        <div className="booqable-datepicker"></div>
      </section>

      {/* ── Full Product Catalog ── */}
      <section className="services-page-catalog">
        <div className="section-heading">
          <p className="eyebrow dark-eyebrow">STEP 2 — CHOOSE YOUR RENTALS</p>
          <h2>
            All Services &amp;
            <br />
            <em>Rentals.</em>
          </h2>
          <p>
            Add any combination of rentals to your cart and complete your
            booking in one seamless checkout.
          </p>
        </div>

        {/* Service cards — click ↗ to open detail modal */}
        <div className="services-page-grid">
          {[...services, ...extraServices].map((service) => (
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
                </div>
                <button
                  className="service-modal-trigger"
                  onClick={() => setActiveService(service)}
                  aria-label={`View details for ${service.title}`}
                >
                  ↗
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}

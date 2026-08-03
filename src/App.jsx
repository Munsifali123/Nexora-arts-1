import { useEffect, useRef, useState } from 'react';

const PHONE = '+19179620181';
const WHATSAPP_URL = 'https://wa.me/19179620181?text=Hi%20NexoraArts%2C%20I%27d%20like%20to%20discuss%20a%20creative%20project.';
const X_URL = 'https://x.com/Tessa_F98';

const portfolioItems = [
  { category: 'VTuber', title: 'Celestial 2D VTuber', type: 'Character design', media: '/art1.jpeg', featured: true },
  { category: 'VTuber', title: '3D Character Model', type: 'Full-body model', media: '/art2.jpg' },
  { category: 'VTuber', title: 'Live2D in Motion', type: 'Art + rigging', media: '/rigging.mp4', video: true },
  { category: 'VTuber', title: 'Expressive 3D Rig', type: 'Model + rigging', media: '/rigging2.mp4', video: true },
  { category: 'Branding', title: 'Creator Identity System', type: 'Logo + banner', media: '/banner.jpg' },
  { category: 'Branding', title: 'Mascot Logo', type: 'Vector identity', media: '/logo.jpg' },
  { category: 'Emotes', title: 'Community Emote Set', type: 'Static emotes', media: '/emotes.jpg' },
  { category: 'Emotes', title: 'Animated Reactions', type: 'Motion emotes', media: '/emotes.mp4', video: true },
  { category: 'Streams', title: 'Immersive Stream Overlay', type: 'Static overlay', media: '/overlay.jpg' },
  { category: 'Streams', title: 'Overlay in Motion', type: 'Animated overlay', media: '/animatedoverlay.mp4', video: true },
  { category: 'Streams', title: 'Starting Soon', type: 'Live screen', media: '/intro.mp4', video: true },
  { category: 'Streams', title: 'Ending Screen', type: 'Live screen', media: '/outro.mp4', video: true },
];

const services = [
  { number: '01', title: 'VTuber worlds', text: 'Original 2D and 3D character design, model preparation, and expressive rigging built around your personality.' },
  { number: '02', title: 'Creator identity', text: 'Memorable logos, channel banners, brand systems, and art direction that make every profile feel unmistakably yours.' },
  { number: '03', title: 'Emotes & badges', text: 'Readable, expressive static and animated reactions designed for Twitch, Discord, YouTube, and community spaces.' },
  { number: '04', title: 'Stream motion', text: 'Cinematic overlays, transitions, alerts, and live screens that make every broadcast feel like an event.' },
  { number: '05', title: 'Chibi characters', text: 'Playful chibi illustrations and rig-ready avatars with personality, charm, and clean production files.' },
  { number: '06', title: 'Manga storytelling', text: 'Character sheets, storyboards, panel art, and webcomic layouts shaped for strong visual pacing.' },
];

const packages = [
  { tag: 'Essential', name: 'Creator Launch', description: 'A polished visual foundation for a new channel.', items: ['Mascot or wordmark logo', 'Channel banner', '3 static emotes', 'Starting-soon screen'], service: 'Logo & Banner Branding' },
  { tag: 'Most requested', name: 'VTuber Debut', description: 'A cohesive model and broadcast world for your reveal.', items: ['Full-body 2D model art', 'Advanced Live2D rigging', 'Animated overlay set', '5 animated emotes'], service: '2D/3D VTuber Modeling', featured: true },
  { tag: 'Expressive', name: 'Chibi Companion', description: 'A small character with a big on-screen personality.', items: ['Full-body chibi art', 'Live2D-ready layers', '3 expressions', 'Source production files'], service: 'Chibi Model & Rigging' },
];

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    play: <path d="m9 7 8 5-8 5Z"/>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    whatsapp: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8Z"/><path d="M9 8c.5 2.5 2.5 4.5 5 5"/></>,
    x: <><path d="M4 4l16 16"/><path d="M20 4 4 20"/></>,
    spark: <><path d="m12 3-1.4 4.1L6.5 8.5l4.1 1.4L12 14l1.4-4.1 4.1-1.4-4.1-1.4Z"/><path d="m19 15-.7 2.3L16 18l2.3.7L19 21l.7-2.3L22 18l-2.3-.7Z"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Media({ item, eager = false }) {
  if (item.video) {
    return <video src={item.media} muted loop playsInline preload="metadata" aria-label={item.title} />;
  }
  return <img src={item.media} alt={`${item.title} — ${item.type} by NexoraArts`} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', budget: '', description: '', website: '' });
  const dialogRef = useRef(null);
  const lastFocusRef = useRef(null);

  const categories = ['All', 'VTuber', 'Branding', 'Emotes', 'Streams'];
  const filteredItems = activeCategory === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const observers = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      observers.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: 0.12 });
    observers.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory]);

  useEffect(() => {
    if (!selectedMedia) return undefined;
    lastFocusRef.current = document.activeElement;
    document.body.classList.add('modal-open');
    dialogRef.current?.focus();
    const closeOnEscape = (event) => event.key === 'Escape' && setSelectedMedia(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
      lastFocusRef.current?.focus?.();
    };
  }, [selectedMedia]);

  const selectService = (service) => {
    setFormData((current) => ({ ...current, service }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const updateField = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    if (formData.website) return;
    if (Date.now() - Number(localStorage.getItem('nexora-last-inquiry') || 0) < 60000) {
      setStatus({ type: 'error', message: 'Please wait a moment before sending another request.' });
      return;
    }
    setLoading(true);
    try {
      const [{ addDoc, collection, serverTimestamp }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('./firebase'),
      ]);
      const cleanData = {
        name: formData.name.trim().slice(0, 100),
        email: formData.email.trim().toLowerCase().slice(0, 160),
        phone: formData.phone.trim().slice(0, 40),
        service: formData.service.slice(0, 80),
        budget: formData.budget.slice(0, 40),
        description: formData.description.trim().slice(0, 3000),
      };
      await addDoc(collection(db, 'artInquiries'), { ...cleanData, createdAt: serverTimestamp(), source: 'nexoraglobal.space' });
      localStorage.setItem('nexora-last-inquiry', String(Date.now()));
      setFormData({ name: '', email: '', phone: '', service: '', budget: '', description: '', website: '' });
      setStatus({ type: 'success', message: 'Your creative brief is in. We’ll respond within 1–2 business days.' });
    } catch (error) {
      console.error('Inquiry submission failed:', error);
      setStatus({ type: 'error', message: 'We couldn’t send that just now. Please reach us on WhatsApp instead.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="NexoraArts home">
            <span className="brand-mark"><Icon name="spark" size={19} /></span>
            <span>Nexora<span>Arts</span></span>
          </a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            {['Work', 'Services', 'Process', 'Contact'].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-contact" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /><span>Let’s talk</span></a>
            <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
              <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-glow glow-one" />
          <div className="hero-glow glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow"><span /> Open for selected commissions</div>
              <h1>We turn your<br /><em>imagination</em><br />into a living world.</h1>
              <p>Original character art, expressive VTuber models, and cinematic stream identities made for creators who refuse to look ordinary.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore the work <Icon name="arrow" /></a>
                <a className="text-link" href="#contact">Start a commission <span>↗</span></a>
              </div>
              <div className="trust-row" aria-label="Service highlights">
                <span>Worldwide commissions</span><span>Built from scratch</span><span>Commercial-ready files</span>
              </div>
            </div>
            <div className="hero-art" data-reveal>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="art-frame art-frame-back"><img src="/art2.jpg" alt="3D character artwork by NexoraArts" fetchPriority="high" /></div>
              <div className="art-frame art-frame-front"><img src="/art1.jpeg" alt="2D VTuber character artwork by NexoraArts" fetchPriority="high" /></div>
              <div className="floating-note note-one"><span>✦</span> Original characters</div>
              <div className="floating-note note-two"><strong>2D</strong><span>Art + rigging</span></div>
            </div>
          </div>
          <div className="marquee" aria-hidden="true"><div>VTUBER MODELS ✦ LIVE2D RIGGING ✦ EMOTES ✦ STREAM WORLDS ✦ CHARACTER ART ✦ VTUBER MODELS ✦ LIVE2D RIGGING ✦ EMOTES ✦</div></div>
        </section>

        <section className="work-section section" id="work">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><span className="kicker">Selected work</span><h2>Art with a pulse.</h2></div>
              <p>Every piece begins as a blank canvas and becomes part of a creator’s world—designed to move, emote, and connect.</p>
            </div>
            <div className="category-tabs" role="group" aria-label="Filter portfolio">
              {categories.map((category) => <button className={activeCategory === category ? 'active' : ''} key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <div className="portfolio-grid">
              {filteredItems.map((item, index) => (
                <button className={`portfolio-card ${item.featured ? 'portfolio-featured' : ''}`} key={item.title} type="button" onClick={() => setSelectedMedia(item)} data-reveal aria-label={`View ${item.title}`}>
                  <div className="portfolio-media"><Media item={item} eager={index < 2} /><span className="media-action"><Icon name={item.video ? 'play' : 'arrow'} /></span></div>
                  <div className="portfolio-meta"><div><span>{item.type}</span><h3>{item.title}</h3></div><span className="card-index">{String(index + 1).padStart(2, '0')}</span></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="manifesto section" aria-label="Our approach">
          <div className="manifesto-sticky"><span>NEXORA</span></div>
          <div className="container manifesto-content" data-reveal>
            <span className="kicker">More than a commission</span>
            <p>Your audience should recognize your world before they read your name. We combine illustration, movement, and visual strategy to create work that feels <em>alive.</em></p>
          </div>
        </section>

        <section className="services-section section" id="services">
          <div className="container">
            <div className="section-heading" data-reveal><div><span className="kicker">What we create</span><h2>A full creative universe.</h2></div><p>One studio, one visual language, and everything you need to show up with confidence.</p></div>
            <div className="service-list">
              {services.map((service) => <article className="service-row" key={service.number} data-reveal><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" onClick={() => selectService(service.title)} aria-label={`Ask about ${service.title}`}><Icon name="arrow" /></a></article>)}
            </div>
          </div>
        </section>

        <section className="packages-section section" id="process">
          <div className="container">
            <div className="section-heading" data-reveal><div><span className="kicker">A clear starting point</span><h2>Choose your launchpad.</h2></div><p>Every package is customized. These are creative starting points—not one-size-fits-all boxes.</p></div>
            <div className="package-grid">
              {packages.map((pack) => <article className={`package-card ${pack.featured ? 'featured' : ''}`} key={pack.name} data-reveal><span className="package-tag">{pack.tag}</span><h3>{pack.name}</h3><p>{pack.description}</p><ul>{pack.items.map((item) => <li key={item}><Icon name="check" size={17} />{item}</li>)}</ul><button type="button" onClick={() => selectService(pack.service)}>Build my package <Icon name="arrow" size={18} /></button></article>)}
            </div>
            <div className="process-strip" data-reveal>
              {[['01', 'Discover', 'We learn your vision, audience, and must-haves.'], ['02', 'Design', 'Sketches and art direction become a focused visual world.'], ['03', 'Refine', 'Feedback is shaped through clear revision milestones.'], ['04', 'Launch', 'You receive organized, production-ready files.']].map(([num, title, text]) => <div key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <div className="container contact-grid">
            <div className="contact-intro" data-reveal>
              <span className="kicker">Your world starts here</span>
              <h2>Let’s make something <em>unforgettable.</em></h2>
              <p>Tell us where you are now and where you want to go. We’ll reply with next steps within 1–2 business days.</p>
              <div className="direct-contact"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> Chat on WhatsApp</a><a href="mailto:contact@nexoraglobal.agency"><Icon name="mail" /> contact@nexoraglobal.agency</a></div>
            </div>
            <form className="commission-form" onSubmit={submitForm} data-reveal>
              <div className="field-row">
                <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" value={formData.name} onChange={updateField} autoComplete="name" maxLength="100" required /></div>
                <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={formData.email} onChange={updateField} autoComplete="email" maxLength="160" required /></div>
              </div>
              <div className="field-row">
                <div className="field"><label htmlFor="phone">Phone / WhatsApp</label><input id="phone" name="phone" type="tel" value={formData.phone} onChange={updateField} autoComplete="tel" maxLength="40" required /></div>
                <div className="field"><label htmlFor="service">What are we creating?</label><select id="service" name="service" value={formData.service} onChange={updateField} required><option value="" disabled>Select a service</option><option>2D/3D VTuber Modeling</option><option>Chibi Model & Rigging</option><option>Logo & Banner Branding</option><option>Emotes & Sub Badges</option><option>Stream Assets & Overlays</option><option>Manga & Comic Design</option></select></div>
              </div>
              <div className="field"><label htmlFor="budget">Estimated budget (USD)</label><select id="budget" name="budget" value={formData.budget} onChange={updateField} required><option value="" disabled>Select a range</option><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,500</option><option>$2,500+</option></select></div>
              <div className="field"><label htmlFor="description">Tell us about the idea</label><textarea id="description" name="description" value={formData.description} onChange={updateField} rows="5" minLength="20" maxLength="3000" placeholder="Character, mood, deliverables, deadline, references…" required /></div>
              <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" value={formData.website} onChange={updateField} tabIndex="-1" autoComplete="off" /></div>
              <div className="form-footer"><p>By submitting, you agree to our <a href="/privacy">privacy policy</a>.</p><button className="button button-primary" type="submit" disabled={loading}>{loading ? 'Sending…' : 'Send creative brief'} <Icon name="arrow" /></button></div>
              {status.message && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top"><div><a className="brand" href="#top"><span className="brand-mark"><Icon name="spark" size={19} /></span><span>Nexora<span>Arts</span></span></a><p>Original art for creators building worlds worth remembering.</p></div><div className="footer-links"><div><strong>Explore</strong><a href="#work">Work</a><a href="#services">Services</a><a href="#process">Process</a></div><div><strong>Connect</strong><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href={X_URL} target="_blank" rel="noreferrer">X / Twitter ↗</a><a href={`tel:${PHONE}`}>+1 (917) 962-0181</a></div></div></div>
        <div className="container footer-bottom"><span>© 2026 NexoraArts. All rights reserved.</span><div><a href="/terms">Terms</a><a href="/privacy">Privacy</a></div></div>
      </footer>

      {selectedMedia && <div className="lightbox" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedMedia(null)}><div className="lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" ref={dialogRef} tabIndex="-1"><button className="lightbox-close" type="button" onClick={() => setSelectedMedia(null)} aria-label="Close artwork viewer"><Icon name="close" /></button><div className="lightbox-media"><Media item={selectedMedia} eager /></div><div className="lightbox-caption"><span>{selectedMedia.type}</span><h2 id="lightbox-title">{selectedMedia.title}</h2></div></div></div>}

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Chat with NexoraArts on WhatsApp"><Icon name="whatsapp" /></a>
    </div>
  );
}

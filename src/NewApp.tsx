import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ChevronRight, 
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from './newConstants';
import { MenuCategory, MenuItem } from './newTypes';
import GatorBobWidget from './components/GatorBobWidget';

// Use a component constant to bypass JSX intrinsic element type errors for custom elements
const WistiaPlayer = 'wistia-player' as any;

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Contact', to: '/contact' },
];

const BEAD_COLORS = ['purple', 'gold', 'green'];

// --- Beaded Hanging Letter Component ---
const HangingBeadLetter: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  if (char === ' ') {
    return <div className="bead-space" aria-hidden="true" />;
  }
  return (
    <div className="bead-strand flex-shrink-0 transform transition-transform duration-500 hover:translate-y-4 cursor-pointer pointer-events-auto">
      <div className="bead-line">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={`bead-drop bead-${BEAD_COLORS[(index + i) % 3]}`} />
        ))}
      </div>
      <div className={`char-pendant text-mg-${BEAD_COLORS[index % 3]} mt-[-10px]`}>{char}</div>
    </div>
  );
};

const HERO_MEDIA_ID = 'lxcpkyefcu';

// --- Immersive Background Video Section ---
const BackgroundVideo: React.FC<{ id?: string; opacity?: number; aspect?: string; fit?: 'cover' | 'contain' }> = ({
  id = HERO_MEDIA_ID,
  opacity = 0.55,
  aspect = '1.4883720930232558',
  fit = 'cover',
}) => (
  <div className="absolute inset-0 z-0 overflow-hidden video-wrapper" style={{ opacity }}>
    <WistiaPlayer
      media-id={id}
      class="hero-wistia"
      aspect={aspect}
      muted
      autoplay
      loop
      playsinline
    />
    <style>
      {`wistia-player[media-id='${id}']:not(:defined) {
          background: center / ${fit} no-repeat url('https://fast.wistia.com/embed/medias/${id}/swatch');
          display: block;
          width: 100%;
          height: 100%;
          filter: blur(5px);
        }`}
    </style>
    {/* Removed dark filter to let the video pop */}
  </div>
);

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-metallic-purple ${scrolled ? 'py-2 h-[80px]' : ''} relative overflow-hidden`}>
      <div className="absolute inset-0 z-[2]">
        <BackgroundVideo id="684sb953x5" aspect="1.7777777777777777" fit="cover" opacity={0.35} />
        <div className="absolute inset-0 bg-mgDeep/70 z-[3]" />
      </div>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center h-full">
        <div className="flex items-center gap-1 cursor-pointer relative z-20" onClick={() => navigate('/')}>
          <div className="nav-logo-video">
            <WistiaPlayer
              media-id="5xxyuh8iwe"
              class="nav-wistia"
              aspect="1.0"
              muted
              autoplay
              loop
              playsinline
            />
          </div>
          <div className="logo-coin-container">
            <WistiaPlayer
              media-id="ip3tp5t9me"
              class="logo-wistia"
              aspect="1.0"
              muted
              autoplay
              loop
              playsinline
            />
          </div>
          <div className="flex items-center leading-none">
            <span className="font-cajun text-2xl lg:text-3xl tracking-wider text-white">THE CAJUN MENU</span>
          </div>
        </div>

        <ul className="hidden lg:flex items-center gap-6 relative z-20 nav-orbit">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `nav-link nola-link text-[11px] font-black uppercase tracking-[0.4em] transition-all ${
                    isActive ? 'text-mgGold active' : 'text-white/80'
                  }`
                }
              >
                <span className="nav-text">{link.label}</span>
                <span className="nav-data">Cajun Menu</span>
                <span className="filigree" aria-hidden="true">
                  <svg viewBox="0 0 200 100">
                    <path d="M10,50 C10,10 40,10 50,30 C60,10 90,10 90,50 C90,90 60,90 50,70 C40,90 10,90 10,50 Z M190,50 C190,10 160,10 150,30 C140,10 110,10 110,50 C110,90 140,90 150,70 C160,90 190,90 190,50 Z" />
                    <path d="M50,30 Q100,0 150,30 M50,70 Q100,100 150,70" />
                    <circle cx="100" cy="50" r="2" fill="currentColor" />
                  </svg>
                </span>
              </NavLink>
            </li>
          ))}
          <li>
            <button className="px-8 py-3 brass-press rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl">
              <span className="nola-symbol">⚜</span>
              Order Online
            </button>
          </li>
        </ul>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-mgGold relative z-20">
          <div className="w-8 h-1 bg-current mb-1.5 rounded-full" />
          <div className="w-6 h-1 bg-current mb-1.5 rounded-full" />
          <div className="w-8 h-1 bg-current rounded-full" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1100] bg-mgDeep/90 backdrop-blur-xl lg:hidden overflow-hidden flex items-center justify-center w-screen h-[100dvh]"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <BackgroundVideo id="e7si0f5wiz" aspect="1.7777777777777777" fit="contain" opacity={0.45} />
              <div className="absolute inset-0 bg-mgDeep/75" />
            </div>
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-mgGold text-xl font-bold z-20">CLOSE</button>
            <div className="relative z-20 h-full w-full flex flex-col items-center justify-center gap-6 text-center">
              <div className="px-8 py-10 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md shadow-2xl">
                <div className="text-[11px] uppercase tracking-[0.4em] text-mgGold mb-6">Menu</div>
                <div className="flex flex-col items-center gap-6">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl md:text-5xl font-cajun text-white hover:text-mgGold drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const [showBayou, setShowBayou] = useState(false);
  return (
  <>
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <BackgroundVideo id="shf90z629z" aspect="1.7777777777777777" fit="contain" opacity={0.6} />
      <div className="container mx-auto px-6 pt-10 relative z-20 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
        </motion.div>
      </div>
    </section>
    <section className="relative bg-mgDeep">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-center gap-8">
        <button 
          onClick={() => navigate('/menu')}
          className="group px-14 py-6 brass-press rounded-full text-sm font-black tracking-[0.4em] uppercase flex items-center gap-4 shadow-2xl steam-cta"
        >
          <span className="nola-symbol">⚜</span>
          EXPLORE MENU <ChevronRight size={18} />
        </button>
        <button
          onClick={() => navigate('/reservations')}
          className="px-14 py-6 border border-yellow-400/40 text-yellow-200 font-black rounded-full text-sm tracking-[0.4em] uppercase bg-yellow-400/10 hover:bg-yellow-400/20 transition-all book-check-cta"
        >
          BOOK A TABLE
        </button>
      </div>
    </section>

    <section className="py-32 bg-mgDeep">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-mgGreen font-black tracking-[0.5em] uppercase text-xs mb-4 block">Our Culinary Heart</span>
          <motion.h2
            className="text-5xl md:text-7xl font-display italic font-black text-white"
            viewport={{ once: true, amount: 0.6 }}
            onViewportEnter={() => setShowBayou(true)}
          >
            The <span className={`bayou-script ${showBayou ? 'is-writing' : ''}`}>Bayou Classics</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MENU_ITEMS.slice(0, 6).map((item, idx) => (
            <MenuCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      <div className="text-center mt-20">
          <button onClick={() => navigate('/menu')} className="brass-press px-8 py-4 rounded-full text-xs font-black tracking-[0.45em] uppercase relative">
            <span className="nola-symbol">⚜</span>
            VIEW FULL MENU
          </button>
        </div>
      </div>
    </section>
  </>
  );
};

const MenuCard: React.FC<{ item: MenuItem; index?: number }> = ({ item, index = 0 }) => {
  const mobileShift =
    typeof window !== 'undefined' && window.innerWidth < 768 ? (index % 2 === 0 ? -40 : 40) : 0;
  const [glow, setGlow] = useState(false);
  const isVideo = item.image?.endsWith('.mp4') || item.image?.endsWith('.webm');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: mobileShift }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      whileHover={{ rotateX: 8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.35 }}
      className={`food-card ${glow ? 'glow-pulse' : ''}`}
      onClick={() => {
        setGlow(true);
        window.setTimeout(() => setGlow(false), 600);
      }}
    >
      <div className="image-float-wrap">
        {isVideo ? (
          <video
            className="food-video"
            src={item.image}
            muted
            autoPlay
            loop
            playsInline
          />
        ) : (
          <div className="food-image" style={{ backgroundImage: `url('${item.image}')` }} />
        )}
      </div>
      <div className="card-body">
        <div className="bead-string" />
        <div className="info-panel">
          <h3 className="food-title">{item.name}</h3>
          <p className="food-tagline">{item.isSignature ? 'Signature Dish' : item.category}</p>
          <div className="price-tag">{item.price}</div>
          <p className="reveal-desc">{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const brandPendant = "THE CAJUN MENU";
  
  return (
    <footer className="relative bg-mgDeep pt-40 pb-20 overflow-hidden min-h-[700px]">
      {/* Immersive Beaded Background - Full Width */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="bead-rig-background">
          {brandPendant.split('').map((char, i) => (
            <HangingBeadLetter key={i} char={char} index={i} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-mgDeep via-mgDeep/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col">
        {/* Centered Socials */}
        <div className="flex justify-center items-center gap-12 mb-28 footer-socials">
              <motion.a whileHover={{ scale: 1.2 }} href="https://www.instagram.com/thecajunmenu" target="_blank" rel="noreferrer" className="social-3d social-instagram"><Instagram size={48} /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="https://www.facebook.com/people/The-Cajun-Menu/61558125637329/" target="_blank" rel="noreferrer" className="social-3d social-facebook"><Facebook size={48} /></motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="mailto:thecajunmenu@gmail.com" className="social-3d social-mail"><Mail size={48} /></motion.a>
        </div>

        {/* 3-Column Award-Winning Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start border-t border-white/10 pt-24 mb-20">
          
          {/* Column 1: Hours */}
          <div className="space-y-10">
            <h4 className="font-display italic text-3xl text-mgGold mb-6 text-left">Service Hours</h4>
            <div className="space-y-6 font-oswald tracking-widest text-sm uppercase">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Sunday</span>
                <span className="text-white">12:00 — 17:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Monday</span>
                <span className="text-white">Closed</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Tuesday</span>
                <span className="text-white">Closed</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Wednesday — Thursday</span>
                <span className="text-white">11:00 — 20:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Friday — Saturday</span>
                <span className="text-white">11:00 — 20:00</span>
              </div>
            </div>
          </div>

          {/* Column 2: Map Middle (Centered) */}
          <div className="flex flex-col items-center">
            <h4 className="font-display italic text-3xl text-mgGold mb-10 text-center">Our Location</h4>
            <div className="w-full h-80 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transition-all hover:border-mgGold/40 group">
              <iframe 
                src="https://www.google.com/maps?q=140+Keith+Dr,+Canton,+GA+30114&output=embed&t=k" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="transition-all duration-700"
              />
            </div>
            <p className="mt-8 text-center text-white/50 font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-3">
              <MapPin size={18} className="text-mgGold" /> 140 Keith Dr, Canton, GA 30114
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col lg:items-end lg:text-right space-y-10">
            <h4 className="font-display italic text-3xl text-mgGold mb-6">Stay Connected</h4>
            <div className="space-y-8">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] block mb-2 font-black">Catering & Parties</span>
                <a href="tel:6788997404" className="text-3xl font-oswald text-white hover:text-mgGreen transition-colors flex items-center lg:justify-end gap-4">
                  (678) 899-7404 <Phone size={22} className="text-mgGreen" />
                </a>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] block mb-2 font-black">General Inquiry</span>
                <a href="mailto:thecajunmenu@gmail.com" className="text-3xl font-oswald text-white hover:text-mgGreen transition-colors flex items-center lg:justify-end gap-4">
                  thecajunmenu@gmail.com <Mail size={22} className="text-mgGreen" />
                </a>
              </div>
              <button 
                onClick={() => navigate('/contact')}
                className="mt-6 px-12 py-5 bg-white text-mgDeep font-black rounded-full text-[11px] tracking-[0.4em] uppercase hover:bg-mgGold hover:text-white transition-all shadow-xl light-cta"
              >
                SEND A MESSAGE
              </button>
            </div>
          </div>
        </div>

        {/* Brand Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.6em] text-white/10 pt-12 border-t border-white/5">
          <span>© 2026 THE CAJUN MENU • LOUISIANA TRADITION</span>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MenuView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.APPETIZERS);
  const filtered = MENU_ITEMS.filter(item => item.category === activeCategory);
  const subcatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 120);
        }
      });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.nola-reveal');
    cards.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeCategory]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.nola-card');
    const handleMove = (card: HTMLElement, e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    };

    const handleLeave = (card: HTMLElement) => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => handleMove(card, e);
      const onLeave = () => handleLeave(card);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      (card as any).__nolaMove = onMove;
      (card as any).__nolaLeave = onLeave;
    });

    return () => {
      cards.forEach((card) => {
        const onMove = (card as any).__nolaMove;
        const onLeave = (card as any).__nolaLeave;
        if (onMove) card.removeEventListener('mousemove', onMove);
        if (onLeave) card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [activeCategory]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const amount = 2;
      const x = (e.clientX / window.innerWidth - 0.5) * amount;
      document.querySelectorAll<HTMLElement>('.category-thread').forEach((t) => {
        t.style.transform = `rotate(${x}deg)`;
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="relative pt-32 pb-28 nola-menu-page">
      <BackgroundVideo id="5i5d09f8af" aspect="1.7777777777777777" fit="contain" opacity={0.18} />
      <div className="absolute inset-0 bg-gradient-to-b from-mgDeep/40 via-mgDeep/30 to-mgDeep/60" />
      <div className="relative z-10">
        <header className="nola-menu-header">
          <div className="nola-menu-subtitle">The Cajun Menu</div>
          <h1 className="nola-menu-title">{activeCategory}</h1>
        </header>

        <div className="nola-subcat-shell">
          <button
            type="button"
            className="nola-subcat-arrow left"
            aria-label="Scroll categories left"
            onClick={() => subcatRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
          >
            ‹
          </button>
          <nav className="nola-subcat-bar" aria-label="Menu subcategories" ref={subcatRef}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat as MenuCategory)}
              className={`nola-subcat-btn ${activeCategory === cat ? 'is-active' : ''}`}
            >
              <span>{cat}</span>
            </button>
          ))}
          </nav>
          <button
            type="button"
            className="nola-subcat-arrow right"
            aria-label="Scroll categories right"
            onClick={() => subcatRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
          >
            ›
          </button>
        </div>

        <main className="nola-menu-grid menu-items-scroll">
          {filtered.map((item) => (
            <article key={item.id} className="nola-card nola-reveal">
              <div className="nola-image-wrapper">
                {item.image?.endsWith('.mp4') || item.image?.endsWith('.webm') ? (
                  <video
                    className="nola-food-video"
                    src={item.image}
                    muted
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img src={item.image} alt={item.name} className="nola-food-img" />
                )}
              </div>
              <h2 className="nola-food-title">{item.name}</h2>
              <p className="nola-description">{item.description}</p>
              <div className="nola-price-tag">{item.price}</div>
              <div className="nola-accent-leaf">⚜</div>
            </article>
          ))}
        </main>
      </div>
    </section>
  );
};

const GalleryView: React.FC = () => {
  const photos = Array.from(
    new Set([
      ...MENU_ITEMS.map((item) => item.image),
      "https://images.unsplash.com/photo-1590759016226-c9002d4452c7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1546793665-c74683c3f43d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583019117226-d4e1af74e20b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582294101758-6927f6b95b19?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200"
    ])
  );
  return (
    <section className="pt-40 pb-32 bg-mgDeep min-h-screen relative overflow-hidden">
      <BackgroundVideo id="ocyt3x1wsa" aspect="0.75" fit="contain" opacity={0.22} />
      <div className="absolute inset-0 bg-gradient-to-b from-mgDeep/30 via-mgDeep/25 to-mgDeep/35" />
      <div className="container mx-auto px-6">
        <h2 className="text-7xl md:text-[10rem] font-display italic font-black text-white text-center mb-32">
          The <span className="text-mgGold feast-beads">Feast</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((src, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={src} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutView: React.FC = () => (
  <section className="relative pt-40 pb-32 bg-mgDeep min-h-screen overflow-hidden">
    <BackgroundVideo id="vlzs2j8r43" opacity={0.25} />
    <div className="absolute inset-0 bg-gradient-to-b from-mgDeep/25 via-mgDeep/18 to-mgDeep/28" />
    <div className="container relative mx-auto px-6 z-10">
      <div className="max-w-4xl">
        <span className="text-mgGreen font-black tracking-[0.7em] uppercase text-xs">Our Heritage</span>
        <h2 className="text-7xl md:text-9xl font-display italic font-black text-white leading-tight drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]">
          Legacy of <br /> <span className="text-mgGold">Spice</span>
        </h2>
        <div className="space-y-8 text-white/90 text-xl font-medium leading-relaxed max-w-2xl">
          <p>Founded in 1924 on the bustling streets of New Orleans, The Cajun Menu has been a lighthouse for authentic Louisiana flavor for over four generations.</p>
          <p>Our kitchen is where tradition meets spectacle—hand-stirred roux, king crab boils, praline cheesecake, and beignets dusted like Mardi Gras confetti. Every plate tells a story from Bourbon Street.</p>
        </div>
        <div className="grid grid-cols-3 gap-12 pt-8">
          <div>
            <h5 className="text-4xl font-display italic text-white mb-2">1924</h5>
            <p className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-black">ESTABLISHED</p>
          </div>
          <div>
            <h5 className="text-4xl font-display italic text-white mb-2">4 Gen</h5>
            <p className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-black">FAMILY RUN</p>
          </div>
          <div>
            <h5 className="text-4xl font-display italic text-white mb-2">100%</h5>
            <p className="text-[10px] tracking-[0.4em] text-white/60 uppercase font-black">AUTHENTIC</p>
          </div>
        </div>
      </div>
      <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl space-y-5 backdrop-blur-3xl mt-16 max-w-3xl">
        <h3 className="text-3xl font-display italic text-mgGold">Jazzed Service</h3>
        <p className="text-white/80 leading-relaxed">Live brass on weekends, chef tastings, and private second-line catering that brings the Quarter to your celebration.</p>
        <div className="grid grid-cols-2 gap-6 text-sm uppercase tracking-[0.25em] text-white/70">
          <div className="flex flex-col gap-2">
            <span className="text-white font-black text-lg">Chef’s Table</span>
            <span className="text-mgGold font-bold">Seats 8</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-black text-lg">Beignet Bar</span>
            <span className="text-mgGold font-bold">All Day</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-black text-lg">Boil Nights</span>
            <span className="text-mgGold font-bold">Thu-Sat</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-black text-lg">Jazz Brunch</span>
            <span className="text-mgGold font-bold">Sundays</span>
          </div>
        </div>
        <button className="brass-press px-10 py-4 rounded-full text-xs font-black tracking-[0.35em] uppercase self-start">
          <span className="nola-symbol">⚜</span>
          Book Experience
        </button>
      </div>
    </div>
  </section>
);

const ReservationsView: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
      notes: formData.get('notes'),
    };

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Reservation could not be processed.');
      }
      setStatus('success');
      setMessage('Reservation confirmed! Check your email for the calendar invite.');
      form.reset();
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'We could not complete the reservation. Please try again.');
    }
  };

  return (
    <section className="relative pt-40 pb-32 bg-mgDeep min-h-screen overflow-hidden">
      <BackgroundVideo id="vlzs2j8r43" opacity={0.2} />
      <div className="absolute inset-0 bg-gradient-to-b from-mgDeep/20 via-mgDeep/40 to-mgDeep/70" />
      <div className="container relative mx-auto px-6 z-10">
        <div className="text-center mb-20">
          <span className="text-mgGreen font-black tracking-[0.7em] uppercase text-xs mb-6 block">Reserve Your Table</span>
          <h2 className="text-6xl md:text-8xl font-display italic font-black text-white">
            The <span className="text-mgGold">Reservation</span> Room
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto mt-6 text-lg">
            Pick your date and time, and we will confirm instantly with a calendar invite and email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <div className="p-12 glass-card rounded-[3rem] shadow-2xl border border-white/10">
              <h3 className="text-3xl font-display italic text-mgGold mb-6">Visit Us</h3>
              <div className="space-y-6 text-white/80 text-sm uppercase tracking-[0.25em] font-black">
                <div className="flex items-center gap-4">
                  <MapPin size={20} className="text-mgGold" />
                  <span>140 Keith Dr, Canton, GA 30114</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-mgGreen" />
                  <span>(678) 899-7404</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-mgGold" />
                  <span>thecajunmenu@gmail.com</span>
                </div>
              </div>
              <div className="mt-10 space-y-2 text-white/60 text-xs uppercase tracking-[0.4em] font-black">
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>12 PM - 5 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Mon - Tue</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Wed - Thu</span>
                  <span>11 AM - 8 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Fri - Sat</span>
                  <span>11 AM - 8 PM</span>
                </div>
              </div>
            </div>
            <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                src="https://www.google.com/maps?q=140+Keith+Dr,+Canton,+GA+30114&output=embed&t=k"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="The Cajun Menu Map"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 p-12 md:p-16 glass-card rounded-[3rem] space-y-10 shadow-2xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Name</label>
                <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Email</label>
                <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Phone</label>
                <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Guests</label>
                <input name="guests" required min={1} max={20} type="number" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Date</label>
                <input name="date" required type="date" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Time</label>
                <input name="time" required type="time" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 ml-4">Notes (Optional)</label>
              <textarea name="notes" rows={4} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
            </div>
            {message && (
              <div
                className={`rounded-2xl px-6 py-4 text-sm font-bold tracking-wide ${
                  status === 'success' ? 'bg-mgGreen/20 text-mgGreen' : 'bg-red-500/20 text-red-200'
                }`}
              >
                {message}
              </div>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-7 bg-mgGold text-mgDeep font-black rounded-3xl text-sm tracking-[0.5em] uppercase hover:bg-white transition-all shadow-xl shadow-mgGold/20 light-cta disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Submitting...' : 'Confirm Reservation'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactView: React.FC = () => (
  <section className="pt-40 pb-32 bg-mgDeep min-h-screen">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center mb-32">
        <span className="text-mgGreen font-black tracking-[0.7em] uppercase text-xs mb-8 block">Ready for the Spirit?</span>
        <h2 className="text-7xl md:text-[10rem] font-display italic font-black text-white leading-tight">Join the <br /> <span className="text-mgGold">Party</span></h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-10">
          <div className="p-12 glass-card rounded-[4rem] border-l-8 border-mgGold shadow-2xl">
            <h4 className="text-3xl font-display italic text-white mb-8 font-black">Inquiry Center</h4>
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-white/60">
                <div className="p-4 bg-white/5 rounded-full text-mgGold"><Phone size={24} /></div>
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase mb-1">CALL US</p>
                  <p className="text-xl font-oswald text-white">(678) 899-7404</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-white/60">
                <div className="p-4 bg-white/5 rounded-full text-mgGold"><Mail size={24} /></div>
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase mb-1">EMAIL US</p>
                  <p className="text-xl font-oswald text-white">thecajunmenu@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-square rounded-[4rem] overflow-hidden grayscale contrast-125 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
          </div>
        </div>
        <form className="lg:col-span-7 p-16 glass-card rounded-[4rem] space-y-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 ml-4">YOUR NAME</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
            </div>
            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 ml-4">EMAIL ADDRESS</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[11px] font-black uppercase tracking-[0.4em] text-white/30 ml-4">MESSAGE</label>
            <textarea rows={6} className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-6 focus:border-mgGold outline-none transition-all text-white font-bold" />
          </div>
          <button className="w-full py-7 bg-mgGold text-mgDeep font-black rounded-3xl text-sm tracking-[0.5em] uppercase hover:bg-white transition-all shadow-xl shadow-mgGold/20 light-cta">
            SEND INQUIRY
          </button>
        </form>
      </div>
    </div>
  </section>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppShell = () => {
  const location = useLocation();

  useEffect(() => {
    const scripts = [
      'https://fast.wistia.com/player.js',
      'https://fast.wistia.com/embed/lxcpkyefcu.js',
      'https://fast.wistia.com/embed/5xxyuh8iwe.js',
      'https://fast.wistia.com/embed/ip3tp5t9me.js',
      'https://fast.wistia.com/embed/vstx0wwv4f.js',
      'https://fast.wistia.com/embed/5i5d09f8af.js',
      'https://fast.wistia.com/embed/vlzs2j8r43.js',
      'https://fast.wistia.com/embed/e7si0f5wiz.js',
      'https://fast.wistia.com/embed/684sb953x5.js',
      'https://fast.wistia.com/embed/ocyt3x1wsa.js',
      'https://fast.wistia.com/embed/shf90z629z.js',
    ];
    scripts.forEach((src) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        if (src.includes('/embed/')) s.type = 'module';
        document.body.appendChild(s);
      }
    });
  }, []);

  return (
    <div className="selection:bg-mgGold selection:text-mgDeep overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomeView />} />
            <Route path="/menu" element={<MenuView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/reservations" element={<ReservationsView />} />
            <Route path="/contact" element={<ContactView />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <GatorBobWidget />
      <Footer />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from './newConstants';
import { MenuCategory, MenuItem } from './newTypes';

// Use a component constant to bypass JSX intrinsic element type errors for custom elements
const WistiaPlayer = 'wistia-player' as any;

type Page = 'Home' | 'Menu' | 'Gallery' | 'About' | 'Contact';

const NAV_LINKS: { label: Page; href: string }[] = [
  { label: 'Home', href: '#' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const BEAD_COLORS = ['purple', 'gold', 'green'];

// --- Beaded Hanging Letter Component ---
const HangingBeadLetter: React.FC<{ char: string; index: number }> = ({ char, index }) => {
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
const BackgroundVideo: React.FC<{ id?: string; opacity?: number; isModern?: boolean }> = ({ id = HERO_MEDIA_ID, opacity = 0.55 }) => (
  <div className="absolute inset-0 z-0 overflow-hidden video-wrapper">
    <WistiaPlayer
      media-id={id}
      class="hero-wistia"
      aspect="1.4883720930232558"
      muted
      autoplay
      loop
      playsinline
    />
    <style>
      {`wistia-player[media-id='${id}']:not(:defined) {
          background: center / cover no-repeat url('https://fast.wistia.com/embed/medias/${id}/swatch');
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
const Navbar: React.FC<{ currentPage: Page; setPage: (p: Page) => void }> = ({ currentPage, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-metallic-purple ${scrolled ? 'py-2 h-[80px]' : ''}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center h-full">
        <div className="flex items-center gap-6 cursor-pointer" onClick={() => setPage('Home')}>
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
          <div className="flex flex-col leading-none">
            <span className="font-cajun text-2xl lg:text-3xl tracking-wider text-white">THE CAJUN</span>
            <span className="font-display italic text-mgGold text-sm lg:text-base tracking-[0.3em] ml-1">MENU</span>
          </div>
        </div>

        <ul className="hidden lg:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button 
                onClick={() => setPage(link.label)}
                className={`nav-link text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:text-mgGold ${currentPage === link.label ? 'text-mgGold active' : 'text-white/80'}`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button className="px-8 py-3 brass-press rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-xl">
              <span className="nola-symbol">⚜</span>
              Order Online
            </button>
          </li>
        </ul>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-mgGold">
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
            className="fixed inset-0 z-[1100] bg-mgDeep/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-mgGold text-xl font-bold">CLOSE</button>
            {NAV_LINKS.map((link) => (
              <button 
                key={link.label}
                onClick={() => { setPage(link.label); setIsOpen(false); }}
                className="text-4xl font-cajun text-white hover:text-mgGold"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomeView: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => (
  <>
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <BackgroundVideo id="lxcpkyefcu" opacity={0.6} isModern={true} />
      <div className="container mx-auto px-6 pt-10 relative z-20 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <span className="inline-block mt-8 px-5 py-2 border border-mgGold/40 text-mgGold text-[11px] tracking-[0.6em] uppercase font-black mb-10 bg-mgDeep/40 backdrop-blur">
            Canton • 1100 Bank St, MS
          </span>
          <h1 className="text-6xl md:text-[9rem] font-display italic font-black leading-none text-white drop-shadow-2xl mb-8">
            Taste the <br />
            <span className="text-mgGold not-italic font-cajun">Vibe of the Bayou</span>
          </h1>
        <p className="max-w-3xl mx-auto text-white/95 text-lg md:text-xl leading-relaxed drop-shadow-[0_6px_18px_rgba(0,0,0,0.65)]">
            From century-old roux to show-stopping boils and beignets, we honor New Orleans tradition with modern flair. Dine, celebrate, and feel the Mardi Gras energy every day.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <button 
              onClick={() => setPage('Menu')}
              className="group px-14 py-6 brass-press rounded-full text-sm font-black tracking-[0.4em] uppercase flex items-center gap-4 shadow-2xl"
            >
              <span className="nola-symbol">⚜</span>
              EXPLORE MENU <ChevronRight size={18} />
            </button>
            <button className="px-14 py-6 border border-white/20 text-white font-black rounded-full text-sm tracking-[0.4em] uppercase hover:bg-white/10 transition-all">
              BOOK A TABLE
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-32 bg-mgDeep">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-mgGreen font-black tracking-[0.5em] uppercase text-xs mb-4 block">Our Culinary Heart</span>
          <h2 className="text-5xl md:text-7xl font-display italic font-black text-white">
            The <span className="text-mgGold">Bayou Classics</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MENU_ITEMS.slice(0, 6).map((item, idx) => (
            <MenuCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      <div className="text-center mt-20">
          <button onClick={() => setPage('Menu')} className="brass-press px-8 py-4 rounded-full text-xs font-black tracking-[0.45em] uppercase relative">
            <span className="nola-symbol">⚜</span>
            VIEW FULL MENU
          </button>
        </div>
      </div>
    </section>
  </>
);

const MenuCard: React.FC<{ item: MenuItem; index?: number }> = ({ item, index = 0 }) => {
  const mobileShift =
    typeof window !== 'undefined' && window.innerWidth < 768 ? (index % 2 === 0 ? -40 : 40) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: mobileShift }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.35 }}
      className="group relative h-[550px] overflow-hidden rounded-[3rem] glass-card shadow-2xl"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mgDeep/60 via-mgDeep/25 to-transparent" />
      </div>
      <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
        <div className="flex justify-between items-end mb-4">
          <motion.h3
            initial={{ scale: 0.96 }}
            whileInView={{ scale: 1.07, textShadow: '0px 12px 28px rgba(0,0,0,0.55)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-display italic font-black text-white group-hover:text-mgGold transition-colors"
          >
            {item.name}
          </motion.h3>
          <motion.span
            initial={{ color: '#c6b05f' }}
            whileInView={{ color: '#ffd700', textShadow: '0 0 18px rgba(255,215,0,0.7)' }}
            transition={{ duration: 0.45 }}
            className="font-oswald text-2xl"
          >
            {item.price}
          </motion.span>
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-8 group-hover:text-white/90 transition-colors line-clamp-3">
          {item.description}
        </p>
        <button className="brass-press px-4 py-3 rounded-full text-[11px] font-black uppercase tracking-widest text-mgGreen bg-transparent">
          <span className="nola-symbol">⚜</span>
          ADD TO SELECTION <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
};

const Footer: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  const brandPendant = "CAJUN MENU";
  
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
        <div className="flex justify-center items-center gap-12 mb-28">
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="social-3d"><Instagram size={48} /></motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="social-3d"><Facebook size={48} /></motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="#" className="social-3d"><Mail size={48} /></motion.a>
        </div>

        {/* 3-Column Award-Winning Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start border-t border-white/10 pt-24 mb-20">
          
          {/* Column 1: Hours */}
          <div className="space-y-10">
            <h4 className="font-display italic text-3xl text-mgGold mb-6 text-left">Service Hours</h4>
            <div className="space-y-6 font-oswald tracking-widest text-sm uppercase">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Mon — Thu</span>
                <span className="text-white">11:00 — 22:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/50">Fri — Sat</span>
                <span className="text-white">11:00 — 00:00</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-mgGreen">Sunday Jazz</span>
                <span className="text-mgGreen">10:00 — 21:00</span>
              </div>
              <p className="text-[10px] text-white/30 italic font-sans normal-case tracking-normal">Kitchen closes 30 mins before end of service.</p>
            </div>
          </div>

          {/* Column 2: Map Middle (Centered) */}
          <div className="flex flex-col items-center">
            <h4 className="font-display italic text-3xl text-mgGold mb-10 text-center">Our Location</h4>
            <div className="w-full h-80 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transition-all hover:border-mgGold/40 group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.882415177897!2d-90.0673414!3d29.9584379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a6119864d42b%3A0xc3f6e91f165a251!2sBourbon%20St%2C%20New%20Orleans%2C%20LA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <p className="mt-8 text-center text-white/50 font-medium tracking-widest text-xs uppercase flex items-center justify-center gap-3">
              <MapPin size={18} className="text-mgGold" /> 421 Bourbon St, New Orleans, LA 70112
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col lg:items-end lg:text-right space-y-10">
            <h4 className="font-display italic text-3xl text-mgGold mb-6">Stay Connected</h4>
            <div className="space-y-8">
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] block mb-2 font-black">Catering & Parties</span>
                <a href="tel:5045550123" className="text-3xl font-oswald text-white hover:text-mgGreen transition-colors flex items-center lg:justify-end gap-4">
                  (504) 555-0123 <Phone size={22} className="text-mgGreen" />
                </a>
              </div>
              <div>
                <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] block mb-2 font-black">General Inquiry</span>
                <a href="mailto:hello@cajunmenu.com" className="text-3xl font-oswald text-white hover:text-mgGreen transition-colors flex items-center lg:justify-end gap-4">
                  hello@cajunmenu.com <Mail size={22} className="text-mgGreen" />
                </a>
              </div>
              <button 
                onClick={() => setPage('Contact')}
                className="mt-6 px-12 py-5 bg-white text-mgDeep font-black rounded-full text-[11px] tracking-[0.4em] uppercase hover:bg-mgGold hover:text-white transition-all shadow-xl"
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

  return (
    <section className="relative pt-40 pb-32 bg-mgDeep overflow-hidden">
      <BackgroundVideo id="vstx0wwv4f" opacity={0.22} />
      <div className="absolute inset-0 bg-gradient-to-b from-mgDeep/30 via-mgDeep/25 to-mgDeep/35" />
      <div className="container relative mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <span className="text-mgGreen font-black tracking-[0.6em] uppercase text-xs mb-6 block">Our Full Selection</span>
            <h2 className="text-6xl md:text-9xl font-display italic font-black text-white leading-tight">
              <motion.span
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                Real
              </motion.span>{' '}
              <motion.span
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-mgGold"
              >
                Cajun
              </motion.span>{' '}
              <motion.span
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                Cookin
              </motion.span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-end max-w-2xl">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as MenuCategory)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all border ${activeCategory === cat ? 'bg-mgGold border-mgGold text-mgDeep shadow-2xl' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => <MenuCard key={item.id} item={item} index={idx} />)}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const GalleryView: React.FC = () => {
  const photos = [
    "https://images.unsplash.com/photo-1590759016226-c9002d4452c7?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1559131397-f94da358f7ca?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1546793665-c74683c3f43d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1583019117226-d4e1af74e20b?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1582294101758-6927f6b95b19?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200"
  ];
  return (
    <section className="pt-40 pb-32 bg-mgDeep min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-7xl md:text-[10rem] font-display italic font-black text-white text-center mb-32">The <span className="text-mgGold">Feast</span></h2>
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
    <div className="container relative mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center z-10">
      <div className="space-y-12">
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
      <div className="glass-card p-10 rounded-[3rem] shadow-2xl space-y-6 backdrop-blur-3xl">
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
                  <p className="text-xl font-oswald text-white">(504) 555-0123</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-white/60">
                <div className="p-4 bg-white/5 rounded-full text-mgGold"><Mail size={24} /></div>
                <div>
                  <p className="text-[10px] font-black tracking-widest uppercase mb-1">EMAIL US</p>
                  <p className="text-xl font-oswald text-white">hello@cajunmenu.com</p>
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
          <button className="w-full py-7 bg-mgGold text-mgDeep font-black rounded-3xl text-sm tracking-[0.5em] uppercase hover:bg-white transition-all shadow-xl shadow-mgGold/20">
            SEND INQUIRY
          </button>
        </form>
      </div>
    </div>
  </section>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');

  useEffect(() => {
    const scripts = [
      'https://fast.wistia.com/player.js',
      'https://fast.wistia.com/embed/lxcpkyefcu.js',
      'https://fast.wistia.com/embed/ip3tp5t9me.js',
      'https://fast.wistia.com/embed/vstx0wwv4f.js',
      'https://fast.wistia.com/embed/vlzs2j8r43.js',
    ];
    scripts.forEach((src) => {
      if (!document.querySelector(`script[src=\"${src}\"]`)) {
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        if (src.includes('/embed/')) s.type = 'module';
        document.body.appendChild(s);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderContent = () => {
    switch(currentPage) {
      case 'Home': return <HomeView setPage={setCurrentPage} />;
      case 'Menu': return <MenuView />;
      case 'Gallery': return <GalleryView />;
      case 'About': return <AboutView />;
      case 'Contact': return <ContactView />;
      default: return <HomeView setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="selection:bg-mgGold selection:text-mgDeep overflow-x-hidden">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;

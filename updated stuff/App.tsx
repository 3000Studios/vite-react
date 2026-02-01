
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag, 
  Plus,
  Send,
  Clock,
  History,
  Users,
  Instagram,
  Facebook
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from './constants';
import { MenuCategory, MenuItem } from './types';

// --- Navigation Constants ---
type Page = 'Home' | 'Menu' | 'Gallery' | 'About' | 'Contact';

const NAV_LINKS: { label: Page; href: string }[] = [
  { label: 'Home', href: '#' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const COLORS = ['purple', 'gold', 'green'];

// --- Helper for Mardi Gras Explosion ---
const triggerExplosion = (x: number, y: number) => {
  const colors = ['#00ff41', '#ff00ff', '#ffd700'];
  const container = document.body;

  for (let i = 0; i < 30; i++) {
    const bead = document.createElement('div');
    bead.className = 'mg-particle mg-bead';
    bead.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    const tx = (Math.random() - 0.5) * 400;
    const ty = (Math.random()) * 600;
    bead.style.left = `${x}px`;
    bead.style.top = `${y}px`;
    bead.style.setProperty('--tx', `${tx}px`);
    bead.style.setProperty('--ty', `${ty}px`);
    bead.style.animation = `dropExplosion ${1 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
    container.appendChild(bead);
    setTimeout(() => bead.remove(), 2000);
  }
};

// --- Hanging Bead Letter Component ---
const HangingBeadLetter: React.FC<{ char: string; index: number }> = ({ char, index }) => {
  const suspensionRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    let frameId: number;
    const updateMovement = () => {
      if (!suspensionRef.current) return;
      const r = rotationRef.current;
      r.current += (r.target - r.current) * 0.05;
      suspensionRef.current.style.transform = `rotate(${r.current}deg)`;
      frameId = requestAnimationFrame(updateMovement);
    };
    frameId = requestAnimationFrame(updateMovement);

    // Subtle random sway
    const interval = setInterval(() => {
      rotationRef.current.target = (Math.random() - 0.5) * 6;
    }, 2000);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(interval);
    };
  }, []);

  if (char === ' ') return <div className="flex-grow min-w-[20px]" />;
  const charColor = COLORS[index % 3];
  
  return (
    <div ref={suspensionRef} className="bead-suspension flex-shrink-0">
      <div className="string">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`bead bead-${COLORS[(index + i) % 3]}`} />
        ))}
      </div>
      <div className="char-pendant font-bold" style={{ color: `var(--mg-${charColor})` }}>{char}</div>
    </div>
  );
};

const FloatingBeadsLayer = () => {
  const [beads, setBeads] = useState<{ id: number; color: string; left: string; scale: number; duration: number }[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setBeads((prev) => [
        ...prev.slice(-30),
        { 
          id, 
          color: COLORS[Math.floor(Math.random() * 3)], 
          left: Math.random() * 100 + 'vw', 
          scale: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 4 + 7
        }
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <AnimatePresence>
        {beads.map((bead) => (
          <motion.div
            key={bead.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: '110vh', rotate: 360, opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: bead.duration, ease: 'linear' }}
            className={`bead bead-${bead.color} floating-bead`}
            style={{ left: bead.left, transform: `scale(${bead.scale})`, position: 'absolute' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- Reusable Menu Grid Components ---

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => (
  <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#150426]/90 backdrop-blur-md rounded-[1.5rem] overflow-hidden border border-white/5 group hover:shadow-[0_0_30px_rgba(255,179,0,0.15)] transition-all duration-500 flex flex-col h-full">
    <div className="relative aspect-square overflow-hidden bg-[#0d0208]">
      {item.image && <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />}
      {item.isSignature && <div className="absolute top-4 left-4 bg-mardiGold text-mardiPurple px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg z-10"><Star className="w-3 h-3 fill-current" /> SIGNATURE</div>}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button className="bg-white text-mardiPurple p-4 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform"><Plus size={24} strokeWidth={3} /></button>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h3 className="text-xl font-bold text-white group-hover:text-mardiGold transition-colors leading-tight">{item.name}</h3>
        <span className="text-mardiGold font-bold text-lg">{item.price}</span>
      </div>
      <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3 font-medium flex-grow">{item.description}</p>
      <button className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-mardiGreen font-bold text-xs tracking-[0.2em] uppercase hover:bg-mardiGreen hover:text-mardiPurple transition-all flex items-center justify-center gap-2">
        <ShoppingBag size={16} /> Add to Order
      </button>
    </div>
  </motion.div>
);

const MenuGridSection: React.FC<{ title?: string; description?: string; isSubpage?: boolean }> = ({ title = "The Cajun Menu", description = "Our Culinary Masterpieces", isSubpage = false }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.APPETIZERS);
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  return (
    <section className={`${isSubpage ? 'pt-40' : 'pt-24'} pb-24 bg-[#0d0208] relative min-h-screen overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div 
          className="wistia_embed wistia_async_vstx0wwv4f videoFoam=true" 
          style={{ width: '100%', height: '100%', position: 'absolute', opacity: 0.4 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <span className="text-mardiGreen font-bold tracking-[0.4em] uppercase text-xs mb-4 block">{description}</span>
          <h2 className="text-6xl md:text-7xl font-cajun text-mardiGold mb-8">{title}</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-12 pb-4 overflow-x-auto no-scrollbar max-w-5xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat as MenuCategory)} 
                className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm border ${activeCategory === cat ? 'bg-mardiPurple border-mardiGold text-mardiGold shadow-[0_0_15px_rgba(255,179,0,0.3)]' : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => <MenuCard key={item.id} item={item} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// --- Page Views ---

const HomeView: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => (
  <>
    <header className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div 
          className="wistia_embed wistia_async_vlzs2j8r43 videoFoam=true" 
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="text-mardiGreen font-bold tracking-[0.5em] uppercase text-sm mb-6 block drop-shadow-lg">Now Serving Authentic Louisiana</span>
          <h1 className="text-7xl md:text-9xl font-cajun text-white drop-shadow-2xl mb-8 leading-tight">
            Taste the <span className="text-mardiGold">Spirit</span><br />of New Orleans
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={() => setPage('Menu')} className="mardi-press px-12 py-5 bg-mardiGold text-mardiPurple font-bold rounded-full text-xl tracking-widest shadow-2xl">
              EXPLORE MENU
            </button>
            <button onClick={() => setPage('Contact')} className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full text-xl tracking-widest hover:bg-white/20 transition-all">
              BOOK A TABLE
            </button>
          </div>
        </motion.div>
      </div>
    </header>

    <div className="bg-[#0a0210] border-y border-white/5 py-16 relative z-30 shadow-2xl">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {[
          { label: 'Authentic Dishes', value: '45+' },
          { label: 'Years of Tradition', value: '25' },
          { label: 'States Served', value: '12' },
          { label: 'Happy Guests', value: '100k+' }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-5xl md:text-6xl font-cajun text-mardiGold mb-4 drop-shadow-[0_4px_10px_rgba(255,179,0,0.4)]">{stat.value}</div>
            <div className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/30 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    <MenuGridSection title="Spirit on a Plate" description="Fresh from the Bayou" />
  </>
);

const MenuView: React.FC = () => <MenuGridSection isSubpage={true} />;

const GalleryView: React.FC = () => {
  const photos = [
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1590759016226-c9002d4452c7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1582294101758-6927f6b95b19?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1546793665-c74683c3f43d?auto=format&fit=crop&q=80&w=800"
  ];
  return (
    <section className="pt-40 pb-24 bg-[#0d0208]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-6xl font-cajun text-mardiGold mb-12">The Visual Feast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((src, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="aspect-square overflow-hidden rounded-3xl border border-white/10">
              <img src={src} className="w-full h-full object-cover" alt="Cajun Food" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutView: React.FC = () => (
  <section className="pt-40 pb-24 bg-[#0d0208]">
    <div className="container mx-auto px-6 max-w-4xl">
      <h2 className="text-6xl font-cajun text-mardiGold mb-8 text-center">Our Story</h2>
      <div className="space-y-8 text-white/70 text-lg leading-relaxed text-center">
        <p>Founded in 1924, <span className="text-mardiGold font-bold">The Cajun Menu</span> began as a small family gathering in the heart of the French Quarter. Our recipes have been passed down through four generations, carrying the authentic spice and soul of Louisiana.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div className="p-8 bg-[#150426] rounded-3xl border border-white/5">
            <History className="text-mardiGreen w-10 h-10 mx-auto mb-4" />
            <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Legacy</h4>
            <p className="text-sm">A century of culinary excellence.</p>
          </div>
          <div className="p-8 bg-[#150426] rounded-3xl border border-white/5">
            <Users className="text-mardiGold w-10 h-10 mx-auto mb-4" />
            <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Family</h4>
            <p className="text-sm">Run by the same family since day one.</p>
          </div>
          <div className="p-8 bg-[#150426] rounded-3xl border border-white/5">
            <Star className="text-mardiPurple w-10 h-10 mx-auto mb-4" />
            <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-sm">Quality</h4>
            <p className="text-sm">Fresh, local ingredients only.</p>
          </div>
        </div>
        <p>Today, we continue to celebrate the spirit of Mardi Gras every single day. From our world-famous Gumbo to the sweet crunch of our powdered Beignets, every bite is an invitation to join the party.</p>
      </div>
    </div>
  </section>
);

const ContactView: React.FC = () => (
  <section className="pt-40 pb-24 bg-[#0d0208]">
    <div className="container mx-auto px-6 max-w-6xl">
      <h2 className="text-6xl font-cajun text-mardiGold mb-12 text-center">Get in Touch</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="p-10 bg-[#150426] rounded-[2.5rem] border border-white/5">
            <h3 className="text-3xl font-bold mb-8">Reservation Info</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-mardiGreen shrink-0" />
                <div>
                  <p className="font-bold text-white">Location</p>
                  <p className="text-white/50">Bourbon St, New Orleans, LA 70112</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-mardiGreen shrink-0" />
                <div>
                  <p className="font-bold text-white">Phone</p>
                  <p className="text-white/50">(504) 555-0123</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-mardiGreen shrink-0" />
                <div>
                  <p className="font-bold text-white">Opening Hours</p>
                  <p className="text-white/50">Mon-Fri: 11am - 10pm</p>
                  <p className="text-white/50">Sat-Sun: 10am - 12am</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form className="space-y-6 bg-white/5 p-10 rounded-[2.5rem] border border-white/10">
          <input type="text" placeholder="Your Name" className="w-full bg-[#0d0208] border border-white/10 rounded-xl px-6 py-4 focus:border-mardiGold outline-none transition-all" />
          <input type="email" placeholder="Your Email" className="w-full bg-[#0d0208] border border-white/10 rounded-xl px-6 py-4 focus:border-mardiGold outline-none transition-all" />
          <textarea placeholder="Message" rows={4} className="w-full bg-[#0d0208] border border-white/10 rounded-xl px-6 py-4 focus:border-mardiGold outline-none transition-all" />
          <button className="w-full bg-mardiGold text-mardiPurple font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-mardiGreen hover:text-mardiPurple transition-all">
            SEND MESSAGE <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Navbar: React.FC<{ currentPage: Page; setPage: (p: Page) => void }> = ({ currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fleurRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState && fleurRef.current) {
      const rect = fleurRef.current.getBoundingClientRect();
      triggerExplosion(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <nav className="crescent-royale-nav-container">
      <div className="crescent-nav-content">
        <div className="crescent-logo cursor-pointer" onClick={() => setPage('Home')}>
          <div className="logo-wrapper">
             <div className="wistia_embed wistia_async_ip3tp5t9me videoFoam=true" style={{ width: '100%', height: '100%' }} />
          </div>
          <span className="font-cajun tracking-wide ml-2">THE CAJUN MENU</span>
        </div>
        
        <ul className="crescent-nav-links hidden lg:flex">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <button onClick={() => setPage(item.label)} className={`${currentPage === item.label ? 'text-mardiGold' : 'text-white'}`}>{item.label}</button>
            </li>
          ))}
          <li>
            <button onClick={() => setPage('Menu')} className="px-6 py-2.5 rounded-full border border-mardiGold/40 bg-mardiGold/10 text-mardiGold font-bold text-xs tracking-[0.2em] hover:bg-mardiGold hover:text-mardiPurple transition-all">Order Online</button>
          </li>
        </ul>

        <div className="relative">
          <button 
            ref={fleurRef}
            type="button" 
            onClick={handleToggle} 
            className={`fleur-toggle lg:hidden ${isOpen ? 'active' : ''}`}
            aria-label="Toggle Menu"
          />
          {!isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="tap-me-indicator lg:hidden"
            >
              TAP ME
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }} 
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="glass-dark fixed right-0 top-[90px] md:top-[120px] flex w-full h-[calc(100vh-90px)] md:h-[calc(100vh-120px)] flex-col items-center justify-center gap-8 py-12 lg:hidden z-[999] shadow-2xl"
          >
            {NAV_LINKS.map((item, i) => (
              <motion.button 
                key={item.label}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => { setPage(item.label); setIsOpen(false); }} 
                className={`text-4xl font-bold transition-all tracking-[0.2em] uppercase hover:tracking-[0.4em] ${currentPage === item.label ? 'text-mardiGold' : 'text-white hover:text-mgGreen'}`}
              >
                {item.label}
              </motion.button>
            ))}
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => { setPage('Menu'); setIsOpen(false); }} 
              className="rounded-full border border-mardiGold bg-mardiGold px-12 py-5 font-bold text-mardiPurple shadow-xl text-xl tracking-[0.2em] mt-8 hover:bg-white transition-all"
            >
              ORDER ONLINE
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC<{ setPage: (p: Page) => void }> = ({ setPage }) => {
  const pendantText = "LOUISIANA";
  
  return (
    <footer className="relative bg-[#0d0208] pt-32 pb-16 overflow-hidden min-h-[600px] flex flex-col justify-end">
      {/* Background Interactive Layer - Beaded rig stretches full width and drapes from top */}
      <div className="absolute inset-0 z-0">
        <FloatingBeadsLayer />
        <div className="rig-container">
          {pendantText.split('').map((char, i) => (
            <HangingBeadLetter key={`${char}-${i}`} char={char} index={i} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0208] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Footer Layout Content */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Social Icons - Top Center Horizontally */}
        <div className="flex justify-center gap-8 mb-20">
          <a href="#" className="p-5 bg-white/5 rounded-full hover:bg-mardiGold hover:text-mardiPurple transition-all border border-white/10 hover:scale-110">
            <Instagram size={32} />
          </a>
          <a href="#" className="p-5 bg-white/5 rounded-full hover:bg-mardiGold hover:text-mardiPurple transition-all border border-white/10 hover:scale-110">
            <Facebook size={32} />
          </a>
          <a href="#" className="p-5 bg-white/5 rounded-full hover:bg-mardiGold hover:text-mardiPurple transition-all border border-white/10 hover:scale-110">
            <Mail size={32} />
          </a>
        </div>

        {/* 3-Column Layout: Hours | Location/Map | Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-16 items-start">
          
          {/* Left: All Hours */}
          <div className="flex flex-col gap-6">
            <h4 className="text-mardiGold font-cajun text-2xl tracking-widest border-b border-mardiGold/20 pb-2">SPIRIT HOURS</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-white/70">
                <span className="font-bold uppercase tracking-wider">Mon - Thu</span>
                <span className="font-mono">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span className="font-bold uppercase tracking-wider">Fri - Sat</span>
                <span className="font-mono">11:00 AM - 12:00 AM</span>
              </div>
              <div className="flex justify-between items-center text-mardiGreen">
                <span className="font-bold uppercase tracking-wider">Sunday</span>
                <span className="font-mono">10:00 AM - 09:00 PM</span>
              </div>
              <p className="text-[10px] text-white/30 italic uppercase tracking-widest pt-2">Jazz Brunch every Sunday at 10am</p>
            </div>
          </div>

          {/* Middle: Location & Map */}
          <div className="flex flex-col gap-6">
            <h4 className="text-mardiGold font-cajun text-2xl tracking-widest border-b border-mardiGold/20 pb-2 text-center">OUR BAYOU</h4>
            <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.882415177897!2d-90.0673414!3d29.9584379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a6119864d42b%3A0xc3f6e91f165a251!2sBourbon%20St%2C%20New%20Orleans%2C%20LA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-center text-white/50 flex items-center justify-center gap-2">
              <MapPin size={16} className="text-mardiGold" /> 421 Bourbon St, New Orleans, LA 70112
            </p>
          </div>

          {/* Right: Contact Information */}
          <div className="flex flex-col gap-6 text-right lg:text-right">
            <h4 className="text-mardiGold font-cajun text-2xl tracking-widest border-b border-mardiGold/20 pb-2">STAY CONNECTED</h4>
            <div className="space-y-6">
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Catering & Parties</p>
                <p className="text-xl font-bold flex items-center justify-end gap-3">
                  (504) 555-0123 <Phone size={18} className="text-mardiGreen" />
                </p>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">General Inquiry</p>
                <p className="text-xl font-bold flex items-center justify-end gap-3">
                  hello@cajunmenu.com <Mail size={18} className="text-mardiGreen" />
                </p>
              </div>
              <button onClick={() => setPage('Contact')} className="mt-4 px-8 py-3 bg-white text-mardiPurple font-bold rounded-xl hover:bg-mardiGold hover:text-white transition-all uppercase tracking-widest text-xs">
                Send a Message
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">© 2024 AUTHENTIC LOUISIANA EXPERIENCE</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-mardiGold transition-colors">Privacy</a>
            <a href="#" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-mardiGold transition-colors">Terms</a>
            <a href="#" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-mardiGold transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);
  const renderPage = () => {
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
    <main className="font-sans antialiased text-white selection:bg-mardiGold selection:text-mardiPurple">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      {renderPage()}
      <Footer setPage={setCurrentPage} />
    </main>
  );
};

export default App;

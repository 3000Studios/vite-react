import React, { useMemo, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  Menu as MenuIcon,
  Phone,
  X,
} from 'lucide-react';
import { MENU_ITEMS } from './newConstants';
import GatorBobWidget from './components/GatorBobWidget';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Order', to: '/order' },
  { label: 'Catering', to: '/catering' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const scrollReveal = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const useHeaderSolid = () => {
  const [solid, setSolid] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return solid;
};

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const solid = useHeaderSolid();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] h-16 md:h-[72px] transition-colors ${
        solid ? 'bg-[color:var(--bg)] shadow-sm border-b border-[color:var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-left"
        >
          <span className="text-[color:var(--primary)] font-serif text-xl md:text-2xl font-semibold tracking-tight">
            THE CAJUN <span className="text-[color:var(--accent)]">•</span> MENU
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-[color:var(--primary)] ${
                  isActive ? 'text-[color:var(--primary)]' : 'text-[color:var(--text)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => navigate('/order')}
            className="text-sm font-semibold text-[color:var(--secondary)] hover:text-[color:var(--primary)]"
          >
            Order Online
          </button>
          <button
            onClick={() => navigate('/reservations')}
            className="h-11 md:h-12 px-5 rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] text-sm font-semibold shadow-sm hover:shadow-md transition"
          >
            Reserve
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-[color:var(--text)]"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1200] bg-[color:var(--bg)]"
          >
            <div className="mx-auto max-w-6xl px-6 py-8 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--primary)] font-serif text-xl font-semibold">
                  THE CAJUN MENU
                </span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X />
                </button>
              </div>

              <div className="mt-10 flex-1 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-semibold text-[color:var(--text)]"
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="mt-6 space-y-4 text-sm text-[color:var(--muted)]">
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> (678) 899-7404
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} /> Wed–Sat 11AM–8PM, Sun 12PM–5PM
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => { setOpen(false); navigate('/reservations'); }}
                    className="h-12 rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold"
                  >
                    Reserve
                  </button>
                  <button
                    onClick={() => { setOpen(false); navigate('/order'); }}
                    className="h-12 rounded-full border border-[color:var(--border)] text-[color:var(--text)] font-semibold"
                  >
                    Order Online
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 md:pt-24 min-h-[72vh] md:min-h-[80vh] bg-[color:var(--bg)]">
      <div className="absolute inset-0 overflow-hidden">
        <wistia-player media-id="14ushhwlms" class="hero-wistia" aspect="1.7777777777777777" muted autoplay loop playsinline />
        <style>
          {`wistia-player[media-id='14ushhwlms']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/14ushhwlms/swatch');
              display: block;
              filter: blur(5px);
              width: 100%;
              height: 100%;
            }`}
        </style>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(24,16,40,0.72) 0%, rgba(24,16,40,0.55) 40%, rgba(24,16,40,0.0) 70%)',
        }}
        aria-hidden
      />
    </section>
  );
};

const HeroCopy: React.FC = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-[color:var(--bg)] py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={scrollReveal}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="text-sm uppercase tracking-widest text-[color:var(--accent)] font-semibold">
            Authentic Cajun Cuisine • Canton, GA
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-serif font-semibold leading-tight text-[color:var(--text)]">
            Big Cajun Flavor. Warm Southern Welcome.
          </h1>
          <p className="mt-4 text-base md:text-lg text-[color:var(--text)]/90 leading-relaxed">
            Fresh seafood, slow-simmered classics, and bold Louisiana comfort—served with Mardi Gras spirit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/reservations')}
              className="h-11 md:h-12 px-6 rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold shadow-sm hover:shadow-md transition"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => navigate('/order')}
              className="h-11 md:h-12 px-6 rounded-full border border-[color:var(--border)] text-[color:var(--text)] font-semibold"
            >
              Order Online
            </button>
          </div>
          <p className="mt-4 text-sm text-[color:var(--muted)]">Open Today • See Hours ↓</p>
        </motion.div>
      </div>
    </section>
  );
};

const QuickActions: React.FC = () => (
  <section className="py-12 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Call Now', icon: <Phone size={18} />, href: 'tel:6788997404' },
          { label: 'Directions', icon: <MapPin size={18} />, href: 'https://maps.google.com/?q=140+Keith+Dr,+Canton,+GA+30114' },
          { label: 'Hours', icon: <Clock size={18} />, href: '/contact' },
          { label: 'View Menu', icon: <ChevronRight size={18} />, href: '/menu' },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3 text-sm font-semibold text-[color:var(--text)] hover:shadow-sm transition"
          >
            <span className="text-[color:var(--accent)]">{action.icon}</span>
            {action.label}
          </a>
        ))}
      </div>
    </div>
  </section>
);
const SignatureFavorites: React.FC = () => {
  const highlights = MENU_ITEMS.filter((item) => item.isSignature).slice(0, 6);
  return (
    <section className="py-16 md:py-24 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-sm uppercase tracking-widest text-[color:var(--secondary)] font-semibold">Signature Favorites</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-serif text-[color:var(--primary)] leading-tight">Crave-worthy Cajun Classics</h2>
          </div>
          <a href="/menu" className="text-sm font-semibold text-[color:var(--accent)] flex items-center gap-2">
            View Menu <ChevronRight size={16} />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[color:var(--accent)] bg-[color:var(--card)] p-5 md:p-7 shadow-[0_0_24px_rgba(178,148,94,0.25)]">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[color:var(--border)]">
                {item.image?.endsWith('.mp4') ? (
                  <video className="w-full h-full object-cover" src={item.image} muted autoPlay loop playsInline />
                ) : (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl dish-title">{item.name}</h3>
                  <p className="text-sm text-[color:var(--accent)]">{item.description}</p>
                </div>
                <span className="text-sm font-semibold text-[color:var(--accent)]">{item.price}</span>
              </div>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-[color:var(--secondary)] px-3 py-1 text-xs text-[color:var(--accent)]">
                  Popular
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyLoveUs: React.FC = () => (
  <section className="py-16 md:py-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8">
      <div className="md:col-span-6 space-y-4">
        <h2 className="text-3xl md:text-4xl font-serif text-[color:var(--primary)]">Why People Love Us</h2>
        <ul className="space-y-3 text-[color:var(--text)]">
          <li className="flex items-start gap-3"><span className="text-[color:var(--accent)]">●</span> Made-to-order Cajun classics</li>
          <li className="flex items-start gap-3"><span className="text-[color:var(--accent)]">●</span> Family-friendly, welcoming vibe</li>
          <li className="flex items-start gap-3"><span className="text-[color:var(--accent)]">●</span> Great for groups + events</li>
        </ul>
      </div>
      <div className="md:col-span-6">
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 text-[color:var(--text)]">
          <p>
            We’re proud to bring Louisiana comfort to Canton—slow-simmered roux, sizzling seafood boils,
            and a warm table for every celebration.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ReservationsPreview: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-24 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-6">
          <h2 className="text-3xl md:text-4xl font-serif text-[color:var(--primary)]">Reserve in Seconds</h2>
          <p className="mt-3 text-[color:var(--text)]">
            Choose your time. Get instant confirmation. We’ll see you soon.
          </p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">For parties of 8+, call us.</p>
        </div>
        <div className="md:col-span-6">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[color:var(--text)]">
                <Calendar size={18} className="text-[color:var(--accent)]" /> Quick reservation form
              </div>
              <button
                onClick={() => navigate('/reservations')}
                className="h-11 md:h-12 w-full rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const ReviewsSection: React.FC = () => (
  <section className="py-16 md:py-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-serif text-[color:var(--primary)]">Reviews & Social Proof</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {['“Flavor-packed and so welcoming.”', '“Best seafood boil in Canton.”', '“Perfect for family night.”'].map((quote) => (
          <div key={quote} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 text-[color:var(--text)]">
            {quote}
          </div>
        ))}
      </div>
      <button className="mt-6 text-sm font-semibold text-[color:var(--accent)]">Read More Reviews</button>
    </div>
  </section>
);

const YelpReviewsSection: React.FC = () => (
  <section className="py-16 md:py-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-[color:var(--primary)]">Official Yelp Reviews</h2>
          <p className="mt-2 text-[color:var(--text)]">See what guests are saying on Yelp.</p>
        </div>
        <a
          href="https://www.yelp.com/biz/the-cajun-menu-canton"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-[color:var(--accent)] flex items-center gap-2"
        >
          View on Yelp <ExternalLink size={14} />
        </a>
      </div>
      <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
        <iframe
          title="The Cajun Menu Yelp Reviews"
          src="https://www.yelp.com/biz/the-cajun-menu-canton"
          className="w-full h-[420px] rounded-xl border border-[color:var(--border)]"
        />
      </div>
    </div>
  </section>
);
const LocationSection: React.FC = () => (
  <section className="py-16 md:py-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8">
      <div className="md:col-span-4 space-y-4">
        <h3 className="text-xl md:text-2xl font-serif text-[color:var(--primary)]">Find Us</h3>
        <p className="text-[color:var(--text)]">140 Keith Dr, Canton, GA 30114</p>
        <a className="text-sm font-semibold text-[color:var(--accent)]" href="https://maps.google.com/?q=140+Keith+Dr,+Canton,+GA+30114">
          Get Directions <ExternalLink size={14} className="inline" />
        </a>
      </div>
      <div className="md:col-span-4">
        <h3 className="text-xl md:text-2xl font-serif text-[color:var(--primary)]">Hours</h3>
        <div className="mt-3 text-sm text-[color:var(--text)] space-y-1">
          <div>Sunday: 12PM–5PM</div>
          <div>Monday: Closed</div>
          <div>Tuesday: Closed</div>
          <div>Wednesday/Thursday: 11AM–8PM</div>
          <div>Friday/Saturday: 11AM–8PM</div>
        </div>
      </div>
      <div className="md:col-span-4">
        <iframe
          title="The Cajun Menu"
          src="https://www.google.com/maps?q=140+Keith+Dr,+Canton,+GA+30114&output=embed&t=k"
          className="w-full h-72 rounded-2xl border border-[color:var(--border)]"
          loading="lazy"
        />
      </div>
    </div>
  </section>
);

const FinalCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 md:py-24 bg-[color:var(--primary)] text-[color:var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto w-16 h-[2px] bg-[color:var(--accent)] mb-6" />
        <h2 className="text-3xl md:text-4xl font-serif">Ready for real Cajun comfort?</h2>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/reservations')}
            className="h-11 md:h-12 px-6 rounded-full bg-[color:var(--bg)] text-[color:var(--primary)] font-semibold"
          >
            Reserve
          </button>
          <button
            onClick={() => navigate('/order')}
            className="h-11 md:h-12 px-6 rounded-full border border-[color:var(--accent)] text-[color:var(--bg)] font-semibold"
          >
            Order
          </button>
        </div>
      </div>
    </section>
  );
};

const HomeView: React.FC = () => (
  <main className="space-y-16 md:space-y-24">
    <Hero />
    <HeroCopy />
    <QuickActions />
    <SignatureFavorites />
    <WhyLoveUs />
    <ReservationsPreview />
    <ReviewsSection />
    <YelpReviewsSection />
    <LocationSection />
    <FinalCTA />
  </main>
);

const MenuView: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const reduceMotion = useReducedMotion();

  const categories = ['All', 'Appetizers', 'Salads', 'Signature', 'Seafood', 'Po-Boys', 'Desserts', 'Drinks'];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (category === 'Signature' && !item.isSignature) return false;
      if (category === 'Appetizers' && item.category !== 'Appetizers') return false;
      if (category === 'Salads' && item.category !== 'Salads') return false;
      if (category === 'Po-Boys' && item.category !== 'Po-Boys') return false;
      if (category === 'Desserts' && item.category !== 'Desserts') return false;
      if (category === 'Drinks' && item.category !== 'Drinks') return false;
      if (category === 'Seafood') {
        const seafoodRegex = /(shrimp|crab|crawfish|oyster|seafood|boil|gumbo)/i;
        if (!seafoodRegex.test(`${item.name} ${item.description}`)) return false;
      }
      if (category !== 'All' && category !== 'Signature' && category !== 'Seafood' && !['Appetizers', 'Salads', 'Desserts', 'Drinks', 'Po-Boys'].includes(category)) {
        return false;
      }
      if (q && !`${item.name} ${item.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--primary)]">The Menu</h1>
          <p className="mt-3 text-[color:var(--text)]">Made fresh. Bold seasoning. Real comfort.</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 justify-center sticky top-16 md:top-[72px] bg-[color:var(--bg)] py-4 z-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                category === cat
                  ? 'bg-[color:var(--primary)] text-[color:var(--bg)] border-[color:var(--primary)]'
                  : 'border-[color:var(--border)] text-[color:var(--text)]'
              }`}
            >
              {cat}
            </button>
          ))}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes…"
            className="ml-auto w-full md:w-64 border border-[color:var(--border)] rounded-full px-4 py-2 text-sm"
          />
        </div>

        <motion.div
          variants={scrollReveal}
          initial={reduceMotion ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item) => (
            <article key={item.id} className="rounded-2xl border border-[color:var(--accent)] bg-[color:var(--card)] p-5 md:p-7 flex flex-col shadow-[0_0_24px_rgba(178,148,94,0.25)]">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[color:var(--border)]">
                {item.image?.endsWith('.mp4') ? (
                  <video className="w-full h-full object-cover" src={item.image} muted autoPlay loop playsInline />
                ) : (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl dish-title">{item.name}</h3>
                  <p className="text-sm text-[color:var(--accent)] line-clamp-2">{item.description}</p>
                </div>
                <span className="text-sm font-semibold text-[color:var(--accent)]">{item.price}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {item.isSignature && (
                  <span className="px-2 py-1 rounded-full bg-[color:var(--secondary)] text-[color:var(--bg)]">Popular</span>
                )}
                <span className="px-2 py-1 rounded-full border border-[color:var(--border)] text-[color:var(--muted)]">Ask about allergies</span>
              </div>
            </article>
          ))}
        </motion.div>

        <p className="mt-8 text-sm text-[color:var(--muted)]">Ask about allergies and gluten-free options.</p>
      </div>
    </section>
  );
};
const ReservationsView: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [calendarLink, setCalendarLink] = useState('');

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
    setCalendarLink('');

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

      const startDate = `${payload.date}T${payload.time}`;
      const dtStart = new Date(startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const dtEnd = new Date(new Date(startDate).getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const ics = `BEGIN:VCALENDAR\\nVERSION:2.0\\nPRODID:-//The Cajun Menu//Reservations//EN\\nBEGIN:VEVENT\\nDTSTART:${dtStart}\\nDTEND:${dtEnd}\\nSUMMARY:Reservation for ${payload.name}\\nLOCATION:The Cajun Menu, 140 Keith Dr, Canton, GA 30114\\nEND:VEVENT\\nEND:VCALENDAR`;
      setCalendarLink(`data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`);

      setStatus('success');
      setMessage('Reservation confirmed! Check your email for confirmation.');
      form.reset();
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'We could not complete the reservation. Please try again.');
    }
  };

  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-6 space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--primary)]">Reserve in Seconds</h1>
          <p className="text-[color:var(--text)]">Choose your time. Get instant confirmation. We’ll see you soon.</p>
          <p className="text-sm text-[color:var(--muted)]">For parties of 8+, call us.</p>
        </div>
        <div className="md:col-span-6">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="name" placeholder="Name" className="w-full rounded-full border border-[color:var(--border)] px-4 py-3" required />
              <input name="email" placeholder="Email" className="w-full rounded-full border border-[color:var(--border)] px-4 py-3" required />
              <input name="phone" placeholder="Phone" className="w-full rounded-full border border-[color:var(--border)] px-4 py-3" required />
              <div className="grid grid-cols-2 gap-3">
                <input name="date" type="date" className="rounded-full border border-[color:var(--border)] px-4 py-3" required />
                <input name="time" type="time" className="rounded-full border border-[color:var(--border)] px-4 py-3" required />
              </div>
              <input name="guests" placeholder="Party size" className="w-full rounded-full border border-[color:var(--border)] px-4 py-3" required />
              <textarea name="notes" placeholder="Notes" className="w-full rounded-2xl border border-[color:var(--border)] px-4 py-3" />
              {message && (
                <div className={`rounded-xl px-4 py-3 text-sm ${status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}
              {calendarLink && (
                <a href={calendarLink} download="reservation.ics" className="text-sm font-semibold text-[color:var(--accent)]">
                  Add to Calendar
                </a>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="h-11 md:h-12 w-full rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting...' : 'Confirm Reservation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderView: React.FC = () => (
  <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--primary)]">Order Online</h1>
      <p className="mt-3 text-[color:var(--text)]">Order pickup or delivery from your favorite platform.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {['Order Pickup', 'Order Delivery'].map((label) => (
          <div key={label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <h3 className="text-xl font-serif text-[color:var(--primary)]">{label}</h3>
            <button className="mt-4 h-11 px-6 rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold">
              Start Order
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CateringView: React.FC = () => (
  <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--primary)]">Catering & Events</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Starter', 'Classic', 'Feast'].map((tier) => (
          <div key={tier} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <h3 className="text-xl font-serif text-[color:var(--primary)]">{tier} Package</h3>
            <p className="mt-2 text-[color:var(--text)]">Built for gatherings with bold Cajun flavor.</p>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
        <h3 className="text-xl font-serif text-[color:var(--primary)]">Request a Quote</h3>
        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Name', 'Email', 'Phone', 'Date', 'Guest Count'].map((label) => (
            <input key={label} placeholder={label} className="rounded-full border border-[color:var(--border)] px-4 py-3" />
          ))}
          <textarea placeholder="Notes" className="md:col-span-2 rounded-2xl border border-[color:var(--border)] px-4 py-3" />
          <button className="md:col-span-2 h-11 md:h-12 rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold">
            Request a Quote
          </button>
        </form>
      </div>
    </div>
  </section>
);

const AboutView: React.FC = () => (
  <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
      <div>
        <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--primary)]">Our Story</h1>
        <p className="mt-3 text-[color:var(--text)]">
          We’re a family-run kitchen bringing the soul of Louisiana to Canton—bold flavors, warm hospitality, and a table
          ready for your next celebration.
        </p>
      </div>
      <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
        <h3 className="text-xl font-serif text-[color:var(--primary)]">Chef Spotlight</h3>
        <p className="mt-2 text-[color:var(--text)]">Hand-stirred roux, slow-simmered classics, and modern Cajun flair.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]" />
        ))}
      </div>
    </div>
  </section>
);

const ContactView: React.FC = () => (
  <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8">
      <div className="md:col-span-6 space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--primary)]">Contact & Location</h1>
        <p className="text-[color:var(--text)]">140 Keith Dr, Canton, GA 30114</p>
        <a className="text-[color:var(--accent)]" href="tel:6788997404">(678) 899-7404</a>
      </div>
      <div className="md:col-span-6">
        <form className="space-y-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <input placeholder="Name" className="w-full rounded-full border border-[color:var(--border)] px-4 py-3" />
          <input placeholder="Email" className="w-full rounded-full border border-[color:var(--border)] px-4 py-3" />
          <textarea placeholder="Message" className="w-full rounded-2xl border border-[color:var(--border)] px-4 py-3" />
          <button className="h-11 md:h-12 w-full rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

const AdminView: React.FC = () => {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState('');
  const adminCode = import.meta.env.VITE_ADMIN_CODE || 'cajunmenu';

  if (!authed) {
    return (
      <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif text-[color:var(--primary)]">Admin Access</h1>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            className="mt-4 w-full rounded-full border border-[color:var(--border)] px-4 py-3"
          />
          <button
            onClick={() => setAuthed(code === adminCode)}
            className="mt-4 h-11 w-full rounded-full bg-[color:var(--secondary)] text-[color:var(--accent)] font-semibold"
          >
            Enter Dashboard
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 md:pt-28 pb-16 md:pb-24 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-4xl font-serif text-[color:var(--primary)]">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Traffic Overview', 'Top Pages', 'Devices'].map((label) => (
            <div key={label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['Referrers', 'Contact Submissions'].map((label) => (
            <div key={label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-[color:var(--bg)] border-t border-[color:var(--border)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-[color:var(--text)]">
      <div>
        <h3 className="font-serif text-[color:var(--primary)]">The Cajun Menu</h3>
        <p className="mt-2 text-[color:var(--muted)]">Bold Cajun comfort with a warm Southern welcome.</p>
      </div>
      <div>
        <h4 className="font-semibold">Hours</h4>
        <p>Sun 12–5</p>
        <p>Wed–Sat 11–8</p>
      </div>
      <div>
        <h4 className="font-semibold">Address</h4>
        <p>140 Keith Dr, Canton, GA 30114</p>
      </div>
      <div>
        <h4 className="font-semibold">Links</h4>
        <p><a href="/menu">Menu</a></p>
        <p><a href="/reservations">Reservations</a></p>
        <p><a href="/contact">Contact</a></p>
      </div>
    </div>
    <div className="border-t border-[color:var(--border)] text-center py-4 text-xs text-[color:var(--muted)]">
      © 2026 The Cajun Menu. All rights reserved.
    </div>
  </footer>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppShell = () => {
  useEffect(() => {
    const scripts = [
      'https://fast.wistia.com/player.js',
      'https://fast.wistia.com/embed/14ushhwlms.js',
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
    <div className="bg-[color:var(--bg)] text-[color:var(--text)]">
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/menu" element={<MenuView />} />
          <Route path="/reservations" element={<ReservationsView />} />
          <Route path="/order" element={<OrderView />} />
          <Route path="/catering" element={<CateringView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
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

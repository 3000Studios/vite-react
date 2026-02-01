import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menu';

const MenuItemCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-mardiGold/50 hover:shadow-[0_20px_60px_rgba(106,27,154,0.35)] flex flex-col h-full"
  >
    <div className="relative mb-6 h-56 w-full overflow-hidden rounded-2xl shrink-0">
      {item.image ? (
        <motion.img
          whileHover={{ scale: 1.12, rotate: 2 }}
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-mardiPurple to-mardiBlue">
          <span className="text-3xl font-black uppercase tracking-tight text-white/30">
            Tasty
          </span>
        </div>
      )}
      <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-mardiGold px-4 py-1 font-black text-mardiPurple shadow-lg z-10">
        {item.price}
      </div>
      {item.isSignature && (
        <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full border border-mardiPurple/20 bg-mardiPurple px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg z-10">
          <Star size={12} className="fill-mardiGold text-mardiGold" /> Signature
        </div>
      )}
    </div>

    <div className="flex flex-col flex-grow">
      <h3 className="mb-2 font-serif text-2xl font-black leading-tight text-white group-hover:text-mardiGold transition-colors">
        {item.name}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-white/70 flex-grow">
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
          {item.category}
        </span>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-mardiGreen hover:text-white"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>

    <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-mardiGreen/20 blur-3xl transition-opacity group-hover:opacity-40" />
    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mardiPurple/20 blur-3xl transition-opacity group-hover:opacity-40" />
  </motion.div>
);

const MenuSection = ({ category, items }) => {
  if (items.length === 0) return null;

  return (
    <section id={category.toLowerCase().replace(/\s+/g, '-')} className="py-16 first:pt-0">
      <div className="mb-12 flex items-center gap-4">
        <h2 className="font-serif text-4xl md:text-5xl font-black uppercase text-white">
          {category}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-mardiGold/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#080d1b] text-white selection:bg-mardiGold selection:text-mardiPurple">
      <Navbar />

      <main className="pt-32 pb-24 container mx-auto px-6">
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-mardiGold">
              Culinary Excellence
            </p>
            <h1 className="mb-6 font-serif text-5xl md:text-7xl font-black uppercase leading-tight">
              Our <span className="text-mardiGreen">Menu</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              Experience the authentic taste of Louisiana with our award-winning selection of Cajun classics, seafood boils, and signature po-boys.
            </p>
          </motion.div>
        </header>

        {/* Category Navigation (Quick Jump) */}
        <nav className="mb-20 flex flex-wrap justify-center gap-3">
          {MENU_CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-mardiGold hover:text-mardiPurple hover:border-mardiGold"
            >
              {cat}
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {MENU_CATEGORIES.map((category) => {
            const categoryItems = MENU_ITEMS.filter(item => item.category === category);
            return (
              <MenuSection
                key={category}
                category={category}
                items={categoryItems}
              />
            );
          })}
        </div>
      </main>

      <footer className="border-t border-white/5 bg-[#050811] py-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
          © 2026 The Cajun Menu
        </p>
      </footer>
    </div>
  );
}

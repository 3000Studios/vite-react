import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Reservations', href: '/#reservations' }, // Updated to absolute path anchor for cross-page nav
  { label: 'About', href: '/#about' }, // Updated to absolute path anchor
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load Wistia script for the logo
    const logoEmbedSrc = 'https://fast.wistia.com/embed/ip3tp5t9me.js';
    if (!document.querySelector(`script[src="${logoEmbedSrc}"]`)) {
      const s = document.createElement('script');
      s.src = logoEmbedSrc;
      s.type = 'module';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const createMardiGrasEffect = () => {
    const colors = ['#00ff41', '#ff00ff', '#ffd700'];
    const btn = document.getElementById('mobileToggle');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const container = document.body;

    for (let i = 0; i < 30; i += 1) {
      const bead = document.createElement('div');
      bead.className = 'bead';
      bead.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const tx = (Math.random() - 0.5) * 400;
      const ty = Math.random() * 600;
      bead.style.left = `${centerX}px`;
      bead.style.top = `${centerY}px`;
      bead.style.setProperty('--tx', `${tx}px`);
      bead.style.setProperty('--ty', `${ty}px`);
      bead.style.animation = `dropExplosion ${1 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
      container.appendChild(bead);
      setTimeout(() => bead.remove(), 2000);
    }

    for (let i = 0; i < 20; i += 1) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const tx = (Math.random() - 0.5) * 300;
      const ty = Math.random() * 400;
      confetti.style.left = `${centerX}px`;
      confetti.style.top = `${centerY}px`;
      confetti.style.setProperty('--tx', `${tx}px`);
      confetti.style.setProperty('--ty', `${ty}px`);
      confetti.style.animation = `dropExplosion ${0.5 + Math.random()}s linear forwards`;
      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 1500);
    }
  };

  return (
    <nav className="crescent-royale-nav-container fixed top-0 w-full z-50">
      <div className="crescent-pattern" />
      <div className="crescent-nav-content">
        <div className="crescent-logo">
          <wistia-player
            media-id="ip3tp5t9me"
            class="logo-wistia"
            aspect="1.0"
            muted
            autoplay
            loop
            playsinline
          />
          <span>The Cajun Menu</span>
        </div>

        <ul className="crescent-nav-links">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <a
              href="/menu"
              className="mardi-press px-4 py-2 rounded-full border border-white/30 bg-white/10 text-white font-bold text-xs tracking-[0.2em]"
            >
              Order Online
            </a>
          </li>
        </ul>

        <button
          type="button"
          id="mobileToggle"
          aria-label="Toggle menu"
          className={`fleur-toggle md:hidden ${isOpen ? 'active' : ''}`}
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            if (next) createMardiGrasEffect();
          }}
        />
      </div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="menu-pattern" />
        {NAV_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="/menu"
          className="mobile-link text-mardiGold"
          onClick={() => setIsOpen(false)}
        >
          Order Online
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

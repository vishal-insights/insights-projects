'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "bootstrap-icons/font/bootstrap-icons.css";
import CircularText from './CircularText';

// Accordion panel — animates open/close without layout jumps
function AccordionPanel({ isOpen, children }) {
  const wrapRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (isOpen) {
      el.style.height = '0px';
      el.style.overflow = 'hidden';
      const target = el.scrollHeight;
      rafRef.current = requestAnimationFrame(() => {
        el.style.transition = 'height 0.32s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.height = target + 'px';
        const onEnd = () => {
          el.style.height = 'auto';
          el.style.overflow = 'visible';
          el.removeEventListener('transitionend', onEnd);
        };
        el.addEventListener('transitionend', onEnd);
      });
    } else {
      const current = el.scrollHeight;
      el.style.overflow = 'hidden';
      el.style.height = current + 'px';
      rafRef.current = requestAnimationFrame(() => {
        el.style.transition = 'height 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.height = '0px';
      });
    }

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isOpen]);

  return (
    <div ref={wrapRef} style={{ height: 0, overflow: 'hidden' }}>
      {children}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // Close only when clicking OUTSIDE both navbar and drawer
  useEffect(() => {
    const handleClickOutside = (e) => {
      const inNav = navRef.current && navRef.current.contains(e.target);
      const inDrawer = drawerRef.current && drawerRef.current.contains(e.target);
      if (!inNav && !inDrawer) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: 'bi-house-door' },
    { name: 'About Us', href: '/about', dropdown: true, icon: 'bi-info-circle' },
    { name: 'My Services', href: '/my-services', dropdown: true, icon: 'bi-gear' },
    { name: 'Additional Services', href: '/additional-services', dropdown: true, icon: 'bi-layers' },
    { name: 'Help & FAQs', href: '/help-faqs', icon: 'bi-question-circle' },
    { name: 'Sign In / Sign Up', href: '/sign-up-in', icon: 'bi-box-arrow-in-right' },
    { name: 'Contact Us', href: '/contact-us', icon: 'bi-telephone' },
  ];

  const aboutItems = [
    { name: 'Image Gallery', href: '/about/image-gallery', icon: 'bi-image' },
    { name: 'Video Gallery', href: '/about/video-gallery', icon: 'bi-camera-video' },
    { name: 'Achievements', href: '/about/achievements', icon: 'bi-trophy' },
  ];

  const services = [
    { name: 'Company Incorporation', href: '/my-services/incorporation', icon: 'bi-building' },
    { name: 'Annual Filings & ROC Compliance', href: '/my-services/annual-filings', icon: 'bi-journal-check' },
    { name: 'Secretarial Audit', href: '/my-services/secretarial-audit', icon: 'bi-search' },
    { name: 'Share Allotment & Transfer', href: '/my-services/share-transfer', icon: 'bi-people' },
    { name: 'Board Meetings & Resolutions', href: '/my-services/board-meetings', icon: 'bi-clipboard-check' },
    { name: 'Trademark Filing', href: '/my-services/trademark', icon: 'bi-patch-check' },
    { name: 'FEMA & RBI Compliances', href: '/my-services/fema-rbi', icon: 'bi-bank' },
    { name: 'GST & Regulatory Compliances', href: '/my-services/gst', icon: 'bi-receipt' },
    { name: 'Startup Advisory', href: '/my-services/startup-advisory', icon: 'bi-lightbulb' },
    { name: 'ROC Matters', href: '/my-services/roc', icon: 'bi-briefcase' },
    { name: 'BSE Compliances', href: '/my-services/bse', icon: 'bi-bar-chart' },
    { name: 'NSE Compliances', href: '/my-services/nse', icon: 'bi-graph-up' },
    { name: 'RBI Approvals & Filings', href: '/my-services/rbi', icon: 'bi-cash-stack' },
    { name: 'NCLT Representation', href: '/my-services/nclt', icon: 'bi-file-earmark-text' },
    { name: 'NCLAT Appeals', href: '/my-services/nclat', icon: 'bi-file-earmark-medical' },
  ];

  const additional = [
    { name: 'Accounting & Bookkeeping', href: '/additional-services/accounting', icon: 'bi-calculator' },
    { name: 'Payroll Management', href: '/additional-services/payroll', icon: 'bi-wallet2' },
    { name: 'Tax Planning & Filing', href: '/additional-services/tax', icon: 'bi-percent' },
    { name: 'Business Advisory', href: '/additional-services/advisory', icon: 'bi-briefcase-fill' },
    { name: 'Legal Drafting', href: '/additional-services/legal', icon: 'bi-file-earmark-text' },
    { name: 'Investment Compliance', href: '/additional-services/investment', icon: 'bi-piggy-bank' },
  ];

  const getDropdownItems = (name) => {
    if (name === 'My Services') return services;
    if (name === 'Additional Services') return additional;
    if (name === 'About Us') return aboutItems;
    return [];
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500;600&display=swap');

        :root {
          --gold: #c9a84c;
          --gold-light: #e2c97e;
          --dark: #0a0a0f;
          --dark-glass: rgba(8, 8, 16, 0.92);
          --border-gold: rgba(201, 168, 76, 0.25);
        }

        .sk-navbar {
          font-family: 'Raleway', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.4s ease;
          background: var(--dark-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-gold);
        }

        .sk-navbar.scrolled {
          box-shadow: 0 4px 40px rgba(201, 168, 76, 0.12);
        }

        .sk-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.6rem 1.5rem;
          gap: 1rem;
        }

        /* Logo area */
        .sk-logo-wrap {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .sk-logo-text {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.05em;
          line-height: 1.2;
          white-space: nowrap;
        }

        .sk-logo-sub {
          font-family: 'Raleway', sans-serif;
          font-size: 0.6rem;
          font-weight: 400;
          color: rgba(201, 168, 76, 0.6);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        /* Desktop Nav */
        .sk-desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          flex-wrap: nowrap;
        }

        .sk-nav-item {
          position: relative;
        }

        .sk-nav-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.6rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: 0.03em;
          transition: all 0.25s ease;
          border: 1px solid transparent;
        }

        .sk-nav-link:hover,
        .sk-nav-link.active {
          color: var(--gold-light);
          background: rgba(201, 168, 76, 0.08);
          border-color: var(--border-gold);
        }

        .sk-nav-link .bi {
          font-size: 0.85rem;
        }

        /* Dropdown */
        .sk-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          background: rgba(10, 10, 18, 0.97);
          border: 1px solid var(--border-gold);
          border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .sk-nav-item:hover .sk-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .sk-dropdown-grid {
          display: grid;
          gap: 2px;
          padding: 0.5rem;
        }

        .sk-dropdown-grid.cols-2 {
          grid-template-columns: 1fr 1fr;
          width: 420px;
        }

        .sk-dropdown-grid.cols-1 {
          grid-template-columns: 1fr;
          width: 200px;
        }

        .sk-dropdown-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.65rem;
          border-radius: 6px;
          font-size: 0.76rem;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: all 0.18s ease;
          border: 1px solid transparent;
        }

        .sk-dropdown-link:hover {
          background: rgba(201, 168, 76, 0.1);
          color: var(--gold-light);
          border-color: var(--border-gold);
        }

        .sk-dropdown-link .bi {
          font-size: 0.8rem;
          color: var(--gold);
          flex-shrink: 0;
        }

        /* Divider in dropdown header */
        .sk-dropdown-header {
          padding: 0.6rem 1rem 0.4rem;
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--gold);
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-gold);
          margin-bottom: 0.25rem;
        }

        /* Hamburger Button */
        .sk-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid var(--border-gold);
          border-radius: 8px;
          background: rgba(201, 168, 76, 0.05);
          cursor: pointer;
          gap: 5px;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .sk-hamburger:hover {
          background: rgba(201, 168, 76, 0.12);
          border-color: var(--gold);
        }

        .sk-bar {
          width: 20px;
          height: 2px;
          background: var(--gold);
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center;
        }

        .sk-hamburger.open .sk-bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .sk-hamburger.open .sk-bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .sk-hamburger.open .sk-bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .sk-mobile-drawer {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          width: min(340px, 88vw);
          height: 100dvh;
          background: rgba(8, 8, 16, 0.98);
          border-left: 1px solid var(--border-gold);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 998;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
          padding-bottom: 2rem;
        }

        .sk-mobile-drawer.open {
          transform: translateX(0);
        }

        .sk-mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          z-index: 997;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .sk-mobile-overlay.open {
          opacity: 1;
        }

        .sk-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-gold);
          position: sticky;
          top: 0;
          background: rgba(8, 8, 16, 0.98);
          z-index: 1;
        }

        .sk-drawer-brand {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.05em;
        }

        .sk-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid var(--border-gold);
          border-radius: 6px;
          background: transparent;
          color: var(--gold);
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
        }

        .sk-close-btn:hover {
          background: rgba(201,168,76,0.12);
        }

        .sk-mobile-nav {
          padding: 0.75rem 0;
        }

        .sk-mobile-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          transition: all 0.2s ease;
          border-left: 2px solid transparent;
          letter-spacing: 0.02em;
        }

        .sk-mobile-link:hover,
        .sk-mobile-link.active {
          color: var(--gold-light);
          background: rgba(201,168,76,0.07);
          border-left-color: var(--gold);
        }

        .sk-mobile-link .bi {
          font-size: 1rem;
          color: var(--gold);
          width: 18px;
          text-align: center;
        }

        .sk-mobile-accordion-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.75rem 1.25rem;
          font-size: 0.88rem;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          background: transparent;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }

        .sk-mobile-accordion-btn:hover,
        .sk-mobile-accordion-btn.open {
          color: var(--gold-light);
          background: rgba(201,168,76,0.07);
          border-left-color: var(--gold);
        }

        .sk-acc-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sk-acc-left .bi {
          font-size: 1rem;
          color: var(--gold);
          width: 18px;
          text-align: center;
        }

        .sk-acc-chevron {
          font-size: 0.7rem;
          color: var(--gold);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .sk-mobile-accordion-btn.open .sk-acc-chevron {
          transform: rotate(180deg);
        }

        .sk-sub-menu-inner {
          background: rgba(201, 168, 76, 0.03);
          border-left: 1px solid var(--border-gold);
          margin-left: 1.25rem;
          border-radius: 0 0 8px 0;
          padding-bottom: 0.25rem;
        }

        .sk-sub-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 1rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.18s ease;
          border-left: 2px solid transparent;
        }

        .sk-sub-link:hover {
          color: var(--gold-light);
          background: rgba(201,168,76,0.07);
          border-left-color: var(--gold);
        }

        .sk-sub-link .bi {
          font-size: 0.8rem;
          color: rgba(201,168,76,0.6);
          width: 16px;
          text-align: center;
        }

        .sk-mobile-divider {
          height: 1px;
          background: var(--border-gold);
          margin: 0.5rem 1.25rem;
        }

        /* Responsive breakpoints */
        @media (max-width: 1100px) {
          .sk-nav-link {
            font-size: 0.72rem;
            padding: 0.4rem 0.45rem;
            gap: 0.25rem;
          }
          .sk-nav-link .bi {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 900px) {
          .sk-desktop-nav {
            display: none;
          }
          .sk-hamburger {
            display: flex;
          }
          .sk-mobile-drawer {
            display: block;
          }
          .sk-mobile-overlay {
            display: block;
          }
        }

        /* Scrollbar for drawer */
        .sk-mobile-drawer::-webkit-scrollbar {
          width: 4px;
        }
        .sk-mobile-drawer::-webkit-scrollbar-track {
          background: transparent;
        }
        .sk-mobile-drawer::-webkit-scrollbar-thumb {
          background: var(--border-gold);
          border-radius: 2px;
        }
      `}</style>

      {/* Mobile Overlay */}
      <div
        className={`sk-mobile-overlay ${mobileOpen ? 'open' : ''}`}
        onClick={() => { setMobileOpen(false); setMobileExpanded(null); }}
      />

      {/* Mobile Drawer */}
      <div ref={drawerRef} className={`sk-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="sk-drawer-header">
          <div className="sk-drawer-brand">SK DWIVEDI & ASSOCIATES</div>
          <button className="sk-close-btn" onClick={() => setMobileOpen(false)}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <nav className="sk-mobile-nav">
          {navItems.map((item, idx) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            if (item.dropdown) {
              const dropItems = getDropdownItems(item.name);
              const isExpanded = mobileExpanded === item.name;
              return (
                <div key={item.href}>
                  <button
                    className={`sk-mobile-accordion-btn ${isExpanded ? 'open' : ''} ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                  >
                    <span className="sk-acc-left">
                      <i className={`bi ${item.icon}`} />
                      {item.name}
                    </span>
                    <i className="bi bi-chevron-down sk-acc-chevron" />
                  </button>
                  <AccordionPanel isOpen={isExpanded}>
                    <div className="sk-sub-menu-inner">
                      {dropItems.map(sub => (
                        <Link key={sub.href} href={sub.href} className="sk-sub-link">
                          <i className={`bi ${sub.icon}`} />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionPanel>
                  {idx < navItems.length - 1 && <div className="sk-mobile-divider" />}
                </div>
              );
            }

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`sk-mobile-link ${isActive ? 'active' : ''}`}
                >
                  <i className={`bi ${item.icon}`} />
                  {item.name}
                </Link>
                {idx < navItems.length - 1 && <div className="sk-mobile-divider" />}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Navbar */}
      <nav className={`sk-navbar ${scrolled ? 'scrolled' : ''}`} ref={navRef}>
        <div className="sk-inner">

          {/* Logo */}
          <div className="sk-logo-wrap">
            <CircularText
              text="SK*DWIVEDI*&*ASSOCIATES*"
              onHover="speedUp"
              spinDuration={20}
              className="custom-class"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="sk-logo-text">SK Dwivedi</span>
              <span className="sk-logo-sub">& Associates</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="sk-desktop-nav" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navItems.map(item => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

              if (item.dropdown) {
                const dropItems = getDropdownItems(item.name);
                const isWide = item.name !== 'About Us';
                return (
                  <li key={item.href} className="sk-nav-item">
                    <Link href={item.href} className={`sk-nav-link ${isActive ? 'active' : ''}`}>
                      <i className={`bi ${item.icon}`} />
                      <span>{item.name}</span>
                      <i className="bi bi-chevron-down" style={{ fontSize: '0.6rem', opacity: 0.6 }} />
                    </Link>
                    <div className="sk-dropdown">
                      <div className="sk-dropdown-header">{item.name}</div>
                      <div className={`sk-dropdown-grid ${isWide ? 'cols-2' : 'cols-1'}`}>
                        {dropItems.map(sub => (
                          <Link key={sub.href} href={sub.href} className="sk-dropdown-link">
                            <i className={`bi ${sub.icon}`} />
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href} className="sk-nav-item">
                  <Link href={item.href} className={`sk-nav-link ${isActive ? 'active' : ''}`}>
                    <i className={`bi ${item.icon}`} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger */}
          <button
            className={`sk-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="sk-bar" />
            <span className="sk-bar" />
            <span className="sk-bar" />
          </button>
        </div>
      </nav>
    </>
  );
}

export const metadata = {
  title: "skdassociates",
  description: "Generated by create next app",
};
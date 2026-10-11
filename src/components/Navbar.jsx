import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import "./Navbar.css";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -16,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.from(linksRef.current?.children || [], {
        opacity: 0,
        y: -8,
        stagger: 0.06,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.2,
      });
      gsap.from(actionsRef.current, {
        opacity: 0,
        x: 16,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.3,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("nav-scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" ref={logoRef} className="navbar-logo">
          <div className="navbar-logo-icon">
            <span>V</span>
          </div>
          <span className="navbar-logo-text">VERITY</span>
        </Link>

        {/* Desktop nav pills */}
        <div ref={linksRef} className="navbar-links">
          <a href="#features" className="navbar-pill">Features</a>
          <a href="#how-it-works" className="navbar-pill">How it Works</a>
          <a href="#about" className="navbar-pill">About</a>
        </div>

        {/* CTA */}
        <div ref={actionsRef} className="navbar-actions">
          <Link to="/sign-in" className="navbar-pill navbar-pill--ghost">
            Log In
          </Link>
          <Link to="/sign-up" className="btn-primary" style={{ padding: "0.4rem 1.125rem", fontSize: "1rem" }}>
            Get Started
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="navbar-mobile">
          <a href="#features" className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>How it Works</a>
          <a href="#about" className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>About</a>
          <div className="navbar-mobile-divider" />
          <Link to="/sign-in" className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>Log In</Link>
          <Link to="/sign-up" className="btn-primary" style={{ justifyContent: "center" }} onClick={() => setMobileOpen(false)}>
            Get Started <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      )}
    </nav>
  );
}

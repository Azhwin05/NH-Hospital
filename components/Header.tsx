"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  transparent?: boolean;
  activePage?: "about" | "specialities" | "find-doctor" | "book" | "home";
}

export function Header({ transparent = false, activePage }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // FIX #3: Scroll-to-solid transition for transparent (home) header
  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileOpen) return;
    const onScroll = () => setMobileOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const isSolid = !transparent || scrolled;

  const navLinks = [
    { href: "/about", label: "About Us", hasDropdown: true, key: "about" },
    { href: "/specialities", label: "Specialities", hasDropdown: true, key: "specialities" },
    { href: "/find-doctor", label: "Find A Doctor", hasDropdown: false, key: "find-doctor" },
    { href: "#", label: "Health Packages", hasDropdown: false, key: "health" },
    { href: "#", label: "International Patients", hasDropdown: false, key: "intl" },
  ];

  return (
    <>
      {/* FIX #3: fixed when transparent (home), sticky on all interior pages */}
      <header className={`${transparent ? "fixed" : "sticky"} top-0 left-0 w-full z-50 transition-all duration-300`}>

        {/* Top Bar */}
        <div className={`text-white text-[11px] py-1.5 px-4 md:px-8 flex justify-between items-center transition-colors duration-300 ${isSolid ? "bg-footerBlue" : "bg-black/30 backdrop-blur-sm border-b border-white/10"}`}>
          <div className="flex items-center gap-2">
            <i className="ph-fill ph-ambulance text-red-400 text-base"></i>
            <span>24/7 Ambulance : <strong>1066</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-white/80">
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white transition-colors">Blogs</a>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <i className="ph ph-map-pin"></i> Kalaburagi <i className="ph ph-caret-down text-[10px]"></i>
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className={`py-3.5 px-4 md:px-8 flex justify-between items-center relative transition-all duration-300 ${isSolid ? "bg-white shadow-sm border-b border-gray-100" : "bg-transparent"}`}>

          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 relative z-10 transition-colors duration-300 ${isSolid ? "text-brandBlue" : "text-white"}`}>
            <i className="ph-fill ph-shield-check text-4xl"></i>
            <div className="leading-tight">
              <div className="font-black text-2xl uppercase tracking-wider">NK</div>
              <div className="text-[10px] font-bold tracking-widest uppercase opacity-90">Hospital</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7 text-sm font-medium w-max z-0">
            {navLinks.map((link) => {
              const isActive = activePage === link.key;
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`flex items-center gap-1 transition-colors ${
                    isActive
                      ? isSolid ? "text-brandBlue font-semibold" : "text-white font-semibold"
                      : isSolid ? "text-gray-700 hover:text-brandBlue" : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <i className="ph ph-caret-down text-[10px] opacity-60"></i>}
                </Link>
              );
            })}
          </div>

          {/* Right — Desktop */}
          <div className="hidden md:flex items-center gap-4 relative z-10">
            {/* FIX #13: consistent phone number */}
            <a href="tel:08042444222" className={`flex items-center gap-1.5 font-semibold text-sm transition-colors ${isSolid ? "text-gray-700" : "text-white/90"}`}>
              <i className="ph ph-phone text-red-500 text-base"></i> 080 4244 4222
            </a>
            <Link
              href="/book"
              className={`px-4 py-2 rounded-md text-xs font-bold tracking-wide flex items-center gap-2 transition-colors ${
                isSolid
                  ? "bg-brandBlue hover:bg-blue-800 text-white shadow-sm"
                  : "bg-white/10 border border-white/40 hover:bg-white/20 text-white backdrop-blur-sm"
              }`}
            >
              <i className="ph ph-calendar-plus text-sm"></i> Book Appointment
            </Link>
          </div>

          {/* FIX #2: Hamburger — mobile/tablet */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px] transition-colors ${isSolid ? "text-gray-800" : "text-white"}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`w-5 h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </nav>

        {/* FIX #2: Mobile Drawer */}
        <div className={`lg:hidden bg-white border-t border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between py-3 px-3 rounded-xl text-sm font-medium transition-colors ${
                  activePage === link.key
                    ? "text-brandBlue bg-blue-50 font-bold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-brandBlue"
                }`}
              >
                {link.label}
                <i className="ph ph-arrow-right text-gray-300 text-xs"></i>
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2.5">
              <a
                href="tel:08042444222"
                className="flex items-center gap-2 text-sm text-gray-600 py-2 px-3 font-medium"
              >
                <i className="ph ph-phone text-red-500"></i> 080 4244 4222
              </a>
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="bg-brandBlue hover:bg-blue-800 text-white text-center py-3.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <i className="ph ph-calendar-plus"></i> Book Appointment
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

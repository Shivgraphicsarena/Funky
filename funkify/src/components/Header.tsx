import React, { useState } from "react";
import { Menu, X, ShoppingCart, Search, User, Instagram, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FUNKIFY_LOGO_PATH, INSTAGRAM_HANDLE } from "../types";

interface HeaderProps {
  whatsAppNumber: string;
  setWhatsAppNumber: (num: string) => void;
  cartCount: number;
  onCartToggle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  whatsAppNumber,
  setWhatsAppNumber,
  cartCount,
  onCartToggle,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  return (
    <header className="w-full bg-white text-black sticky top-0 z-50">
      {/* Top Discount / WhatsApp Config Info Bar */}
      <AnimatePresence>
        {showPromoBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black text-[#F5F5F5] py-2 px-4 text-center relative text-[11px] md:text-xs z-50 text-center font-sans tracking-wide border-b border-white/5 font-medium"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 md:gap-2.5 px-6">
              <span>🔥 DROP 01 LIVE NOW • Direct Orders on WhatsApp • Use Coupon <strong className="text-white font-black underline font-mono tracking-wider ml-0.5 mr-0.5 text-xs bg-zinc-800 px-1.5 py-0.5 rounded">GET20</strong> for a demo discount!</span>
            </div>
            <button
              onClick={() => setShowPromoBanner(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:text-white text-neutral-400 transition"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main navigation area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-1.5 md:gap-2 group">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 px-1.5 hover:bg-neutral-50 rounded-lg text-black transition cursor-pointer md:hidden shrink-0"
              aria-label="Toggle menu"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>

            <a href="#" className="flex items-center gap-1.5 md:gap-2.5 py-1 select-none focus:outline-none">
              <img
                src={FUNKIFY_LOGO_PATH}
                alt="Funkify Logo"
                className="w-8 h-8 md:w-11 md:h-11 rounded-full object-cover border border-neutral-100 shadow-sm animate-fade-in"
                referrerPolicy="no-referrer"
              />
              <span className="font-sans font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tighter text-black uppercase cursor-pointer whitespace-nowrap">
                FUNKIFY
              </span>
            </a>
          </div>

          {/* Center Links: Desktop */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-black">
            <a href="#shop" className="hover:text-neutral-550 transition duration-150">Shop</a>
            <a href="#new-arrivals" className="hover:text-neutral-550 transition duration-150 whitespace-nowrap">New Arrivals</a>
            <a href="#about" className="hover:text-neutral-550 transition duration-150">Manifesto</a>
            <a href="#testimonials" className="hover:text-neutral-550 transition duration-150 whitespace-nowrap">Testimonials</a>
          </nav>

          {/* Search Bar Input: Desktop */}
          <div className="hidden md:flex flex-grow max-w-md relative items-center">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, vibes, streetwear..."
              className="w-full bg-neutral-100 placeholder-neutral-450 border border-transparent rounded-full pl-11 pr-5 py-2.5 text-xs text-black outline-none focus:bg-white focus:border-black/20 transition duration-200 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-neutral-400 hover:text-black absolute right-3"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Instagram - Hidden on Mobile */}
            <a
              href={INSTAGRAM_HANDLE}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-2 hover:bg-neutral-50 rounded-full text-black hover:scale-105 transition duration-150"
              title="Official Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Cart Icon */}
            <button
              onClick={onCartToggle}
              className="p-2 hover:bg-neutral-50 rounded-full text-black hover:scale-105 transition relative cursor-pointer"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 md:w-4.5 md:h-4.5 bg-black border border-white text-white font-mono text-[8px] md:text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>


          </div>

        </div>
      </div>

      {/* Mobile-Only Dedicated Large Search Bar */}
      <div className="md:hidden px-4 pb-3.5 pt-1 border-b border-neutral-100 bg-white">
        <div className="relative flex items-center w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, vibes, streetwear..."
            className="w-full bg-neutral-100 placeholder-neutral-400 border border-neutral-150 rounded-full pl-10 pr-10 py-2.5 text-xs text-black outline-none focus:bg-white focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-all duration-200 font-semibold"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 px-1.5 text-neutral-400 hover:text-black absolute right-2.5 transition"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>



      {/* Mobile Sidebar menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-100 z-50 shadow-lg font-sans">
            <nav className="px-5 pt-3 pb-6 flex flex-col uppercase tracking-wider font-extrabold text-xs text-black gap-3.5">
              <a
                href="#shop"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-neutral-550 border-b border-neutral-50"
              >
                Shop Collection
              </a>
              <a
                href="#new-arrivals"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-neutral-550 border-b border-neutral-50 animate-pulse"
              >
                New Arrivals
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-neutral-550 border-b border-neutral-50"
              >
                Our Manifesto
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 hover:text-neutral-550"
              >
                Happy Critics
              </a>
            </nav>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

import React from "react";
import { Compass, Instagram } from "lucide-react";
import { INSTAGRAM_HANDLE } from "../types";

export default function Footer() {
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Manifesto", href: "#about" },
        { label: "Design Story", href: "#shop" },
        { label: "Careers", href: "#" }
      ]
    },
    {
      title: "HELP",
      links: [
        { label: "Customer Support", href: "mailto:support@funkifystyle.com" },
        { label: "Delivery Details", href: "#" },
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" }
      ]
    },
    {
      title: "RESOURCES",
      links: [
        { label: "Free Size Guide", href: "#" },
        { label: "WhatsApp Routing Info", href: "#" },
        { label: "Jaipur Loom Tour", href: "#" },
        { label: "Streetwear Care FAQ", href: "#" }
      ]
    },
    {
      title: "FAQ",
      links: [
        { label: "Track Order", href: "#" },
        { label: "Orders & Payments", href: "#" },
        { label: "Returns & Exchanges", href: "#" },
        { label: "Vibe Custom Requests", href: "#" }
      ]
    }
  ];

  const paymentBadges = ["Visa", "Mastercard", "Paypal", "UPI Pay", "Apple Pay"];

  return (
    <footer className="bg-[#f0f0f0] pt-32 pb-8 text-neutral-600 relative select-none font-sans z-10 border-t border-neutral-200">
      
      {/* Absolute Overhanging Card - WhatsApp Order Workflow Info */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-7xl bg-black rounded-[32px] p-6 md:p-10 text-white z-20 shadow-xl border border-white/5 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-8 text-left">
            <h3 className="text-2.5xl sm:text-3.5xl font-black uppercase tracking-tighter leading-none mb-2">
              WE ACCEPT ORDERS DIRECTLY <br />
              ON WHATSAPP • DROP 01 LIVE!
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              We focus purely on crafting premium, organic heavyweight essentials. No account sign-up needed! Simply add your chosen mood items to the cart, click checkout, and chat directly with us on WhatsApp to finalize your delivery!
            </p>
          </div>

          <div className="md:col-span-4 w-full flex flex-col sm:flex-row md:flex-col gap-3 justify-end items-stretch md:items-end">
            <a
              href="#shop"
              className="bg-white text-black hover:bg-neutral-100 font-bold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center font-sans"
            >
              Explore Dropped Moods
            </a>
            <a
              href={INSTAGRAM_HANDLE}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 border border-neutral-800 text-white hover:bg-zinc-800 font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition duration-150 flex items-center justify-center gap-2 cursor-pointer text-center font-sans"
            >
              <Instagram className="w-4 h-4 shrink-0" />
              <span>Funkify Instagram</span>
            </a>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8">
        {/* Five columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Brand Presentation col */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="font-sans font-black text-2.5xl uppercase tracking-tighter text-black">
              FUNKIFY
            </h4>
            <p className="text-neutral-500 font-sans text-xs max-w-sm leading-relaxed font-medium">
              We create premium heavyweight basics infused with genuine mental landscapes. Designed as therapeutic street armor, crafted in historical Jaipur, RJ. All feelings respected.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={INSTAGRAM_HANDLE}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white transition duration-200"
                title="Instagram Link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white border border-neutral-300 flex items-center justify-center hover:bg-black hover:text-white transition duration-200"
                title="Location Map"
              >
                <Compass className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Links cols */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left">
            {footerLinks.map((col, i) => (
              <div key={i} className="space-y-4">
                <h5 className="font-sans font-black text-xs text-black tracking-widest uppercase">
                  {col.title}
                </h5>
                <ul className="space-y-2 text-xs font-medium">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-neutral-500 hover:text-black transition duration-150"
                      >
                        {col.title === "FAQ" && link.label === "Returns & Exchanges" ? "Returns" : link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Footnotes copyright / billing badges */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-1.5 md:gap-4 text-center md:text-left">
            <span>© {year} FUNKIFY Streetwear Co. All Rights Reserved.</span>
            <span className="hidden sm:inline opacity-30 text-neutral-350">•</span>
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">Jaipur Textile Guild Alliance</span>
          </div>

          {/* Simulated Billing badges list */}
          <div className="flex flex-wrap items-center gap-2">
            {paymentBadges.map((pm, i) => (
              <span
                key={i}
                className="bg-white border rounded-lg px-2.5 py-1 text-[10px] font-mono text-zinc-800 font-extrabold uppercase select-none border-neutral-200 shadow-xs"
              >
                {pm}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

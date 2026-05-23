import React from "react";
import { Star, Heart } from "lucide-react";
import { PRODUCTS_DATA, Product } from "../types";

interface NewArrivalsProps {
  onProductClick: (id: string) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export default function NewArrivals({
  onProductClick,
  wishlist,
  onToggleWishlist
}: NewArrivalsProps) {
  // Grab first 4 items as "New Arrivals"
  const itemsToShow = PRODUCTS_DATA.slice(0, 4);

  return (
    <section id="new-arrivals" className="bg-[#FFFFFF] py-16 md:py-20 text-black border-b border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-black text-white px-3.5 py-1.5 rounded-full inline-block">
            🔥 JUST RELEASED
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-black uppercase tracking-tighter leading-none mt-3">
            NEW ARRIVALS
          </h2>
          <p className="text-neutral-500 font-sans text-xs md:text-sm mt-2 font-medium leading-relaxed">
            Meticulously hand-loomed oversized cuts with heavy density combed cotton. Built to endure seasons of overthinking.
          </p>
        </div>

        {/* Responsive Grid - 2 columns on mobile, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {itemsToShow.map((p) => {
            const isWishlisted = wishlist.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => onProductClick(p.id)}
                className="group bg-white border border-neutral-100 rounded-[16px] md:rounded-[24px] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-left relative"
              >
                {/* Image panel */}
                <div className="aspect-square bg-[#F0EEED] overflow-hidden flex items-center justify-center p-2 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl group-hover:scale-104 transition duration-500 ease-out"
                  />
                  {p.originalPrice && (
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white font-black text-[8px] md:text-[9px] uppercase tracking-wider px-1.5 md:px-2 py-0.5 rounded-full shadow-xs">
                      New Drop
                    </span>
                  )}

                  {/* Wishlist Heart Icon Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(p.id);
                    }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/95 hover:bg-white rounded-full p-1.5 md:p-2 shadow-sm hover:shadow-md transition-all duration-200 z-10 text-neutral-400 hover:text-red-500 hover:scale-110 cursor-pointer"
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-neutral-500 hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>

                {/* Text details content info code block */}
                <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="font-sans font-black text-xs md:text-sm uppercase tracking-tight text-neutral-900 group-hover:text-neutral-500 transition line-clamp-1">
                      {p.name}
                    </h3>
                    
                    {/* Star ratings */}
                    <div className="flex items-center gap-1 select-none text-amber-400">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-2.5 h-2.5 md:w-3 md:h-3 ${
                              i < Math.floor(p.rating) ? "fill-current" : "opacity-30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-neutral-850 ml-0.5">
                        {p.rating}/5
                      </span>
                    </div>

                    <p className="text-[10px] md:text-[11px] text-neutral-400 italic line-clamp-1 leading-normal pt-0.5 font-medium">
                      "{p.tagline}"
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 md:gap-2 pt-2 md:pt-3 border-t border-neutral-100/60 mt-2.5 md:mt-3 select-none">
                    <span className="text-neutral-900 font-sans font-black text-xs md:text-sm">
                      ₹{p.price}
                    </span>
                    {p.originalPrice && (
                      <>
                        <span className="line-through text-neutral-450 text-[10px] md:text-[11px] font-medium">
                          ₹{p.originalPrice}
                        </span>
                        <span className="bg-red-50 text-red-500 text-[8px] font-black px-1 md:px-1.5 py-0.5 rounded-full">
                          -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Call to action anchor linking to shop anchor */}
        <div className="mt-10 text-center">
          <a
            href="#shop"
            className="inline-block border border-neutral-300 hover:border-black hover:bg-black hover:text-white text-black font-extrabold py-3.5 px-8 rounded-full text-xs uppercase tracking-widest transition duration-155 cursor-pointer text-center font-sans shadow-xs"
          >
            View Full Showroom
          </a>
        </div>

      </div>
    </section>
  );
}

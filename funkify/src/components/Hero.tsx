import { Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onShopClick: () => void;
}

export default function Hero({ onShopClick }: HeroProps) {
  const stats = [
    { value: "240 GSM", label: "Oversized Fit Cotton" },
    { value: "4 Moods", label: "Drop 01 Real Feelings" },
    { value: "100%", label: "Made with Empathy" }
  ];

  const brandLogos = [
    { name: "YOUR MOOD • YOUR FIT" },
    { name: "HEAVYWEIGHT SEWING" },
    { name: "FUNKIFY IT" },
    { name: "DROP 01 LIVE NOW" },
    { name: "BUILT FOR SOFT HEARTS" }
  ];

  return (
    <div>
      <section className="bg-[#F2F0F1] text-black overflow-hidden relative font-sans pt-12 lg:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 z-10 space-y-6 md:space-y-8 py-8 lg:py-16 text-left">
              <span className="text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-zinc-900 text-white px-3.5 py-1.5 rounded-full inline-block">
                ★ DROP 01 / PREMIUM STREETWEAR
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-5.5xl font-black tracking-tighter uppercase leading-[0.95] text-black">
                WEAR THE MOOD <br />
                YOU CARRY <br />
                INSIDE 🧠⚡
              </h1>

              <p className="text-neutral-600 text-xs md:text-sm max-w-lg leading-relaxed font-medium">
                Streetwear designed for soft hearts, mentally offline overthinkers, and everyone surviving life one day at a time. Super heavy organic cotton cuts that feel like warm, protective armor on tough days.
              </p>

              <div>
                <button
                  onClick={onShopClick}
                  className="bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent font-bold py-4 px-10 rounded-full text-xs uppercase tracking-widest transition duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl cursor-pointer font-sans"
                >
                  Shop Drop Collection
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200/60 max-w-lg">
                {stats.map((st, i) => (
                  <div key={i} className="space-y-0.5 border-r border-[#E5E5E5] last:border-0 pr-2">
                    <span className="block text-xl md:text-2.5xl font-black tracking-tight text-black">
                      {st.value}
                    </span>
                    <span className="block text-[9px] md:text-[10.5px] text-neutral-500 font-bold uppercase tracking-wider leading-tight">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image/Model Column */}
            <div className="lg:col-span-6 relative flex justify-center items-center h-full pb-8 lg:pb-12">
              
              {/* Sparkle Vector Elements (Shop.co brand styling) */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-6 right-2 lg:right-6 z-20 text-black pointer-events-none"
              >
                <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 C50 30, 70 50, 100 50 C70 50, 50 70, 50 100 C50 70, 30 50, 0 50 C30 50, 50 30, 50 0 Z" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9], rotate: [0, -45, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 left-2 lg:left-6 z-20 text-black pointer-events-none"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 C50 30, 70 50, 100 50 C70 50, 50 70, 50 100 C50 70, 30 50, 0 50 C30 50, 50 30, 50 0 Z" />
                </svg>
              </motion.div>

              {/* Genuine product mockup container */}
              <div className="relative w-full max-w-sm lg:max-w-md aspect-square bg-white rounded-[32px] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-200/40 p-4 shrink-0 flex items-center justify-center">
                <img
                  src="/assets/images/tee_overthinking_1779546951749.png"
                  alt="Funkify Overthinking Classic Tee"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-sm select-none"
                />
                
                <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-xs text-white text-[9px] font-bold py-1.5 px-3 rounded-full uppercase tracking-wider font-sans border border-white/5">
                  🧠 Preview: The Overthinking Tee
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Brand logo value ticker bar */}
      <section className="bg-black py-5 text-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3">
            {brandLogos.map((brand, i) => (
              <span
                key={i}
                className="font-sans font-black text-xs md:text-sm tracking-widest text-[#FFFFFF] opacity-90 hover:opacity-100 transition duration-200"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

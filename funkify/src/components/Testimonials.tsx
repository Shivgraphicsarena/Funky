import { Star, Check } from "lucide-react";

export interface CustomReview {
  name: string;
  rating: number;
  comment: string;
  itemBought: string;
  vibe: string;
}

export const REAL_VIBE_REVIEWS: CustomReview[] = [
  {
    name: "Sarah M.",
    rating: 5,
    comment: "I'm blown away by the quality and fit of these tees. The heavyweight fabric is perfect for layering, and the print detail is insane. Totally matches my vibe!",
    itemBought: "The Overthinking Tee",
    vibe: "Overthinking Vibe"
  },
  {
    name: "Alex K.",
    rating: 5,
    comment: "Finding clothes that fit my oversized preference was always a struggle until I discovered Funkify. The fit is perfect, and the details are top tier.",
    itemBought: "Emotionally Expired Tee",
    vibe: "Zero Energy"
  },
  {
    name: "James L.",
    rating: 5,
    comment: "The middle finger cactus graphic is my daily mood. Highly recommend these clothes to anyone who appreciates heavyweight fabric and good sarcasm.",
    itemBought: "The Fucktus Tee",
    vibe: "Zero Nonsense"
  },
  {
    name: "Olivia P.",
    rating: 5,
    comment: "Absolutely in love with the lavender okay tee. The collage work on the back was so intricately screen-printed. Getting compliments everywhere I go!",
    itemBought: "It's Okay to Not Be Okay Tee",
    vibe: "Healing Vibe"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f0f0f0] py-16 md:py-24 text-black border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left max-w-xl mb-12">
          <span className="text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-black text-white px-3 py-1.5 rounded-full inline-block mb-3">
            💬 WHAT THEY SAY
          </span>
          <h2 className="text-3xl sm:text-4.5xl font-black uppercase tracking-tighter leading-none text-black">
            OUR HAPPY CUSTOMERS
          </h2>
          <p className="text-neutral-500 font-sans text-xs md:text-sm mt-3 leading-relaxed font-medium">
            Read ratings from real street community members wearing their thoughts on their chest.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REAL_VIBE_REVIEWS.map((r, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 md:p-8 rounded-[24px] bg-white border border-neutral-200 hover:border-black hover:shadow-lg transition-all duration-300 text-left"
            >
              <div className="space-y-3">
                {/* Star Rating Row */}
                <div className="flex items-center gap-0.5 select-none text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-current" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 font-bold text-sm text-black">
                  <span>{r.name}</span>
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center p-0.5" title="Verified Customer">
                    <Check className="w-2.5 h-2.5 stroke-[4]" />
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs md:text-sm leading-relaxed text-neutral-600 font-medium">
                  "{r.comment}"
                </p>
              </div>

              {/* Author & Item */}
              <div className="mt-6 pt-4 border-t border-neutral-150 flex items-center justify-between text-[11px] font-medium text-neutral-400">
                <span>Verified Purchase</span>
                <span className="font-mono text-[9px] uppercase font-black text-black select-none max-w-[50%] truncate block">
                  {r.itemBought}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Vibe Prompt Call To Action */}
        <div className="mt-12 text-center text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
          Got styling queries? Reach us on{" "}
          <a
            href="https://www.instagram.com/funkify.official/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline underline-offset-4"
          >
            Instagram DM Support
          </a>
        </div>

      </div>
    </section>
  );
}

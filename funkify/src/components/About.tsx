import { motion } from "motion/react";
import { BrainCircuit, Heart, MapPin, ShieldCheck } from "lucide-react";

export default function About() {
  const manifesto = [
    {
      icon: BrainCircuit,
      title: "Mental Health Awareness",
      desc: "Our garments aren't just fabric; they are conversations. We print our inner chaos openly so we don't have to carry it in silence."
    },
    {
      icon: Heart,
      title: "Soft Hearts Club",
      desc: "We prioritize empathy, gentleness, and oversized comfort. It's okay to feel deeply, and it's okay to wear your vulnerability."
    },
    {
      icon: MapPin,
      title: "Crafted in Jaipur",
      desc: "Jaipur, Rajasthan—where legendary heritage colors meet experimental streetwear design. Locally sourced and hand-finished with meticulous precision."
    },
    {
      icon: ShieldCheck,
      title: "Heavyweight Standards",
      desc: "Using ultra-heavy organic cotton ribbed fabric that serves as protective, soft armor on tough, overthinking days."
    }
  ];

  return (
    <section id="about" className="bg-[#FFFFFF] py-16 md:py-24 relative overflow-hidden text-black border-b border-neutral-100 font-sans">
      
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Manifesto Left content */}
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[10px] md:text-xs font-mono font-black uppercase tracking-widest bg-black text-white px-3.5 py-1.5 rounded-full inline-block">
              ★ OUR CONCEPTS & ETHOS
            </span>

            <h2 className="text-3xl sm:text-4.5xl font-black uppercase tracking-tighter leading-none text-black">
              WEAR THE THOUGHTS <br />
              YOU CARRY INSIDE
            </h2>
            
            <p className="text-[#333333] text-xs md:text-sm leading-relaxed font-medium">
              Funkify Streetwear was born as an experimental canvas in the cultural loombelt of Jaipur. We realized traditional clothes had plenty of corporate logowork, but lacked true, raw human flavor.
            </p>
            
            <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-medium">
              We turn complicated mental states—overthinking, burnout, heavy hearts, and finding peace—into premium physical coordinates. Cotton loops woven with pure empathy.
            </p>

            <div className="pt-4 border-t border-neutral-200 flex items-center gap-2.5 font-mono text-[10.5px] font-black uppercase tracking-wider text-neutral-600">
              <MapPin className="w-4 h-4 text-black shrink-0" />
              <span>Looming Hub Located In Jaipur, Rajasthan</span>
            </div>
          </div>

          {/* Manifesto cards grid Right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {manifesto.map((m, index) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 md:p-8 rounded-[24px] bg-[#fbfbfb] border border-neutral-200 flex flex-col justify-between hover:border-black hover:bg-white hover:shadow-md transition-all duration-300 text-left"
                >
                  <div className="p-3 bg-neutral-100 w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-black border border-neutral-150">
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-sans font-black text-sm uppercase tracking-tight text-neutral-900 leading-none">
                      {m.title}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Flame, Award, Heart, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/defaultMenu';

export const HeritageSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#0d0c0a] border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Heritage Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-widest">
              <span>Heirloom Mughlai Recipe</span>
              <span aria-hidden="true">·</span>
              <span>The M Siddiq Story</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-100 leading-tight">
              Slow-Cooked Overnight in Heavy <span className="text-amber-500 italic">Copper Degs</span>
            </h2>

            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                In 1978, Haji Muhammad Siddiq began simmering his signature Nihari in the bustling
                heart of food streets. Unlike modern rush cooking, real Nihari cannot be sped up.
                Every evening at dusk, massive hand-hammered copper cauldrons (degs) are sealed with
                kneaded dough, enclosing tender shank cuts and bone marrows with our family’s 24 roasted spices.
              </p>
              <p>
                Over glowing charcoal embers, the marrow slowly renders into the rich flour broth,
                transforming simple beef into velvety nectar. By sunrise, the dough seal is cracked
                open to reveal glistening roghan, ready to be paired with blistered, sesame-crusted Roghani Naan.
              </p>
            </div>

            {/* Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800/70">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200 text-sm">24-Spice Potli Masala</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Mace, nutmeg, star anise, long pepper (pipli), and roasted cumin.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200 text-sm">Pure Desi Ghee Tarka</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Zero palm oil. Only organic clarified butter sizzled with red onions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-stone-800 shadow-xl aspect-[4/5]">
                <img
                  src={IMAGES.specialNalliNihari}
                  alt="Slow-simmered Nalli Nihari bowl"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="font-display text-2xl font-bold text-amber-400 tabular-nums">48+ Years</span>
                <span className="text-xs text-stone-400 block mt-0.5">Of Authentic Culinary Heritage</span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-center">
                <span className="font-display text-2xl font-bold text-amber-400 tabular-nums">1.2M+</span>
                <span className="text-xs text-stone-400 block mt-0.5">Nihari Plates Served in 4 Decades</span>
              </div>
              <div className="rounded-xl overflow-hidden border border-stone-800 shadow-xl aspect-[4/5]">
                <img
                  src={IMAGES.roghaniNaan}
                  alt="Clay oven baked Roghani Naan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Testimonials */}
        <div className="pt-8 border-t border-stone-800/80 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-display text-2xl font-bold text-stone-100">
              Loved by Generations of Food Lovers
            </h3>
            <p className="text-xs text-stone-400">
              From Sunday breakfast queues to late-night family gatherings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
              <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                "The Nalli Nihari here has that distinct sticky gelatinous thickness from slow-cooked bone marrow that no other place can replicate. Best in the country."
              </p>
              <div>
                <span className="font-bold text-xs text-stone-200 block">Dr. Bilal Aslam</span>
                <span className="text-[11px] text-stone-500">Patron for 18 years · Lahore</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
              <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                "Ordering online was seamless. The sealed foil packaging kept the roghan hot and the roghani naans were as fresh and crisp as dining right at the restaurant counter."
              </p>
              <div>
                <span className="font-bold text-xs text-stone-200 block">Zainab Farooq</span>
                <span className="text-[11px] text-stone-500">Online Ordering Customer · Gulberg</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between space-y-3">
              <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                "The Shahi Maghaz Nihari with extra ginger and green chillies is comfort food perfection. Truly grateful for M Siddiq keeping authentic standards alive."
              </p>
              <div>
                <span className="font-bold text-xs text-stone-200 block">Rashid Khan</span>
                <span className="text-[11px] text-stone-500">Food Critic & Historian</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { PhoneCall, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Clock, Star } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenBookCall: () => void;
  onOpenFreeWebsite: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onOpenBookCall,
  onOpenFreeWebsite,
}) => {
  return (
    <section id="final-cta-section" className="py-24 relative overflow-hidden bg-[#0A1128] border-t border-white/10">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00E599]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E599]/15 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Zero Fluff • Zero Pressure • 15 Minutes</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Ready to Stop Losing Paying Jobs to Competitors Down the Street?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you want us to build your free website, set up your 24/7 AI Receptionist, or automate 5-star Google reviews after every job—let’s talk for 15 minutes.
        </p>

        {/* Benefits Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-8 text-xs sm:text-sm font-semibold text-slate-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
            <span>Tailored to Your Exact Trade</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
            <span>Review Your Revenue Gap</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
            <span>No Locked Contracts</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            id="final-book-call-btn"
            onClick={onOpenBookCall}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-extrabold text-base shadow-xl shadow-[#00E599]/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer font-heading active:scale-[0.99]"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule 15-Min Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="final-claim-free-btn"
            onClick={onOpenFreeWebsite}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
          >
            <span>Claim $0 Starter Build ($97/mo)</span>
          </button>
        </div>

        {/* Owner Quote / Direct Touch */}
        <div className="mt-10 pt-8 border-t border-white/10 max-w-xl mx-auto text-center">
          <div className="text-xs text-slate-400">
            "We built Ecentra Concierge because we saw great local trade operators losing tens of thousands of dollars to missed phone calls. We make technology work for you, not the other way around."
          </div>
          <div className="font-heading text-xs font-bold text-white mt-2">
            Harold Morgan & The Ecentra Concierge Team
          </div>
        </div>
      </div>
    </section>
  );
};

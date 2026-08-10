import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Zap, PhoneCall, Globe, Star, Clock, Building, Bot } from 'lucide-react';
import { ALL_INDUSTRY_PAGES } from '../data/industryPages';

interface HeroSectionProps {
  onOpenFreeWebsite: () => void;
  onOpenBookCall: () => void;
  onSelectVertical: (verticalId: string) => void;
  onOpenIndustryDirectory: () => void;
  onQuickClaimSuccess: (claimData: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFreeWebsite,
  onOpenBookCall,
  onSelectVertical,
  onOpenIndustryDirectory,
  onQuickClaimSuccess,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [industry, setIndustry] = useState('Solar Power & Clean Energy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const featuredHeroTrades = [
    { id: 'solar', name: 'Solar' },
    { id: 'hvac', name: 'HVAC' },
    { id: 'dentist', name: 'Dentist' },
    { id: 'pest-control', name: 'Pest Control' },
    { id: 'tattoo-shop', name: 'Tattoo Shop' },
    { id: 'med-spa-aesthetics', name: 'Med Spa' },
    { id: 'plumbing', name: 'Plumbing' },
  ];

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please enter your business name, phone, and email to claim your free site.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads/website-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          phone,
          email,
          industry,
          currentWebsite: 'Claimed via Hero Quick Form',
          frustrations: 'Needs high-converting local trade web presence & 24/7 lead capture',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onQuickClaimSuccess({
          ...data,
          businessName,
          phone,
          email,
          industry,
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. You can also claim via the full form below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="hero-section" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Lighting & Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#00E599]/15 to-[#1E2D5A]/30 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#00E599]/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow Pill */}
        <div className="flex justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#00E599]/30 text-xs sm:text-sm font-medium text-slate-200 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#00E599] animate-ping" />
            <span className="text-[#00E599] font-bold">Foundational Offer:</span>
            <span>$0 Starter Builds • AI Search Engine Optimized (ChatGPT, Gemini, Claude)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              We’ll build your service business a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-[#34D399]">
                high-converting starter website for $0.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              No bloated WordPress themes or DIY builder struggles. We build you a clean, speed-optimized foundational website with <strong className="text-white">$0 upfront design fees</strong>, transparent <strong className="text-[#00E599]">$97/mo cloud hosting</strong>, and <strong className="text-white">built-in optimization for AI Search Engines</strong> like ChatGPT, Claude, Gemini & Google.
            </p>

            {/* Benefit Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl text-sm font-medium text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00E599] shrink-0" />
                <span>$0 Upfront Build Fee ($2,500 Design Value)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Bot className="w-5 h-5 text-[#00E599] shrink-0" />
                <span>AI Search Optimized (ChatGPT, Gemini, Claude)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00E599] shrink-0" />
                <span>$97/mo Enterprise Cloud Hosting & SSL</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#00E599] shrink-0" />
                <span>Ready in 2–3 Business Days</span>
              </div>
            </div>

            {/* Quick Industry Switcher Bar */}
            <div className="pt-4">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2.5 flex items-center justify-center lg:justify-start gap-2">
                <span>Explore 30 Dedicated Industry Landing Pages:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {featuredHeroTrades.map((v) => (
                  <button
                    key={v.id}
                    id={`hero-vertical-btn-${v.id}`}
                    onClick={() => onSelectVertical(v.id)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 hover:bg-[#00E599]/15 text-slate-300 hover:text-[#00E599] border border-white/10 hover:border-[#00E599]/40 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{v.name}</span>
                  </button>
                ))}
                <button
                  onClick={onOpenIndustryDirectory}
                  className="px-3 py-1.5 text-xs font-bold text-[#00E599] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>+ 23 More Trades</span>
                </button>
              </div>
            </div>

            {/* Alternative Action Link */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-400">
              <span>Already happy with your current site?</span>
              <button
                id="hero-skip-to-quiz-btn"
                onClick={onOpenBookCall}
                className="text-[#00E599] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Explore 24/7 AI Receptionist & Chatbot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: High-Converting Above-The-Fold Claim Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Card Glow border */}
              <div className="absolute -inset-0.5 bg-gradient-to-b from-[#00E599]/50 to-[#15224A] rounded-2xl blur-sm opacity-70" />

              <div className="relative glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 border border-white/15">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div>
                    <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/30 mb-1">
                      Starter Offer • AI Search Ready
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white">
                      Claim $0 Starter Site
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Build Fee</div>
                    <div className="text-sm font-bold text-slate-400 line-through">$2,500</div>
                    <div className="text-sm font-extrabold text-[#00E599]">$0 Upfront</div>
                    <div className="text-[10px] text-slate-400">$97/mo hosting</div>
                  </div>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Business Name *
                    </label>
                    <input
                      id="hero-input-business"
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Apex Solar Energy"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#080E21]/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Industry / Vertical *
                      </label>
                      <select
                        id="hero-select-industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#080E21] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                      >
                        {ALL_INDUSTRY_PAGES.map((ind) => (
                          <option key={ind.id} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Direct Phone *
                      </label>
                      <input
                        id="hero-input-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080E21]/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email Address *
                    </label>
                    <input
                      id="hero-input-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@yourcompany.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#080E21]/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                    />
                  </div>

                  <button
                    id="hero-submit-claim-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#00E599]/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-heading text-sm disabled:opacity-50 hover:shadow-xl hover:shadow-[#00E599]/35 transform active:scale-98"
                  >
                    {isSubmitting ? (
                      <span>Reserving Starter Build Slot...</span>
                    ) : (
                      <>
                        <span>Claim $0 Starter Build ($97/mo Hosting)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* Trust mini bar */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" /> $0 Upfront Build
                  </span>
                  <span className="flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-[#00E599]" /> AI Search Ready
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00E599]" /> 2–3 Day Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#00E599]" /> $97/mo Cloud Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

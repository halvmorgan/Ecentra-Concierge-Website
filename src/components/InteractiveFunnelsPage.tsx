import React from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  HelpCircle,
  TrendingUp,
  Filter,
  CheckSquare,
  Calculator,
  Gift,
  Building,
  Target,
  Clock,
  Layers,
  PhoneCall,
  Lock,
  Calendar,
} from 'lucide-react';
import { QuizFunnelDemo } from './funnels/QuizFunnelDemo';
import { CalculatorFunnelDemo } from './funnels/CalculatorFunnelDemo';
import { PrizeFunnelDemo } from './funnels/PrizeFunnelDemo';
import { FunnelsComparisonSection } from './funnels/FunnelsComparisonSection';

interface InteractiveFunnelsPageProps {
  onBackToHome: () => void;
  onNavigateProducts: () => void;
  onOpenBookCall: (context?: string) => void;
  onOpenFreeWebsite: () => void;
  onNavigateContact?: () => void;
  onNavigateSmsOptIn?: () => void;
}

export const InteractiveFunnelsPage: React.FC<InteractiveFunnelsPageProps> = ({
  onBackToHome,
  onNavigateProducts,
  onOpenBookCall,
  onOpenFreeWebsite,
  onNavigateContact,
  onNavigateSmsOptIn,
}) => {
  const BOOKING_CALENDAR_URL = 'https://api.leadconnectorhq.com/widget/booking/Qx4oGb9Y7b4RFlDyVpJf';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Home</span>
            </button>
            <span className="text-slate-600">/</span>
            <button
              onClick={onNavigateProducts}
              className="text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              AI Products
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-[#00E599]">The Fast Track</span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a
              href={BOOKING_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenBookCall('The Fast Track Strategy Call')}
              className="px-4 py-2 rounded-lg bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold transition-all font-heading"
            >
              Schedule 15-Min Strategy Call
            </a>
          </div>
        </div>

        {/* 1. HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE FAST TRACK • PRE-QUALIFY & ESTIMATE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1]">
            Turn Casual Website Browsers Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] via-[#38bdf8] to-[#00E599]">
              Booked, High-Margin Jobs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Most local business websites lose 97% of visitors because a boring "Contact Us" form offers zero value. 
            The Fast Track makes visitors actively participate—answering diagnostic quizzes, calculating custom estimates, or unlocking exclusive service rewards—turning passive traffic into pre-qualified, ready-to-buy leads.
          </p>

          {/* Quick Jump Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => scrollToSection('quiz-funnels')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-[#00E599]" />
              <span>1. Quiz Funnels</span>
            </button>
            <button
              onClick={() => scrollToSection('calculator-funnels')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>2. Smart Calculators</span>
            </button>
            <button
              onClick={() => scrollToSection('prize-funnels')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>3. Prize Funnels</span>
            </button>
          </div>

          {/* Value Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xl font-bold font-mono text-[#00E599]">3.8x</div>
              <div className="text-xs text-slate-300">Higher Conversion vs Static Forms</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xl font-bold font-mono text-sky-400">95%</div>
              <div className="text-xs text-slate-300">Tire-Kicker Pre-Filtering</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xl font-bold font-mono text-amber-400">&lt; 45s</div>
              <div className="text-xs text-slate-300">Speed to CRM Ingestion</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xl font-bold font-mono text-purple-400">100%</div>
              <div className="text-xs text-slate-300">Custom Done-For-You Setup</div>
            </div>
          </div>
        </section>

        {/* 2. SECTION A: QUIZ FUNNELS */}
        <section id="quiz-funnels" className="space-y-8 scroll-mt-28">
          {/* Section Header & Explanation */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c142b] to-[#111c38] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wide">
                <CheckSquare className="w-3.5 h-3.5" />
                Funnel Type 1: Diagnostic Quizzes
              </div>
              <span className="text-xs font-mono text-slate-400">Target: High-Intent Homeowners</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Quiz Funnels: Ask 4 Quick Questions, Deliver a Tailored Solution
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A Quiz Funnel guides potential customers through a short diagnostic assessment to pinpoint their exact situation. Instead of a generic contact page, the visitor receives a custom recommendation tailored to their property size, problem severity, and timeframe—unlocking their full pricing estimate and discount voucher by entering their contact details.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#00E599]" />
                    Ideal For These Local Service Businesses:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Pest Control, Roofing Inspections, HVAC Replacement, Med Spas, Solar Assessments, Water Damage Restoration, Cosmetic Dentistry,</strong> and <strong>Custom Landscaping</strong>.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-bold text-[#00E599] uppercase tracking-wider">
                  How This Generates More Business:
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                    <span><strong>Pre-Diagnosed Scope:</strong> Your sales team knows the exact square footage, pest/damage type, and urgency before dialing.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                    <span><strong>Higher Trust:</strong> Recommending a specific treatment plan feels like consulting an expert doctor, not being pitched by a salesperson.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                    <span><strong>Automated CRM Ingestion:</strong> Every answer automatically tags the lead inside your CRM with zero manual data entry.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Working Demo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                👇 Interactive Working Example — Try It Below
              </span>
              <span className="text-xs text-[#00E599] font-medium">
                Click options to experience live progression
              </span>
            </div>
            <QuizFunnelDemo />
          </div>
        </section>

        {/* 3. SECTION B: SMART CALCULATORS */}
        <section id="calculator-funnels" className="space-y-8 scroll-mt-28">
          {/* Section Header & Explanation */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c142b] to-[#111c38] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 uppercase tracking-wide">
                <Calculator className="w-3.5 h-3.5" />
                Funnel Type 2: Smart Calculators & ROI Estimators
              </div>
              <span className="text-xs font-mono text-slate-400">Target: High-Ticket & Home Improvement</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Smart Calculators: Give Instant Pricing Transparency That Builds Trust
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Homeowners hate waiting days for a ballpark estimate. A Smart Calculator allows visitors to adjust project specs (square footage, current bills, upgrade type) and instantly watch their projected energy savings and home equity increase update live on screen. The lead gate captures their phone and email at the exact moment of maximum excitement.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-sky-400" />
                    Ideal For These Local Service Businesses:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Solar & Battery Installers, Window & Door Contractors, Insulation & Roofing, Ductless HVAC, Kitchen & Bath Remodelers, Pool Builders,</strong> and <strong>Commercial Property Services</strong>.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  How This Generates More Business:
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Instant Gratification:</strong> Visitors spend 3-5 minutes testing configurations, building deep mental ownership of the project.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Budget Anchoring:</strong> Establishes realistic ballpark expectations early, filtering out tire-kickers who expect a $15,000 upgrade for $2,000.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>High-Value Lead Dossier:</strong> Reps receive exact home square footage, current electric costs, and preferred timeline before calling.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Working Demo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                👇 Interactive Working Example — Adjust Sliders Below
              </span>
              <span className="text-xs text-sky-400 font-medium">
                Drag numbers to watch live calculations update
              </span>
            </div>
            <CalculatorFunnelDemo />
          </div>
        </section>

        {/* 4. SECTION C: PRIZE FUNNELS */}
        <section id="prize-funnels" className="space-y-8 scroll-mt-28">
          {/* Section Header & Explanation */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c142b] to-[#111c38] border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 uppercase tracking-wide">
                <Gift className="w-3.5 h-3.5" />
                Funnel Type 3: Prize Funnels & Gamified Rewards
              </div>
              <span className="text-xs font-mono text-slate-400">Target: High-Volume Service Leads</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  Prize Funnels: Turn Lead Capture Into an Exciting Game
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Asking for a phone number on a plain form triggers hesitation. A Prize Funnel replaces that friction with excitement: visitors spin a wheel or scratch a card for a guaranteed reward ($150 off, free safety inspection, instant service credit). Because they just "won" something tangible, they happily submit their phone number and email to claim their voucher code before the countdown timer expires.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-amber-400" />
                    Ideal For These Local Service Businesses:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Auto Repair & Detailing, Dentists, Med Spas, Chimney & Dryer Vent Cleaning, Carpet Cleaners, Pet Grooming, Plumbing Maintenance,</strong> and <strong>Home Locksmiths</strong>.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  How This Generates More Business:
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Massive Opt-In Rates:</strong> Achieves 40%–55% opt-in rates by replacing sales skepticism with the dopamine of winning.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Urgency & Expiration:</strong> 15-minute countdown timer motivates immediate booking rather than "I'll do it later."</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>SMS List Building:</strong> Customers voluntarily provide verified cell numbers to receive their SMS promo code.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Working Demo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                👇 Interactive Working Example — Click Spin Below
              </span>
              <span className="text-xs text-amber-400 font-medium">
                Experience the game mechanics in real-time
              </span>
            </div>
            <PrizeFunnelDemo />
          </div>
        </section>

        {/* 5. "WHY THIS WORKS" COMPARISON SECTION */}
        <FunnelsComparisonSection />

        {/* 6. HOW ECENTRA CONCIERGE DELIVERS THIS (DONE-FOR-YOU) */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c142b] via-[#0f1b3d] to-[#0c142b] border border-white/10 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/20 uppercase tracking-wide">
              <Layers className="w-3.5 h-3.5" />
              100% Done-For-You Implementation
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              We Custom Build, Brand & Embed It on Your Site
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              You don’t have to learn software, write logic, or hire a web developer. Our engineering team handles everything from copy to CRM sync in under 7 business days.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00E599]/20 text-[#00E599] font-bold text-sm flex items-center justify-center font-mono">
                01
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Trade-Specific Logic & Pricing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We customize the questions, slider ranges, and diagnostic recommendations specifically for your trade rates, service area, and ideal customer profile.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-400/20 text-sky-400 font-bold text-sm flex items-center justify-center font-mono">
                02
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Matching Your Existing Brand
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We style colors, logos, fonts, and photography to seamlessly blend into your current WordPress, Squarespace, Wix, or custom website.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 font-bold text-sm flex items-center justify-center font-mono">
                03
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                Instant CRM & SMS Routing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every submission delivers a rich lead dossier instantly to your phone via SMS, email, and GoHighLevel CRM before you pick up the phone.
              </p>
            </div>
          </div>
        </section>

        {/* 7. CLOSING CTA BANNER */}
        <section className="relative rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#0c142b] to-sky-950/40 border-2 border-[#00E599]/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl overflow-hidden">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              Ready to Upgrade Your Website with The Fast Track?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a 15-minute strategy call with Harold Morgan to see The Fast Track mapped to your exact trade, service area, and revenue goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
            <a
              id="funnels-page-book-call-btn"
              href={BOOKING_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenBookCall('The Fast Track Implementation Call')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-extrabold text-base shadow-xl shadow-[#00E599]/25 hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer font-heading active:scale-[0.99]"
            >
              <span>Schedule 15-Min Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onNavigateProducts}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition-all cursor-pointer"
            >
              Explore All AI Products
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center justify-center gap-2 pt-2">
            <Lock className="w-3.5 h-3.5 text-[#00E599]" />
            <span>Zero sales pressure • 15-minute customized game plan</span>
          </div>
        </section>

      </div>
    </div>
  );
};

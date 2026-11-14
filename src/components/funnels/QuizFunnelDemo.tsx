import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Bug,
  Home,
  Clock,
  Send,
  Database,
  Lock,
  Flame,
  Check,
  Zap,
} from 'lucide-react';

interface QuizAnswer {
  pestType: string;
  propertySize: string;
  activityArea: string;
  urgency: string;
}

export const QuizFunnelDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswer>({
    pestType: '',
    propertySize: '',
    activityArea: '',
    urgency: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    zip: '',
  });

  const totalSteps = 4;
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  const handleSelectOption = (field: keyof QuizAnswer, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final step triggers simulated AI diagnosis
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(5); // results / gate step
      }, 1400);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setAnswers({
      pestType: '',
      propertySize: '',
      activityArea: '',
      urgency: '',
    });
    setIsAnalyzing(false);
    setIsSubmitted(false);
    setLeadForm({ name: '', phone: '', email: '', zip: '' });
  };

  // Plan recommendation based on answers
  const getRecommendation = () => {
    if (answers.pestType === 'Termites' || answers.urgency === 'Active Infestation Right Now') {
      return {
        title: 'Emergency Deep Elimination & Shield Barrier',
        badge: 'Priority Outbreak Protocol',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        treatment: 'Targeted high-potency thermal/bait perimeter flush + 12-month zero-reinfestation warranty.',
        visitFrequency: 'Immediate 24-hr first response, followed by bi-monthly inspection guards.',
        savings: '$65 Instant First-Treatment Discount',
        voucherCode: 'PEST-URGENT-65',
      };
    }
    return {
      title: 'Whole-Property Total Perimeter Defense',
      badge: 'Eco-Safe Certified Protection',
      badgeColor: 'text-[#00E599] bg-[#00E599]/10 border-[#00E599]/30',
      treatment: 'Complete foundation seal, crawlspace barrier, and pet-friendly eco-safe botanical barrier.',
      visitFrequency: 'Quarterly seasonal defense (Spring, Summer, Fall, Winter protection).',
      savings: '$50 Instant New Customer Voucher',
      voucherCode: 'ECO-DEFENSE-50',
    };
  };

  const rec = getRecommendation();

  return (
    <div className="rounded-2xl bg-[#0c142b] border border-white/10 overflow-hidden shadow-2xl">
      {/* Demo Window Header */}
      <div className="px-5 py-3.5 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-semibold text-slate-300 ml-2 font-mono flex items-center gap-1.5">
            <Bug className="w-3.5 h-3.5 text-[#00E599]" />
            demo.safehomepestcontrol.com/treatment-finder
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30">
            <Sparkles className="w-3 h-3" />
            LIVE INTERACTIVE DEMO
          </span>
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset Quiz"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Quiz Body */}
      <div className="p-6 sm:p-8">
        {/* Progress Bar (Visible during steps 1-4) */}
        {currentStep <= 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
              <span>Diagnostic Step {currentStep} of {totalSteps}</span>
              <span className="text-[#00E599] font-bold">{progressPercent}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00E599] to-[#38bdf8] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Step 1: Pest Concern */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20">
                Question 1 of 4
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                What primary pest concern are you experiencing?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Select the pest you’ve noticed or are looking to prevent:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Ants & Roaches', desc: 'Trailing in kitchen, pantry, or bathrooms', icon: '🐜' },
                { label: 'Termites & Wood Borers', desc: 'Mud tubes, hollow wood, swarming bugs', icon: '🪵' },
                { label: 'Mice & Rodents', desc: 'Noises in attic, droppings, chewed wires', icon: '🐀' },
                { label: 'Spiders & Wasps', desc: 'Eaves, exterior siding, crawlspaces', icon: '🕷️' },
                { label: 'Bed Bugs or Fleas', desc: 'Bites, mattress seams, pet areas', icon: '🪲' },
                { label: 'General Preventative Guard', desc: 'Zero active bugs, want proactive barrier', icon: '🛡️' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption('pestType', opt.label)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 hover:scale-[1.01] ${
                    answers.pestType === opt.label
                      ? 'bg-[#00E599]/15 border-[#00E599] text-white shadow-lg shadow-[#00E599]/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Property Type / Size */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20">
                Question 2 of 4
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                What type of property is this for?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                This helps calculate perimeter linear footage and treatment volume.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Single-Family Home (Under 2,500 sq ft)', desc: 'Standard residential lot', icon: '🏡' },
                { label: 'Large Estate (2,500+ sq ft)', desc: 'Multi-story or sprawling perimeter', icon: '🏰' },
                { label: 'Townhouse / Condo', desc: 'Shared walls or multi-unit structure', icon: '🏢' },
                { label: 'Commercial / Restaurant / Office', desc: 'Business facility requiring health audit', icon: '🏬' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption('propertySize', opt.label)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 hover:scale-[1.01] ${
                    answers.propertySize === opt.label
                      ? 'bg-[#00E599]/15 border-[#00E599] text-white shadow-lg shadow-[#00E599]/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to previous question</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Activity Location */}
        {currentStep === 3 && (
          <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20">
                Question 3 of 4
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Where have you noticed the activity most?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Select the primary hotspot to determine interior vs. exterior methods.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Kitchen, Sinks & Bathrooms', desc: 'Moisture sources & plumbing penetrations', icon: '🚰' },
                { label: 'Attic, Roofline or Crawlspace', desc: 'Sub-floor insulation or ceiling eaves', icon: '🏚️' },
                { label: 'Yard, Patio & Foundation Outer Wall', desc: 'Perimeter soil & garden beds', icon: '🌳' },
                { label: 'Everywhere / Whole Property', desc: 'Widespread sightings across multiple rooms', icon: '📍' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption('activityArea', opt.label)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 hover:scale-[1.01] ${
                    answers.activityArea === opt.label
                      ? 'bg-[#00E599]/15 border-[#00E599] text-white shadow-lg shadow-[#00E599]/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Urgency / History */}
        {currentStep === 4 && (
          <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20">
                Question 4 of 4
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                How urgent is this treatment?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Let us know your timeframe so we can prioritize technician dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Active Infestation Right Now', desc: 'Need immediate dispatch within 24-48 hours', icon: '🚨' },
                { label: 'Planning Within Next 1-2 Weeks', desc: 'Looking to schedule convenient inspection', icon: '📅' },
                { label: 'Comparing Options / General Quote', desc: 'Gathering prices for upcoming season', icon: '📊' },
                { label: 'Moving Into New Home Soon', desc: 'Want move-in barrier before furniture arrives', icon: '📦' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOption('urgency', opt.label)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 hover:scale-[1.01] ${
                    answers.urgency === opt.label
                      ? 'bg-[#00E599]/15 border-[#00E599] text-white shadow-lg shadow-[#00E599]/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200 hover:border-white/20'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-white">{opt.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-start">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            </div>
          </div>
        )}

        {/* Step: Analyzing / Loading Animation */}
        {isAnalyzing && (
          <div className="py-16 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#00E599]/20 border-2 border-[#00E599] border-t-transparent animate-spin mx-auto" />
            <h4 className="text-xl font-bold font-heading text-white">
              Analyzing Property Risk & Matching Treatment Plan...
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Calculating linear perimeter footage for {answers.pestType || 'pests'} and applying localized season discounts.
            </p>
          </div>
        )}

        {/* Step 5: Recommendation & Lead Capture Gate */}
        {currentStep === 5 && !isSubmitted && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00E599] flex items-center justify-center text-[#080E21] font-bold text-lg shrink-0">
                ✓
              </div>
              <div>
                <div className="text-xs font-bold text-[#00E599] uppercase tracking-wider">
                  Diagnosis Complete • Customized Plan Ready
                </div>
                <div className="text-sm font-semibold text-white">
                  Matched for: {answers.pestType || 'Pest Control'} • {answers.propertySize || 'Residential'}
                </div>
              </div>
            </div>

            {/* Teaser Recommendation Card */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${rec.badgeColor}`}>
                  {rec.badge}
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  {rec.savings}
                </span>
              </div>

              <h4 className="text-xl font-bold font-heading text-white">
                {rec.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {rec.treatment}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00E599] shrink-0" />
                  <span><strong>Frequency:</strong> {rec.visitFrequency}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#00E599] shrink-0" />
                  <span><strong>Target Area:</strong> {answers.activityArea || 'Whole Property'}</span>
                </div>
              </div>
            </div>

            {/* Lead Gate Form */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#0c142b] to-[#121c3b] border-2 border-[#00E599]/40 shadow-xl space-y-4">
              <div className="text-center space-y-1">
                <h5 className="text-lg font-bold text-white font-heading">
                  Unlock Your Full Pricing Breakdown & {rec.savings}
                </h5>
                <p className="text-xs text-slate-300">
                  Enter where we should send your personalized treatment voucher and itemized estimate:
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Cell Phone (For SMS Voucher) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="sarah@example.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Property ZIP Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 78704"
                      value={leadForm.zip}
                      onChange={(e) => setLeadForm({ ...leadForm, zip: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-extrabold text-sm shadow-lg shadow-[#00E599]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer font-heading active:scale-[0.99]"
                >
                  <span>Reveal My Estimate & Voucher Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                  <Lock className="w-3 h-3 text-[#00E599]" />
                  <span>Instant unlock • Zero spam guarantee • No obligation</span>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation & CRM Dossier Callout */}
        {isSubmitted && (
          <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0c142b] border border-[#00E599]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#00E599]/20 border border-[#00E599] flex items-center justify-center text-[#00E599] mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-white">
                Voucher Unlocked for {leadForm.name}!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Your personalized treatment plan has been prepared. Present this code to your technician:
              </p>

              <div className="p-3.5 rounded-xl bg-black/60 border border-[#00E599]/40 inline-flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">PROMO CODE:</span>
                <span className="text-base font-bold font-mono text-[#00E599] tracking-wider">
                  {rec.voucherCode}
                </span>
                <span className="text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
                  {rec.savings}
                </span>
              </div>
            </div>

            {/* Real Product Value Callout */}
            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-start gap-3">
              <Database className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-bold text-sky-300 uppercase tracking-wide">
                  What Just Happened in the Background:
                </div>
                <p className="leading-relaxed">
                  In your live Ecentra Concierge system, this lead was instantly sent to your CRM/phone with all 4 answers:
                  <span className="text-white font-medium"> ({answers.pestType}, {answers.propertySize}, {answers.activityArea}, {answers.urgency})</span>. 
                  When you or NeverMiss calls them back, you already know their exact issue and budget without asking 20 repetitive questions!
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Quiz Again with Different Answers</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

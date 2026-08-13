import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Play,
  Pause,
  Star,
  Quote,
  ShieldCheck,
  Zap,
  Globe,
  Sparkles,
  Calculator,
  MessageSquareText,
  CalendarCheck,
  Filter,
  Layers,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Clock,
  Building,
  HelpCircle,
} from 'lucide-react';
import { IndustryLandingData } from '../types';
import { getAdjacentIndustries, ALL_INDUSTRY_PAGES } from '../data/industryPages';

interface IndustryLandingPageProps {
  industry: IndustryLandingData;
  onBackToHome: () => void;
  onSelectIndustry: (id: string) => void;
  onOpenDirectory: () => void;
  onOpenFreeWebsite: () => void;
  onOpenBookCall: (industryName?: string) => void;
  onQuickClaimSuccess: (data: any) => void;
}

export const IndustryLandingPage: React.FC<IndustryLandingPageProps> = ({
  industry,
  onBackToHome,
  onSelectIndustry,
  onOpenDirectory,
  onOpenFreeWebsite,
  onOpenBookCall,
  onQuickClaimSuccess,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState<
    'freeWebsite' | 'aiReceptionist' | 'aiChatbot' | 'reviewAutomator' | 'appointmentSetter' | 'interactiveFunnel' | 'aiEmployeeSuite'
  >('aiReceptionist');

  // ROI Calculator local state for this industry
  const [ticketValue, setTicketValue] = useState(industry.typicalJobValue);
  const [missedCalls, setMissedCalls] = useState(industry.averageMissedCallsPerWeek);

  // Quick form state
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { prev, next } = getAdjacentIndustries(industry.id);

  // Calculate estimated recovered metrics
  const monthlyRecoveredValue = Math.round(ticketValue * missedCalls * 4.33 * 0.35);
  const annualRecoveredValue = monthlyRecoveredValue * 12;

  const toggleSimulateCall = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setAudioProgress(0);
    } else {
      setIsPlayingAudio(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 4;
        if (p >= 100) {
          clearInterval(interval);
          setIsPlayingAudio(false);
          setAudioProgress(0);
        } else {
          setAudioProgress(p);
        }
      }, 120);
    }
  };

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please enter your business name, phone, and email to claim your free site.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/.netlify/functions/submit-starter-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          phone,
          email,
          industry: industry.name,
          currentWebsite: `Claimed via ${industry.name} Industry Page`,
          frustrations: `Needs high-converting ${industry.shortName} web presence & 24/7 lead capture`,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onQuickClaimSuccess({
          ...data,
          businessName,
          phone,
          email,
          industry: industry.name,
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. You can also claim via the full form.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id={`industry-page-${industry.id}`} className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20">
      {/* Navigation Breadcrumb Bar */}
      <div className="bg-[#0D152F]/90 border-b border-white/10 sticky top-[60px] z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-slate-300">
            <button
              id="breadcrumb-back-home"
              onClick={onBackToHome}
              className="hover:text-[#00E599] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Home
            </button>
            <span className="text-slate-500">/</span>
            <button
              id="breadcrumb-all-industries"
              onClick={onOpenDirectory}
              className="hover:text-[#00E599] transition-colors font-medium cursor-pointer"
            >
              Industries (30)
            </button>
            <span className="text-slate-500">/</span>
            <span className="text-[#00E599] font-bold">{industry.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="switch-industry-modal-trigger"
              onClick={onOpenDirectory}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer font-medium flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-[#00E599]" />
              <span>Browse All 30 Verticals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#00E599]/15 to-[#1E2D5A]/25 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E599]/15 border border-[#00E599]/40 text-xs font-bold text-[#00E599]">
              <Sparkles className="w-3.5 h-3.5" />
              {industry.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
              {industry.badgeText}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Strong CTA Hook and Value */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                {industry.heroHeadline}
              </h1>

              {/* Strong Hero CTA Hook Box (styled prominently like the Solar requirement) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#0D152F] to-[#15224A] border-2 border-[#00E599]/50 shadow-xl shadow-[#00E599]/10 relative">
                <div className="text-xs font-bold uppercase tracking-wider text-[#00E599] mb-2 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>The {industry.shortName} Speed-To-Lead Mandate:</span>
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  "{industry.heroCtaHook}"
                </p>
              </div>

              {/* Core Bottleneck Callout */}
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <span className="font-bold text-red-400 block mb-0.5">The Daily Reality:</span>
                {industry.corePainPoint}
              </div>

              {/* Quick Stat Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">Typical Job Ticket</div>
                  <div className="font-heading text-lg sm:text-2xl font-bold text-[#00E599]">
                    ${industry.typicalJobValue.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">Avg Missed Inquiries</div>
                  <div className="font-heading text-lg sm:text-2xl font-bold text-white">
                    ~{industry.averageMissedCallsPerWeek}/wk
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                  <div className="text-[11px] text-slate-400 font-medium">Avg Annual Loss</div>
                  <div className="font-heading text-lg sm:text-2xl font-bold text-amber-400">
                    ${annualRecoveredValue.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* 4 Trade Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {industry.keyBenefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: High-Converting Free Website Claim Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-[#00E599]/60 to-[#15224A] rounded-3xl blur-sm opacity-80" />

                <div className="relative glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/15 bg-[#0D152F]">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <div>
                      <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/30 mb-1">
                        Foundational Starter Offer
                      </span>
                      <h3 className="font-heading text-xl font-bold text-white">
                        Claim Your $0 {industry.shortName} Website
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Design Value: $2,500</div>
                      <div className="text-base font-extrabold text-[#00E599]">$0 Upfront</div>
                      <div className="text-[10px] text-slate-400">$97/mo cloud care</div>
                    </div>
                  </div>

                  <form onSubmit={handleQuickSubmit} className="space-y-3.5">
                    {errorMsg && (
                      <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
                        {errorMsg}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your {industry.shortName} Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder={`e.g. Apex ${industry.shortName} Specialists`}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Direct Phone (for SMS preview) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="owner@yourcompany.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#00E599]/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-heading text-sm disabled:opacity-50"
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

                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" /> $0 Upfront Build
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#00E599]" /> 2–3 day turnaround
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

      {/* SECTION 2: How Each of Our Products Serves Your Business */}
      <section className="py-20 bg-[#0A1128] border-t border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Tailored Product Breakdown</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How Each Ecentra Concierge Product Serves Your {industry.shortName} Business
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Generic software fails because it doesn’t understand {industry.shortName} workflows. See exactly how our suite drives revenue for your specific trade.
            </p>
          </div>

          {/* Product Tabs Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { key: 'freeWebsite', label: 'Free Website ($0 + $97/mo)', icon: Globe },
              { key: 'aiReceptionist', label: '24/7 AI Receptionist', icon: PhoneCall },
              { key: 'aiChatbot', label: 'Smart AI Chatbot', icon: MessageSquareText },
              { key: 'reviewAutomator', label: '5-Star Review Automator', icon: Star },
              { key: 'appointmentSetter', label: '2-Way Appointment Setter', icon: CalendarCheck },
              { key: 'interactiveFunnel', label: 'Interactive Lead Funnel', icon: Filter },
              { key: 'aiEmployeeSuite', label: 'The "AI Employee" Suite', icon: Sparkles },
            ].map((p) => {
              const isSelected = activeProductTab === p.key;
              const IconComp = p.icon;
              return (
                <button
                  key={p.key}
                  onClick={() => setActiveProductTab(p.key as any)}
                  className={`px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-[#00E599] text-[#080E21] border-[#00E599] shadow-lg shadow-[#00E599]/20 font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Product Deep Dive Display */}
          {(() => {
            const prodData = industry.products[activeProductTab];
            const isFreeSite = activeProductTab === 'freeWebsite';
            return (
              <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl max-w-5xl mx-auto bg-[#0D152F]">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-7 space-y-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="inline-block text-xs font-bold uppercase tracking-wider text-[#00E599] bg-[#00E599]/10 px-3 py-1 rounded-md border border-[#00E599]/20">
                        Product {activeProductTab === 'freeWebsite' ? '1' : activeProductTab === 'aiReceptionist' ? '2' : activeProductTab === 'aiChatbot' ? '3' : activeProductTab === 'reviewAutomator' ? '4' : activeProductTab === 'appointmentSetter' ? '5' : activeProductTab === 'interactiveFunnel' ? '6' : '7'} of 7
                      </div>
                      {isFreeSite && (
                        <span className="text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-md border border-white/15">
                          $0 Build + $97/mo Hosting & Care
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                      {prodData.title}
                    </h3>
                    <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                        <span className="font-bold text-white block mb-1">How It Works for {industry.shortName}:</span>
                        <p className="leading-relaxed">{prodData.howItWorks}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[#00E599]/5 border border-[#00E599]/20 text-slate-200">
                        <span className="font-bold text-[#00E599] block mb-1">Your Direct Business Advantage:</span>
                        <p className="leading-relaxed">{prodData.industryBenefit}</p>
                      </div>

                      {isFreeSite && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-white/[0.04] to-transparent border border-white/10 text-xs text-slate-300 space-y-1">
                          <div className="font-bold text-[#00E599]">Foundational Scope & Upgrades:</div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            Includes a fast, mobile-optimized starter layout with click-to-call and Google local SEO schema ($97/mo hosting & maintenance). For complex multi-page funnels or bespoke custom portals, our Higher-End Custom Website tier is available whenever you are ready to scale.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-b from-[#15224A] to-[#080E21] border border-white/15 shadow-xl">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#00E599] mb-2 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Live Action Example in {industry.shortName}:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                        "{prodData.sampleAction}"
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onOpenBookCall(industry.name)}
                        className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                      >
                        <span>Deploy for {industry.shortName}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION 3: Interactive Live Call & Voice Simulation */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Voice Feature Context */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599]">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Live Audio Simulation</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Listen to the Ecentra AI Concierge in Action for {industry.shortName}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Trained on the exact terminology, dispatch parameters, and pricing protocols of {industry.name}. It never stumbles, pauses, or puts customers on hold.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span><strong>Sub-0.4 Second Response:</strong> Conversational human pacing with zero robotic delay.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span><strong>Trained on Trade Nuances:</strong> Knows {industry.shortName} questions, diagnostic booking, and escalation rules.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                  <span><strong>Direct Calendar Booking:</strong> Places confirmed slots straight into your calendar or CRM.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Simulated Phone Interface */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#15224A] to-[#080E21] border-2 border-white/15 shadow-2xl relative">
                {/* Phone Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-[#00E599]/20 border border-[#00E599] flex items-center justify-center text-[#00E599]">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-heading text-sm font-bold text-white">
                        Live {industry.shortName} Phone Agent
                      </div>
                      <div className="text-[11px] text-[#00E599] flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-ping" />
                        24/7 Intake Active
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {industry.receptionistSample.duration}
                  </div>
                </div>

                {/* Conversation Bubbles */}
                <div className="space-y-4 text-xs sm:text-sm mb-6">
                  {/* Caller */}
                  <div className="p-3.5 rounded-2xl bg-white/10 text-slate-200 border border-white/10 rounded-tl-none">
                    <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                      Inbound Customer ({industry.receptionistSample.callerType}):
                    </div>
                    {industry.receptionistSample.callerPrompt}
                  </div>

                  {/* AI Concierge */}
                  <div className="p-4 rounded-2xl bg-[#00E599]/15 border border-[#00E599]/40 text-slate-100 rounded-tr-none">
                    <div className="text-[10px] font-bold uppercase text-[#00E599] mb-1.5 flex items-center justify-between">
                      <span>Ecentra AI Concierge ({industry.shortName} Mode):</span>
                      <span className="text-[10px] font-normal text-slate-300">0.4s response</span>
                    </div>
                    {industry.receptionistSample.aiResponse}
                  </div>
                </div>

                {/* Simulated Audio Controls */}
                <div className="space-y-3">
                  <button
                    onClick={toggleSimulateCall}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4 text-[#00E599]" />
                        <span>Simulating {industry.shortName} Voice Demo ({audioProgress}%)</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 text-[#00E599] fill-current" />
                        <span>Play Sample {industry.shortName} AI Voice Demo</span>
                      </>
                    )}
                  </button>

                  {isPlayingAudio && (
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#00E599] h-full transition-all duration-100"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  )}

                  <button
                    onClick={() => onOpenBookCall(industry.name)}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                  >
                    <span>Schedule 15-Min Live Demo for {industry.shortName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Tailored ROI & Missed-Lead Revenue Calculator */}
      <section className="py-20 bg-[#0A1128] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Trade ROI Estimator</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Calculate Your Recoverable {industry.shortName} Revenue
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Adjust the sliders below based on your average ticket size and estimated missed after-hours calls.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl bg-[#0D152F]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                    <span>Average {industry.shortName} Ticket Value:</span>
                    <span className="text-base font-bold text-[#00E599]">${ticketValue.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max={Math.max(15000, industry.typicalJobValue * 2.5)}
                    step="50"
                    value={ticketValue}
                    onChange={(e) => setTicketValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00E599]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>$100</span>
                    <span>Industry Avg: ${industry.typicalJobValue.toLocaleString()}</span>
                    <span>${(Math.max(15000, industry.typicalJobValue * 2.5)).toLocaleString()}+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                    <span>Estimated Missed Inquiries Per Week:</span>
                    <span className="text-base font-bold text-white">{missedCalls} calls / wk</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00E599]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 / wk</span>
                    <span>Industry Avg: ~{industry.averageMissedCallsPerWeek} / wk</span>
                    <span>40 / wk</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Conservative 35% Conversion:</span>
                  Assumes Ecentra Concierge converts only 35% of previously lost after-hours inquiries into booked jobs.
                </div>
              </div>

              {/* Results Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#15224A] to-[#080E21] border-2 border-[#00E599]/40 text-center space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#00E599]">
                  Projected Recovered Revenue
                </div>
                <div>
                  <div className="text-xs text-slate-400">Estimated Monthly Lift</div>
                  <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#00E599] mt-1">
                    +${monthlyRecoveredValue.toLocaleString()}
                    <span className="text-sm font-normal text-slate-400">/mo</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <div className="text-xs text-slate-400">Estimated Annual Revenue Recovered</div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                    +${annualRecoveredValue.toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/yr</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenBookCall(industry.name)}
                  className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-lg shadow-[#00E599]/20 transition-all cursor-pointer font-heading"
                >
                  Capture This Revenue for {industry.shortName}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Interactive Funnel Scope Preview */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
              <Filter className="w-3.5 h-3.5" />
              <span>Smart Pre-Qualification</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {industry.funnelPreview.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Here is the exact 4-step interactive funnel embedded on your website to filter tire-kickers and capture high-budget clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl bg-[#0D152F]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {industry.funnelPreview.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#00E599]/20 border border-[#00E599] text-[#00E599] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      Step {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 pl-8 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-between flex-wrap gap-3 text-xs sm:text-sm">
              <span className="text-slate-200">
                <strong>Qualifier Rule:</strong> {industry.funnelPreview.qualifierNote}
              </span>
              <button
                onClick={onOpenFreeWebsite}
                className="px-4 py-2 rounded-lg bg-[#00E599] text-[#080E21] font-bold text-xs hover:bg-[#34D399] transition-all cursor-pointer font-heading"
              >
                Include in My Free Website
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Verified Industry Testimonial */}
      <section className="py-20 bg-[#0A1128] border-t border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/15 relative bg-[#0D152F] shadow-2xl">
            <Quote className="w-12 h-12 text-[#00E599]/20 absolute top-6 right-8" />
            <div className="space-y-6">
              <div className="flex items-center gap-1 text-[#00E599]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-400 ml-2">Verified {industry.shortName} Case Study</span>
              </div>

              <blockquote className="text-base sm:text-xl font-medium text-slate-100 italic leading-relaxed">
                "{industry.testimonial.quote}"
              </blockquote>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="font-heading text-base font-bold text-white">
                    {industry.testimonial.author}
                  </div>
                  <div className="text-xs text-slate-400">
                    {industry.testimonial.role}, {industry.testimonial.business}
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-[#00E599]/15 border border-[#00E599]/40 text-xs sm:text-sm font-extrabold text-[#00E599]">
                  {industry.testimonial.metric}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Industry Specific FAQs */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Trade FAQ</span>
            </div>
            <h2 className="font-heading text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions for {industry.name}
            </h2>
          </div>

          <div className="space-y-4">
            {industry.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2"
              >
                <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                  <span className="text-[#00E599] font-bold">Q:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-6 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Bottom Strong CTA */}
      <section className="py-20 bg-gradient-to-b from-[#0A1128] to-[#080E21] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E599]/15 border border-[#00E599]/30 text-xs font-bold text-[#00E599]">
            <span>Ready to Dominate Local {industry.shortName} Search?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Claim Your $0 {industry.shortName} Website & Pre-Trained AI Receptionist
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Zero upfront design fees. Zero long-term contracts. We handcraft your high-speed website and pre-train your 24/7 AI answering engine in 2–3 business days.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenFreeWebsite}
              className="px-8 py-4 text-base font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-xl shadow-xl shadow-[#00E599]/25 transition-all flex items-center gap-2 cursor-pointer font-heading hover:scale-105 active:scale-95"
            >
              <span>Claim Free {industry.shortName} Website ($0)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenBookCall(industry.name)}
              className="px-7 py-4 text-base font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all cursor-pointer font-heading"
            >
              Book 15-Minute Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Previous / Next Industry Switcher Bar */}
      <div className="border-t border-white/10 bg-[#0D152F] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => {
              onSelectIndustry(prev.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Previous: <strong>{prev.name}</strong></span>
          </button>

          <button
            onClick={onOpenDirectory}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            Browse All 30 Industries
          </button>

          <button
            onClick={() => {
              onSelectIndustry(next.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer group"
          >
            <span>Next: <strong>{next.name}</strong></span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Flame,
  Activity,
  Wrench,
  Palette,
  Sparkles,
  PhoneCall,
  Volume2,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  Star,
  Quote,
  TrendingUp,
  Building,
  Sun,
  Shield,
  Zap,
} from 'lucide-react';
import { ALL_INDUSTRY_PAGES } from '../data/industryPages';
import { IndustryLandingData } from '../types';

interface VerticalShowcaseSectionProps {
  selectedVerticalId: string;
  onSelectVertical: (id: string) => void;
  onOpenIndustryPage: (industryId: string) => void;
  onOpenIndustryDirectory: () => void;
  onOpenBookCallWithVertical: (verticalName: string) => void;
  onOpenFreeWebsite: () => void;
}

export const VerticalShowcaseSection: React.FC<VerticalShowcaseSectionProps> = ({
  selectedVerticalId,
  onSelectVertical,
  onOpenIndustryPage,
  onOpenIndustryDirectory,
  onOpenBookCallWithVertical,
  onOpenFreeWebsite,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Top featured trades for quick tab switcher
  const featuredIndustries = [
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'solar')!,
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'hvac')!,
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'dentist')!,
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'pest-control')!,
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'tattoo-shop')!,
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'med-spa-aesthetics')!,
    ALL_INDUSTRY_PAGES.find((i) => i.id === 'plumbing')!,
  ].filter(Boolean);

  const activeIndustry: IndustryLandingData =
    ALL_INDUSTRY_PAGES.find((v) => v.id === selectedVerticalId) ||
    featuredIndustries[0] ||
    ALL_INDUSTRY_PAGES[0];

  const toggleSimulateCall = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setAudioProgress(0);
    } else {
      setIsPlayingAudio(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        if (p >= 100) {
          clearInterval(interval);
          setIsPlayingAudio(false);
          setAudioProgress(0);
        } else {
          setAudioProgress(p);
        }
      }, 150);
    }
  };

  return (
    <section id="verticals-section" className="py-24 relative bg-[#0A1128] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Dedicated Industry Landing Pages</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Trained on the Exact Nuances of Your Trade
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Generic chatbots fail because they don’t understand trade terminology, diagnostic fees, or dispatch rules.
            Explore our 30 dedicated industry landing pages with custom product workflows.
          </p>
        </div>

        {/* Featured Trade Tabs Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {featuredIndustries.map((ind) => {
            const isSelected = ind.id === activeIndustry.id;
            return (
              <button
                key={ind.id}
                id={`vertical-tab-${ind.id}`}
                onClick={() => {
                  onSelectVertical(ind.id);
                  setIsPlayingAudio(false);
                  setAudioProgress(0);
                }}
                className={`px-4 py-2.5 rounded-xl font-heading text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#00E599] text-[#080E21] border-[#00E599] shadow-lg shadow-[#00E599]/20 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                <span>{ind.shortName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-[#080E21]/20 text-[#080E21]' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  ~${ind.typicalJobValue}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Glass Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden bg-[#0D152F]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Trade Details, CTA Hook & Key Benefits */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E599] bg-[#00E599]/10 px-3 py-1 rounded-md border border-[#00E599]/20">
                  {activeIndustry.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeIndustry.badgeText}
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {activeIndustry.heroHeadline}
              </h3>

              {/* Strong CTA Hook Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#080E21] to-[#15224A] border-2 border-[#00E599]/40 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed shadow-lg">
                <div className="text-[11px] font-bold uppercase text-[#00E599] mb-1.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Speed-To-Lead Mandate:</span>
                </div>
                "{activeIndustry.heroCtaHook}"
              </div>

              {/* 4 Trade Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {activeIndustry.keyBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: View Dedicated Landing Page & Deploy */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  id={`view-full-page-btn-${activeIndustry.id}`}
                  onClick={() => onOpenIndustryPage(activeIndustry.id)}
                  className="px-5 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-lg shadow-[#00E599]/20 transition-all flex items-center justify-center gap-2 cursor-pointer font-heading hover:scale-[1.02] active:scale-98"
                >
                  <span>Explore Dedicated {activeIndustry.shortName} Landing Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenBookCallWithVertical(activeIndustry.name)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Deploy for {activeIndustry.shortName}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Voice Simulation & Case Metric */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#15224A] to-[#080E21] border border-white/15 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <PhoneCall className="w-4 h-4 text-[#00E599]" />
                    <span>24/7 AI Phone Concierge Sample</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {activeIndustry.receptionistSample.duration}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 text-slate-300 border border-white/10">
                    <span className="font-bold text-slate-400 block text-[10px] uppercase mb-0.5">
                      Inbound Caller ({activeIndustry.receptionistSample.callerType}):
                    </span>
                    {activeIndustry.receptionistSample.callerPrompt}
                  </div>

                  <div className="p-3 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 text-slate-200">
                    <span className="font-bold text-[#00E599] block text-[10px] uppercase mb-0.5">
                      Ecentra AI Concierge (Instant Response):
                    </span>
                    {activeIndustry.receptionistSample.aiResponse}
                  </div>
                </div>

                {/* Audio Progress Bar */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={toggleSimulateCall}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#00E599]" />
                        <span>Simulating {activeIndustry.shortName} Call ({audioProgress}%)</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#00E599] fill-current" />
                        <span>Play Sample {activeIndustry.shortName} Audio Call</span>
                      </>
                    )}
                  </button>

                  {isPlayingAudio && (
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#00E599] h-full transition-all duration-100"
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Result Metric */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{activeIndustry.testimonial.author}</div>
                  <div className="text-[11px] text-slate-400">{activeIndustry.testimonial.business}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Verified Win</div>
                  <div className="font-bold text-[#00E599]">{activeIndustry.testimonial.metric}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

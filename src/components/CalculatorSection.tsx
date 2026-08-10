import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingDown, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

interface CalculatorSectionProps {
  onOpenBookCallWithRoi?: (roiSummary: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onOpenBookCallWithRoi,
}) => {
  // Inputs
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState<number>(4);
  const [averageTicket, setAverageTicket] = useState<number>(1400);
  const [closeRatePercent, setCloseRatePercent] = useState<number>(25);
  const [selectedVerticalPreset, setSelectedVerticalPreset] = useState<string>('HVAC');

  // Vertical Quick Presets with realistic research-backed numbers
  const presets = [
    { label: 'HVAC ($1,400)', ticket: 1400, missed: 4, close: 25, id: 'HVAC' },
    { label: 'Plumbing ($550)', ticket: 550, missed: 4, close: 30, id: 'Plumber' },
    { label: 'Appraisal ($500)', ticket: 500, missed: 3, close: 35, id: 'Appraisal' },
    { label: 'Chiropractic ($450)', ticket: 450, missed: 4, close: 35, id: 'Chiro' },
    { label: 'Tattoo ($350)', ticket: 350, missed: 4, close: 25, id: 'Tattoo' },
    { label: 'Med Spa ($750)', ticket: 750, missed: 4, close: 30, id: 'MedSpa' },
    { label: 'Roofing ($4,200)', ticket: 4200, missed: 2, close: 20, id: 'Roofing' },
    { label: 'Legal ($12,500)', ticket: 12500, missed: 2, close: 20, id: 'Legal' },
  ];

  const handleApplyPreset = (p: (typeof presets)[0]) => {
    setAverageTicket(p.ticket);
    setMissedCallsPerWeek(p.missed);
    setCloseRatePercent(p.close);
    setSelectedVerticalPreset(p.id);
  };

  // Calculations
  const missedCallsPerMonth = missedCallsPerWeek * 4.33;
  const lostJobsPerMonth = missedCallsPerMonth * (closeRatePercent / 100);
  const monthlyLostRevenue = Math.round(lostJobsPerMonth * averageTicket);
  const annualLostRevenue = monthlyLostRevenue * 12;

  // Ecentra starting cost (~$199/mo)
  const baseMonthlyService = 199;
  const jobsToBreakEven = Math.max(1, Math.ceil(baseMonthlyService / Math.max(1, averageTicket)));

  const handleCtaClick = () => {
    const summary = `Lost ROI Math: ${missedCallsPerWeek} missed calls/wk @ $${averageTicket}/job = $${monthlyLostRevenue.toLocaleString()}/mo lost`;
    onOpenBookCallWithRoi?.(summary);
  };

  return (
    <section id="calculator-section" className="py-24 relative bg-[#0A1128] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400 mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Interactive Revenue Leak Calculator</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            How Much Money Are Missed Calls Costing You?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            When a homeowner or patient reaches voicemail, 8 out of 10 hang up and call your competitor.
            Adjust the numbers below to see your real, transparent revenue gap.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 text-center mb-3">
            Or select your industry preset:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {presets.map((p) => (
              <button
                key={p.id}
                id={`calc-preset-${p.id}`}
                onClick={() => handleApplyPreset(p)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  selectedVerticalPreset === p.id
                    ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold shadow-md shadow-[#00E599]/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Sliders & Inputs */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-white/10 mb-6 text-white font-heading font-bold text-lg">
                <Sliders className="w-5 h-5 text-[#00E599]" />
                <span>Adjust Your Business Numbers</span>
              </div>

              {/* Slider 1: Missed Calls */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-200">
                    Estimated Missed Calls / Inquiries Per Week
                  </label>
                  <span className="font-heading text-lg font-bold text-[#00E599] bg-[#00E599]/10 px-3 py-0.5 rounded-lg border border-[#00E599]/20">
                    {missedCallsPerWeek} calls / wk
                  </span>
                </div>
                <input
                  id="calc-slider-missed-calls"
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={missedCallsPerWeek}
                  onChange={(e) => {
                    setMissedCallsPerWeek(Number(e.target.value));
                    setSelectedVerticalPreset('Custom');
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>1 / wk (Low)</span>
                  <span>3–5 / wk (Typical local business)</span>
                  <span>15+ / wk (High volume)</span>
                </div>
              </div>

              {/* Slider 2: Average Job / Ticket Value */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-200">
                    Average Job or Customer Lifetime Value
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">$</span>
                    <input
                      id="calc-input-ticket"
                      type="number"
                      min="50"
                      max="25000"
                      step="50"
                      value={averageTicket}
                      onChange={(e) => {
                        setAverageTicket(Number(e.target.value));
                        setSelectedVerticalPreset('Custom');
                      }}
                      className="w-28 px-2 py-1 text-right font-heading text-lg font-bold text-[#00E599] bg-[#080E21] border border-white/20 rounded-lg focus:outline-none focus:border-[#00E599]"
                    />
                  </div>
                </div>
                <input
                  id="calc-slider-ticket"
                  type="range"
                  min="100"
                  max="15000"
                  step="50"
                  value={averageTicket}
                  onChange={(e) => {
                    setAverageTicket(Number(e.target.value));
                    setSelectedVerticalPreset('Custom');
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>$100 (Service)</span>
                  <span>$1,400 (Trade install)</span>
                  <span>$10,000+ (Legal/Roofing)</span>
                </div>
              </div>

              {/* Slider 3: Close Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-200">
                    Estimated Close Rate on Answered Calls
                  </label>
                  <span className="font-heading text-base font-bold text-white bg-white/10 px-3 py-0.5 rounded-lg">
                    {closeRatePercent}%
                  </span>
                </div>
                <input
                  id="calc-slider-close-rate"
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={closeRatePercent}
                  onChange={(e) => {
                    setCloseRatePercent(Number(e.target.value));
                    setSelectedVerticalPreset('Custom');
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>10% (Conservative)</span>
                  <span>25% (Industry Standard)</span>
                  <span>60% (High Referral)</span>
                </div>
              </div>
            </div>

            {/* Transparent Calculation Breakdown Note */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-200 font-semibold">Transparent Math:</span>{' '}
              {missedCallsPerWeek} calls/wk × 4.33 wks = ~{Math.round(missedCallsPerMonth)} missed inquiries/mo.{' '}
              At a {closeRatePercent}% close rate, that equals{' '}
              <strong className="text-white">{lostJobsPerMonth.toFixed(1)} lost paying jobs/mo</strong>.
            </div>
          </div>

          {/* Right Column: High-Impact Output & ROI Comparison Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1C2541] to-[#0D152F] border-2 border-red-500/40 shadow-2xl relative overflow-hidden">
            {/* Warning Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5" /> Estimated Revenue Leak
              </span>
              <span className="text-xs text-slate-400">Monthly & Annual</span>
            </div>

            {/* Big Lost Revenue Figures */}
            <div className="space-y-4 my-auto py-2">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Estimated Monthly Revenue Lost
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-extrabold text-red-400 tracking-tight mt-1">
                  -${monthlyLostRevenue.toLocaleString()}
                  <span className="text-base text-slate-400 font-normal"> / month</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Estimated Annual Revenue Lost
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-bold text-red-300/90 tracking-tight">
                  -${annualLostRevenue.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / year</span>
                </div>
              </div>

              {/* Payoff Comparison Box */}
              <div className="p-4 rounded-2xl bg-[#080E21]/80 border border-[#00E599]/30 space-y-2">
                <div className="flex items-center gap-2 text-[#00E599] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> The Ecentra Payoff Math:
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  Ecentra Concierge services start at <span className="text-[#00E599] font-bold">~$199/mo</span>.
                  Recovering just <span className="text-white font-bold">{jobsToBreakEven} job</span> out of the {Math.round(lostJobsPerMonth)} you currently miss pays for your entire service.
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-6">
              <button
                id="calc-plug-leak-btn"
                onClick={handleCtaClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold font-heading text-base shadow-lg shadow-[#00E599]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Plug This Revenue Leak</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-slate-400 mt-2">
                Zero live checkout • 15-minute tailored game plan
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

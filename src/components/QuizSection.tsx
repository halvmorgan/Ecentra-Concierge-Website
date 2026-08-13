import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  PhoneCall,
  Calendar,
  Zap,
  ShieldCheck,
  TrendingUp,
  Lock,
  DollarSign,
  AlertCircle,
  HelpCircle,
  CreditCard,
  ExternalLink,
} from 'lucide-react';
import { QUIZ_QUESTIONS, calculateQuizResults } from '../data/quizData';
import { QuizAnalysisResult, MissedCallsTier } from '../types';

interface QuizSectionProps {
  onOpenBookCallWithProduct?: (productName: string) => void;
  onOpenFreeWebsite: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onOpenBookCallWithProduct,
  onOpenFreeWebsite,
}) => {
  // 0 to 4: Quiz Questions, 5: Lead Capture Gate, 6: Completed Report
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultData, setResultData] = useState<QuizAnalysisResult | null>(null);

  // Lead capture state (captured BEFORE showing report)
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [leadError, setLeadError] = useState('');

  // Interactive tier selection on results screen (defaults to 1 or 2 calls/week)
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);

    // Snappy auto advance
    setTimeout(() => {
      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Compute results and move to the Gate (Step 5)
        const results = calculateQuizResults(updated);
        setResultData(results);
        // Default tier selection to match their Q3 answer (0: <15 -> tier 1 (2 calls/wk); 1: 15-40 -> tier 2 (4 calls/wk); 2: 40-100 -> tier 3 (8 calls/wk); 3: 100+ -> tier 4 (12 calls/wk))
        const q3Answer = updated[2] ?? 0;
        const initialTierIdx = Math.min(results.tiers.length - 1, Math.max(0, q3Answer + 1));
        setSelectedTierIndex(initialTierIdx);
        setCurrentStep(QUIZ_QUESTIONS.length); // Move to lead gate
      }
    }, 220);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCompleted(false);
    setResultData(null);
    setLeadError('');
  };

  const handleUnlockReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim() || !contactEmail.trim()) {
      setLeadError('Please enter your name, phone number, and email address to unlock your report.');
      return;
    }
    setLeadError('');
    setIsUnlocking(true);

    try {
      await fetch('/.netlify/functions/submit-quiz-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: contactName.trim(),
          phone: contactPhone.trim(),
          email: contactEmail.trim(),
          businessName: businessName.trim() || resultData?.industryName || 'Local Business',
          industry: resultData?.industryName,
          biggestProblem: resultData?.headache,
          weeklyLeads: resultData?.weeklyLeadsText,
          answeringMethod: resultData?.answeringMethod,
          recommendedProducts: {
            primary: resultData?.primary.name,
            secondary: resultData?.secondary.name,
            estimatedMonthlyGain: resultData?.estimatedMonthlyGain,
            fixCost: resultData?.fixCostDisplay,
            typicalJobValue: resultData?.typicalTicket,
          },
          answers: selectedAnswers,
        }),
      });
    } catch (err) {
      console.error('Quiz lead capture error:', err);
      // Graceful continuation so user still receives report
    } finally {
      setIsUnlocking(false);
      setIsCompleted(true);
    }
  };

  const isGateStep = currentStep === QUIZ_QUESTIONS.length && !isCompleted;
  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const progressPercent = isGateStep
    ? 95
    : isCompleted
    ? 100
    : Math.round(((currentStep + 1) / (QUIZ_QUESTIONS.length + 1)) * 100);

  // Currently active tier in the results screen
  const activeTier: MissedCallsTier | undefined =
    resultData?.tiers[selectedTierIndex] || resultData?.tiers[1];

  return (
    <section id="quiz-section" className="py-24 relative overflow-hidden bg-[#080E21]">
      {/* Ambient Backdrop Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00E599]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3B82F6]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>60-Second Revenue Diagnosis</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Calculate Your Revenue Leak & Recommended Fix
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Discover exactly how many calls you are losing, what it costs your trade, and how the right fix pays for itself.
          </p>
        </div>

        {/* Quiz Main Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl shadow-black/80 relative">
          {/* PHASE 1: QUESTIONS (Steps 0 to 4) */}
          {!isGateStep && !isCompleted && currentQuestion && (
            <div>
              {/* Progress Line */}
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
                <span className="flex items-center gap-1.5 text-white font-medium">
                  <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                </span>
                <span className="text-[#00E599] font-bold">{progressPercent}% Completed</span>
              </div>

              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-gradient-to-r from-[#00E599] to-[#34D399] h-full transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question Headline */}
              <div className="mb-8">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.subtext && (
                  <p className="text-sm text-slate-300 mt-1.5 font-normal">
                    {currentQuestion.subtext}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      id={`quiz-q${currentStep}-opt${idx}`}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                        isSelected
                          ? 'bg-[#00E599]/15 border-[#00E599] shadow-lg shadow-[#00E599]/10 text-white'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-200 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-[#00E599] bg-[#00E599] text-[#080E21]'
                            : 'border-slate-500 bg-transparent text-transparent'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 fill-current" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-base text-white">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-xs sm:text-sm text-slate-400 mt-0.5">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  id="quiz-back-btn"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-xs text-slate-400">
                  Step {currentStep + 1} of {QUIZ_QUESTIONS.length} • Takes &lt; 60 seconds
                </div>
              </div>
            </div>
          )}

          {/* PHASE 2: LEAD CAPTURE GATE (Step 5 - Before Showing Results) */}
          {isGateStep && (
            <div id="quiz-lead-gate-container" className="animate-fadeIn">
              {/* Header */}
              <div className="text-center mb-6 pb-6 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/40 text-xs font-bold uppercase tracking-wider mb-2">
                  <Lock className="w-3.5 h-3.5" /> Diagnosis Ready • Final Step
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  Where Should We Deliver Your Revenue Loss & ROI Report?
                </h3>
                <p className="text-sm text-slate-300 mt-2 max-w-lg mx-auto">
                  Enter your contact details below to instantly unlock your customized profit breakdown and see how quickly the suggested fix pays for itself.
                </p>
              </div>

              {/* Lead Capture Form */}
              <form onSubmit={handleUnlockReport} className="space-y-4 max-w-xl mx-auto">
                {leadError && (
                  <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{leadError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Full Name <span className="text-[#00E599]">*</span>
                    </label>
                    <input
                      id="quiz-contact-name-input"
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D152F] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Direct Cell / Phone <span className="text-[#00E599]">*</span>
                    </label>
                    <input
                      id="quiz-contact-phone-input"
                      type="tel"
                      required
                      placeholder="e.g. (555) 234-5678"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D152F] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Work Email Address <span className="text-[#00E599]">*</span>
                    </label>
                    <input
                      id="quiz-contact-email-input"
                      type="email"
                      required
                      placeholder="e.g. john@millerheating.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D152F] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Business / Company Name <span className="text-slate-400 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      id="quiz-business-name-input"
                      type="text"
                      placeholder="e.g. Miller & Sons Heating"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D152F] border border-white/20 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599] transition-colors"
                    />
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 text-center">
                  <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>100% Confidential</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <Zap className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Instant Unlock</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <Lock className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Zero Obligation</span>
                  </div>
                </div>

                {/* Unlock Button */}
                <div className="pt-3">
                  <button
                    id="quiz-unlock-report-btn"
                    type="submit"
                    disabled={isUnlocking}
                    className="w-full py-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-heading font-extrabold text-base shadow-xl shadow-[#00E599]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isUnlocking ? (
                      <span>Unlocking Your Custom Report...</span>
                    ) : (
                      <>
                        <span>Unlock My Revenue Loss & Profit Report</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(QUIZ_QUESTIONS.length - 1)}
                    className="text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to previous question</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PHASE 3: COMPREHENSIVE REVENUE LOSS & PROFIT AMPLIFIER REPORT */}
          {isCompleted && resultData && (
            <div id="quiz-results-container" className="space-y-8 animate-fadeIn">
              {/* Header with Trade Personalization */}
              <div className="pb-6 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/40 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Diagnosis Complete • {businessName || contactName || resultData.industryName}</span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                  </button>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  How Fixing Missed Calls Puts More Net Cash In Your Pocket
                </h3>
                <p className="text-slate-300 text-sm mt-1.5 leading-relaxed">
                  For a <span className="text-white font-semibold">{resultData.industryName}</span> business with an estimated average job ticket of{' '}
                  <span className="text-[#00E599] font-bold">${resultData.typicalTicket.toLocaleString()}</span>, here is the exact economic breakdown showing how ordering the fix pays for itself and generates pure net profit.
                </p>
              </div>

              {/* Interactive Missed Calls Matrix */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101B3B] to-[#0D152F] border border-white/15 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <div>
                    <div className="text-xs font-bold text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>The Numbers: Missed Calls vs. Fix Cost</span>
                    </div>
                    <h4 className="font-heading text-lg font-bold text-white mt-0.5">
                      Select your weekly missed call volume:
                    </h4>
                  </div>

                  {/* Volume Selection Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {resultData.tiers.map((tier, idx) => (
                      <button
                        key={idx}
                        id={`quiz-tier-btn-${tier.callsPerWeek}`}
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedTierIndex === idx
                            ? 'bg-[#00E599] text-[#080E21] shadow-md shadow-[#00E599]/20'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                        }`}
                      >
                        {tier.callsPerWeek} {tier.callsPerWeek === 1 ? 'call' : 'calls'}/wk
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3 Core Metric Blocks */}
                {activeTier && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Box 1: Revenue Lost */}
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                      <div className="text-xs text-rose-300 font-semibold mb-1">
                        Revenue Leaking to Competitors
                      </div>
                      <div className="font-heading text-2xl sm:text-3xl font-extrabold text-rose-400">
                        -${activeTier.lostRevenueMonth.toLocaleString()}
                        <span className="text-xs font-normal text-slate-400"> / mo</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Missing ~{activeTier.callsPerWeek} call{activeTier.callsPerWeek > 1 ? 's' : ''}/wk ({activeTier.callsPerMonth}/mo) at ~40% close rate
                      </div>
                    </div>

                    {/* Box 2: Suggested Fix Cost */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                      <div className="text-xs text-slate-300 font-semibold mb-1">
                        Cost of Suggested Fix ({resultData.primary.name})
                      </div>
                      <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                        {resultData.fixCostDisplay}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {resultData.fixCost === 0
                          ? '100% Free custom build ($0)'
                          : 'Zero payroll taxes, benefits, or sick days'}
                      </div>
                    </div>

                    {/* Box 3: Net Cash In Your Pocket */}
                    <div className="p-4 rounded-xl bg-[#00E599]/15 border-2 border-[#00E599] shadow-lg shadow-[#00E599]/10">
                      <div className="flex items-center justify-between text-xs text-[#00E599] font-bold mb-1">
                        <span>Net Profit In Your Pocket</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#00E599] text-[#080E21] text-[10px] font-extrabold">
                          {activeTier.roiMultiple} ROI
                        </span>
                      </div>
                      <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                        +${activeTier.netProfitMonth.toLocaleString()}
                        <span className="text-xs font-normal text-slate-300"> / mo</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        +${(activeTier.netProfitMonth * 12).toLocaleString()} / year in newly captured margin
                      </div>
                    </div>
                  </div>
                )}

                {/* Breakeven Proof Callout Box */}
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 leading-relaxed space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white font-heading">
                    <span className="text-base">💡</span>
                    <span>The Breakeven Rule: Why Ordering The Fix Makes You Money</span>
                  </div>
                  <p>
                    {resultData.fixCost === 0 ? (
                      <>
                        Because your recommended custom website is built for <strong>$0 with no monthly page builder fees</strong>, every single customer quote you capture is <strong>100% pure profit</strong> with infinite ROI.
                      </>
                    ) : (
                      <>
                        In {resultData.industryName}, with a single job averaging <strong>${resultData.typicalTicket.toLocaleString()}</strong>, recovering <strong>just 1 single call per month</strong> (or even 1 every 2 months) pays for the entire <strong>{resultData.fixCostDisplay}</strong> fee.
                      </>
                    )}
                  </p>
                  <p className="text-slate-300">
                    {resultData.fixCost > 0 && (
                      <>
                        Even if you only miss <strong>{activeTier?.callsPerWeek || 2} calls a week</strong>, capturing those previously lost inquiries generates <strong>+${activeTier?.netProfitMonth.toLocaleString() || '2,500'}/month</strong> in extra margin—meaning the software isn't an expense, but a self-funding profit center.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Recommended Fixes Section */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#00E599] uppercase tracking-wider">
                  Recommended Action Plan
                </div>

                {/* Primary Suggested Solution */}
                <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#15224A] to-[#0D152F] border-2 border-[#00E599] shadow-xl relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#00E599] text-[#080E21] text-xs font-extrabold uppercase tracking-wide">
                        #1 Core Solution
                      </span>
                      <h4 className="font-heading text-2xl font-bold text-white mt-1.5">
                        {resultData.primary.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Pricing</div>
                      <div className="font-heading text-lg font-bold text-[#00E599]">
                        {resultData.primary.startingPrice}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    {resultData.primary.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-y border-white/10 text-xs text-slate-200 mb-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0" />
                      <span>Sub-60s instant response to all callers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0" />
                      <span>Zero missed after-hours or weekend emergencies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0" />
                      <span>Direct 2-way calendar dispatch booking</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {resultData.primary.checkoutUrl && (
                      <a
                        id="quiz-result-checkout-btn"
                        href={resultData.primary.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-sm shadow-lg shadow-[#00E599]/20 transition-all flex items-center gap-2 cursor-pointer font-heading group"
                      >
                        <CreditCard className="w-4 h-4 shrink-0" />
                        <span>Order Now ({resultData.primary.startingPrice})</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </a>
                    )}
                    <button
                      id="quiz-result-book-primary-btn"
                      onClick={() =>
                        onOpenBookCallWithProduct?.(
                          `${resultData.primary.name} (Quiz Diagnosis: ${resultData.industryName}, ~${activeTier?.callsPerWeek || 2} missed calls/wk)`
                        )
                      }
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Schedule Strategy Call</span>
                    </button>
                    {resultData.primary.id === 'free-website' && (
                      <button
                        onClick={onOpenFreeWebsite}
                        className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/10 transition-all cursor-pointer"
                      >
                        Claim Free Website ($0)
                      </button>
                    )}
                  </div>
                </div>

                {/* Secondary Complementary Asset */}
                {resultData.secondary && (
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                        Recommended Complementary Resource
                      </div>
                      <div className="font-heading text-lg font-bold text-white">
                        {resultData.secondary.name}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 max-w-lg">
                        {resultData.secondary.tagline} •{' '}
                        <span className="text-[#00E599] font-semibold">
                          {resultData.secondary.startingPrice}
                        </span>
                      </div>
                    </div>
                    <button
                      id="quiz-result-secondary-btn"
                      onClick={() =>
                        onOpenBookCallWithProduct?.(
                          `${resultData.primary.name} + ${resultData.secondary.name}`
                        )
                      }
                      className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-all shrink-0 cursor-pointer"
                    >
                      Include in Strategy Call →
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Summary Bar */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                <span>
                  ✓ Your report has been saved under <strong>{contactEmail}</strong>. Our team will review your vertical setup prior to your call.
                </span>
                <button
                  onClick={handleReset}
                  className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


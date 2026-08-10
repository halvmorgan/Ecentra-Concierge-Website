import React from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Zap, 
  MessageSquare, 
  PhoneForwarded,
  Mail,
  HeartHandshake
} from 'lucide-react';

interface AboutUsPageProps {
  onBackToHome: () => void;
  onNavigateContact: () => void;
  onNavigateSmsOptIn: () => void;
  onOpenFreeWebsite: () => void;
  onOpenBookCall: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBackToHome,
  onNavigateContact,
  onNavigateSmsOptIn,
  onOpenFreeWebsite,
  onOpenBookCall,
}) => {
  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            id="about-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onNavigateContact}
              className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={onNavigateSmsOptIn}
              className="text-[#00E599] hover:underline cursor-pointer"
            >
              SMS Alerts
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-4 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599]">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>About Ecentra Concierge</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built By a Business Owner, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00E599]">
              For Business Owners
            </span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            The origin story behind the 24/7 AI Concierge and modern website engine for local service trades.
          </p>
        </div>

        {/* Founder Story Block (Exact Content) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/15 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Lead Quote Accent */}
          <div className="text-lg sm:text-xl font-medium text-white leading-relaxed border-l-4 border-[#00E599] pl-5 italic">
            "Ecentra Concierge didn't start as a tech company. It started as a fix for a real problem in a real business."
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              I'm <strong className="text-white font-semibold">Harold Morgan</strong>, and before Ecentra Concierge, I ran a one-person real estate appraisal business — the kind of business where every missed call is a missed client, and there's no receptionist, no front desk, no backup. Just me, out on inspections, trying to keep up with a phone that never stopped ringing at the worst possible times.
            </p>

            <p>
              So I built the fix myself. A modern website that actually worked for the business. A system that meant every call got answered — even when I was mid-inspection, writing a report, or simply unreachable. No more missed clients. No more chasing callbacks between appointments.
            </p>

            <p>
              The results weren't small. My own business runs differently now — more responsive, more professional, and running lean without cutting corners on service. That's when I realized: every service business owner I know is fighting the exact same battle I was.
            </p>

            <div className="p-5 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/30 text-white font-heading font-bold text-lg sm:text-xl text-center text-[#00E599]">
              That's why Ecentra Concierge exists.
            </div>

            <p>
              We take the same AI-powered tools that transformed my own appraisal business — AI receptionists that never miss a call, chatbots that capture leads while you're on the job, automated review generation, appointment setting, and more — and bring them to HVAC companies, chiropractors, plumbers, tattoo studios, med spas, and other local service businesses who are stretched just as thin as I was.
            </p>

            <p>
              We're not a call center. We're not a generic software vendor. We're built by someone who ran the business first, felt the pain first, and built the solution because I needed it to work — not because it looked good in a pitch deck.
            </p>

            <p className="font-semibold text-white text-base">
              If missed calls, missed leads, or an outdated website are costing you business, let's fix that — the same way we fixed it here.
            </p>
          </div>

          {/* Founder Signature Card */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00E599] to-[#059669] text-[#080E21] font-heading font-black text-lg flex items-center justify-center shadow-lg">
                HM
              </div>
              <div>
                <div className="font-heading font-bold text-white text-base">Harold Morgan</div>
                <div className="text-xs text-slate-400">Founder & Operator, Ecentra Concierge</div>
                <div className="text-[11px] text-[#00E599] font-mono">Former Solo Appraisal Operator</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Zero-Risk Guarantee</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Principles Grid */}
        <div className="space-y-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00E599]" />
            <span>Why Business Owners Choose Ecentra</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-white text-base">Zero Missed Inbound Revenue</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you are on a roof, in a crawlspace, or consulting with a patient, our AI concierge answers in 1 ring, qualifies the caller, and logs the appointment into your calendar.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-white text-base">$0 Starter Website + AI Search</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We remove the painful $3,000+ agency roadblock with a $0 upfront foundational website—built with rich schema and citations to rank directly in ChatGPT, Claude, Gemini, and Google search.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 text-[#00E599] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-white text-base">No Call Centers or Stiff Bots</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hyper-realistic, natural voice AI tailored with your business pricing, service zip codes, emergency protocols, and trade-specific vocabulary.
              </p>
            </div>
          </div>
        </div>

        {/* Action / CTA Bar */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0D152F] to-[#15224A] border border-white/15 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-white">
              Ready to stop losing jobs to unanswered phones?
            </h2>
            <p className="text-xs text-slate-300">
              Claim your $0 foundational starter website or test our 24/7 AI Receptionist live on your actual business number.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="about-claim-free-btn"
              onClick={onOpenFreeWebsite}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs font-heading shadow-lg shadow-[#00E599]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim $0 Foundational Website</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="about-book-call-btn"
              onClick={onOpenBookCall}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
            >
              Book 15-Min Strategy Call
            </button>
            <button
              id="about-contact-btn"
              onClick={onNavigateContact}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
            >
              Contact Us Directly
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

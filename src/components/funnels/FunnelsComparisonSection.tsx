import React from 'react';
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  ShieldCheck,
  Award,
} from 'lucide-react';

export const FunnelsComparisonSection: React.FC = () => {
  const COMPARISONS = [
    {
      metric: 'Visitor Engagement Rate',
      traditional: '2% – 3.5%',
      traditionalNote: 'Most visitors scan text and bounce in under 15 seconds',
      funnel: '35% – 58%',
      funnelNote: 'Visitors eagerly click choices, adjust sliders, or spin for prizes',
      highlight: true,
    },
    {
      metric: 'Lead Qualification Depth',
      traditional: 'Blind / Generic',
      traditionalNote: 'Leaves you with a random name and a blank message box',
      funnel: '100% Pre-Diagnosed',
      funnelNote: 'Exact square footage, problem type, budget, timeline, and urgency captured',
      highlight: true,
    },
    {
      metric: 'Customer Psychology',
      traditional: 'High Friction & Guarded',
      traditionalNote: 'Feels like handing over private info for a sales pitch',
      funnel: 'High Value Exchange',
      funnelNote: 'Customer feels they are receiving an audit, estimate, or prize in return',
      highlight: false,
    },
    {
      metric: 'Data Points for Sales Reps',
      traditional: '1 – 2 raw fields',
      traditionalNote: 'Rep must waste 15 minutes asking basic qualifying questions',
      funnel: '6 – 12 actionable points',
      funnelNote: 'Rep calls back with customized quote & accurate diagnosis in hand',
      highlight: false,
    },
    {
      metric: 'Close Rate on Booked Calls',
      traditional: 'Baseline standard (~18%)',
      traditionalNote: 'Lots of low-budget tire-kickers and wrong-fit inquiries',
      funnel: '2.4x Higher (~42%)',
      funnelNote: 'Tire-kickers self-filter; high-intent buyers self-identify',
      highlight: true,
    },
    {
      metric: 'Paid Ad ROI (Google / Meta)',
      traditional: 'High Cost Per Lead ($80–$180)',
      traditionalNote: 'Wasteful ad spend on high bounce rate landing pages',
      funnel: '40% – 65% Lower Cost',
      funnelNote: 'Interactive hooks dramatically improve ad conversion rates',
      highlight: false,
    },
  ];

  return (
    <section className="py-16 bg-[#080E21]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/20 tracking-wide uppercase">
            <BarChart3 className="w-3.5 h-3.5" />
            Conversion Economics
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Why The Fast Track Funnels Crush Static Contact Forms
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A static "Contact Us" form asks for everything while giving nothing. The Fast Track funnels create a gamified value exchange that converts casual browsers into qualified, ready-to-buy appointments.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl border border-white/10 bg-[#0c142b] overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-black/40 border-b border-white/10 p-4 sm:p-5 text-xs font-bold font-heading">
            <div className="col-span-4 text-slate-300 uppercase tracking-wider">
              Performance Metric
            </div>
            <div className="col-span-4 text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Old Static Form</span>
            </div>
            <div className="col-span-4 text-[#00E599] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>The Fast Track Funnel</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {COMPARISONS.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm transition-colors ${
                  row.highlight ? 'bg-white/[0.02]' : ''
                }`}
              >
                {/* Metric Name */}
                <div className="col-span-4 pr-3 flex items-center">
                  <span className="font-semibold text-white">{row.metric}</span>
                </div>

                {/* Old Traditional Form */}
                <div className="col-span-4 pr-3 space-y-1">
                  <div className="font-bold text-rose-300 font-mono text-xs sm:text-sm">
                    {row.traditional}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed hidden sm:block">
                    {row.traditionalNote}
                  </div>
                </div>

                {/* Ecentra The Fast Track */}
                <div className="col-span-4 space-y-1">
                  <div className="font-extrabold text-[#00E599] font-mono text-xs sm:text-sm flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
                    <span>{row.funnel}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed hidden sm:block">
                    {row.funnelNote}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">
              1. Zero Tire-Kicker Waste
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Low-budget shoppers who want a $500 job done for $50 get self-filtered before your team ever spends 45 minutes on a phone call or driving across town.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">
              2. Instant Value Gratification
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prospects participate enthusiastically because they receive immediate diagnostic answers, calculated estimates, or a custom voucher in return for their contact info.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-heading">
              3. Seamless CRM Ingestion
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every funnel connects directly to your GoHighLevel CRM, email, and SMS alerts—instantly tagging leads with their exact answers and scheduling preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

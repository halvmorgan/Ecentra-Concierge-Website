import React from 'react';
import { PhoneIncoming, Zap, Star, Users, CheckCircle, TrendingUp, Shield } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const stats = [
    {
      value: '350+',
      label: 'Local Service Businesses Powered',
      icon: Users,
    },
    {
      value: '100%',
      label: 'After-Hours Calls Answered',
      icon: PhoneIncoming,
    },
    {
      value: '+42%',
      label: 'Average Lead-to-Booked Surge',
      icon: TrendingUp,
    },
    {
      value: '84%',
      label: 'Fewer Client No-Shows',
      icon: CheckCircle,
    },
  ];

  const recentWins = [
    { trade: 'HVAC • Dallas, TX', outcome: 'Captured $9,200 weekend furnace replacement call' },
    { trade: 'Plumber • Denver, CO', outcome: 'Booked emergency drain clear at 11:42 PM' },
    { trade: 'Chiropractor • Atlanta, GA', outcome: '+14 new patient consults in first 30 days' },
    { trade: 'Tattoo Studio • Austin, TX', outcome: 'Collected $1,800 in deposits with zero DMs' },
    { trade: 'Med Spa • Scottsdale, AZ', outcome: 'Filled 6 high-ticket Botox slots via AI chat' },
  ];

  return (
    <div id="trust-bar-section" className="relative border-y border-white/10 bg-[#0A1128]/80 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Stat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg bg-[#00E599]/10 text-[#00E599]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Proof Ticker */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E599] animate-ping" />
            <span className="text-white">Live Verified Client Wins:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs text-slate-300">
            {recentWins.slice(0, 3).map((win, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2"
              >
                <span className="text-[#00E599] font-bold">{win.trade}:</span>
                <span className="text-slate-300">{win.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  TrendingUp,
  DollarSign,
  Zap,
  Home,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Lock,
  Database,
  Layers,
  FileText,
} from 'lucide-react';

interface ProjectType {
  id: string;
  name: string;
  energySavingsRate: number; // percentage of bill saved
  equityMultiplier: number; // percentage of project cost recovered in home value
  baseCostPerSqFt: number; // rough cost per sq ft
  taxCreditRate: number; // federal / state rebate %
  icon: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'windows',
    name: 'High-Efficiency Triple-Pane Windows',
    energySavingsRate: 0.28,
    equityMultiplier: 0.72,
    baseCostPerSqFt: 3.8,
    taxCreditRate: 0.15,
    icon: '🪟',
  },
  {
    id: 'solar',
    name: 'Rooftop Solar & Smart Battery Storage',
    energySavingsRate: 0.82,
    equityMultiplier: 0.95,
    baseCostPerSqFt: 6.2,
    taxCreditRate: 0.30,
    icon: '☀️',
  },
  {
    id: 'insulation',
    name: 'Attic & Wall Super-Insulation Barrier',
    energySavingsRate: 0.22,
    equityMultiplier: 0.85,
    baseCostPerSqFt: 1.9,
    taxCreditRate: 0.20,
    icon: '🏠',
  },
  {
    id: 'hvac',
    name: 'Ductless Heat Pump & Inverter HVAC',
    energySavingsRate: 0.36,
    equityMultiplier: 0.78,
    baseCostPerSqFt: 4.5,
    taxCreditRate: 0.25,
    icon: '❄️',
  },
];

export const CalculatorFunnelDemo: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('solar');
  const [squareFootage, setSquareFootage] = useState<number>(2400);
  const [monthlyBill, setMonthlyBill] = useState<number>(320);
  const [homeValue, setHomeValue] = useState<number>(450000);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const selectedProject = PROJECT_TYPES.find((p) => p.id === selectedProjectId) || PROJECT_TYPES[0];

  // Mathematical calculations
  const monthlySavings = Math.round(monthlyBill * selectedProject.energySavingsRate);
  const annualSavings = monthlySavings * 12;
  const tenYearEnergySavings = Math.round(annualSavings * 10 * 1.04); // including 4% utility inflation

  const estimatedGrossCost = Math.round(squareFootage * selectedProject.baseCostPerSqFt);
  const estimatedTaxCredit = Math.round(estimatedGrossCost * selectedProject.taxCreditRate);
  const netEstimatedCost = Math.max(1000, estimatedGrossCost - estimatedTaxCredit);

  const homeEquityBoost = Math.round(estimatedGrossCost * selectedProject.equityMultiplier);
  const totalTenYearValue = tenYearEnergySavings + homeEquityBoost;
  const netProfit = totalTenYearValue - netEstimatedCost;
  const roiPercentage = Math.round((netProfit / netEstimatedCost) * 100);

  const handleReset = () => {
    setSelectedProjectId('solar');
    setSquareFootage(2400);
    setMonthlyBill(320);
    setHomeValue(450000);
    setIsSubmitted(false);
    setLeadForm({ name: '', phone: '', email: '' });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setIsSubmitted(true);
  };

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
            <Calculator className="w-3.5 h-3.5 text-[#00E599]" />
            demo.evergreenerhome.com/savings-calculator
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
            title="Reset Calculator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!isSubmitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive Inputs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#00E599] uppercase tracking-wider">
                  Step 1: Choose Upgrade & Adjust Specs
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Estimate Your Energy Savings & Equity Boost
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Move the sliders to see instant projections tailored to your home parameters.
                </p>
              </div>

              {/* Project Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Home Upgrade Project:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROJECT_TYPES.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setSelectedProjectId(project.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                        selectedProjectId === project.id
                          ? 'bg-[#00E599]/15 border-[#00E599] text-white shadow-md shadow-[#00E599]/10 font-bold'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <span className="text-2xl">{project.icon}</span>
                      <div className="truncate">
                        <div className="text-xs font-semibold text-white truncate">{project.name}</div>
                        <div className="text-[11px] text-slate-400">
                          Save up to {Math.round(project.energySavingsRate * 100)}% on bills
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 1: Square Footage */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-[#00E599]" />
                    Home Heated/Cooled Area:
                  </span>
                  <span className="font-bold font-mono text-sm text-white bg-black/40 px-2.5 py-1 rounded border border-white/10">
                    {squareFootage.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min="800"
                  max="5000"
                  step="100"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                  className="w-full accent-[#00E599] bg-white/20 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>800 sq ft</span>
                  <span>2,500 sq ft</span>
                  <span>5,000 sq ft</span>
                </div>
              </div>

              {/* Slider 2: Current Monthly Electric Bill */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Current Monthly Power/Utility Bill:
                  </span>
                  <span className="font-bold font-mono text-sm text-[#00E599] bg-black/40 px-2.5 py-1 rounded border border-white/10">
                    ${monthlyBill}/month
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  step="10"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full accent-[#00E599] bg-white/20 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>$100/mo</span>
                  <span>$350/mo</span>
                  <span>$800/mo</span>
                </div>
              </div>

              {/* Slider 3: Approximate Home Value */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
                    Estimated Home Market Value:
                  </span>
                  <span className="font-bold font-mono text-sm text-sky-300 bg-black/40 px-2.5 py-1 rounded border border-white/10">
                    ${homeValue.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="1200000"
                  step="25000"
                  value={homeValue}
                  onChange={(e) => setHomeValue(Number(e.target.value))}
                  className="w-full accent-[#00E599] bg-white/20 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>$200k</span>
                  <span>$600k</span>
                  <span>$1.2M+</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Dynamic Projection & Lead Gate (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {/* Dynamic Live Metric Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0e1a38] to-[#12224d] border-2 border-[#00E599]/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                    Live Calculation
                  </span>
                  <span className="text-[11px] font-bold text-[#00E599] bg-[#00E599]/15 px-2 py-0.5 rounded border border-[#00E599]/30">
                    +{roiPercentage}% 10-Yr ROI
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] text-slate-400">Monthly Utility Savings</div>
                    <div className="text-xl font-bold font-mono text-[#00E599] mt-0.5">
                      ${monthlySavings}<span className="text-xs text-slate-400 font-normal">/mo</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                    <div className="text-[11px] text-slate-400">Annual Energy Cash Savings</div>
                    <div className="text-xl font-bold font-mono text-white mt-0.5">
                      ${annualSavings.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>10-Yr Energy Savings (w/ inflation):</span>
                    <span className="font-bold text-white font-mono">${tenYearEnergySavings.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Estimated Instant Home Equity Boost:</span>
                    <span className="font-bold text-[#00E599] font-mono">+${homeEquityBoost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Estimated Federal/Utility Rebates:</span>
                    <span className="font-bold text-sky-400 font-mono">-${estimatedTaxCredit.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm font-bold">
                    <span className="text-white">Total 10-Year Net Benefit:</span>
                    <span className="text-[#00E599] font-mono text-base">+${netProfit.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Lead Capture Gate Form */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3.5">
                <div className="space-y-1">
                  <h5 className="text-sm font-bold text-white font-heading flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#00E599]" />
                    Get Your Itemized Savings Dossier
                  </h5>
                  <p className="text-xs text-slate-400">
                    Lock in today's local rebate schedule and receive your PDF estimate:
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (for SMS breakdown)"
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                  />
                  <input
                    type="email"
                    placeholder="Email (for full PDF report)"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-heading active:scale-[0.99]"
                  >
                    <span>Download Full Itemized Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                    <Lock className="w-3 h-3 text-[#00E599]" />
                    <span>Instant calculation • 100% free • No obligation</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0c142b] border border-[#00E599]/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#00E599]/20 border border-[#00E599] flex items-center justify-center text-[#00E599] mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-white">
                Itemized Dossier Generated for {leadForm.name}!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Your personalized 10-year projection for <strong>{selectedProject.name}</strong> on a {squareFootage.toLocaleString()} sq ft home has been prepared.
              </p>

              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400">Annual Savings</div>
                  <div className="text-base font-bold font-mono text-[#00E599]">${annualSavings.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400">Equity Increase</div>
                  <div className="text-base font-bold font-mono text-white">+${homeEquityBoost.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400">10-Yr Net Return</div>
                  <div className="text-base font-bold font-mono text-amber-400">+{roiPercentage}%</div>
                </div>
              </div>
            </div>

            {/* Background Data Flow Callout */}
            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-start gap-3">
              <Database className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-bold text-sky-300 uppercase tracking-wide">
                  How This Closes High-Ticket Projects:
                </div>
                <p className="leading-relaxed">
                  Instead of a cold lead asking "How much for windows/solar?", this homeowner just invested 3 minutes dialing in their exact home specs. Your sales team receives a lead with <span className="text-white font-medium">sq footage ({squareFootage}), current utility bills (${monthlyBill}), and exact target upgrade ({selectedProject.name})</span> ready to close!
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Adjust Numbers / Calculate Another Project</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

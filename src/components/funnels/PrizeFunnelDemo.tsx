import React, { useState, useEffect, useRef } from 'react';
import {
  Gift,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  Lock,
  Database,
  Flame,
  Ticket,
  Copy,
  Check,
} from 'lucide-react';

interface WheelSegment {
  label: string;
  sublabel: string;
  color: string;
  textColor: string;
  promoCode: string;
}

const SEGMENTS: WheelSegment[] = [
  {
    label: '$150 Off',
    sublabel: 'Any Major Repair',
    color: '#059669', // Emerald 600
    textColor: '#ffffff',
    promoCode: 'SPIN-150-OFF',
  },
  {
    label: 'FREE Inspection',
    sublabel: '$189 Value Audit',
    color: '#0284c7', // Sky 600
    textColor: '#ffffff',
    promoCode: 'FREE-AUDIT-189',
  },
  {
    label: '$50 Credit',
    sublabel: 'Instant Cash Voucher',
    color: '#7c3aed', // Violet 600
    textColor: '#ffffff',
    promoCode: 'CREDIT-50-SAVE',
  },
  {
    label: '15% Off',
    sublabel: 'First Service Call',
    color: '#d97706', // Amber 600
    textColor: '#ffffff',
    promoCode: 'FIRST-15-PERCENT',
  },
  {
    label: 'Free Upgrade',
    sublabel: 'High-Efficiency Part',
    color: '#0d9488', // Teal 600
    textColor: '#ffffff',
    promoCode: 'PART-UPGRADE-VIP',
  },
  {
    label: '$75 Off',
    sublabel: 'Seasonal Tune-Up',
    color: '#e11d48', // Rose 600
    textColor: '#ffffff',
    promoCode: 'TUNEUP-75-OFF',
  },
];

export const PrizeFunnelDemo: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);
  const [wonSegment, setWonSegment] = useState<WheelSegment | null>(null);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 mins in seconds
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Countdown timer for urgency
  useEffect(() => {
    if (!wonSegment || isClaimed) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [wonSegment, isClaimed]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonSegment(null);
    setIsClaimed(false);

    // Pick winning index (e.g. index 1: FREE Inspection, or 0: $150 Off)
    const prizeIndex = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length; // 60 deg each
    
    // To land on index i, pointer is at top (270 deg or 0 deg).
    // Let's spin 5 to 7 full rotations plus offset
    const extraSpins = 360 * 5;
    // Segment 0 center is at angle 30deg, segment 1 is at 90deg, etc.
    const targetAngle = 360 - (prizeIndex * segmentAngle + segmentAngle / 2);
    const finalRotation = rotationDegrees + extraSpins + (targetAngle - (rotationDegrees % 360));

    setRotationDegrees(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonSegment(SEGMENTS[prizeIndex]);
    }, 3800);
  };

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setIsClaimed(true);
  };

  const handleCopyCode = () => {
    if (!wonSegment) return;
    navigator.clipboard?.writeText(wonSegment.promoCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleReset = () => {
    setIsSpinning(false);
    setRotationDegrees(0);
    setWonSegment(null);
    setIsClaimed(false);
    setTimeLeft(900);
    setLeadForm({ name: '', phone: '', email: '' });
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
            <Gift className="w-3.5 h-3.5 text-[#00E599]" />
            demo.allstartrades.com/spin-to-win
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
            title="Reset Wheel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Wheel Canvas / SVG (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-5">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[#00E599]/30 shadow-[0_0_35px_rgba(0,229,153,0.2)] animate-pulse" />
              
              {/* Top Pointer Ticker */}
              <div className="absolute -top-3 z-30 flex flex-col items-center">
                <div className="w-6 h-7 bg-white text-[#080E21] clip-triangle shadow-xl flex items-center justify-center filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                  <div className="w-2 h-2 rounded-full bg-rose-500 -mt-2" />
                </div>
              </div>

              {/* The Spinning Wheel (SVG 6 Segments) */}
              <div
                className="w-full h-full rounded-full overflow-hidden shadow-2xl relative transition-transform duration-[3800ms] cubic-bezier"
                style={{
                  transform: `rotate(${rotationDegrees}deg)`,
                  transitionTimingFunction: 'cubic-bezier(0.15, 0.95, 0.35, 1.0)',
                }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full select-none">
                  {SEGMENTS.map((seg, idx) => {
                    const angle = 360 / SEGMENTS.length;
                    const startAngle = idx * angle;
                    const endAngle = (idx + 1) * angle;

                    // Convert polar to cartesian coordinates for SVG path
                    const startRad = ((startAngle - 90) * Math.PI) / 180;
                    const endRad = ((endAngle - 90) * Math.PI) / 180;
                    const x1 = 150 + 150 * Math.cos(startRad);
                    const y1 = 150 + 150 * Math.sin(startRad);
                    const x2 = 150 + 150 * Math.cos(endRad);
                    const y2 = 150 + 150 * Math.sin(endRad);

                    const textAngle = startAngle + angle / 2;
                    const textRad = ((textAngle - 90) * Math.PI) / 180;
                    const textX = 150 + 95 * Math.cos(textRad);
                    const textY = 150 + 95 * Math.sin(textRad);

                    return (
                      <g key={idx}>
                        <path
                          d={`M 150 150 L ${x1} ${y1} A 150 150 0 0 1 ${x2} ${y2} Z`}
                          fill={seg.color}
                          stroke="#080E21"
                          strokeWidth="2"
                        />
                        {/* Segment Text */}
                        <g transform={`rotate(${textAngle}, ${textX}, ${textY})`}>
                          <text
                            x={textX}
                            y={textY - 4}
                            fill={seg.textColor}
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                            fontFamily="system-ui, sans-serif"
                          >
                            {seg.label}
                          </text>
                          <text
                            x={textX}
                            y={textY + 9}
                            fill="rgba(255,255,255,0.85)"
                            fontSize="7.5"
                            fontWeight="500"
                            textAnchor="middle"
                            fontFamily="system-ui, sans-serif"
                          >
                            {seg.sublabel}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                  {/* Wheel Center Hub */}
                  <circle cx="150" cy="150" r="32" fill="#080E21" stroke="#00E599" strokeWidth="3" />
                </svg>
              </div>

              {/* Center Spin Button Overlay */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className={`absolute z-20 w-16 h-16 rounded-full bg-gradient-to-br from-[#00E599] to-[#059669] text-[#080E21] font-black text-xs uppercase tracking-wider font-heading flex flex-col items-center justify-center shadow-2xl transition-all cursor-pointer ${
                  isSpinning
                    ? 'opacity-80 scale-95 cursor-not-allowed'
                    : 'hover:scale-110 active:scale-95 shadow-[#00E599]/40 hover:shadow-[#00E599]/60'
                }`}
              >
                <span>{isSpinning ? '...' : 'SPIN'}</span>
                <span className="text-[9px] font-bold">WIN</span>
              </button>
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="px-6 py-2.5 rounded-xl bg-[#00E599] hover:bg-[#34D399] disabled:opacity-50 text-[#080E21] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#00E599]/25 hover:shadow-xl transition-all cursor-pointer font-heading active:scale-[0.99]"
            >
              {isSpinning ? 'Spinning Wheel...' : 'Click to Spin Prize Wheel →'}
            </button>
          </div>

          {/* Right Column: Game Status, Lead Claim Gate & Voucher (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Case A: Pre-Spin Instructions */}
            {!wonSegment && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20">
                  <Flame className="w-3.5 h-3.5" />
                  100% Guaranteed Winning Spin
                </div>

                <h4 className="text-xl font-bold font-heading text-white">
                  Spin the Wheel for an Instant Service Reward
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Give the wheel a spin to unlock your exclusive local homeowner credit. Every visitor is guaranteed a voucher valid toward any repair, inspection, or maintenance service.
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-white">Top Available Prizes:</div>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300 text-xs">
                    <li><strong className="text-[#00E599]">$150 Off</strong> Any Major Repair or System Replacement</li>
                    <li><strong className="text-sky-400">FREE 21-Point Safety Inspection</strong> ($189 retail value)</li>
                    <li><strong className="text-violet-400">$50 Instant Cash Voucher</strong> applied at checkout</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Case B: Won Prize & Lead Claim Gate */}
            {wonSegment && !isClaimed && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e1a38] to-[#12224d] border-2 border-[#00E599] shadow-2xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#00E599] text-[#080E21] uppercase tracking-wider">
                    🎉 YOU WON!
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 font-mono bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expires: {formatTimer(timeLeft)}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-black text-white font-heading">
                    {wonSegment.label} {wonSegment.sublabel}
                  </div>
                  <p className="text-xs text-slate-300">
                    Enter your name and cell number below to lock in this promotional voucher code before the 15-minute timer expires:
                  </p>
                </div>

                <form onSubmit={handleClaim} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Miller"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Cell Phone (For SMS Voucher Code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="(555) 000-0000"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="michael@example.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00E599]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#00E599]/25 hover:shadow-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer font-heading active:scale-[0.99]"
                  >
                    <span>Claim & Text Me My Voucher Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                    <Lock className="w-3 h-3 text-[#00E599]" />
                    <span>Instant coupon code issuance • Non-transferable</span>
                  </div>
                </form>
              </div>
            )}

            {/* Case C: Claimed Voucher Reveal */}
            {isClaimed && wonSegment && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-[#0c142b] border-2 border-[#00E599] space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#00E599]" />
                    <span className="text-xs font-bold text-[#00E599] uppercase tracking-wide">
                      Voucher Claimed Successfully!
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Issued to: {leadForm.name}</span>
                </div>

                {/* Digital Coupon Ticket */}
                <div className="p-4 rounded-xl bg-black/60 border border-dashed border-[#00E599]/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase">Verified Reward</div>
                      <div className="text-lg font-bold text-white font-heading">
                        {wonSegment.label} {wonSegment.sublabel}
                      </div>
                    </div>
                    <Ticket className="w-8 h-8 text-[#00E599]" />
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">OFFICIAL PROMO CODE</div>
                      <div className="text-base font-black font-mono text-[#00E599] tracking-wider">
                        {wonSegment.promoCode}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00E599]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Background CRM Callout */}
                <div className="p-3.5 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-start gap-2.5">
                  <Database className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-sky-300 uppercase tracking-wide">
                      Why Prize Funnels Convert at 40%+:
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Rather than demanding a phone number on a bland form, the prospect voluntarily traded their contact details to secure a prize they just won. The lead is instantly pushed to your CRM with their voucher code tagged!
                    </p>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset & Try Another Spin</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

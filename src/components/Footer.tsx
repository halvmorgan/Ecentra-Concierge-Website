import React, { useState } from 'react';
import { Sparkles, Globe, ArrowRight, ShieldCheck, PhoneCall, Mail, MapPin, Building, Search } from 'lucide-react';
import { ALL_INDUSTRY_PAGES } from '../data/industryPages';

interface FooterProps {
  onOpenFreeWebsite: () => void;
  onOpenBookCall: () => void;
  onOpenIndustryDirectory: () => void;
  onSelectIndustry: (id: string) => void;
  onScrollTo: (id: string) => void;
  onNavigateHome?: () => void;
  onNavigateProducts?: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onNavigateSmsOptIn?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFreeWebsite,
  onOpenBookCall,
  onOpenIndustryDirectory,
  onSelectIndustry,
  onScrollTo,
  onNavigateHome,
  onNavigateProducts,
  onNavigateAbout,
  onNavigateContact,
  onNavigatePrivacy,
  onNavigateTerms,
}) => {
  const [quickPhone, setQuickPhone] = useState('');
  const [quickBiz, setQuickBiz] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleQuickFooterClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPhone || !quickBiz) return;
    try {
      await fetch('/api/leads/website-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: quickBiz,
          phone: quickPhone,
          email: `${quickBiz.toLowerCase().replace(/[^a-z0-9]/g, '')}@lead.local`,
          industry: 'Footer Quick Capture',
          frustrations: 'Captured via footer quick bar',
        }),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    }
  };

  // Group industries by category for footer columns
  const homeTrades = ALL_INDUSTRY_PAGES.filter((i) => i.category === 'Home & Trade Services');
  const healthLegal = ALL_INDUSTRY_PAGES.filter(
    (i) => i.category === 'Health & Medical' || i.category === 'Legal & Financial'
  );
  const creativeCare = ALL_INDUSTRY_PAGES.filter(
    (i) => i.category === 'Creative & Events' || i.category === 'Care & Personal Services'
  );

  return (
    <footer id="main-footer" className="bg-[#050A18] text-slate-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer: Free Website Quick Capture Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0D152F] to-[#15224A] border border-white/15 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00E599] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" />
                <span>Foundational Starter Offer</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Claim your $0 starter website build in 10 seconds.
              </h3>
              <p className="text-xs text-slate-300">
                $0 upfront design fee + transparent $97/month cloud hosting & maintenance. High-end bespoke upgrades available anytime.
              </p>
            </div>

            <div className="lg:col-span-6">
              {!submitted ? (
                <form onSubmit={handleQuickFooterClaim} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    id="footer-input-biz"
                    type="text"
                    required
                    placeholder="Your Business Name"
                    value={quickBiz}
                    onChange={(e) => setQuickBiz(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                  />
                  <input
                    id="footer-input-phone"
                    type="tel"
                    required
                    placeholder="Direct Phone"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                  />
                  <button
                    id="footer-submit-quick-claim-btn"
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs font-heading shrink-0 transition-all cursor-pointer"
                  >
                    Claim $0 Build ($97/mo)
                  </button>
                </form>
              ) : (
                <div className="p-3 rounded-xl bg-[#00E599]/15 border border-[#00E599]/30 text-[#00E599] text-xs font-semibold">
                  ✓ Starter build reserved! Our design team will reach out with your staging preview.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 30 Dedicated Industry Landing Pages Grid */}
        <div className="pb-12 border-b border-white/10 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00E599] uppercase tracking-wider mb-1">
                <Building className="w-3.5 h-3.5" />
                <span>Dedicated Industry Landing Pages (30 Verticals)</span>
              </div>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
                Explore Custom Solutions for Your Trade
              </h4>
            </div>
            <button
              id="footer-browse-all-industries-btn"
              onClick={onOpenIndustryDirectory}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Search className="w-3.5 h-3.5 text-[#00E599]" />
              <span>Search All 30 Industries</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            {/* Column 1: Home & Trade Services */}
            <div className="space-y-3">
              <div className="font-heading font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-white/10">
                Home & Trade Services (9)
              </div>
              <ul className="space-y-2">
                {homeTrades.map((ind) => (
                  <li key={ind.id}>
                    <button
                      onClick={() => onSelectIndustry(ind.id)}
                      className="hover:text-[#00E599] transition-colors text-left flex items-center justify-between w-full group cursor-pointer"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {ind.name}
                      </span>
                      <span className="text-[10px] text-slate-500 group-hover:text-[#00E599]">
                        ~${ind.typicalJobValue}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Health, Medical & Legal */}
            <div className="space-y-3">
              <div className="font-heading font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-white/10">
                Health, Legal & Financial (12)
              </div>
              <ul className="space-y-2">
                {healthLegal.map((ind) => (
                  <li key={ind.id}>
                    <button
                      onClick={() => onSelectIndustry(ind.id)}
                      className="hover:text-[#00E599] transition-colors text-left flex items-center justify-between w-full group cursor-pointer"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {ind.name}
                      </span>
                      <span className="text-[10px] text-slate-500 group-hover:text-[#00E599]">
                        ~${ind.typicalJobValue}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Creative, Personal & Care */}
            <div className="space-y-3">
              <div className="font-heading font-bold text-white uppercase tracking-wider text-[11px] pb-1 border-b border-white/10">
                Creative, Events & Care (9)
              </div>
              <ul className="space-y-2">
                {creativeCare.map((ind) => (
                  <li key={ind.id}>
                    <button
                      onClick={() => onSelectIndustry(ind.id)}
                      className="hover:text-[#00E599] transition-colors text-left flex items-center justify-between w-full group cursor-pointer"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {ind.name}
                      </span>
                      <span className="text-[10px] text-slate-500 group-hover:text-[#00E599]">
                        ~${ind.typicalJobValue}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-sm">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00E599] to-[#059669] flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4 text-[#080E21]" />
              </div>
              <div className="font-heading text-lg font-bold text-white">
                Ecentra <span className="text-[#00E599]">Concierge</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The AI receptionist, review automator, and modern website engine engineered specifically for local home, health, trade, and professional service operators.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
                <span>6272 Saginaw Rd #1074, Grand Blanc, MI 48439</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#00E599] font-semibold">
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <a href="tel:8102020440" className="hover:underline">810-202-0440</a>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#00E599] shrink-0" />
                <a href="mailto:harold@ecentraconcierge.com" className="hover:text-[#00E599] transition-colors">harold@ecentraconcierge.com</a>
              </div>
            </div>
          </div>

          {/* Core Navigation */}
          <div className="space-y-3 text-xs">
            <ul className="space-y-2">
              <li>
                <button
                  id="footer-link-about"
                  onClick={onNavigateAbout}
                  className="hover:text-[#00E599] text-white font-semibold transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>About Us (Founder's Story)</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={onNavigateContact}
                  className="hover:text-[#00E599] text-white font-semibold transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Contact Us & Desk</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFreeWebsite}
                  className="hover:text-[#00E599] transition-colors text-left cursor-pointer"
                >
                  Free Website Offer ($0)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('quiz-section')}
                  className="hover:text-[#00E599] transition-colors text-left cursor-pointer"
                >
                  Match Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('calculator-section')}
                  className="hover:text-[#00E599] transition-colors text-left cursor-pointer"
                >
                  Missed-Lead ROI Calculator
                </button>
              </li>
              <li>
                <button
                  id="footer-link-products"
                  onClick={() => {
                    if (onNavigateProducts) {
                      onNavigateProducts();
                    } else {
                      onScrollTo('products-section');
                    }
                  }}
                  className="hover:text-[#00E599] transition-colors text-left cursor-pointer"
                >
                  AI Product Menu & Pricing
                </button>
              </li>
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={onNavigatePrivacy}
                  className="hover:text-[#00E599] text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  onClick={onNavigateTerms}
                  className="hover:text-[#00E599] text-slate-400 transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div className="space-y-3 text-xs">
            <div className="font-heading font-bold text-white uppercase tracking-wider">
              Client Guarantee
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#00E599] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>30-Day Zero-Risk Trial</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Try Ecentra Concierge answering live customer calls. If you don't book more jobs in your first month, cancel anytime with no lock-in.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Ecentra Concierge. Built for local service business operators.
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <button
              id="footer-bottom-about-btn"
              onClick={onNavigateAbout}
              className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              id="footer-bottom-contact-btn"
              onClick={onNavigateContact}
              className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              id="footer-bottom-privacy-btn"
              onClick={onNavigatePrivacy}
              className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              id="footer-bottom-terms-btn"
              onClick={onNavigateTerms}
              className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-500">Security & TCPA Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

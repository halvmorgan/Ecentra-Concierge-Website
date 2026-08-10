import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  PhoneCall,
  MessageSquareText,
  CalendarCheck,
  Star,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  TrendingUp,
  Cpu,
  Layers,
  PhoneForwarded,
  Filter,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ProductsPageProps {
  onBackToHome: () => void;
  onOpenProductDetail: (product: Product) => void;
  onOpenBookCallWithProduct: (productName: string) => void;
  onOpenFreeWebsite: () => void;
  onNavigateQuiz?: () => void;
  onNavigateCalculator?: () => void;
  onNavigateContact?: () => void;
  onNavigateSmsOptIn?: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onBackToHome,
  onOpenProductDetail,
  onOpenBookCallWithProduct,
  onOpenFreeWebsite,
  onNavigateQuiz,
  onNavigateCalculator,
  onNavigateContact,
  onNavigateSmsOptIn,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall':
        return <PhoneCall className="w-6 h-6 text-[#00E599]" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-6 h-6 text-[#00E599]" />;
      case 'Star':
        return <Star className="w-6 h-6 text-[#00E599]" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-6 h-6 text-[#00E599]" />;
      case 'Filter':
        return <Filter className="w-6 h-6 text-[#00E599]" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-6 h-6 text-[#00E599]" />;
    }
  };

  const filteredProducts = filterCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
        if (filterCategory === 'core') return p.id === 'ai-employee' || p.id === 'ai-receptionist' || p.id === 'ai-chatbot';
        if (filterCategory === 'growth') return p.id === 'review-automator' || p.id === 'interactive-funnel';
        if (filterCategory === 'messaging') return p.id === 'ai-chatbot' || p.id === 'appointment-setter';
        return true;
      });

  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Navigation Breadcrumb & Quick Shortcuts */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <button
            id="products-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center gap-4 text-xs">
            {onNavigateQuiz && (
              <button
                onClick={onNavigateQuiz}
                className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
              >
                Match Quiz
              </button>
            )}
            {onNavigateCalculator && (
              <>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <button
                  onClick={onNavigateCalculator}
                  className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer hidden sm:inline"
                >
                  ROI Calculator
                </button>
              </>
            )}
            {onNavigateContact && (
              <>
                <span className="text-slate-600">•</span>
                <button
                  onClick={onNavigateContact}
                  className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
                >
                  Contact Desk
                </button>
              </>
            )}
            {onNavigateSmsOptIn && (
              <>
                <span className="text-slate-600 hidden md:inline">•</span>
                <button
                  onClick={onNavigateSmsOptIn}
                  className="text-[#00E599] hover:underline cursor-pointer hidden md:inline"
                >
                  SMS Alerts
                </button>
              </>
            )}
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599]">
            <Sparkles className="w-4 h-4" />
            <span>Direct Pricing & Modular Catalog</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            AI-Powered Services Built for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00E599]">
              High-Ticket Local Trades
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose individual AI services or bundle our Phone & Chatbot together for maximum savings. Instant Stripe checkout, zero long-term contracts, and 48-hour trade-specific onboarding.
          </p>

          {/* Quick Value Proof Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
              <span>30-Day Zero-Risk Trial</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#00E599]" />
              <span>48-Hour Live Deployment</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-[#00E599]" />
              <span>Jobber, Housecall Pro & ServiceTitan Sync</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold shadow-lg shadow-[#00E599]/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            All 6 Services
          </button>
          <button
            onClick={() => setFilterCategory('core')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
              filterCategory === 'core'
                ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold shadow-lg shadow-[#00E599]/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            Core Offers (Phone & Chatbot)
          </button>
          <button
            onClick={() => setFilterCategory('messaging')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
              filterCategory === 'messaging'
                ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold shadow-lg shadow-[#00E599]/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            Messaging & Lead Capture
          </button>
          <button
            onClick={() => setFilterCategory('growth')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
              filterCategory === 'growth'
                ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold shadow-lg shadow-[#00E599]/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            Reputation & Funnels
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isFeatured = Boolean(product.featuredBadge);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#15224A] via-[#0D152F] to-[#080E21] border-2 border-[#00E599] shadow-2xl shadow-[#00E599]/20'
                    : 'bg-[#0D152F]/90 hover:bg-[#0D152F] border border-white/15 hover:border-white/25 shadow-xl'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00E599] text-[#080E21] text-xs font-bold font-heading shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>{product.featuredBadge}</span>
                  </div>
                )}

                <div>
                  {/* Top Header: Icon & Proof Metric */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getProductIcon(product.icon)}
                    </div>
                    {product.proofMetric && (
                      <div className="text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E599] bg-[#00E599]/10 border border-[#00E599]/25 px-2.5 py-1 rounded-full">
                          {product.proofMetric}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-[#00E599] transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-300 mt-1 min-h-[32px]">
                    {product.tagline}
                  </div>

                  {/* Pricing Box */}
                  <div className="my-4 p-3.5 rounded-2xl bg-black/20 border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Pricing</div>
                    <div className="text-base font-extrabold text-[#00E599] font-heading mt-0.5">
                      {product.startingPrice}
                    </div>
                    {product.setupFee && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Setup: <strong className="text-slate-200">{product.setupFee}</strong> • Monthly: <strong className="text-slate-200">{product.monthlyFee}</strong>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Ideal For */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 mb-5">
                    <strong className="text-white block mb-0.5">Best For:</strong>
                    {product.whoItsFor}
                  </div>

                  {/* 4 Key Features Checklist */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    {product.keyFeatures.slice(0, 4).map((feature, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {/* Direct Stripe Buy Button */}
                  {product.checkoutUrl ? (
                    <a
                      id={`products-page-checkout-${product.id}`}
                      href={product.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading group"
                    >
                      <span>Get Started Now</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  ) : (
                    <button
                      id={`products-page-bundle-cta-${product.id}`}
                      onClick={() => onOpenBookCallWithProduct(product.name)}
                      className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                    >
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Get Bundle Package ($897 + $399/mo)</span>
                    </button>
                  )}

                  {/* Secondary: Book Call */}
                  <button
                    id={`products-page-book-call-${product.id}`}
                    onClick={() => onOpenBookCallWithProduct(product.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#00E599]" />
                    <span>Book 15-Min Strategy Call</span>
                  </button>

                  {/* Tertiary: View Detail Breakdown */}
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="w-full py-1.5 text-center text-slate-400 hover:text-white text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Full Feature Breakdown</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3-Step Simple Onboarding Flow */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D152F] to-[#15224A] border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00E599] uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Turnkey 48-Hour Implementation</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              How Deployment Works for Your Business
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              No technical expertise needed. Our concierge engineering team handles setup, prompt training, and dispatch rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/15 text-[#00E599] font-bold font-heading text-base flex items-center justify-center border border-[#00E599]/30">
                01
              </div>
              <h3 className="font-heading font-bold text-white text-base">Select Your Package</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Order directly via secure Stripe checkout or schedule a brief strategy call to tailor custom trade parameters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/15 text-[#00E599] font-bold font-heading text-base flex items-center justify-center border border-[#00E599]/30">
                02
              </div>
              <h3 className="font-heading font-bold text-white text-base">Trade & Voice Training</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We configure your AI receptionist with your pricing rules, service areas, diagnostic fees, and calendar booking link.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00E599]/15 text-[#00E599] font-bold font-heading text-base flex items-center justify-center border border-[#00E599]/30">
                03
              </div>
              <h3 className="font-heading font-bold text-white text-base">Go Live & Capture Leads</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Turn on live call forwarding or embed your smart chatbot widget. Start capturing 100% of missed calls and web visitors 24/7.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#00E599]/15 via-white/[0.04] to-transparent border border-[#00E599]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Need Help Choosing the Best Fit for Your Trade?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Talk directly with our founder and implementation team. We'll analyze your current call volume and calculate your exact ROI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBookCallWithProduct('General Strategy Call')}
              className="px-6 py-3.5 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-lg shadow-[#00E599]/25 transition-all cursor-pointer font-heading flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Strategy Call</span>
            </button>
            <button
              onClick={onOpenFreeWebsite}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 transition-all cursor-pointer"
            >
              <span>Claim $0 AI-Ready Website</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

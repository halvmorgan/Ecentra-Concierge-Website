import React, { useState } from 'react';
import {
  Globe,
  PhoneCall,
  MessageSquareText,
  Star,
  CalendarCheck,
  Filter,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Shield,
  CreditCard,
  ExternalLink,
  Tag,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ProductGridSectionProps {
  onOpenProductDetail: (product: Product) => void;
  onOpenBookCallWithProduct: (productName: string) => void;
  onOpenFreeWebsite: () => void;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  onOpenProductDetail,
  onOpenBookCallWithProduct,
  onOpenFreeWebsite,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#00E599]" />;
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
    <section id="products-section" className="py-24 relative bg-[#080E21]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Pricing & Modular Catalog</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            AI-Powered Services Built for Local Trades
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Choose your individual service or bundle Phone & Web Chatbot together for maximum savings. Instant Stripe checkout and transparent onboarding.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              All 6 Services
            </button>
            <button
              onClick={() => setFilterCategory('core')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filterCategory === 'core'
                  ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Core Offers (Phone & Chatbot)
            </button>
            <button
              onClick={() => setFilterCategory('messaging')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filterCategory === 'messaging'
                  ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Web Chat & SMS Setter
            </button>
            <button
              onClick={() => setFilterCategory('growth')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filterCategory === 'growth'
                  ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Google Reviews & Funnels
            </button>
          </div>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isFeatured = Boolean(product.featuredBadge);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative ${
                  isFeatured
                    ? 'bg-gradient-to-b from-[#15224A] to-[#0D152F] border-2 border-[#00E599] shadow-xl shadow-[#00E599]/10'
                    : 'glass-panel border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Badge if featured */}
                {product.featuredBadge && (
                  <div className="absolute -top-3 right-6 bg-[#00E599] text-[#080E21] text-[11px] font-extrabold px-3 py-0.5 rounded-full tracking-wider uppercase shadow-md">
                    {product.featuredBadge}
                  </div>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {getProductIcon(product.icon)}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white leading-tight">
                        {product.name}
                      </h3>
                      <div className="text-xs text-[#00E599] font-bold mt-0.5 flex items-center gap-1">
                        <Tag className="w-3 h-3 shrink-0" />
                        <span>{product.startingPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-2">
                    {product.tagline}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Who it's for */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 mb-4">
                    <span className="text-slate-400 font-bold block mb-0.5">Best For:</span>
                    {product.whoItsFor}
                  </div>

                  {/* Proof Point Pill */}
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-[#00E599] bg-[#00E599]/10 px-3 py-1.5 rounded-lg border border-[#00E599]/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{product.proofPoint}</span>
                  </div>

                  {/* Feature Highlights List */}
                  <div className="space-y-2 mb-4">
                    {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {/* Direct Stripe Buy Button */}
                  {product.checkoutUrl ? (
                    <a
                      id={`product-checkout-${product.id}`}
                      href={product.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading group"
                    >
                      <CreditCard className="w-4 h-4 shrink-0" />
                      <span>Get Started Now</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  ) : (
                    <button
                      id={`product-cta-${product.id}`}
                      onClick={() => onOpenBookCallWithProduct(product.name)}
                      className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                    >
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Get Bundle Package ($897 + $399/mo)</span>
                    </button>
                  )}

                  {/* Secondary: Book Call */}
                  <button
                    id={`product-book-call-${product.id}`}
                    onClick={() => onOpenBookCallWithProduct(product.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Questions? Book Strategy Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Tertiary: View Detail */}
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="w-full py-1 text-center text-xs font-medium text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
                  >
                    View All Features & Scope →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Policy Reminder Notice */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400">
          <span className="text-white font-semibold">Our Transparent Pricing Guarantee:</span> Secure Stripe checkout with zero long-term lock-in. Direct concierge onboarding and trade prompt configuration included with every setup.
        </div>
      </div>
    </section>
  );
};


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
        if (filterCategory === 'core') return p.id === 'free-website' || p.id === 'ai-receptionist' || p.id === 'ai-employee';
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
            <span>Modular Growth Catalog</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            AI-Powered Services Built for Local Trades
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            Start with our $0 free website build or plug in 24/7 AI answering to stop losing after-hours leads.
            Every tool is designed to pay for itself within 30 days.
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
              All 7 Products
            </button>
            <button
              onClick={() => setFilterCategory('core')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filterCategory === 'core'
                  ? 'bg-[#00E599] text-[#080E21] border-[#00E599] font-bold'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Core Offers (Free Site & Phone)
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

        {/* 7 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isFeatured = Boolean(product.featuredBadge);
            const isLeadMagnet = product.id === 'free-website';
            const isAllInOne = product.id === 'ai-employee';

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
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {getProductIcon(product.icon)}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white leading-tight">
                        {product.name}
                      </h3>
                      <div className="text-xs text-[#00E599] font-semibold mt-0.5">
                        {product.startingPrice}
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
                  <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-[#00E599] bg-[#00E599]/10 px-3 py-1.5 rounded-lg border border-[#00E599]/20">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{product.proofPoint}</span>
                  </div>

                  {/* Feature Highlights List */}
                  <div className="space-y-2 mb-6">
                    {product.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {isLeadMagnet ? (
                    <button
                      id={`product-cta-${product.id}`}
                      onClick={onOpenFreeWebsite}
                      className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                    >
                      <span>Claim $0 Build ($97/mo Hosting)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      id={`product-cta-${product.id}`}
                      onClick={() => onOpenBookCallWithProduct(product.name)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Strategy Call</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="w-full py-1.5 text-center text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
                  >
                    View All Features & Proof →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Policy Reminder Notice */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400">
          <span className="text-white font-semibold">Our Transparent Pricing Promise:</span> We never lock you into bloated SaaS contracts or charge hidden setup fees. All exact custom configurations and vertical volume discounts are transparently finalized during your 15-minute onboarding call.
        </div>
      </div>
    </section>
  );
};

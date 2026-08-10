import React from 'react';
import { X, CheckCircle2, ArrowRight, Sparkles, Shield, Star, PhoneCall, Globe, Calendar } from 'lucide-react';
import { Product } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBookCallWithProduct: (productName: string) => void;
  onOpenFreeWebsite: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenBookCallWithProduct,
  onOpenFreeWebsite,
}) => {
  if (!isOpen || !product) return null;

  const isFreeWebsite = product.id === 'free-website';

  return (
    <div
      id="product-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0D152F] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-detail-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00E599]/15 text-[#00E599] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Deep-Dive</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            {product.name}
          </h3>
          <div className="text-xs font-bold text-[#00E599] uppercase tracking-wide mt-1">
            {product.tagline}
          </div>
          <div className="text-sm font-semibold text-slate-300 mt-2">
            Pricing Guide: <span className="text-[#00E599] font-bold">{product.startingPrice}</span>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-sm text-slate-200 leading-relaxed mb-6">
          {product.description}
        </div>

        {/* Free Website Specific Breakdown Box */}
        {isFreeWebsite && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00E599]/10 to-transparent border border-[#00E599]/30 text-xs text-slate-200 mb-6 space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span className="text-[#00E599] uppercase tracking-wider text-[11px]">Pricing & Architecture Breakdown:</span>
              <span className="bg-[#00E599]/20 px-2 py-0.5 rounded text-[11px] text-[#00E599]">$0 Build • $97/mo Cloud Care</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong>Foundational Starter Build:</strong> Includes manual layout setup, click-to-call buttons, mobile speed under 1s, and local Google schema. Cloud hosting, SSL security, and backups are $97/month.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              <strong>Higher-End Custom Upgrades:</strong> If you need custom multi-page funnels, bespoke animations, or complex customer portals in the future, our High-End Bespoke tier is available whenever you are ready to upgrade.
            </p>
          </div>
        )}

        {/* Best For Box */}
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 mb-6">
          <span className="font-bold text-white block mb-0.5">Ideal Business Profile:</span>
          {product.whoItsFor}
        </div>

        {/* Proof Point Banner */}
        <div className="p-4 rounded-2xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center gap-3 text-xs sm:text-sm font-semibold text-white mb-6">
          <div className="p-2 rounded-xl bg-[#00E599]/20 text-[#00E599] shrink-0">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-[11px] text-[#00E599] uppercase font-bold">Documented Outcome:</div>
            <div>{product.proofPoint}</div>
          </div>
        </div>

        {/* Full Feature Checklist */}
        <div className="space-y-3 mb-8">
          <div className="text-xs uppercase font-bold text-slate-400">
            Complete Feature Capabilities:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2 text-xs text-slate-300"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Custom setup & dispatch integration included
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isFreeWebsite ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenFreeWebsite();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <span>Claim Free Build ($0)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenBookCallWithProduct(product.name);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 15-Min Strategy Call</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

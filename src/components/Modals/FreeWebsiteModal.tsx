import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, Sparkles, Bot } from 'lucide-react';
import { FreeWebsiteFormData } from '../../types';

interface FreeWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const FreeWebsiteModal: React.FC<FreeWebsiteModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<FreeWebsiteFormData>({
    businessName: '',
    industry: 'HVAC & Heating / Cooling',
    ownerName: '',
    phone: '',
    email: '',
    currentWebsite: '',
    frustrations: '',
    primaryGoal: 'Generate more inbound phone calls & quotes',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leadCode, setLeadCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phone || !formData.email) {
      setErrorMsg('Please provide your business name, direct phone, and email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/.netlify/functions/submit-starter-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setLeadCode(data.leadId);
        onSuccess(data);
      } else {
        setErrorMsg(data.error || 'Failed to submit.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="free-website-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0D152F] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-free-website-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00E599] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Foundational Starter Offer • AI Search Ready</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Claim Your $0 Foundational Website Build
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-4 leading-relaxed">
              We handcraft a clean, speed-optimized starter website ($0 build fee) paired with our <strong>$97/month cloud hosting & maintenance plan</strong>—fully structured and optimized to capture search traffic from <strong>ChatGPT, Claude, Gemini, Perplexity, and Google</strong>.
            </p>

            {/* Scope disclosure pill */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-[#00E599]/30 mb-5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-300">
                <strong>Build Fee:</strong> <span className="text-[#00E599] font-bold">$0 Upfront</span>
              </span>
              <span className="text-[#00E599] font-semibold flex items-center gap-1">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Search Schema Included</span>
              </span>
              <span className="text-slate-300">
                <strong>Cloud Hosting & Care:</strong> <span className="text-white font-bold">$97/mo</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Heating & Cooling"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({ ...formData, businessName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Industry / Vertical *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                  >
                    <option value="HVAC & Heating / Cooling">HVAC & Climate</option>
                    <option value="Plumbing & Drain Cleaning">Plumbing Services</option>
                    <option value="Chiropractic & Wellness">Chiropractic Clinic</option>
                    <option value="Tattoo & Piercing Studio">Tattoo Studio</option>
                    <option value="Med Spas & Aesthetics">Med Spa & Aesthetics</option>
                    <option value="Roofing & Remodeling">Roofing & Remodeling</option>
                    <option value="Electrical Services">Electrical Contractor</option>
                    <option value="Auto Detailing">Auto Detailing</option>
                    <option value="Other Service Trade">Other Service Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marcus Vance"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="owner@yourcompany.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current Website URL (or leave blank if none)
                </label>
                <input
                  type="text"
                  placeholder="e.g. www.apexair.com"
                  value={formData.currentWebsite}
                  onChange={(e) =>
                    setFormData({ ...formData, currentWebsite: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-xl shadow-lg font-heading text-base transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Reserving Your Starter Build...</span>
                ) : (
                  <>
                    <span>Claim $0 Starter Build ($97/mo Hosting)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" /> $0 Upfront Build
              </span>
              <span className="flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-[#00E599]" /> AI Search Indexed
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00E599]" /> 2–3 Days
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#00E599]" /> $97/mo Care
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-[#00E599]/20 border border-[#00E599] text-[#00E599] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white">
              Application Confirmed!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your $0 starter build with AI Search schema is in the queue for <strong className="text-white">{formData.businessName}</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-left text-xs space-y-1.5 max-w-xs mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono font-bold text-[#00E599]">{leadCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Build Fee:</span>
                <span className="font-bold text-[#00E599]">$0 Upfront</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">AI Search Ready:</span>
                <span className="font-bold text-[#00E599]">ChatGPT, Claude & Gemini</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hosting & Care:</span>
                <span className="text-white font-semibold">$97/mo (SSL & Cloud)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery:</span>
                <span className="text-white font-semibold">2 business days</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#00E599] text-[#080E21] font-bold text-xs font-heading cursor-pointer"
            >
              Done / Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

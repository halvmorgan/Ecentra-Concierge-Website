import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Sparkles,
  Smartphone,
  Search,
  Lock,
  Bot,
  Cpu,
} from 'lucide-react';
import { FreeWebsiteFormData } from '../types';

interface FreeWebsiteSectionProps {
  onSuccessClaim: (data: any) => void;
  onOpenBookCall: () => void;
}

export const FreeWebsiteSection: React.FC<FreeWebsiteSectionProps> = ({
  onSuccessClaim,
  onOpenBookCall,
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phone || !formData.email) {
      setErrorMsg('Please provide your business name, direct phone number, and email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads/website-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
        setConfirmationData(data);
        onSuccessClaim(data);
      } else {
        setErrorMsg(data.error || 'Failed to submit. Please check your information.');
      }
    } catch (err) {
      setErrorMsg('Network error submitting your claim. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="free-website-section" className="py-24 relative bg-[#080E21]">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00E599]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Zero-Risk Foundational Offer • AI Search Ready</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Claim Your $0 Foundational Website Build
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-300">
            We build you a clean, speed-optimized starter website with <strong className="text-white">$0 upfront design fees</strong>, transparent <strong className="text-[#00E599]">$97/mo cloud hosting</strong>, and <strong className="text-white">built-in optimization for AI Search Engines</strong> like ChatGPT, Claude, Gemini & Google.
          </p>
        </div>

        {/* Highlight Banner: AI Search Engine Optimization (GEO) */}
        <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#00E599]/15 via-[#0D152F] to-[#15224A] border-2 border-[#00E599]/40 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/20 text-[#00E599] text-xs font-bold font-heading">
                <Bot className="w-4 h-4" />
                <span>Next-Gen AI Search Optimization Included (GEO)</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                Optimized to Win Search Traffic from ChatGPT, Claude, Gemini & Perplexity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When local customers ask AI assistants <em>"Who is the most reliable plumber near me?"</em> or <em>"Best rated HVAC technician in town"</em>, your website needs structured entity data to be cited and recommended. Every $0 starter site includes rich JSON-LD schema, verified trade citations, and AI-search-readable architecture out of the box.
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col gap-2 shrink-0 text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                <span>ChatGPT & SearchGPT Indexed</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Google Gemini & AI Overviews</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                <span>Claude & Perplexity Schema</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Why $0, Hosting Details & Future Upgrade Path */}
          <div className="lg:col-span-6 space-y-6">
            {/* The "Why Is It Free?" Transparency Box */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-[#00E599]/10 text-[#00E599]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Why do we build your starter site for $0?
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional agencies demand $3,000 to $5,000 upfront just to design a basic local website.
                <strong className="text-white"> We do the exact opposite:</strong> We eliminate the expensive upfront build cost to give your business an immediate, professional web foundation that turns search traffic into direct phone calls.
                <span className="block mt-2 text-slate-300">
                  Our goal is to earn your long-term trust so you choose our 24/7 AI Receptionist, Chatbot, and growth tools as you expand.
                </span>
              </p>
            </div>

            {/* Scope Clarity & Future Higher-End Upgrade Path */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0D152F] to-[#15224A] border border-white/15 space-y-4">
              <div className="flex items-center gap-2.5 text-sm font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#00E599]" />
                <span>Foundational Build vs. Higher-End Custom Upgrade</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-[#00E599]/30 space-y-1.5">
                  <div className="font-bold text-[#00E599] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Included for $0 ($97/mo host):</span>
                  </div>
                  <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                    <li><strong>AI Search Optimization:</strong> ChatGPT, Gemini & Claude</li>
                    <li>Clean, high-speed starter layout</li>
                    <li>Instant click-to-call phone buttons</li>
                    <li>Google Maps local SEO schema & entity data</li>
                    <li>Mobile responsive & sub-1s load speed</li>
                    <li>Enterprise cloud hosting & SSL</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Website Upgrade ($400 + $100/mo):</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed mt-1">
                      For businesses wanting a full custom design overhaul, bespoke trade branding, advanced gallery pages, and managed hosting: Starts at $400 setup and $100/month.
                    </p>
                  </div>
                  <a
                    href="https://buy.stripe.com/28E7sM5Xjezz2gtcJC3VC07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00E599] hover:text-[#34D399] pt-1"
                  >
                    <span>Direct Stripe Checkout ($400 + $100/mo) →</span>
                  </a>
                </div>
              </div>
            </div>

            {/* $97/Month Hosting & Maintenance Disclosure */}
            <div className="p-5 rounded-2xl bg-[#00E599]/5 border border-[#00E599]/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E599]">
                  Transparent Hosting & Care Plan
                </span>
                <span className="text-xs font-extrabold text-white bg-[#00E599]/20 px-2.5 py-0.5 rounded-md border border-[#00E599]/40">
                  $97 / month
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Your free website includes zero upfront design charges. To keep your site blazing fast, secure, and always live, it is paired with our <strong>$97/month cloud hosting & maintenance plan</strong>—including enterprise Google Cloud servers, SSL encryption, daily automated backups, AI search index updates, and ongoing security patches.
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="text-xs uppercase font-bold text-slate-400">
                Simple 3-Step Launch Process:
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-6 h-6 rounded-full bg-[#00E599]/20 text-[#00E599] font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>Submit your business info, services & trade specialties (60 sec)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-6 h-6 rounded-full bg-[#00E599]/20 text-[#00E599] font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Our team builds your high-speed site with AI Search schema (2–3 business days)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="w-6 h-6 rounded-full bg-[#00E599]/20 text-[#00E599] font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>We launch on secure cloud hosting with zero long-term contracts</span>
              </div>
            </div>
          </div>

          {/* Right Column: The Full Application Form or Confirmation Screen */}
          <div className="lg:col-span-6">
            {!isSubmitted ? (
              <div className="glass-panel rounded-3xl p-6 sm:p-9 border-2 border-[#00E599]/40 shadow-2xl shadow-black/80 relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Free Website Application
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      $0 Upfront Build • $97/mo Cloud Hosting & Maintenance
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Build Fee</div>
                    <span className="text-xs font-bold text-[#00E599] bg-[#00E599]/10 px-2.5 py-1 rounded-lg border border-[#00E599]/30">
                      $0 Upfront
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Business Name *
                      </label>
                      <input
                        id="form-site-business"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({ ...formData, businessName: e.target.value })
                        }
                        placeholder="e.g. Apex Heating & Air"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Owner / Contact Name
                      </label>
                      <input
                        id="form-site-owner"
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) =>
                          setFormData({ ...formData, ownerName: e.target.value })
                        }
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Industry / Vertical *
                      </label>
                      <select
                        id="form-site-industry"
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white text-sm focus:outline-none focus:border-[#00E599]"
                      >
                        <option value="HVAC & Heating / Cooling">HVAC & Climate</option>
                        <option value="Plumbing & Drain Cleaning">Plumbing Services</option>
                        <option value="Chiropractic & Wellness">Chiropractic Clinic</option>
                        <option value="Tattoo & Piercing Studios">Tattoo Studio</option>
                        <option value="Med Spas & Aesthetics">Med Spa & Aesthetics</option>
                        <option value="Roofing & Siding">Roofing Contractor</option>
                        <option value="Electrical Contractors">Electrical Services</option>
                        <option value="Auto Detailing & Ceramic">Auto Detailing</option>
                        <option value="Landscaping & Tree Care">Landscaping / Tree</option>
                        <option value="Other Local Trade">Other Local Service</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Current Website URL (If any)
                      </label>
                      <input
                        id="form-site-url"
                        type="text"
                        value={formData.currentWebsite}
                        onChange={(e) =>
                          setFormData({ ...formData, currentWebsite: e.target.value })
                        }
                        placeholder="e.g. www.apexair.com (or leave blank)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Direct Phone (for verification & build link) *
                      </label>
                      <input
                        id="form-site-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Email Address (where we send your staging site) *
                      </label>
                      <input
                        id="form-site-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="owner@yourcompany.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      What is most frustrating about your current website or online presence?
                    </label>
                    <textarea
                      id="form-site-frustrations"
                      rows={2}
                      value={formData.frustrations}
                      onChange={(e) =>
                        setFormData({ ...formData, frustrations: e.target.value })
                      }
                      placeholder="e.g. It looks outdated, hard to edit on phone, doesn't generate calls, or we only have a Facebook page..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00E599]"
                    />
                  </div>

                  <button
                    id="form-submit-free-site-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-extrabold font-heading text-base shadow-lg shadow-[#00E599]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>Queueing Your Foundational Build...</span>
                    ) : (
                      <>
                        <span>Claim $0 Starter Build ($97/mo Hosting)</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" /> $0 Upfront build
                  </span>
                  <span className="flex items-center gap-1">
                    <Bot className="w-3.5 h-3.5 text-[#00E599]" /> AI Search Optimized (ChatGPT, Gemini, Claude)
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00E599]" /> 2–3 day turnaround
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E599]" /> $97/mo cloud care
                  </span>
                </div>
              </div>
            ) : (
              /* CONFIRMATION STATE */
              <div
                id="site-claim-confirmation"
                className="glass-panel rounded-3xl p-8 sm:p-10 border-2 border-[#00E599] shadow-2xl text-center space-y-6 animate-fadeIn"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#00E599]/20 border border-[#00E599] text-[#00E599] flex items-center justify-center mx-auto shadow-lg shadow-[#00E599]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00E599] bg-[#00E599]/10 px-3 py-1 rounded-full border border-[#00E599]/30">
                    Application Confirmed
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-3">
                    We’ve Received Your $0 Starter Website Request!
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                    Our trade design team is setting up the foundational build and AI Search schema (ChatGPT, Gemini, Claude) for{' '}
                    <strong className="text-white">{formData.businessName}</strong> ({formData.industry}).
                  </p>
                </div>

                {/* Reference Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Claim Reference ID:</span>
                    <span className="font-mono font-bold text-[#00E599]">
                      {confirmationData?.leadId || 'EC-SITE-948201'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Build Cost:</span>
                    <span className="font-bold text-[#00E599]">$0 Upfront</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AI Search Readiness:</span>
                    <span className="font-bold text-[#00E599]">ChatGPT, Claude, Gemini & Schema Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hosting & Care Plan:</span>
                    <span className="font-bold text-white">$97/mo (Includes SSL & Cloud CDN)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Delivery:</span>
                    <span className="font-bold text-white">Within 2 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preview Notification To:</span>
                    <span className="font-bold text-white">{formData.email}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="confirmed-book-strategy-btn"
                    onClick={onOpenBookCall}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                  >
                    <span>Jump to Front of Line (Book 15-Min Kick-Off)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Submit Another Business
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

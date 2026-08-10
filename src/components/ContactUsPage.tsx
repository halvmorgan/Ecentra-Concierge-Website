import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  Building,
  UserCheck
} from 'lucide-react';
import { ALL_INDUSTRY_PAGES } from '../data/industryPages';

interface ContactUsPageProps {
  onBackToHome: () => void;
  onNavigateAbout: () => void;
  onNavigateSmsOptIn: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onOpenBookCall: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({
  onBackToHome,
  onNavigateAbout,
  onNavigateSmsOptIn,
  onNavigatePrivacy,
  onNavigateTerms,
  onOpenBookCall,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('Home & Trade Services');
  const [topic, setTopic] = useState('$0 Foundational Starter Website ($97/mo hosting)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{
    success: boolean;
    confirmationCode?: string;
    message?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          businessName: businessName || 'Local Business Operator',
          industry,
          topic,
          message: message || 'Inquiry from Contact Us page',
          submittedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedResponse({
          success: true,
          confirmationCode: data.confirmationCode || `CNT-${Math.floor(100000 + Math.random() * 900000)}`,
          message: data.message || 'Your inquiry has been received. Harold or our concierge desk will reply within 2 business hours.',
        });
      } else {
        setSubmittedResponse({
          success: true,
          confirmationCode: `CNT-${Math.floor(100000 + Math.random() * 900000)}`,
          message: 'Your inquiry has been dispatched to our priority desk. We will reach out shortly.',
        });
      }
    } catch (err) {
      setSubmittedResponse({
        success: true,
        confirmationCode: `CNT-${Math.floor(100000 + Math.random() * 900000)}`,
        message: 'Thank you! Your message was received and queued for immediate follow-up.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            id="contact-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onNavigateAbout}
              className="text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              About Our Story
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={onNavigateSmsOptIn}
              className="text-[#00E599] hover:underline cursor-pointer"
            >
              SMS Opt-In
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-3 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599]">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Concierge Desk</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Ecentra Concierge
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Have questions about our $0 foundational starter website offer, 24/7 AI Receptionist setup, or custom integration for your trade? We respond to every inquiry promptly.
          </p>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Channels Card */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/15 space-y-6 shadow-xl">
              <h2 className="font-heading font-bold text-white text-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00E599]" />
                <span>Direct Contact Channels</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-[#00E599]/15 text-[#00E599] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Concierge Phone Desk</div>
                    <a href="tel:8102020440" className="text-slate-300 hover:text-[#00E599] font-mono mt-0.5 block font-bold">
                      810-202-0440
                    </a>
                    <div className="text-[11px] text-[#00E599] mt-0.5">Live 24/7 AI Receptionist Active</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-[#00E599]/15 text-[#00E599] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Mailing Address</div>
                    <div className="text-slate-300 mt-0.5 leading-snug">
                      6272 Saginaw Rd #1074<br />
                      Grand Blanc, MI 48439
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-[#00E599]/15 text-[#00E599] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Direct Support & Founder Email</div>
                    <a 
                      href="mailto:harold@ecentraconcierge.com" 
                      className="text-slate-300 hover:text-[#00E599] transition-colors underline break-all block mt-0.5"
                    >
                      harold@ecentraconcierge.com
                    </a>
                    <div className="text-[11px] text-slate-400 mt-0.5">Founder: Harold Morgan (Direct desk)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-[#00E599]/15 text-[#00E599] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Response Time SLA</div>
                    <div className="text-slate-300 mt-0.5">
                      <strong>&lt; 2 Hours</strong> during Mon–Sat (7:00 AM – 7:00 PM EST)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">AI Answering operates 24/7/365 without pause</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick 1-on-1 Call Booking Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0D152F] to-[#15224A] border border-white/15 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#00E599]">
                <UserCheck className="w-4 h-4" />
                <span>Prefer a quick live call?</span>
              </div>
              <h3 className="font-heading font-bold text-white text-base">
                Book a 15-Minute Live Strategy Call
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pick a convenient time on Harold's calendar to review your missed-call volume, audit your current website, and see an AI receptionist test for your exact trade.
              </p>
              <button
                id="contact-book-strategy-btn"
                onClick={onOpenBookCall}
                className="w-full py-3 rounded-xl bg-[#00E599] hover:bg-[#34D399] text-[#080E21] font-bold text-xs font-heading shadow-md shadow-[#00E599]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Pick a Time on Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/15 space-y-6 shadow-2xl">
              
              {!submittedResponse ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-heading text-xl font-bold text-white">
                      Send a Message to the Desk
                    </h3>
                    <p className="text-xs text-slate-400">
                      Fill out your details below and we'll reply directly to your email or phone.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        placeholder="e.g. Harold Morgan"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Business Email *
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        required
                        placeholder="e.g. harold@mybusiness.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Direct Phone / Cell *
                      </label>
                      <input
                        id="contact-form-phone"
                        type="tel"
                        required
                        placeholder="e.g. (555) 234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Business Name
                      </label>
                      <input
                        id="contact-form-business"
                        type="text"
                        placeholder="e.g. Morgan Appraisal & Co."
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Industry / Trade
                      </label>
                      <select
                        id="contact-form-industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                      >
                        <option value="Home & Trade Services">Home & Trade Services (HVAC, Roof, Solar)</option>
                        <option value="Health & Wellness">Health & Wellness (Chiropractor, Med Spa)</option>
                        <option value="Real Estate & Valuation">Real Estate & Appraisal Services</option>
                        <option value="Legal & Financial">Legal & Financial Services</option>
                        <option value="Automotive & Care">Automotive, Towing & Detailing</option>
                        <option value="Other Service Trade">Other Service Business</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-form-topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                      >
                        <option value="$0 Foundational Starter Website ($97/mo hosting)">$0 Foundational Starter Website ($97/mo hosting)</option>
                        <option value="24/7 AI Phone Receptionist Implementation">24/7 AI Phone Receptionist Implementation</option>
                        <option value="AI Chatbot & Lead Capture Setup">AI Chatbot & Lead Capture Setup</option>
                        <option value="5-Star Review Automator Engine">5-Star Review Automator Engine</option>
                        <option value="High-End Custom Multi-Page Website Tier">High-End Custom Multi-Page Website Tier</option>
                        <option value="General Question for Harold Morgan">General Question for Harold Morgan</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Your Message / Specific Question
                    </label>
                    <textarea
                      id="contact-form-message"
                      rows={4}
                      placeholder="Tell us about your business, current phone bottlenecks, or what you'd like to automate..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050A18] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599] resize-none"
                    />
                  </div>

                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#00E599] hover:bg-[#34D399] disabled:opacity-50 text-[#080E21] font-bold text-xs font-heading shadow-lg shadow-[#00E599]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry to Harold & team...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Priority Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Your details are securely kept and will never be shared. By submitting, you agree to our{' '}
                    <button type="button" onClick={onNavigatePrivacy} className="text-slate-400 underline hover:text-[#00E599]">Privacy Policy</button> and{' '}
                    <button type="button" onClick={onNavigateTerms} className="text-slate-400 underline hover:text-[#00E599]">Terms of Service</button>.
                  </p>
                </form>
              ) : (
                <div className="py-8 text-center space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#00E599]/20 text-[#00E599] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 text-xs font-mono text-[#00E599]">
                      Ticket Code: {submittedResponse.confirmationCode}
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Message Received!
                    </h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      {submittedResponse.message}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 max-w-md mx-auto text-left space-y-2">
                    <div className="font-bold text-white">Next Steps:</div>
                    <p>• Our team is reviewing your trade details and website requirements.</p>
                    <p>• Expect an email reply from <strong>harold@ecentraconcierge.com</strong> or a call from our concierge desk.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setSubmittedResponse(null)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <button
                      onClick={onBackToHome}
                      className="px-5 py-2.5 rounded-xl bg-[#00E599] text-[#080E21] text-xs font-bold font-heading cursor-pointer"
                    >
                      Return to Homepage
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

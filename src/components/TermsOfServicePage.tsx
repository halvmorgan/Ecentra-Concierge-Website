import React from 'react';
import { 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle,
  Building,
  Sparkles
} from 'lucide-react';

interface TermsOfServicePageProps {
  onBackToHome: () => void;
  onNavigatePrivacy: () => void;
  onNavigateSmsOptIn: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({
  onBackToHome,
  onNavigatePrivacy,
  onNavigateSmsOptIn,
}) => {
  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            id="terms-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigatePrivacy}
              className="text-xs text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={onNavigateSmsOptIn}
              className="text-xs text-[#00E599] hover:underline cursor-pointer"
            >
              SMS Opt-In
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599]">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-400">
            Effective Date: January 1, 2026 • Last Updated: August 2026
          </p>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            Please read these Terms of Service ("Terms") carefully before using the website, AI concierge software, or website design services provided by <strong>Ecentra Concierge</strong> ("Ecentra", "we", "us", or "our"). By accessing or utilizing any part of our service, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">1</span>
              <span>Services Overview</span>
            </h2>
            <p>
              Ecentra Concierge provides local business automation software, telephone AI receptionists, smart chat widgets, review generation software, and web development solutions designed specifically for home service contractors, trade operators, medical/wellness practices, and professional service firms.
            </p>
          </div>

          {/* Section 2: Website Builds & Hosting Terms */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">2</span>
              <span>Foundational Website Build & Cloud Hosting Terms</span>
            </h2>
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/15 space-y-3 text-xs">
              <p>
                • <strong className="text-white">$0 Upfront Build Offer:</strong> For qualified local business operators, Ecentra Concierge provides a handcrafted, conversion-optimized foundational starter website at $0 upfront design fee (a $2,500 manual build value).
              </p>
              <p>
                • <strong className="text-white">Hosting & Maintenance Package ($97/mo):</strong> To ensure your website remains live, secure, lightning-fast, and monitored 24/7, all foundational website builds are hosted on our enterprise cloud server infrastructure paired with our mandatory <strong>$97/month cloud hosting, SSL encryption, daily backup, and speed maintenance plan</strong>.
              </p>
              <p>
                • <strong className="text-white">Scope & Upgrade Path:</strong> The foundational build is a clean, single-view starter website engineered for click-to-call conversions and Google Maps local SEO schema. For businesses desiring complex multi-page sales funnels, custom client portals, bespoke animation libraries, or custom web applications, our High-End Custom Website tier is available on an upgrade basis.
              </p>
              <p>
                • <strong className="text-white">No Long-Term Contracts:</strong> Hosting plans operate month-to-month. You may cancel at any time with 30 days written notice.
              </p>
            </div>
          </div>

          {/* Section 3: SMS Terms */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">3</span>
              <span>SMS / Text Messaging Terms (A2P 10DLC & TCPA)</span>
            </h2>
            <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/15 space-y-3 text-xs">
              <p>
                • <strong className="text-white">Consent:</strong> By submitting an SMS opt-in form, you provide express written consent to receive automated text messages (SMS and MMS) regarding service alerts, new inbound leads, appointment reminders, and account notifications.
              </p>
              <p>
                • <strong className="text-white">Message Frequency:</strong> Approximately 2 to 4 messages per month or dynamically triggered by active customer inquiry events.
              </p>
              <p>
                • <strong className="text-white">Opt-Out:</strong> You may opt out of receiving SMS communications at any time by texting <strong>STOP</strong>, <strong>END</strong>, <strong>CANCEL</strong>, <strong>UNSUBSCRIBE</strong>, or <strong>QUIT</strong> in response to any message.
              </p>
              <p>
                • <strong className="text-white">Customer Support:</strong> Text <strong>HELP</strong> to any SMS message, email <strong>harold@ecentraconcierge.com</strong>, or call <strong>810-202-0440</strong>.
              </p>
              <p>
                • <strong className="text-white">Rates & Carriers:</strong> Standard message and data rates may apply. Carriers (such as AT&T, T-Mobile, Verizon, Sprint) are not liable for delayed or undelivered messages.
              </p>
              <p>
                • <strong className="text-white">Data Privacy:</strong> Under no circumstances will your mobile phone number, SMS opt-in data, or consent records be shared, rented, or sold to third parties or affiliates for marketing purposes.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">4</span>
              <span>Ownership & Intellectual Property</span>
            </h2>
            <p>
              You retain full, 100% ownership of your business trademarks, logos, domain names, customer lists, and proprietary copy provided to Ecentra Concierge. Ecentra Concierge retains all right, title, and interest in its proprietary AI software architectures, voice synthesis models, and internal algorithmic workflows.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">5</span>
              <span>Billing, Payments & 30-Day Guarantee</span>
            </h2>
            <p>
              Software subscriptions (AI Receptionist, Chatbot, Review Automator) and Cloud Hosting plans ($97/mo) are billed recurringly on a monthly cycle. We offer a 30-day zero-risk trial on AI concierge services—if you are unsatisfied within the first 30 days of active service, you may cancel without penalty.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">6</span>
              <span>Limitation of Liability</span>
            </h2>
            <p>
              In no event shall Ecentra Concierge, its officers, directors, employees, or contractors be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our websites, software, AI answering tools, or telecommunications networks, including lost profits or business interruptions.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">7</span>
              <span>Governing Law & Disputes</span>
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States without regard to conflict of law principles. Any dispute arising under these Terms shall be resolved via binding arbitration or in courts of competent jurisdiction.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">8</span>
              <span>Contact Information</span>
            </h2>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="font-bold text-white text-sm">Ecentra Concierge Legal & Client Operations</div>
              <div className="text-slate-300">Founder & Operator: Harold Morgan</div>
              <div className="text-slate-300">Mailing Address: 6272 Saginaw Rd #1074, Grand Blanc, MI 48439</div>
              <div className="text-slate-300">Email: <a href="mailto:harold@ecentraconcierge.com" className="text-[#00E599] underline">harold@ecentraconcierge.com</a></div>
              <div className="text-slate-300">Concierge Desk: 810-202-0440</div>
            </div>
          </div>

        </div>

        {/* Footer Navigation Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all cursor-pointer"
          >
            Return to Homepage
          </button>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onNavigatePrivacy}
              className="text-[#00E599] hover:underline font-semibold cursor-pointer"
            >
              Read Privacy Policy →
            </button>
            <button
              onClick={onNavigateSmsOptIn}
              className="text-[#00E599] hover:underline font-semibold cursor-pointer"
            >
              SMS Opt-In Page →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

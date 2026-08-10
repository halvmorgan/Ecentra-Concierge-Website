import React from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Globe,
  Database
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onNavigateTerms: () => void;
  onNavigateSmsOptIn: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToHome,
  onNavigateTerms,
  onNavigateSmsOptIn,
}) => {
  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            id="privacy-back-to-home-btn"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00E599] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Privacy Statement</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">
            Effective Date: January 1, 2026 • Last Updated: August 2026
          </p>
          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            At <strong>Ecentra Concierge</strong>, we respect your privacy and are committed to protecting the personal information and business data of our clients, local service operators, and website visitors. This policy explains what information we collect, how we safeguard it, and our strict pledge regarding mobile and SMS communications data.
          </p>
        </div>

        {/* Core Notice: Mobile SMS Non-Sharing Highlight */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#00E599]/10 to-[#0D152F] border-2 border-[#00E599]/40 shadow-xl space-y-3">
          <div className="flex items-center gap-2.5 text-sm font-bold text-[#00E599]">
            <Lock className="w-5 h-5" />
            <span>Strict Mobile & SMS Privacy Clause (A2P 10DLC Compliant)</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            <strong>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.</strong> All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties under any circumstances.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your phone number is used exclusively by Ecentra Concierge to deliver requested transactional updates, real-time lead alerts, website staging links, and customer support communications you have authorized.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed">
          
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">1</span>
              <span>Information We Collect</span>
            </h2>
            <p>
              We collect information that you directly provide when interacting with our platform, applying for our free foundational website build, taking our 60-second product match quiz, using our missed-lead calculator, or opting in to SMS notifications:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 pl-2">
              <li>
                <strong className="text-white">Contact & Identity Information:</strong> Full name, business email address, mobile phone number, company/business name, job title, and geographic service location.
              </li>
              <li>
                <strong className="text-white">Business & Trade Specifications:</strong> Service industry vertical (e.g. Roofing, HVAC, Plumbing, Solar, Med Spa, Legal), current website domain, estimated weekly call volume, and sales conversion metrics provided during quiz or calculator submissions.
              </li>
              <li>
                <strong className="text-white">SMS Opt-In & Consent Records:</strong> Timestamps, verification codes, IP addresses, and specific message category preferences selected during SMS registration.
              </li>
              <li>
                <strong className="text-white">Automated Device & Technical Data:</strong> Browser user-agent, operating system, referrer URL, pages viewed, and session duration captured strictly to ensure website reliability and prevent fraudulent submissions.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">2</span>
              <span>How We Use Your Information</span>
            </h2>
            <p>
              We use collected information strictly to fulfill our services and operate our AI concierge tools:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 pl-2">
              <li>To construct and deploy your foundational starter website and manage your $97/month cloud hosting & maintenance environment.</li>
              <li>To configure your 24/7 AI Receptionist, Smart AI Chatbot, and 5-Star Review Automator instances.</li>
              <li>To send requested SMS alerts regarding new customer inquiries, quote requests, and appointment confirmations.</li>
              <li>To calculate and present tailored ROI benchmarks based on your trade vertical.</li>
              <li>To provide responsive technical support, billing management, and client onboarding.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">3</span>
              <span>SMS Messaging & Opt-In Terms</span>
            </h2>
            <p>
              When you opt in to receive text messages from Ecentra Concierge:
            </p>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 text-xs">
              <p>
                • <strong>Message Frequency:</strong> Approximately 2 to 4 messages per month, or dynamically triggered by active customer inquiry alerts.
              </p>
              <p>
                • <strong>Cost:</strong> Message and data rates may apply depending on your cellular mobile carrier plan.
              </p>
              <p>
                • <strong>Opting Out:</strong> You can cancel SMS messages at any time by replying <strong>STOP</strong>, <strong>END</strong>, <strong>CANCEL</strong>, <strong>UNSUBSCRIBE</strong>, or <strong>QUIT</strong> to any text received. A single confirmation message will be sent confirming your unsubscription.
              </p>
              <p>
                • <strong>Getting Help:</strong> Text <strong>HELP</strong> to any message, email <strong>harold@ecentraconcierge.com</strong>, or call <strong>810-202-0440</strong>.
              </p>
              <p>
                • <strong>Carrier Liability:</strong> Carriers are not liable for delayed or undelivered text messages.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">4</span>
              <span>Information Sharing & Disclosure</span>
            </h2>
            <p>
              We do not sell, trade, or rent personal identification information to third parties. We may disclose personal information solely under the following narrow circumstances:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 pl-2">
              <li>
                <strong className="text-white">Service Providers:</strong> Trusted third-party vendors (such as Google Cloud for hosting, and licensed telecommunication carriers for SMS routing) who assist us in operating our platform, strictly bound by confidentiality agreements.
              </li>
              <li>
                <strong className="text-white">Legal Requirements:</strong> If required by law, subpoena, or governmental regulatory authority to comply with applicable statutes.
              </li>
              <li>
                <strong className="text-white">Protection of Rights:</strong> To protect the rights, property, or safety of Ecentra Concierge, our users, or the public as permitted by law.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">5</span>
              <span>Data Security & Infrastructure</span>
            </h2>
            <p>
              We implement industry-standard technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data transmitted between your browser and our servers is secured via 256-bit SSL/TLS encryption, and database records are hosted within enterprise Google Cloud data centers.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">6</span>
              <span>Your Data Rights & Choices</span>
            </h2>
            <p>
              Depending on your location (including rights under CCPA and applicable state privacy laws), you have the right to:
            </p>
            <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 pl-2">
              <li>Request access to the personal data we hold about you or your business.</li>
              <li>Request correction or deletion of your personal data from our active databases.</li>
              <li>Withdraw consent for marketing communications or SMS messaging at any time.</li>
            </ul>
            <p className="text-xs text-slate-400">
              To exercise these rights, please contact our privacy team at <strong className="text-white">harold@ecentraconcierge.com</strong>.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">7</span>
              <span>Cookies & Tracking Technologies</span>
            </h2>
            <p>
              Our website uses basic session cookies and functional local storage strictly to remember your preferences (such as selected vertical industry views, calculator inputs, and quiz progress). We do not deploy invasive third-party cross-site advertising trackers.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/10 text-[#00E599] text-xs flex items-center justify-center font-mono">8</span>
              <span>Contact Us</span>
            </h2>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="font-bold text-white text-sm">Ecentra Concierge Privacy Office</div>
              <div className="text-slate-300">Attn: Privacy Officer (Harold Morgan)</div>
              <div className="text-slate-300">Mailing Address: 6272 Saginaw Rd #1074, Grand Blanc, MI 48439</div>
              <div className="text-slate-300">Email: <a href="mailto:harold@ecentraconcierge.com" className="text-[#00E599] underline">harold@ecentraconcierge.com</a></div>
              <div className="text-slate-300">Support Line: 810-202-0440</div>
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
              onClick={onNavigateTerms}
              className="text-[#00E599] hover:underline font-semibold cursor-pointer"
            >
              Read Terms of Service →
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

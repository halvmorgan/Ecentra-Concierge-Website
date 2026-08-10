import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight, MessageSquare, Calculator, CheckSquare, Layers } from 'lucide-react';

interface NavbarProps {
  currentView?: 'home' | 'industry' | 'sms-opt-in' | 'privacy' | 'terms' | 'about' | 'contact';
  activeIndustryName?: string;
  onOpenFreeWebsite: () => void;
  onOpenBookCall: () => void;
  onOpenIndustryDirectory?: () => void;
  onSelectIndustry?: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  onNavigateSmsOptIn: () => void;
  onScrollTo: (elementId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onOpenFreeWebsite,
  onOpenBookCall,
  onNavigateHome,
  onNavigateSmsOptIn,
  onScrollTo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        onScrollTo(id);
      }, 100);
    } else {
      onScrollTo(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView !== 'home'
          ? 'bg-[#080E21]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => {
            onNavigateHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E599] to-[#059669] flex items-center justify-center shadow-lg shadow-[#00E599]/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-[#080E21]" />
          </div>
          <div>
            <div className="font-heading text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Ecentra <span className="text-[#00E599]">Concierge</span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium tracking-wide uppercase">
              AI Growth for Local Service
            </div>
          </div>
        </button>

        {/* Clean, Focused Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            id="nav-link-quiz"
            onClick={() => handleNavClick('quiz-section')}
            className="hover:text-[#00E599] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CheckSquare className="w-4 h-4 text-[#00E599]" />
            <span>Match Quiz</span>
          </button>
          
          <button
            id="nav-link-calc"
            onClick={() => handleNavClick('calculator-section')}
            className="hover:text-[#00E599] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-[#00E599]" />
            <span>ROI Calculator</span>
          </button>

          <button
            id="nav-link-products"
            onClick={() => handleNavClick('products-section')}
            className="hover:text-[#00E599] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-[#00E599]" />
            <span>AI Products</span>
          </button>

          {/* SMS Opt-In */}
          <button
            id="nav-link-sms-optin"
            onClick={() => {
              onNavigateSmsOptIn();
              setMobileMenuOpen(false);
            }}
            className={`hover:text-[#00E599] transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              currentView === 'sms-opt-in' 
                ? 'bg-[#00E599]/15 border-[#00E599]/40 text-[#00E599]' 
                : 'bg-white/5 border-white/10 text-slate-300'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00E599]" />
            <span>SMS Opt In</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-book-call-btn"
            onClick={onOpenBookCall}
            className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-pointer"
          >
            Book 15-Min Call
          </button>
          <button
            id="nav-claim-free-btn"
            onClick={onOpenFreeWebsite}
            className="px-5 py-2.5 text-sm font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-lg shadow-md shadow-[#00E599]/20 transition-all flex items-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-[#00E599]/30 transform active:scale-95"
          >
            <span>Claim $0 Website</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#0D152F] border-b border-white/10 px-4 py-6 mt-3 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            <button
              onClick={() => handleNavClick('quiz-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2.5"
            >
              <CheckSquare className="w-4 h-4 text-[#00E599]" />
              <span>Match Quiz</span>
            </button>
            <button
              onClick={() => handleNavClick('calculator-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2.5"
            >
              <Calculator className="w-4 h-4 text-[#00E599]" />
              <span>Missed-Lead Cost Calculator</span>
            </button>
            <button
              onClick={() => handleNavClick('products-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center gap-2.5"
            >
              <Layers className="w-4 h-4 text-[#00E599]" />
              <span>All 7 AI Products Menu</span>
            </button>

            {/* Mobile SMS Opt-In Link */}
            <button
              id="mobile-nav-sms-optin"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateSmsOptIn();
              }}
              className="text-left py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-[#00E599] font-semibold flex items-center gap-2.5 border border-white/10"
            >
              <MessageSquare className="w-4 h-4" />
              <span>SMS Opt-In & Alerts</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookCall();
              }}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-white/10 hover:bg-white/15 rounded-xl border border-white/15 cursor-pointer"
            >
              Book 15-Minute Strategy Call
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFreeWebsite();
              }}
              className="w-full py-3.5 text-center text-sm font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-xl shadow-lg shadow-[#00E599]/25 cursor-pointer font-heading"
            >
              Claim Your $0 Website Build
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { QuizSection } from './components/QuizSection';
import { CalculatorSection } from './components/CalculatorSection';
import { ProductsPage } from './components/ProductsPage';
import { VerticalShowcaseSection } from './components/VerticalShowcaseSection';
import { FreeWebsiteSection } from './components/FreeWebsiteSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { IndustryLandingPage } from './components/IndustryLandingPage';
import { SmsOptInPage } from './components/SmsOptInPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { InteractiveFunnelsPage } from './components/InteractiveFunnelsPage';
import { IndustryDirectoryModal } from './components/IndustryDirectoryModal';
import { FreeWebsiteModal } from './components/Modals/FreeWebsiteModal';
import { BookCallModal } from './components/Modals/BookCallModal';
import { ProductDetailModal } from './components/Modals/ProductDetailModal';
import { Product } from './types';
import { ALL_INDUSTRY_PAGES, getIndustryById } from './data/industryPages';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'industry' | 'sms-opt-in' | 'privacy' | 'terms' | 'about' | 'contact' | 'funnels'>('home');
  const [activeIndustryId, setActiveIndustryId] = useState<string>('solar');

  // Modal states
  const [isFreeWebsiteModalOpen, setIsFreeWebsiteModalOpen] = useState(false);
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [isIndustryDirectoryOpen, setIsIndustryDirectoryOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Pre-filled booking contexts
  const [bookingInterest, setBookingInterest] = useState<string>('General AI Implementation & ZeroDown Site');
  const [bookingRoiNote, setBookingRoiNote] = useState<string>('');

  // Selected vertical state across home components
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>('solar');

  // Success toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // URL routing synchronization (supports both pathnames e.g. /products and hashes e.g. #products)
  useEffect(() => {
    const syncLocation = () => {
      const hash = window.location.hash.toLowerCase();
      const rawPath = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

      // Check industry pages
      if (hash.startsWith('#industry/') || rawPath.startsWith('/industry/')) {
        const id = (hash.startsWith('#industry/')
          ? hash.replace('#industry/', '')
          : rawPath.replace('/industry/', '')
        ).trim();
        const found = getIndustryById(id);
        if (found) {
          setActiveIndustryId(found.id);
          setSelectedVerticalId(found.id);
          setCurrentView('industry');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // Check specific views
      if (
        hash === '#interactive-funnels' ||
        hash === '#funnels' ||
        hash === '#funnel-demos' ||
        rawPath === '/interactive-funnels' ||
        rawPath === '/funnels' ||
        rawPath === '/funnel-demos'
      ) {
        setCurrentView('funnels');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#products' ||
        hash === '#ai-products' ||
        hash === '#pricing' ||
        rawPath === '/products' ||
        rawPath === '/ai-products' ||
        rawPath === '/pricing'
      ) {
        setCurrentView('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#about' ||
        hash === '#about-us' ||
        rawPath === '/about' ||
        rawPath === '/about-us'
      ) {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#contact' ||
        hash === '#contact-us' ||
        rawPath === '/contact' ||
        rawPath === '/contact-us'
      ) {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#sms-opt-in' ||
        hash === '#sms' ||
        rawPath === '/sms-opt-in' ||
        rawPath === '/sms'
      ) {
        setCurrentView('sms-opt-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#privacy' ||
        hash === '#privacy-policy' ||
        rawPath === '/privacy' ||
        rawPath === '/privacy-policy'
      ) {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#terms' ||
        hash === '#terms-of-service' ||
        rawPath === '/terms' ||
        rawPath === '/terms-of-service'
      ) {
        setCurrentView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (
        hash === '#home' ||
        hash === '' ||
        hash === '#' ||
        rawPath === '/'
      ) {
        setCurrentView('home');
      }
    };

    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, []);

  const handleSelectIndustry = (id: string) => {
    const targetIndustry = getIndustryById(id);
    if (targetIndustry) {
      setActiveIndustryId(targetIndustry.id);
      setSelectedVerticalId(targetIndustry.id);
      setCurrentView('industry');
      window.location.hash = `industry/${targetIndustry.id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateProducts = () => {
    setCurrentView('products');
    window.location.hash = 'products';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateFunnels = () => {
    setCurrentView('funnels');
    window.location.hash = 'interactive-funnels';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    setCurrentView('about');
    window.location.hash = 'about';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    setCurrentView('contact');
    window.location.hash = 'contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSmsOptIn = () => {
    setCurrentView('sms-opt-in');
    window.location.hash = 'sms-opt-in';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePrivacy = () => {
    setCurrentView('privacy');
    window.location.hash = 'privacy';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTerms = () => {
    setCurrentView('terms');
    window.location.hash = 'terms';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const BOOKING_CALENDAR_URL = 'https://api.leadconnectorhq.com/widget/booking/Qx4oGb9Y7b4RFlDyVpJf';
  const REVENUE_LEAK_BOOKING_URL = 'https://api.leadconnectorhq.com/widget/booking/4q93oCzmF1smxkIJhnoO';

  const handleOpenBookCall = (interest?: string) => {
    if (interest) {
      setBookingInterest(interest);
    }
    window.open(BOOKING_CALENDAR_URL, '_blank');
  };

  const handleOpenBookCallWithProduct = (productName: string) => {
    setBookingInterest(productName);
    window.open(BOOKING_CALENDAR_URL, '_blank');
  };

  const handleOpenBookCallWithRoi = (roiSummary: string) => {
    setBookingRoiNote(roiSummary);
    setBookingInterest('Missed-Lead Revenue Leak Consultation');
    window.open(REVENUE_LEAK_BOOKING_URL, '_blank');
  };

  const currentIndustryData = getIndustryById(activeIndustryId) || ALL_INDUSTRY_PAGES[0];

  return (
    <div className="min-h-screen bg-[#080E21] text-slate-100 selection:bg-[#00E599]/30 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast-notification"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#00E599] text-[#080E21] font-bold text-xs shadow-2xl flex items-center gap-3 animate-bounce"
        >
          <span>✓ {toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#080E21]/70 hover:text-[#080E21] cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        currentView={currentView}
        activeIndustryName={currentIndustryData.name}
        onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
        onOpenBookCall={() => handleOpenBookCall('General Strategy Call')}
        onOpenIndustryDirectory={() => setIsIndustryDirectoryOpen(true)}
        onSelectIndustry={handleSelectIndustry}
        onNavigateHome={handleNavigateHome}
        onNavigateProducts={handleNavigateProducts}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
        onNavigateSmsOptIn={handleNavigateSmsOptIn}
        onNavigateFunnels={handleNavigateFunnels}
        onScrollTo={handleScrollTo}
      />

      {/* Conditional Rendering of Views */}
      {currentView === 'funnels' ? (
        <InteractiveFunnelsPage
          onBackToHome={handleNavigateHome}
          onNavigateProducts={handleNavigateProducts}
          onOpenBookCall={(context) => handleOpenBookCall(context || 'The Fast Track Strategy')}
          onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          onNavigateContact={handleNavigateContact}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
        />
      ) : currentView === 'products' ? (
        <ProductsPage
          onBackToHome={handleNavigateHome}
          onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
          onOpenBookCallWithProduct={handleOpenBookCallWithProduct}
          onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          onNavigateQuiz={() => handleScrollTo('quiz-section')}
          onNavigateCalculator={() => handleScrollTo('calculator-section')}
          onNavigateContact={handleNavigateContact}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
          onNavigateFunnels={handleNavigateFunnels}
        />
      ) : currentView === 'industry' ? (
        <IndustryLandingPage
          industry={currentIndustryData}
          onBackToHome={handleNavigateHome}
          onSelectIndustry={handleSelectIndustry}
          onOpenDirectory={() => setIsIndustryDirectoryOpen(true)}
          onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          onOpenBookCall={(tradeName) => {
            handleOpenBookCall(`${tradeName || currentIndustryData.name} AI Growth Strategy`);
          }}
          onQuickClaimSuccess={(data) => {
            showToast(`Application ${data.leadId || 'CONFIRMED'} received for ${data.businessName}!`);
          }}
        />
      ) : currentView === 'about' ? (
        <AboutUsPage
          onBackToHome={handleNavigateHome}
          onNavigateContact={handleNavigateContact}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
          onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          onOpenBookCall={() => {
            handleOpenBookCall('Strategy Call with Harold Morgan');
          }}
        />
      ) : currentView === 'contact' ? (
        <ContactUsPage
          onBackToHome={handleNavigateHome}
          onNavigateAbout={handleNavigateAbout}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
          onNavigatePrivacy={handleNavigatePrivacy}
          onNavigateTerms={handleNavigateTerms}
          onOpenBookCall={() => {
            handleOpenBookCall('Contact Inbound Consultation');
          }}
        />
      ) : currentView === 'sms-opt-in' ? (
        <SmsOptInPage
          onBackToHome={handleNavigateHome}
          onNavigatePrivacy={handleNavigatePrivacy}
          onNavigateTerms={handleNavigateTerms}
          onOpenBookCall={() => {
            handleOpenBookCall('The New Hire & SMS Alerts Strategy Call');
          }}
        />
      ) : currentView === 'privacy' ? (
        <PrivacyPolicyPage
          onBackToHome={handleNavigateHome}
          onNavigateTerms={handleNavigateTerms}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
        />
      ) : currentView === 'terms' ? (
        <TermsOfServicePage
          onBackToHome={handleNavigateHome}
          onNavigatePrivacy={handleNavigatePrivacy}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
        />
      ) : (
        <main>
          {/* 1. Hero Section (Primary Free Website Offer Hook) */}
          <HeroSection
            onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
            onOpenBookCall={() => {
              handleOpenBookCall('New Employee Strategy Call');
            }}
            onSelectVertical={(verticalId) => {
              handleSelectIndustry(verticalId);
            }}
            onOpenIndustryDirectory={() => setIsIndustryDirectoryOpen(true)}
            onQuickClaimSuccess={(data) => {
              showToast(`Claim code ${data.leadId} reserved for ${data.businessName}! Check your email.`);
            }}
          />

          {/* 2. Trust Bar (Proof Metrics & Live Client Wins) */}
          <TrustBar />

          {/* 3. 60-Second Product-Match Quiz */}
          <QuizSection
            onOpenBookCallWithProduct={handleOpenBookCallWithProduct}
            onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          />

          {/* 4. Missed-Lead Cost Calculator */}
          <CalculatorSection
            onOpenBookCallWithRoi={handleOpenBookCallWithRoi}
          />

          {/* 5. Vertical-Specific Proof & Showcase Section */}
          <VerticalShowcaseSection
            selectedVerticalId={selectedVerticalId}
            onSelectVertical={setSelectedVerticalId}
            onOpenIndustryPage={handleSelectIndustry}
            onOpenIndustryDirectory={() => setIsIndustryDirectoryOpen(true)}
            onOpenBookCallWithVertical={(verticalName) => {
              handleOpenBookCall(`${verticalName} AI Answering & Automation`);
            }}
            onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          />

          {/* 6. Dedicated Free Website Offer Section (No Catch, No Credit Card, 3-Step Flow) */}
          <FreeWebsiteSection
            onSuccessClaim={(data) => {
              showToast(`Application ${data.leadId} submitted successfully!`);
            }}
            onOpenBookCall={() => {
              handleOpenBookCall('Priority Kick-Off for Free Website');
            }}
          />

          {/* 7. Final CTA (Book a 15-Minute Strategy Call) */}
          <FinalCtaSection
            onOpenBookCall={() => {
              handleOpenBookCall('15-Minute Strategy Call');
            }}
            onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
        onOpenBookCall={() => {
          handleOpenBookCall('General Strategy Call');
        }}
        onOpenIndustryDirectory={() => setIsIndustryDirectoryOpen(true)}
        onSelectIndustry={handleSelectIndustry}
        onScrollTo={handleScrollTo}
        onNavigateHome={handleNavigateHome}
        onNavigateProducts={handleNavigateProducts}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
        onNavigatePrivacy={handleNavigatePrivacy}
        onNavigateTerms={handleNavigateTerms}
        onNavigateSmsOptIn={handleNavigateSmsOptIn}
        onNavigateFunnels={handleNavigateFunnels}
      />

      {/* Global Modals */}
      <IndustryDirectoryModal
        isOpen={isIndustryDirectoryOpen}
        onClose={() => setIsIndustryDirectoryOpen(false)}
        onSelectIndustry={handleSelectIndustry}
      />

      <FreeWebsiteModal
        isOpen={isFreeWebsiteModalOpen}
        onClose={() => setIsFreeWebsiteModalOpen(false)}
        onSuccess={(data) => {
          showToast(`Claim code ${data.leadId} generated! Design in progress.`);
        }}
      />

      <BookCallModal
        isOpen={isBookCallModalOpen}
        onClose={() => setIsBookCallModalOpen(false)}
        initialProductInterest={bookingInterest}
        initialRoiSummary={bookingRoiNote}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={Boolean(selectedProductForDetail)}
        onClose={() => setSelectedProductForDetail(null)}
        onOpenBookCallWithProduct={handleOpenBookCallWithProduct}
        onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
      />
    </div>
  );
}

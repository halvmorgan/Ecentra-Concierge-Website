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
import { IndustryDirectoryModal } from './components/IndustryDirectoryModal';
import { FreeWebsiteModal } from './components/Modals/FreeWebsiteModal';
import { BookCallModal } from './components/Modals/BookCallModal';
import { ProductDetailModal } from './components/Modals/ProductDetailModal';
import { Product } from './types';
import { ALL_INDUSTRY_PAGES, getIndustryById } from './data/industryPages';

export default function App() {
  // Navigation & View States
  const [currentView, setCurrentView] = useState<'home' | 'products' | 'industry' | 'sms-opt-in' | 'privacy' | 'terms' | 'about' | 'contact'>('home');
  const [activeIndustryId, setActiveIndustryId] = useState<string>('solar');

  // Modal states
  const [isFreeWebsiteModalOpen, setIsFreeWebsiteModalOpen] = useState(false);
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [isIndustryDirectoryOpen, setIsIndustryDirectoryOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Pre-filled booking contexts
  const [bookingInterest, setBookingInterest] = useState<string>('General AI Implementation & Free Website');
  const [bookingRoiNote, setBookingRoiNote] = useState<string>('');

  // Selected vertical state across home components
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>('solar');

  // Success toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#industry/')) {
        const id = hash.replace('#industry/', '').trim();
        const found = getIndustryById(id);
        if (found) {
          setActiveIndustryId(found.id);
          setSelectedVerticalId(found.id);
          setCurrentView('industry');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash === '#products' || hash === '#ai-products' || hash === '#pricing') {
        setCurrentView('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#about' || hash === '#about-us') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash === '#contact-us') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#sms-opt-in' || hash === '#sms') {
        setCurrentView('sms-opt-in');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#privacy' || hash === '#privacy-policy') {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#terms' || hash === '#terms-of-service') {
        setCurrentView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#home' || hash === '' || hash === '#') {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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

  const handleOpenBookCallWithProduct = (productName: string) => {
    setBookingInterest(productName);
    setIsBookCallModalOpen(true);
  };

  const handleOpenBookCallWithRoi = (roiSummary: string) => {
    setBookingRoiNote(roiSummary);
    setBookingInterest('Missed-Lead Revenue Leak Consultation');
    setIsBookCallModalOpen(true);
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
        onOpenBookCall={() => {
          setBookingInterest('General Strategy Call');
          setIsBookCallModalOpen(true);
        }}
        onOpenIndustryDirectory={() => setIsIndustryDirectoryOpen(true)}
        onSelectIndustry={handleSelectIndustry}
        onNavigateHome={handleNavigateHome}
        onNavigateProducts={handleNavigateProducts}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
        onNavigateSmsOptIn={handleNavigateSmsOptIn}
        onScrollTo={handleScrollTo}
      />

      {/* Conditional Rendering of Views */}
      {currentView === 'products' ? (
        <ProductsPage
          onBackToHome={handleNavigateHome}
          onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
          onOpenBookCallWithProduct={handleOpenBookCallWithProduct}
          onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          onNavigateQuiz={() => handleScrollTo('quiz-section')}
          onNavigateCalculator={() => handleScrollTo('calculator-section')}
          onNavigateContact={handleNavigateContact}
          onNavigateSmsOptIn={handleNavigateSmsOptIn}
        />
      ) : currentView === 'industry' ? (
        <IndustryLandingPage
          industry={currentIndustryData}
          onBackToHome={handleNavigateHome}
          onSelectIndustry={handleSelectIndustry}
          onOpenDirectory={() => setIsIndustryDirectoryOpen(true)}
          onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          onOpenBookCall={(tradeName) => {
            setBookingInterest(`${tradeName || currentIndustryData.name} AI Growth Strategy`);
            setIsBookCallModalOpen(true);
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
            setBookingInterest('Strategy Call with Harold Morgan');
            setIsBookCallModalOpen(true);
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
            setBookingInterest('Contact Inbound Consultation');
            setIsBookCallModalOpen(true);
          }}
        />
      ) : currentView === 'sms-opt-in' ? (
        <SmsOptInPage
          onBackToHome={handleNavigateHome}
          onNavigatePrivacy={handleNavigatePrivacy}
          onNavigateTerms={handleNavigateTerms}
          onOpenBookCall={() => {
            setBookingInterest('SMS Integration & AI Receptionist Call');
            setIsBookCallModalOpen(true);
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
              setBookingInterest('24/7 AI Receptionist & Chatbot');
              setIsBookCallModalOpen(true);
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
              setBookingInterest(`${verticalName} AI Answering & Automation`);
              setIsBookCallModalOpen(true);
            }}
            onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          />

          {/* 6. Dedicated Free Website Offer Section (No Catch, No Credit Card, 3-Step Flow) */}
          <FreeWebsiteSection
            onSuccessClaim={(data) => {
              showToast(`Application ${data.leadId} submitted successfully!`);
            }}
            onOpenBookCall={() => {
              setBookingInterest('Priority Kick-Off for Free Website');
              setIsBookCallModalOpen(true);
            }}
          />

          {/* 7. Final CTA (Book a 15-Minute Strategy Call) */}
          <FinalCtaSection
            onOpenBookCall={() => {
              setBookingInterest('15-Minute Strategy Call');
              setIsBookCallModalOpen(true);
            }}
            onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
          />
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenFreeWebsite={() => setIsFreeWebsiteModalOpen(true)}
        onOpenBookCall={() => {
          setBookingInterest('General Strategy Call');
          setIsBookCallModalOpen(true);
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

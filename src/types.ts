export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  whoItsFor: string;
  proofPoint: string;
  proofMetric: string;
  startingPrice: string;
  featuredBadge?: string;
  keyFeatures: string[];
  icon: string;
  category: 'lead-magnet' | 'phone' | 'web' | 'reputation' | 'automation' | 'bundle';
}

export interface VerticalProfile {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  heroHeadline: string;
  typicalJobValue: number;
  averageMissedCallsPerWeek: number;
  corePainPoint: string;
  receptionistSample: {
    callerPrompt: string;
    aiResponse: string;
    duration: string;
  };
  keyBenefits: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    business: string;
    metric: string;
  };
}

export interface IndustryProductBenefit {
  title: string;
  howItWorks: string;
  industryBenefit: string;
  sampleAction: string;
}

export interface IndustryLandingData {
  id: string;
  name: string;
  shortName: string;
  category: 'Home & Trade Services' | 'Health & Medical' | 'Legal & Financial' | 'Creative & Events' | 'Automotive & Emergency' | 'Care & Personal Services';
  icon: string;
  badgeText: string;
  heroHeadline: string;
  heroCtaHook: string; // The strong call to action hook like the solar example
  typicalJobValue: number;
  averageMissedCallsPerWeek: number;
  corePainPoint: string;
  products: {
    freeWebsite: IndustryProductBenefit;
    aiReceptionist: IndustryProductBenefit;
    aiChatbot: IndustryProductBenefit;
    reviewAutomator: IndustryProductBenefit;
    appointmentSetter: IndustryProductBenefit;
    interactiveFunnel: IndustryProductBenefit;
    aiEmployeeSuite: IndustryProductBenefit;
  };
  receptionistSample: {
    callerType: string;
    callerPrompt: string;
    aiResponse: string;
    duration: string;
  };
  funnelPreview: {
    title: string;
    steps: string[];
    qualifierNote: string;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    business: string;
    metric: string;
  };
  keyBenefits: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtext?: string;
  options: {
    label: string;
    description?: string;
    icon?: string;
    productScores: Record<string, number>;
  }[];
}

export interface MissedCallsTier {
  callsPerWeek: number;
  callsPerMonth: number;
  lostRevenueMonth: number;
  recoveredRevenueMonth: number;
  fixCostMonth: number;
  netProfitMonth: number;
  roiMultiple: string;
  breakevenDescription: string;
}

export interface QuizAnalysisResult {
  primary: Product;
  secondary: Product;
  industryName: string;
  typicalTicket: number;
  headache: string;
  answeringMethod: string;
  weeklyLeadsText: string;
  baselineMissedCallsPerWeek: number;
  baselineMissedCallsPerMonth: number;
  baselineLostRevenue: number;
  fixCost: number;
  fixCostDisplay: string;
  breakevenThreshold: string;
  netMonthlyProfit: number;
  roiMultiplier: string;
  tiers: MissedCallsTier[];
  whyThisFit: string[];
  estimatedMonthlyGain: string;
}

export interface QuizResult {
  topProducts: Product[];
  secondaryProduct?: Product;
  summary: string;
  whyThisFit: string[];
  estimatedMonthlyGain: string;
}

export interface FreeWebsiteFormData {
  businessName: string;
  industry: string;
  ownerName: string;
  phone: string;
  email: string;
  currentWebsite?: string;
  frustrations: string;
  primaryGoal: string;
}

export interface BookCallFormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  industry: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  interest: string;
  notes?: string;
}

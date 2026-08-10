import { QuizQuestion, Product, QuizAnalysisResult, MissedCallsTier } from '../types';
import { PRODUCTS } from './products';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of local service business do you run?",
    subtext: "We tailor our AI tools and website layouts to the specific economics of your trade.",
    options: [
      {
        label: "HVAC & Climate Control",
        description: "High-ticket system replacements & emergency repair calls",
        productScores: { 'ai-receptionist': 3, 'free-website': 2, 'ai-employee': 3, 'appointment-setter': 2 },
      },
      {
        label: "Plumbing & Drain Cleaning",
        description: "Urgent leaks, water heaters, and technician dispatch",
        productScores: { 'ai-receptionist': 3, 'review-automator': 2, 'ai-employee': 2, 'free-website': 2 },
      },
      {
        label: "Chiropractor or Medical / Wellness",
        description: "New patient consultations, adjustments, recurring wellness",
        productScores: { 'appointment-setter': 3, 'ai-chatbot': 2, 'review-automator': 3, 'ai-employee': 2 },
      },
      {
        label: "Tattoo Studio or Independent Artist",
        description: "Flash bookings, custom inquiries, reference collection",
        productScores: { 'interactive-funnel': 3, 'ai-chatbot': 3, 'appointment-setter': 2, 'free-website': 2 },
      },
      {
        label: "Med Spa & Aesthetics Clinic",
        description: "High-value treatments, Botox, lasers, skin therapies",
        productScores: { 'ai-chatbot': 3, 'interactive-funnel': 3, 'appointment-setter': 2, 'ai-receptionist': 2 },
      },
      {
        label: "Roofing, Construction & Remodeling",
        description: "Heavy ticket estimates, storm damage, roofing quotes",
        productScores: { 'interactive-funnel': 3, 'ai-receptionist': 3, 'review-automator': 2, 'ai-employee': 2 },
      },
      {
        label: "Auto Detailing, Tinting & Marine",
        description: "Package selection, ceramic coatings, vehicle bookings",
        productScores: { 'interactive-funnel': 3, 'review-automator': 2, 'ai-chatbot': 2, 'free-website': 2 },
      },
      {
        label: "Other Local Service Business",
        description: "Electrical, Landscaping, Cleaning, Pest Control, Solar, etc.",
        productScores: { 'free-website': 3, 'ai-receptionist': 2, 'ai-employee': 2, 'review-automator': 2 },
      },
    ],
  },
  {
    id: 2,
    question: "What is your single biggest business headache right now?",
    subtext: "Be honest — this helps us pinpoint the fastest way to put more revenue in your pocket.",
    options: [
      {
        label: "Missing calls when I'm on a job or after hours",
        description: "Callers hang up and hire the next company on Google",
        productScores: { 'ai-receptionist': 5, 'ai-employee': 4, 'appointment-setter': 2 },
      },
      {
        label: "Our website is outdated, ugly, or nonexistent",
        description: "It doesn't represent our quality or convert mobile visitors",
        productScores: { 'free-website': 6, 'ai-chatbot': 3, 'interactive-funnel': 2 },
      },
      {
        label: "Wasting hours answering tire-kickers & quoting dead ends",
        description: "Need a way to filter budgets before spending our time",
        productScores: { 'interactive-funnel': 5, 'ai-chatbot': 4, 'appointment-setter': 2 },
      },
      {
        label: "We don't have enough 5-star Google reviews",
        description: "We do great work, but competitors outrank us on Google Maps",
        productScores: { 'review-automator': 6, 'free-website': 2, 'ai-employee': 2 },
      },
      {
        label: "Customers ghosting, phone tag, and last-minute no-shows",
        description: "Losing hours of technician calendar capacity to cancellations",
        productScores: { 'appointment-setter': 5, 'ai-receptionist': 3, 'ai-employee': 3 },
      },
    ],
  },
  {
    id: 3,
    question: "Roughly how many total calls or lead inquiries do you get weekly?",
    subtext: "Include phone calls, website form fills, and social media DMs.",
    options: [
      {
        label: "Under 15 leads / week",
        description: "Early-stage or solo operation looking to capture every drop",
        productScores: { 'free-website': 3, 'ai-receptionist': 3, 'review-automator': 2 },
      },
      {
        label: "15 to 40 leads / week",
        description: "Consistent volume, but definitely losing some after 5 PM",
        productScores: { 'ai-receptionist': 4, 'appointment-setter': 3, 'ai-chatbot': 3 },
      },
      {
        label: "40 to 100 leads / week",
        description: "Heavy volume — front desk is overwhelmed and leaks happen",
        productScores: { 'ai-employee': 5, 'ai-receptionist': 4, 'appointment-setter': 4 },
      },
      {
        label: "100+ leads / week",
        description: "Multi-truck / multi-practitioner business ready for full automation",
        productScores: { 'ai-employee': 6, 'interactive-funnel': 4, 'ai-receptionist': 4 },
      },
    ],
  },
  {
    id: 4,
    question: "Who currently answers your phones during busy hours?",
    subtext: "What happens when two people call at the exact same second?",
    options: [
      {
        label: "I answer myself while driving or working on a job",
        description: "Distracting, noisy background, and dangerous on the road",
        productScores: { 'ai-receptionist': 5, 'free-website': 2, 'ai-employee': 3 },
      },
      {
        label: "It goes to voicemail (and we call back when free)",
        description: "Most callers never leave a message and call a competitor",
        productScores: { 'ai-receptionist': 6, 'appointment-setter': 3, 'ai-employee': 4 },
      },
      {
        label: "We have an in-house receptionist (who gets swamped)",
        description: "They can't answer 2 lines at once or handle after-hours",
        productScores: { 'ai-receptionist': 4, 'appointment-setter': 4, 'ai-chatbot': 3 },
      },
      {
        label: "Spouse or part-time family member helps out",
        description: "They need their time back without missing business revenue",
        productScores: { 'ai-employee': 5, 'ai-receptionist': 4, 'appointment-setter': 3 },
      },
    ],
  },
  {
    id: 5,
    question: "Do you have a system that automatically texts missed callers in under 60 seconds?",
    subtext: "Studies show 78% of service jobs go to the first business that responds.",
    options: [
      {
        label: "No, we have zero automated follow-up right now",
        description: "We just call back manually when someone checks voicemail",
        productScores: { 'ai-receptionist': 4, 'appointment-setter': 4, 'ai-employee': 4 },
      },
      {
        label: "Sometimes I send a quick manual text if I see the missed call",
        description: "Hit or miss depending on how busy the job site is",
        productScores: { 'appointment-setter': 4, 'ai-receptionist': 3, 'ai-chatbot': 2 },
      },
      {
        label: "Yes, we already have automated SMS set up",
        description: "Looking to level up to 24/7 AI voice answering and reputation",
        productScores: { 'ai-receptionist': 4, 'review-automator': 4, 'interactive-funnel': 3 },
      },
    ],
  },
];

interface TradeEconomicProfile {
  name: string;
  typicalTicket: number;
}

const TRADE_ECONOMICS: Record<number, TradeEconomicProfile> = {
  0: { name: 'HVAC & Climate Control', typicalTicket: 1400 },
  1: { name: 'Plumbing & Drain Cleaning', typicalTicket: 550 },
  2: { name: 'Chiropractor or Medical / Wellness', typicalTicket: 450 },
  3: { name: 'Tattoo Studio or Independent Artist', typicalTicket: 350 },
  4: { name: 'Med Spa & Aesthetics Clinic', typicalTicket: 750 },
  5: { name: 'Roofing, Construction & Remodeling', typicalTicket: 4200 },
  6: { name: 'Auto Detailing, Tinting & Marine', typicalTicket: 350 },
  7: { name: 'Local Service Business', typicalTicket: 650 },
};

const LEAD_VOLUME_TIERS: Record<number, { text: string; missedCallsPerWeek: number }> = {
  0: { text: 'Under 15 leads / week', missedCallsPerWeek: 2 },
  1: { text: '15 to 40 leads / week', missedCallsPerWeek: 4 },
  2: { text: '40 to 100 leads / week', missedCallsPerWeek: 7 },
  3: { text: '100+ leads / week', missedCallsPerWeek: 12 },
};

const PRODUCT_COST_MAP: Record<string, { cost: number; display: string }> = {
  'free-website': { cost: 97, display: '$0 Build ($97/mo Hosting)' },
  'ai-receptionist': { cost: 199, display: '~$199/mo' },
  'ai-chatbot': { cost: 149, display: '~$149/mo' },
  'review-automator': { cost: 99, display: '~$99/mo' },
  'appointment-setter': { cost: 149, display: '~$149/mo' },
  'interactive-funnel': { cost: 199, display: '~$199/mo' },
  'ai-employee': { cost: 399, display: '~$399/mo' },
};

export function calculateQuizResults(selectedOptionIndices: number[]): QuizAnalysisResult {
  const scores: Record<string, number> = {
    'free-website': 0,
    'ai-receptionist': 0,
    'ai-chatbot': 0,
    'review-automator': 0,
    'appointment-setter': 0,
    'interactive-funnel': 0,
    'ai-employee': 0,
  };

  selectedOptionIndices.forEach((optionIdx, qIdx) => {
    const question = QUIZ_QUESTIONS[qIdx];
    if (question && question.options[optionIdx]) {
      const optScores = question.options[optionIdx].productScores;
      Object.entries(optScores).forEach(([prodId, points]) => {
        scores[prodId] = (scores[prodId] || 0) + points;
      });
    }
  });

  const sortedProductIds = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id);

  const primaryId = sortedProductIds[0] || 'ai-receptionist';
  const secondaryId = sortedProductIds[1] || 'free-website';

  const primaryProduct = PRODUCTS.find((p) => p.id === primaryId) || PRODUCTS[1];
  const secondaryProduct = PRODUCTS.find((p) => p.id === secondaryId) || PRODUCTS[0];

  // Industry & Trade economics
  const tradeOptIdx = selectedOptionIndices[0] ?? 0;
  const tradeInfo = TRADE_ECONOMICS[tradeOptIdx] || TRADE_ECONOMICS[7];
  const typicalTicket = tradeInfo.typicalTicket;
  const industryName = tradeInfo.name;

  // Headache & Answering context
  const headacheOptIdx = selectedOptionIndices[1] ?? 0;
  const headache = QUIZ_QUESTIONS[1]?.options[headacheOptIdx]?.label || 'Missing calls after hours';

  const volumeOptIdx = selectedOptionIndices[2] ?? 0;
  const volumeInfo = LEAD_VOLUME_TIERS[volumeOptIdx] || LEAD_VOLUME_TIERS[0];
  const weeklyLeadsText = volumeInfo.text;
  const baselineMissedCallsPerWeek = volumeInfo.missedCallsPerWeek;
  const baselineMissedCallsPerMonth = baselineMissedCallsPerWeek * 4;

  const answerOptIdx = selectedOptionIndices[3] ?? 0;
  const answeringMethod = QUIZ_QUESTIONS[3]?.options[answerOptIdx]?.label || 'Voicemail / Self-answer';

  // Cost of primary fix
  const fixCostInfo = PRODUCT_COST_MAP[primaryId] || { cost: 199, display: '~$199/mo' };
  const fixCost = fixCostInfo.cost;
  const fixCostDisplay = fixCostInfo.display;

  // Revenue loss calculation (conservative 40% close rate on missed inbound calls)
  const baselineLostRevenue = Math.round(baselineMissedCallsPerMonth * typicalTicket * 0.40);
  const netMonthlyProfit = Math.max(0, baselineLostRevenue - fixCost);
  const roiMultiplier = fixCost > 0 ? (baselineLostRevenue / fixCost).toFixed(1) + 'x' : 'Infinite';

  // Breakeven threshold description
  let breakevenThreshold = '';
  if (fixCost === 0) {
    breakevenThreshold = '100% Free manual build ($0) — every single job gained is pure profit.';
  } else if (typicalTicket >= fixCost) {
    breakevenThreshold = `Recovering just 1 single job per month ($${typicalTicket.toLocaleString()}) pays for the entire software cost and leaves +$${(typicalTicket - fixCost).toLocaleString()} in extra profit.`;
  } else {
    const jobsNeeded = Math.ceil(fixCost / typicalTicket);
    breakevenThreshold = `Recovering just ${jobsNeeded} job${jobsNeeded > 1 ? 's' : ''} per month ($${typicalTicket.toLocaleString()} each) completely covers the monthly investment.`;
  }

  // Tiers for 1, 2, 3, 5, and 8 missed calls per week to show how few missed calls are needed to pay for the fix
  const tierCallCounts = [1, 2, 3, 5, 8];
  const tiers: MissedCallsTier[] = tierCallCounts.map((callsPerWeek) => {
    const callsPerMonth = callsPerWeek * 4;
    const lostRev = Math.round(callsPerMonth * typicalTicket * 0.40);
    const recoveredRev = lostRev;
    const netProf = Math.max(0, recoveredRev - fixCost);
    const roi = fixCost > 0 ? (recoveredRev / fixCost).toFixed(1) + 'x' : 'Infinite';
    const breakeven =
      fixCost === 0
        ? 'Zero cost — 100% margin'
        : typicalTicket >= fixCost
        ? 'Paid for with less than 1 single recovered job'
        : `Paid for with ~${Math.ceil(fixCost / typicalTicket)} recovered jobs`;

    return {
      callsPerWeek,
      callsPerMonth,
      lostRevenueMonth: lostRev,
      recoveredRevenueMonth: recoveredRev,
      fixCostMonth: fixCost,
      netProfitMonth: netProf,
      roiMultiple: roi,
      breakevenDescription: breakeven,
    };
  });

  const whyReasons: string[] = [
    `Directly stops your trade's biggest leak by providing sub-60-second response to 100% of high-intent callers.`,
    `Eliminates costly voicemail drop-offs when your crew is working on jobs or closed for the night.`,
    `The tool is self-funding: recovering just 1 missed lead covers the entire monthly cost, turning all other captured calls into pure profit.`,
  ];

  let gainEstimate = `$${(baselineLostRevenue - fixCost).toLocaleString()} / month`;
  if (baselineLostRevenue > 5000) {
    gainEstimate = `$${Math.round(baselineLostRevenue * 0.8).toLocaleString()} – $${Math.round(baselineLostRevenue * 1.2).toLocaleString()} / month`;
  }

  return {
    primary: primaryProduct,
    secondary: secondaryProduct,
    industryName,
    typicalTicket,
    headache,
    answeringMethod,
    weeklyLeadsText,
    baselineMissedCallsPerWeek,
    baselineMissedCallsPerMonth,
    baselineLostRevenue,
    fixCost,
    fixCostDisplay,
    breakevenThreshold,
    netMonthlyProfit,
    roiMultiplier,
    tiers,
    whyThisFit: whyReasons,
    estimatedMonthlyGain: gainEstimate,
  };
}

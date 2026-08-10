import { IndustryLandingData } from '../types';
import { HOME_AND_TRADES_INDUSTRIES } from './industries/homeAndTrades';
import { HEALTH_AND_WELLNESS_INDUSTRIES } from './industries/healthAndWellness';
import { LEGAL_AND_FINANCIAL_INDUSTRIES } from './industries/legalAndFinancial';
import { CREATIVE_AND_PERSONAL_INDUSTRIES } from './industries/creativeAndPersonal';

export const ALL_INDUSTRY_PAGES: IndustryLandingData[] = [
  ...HOME_AND_TRADES_INDUSTRIES,
  ...HEALTH_AND_WELLNESS_INDUSTRIES,
  ...LEGAL_AND_FINANCIAL_INDUSTRIES,
  ...CREATIVE_AND_PERSONAL_INDUSTRIES,
];

export const INDUSTRY_CATEGORIES = [
  'All 30 Industries',
  'Home & Trade Services',
  'Health & Medical',
  'Legal & Financial',
  'Creative & Events',
  'Care & Personal Services',
] as const;

export function getIndustryById(id: string): IndustryLandingData | undefined {
  return ALL_INDUSTRY_PAGES.find((p) => p.id === id);
}

export function getAdjacentIndustries(currentId: string): {
  prev: IndustryLandingData;
  next: IndustryLandingData;
} {
  const index = ALL_INDUSTRY_PAGES.findIndex((p) => p.id === currentId);
  const safeIndex = index === -1 ? 0 : index;
  const prevIndex = (safeIndex - 1 + ALL_INDUSTRY_PAGES.length) % ALL_INDUSTRY_PAGES.length;
  const nextIndex = (safeIndex + 1) % ALL_INDUSTRY_PAGES.length;
  return {
    prev: ALL_INDUSTRY_PAGES[prevIndex],
    next: ALL_INDUSTRY_PAGES[nextIndex],
  };
}

import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles, Building, CheckCircle2 } from 'lucide-react';
import { ALL_INDUSTRY_PAGES, INDUSTRY_CATEGORIES } from '../data/industryPages';
import { IndustryLandingData } from '../types';

interface IndustryDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectIndustry: (id: string) => void;
}

export const IndustryDirectoryModal: React.FC<IndustryDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectIndustry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All 30 Industries');

  const filteredIndustries = useMemo(() => {
    return ALL_INDUSTRY_PAGES.filter((ind) => {
      const matchesSearch =
        ind.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.badgeText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ind.corePainPoint.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All 30 Industries' || ind.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div
      id="industry-directory-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#0A1128] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl shadow-black/90 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/10 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 text-xs font-bold text-[#00E599] mb-2">
              <Building className="w-3.5 h-3.5" />
              <span>Dedicated Industry Landing Pages</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Select Your Service Industry (30 Dedicated Pages)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Explore tailored product benefits, ROI calculations, live voice call simulations, and custom funnels for your trade.
            </p>
          </div>
          <button
            id="close-industry-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
            aria-label="Close directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="py-4 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="industry-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by trade (e.g. Solar, Dentist, HVAC, Pest Control, Tattoo, Locksmith...)"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {INDUSTRY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00E599] text-[#080E21] shadow-md shadow-[#00E599]/20 font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredIndustries.map((ind: IndustryLandingData) => (
            <button
              key={ind.id}
              id={`industry-card-btn-${ind.id}`}
              onClick={() => {
                onSelectIndustry(ind.id);
                onClose();
              }}
              className="text-left p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E599]/50 transition-all group cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded-md border border-[#00E599]/20">
                    {ind.category}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    ~${ind.typicalJobValue.toLocaleString()} avg
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-white group-hover:text-[#00E599] transition-colors flex items-center justify-between">
                  <span>{ind.name}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                  {ind.badgeText}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-white transition-colors">
                <span className="font-medium flex items-center gap-1 text-[11px] text-[#00E599]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> View Custom Landing Page
                </span>
                <ArrowRight className="w-4 h-4 text-[#00E599] transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
          {filteredIndustries.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-400">
              <p className="text-sm">No service industry found matching "{searchTerm}".</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All 30 Industries');
                }}
                className="mt-2 text-xs text-[#00E599] underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-slate-400">
          <span>Showing {filteredIndustries.length} of 30 industry landing pages</span>
          <span>Click any industry to view its dedicated landing page & product breakdown</span>
        </div>
      </div>
    </div>
  );
};

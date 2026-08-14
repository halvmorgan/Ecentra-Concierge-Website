import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { BookCallFormData } from '../../types';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProductInterest?: string;
  initialRoiSummary?: string;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  initialProductInterest = 'General AI Implementation & Free Website',
  initialRoiSummary = '',
}) => {
  const [formData, setFormData] = useState<BookCallFormData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    industry: 'HVAC & Heating / Cooling',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: 'Morning (9:00 AM – 12:00 PM)',
    timezone: 'Eastern Time (ET)',
    interest: initialProductInterest,
    notes: initialRoiSummary,
  });

  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        interest: initialProductInterest || prev.interest,
        notes: initialRoiSummary || prev.notes,
      }));
      setConfirmed(false);
      setErrorMsg('');
    }
  }, [isOpen, initialProductInterest, initialRoiSummary]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.preferredDate) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/.netlify/functions/submit-book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmed(true);
        setBookingRef(data.bookingId);
      } else {
        setErrorMsg(data.error || 'Failed to book call.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="book-call-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0D152F] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-book-call-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00E599] uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>15-Minute Zero-Fluff Call</span>
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Schedule Your Strategy Call
            </h3>
            <p className="text-xs text-slate-300 mt-1 mb-5">
              Talk directly with an Ecentra trade specialist to review your missed call volume and custom AI setup.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Harold Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Heating & Air"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Direct Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="owner@yourcompany.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00E599]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Time Window *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                  >
                    <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM – 3:00 PM)">Afternoon (12:00 PM – 3:00 PM)</option>
                    <option value="Late Afternoon (3:00 PM – 6:00 PM)">Late Afternoon (3:00 PM – 6:00 PM)</option>
                    <option value="Evening (6:00 PM – 8:00 PM)">Evening (6:00 PM – 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                  >
                    <option value="Eastern Time (ET)">Eastern Time (ET)</option>
                    <option value="Central Time (CT)">Central Time (CT)</option>
                    <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                    <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Primary Interest
                  </label>
                  <input
                    type="text"
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#080E21] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00E599]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 font-bold text-[#080E21] bg-[#00E599] hover:bg-[#34D399] rounded-xl shadow-lg font-heading text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <span>Reserving Calendar Slot...</span>
                ) : (
                  <>
                    <span>Confirm 15-Min Strategy Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" /> 100% Zero-Sales Pitch
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00E599]" /> Exactly 15 Minutes
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-[#00E599]/20 border border-[#00E599] text-[#00E599] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-heading text-2xl font-bold text-white">
              Strategy Call Reserved!
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              We have locked in your 15-minute consultation. We’ll call you on{' '}
              <strong className="text-white">{formData.phone}</strong> on{' '}
              <strong className="text-white">{formData.preferredDate}</strong> during{' '}
              <strong className="text-white">{formData.preferredTime}</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-left text-xs space-y-1.5 max-w-xs mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Confirmation Code:</span>
                <span className="font-mono font-bold text-[#00E599]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Calendar Invite:</span>
                <span className="text-white font-semibold">Sent to {formData.email}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#00E599] text-[#080E21] font-bold text-xs font-heading cursor-pointer"
            >
              Done / Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

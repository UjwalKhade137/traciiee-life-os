import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const CollegeEventsModal = ({ isOpen, onClose }) => {
  const { data, toggleEventRSVP } = useLifeOS();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#fafaf3] w-full max-w-2xl rounded-3xl border border-surface-variant shadow-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">celebration</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-xl font-bold text-primary">College Events & Celebrations</h2>
            <p className="text-xs text-on-surface-variant">Campus fests, traditional mahotsavs & technical expos</p>
          </div>
        </div>

        <div className="space-y-4">
          {data.collegeEvents.map((event) => (
            <div
              key={event.id}
              className="bg-surface-container-lowest rounded-2xl border border-surface-variant overflow-hidden shadow-[0_4px_20px_rgba(25,53,12,0.04)] hover:shadow-organic transition-all flex flex-col md:flex-row"
            >
              {/* Event Image from Existing Assets */}
              <div className="md:w-5/12 h-44 md:h-auto relative overflow-hidden bg-surface-container">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#061f00]/85 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                  {event.tag}
                </span>
              </div>

              {/* Event Details */}
              <div className="p-4 md:w-7/12 flex flex-col justify-between">
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-on-background mb-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">
                    {event.desc}
                  </p>
                  
                  <div className="space-y-1 text-xs text-on-surface mb-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="material-symbols-outlined text-secondary text-sm">calendar_today</span>
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-variant/40">
                  <span className={`text-xs font-bold ${event.rsvp ? 'text-emerald-700' : 'text-on-surface-variant'}`}>
                    {event.rsvp ? '✓ Attending / RSVP confirmed' : 'RSVP pending'}
                  </span>
                  <button
                    onClick={() => toggleEventRSVP(event.id)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
                      event.rsvp
                        ? 'bg-surface-container text-on-surface hover:bg-surface-variant'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {event.rsvp ? 'Cancel RSVP' : 'RSVP Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

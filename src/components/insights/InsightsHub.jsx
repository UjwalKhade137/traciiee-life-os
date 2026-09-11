import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';

export const InsightsHub = () => {
  const { data, generateAIInsight, isGeneratingAI } = useLifeOS();
  const [timeframe, setTimeframe] = useState('weekly'); // 'daily' | 'weekly' | 'monthly' | 'yearly'

  const { lifeScore, aiInsights, goals } = data;

  const topGoal = goals[0] || { title: 'Q3 Certification', progress: 68, targetDate: '2026-09-28' };

  return (
    <div className="px-container-margin py-4 flex flex-col gap-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Timeframe Switcher */}
      <div className="flex bg-surface-container rounded-full p-1 max-w-sm mx-auto w-full shadow-inner">
        {['daily', 'weekly', 'monthly', 'yearly'].map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-full transition-all ${
              timeframe === tf ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* AI Quota & Free Tier Status Banner (Per PRD §6.18) */}
      <div className="bg-surface-container-low border border-surface-variant/70 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary">Free-Tier AI Insights</span>
              <span className="text-[10px] font-mono-data font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                {aiInsights.remainingQuotaToday}/{aiInsights.maxDailyQuota} Free Calls Left
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              {aiInsights.isQuotaExhausted
                ? `Quota resets in ${aiInsights.quotaResetsIn}. Showing cached intelligence.`
                : `Quota resets in ${aiInsights.quotaResetsIn}. 100% free API tier.`}
            </p>
          </div>
        </div>

        <button
          onClick={generateAIInsight}
          disabled={isGeneratingAI || aiInsights.remainingQuotaToday <= 0}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
            aiInsights.remainingQuotaToday <= 0
              ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90 active:scale-95'
          }`}
        >
          {isGeneratingAI ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Synthesizing...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-sm">psychology</span>
              Synthesize AI Insight
            </>
          )}
        </button>
      </div>

      {/* Main Insights Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Card 1: Personal AI Insights (Spans 2 cols) */}
        <article className="glass-card rounded-2xl p-5 md:col-span-2 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary-fixed/20 rounded-full blur-3xl group-hover:bg-primary-fixed/30 transition-all duration-700 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_awesome
                </span>
                <h3 className="font-headline-sm text-base font-bold text-primary">
                  {aiInsights.insights[0]?.title || 'Personal Intelligence Report'}
                </h3>
              </div>
              <span className="text-[10px] font-mono-data text-on-surface-variant">
                Updated {aiInsights.lastGenerated}
              </span>
            </div>

            <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed mb-4">
              {aiInsights.insights[0]?.summary}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-variant/50 flex flex-col shadow-xs">
                <span className="font-label-caps text-[10px] text-on-surface-variant mb-0.5">Average Sleep</span>
                <span className="font-mono-data text-sm font-bold text-primary flex items-center gap-1">
                  {aiInsights.insights[0]?.sleepAvg}
                  <span className="material-symbols-outlined text-emerald-600 text-sm">arrow_upward</span>
                </span>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-3 border border-surface-variant/50 flex flex-col shadow-xs">
                <span className="font-label-caps text-[10px] text-on-surface-variant mb-0.5">Study Focus Efficiency</span>
                <span className="font-mono-data text-sm font-bold text-secondary flex items-center gap-1">
                  {aiInsights.insights[0]?.focusAvg}
                  <span className="material-symbols-outlined text-emerald-600 text-sm">trending_up</span>
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: Goal Prediction Gauge */}
        <article className="glass-card rounded-2xl p-5 flex flex-col justify-between relative">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-headline-sm text-sm font-bold text-on-background line-clamp-1">{topGoal.title}</h4>
                <p className="text-[10px] uppercase font-bold tracking-wider text-secondary">AI Goal Prediction</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed">
                On Track
              </span>
            </div>

            {/* Circular Gauge */}
            <div className="flex justify-center items-center py-4 relative">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-surface-container-high"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="text-secondary"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * topGoal.progress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono-data text-2xl font-bold text-primary">{topGoal.progress}%</span>
                <span className="text-[9px] uppercase font-bold text-on-surface-variant">Pace</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-surface-variant/40 flex items-center justify-between text-xs">
            <span className="text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">event</span>
              Est. {topGoal.targetDate}
            </span>
            <span className="font-bold text-secondary">4 Topics / wk</span>
          </div>
        </article>

        {/* Card 3: Life Score Breakdown (Spans full width) */}
        <article className="glass-card rounded-2xl p-5 md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-sm text-base font-bold text-on-background">Life Score Area Breakdown</h3>
              <p className="text-xs text-on-surface-variant">Multi-domain weighting analysis ({timeframe})</p>
            </div>
            <span className="font-mono-data text-sm font-bold text-primary bg-surface-container px-3 py-1 rounded-full">
              Overall: {lifeScore.current}/100
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(lifeScore.breakdown).map(([area, score]) => {
              const colorClass =
                score >= 80 ? 'bg-primary' : score >= 65 ? 'bg-secondary' : 'bg-amber-600';
              return (
                <div key={area} className="bg-surface-container-lowest p-3 rounded-xl border border-surface-variant/50">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5 capitalize">
                    <span className="text-on-background">{area}</span>
                    <span className="font-mono-data text-primary">{score} / 100</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${colorClass}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* Card 4: Cross-Domain Correlation Insights */}
        <article className="glass-card rounded-2xl p-5 md:col-span-3">
          <h3 className="font-headline-sm text-base font-bold text-on-background mb-3">
            Cross-Domain Correlations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-variant/60 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-xl">hotel</span>
              <div>
                <h5 className="text-xs font-bold text-primary mb-0.5">Sleep vs Focus</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  +1 hour of sleep yields a <strong>+22%</strong> higher deep-work retention in morning sessions.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-variant/60 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-secondary text-xl">phonelink_off</span>
              <div>
                <h5 className="text-xs font-bold text-secondary mb-0.5">Screen Curfew</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Shutting screens 45 mins before bedtime reduced sleep latency by <strong>34 minutes</strong>.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-3.5 rounded-xl border border-surface-variant/60 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-purple-700 text-xl">headphones</span>
              <div>
                <h5 className="text-xs font-bold text-purple-800 mb-0.5">Music & Study</h5>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Instrumental Lo-Fi playlists sustained focus for <strong>48 minutes longer</strong> than silence.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

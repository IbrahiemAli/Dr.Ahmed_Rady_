/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface QuizBannerProps {
  lang: Language;
  config: TextConfig | null;
  onStartQuiz: () => void;
}

export default function QuizBanner({ lang, config, onStartQuiz }: QuizBannerProps) {
  const isRtl = lang === 'ar';

  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-r from-[#235347] via-[#0b2b26] to-[#051f20] text-white relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Decorative large scales watermark symbol */}
      <div className="absolute top-1/2 left-[-100px] w-80 h-80 rounded-full border border-white/5 pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-[5%] w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-6">
          
          {/* Animated small flame badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full animate-bounce">
            <Flame className="h-4 w-4 text-amber-300" />
            <span className="text-xs font-black text-amber-300">
              {t(config, 'quiz_banner_badge', lang)}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black tracking-tight leading-snug">
            {t(config, 'quiz_banner_title', lang)}
          </h2>

          <p className="text-base sm:text-lg text-[#daf1de] max-w-2xl font-semibold leading-relaxed">
            {t(config, 'quiz_banner_desc', lang)}
          </p>

          <div className="pt-4">
            <button
              id="quiz-banner-start-btn"
              onClick={onStartQuiz}
              className="px-8 py-4 bg-white text-[#235347] hover:bg-[#daf1de] font-black text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{t(config, 'quiz_banner_btn', lang)}</span>
              {isRtl ? <ArrowLeft className="h-5 w-5 text-[#235347]" /> : <ArrowRight className="h-5 w-5 text-[#235347]" />}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

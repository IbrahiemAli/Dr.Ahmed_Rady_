/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Scale } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface WhyLegalProps {
  lang: Language;
  config: TextConfig;
}

export default function WhyLegal({ lang, config }: WhyLegalProps) {
  const isRtl = lang === 'ar';

  const bgStyle = config?.why_legal_bg_image ? {
    backgroundImage: `url(${config.why_legal_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      id="why-legal"
      className="py-24 bg-white relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.why_legal_bg_image && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      {/* Background large scales ornament acting as a faded watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <Scale className="w-[500px] h-[500px] text-[#051f20]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          {/* Section Indicator icon */}
          <div className="bg-[#daf1de] p-3 rounded-full text-[#235347] mb-4">
            <Scale className="h-6 w-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 mb-2">
            {t(config, 'why_legal_title', lang)}
          </h2>
          
          <p className="text-[#235347] font-sans font-extrabold text-lg sm:text-xl tracking-tight mb-8">
            {t(config, 'why_legal_subtitle', lang)}
          </p>

          {/* Golden/Green Frame Card holding the quote with elegant punctuation marks */}
          <div className="max-w-4xl px-8 py-10 sm:px-12 sm:py-14 bg-gradient-to-br from-[#daf1de]/20 via-white to-[#daf1de]/10 border border-[#8eb69b]/40 rounded-3xl shadow-sm relative">
            
            {/* Elegant Quotation Marks decors */}
            <span className="absolute top-4 right-6 text-7xl text-[#8eb69b]/35 font-serif select-none pointer-events-none">❝</span>
            <span className="absolute bottom-[-16px] left-6 text-7xl text-[#8eb69b]/35 font-serif select-none pointer-events-none">❞</span>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium relative z-10">
              {t(config, 'why_legal', lang)}
            </p>
          </div>

          {/* Small footer slogan under the block */}
          <div className="w-16 h-1 bg-[#8eb69b] rounded-full mt-10"></div>
        </div>
      </div>
    </section>
  );
}

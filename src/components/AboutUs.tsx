/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t, tArray } from '../utils/translation';

interface AboutUsProps {
  lang: Language;
  config: TextConfig;
}

export default function AboutUs({ lang, config }: AboutUsProps) {
  const isRtl = lang === 'ar';

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bulletPoints = tArray(config, 'about_bullets', lang);

  const bgStyle = config?.about_bg_image ? {
    backgroundImage: `url(${config.about_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      id="about"
      className="py-24 bg-white relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.about_bg_image && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Framed Graphic Frame Side */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background frame borders */}
            <div className="absolute top-[-10px] right-[-10px] w-full h-full border-4 border-[#daf1de] rounded-3xl -z-10 translate-x-3 translate-y-3"></div>
            
            <div className="relative w-full max-w-[360px] h-[400px] rounded-3xl overflow-hidden shadow-lg border border-[#8eb69b]/35">
              <img
                src={t(config, 'about_image', lang) || "/attached_image_0.png"}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600";
                }}
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
                alt="Dr. Ahmed Rady Certificate Frame"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#051f20]/90 via-[#051f20]/20 to-transparent flex items-end p-6">
                <span className="text-white font-sans font-black text-xl">
                  {t(config, 'logo_title', lang)}
                </span>
              </div>
            </div>

            {/* Glowing active credential count block */}
            <div className="absolute top-6 left-2 sm:left-[-15px] bg-[#235347] text-[#daf1de] px-4 py-3 rounded-2xl shadow-xl border border-white/15 scroll-smooth select-none transform rotate-[-4deg]">
              <span className="font-sans font-black text-2xl tracking-tighter">
                {t(config, 'stats_exp_num', lang)}
              </span>
              <p className="text-[10px] uppercase font-bold text-gray-200 mt-0.5">
                {isRtl ? 'من القيادة الأكاديمية' : 'of Academic Leadership'}
              </p>
            </div>
          </div>

          {/* Biographies Details Text Side */}
          <div className="lg:col-span-12 lg:col-start-7 flex flex-col items-start space-y-6 text-right">
            
            <div className="flex flex-col">
              <span className="text-[#235347] font-semibold text-xs tracking-widest uppercase font-mono bg-[#235347]/10 px-3 py-1 text-center rounded-full mb-3 self-start">
                {t(config, 'about_badge', lang)}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 leading-tight text-start">
                {t(config, 'about_title', lang)}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-semibold text-start">
              {t(config, 'about_bio', lang)}
            </p>

            {/* Academic Checkmarks List */}
            <div className="space-y-3 w-full pt-2">
              {bulletPoints.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3 text-start">
                  <div className="mt-1 flex-shrink-0 text-[#235347]">
                    <CheckCircle2 className="h-5 w-5 fill-[#daf1de] text-[#235347]" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 font-bold leading-normal">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Action */}
            <div className="pt-4 self-start">
              <button
                id="about-contact-btn"
                onClick={handleContactScroll}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-[#daf1de] hover:bg-[#235347] text-[#235347] hover:text-white font-bold text-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <span>{isRtl ? 'تواصل معي مباشرة' : 'Get in Touch Directly'}</span>
                {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

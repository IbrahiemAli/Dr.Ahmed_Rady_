/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ArrowRight, Play, BookOpen, Users, ShieldCheck, Award } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface HeroProps {
  lang: Language;
  config: TextConfig;
  onStartQuiz: () => void;
  onExploreCourses: () => void;
}

export default function Hero({ lang, config, onStartQuiz, onExploreCourses }: HeroProps) {
  const isRtl = lang === 'ar';

  const bgStyle = config?.hero_bg_image ? {
    backgroundImage: `url(${config.hero_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-16 flex items-center bg-[#FAF9F5] overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.hero_bg_image && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      {/* Decorative dot grid patterns on the sides */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
        <div 
          className={`absolute top-[25%] ${isRtl ? 'left-[4%] sm:left-[8%]' : 'right-[4%] sm:right-[8%]'} w-40 h-64`}
          style={{ 
            backgroundImage: 'radial-gradient(#b2c9bd 1.5px, transparent 1.5px)', 
            backgroundSize: '16px 16px' 
          }}
        />
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-[#8EB69B]/10 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Visual Block (Professor Portrait with Quote & Experience badge) */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1 mt-8 lg:mt-0">
            <div className="absolute inset-0 m-auto w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full bg-[#E8EFEA]/80 -z-10 animate-pulse duration-[12000ms]" />

            <div className="relative w-[300px] sm:w-[380px] h-[340px] sm:h-[430px] flex items-end justify-center rounded-b-full overflow-visible">
              <img
                id="dr-ahmed-hero-image"
                src={t(config, 'hero_image', lang) || "/attached_image_0.png"}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600";
                }}
                className="w-full h-auto object-cover max-h-[112%] z-10 drop-shadow-2xl transition-all duration-700 hover:scale-[1.01]"
                alt="Dr. Ahmed Rady"
                referrerPolicy="no-referrer"
              />
              
              <div 
                className={`absolute ${isRtl ? '-right-6 sm:-right-8' : '-left-6 sm:-left-8'} top-[40%] sm:top-[35%] z-20 bg-white shadow-xl hover:shadow-2xl rounded-full border border-slate-100 flex flex-col justify-center items-center w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 hover:scale-105 select-none`}
              >
                <div className="text-center font-sans">
                  <span className="block text-2xl sm:text-3xl font-black text-[#133F36] leading-none mb-1">
                    {t(config, 'stats_exp_num', lang)}
                  </span>
                  <span className="block text-[11px] sm:text-xs font-bold text-slate-500 leading-none mb-0.5">
                    {isRtl ? 'سنة' : 'Years'}
                  </span>
                  <span className="block text-[11px] sm:text-xs font-black text-[#133F36] leading-none">
                    {isRtl ? 'خبرة' : 'Exp.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Forest Green Quote Box */}
            <div className={`absolute -bottom-8 ${isRtl ? 'left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-[-15px]' : 'right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-[-15px]'} z-30 bg-[#113F36] text-white p-5 sm:p-6 rounded-[24px] shadow-xl border border-[#1d4c42] w-[290px] sm:w-[350px] transition-transform duration-300 hover:scale-[1.02]`}>
              <div className="text-3xl leading-none text-[#8EB69B]/40 font-serif mb-1 h-3 flex items-center">
                ❝
              </div>
              
              <p className="text-xs sm:text-[13px] leading-relaxed font-sans text-slate-100 font-medium text-justify">
                {isRtl 
                  ? 'أساعد المتخصصين في القانون على التواصل باللغة الإنجليزية بوضوح ودقة وثقة.'
                  : 'I empower legal professionals to master, articulate, and draft legal concepts with bulletproof clarity.'
                }
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-2">
                <span className="text-[11px] font-mono text-[#8EB69B] uppercase tracking-widest font-bold">
                  {isRtl ? 'مستشار ومحاضر معتمد' : 'Senior Instructor'}
                </span>
                <span className="text-xs sm:text-sm font-sans font-bold text-white italic tracking-wide">
                  {t(config, 'logo_title', lang)}
                </span>
              </div>
            </div>
          </div>

          {/* Text Content Block */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col items-start space-y-7 text-start order-1 lg:order-2">
            
            {/* Sub-badge / Pill wrapper */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4F1] border border-[#DCEBE6] shadow-sm select-none">
              <span className="text-xs font-extrabold text-[#113F36]">
                {t(config, 'hero_badge', lang)}
              </span>
              <div className="bg-[#113F36] p-1 rounded-full text-white flex items-center justify-center">
                <Award className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Giant Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5.5xl xl:text-6xl font-sans font-black text-slate-900 leading-[1.12] tracking-tight max-w-2xl select-none">
              {t(config, 'hero_title', lang)}
            </h1>

            {/* Descriptive content paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl select-none">
              {t(config, 'hero_desc', lang)}
            </p>

            {/* Double buttons CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-2">
              <button
                id="hero-explore-courses-cta"
                onClick={onExploreCourses}
                className="px-8 py-3.5 bg-[#113F36] hover:bg-[#184F45] text-white font-extrabold rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base select-none"
              >
                <span>{t(config, 'hero_btn_start', lang)}</span>
                {isRtl ? (
                  <ArrowLeft className="h-4.5 w-4.5" />
                ) : (
                  <ArrowRight className="h-4.5 w-4.5" />
                )}
              </button>

              <button
                id="hero-quiz-cta"
                onClick={onStartQuiz}
                className="px-8 py-3.5 border-2 border-slate-700 bg-white hover:bg-slate-50 text-slate-800 font-extrabold rounded-full transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base select-none"
              >
                <span>{t(config, 'hero_btn_test', lang)}</span>
                <div className="bg-slate-800 p-1.5 rounded-full text-white flex items-center justify-center scale-90">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
              </button>
            </div>

            {/* Three horizontal trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-slate-200/60 w-full mt-4 select-none">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="bg-[#EBF4F1] p-2 rounded-xl text-[#113F36]">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-black text-[#113F36]">
                  {isRtl ? 'أخصائي اللغة القانونية' : 'Legal Language Expert'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="bg-[#EBF4F1] p-2 rounded-xl text-[#113F36]">
                  <Users className="h-4.5 w-4.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-black text-[#113F36]">
                  {isRtl ? '١٥+ سنة خبرة علمية' : '15+ Years Pedigree'}
                </span>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="bg-[#EBF4F1] p-2 rounded-xl text-[#113F36]">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <span className="text-[11px] sm:text-xs font-black text-[#113F36]">
                  {isRtl ? 'موثوق من قبل المهنيين' : 'Trusted Internationally'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

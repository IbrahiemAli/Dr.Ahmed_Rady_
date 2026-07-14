/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, BookOpen, Award, MessageSquare } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface BenefitsProps {
  lang: Language;
  config: TextConfig;
}

export default function Benefits({ lang, config }: BenefitsProps) {
  const isRtl = lang === 'ar';

  const benefits = [
    {
      id: 'expert',
      title: t(config, 'benefit3_title', lang),
      desc: t(config, 'benefit3_desc', lang),
      icon: GraduationCap,
    },
    {
      id: 'content',
      title: t(config, 'benefit1_title', lang),
      desc: t(config, 'benefit1_desc', lang),
      icon: BookOpen,
    },
    {
      id: 'certs',
      title: t(config, 'benefit2_title', lang),
      desc: t(config, 'benefit2_desc', lang),
      icon: Award,
    },
    {
      id: 'support',
      title: isRtl ? 'دعم وتقييم مستمر للكتابة' : 'Continuous Drafting Appraisals',
      desc: isRtl 
        ? 'تلقى تغذية راجعة تقييمية ومراجعة لغوية دقيقة لصحف العقود التي تصوغها بنفسك طوال فترة التدريب.'
        : 'Receive direct redrafting appraisals and consistent support on your own assignments.',
      icon: MessageSquare,
    },
  ];

  const bgStyle = config?.benefits_bg_image ? {
    backgroundImage: `url(${config.benefits_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      id="features"
      className="py-24 bg-[#daf1de]/20 relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.benefits_bg_image && (
        <div className="absolute inset-0 bg-[#FAF9F5]/90 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#235347] font-semibold text-xs tracking-widest uppercase font-mono bg-[#235347]/10 px-3 py-1.5 rounded-full mb-3 inline-block">
            {t(config, 'benefits_title', lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 mt-2">
            {t(config, 'benefits_subtitle', lang)}
          </h2>
        </div>

        {/* Features Column Bento-grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                id={`feature-card-${b.id}`}
                key={b.id}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group hover:shadow-xl hover:border-[#8eb69b]/40 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Accent Top Border Left */}
                <div className="absolute top-0 right-8 left-8 h-1 bg-[#235347] opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>

                {/* Rounded Icon badge wrapper */}
                <div className="w-14 h-14 rounded-2xl bg-[#daf1de] text-[#235347] flex items-center justify-center mb-6 group-hover:bg-[#235347] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-sans font-extrabold text-lg text-gray-950 mb-3 group-hover:text-[#235347] transition-colors leading-tight text-start">
                  {b.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-semibold text-start">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

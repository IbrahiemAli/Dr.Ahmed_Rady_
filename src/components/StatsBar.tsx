/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, Award, BookOpen, Landmark } from 'lucide-react';
import { Language } from '../types';

interface StatsBarProps {
  lang: Language;
}

export default function StatsBar({ lang }: StatsBarProps) {
  const isRtl = lang === 'ar';

  const stats = [
    {
      id: 'students',
      count: '+٥٠٠',
      countEn: '+500',
      labelAr: 'طالب وطالبة قانون',
      labelEn: 'Registered Students',
      icon: Users,
    },
    {
      id: 'experience',
      count: '+٢٠',
      countEn: '+20',
      labelAr: 'سنة من الخبرة الأكاديمية',
      labelEn: 'Years in Academy & Practice',
      icon: Award,
    },
    {
      id: 'courses',
      count: '+١٥',
      countEn: '+15',
      labelAr: 'برنامجاً تدريبياً تخصصياً',
      labelEn: 'Professional Courses',
      icon: BookOpen,
    },
    {
      id: 'firms',
      count: '+٥٠',
      countEn: '+50',
      labelAr: 'مكتب محاماة ومؤسسة شريكة',
      labelEn: 'Corporate Law Partners',
      icon: Landmark,
    },
  ];

  return (
    <section
      className="py-12 bg-gradient-to-r from-[#051f20] to-[#0b2b26] text-white relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#8eb69b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                id={`stat-card-${stat.id}`}
                key={stat.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="p-3 bg-[#235347] rounded-full text-[#daf1de] mb-3 shadow-md">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-sans font-black text-3xl sm:text-4xl text-[#daf1de] leading-none mb-2">
                  {isRtl ? stat.count : stat.countEn}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-300 max-w-[120px]">
                  {isRtl ? stat.labelAr : stat.labelEn}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

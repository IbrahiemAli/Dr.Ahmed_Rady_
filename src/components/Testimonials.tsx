/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Star, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface TestimonialsProps {
  lang: Language;
  config?: any;
}

export default function Testimonials({ lang, config }: TestimonialsProps) {
  const isRtl = lang === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);

  const list = [
    {
      id: 1,
      nameAr: 'أ. يوسف العنزي',
      nameEn: 'Yousef Al-Anazi',
      titleAr: 'محامي شركات — الرياض',
      titleEn: 'Corporate Counsel — Riyadh',
      courseAr: 'برنامج صياغة العقود التجارية (المستوى ١)',
      courseEn: 'Commercial Contract Drafting (Level 1)',
      stars: 5,
      quoteAr: 'كانت لدي مشاكل في فهم المصطلحات اللاتينية والفرق اللفظي بين بنود العقد. الدورة غيرت نظرتي وتعاملي مع مستندات عدم الإفصاح والسرية، ولم أعد بحاجة للترجمة الخارجية لمراجعة البنود.',
      quoteEn: 'I struggled with Latin legal terms and fine-grained differences in contract boilerplate clauses. This syllabus changed how I read NDAs and confidentiality clauses. Highly recommended!'
    },
    {
      id: 2,
      nameAr: 'أ. فاطمة بو حمد',
      nameEn: 'Fatima Bu-Hamad',
      titleAr: 'مستشارة قانونية — الكويت',
      titleEn: 'Legal Consultant — Kuwait',
      courseAr: 'دورة مصطلحات التحكيم الدولي والمرافعة',
      courseEn: 'Arbitration Terminology & Oral Advocacy',
      stars: 5,
      quoteAr: 'برنامج تدريبي رصين جداً وممتع. فككنا شروط التحكيم التابعة للـ ICC وقمنا بتمثيل جلسة محاكاة Moot Court حقيقية ساعدتني كثيراً في المرافعة التنافسية بثقة أمام موكلينا الأجانب.',
      quoteEn: 'Extremely rigorous and enjoyable training. We analyzed ICC arbitration mandates and conducted a mock Moot Court which built my pleading confidence under foreign representation.'
    },
    {
      id: 3,
      nameAr: 'المستشار عبد الله الشريف',
      nameEn: 'Abdullah Al-Sharif',
      titleAr: 'عضو هيئة قضائية — القاهرة',
      titleEn: 'Judiciary Counsel — Cairo',
      courseAr: 'دبلوم الصياغة المتقدمة وإجراءات الشركات المعمقة',
      courseEn: 'Advanced Corporate Regulations & Drafting',
      stars: 5,
      quoteAr: 'كقاضٍ، أعتبر أن دراسة المصطلحات الأنجلو-أمريكية ضرورة لتفسير النية العقدية. أسلوب د. أحمد راضي متميز، يجمع البلاغة القانونية بالتدريب العملي الواقعي.',
      quoteEn: 'As a judge, analyzing Anglo-American terminology is essential for contractual intent interpretation. Dr. Ahmed’s teaching style blends authentic legal eloquence with practical case studies.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [list.length]);

  const bgStyle = config?.testimonials_bg_image ? {
    backgroundImage: `url(${config.testimonials_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      className="py-24 bg-[#daf1de]/15 border-t border-b border-[#daf1de]/30 relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.testimonials_bg_image && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="bg-[#235347]/10 p-3 rounded-full text-[#235347] mb-4 inline-block">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 leading-none">
            {isRtl ? 'ماذا يقول طلابنا وخريجونا؟' : 'What Our Students and Alum Say'}
          </h2>
          <p className="text-gray-500 font-medium text-sm sm:text-base mt-3">
            {isRtl
              ? 'شهادات حقيقية من محامين ومستشارين وقضاة اجتازوا برامجنا وعملوا في بيئة مهنية واعدة.'
              : 'Genuine feedback from active corporate attorneys, public prosecutors, and judges.'}
          </p>
        </div>

        {/* Carousel slide container */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12 py-12 bg-white border border-[#daf1de] rounded-[32px] shadow-sm select-none">
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Stars row */}
            <div className="flex items-center gap-1 text-amber-400">
              {Array.from({ length: list[activeIndex].stars }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>

            {/* Quote statement */}
            <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 leading-relaxed italic max-w-2xl px-6">
              " {isRtl ? list[activeIndex].quoteAr : list[activeIndex].quoteEn} "
            </p>

            {/* Profile badge details */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#235347] text-[#daf1de] font-sans font-black flex items-center justify-center text-lg shadow-sm border border-white/20 select-none mb-2">
                {list[activeIndex].nameEn.charAt(0)}
              </div>
              <span className="font-sans font-black text-gray-900 text-base leading-none">
                {isRtl ? list[activeIndex].nameAr : list[activeIndex].nameEn}
              </span>
              <span className="text-xs text-gray-400 font-bold mt-1 font-mono uppercase">
                {isRtl ? list[activeIndex].titleAr : list[activeIndex].titleEn}
              </span>
              <span className="text-xs text-[#235347] font-semibold bg-[#daf1de] px-2.5 py-1 rounded-full mt-2 inline-block">
                {isRtl ? list[activeIndex].courseAr : list[activeIndex].courseEn}
              </span>
            </div>

          </div>

          {/* Left / Right buttons */}
          <div className="flex items-center justify-between absolute inset-0 max-w-[95%] mx-auto pointer-events-none">
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1))}
              className="p-2 sm:p-3 bg-[#daf1de]/40 hover:bg-[#8eb69b]/80 text-[#235347] hover:text-white rounded-full transition-all pointer-events-auto"
              title="السابق"
            >
              <ArrowLeft className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % list.length)}
              className="p-2 sm:p-3 bg-[#daf1de]/40 hover:bg-[#8eb69b]/80 text-[#235347] hover:text-white rounded-full transition-all pointer-events-auto"
              title="التالي"
            >
              <ArrowRight className={`h-5 w-5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

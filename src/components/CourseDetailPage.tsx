/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, FileText, Award, Layers, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { Course, Language } from '../types';

interface CourseDetailPageProps {
  lang: Language;
  course: Course;
  onBack: () => void;
}

export default function CourseDetailPage({
  lang,
  course,
  onBack,
}: CourseDetailPageProps) {
  const isRtl = lang === 'ar';
  
  // Tab states
  const [activeTab, setActiveTab] = useState<'info' | 'syllabus'>('info');
  // Syllabus Accordion toggles
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(course.modules[0]?.id || null);

  const handleWhatsAppRedirect = () => {
    const message = isRtl
      ? `مرحباً د. أحمد راضي، أود الاستفسار والتسجيل في برنامج الدبلوم: ${course.title_ar}`
      : `Hello Dr. Ahmed Rady, I would like to register for the professional program: ${course.title_en}`;
    const whatsappUrl = `https://wa.me/966580095568?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative select-none animate-fade-in"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      
      {/* Back button */}
      <button
        id="course-detail-back-btn"
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-[#235347] font-bold text-xs sm:text-sm rounded-xl hover:bg-gray-100 transition-colors mb-8 cursor-pointer font-sans"
      >
        {isRtl ? <ArrowRight className="h-4.5 w-4.5" /> : <ArrowLeft className="h-4.5 w-4.5" />}
        <span>{isRtl ? 'العودة للدورات' : 'Back to Courses'}</span>
      </button>

      {/* Main Course Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Course Details & Syllabus (8/12 width) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Cover Image & Quick Specs banner */}
          <div className="relative h-[280px] sm:h-[380px] rounded-[32px] overflow-hidden bg-slate-100 shadow-sm border border-gray-150">
            <img
              className="w-full h-full object-cover"
              src={course.image}
              referrerPolicy="no-referrer"
              alt={course.title_ar}
            />
            {/* Dark visual vignette cover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-start">
              <span className="px-3 py-1 bg-[#daf1de] text-[#235347] font-black text-xs sm:text-sm rounded-full w-fit">
                {isRtl ? course.level_ar : course.level_en}
              </span>
              <h1 className="text-xl sm:text-3xl font-sans font-black text-white mt-3 leading-tight">
                {isRtl ? course.title_ar : course.title_en}
              </h1>
              <p className="text-gray-200 font-bold text-xs sm:text-sm mt-1 max-w-2xl">
                {isRtl ? course.subtitle_ar : course.subtitle_en}
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Details vs. Syllabus) */}
          <div className="border-b border-gray-200 flex gap-6 text-sm font-bold justify-start">
            <button
              id="tab-btn-info"
              onClick={() => setActiveTab('info')}
              className={`pb-3 border-b-2 transition-all cursor-pointer font-sans ${
                activeTab === 'info' ? 'border-[#235347] text-[#235347] font-black' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {isRtl ? 'تفاصيل المنهج التدريبي' : 'Program Syllabus Specs'}
            </button>
            <button
              id="tab-btn-syllabus"
              onClick={() => setActiveTab('syllabus')}
              className={`pb-3 border-b-2 transition-all cursor-pointer font-sans ${
                activeTab === 'syllabus' ? 'border-[#235347] text-[#235347] font-black' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {isRtl ? 'المحاضرات وجدول الدروس' : 'Lecture curriculum'}
            </button>
          </div>

          {/* Tab 1: Info */}
          {activeTab === 'info' && (
            <div className="space-y-6 text-start animate-fade-in">
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-sans font-black text-[#051f20]">
                  {isRtl ? 'نظرة عامة على المنهج التدريبي' : 'Academic Curriculum Syllabus'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed whitespace-pre-line font-sans">
                  {isRtl ? course.description_ar : course.description_en}
                </p>
              </div>

              {/* Course Specs Checklist Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t">
                {(isRtl ? course.specs_ar : course.specs_en).map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-bold font-sans">
                    <CheckCircle2 className="h-5 w-5 text-[#8eb69b] shrink-0 mt-0.5" />
                    <span className="leading-normal">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Syllabus Lectures */}
          {activeTab === 'syllabus' && (
            <div className="space-y-4 text-start animate-fade-in">
              {course.modules.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 border rounded-2xl">
                  <p className="text-gray-400 font-bold font-sans">{isRtl ? 'لم يتم تحميل جدول الحصص بعد.' : 'Curriculum lessons schedule pending.'}</p>
                </div>
              ) : (
                course.modules.map((mod) => {
                  const isExpanded = expandedModuleId === mod.id;
                  return (
                    <div key={mod.id} className="border border-gray-200 bg-white rounded-2xl overflow-hidden shadow-sm">
                      <button
                        onClick={() => setExpandedModuleId(isExpanded ? null : mod.id)}
                        className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100/60 transition-colors flex items-center justify-between text-start cursor-pointer"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-black tracking-wider text-[#235347] block font-mono">
                            {isRtl ? 'القسم الدراسي' : 'STUDY MODULE'}
                          </span>
                          <h4 className="font-sans font-black text-xs sm:text-sm text-[#051f20]">
                            {isRtl ? mod.title_ar : mod.title_en}
                          </h4>
                        </div>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>

                      {isExpanded && (
                        <div className="p-4 sm:p-6 border-t border-gray-100 space-y-3.5 bg-white animate-fade-in">
                          {mod.lessons.map((lesson) => (
                            <div key={lesson.id} className="flex items-center justify-between gap-4 p-3 bg-slate-50/50 hover:bg-[#daf1de]/10 rounded-xl transition-colors border border-dashed border-gray-200">
                              <div className="text-start space-y-0.5">
                                <h5 className="text-xs sm:text-sm font-sans font-black text-gray-950">
                                  {isRtl ? lesson.title_ar : lesson.title_en}
                                </h5>
                                <p className="text-[10px] text-gray-400 font-bold font-sans">
                                  {isRtl ? 'محاضرة مسجلة بالكامل وتفاعلية' : 'Interactive masterclass & assessment'}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.is_free && (
                                  <span className="px-2 py-0.5 bg-[#daf1de] text-[#235347] text-[10px] font-black rounded-md font-sans">
                                    {isRtl ? 'حرة ومتاحة' : 'Free Demo'}
                                  </span>
                                )}
                                <span className="text-xs text-gray-400 font-mono tracking-tight">{isRtl ? lesson.duration_ar : lesson.duration_en}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Right Column: Pricing & Purchase Sidebar (1/3 width) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 bg-[#daf1de]/10 border border-[#daf1de] p-6 rounded-[28px] space-y-6 text-start shadow-sm">
          <div className="space-y-1">
            <span className="text-gray-400 font-bold uppercase text-xs block tracking-wider font-mono">{isRtl ? 'رسوم الدورة التدريبية' : 'Full Program Fee'}</span>
            <div className="flex items-baseline gap-1 select-none">
              <span className="text-4xl font-sans font-black text-gray-900 font-mono">{course.price}</span>
              <span className="text-[#235347] font-sans font-black text-xl">$</span>
              <span className="text-xs text-gray-400 font-bold mx-2 block tracking-tight font-sans">/ {isRtl ? 'رسوم لمرة واحدة' : 'One-off fee'}</span>
            </div>
          </div>

          {/* CTA enrollment checkout buttons direct to WhatsApp */}
          <div className="w-full">
            <button
              id="buy-course-now-btn"
              onClick={handleWhatsAppRedirect}
              className="w-full text-center py-4 bg-[#235347] hover:bg-[#163832] text-white rounded-xl font-black text-sm sm:text-base shadow-md transition-all hover:scale-[1.03] block cursor-pointer font-sans"
            >
              {isRtl ? 'اشترك عبر الواتساب الآن 💬' : 'Buy & Enroll via WhatsApp 💬'}
            </button>
          </div>

          {/* Checklist included in this course */}
          <div className="space-y-3.5 pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-500 font-bold uppercase block tracking-wider font-mono">{isRtl ? 'ما تشتمل عليه الرسوم:' : 'This program includes:'}</span>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-bold font-sans">
              <Calendar className="h-4 w-4 text-[#8eb69b]" />
              <span>{isRtl ? course.duration_ar : course.duration_en}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-bold font-sans">
              <FileText className="h-4 w-4 text-[#8eb69b]" />
              <span>{course.lessons_count} {isRtl ? 'محاضرة تخصصية متكاملة' : 'Detailed lectures'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-bold font-sans">
              <Award className="h-4 w-4 text-[#8eb69b]" />
              <span>{isRtl ? 'تأهيل كامل لاجتياز اختبار TOLES' : 'TOLES Examination preparation'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-600 font-bold font-sans">
              <Layers className="h-4 w-4 text-[#8eb69b]" />
              <span>{isRtl ? 'تقييمات مراجعة وتعديلات أسبوعية دقيقة' : 'Bespoke redrafting appraisals'}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

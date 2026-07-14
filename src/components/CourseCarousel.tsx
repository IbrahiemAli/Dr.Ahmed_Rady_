/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Calendar, FileText, Bookmark } from 'lucide-react';
import { Course, Language } from '../types';

interface CourseCarouselProps {
  lang: Language;
  courses: Course[];
  onViewDetails: (id: string) => void;
  config?: any;
}

export default function CourseCarousel({ lang, courses, onViewDetails, config }: CourseCarouselProps) {
  const isRtl = lang === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (courses.length === 0) return;
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    } else {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % courses.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, courses.length]);

  if (courses.length === 0) return null;

  const bgStyle = config?.courses_bg_image ? {
    backgroundImage: `url(${config.courses_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      id="courses"
      className="py-24 bg-white relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.courses_bg_image && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      {/* Decorative floating dots and graphics */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-20">
        <div className="w-16 h-16 rounded-full border border-[#235347] animate-spin" style={{ animationDuration: '12s' }}></div>
      </div>
      <div className="absolute right-10 bottom-10 pointer-events-none opacity-20">
        <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#8eb69b] animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#235347] font-semibold text-xs tracking-widest uppercase font-mono bg-[#235347]/10 px-3 py-1.5 rounded-full mb-3 inline-block">
            {isRtl ? 'برامجنا الأكاديمية' : 'OUR TRAINING SYLLABUS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 mt-2">
            {isRtl ? 'دوراتنا التدريبية التخصصية' : 'Our Professional Courses'}
          </h2>
          <p className="text-gray-500 font-medium text-sm sm:text-base mt-3">
            {isRtl
              ? 'اختر الدورة المناسبة لمستواك واحتياجاتك المهنية وسجل في أحد مقاعد التدريب فوراً.'
              : 'Select the optimal program matching your technical level and career aspirations.'}
          </p>
        </div>

        {/* 3D Carousel container */}
        <div
          className="relative h-[550px] sm:h-[580px] flex items-center justify-center overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {courses.map((course, index) => {
            // Calculate relative index position
            let position = index - activeIndex;
            
            // Adjust position for circular behavior
            if (position < -1 && position < -Math.floor(courses.length / 2)) {
              position += courses.length;
            } else if (position > 1 && position > Math.floor(courses.length / 2)) {
              position -= courses.length;
            }

            const isActive = position === 0;
            const isPrev = position === -1;
            const isNext = position === 1;
            const isHidden = Math.abs(position) > 1;

            // Compute 3D Translation Styles with responsive spacing
            let translateOffset = 340; // Desktop spacing
            if (windowWidth < 640) {
              translateOffset = 160; // Mobile spacing
            } else if (windowWidth < 1024) {
              translateOffset = 250; // Tablet spacing
            }

            let transformStyle = '';
            let opacity = 0;
            let zIndex = 0;

            if (isActive) {
              transformStyle = 'scale(1.1) translate(0px, 0px) translateZ(0px)';
              opacity = 1;
              zIndex = 30;
            } else if (isPrev) {
              transformStyle = isRtl
                ? `scale(0.85) translate(${translateOffset}px, 0px) translateZ(-100px)`
                : `scale(0.85) translate(${-translateOffset}px, 0px) translateZ(-100px)`;
              opacity = 0.65;
              zIndex = 20;
            } else if (isNext) {
              transformStyle = isRtl
                ? `scale(0.85) translate(${-translateOffset}px, 0px) translateZ(-100px)`
                : `scale(0.85) translate(${translateOffset}px, 0px) translateZ(-100px)`;
              opacity = 0.65;
              zIndex = 20;
            } else {
              transformStyle = isRtl
                ? `scale(0.7) translate(${position * -(translateOffset + 100)}px, 0px) translateZ(-200px)`
                : `scale(0.7) translate(${position * (translateOffset + 100)}px, 0px) translateZ(-200px)`;
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div
                id={`carousel-slide-${course.id}`}
                key={course.id}
                className={`absolute w-full max-w-[340px] h-[480px] bg-white rounded-[24px] border border-[#8eb69b]/25 shadow-xl transition-all duration-700 ease-out flex flex-col justify-between overflow-hidden cursor-pointer ${
                  isHidden ? 'pointer-events-none' : ''
                }`}
                style={{
                  transform: transformStyle,
                  opacity: opacity,
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => {
                  if (isActive) {
                    onViewDetails(course.id);
                  } else {
                    setActiveIndex(index);
                  }
                }}
              >
                {/* Course top banner with elegant pricing and specs */}
                <div className="relative h-44 overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={course.image}
                    referrerPolicy="no-referrer"
                    alt={course.title_ar}
                  />
                  {/* Price Tag Overlay */}
                  <div className="absolute top-4 right-4 bg-[#235347] text-white px-3 py-1 text-sm font-black rounded-lg shadow-md font-mono">
                    {course.price} $
                  </div>
                  {/* Level Tag Overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 text-xs font-bold rounded-lg leading-none">
                    {isRtl ? course.level_ar : course.level_en}
                  </div>
                </div>

                {/* Course Core Details Body (Middle Centered) */}
                <div className="p-6 flex-1 flex flex-col justify-between items-center text-center">
                  <div className="space-y-2 select-none w-full flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#235347] flex items-center gap-1 justify-center">
                      <Bookmark className="h-3 w-3" />
                      {course.lessons_count} {isRtl ? 'درس مسجل وتفاعلي' : 'Lessons'}
                    </span>
                    <h3 className="text-base sm:text-lg font-sans font-black text-gray-950 line-clamp-2 text-center leading-snug w-full">
                      {isRtl ? course.title_ar : course.title_en}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold line-clamp-3 text-center w-full">
                      {isRtl ? course.subtitle_ar : course.subtitle_en}
                    </p>
                  </div>

                  {/* Icon Specs row (Middle Centered) */}
                  <div className="grid grid-cols-2 gap-2 py-4 border-t border-b border-gray-100 my-4 text-center w-full">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-500">
                      <Calendar className="h-4 w-4 text-[#8eb69b]" />
                      <span className="truncate">{isRtl ? course.duration_ar.split('—')[1] || course.duration_ar : course.duration_en.split('—')[1] || course.duration_en}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-500">
                      <FileText className="h-4 w-4 text-[#8eb69b]" />
                      <span className="truncate">{course.lessons_count} {isRtl ? 'محاضرة' : 'Lectures'}</span>
                    </div>
                  </div>

                  {/* Action Link button */}
                  <div className="w-full">
                    <button
                      id={`course-view-details-${course.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(course.id);
                      }}
                      className="w-full py-2.5 bg-[#daf1de] hover:bg-[#8eb69b] text-[#235347] hover:text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>{isRtl ? 'عرض تفاصيل الدورة' : 'View Course Specs'}</span>
                    </button>
                  </div>
                </div>

                {/* Subtle visual gradient bottom line */}
                <div className="h-1.5 bg-gradient-to-r from-[#235347] via-[#8eb69b] to-[#daf1de]"></div>
              </div>
            );
          })}
        </div>

        {/* Carousel Indicators / Dots (No arrows, no number text counter) */}
        <div className="flex items-center justify-center gap-2.5 mt-8 select-none">
          {courses.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-8 bg-[#235347]' 
                  : 'w-2.5 bg-[#8eb69b]/40 hover:bg-[#8eb69b]/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

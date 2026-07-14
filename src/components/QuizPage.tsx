/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronLeft, Award, ArrowRight, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Bookmark } from 'lucide-react';
import { Question, Language, Course, TextConfig } from '../types';
import { t } from '../utils/translation';

interface QuizPageProps {
  lang: Language;
  questions: Question[];
  courses: Course[];
  textConfig?: TextConfig | null;
  onSelectCourse: (id: string) => void;
  onBackHome: () => void;
}

export default function QuizPage({
  lang,
  questions,
  courses,
  textConfig,
  onSelectCourse,
  onBackHome,
}: QuizPageProps) {
  const isRtl = lang === 'ar';

  // Quiz flow states
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number | 'skipped'>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-28 text-center" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <p className="text-gray-400 font-bold">
          {t(textConfig || null, 'quiz_page_no_questions', lang)}
        </p>
        <button
          onClick={onBackHome}
          className="mt-4 px-4 py-2 bg-[#235347] text-white rounded-xl cursor-pointer"
        >
          {t(textConfig || null, 'quiz_page_no_questions_back', lang)}
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  const handleAnswerSelect = (optIndex: number) => {
    setSelectedAnswer(optIndex);
  };

  const handleNextStep = (isSkipping = false) => {
    const answerValue = isSkipping ? 'skipped' : (selectedAnswer !== null ? selectedAnswer : 'skipped');
    
    // Save answer
    setUserAnswers((prev) => ({
      ...prev,
      [currentStep]: answerValue,
    }));

    // Reset selection and step forward
    setSelectedAnswer(null);
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Compute final score
  const finalScore = questions.reduce((acc, q, idx) => {
    const ans = userAnswers[idx];
    return ans !== undefined && ans === q.correct_index ? acc + 1 : acc;
  }, 0);

  // Recommend a Course matching their test score percentages
  const getRecommendation = () => {
    const ratio = finalScore / questions.length;
    let recommendedCourse: Course;
    let levelLabelAr = '';
    let levelLabelEn = '';
    let descAr = '';
    let descEn = '';

    if (ratio >= 0.75) {
      const courseId = textConfig?.rec_course_high || 'course-3';
      recommendedCourse = courses.find((c) => c.id === courseId) || courses[0];
      levelLabelAr = t(textConfig || null, 'quiz_rec_high_level', 'ar');
      levelLabelEn = t(textConfig || null, 'quiz_rec_high_level', 'en');
      descAr = t(textConfig || null, 'quiz_rec_high_desc', 'ar');
      descEn = t(textConfig || null, 'quiz_rec_high_desc', 'en');
    } else if (ratio >= 0.4) {
      const courseId = textConfig?.rec_course_med || 'course-2';
      recommendedCourse = courses.find((c) => c.id === courseId) || courses[0];
      levelLabelAr = t(textConfig || null, 'quiz_rec_med_level', 'ar');
      levelLabelEn = t(textConfig || null, 'quiz_rec_med_level', 'en');
      descAr = t(textConfig || null, 'quiz_rec_med_desc', 'ar');
      descEn = t(textConfig || null, 'quiz_rec_med_desc', 'en');
    } else {
      const courseId = textConfig?.rec_course_low || 'course-1';
      recommendedCourse = courses.find((c) => c.id === courseId) || courses[0];
      levelLabelAr = t(textConfig || null, 'quiz_rec_low_level', 'ar');
      levelLabelEn = t(textConfig || null, 'quiz_rec_low_level', 'en');
      descAr = t(textConfig || null, 'quiz_rec_low_desc', 'ar');
      descEn = t(textConfig || null, 'quiz_rec_low_desc', 'en');
    }

    return {
      levelAr: levelLabelAr,
      levelEn: levelLabelEn,
      course: recommendedCourse,
      descAr,
      descEn,
    };
  };

  const recommendation = getRecommendation();

  // Reset quiz
  const handleResetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setQuizFinished(false);
  };

  // Score Screen Block layout
  if (quizFinished) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 py-24 relative select-none text-center space-y-10 animate-fade-in animate-duration-300"
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        {/* Recommendation Level block at the top of the page */}
        <div className="bg-gradient-to-br from-[#daf1de]/40 via-white to-slate-50 border-2 border-[#235347]/20 p-6 sm:p-8 rounded-[32px] text-start shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-black text-[#235347] uppercase tracking-wider block font-mono">
                🎯 {t(textConfig || null, 'quiz_result_label', lang)}
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-gray-950 mt-1">
                {isRtl ? recommendation.levelAr : recommendation.levelEn}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[#daf1de] px-4 py-2 rounded-2xl text-[#235347] font-black font-mono shadow-inner text-sm sm:text-base">
                {t(textConfig || null, 'quiz_result_score_label', lang)} {finalScore} / {questions.length}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 font-semibold leading-relaxed font-sans">
            {isRtl ? recommendation.descAr : recommendation.descEn}
          </p>

          {recommendation.course && (
            <div className="pt-5 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 mt-4">
              <div className="text-start space-y-1 w-full sm:w-auto">
                <span className="text-xs text-gray-400 font-bold block">
                  📘 {t(textConfig || null, 'quiz_result_rec_syllabus', lang)}
                </span>
                <p className="font-sans font-black text-base sm:text-lg text-gray-950">
                  {isRtl ? recommendation.course.title_ar : recommendation.course.title_en}
                </p>
              </div>
              <button
                id="recommendation-enroll-btn"
                onClick={() => onSelectCourse(recommendation.course.id)}
                className="px-6 py-3.5 bg-[#235347] hover:bg-[#163832] text-white text-xs sm:text-sm font-black rounded-xl transition-all hover:scale-105 shadow-md block cursor-pointer w-full sm:w-auto text-center font-sans"
              >
                {t(textConfig || null, 'quiz_result_rec_btn', lang)}
              </button>
            </div>
          )}
        </div>

        {/* Detailed Questions & Answers Review Section */}
        <div className="space-y-6 text-start">
          <div className="border-b pb-3">
            <h3 className="text-xl font-sans font-black text-[#051f20]">
              📊 {t(textConfig || null, 'quiz_result_review_title', lang)}
            </h3>
            <p className="text-xs text-gray-400 font-semibold mt-1">
              {t(textConfig || null, 'quiz_result_review_desc', lang)}
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const uAns = userAnswers[idx];
              const isCorrect = uAns !== undefined && uAns === q.correct_index;

              return (
                <div key={q.id || idx} className="bg-white border border-slate-200/80 rounded-[24px] p-5 sm:p-6 space-y-4 shadow-sm hover:border-[#8eb69b]/40 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-sans font-black text-gray-950 text-sm sm:text-base leading-relaxed flex-1">
                      <span className="font-mono text-xs text-[#235347] ml-1 shrink-0">[{idx + 1}]</span>
                      {isRtl ? q.text_ar : q.text_en}
                    </h4>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black shrink-0 ${
                      isCorrect
                        ? 'bg-green-100 text-green-800'
                        : uAns === 'skipped'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect
                        ? (isRtl ? 'صحيحة' : 'Correct')
                        : uAns === 'skipped'
                          ? (isRtl ? 'تم التخطّي' : 'Skipped')
                          : (isRtl ? 'خاطئة' : 'Incorrect')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(isRtl ? q.options_ar : q.options_en).map((opt, oIdx) => {
                      const isChosen = uAns === oIdx;
                      const isModelAns = q.correct_index === oIdx;

                      let optStyle = 'border-slate-100 bg-slate-50/50 text-slate-700';
                      if (isChosen) {
                        optStyle = isModelAns
                          ? 'border-green-300 bg-green-50 text-green-900 font-black shadow-inner'
                          : 'border-rose-300 bg-rose-50 text-rose-900 font-black shadow-inner';
                      } else if (isModelAns) {
                        optStyle = 'border-green-200 bg-green-50/20 text-green-800 font-semibold';
                      }

                      return (
                        <div key={oIdx} className={`px-4 py-3 border rounded-xl text-xs sm:text-sm ${optStyle} flex justify-between items-center`}>
                          <span className="leading-normal">{opt}</span>
                          {isChosen && isModelAns && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-green-200 text-green-950 font-black rounded">
                              {isRtl ? 'اختيارك الصائب' : 'Your Correct Choice'}
                            </span>
                          )}
                          {isChosen && !isModelAns && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-rose-200 text-rose-950 font-black rounded">
                              {isRtl ? 'اختيارك' : 'Your Choice'}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action controls footer */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={handleResetQuiz}
            className="w-full sm:w-auto px-6 py-3 bg-white border border-[#235347]/30 hover:bg-slate-50 text-[#235347] font-black text-xs rounded-xl cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1.5 font-sans"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t(textConfig || null, 'quiz_result_retake_btn', lang)}</span>
          </button>
          
          <button
            onClick={onBackHome}
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl cursor-pointer font-sans"
          >
            {t(textConfig || null, 'quiz_result_home_btn', lang)}
          </button>
        </div>

      </div>
    );
  }

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-28 relative select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Back button */}
      <button
        onClick={onBackHome}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 text-[#235347] font-bold text-xs sm:text-sm rounded-xl hover:bg-gray-100 transition-colors mb-8 cursor-pointer font-sans"
      >
        {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
        <span>{t(textConfig || null, 'quiz_page_cancel', lang)}</span>
      </button>

      {/* Progress indicators */}
      <div className="space-y-2 mb-8">
        <div className="flex justify-between items-center text-xs font-bold text-gray-500">
          <span>
            {t(textConfig || null, 'quiz_page_question_label', lang)} {currentStep + 1} {isRtl ? 'من أصل' : 'of'} {questions.length}
          </span>
          <span className="font-mono">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        {/* Real progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#235347] transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Question console */}
      <div className="bg-white border border-[#daf1de] rounded-[32px] p-6 sm:p-10 shadow-sm text-start space-y-6">
        <div className="flex items-start gap-3.5">
          <div className="mt-1 flex-shrink-0 text-[#235347] bg-[#daf1de] p-2 rounded-xl">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-sans font-black text-gray-950 leading-relaxed">
            {isRtl ? currentQuestion.text_ar : currentQuestion.text_en}
          </h2>
        </div>

        {/* Options list selection */}
        <div className="space-y-3.5">
          {(isRtl ? currentQuestion.options_ar : currentQuestion.options_en).map((opt, i) => {
            const isSelected = selectedAnswer === i;

            // Compute styling dynamically (No instant feedback correct/incorrect)
            let optionStyles = 'border-gray-200 hover:border-[#8eb69b] hover:bg-slate-50/50';
            
            if (isSelected) {
              optionStyles = 'border-[#235347] bg-[#daf1de]/15 text-[#051f20] font-black shadow-sm';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswerSelect(i)}
                className={`w-full px-5 py-4 border rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between text-start cursor-pointer ${optionStyles}`}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Submit or Skip Button trigger */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          {/* Skip question button */}
          <button
            onClick={() => handleNextStep(true)}
            className="px-5 py-3 border border-slate-200 text-gray-500 hover:text-gray-700 hover:bg-slate-50 hover:border-slate-300 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-sans"
          >
            {t(textConfig || null, 'quiz_page_skip', lang)}
          </button>
          
          {/* Submit answer / Next Button */}
          <button
            onClick={() => handleNextStep(false)}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-[#235347] hover:bg-[#163832] disabled:bg-gray-200 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed font-sans"
          >
            <span>
              {currentStep === questions.length - 1 
                ? t(textConfig || null, 'quiz_page_finish', lang) 
                : t(textConfig || null, 'quiz_page_submit', lang)}
            </span>
            {isRtl ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Eye, Clock, ArrowRight, ArrowLeft, Download, ExternalLink, X, Loader2 } from 'lucide-react';
import { BlogPost, Language } from '../types';

interface BlogPageProps {
  lang: Language;
  blogs: BlogPost[];
  onLeadSubmitted?: () => void;
}

export default function BlogPage({ lang, blogs, onLeadSubmitted }: BlogPageProps) {
  const isRtl = lang === 'ar';
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Lead Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalPost, setModalPost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone || !jobTitle || !modalPost) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blog_id: modalPost.id,
          email,
          phone,
          job_title: jobTitle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register lead');
      }

      if (onLeadSubmitted) {
        onLeadSubmitted();
      }

      // Close modal
      setShowModal(false);
      // Reset fields
      setEmail('');
      setPhone('');
      setJobTitle('');

      // Trigger download or redirect
      if (modalPost.button_type === 'link' && modalPost.button_link) {
        window.open(modalPost.button_link, '_blank');
      } else if (modalPost.button_type === 'file' && modalPost.button_file_url) {
        // Create an anchor and click it to download the file directly
        const a = document.createElement('a');
        a.href = modalPost.button_file_url;
        a.download = modalPost.button_file_name || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error(err);
      alert(isRtl ? 'حدث خطأ أثناء معالجة الطلب، يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filter out unpublished draft news for public view
  const visibleBlogs = blogs.filter(b => b.is_published);

  if (selectedPost) {
    return (
      <>
        <div
          className="max-w-4xl mx-auto px-4 py-28 relative select-none animate-fade-in animate-duration-300"
          style={{ direction: isRtl ? 'rtl' : 'ltr' }}
        >
        {/* Back to Blog buttons */}
        <button
          onClick={() => setSelectedPost(null)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 text-[#235347] font-bold text-xs sm:text-sm rounded-xl hover:bg-gray-100 transition-colors mb-8 cursor-pointer"
        >
          {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          <span>{isRtl ? 'العودة إلى المدونة والدروس' : 'Back to Blog'}</span>
        </button>

        {/* Detailed BlogPost Article layout */}
        <article className="space-y-6 text-start">
          <div className="space-y-3">
            <span className="text-[#235347] font-semibold text-xs tracking-wider uppercase bg-[#daf1de] px-2.5 py-1 rounded-full font-mono">
              {isRtl ? 'مقالات قانونية تخصصية' : 'ACADEMIC ARTICLE'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 leading-snug">
              {isRtl ? selectedPost.title_ar : selectedPost.title_en}
            </h1>
            
            {/* Meta tags */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 py-2 border-b border-gray-100">
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-[#8eb69b]" />{selectedPost.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-[#8eb69b]" />{isRtl ? selectedPost.reading_time_ar : selectedPost.reading_time_en}</span>
              <span className="flex items-center gap-1"><Eye className="h-4 w-4 text-[#8eb69b]" />{selectedPost.views + 1} {isRtl ? 'مشاهدة' : 'Views'}</span>
            </div>
          </div>

          {/* Banner cover frame */}
          <div className="w-full h-64 sm:h-[400px] border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
            <img className="w-full h-full object-cover" src={selectedPost.image} alt={selectedPost.title_ar} />
          </div>

          {/* Rich Content paragraphs */}
          <div className="text-gray-800 text-sm sm:text-base font-semibold leading-relaxed space-y-4 pt-4 whitespace-pre-line">
            {isRtl ? selectedPost.content_ar : selectedPost.content_en}
          </div>

          {/* Action button if has_button is enabled */}
          {selectedPost.has_button && (
            <div className="py-6 border-t border-b border-gray-100 flex flex-col sm:flex-row items-center gap-4 justify-between bg-[#daf1de]/10 p-6 rounded-3xl mt-6">
              <div className="text-start space-y-1">
                <h4 className="text-sm font-sans font-black text-gray-900">
                  {isRtl ? 'مستند علمي مرفق بهذا المقال' : 'Associated Scientific Document'}
                </h4>
                <p className="text-xs text-gray-400 font-bold">
                  {isRtl
                    ? 'انقر لتنزيل الملف أو الانتقال للرابط المرفق فور ملء بيانات المستلم.'
                    : 'Submit recipient info to instantly trigger the download or access the link.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setModalPost(selectedPost);
                  setShowModal(true);
                }}
                className="w-full sm:w-auto px-8 py-4 bg-[#235347] hover:bg-[#163832] text-[#daf1de] font-bold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2.5 justify-center cursor-pointer transform hover:-translate-y-0.5"
              >
                {selectedPost.button_type === 'file' ? (
                  <Download className="h-4 w-4" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                <span>
                  {isRtl
                    ? (selectedPost.button_text_ar || 'تحميل المرفق العلمي')
                    : (selectedPost.button_text_en || 'Download Document')
                  }
                </span>
              </button>
            </div>
          )}

          {/* Dr Ahmed credits footnote */}
          <div className="mt-12 p-6 border border-[#daf1de] bg-[#daf1de]/10 rounded-2xl flex items-center gap-4 text-start">
            <div className="w-12 h-12 rounded-full bg-[#235347] font-sans font-extrabold text-[#daf1de] flex items-center justify-center text-lg">
              AR
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm sm:text-base">{isRtl ? 'بقلم: أ. د. أحمد راضي' : 'Authored by: Dr. Ahmed Rady'}</p>
              <p className="text-xs text-gray-400 font-semibold">{isRtl ? 'مستشار ومدرس لغة إنجليزية قانونية متخصص.' : 'Senior consultant, arbitration mentor and TOLES credential trainer.'}</p>
            </div>
          </div>

        </article>
      </div>

      {/* Lead Collection Modal Popup - Rendered outside animated container to prevent fixed context scrolling bugs */}
      {showModal && modalPost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative border border-slate-100 animate-fade-in text-start"
            style={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            <button
              onClick={() => {
                setShowModal(false);
                setModalPost(null);
              }}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-2">
              <h3 className="text-lg font-sans font-black text-gray-900 leading-snug">
                {isRtl ? 'يرجى تسجيل بياناتك لإتمام التنزيل' : 'Register recipient information'}
              </h3>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isRtl ? 'البريد الإلكتروني (مطلوب)' : 'Email Address (Required)'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@firm.com"
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] focus:border-[#235347]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isRtl ? 'رقم الهاتف / الواتساب (مطلوب)' : 'Phone / WhatsApp Number (Required)'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 123 45678"
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] focus:border-[#235347] text-start"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {isRtl ? 'المسمى الوظيفي / التخصص (مطلوب)' : 'Job Title / Specialization (Required)'}
                </label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder={isRtl ? 'مثال: محامٍ، مستشار قانوني، طالب قانون' : 'e.g. Attorney, Legal Advisor, Law Scholar'}
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] focus:border-[#235347]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#235347] hover:bg-[#163832] disabled:bg-slate-400 text-[#daf1de] font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{isRtl ? 'جاري التحقق والتنزيل...' : 'Processing asset download...'}</span>
                    </>
                  ) : (
                    <>
                      {modalPost.button_type === 'file' ? (
                        <Download className="h-4 w-4" />
                      ) : (
                        <ExternalLink className="h-4 w-4" />
                      )}
                      <span>
                        {isRtl ? 'تأكيد التسجيل وتنزيل الملف الآن' : 'Confirm Registration & Access Asset'}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-28 relative select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-[#235347] font-semibold text-xs tracking-widest uppercase font-mono bg-[#235347]/10 px-3 py-1.5 rounded-full inline-block">
          {isRtl ? 'مدونة الإنجليزية القانونية' : 'ACADEMIC INSIGHT BLOG'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 leading-none">
          {isRtl ? 'تعلَم مجاناً من خبير القانون واللغة' : 'Free Expert Legal English Briefs'}
        </h1>
        <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed">
          {isRtl
            ? 'شروحات مبسطة أسبوعية للمصطلحات اللاتينية والإنجليزية، وأخطاء الصياغة الشائعة التي يقع فيها المبرمون.'
            : 'Fascinating analyses deconstructing archaic legalese structure, drafting loops, and contract patterns.'}
        </p>
      </div>

      {visibleBlogs.length === 0 ? (
        <div className="text-center py-20 text-gray-400 font-bold border border-dashed text-sm border-gray-300 rounded-3xl">
          {isRtl ? 'لا توجد تدوينات ومواد منشورة حالياً، يرجى تداول لوحة التحكم.' : 'No articles published yet. Consult admin page.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBlogs.map((blog) => (
            <div
              id={`blog-card-${blog.id}`}
              key={blog.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#8eb69b]/35 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Picture frame */}
              <div className="h-44 overflow-hidden relative bg-gray-50">
                <img className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src={blog.image} alt={blog.title_ar} />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-lg text-gray-500 font-mono">
                  {blog.date}
                </div>
              </div>

              {/* Title & summary */}
              <div className="p-6 flex-1 flex flex-col justify-between text-start">
                <div className="space-y-3">
                  <h3 className="line-clamp-2 text-base sm:text-lg font-sans font-black text-gray-900 hover:text-[#235347] transition-colors leading-snug cursor-pointer" onClick={() => setSelectedPost(blog)}>
                    {isRtl ? blog.title_ar : blog.title_en}
                  </h3>
                  <p className="line-clamp-3 text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed">
                    {isRtl ? blog.summary_ar : blog.summary_en}
                  </p>
                </div>

                {/* Foot indicators */}
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mt-6 pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#8eb69b]" />{isRtl ? blog.reading_time_ar : blog.reading_time_en}</span>
                  
                  <button
                    onClick={() => setSelectedPost(blog)}
                    className="inline-flex items-center gap-1 text-[#235347] hover:underline hover:text-[#0b2b26] cursor-pointer"
                  >
                    <span>{isRtl ? 'اقرأ المقال كاملاً' : 'Read Article'}</span>
                    {isRtl ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface ContactUsProps {
  lang: Language;
  config: TextConfig;
}

export default function ContactUs({ lang, config }: ContactUsProps) {
  const isRtl = lang === 'ar';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subjects = isRtl
    ? [
        { value: 'enroll', label: 'الاستفسار عن حجز مقعد بدورة' },
        { value: 'corporate', label: 'طلبات تدريب خاصة للشركات والمكاتب' },
        { value: 'academic', label: 'مناقشة أو استفسار أكاديمي' },
        { value: 'support', label: 'دعم فني وبوابات الطلاب' },
      ]
    : [
        { value: 'enroll', label: 'Inquire about enrolling in a course' },
        { value: 'corporate', label: 'Custom legal executive training' },
        { value: 'academic', label: 'Academic assistance & TOLES query' },
        { value: 'support', label: 'Technical assistance with dashboard' },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) return;
    
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const bgStyle = config?.contact_bg_image ? {
    backgroundImage: `url(${config.contact_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <section
      id="contact"
      className="py-24 bg-white relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.contact_bg_image && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#235347] font-semibold text-xs tracking-widest uppercase font-mono bg-[#235347]/10 px-3 py-1.5 rounded-full mb-3 inline-block">
            {isRtl ? 'قنوات التواصل المباشر' : 'CONTACT US DIRECTLY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black text-gray-900 mt-2">
            {t(config, 'contact_title', lang)}
          </h2>
          <p className="text-gray-500 font-medium text-sm sm:text-base mt-3">
            {t(config, 'contact_subtitle', lang)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Inquiry Contact Form */}
          <div className="lg:col-span-7 bg-[#daf1de]/15 border border-[#daf1de] rounded-3xl p-6 sm:p-10 shadow-sm relative">
            <h3 className="text-xl font-bold font-sans text-[#051f20] mb-6 text-start">
              {isRtl ? 'أرسل رسالة مبسطة للمراجعة والرد' : 'Send an Inquiry Slip'}
            </h3>

            {success && (
              <div id="contact-success-banner" className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 text-green-800 text-xs sm:text-sm font-bold text-center">
                {isRtl
                  ? '✓ تم إرسال رسالتك بنجاح! سيتم التواصل معك قريباً للغاية عبر بريدك الإلكتروني.'
                  : '✓ Slip sent! Dr. Ahmed or his supportive staff will follow up via email shortly.'}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-start">
                    {t(config, 'contact_name_lbl', lang)}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#235347] font-semibold text-gray-800"
                    placeholder={isRtl ? 'أ. أحمد علي' : 'Attorney Name'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-start">
                    {t(config, 'contact_email_lbl', lang)}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#235347] font-semibold text-gray-800"
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-start">
                    {t(config, 'contact_phone_lbl', lang)}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#235347] font-semibold text-gray-800"
                    placeholder="+20 100 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 text-start">
                    {t(config, 'contact_subj_lbl', lang)}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#235347] font-bold text-gray-700"
                  >
                    <option value="">{isRtl ? 'اختر موضوعاً...' : 'Select subject...'}</option>
                    {subjects.map((sub) => (
                      <option key={sub.value} value={sub.label}>
                        {sub.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 text-start">
                  {t(config, 'contact_msg_lbl', lang)}
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#235347] font-mono text-gray-800"
                  placeholder={isRtl ? 'اكتب تساؤلك هنا بالتفصيل...' : 'Type your detailed inquiry parameters...'}
                />
              </div>

              <div className="pt-2 text-start">
                <button
                  id="submit-contact-form-btn"
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3.5 bg-[#235347] hover:bg-[#163832] disabled:bg-gray-400 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer w-full sm:w-auto"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{isRtl ? 'جاري إرسال الرسالة...' : 'Shipping transmission...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{t(config, 'contact_btn_send', lang)}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Physical Addresses, Phone & Map widgets */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="grid grid-cols-1 gap-4">
              
              <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm text-start">
                <div className="p-3 bg-[#daf1de] text-[#235347] rounded-xl flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block tracking-wider">{isRtl ? 'البريد الإلكتروني المهني' : 'E-Mail address'}</span>
                  <p className="text-sm sm:text-base font-bold text-[#051f20] break-all">{t(config, 'contact_info_email', lang)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm text-start">
                <div className="p-3 bg-[#daf1de] text-[#235347] rounded-xl flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block tracking-wider">{isRtl ? 'رقم الاتصال والـ WhatsApp' : 'Direct Line Call / WhatsApp'}</span>
                  <a href={`https://wa.me/${t(config, 'contact_info_phone', lang).replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base font-bold text-[#235347] hover:underline block break-all">
                    {t(config, 'contact_info_phone', lang)}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-gray-50 border border-gray-100 p-5 rounded-2xl shadow-sm text-start">
                <div className="p-3 bg-[#daf1de] text-[#235347] rounded-xl flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block tracking-wider">{isRtl ? 'الموقع الفعلي للمكتب' : 'Accredited Board Office'}</span>
                  <p className="text-sm font-bold text-[#051f20] leading-snug">
                    {t(config, 'contact_info_loc', lang)}
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated Google Maps layout embed card */}
            <div className="relative h-44 sm:h-52 bg-slate-100 border border-gray-200 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-center items-center p-6 text-center select-none">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] bg-sky-200"></div>
              
              <div className="relative z-10 space-y-2">
                <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                  <MapPin className="h-5 w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-sans font-black text-gray-800">
                  {t(config, 'contact_info_title', lang)}
                </h4>
                <p className="text-[10px] text-gray-500 font-bold">
                  {t(config, 'contact_info_hours', lang)}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

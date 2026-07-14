/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Scale, MessageSquare, MapPin } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface FooterProps {
  lang: Language;
  config: TextConfig;
  onSetView: (view: string) => void;
}

export default function Footer({ lang, config, onSetView }: FooterProps) {
  const isRtl = lang === 'ar';
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubscribed(true);
    setNewsEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleLinkClick = (id: string) => {
    if (id === 'blog') {
      onSetView('blog');
    } else if (id === 'test-yourself') {
      onSetView('quiz');
    } else {
      onSetView('home');
      setTimeout(() => {
        const item = document.getElementById(id);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const bgStyle = config?.footer_bg_image ? {
    backgroundImage: `url(${config.footer_bg_image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <footer
      className="bg-[#051f20] text-gray-300 border-t-2 border-[#8eb69b]/30 py-16 relative overflow-hidden select-none"
      style={{ direction: isRtl ? 'rtl' : 'ltr', ...bgStyle }}
    >
      {config?.footer_bg_image && (
        <div className="absolute inset-0 bg-[#051f20]/90 backdrop-blur-[1px] pointer-events-none z-0" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo & Vision */}
          <div className="space-y-4 text-start">
            <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onSetView('home')}>
              <div className="bg-[#235347] p-2 rounded-xl text-[#daf1de] border border-[#daf1de]/10 shadow-md">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-sans font-black text-xl text-white">
                {t(config, 'logo_title', lang)}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
              {isRtl
                ? 'المنصة الأكاديمية الرائدة والمتخصصة في صياغة العقود التجارية الدولية وتأهيل المحامين لاجتياز اختبارات TOLES وتصدر المحافل الدولية.'
                : 'Premier legal academy specialized in drafting commercial agreements and equipping scholars to conquer global TOLES milestones.'}
            </p>

            <div className="flex gap-3 pt-2">
              <a href={`https://wa.me/${t(config, 'contact_info_phone', lang).replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#235347] hover:bg-[#8eb69b] hover:text-white transition-all text-[#daf1de]" title="WhatsApp Chat">
                💬
              </a>
              <a href={`mailto:${t(config, 'contact_info_email', lang)}`} className="p-2 rounded-xl bg-[#235347] hover:bg-[#8eb69b] hover:text-white transition-all text-[#daf1de]" title="Email Message">
                📧
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="text-start">
            <h4 className="text-sm font-black uppercase text-white tracking-widest font-mono border-b border-white/5 pb-3 mb-4">
              {isRtl ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <button onClick={() => handleLinkClick('home')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_home', lang)}</button>
              <button onClick={() => handleLinkClick('why-legal')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_why_legal', lang)}</button>
              <button onClick={() => handleLinkClick('features')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_why_us', lang)}</button>
              <button onClick={() => handleLinkClick('courses')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_courses', lang)}</button>
              <button onClick={() => handleLinkClick('about')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_about', lang)}</button>
              <button onClick={() => handleLinkClick('blog')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_blog', lang)}</button>
              <button onClick={() => handleLinkClick('test-yourself')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_test', lang)}</button>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-[#daf1de] transition-colors py-1 cursor-pointer block text-start">{t(config, 'nav_contact', lang)}</button>
            </div>
          </div>

          {/* Column 3: Contact coordinates */}
          <div className="space-y-3 text-start text-xs sm:text-sm">
            <h4 className="text-sm font-black uppercase text-white tracking-widest font-mono border-b border-white/5 pb-3 mb-4">
              {isRtl ? 'معلومات التواصل' : 'Academy Coordinates'}
            </h4>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#8eb69b] flex-shrink-0" />
              <span className="truncate">{t(config, 'contact_info_email', lang)}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageSquare className="h-4 w-4 text-[#8eb69b] flex-shrink-0" />
              <span>{t(config, 'contact_info_phone', lang)}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[#8eb69b] flex-shrink-0" />
              <span className="leading-snug">{t(config, 'contact_info_loc', lang)}</span>
            </div>
          </div>

          {/* Column 4: Newsletter sign-up */}
          <div className="space-y-4 text-start">
            <h4 className="text-sm font-black uppercase text-white tracking-widest font-mono border-b border-white/5 pb-3 mb-4">
              {isRtl ? 'النشرة البريدية المتخصصة' : 'Legal Newsletter'}
            </h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              {isRtl
                ? 'اشترك لتبدأ في تلقي شروحات أسبوعية مبسطة للمصطلحات القانونية بالإنجليزية مباشرة في بريدك.'
                : 'Subscribe to receive free weekly analytical redrafts and terminology review briefs.'}
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-1.5 pt-1">
              <input
                type="email"
                required
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                placeholder="example@mail.com"
                className="px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#8eb69b] w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#235347] hover:bg-[#8eb69b] text-[#daf1de] hover:text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex-shrink-0"
              >
                {isRtl ? 'سجل' : 'Join'}
              </button>
            </form>

            {subscribed && (
              <span id="footer-newsletter-toast" className="block text-[10px] font-black text-green-400 animate-pulse mt-1">
                {isRtl ? '✓ تم تنظيمك إلى قائمتنا البريدية الاستشارية!' : '✓ Subscribed to weekly legal brief database!'}
              </span>
            )}
          </div>

        </div>

        {/* Closing lower copyrights bar info */}
        <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-500 font-semibold flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {t(config, 'logo_title', lang)}. {isRtl ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'}</p>
          <div className="flex gap-4 text-[10px] font-bold">
            <button onClick={() => onSetView('home')} className="hover:underline">{isRtl ? 'الشروط والأحكام' : 'Terms of Service'}</button>
            <button onClick={() => onSetView('home')} className="hover:underline">{isRtl ? 'سياسة الخصوصية الأكاديمية' : 'Academic Privacy Policy'}</button>
          </div>
        </div>

      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, LogOut, Scale, Lock, Mail, Phone, User, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Language, TextConfig } from '../types';
import { t } from '../utils/translation';

interface NavbarProps {
  lang: Language;
  config: TextConfig;
  onToggleLang: () => void;
  onSetView: (view: string) => void;
  currentView: string;
  currentAdmin: any;
  onLoginSuccess: (user: any, role: 'student' | 'admin') => void;
  onLogout: () => void;
}

export default function Navbar({
  lang,
  config,
  onToggleLang,
  onSetView,
  currentView,
  currentAdmin,
  onLoginSuccess,
  onLogout,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Authentication Dialog States
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'admin-login'>('admin-login');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentView !== 'home') return;

    const sections = ['home', 'why-legal', 'features', 'courses', 'about', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160; // 160px offset to make activation feel natural
      
      let currentActive = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentActive = id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentView]);

  const isRtl = lang === 'ar';

  const menuItems = [
    { id: 'home', ar: t(config, 'nav_home', 'ar'), en: t(config, 'nav_home', 'en') },
    { id: 'why-legal', ar: t(config, 'nav_why_legal', 'ar'), en: t(config, 'nav_why_legal', 'en') },
    { id: 'features', ar: t(config, 'nav_why_us', 'ar'), en: t(config, 'nav_why_us', 'en') },
    { id: 'courses', ar: t(config, 'nav_courses', 'ar'), en: t(config, 'nav_courses', 'en') },
    { id: 'about', ar: t(config, 'nav_about', 'ar'), en: t(config, 'nav_about', 'en') },
    { id: 'blog', ar: t(config, 'nav_blog', 'ar'), en: t(config, 'nav_blog', 'en') },
    { id: 'test-yourself', ar: t(config, 'nav_test', 'ar'), en: t(config, 'nav_test', 'en') },
    { id: 'contact', ar: t(config, 'nav_contact', 'ar'), en: t(config, 'nav_contact', 'en') },
  ];

  const activeId = 
    currentView === 'blog' 
      ? 'blog' 
      : currentView === 'quiz' 
        ? 'test-yourself' 
        : currentView === 'home' 
          ? activeSection 
          : '';

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (id === 'blog') {
      onSetView('blog');
    } else if (id === 'test-yourself') {
      onSetView('quiz');
    } else {
      setActiveSection(id);
      onSetView('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const openAuthModal = (mode: 'admin-login') => {
    setAuthMode('admin-login');
    setFormData({ name: '', email: '', phone: '', password: '' });
    setAuthError(null);
    setAuthSuccess(null);
    setAuthOpen(true);
    setMobileOpen(false);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      if (authMode === 'admin-login') {
        const res = await fetch('/api/auth/login-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Admin auth failed');
        onLoginSuccess(data.user, 'admin');
        setAuthSuccess(isRtl ? 'مرحباً د. أحمد. جاري تهيئة لوحة التحكم...' : 'Welcome Dr. Ahmed! Setting up dashboard...');
        setTimeout(() => {
          setAuthOpen(false);
        }, 1200);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Something went wrong');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#daf1de] py-2'
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4'
        }`}
        style={{ direction: isRtl ? 'rtl' : 'ltr' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onSetView('home')}>
              <div className="bg-[#0B2B26] p-2 rounded-xl text-white shadow-md hover:scale-105 transition-transform">
                <Scale className="h-5 w-5 text-[#8EB69B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg text-[#051F20] leading-none">
                  {t(config, 'logo_title', lang)}
                </span>
                <span className="font-mono text-[10px] text-[#235347] uppercase tracking-wider font-bold mt-0.5">
                  {t(config, 'logo_subtitle', lang)}
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 space-x-reverse">
              {menuItems.map((item) => {
                return (
                  <button
                    id={`nav-link-${item.id}`}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 select-none bg-transparent hover:bg-transparent hover:text-[#0B2B26] hover:[text-shadow:0_0_8px_rgba(11,43,38,0.45)] ${
                      item.id === activeId
                        ? 'text-[#0B2B26] font-bold border-b-2 border-[#163832]'
                        : 'text-gray-700'
                    }`}
                  >
                    {isRtl ? item.ar : item.en}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Lang Toggle */}
              <button
                id="lang-toggle-desktop"
                onClick={onToggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-xl hover:bg-gray-100 hover:border-gray-400 text-sm font-bold transition-all text-[#051f20] cursor-pointer"
              >
                <Globe className="h-4 w-4" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              {/* Authenticated Admin */}
              {currentAdmin ? (
                <div className="flex items-center gap-2">
                  <button
                    id="admin-portal-button"
                    onClick={() => onSetView('admin')}
                    className="px-4 py-2 border border-[#0B2B26] text-[#0B2B26] hover:bg-[#DAF1DE]/60 text-sm font-bold rounded-xl transition-all hover:scale-105 cursor-pointer"
                  >
                    {isRtl ? 'لوحة تحكم الأستاذ' : 'Professor Admin'}
                  </button>
                  <button
                    id="logout-btn-desktop-admin"
                    onClick={onLogout}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title={isRtl ? 'تسجيل الخروج' : 'Log Out'}
                  >
                    <LogOut className="h-4.5 w-4.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    id="login-btn-navbar"
                    onClick={() => openAuthModal('admin-login')}
                    className="px-5 py-2 bg-[#0B2B26] hover:bg-[#163832] text-white text-sm font-bold rounded-xl hover:shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    {isRtl ? 'تسجيل الدخول' : 'Log In'}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                id="lang-toggle-mobile"
                onClick={onToggleLang}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="h-4 w-4 text-gray-700" />
              </button>
              <button
                id="mobile-menu-hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-[#DAF1DE] transition-colors focus:outline-none"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#DAF1DE] shadow-xl px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  id={`nav-link-mobile-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-base font-bold bg-transparent hover:bg-transparent transition-all duration-300 hover:text-[#0B2B26] hover:[text-shadow:0_0_8px_rgba(11,43,38,0.45)] ${
                    isRtl ? 'text-right' : 'text-left'
                  } ${
                    item.id === activeId
                      ? 'text-[#0B2B26] border-r-4 border-[#0B2B26]'
                      : 'text-gray-800'
                  }`}
                >
                  {isRtl ? item.ar : item.en}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              {currentAdmin ? (
                <>
                  <button
                    id="admin-portal-button-mobile"
                    onClick={() => {
                      setMobileOpen(false);
                      onSetView('admin');
                    }}
                    className="w-full py-3 text-center border border-[#0B2B26] text-[#0B2B26] font-bold rounded-xl bg-[#DAF1DE]/20"
                  >
                    {isRtl ? 'لوحة تحكم الأستاذ' : 'Professor Admin'}
                  </button>
                  <button
                    id="logout-btn-mobile-admin"
                    onClick={() => {
                      setMobileOpen(false);
                      onLogout();
                    }}
                    className="w-full py-3 text-center text-rose-600 font-bold bg-rose-50 hover:bg-rose-100 rounded-xl"
                  >
                    {isRtl ? 'تسجيل الخروج' : 'Log Out'}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    id="login-btn-mobile"
                    onClick={() => openAuthModal('admin-login')}
                    className="w-full py-3 text-center text-[#0B2B26] border border-[#0B2B26] font-bold rounded-xl hover:bg-gray-50"
                  >
                    {isRtl ? 'تسجيل الدخول' : 'Log In'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* RENDER DUAL LANGUAGE OAUTH & API AUTHENTICATION DIALOG (GEOMETRIC BALANCE THEME) */}
      {authOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm transition-opacity" onClick={() => setAuthOpen(false)} />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-3xl bg-white p-6 md:p-8 text-right shadow-2xl transition-all w-full max-w-md border border-[#DAF1DE]">
              
              {/* Decorative Ornament Circles - Geometric Theme */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-[#DAF1DE]/40 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-32 h-32 bg-[#8EB69B]/15 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 bg-[#DAF1DE]/30 hover:bg-[#DAF1DE]/70 rounded-full transition-all cursor-pointer"
                onClick={() => setAuthOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon & Title */}
              <div className="text-center mb-6">
                <div className="inline-flex p-3.5 bg-[#DAF1DE]/80 rounded-2xl text-[#0B2B26] mb-3 border border-[#8EB69B]/30 shadow-inner">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold font-sans text-[#051F20]">
                  {isRtl ? 'تسجيل الدخول' : 'Log In'}
                </h3>
              </div>

              {/* Error & Success Messages */}
              {authError && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2.5 text-rose-700 text-xs font-semibold animate-fade-in text-justify">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}
              {authSuccess && (
                <div className="p-3 mb-4 bg-[#DAF1DE] border border-[#8EB69B]/40 rounded-xl flex items-start gap-2.5 text-[#0B2B26] text-xs font-bold animate-fade-in text-justify">
                  <Check className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#163832]" />
                  <span>{authSuccess}</span>
                </div>
              )}

              {/* Registration/Auth Form */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRtl ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="admin@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-3 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2B26] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRtl ? 'كلمة المرور' : 'Password'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-3 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B2B26] focus:border-transparent transition-all text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-[#0B2B26] text-white hover:bg-[#163832] disabled:bg-slate-400 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  {authLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>{isRtl ? 'تسجيل الدخول' : 'Log In'}</span>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

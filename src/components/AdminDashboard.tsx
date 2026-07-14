/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Globe,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Mail,
  Plus,
  Trash2,
  Download,
  AlertCircle,
  CheckCircle,
  Eye,
  Settings,
  Scale,
  ChevronDown,
  ChevronUp,
  X,
  Check
} from 'lucide-react';
import { Course, BlogPost, Question, Student, CalendarSession, Homework, TextConfig, Language, Lead } from '../types';
import { DEFAULT_TEXTS } from '../utils/translation';
import ImageUpload from './ImageUpload';
import CourseInlineEditor from './CourseInlineEditor';
import FileDragDropZone from './FileDragDropZone';

interface AdminDashboardProps {
  lang: Language;
  courses: Course[];
  blogs: BlogPost[];
  questions: Question[];
  students: Student[];
  sessions: CalendarSession[];
  homeworks: Homework[];
  textConfig: TextConfig;
  leads: Lead[];
  onDeleteLead: (id: string) => Promise<void>;
  
  // Callback Handlers for changes syncing to server.ts database
  onUpdateTextConfig: (config: TextConfig) => Promise<void>;
  onAddBlog: (blog: Partial<BlogPost>) => Promise<void>;
  onUpdateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
  onDeleteBlog: (id: string) => Promise<void>;
  onAddQuestion: (q: Partial<Question>) => Promise<void>;
  onDeleteQuestion: (id: string) => Promise<void>;
  onAddCourse: (course: Partial<Course>) => Promise<void>;
  onUpdateCourse: (id: string, course: Partial<Course>) => Promise<void>;
  onDeleteCourse: (id: string) => Promise<void>;
  onAddSession: (session: Partial<CalendarSession>) => Promise<void>;
  onDeleteSession: (id: string) => Promise<void>;
  onAddHomework: (homework: Partial<Homework>) => Promise<void>;
  onDeleteHomework: (id: string) => Promise<void>;
  onAddStudent: (student: Partial<Student>) => Promise<void>;
  onDeleteStudent: (id: string) => Promise<void>;
  onLogOut: () => void;
}

export default function AdminDashboard({
  lang,
  courses,
  blogs,
  questions,
  students,
  sessions,
  homeworks,
  textConfig,
  leads,
  onDeleteLead,
  onUpdateTextConfig,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
  onAddQuestion,
  onDeleteQuestion,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
  onAddSession,
  onDeleteSession,
  onAddHomework,
  onDeleteHomework,
  onAddStudent,
  onDeleteStudent,
  onLogOut,
}: AdminDashboardProps) {
  const isRtl = lang === 'ar';
  
  // Navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'blogs' | 'courses' | 'calendar' | 'leads'>('overview');

  // Status banners
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form states
  const [configForm, setConfigForm] = useState<TextConfig>(() => {
    const initial = { ...textConfig };
    // Make sure all default keys exist in configForm
    Object.keys(DEFAULT_TEXTS).forEach(key => {
      if (initial[`${key}_ar`] === undefined) {
        initial[`${key}_ar`] = DEFAULT_TEXTS[key].ar;
      }
      if (initial[`${key}_en`] === undefined) {
        initial[`${key}_en`] = DEFAULT_TEXTS[key].en;
      }
    });
    return initial as TextConfig;
  });

  // Blog states
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title_ar: '',
    title_en: '',
    summary_ar: '',
    summary_en: '',
    content_ar: '',
    content_en: '',
    image: '',
    reading_time_ar: '',
    reading_time_en: '',
    has_button: false,
    button_text_ar: '',
    button_text_en: '',
    button_type: 'link' as 'link' | 'file',
    button_link: '',
    button_file_name: '',
    button_file_url: ''
  });

  // Delete safety state (no native popups in sandboxed iframes)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteClick = (id: string, action: (id: string) => void) => {
    if (confirmDeleteId === id) {
      action(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => {
        setConfirmDeleteId(prev => prev === id ? null : prev);
      }, 4000); // 4 seconds to click to confirm
    }
  };

  const [questionForm, setQuestionForm] = useState({ text_ar: '', text_en: '', options_ar_1: '', options_ar_2: '', options_ar_3: '', options_ar_4: '', options_en_1: '', options_en_2: '', options_en_3: '', options_en_4: '', correct_index: 0, explanation_ar: '', explanation_en: '' });
  const [courseForm, setCourseForm] = useState({ title_ar: '', title_en: '', subtitle_ar: '', subtitle_en: '', description_ar: '', description_en: '', level_ar: '', level_en: '', price: '150', lessons_count: 8, image: '' });
  const [sessionForm, setSessionForm] = useState({ course_id: '', title_ar: '', title_en: '', day: 'Saturday', time_slot: '18:00 - 19:30 UTC' });
  const [homeworkForm, setHomeworkForm] = useState({ course_id: '', title_ar: '', title_en: '', desc_ar: '', desc_en: '', due_date: '', attachment: 'assignment_statement.pdf' });

  // Student manual addition states
  const [studentSearch, setStudentSearch] = useState('');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    enrolled_courses: [] as string[],
    payment_status: 'Paid' as 'Paid' | 'Pending',
    amount_paid: '150'
  });

  // Course view page detail state
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Accordion state for static text groups
  const [expandedGroup, setExpandedGroup] = useState<string | null>('nav');

  const textGroups = [
    {
      id: 'nav',
      titleAr: 'روابط القائمة العلوية واللوغو',
      titleEn: 'Navigation Bar & Brand',
      keys: ['logo_title', 'nav_home', 'nav_why_legal', 'nav_why_us', 'nav_courses', 'nav_about', 'nav_blog', 'nav_test', 'nav_contact', 'nav_portal', 'nav_admin', 'nav_logout']
    },
    {
      id: 'hero',
      titleAr: 'قسم الترحيب العلوي (Hero Section)',
      titleEn: 'Hero Header Section',
      keys: ['hero_badge', 'hero_title', 'hero_desc', 'hero_btn_start', 'hero_btn_test', 'hero_image']
    },
    {
      id: 'stats',
      titleAr: 'أرقام وإحصائيات النجاح',
      titleEn: 'Syllabus Counters & Milestones',
      keys: ['stats_exp_num', 'stats_exp_lbl', 'stats_org_num', 'stats_org_lbl', 'stats_lvl_num', 'stats_lvl_lbl', 'stats_read_num', 'stats_read_lbl']
    },
    {
      id: 'why_legal',
      titleAr: 'قسم (لماذا الإنجليزية القانونية؟)',
      titleEn: 'Why Legal English Section',
      keys: ['why_legal_title', 'why_legal_subtitle', 'why_legal']
    },
    {
      id: 'benefits',
      titleAr: 'قسم مميزات الانضمام (Benefits)',
      titleEn: 'Program Benefits Segment',
      keys: ['benefits_title', 'benefits_subtitle', 'benefit1_title', 'benefit1_desc', 'benefit2_title', 'benefit2_desc', 'benefit3_title', 'benefit3_desc']
    },
    {
      id: 'courses_section',
      titleAr: 'قسم الدبلومات والبرامج (Courses Segment)',
      titleEn: 'Courses Overview Segment',
      keys: ['courses_title', 'courses_subtitle', 'courses_btn_view', 'courses_btn_register', 'courses_btn_enrolled', 'courses_badge_new']
    },
    {
      id: 'quiz_banner',
      titleAr: 'قسم بنر الاختبار التشخيصي',
      titleEn: 'Placement Test Banner',
      keys: ['quiz_banner_badge', 'quiz_banner_title', 'quiz_banner_desc', 'quiz_banner_btn']
    },
    {
      id: 'testimonials',
      titleAr: 'قسم آراء الزملاء والطلاب',
      titleEn: 'Testimonials Section Header',
      keys: ['testimonials_title', 'testimonials_subtitle']
    },
    {
      id: 'about',
      titleAr: 'قسم السيرة الذاتية لـ د. أحمد (About Us)',
      titleEn: 'Instructor Biography (About Us)',
      keys: ['about_title', 'about_subtitle', 'about_badge', 'about_bio', 'about_image']
    },
    {
      id: 'contact',
      titleAr: 'صفحة وقنوات الاتصال بنا',
      titleEn: 'Contact Forms & Office Details',
      keys: ['contact_title', 'contact_subtitle', 'contact_name_lbl', 'contact_email_lbl', 'contact_phone_lbl', 'contact_subj_lbl', 'contact_msg_lbl', 'contact_btn_send', 'contact_info_title', 'contact_info_hours', 'contact_info_phone', 'contact_info_email', 'contact_info_loc']
    },
    {
      id: 'portal',
      titleAr: 'بوابة الطالب وتسجيل الدخول',
      titleEn: 'Student Access Portal & Dialogs',
      keys: ['portal_title', 'portal_subtitle', 'portal_login_title', 'portal_signup_title', 'portal_admin_title', 'portal_btn_login', 'portal_btn_register', 'portal_switch_login', 'portal_switch_signup', 'portal_phone', 'portal_name', 'portal_email', 'portal_password']
    },
    {
      id: 'quiz',
      titleAr: 'تفاصيل الاختبار التشخيصي والنتائج',
      titleEn: 'Interactive Placement Exam & Score Results',
      keys: [
        'quiz_title',
        'quiz_subtitle',
        'quiz_question_lbl',
        'quiz_btn_next',
        'quiz_btn_submit',
        'quiz_btn_back',
        'quiz_correct',
        'quiz_incorrect',
        'quiz_explanation',
        'quiz_page_cancel',
        'quiz_page_question_label',
        'quiz_page_skip',
        'quiz_page_submit',
        'quiz_page_finish',
        'quiz_page_no_questions',
        'quiz_page_no_questions_back',
        'quiz_result_title',
        'quiz_result_level',
        'quiz_result_btn',
        'quiz_result_label',
        'quiz_result_score_label',
        'quiz_result_rec_syllabus',
        'quiz_result_rec_btn',
        'quiz_result_review_title',
        'quiz_result_review_desc',
        'quiz_result_retake_btn',
        'quiz_result_home_btn',
        'quiz_rec_high_level',
        'quiz_rec_high_desc',
        'quiz_rec_med_level',
        'quiz_rec_med_desc',
        'quiz_rec_low_level',
        'quiz_rec_low_desc'
      ]
    },
    {
      id: 'details',
      titleAr: 'تفاصيل الدبلومات والبرامج المنشورة',
      titleEn: 'Course Detail Modal labels',
      keys: ['detail_duration', 'detail_lessons', 'detail_level', 'detail_curriculum', 'detail_lesson_free', 'detail_btn_register', 'detail_specs']
    },
    {
      id: 'payment',
      titleAr: 'صفحة تأكيد التحويل المالي وبوابة الدفع البنكي',
      titleEn: 'Manual Bank Invoicing & IBAN Alerts',
      keys: ['payment_title', 'payment_bank_instructions', 'payment_bank_name', 'payment_bank_iban', 'payment_bank_acc', 'payment_btn_confirm', 'payment_btn_submitting', 'payment_success']
    },
    {
      id: 'backgrounds',
      titleAr: 'صور الخلفية المثبتة لجميع الأقسام (Section Background Images)',
      titleEn: 'Section Fixed Background Images',
      keys: ['hero_bg_image', 'stats_bg_image', 'why_legal_bg_image', 'benefits_bg_image', 'courses_bg_image', 'about_bg_image', 'testimonials_bg_image', 'quiz_bg_image', 'contact_bg_image', 'footer_bg_image']
    }
  ];

  // Action: Export Students as CSV
  const handleExportCSV = () => {
    try {
      const headers = "ID,Name,Email,Phone,Enrolled Course IDs\r\n";
      const rows = students.map(s => `${s.id},"${s.name}","${s.email}","${s.phone}","${s.enrolled_courses.join('; ')}"`).join("\r\n");
      const blob = new Blob(["\ufeff" + headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `legal_scholars_list_${new Date().toISOString().substring(0,10)}.csv`);
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    try {
      await onUpdateTextConfig(configForm);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err) {
      setSaveStatus('error');
    }
  };

  const handleStartEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm({
      title_ar: blog.title_ar,
      title_en: blog.title_en,
      summary_ar: blog.summary_ar,
      summary_en: blog.summary_en,
      content_ar: blog.content_ar,
      content_en: blog.content_en,
      image: blog.image,
      reading_time_ar: blog.reading_time_ar,
      reading_time_en: blog.reading_time_en,
      has_button: blog.has_button || false,
      button_text_ar: blog.button_text_ar || '',
      button_text_en: blog.button_text_en || '',
      button_type: (blog.button_type || 'link') as 'link' | 'file',
      button_link: blog.button_link || '',
      button_file_name: blog.button_file_name || '',
      button_file_url: blog.button_file_url || ''
    });
    // Scroll form to view
    const formEl = document.getElementById('blog-editor-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEditBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title_ar: '',
      title_en: '',
      summary_ar: '',
      summary_en: '',
      content_ar: '',
      content_en: '',
      image: '',
      reading_time_ar: '',
      reading_time_en: '',
      has_button: false,
      button_text_ar: '',
      button_text_en: '',
      button_type: 'link',
      button_link: '',
      button_file_name: '',
      button_file_url: ''
    });
  };

  const handleCreateOrUpdateBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title_ar || !blogForm.title_en) return;
    try {
      const imgUrl = blogForm.image || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600";
      const payload = {
        title_ar: blogForm.title_ar,
        title_en: blogForm.title_en,
        summary_ar: blogForm.summary_ar,
        summary_en: blogForm.summary_en,
        content_ar: blogForm.content_ar,
        content_en: blogForm.content_en,
        image: imgUrl,
        reading_time_ar: blogForm.reading_time_ar || '٥ دقائق قراءة',
        reading_time_en: blogForm.reading_time_en || '5 min read',
        has_button: blogForm.has_button,
        button_text_ar: blogForm.button_text_ar,
        button_text_en: blogForm.button_text_en,
        button_type: blogForm.button_type,
        button_link: blogForm.button_link,
        button_file_name: blogForm.button_file_name,
        button_file_url: blogForm.button_file_url
      };

      if (editingBlog) {
        await onUpdateBlog(editingBlog.id, payload);
        alert(isRtl ? '✓ تم تحديث المقال بنجاح!' : '✓ Article updated successfully');
        setEditingBlog(null);
      } else {
        await onAddBlog({
          ...payload,
          date: new Date().toISOString().substring(0, 10),
          views: 0,
          is_published: true,
        });
        alert(isRtl ? '✓ تم نشر المقال بنجاح!' : '✓ Article published successfully');
      }
      
      // reset
      setBlogForm({
        title_ar: '',
        title_en: '',
        summary_ar: '',
        summary_en: '',
        content_ar: '',
        content_en: '',
        image: '',
        reading_time_ar: '',
        reading_time_en: '',
        has_button: false,
        button_text_ar: '',
        button_text_en: '',
        button_type: 'link',
        button_link: '',
        button_file_name: '',
        button_file_url: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionForm.text_ar || !questionForm.options_ar_1) return;
    try {
      await onAddQuestion({
        text_ar: questionForm.text_ar,
        text_en: questionForm.text_en,
        options_ar: [questionForm.options_ar_1, questionForm.options_ar_2, questionForm.options_ar_3, questionForm.options_ar_4].filter(Boolean),
        options_en: [questionForm.options_en_1, questionForm.options_en_2, questionForm.options_en_3, questionForm.options_en_4].filter(Boolean),
        correct_index: Number(questionForm.correct_index),
        explanation_ar: questionForm.explanation_ar,
        explanation_en: questionForm.explanation_en,
      });
      setQuestionForm({ text_ar: '', text_en: '', options_ar_1: '', options_ar_2: '', options_ar_3: '', options_ar_4: '', options_en_1: '', options_en_2: '', options_en_3: '', options_en_4: '', correct_index: 0, explanation_ar: '', explanation_en: '' });
      alert(isRtl ? '✓ تم نشر السؤال بالاستبيان!' : '✓ Diagnostic question added successfully');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title_ar || !courseForm.title_en) return;
    try {
      const defaultImg = courseForm.image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600";
      await onAddCourse({
        title_ar: courseForm.title_ar,
        title_en: courseForm.title_en,
        subtitle_ar: courseForm.subtitle_ar,
        subtitle_en: courseForm.subtitle_en,
        description_ar: courseForm.description_ar,
        description_en: courseForm.description_en,
        level_ar: courseForm.level_ar || 'مبتدئ أساسي',
        level_en: courseForm.level_en || 'Foundations',
        price: Number(courseForm.price),
        lessons_count: Number(courseForm.lessons_count),
        image: defaultImg,
        specs_ar: ['مراجعة البنود والتحكيم', 'فهم المظلات اللاتينية للالتزامات', 'صياغة صحف الادعاء والدفاع', 'تأهيل كامل لامتحانات TOLES'],
        specs_en: ['Drafting covenants', 'Mastering Latin boilerplate', 'Pleading formats deconstruction', 'Exams TOLES credentials'],
        modules: [
          {
            id: `mod-${Date.now()}-1`,
            title_ar: 'المقدمة اللغوية وبصمات الصياغة',
            title_en: 'Foundations & Boilerplate phrasing',
            lessons: [
              { id: `les-${Date.now()}-1`, title_ar: 'قواعد ديباجة البنود النموذجية', title_en: 'Universal boilerplates phrasing', duration_ar: '١ ساعة', duration_en: '1 hour', is_free: true },
              { id: `les-${Date.now()}-2`, title_ar: 'أخطاء Shall القاتلة في العقود الدولية', title_en: 'Errors regarding Shall usage', duration_ar: '١.٥ ساعة', duration_en: '1.5 hours', is_free: false }
            ]
          }
        ]
      });
      setCourseForm({ title_ar: '', title_en: '', subtitle_ar: '', subtitle_en: '', description_ar: '', description_en: '', level_ar: '', level_en: '', price: '150', lessons_count: 8, image: '' });
      alert(isRtl ? '✓ تم نشر الدورة ونموذج الوحدات بنجاح!' : '✓ Specialized course program compiled successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionForm.title_ar || !sessionForm.course_id) return;
    try {
      await onAddSession({
        course_id: sessionForm.course_id,
        title_ar: sessionForm.title_ar,
        title_en: sessionForm.title_en || sessionForm.title_ar,
        day: sessionForm.day as any,
        time_slot: sessionForm.time_slot,
      });
      alert(isRtl ? '✓ تم جدولة الحصة على الروزنامة بنجاح!' : '✓ Webinar scheduled on the timetable grid!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkForm.title_ar || !homeworkForm.course_id) return;
    try {
      await onAddHomework({
        course_id: homeworkForm.course_id,
        title_ar: homeworkForm.title_ar,
        title_en: homeworkForm.title_en || homeworkForm.title_ar,
        desc_ar: homeworkForm.desc_ar,
        desc_en: homeworkForm.desc_en,
        due_date: homeworkForm.due_date || new Date().toISOString().substring(0,10),
        status: 'pending',
        attachment: homeworkForm.attachment,
      });
      alert(isRtl ? '✓ تم إصدار الوظيفة وإرسال بريد إلكتروني تلقائي للطلاب!' : '✓ Task distributed! Simulated scholar briefing emails sent.');
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { id: 'overview', labelAr: 'مؤشرات الأداء', labelEn: 'Overview Indicators', icon: LayoutDashboard },
    { id: 'content', labelAr: 'تعديل نصوص المنصة', labelEn: 'Static Content', icon: Globe },
    { id: 'blogs', labelAr: 'إدارة المدونة', labelEn: 'Blog Management', icon: FileText },
    { id: 'courses', labelAr: 'البرامج والدورات', labelEn: 'Course Programs', icon: BookOpen },
    { id: 'calendar', labelAr: 'روزنامة الحصص السبع', labelEn: 'Timetable grid', icon: Calendar },
    { id: 'leads', labelAr: 'بيانات العملاء المهتمين', labelEn: 'Lead Info', icon: Users }
  ];

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-28 relative select-none animate-fade-in"
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="md:w-64 bg-slate-50 border border-slate-200 p-4 rounded-3xl space-y-2 flex-shrink-0 self-start">
          <div className="p-4 border-b pb-4 mb-4 text-start">
            <div className="font-sans font-black text-lg text-slate-800 flex items-center gap-1.5 justify-start">
              <Scale className="h-5 w-5 text-[#235347]" />
              <span>{isRtl ? 'د. أحمد راضي' : 'Dr Ahmed'}</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
              {isRtl ? 'لوحة التحكم الأكاديمية' : 'Academy workspace'}
            </span>
          </div>

          <nav className="space-y-1 text-start">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setConfirmDeleteId(null);
                  }}
                  className={`w-full px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all text-start cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#235347] text-[#daf1de] shadow-inner'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{isRtl ? item.labelAr : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 border-t mt-6">
            <button
              onClick={onLogOut}
              className="w-full px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs sm:text-sm rounded-xl cursor-pointer text-center"
            >
              {isRtl ? 'خروج من اللوحة' : 'Exit Console'}
            </button>
          </div>
        </aside>

        {/* Dashboard Main View content panels */}
        <main className="flex-1 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 min-h-[500px]">
          
          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'المقاييس التحليلية للأكاديمية والتمويل' : 'Academy KPI metrics'}
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  {isRtl ? 'مؤشرات فورية لمبيعات الاشتراكات وقوائم الطلاب المسجلين والنشاط التفاعلي.' : 'Aggregate counters detailing enrollments, billing streams, and activities.'}
                </p>
              </div>

              {/* Counts boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-emerald-800 font-bold tracking-tight uppercase font-mono">{isRtl ? 'إجمالي المبيعات' : 'Accrued Ledger'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 leading-none py-2 font-mono">
                    {students.reduce((acc, s) => acc + (s.amount_paid || 0), 0) || students.length * 150} $
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">{isRtl ? 'رسوم مسجلة آلياً' : 'Based on enrollment fees'}</span>
                </div>

                <div className="p-5 bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-indigo-800 font-bold tracking-tight uppercase font-mono">{isRtl ? 'الطلاب المسجلون' : ' Scholars'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 leading-none py-2 font-mono">
                    {students.length}
                  </span>
                  <span className="text-[10px] text-indigo-600 font-bold">{isRtl ? 'قوانين ومكاتب مسجلة' : 'Active scholars'}</span>
                </div>

                <div className="p-5 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-amber-800 font-bold tracking-tight uppercase font-mono">{isRtl ? 'البرامج المفعلة' : 'Syllabus tracks'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 leading-none py-2 font-mono">
                    {courses.length}
                  </span>
                  <span className="text-[10px] text-amber-600 font-bold">{isRtl ? 'برامج تخصصية منشورة' : 'Courses live'}</span>
                </div>

                <div className="p-5 bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-2xl flex flex-col justify-between">
                  <span className="text-xs text-sky-800 font-bold tracking-tight uppercase font-mono">{isRtl ? 'صحف الواجبات' : 'Tasks distributes'}</span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 leading-none py-2 font-mono">
                    {homeworks.length}
                  </span>
                  <span className="text-[10px] text-sky-600 font-bold">{isRtl ? 'وظائف لغوية مرسلة' : 'Distributed briefs'}</span>
                </div>
              </div>

              {/* Grid 2: Recent Logs & Recharts SVG */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                
                {/* Simulated SVG Graph (Left side) */}
                <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between">
                  <div className="mb-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase font-mono tracking-tight">{isRtl ? 'مؤشرات توزيع الطلاب حسب المسار التدريبي' : 'Enrolled share parameters per track'}</h3>
                  </div>

                  {/* Pure HTML/SVG beautifully designed Pie visual */}
                  <div className="h-44 flex items-center justify-center relative">
                    <svg className="w-36 h-36 transform -rotate-90">
                      {/* Circle parts simulating wedges */}
                      <circle cx="72" cy="72" r="50" fill="transparent" stroke="#235347" strokeWidth="24" strokeDasharray="314" strokeDashoffset="100" />
                      <circle cx="72" cy="72" r="50" fill="transparent" stroke="#8eb69b" strokeWidth="24" strokeDasharray="314" strokeDashoffset="214" />
                      <circle cx="72" cy="72" r="50" fill="transparent" stroke="#daf1de" strokeWidth="24" strokeDasharray="314" strokeDashoffset="284" />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center font-sans font-black select-none pointer-events-none">
                      <span className="text-xl text-slate-800">{students.length}</span>
                      <span className="text-[10px] text-slate-400 capitalize">{isRtl ? 'مسجلين' : 'Total'}</span>
                    </div>
                  </div>

                  {/* Legends */}
                  <div className="flex flex-wrap gap-4 text-xs justify-center pt-2 font-bold text-slate-600">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#235347] rounded-full"></span><span>{isRtl ? 'المستوى ١ (أساسي)' : 'Level 1'}</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#8eb69b] rounded-full"></span><span>{isRtl ? 'المستوى ٢ (متوسط)' : 'Level 2'}</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#daf1de] rounded-full text-slate-900 border"></span><span>{isRtl ? 'المستوى ٣ (متقدم)' : 'Level 3'}</span></div>
                  </div>
                </div>

                {/* Simulated Real SMTP logs & notifications console */}
                <div className="lg:col-span-5 bg-[#051f20] text-[#daf1de] font-mono text-xs p-5 rounded-3xl space-y-4 shadow-lg border border-white/5 flex flex-col justify-between">
                  <div className="border-b border-white/5 pb-2">
                    <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider">{isRtl ? '📧 سجل إشعارات SMTP التلقائية' : '📧 Simulated SMTP Mail log'}</h3>
                  </div>

                  <div className="flex-1 space-y-3.5 h-44 overflow-y-auto select-text scroll-smooth text-[11px] leading-snug">
                    <p className="text-gray-400">[08:44:02 UTC] Socket initialized on port 587 safeTLS...</p>
                    <p className="text-[#8eb69b]">[08:44:05 UTC] Delivered email &apos;welcome_credential&apos; to 1 new client scholar.</p>
                    <p className="text-amber-300">[12:15:30 UTC] Dispatched 12 automatic notifications: Task &apos; Boilerplate drafting assignment&apos; assigned.</p>
                    <p className="text-gray-400">[15:10:14 UTC] KeepAlive connection checked.</p>
                  </div>

                  <span className="text-[9px] uppercase font-bold text-gray-500 self-end block">Simulated STAMP engine running</span>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Content (Static website wording config) */}
          {activeTab === 'content' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'تعديل نصوص المنصة بالكامل' : 'Complete Website Text Control'}
                </h2>
                <p className="text-xs text-gray-400 font-bold font-sans">
                  {isRtl ? 'يمكنك هنا تعديل وتغيير أي نص مكتوب على الموقع، بما في ذلك الأزرار والقوائم والتنبيهات وصناديق الحوار في اللغتين العربية والإنجليزية.' : 'Change every single button, text, header, badge, popup, and static field across the entire website in both languages.'}
                </p>
              </div>

              {saveStatus === 'success' && (
                <div id="config-success-bar" className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl font-bold text-xs sm:text-sm text-center animate-bounce">
                  {isRtl ? '✓ تم تحديث وحفظ الإعدادات بنجاح في قاعدة البيانات المحلية!' : '✓ Settings updated and saved successfully!'}
                </div>
              )}

              <form onSubmit={handleUpdateConfigSubmit} className="space-y-4">
                <div className="space-y-3">
                  {textGroups.map((group) => {
                    const isExpanded = expandedGroup === group.id;
                    return (
                      <div key={group.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => setExpandedGroup(isExpanded ? null : group.id)}
                          className="w-full px-5 py-4 bg-slate-50 hover:bg-slate-100/80 transition-all flex items-center justify-between font-sans font-black text-xs sm:text-sm text-[#051f20]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="bg-[#235347] text-[#daf1de] w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{group.keys.length}</span>
                            <span>{isRtl ? group.titleAr : group.titleEn}</span>
                          </div>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>

                        {isExpanded && (
                          <div className="p-6 border-t border-slate-100 bg-white space-y-5 animate-fade-in">
                            {group.keys.map((key) => {
                              // Friendly human label deconstruction
                              const readableLabel = key.replace(/_/g, ' ').toUpperCase();
                              const isTextArea = key.includes('desc') || key.includes('bio') || key.includes('why_legal') || key.includes('instructions');
                              const isImage = key.includes('image') || key.includes('img') || key.endsWith('_bg_image');

                              if (isImage) {
                                return (
                                  <div key={key} className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl space-y-4">
                                    <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-1.5">
                                      <span className="text-[10px] font-mono font-black text-[#235347] tracking-wider select-all">{key}</span>
                                      <span className="text-[9px] uppercase font-bold text-slate-400 font-mono">{readableLabel}</span>
                                    </div>
                                    <div className="w-full">
                                      <ImageUpload
                                        value={configForm[`${key}_en`] || configForm[`${key}_ar`] || ''}
                                        onChange={(val) => {
                                          setConfigForm(prev => ({
                                            ...prev,
                                            [`${key}_ar`]: val,
                                            [`${key}_en`]: val
                                          }));
                                        }}
                                        label={readableLabel}
                                        labelAr={isRtl ? 'تحميل صورة الخلفية' : 'Upload Background Image'}
                                        isRtl={isRtl}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <div key={key} className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl space-y-4">
                                  <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-1.5">
                                    <span className="text-[10px] font-mono font-black text-[#235347] tracking-wider select-all">{key}</span>
                                    <span className="text-[9px] uppercase font-bold text-slate-400 font-mono">{readableLabel}</span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Arabic field input */}
                                    <div className="space-y-1">
                                      <label className="block text-[10px] font-bold text-slate-600">{isRtl ? 'الصيغة العربية' : 'Arabic Text'}</label>
                                      {isTextArea ? (
                                        <textarea
                                          rows={3}
                                          value={configForm[`${key}_ar`] || ''}
                                          onChange={(e) => setConfigForm({ ...configForm, [`${key}_ar`]: e.target.value })}
                                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347]"
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          value={configForm[`${key}_ar`] || ''}
                                          onChange={(e) => setConfigForm({ ...configForm, [`${key}_ar`]: e.target.value })}
                                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347]"
                                        />
                                      )}
                                    </div>

                                    {/* English field input */}
                                    <div className="space-y-1" style={{ direction: 'ltr' }}>
                                      <label className="block text-[10px] font-bold text-slate-600 text-left">{isRtl ? 'English Text' : 'English Text'}</label>
                                      {isTextArea ? (
                                        <textarea
                                          rows={3}
                                          value={configForm[`${key}_en`] || ''}
                                          onChange={(e) => setConfigForm({ ...configForm, [`${key}_en`]: e.target.value })}
                                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 text-left focus:outline-none focus:ring-1 focus:ring-[#235347]"
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          value={configForm[`${key}_en`] || ''}
                                          onChange={(e) => setConfigForm({ ...configForm, [`${key}_en`]: e.target.value })}
                                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 text-left focus:outline-none focus:ring-1 focus:ring-[#235347]"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6">
                  <button
                    id="save-static-content-btn"
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#235347] hover:bg-[#163832] text-[#daf1de] hover:text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-md transition-all inline-flex items-center justify-center gap-1.5"
                  >
                    <Settings className="h-4.5 w-4.5" />
                    <span>{isRtl ? 'حفظ وحفظ جميع تعديلات واجهات الموقع' : 'Save All Website Wording Changes'}</span>
                  </button>
                </div>
              </form>

              {/* Quiz Diagnosis builder segment moved below wording editors for integrity */}
              <div className="border-t pt-10 mt-10 space-y-8">
                {/* Course Assignment by Score Range Settings */}
                <div className="bg-slate-50 border border-[#daf1de] p-6 sm:p-8 rounded-[24px] space-y-6 text-start">
                  <div>
                    <h3 className="text-base font-sans font-black text-[#051f20] flex items-center gap-2">
                      🎯 {isRtl ? 'تخصيص الدورة الموصى بها حسب درجات الطالب' : 'Assign Recommended Course by Score Ranges'}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold mt-0.5">
                      {isRtl 
                        ? 'حدد الدورة التدريبية التي سيتم التوصية بها للمستمع بناءً على نتيجته في اختبار تحديد المستوى.'
                        : 'Define which course is suggested on the results page according to the candidate\'s test score percentage.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Low score range: 0% - 39% */}
                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] uppercase font-black text-amber-600 block tracking-wider font-mono">
                        🔴 {isRtl ? 'الدرجات التأسيسية (0% - 39%)' : 'Low Range (0% - 39%)'}
                      </span>
                      <label className="block text-xs font-bold text-gray-700">
                        {isRtl ? 'الدورة التدريبية الموصى بها:' : 'Recommended Course:'}
                      </label>
                      <select
                        value={configForm.rec_course_low || 'course-1'}
                        onChange={(e) => setConfigForm({ ...configForm, rec_course_low: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {isRtl ? c.title_ar : c.title_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Medium score range: 40% - 74% */}
                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] uppercase font-black text-teal-600 block tracking-wider font-mono">
                        🟡 {isRtl ? 'الدرجات المتوسطة (40% - 74%)' : 'Medium Range (40% - 74%)'}
                      </span>
                      <label className="block text-xs font-bold text-gray-700">
                        {isRtl ? 'الدورة التدريبية الموصى بها:' : 'Recommended Course:'}
                      </label>
                      <select
                        value={configForm.rec_course_med || 'course-2'}
                        onChange={(e) => setConfigForm({ ...configForm, rec_course_med: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {isRtl ? c.title_ar : c.title_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* High score range: 75% - 100% */}
                    <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3">
                      <span className="text-[10px] uppercase font-black text-emerald-600 block tracking-wider font-mono">
                        🟢 {isRtl ? 'الدرجات الممتازة (75% - 100%)' : 'High Range (75% - 100%)'}
                      </span>
                      <label className="block text-xs font-bold text-gray-700">
                        {isRtl ? 'الدورة التدريبية الموصى بها:' : 'Recommended Course:'}
                      </label>
                      <select
                        value={configForm.rec_course_high || 'course-3'}
                        onChange={(e) => setConfigForm({ ...configForm, rec_course_high: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {isRtl ? c.title_ar : c.title_en}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-start">
                    <button
                      type="button"
                      onClick={async () => {
                        setSaveStatus('saving');
                        try {
                          await onUpdateTextConfig(configForm);
                          setSaveStatus('success');
                          setTimeout(() => setSaveStatus(null), 4000);
                        } catch (err) {
                          setSaveStatus('error');
                        }
                      }}
                      className="px-5 py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      {isRtl ? 'حفظ تخصيص الدورات بنطاقات الدرجات' : 'Save Score-Course Assignments'}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-sans font-black text-[#051f20]">📝 إضافة وتعديل أسئلة استبيان التقييم المستوى</h3>
                  <p className="text-xs text-gray-400 font-semibold mt-0.5">جدول وصيغ بنود الاختيارات وقم بتدبيج معايير شرح الإجابة.</p>
                </div>

                <form onSubmit={handleCreateQuestion} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">نص السؤال (عربي)</label>
                      <input
                        type="text"
                        required
                        value={questionForm.text_ar}
                        onChange={(e) => setQuestionForm({ ...questionForm, text_ar: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
                        placeholder="ما معنى كلمة shall بالمقاطع القانونية الدقيقة؟"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Question prompt (EN)</label>
                      <input
                        type="text"
                        required
                        value={questionForm.text_en}
                        onChange={(e) => setQuestionForm({ ...questionForm, text_en: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <h4 className="font-bold text-xs text-slate-500">الخيارات الأربعة (عربي)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <input type="text" required placeholder="خيار ١" value={questionForm.options_ar_1} onChange={e => setQuestionForm({ ...questionForm, options_ar_1: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                    <input type="text" required placeholder="خيار ٢" value={questionForm.options_ar_2} onChange={e => setQuestionForm({ ...questionForm, options_ar_2: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                    <input type="text" required placeholder="خيار ٣" value={questionForm.options_ar_3} onChange={e => setQuestionForm({ ...questionForm, options_ar_3: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                    <input type="text" required placeholder="خيار ٤" value={questionForm.options_ar_4} onChange={e => setQuestionForm({ ...questionForm, options_ar_4: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                  </div>

                  <h4 className="font-bold text-xs text-slate-500">Option choices (EN)</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <input type="text" required placeholder="Option 1" value={questionForm.options_en_1} onChange={e => setQuestionForm({ ...questionForm, options_en_1: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                    <input type="text" required placeholder="Option 2" value={questionForm.options_en_2} onChange={e => setQuestionForm({ ...questionForm, options_en_2: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                    <input type="text" required placeholder="Option 3" value={questionForm.options_en_3} onChange={e => setQuestionForm({ ...questionForm, options_en_3: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                    <input type="text" required placeholder="Option 4" value={questionForm.options_en_4} onChange={e => setQuestionForm({ ...questionForm, options_en_4: e.target.value})} className="p-2.5 bg-white border border-gray-300 rounded-xl text-xs" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ترتيب الإجابة الصائبة (يبدأ من 0)</label>
                      <select value={questionForm.correct_index} onChange={e => setQuestionForm({...questionForm, correct_index: Number(e.target.value)})} className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-xs">
                        <option value={0}>الخيار الأول (0)</option>
                        <option value={1}>الخيار الثاني (1)</option>
                        <option value={2}>الخيار الثالث (2)</option>
                        <option value={3}>الخيار الرابع (3)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">شرح الإجابة المفصل (عربي)</label>
                      <textarea rows={3} value={questionForm.explanation_ar} onChange={e => setQuestionForm({ ...questionForm, explanation_ar: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Answer explanation (EN)</label>
                      <textarea rows={3} value={questionForm.explanation_en} onChange={e => setQuestionForm({ ...questionForm, explanation_en: e.target.value })} className="w-full p-3 border border-gray-300 rounded-xl text-xs" />
                    </div>
                  </div>

                  <div>
                    <button id="save-quiz-question-btn" type="submit" className="px-5 py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold text-xs rounded-xl cursor-pointer">
                      {isRtl ? 'حفظ ونشر سؤال التقييم' : 'Save Diagnostic Question'}
                    </button>
                  </div>
                </form>

                <div className="space-y-3 pt-4">
                  <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest">{isRtl ? 'الأسئلة المشخصة النشطة' : 'Active Diagnostic list'}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {questions.map((q, i) => {
                      const id = q.id || `q-${i}`;
                      return (
                        <div key={id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold">
                          <span className="truncate text-slate-800 text-start">{isRtl ? q.text_ar : q.text_en}</span>
                          
                          {/* Secure state based delete button */}
                          <button
                            onClick={() => handleDeleteClick(id, onDeleteQuestion)}
                            className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                              confirmDeleteId === id
                                ? 'bg-red-600 text-white px-3 animate-pulse'
                                : 'text-red-600 hover:bg-red-50'
                            }`}
                            title={confirmDeleteId === id ? (isRtl ? 'تأكيد الحذف؟' : 'Confirm?') : (isRtl ? 'حذف' : 'Delete')}
                          >
                            {confirmDeleteId === id ? (
                              <span className="text-[10px] font-bold font-sans flex items-center gap-1">
                                <Check className="h-3.5 w-3.5" />
                                {isRtl ? 'تأكيد؟' : 'Confirm?'}
                              </span>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Dedicated Blog Management workspace */}
          {activeTab === 'blogs' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'إدارة وتحرير مقالات المدونة' : 'Blog Articles Management'}
                </h2>
                <p className="text-xs text-gray-400 font-bold font-sans">
                  {isRtl ? 'قم بنشر المقالات العلمية الجديدة أو مراجعة وتحرير المقالات الحالية وتفصيل شروحاتك اللغوية للطلاب.' : 'Publish scientific legal essays, or update, edit, and proofread existing articles on the fly.'}
                </p>
              </div>

              {/* Blog article creation segment below wording editors */}
              <div id="blog-editor-form" className="p-6 border border-[#daf1de] bg-[#daf1de]/10 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="text-sm font-sans font-black text-[#051f20]">
                    {editingBlog
                      ? (isRtl ? `✏️ تعديل المقال: ${editingBlog.title_ar}` : `✏️ Edit Article: ${editingBlog.title_en}`)
                      : (isRtl ? '📑 كتابة ونشر مقال علمي جديد بالمدونة' : '📑 Write & Publish New Legal Article')
                    }
                  </h3>
                  {editingBlog && (
                    <button
                      onClick={handleCancelEditBlog}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-200 px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>{isRtl ? 'إلغاء التعديل' : 'Cancel Edit'}</span>
                    </button>
                  )}
                </div>

                <form onSubmit={handleCreateOrUpdateBlogSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">عنوان المقال (عربي)</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title_ar}
                        onChange={(e) => setBlogForm({ ...blogForm, title_ar: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                        placeholder="مثال: القوة قاهرة ومفهوم الإعفاء العقدى بالإنجليزية"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Article title (EN)</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title_en}
                        onChange={(e) => setBlogForm({ ...blogForm, title_en: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                        placeholder="e.g. Force Majeure and contractual exemptions"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">ملخص مقتضب (عربي)</label>
                      <input
                        type="text"
                        value={blogForm.summary_ar}
                        onChange={(e) => setBlogForm({ ...blogForm, summary_ar: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Short Summary (EN)</label>
                      <input
                        type="text"
                        value={blogForm.summary_en}
                        onChange={(e) => setBlogForm({ ...blogForm, summary_en: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <div className="sm:col-span-2">
                      <ImageUpload
                        value={blogForm.image}
                        onChange={(val) => setBlogForm({ ...blogForm, image: val })}
                        label="ARTICLE COVER IMAGE"
                        labelAr="صورة الغلاف للمقال"
                        isRtl={isRtl}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">وقت القراءة المقدر (عربي / انجليزي)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="٥ دقائق قراءة"
                          value={blogForm.reading_time_ar}
                          onChange={(e) => setBlogForm({ ...blogForm, reading_time_ar: e.target.value })}
                          className="w-1/2 p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                        />
                        <input
                          type="text"
                          placeholder="5 min read"
                          value={blogForm.reading_time_en}
                          onChange={(e) => setBlogForm({ ...blogForm, reading_time_en: e.target.value })}
                          className="w-1/2 p-2.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">محتوى المقال الكامل (عربي)</label>
                      <textarea
                        rows={6}
                        required
                        value={blogForm.content_ar}
                        onChange={(e) => setBlogForm({ ...blogForm, content_ar: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Full Article text content (EN)</label>
                      <textarea
                        rows={6}
                        required
                        value={blogForm.content_en}
                        onChange={(e) => setBlogForm({ ...blogForm, content_en: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                      />
                    </div>
                  </div>

                  {/* Tab 3: Action Lead capture button option */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={blogForm.has_button}
                        onChange={(e) => setBlogForm({ ...blogForm, has_button: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-[#235347] focus:ring-[#235347]"
                      />
                      <span>
                        {isRtl
                          ? 'إضافة زر جمع بيانات العملاء وتنزيل الملفات للمقال (Lead Magnet)'
                          : 'Add Lead Capture Action Button (Lead Magnet for downloads / external links)'}
                      </span>
                    </label>

                    {blogForm.has_button && (
                      <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-4 animate-fade-in text-start">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              {isRtl ? 'نص الزر (عربي)' : 'Button Text (Arabic)'}
                            </label>
                            <input
                              type="text"
                              value={blogForm.button_text_ar}
                              onChange={(e) => setBlogForm({ ...blogForm, button_text_ar: e.target.value })}
                              placeholder={isRtl ? 'مثال: تحميل كتاب الصياغة القانونية مجاناً' : 'e.g. Download booklet'}
                              className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              {isRtl ? 'نص الزر (إنجليزي)' : 'Button Text (English)'}
                            </label>
                            <input
                              type="text"
                              value={blogForm.button_text_en}
                              onChange={(e) => setBlogForm({ ...blogForm, button_text_en: e.target.value })}
                              placeholder={isRtl ? 'e.g. Download Booklet' : 'e.g. Download Booklet'}
                              className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              {isRtl ? 'نوع الإجراء عند نقر الزر' : 'Button Action Type'}
                            </label>
                            <select
                              value={blogForm.button_type}
                              onChange={(e) => setBlogForm({ ...blogForm, button_type: e.target.value as any })}
                              className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                            >
                              <option value="link">{isRtl ? 'فتح رابط ويب خارجي (External Link)' : 'Open External Web Link'}</option>
                              <option value="file">{isRtl ? 'تنزيل ملف مرفق مخزن بالموقع (File Download)' : 'Download Hosted File'}</option>
                            </select>
                          </div>

                          {blogForm.button_type === 'link' ? (
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                {isRtl ? 'رابط ويب الوجهة' : 'Destination URL'}
                              </label>
                              <input
                                type="text"
                                value={blogForm.button_link}
                                onChange={(e) => setBlogForm({ ...blogForm, button_link: e.target.value })}
                                placeholder="https://example.com/briefing"
                                className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1"
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="block text-xs font-bold text-gray-700 mb-1">
                                {isRtl ? 'تحميل الملف المرفق بالمدونة (سحب وإفلات)' : 'Upload download asset (Drag & drop)'}
                              </label>
                              <div className="space-y-2">
                                {blogForm.button_file_url ? (
                                  <div className="flex items-center justify-between p-3 bg-[#daf1de]/20 border border-[#daf1de] rounded-xl text-xs font-bold">
                                    <span className="font-mono text-slate-700 truncate max-w-[200px]" title={blogForm.button_file_name}>
                                      {blogForm.button_file_name || 'Attached asset'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setBlogForm({ ...blogForm, button_file_url: '', button_file_name: '' })}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                      title={isRtl ? 'إزالة الملف' : 'Remove asset'}
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <FileDragDropZone
                                    isRtl={isRtl}
                                    onUploaded={(url, filename) => {
                                      setBlogForm({ ...blogForm, button_file_url: url, button_file_name: filename });
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      id="save-publish-blog-btn"
                      type="submit"
                      className="px-6 py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      {editingBlog
                        ? (isRtl ? 'حفظ تعديلات المقال العلمي' : 'Save Blog Changes')
                        : (isRtl ? 'نشر المقال العلمي بالمدونة حالاً' : 'Publish Article Now')
                      }
                    </button>
                    {editingBlog && (
                      <button
                        type="button"
                        onClick={handleCancelEditBlog}
                        className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                      >
                        {isRtl ? 'إلغاء' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Published Blogs lists with edit and delete handles */}
              <div className="space-y-4 pt-4">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest">{isRtl ? 'المقالات والدروس المنشورة بالمدونة' : 'Active publications list'}</h4>
                <div className="grid grid-cols-1 gap-3">
                  {blogs.map(b => (
                    <div key={b.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 text-xs font-bold hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3 truncate">
                        {b.image && <img src={b.image} alt="" className="w-12 h-10 object-cover rounded-lg flex-shrink-0" />}
                        <div className="truncate text-start space-y-0.5">
                          <span className="truncate text-slate-800 text-sm font-black block">{isRtl ? b.title_ar : b.title_en}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">{b.date} | {isRtl ? b.reading_time_ar : b.reading_time_en}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleStartEditBlog(b)}
                          className="px-3 py-1.5 bg-slate-200 hover:bg-[#235347] hover:text-white text-slate-700 font-bold text-[11px] rounded-lg cursor-pointer transition-all"
                        >
                          {isRtl ? 'تعديل' : 'Edit'}
                        </button>

                        {/* Secure state based delete button */}
                        <button
                          onClick={() => handleDeleteClick(b.id, onDeleteBlog)}
                          className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                            confirmDeleteId === b.id
                              ? 'bg-red-600 text-white px-3 animate-pulse'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                          title={confirmDeleteId === b.id ? (isRtl ? 'تأكيد الحذف؟' : 'Confirm?') : (isRtl ? 'حذف' : 'Delete')}
                        >
                          {confirmDeleteId === b.id ? (
                            <span className="text-[10px] font-bold font-sans flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" />
                              {isRtl ? 'تأكيد؟' : 'Confirm?'}
                            </span>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Tab 4: Courses */}
          {activeTab === 'courses' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'ناشر برامج التدريب والمنهج' : 'Syllabus Course Publisher'}
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  {isRtl ? 'قم بنشر وتفصيل برامج المحاضرات وتوجيه مستويات طلاب القانون.' : 'Insert active program blocks, fees, modular curriculum models.'}
                </p>
              </div>

              <form onSubmit={handleCreateCourse} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">اسم البرنامج التدريبي (عربي)</label>
                    <input
                      type="text"
                      required
                      value={courseForm.title_ar}
                      onChange={e => setCourseForm({...courseForm, title_ar: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs focus:ring-1 focus:outline-none"
                      placeholder="مثال: دبلوم الصياغة التنفيذية"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Course Brand Title (EN)</label>
                    <input
                      type="text"
                      required
                      value={courseForm.title_en}
                      onChange={e => setCourseForm({...courseForm, title_en: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs focus:ring-1 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ترتيب الصياغة الفرعي (عربي)</label>
                    <input
                      type="text"
                      value={courseForm.subtitle_ar}
                      onChange={e => setCourseForm({...courseForm, subtitle_ar: e.target.value})}
                      className="w-full p-3 border rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle (EN)</label>
                    <input
                      type="text"
                      value={courseForm.subtitle_en}
                      onChange={e => setCourseForm({...courseForm, subtitle_en: e.target.value})}
                      className="w-full p-3 border rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">درجة المستوى (عربي)</label>
                    <input type="text" value={courseForm.level_ar} onChange={e => setCourseForm({ ...courseForm, level_ar: e.target.value })} className="p-2.5 border rounded-xl text-xs w-full" placeholder="متوسط / صياغة العقود" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Level tier details (EN)</label>
                    <input type="text" value={courseForm.level_en} onChange={e => setCourseForm({ ...courseForm, level_en: e.target.value })} className="p-2.5 border rounded-xl text-xs w-full" placeholder="Intermediate drafting focus" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">رسوم التسجيل ($)</label>
                    <input type="text" value={courseForm.price} onChange={e => setCourseForm({ ...courseForm, price: e.target.value })} className="p-2.5 border rounded-xl text-xs w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">عدد المحاضرات الكلي</label>
                    <input type="number" value={courseForm.lessons_count} onChange={e => setCourseForm({ ...courseForm, lessons_count: Number(e.target.value) })} className="p-2.5 border rounded-xl text-xs w-full" />
                  </div>
                </div>

                <div>
                  <ImageUpload
                    value={courseForm.image}
                    onChange={(val) => setCourseForm({ ...courseForm, image: val })}
                    label="COURSE COVER IMAGE"
                    labelAr="صورة الغلاف للدورة"
                    isRtl={isRtl}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">شرح مفصل للدبلوم (عربي)</label>
                    <textarea value={courseForm.description_ar} rows={4} onChange={e => setCourseForm({ ...courseForm, description_ar: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Detailed description (EN)</label>
                    <textarea value={courseForm.description_en} rows={4} onChange={e => setCourseForm({ ...courseForm, description_en: e.target.value })} className="w-full p-2.5 border rounded-xl text-xs" />
                  </div>
                </div>

                <div>
                  <button id="add-course-builder-btn" type="submit" className="px-5 py-2 bg-[#235347] hover:bg-[#163832] text-white font-bold text-xs rounded-xl cursor-pointer">
                    {isRtl ? 'حفظ ونشر البرنامج التدريبي الفني' : 'Save & Publish Course'}
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-4">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest">{isRtl ? 'البرامج والدبلومات المنشورة بالمنصة' : 'Active courses syllabus list'}</h4>
                <div className="grid grid-cols-1 gap-4">
                  {courses.map(c => {
                    const isExpanded = expandedCourseId === c.id;
                    return (
                      <div key={c.id} className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col text-xs font-bold space-y-4 transition-all">
                        <div className="flex justify-between items-center">
                          <div className="text-start">
                            <span className="text-slate-800 text-sm sm:text-base font-black block">{isRtl ? c.title_ar : c.title_en}</span>
                            <span className="text-[10px] text-gray-400 block font-normal mt-0.5">{isRtl ? c.subtitle_ar : c.subtitle_en}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setExpandedCourseId(isExpanded ? null : c.id)}
                              className="px-3 py-1.5 bg-[#daf1de] hover:bg-[#235347] hover:text-white text-[#235347] font-bold text-[11px] rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>{isExpanded ? (isRtl ? 'إخفاء التفاصيل' : 'Hide Details') : (isRtl ? 'عرض تفاصيل صفحة الكورس' : 'Show Course Page Content')}</span>
                            </button>

                            {/* Secure state based delete button */}
                            <button
                              onClick={() => handleDeleteClick(c.id, onDeleteCourse)}
                              className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                                confirmDeleteId === c.id
                                  ? 'bg-red-600 text-white px-3 animate-pulse'
                                  : 'text-red-600 hover:bg-red-50'
                              }`}
                              title={confirmDeleteId === c.id ? (isRtl ? 'تأكيد الحذف؟' : 'Confirm?') : (isRtl ? 'حذف' : 'Delete')}
                            >
                              {confirmDeleteId === c.id ? (
                                <span className="text-[10px] font-bold font-sans flex items-center gap-1">
                                  <Check className="h-3.5 w-3.5" />
                                  {isRtl ? 'تأكيد؟' : 'Confirm?'}
                                </span>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible details of the course page content */}
                        {isExpanded && (
                          <div className="border-t pt-4 animate-fade-in text-start font-normal">
                            <CourseInlineEditor
                              course={c}
                              isRtl={isRtl}
                              onCancel={() => setExpandedCourseId(null)}
                              onSave={async (updated) => {
                                await onUpdateCourse(c.id, updated);
                                setExpandedCourseId(null);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Tab 5: Calendar Weekly Grid representation (Sat to Sun) */}
          {activeTab === 'calendar' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'روزنامة الحصص والمواعيد (Sat - Sun)' : 'Weekly Timetable Coordinator'}
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  {isRtl ? 'قم بإضافة وحذف حصص البث الزاخرة على جدول الأسبوع التفاعلي الممتد.' : 'Click to bind active course titles to daily webinar hours slots.'}
                </p>
              </div>

              {/* Day Select representation Sat -> Sun */}
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-3 py-2 text-center text-xs font-sans font-black select-none pointer-events-none mb-4">
                {['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                  const daySessions = sessions.filter(s => s.day === day);
                  return (
                    <div key={day} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center">
                      <span className="text-slate-800 font-bold mb-1">{isRtl ? (day === 'Saturday' ? 'السبت' : day === 'Sunday' ? 'الأحد' : day === 'Monday' ? 'الإثنين' : day === 'Tuesday' ? 'الثلاثاء' : day === 'Wednesday' ? 'الأربعاء' : day === 'Thursday' ? 'الخميس' : 'الجمعة') : day}</span>
                      <span className="text-[10px] text-[#235347] bg-[#daf1de] px-1.5 py-0.5 rounded-full font-mono mt-0.5">
                        {daySessions.length} {isRtl ? 'حصص' : 'Sess'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Add Session form */}
              <div className="p-5 border border-[#daf1de] bg-[#daf1de]/10 rounded-2xl">
                <h3 className="font-bold text-sm text-[#051f20] mb-4">✍ إضافة حصة بث تفاعلية جديدة على الجدول</h3>
                <form onSubmit={handleCreateSession} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">اربط بالدورة التدريبية</label>
                    <select value={sessionForm.course_id} required onChange={e => setSessionForm({ ...sessionForm, course_id: e.target.value })} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg">
                      <option value="">{isRtl ? 'اختر دورة مسجلة...' : 'Select course program...'}</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{isRtl ? c.title_ar : c.title_en}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">اسم الحصة أو المحاضرة (عربي)</label>
                    <input type="text" required placeholder="مثال: مراجعة صياغة العقود" value={sessionForm.title_ar} onChange={e => setSessionForm({ ...sessionForm, title_ar: e.target.value })} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">اليوم المستحق</label>
                    <select value={sessionForm.day} onChange={e => setSessionForm({ ...sessionForm, day: e.target.value })} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg font-bold text-slate-700">
                      <option value="Saturday">Saturday / السبت</option>
                      <option value="Sunday">Sunday / الأحد</option>
                      <option value="Monday">Monday / الإثنين</option>
                      <option value="Tuesday">Tuesday / الثلاثاء</option>
                      <option value="Wednesday">Wednesday / الأربعاء</option>
                      <option value="Thursday">Thursday / الخميس</option>
                      <option value="Friday">Friday / الجمعة</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">توقيت الحصة (e.g. 18:00 - 19:30)</label>
                    <input type="text" placeholder="18:00 - 19:30 UTC" value={sessionForm.time_slot} onChange={e => setSessionForm({ ...sessionForm, time_slot: e.target.value })} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg" />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                    <button type="submit" className="w-full py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold rounded-lg cursor-pointer">
                      {isRtl ? 'إدراج بالجدول الأسبوعي' : 'Insert Timetable Session'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Assigned hours items with delete */}
              <div className="space-y-3 pt-4">
                <h4 className="font-bold text-xs text-gray-400 uppercase tracking-widest">{isRtl ? 'المحاضرات وجلسات الـ Zoom النشطة' : 'Active weekly sessions list'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sessions.map(s => {
                    const linkedC = courses.find(c => c.id === s.course_id);
                    return (
                      <div key={s.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center text-xs font-bold">
                        <div className="text-start space-y-1">
                          <span className="text-[#235347] block font-mono text-[10px]">{s.day} @ {s.time_slot}</span>
                          <span className="text-slate-800 block text-sm leading-snug">{isRtl ? s.title_ar : s.title_en}</span>
                          {linkedC && <span className="text-slate-400 block text-[10px]">{isRtl ? linkedC.title_ar : linkedC.title_en}</span>}
                        </div>
                        
                        {/* Secure state based delete button */}
                        <button
                          onClick={() => handleDeleteClick(s.id, onDeleteSession)}
                          className={`p-1 px-2 text-red-600 rounded-lg text-xs font-black transition-all ${
                            confirmDeleteId === s.id
                              ? 'bg-red-600 text-white px-3 py-1 animate-pulse'
                              : 'hover:bg-red-50'
                          }`}
                        >
                          {confirmDeleteId === s.id ? (isRtl ? 'حذف؟' : 'Confirm?') : '✕'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Tab 6: Enrolled Students Databases with CSV printing and manual CRUD - Deprecated */}
          {activeTab === ('students' as any) && (
            <div className="hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                    {isRtl ? 'قاعدة بيانات الطلاب والقضاة المسجلين' : 'Scholars Enrollment Registry'}
                  </h2>
                  <p className="text-xs text-gray-400 font-bold">
                    {isRtl ? 'إدارة حسابات المسجلين، إضافة طلاب يدوياً، تعديل ومراقبة التقدم الدراسي ودفع الرسوم.' : 'Manage registrations, add students manually, track student progress, and handle payments.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {/* Toggle Add Student Form */}
                  <button
                    onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                    className="px-4 py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{isRtl ? 'إضافة طالب يدوياً' : 'Add Student Manually'}</span>
                  </button>

                  {/* CSV download button */}
                  <button
                    id="students-export-csv-btn"
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 bg-[#daf1de] text-[#235347] hover:bg-[#235347] hover:text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span>{isRtl ? 'تصدير القوائم كملف Excel / CSV' : 'Export scholars database'}</span>
                  </button>
                </div>
              </div>

              {/* Add Student Manually Collapsible Form */}
              {showAddStudentForm && (
                <div className="p-6 border border-[#daf1de] bg-[#daf1de]/10 rounded-2xl space-y-4 animate-scale-up">
                  <div className="flex justify-between items-center">
                    <h3 className="font-sans font-black text-sm text-[#051f20]">
                      {isRtl ? '✍ تسجيل وإدراج طالب جديد في قاعدة البيانات' : 'Register & Insert New Student Manually'}
                    </h3>
                    <button onClick={() => setShowAddStudentForm(false)} className="text-gray-400 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!newStudentForm.name || !newStudentForm.email) return;
                      try {
                        await onAddStudent({
                          name: newStudentForm.name,
                          email: newStudentForm.email,
                          phone: newStudentForm.phone,
                          enrolled_courses: newStudentForm.enrolled_courses,
                          payment_status: newStudentForm.payment_status,
                          amount_paid: Number(newStudentForm.amount_paid) || 0,
                          progress: newStudentForm.enrolled_courses.reduce((acc, cId) => {
                            acc[cId] = [];
                            return acc;
                          }, {} as Record<string, string[]>),
                        });
                        alert(isRtl ? '✓ تم إضافة وتسجيل الطالب بنجاح!' : '✓ Student registered successfully!');
                        setNewStudentForm({ name: '', email: '', phone: '', enrolled_courses: [], payment_status: 'Paid', amount_paid: '150' });
                        setShowAddStudentForm(false);
                      } catch (err: any) {
                        alert(err.message || (isRtl ? 'حدث خطأ أثناء الإضافة' : 'Failed to add student'));
                      }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold"
                  >
                    <div>
                      <label className="block text-gray-700 mb-1 font-black">{isRtl ? 'الاسم الثلاثي للطالب' : 'Full Name'}</label>
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? 'مثال: المستشار عبد الرحمن النوري' : 'e.g. Judge Abdurrahman'}
                        value={newStudentForm.name}
                        onChange={e => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1 font-black">{isRtl ? 'البريد الإلكتروني' : 'Email Address'}</label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={newStudentForm.email}
                        onChange={e => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1 font-black">{isRtl ? 'رقم الهاتف / الواتساب' : 'Phone Number'}</label>
                      <input
                        type="text"
                        placeholder="+20 123 45678"
                        value={newStudentForm.phone}
                        onChange={e => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1 font-black">{isRtl ? 'موقف الرسوم المالية' : 'Payment Status'}</label>
                      <select
                        value={newStudentForm.payment_status}
                        onChange={e => setNewStudentForm({ ...newStudentForm, payment_status: e.target.value as any })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl"
                      >
                        <option value="Paid">{isRtl ? 'مدفوع بالكامل (Paid)' : 'Paid'}</option>
                        <option value="Pending">{isRtl ? 'قيد الانتظار (Pending)' : 'Pending'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-1 font-black">{isRtl ? 'المبلغ المسدد ($)' : 'Amount Paid ($)'}</label>
                      <input
                        type="number"
                        min="0"
                        value={newStudentForm.amount_paid}
                        onChange={e => setNewStudentForm({ ...newStudentForm, amount_paid: e.target.value })}
                        className="w-full p-2.5 bg-white border border-gray-300 rounded-xl font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2 md:col-span-3">
                      <label className="block text-gray-700 mb-2 font-black">{isRtl ? 'ربط والاشتراك بالمسارات والدبلومات' : 'Enroll in Courses / Diplomas'}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {courses.map(course => {
                          const isEnrolled = newStudentForm.enrolled_courses.includes(course.id);
                          return (
                            <label key={course.id} className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer transition-all ${isEnrolled ? 'border-[#235347] bg-[#daf1de]/20' : 'bg-white hover:bg-slate-50'}`}>
                              <input
                                type="checkbox"
                                checked={isEnrolled}
                                onChange={(e) => {
                                  const list = e.target.checked
                                    ? [...newStudentForm.enrolled_courses, course.id]
                                    : newStudentForm.enrolled_courses.filter(id => id !== course.id);
                                  setNewStudentForm({ ...newStudentForm, enrolled_courses: list });
                                }}
                                className="accent-[#235347]"
                              />
                              <span className="text-[11px] font-bold text-gray-700 leading-tight">
                                {isRtl ? course.title_ar : course.title_en}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div className="sm:col-span-2 md:col-span-3 flex justify-end pt-2">
                      <button type="submit" className="px-6 py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold rounded-xl cursor-pointer transition-all">
                        {isRtl ? 'إدراج الطالب وحفظ البيانات' : 'Register Student'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Search Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={isRtl ? 'البحث عن الطلاب والمسجلين بالاسم أو البريد الإلكتروني...' : 'Search scholars by name or email...'}
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full max-w-md p-2.5 border border-gray-300 rounded-xl text-xs font-semibold"
                />
              </div>

              {/* Scholars list registry lists */}
              <div className="overflow-x-auto border rounded-2xl">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-gray-500 font-bold uppercase text-[10px] font-mono">
                      <th className="p-4 text-start">{isRtl ? 'المستشار / الطالب' : 'Scholar / Student'}</th>
                      <th className="p-4 text-start">{isRtl ? 'الاتصال والبريد' : 'Contact Details'}</th>
                      <th className="p-4 text-start">{isRtl ? 'المسارات المنضم لها ونسبة التقدم' : 'Enrolled Courses & Progress'}</th>
                      <th className="p-4 text-start">{isRtl ? 'موقف الرسوم' : 'Payment Status'}</th>
                      <th className="p-4 text-center">{isRtl ? 'التحكم' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                    {students
                      .filter(st => {
                        const q = studentSearch.toLowerCase();
                        return st.name.toLowerCase().includes(q) || st.email.toLowerCase().includes(q);
                      })
                      .map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50">
                          <td className="p-4">
                            <span className="font-black text-slate-800 block">{st.name}</span>
                            <span className="text-[10px] text-gray-400 font-mono font-normal">ID: {st.id}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-xs text-slate-700 block select-all">{st.email}</span>
                            {st.phone && <span className="font-mono text-[10px] text-gray-400 block select-all mt-0.5">{st.phone}</span>}
                          </td>
                          <td className="p-4">
                            {st.enrolled_courses.length === 0 ? (
                              <span className="text-gray-400 font-normal italic">{isRtl ? 'غير مسجل بأي دبلوم' : 'No courses enrolled'}</span>
                            ) : (
                              <div className="flex flex-col gap-2 max-w-xs">
                                {st.enrolled_courses.map((courseId) => {
                                  const relatedC = courses.find(c => c.id === courseId);
                                  const completedCount = st.progress[courseId]?.length || 0;
                                  const totalLessons = relatedC?.lessons_count || 8;
                                  const percent = Math.min(100, Math.round((completedCount / totalLessons) * 100));
                                  return (
                                    <div key={courseId} className="flex flex-col gap-0.5">
                                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                                        <span className="truncate max-w-[150px]" title={relatedC ? (isRtl ? relatedC.title_ar : relatedC.title_en) : courseId}>
                                          {relatedC ? (isRtl ? relatedC.title_ar : relatedC.title_en) : courseId}
                                        </span>
                                        <span className="font-mono text-gray-400">
                                          {completedCount}/{totalLessons} ({percent}%)
                                        </span>
                                      </div>
                                      {/* Mini Progress Bar */}
                                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#235347] rounded-full" style={{ width: `${percent}%` }}></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col items-start gap-1">
                              <span className={`px-2.5 py-1 text-[10px] font-black rounded-full ${st.payment_status === 'Paid' ? 'bg-[#daf1de] text-[#235347]' : 'bg-amber-100 text-amber-800'}`}>
                                {st.payment_status === 'Paid' ? (isRtl ? 'مدفوع بالكامل' : 'Paid') : (isRtl ? 'قيد المراجعة' : 'Pending')}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono">{st.amount_paid} $</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            {/* Secure state based delete button */}
                            <button
                              onClick={() => handleDeleteClick(st.id, onDeleteStudent)}
                              className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all inline-flex items-center gap-1 cursor-pointer ${
                                confirmDeleteId === st.id
                                  ? 'bg-red-600 text-white px-3 animate-pulse'
                                  : 'text-red-600 hover:bg-red-50'
                              }`}
                            >
                              {confirmDeleteId === st.id ? (
                                <span className="flex items-center gap-1 text-[10px]">
                                  <Check className="h-3 w-3" />
                                  {isRtl ? 'تأكيد؟' : 'Confirm?'}
                                </span>
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Tab 7: Homework Distributor with auto SMTP simulated logs */}
          {activeTab === 'homework' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'محرر وموزع صحف الواجبات' : 'Homework Task Distributor'}
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  {isRtl ? 'وزّع واجبات التحرير العقدي، وصيغ التعبيرات المتفردة لطلاب المسارات.' : 'Draft custom corporate redraft requirements and assign dates.'}
                </p>
              </div>

              <form onSubmit={handleCreateHomework} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">اربط بالبرنامج التدريبي</label>
                    <select value={homeworkForm.course_id} required onChange={e => setHomeworkForm({ ...homeworkForm, course_id: e.target.value })} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg">
                      <option value="">{isRtl ? 'اختر دورة مسجلة...' : 'Select course program...'}</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{isRtl ? c.title_ar : c.title_en}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-bold">تاريخ استحقاق التقديم (due date)</label>
                    <input type="date" value={homeworkForm.due_date} onChange={e => setHomeworkForm({ ...homeworkForm, due_date: e.target.value })} className="w-full p-2.5 bg-white border border-gray-300 rounded-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">عنوان موضوع الواجب (عربي)</label>
                    <input type="text" required value={homeworkForm.title_ar} onChange={e => setHomeworkForm({...homeworkForm, title_ar: e.target.value})} className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs" placeholder="مثال: واجب صياغة بنود الـ NDA" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Homework core subject title (EN)</label>
                    <input type="text" required value={homeworkForm.title_en} onChange={e => setHomeworkForm({...homeworkForm, title_en: e.target.value})} className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">شرح متطلبات الصياغة والمراجعة (عربي)</label>
                    <textarea rows={3} value={homeworkForm.desc_ar} onChange={e => setHomeworkForm({ ...homeworkForm, desc_ar: e.target.value })} className="w-full p-2.5 border rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Draft requirements summary (EN)</label>
                    <textarea rows={3} value={homeworkForm.desc_en} onChange={e => setHomeworkForm({ ...homeworkForm, desc_en: e.target.value })} className="w-full p-2.5 border rounded-lg text-xs" />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="px-5 py-2.5 bg-[#235347] hover:bg-[#163832] text-white font-bold text-xs rounded-xl cursor-pointer">
                    {isRtl ? 'حفظ وإرسال الواجب بالـ SMTP التلقائي' : 'Distribute Task Sheets Now'}
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-4">
                <h4 className="font-bold text-xs text-gray-400 tracking-wider uppercase font-mono">{isRtl ? 'صحف الواجبات النشطة حالياً' : 'Active brief distributions'}</h4>
                <div className="grid grid-cols-1 gap-4">
                  {homeworks.map(h => {
                    const linked = courses.find(c => c.id === h.course_id);
                    return (
                      <div key={h.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs font-bold animate-fade-in">
                        <div className="text-start space-y-1">
                          <span className="text-slate-800 text-sm block leading-snug">{isRtl ? h.title_ar : h.title_en}</span>
                          {linked && <span className="text-slate-400 block text-[10px]">{isRtl ? linked.title_ar : linked.title_en} | Due: {h.due_date}</span>}
                        </div>
                        
                        {/* Secure state based delete button */}
                        <button
                          onClick={() => handleDeleteClick(h.id, onDeleteHomework)}
                          className={`p-1.5 px-3.5 rounded-lg text-xs font-black transition-all ${
                            confirmDeleteId === h.id
                              ? 'bg-red-600 text-white px-4 animate-pulse'
                              : 'text-red-600 hover:bg-slate-200'
                          }`}
                        >
                          {confirmDeleteId === h.id ? (isRtl ? 'تأكيد الحذف؟' : 'Confirm?') : '✕'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* Tab 8: Stored Leads Information (Lead Info) */}
          {activeTab === 'leads' && (
            <div className="space-y-8 animate-fade-in text-start">
              <div>
                <h2 className="text-2xl font-sans font-black text-[#051f20] leading-none mb-1">
                  {isRtl ? 'قاعدة بيانات المهتمين والعملاء (Leads)' : 'Lead Information Registry'}
                </h2>
                <p className="text-xs text-gray-400 font-bold">
                  {isRtl
                    ? 'بيانات المستشارين والمحامين المهتمين الذين قاموا بتحميل الملفات المرفقة بالمدونة.'
                    : 'List of prospects who requested assets, booklets, or resources from your blog pages.'}
                </p>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#daf1de]/20 border border-[#daf1de] p-4 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
                    {isRtl ? 'إجمالي الطلبات المستلمة' : 'Total prospects collected'}
                  </span>
                  <span className="text-3xl font-sans font-black text-[#235347] mt-1 block">
                    {leads.length}
                  </span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
                    {isRtl ? 'النشاط الأخير' : 'Recent Capture Activity'}
                  </span>
                  <span className="text-xs font-bold text-slate-700 mt-2 block">
                    {leads.length > 0
                      ? (isRtl ? 'مسجل بنشاط متاح' : 'Active incoming responses')
                      : (isRtl ? 'لا يوجد طلبات بعد' : 'No prospects captured yet')}
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border rounded-2xl bg-white shadow-sm">
                <table className="w-full text-xs text-start border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b text-gray-500 font-bold uppercase text-[10px] font-mono">
                      <th className="p-4 text-start">{isRtl ? 'البريد الإلكتروني' : 'Email address'}</th>
                      <th className="p-4 text-start">{isRtl ? 'رقم الهاتف' : 'Phone'}</th>
                      <th className="p-4 text-start">{isRtl ? 'المسمى الوظيفي' : 'Job Title'}</th>
                      <th className="p-4 text-start">{isRtl ? 'المقال المصدر' : 'BlogPost Source'}</th>
                      <th className="p-4 text-start">{isRtl ? 'تاريخ التسجيل' : 'Date captured'}</th>
                      <th className="p-4 text-center">{isRtl ? 'التحكم' : 'Actions'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-semibold text-gray-700">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-400 italic font-normal">
                          {isRtl ? 'لا توجد بيانات لعملاء مهتمين حالياً.' : 'No prospects stored in the database.'}
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => {
                        const relatedBlog = blogs.find(b => b.id === lead.blog_id);
                        return (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="p-4 font-mono text-slate-900 select-all font-bold">
                              {lead.email}
                            </td>
                            <td className="p-4 font-mono text-slate-600 select-all">
                              {lead.phone}
                            </td>
                            <td className="p-4 text-slate-800 font-bold">
                              {lead.job_title}
                            </td>
                            <td className="p-4">
                              <span className="text-slate-700 block max-w-xs truncate" title={relatedBlog ? (isRtl ? relatedBlog.title_ar : relatedBlog.title_en) : lead.blog_id}>
                                {relatedBlog
                                  ? (isRtl ? relatedBlog.title_ar : relatedBlog.title_en)
                                  : <span className="text-gray-400 font-normal">Deleted post ({lead.blog_id})</span>
                                }
                              </span>
                            </td>
                            <td className="p-4 font-mono text-gray-400 text-[11px]">
                              {new Date(lead.timestamp).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => handleDeleteClick(lead.id, onDeleteLead)}
                                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all inline-flex items-center gap-1 cursor-pointer ${
                                  confirmDeleteId === lead.id
                                    ? 'bg-red-600 text-white px-3 animate-pulse'
                                    : 'text-red-600 hover:bg-red-50'
                                }`}
                              >
                                {confirmDeleteId === lead.id ? (
                                  <span className="flex items-center gap-1 text-[10px]">
                                    <Check className="h-3 w-3" />
                                    {isRtl ? 'تأكيد؟' : 'Confirm?'}
                                  </span>
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

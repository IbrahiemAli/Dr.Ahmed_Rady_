/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import WhyLegal from './components/WhyLegal';
import Benefits from './components/Benefits';
import CourseCarousel from './components/CourseCarousel';
import AboutUs from './components/AboutUs';
import Testimonials from './components/Testimonials';
import QuizBanner from './components/QuizBanner';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

// Pages
import BlogPage from './components/BlogPage';
import CourseDetailPage from './components/CourseDetailPage';
import QuizPage from './components/QuizPage';
import AdminDashboard from './components/AdminDashboard';

// Types
import { Language, Course, BlogPost, Question, Student, CalendarSession, Homework, TextConfig, Lead } from './types';

// Fallbacks/Seeds
import { 
  INITIAL_COURSES, 
  INITIAL_BLOGS, 
  INITIAL_QUESTIONS, 
  INITIAL_CALENDAR_SESSIONS, 
  INITIAL_HOMEWORKS, 
  INITIAL_TEXT_CONFIG 
} from './seedData';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [view, setView] = useState<string>('home'); // home, blog, course-detail, quiz, student, admin
  
  // Data State managed lists
  const [courses, setCourses] = useState<Course[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [calendarSessions, setCalendarSessions] = useState<CalendarSession[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [textConfig, setTextConfig] = useState<TextConfig | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Authentication states
  const [currentAdmin, setCurrentAdmin] = useState<any | null>(null);

  // Selected Course for Detail View
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Synchronise database on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchWithFallback = async (path: string, fallback: any) => {
      try {
        const res = await fetch(path);
        if (!res.ok) {
          console.warn(`[FETCH] Non-ok response from ${path} (${res.status}). Using seed fallback.`);
          return fallback;
        }
        const data = await res.json();
        return data;
      } catch (err) {
        console.warn(`[FETCH] Exception while loading ${path}. Using seed fallback.`, err);
        return fallback;
      }
    };

    try {
      const [
        fetchedCourses,
        fetchedBlogs,
        fetchedQuestions,
        fetchedSessions,
        fetchedHomeworks,
        fetchedConfig,
        fetchedLeads
      ] = await Promise.all([
        fetchWithFallback('/api/courses', INITIAL_COURSES),
        fetchWithFallback('/api/blogs', INITIAL_BLOGS),
        fetchWithFallback('/api/questions', INITIAL_QUESTIONS),
        fetchWithFallback('/api/sessions', INITIAL_CALENDAR_SESSIONS),
        fetchWithFallback('/api/homeworks', INITIAL_HOMEWORKS),
        fetchWithFallback('/api/config', INITIAL_TEXT_CONFIG),
        fetchWithFallback('/api/leads', [])
      ]);

      setCourses(fetchedCourses);
      setBlogs(fetchedBlogs);
      setQuestions(fetchedQuestions);
      setStudents([]); // Student database is deprecated
      setCalendarSessions(fetchedSessions);
      setHomeworks(fetchedHomeworks);
      setTextConfig(fetchedConfig);
      setLeads(fetchedLeads || []);
    } catch (err) {
      console.error('Critical fallback during fetch:', err);
      setCourses(INITIAL_COURSES);
      setBlogs(INITIAL_BLOGS);
      setQuestions(INITIAL_QUESTIONS);
      setStudents([]);
      setCalendarSessions(INITIAL_CALENDAR_SESSIONS);
      setHomeworks(INITIAL_HOMEWORKS);
      setTextConfig(INITIAL_TEXT_CONFIG);
      setLeads([]);
    }
  };

  // Helper: toggle RTL on document html
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Handle direct login successful session
  const handleLoginSuccess = (user: any, role: 'student' | 'admin') => {
    if (role === 'admin') {
      setCurrentAdmin(user);
      setView('admin');
      fetchData();
    }
  };

  const handleLogout = () => {
    setCurrentAdmin(null);
    setView('home');
  };

  // --- API Sync callbacks originating from dashboards ---
  
  const handleUpdateTextConfig = async (updatedConfig: TextConfig) => {
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedConfig),
    });
    if (res.ok) {
      const data = await res.json();
      setTextConfig(data);
    }
  };

  const handleCreateBlog = async (blog: Partial<BlogPost>) => {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  const handleUpdateBlog = async (id: string, blog: Partial<BlogPost>) => {
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });
    if (res.ok) {
      await fetchData();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  };

  const handleCreateQuestion = async (q: Partial<Question>) => {
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q),
    });
    if (res.ok) await fetchData();
  };

  const handleDeleteQuestion = async (id: string) => {
    const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  };

  const handleCreateCourse = async (c: Partial<Course>) => {
    const res = await fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    if (res.ok) await fetchData();
  };

  const handleUpdateCourse = async (id: string, c: Partial<Course>) => {
    const res = await fetch(`/api/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(c),
    });
    if (res.ok) await fetchData();
  };

  const handleDeleteCourse = async (id: string) => {
    const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  };

  const handleCreateSession = async (s: Partial<CalendarSession>) => {
    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    });
    if (res.ok) await fetchData();
  };

  const handleDeleteSession = async (id: string) => {
    const res = await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  };

  const handleCreateHomework = async (h: Partial<Homework>) => {
    const res = await fetch('/api/homeworks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(h),
    });
    if (res.ok) await fetchData();
  };

  const handleDeleteHomework = async (id: string) => {
    const res = await fetch(`/api/homeworks/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  };

  const handleAddStudent = async (student: Partial<Student>) => {
    // Stubbed locally since student portal is completely removed
    const newSt: Student = {
      id: `student-${Date.now()}`,
      name: student.name || '',
      email: student.email || '',
      phone: student.phone || '',
      enrolled_courses: student.enrolled_courses || [],
      progress: student.progress || {},
      enrollment_date: new Date().toISOString().split('T')[0],
      payment_status: student.payment_status || 'Paid',
      amount_paid: student.amount_paid || 150
    };
    setStudents(prev => [...prev, newSt]);
  };

  const handleDeleteStudent = async (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteLead = async (id: string) => {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (res.ok) await fetchData();
  };

  // -----------------------------------------------------

  if (!textConfig) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center font-sans select-none">
        <div className="w-12 h-12 border-4 border-[#235347] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-slate-500 font-bold mt-4">إعداد صياغات د. أحمد راضي...</span>
      </div>
    );
  }

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans transition-all selection:bg-[#daf1de] selection:text-[#235347]">
      {/* 10% opacity green aurora animated background overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30 opacity-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#0B2B26] via-[#163832] to-[#8EB69B] filter blur-[100px] animate-aurora-1" />
        <div className="absolute bottom-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-[#235347] via-[#8EB69B] to-[#DAF1DE] filter blur-[100px] animate-aurora-2" />
        <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-[#163832] via-[#DAF1DE] to-[#0B2B26] filter blur-[120px] animate-aurora-3" />
      </div>

      {/* Universal navigation bar */}
      <Navbar
        lang={lang}
        config={textConfig}
        onToggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
        onSetView={(v) => {
          setView(v);
          setSelectedCourseId(null);
          if (v === 'admin') {
            fetchData();
          }
        }}
        currentView={view}
        currentAdmin={currentAdmin}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Primary Page Router Views */}
      <main className="min-h-screen">
        {view === 'home' && (
          <div className="animate-fade-in animate-duration-500">
            <Hero
              lang={lang}
              config={textConfig}
              onStartQuiz={() => setView('quiz')}
              onExploreCourses={() => {
                const spec = document.getElementById('courses');
                if (spec) spec.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <StatsBar lang={lang} />
            <WhyLegal lang={lang} config={textConfig} />
            <Benefits lang={lang} config={textConfig} />
            <CourseCarousel
              lang={lang}
              courses={courses}
              config={textConfig}
              onViewDetails={(id) => {
                setSelectedCourseId(id);
                setView('course-detail');
              }}
            />
            <AboutUs lang={lang} config={textConfig} />
             <Testimonials lang={lang} config={textConfig} />
            <QuizBanner lang={lang} config={textConfig} onStartQuiz={() => setView('quiz')} />
            <ContactUs lang={lang} config={textConfig} />
          </div>
        )}

        {view === 'blog' && (
          <BlogPage lang={lang} blogs={blogs} onLeadSubmitted={fetchData} />
        )}

        {view === 'course-detail' && selectedCourse && (
          <CourseDetailPage
            lang={lang}
            course={selectedCourse}
            onBack={() => {
              setSelectedCourseId(null);
              setView('home');
              setTimeout(() => {
                const target = document.getElementById('courses');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            }}
          />
        )}

        {view === 'quiz' && (
          <QuizPage
            lang={lang}
            questions={questions}
            courses={courses}
            textConfig={textConfig}
            onBackHome={() => setView('home')}
            onSelectCourse={(id) => {
              setSelectedCourseId(id);
              setView('course-detail');
            }}
          />
        )}

        {view === 'admin' && currentAdmin && (
          <AdminDashboard
            lang={lang}
            courses={courses}
            blogs={blogs}
            questions={questions}
            students={students}
            sessions={calendarSessions}
            homeworks={homeworks}
            textConfig={textConfig}
            leads={leads}
            onDeleteLead={handleDeleteLead}
            onUpdateTextConfig={handleUpdateTextConfig}
            onAddBlog={handleCreateBlog}
            onUpdateBlog={handleUpdateBlog}
            onDeleteBlog={handleDeleteBlog}
            onAddQuestion={handleCreateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onAddCourse={handleCreateCourse}
            onUpdateCourse={handleUpdateCourse}
            onDeleteCourse={handleDeleteCourse}
            onAddSession={handleCreateSession}
            onDeleteSession={handleDeleteSession}
            onAddHomework={handleCreateHomework}
            onDeleteHomework={handleDeleteHomework}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            onLogOut={handleLogout}
          />
        )}
      </main>

      {/* Universal Footer for all screens */}
      <Footer lang={lang} config={textConfig} onSetView={(v) => {
        setView(v);
        setSelectedCourseId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}

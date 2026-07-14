/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Dual-Language Support State
export type Language = 'ar' | 'en';

export interface BilingualText {
  ar: string;
  en: string;
}

// Course Types
export interface Lesson {
  id: string;
  title_ar: string;
  title_en: string;
  duration_ar: string;
  duration_en: string;
  is_free?: boolean;
}

export interface Module {
  id: string;
  title_ar: string;
  title_en: string;
  lessons: Lesson[];
  style_type?: 'colored' | 'plain';
}

export interface Course {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  description_ar: string;
  description_en: string;
  image: string; // Base64, uploaded URL, or placeholder
  price: number;
  duration_ar: string;
  duration_en: string;
  lessons_count: number;
  level_ar: string;
  level_en: string;
  specs_ar: string[];
  specs_en: string[];
  modules: Module[];
  is_published: boolean;
}

// Blog Post Types
export interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  summary_ar: string;
  summary_en: string;
  image: string;
  date: string; // YYYY-MM-DD
  reading_time_ar: string;
  reading_time_en: string;
  views: number;
  is_published: boolean;
  has_button?: boolean;
  button_text_ar?: string;
  button_text_en?: string;
  button_type?: 'link' | 'file';
  button_link?: string;
  button_file_name?: string;
  button_file_url?: string;
}

export interface Lead {
  id: string;
  email: string;
  phone: string;
  job_title: string;
  blog_id: string;
  blog_title_ar: string;
  blog_title_en: string;
  button_text_ar: string;
  button_text_en: string;
  timestamp: string;
}

// Level Assessment Test Question
export interface Question {
  id: string;
  text_ar: string;
  text_en: string;
  options_ar: string[];
  options_en: string[];
  correct_index: number;
  explanation_ar: string;
  explanation_en: string;
}

// Enrollment / Student Profile
export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrolled_courses: string[]; // Course IDs
  progress: Record<string, string[]>; // course_id -> completed_lesson_ids[]
  enrollment_date: string;
  payment_status: 'Paid' | 'Pending';
  amount_paid: number;
}

// Calendar Weekly Session Grid Event
export interface CalendarSession {
  id: string;
  title_ar: string;
  title_en: string;
  course_id: string;
  date: string; // YYYY-MM-DD
  day_of_week: number; // 0 for Sun, 1 for Mon, etc. (using SUN-SAT columns)
  start_time: string; // HH:MM (e.g. '10:00')
  end_time: string; // HH:MM (e.g. '11:30')
  color: string; // Hex color code
  notes_ar: string;
  notes_en: string;
  day?: string;
  time_slot?: string;
}

// Homework Assignments
export interface Homework {
  id: string;
  title_ar: string;
  title_en: string;
  course_id: string;
  description_ar: string;
  description_en: string;
  file_name: string;
  file_url: string; // base64 or static url
  due_date: string;
  date_sent: string;
  recipient_count: number;
  desc_ar?: string;
  desc_en?: string;
  status?: string;
  attachment?: string;
}

// General SMTP config settings
export interface SmtpConfig {
  email: string;
  host: string;
  port: number;
}

// Contact messages sent via form
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject_ar: string;
  subject_en: string;
  message: string;
  date_sent: string;
  is_read: boolean;
}

// Static Customizable Text Blocks of the Platform
export interface TextConfig {
  hero_title_ar: string;
  hero_title_en: string;
  hero_desc_ar: string;
  hero_desc_en: string;
  why_legal_ar: string;
  why_legal_en: string;
  about_bio_ar: string;
  about_bio_en: string;
  about_bullets_ar: string[];
  about_bullets_en: string[];
  [key: string]: any;
}

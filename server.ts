/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

// Import Types and Seeds
import { INITIAL_COURSES, INITIAL_BLOGS, INITIAL_QUESTIONS, INITIAL_STUDENTS, INITIAL_CALENDAR_SESSIONS, INITIAL_HOMEWORKS, INITIAL_MESSAGES, INITIAL_TEXT_CONFIG } from './src/seedData';
import { Course, BlogPost, Question, Student, CalendarSession, Homework, ContactMessage, TextConfig, SmtpConfig, Lead } from './src/types';

// Database File Path
const DB_FILE = path.join(process.cwd(), 'database.json');

// Interface for DB JSON
interface DatabaseSchema {
  courses: Course[];
  blogs: BlogPost[];
  questions: Question[];
  students: Student[];
  sessions: CalendarSession[];
  homeworks: Homework[];
  messages: ContactMessage[];
  textConfig: TextConfig;
  smtpConfig: SmtpConfig;
  leads: Lead[];
}

// Global state variables
let db: DatabaseSchema;
let pendingWritePromise: Promise<any> | null = null;

// Initialize Supabase Client if env vars are present
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

function isSupabaseConfigured(): boolean {
  return !!supabase;
}

// Synchronous local read for fallback/seeding
function readLocalDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (!parsed.leads) parsed.leads = [];
      if (!parsed.questions || parsed.questions.length < 80) {
        parsed.questions = INITIAL_QUESTIONS;
        fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
      }
      if (parsed.textConfig) {
        if (!parsed.textConfig.hero_image_ar) parsed.textConfig.hero_image_ar = "/attached_image_0.png";
        if (!parsed.textConfig.hero_image_en) parsed.textConfig.hero_image_en = "/attached_image_0.png";
        if (!parsed.textConfig.about_image_ar) parsed.textConfig.about_image_ar = "/attached_image_0.png";
        if (!parsed.textConfig.about_image_en) parsed.textConfig.about_image_en = "/attached_image_0.png";
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading local database file, resetting to fallback:', err);
  }
  
  // Set default initial data
  const defaultDb: DatabaseSchema = {
    courses: INITIAL_COURSES,
    blogs: INITIAL_BLOGS,
    questions: INITIAL_QUESTIONS,
    students: INITIAL_STUDENTS,
    sessions: INITIAL_CALENDAR_SESSIONS,
    homeworks: INITIAL_HOMEWORKS,
    messages: INITIAL_MESSAGES,
    textConfig: INITIAL_TEXT_CONFIG,
    smtpConfig: {
      email: 'info.dr.ahmed.rady@gmail.com',
      host: 'smtp.gmail.com',
      port: 465
    },
    leads: []
  };
  
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write default local DB file:', err);
  }
  return defaultDb;
}

// Global read function used by routes (returns local or cached in-memory DB)
function readDb(): DatabaseSchema {
  if (!db) {
    db = readLocalDb();
  }
  return db;
}

// Global write function used by routes
function writeDb(data: DatabaseSchema) {
  db = data;
  
  // 1. Sync write to local DB (as fallback/backup)
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local database file:', err);
  }
  
  // 2. Async write to Supabase if configured
  if (supabase) {
    pendingWritePromise = (async () => {
      try {
        const { error } = await supabase
          .from('app_state')
          .upsert({ key: 'main', data, updated_at: new Date().toISOString() });
        if (error) {
          console.error('[DATABASE] Error saving to Supabase:', error);
        } else {
          console.log('[DATABASE] Successfully saved state to Supabase.');
        }
      } catch (err) {
        console.error('[DATABASE] Exception saving to Supabase:', err);
      }
    })();
  }
}

// Database initializer called on server startup
async function initDb() {
  if (supabase) {
    console.log('[DATABASE] Attempting to connect to Supabase...');
    try {
      const { data, error } = await supabase
        .from('app_state')
        .select('data')
        .eq('key', 'main')
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          console.log('[DATABASE] Row not found in Supabase. Seeding app_state table...');
          const localDb = readLocalDb();
          const { error: insertError } = await supabase
            .from('app_state')
            .insert({ key: 'main', data: localDb });
          if (insertError) {
            console.error('[DATABASE] Failed to seed Supabase row:', insertError);
            db = localDb;
          } else {
            console.log('[DATABASE] Seeded Supabase table successfully.');
            db = localDb;
          }
        } else if (error.code === '42P01' || (error.message && error.message.includes('relation "app_state" does not exist'))) {
          console.warn('\n========================================================================');
          console.warn('[DATABASE] WARNING: The table "app_state" does not exist in Supabase yet!');
          console.warn('To make cloud persistence work, please go to your Supabase Dashboard -> SQL Editor,');
          console.warn('and run the following SQL command to create the required table:\n');
          console.warn(`CREATE TABLE IF NOT EXISTS app_state (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);\n`);
          console.warn('Also, make sure to disable Row Level Security (RLS) or allow public read/write on this table.');
          console.warn('Falling back gracefully to local "database.json" storage in the meantime.');
          console.warn('========================================================================\n');
          db = readLocalDb();
        } else {
          console.error('[DATABASE] Supabase fetch error:', error);
          console.log('[DATABASE] Falling back to local "database.json" database...');
          db = readLocalDb();
        }
      } else if (data) {
        console.log('[DATABASE] Loaded app state from Supabase.');
        db = data.data as DatabaseSchema;
      } else {
        db = readLocalDb();
      }
    } catch (err: any) {
      console.error('[DATABASE] Exception connecting to Supabase, falling back to local database.json:', err);
      db = readLocalDb();
    }
  } else {
    console.log('[DATABASE] Supabase environment variables not set. Using local database.json.');
    db = readLocalDb();
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares to accept JSON and File Uploads (base64 handled directly)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Intercept and block response termination until pending Supabase DB writes are fully flushed to the cloud database
app.use((req, res, next) => {
  // Reset pending write tracker for this request boundary
  pendingWritePromise = null;
  
  const originalJson = res.json;
  res.json = function (body) {
    if (pendingWritePromise) {
      pendingWritePromise.then(() => {
        originalJson.call(res, body);
      }).catch(err => {
        console.error('[DATABASE] Delayed write catch-all in middleware:', err);
        originalJson.call(res, body);
      });
    } else {
      originalJson.call(res, body);
    }
    return res;
  };
  
  next();
});

// Middleware for lazy loading the DB init (extremely reliable for serverless and server environments alike!)
let isDbInitialized = false;
app.use(async (req, res, next) => {
  if (!isDbInitialized) {
    try {
      await initDb();
    } catch (err) {
      console.error('[DATABASE] Failed to lazy init DB:', err);
    }
    isDbInitialized = true;
  }
  next();
});

  // --- API ROUTES ---

  // Auth Endpoints
  app.post('/api/auth/login-admin', (req, res) => {
    const { email, password } = req.body;
    if (email === 'info.dr.ahmed.rady@gmail.com' && (password === 'MNBvcx888@' || password === 'MNBvcx888')) {
      return res.json({ success: true, token: 'admin-super-token', user: { email, role: 'admin', name: 'أ. د. أحمد راضي' } });
    }
    console.log('Failed login attempt:', { email, password });
    res.status(401).json({ error: 'بيانات الاعتماد غير صالحة. لا يمكن الوصول إلا للمسؤول / Invalid credentials. Admin access only.' });
  });

  // Text Config
  app.get('/api/config', (req, res) => {
    db = readDb();
    res.json(db.textConfig);
  });

  app.put('/api/config', (req, res) => {
    db = readDb();
    db.textConfig = { ...db.textConfig, ...req.body };
    writeDb(db);
    res.json(db.textConfig);
  });

  app.post('/api/config', (req, res) => {
    db = readDb();
    db.textConfig = { ...db.textConfig, ...req.body };
    writeDb(db);
    res.json(db.textConfig);
  });

  // SMTP Config
  app.get('/api/smtp-config', (req, res) => {
    db = readDb();
    res.json(db.smtpConfig);
  });

  app.put('/api/smtp-config', (req, res) => {
    db = readDb();
    db.smtpConfig = { ...db.smtpConfig, ...req.body };
    writeDb(db);
    res.json(db.smtpConfig);
  });

  // Courses APIs
  app.get('/api/courses', (req, res) => {
    db = readDb();
    res.json(db.courses);
  });

  app.post('/api/courses', (req, res) => {
    db = readDb();
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title_ar: req.body.title_ar || '',
      title_en: req.body.title_en || '',
      subtitle_ar: req.body.subtitle_ar || '',
      subtitle_en: req.body.subtitle_en || '',
      description_ar: req.body.description_ar || '',
      description_en: req.body.description_en || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
      price: Number(req.body.price) || 0,
      duration_ar: req.body.duration_ar || '١٢ ساعة',
      duration_en: req.body.duration_en || '12 Hours',
      lessons_count: Number(req.body.lessons_count) || 0,
      level_ar: req.body.level_ar || 'عام',
      level_en: req.body.level_en || 'General',
      specs_ar: req.body.specs_ar || [],
      specs_en: req.body.specs_en || [],
      modules: req.body.modules || [],
      is_published: req.body.is_published !== undefined ? req.body.is_published : true
    };
    db.courses.push(newCourse);
    writeDb(db);
    res.json(newCourse);
  });

  app.put('/api/courses/:id', (req, res) => {
    db = readDb();
    const index = db.courses.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Course not found' });
    
    db.courses[index] = { ...db.courses[index], ...req.body };
    writeDb(db);
    res.json(db.courses[index]);
  });

  app.delete('/api/courses/:id', (req, res) => {
    db = readDb();
    db.courses = db.courses.filter(c => c.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // Blogs APIs
  app.get('/api/blogs', (req, res) => {
    db = readDb();
    res.json(db.blogs);
  });

  app.post('/api/blogs', (req, res) => {
    db = readDb();
    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title_ar: req.body.title_ar || '',
      title_en: req.body.title_en || '',
      content_ar: req.body.content_ar || '',
      content_en: req.body.content_en || '',
      summary_ar: req.body.summary_ar || '',
      summary_en: req.body.summary_en || '',
      image: req.body.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
      date: new Date().toISOString().split('T')[0],
      reading_time_ar: req.body.reading_time_ar || '٥ دقائق قراءة',
      reading_time_en: req.body.reading_time_en || '5 mins read',
      views: 0,
      is_published: req.body.is_published !== undefined ? req.body.is_published : true,
      has_button: req.body.has_button !== undefined ? req.body.has_button : false,
      button_text_ar: req.body.button_text_ar || '',
      button_text_en: req.body.button_text_en || '',
      button_type: req.body.button_type || 'link',
      button_link: req.body.button_link || '',
      button_file_name: req.body.button_file_name || '',
      button_file_url: req.body.button_file_url || ''
    };
    db.blogs.push(newBlog);
    writeDb(db);
    res.json(newBlog);
  });

  app.put('/api/blogs/:id', (req, res) => {
    db = readDb();
    const index = db.blogs.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Blog post not found' });
    
    db.blogs[index] = { ...db.blogs[index], ...req.body };
    writeDb(db);
    res.json(db.blogs[index]);
  });

  app.delete('/api/blogs/:id', (req, res) => {
    db = readDb();
    db.blogs = db.blogs.filter(b => b.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // Questions APIs
  app.get('/api/questions', (req, res) => {
    db = readDb();
    res.json(db.questions);
  });

  app.post('/api/questions', (req, res) => {
    db = readDb();
    const q: Question = {
      id: `q-${Date.now()}`,
      text_ar: req.body.text_ar || '',
      text_en: req.body.text_en || '',
      options_ar: req.body.options_ar || [],
      options_en: req.body.options_en || [],
      correct_index: Number(req.body.correct_index) || 0,
      explanation_ar: req.body.explanation_ar || '',
      explanation_en: req.body.explanation_en || ''
    };
    db.questions.push(q);
    writeDb(db);
    res.json(q);
  });

  app.put('/api/questions/:id', (req, res) => {
    db = readDb();
    const idx = db.questions.findIndex(q => q.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Question not found' });
    db.questions[idx] = { ...db.questions[idx], ...req.body };
    writeDb(db);
    res.json(db.questions[idx]);
  });

  app.delete('/api/questions/:id', (req, res) => {
    db = readDb();
    db.questions = db.questions.filter(q => q.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // Calendar Sessions APIs
  app.get('/api/sessions', (req, res) => {
    db = readDb();
    res.json(db.sessions);
  });

  app.post('/api/sessions', (req, res) => {
    db = readDb();
    const s: CalendarSession = {
      id: `session-${Date.now()}`,
      title_ar: req.body.title_ar || '',
      title_en: req.body.title_en || '',
      course_id: req.body.course_id || '',
      date: req.body.date || '',
      day_of_week: Number(req.body.day_of_week) || 0,
      start_time: req.body.start_time || '',
      end_time: req.body.end_time || '',
      color: req.body.color || '#235347',
      notes_ar: req.body.notes_ar || '',
      notes_en: req.body.notes_en || ''
    };
    db.sessions.push(s);
    writeDb(db);
    res.json(s);
  });

  app.put('/api/sessions/:id', (req, res) => {
    db = readDb();
    const idx = db.sessions.findIndex(s => s.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Session not found' });
    db.sessions[idx] = { ...db.sessions[idx], ...req.body };
    writeDb(db);
    res.json(db.sessions[idx]);
  });

  app.delete('/api/sessions/:id', (req, res) => {
    db = readDb();
    db.sessions = db.sessions.filter(s => s.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // Homework APIs
  app.get('/api/homeworks', (req, res) => {
    db = readDb();
    res.json(db.homeworks);
  });

  app.post('/api/homeworks', (req, res) => {
    db = readDb();
    const { title_ar, title_en, course_id, description_ar, description_en, file_name, file_url, due_date } = req.body;
    
    // Student portal/database is deprecated
    const emails: string[] = [];
    
    const newHw: Homework = {
      id: `hw-${Date.now()}`,
      title_ar: title_ar || '',
      title_en: title_en || '',
      course_id: course_id || '',
      description_ar: description_ar || '',
      description_en: description_en || '',
      file_name: file_name || 'homework_assignment.pdf',
      file_url: file_url || '',
      due_date: due_date || '',
      date_sent: new Date().toISOString().split('T')[0],
      recipient_count: 0
    };
    
    db.homeworks.unshift(newHw);
    writeDb(db);
    
    // Simulate SMTP Email Trigger
    console.log(`[SMTP SIMULATION] Sending email using config (${db.smtpConfig.email}) to ${emails.length} student(s) enrolled in course: ${course_id}`);
    emails.forEach(email => {
      console.log(`- Simulated Homework Email sent of Course (${course_id}) to: ${email}`);
    });

    res.json({ homework: newHw, emailsSentTo: emails });
  });

  app.delete('/api/homeworks/:id', (req, res) => {
    db = readDb();
    db.homeworks = db.homeworks.filter(h => h.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // Contact Messages APIs
  app.get('/api/messages', (req, res) => {
    db = readDb();
    res.json(db.messages);
  });

  app.post('/api/messages', (req, res) => {
    db = readDb();
    const { name, email, phone, subject, message } = req.body;
    const isEn = /[a-zA-Z]/.test(message || '');
    
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name || '',
      email: email || '',
      phone: phone || '',
      subject_ar: isEn ? subject : (subject || 'رسالة عامة من الموقع'),
      subject_en: isEn ? (subject || 'General message from web') : subject,
      message: message || '',
      date_sent: new Date().toISOString().split('T')[0],
      is_read: false
    };
    db.messages.unshift(newMsg);
    writeDb(db);
    res.json(newMsg);
  });

  app.put('/api/messages/:id', (req, res) => {
    db = readDb();
    const idx = db.messages.findIndex(m => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Message not found' });
    db.messages[idx].is_read = req.body.is_read !== undefined ? req.body.is_read : true;
    writeDb(db);
    res.json(db.messages[idx]);
  });

  app.delete('/api/messages/:id', (req, res) => {
    db = readDb();
    db.messages = db.messages.filter(m => m.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // File Upload Configuration with Multer (using memoryStorage for dynamic local/Supabase uploads)
  const upload = multer({ storage: multer.memoryStorage() });

  // Serve uploads folder statically before Vite middlewares (for local fallback files)
  app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

  // Upload endpoint with dynamic Supabase Storage / Local disk fallback
  app.post('/api/upload', (req, res, next) => {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        console.error('Multer file upload error:', err);
        return res.status(500).json({ error: err.message || 'Error uploading file to server' });
      }
      if (!req.file) {
        return res.status(400).json({ error: 'لم يتم تحميل أي ملف / No file was uploaded' });
      }

      const cleanName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${cleanName}`;

      if (supabase) {
        try {
          console.log(`[STORAGE] Uploading ${uniqueName} to Supabase bucket 'uploads'...`);
          const { data, error } = await supabase.storage
            .from('uploads')
            .upload(uniqueName, req.file.buffer, {
              contentType: req.file.mimetype,
              cacheControl: '3600',
              upsert: false
            });

          if (error) {
            console.error('[STORAGE] Supabase upload failed:', error);
            return res.status(500).json({ error: `Supabase Storage upload failed: ${error.message}` });
          }

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('uploads')
            .getPublicUrl(uniqueName);

          console.log('[STORAGE] Uploaded successfully. Public URL:', publicUrl);
          return res.json({ url: publicUrl, filename: req.file.originalname });
        } catch (err: any) {
          console.error('[STORAGE] Exception uploading to Supabase:', err);
          return res.status(500).json({ error: `Storage exception: ${err.message || err}` });
        }
      } else {
        // Local fallback: write buffer to disk
        try {
          const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          const localPath = path.join(uploadsDir, uniqueName);
          fs.writeFileSync(localPath, req.file.buffer);
          
          const fileUrl = `/uploads/${uniqueName}`;
          console.log('[STORAGE] Saved upload locally to:', fileUrl);
          return res.json({ url: fileUrl, filename: req.file.originalname });
        } catch (err: any) {
          console.error('[STORAGE] Local write failed:', err);
          return res.status(500).json({ error: `Local storage write failed: ${err.message || err}` });
        }
      }
    });
  });

  // Leads APIs
  app.get('/api/leads', (req, res) => {
    db = readDb();
    res.json(db.leads || []);
  });

  app.post('/api/leads', (req, res) => {
    db = readDb();
    const { email, phone, job_title, blog_id } = req.body;
    if (!email || !phone || !job_title || !blog_id) {
      return res.status(400).json({ error: 'الرجاء ملء جميع الحقول المطلوبة / Please provide email, phone, job title, and blog ID' });
    }

    const blog = db.blogs.find(b => b.id === blog_id);
    if (!blog) {
      return res.status(404).json({ error: 'المقال غير موجود / Blog post not found' });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      email,
      phone,
      job_title,
      blog_id,
      blog_title_ar: blog.title_ar,
      blog_title_en: blog.title_en,
      button_text_ar: blog.button_text_ar || 'تحميل',
      button_text_en: blog.button_text_en || 'Download',
      timestamp: new Date().toISOString()
    };

    if (!db.leads) db.leads = [];
    db.leads.unshift(newLead);
    writeDb(db);
    res.json(newLead);
  });

  app.delete('/api/leads/:id', (req, res) => {
    db = readDb();
    db.leads = (db.leads || []).filter(l => l.id !== req.params.id);
    writeDb(db);
    res.json({ message: 'Deleted' });
  });

  // --- GLOBAL ERROR HANDLER FOR API ---
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[API Server Error Handled]:', err);
    if (req.path.startsWith('/api/')) {
      return res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
      });
    }
    next(err);
  });

  // --- VITE MIDDLEWARE SETUP ---

async function setupViteOrListen() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // PORT Binding - Only listen if NOT running on Vercel
  if (!process.env.VERCEL) {
    const portNum = typeof PORT === 'string' ? parseInt(PORT, 10) : PORT;
    app.listen(portNum, '0.0.0.0', () => {
      console.log(`[EXPRESS SERVER] Dr. Ahmed Rady platform successfully booted on PORT: ${portNum}`);
    });
  }
}

setupViteOrListen().catch(err => {
  console.error('[SERVER BOOT ERROR]:', err);
});

export default app;

import { Language, TextConfig } from '../types';

export const DEFAULT_TEXTS: Record<string, { ar: string; en: string }> = {
  // Logo
  logo_title: { ar: 'د. أحمد راضي', en: 'Dr. Ahmed Rady' },

  // Navbar Links
  nav_home: { ar: 'الرئيسية', en: 'Home' },
  nav_why_legal: { ar: 'لماذا الإنجليزية القانونية', en: 'Why Legal English' },
  nav_why_us: { ar: 'مميزاتنا', en: 'Why Us' },
  nav_courses: { ar: 'الدورات', en: 'Courses' },
  nav_about: { ar: 'من نحن', en: 'About Dr. Ahmed' },
  nav_blog: { ar: 'المدونة', en: 'Blog' },
  nav_test: { ar: 'اختبر نفسك', en: 'Assess Yourself' },
  nav_contact: { ar: 'تواصل معنا', en: 'Contact' },
  nav_portal: { ar: 'بوابة الطلاب', en: 'Student Portal' },
  nav_admin: { ar: 'لوحة التحكم', en: 'Admin Dashboard' },
  nav_logout: { ar: 'خروج', en: 'Logout' },

  // Hero Section
  hero_badge: { ar: 'أكاديمية اللغة الإنجليزية القانونية الرائدة', en: 'The Leading Academy for Legal English' },
  hero_title: { ar: 'أتقن الإنجليزية القانونية مع د. أحمد راضي', en: 'Master Legal English with Dr. Ahmed Rady' },
  hero_desc: { ar: 'دورات متخصصة في اللغة الإنجليزية القانونية للمحامين والمستشارين والقانونيين — تعلّم من خبير بخبرة تزيد عن 20 عاماً في الصياغة والتحكيم الدولي.', en: 'Specialized Legal English courses for lawyers, legal advisors, and researchers. Learn from an expert with 20+ years of academy and arbitration practice.' },
  hero_btn_start: { ar: 'ابدأ التعلم الآن', en: 'Start Learning Now' },
  hero_btn_test: { ar: 'قم بإجراء اختبار تحديد المستوى', en: 'Take Placement Test' },

  // Stats Section
  stats_exp_num: { ar: '20+', en: '20+' },
  stats_exp_lbl: { ar: 'عاماً من الخبرة الأكاديمية والعملية', en: 'Years of Academy & Field Practice' },
  stats_org_num: { ar: '50+', en: '50+' },
  stats_org_lbl: { ar: 'هيئة ومكتب محاماة قمنا بتدريبهم', en: 'Law Firms & Entities Trained' },
  stats_lvl_num: { ar: '3+', en: '3+' },
  stats_lvl_lbl: { ar: 'مستويات منهجية متدرجة وشاملة', en: 'Syllabus Levels Covered' },
  stats_read_num: { ar: '100%', en: '100%' },
  stats_read_lbl: { ar: 'جاهزية تامة لامتحانات TOLES الدولية', en: 'TOLES Exam Readiness Ratio' },

  // Why Legal Section
  why_legal_title: { ar: 'لماذا الإنجليزية القانونية؟', en: 'Why Legal English?' },
  why_legal_subtitle: { ar: 'اللغة هي سلاحك القانوني الأول في الساحة الدولية', en: 'Language is your primary tool in the global legal arena' },
  why_legal: { ar: 'اللغة هي أداة المحامي الأولى. الإنجليزية القانونية ليست مجرد كلمات جديدة؛ بل هي لغة الدقة والحذر وصياغة الالتزامات. إتقانها يفتح لك الأبواب للمحافل الدولية ومكاتب المحاماة الكبرى وصياغة العقود العابرة للحدود دون الوقوف مكبلاً أمام ثغرات الترجمة.', en: 'Language is a lawyer\'s primary tool. Legal English is not merely about learning vocabulary; it is the language of precision, clarity, and binding obligations. Mastering it opens doors to elite law firms, international arbitration forums, and cross-border transactions without risking translation loopholes.' },

  // Benefits Section
  benefits_title: { ar: 'مميزات الانضمام لبرامجنا التدريبية', en: 'Why Choose Our Programs?' },
  benefits_subtitle: { ar: 'مزايا حصرية ومناهج معتمدة تؤهلك للريادة المهنية', en: 'Exclusive advantages and certified curriculum for legal excellence' },
  benefit1_title: { ar: 'منهج صياغة عملي وتطبيقي', en: 'Practical Drafting Syllabus' },
  benefit1_desc: { ar: 'التركيز على تفكيك بنود العقود وتعديلها وصياغتها وتجنب الحشو اللغوي وصياغة شروط نموذجية.', en: 'Focusing on deconstructing, redrafting, and drafting commercial agreements without legalese clutters.' },
  benefit2_title: { ar: 'التحضير لامتحانات TOLES الدولية', en: 'TOLES Exam Preparation' },
  benefit2_desc: { ar: 'منهج الدبلوم مواءم بالكامل لمتطلبات اختبار TOLES للحصول على شهادة معترف بها دولياً.', en: 'Our courses are fully aligned with International TOLES criteria to secure prestigious credentials.' },
  benefit3_title: { ar: 'تحت إشراف مباشر من د. أحمد راضي', en: 'Supervised by Dr. Ahmed Rady' },
  benefit3_desc: { ar: 'تصحيح أسبوعي تفاعلي لواجبات الصياغة والمرافعة الفردية مع المتابعة المستمرة للأداء.', en: 'Direct weekly assessments, individual feedback on homework, and interactive oral training.' },

  // Courses Section Header
  courses_title: { ar: 'البرامج والدبلومات التخصصية', en: 'Specialized Course Programs' },
  courses_subtitle: { ar: 'مستويات منهجية تدرجية مصممة خصيصاً للقضاة والمحامين والباحثين القانونيين', en: 'Graduated syllabus tracks designed specifically for judges, attorneys, and researchers' },
  courses_btn_view: { ar: 'عرض تفاصيل البرنامج والمنهج', en: 'View Program details' },
  courses_btn_register: { ar: 'تسجيل في الدورة', en: 'Register Now' },
  courses_btn_enrolled: { ar: 'أنت مشترك في الدورة', en: 'Enrolled' },
  courses_badge_new: { ar: 'جديد', en: 'NEW' },

  // Quiz Banner Section
  quiz_banner_badge: { ar: 'تقييم مجاني فوري', en: 'Free Instant Assessment' },
  quiz_banner_title: { ar: 'هل تريد معرفة مستواك في اللغة الإنجليزية القانونية؟', en: 'Want to test your Legal English skills?' },
  quiz_banner_desc: { ar: 'أجرِ هذا الاختبار التشخيصي السريع المكون من أسئلة فنية لقياس مهاراتك في صياغة وفهم البنود والمصطلحات اللاتينية.', en: 'Take our quick interactive diagnostic quiz designed to assess your understanding of boilerplate syntax and Latin terms.' },
  quiz_banner_btn: { ar: 'ابدأ اختبار تحديد المستوى الآن', en: 'Start Placement Test Now' },

  // Testimonials Section
  testimonials_title: { ar: 'ماذا يقول زملاؤك القانونيون؟', en: 'What our Scholars Say?' },
  testimonials_subtitle: { ar: 'آراء وتجارب واقعية لزملاء ارتقوا بمسيرتهم المهنية في مكاتب المحاماة والهيئات القضائية', en: 'Real experiences from lawyers and judicial members who elevated their careers with us' },

  // About Us Section
  about_title: { ar: 'عن المحاضر والأكاديمي', en: 'About Your Instructor' },
  about_subtitle: { ar: 'أستاذ متخصص في المصطلحات والترجمة القانونية والتحكيم الدولي', en: 'Senior Professor specializing in legal terminology and arbitration' },
  about_badge: { ar: 'سيرة ذاتية متميزة', en: 'Distinguished Bio' },
  about_bio: { ar: 'الدكتور أحمد راضي هو أستاذ متخصص في المصطلحات والترجمة القانونية والتحكيم الدولي. يتمتع بخبرة تزيد عن 20 عاماً في تدريب أجيال من المحامين، ووكلاء النيابة، وأعضاء الهيئات القضائية في الشرق الأوسط. يتميز بأسلوبه الأكاديمي الرصين والعملي في تفكيك المصطلحات اللاتينية والإنجليزية المعقدة وتطوير مهارات صياغة العقود الدولية والمرافعة والتهيئة لامتحانات TOLES (Legal English Certified Trainer).', en: 'Dr. Ahmed Rady is a senior professor specializing in terminology, legal translation, and international arbitration. With over 20 years of experience, he has trained generations of lawyers, prosecutors, and members of the judiciary in the Middle East. He is renowned for his academic rigour and practical methodology in deconstructing complex Latin and Anglo-American legal terms, building drafting and pleading skills, and preparing candidates for the TOLES exam.' },

  // Contact Us Section
  contact_title: { ar: 'تواصل معنا مباشرة', en: 'Contact Us Directly' },
  contact_subtitle: { ar: 'يسعدنا الرد على استفساراتكم حول التسجيل، التدريب المؤسسي الخاص، أو الاستشارات', en: 'We are glad to answer queries about courses, custom institutional training, or consults' },
  contact_name_lbl: { ar: 'الاسم الكامل للمستشار / الطالب', en: 'Full Name of Attorney / Scholar' },
  contact_email_lbl: { ar: 'البريد الإلكتروني المهني', en: 'Professional Email Address' },
  contact_phone_lbl: { ar: 'رقم الهاتف / الواتساب', en: 'WhatsApp / Phone Number' },
  contact_subj_lbl: { ar: 'موضوع الرسالة', en: 'Subject' },
  contact_msg_lbl: { ar: 'تفاصيل استفسارك', en: 'Your Inquiry Message' },
  contact_btn_send: { ar: 'إرسال الرسالة للمسؤول', en: 'Send Message' },
  contact_info_title: { ar: 'معلومات التواصل المباشرة', en: 'Direct Contact Channels' },
  contact_info_hours: { ar: 'الأحد - الخميس: 9:00 ص - 6:00 م', en: 'Sun - Thu: 9:00 AM - 6:00 PM' },
  contact_info_phone: { ar: '+20 100 888 8888', en: '+20 100 888 8888' },
  contact_info_email: { ar: 'info.dr.ahmed.rady@gmail.com', en: 'info.dr.ahmed.rady@gmail.com' },
  contact_info_loc: { ar: 'مكتب مصر والشرق الأوسط، القاهرة الجديدة', en: 'Egypt & Middle East Office, New Cairo' },

  // Portal & Login Popups
  portal_title: { ar: 'بوابة الطلاب والزملاء', en: 'Scholars Portal' },
  portal_subtitle: { ar: 'الوصول إلى المحاضرات المسجلة، جدول الحصص، وتحميل الواجبات وتتبع التقدم', en: 'Access webinars, timetables, homework briefs, and track study progress' },
  portal_login_title: { ar: 'تسجيل دخول الطلاب', en: 'Student Login' },
  portal_signup_title: { ar: 'إنشاء حساب طالب جديد', en: 'Create Student Account' },
  portal_admin_title: { ar: 'تسجيل دخول المشرف (د. أحمد)', en: 'Admin Portal (Dr. Ahmed)' },
  portal_btn_login: { ar: 'دخول البوابة الأكاديمية', en: 'Enter Academy Portal' },
  portal_btn_register: { ar: 'إنشاء حساب جديد والدخول', en: 'Create Account & Enter' },
  portal_switch_login: { ar: 'لديك حساب بالفعل؟ سجل دخولك', en: 'Already have an account? Sign in' },
  portal_switch_signup: { ar: 'ليس لديك حساب؟ سجل كطالب جديد', en: 'No account? Create one now' },
  portal_phone: { ar: 'رقم الهاتف / الواتساب', en: 'WhatsApp / Phone Number' },
  portal_name: { ar: 'الاسم الكامل', en: 'Full Name' },
  portal_email: { ar: 'البريد الإلكتروني', en: 'Email Address' },
  portal_password: { ar: 'كلمة مرور المشرف السرية', en: 'Admin Passphrase' },

  // Placement Test / Quiz Page
  quiz_title: { ar: 'اختبار تحديد المستوى التفاعلي', en: 'Diagnostic Placement Test' },
  quiz_subtitle: { ar: 'قياس فوري لمهاراتك اللغوية في الدقة وصياغة البنود النموذجية وتفكيك الصياغة القانونية المعقدة', en: 'Measure your skills in deconstructing archaic boilerplates, Latinisms, and modern drafting' },
  quiz_question_lbl: { ar: 'سؤال', en: 'Question' },
  quiz_btn_next: { ar: 'السؤال التالي', en: 'Next Question' },
  quiz_btn_submit: { ar: 'إرسال الإجابات وعرض التقييم', en: 'Submit Assessment' },
  quiz_btn_back: { ar: 'العودة للرئيسية', en: 'Back Home' },
  quiz_correct: { ar: 'إجابة صائبة! أحسنت.', en: 'Correct Answer! Outstanding.' },
  quiz_incorrect: { ar: 'إجابة خاطئة. راجع التفسير الفني أدناه.', en: 'Incorrect. Please review the technical explanation below.' },
  quiz_explanation: { ar: 'التفسير الفني للصياغة:', en: 'Technical Drafting Analysis:' },
  quiz_result_title: { ar: 'تقرير تقييم مستوى لغتك القانونية', en: 'Your Legal English Assessment' },
  quiz_result_level: { ar: 'المستوى الموصى به لتدريبك هو:', en: 'Your Recommended Syllabus Track:' },
  quiz_result_btn: { ar: 'استعراض المسار التدريبي والتسجيل', en: 'Explore Recommended Course' },

  // Course Detail Modal
  detail_duration: { ar: 'المدة الكلية:', en: 'Total Duration:' },
  detail_lessons: { ar: 'عدد الدروس:', en: 'Lessons Count:' },
  detail_level: { ar: 'المستوى الأكاديمي:', en: 'Academic Tier:' },
  detail_curriculum: { ar: 'منهج ووحدات البرنامج التفصيلية', en: 'Detailed Curriculum Modules' },
  detail_lesson_free: { ar: 'حصة مجانية تجريبية', en: 'Free Sample Lesson' },
  detail_btn_register: { ar: 'سجل الآن في هذا البرنامج', en: 'Enroll In This Track' },
  detail_specs: { ar: 'أبرز مخرجات وفوائد البرنامج:', en: 'Key Program Outcomes:' },

  // Payment
  payment_title: { ar: 'تأكيد التسجيل وتحويل الرسوم', en: 'Confirm Enrollment & Payment' },
  payment_bank_instructions: { ar: 'لإكمال عملية الالتحاق بالدورة، يرجى تحويل رسوم الدورة إلى الحساب البنكي التالي، ثم النقر على زر "تأكيد التحويل البنكي" لإخطار المسؤول فوراً.', en: 'To finalize your course enrollment, please execute a bank transfer of the course fee to the details below, and then click "Confirm Bank Transfer" to notify the admin.' },
  payment_bank_name: { ar: 'البنك الأهلي المصري — فرع القاهرة الجديدة', en: 'National Bank of Egypt — New Cairo Branch' },
  payment_bank_iban: { ar: 'EG12 0003 4567 8901 2345 6789 0', en: 'EG12 0003 4567 8901 2345 6789 0' },
  payment_bank_acc: { ar: '12345678901234', en: '12345678901234' },
  payment_btn_confirm: { ar: 'لقد قمت بالتحويل البنكي، أكد تسجيلي', en: 'Confirm Bank Transfer' },
  payment_btn_submitting: { ar: 'جاري إرسال طلب التأكيد للمسؤول...', en: 'Sending confirmation request...' },
  payment_success: { ar: '✓ تم إرسال تأكيد التحويل المالي للمسؤول بنجاح! تم فتح بوابتك الأكاديمية فوراً.', en: '✓ Bank confirmation received! Your student portal features have been fully unlocked.' },

  // Quiz Page Extra
  quiz_page_cancel: { ar: 'إلغاء التقييم والرجوع', en: 'Cancel Assessment' },
  quiz_page_question_label: { ar: 'الاستبيان الفني: السؤال', en: 'Question' },
  quiz_page_skip: { ar: 'تخطي هذا السؤال ↻', en: 'Skip Question ↻' },
  quiz_page_submit: { ar: 'تأكيد وإرسال', en: 'Submit' },
  quiz_page_finish: { ar: 'تقديم إنهاء الاختبار', en: 'Finish Test' },
  quiz_page_no_questions: { ar: 'لا توجد أسئلة تقييمية حالياً في الاختبار.', en: 'No assessment questions programmed yet.' },
  quiz_page_no_questions_back: { ar: 'الرئيسية', en: 'Back Home' },

  // Results Page Extra
  quiz_result_label: { ar: 'مستواك المقدر والبرنامج التدريبي:', en: 'ESTIMATED PLACEMENT RECOMMENDATION:' },
  quiz_result_score_label: { ar: 'النتيجة:', en: 'Score:' },
  quiz_result_rec_syllabus: { ar: 'الدورة الموصى بها لمستواك:', en: 'Recommended syllabus:' },
  quiz_result_rec_btn: { ar: 'افتح الدورة التدريبية الموصى بها', en: 'Check the Recommended course' },
  quiz_result_review_title: { ar: 'مراجعة إجابات أسئلة التقييم ومفتاح الحل', en: 'Detailed Assessment Answers Review' },
  quiz_result_review_desc: { ar: 'استعرض إجاباتك التي اخترتها مقارنة بالإجابات الصائبة النموذجية في الأسفل.', en: 'Review your chosen answers compared with the correct academic model answers.' },
  quiz_result_retake_btn: { ar: 'إعادة إجراء التقييم من جديد', en: 'Retake Assessment Test' },
  quiz_result_home_btn: { ar: 'العودة إلى الصفحة الرئيسية', en: 'Return to Home' },

  // Recommendations
  quiz_rec_high_level: { ar: 'متقدم / خبير ممارس', en: 'Senior Advocacy / Advanced' },
  quiz_rec_high_desc: { ar: 'درجات ممتازة ورصينة! نوصيك بالبرنامج المتقدم لتطوير المهارات التخصصية والمرافعة الفموية الاستعراضية مع د. أحمد راضي.', en: 'Outstanding precision! We highly recommend our Advanced track to bolster technical drafting and pleading attributes.' },
  quiz_rec_med_level: { ar: 'متوسط', en: 'Intermediate practitioner' },
  quiz_rec_med_desc: { ar: 'أجوبة صائبة وتدل على أساس طيب. نوصيك ببرنامج الصياغة القانونية المتقدمة لتعزيز عقود الشركات وإجراءات التحكيم.', en: 'Commendable familiarity. Our Intermediate corporate drafting program is perfect to reinforce advanced contracts and procedures.' },
  quiz_rec_low_level: { ar: 'مبتدئ لتعميق الأساس', en: 'Primary / Foundations' },
  quiz_rec_low_desc: { ar: 'بداية طيبة ومبشرة! ننصحك بالبدء من المستوى التأسيسي للتمكن من صياغة ديباجة العقد واستعمال shall و Boilerplates لتجنب الثغرات المميتة.', en: 'A hopeful beginning! We strongly recommend starting with our Legal Foundations level to master baseline clauses and escape literal translation traps.' }
};

export function t(config: TextConfig | null, key: string, lang: Language): string {
  if (config) {
    const langKey = `${key}_${lang}`;
    if (langKey in config) {
      const val = (config as any)[langKey];
      if (typeof val === 'string' && val.trim() !== '') return val;
    }
  }
  const def = DEFAULT_TEXTS[key];
  if (def) {
    return def[lang];
  }
  return '';
}

export function tArray(config: TextConfig | null, key: string, lang: Language): string[] {
  if (config) {
    const langKey = `${key}_${lang}`;
    if (langKey in config) {
      const val = (config as any)[langKey];
      if (Array.isArray(val) && val.length > 0) return val;
    }
  }
  if (key === 'about_bullets') {
    return lang === 'ar' ? [
      "حاصل على دكتوراه في القانون الدولي والمقارن والترجمة العقودية.",
      "مستشار تحكيم دولي مقيد لدى هيئات التحكيم الإقليمية.",
      "مدرب معتمد لامتحانات TOLES الدولية للغة الإنجليزية القانونية.",
      "أشرف على تدريب وصياغة عقود لأكثر من 50 جهة ومؤسسة قانونية."
    ] : [
      "PhD in International & Comparative Law and Contractual Translation.",
      "Certified International Arbitrator registered with regional boards.",
      "Accredited Trainer for the International Legal English TOLES Exam.",
      "Supervised legal drafting and executive training for 50+ corporate firms."
    ];
  }
  return [];
}

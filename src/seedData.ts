/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, BlogPost, Question, Student, CalendarSession, Homework, ContactMessage, TextConfig } from './types';
import { ASSESSMENT_QUESTIONS } from './assessmentQuestions';

export const INITIAL_TEXT_CONFIG: TextConfig = {
  hero_image_ar: "/attached_image_0.png",
  hero_image_en: "/attached_image_0.png",
  about_image_ar: "/attached_image_0.png",
  about_image_en: "/attached_image_0.png",
  hero_title_ar: "أتقن الإنجليزية القانونية مع د. أحمد راضي",
  hero_title_en: "Master Legal English with Dr. Ahmed Rady",
  hero_desc_ar: "دورات متخصصة في اللغة الإنجليزية القانونية للمحامين والمستشارين والقانونيين — تعلّم من خبير بخبرة تزيد عن 20 عاماً في الصياغة والتحكيم الدولي.",
  hero_desc_en: "Specialized Legal English courses for lawyers, legal advisors, and researchers. Learn from an expert with 20+ years of academy and arbitration practice.",
  why_legal_ar: "اللغة هي أداة المحامي الأولى. الإنجليزية القانونية ليست مجرد كلمات جديدة؛ بل هي لغة الدقة والحذر وصياغة الالتزامات. إتقانها يفتح لك الأبواب للمحافل الدولية ومكاتب المحاماة الكبرى وصياغة العقود العابرة للحدود دون الوقوف مكبلاً أمام ثغرات الترجمة.",
  why_legal_en: "Language is a lawyer's primary tool. Legal English is not merely about learning vocabulary; it is the language of precision, clarity, and binding obligations. Mastering it opens doors to elite law firms, international arbitration forums, and cross-border transactions without risking translation loopholes.",
  about_bio_ar: "الدكتور أحمد راضي هو أستاذ متخصص في المصطلحات والترجمة القانونية والتحكيم الدولي. يتمتع بخبرة تزيد عن 20 عاماً في تدريب أجيال من المحامين، ووكلاء النيابة، وأعضاء الهيئات القضائية في الشرق الأوسط. يتميز بأسلوبه الأكاديمي الرصين والعملي في تفكيك المصطلحات اللاتينية والإنجليزية المعقدة وتطوير مهارات صياغة العقود الدولية والمرافعة والتهيئة لامتحانات TOLES (Legal English Certified Trainer).",
  about_bio_en: "Dr. Ahmed Rady is a senior professor specializing in terminology, legal translation, and international arbitration. With over 20 years of experience, he has trained generations of lawyers, prosecutors, and members of the judiciary in the Middle East. He is renowned for his academic rigour and practical methodology in deconstructing complex Latin and Anglo-American legal terms, building drafting and pleading skills, and preparing candidates for the TOLES exam.",
  about_bullets_ar: [
    "حاصل على دكتوراه في القانون الدولي والمقارن والترجمة العقودية.",
    "مستشار تحكيم دولي مقيد لدى هيئات التحكيم الإقليمية.",
    "مدرب معتمد لامتحانات TOLES الدولية للغة الإنجليزية القانونية.",
    "أشرف على تدريب وصياغة عقود لأكثر من 50 جهة ومؤسسة قانونية."
  ],
  about_bullets_en: [
    "PhD in International & Comparative Law and Contractual Translation.",
    "Certified International Arbitrator registered with regional boards.",
    "Accredited Trainer for the International Legal English TOLES Exam.",
    "Supervised legal drafting and executive training for 50+ corporate firms."
  ],

  // --- Quiz Banner Default Overrides ---
  quiz_banner_badge_ar: "تقييم مجاني فوري",
  quiz_banner_badge_en: "FREE ACADEMIC ASSESSMENT",
  quiz_banner_title_ar: "اكتشف مستواك في الإنجليزية القانونية الآن",
  quiz_banner_title_en: "Discover Your True Legal English Proficiency",
  quiz_banner_desc_ar: "اختبار سريع ومجاني ومعد من قبل د. أحمد راضي، يحدد مستواك بدقة، ويمنحك توصية بالدورة المناسبة لمستقبلك الوظيفي.",
  quiz_banner_desc_en: "A 5-minute specialized multiple-choice diagnostic designed to map your vocabulary limits and recommend customized tracks.",
  quiz_banner_btn_ar: "ابدأ التقييم التشخيصي الآن",
  quiz_banner_btn_en: "Begin Assessment",

  // --- Quiz Page Default Overrides ---
  quiz_page_cancel_ar: "إلغاء التقييم والرجوع",
  quiz_page_cancel_en: "Cancel Assessment",
  quiz_page_question_label_ar: "الاستبيان الفني: السؤال",
  quiz_page_question_label_en: "Question",
  quiz_page_skip_ar: "تخطي هذا السؤال ↻",
  quiz_page_skip_en: "Skip Question ↻",
  quiz_page_submit_ar: "تأكيد وإرسال",
  quiz_page_submit_en: "Submit",
  quiz_page_finish_ar: "تقديم إنهاء الاختبار",
  quiz_page_finish_en: "Finish Test",
  quiz_page_no_questions_ar: "لا توجد أسئلة تقييمية حالياً في الاختبار.",
  quiz_page_no_questions_en: "No assessment questions programmed yet.",
  quiz_page_no_questions_back_ar: "الرئيسية",
  quiz_page_no_questions_back_en: "Back Home",

  // --- Quiz Result Default Overrides ---
  quiz_result_label_ar: "مستواك المقدر والبرنامج التدريبي:",
  quiz_result_label_en: "ESTIMATED PLACEMENT RECOMMENDATION:",
  quiz_result_score_label_ar: "النتيجة:",
  quiz_result_score_label_en: "Score:",
  quiz_result_rec_syllabus_ar: "الدورة الموصى بها لمستواك:",
  quiz_result_rec_syllabus_en: "Recommended syllabus:",
  quiz_result_rec_btn_ar: "افتح الدورة التدريبية الموصى بها",
  quiz_result_rec_btn_en: "Check the Recommended course",
  quiz_result_review_title_ar: "مراجعة إجابات أسئلة التقييم ومفتاح الحل",
  quiz_result_review_desc_ar: "استعرض إجاباتك التي اخترتها مقارنة بالإجابات الصائبة النموذجية في الأسفل.",
  quiz_result_review_desc_en: "Review your chosen answers compared with the correct academic model answers.",
  quiz_result_retake_btn_ar: "إعادة إجراء التقييم من جديد",
  quiz_result_retake_btn_en: "Retake Assessment Test",
  quiz_result_home_btn_ar: "العودة إلى الصفحة الرئيسية",
  quiz_result_home_btn_en: "Return to Home",

  // --- Recommendations ---
  quiz_rec_high_level_ar: "متقدم / خبير ممارس",
  quiz_rec_high_level_en: "Senior Advocacy / Advanced",
  quiz_rec_high_desc_ar: "درجات ممتازة ورصينة! نوصيك بالبرنامج المتقدم لتطوير المهارات التخصصية والمرافعة الفموية الاستعراضية مع د. أحمد راضي.",
  quiz_rec_high_desc_en: "Outstanding precision! We highly recommend our Advanced track to bolster technical drafting and pleading attributes.",

  quiz_rec_med_level_ar: "متوسط",
  quiz_rec_med_level_en: "Intermediate practitioner",
  quiz_rec_med_desc_ar: "أجوبة صائبة وتدل على أساس طيب. نوصيك ببرنامج الصياغة القانونية المتقدمة لتعزيز عقود الشركات وإجراءات التحكيم.",
  quiz_rec_med_desc_en: "Commendable familiarity. Our Intermediate corporate drafting program is perfect to reinforce advanced contracts and procedures.",

  quiz_rec_low_level_ar: "مبتدئ لتعميق الأساس",
  quiz_rec_low_level_en: "Primary / Foundations",
  quiz_rec_low_desc_ar: "بداية طيبة ومبشرة! ننصحك بالبدء من المستوى التأسيسي للتمكن من صياغة ديباجة العقد واستعمال shall و Boilerplates لتجنب الثغرات المميتة.",
  quiz_rec_low_desc_en: "A hopeful beginning! We strongly recommend starting with our Legal Foundations level to master baseline clauses and escape literal translation traps."
};

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-1",
    title_ar: "الدبلوماسية القانونية وصياغة العقود الدولية — المستوى الأول",
    title_en: "Legal Diplomacy & International Contract Drafting — Level 1",
    subtitle_ar: "الأساسيات والمبادئ التوجيهية مع صياغة الشروط النموذجية",
    subtitle_en: "Foundations, Guiding Principles & Boilerplate Clauses",
    description_ar: "تغطي هذه الدورة الهياكل الأساسية للعقود التجارية الدولية باللغة الإنجليزية. ستتعلم الفروق الدقيقة بين الالتزامات والوعود، واستخدام الكلمات الإلزامية مثل 'shall' و 'may'، وتفصيل ديباجة العقد والشروط الإدارية (Boilerplate clauses) كالقوة القاهرة وتسوية المنازعات القانونية.",
    description_en: "This course covers the foundational structures of international commercial contracts in English. You will learn the subtle distinctions between obligations and covenants, the proper usage of 'shall' and 'may', and how to draft clear preambles and boilerplate clauses.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    price: 180,
    duration_ar: "١٢ ساعة أكاديمية — ٦ أسابيع",
    duration_en: "12 Academic Hours — 6 Weeks",
    lessons_count: 12,
    level_ar: "مبتدئ إلى متوسط",
    level_en: "Beginner to Intermediate",
    specs_ar: [
      "دراسة هيكل العقد التجاري بالكامل.",
      "شرح الاختلافات الجوهرية لـ Legal English vs General English.",
      "نماذج صياغة لـ ٨ بنود نموذجية شائعة.",
      "شهادة اجتياز مصدقة من أكاديمية الدكتور أحمد راضي."
    ],
    specs_en: [
      "In-depth analysis of complete commercial contracts.",
      "Deconstruction of Legal English vs General English styles.",
      "Live drafting templates for 8 standard boilerplate clauses.",
      "Certificate of achievement signed by Dr. Ahmed Rady."
    ],
    is_published: true,
    modules: [
      {
        id: "c1-m1",
        title_ar: "الوحدة الأولى: البنية الفنية والمصطلحات التأسيسية",
        title_en: "Module 1: Technical Structure & Foundational Jargon",
        lessons: [
          { id: "c1-m1-l1", title_ar: "المقدمة: لماذا تختلف لغة القانون؟", title_en: "Introduction: Why Law has its own language", duration_ar: "٤٥ دقيقة", duration_en: "45 Mins", is_free: true },
          { id: "c1-m1-l2", title_ar: "المصطلحات اللاتينية الشائعة (Inter Alia, Prima Facie)", title_en: "Common Latinisms in Contracts", duration_ar: "٦٠ دقيقة", duration_en: "60 Mins" },
          { id: "c1-m1-l3", title_ar: "الصيغ الثنائية والثلاثية ورث الترجمة (Null and Void)", title_en: "Doublets and Triplets (e.g. Null & Void)", duration_ar: "٥٠ دقيقة", duration_en: "50 Mins" }
        ]
      },
      {
        id: "c1-m2",
        title_ar: "الوحدة الثانية: صياغة الالتزامات والبنود الأساسية",
        title_en: "Module 2: Drafting Obligations and Key Clauses",
        lessons: [
          { id: "c1-m2-l1", title_ar: "صياغة الالتزامات: قواعد استخدام Shall vs Must", title_en: "Drafting Obligations: Rule of Shall vs Must", duration_ar: "٥٥ دقيقة", duration_en: "55 Mins" },
          { id: "c1-m2-l2", title_ar: "بند القوة القاهرة (Force Majeure): الكلمات والمخاطر", title_en: "Force Majeure Clause: Words and Allocation of Risks", duration_ar: "٧٠ دقيقة", duration_en: "70 Mins" },
          { id: "c1-m2-l3", title_ar: "بند القانون الواجب التطبيق وتسوية المنازعات", title_en: "Governing Law & Dispute Resolution Clauses", duration_ar: "٦٠ دقيقة", duration_en: "60 Mins" }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title_ar: "صياغة العقود التجارية واجراءات تأسيس الشركات — المستوى الثاني",
    title_en: "Commercial Drafting & Corporate Procedures — Level 2",
    subtitle_ar: "للشركات المساهمة، الاندماج والاستحواذ، ومحاضر مجالس الإدارة",
    subtitle_en: "Corporate Structuring, M&A Agreements & Board Minutes",
    description_ar: "هذه الدورة متخصصة ومتطورة، تنتقل بك إلى عمق الصياغات المتقدمة للشركات. تتعلم صياغة اتفاقيات عدم الإفصاح (NDA)، وصياغة المقترحات وعروض الشراء والاندماج، وصياغة لوائح الحوكمة الداخلية ومحاضر اجتماعات مجالس الإدارات باحترافية وتوافق عالمي.",
    description_en: "An advanced specialization course designed to plunge you into complex corporate documentation. Learn to draft bulletproof Non-Disclosure Agreements (NDAs), Share Purchase Agreements, M&A letters of intent, corporate bylaws, and elegant minutes of board meetings.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600",
    price: 250,
    duration_ar: "١٨ ساعة أكاديمية — ٨ أسابيع",
    duration_en: "18 Academic Hours — 8 Weeks",
    lessons_count: 16,
    level_ar: "متقدم",
    level_en: "Advanced",
    specs_ar: [
      "قوالب جاهزة لاتفاقيات الاندماج وNDA.",
      "محاكاة لفض منازعات تأسيس الشركات.",
      "تغطية كاملة للمصطلحات الإجرائية في القانون الأنجلو-أمريكي.",
      "تقييم أسبوعي واختبار مراجعة فني مباشر مع د. أحمد."
    ],
    specs_en: [
      "Ready-to-use templates for M&A and NDAs.",
      "Simulated disputes concerning corporate setup documents.",
      "Comprehensive Anglo-American corporate procedures and vocabulary.",
      "Weekly analytical tasks and direct written appraisal from Dr. Ahmed."
    ],
    is_published: true,
    modules: [
      {
        id: "c2-m1",
        title_ar: "الوحدة الأولى: عقود ما قبل التأسيس والسرية",
        title_en: "Module 1: Pre-incorporation & Confidentiality Agreements",
        lessons: [
          { id: "c2-m1-l1", title_ar: "صياغة اتفاقية السرية وعدم الإفصاح (NDA)", title_en: "Drafting Non-Disclosure Agreements (NDAs)", duration_ar: "٦٠ دقيقة", duration_en: "60 Mins" },
          { id: "c2-m1-l2", title_ar: "خطابات النوايا ومذكرات التفاهم (MOU)", title_en: "Letters of Intent & Memorandums of Understanding (MOU)", duration_ar: "٧٥ دقيقة", duration_en: "75 Mins" }
        ]
      },
      {
        id: "c2-m2",
        title_ar: "الوحدة الثانية: اتفاقيات المساهمين والمستندات الداخلية",
        title_en: "Module 2: Shareholder Agreements & Internal Corporate Governance",
        lessons: [
          { id: "c2-m2-l1", title_ar: "صياغة عقد بيع الأسهم (Share Purchase Agreement)", title_en: "Drafting Share Purchase Agreements (SPA)", duration_ar: "٩٠ دقيقة", duration_en: "90 Mins" },
          { id: "c2-m2-l2", title_ar: "كيفية كتابة محاضر مجالس الإدارة بالإنجليزية", title_en: "How to draft professional board minutes", duration_ar: "٦٥ دقيقة", duration_en: "65 Mins" }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title_ar: "مصطلحات التقاضي الدولي وصياغة مذكرات التحكيم والدفاع",
    title_en: "International Litigation Jargon & Arbitration Advocacy",
    subtitle_ar: "المرافعة، كتابة المذكرات القانونية، وحل الخلافات أمام غرف التجارة الدولية",
    subtitle_en: "Oral Pleading, Brief Writing & ICC Arbitration Rules",
    description_ar: "دورة مكثفة تعنى بالدفاع والتمثيل القانوني الخارجي. تشرح مصطلحات المرافعة التنافسية، وصياغة صحيفة الدعوى، والرد عليها، وتحليل مستندات الإثبات والتحكيم لدى غرفة التجارة الدولية (ICC) وجهات فض النزاعات.",
    description_en: "A rigorous practical course detailing advocacy, legal briefing, and foreign commercial representation. You will study litigation and litigation-support terminologies, rules of evidence, drafting statements of claim and defense statements under ICC regulations.",
    image: "https://images.unsplash.com/photo-1505664194779-8bebcb95df84?auto=format&fit=crop&q=80&w=600",
    price: 320,
    duration_ar: "٢٠ ساعة عملية — ١٠ أسابيع",
    duration_en: "20 Practical Hours — 10 Weeks",
    lessons_count: 20,
    level_ar: "طاقم قانوني رفيع / قضاة ومستشارين",
    level_en: "Senior Legal Counsel & Judiciary Members",
    specs_ar: [
      "تغطية مكثفة لقواعد التحكيم التابعة للـ ICC و UNCITRAL.",
      "محاكاة محاكمة تحكيمية صورية (Moot Court) تفاعلية.",
      "صياغة مذكرات حقيقية مع مراجعة تصحيحية للغة والصياغة الأسلوبية.",
      "تأهيل ممتاز للمرافعة باللغة الإنجليزية في اللجان الإقليمية."
    ],
    specs_en: [
      "Intensive training on ICC & UNCITRAL arbitration guidelines.",
      "Interactive mock tribunal session (Moot Court).",
      "Analysis and stylistic correction of actual statements of defense.",
      "Advanced oral pleading and structural presentation skills in English."
    ],
    is_published: true,
    modules: [
      {
        id: "c3-m1",
        title_ar: "الوحدة الأولى: لغة الخصومة والتقاضي التمهيدي",
        title_en: "Module 1: Language of Dispute & Pre-trial Litigation",
        lessons: [
          { id: "c3-m1-l1", title_ar: "مصطلحات الاختصاص والمستندات الإجرائية", title_en: "Jurisdiction Terminologies & Service of Process", duration_ar: "٦٠ دقيقة", duration_en: "60 Mins" },
          { id: "c3-m1-l2", title_ar: "صياغة صحيفة الادعاء (Statement of Claim)", title_en: "Drafting the Statement of Claim", duration_ar: "٩٠ دقيقة", duration_en: "90 Mins" }
        ]
      },
      {
        id: "c3-m2",
        title_ar: "الوحدة الثانية: جلسات التحكيم ومهارات الدفاع الفموي",
        title_en: "Module 2: Arbitration Hearings and Oral Pleading",
        lessons: [
          { id: "c3-m2-l1", title_ar: "كتابة رد الدعوى والدفوع الموضوعية والشكلية", title_en: "Writing Responses & Counterclaims", duration_ar: "٨٠ دقيقة", duration_en: "80 Mins" },
          { id: "c3-m2-l2", title_ar: "مهارات الاستجواب المتقاطع للشهود (Cross-Examination)", title_en: "Art of Cross-Examination in English", duration_ar: "٩٠ دقيقة", duration_en: "90 Mins" }
        ]
      }
    ]
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title_ar: "لماذا تفشل الترجمة الحرفية في صياغة العقود التجارية؟ ورثة 'Shall' نموذجاً",
    title_en: "Why Literal Translation Fails in Commercial Contracts? The Case of 'Shall'",
    summary_ar: "الكثير من المترجمين والمحامين يترجمون كلمة 'Shall' حرفياً بكلمة 'يجب' أو بشكل مستقبل، مما يخلق التباساً كبيراً في النية العقدية ومستوى الإلزام الفعلي أمام القضاة.",
    summary_en: "Many legal practitioners translate the word 'Shall' literally into future tense syntax, creating severe ambiguity in contractual intent and enforceable obligations in courts.",
    content_ar: "الترجمة الحرفية هي العدو اللدود للنصوص القانونية. في الإنجليزية القانونية، تعتبر الكلمات مثل 'shall', 'may', 'must', 'should' ركائز تحدد بدقة طبيعة البنود.\n\nعندما تكتب:\n`The Buyer shall pay the price...` فهذا التزام متبادل صارم. في حين أن كلمة `must` تُستخدم للشروط سابقة الوقوع، و`may` للتخيير. \n\nالمترجم غير المتخصص قد يصوغ العقود متناسياً هذا التقسيم، مما يجعل الطرف الآخر يتهرب من بعض الالتزامات بحجة غياب الدقة اللغوية والشرط الملزم. نوصي بتجنب استخدام Shall عند عدم الرغبة في صياغة الالتزام المباشر والاستعاضة عنها بفهم واضح لـ Active Voice.",
    content_en: "Literal translation is the arch-enemy of legal prose. In Legal English, terms like 'shall', 'may', 'must', and 'should' are structural anchors rather than mere auxiliary words.\n\nWhen writing:\n`The Buyer shall pay the price...` you are establishing a strict, binding covenant. Conversely, `must` is highly preferred for preconditions rather than direct bilateral obligations, and `may` indicates discretionary options.\n\nA non-specialist or literal translator might misuse these, paving the way for loopholes. We highly recommend utilizing the active voice and clearly mapping obligations rather than relying on archaic phrasing.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600",
    date: "2026-05-15",
    reading_time_ar: "دقائق ٥ قراءة",
    reading_time_en: "5 mins read",
    views: 412,
    is_published: true
  },
  {
    id: "blog-2",
    title_ar: "فهم عبارات الضمان والتعويض في القانون الإنجليزي: Representations vs Warranties",
    title_en: "Understanding Warranties & Representations in English Common Law",
    summary_ar: "دراسة لغوية وقانونية متعمقة لواحد من البنود الأكثر أهمية في عقود الاستحواذ وتداول الأسهم وتوزيع الأرباح والمخاطر المترتبة عليها.",
    summary_en: "An in-depth linguistic and legal analysis of one of the most disputed clauses in acquisition, equity sales, and commercial distribution contracts.",
    content_ar: "في صياغة العقود الأنجلو-أمريكية، تجد غالباً العبارة المدمجة: `The Seller represents and warrants...` \n\nلكن هل يدرك الصائغ أن `Representation` هي إقرار بواقعة ما قبل التعاقد يدفع الطرف للقبول بالعقد، وإذا ثبت عدم صحتها يملك المتضرر حق إبطال العقد بأكمله (Rescission) والمطالبة بالتعويض عن التدليس؟\nبينما `Warranty` هي تعهد فرعي داخل العقد، عدم الالتزام به يمنح حق التعويض عن الأضرار المادية فقط (Damages) دون إلغاء العقد.\n\nالتدريب المتعمق يعلمك متى تستعمل كل كلمة بدقة لتوفير أفضل حماية لموكلك.",
    content_en: "In common law contract drafting, one frequently encounters the combined phrase: `The Seller represents and warrants...` \n\nYet does the draughtsman know that a `Representation` is a pre-contractual statement of fact intended to induce the other party to enter the contract? If false, it constitutes misrepresentation, leading to the severe remedy of Rescission (unwinding the entire contract) and tortious damages.\nIn contrast, a `Warranty` is a contractual statement that, if breached, only gives rise to a claim for damages for breach of warranty, leaving the contract legally intact.\n\nMastering these nuances empowers lawyers to select terms that safeguard client interests with ultimate precision.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    date: "2026-06-02",
    reading_time_ar: "قراءة ٧ دقائق",
    reading_time_en: "7 mins read",
    views: 289,
    is_published: true
  },
  {
    id: "blog-3",
    title_ar: "كيف تستعد لاختبار الإنجليزية القانونية الدولي TOLES؟ دليل المحامي الطموح",
    title_en: "How to Prepare for the International Legal English TOLES Exam? Guide",
    summary_ar: "دليلك الشامل لخطوات التسجيل، طبيعة الأسئلة في المستويات الثلاثة (Foundation, Higher, Advanced) وكيف تضع لنفسك مكاناً متميزاً.",
    summary_en: "Your comprehensive roadmap for registering, analyzing question formats across the three tiers (Foundation, Higher, Advanced), and securing an elite score.",
    content_ar: "اختبار TOLES (Test of Legal English Skills) هو الشهادة المهنية الأكثر احتراماً وتقديراً لمهارات اللغة الإنجليزية القانونية في العالم.\n\nالامتحان لا يختبر معلوماتك القانونية الصريحة، بل يركز بدقة على مهارتك اللغوية في توضيح المفاهيم، وحل المشكلات، صياغة الخطابات الرسمية، وتحليل العقود التجارية.\n\nأفضل طرق التحضير تشمل القراءة العملية للوثائق الحقيقية، والتدرب على إيقاف الحشو الأسلوبي، وتحسين مهارات المراجعة اللغوية. دورتنا المتقدمة تؤهلك للحصول على درجات استثنائية من خلال ورشات صياغة تجريبية للامتحان.",
    content_en: "The TOLES (Test of Legal English Skills) exam is the most prestigious and internationally recognized certification of legal English proficiency worldwide.\n\nImportantly, the exam does not evaluate explicit legal knowledge; rather, it zeroes in on functional linguistic precision—clarity, conciseness, correcting redundant prose, resolving ambiguities, and deconstructing contracts.\n\nPreparation involves parsing authentic draft documents, dismantling legalese, and building sharp proofreading habits. Our advanced syllabus directly primes you for TOLES excellence via target assignments.",
    image: "https://images.unsplash.com/photo-1505664194779-8bebcb95df84?auto=format&fit=crop&q=80&w=600",
    date: "2026-06-18",
    reading_time_ar: "قراءة ٦ دقائق",
    reading_time_en: "6 mins read",
    views: 105,
    is_published: true
  }
];

export const INITIAL_QUESTIONS: Question[] = ASSESSMENT_QUESTIONS;

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "student-1",
    name: "خالد بن عبد الرحمن",
    email: "khaled.lawyer@yahoo.com",
    phone: "+966504123456",
    enrolled_courses: ["course-1"],
    progress: { "course-1": ["c1-m1-l1", "c1-m1-l2"] },
    enrollment_date: "2026-06-01",
    payment_status: "Paid",
    amount_paid: 180
  },
  {
    id: "student-2",
    name: "مروة المصري",
    email: "marwa.egypt@gmail.com",
    phone: "+201012345678",
    enrolled_courses: ["course-1", "course-2"],
    progress: { "course-1": ["c1-m1-l1", "c1-m1-l2", "c1-m1-l3"], "course-2": ["c2-m1-l1"] },
    enrollment_date: "2026-06-05",
    payment_status: "Paid",
    amount_paid: 430
  },
  {
    id: "student-3",
    name: "سلمان العتيبي",
    email: "salman@lawfirm-sa.com",
    phone: "+966551239870",
    enrolled_courses: ["course-2"],
    progress: { "course-2": [] },
    enrollment_date: "2026-06-12",
    payment_status: "Pending",
    amount_paid: 0
  },
  {
    id: "student-4",
    name: "أمل الجاركي",
    email: "amal@kuwait-justice.org",
    phone: "+96566123456",
    enrolled_courses: ["course-3"],
    progress: { "course-3": ["c3-m1-l1"] },
    enrollment_date: "2026-06-16",
    payment_status: "Paid",
    amount_paid: 320
  }
];

export const INITIAL_CALENDAR_SESSIONS: CalendarSession[] = [
  {
    id: "session-1",
    title_ar: "محاكاة صياغة بنود Boilerplate — عقد بيع دولي",
    title_en: "Live Workshop: Boilerplate Drafting Exercises",
    course_id: "course-1",
    date: "2026-06-21",
    day_of_week: 0, // Sun
    start_time: "10:00",
    end_time: "11:30",
    color: "#235347",
    notes_ar: "يرجى من جميع الطلاب مراجعة بنود القوة القاهرة وحل الخلافات قبل البدء في الورشة.",
    notes_en: "Students are kindly requested to review governing law and force majeure concepts beforehand."
  },
  {
    id: "session-2",
    title_ar: "فض النزاعات وتأسيس الشركات وصياغة الـ NDA",
    title_en: "Corporate Law: Drafting NDA and Shareholders Pact",
    course_id: "course-2",
    date: "2026-06-22",
    day_of_week: 1, // Mon
    start_time: "12:00",
    end_time: "13:30",
    color: "#163832",
    notes_ar: "سنقوم بدراسة نموذج حقيقي لاتفاق مساهمين صادر عن غرفة التجارة بلندن للتحكيم الدولي.",
    notes_en: "We will dissect an actual shareholders agreement sample issued under LCIA arbitration rules."
  },
  {
    id: "session-3",
    title_ar: "محكمة صورية (Moot Court) — الاستجواب المتبادل للشهود",
    title_en: "Moot Court: Mastery of Cross-Examination",
    course_id: "course-3",
    date: "2026-06-24",
    day_of_week: 3, // Wed
    start_time: "15:00",
    end_time: "17:00",
    color: "#0B2B26",
    notes_ar: "يتعين على جميع مسؤولي المرافعة ارتداء الزي الرسمي، وإعداد صحيفة الاستعراض مسبقاً وبصيغة PDF.",
    notes_en: "Advocates must dress formally and prepare witness response sheets in PDF formatting."
  },
  {
    id: "session-4",
    title_ar: "جلسة أسئلة وأجوبة مفتوحة حول امتحان TOLES",
    title_en: "Open Q&A for TOLES Prep & General Advice",
    course_id: "course-1",
    date: "2026-06-25",
    day_of_week: 4, // Thu
    start_time: "11:00",
    end_time: "12:00",
    color: "#8EB69B",
    notes_ar: "جلسة مراجعة تدار بحضور جميع الطلاب، ودردشة تفاعلية لأسئلة الصياغة السريعة والتقويم الإداري والتنظيمي.",
    notes_en: "General review session for all level streams. Open floor format to answer dynamic queries."
  }
];

export const INITIAL_HOMEWORKS: Homework[] = [
  {
    id: "hw-1",
    title_ar: "الواجب الأول: مراجعة وصياغة بند القوة القاهرة لعقد توريد",
    title_en: "Homework 1: Drafting Force Majeure for Supply Agreement",
    course_id: "course-1",
    description_ar: "قم بقراءة السيناريو المرفق وإعادة صياغة البند لتغطية مخاطر الوباء والأزمات الملاحية الدولية بشكل متوازن وصالح للمحاكمة.",
    description_en: "Read the attached scenario and redraft the boilerplate clause to incorporate pandemic events and international maritime shipping hurdles dynamically.",
    file_name: "Force_Majeure_Drafting_Task.pdf",
    file_url: "data:application/pdf;base64,JVBERi0xLjQKJ..." ,// Mock PDF data URL
    due_date: "2026-06-25",
    date_sent: "2026-06-18",
    recipient_count: 8
  },
  {
    id: "hw-2",
    title_ar: "الواجب الثاني: إرسال مذكرة السرية وعدم الإفصاح المراجعة",
    title_en: "Homework 2: Reviewing and Correcting NDA Representations",
    course_id: "course-2",
    description_ar: "قم باستخراج ٤ ثغرات صياغية في مستند الـ NDA المرفق وإعادة كتابته بلغة نشطة متوازنة.",
    description_en: "Identify 4 loopholes in the provided Non-Disclosure Agreement draft and rewrite using clean, modern, active voice grammar.",
    file_name: "NDA_Loopholes_Correction.pdf",
    file_url: "data:application/pdf;base64,JVBERi0xLjQKJ...",
    due_date: "2026-06-30",
    date_sent: "2026-06-19",
    recipient_count: 5
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "د. هاني المفلح",
    email: "h.mufleh@muflehlaw.com",
    phone: "+962791234567",
    subject_ar: "طلبات تدريب خاصة لمكتب المحاماة",
    subject_en: "Custom Corporate Training Request",
    message: "أود الاستفسار عن إمكانية عقد ورشة تدريبية خاصة لعدد ١٥ محامياً مبتدئاً في مكتبنا بالأردن حول صياغة مذكرات التحكيم باللغة الإنجليزية القانونية.",
    date_sent: "2026-06-17",
    is_read: false
  },
  {
    id: "msg-2",
    name: "الأستاذة ياسمين صبري",
    email: "y.sabry@justice.gov.eg",
    phone: "+201234567890",
    subject_ar: "طلب تسجيل في المستوى المتقدم",
    subject_en: "Inquiry about Advanced Level Course",
    message: "هل يمكنني الانضمام المباشر للمستوى الرفيع الخاص بالتقاضي الدولي دون المرور بالمستوى الأول؟ فأنا أعمل كمستشارة قانونية بوزارة العدل منذ ٧ سنوات.",
    date_sent: "2026-06-18",
    is_read: true
  }
];

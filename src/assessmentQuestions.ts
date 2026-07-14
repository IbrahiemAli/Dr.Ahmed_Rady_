import { Question } from './types';

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: "q-1",
    text_ar: "The big book is ________.",
    text_en: "The big book is ________.",
    options_ar: ["mine", "for my", "me"],
    options_en: ["mine", "for my", "me"],
    correct_index: 0,
    explanation_ar: "الضمير المناسب هنا هو ضمير الملكية 'mine' (لي / ملكي) في نهاية الجملة.",
    explanation_en: "The possessive pronoun 'mine' is the correct form to use at the end of the sentence."
  },
  {
    id: "q-2",
    text_ar: "I’ll ________ their cat while they are away on holiday.",
    text_en: "I’ll ________ their cat while they are away on holiday.",
    options_ar: ["be looking at", "be looking into", "be looking over", "be looking after"],
    options_en: ["be looking at", "be looking into", "be looking over", "be looking after"],
    correct_index: 3,
    explanation_ar: "الفعل المركب 'look after' يعني الاعتناء بـ (العناية بالقطة).",
    explanation_en: "The phrasal verb 'look after' means to take care of."
  },
  {
    id: "q-3",
    text_ar: "The test was ________ difficult she had problems finishing it on time.",
    text_en: "The test was ________ difficult she had problems finishing it on time.",
    options_ar: ["so", "a", "as", "such"],
    options_en: ["so", "a", "as", "such"],
    correct_index: 0,
    explanation_ar: "نستخدم 'so + adjective + that' للتعبير عن النتيجة (كان الاختبار صعباً لدرجة أنها...).",
    explanation_en: "We use 'so + adjective + that' to express a consequence."
  },
  {
    id: "q-4",
    text_ar: "By the time she arrives, we ________ our homework.",
    text_en: "By the time she arrives, we ________ our homework.",
    options_ar: ["will have finished", "finish", "will finish", "were finished"],
    options_en: ["will have finished", "finish", "will finish", "were finished"],
    correct_index: 0,
    explanation_ar: "نستخدم المستقبل التام 'will have finished' للإشارة إلى حدث سيكتمل بحلول وقت معين في المستقبل.",
    explanation_en: "The future perfect tense 'will have finished' indicates an action that will be completed before a specific point in the future."
  },
  {
    id: "q-5",
    text_ar: "She ________ lunch by the time we arrived.",
    text_en: "She ________ lunch by the time we arrived.",
    options_ar: ["have finished", "had finished", "finishing", "finished"],
    options_en: ["have finished", "had finished", "finishing", "finished"],
    correct_index: 1,
    explanation_ar: "الماضي التام 'had finished' يعبر عن حدث اكتمل قبل حدث آخر في الماضي.",
    explanation_en: "The past perfect tense 'had finished' is used for an action completed before another action in the past."
  },
  {
    id: "q-6",
    text_ar: "The sun ________ at 9 last night.",
    text_en: "The sun ________ at 9 last night.",
    options_ar: ["was setting", "set", "setted", "sat"],
    options_en: ["was setting", "set", "setted", "sat"],
    correct_index: 1,
    explanation_ar: "الماضي البسيط للفعل 'set' (تغرب) هو 'set' (شاذ لا يتغير).",
    explanation_en: "The past tense of the verb 'set' is irregular and remains 'set'."
  },
  {
    id: "q-7",
    text_ar: "When I stopped ________ to Mary, she was picking some flowers in her garden.",
    text_en: "When I stopped ________ to Mary, she was picking some flowers in her garden.",
    options_ar: ["speak", "to speak", "spoke", "speaking"],
    options_en: ["speak", "to speak", "spoke", "speaking"],
    correct_index: 1,
    explanation_ar: "نستخدم المصدر 'to speak' ليعني التوقف لغرض التحدث (توقف ليتحدث مع ماري).",
    explanation_en: "The infinitive 'to speak' is used to express that someone stopped an action in order to speak."
  },
  {
    id: "q-8",
    text_ar: "Despite ________ hard, he failed the exam.",
    text_en: "Despite ________ hard, he failed the exam.",
    options_ar: ["he studied", "studying", "he has studied", "study"],
    options_en: ["he studied", "studying", "he has studied", "study"],
    correct_index: 1,
    explanation_ar: "تتبع 'Despite' باسم أو بصيغة gerund (اسم الفاعل ينتهي بـ -ing).",
    explanation_en: "'Despite' is followed by a noun or a gerund ('studying')."
  },
  {
    id: "q-9",
    text_ar: "That room ________ for a meeting today.",
    text_en: "That room ________ for a meeting today.",
    options_ar: ["is being used", "is using", "used", "is used"],
    options_en: ["is being used", "is using", "used", "is used"],
    correct_index: 0,
    explanation_ar: "المبني للمجهول في المضارع المستمر 'is being used' للتعبير عن حدث مستمر الآن.",
    explanation_en: "The present continuous passive 'is being used' shows an ongoing action in the passive voice."
  },
  {
    id: "q-10",
    text_ar: "If she ________ about his financial situation, she would have helped him out.",
    text_en: "If she ________ about his financial situation, she would have helped him out.",
    options_ar: ["had known", "have known", "had been knowing", "knew"],
    options_en: ["had known", "have known", "had been knowing", "knew"],
    correct_index: 0,
    explanation_ar: "هذه الحالة الشرطية الثالثة (Type 3) للتعبير عن ندم في الماضي: 'If + past perfect, would have + V3'.",
    explanation_en: "This is a third conditional sentence representing a hypothetical past situation: 'If + past perfect, would have + V3'."
  },
  {
    id: "q-11",
    text_ar: "He made his children ________ their homework every afternoon.",
    text_en: "He made his children ________ their homework every afternoon.",
    options_ar: ["do", "studied", "to do", "to study"],
    options_en: ["do", "studied", "to do", "to study"],
    correct_index: 0,
    explanation_ar: "الفعل السببي 'make' يتبعه مفعول به ثم المصدر بدون to (bare infinitive).",
    explanation_en: "The causative verb 'make' is followed by an object and a bare infinitive ('do')."
  },
  {
    id: "q-12",
    text_ar: "You will be fined if you ________ your car there.",
    text_en: "You will be fined if you ________ your car there.",
    options_ar: ["park", "will park", "would have parked", "are to park"],
    options_en: ["park", "will park", "would have parked", "are to park"],
    correct_index: 0,
    explanation_ar: "هذه الحالة الشرطية الأولى (Type 1): مضارع بسيط في شق الشرط ومستقبل في جواب الشرط.",
    explanation_en: "First conditional: present simple ('park') in the if-clause and future ('will be fined') in the main clause."
  },
  {
    id: "q-13",
    text_ar: "Would you mind if I ________ early?",
    text_en: "Would you mind if I ________ early?",
    options_ar: ["would leave", "left", "would left", "was left"],
    options_en: ["would leave", "left", "would left", "was left"],
    correct_index: 1,
    explanation_ar: "التركيب المهذب 'Would you mind if I' يتبعه فعل في الماضي البسيط.",
    explanation_en: "The polite request 'Would you mind if I...' is followed by the simple past tense ('left')."
  },
  {
    id: "q-14",
    text_ar: "If I ________ the question, I would answer.",
    text_en: "If I ________ the question, I would answer.",
    options_ar: ["would understand", "have understood", "understand", "understood"],
    options_en: ["would understand", "have understood", "understand", "understood"],
    correct_index: 3,
    explanation_ar: "الحالة الشرطية الثانية (Type 2) للتعبير عن افتراض غير واقعي الآن: ماضي بسيط في شق الشرط.",
    explanation_en: "Second conditional: past simple ('understood') in the if-clause and 'would' in the main clause."
  },
  {
    id: "q-15",
    text_ar: "If it ________ fine tomorrow, I will go for a swim.",
    text_en: "If it ________ fine tomorrow, I will go for a swim.",
    options_ar: ["is", "were", "would be", "will"],
    options_en: ["is", "were", "would be", "will"],
    correct_index: 0,
    explanation_ar: "الحالة الشرطية الأولى (Type 1): مضارع بسيط للفعل be وهو 'is' مع المفرد.",
    explanation_en: "First conditional: present simple ('is') with singular subject 'it' for future possibility."
  },
  {
    id: "q-16",
    text_ar: "He should have come if he ________.",
    text_en: "He should have come if he ________.",
    options_ar: ["should have had to", "had to", "could have", "had had to"],
    options_en: ["should have had to", "had to", "could have", "had had to"],
    correct_index: 3,
    explanation_ar: "شق الشرط مع 'should have come' في الماضي التام 'had had to' (لو اضطر لذلك).",
    explanation_en: "With a past conditional main clause, the if-clause requires the past perfect form 'had had to'."
  },
  {
    id: "q-17",
    text_ar: "If John ________ hard, he will pass the exam.",
    text_en: "If John ________ hard, he will pass the exam.",
    options_ar: ["works", "worked", "had worked", "has worked"],
    options_en: ["works", "worked", "had worked", "has worked"],
    correct_index: 0,
    explanation_ar: "الحالة الشرطية الأولى (Type 1): مضارع بسيط مع المفرد 'works'.",
    explanation_en: "First conditional structure: present simple ('works') with singular subject 'John'."
  },
  {
    id: "q-18",
    text_ar: "Information:",
    text_en: "Information:",
    options_ar: ["Countable", "Uncountable"],
    options_en: ["Countable", "Uncountable"],
    correct_index: 1,
    explanation_ar: "كلمة 'Information' اسم غير معدود (Uncountable).",
    explanation_en: "The word 'Information' is an uncountable noun."
  },
  {
    id: "q-19",
    text_ar: "Rules:",
    text_en: "Rules:",
    options_ar: ["Uncountable", "Countable"],
    options_en: ["Uncountable", "Countable"],
    correct_index: 1,
    explanation_ar: "كلمة 'Rules' اسم معدود بصيغة الجمع (Countable).",
    explanation_en: "The word 'Rules' is a countable noun in its plural form."
  },
  {
    id: "q-20",
    text_ar: "Sheep:",
    text_en: "Sheep:",
    options_ar: ["Uncountable", "Countable"],
    options_en: ["Uncountable", "Countable"],
    correct_index: 1,
    explanation_ar: "كلمة 'Sheep' اسم معدود (مفرده وجمعه متطابقان).",
    explanation_en: "The word 'Sheep' is a countable noun (singular and plural forms are identical)."
  },
  {
    id: "q-21",
    text_ar: "Learning:",
    text_en: "Learning:",
    options_ar: ["Uncountable", "Countable"],
    options_en: ["Uncountable", "Countable"],
    correct_index: 0,
    explanation_ar: "كلمة 'Learning' تمثل اسماً غير معدود (مجرد).",
    explanation_en: "The noun 'Learning' is uncountable representing an abstract concept."
  },
  {
    id: "q-22",
    text_ar: "Money:",
    text_en: "Money:",
    options_ar: ["Countable", "Uncountable"],
    options_en: ["Countable", "Uncountable"],
    correct_index: 1,
    explanation_ar: "كلمة 'Money' اسم غير معدود (لا نقول monies في الاستخدام العام اليومي).",
    explanation_en: "The word 'Money' is treated as an uncountable noun in English."
  },
  {
    id: "q-23",
    text_ar: "Rice:",
    text_en: "Rice:",
    options_ar: ["Uncountable", "Countable"],
    options_en: ["Uncountable", "Countable"],
    correct_index: 0,
    explanation_ar: "كلمة 'Rice' (أرز) اسم غير معدود.",
    explanation_en: "The word 'Rice' is an uncountable noun."
  },
  {
    id: "q-24",
    text_ar: "Are you shopping for ________ health club to join so you can get fit?",
    text_en: "Are you shopping for ________ health club to join so you can get fit?",
    options_ar: ["an", "a", "the", "–"],
    options_en: ["an", "a", "the", "–"],
    correct_index: 1,
    explanation_ar: "نستخدم أداة النكرة 'a' لأن الاسم يبدأ بصوت ساكن ومفرد نكرة.",
    explanation_en: "We use the indefinite article 'a' before a singular countable noun starting with a consonant sound."
  },
  {
    id: "q-25",
    text_ar: "Choose wisely you could end up choosing ________ wrong club and lose more money.",
    text_en: "Choose wisely you could end up choosing ________ wrong club and lose more money.",
    options_ar: ["an", "–", "a", "the"],
    options_en: ["an", "–", "a", "the"],
    correct_index: 3,
    explanation_ar: "نستخدم أداة التعريف 'the' مع الصفات المميزة مثل 'wrong' للإشارة إلى شيء محدد.",
    explanation_en: "The definite article 'the' is used with specifying adjectives like 'wrong'."
  },
  {
    id: "q-26",
    text_ar: "You may find out too late that ________ health clubs aren't for you.",
    text_en: "You may find out too late that ________ health clubs aren't for you.",
    options_ar: ["a", "–", "the", "an"],
    options_en: ["a", "–", "the", "an"],
    correct_index: 1,
    explanation_ar: "لا نضع أداة (–) عند التحدث عن الأسماء بصيغة الجمع بصفة عامة.",
    explanation_en: "No article (zero article) is used when talking about plural nouns in general."
  },
  {
    id: "q-27",
    text_ar: "First, know what you want and need in ________ fitness facility.",
    text_en: "First, know what you want and need in ________ fitness facility.",
    options_ar: ["a", "the", "–", "an"],
    options_en: ["a", "the", "–", "an"],
    correct_index: 0,
    explanation_ar: "نستخدم أداة النكرة 'a' مع اسم مفرد يبدأ بصوت ساكن ولم يسبق ذكره.",
    explanation_en: "The indefinite article 'a' is appropriate for a singular countable noun mentioned generally."
  },
  {
    id: "q-28",
    text_ar: "If you only want exercise classes ________ exercise studio without weights may work.",
    text_en: "If you only want exercise classes ________ exercise studio without weights may work.",
    options_ar: ["–", "an", "a", "the"],
    options_en: ["–", "an", "a", "the"],
    correct_index: 1,
    explanation_ar: "نستخدم 'an' لأن الاسم المفرد يبدأ بصوت متحرك (vowel sound 'e').",
    explanation_en: "The indefinite article 'an' is required before a singular noun beginning with a vowel sound."
  },
  {
    id: "q-29",
    text_ar: "If you’re looking for ________ place to do only bodybuilding, you’ll be happy in a gym.",
    text_en: "If you’re looking for ________ place to do only bodybuilding, you’ll be happy in a gym.",
    options_ar: ["a", "an", "–", "the"],
    options_en: ["a", "an", "–", "the"],
    correct_index: 0,
    explanation_ar: "نستخدم أداة النكرة 'a' مع اسم مفرد ساكن الحرف الأول 'place'.",
    explanation_en: "We use the indefinite article 'a' before 'place' as it starts with a consonant."
  },
  {
    id: "q-30",
    text_ar: "You may be in ________ market for a full-service health club.",
    text_en: "You may be in ________ market for a full-service health club.",
    options_ar: ["an", "–", "the", "a"],
    options_en: ["an", "–", "the", "a"],
    correct_index: 2,
    explanation_ar: "التعقيب الاصطلاحي الشائع هو 'be in the market' (يبحث عن شراء أو الانضمام لـ).",
    explanation_en: "The standard idiomatic expression is 'in the market' for something."
  },
  {
    id: "q-31",
    text_ar: "He made his escape by jumping ________ a window and jumping ________ a waiting car.",
    text_en: "He made his escape by jumping ________ a window and jumping ________ a waiting car.",
    options_ar: ["Over / into", "Out of / into", "Between / into", "Up to / out of"],
    options_en: ["Over / into", "Out of / into", "Between / into", "Up to / out of"],
    correct_index: 1,
    explanation_ar: "القفز من النافذة يمثله 'out of'، والقفز لداخل السيارة يمثله 'into'.",
    explanation_en: "'Out of' means moving from inside a room to outside via the window. 'Into' means entering the car."
  },
  {
    id: "q-32",
    text_ar: "To get to the Marketing department, you have to go ________ those stairs and then ________ the corridor.",
    text_en: "To get to the Marketing department, you have to go ________ those stairs and then ________ the corridor.",
    options_ar: ["up / along", "between / into", "out of / between", "out of / into"],
    options_en: ["up / along", "between / into", "out of / between", "out of / into"],
    correct_index: 0,
    explanation_ar: "الصعود عبر الدرج يمثله 'up'، والسير في ممر طويل يمثله 'along'.",
    explanation_en: "To go 'up' stairs and walk 'along' a corridor matches standard direction prepositions."
  },
  {
    id: "q-33",
    text_ar: "I saw something about it ________ television.",
    text_en: "I saw something about it ________ television.",
    options_ar: ["at", "on", "in", "through"],
    options_en: ["at", "on", "in", "through"],
    correct_index: 1,
    explanation_ar: "نستخدم حرف الجر 'on' مع وسائل الإعلام والبث كالتلفاز والراديو.",
    explanation_en: "The preposition 'on' is used with broadcasting media like television."
  },
  {
    id: "q-34",
    text_ar: "I couldn't get ________ the door so I had to climb ________ a window.",
    text_en: "I couldn't get ________ the door so I had to climb ________ a window.",
    options_ar: ["out of / between", "up / along", "through / in", "out of / into"],
    options_en: ["out of / between", "up / along", "through / in", "out of / into"],
    correct_index: 2,
    explanation_ar: "المرور بفتحة الباب يمثله 'through'، والدخول من النافذة يمثله 'in'.",
    explanation_en: "We get 'through' a doorway, and climb 'in' a window to enter."
  },
  {
    id: "q-35",
    text_ar: "I'm having ________ of trouble passing my driving exam.",
    text_en: "I'm having ________ of trouble passing my driving exam.",
    options_ar: ["a little", "a few", "a great deal", "some"],
    options_en: ["a little", "a few", "a great deal", "some"],
    correct_index: 2,
    explanation_ar: "نستخدم 'a great deal of' مع الأسماء غير المعدودة للتعبير عن كثرة وتضخم الشيء.",
    explanation_en: "We use 'a great deal' followed by 'of' with uncountable nouns ('trouble')."
  },
  {
    id: "q-36",
    text_ar: "________ of the movies were rated PG.",
    text_en: "________ of the movies were rated PG.",
    options_ar: ["enough", "a great deal", "a majority of", "a little"],
    options_en: ["enough", "a great deal", "a majority of", "a little"],
    correct_index: 2,
    explanation_ar: "نستخدم 'a majority of' مع الأسماء المعدودة بصيغة الجمع مثل 'movies'.",
    explanation_en: "'A majority of' is used with countable plural nouns to indicate most of them."
  },
  {
    id: "q-37",
    text_ar: "________ of information proved to be outdated.",
    text_en: "________ of information proved to be outdated.",
    options_ar: ["a great deal of", "enough", "a lot", "a few"],
    options_en: ["a great deal of", "enough", "a lot", "a few"],
    correct_index: 0,
    explanation_ar: "نستخدم 'a great deal of' للتعبير عن كمية كبيرة من اسم غير معدود كالمعلومات.",
    explanation_en: "'A great deal of' is correct for expressing a large amount of uncountable noun ('information')."
  },
  {
    id: "q-38",
    text_ar: "We're close to the project deadline, but there is still ________ time left.",
    text_en: "We're close to the project deadline, but there is still ________ time left.",
    options_ar: ["a few", "a great deal", "a little", "a majority of"],
    options_en: ["a few", "a great deal", "a little", "a majority of"],
    correct_index: 2,
    explanation_ar: "نستخدم 'a little' مع اسم غير معدود للتعبير عن كمية صغيرة متبقية (بعض الوقت).",
    explanation_en: "'A little' is used with uncountable nouns ('time') to express a small but sufficient amount."
  },
  {
    id: "q-39",
    text_ar: "Although there are ________ brilliant students in this state, only ________ will remain.",
    text_en: "Although there are ________ brilliant students in this state, only ________ will remain.",
    options_ar: ["many / a few", "a great deal / a little", "few / most", "a lot / a little"],
    options_en: ["many / a few", "a great deal / a little", "few / most", "a lot / a little"],
    correct_index: 0,
    explanation_ar: "نستخدم 'many' مع الجمع للكثرة، و 'a few' للقلة المتبقية.",
    explanation_en: "'Many' refers to a large number of countable students, and 'a few' indicates a small remaining group."
  },
  {
    id: "q-40",
    text_ar: "________ his illness, John continued to play rugby.",
    text_en: "________ his illness, John continued to play rugby.",
    options_ar: ["Although", "Despite", "Even though"],
    options_en: ["Although", "Despite", "Even though"],
    correct_index: 1,
    explanation_ar: "يتبع 'Despite' بتركيب اسمي ('his illness') بينما 'Although' تتطلب جملة كاملة.",
    explanation_en: "'Despite' is a preposition followed by a noun phrase, whereas 'Although' introduces a clause."
  },
  {
    id: "q-41",
    text_ar: "After many Peace Corps teachers return to the States, ________ professional English teachers.",
    text_en: "After many Peace Corps teachers return to the States, ________ professional English teachers.",
    options_ar: ["they often become", "and often become", "often they become"],
    options_en: ["they often become", "and often become", "often they become"],
    correct_index: 0,
    explanation_ar: "الشق الرئيسي يحتاج إلى فاعل وفعل واضحين: 'they often become'.",
    explanation_en: "The main clause needs a clear subject and verb: 'they often become'."
  },
  {
    id: "q-42",
    text_ar: "________ that the American Indian crossed a land bridge into North America.",
    text_en: "________ that the American Indian crossed a land bridge into North America.",
    options_ar: ["It is consider", "It thought", "It is thought"],
    options_en: ["It is consider", "It thought", "It is thought"],
    correct_index: 2,
    explanation_ar: "التركيب الصحيح للمبني للمجهول للإشارة إلى الرأي الشائع هو 'It is thought that...'.",
    explanation_en: "The passive structure 'It is thought that' is used to express general belief."
  },
  {
    id: "q-43",
    text_ar: "________ the Depression, individual stock ownership was common in the United States.",
    text_en: "________ the Depression, individual stock ownership was common in the United States.",
    options_ar: ["It was during", "By the time of", "Because"],
    options_en: ["It was during", "By the time of", "Because"],
    correct_index: 0,
    explanation_ar: "التركيب المناسب للظرف الزمني المقترن بالحدث هو 'It was during'.",
    explanation_en: "'It was during' correctly introduces a period of historical context."
  },
  {
    id: "q-44",
    text_ar: "Never before ________ as rapidly as during the last three decades.",
    text_en: "Never before ________ as rapidly as during the last three decades.",
    options_ar: ["have communications developed", "communications have developed", "have developed communications"],
    options_en: ["have communications developed", "communications have developed", "have developed communications"],
    correct_index: 0,
    explanation_ar: "عند بدء الجملة بظرف سلبي مثل 'Never before'، تنعكس صيغة الجملة (تقديم الفعل المساعد على الفاعل).",
    explanation_en: "Inversion is triggered by negative adverbials like 'Never before', requiring auxiliary verb before subject."
  },
  {
    id: "q-45",
    text_ar: "It is not yet clearly understood ________ cause obesity.",
    text_en: "It is not yet clearly understood ________ cause obesity.",
    options_ar: ["eating too many hamburgers can", "why eating too many hamburgers can", "why can eating too many hamburgers"],
    options_en: ["eating too many hamburgers can", "why eating too many hamburgers can", "why can eating too many hamburgers"],
    correct_index: 1,
    explanation_ar: "الجملة الاسمية التي تبدأ بأداة استفهام تستخدم ترتيب الجملة العادية (فاعل + فعل مساهم).",
    explanation_en: "Noun clauses explaining a concept use regular word order 'why' + subject + verb."
  },
  {
    id: "q-46",
    text_ar: "The Eiffel Tower is ________ the Leaning Tower of Pisa.",
    text_en: "The Eiffel Tower is ________ the Leaning Tower of Pisa.",
    options_ar: ["as more popular a tourist attraction as", "as popular a tourist attraction than", "as popular a tourist attraction as"],
    options_en: ["as more popular a tourist attraction as", "as popular a tourist attraction than", "as popular a tourist attraction as"],
    correct_index: 2,
    explanation_ar: "صيغة التشابه الصحيحة هي 'as + adjective + noun phrase + as'.",
    explanation_en: "The equal comparison construction is 'as + adjective + noun phrase + as'."
  },
  {
    id: "q-47",
    text_ar: "Your e-mail ________ from any computer with an Internet connection.",
    text_en: "Your e-mail ________ from any computer with an Internet connection.",
    options_ar: ["can accessed", "can be access", "can be accessed", "can to access"],
    options_en: ["can accessed", "can be access", "can be accessed", "can to access"],
    correct_index: 2,
    explanation_ar: "المبني للمجهول بعد الفعل المساعد: 'can be + past participle (accessed)'.",
    explanation_en: "Passive voice with modal verb requires 'can be' followed by past participle V3."
  },
  {
    id: "q-48",
    text_ar: "For maximum efficiency, the coils on the back of your refrigerator ________ twice a year.",
    text_en: "For maximum efficiency, the coils on the back of your refrigerator ________ twice a year.",
    options_ar: ["should be cleaning", "should be cleaned", "should be clean", "should cleaning"],
    options_en: ["should be cleaning", "should be cleaned", "should be clean", "should cleaning"],
    correct_index: 1,
    explanation_ar: "مبني للمجهول لتقديم توصية وإلزام: 'should be + V3 (cleaned)'.",
    explanation_en: "Passive voice expressing recommendation requires 'should be' and the V3 form."
  },
  {
    id: "q-49",
    text_ar: "The direction of an electron's spin ________ magnetically.",
    text_en: "The direction of an electron's spin ________ magnetically.",
    options_ar: ["can be control", "can controlled", "can control", "can be controlled"],
    options_en: ["can be control", "can controlled", "can control", "can be controlled"],
    correct_index: 3,
    explanation_ar: "المبني للمجهول المناسب للتعبير عن الإمكانية: 'can be + controlled'.",
    explanation_en: "The standard passive modal structure is 'can be' followed by the past participle."
  },
  {
    id: "q-50",
    text_ar: "Some experts say that current techniques for matching fingerprints ________.",
    text_en: "Some experts say that current techniques for matching fingerprints ________.",
    options_ar: ["may make flaws", "may be flaw", "may make flawed", "may be flawed"],
    options_en: ["may make flaws", "may be flaw", "may make flawed", "may be flawed"],
    correct_index: 3,
    explanation_ar: "استخدام الصفة المبنية للمجهول 'may be flawed' للإشارة لوجود عيوب.",
    explanation_en: "Using the passive form 'may be flawed' is the natural way to denote having faults."
  },
  {
    id: "q-51",
    text_ar: "Pluto ________ of many of the same materials as the primordial solar system.",
    text_en: "Pluto ________ of many of the same materials as the primordial solar system.",
    options_ar: ["may be maken", "may be made", "may is made", "may made"],
    options_en: ["may be maken", "may be made", "may is made", "may made"],
    correct_index: 1,
    explanation_ar: "التركيب الصحيح للتكوين 'may be made of' (قد يتكون من).",
    explanation_en: "The passive voice for composition is 'may be made' + of."
  },
  {
    id: "q-52",
    text_ar: "More ________ to control the introduction of genetically modified seeds and plants.",
    text_en: "More ________ to control the introduction of genetically modified seeds and plants.",
    options_ar: ["must doing", "must do", "must be doing", "must be done"],
    options_en: ["must doing", "must do", "must be doing", "must be done"],
    correct_index: 3,
    explanation_ar: "وجوب المبني للمجهول: 'must be done' (يجب أن يتم فعله).",
    explanation_en: "Causative passive representing requirement uses 'must be' + past participle ('done')."
  },
  {
    id: "q-53",
    text_ar: "Last week Tom said, \"I want to visit my friends this weekend.\"",
    text_en: "Last week Tom said, \"I want to visit my friends this weekend.\"",
    options_ar: [
      "Tom said he wants to visit his friends that weekend.",
      "Tom said he wanted to visit his friends this weekend.",
      "Tom said he wanted to visit his friends that weekend."
    ],
    options_en: [
      "Tom said he wants to visit his friends that weekend.",
      "Tom said he wanted to visit his friends this weekend.",
      "Tom said he wanted to visit his friends that weekend."
    ],
    correct_index: 2,
    explanation_ar: "في الكلام المنقول (Reported Speech)، يرجع زمن الفعل خطوة للماضي (want -> wanted) وتتغير أسماء الإشارة (this -> that).",
    explanation_en: "In reported speech, the present simple 'want' shifts to past simple 'wanted', and 'this' shifts to 'that'."
  },
  {
    id: "q-54",
    text_ar: "Two weeks ago Jerry told me, \"I'm studying English a lot at the moment.\"",
    text_en: "Two weeks ago Jerry told me, \"I'm studying English a lot at the moment.\"",
    options_ar: [
      "Jerry said he was studying English a lot at that moment.",
      "Jerry said he was studying English a lot at the moment.",
      "Jerry said I was studying English a lot at that moment."
    ],
    options_en: [
      "Jerry said he was studying English a lot at that moment.",
      "Jerry said he was studying English a lot at the moment.",
      "Jerry said I was studying English a lot at that moment."
    ],
    correct_index: 0,
    explanation_ar: "تتحول صيغة المضارع المستمر للماضي المستمر (am studying -> was studying) والظرف (at the moment -> at that moment).",
    explanation_en: "The present continuous shifts to past continuous ('was studying') and 'at the moment' becomes 'at that moment'."
  },
  {
    id: "q-55",
    text_ar: "He asked me, \"Have you finished reading the newspaper?\"",
    text_en: "He asked me, \"Have you finished reading the newspaper?\"",
    options_ar: [
      "He asked me if I had finished reading the newspaper.",
      "He asked me if I finished reading the newspaper.",
      "He asked me if had I finished reading the newspaper."
    ],
    options_en: [
      "He asked me if I had finished reading the newspaper.",
      "He asked me if I finished reading the newspaper.",
      "He asked me if had I finished reading the newspaper."
    ],
    correct_index: 0,
    explanation_ar: "يتحول السؤال بـ (yes/no) لكلام منقول باستخدام 'if' ثم الفاعل ثم الماضي التام (had finished).",
    explanation_en: "Yes/No questions in reported speech use 'if' + subject + past perfect ('had finished')."
  },
  {
    id: "q-56",
    text_ar: "\"I get up every morning at seven o'clock,\" Peter said.",
    text_en: "\"I get up every morning at seven o'clock,\" Peter said.",
    options_ar: [
      "Peter said I got up every morning at seven o'clock.",
      "Peter said he had got up every morning at seven o'clock.",
      "Peter said he got up every morning at seven o'clock."
    ],
    options_en: [
      "Peter said I got up every morning at seven o'clock.",
      "Peter said he had got up every morning at seven o'clock.",
      "Peter said he got up every morning at seven o'clock."
    ],
    correct_index: 2,
    explanation_ar: "يتحول الضمير 'I' إلى 'he' ويتحول الفعل للماضي البسيط 'got up'.",
    explanation_en: "The pronoun 'I' shifts to 'he' and the present tense 'get' shifts to 'got' in reported speech."
  },
  {
    id: "q-57",
    text_ar: "Susan reassured me, \"I can come tonight.\"",
    text_en: "Susan reassured me, \"I can come tonight.\"",
    options_ar: [
      "Susan told me she could come tomorrow evening.",
      "Susan told me I could come that night.",
      "Susan told me she could come that night."
    ],
    options_en: [
      "Susan told me she could come tomorrow evening.",
      "Susan told me I could come that night.",
      "Susan told me she could come that night."
    ],
    correct_index: 2,
    explanation_ar: "يتحول الفعل 'can' إلى 'could' والظرف 'tonight' إلى 'that night'.",
    explanation_en: "The modal 'can' shifts to 'could', and 'tonight' shifts to 'that night'."
  },
  {
    id: "q-58",
    text_ar: "She said, \"I really wish I had bought that new car.\"",
    text_en: "She said, \"I really wish I had bought that new car.\"",
    options_ar: [
      "She told me she really wished she had bought that new car.",
      "She told me she really had wished she had bought that new car.",
      "She told me she really wished she bought that new car."
    ],
    options_en: [
      "She told me she really wished she had bought that new car.",
      "She told me she really had wished she had bought that new car.",
      "She told me she really wished she bought that new car."
    ],
    correct_index: 0,
    explanation_ar: "الماضي التام الذي يلي 'wish' يبقى كما هو ماضي تام للإشارة لندم بالماضي ('had bought').",
    explanation_en: "After 'wish', the past perfect 'had bought' remains past perfect, while 'wish' shifts to 'wished'."
  },
  {
    id: "q-59",
    text_ar: "FINEFOODS requires an agent to:",
    text_en: "FINEFOODS requires an agent to:",
    options_ar: [
      "deliver goods all over the country.",
      "be a specialist in food distribution.",
      "own a suitable vehicle for delivery."
    ],
    options_en: [
      "deliver goods all over the country.",
      "be a specialist in food distribution.",
      "own a suitable vehicle for delivery."
    ],
    correct_index: 0,
    explanation_ar: "بناءً على الفهم والتحليل، الخيار الصحيح هو التوصيل الشامل.",
    explanation_en: "Based on reading comprehension rules, option A matches the general standard requirements."
  },
  {
    id: "q-60",
    text_ar: "Staff wishing to enrol for the Accounts course should tell Jane Fellows:",
    text_en: "Staff wishing to enrol for the Accounts course should tell Jane Fellows:",
    options_ar: [
      "how many people have enrolled.",
      "if they are interested in doing the course.",
      "which of the courses they have decided to do."
    ],
    options_en: [
      "how many people have enrolled.",
      "if they are interested in doing the course.",
      "which of the courses they have decided to do."
    ],
    correct_index: 1,
    explanation_ar: "الخيار ب هو الصحيح للإشارة للرغبة والاهتمام ببدء الدورة.",
    explanation_en: "Option B is correct based on the administrative notification prompt structure."
  },
  {
    id: "q-61",
    text_ar: "The supplier was found to be in ________ of contract after missing the delivery deadline.",
    text_en: "The supplier was found to be in ________ of contract after missing the delivery deadline.",
    options_ar: ["break", "breach", "bridge", "violation"],
    options_en: ["break", "breach", "bridge", "violation"],
    correct_index: 1,
    explanation_ar: "التركيب الاصطلاحي القانوني لخرق أو الإخلال بالعقد هو 'breach of contract'.",
    explanation_en: "The standard legal collocation for breaking a binding agreement is a 'breach of contract'."
  },
  {
    id: "q-62",
    text_ar: "After months of negotiation, the two companies finally decided to ________ the dispute out of court.",
    text_en: "After months of negotiation, the two companies finally decided to ________ the dispute out of court.",
    options_ar: ["settle", "sink", "stay", "solve"],
    options_en: ["settle", "sink", "stay", "solve"],
    correct_index: 0,
    explanation_ar: "الفعل 'settle' يترجم بمعنى (تسوية النزاع ودياً) خارج أروقة المحاكم.",
    explanation_en: "To 'settle a dispute' means to resolve a legal conflict through mutual agreement without a court trial."
  },
  {
    id: "q-63",
    text_ar: "The landlord can ________ the tenant if the rent remains unpaid for sixty days.",
    text_en: "The landlord can ________ the tenant if the rent remains unpaid for sixty days.",
    options_ar: ["exit", "evict", "release", "remove"],
    options_en: ["exit", "evict", "release", "remove"],
    correct_index: 1,
    explanation_ar: "الكلمة القانونية المناسبة لإخلاء أو طرد المستأجر بالقانون هي 'evict'.",
    explanation_en: "The legal term meaning to legally force a tenant to leave a property is 'evict'."
  },
  {
    id: "q-64",
    text_ar: "Both parties are required to sign a ________ agreement before sharing any trade secrets.",
    text_en: "Both parties are required to sign a ________ agreement before sharing any trade secrets.",
    options_ar: ["non-display", "non-disclosure", "non-delivery", "non-action"],
    options_en: ["non-display", "non-disclosure", "non-delivery", "non-action"],
    correct_index: 1,
    explanation_ar: "اتفاقية السرية وعدم الإفصاح عن البيانات يطلق عليها 'non-disclosure agreement' اختصاراً NDA.",
    explanation_en: "A confidentiality contract is technically referred to as a 'non-disclosure' agreement (NDA)."
  },
  {
    id: "q-65",
    text_ar: "After the trial, the jury ________ the defendant of all criminal charges.",
    text_en: "After the trial, the jury ________ the defendant of all criminal charges.",
    options_ar: ["acquitted", "accused", "arrested", "judged"],
    options_en: ["acquitted", "accused", "arrested", "judged"],
    correct_index: 0,
    explanation_ar: "الفعل القانوني 'acquit' يعني تبرئة المتهم من التهم الجنائية المنسوبة إليه.",
    explanation_en: "To 'acquit' someone means to formally declare them not guilty of a criminal charge in court."
  },
  {
    id: "q-66",
    text_ar: "The prosecutor presented several pieces of ________ to prove the suspect was at the crime scene.",
    text_en: "The prosecutor presented several pieces of ________ to prove the suspect was at the crime scene.",
    options_ar: ["evidence", "stories", "opinions", "clues"],
    options_en: ["evidence", "stories", "opinions", "clues"],
    correct_index: 0,
    explanation_ar: "الأدلة والقرائن الرسمية المقدمة في المحاكمة يطلق عليها 'evidence'.",
    explanation_en: "Formal exhibits and testaments introduced in a legal case to support facts are 'evidence'."
  },
  {
    id: "q-67",
    text_ar: "A person who is called to give a formal statement in a court of law is a ________.",
    text_en: "A person who is called to give a formal statement in a court of law is a ________.",
    options_ar: ["suspect", "witness", "judge", "lawyer"],
    options_en: ["suspect", "witness", "judge", "lawyer"],
    correct_index: 1,
    explanation_ar: "الشخص الذي يستدعى لتقديم شهادة رسمية في المحكمة هو الشاهد 'witness'.",
    explanation_en: "An individual giving formal testimony under oath during court proceedings is a 'witness'."
  },
  {
    id: "q-68",
    text_ar: "The lease agreement will ________ automatically for another year unless terminated in writing.",
    text_en: "The lease agreement will ________ automatically for another year unless terminated in writing.",
    options_ar: ["recover", "renew", "replace", "repeat"],
    options_en: ["recover", "renew", "replace", "repeat"],
    correct_index: 1,
    explanation_ar: "الفعل 'renew' يعني تجديد العقد تلقائياً لمدد أخرى مماثلة.",
    explanation_en: "To extend a contract or agreement for a new period is to 'renew' it."
  },
  {
    id: "q-69",
    text_ar: "If a company fails to provide safety equipment, they may be held ________ for any workplace accidents.",
    text_en: "If a company fails to provide safety equipment, they may be held ________ for any workplace accidents.",
    options_ar: ["likely", "liable", "logical", "legal"],
    options_en: ["likely", "liable", "logical", "legal"],
    correct_index: 1,
    explanation_ar: "الكلمة القانونية التي تعني 'مسؤول قانونياً أو ملزم بالتعويض' هي 'liable'.",
    explanation_en: "The adjective 'liable' means legally responsible for damages or obligations."
  },
  {
    id: "q-70",
    text_ar: "The defense attorney requested an ________ to review new documents that were submitted late.",
    text_en: "The defense attorney requested an ________ to review new documents that were submitted late.",
    options_ar: ["adjustment", "adjournment", "attachment", "agreement"],
    options_en: ["adjustment", "adjournment", "attachment", "agreement"],
    correct_index: 1,
    explanation_ar: "تأجيل أو تعليق مؤقت لجلية المحاكمة يطلق عليه 'adjournment'.",
    explanation_en: "An 'adjournment' is a formal postponement or suspension of court sessions."
  },
  {
    id: "q-71",
    text_ar: "In a civil lawsuit, the person who initiates the legal action is called the ________.",
    text_en: "In a civil lawsuit, the person who initiates the legal action is called the ________.",
    options_ar: ["defendant", "prosecutor", "plaintiff", "bailiff"],
    options_en: ["defendant", "prosecutor", "plaintiff", "bailiff"],
    correct_index: 2,
    explanation_ar: "المدعي في القضايا المدنية يسمى 'plaintiff'، بينما في القضايا الجنائية يسمى المدعي العام 'prosecutor'.",
    explanation_en: "The party initiating a civil legal action or lawsuit is called the 'plaintiff'."
  },
  {
    id: "q-72",
    text_ar: "Trademark and copyright laws are designed to protect ________ property.",
    text_en: "Trademark and copyright laws are designed to protect ________ property.",
    options_ar: ["property", "intellectual", "industrial", "internal"],
    options_en: ["property", "intellectual", "industrial", "internal"],
    correct_index: 1,
    explanation_ar: "الملكية الفكرية التي تضم براءات الاختراع والرموز والاسم التجاري وحقوق التأليف تسمى 'intellectual property'.",
    explanation_en: "The generic term for creations of the mind protected by law is 'intellectual property'."
  },
  {
    id: "q-73",
    text_ar: "Please read the terms and ________ carefully before signing the employment contract.",
    text_en: "Please read the terms and ________ carefully before signing the employment contract.",
    options_ar: ["conditions", "constraints", "considerations", "collections"],
    options_en: ["conditions", "constraints", "considerations", "collections"],
    correct_index: 0,
    explanation_ar: "التركيب التعاقدي الشهير هو الشروط والأحكام 'terms and conditions'.",
    explanation_en: "The standard phrase for requirements in a legal contract is 'terms and conditions'."
  },
  {
    id: "q-74",
    text_ar: "The high court is expected to ________ its final judgment on the case next Tuesday.",
    text_en: "The high court is expected to ________ its final judgment on the case next Tuesday.",
    options_ar: ["deliver", "demand", "display", "declare"],
    options_en: ["deliver", "demand", "display", "declare"],
    correct_index: 0,
    explanation_ar: "الصياغة الأكثر دقة للنطق بالحكم أو إصداره رسمياً هي 'deliver its judgment'.",
    explanation_en: "To issue or hand down a court decision is formally described as to 'deliver a judgment'."
  },
  {
    id: "q-75",
    text_ar: "The corporation hired a legal ________ to ensure their new merger complied with international law.",
    text_en: "The corporation hired a legal ________ to ensure their new merger complied with international law.",
    options_ar: ["assistant", "consultant", "apprentice", "agent"],
    options_en: ["assistant", "consultant", "apprentice", "agent"],
    correct_index: 1,
    explanation_ar: "المستشار القانوني المتخصص يسمى 'consultant' أو 'advisor'.",
    explanation_en: "A legal expert retained to provide specific advisory insights is a 'legal consultant'."
  },
  {
    id: "q-76",
    text_ar: "The ________ of limitations for filing a personal injury claim has expired.",
    text_en: "The ________ of limitations for filing a personal injury claim has expired.",
    options_ar: ["statute", "duration", "validation", "standard"],
    options_en: ["statute", "duration", "validation", "standard"],
    correct_index: 0,
    explanation_ar: "قانون التقادم أو المدة المحددة قانوناً لرفع الدعوى يسمى 'statute of limitations'.",
    explanation_en: "The maximum statutory period of time allowed to initiate legal proceedings is the 'statute of limitations'."
  },
  {
    id: "q-77",
    text_ar: "If you ignore a court order, you may be charged with ________ of court.",
    text_en: "If you ignore a court order, you may be charged with ________ of court.",
    options_ar: ["contempt", "content", "conflict", "contact"],
    options_en: ["contempt", "content", "conflict", "contact"],
    correct_index: 0,
    explanation_ar: "ازدراء المحكمة أو مخالفة أوامرها يعاقب عليه بتهمة 'contempt of court'.",
    explanation_en: "The crime of disobeying or showing disrespect to a court of law is 'contempt of court'."
  },
  {
    id: "q-78",
    text_ar: "The signature is not valid unless it is made in the ________ of a notary public.",
    text_en: "The signature is not valid unless it is made in the ________ of a notary public.",
    options_ar: ["pressure", "presence", "practice", "profile"],
    options_en: ["pressure", "presence", "practice", "profile"],
    correct_index: 1,
    explanation_ar: "التوقيع أمام كاتب العدل قانونياً يصاغ 'in the presence of a notary public' (بحضور كاتب العدل).",
    explanation_en: "Signatures requiring official authentication must be executed 'in the presence of' a notary public."
  },
  {
    id: "q-79",
    text_ar: "Both parties must ________ to the changes before the contract can be modified.",
    text_en: "Both parties must ________ to the changes before the contract can be modified.",
    options_ar: ["assent", "assist", "assign", "assert"],
    options_en: ["assent", "assist", "assign", "assert"],
    correct_index: 0,
    explanation_ar: "الكلمة التي تعني الموافقة الرسمية والرضا التام بالتغييرات التعاقدية هي 'assent'.",
    explanation_en: "To formally agree or yield compliance to changes is to 'assent' to them."
  },
  {
    id: "q-80",
    text_ar: "A ________ is a document that commands a person to appear in court as a witness.",
    text_en: "A ________ is a document that commands a person to appear in court as a witness.",
    options_ar: ["warrant", "subpoena", "verdict", "plea"],
    options_en: ["warrant", "subpoena", "verdict", "plea"],
    correct_index: 1,
    explanation_ar: "مذكرة الاستدعاء القانونية للشاهد للمثول أمام المحكمة تسمى 'subpoena'.",
    explanation_en: "A 'subpoena' is a formal command writ issued by a court ordering someone to testify as a witness."
  }
];

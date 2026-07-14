import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, ChevronDown, ChevronUp, Save, X, Layers, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Course, Module, Lesson } from '../types';
import ImageUpload from './ImageUpload';

interface CourseInlineEditorProps {
  course: Course;
  isRtl: boolean;
  onSave: (updatedCourse: Course) => Promise<void>;
  onCancel: () => void;
}

export default function CourseInlineEditor({ course, isRtl, onSave, onCancel }: CourseInlineEditorProps) {
  // State for all course fields
  const [titleAr, setTitleAr] = useState(course.title_ar || '');
  const [titleEn, setTitleEn] = useState(course.title_en || '');
  const [subtitleAr, setSubtitleAr] = useState(course.subtitle_ar || '');
  const [subtitleEn, setSubtitleEn] = useState(course.subtitle_en || '');
  const [descriptionAr, setDescriptionAr] = useState(course.description_ar || '');
  const [descriptionEn, setDescriptionEn] = useState(course.description_en || '');
  const [image, setImage] = useState(course.image || '');
  const [price, setPrice] = useState(String(course.price || '0'));
  const [lessonsCount, setLessonsCount] = useState(course.lessons_count || 0);
  const [levelAr, setLevelAr] = useState(course.level_ar || '');
  const [levelEn, setLevelEn] = useState(course.level_en || '');
  const [durationAr, setDurationAr] = useState(course.duration_ar || '');
  const [durationEn, setDurationEn] = useState(course.duration_en || '');
  const [isPublished, setIsPublished] = useState(course.is_published !== false);

  // Lists and nested arrays
  const [specsAr, setSpecsAr] = useState<string[]>(course.specs_ar || []);
  const [specsEn, setSpecsEn] = useState<string[]>(course.specs_en || []);
  const [modules, setModules] = useState<Module[]>(course.modules || []);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Specs helper functions
  const handleAddSpecAr = () => setSpecsAr([...specsAr, '']);
  const handleAddSpecEn = () => setSpecsEn([...specsEn, '']);
  const handleSpecArChange = (idx: number, val: string) => {
    const next = [...specsAr];
    next[idx] = val;
    setSpecsAr(next);
  };
  const handleSpecEnChange = (idx: number, val: string) => {
    const next = [...specsEn];
    next[idx] = val;
    setSpecsEn(next);
  };
  const handleRemoveSpecAr = (idx: number) => setSpecsAr(specsAr.filter((_, i) => i !== idx));
  const handleRemoveSpecEn = (idx: number) => setSpecsEn(specsEn.filter((_, i) => i !== idx));

  // Modules helpers
  const handleAddModule = () => {
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title_ar: isRtl ? 'وحدة تدريبية جديدة' : 'New Training Module',
      title_en: 'New Training Module',
      style_type: 'colored',
      lessons: []
    };
    setModules([...modules, newMod]);
  };

  const handleRemoveModule = (modId: string) => {
    setModules(modules.filter(m => m.id !== modId));
  };

  const handleModuleChange = (modId: string, field: keyof Module, value: any) => {
    setModules(modules.map(m => {
      if (m.id === modId) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  // Lessons helpers inside module
  const handleAddLesson = (modId: string) => {
    setModules(modules.map(m => {
      if (m.id === modId) {
        const newLes: Lesson = {
          id: `les-${Date.now()}`,
          title_ar: isRtl ? 'محاضرة جديدة' : 'New Lecture Topic',
          title_en: 'New Lecture Topic',
          duration_ar: '٦٠ دقيقة',
          duration_en: '60 Mins',
          is_free: false
        };
        return { ...m, lessons: [...m.lessons, newLes] };
      }
      return m;
    }));
  };

  const handleRemoveLesson = (modId: string, lesId: string) => {
    setModules(modules.map(m => {
      if (m.id === modId) {
        return { ...m, lessons: m.lessons.filter(l => l.id !== lesId) };
      }
      return m;
    }));
  };

  const handleLessonChange = (modId: string, lesId: string, field: keyof Lesson, value: any) => {
    setModules(modules.map(m => {
      if (m.id === modId) {
        return {
          ...m,
          lessons: m.lessons.map(l => {
            if (l.id === lesId) {
              return { ...l, [field]: value };
            }
            return l;
          })
        };
      }
      return m;
    }));
  };

  // Submit
  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const updated: Course = {
        ...course,
        title_ar: titleAr,
        title_en: titleEn,
        subtitle_ar: subtitleAr,
        subtitle_en: subtitleEn,
        description_ar: descriptionAr,
        description_en: descriptionEn,
        image,
        price: Number(price) || 0,
        lessons_count: Number(lessonsCount) || 0,
        level_ar: levelAr,
        level_en: levelEn,
        duration_ar: durationAr,
        duration_en: durationEn,
        specs_ar: specsAr.filter(s => s.trim() !== ''),
        specs_en: specsEn.filter(s => s.trim() !== ''),
        modules,
        is_published: isPublished
      };

      await onSave(updated);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || (isRtl ? 'حدث خطأ أثناء حفظ التعديلات' : 'An error occurred while saving changes'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSaveSubmit} className="bg-white p-6 rounded-2xl border border-[#daf1de] shadow-md space-y-8 text-start">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Top action row */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h4 className="text-sm font-sans font-black text-[#051f20]">
            {isRtl ? '📝 تحرير بيانات الدورة التفاعلية بالكامل' : '📝 Deep Course Content Editor'}
          </h4>
          <p className="text-[10px] text-gray-400 font-bold font-sans mt-0.5">
            {isRtl ? 'تحرير البيانات النصية، والمخرجات التدريبية، وبنية الدروس والوحدات.' : 'Modify descriptions, custom spec bullet arrays, and structured accordion modules.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPublished(!isPublished)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black flex items-center gap-1 cursor-pointer transition-colors ${
              isPublished ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {isPublished ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
            <span>{isPublished ? (isRtl ? 'منشور بالموقع' : 'Published') : (isRtl ? 'مسودة مخفية' : 'Hidden Draft')}</span>
          </button>
        </div>
      </div>

      {/* Grid: AR & EN Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ARABIC SECTION */}
        <div className="space-y-4 border-l lg:border-l-0 lg:ltr:border-r lg:rtl:border-l border-slate-100 lg:px-4">
          <span className="text-[10px] uppercase font-black tracking-wider text-[#235347] block mb-2">{isRtl ? 'القسم العربي' : 'Arabic Translation Fields'}</span>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">اسم البرنامج التدريبي (عربي)</label>
            <input
              type="text"
              required
              value={titleAr}
              onChange={e => setTitleAr(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347]"
              placeholder="مثال: دبلوم الصياغة التنفيذية"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ترتيب الصياغة الفرعي (عربي)</label>
            <input
              type="text"
              value={subtitleAr}
              onChange={e => setSubtitleAr(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347]"
              placeholder="مثال: الأساسيات والمبادئ التوجيهية مع صياغة الشروط النموذجية"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">درجة المستوى (عربي)</label>
              <input
                type="text"
                value={levelAr}
                onChange={e => setLevelAr(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347]"
                placeholder="مثال: مبتدئ إلى متوسط"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">مدة الدراسة (عربي)</label>
              <input
                type="text"
                value={durationAr}
                onChange={e => setDurationAr(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347]"
                placeholder="مثال: ١٢ ساعة أكاديمية"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">الشرح التفصيلي لصفحة الدورة (عربي)</label>
            <textarea
              rows={5}
              required
              value={descriptionAr}
              onChange={e => setDescriptionAr(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] leading-relaxed"
              placeholder="اكتب هنا شرحاً شاملاً للدورة ليرى الطالب تفاصيلها..."
            />
          </div>

          {/* Key Learning Outcomes (Specs AR) */}
          <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#051f20]">{isRtl ? 'ما يكتسبه الطالب في الدورة (عربي)' : 'What you will learn (AR)'}</label>
              <button
                type="button"
                onClick={handleAddSpecAr}
                className="px-2 py-0.5 bg-[#daf1de] text-[#235347] text-[10px] font-black rounded hover:bg-[#235347] hover:text-white transition-all flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>{isRtl ? 'إضافة نقطة' : 'Add Point'}</span>
              </button>
            </div>
            <div className="space-y-2">
              {specsAr.map((spec, sidx) => (
                <div key={sidx} className="flex gap-2">
                  <span className="text-[10px] font-bold text-slate-400 self-center font-mono">#{sidx + 1}</span>
                  <input
                    type="text"
                    value={spec}
                    onChange={e => handleSpecArChange(sidx, e.target.value)}
                    className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347]"
                    placeholder="مثال: دراسة هيكل العقد التجاري بالكامل."
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecAr(sidx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title={isRtl ? 'حذف' : 'Delete'}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {specsAr.length === 0 && (
                <p className="text-[10px] text-gray-400 italic text-center py-2">{isRtl ? 'لا توجد مخرجات مسجلة.' : 'No outcomes recorded.'}</p>
              )}
            </div>
          </div>
        </div>

        {/* ENGLISH SECTION */}
        <div className="space-y-4 lg:px-4">
          <span className="text-[10px] uppercase font-black tracking-wider text-[#235347] block mb-2">{isRtl ? 'القسم الإنجليزي' : 'English Translation Fields'}</span>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Course Brand Title (EN)</label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={e => setTitleEn(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
              placeholder="e.g. Legal Diplomacy & International Contract Drafting"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle (EN)</label>
            <input
              type="text"
              value={subtitleEn}
              onChange={e => setSubtitleEn(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
              placeholder="e.g. Foundations, Guiding Principles & Boilerplate Clauses"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Level tier details (EN)</label>
              <input
                type="text"
                value={levelEn}
                onChange={e => setLevelEn(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
                placeholder="e.g. Beginner to Intermediate"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Duration (EN)</label>
              <input
                type="text"
                value={durationEn}
                onChange={e => setDurationEn(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
                placeholder="e.g. 12 Academic Hours"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description (EN)</label>
            <textarea
              rows={5}
              required
              value={descriptionEn}
              onChange={e => setDescriptionEn(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#235347] leading-relaxed text-left"
              placeholder="Write a comprehensive description for English readers..."
            />
          </div>

          {/* Key Learning Outcomes (Specs EN) */}
          <div className="bg-slate-50/50 p-4 border border-slate-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#051f20]">{isRtl ? 'ما يكتسبه الطالب (انجليزي)' : 'What you will learn (EN)'}</label>
              <button
                type="button"
                onClick={handleAddSpecEn}
                className="px-2 py-0.5 bg-[#daf1de] text-[#235347] text-[10px] font-black rounded hover:bg-[#235347] hover:text-white transition-all flex items-center gap-0.5 cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>{isRtl ? 'إضافة نقطة' : 'Add Point'}</span>
              </button>
            </div>
            <div className="space-y-2">
              {specsEn.map((spec, sidx) => (
                <div key={sidx} className="flex gap-2">
                  <span className="text-[10px] font-bold text-slate-400 self-center font-mono">#{sidx + 1}</span>
                  <input
                    type="text"
                    value={spec}
                    onChange={e => handleSpecEnChange(sidx, e.target.value)}
                    className="flex-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
                    placeholder="e.g. In-depth analysis of complete commercial contracts."
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecEn(sidx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    title={isRtl ? 'حذف' : 'Delete'}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {specsEn.length === 0 && (
                <p className="text-[10px] text-gray-400 italic text-center py-2">{isRtl ? 'لا توجد مخرجات مسجلة.' : 'No outcomes recorded.'}</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Pricing, Lectures Count, & Cover Image Uploader */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">{isRtl ? 'رسوم التسجيل ($)' : 'Program Fee ($)'}</label>
          <input
            type="text"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#235347]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">{isRtl ? 'عدد المحاضرات الكلي' : 'Lectures count:'}</label>
          <input
            type="number"
            value={lessonsCount}
            onChange={e => setLessonsCount(Number(e.target.value))}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-[#235347]"
          />
        </div>
        <div className="md:col-span-3">
          <ImageUpload
            value={image}
            onChange={(val) => setImage(val)}
            label="COURSE BANNER IMAGE"
            labelAr="صورة غلاف الكورس الرئيسي"
            isRtl={isRtl}
          />
        </div>
      </div>

      {/* Syllabus Modules & Dropdown Accordions Section */}
      <div className="space-y-4 pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-[#235347]" />
              <span>{isRtl ? 'الوحدات والمناهج التفصيلية (Syllabus Modules)' : 'Syllabus Modules & Lessons'}</span>
            </h5>
            <p className="text-[9px] text-slate-400 font-bold mt-0.5">
              {isRtl ? 'أضف وحدات الخطة الدراسية، واختر نوع الهيدر (ملون / بسيط) وأضف المحاضرات بداخلها.' : 'Add expandable syllabus blocks, choose header styling, and load custom lecture titles.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddModule}
            className="px-3 py-1.5 bg-[#235347] text-white rounded-xl text-xs font-bold hover:bg-[#1c453b] transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>{isRtl ? 'إضافة وحدة دراسية جديدة' : 'Add New Module'}</span>
          </button>
        </div>

        <div className="space-y-6">
          {modules.map((mod, midx) => {
            const isCol = mod.style_type !== 'plain';
            return (
              <div key={mod.id} className="p-5 border border-slate-200 rounded-2xl bg-slate-50/30 space-y-4">
                
                {/* Module title inputs and header style selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#235347] bg-[#daf1de] px-2.5 py-1 rounded-lg">
                      {isRtl ? `وحدة ${midx + 1}` : `Module ${midx + 1}`}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-bold">{isRtl ? 'شكل الهيدر:' : 'Header style:'}</span>
                      <select
                        value={mod.style_type || 'colored'}
                        onChange={(e) => handleModuleChange(mod.id, 'style_type', e.target.value)}
                        className="text-[10px] font-bold text-slate-700 bg-white border border-slate-200 rounded p-1 focus:outline-none focus:ring-1 focus:ring-[#235347]"
                      >
                        <option value="colored">{isRtl ? '🟢 هيدر ملون وبصمة خضراء' : '🟢 Colored (Foundations style)'}</option>
                        <option value="plain">{isRtl ? '⚪ هيدر نصي بسيط رمادي' : '⚪ Plain (Neutral Text style)'}</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(mod.id)}
                    className="text-[10px] font-bold text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer border border-red-200/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{isRtl ? 'حذف هذه الوحدة بالكامل' : 'Delete Module'}</span>
                  </button>
                </div>

                {/* Module title edits side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">اسم الوحدة (عربي)</label>
                    <input
                      type="text"
                      value={mod.title_ar}
                      onChange={(e) => handleModuleChange(mod.id, 'title_ar', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Module Title (EN)</label>
                    <input
                      type="text"
                      value={mod.title_en}
                      onChange={(e) => handleModuleChange(mod.id, 'title_en', e.target.value)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
                    />
                  </div>
                </div>

                {/* Lessons list inside module */}
                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-[10px] font-black text-slate-600 uppercase">{isRtl ? 'محاضرات هذه الوحدة (Lessons):' : 'Lessons list:'}</span>
                    <button
                      type="button"
                      onClick={() => handleAddLesson(mod.id)}
                      className="px-2.5 py-1 bg-[#daf1de]/60 text-[#235347] text-[10px] font-black rounded hover:bg-[#235347] hover:text-white transition-all flex items-center gap-0.5 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{isRtl ? 'إضافة محاضرة جديدة' : 'Add Lesson'}</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {(mod.lessons || []).map((les, lidx) => (
                      <div key={les.id} className="p-3 border border-dashed border-slate-200 rounded-lg bg-slate-50/20 space-y-2">
                        
                        {/* Title and delete of lesson */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-bold text-slate-400 font-mono">Lecture #{lidx + 1}</span>
                          <div className="flex items-center gap-3">
                            <label className="flex items-center gap-1 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={les.is_free}
                                onChange={(e) => handleLessonChange(mod.id, les.id, 'is_free', e.target.checked)}
                                className="rounded border-slate-300 text-[#235347] focus:ring-[#235347]"
                              />
                              <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">{isRtl ? 'حصة مجانية تجريبية' : 'Free Demo'}</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveLesson(mod.id, les.id)}
                              className="text-red-500 hover:bg-red-50 p-1 rounded"
                              title={isRtl ? 'حذف الحصة' : 'Delete Lesson'}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Title inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <input
                              type="text"
                              value={les.title_ar}
                              onChange={(e) => handleLessonChange(mod.id, les.id, 'title_ar', e.target.value)}
                              placeholder="عنوان المحاضرة بالعربية..."
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347]"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={les.title_en}
                              onChange={(e) => handleLessonChange(mod.id, les.id, 'title_en', e.target.value)}
                              placeholder="Lecture title in English..."
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347] text-left"
                            />
                          </div>
                        </div>

                        {/* Durations */}
                        <div className="grid grid-cols-2 gap-3 max-w-md">
                          <div>
                            <input
                              type="text"
                              value={les.duration_ar}
                              onChange={(e) => handleLessonChange(mod.id, les.id, 'duration_ar', e.target.value)}
                              placeholder="المدة (مثال: ٤٥ دقيقة)"
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value={les.duration_en}
                              onChange={(e) => handleLessonChange(mod.id, les.id, 'duration_en', e.target.value)}
                              placeholder="Duration (e.g. 45 Mins)"
                              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none text-left"
                            />
                          </div>
                        </div>

                      </div>
                    ))}
                    {(mod.lessons || []).length === 0 && (
                      <p className="text-[10px] text-gray-400 italic text-center py-2">{isRtl ? 'لا توجد محاضرات مدرجة حالياً.' : 'No lectures defined.'}</p>
                    )}
                  </div>
                </div>

              </div>
            );
          })}

          {modules.length === 0 && (
            <p className="text-center py-8 text-slate-400 font-bold border border-dashed rounded-2xl text-xs sm:text-sm border-slate-300 bg-slate-50/50">
              {isRtl ? 'لم يتم صياغة أي وحدات أو مناهج حالياً لهذه الدورة.' : 'No modules or accordions currently defined.'}
            </p>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
        >
          <X className="h-4 w-4" />
          <span>{isRtl ? 'إلغاء التعديل' : 'Cancel'}</span>
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-[#235347] hover:bg-[#1c453b] disabled:bg-slate-300 text-[#daf1de] rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md shadow-[#235347]/10"
        >
          {saving ? (
            <>
              <div className="h-3.5 w-3.5 border-2 border-[#daf1de] border-t-transparent rounded-full animate-spin"></div>
              <span>{isRtl ? 'جاري الحفظ...' : 'Saving...'}</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>{isRtl ? 'حفظ كافة التعديلات' : 'Save All Course Changes'}</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}

import React, { useState } from 'react';
import { UploadCloud, X, Link, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  labelAr?: string;
  isRtl?: boolean;
}

export default function ImageUpload({ value, onChange, label, labelAr, isRtl = false }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState(value || '');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(isRtl ? 'الرجاء اختيار ملف صورة صالح' : 'Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
        setUrlValue(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrlValue(val);
    onChange(val);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setUrlValue('');
  };

  return (
    <div className="space-y-2 text-start w-full">
      {(label || labelAr) && (
        <div className="flex justify-between items-center text-[11px] font-bold text-slate-600 mb-1">
          {labelAr && <span>{labelAr}</span>}
          {label && <span className="font-mono text-slate-400">{label}</span>}
        </div>
      )}

      <div className="relative group">
        {value ? (
          <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-100 aspect-[16/6] md:aspect-[16/5] flex items-center justify-center">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-md cursor-pointer"
                title={isRtl ? 'حذف الصورة' : 'Remove image'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 transition-all text-center flex flex-col items-center justify-center cursor-pointer min-h-[140px] ${
              isDragActive
                ? 'border-[#235347] bg-[#daf1de]/10'
                : 'border-slate-300 hover:border-[#235347] bg-white hover:bg-slate-50/50'
            }`}
            onClick={() => document.getElementById(`file-input-${label || 'img'}`)?.click()}
          >
            <input
              id={`file-input-${label || 'img'}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <UploadCloud className={`h-8 w-8 mb-2.5 transition-colors ${isDragActive ? 'text-[#235347]' : 'text-slate-400 group-hover:text-[#235347]'}`} />
            <p className="text-xs font-bold text-slate-700">
              {isRtl ? 'اسحب الصورة هنا وأفلتها، أو انقر للاختيار' : 'Drag & drop image here, or click to browse'}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              {isRtl ? 'يدعم صيغ JPG، PNG، WEBP، GIF' : 'Supports JPG, PNG, WEBP, GIF'}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 justify-end">
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[10px] font-bold text-[#235347] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Link className="h-3 w-3" />
          <span>{showUrlInput ? (isRtl ? 'إخفاء رابط الصورة' : 'Hide URL input') : (isRtl ? 'أو أدخل رابط ويب مباشرة' : 'Or enter web URL directly')}</span>
        </button>
      </div>

      {showUrlInput && (
        <input
          type="text"
          placeholder={isRtl ? 'أدخل رابط الصورة المباشر... (e.g. https://...)' : 'Enter direct image URL...'}
          value={urlValue}
          onChange={handleUrlChange}
          className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#235347] placeholder-slate-400"
        />
      )}
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, Loader2, File } from 'lucide-react';

interface FileDragDropZoneProps {
  onUploaded: (url: string, filename: string) => void;
  isRtl?: boolean;
}

export default function FileDragDropZone({ onUploaded, isRtl = false }: FileDragDropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type') || '';
      const isHtml = contentType.includes('text/html') || contentType.includes('html');

      if (!response.ok) {
        if (isHtml) {
          throw new Error(isRtl 
            ? 'فشل تحميل الملف: خطأ داخلي بالخادم (استجابة غير صالحة).' 
            : 'File upload failed: Internal Server Error (invalid response).');
        }
        try {
          const errData = await response.json();
          throw new Error(errData.error || (isRtl ? 'فشل تحميل الملف. يرجى المحاولة مجدداً.' : 'Failed to upload file. Please try again.'));
        } catch {
          throw new Error(isRtl ? 'فشل تحميل الملف. يرجى المحاولة مجدداً.' : 'Failed to upload file. Please try again.');
        }
      }

      if (isHtml) {
        throw new Error(isRtl 
          ? 'تلقى الخادم طلباً غير صالح (صفحة HTML). يرجى التحقق من تشغيل خادم API.' 
          : 'The server returned an invalid HTML page. Please verify that the API server is running.');
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error('JSON parsing failed:', text);
        throw new Error(isRtl 
          ? 'فشل تحليل استجابة الخادم كـ JSON.' 
          : 'Failed to parse server response as JSON.');
      }

      onUploaded(data.url, data.filename || file.name);
    } catch (err: any) {
      setError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full text-start">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-5 transition-all text-center flex flex-col items-center justify-center cursor-pointer min-h-[120px] ${
          isDragActive
            ? 'border-[#235347] bg-[#daf1de]/10'
            : 'border-slate-300 hover:border-[#235347] bg-white hover:bg-slate-50/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-7 w-7 animate-spin text-[#235347]" />
            <p className="text-xs font-bold text-[#235347]">
              {isRtl ? 'جاري رفع الملف وحفظه بالخادم...' : 'Uploading file to server...'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className={`h-7 w-7 mb-2 text-slate-400`} />
            <p className="text-xs font-bold text-slate-700">
              {isRtl ? 'اسحب ملفاً هنا وأفلته، أو انقر للاختيار' : 'Drag & drop a file here, or click to browse'}
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">
              {isRtl ? 'أي صيغة ملف أو مستند (PDF, Word, ZIP, إلخ)' : 'Any document or asset type (PDF, Word, ZIP, etc.)'}
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-1 justify-start">
          <span>⚠️ {error}</span>
        </p>
      )}
    </div>
  );
}

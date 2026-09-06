import React, { useState, useEffect } from 'react';
import { X, Camera, ChevronLeft, ChevronRight, Eye, Tag, Check, Download } from 'lucide-react';
import { PhotographyCategoryData } from '../types';

interface DetailInspectionModalProps {
  isOpen: boolean;
  selectedCategory: PhotographyCategoryData | null;
  allCategories: PhotographyCategoryData[];
  initialImageIndex?: number;
  onClose: () => void;
  onSelectCategory: (data: PhotographyCategoryData) => void;
}

export const DetailInspectionModal: React.FC<DetailInspectionModalProps> = ({
  isOpen,
  selectedCategory,
  allCategories,
  onClose,
  onSelectCategory
}) => {
  const [activePhotoUrl, setActivePhotoUrl] = useState<string>('');

  useEffect(() => {
    if (selectedCategory) {
      setActivePhotoUrl(selectedCategory.imageUrl);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !selectedCategory) return null;

  const currentIndex = allCategories.findIndex((c) => c.id === selectedCategory.id);
  const prevCategory = currentIndex > 0 ? allCategories[currentIndex - 1] : null;
  const nextCategory = currentIndex < allCategories.length - 1 ? allCategories[currentIndex + 1] : null;

  // All images in this category (hero + sample images)
  const allImages = [selectedCategory.imageUrl, ...(selectedCategory.sampleImages || [])];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container: White background, Navy Border, Black Text */}
      <div className="relative w-full max-w-4xl bg-white border-2 border-[#0f2744] rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[92vh] text-left">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-[#0f2744] bg-white">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black bg-[#0f2744] text-white px-2 py-0.5 rounded font-mono">
              {selectedCategory.categoryNumber}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-black">
              {selectedCategory.title}
            </h2>
            <span className="text-xs font-bold text-[#0f2744] border border-[#0f2744] px-2 py-0.5 rounded-full hidden sm:inline">
              {selectedCategory.titleThai}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="w-8 h-8 rounded-lg border border-[#0f2744] text-black hover:bg-[#0f2744] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Focused Photograph */}
          <div className="relative rounded-2xl overflow-hidden bg-black/95 border-2 border-[#0f2744] flex items-center justify-center min-h-[300px] max-h-[480px]">
            <img
              src={activePhotoUrl || selectedCategory.imageUrl}
              alt={selectedCategory.title}
              className="w-full h-full object-contain max-h-[480px]"
            />

            {/* Overlay badge */}
            <div className="absolute top-3 left-3 bg-white/95 border border-[#0f2744] text-black text-xs font-bold px-3 py-1 rounded-md shadow-md">
              {selectedCategory.titleThai}
            </div>

            <div className="absolute bottom-3 right-3 bg-black/75 border border-white/20 text-white text-[11px] font-mono px-2.5 py-1 rounded">
              High Resolution
            </div>
          </div>

          {/* Sample Photos Gallery Strip (Click to view in large box) */}
          <div className="border border-[#0f2744] rounded-2xl p-4 bg-white">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#0f2744]" />
                <span>รูปตัวอย่างทั้งหมดในหมวด {selectedCategory.title} ({allImages.length} รูป)</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                (คลิกภาพเพื่อดูภาพขยาย)
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {allImages.map((imgUrl, idx) => {
                const isActive = (activePhotoUrl || selectedCategory.imageUrl) === imgUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePhotoUrl(imgUrl)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#0f2744] ring-2 ring-[#0f2744]/40 scale-95'
                        : 'border-slate-300 hover:border-[#0f2744]'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#0f2744]/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimal Specs & Gear Box (Navy Blue Framing) */}
          <div className="border border-[#0f2744] rounded-2xl p-4 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                Camera & Gear Info
              </div>
              <div className="text-sm font-black text-black flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0f2744]" />
                <span>{selectedCategory.cameraGear || 'Standard Prime Setup'}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {selectedCategory.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-bold text-[#0f2744] bg-white border border-[#0f2744] px-2.5 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation: Next / Prev Category */}
        <div className="border-t-2 border-[#0f2744] px-5 py-3 bg-white flex items-center justify-between">
          {prevCategory ? (
            <button
              onClick={() => onSelectCategory(prevCategory)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0f2744] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{prevCategory.title}</span>
            </button>
          ) : (
            <div />
          )}

          <div className="text-xs font-mono font-bold text-slate-500">
            {currentIndex + 1} / {allCategories.length}
          </div>

          {nextCategory ? (
            <button
              onClick={() => onSelectCategory(nextCategory)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0f2744] hover:underline cursor-pointer"
            >
              <span>{nextCategory.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

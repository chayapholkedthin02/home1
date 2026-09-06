import React, { useState } from 'react';
import { Maximize2, Camera, Tag, Eye } from 'lucide-react';
import { PhotographyCategoryData } from '../types';

interface PhotographyCardProps {
  data: PhotographyCategoryData;
  onInspect: (data: PhotographyCategoryData, selectedImageIndex?: number) => void;
}

export const PhotographyCard: React.FC<PhotographyCardProps> = ({
  data,
  onInspect
}) => {
  // Allow user to click any sample photo to preview it as the active hero image in the card
  const [activeImage, setActiveImage] = useState<string>(data.imageUrl);

  return (
    <div
      id={`photo-card-${data.id}`}
      className="bg-white border-2 border-[#0f2744] rounded-2xl p-4 sm:p-5 flex flex-col group transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg text-left"
    >
      {/* Top Header: Category Number & Title */}
      <div className="flex items-center justify-between mb-3 border-b border-[#0f2744]/20 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-2 py-0.5 rounded bg-[#0f2744] text-white tracking-widest font-mono">
            {data.categoryNumber}
          </span>
          <span className="text-sm sm:text-base font-extrabold text-black uppercase tracking-tight">
            {data.title}
          </span>
        </div>
        <span className="text-xs font-bold text-[#0f2744] border border-[#0f2744] px-2.5 py-0.5 rounded-full">
          {data.titleThai}
        </span>
      </div>

      {/* Main Image Display */}
      <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden mb-3.5 bg-slate-100 border border-[#0f2744]/40">
        <img
          src={activeImage}
          alt={data.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 cursor-pointer"
          onClick={() => onInspect(data)}
          loading="lazy"
        />

        {/* Subtle Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top-Left Category Pill */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-white/95 border border-[#0f2744] text-[#0f2744] text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-sm">
            {data.badgeText}
          </span>
        </div>

        {/* Top-Right Expand Button */}
        <button
          id={`expand-btn-${data.id}`}
          onClick={() => onInspect(data)}
          title="ขยายดูภาพขนาดเต็ม"
          className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-lg bg-white/95 border border-[#0f2744] text-[#0f2744] hover:bg-[#0f2744] hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Bottom Specs Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-white pointer-events-none">
          <span className="text-xs font-bold drop-shadow-sm">
            {data.title}
          </span>
          <span className="text-[10px] font-mono bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/20">
            {data.sampleImages ? `${data.sampleImages.length + 1} Photos` : 'Photos'}
          </span>
        </div>
      </div>

      {/* Sample Photos Gallery (Replacing long description text) */}
      <div className="mb-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-black uppercase tracking-wider flex items-center gap-1">
            <Eye className="w-3 h-3 text-[#0f2744]" />
            <span>รูปตัวอย่างในหมวดนี้</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            (คลิกเพื่อสลับภาพดู)
          </span>
        </div>

        {/* Grid of sample thumbnails */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {/* Include original hero as first preview */}
          <button
            type="button"
            onClick={() => setActiveImage(data.imageUrl)}
            className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
              activeImage === data.imageUrl
                ? 'border-[#0f2744] ring-2 ring-[#0f2744]/30 scale-95'
                : 'border-slate-300 hover:border-[#0f2744]'
            }`}
          >
            <img
              src={data.imageUrl}
              alt="Main"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>

          {/* Additional sample images */}
          {(data.sampleImages || []).slice(0, 3).map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(imgUrl)}
              className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                activeImage === imgUrl
                  ? 'border-[#0f2744] ring-2 ring-[#0f2744]/30 scale-95'
                  : 'border-slate-300 hover:border-[#0f2744]'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Sample ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Minimal Camera Gear & Tags Box (Navy blue border) */}
      <div className="border border-[#0f2744] rounded-xl p-2.5 bg-white mb-3 text-left">
        {data.cameraGear && (
          <div className="flex items-center gap-1.5 text-xs text-black font-semibold mb-1.5">
            <Camera className="w-3.5 h-3.5 text-[#0f2744] shrink-0" />
            <span className="truncate">{data.cameraGear}</span>
          </div>
        )}

        {/* Minimal Tags */}
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold text-[#0f2744] bg-slate-50 border border-[#0f2744]/30 px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Button: Navy Blue Style */}
      <button
        id={`inspect-btn-${data.id}`}
        onClick={() => onInspect(data)}
        className="w-full mt-auto py-2.5 px-4 rounded-xl border-2 border-[#0f2744] text-[#0f2744] font-bold text-xs sm:text-sm hover:bg-[#0f2744] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
      >
        <span>{data.detailsButtonText || 'ดูอัลบั้มเต็ม'}</span>
        <span className="text-base leading-none">→</span>
      </button>
    </div>
  );
};

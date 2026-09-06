import React from 'react';
import { Camera, Maximize2, ArrowRight, Eye } from 'lucide-react';
import { PhotographyCategoryData } from '../types';

interface PhotographyCompactListProps {
  categories: PhotographyCategoryData[];
  onInspect: (data: PhotographyCategoryData) => void;
}

export const PhotographyCompactList: React.FC<PhotographyCompactListProps> = ({
  categories,
  onInspect
}) => {
  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {categories.map((item) => (
        <div
          key={item.id}
          className="bg-white border-2 border-[#0f2744] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-5 text-left"
        >
          {/* Main Photo Thumbnail */}
          <div className="relative w-full md:w-56 h-48 md:h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[#0f2744]/40">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
              onClick={() => onInspect(item)}
              loading="lazy"
            />
            <span className="absolute top-2 left-2 bg-white border border-[#0f2744] text-[#0f2744] text-[10px] font-black px-2 py-0.5 rounded">
              {item.categoryNumber}
            </span>
          </div>

          {/* Middle Info & Sample Photos */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="text-base sm:text-lg font-black text-black leading-tight">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-[#0f2744]">
                  {item.titleThai} • {item.badgeText}
                </span>
              </div>
              {item.cameraGear && (
                <span className="text-[11px] font-bold text-black border border-[#0f2744] px-2.5 py-0.5 rounded-full bg-slate-50 flex items-center gap-1">
                  <Camera className="w-3 h-3 text-[#0f2744]" />
                  <span>{item.cameraGear}</span>
                </span>
              )}
            </div>

            {/* Sample photos row */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold uppercase text-slate-500 shrink-0 flex items-center gap-1">
                <Eye className="w-3 h-3 text-[#0f2744]" />
                <span>ตัวอย่าง:</span>
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(item.sampleImages || []).slice(0, 4).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => onInspect(item)}
                    className="w-12 h-12 rounded-lg overflow-hidden border border-[#0f2744] shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={imgUrl}
                      alt={`Sample ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="w-full md:w-auto shrink-0">
            <button
              onClick={() => onInspect(item)}
              className="w-full md:w-auto px-5 py-2.5 rounded-xl border-2 border-[#0f2744] text-[#0f2744] font-bold text-xs sm:text-sm hover:bg-[#0f2744] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{item.detailsButtonText || 'ดูอัลบั้ม'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

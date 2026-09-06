import React, { useState } from 'react';
import { Camera, Maximize2, Eye } from 'lucide-react';
import { PhotographyCategoryData } from '../types';

interface PhotographyTimelineProps {
  categories: PhotographyCategoryData[];
  onInspect: (data: PhotographyCategoryData) => void;
}

export const PhotographyTimeline: React.FC<PhotographyTimelineProps> = ({
  categories,
  onInspect
}) => {
  return (
    <div className="relative py-4 max-w-4xl mx-auto">
      {/* Central Navy Connecting Line (visible on md+) */}
      <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-0.5 bg-[#0f2744]" />

      <div className="space-y-10">
        {categories.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10"
            >
              {/* Stepped Number Node in Center for Desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-[#0f2744] items-center justify-center font-black text-xs text-[#0f2744] shadow-sm">
                {item.categoryNumber}
              </div>

              {/* Image Side */}
              <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                <div className="relative group overflow-hidden rounded-2xl bg-white border-2 border-[#0f2744] shadow-sm hover:shadow-md transition-all">
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                      onClick={() => onInspect(item)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white border border-[#0f2744] text-[#0f2744] text-[11px] font-bold px-2.5 py-0.5 rounded-md">
                        {item.title}
                      </span>
                    </div>

                    <button
                      onClick={() => onInspect(item)}
                      title="ขยายดูภาพ"
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-white border border-[#0f2744] text-[#0f2744] hover:bg-[#0f2744] hover:text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-white flex justify-between items-end">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider opacity-80">{item.titleThai}</div>
                        <div className="text-sm font-bold">{item.badgeText}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Photos & Specs Side */}
              <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2 md:text-left' : 'md:order-1 md:text-left'}`}>
                <div className="bg-white border-2 border-[#0f2744] rounded-2xl p-4 sm:p-5 shadow-sm text-left">
                  <div className="flex items-center justify-between mb-3 border-b border-[#0f2744]/20 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-[#0f2744] text-white px-2 py-0.5 rounded">
                        {item.categoryNumber}
                      </span>
                      <h3 className="text-lg font-black text-black">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-[#0f2744]">
                      {item.titleThai}
                    </span>
                  </div>

                  {/* Sample Photos (Instead of long text) */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-black uppercase tracking-wider mb-2">
                      <Eye className="w-3 h-3 text-[#0f2744]" />
                      <span>รูปตัวอย่างในหมวดนี้ ({item.sampleImages?.length || 0} ภาพ)</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {(item.sampleImages || []).slice(0, 4).map((imgUrl, idx) => (
                        <div
                          key={idx}
                          onClick={() => onInspect(item)}
                          className="relative rounded-lg overflow-hidden aspect-square border border-[#0f2744] hover:scale-105 transition-transform cursor-pointer shadow-xs"
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

                  {/* Camera Gear & Minimal Tags */}
                  <div className="border border-[#0f2744] rounded-xl p-2.5 bg-slate-50 mb-3 text-left">
                    {item.cameraGear && (
                      <div className="flex items-center gap-1.5 text-xs text-black font-semibold mb-1">
                        <Camera className="w-3.5 h-3.5 text-[#0f2744]" />
                        <span>{item.cameraGear}</span>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-[#0f2744]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onInspect(item)}
                    className="w-full py-2 px-3 rounded-xl border-2 border-[#0f2744] text-[#0f2744] font-bold text-xs hover:bg-[#0f2744] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{item.detailsButtonText || 'ดูอัลบั้มเต็ม'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

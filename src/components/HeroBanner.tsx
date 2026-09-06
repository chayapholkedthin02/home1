import React from 'react';
import { Camera, Edit3, ArrowDown, Image as ImageIcon, Sparkles } from 'lucide-react';
import { BannerData } from '../types';

interface HeroBannerProps {
  banner: BannerData;
  onOpenEdit: () => void;
  onScrollToEducation: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  banner,
  onOpenEdit,
  onScrollToEducation
}) => {
  return (
    <section className="relative px-4 sm:px-6 pt-3 pb-2 max-w-6xl mx-auto">
      {/* Hero Container: White Background, Black Text, Navy Blue Border */}
      <div className="bg-white border-2 border-[#0f2744] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row gap-8 items-center">
        {/* Left Column: Minimal Text, High Contrast */}
        <div className="flex-1 flex flex-col justify-center text-left w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="bg-white border border-[#0f2744] text-[#0f2744] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#0f2744]" />
              <span>{banner.badgeText || 'PHOTOGRAPHY PORTFOLIO'}</span>
            </span>
          </div>

          {/* Photographer Name in Strong Black Font */}
          <h1
            id="hero-photographer-name"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-3 leading-tight tracking-tight"
          >
            {banner.name || 'Kanyakon Hengliang'}
          </h1>

          {/* Minimal Subtitle */}
          <p
            id="hero-subtitle"
            className="text-black/80 text-base sm:text-lg mb-6 font-medium leading-relaxed max-w-xl"
          >
            {banner.subtitle || 'Photography Portfolio • Portrait, Animal & Landscape Visual Showcase'}
          </p>

          {/* Action Buttons: Navy Blue Theme */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button
              id="hero-edit-btn"
              onClick={onOpenEdit}
              className="bg-[#0f2744] hover:bg-[#163355] text-white border-2 border-[#0f2744] px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-98 shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>แก้ไขผลงาน</span>
            </button>
            <button
              id="hero-scroll-btn"
              onClick={onScrollToEducation}
              className="bg-white hover:bg-slate-50 text-black border-2 border-[#0f2744] px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <ArrowDown className="w-4 h-4 text-[#0f2744]" />
              <span>ชมคอลเลกชันภาพถ่าย</span>
            </button>
          </div>

          {/* Clean Navy Micro-check Badges */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            {(banner.microChecks || [
              '3 หมวดภาพถ่ายหลัก',
              'แสดงรูปตัวอย่างแต่ละหมวด',
              'รองรับ Google Sites'
            ]).map((checkText, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#0f2744]/40 bg-slate-50 text-xs font-semibold text-black"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0f2744]" />
                <span>{checkText}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Prominent Photography Showcase */}
        <div className="w-full lg:w-[45%] relative">
          <div className="relative w-full rounded-2xl border-2 border-[#0f2744] bg-white overflow-hidden shadow-md group">
            {/* Top Navy Window Header */}
            <div className="h-8 bg-[#0f2744] flex items-center px-4 justify-between select-none">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              </div>
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                FEATURED WORK
              </span>
              <div className="w-6" />
            </div>

            {/* Showcase Image */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              <img
                id="hero-banner-image"
                src={banner.imageUrl}
                alt={banner.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* Change Image Button */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  id="hero-change-photo-btn"
                  onClick={onOpenEdit}
                  title="เปลี่ยนภาพแบนเนอร์"
                  className="bg-white border border-[#0f2744] text-black text-xs px-3 py-1.5 rounded-lg font-bold shadow-md flex items-center gap-1.5 hover:bg-slate-100 transition-all cursor-pointer active:scale-95"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#0f2744]" />
                  <span>เปลี่ยนรูปหน้าปก</span>
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white z-10">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-200">
                    Portrait • Animal • Landscape
                  </div>
                  <div className="text-white font-bold text-sm sm:text-base">
                    {banner.name}
                  </div>
                </div>
                <div className="text-[11px] font-bold bg-[#0f2744]/90 px-2.5 py-1 rounded border border-white/20">
                  3 Collections
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

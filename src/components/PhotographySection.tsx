import React from 'react';
import { LayoutGrid, Film, ListFilter, Camera } from 'lucide-react';
import { PhotographyCategoryData, ViewMode } from '../types';
import { PhotographyCard } from './PhotographyCard';
import { PhotographyTimeline } from './PhotographyTimeline';
import { PhotographyCompactList } from './PhotographyCompactList';

interface PhotographySectionProps {
  categories: [PhotographyCategoryData, PhotographyCategoryData, PhotographyCategoryData];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onInspectCategory: (data: PhotographyCategoryData, selectedIndex?: number) => void;
}

export const PhotographySection: React.FC<PhotographySectionProps> = ({
  categories,
  viewMode,
  setViewMode,
  onInspectCategory
}) => {
  return (
    <section id="photography-collections-section" className="px-4 sm:px-6 py-8 max-w-6xl mx-auto">
      {/* Section Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-2 border-[#0f2744] pb-4">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black px-2 py-0.5 rounded bg-[#0f2744] text-white tracking-widest font-mono uppercase">
              GALLERY
            </span>
            <span className="text-xs font-bold text-[#0f2744]">
              PORTRAIT • ANIMAL • LANDSCAPE
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight flex items-center gap-2">
            <span>คอลเลกชันภาพถ่าย</span>
            <span className="text-slate-300 font-light hidden sm:inline">|</span>
            <span className="text-black/60 font-medium text-xl hidden sm:inline">Photography Collections</span>
          </h2>
        </div>

        {/* Layout Mode Switcher (Navy styling) */}
        <div className="flex border border-[#0f2744] p-1 rounded-xl gap-1 self-start sm:self-auto bg-white">
          <button
            id="view-mode-cards"
            onClick={() => setViewMode('cards')}
            title="การ์ดภาพใหญ่"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-[#0f2744] text-white shadow-xs'
                : 'text-black hover:bg-slate-100'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>การ์ดภาพใหญ่</span>
          </button>

          <button
            id="view-mode-timeline"
            onClick={() => setViewMode('timeline')}
            title="สตริปภาพถ่าย"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-[#0f2744] text-white shadow-xs'
                : 'text-black hover:bg-slate-100'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>สตริปภาพถ่าย</span>
          </button>

          <button
            id="view-mode-compact"
            onClick={() => setViewMode('compact')}
            title="แกลเลอรีย่อ"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'compact'
                ? 'bg-[#0f2744] text-white shadow-xs'
                : 'text-black hover:bg-slate-100'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>แกลเลอรีย่อ</span>
          </button>
        </div>
      </div>

      {/* Render Selected View Mode */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {categories.map((category) => (
            <PhotographyCard
              key={category.id}
              data={category}
              onInspect={onInspectCategory}
            />
          ))}
        </div>
      )}

      {viewMode === 'timeline' && (
        <PhotographyTimeline
          categories={categories}
          onInspect={onInspectCategory}
        />
      )}

      {viewMode === 'compact' && (
        <PhotographyCompactList
          categories={categories}
          onInspect={onInspectCategory}
        />
      )}
    </section>
  );
};

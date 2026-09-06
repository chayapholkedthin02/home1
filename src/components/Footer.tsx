import React from 'react';
import { Camera, Code2, Edit3, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenEdit: () => void;
  onOpenEmbedGuide: () => void;
  photographerName: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEdit,
  onOpenEmbedGuide,
  photographerName
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 border-t-2 border-[#0f2744] pt-6 pb-8 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Photographer Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-50 border border-[#0f2744] text-[#0f2744] flex items-center justify-center font-bold text-xs">
            <Camera className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-xs sm:text-sm font-black text-black mr-2">
              {photographerName}
            </span>
            <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">
              Photography Portfolio • Designed for Google Sites
            </span>
          </div>
        </div>

        {/* Center/Right: Actions */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <button
            onClick={onOpenEdit}
            className="text-black hover:text-[#0f2744] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#0f2744]" />
            <span>แก้ไขผลงาน</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            onClick={onOpenEmbedGuide}
            className="text-black hover:text-[#0f2744] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5 text-[#0f2744]" />
            <span>โค้ดฝัง Google Sites</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            onClick={scrollToTop}
            className="text-black hover:text-[#0f2744] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>ด้านบน</span>
            <ArrowUp className="w-3 h-3 text-[#0f2744]" />
          </button>
        </div>
      </div>

      {/* Subtle bottom meta */}
      <div className="max-w-6xl mx-auto mt-4 pt-3 border-t border-[#0f2744]/20 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase gap-2">
        <span>PORTFOLIO • PORTRAIT • ANIMAL • LANDSCAPE</span>
        <div className="flex gap-4">
          <span>Google Sites Embed Ready</span>
          <span>Responsive Minimalist</span>
        </div>
      </div>
    </footer>
  );
};

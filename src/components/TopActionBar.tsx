import React from 'react';
import { Copy, Check, Edit3, Globe, Camera } from 'lucide-react';

interface TopActionBarProps {
  onOpenEdit: () => void;
  onOpenEmbedGuide: () => void;
  onCopyEmbedCode: () => void;
  copiedEmbed: boolean;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({
  onOpenEdit,
  onOpenEmbedGuide,
  onCopyEmbedCode,
  copiedEmbed
}) => {
  return (
    <header className="sticky top-0 z-30 w-full px-4 sm:px-6 pt-3 pb-3 bg-white/95 backdrop-blur-md border-b border-[#0f2744]/20 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Photography Badge */}
        <div className="flex items-center gap-2">
          <div className="bg-white border border-[#0f2744] px-3.5 py-1.5 rounded-full flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-[#0f2744]" />
            <span className="text-xs font-bold tracking-wider text-black uppercase">
              Photography Portfolio
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Google Sites Embed Button */}
          <button
            id="top-copy-embed-btn"
            onClick={onCopyEmbedCode}
            title="คัดลอกโค้ด iframe เพื่อนำไปวางใน Google Sites"
            className="bg-white border border-[#0f2744] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-black hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer active:scale-98"
          >
            {copiedEmbed ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">คัดลอกแล้ว!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#0f2744]" />
                <span>โค้ดฝัง Google Sites</span>
              </>
            )}
          </button>

          {/* Embed Guide Trigger */}
          <button
            id="top-guide-btn"
            onClick={onOpenEmbedGuide}
            title="ดูวิธีนำไปใส่ใน Google Sites"
            className="p-2 text-black hover:text-[#0f2744] bg-white hover:bg-slate-50 border border-[#0f2744] rounded-xl transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#0f2744]" />
          </button>

          {/* Edit Content Button */}
          <button
            id="top-edit-content-btn"
            onClick={onOpenEdit}
            className="bg-[#0f2744] text-white hover:bg-[#163355] border border-[#0f2744] px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Edit3 className="w-4 h-4" />
            <span>แก้ไขผลงาน (Edit Portfolio)</span>
          </button>
        </div>
      </div>
    </header>
  );
};

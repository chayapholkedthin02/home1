import React, { useState } from 'react';
import { X, Copy, Check, Code2, Globe } from 'lucide-react';

interface GoogleSitesModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedCode: string;
}

export const GoogleSitesModal: React.FC<GoogleSitesModalProps> = ({
  isOpen,
  onClose,
  embedCode
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card: White Background, Navy Border, Black Text */}
      <div className="relative w-full max-w-xl bg-white border-2 border-[#0f2744] rounded-3xl shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-[#0f2744] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#0f2744] text-[#0f2744] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-black">วิธีฝังใน Google Sites</h3>
              <p className="text-xs text-slate-500 font-medium">Google Sites Embed Instructions & Code</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-[#0f2744] text-black hover:bg-[#0f2744] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 text-left overflow-y-auto">
          {/* Iframe Code Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#0f2744]" />
                <span>โค้ด HTML iframe สำหรับฝังใน Google Sites:</span>
              </label>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-bold text-[#0f2744] hover:underline cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">คัดลอกสำเร็จ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>คลิกเพื่อคัดลอก</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-900 text-white text-xs font-mono overflow-x-auto leading-relaxed border border-[#0f2744] select-all">
                {embedCode}
              </pre>
            </div>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-black uppercase tracking-wider">
              ขั้นตอนการนำไปใช้งานบน Google Sites:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-black">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#0f2744]">
                <span className="w-5 h-5 rounded-full bg-[#0f2744] text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="font-bold">คัดลอกโค้ด:</strong> กดปุ่ม "คัดลอกโค้ด iframe" ด้านบน
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#0f2744]">
                <span className="w-5 h-5 rounded-full bg-[#0f2744] text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="font-bold">เปิดหน้าเว็บ:</strong> เข้าสู่ Google Sites ของคุณ แล้วคลิกเมนู <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">แทรก (Insert)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#0f2744]">
                <span className="w-5 h-5 rounded-full bg-[#0f2744] text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="font-bold">เลือกฝังโค้ด:</strong> คลิกที่เครื่องมือ <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">ฝัง (&lt;&gt; Embed)</span> จากนั้นเลือกแท็บ <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">ฝังโค้ด (Embed code)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#0f2744]">
                <span className="w-5 h-5 rounded-full bg-[#0f2744] text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
                <div>
                  <strong className="font-bold">วางและบันทึก:</strong> วางโค้ดที่คัดลอกมา แล้วกด <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">ถัดไป (Next)</span> และ <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">แทรก (Insert)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#0f2744]">
                <span className="w-5 h-5 rounded-full bg-[#0f2744] text-white font-bold text-xs flex items-center justify-center shrink-0">5</span>
                <div>
                  <strong className="font-bold">ปรับขนาดบล็อก:</strong> ลากขอบบล็อก iframe ให้กว้างเต็มหน้าจอเพื่อการแสดงผลที่สวยงาม
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t-2 border-[#0f2744] bg-white flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium">รองรับ Desktop, Tablet, Mobile</span>
          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-xl bg-[#0f2744] hover:bg-[#163355] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-sm active:scale-98"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'คัดลอกเรียบร้อยแล้ว' : 'คัดลอกโค้ด iframe'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

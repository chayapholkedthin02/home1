import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Trash2,
  Save,
  RotateCcw,
  Camera,
  Image as ImageIcon,
  CheckCircle,
  Plus,
  AlertCircle
} from 'lucide-react';
import { PortfolioData, PhotographyCategoryData } from '../types';
import { DEFAULT_PORTFOLIO_DATA, PRESET_IMAGES } from '../data/defaultData';
import { compressImage } from '../utils/imageCompressor';

interface EditContentModalProps {
  isOpen: boolean;
  currentData: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onClose: () => void;
  initialTab?: number;
}

export const EditContentModal: React.FC<EditContentModalProps> = ({
  isOpen,
  currentData,
  onSave,
  onReset,
  onClose,
  initialTab = 0
}) => {
  const [activeTab, setActiveTab] = useState<number>(initialTab);
  const [formData, setFormData] = useState<PortfolioData>(() => JSON.parse(JSON.stringify(currentData)));
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionError, setCompressionError] = useState<string | null>(null);

  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const mainPhotoInputRef = useRef<HTMLInputElement>(null);
  const samplePhotoInputRef = useRef<HTMLInputElement>(null);

  // Synchronize when opening
  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(currentData)));
      setActiveTab(initialTab);
      setSaveSuccessNotice(false);
      setCompressionError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, currentData, initialTab]);

  if (!isOpen) return null;

  // Banner input handler
  const handleBannerChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      banner: {
        ...prev.banner,
        [field]: value
      }
    }));
  };

  // Category input handler
  const handleCategoryChange = (categoryIndex: number, field: string, value: any) => {
    setFormData((prev) => {
      const nextCategories = [...prev.categories] as [
        PhotographyCategoryData,
        PhotographyCategoryData,
        PhotographyCategoryData
      ];
      nextCategories[categoryIndex] = {
        ...nextCategories[categoryIndex],
        [field]: value
      };
      return {
        ...prev,
        categories: nextCategories
      };
    });
  };

  // Handle Banner Image File Upload with auto compression
  const handleBannerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setCompressionError(null);

    try {
      const compressedDataUrl = await compressImage(file, 1200, 1000, 0.78);
      handleBannerChange('imageUrl', compressedDataUrl);
    } catch (err: any) {
      setCompressionError('ไม่สามารถประมวลผลไฟล์ภาพได้ กรุณาลองใช้รูปอื่น');
    } finally {
      setIsCompressing(false);
      if (e.target) e.target.value = '';
    }
  };

  // Handle Category Main Image File Upload with auto compression
  const handleMainPhotoUpload = async (categoryIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setCompressionError(null);

    try {
      const compressedDataUrl = await compressImage(file, 1200, 1000, 0.78);
      handleCategoryChange(categoryIndex, 'imageUrl', compressedDataUrl);
    } catch (err: any) {
      setCompressionError('ไม่สามารถประมวลผลไฟล์ภาพได้');
    } finally {
      setIsCompressing(false);
      if (e.target) e.target.value = '';
    }
  };

  // Handle Category Sample Photo Upload
  const handleSamplePhotoUpload = async (categoryIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setCompressionError(null);

    try {
      const compressedDataUrl = await compressImage(file, 800, 800, 0.75);
      const category = formData.categories[categoryIndex];
      const updatedSamples = [...(category.sampleImages || []), compressedDataUrl];
      handleCategoryChange(categoryIndex, 'sampleImages', updatedSamples);
    } catch (err: any) {
      setCompressionError('ไม่สามารถประมวลผลไฟล์ตัวอย่างได้');
    } finally {
      setIsCompressing(false);
      if (e.target) e.target.value = '';
    }
  };

  // Remove a sample photo
  const handleRemoveSamplePhoto = (categoryIndex: number, photoIndex: number) => {
    const category = formData.categories[categoryIndex];
    const updated = (category.sampleImages || []).filter((_, idx) => idx !== photoIndex);
    handleCategoryChange(categoryIndex, 'sampleImages', updated);
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccessNotice(true);
    setTimeout(() => {
      setSaveSuccessNotice(false);
      onClose();
    }, 600);
  };

  // Active Category helper (index 0, 1, 2 for tabs 1, 2, 3)
  const currentCategoryIndex = activeTab > 0 ? activeTab - 1 : 0;
  const currentCategory = formData.categories[currentCategoryIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal: White Background, Black Text, Navy Border */}
      <div className="relative w-full max-w-4xl bg-white border-2 border-[#0f2744] rounded-3xl shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[92vh] text-left">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#0f2744] bg-white">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#0f2744]" />
            <h2 className="text-lg sm:text-xl font-black text-black">
              แก้ไขข้อมูลพอร์ตโฟลิโอ (Edit Photography Content)
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="ปิดหน้าต่าง"
            className="w-8 h-8 rounded-lg border border-[#0f2744] text-black hover:bg-[#0f2744] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs (Navy Framing) */}
        <div className="flex border-b border-[#0f2744]/20 bg-slate-50 px-4 pt-2 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 0
                ? 'bg-white text-black border-t-2 border-x-2 border-[#0f2744] -mb-px shadow-xs'
                : 'text-slate-600 hover:text-black hover:bg-slate-100'
            }`}
          >
            📷 ข้อมูลช่างภาพ & หน้าปก
          </button>

          {formData.categories.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(idx + 1)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === idx + 1
                  ? 'bg-white text-black border-t-2 border-x-2 border-[#0f2744] -mb-px shadow-xs'
                  : 'text-slate-600 hover:text-black hover:bg-slate-100'
              }`}
            >
              {idx === 0 && '👤 '}
              {idx === 1 && '🐾 '}
              {idx === 2 && '🌄 '}
              {cat.title} ({cat.titleThai})
            </button>
          ))}
        </div>

        {/* Compression alert if any */}
        {compressionError && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{compressionError}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 0: Photographer & Banner */}
          {activeTab === 0 && (
            <div className="space-y-5">
              <div className="border border-[#0f2744] rounded-2xl p-4 sm:p-5 bg-white space-y-4">
                <h3 className="text-sm font-black text-black uppercase tracking-wider border-b border-[#0f2744]/20 pb-2">
                  ข้อมูลช่างภาพ (Photographer Details)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      ชื่อช่างภาพ / ศิลปิน (Photographer Name)
                    </label>
                    <input
                      type="text"
                      value={formData.banner.name}
                      onChange={(e) => handleBannerChange('name', e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                      placeholder="เช่น Kanyakon Hengliang"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      ป้ายกำกับ (Badge Text)
                    </label>
                    <input
                      type="text"
                      value={formData.banner.badgeText}
                      onChange={(e) => handleBannerChange('badgeText', e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                      placeholder="PHOTOGRAPHY PORTFOLIO"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    คำโปรยสั้น (Tagline / Subtitle)
                  </label>
                  <input
                    type="text"
                    value={formData.banner.subtitle}
                    onChange={(e) => handleBannerChange('subtitle', e.target.value)}
                    className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                    placeholder="เช่น Visual Storyteller • Portrait, Animal & Landscape Showcase"
                  />
                </div>
              </div>

              {/* Banner Cover Image Management */}
              <div className="border border-[#0f2744] rounded-2xl p-4 sm:p-5 bg-white space-y-4">
                <h3 className="text-sm font-black text-black uppercase tracking-wider border-b border-[#0f2744]/20 pb-2">
                  ภาพถ่ายหน้าปก (Hero Showcase Image)
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden border-2 border-[#0f2744] bg-slate-100 shrink-0">
                    <img
                      src={formData.banner.imageUrl}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">
                        URL ของภาพหน้าปก
                      </label>
                      <input
                        type="url"
                        value={formData.banner.imageUrl}
                        onChange={(e) => handleBannerChange('imageUrl', e.target.value)}
                        className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                        placeholder="https://..."
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <input
                        type="file"
                        ref={bannerFileInputRef}
                        accept="image/*"
                        onChange={handleBannerFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={isCompressing}
                        onClick={() => bannerFileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f2744] hover:bg-[#163355] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isCompressing ? 'กำลังประมวลผลรูป...' : 'อัปโหลดรูปจากเครื่อง'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBannerChange('imageUrl', DEFAULT_PORTFOLIO_DATA.banner.imageUrl)}
                        className="px-3.5 py-2 rounded-xl border border-[#0f2744] text-black hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                      >
                        คืนค่ารูปเริ่มต้น
                      </button>
                    </div>

                    {/* Presets */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">
                        หรือเลือกภาพแนะนำ:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_IMAGES.banner.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleBannerChange('imageUrl', preset.url)}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#0f2744]/40 hover:border-[#0f2744] text-black bg-slate-50"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1, 2, 3: Categories (Portrait, Animal, Landscape) */}
          {activeTab > 0 && currentCategory && (
            <div className="space-y-5">
              {/* Category Info */}
              <div className="border border-[#0f2744] rounded-2xl p-4 sm:p-5 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-[#0f2744]/20 pb-2">
                  <h3 className="text-sm font-black text-black uppercase tracking-wider">
                    ข้อมูลหมวด {currentCategory.title}
                  </h3>
                  <span className="text-xs font-bold text-[#0f2744] border border-[#0f2744] px-2.5 py-0.5 rounded-full">
                    {currentCategory.categoryNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      ชื่อหมวดภาษาอังกฤษ (Title)
                    </label>
                    <input
                      type="text"
                      value={currentCategory.title}
                      onChange={(e) => handleCategoryChange(currentCategoryIndex, 'title', e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      ชื่อหมวดภาษาไทย (Thai Title)
                    </label>
                    <input
                      type="text"
                      value={currentCategory.titleThai}
                      onChange={(e) => handleCategoryChange(currentCategoryIndex, 'titleThai', e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      กล้องและเลนส์ที่ใช้ (Camera & Gear)
                    </label>
                    <input
                      type="text"
                      value={currentCategory.cameraGear || ''}
                      onChange={(e) => handleCategoryChange(currentCategoryIndex, 'cameraGear', e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                      placeholder="เช่น Sony A7R V • FE 85mm f/1.4 GM"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      ป้ายจุดเด่น (Badge Text)
                    </label>
                    <input
                      type="text"
                      value={currentCategory.badgeText}
                      onChange={(e) => handleCategoryChange(currentCategoryIndex, 'badgeText', e.target.value)}
                      className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    แท็กที่เกี่ยวข้อง (คั่นด้วยจุลภาค ,)
                  </label>
                  <input
                    type="text"
                    value={currentCategory.tags.join(', ')}
                    onChange={(e) => {
                      const splitted = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      handleCategoryChange(currentCategoryIndex, 'tags', splitted);
                    }}
                    className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                    placeholder="Studio, Natural Light, Editorial"
                  />
                </div>
              </div>

              {/* Main Showcase Photo */}
              <div className="border border-[#0f2744] rounded-2xl p-4 sm:p-5 bg-white space-y-4">
                <h3 className="text-sm font-black text-black uppercase tracking-wider border-b border-[#0f2744]/20 pb-2">
                  ภาพหลักประจำหมวด (Hero Photo)
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden border-2 border-[#0f2744] bg-slate-100 shrink-0">
                    <img
                      src={currentCategory.imageUrl}
                      alt={currentCategory.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-bold text-black mb-1">
                        URL ของภาพหลัก
                      </label>
                      <input
                        type="url"
                        value={currentCategory.imageUrl}
                        onChange={(e) => handleCategoryChange(currentCategoryIndex, 'imageUrl', e.target.value)}
                        className="w-full px-3.5 py-2 border border-[#0f2744] rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-2 focus:ring-[#0f2744]"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <input
                        type="file"
                        ref={mainPhotoInputRef}
                        accept="image/*"
                        onChange={(e) => handleMainPhotoUpload(currentCategoryIndex, e)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={isCompressing}
                        onClick={() => mainPhotoInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0f2744] hover:bg-[#163355] text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isCompressing ? 'กำลังปรับขนาด...' : 'อัปโหลดภาพหลักใหม่'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCategoryChange(currentCategoryIndex, 'imageUrl', DEFAULT_PORTFOLIO_DATA.categories[currentCategoryIndex].imageUrl)}
                        className="px-3 py-2 rounded-xl border border-[#0f2744] text-black hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                      >
                        คืนค่ารูปเริ่มต้น
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Photos Gallery Management (The user's key requirement) */}
              <div className="border border-[#0f2744] rounded-2xl p-4 sm:p-5 bg-white space-y-4">
                <div className="flex items-center justify-between border-b border-[#0f2744]/20 pb-2">
                  <div>
                    <h3 className="text-sm font-black text-black uppercase tracking-wider">
                      รูปตัวอย่างในหมวดนี้ (Sample Photos Gallery)
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      แทนที่คำบรรยายใต้ภาพ เพื่อเน้นแสดงผลงานภาพถ่ายจริง
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={samplePhotoInputRef}
                    accept="image/*"
                    onChange={(e) => handleSamplePhotoUpload(currentCategoryIndex, e)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    disabled={isCompressing}
                    onClick={() => samplePhotoInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f2744] text-white text-xs font-bold hover:bg-[#163355] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>เพิ่มรูปตัวอย่าง</span>
                  </button>
                </div>

                {/* List of sample photos */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(currentCategory.sampleImages || []).map((imgUrl, sIdx) => (
                    <div
                      key={sIdx}
                      className="relative rounded-xl overflow-hidden border-2 border-[#0f2744] aspect-square group bg-slate-100"
                    >
                      <img
                        src={imgUrl}
                        alt={`Sample ${sIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSamplePhoto(currentCategoryIndex, sIdx)}
                        title="ลบรูปนี้"
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-90 hover:opacity-100 cursor-pointer shadow-md"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Preset Adders */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                    หรือเลือกรูปแนะนำเพิ่มเข้าไปในอัลบั้ม:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(PRESET_IMAGES[currentCategory.id] || []).map((preset: any, pIdx: number) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => {
                          const updated = [...(currentCategory.sampleImages || []), preset.url];
                          handleCategoryChange(currentCategoryIndex, 'sampleImages', updated);
                        }}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-[#0f2744]/40 hover:border-[#0f2744] text-black bg-slate-50 cursor-pointer"
                      >
                        + {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="border-t-2 border-[#0f2744] pt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 border border-[#0f2744] text-black hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-[#0f2744]" />
              <span>รีเซ็ตกลับเป็นค่าเริ่มต้น</span>
            </button>

            <div className="flex items-center gap-3">
              {saveSuccessNotice && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>บันทึกสำเร็จ!</span>
                </span>
              )}

              <button
                type="submit"
                id="edit-save-btn"
                disabled={isCompressing}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0f2744] hover:bg-[#163355] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer active:scale-98 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isCompressing ? 'กำลังประมวลผลภาพ...' : 'บันทึกการเปลี่ยนแปลง (Save Changes)'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

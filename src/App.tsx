import React, { useState, useEffect } from 'react';
import { PortfolioData, PhotographyCategoryData, ViewMode } from './types';
import { DEFAULT_PORTFOLIO_DATA } from './data/defaultData';
import {
  getInitialPortfolioData,
  loadFromIndexedDB,
  savePortfolioData,
  clearPortfolioData
} from './utils/storage';
import { TopActionBar } from './components/TopActionBar';
import { HeroBanner } from './components/HeroBanner';
import { PhotographySection } from './components/PhotographySection';
import { DetailInspectionModal } from './components/DetailInspectionModal';
import { EditContentModal } from './components/EditContentModal';
import { GoogleSitesModal } from './components/GoogleSitesModal';
import { Footer } from './components/Footer';

export default function App() {
  // State for all portfolio data with dual IndexedDB + localStorage persistence
  const [data, setData] = useState<PortfolioData>(() => getInitialPortfolioData());
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  // Load richer data from IndexedDB asynchronously on mount
  useEffect(() => {
    loadFromIndexedDB().then((idbData) => {
      if (idbData && idbData.categories && idbData.categories.length === 3) {
        setData(idbData);
      }
    }).catch((err) => {
      console.warn('IndexedDB initial load warning:', err);
    });
  }, []);

  // UI Modal States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editTab, setEditTab] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PhotographyCategoryData | null>(null);
  const [isEmbedGuideOpen, setIsEmbedGuideOpen] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  // Generate responsive Google Sites iframe embed code
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://your-portfolio-url.com';
  const iframeEmbedCode = `<iframe src="${currentUrl}" width="100%" height="960" style="border:none; border-radius:16px; box-shadow:0 4px 20px rgba(15, 39, 68, 0.08);" title="Photography Portfolio" allow="fullscreen" loading="lazy"></iframe>`;

  // Save changes to state, IndexedDB, and localStorage safely
  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData).catch((e) => {
      console.warn('Persistence notice:', e);
    });
  };

  // Reset to default template
  const handleResetData = () => {
    setData(DEFAULT_PORTFOLIO_DATA);
    clearPortfolioData().catch((e) => {
      console.warn('Reset notice:', e);
    });
  };

  // Copy embed code handler
  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(iframeEmbedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  // Open detail inspection modal
  const handleInspectCategory = (category: PhotographyCategoryData) => {
    setSelectedCategory(category);
    setIsDetailOpen(true);
  };

  // Open edit modal on a specific tab
  const handleOpenEdit = (tabIndex = 0) => {
    setEditTab(tabIndex);
    setIsEditOpen(true);
  };

  // Smooth scroll to photography section
  const handleScrollToPhotography = () => {
    const el = document.getElementById('photography-collections-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative flex flex-col font-sans">
      {/* Top Action Bar */}
      <TopActionBar
        onOpenEdit={() => handleOpenEdit(0)}
        onOpenEmbedGuide={() => setIsEmbedGuideOpen(true)}
        onCopyEmbedCode={handleCopyEmbedCode}
        copiedEmbed={copiedEmbed}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-4 sm:space-y-6">
        {/* Split Hero Top Banner */}
        <HeroBanner
          banner={data.banner}
          onOpenEdit={() => handleOpenEdit(0)}
          onScrollToEducation={handleScrollToPhotography}
        />

        {/* Photography Collections: Portrait, Animal, Landscape */}
        <PhotographySection
          categories={data.categories}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onInspectCategory={handleInspectCategory}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenEdit={() => handleOpenEdit(0)}
        onOpenEmbedGuide={() => setIsEmbedGuideOpen(true)}
        photographerName={data.banner.name}
      />

      {/* Detail Inspection / Fullscreen Lightbox Modal */}
      <DetailInspectionModal
        isOpen={isDetailOpen}
        selectedCategory={selectedCategory}
        allCategories={data.categories}
        onClose={() => setIsDetailOpen(false)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* In-App Edit Content Modal */}
      <EditContentModal
        isOpen={isEditOpen}
        currentData={data}
        onSave={handleSaveData}
        onReset={handleResetData}
        onClose={() => setIsEditOpen(false)}
        initialTab={editTab}
      />

      {/* Google Sites Embed Guide & Code Modal */}
      <GoogleSitesModal
        isOpen={isEmbedGuideOpen}
        onClose={() => setIsEmbedGuideOpen(false)}
        embedCode={iframeEmbedCode}
      />
    </div>
  );
}

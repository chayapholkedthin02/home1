import { PortfolioData } from '../types';

export const STORAGE_KEY = 'photo_portfolio_template_data_v2';

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  banner: {
    name: 'Kanyakon Hengliang',
    subtitle: 'Photography Portfolio • Portrait, Animal & Landscape Visual Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop',
    badgeText: 'PHOTOGRAPHY PORTFOLIO',
    microChecks: [
      '3 หมวดภาพถ่ายหลัก',
      'แสดงรูปตัวอย่างแต่ละหมวด',
      'รองรับ Google Sites'
    ]
  },
  categories: [
    {
      id: 'portrait',
      categoryNumber: '01',
      buttonLabel: 'Portrait',
      title: 'Portrait Photography',
      titleThai: 'ภาพถ่ายบุคคล',
      badgeText: 'Fine Art & Expression',
      cameraGear: 'Sony A7R V • FE 85mm f/1.4 GM',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
      sampleImages: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'
      ],
      tags: ['Natural Light', 'Studio Lighting', '85mm', 'Editorial'],
      detailsButtonText: 'ดูอัลบั้ม Portrait'
    },
    {
      id: 'animal',
      categoryNumber: '02',
      buttonLabel: 'Animal',
      title: 'Animal & Wildlife',
      titleThai: 'ภาพถ่ายสัตว์โลก',
      badgeText: 'Wildlife & Domestic',
      cameraGear: 'Canon EOS R5 • RF 100-500mm f/4.5-7.1L',
      imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1000&auto=format&fit=crop',
      sampleImages: [
        'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=600&auto=format&fit=crop'
      ],
      tags: ['Wildlife', 'Action Shots', 'Telephoto', 'Macro'],
      detailsButtonText: 'ดูอัลบั้ม Animal'
    },
    {
      id: 'landscape',
      categoryNumber: '03',
      buttonLabel: 'Landscape',
      title: 'Landscape & Nature',
      titleThai: 'ภาพถ่ายทิวทัศน์',
      badgeText: 'Vista & Long Exposure',
      cameraGear: 'Nikon Z8 • NIKKOR Z 14-24mm f/2.8 S',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop',
      sampleImages: [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop'
      ],
      tags: ['Golden Hour', 'Mountains', 'Long Exposure', 'Wide Angle'],
      detailsButtonText: 'ดูอัลบั้ม Landscape'
    }
  ]
};

// Preset images users can conveniently pick from in editor
export const PRESET_IMAGES = {
  banner: [
    { label: 'Camera & Lens Gear', url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Photographer Sunset', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Dark Minimalist Lens', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop' },
    { label: 'Mountain Silhouette', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop' }
  ],
  portrait: [
    { label: 'Studio Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Natural Light', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Warm Glow', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Street Fashion', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop' }
  ],
  animal: [
    { label: 'Majestic Tiger', url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Wild Fox', url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Playful Dog', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Cat Close-up', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop' }
  ],
  landscape: [
    { label: 'Yosemite Reflection', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Misty Mountains', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Sunbeam Forest', url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1000&auto=format&fit=crop' },
    { label: 'Sunset Horizon', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop' }
  ]
};

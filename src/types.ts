export interface PhotographyCategoryData {
  id: 'portrait' | 'animal' | 'landscape';
  categoryNumber: string; // e.g. "01", "02", "03"
  buttonLabel: string; // Customizable label e.g. "Portrait", "Animal", "Landscape"
  title: string; // e.g. "Portrait Photography", "Animal & Wildlife", "Landscape & Nature"
  titleThai: string; // e.g. "ภาพถ่ายบุคคล", "ภาพถ่ายสัตว์โลก", "ภาพถ่ายทิวทัศน์"
  badgeText: string; // e.g. "Series 01", "Fine Art", "Golden Hour"
  imageUrl: string; // Main showcase hero photograph
  sampleImages: string[]; // List of sample photos in this category (replaces long descriptions!)
  cameraGear?: string; // Camera & lens used e.g. "Sony A7 IV • 85mm f/1.4"
  tags: string[]; // Minimal tags e.g. ["Studio", "Natural Light", "85mm"]
  detailsButtonText: string; // e.g. "ดูภาพทั้งหมด" / "ขยายดูภาพ"
}

export interface BannerData {
  name: string; // Photographer's Name
  subtitle: string; // Concise tagline
  imageUrl: string; // Hero banner photography
  badgeText: string;
  microChecks: string[];
}

export interface PortfolioData {
  banner: BannerData;
  categories: [PhotographyCategoryData, PhotographyCategoryData, PhotographyCategoryData];
  // Backward compatibility alias during transition
  educations?: any;
}

export type ViewMode = 'cards' | 'timeline' | 'compact';

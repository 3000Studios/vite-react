
import { ShoppingItem } from './types';

export const COLORS = {
  brand: {
    primary: '#6366f1',
    accent: '#f59e0b',
    danger: '#ef4444',
    success: '#10b981'
  }
};

export const INITIAL_TASKS: any[] = [];

export const SHOPPING_LIST_ITEMS: ShoppingItem[] = [
  { 
    id: 's1', 
    title: 'Google Business Profile (GBP) Sync', 
    description: 'Connects the GMB API to your site. Syncs 5-star reviews, live store photos, and updated hours automatically.', 
    benefit: 'Boosts local SEO trust and reduces customer friction regarding store availability.',
    effort: 'Mid-Tier Integration (12h)',
    category: 'Marketing', 
    isChecked: false,
    previewType: 'gbp'
  },
  { 
    id: 's2', 
    title: 'Local SEO Authority Pack', 
    description: 'Deep Schema.org markup for restaurants, geo-tagged image metadata, and local backlink infrastructure.', 
    benefit: 'Dominates "Cajun Food" searches in a 15-mile radius, bypassing third-party platform ads.',
    effort: 'Continuous Optimization (20h)',
    category: 'Marketing', 
    isChecked: false,
    previewType: 'seo'
  },
  { 
    id: 's3', 
    title: 'Interactive Visual Menu UX', 
    description: 'Replaces static PDFs with a high-impact, filterable menu with ingredient tooltips and allergen filters.', 
    benefit: 'Improves mobile conversion by 40% compared to traditional PDF menu downloads.',
    effort: 'Front-End Engineering (30h)',
    category: 'Design', 
    isChecked: false,
    previewType: 'menu'
  },
  { 
    id: 's4', 
    title: 'AI Chef Recommendations', 
    description: 'An intelligent recommendation layer that suggests sides and pairings based on user browsing habits.', 
    benefit: 'Increases Average Order Value (AOV) by intelligently upselling high-margin items.',
    effort: 'Advanced Technical (45h)',
    category: 'Technical', 
    isChecked: false,
    previewType: 'ai'
  },
  { 
    id: 's5', 
    title: 'Online Catering Portal', 
    description: 'A dedicated B2B flow for bulk orders, deposit payments, and event calendar management.', 
    benefit: 'Opens new revenue streams for corporate events and large-scale gatherings.',
    effort: 'Full-Stack Development (60h)',
    category: 'Feature', 
    isChecked: false,
    previewType: 'catering'
  },
  { 
    id: 's6', 
    title: 'Automated SMS Alerts', 
    description: 'Twilio integration for order status updates, delivery tracking, and loyalty reminders.', 
    benefit: 'Reduces "where is my food" support calls and increases customer retention.',
    effort: 'API Integration (15h)',
    category: 'Feature', 
    isChecked: false,
    previewType: 'sms'
  },
  { 
    id: 's7', 
    title: 'Wholesale Partner Portal', 
    description: 'Gated access for wholesale distributors to order bulk Cajun ingredients at tiered pricing.', 
    benefit: 'Streamlines supply chain and allows the brand to scale beyond restaurant walls.',
    effort: 'Architectural Project (80h)',
    category: 'Feature', 
    isChecked: false,
    previewType: 'wholesale'
  },
  { 
    id: 's8', 
    title: 'Mobile App Shell (PWA)', 
    description: 'Converts the site into a Progressive Web App that users can "install" on their phone home screens.', 
    benefit: 'Zero App Store fees while maintaining a permanent presence on the user\'s mobile device.',
    effort: 'Infrastructure (25h)',
    category: 'Technical', 
    isChecked: false,
    previewType: 'loyalty'
  }
];

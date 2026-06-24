import type { Tool, VipPlan } from '../types'

// ===== App Config =====
export const APP_CONFIG = {
  name: 'AI Toolbox',
  tagline: 'Your All-in-One AI Assistant',
  description: 'Integrated AI chat, image processing, translation, resume generation and more',
  version: 'v1.0.0',
  defaultLocale: 'zh-CN' as const,
  locales: ['zh-CN', 'en'] as const,
  copyright: 'All Rights Reserved',
  maxWidth: '1200px',
  brandColors: {
    primary: '#6366F1',
    primaryDark: '#4F46E5',
    accent: '#F59E0B',
    success: '#10B981',
    bgPage: '#F8FAFC',
  },
}

// ===== Plan limits =====
export const FREE_DAILY_QUOTA = 10
export const VIP_DAILY_QUOTA = Infinity
export const MAX_INPUT_LENGTH = 2000

// ===== Language options =====
export const LANGUAGES = [
  { code: 'auto', name: '自动检测', nameEn: 'Auto Detect' },
  { code: 'zh', name: '中文', nameEn: 'Chinese' },
  { code: 'en', name: '英文', nameEn: 'English' },
  { code: 'ja', name: '日语', nameEn: 'Japanese' },
  { code: 'ko', name: '韩语', nameEn: 'Korean' },
  { code: 'fr', name: '法语', nameEn: 'French' },
  { code: 'de', name: '德语', nameEn: 'German' },
  { code: 'es', name: '西班牙语', nameEn: 'Spanish' },
  { code: 'pt', name: '葡萄牙语', nameEn: 'Portuguese' },
  { code: 'ru', name: '俄语', nameEn: 'Russian' },
  { code: 'ar', name: '阿拉伯语', nameEn: 'Arabic' },
  { code: 'th', name: '泰语', nameEn: 'Thai' },
  { code: 'vi', name: '越南语', nameEn: 'Vietnamese' },
]

export const LANG_NAME_EXTERNAL: Record<string, string> = {
  'auto': 'Auto Detect',
  'zh': '中文',
  'en': 'English',
  'ja': '日本語',
  'ko': '한국어',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'pt': 'Português',
  'ru': 'Русский',
  'ar': 'العربية',
  'th': 'ไทย',
  'vi': 'Tiếng Việt',
}

// ===== Tool definitions =====
export const TOOLS: Tool[] = [
  { id: 'chat', nameKey: 'chat.title', descKey: 'chat.welcomeDesc', icon: '🤖', href: '/chat', category: 'ai', pro: false, color: '#6366F1' },
  { id: 'image', nameKey: 'image.title', descKey: 'image.uploadHint', icon: '🎨', href: '/image', category: 'ai', pro: false, color: '#8B5CF6' },
  { id: 'translate', nameKey: 'translate.title', descKey: 'translate.desc', icon: '🌐', href: '/translate', category: 'ai', pro: false, color: '#06B6D4' },
  { id: 'resume', nameKey: 'resume.title', descKey: 'resume.desc', icon: '📄', href: '/resume', category: 'ai', pro: true, color: '#F59E0B' },
  { id: 'qrcode', nameKey: 'qrcode.title', descKey: 'qrcode.desc', icon: '📱', href: '/qrcode', category: 'utility', pro: false, color: '#10B981' },
  { id: 'compress', nameKey: 'compress.title', descKey: 'compress.desc', icon: '📦', href: '/compress', category: 'utility', pro: false, color: '#EC4899' },
  { id: 'calculator', nameKey: 'calculator.title', descKey: 'calculator.desc', icon: '🏠', href: '/calculator', category: 'utility', pro: false, color: '#EF4444' },
  { id: 'ocr', nameKey: 'ocr.title', descKey: 'ocr.desc', icon: '📝', href: '/ocr', category: 'utility', pro: true, color: '#14B8A6' },
]

export const CATEGORIES = [
  { id: 'ai' as const, nameKey: 'tools.aiTools', icon: '⚡' },
  { id: 'utility' as const, nameKey: 'tools.utilityTools', icon: '🔧' },
]

// ===== VIP Plans =====
export const VIP_PLANS: VipPlan[] = [
  {
    id: 'month',
    nameKey: 'member.monthly',
    price: 29,
    original: null,
    recommended: false,
    periodKey: 'member.month',
    featuresKey: 'member.featuresMonth',
  },
  {
    id: 'year',
    nameKey: 'member.yearly',
    price: 99,
    original: 348,
    recommended: true,
    periodKey: 'member.year',
    featuresKey: 'member.featuresYear',
  },
]

// ===== Calculator constants =====
export const DOWN_PAYMENT_RATIOS = [20, 30, 40, 50, 60]
export const LOAN_YEARS = [10, 15, 20, 25, 30]
export const DEFAULT_RATE = '3.95'

// ===== Resume template options =====
export const RESUME_TEMPLATES = [
  { id: 'classic', name: 'Classic', style: 'white' },
  { id: 'modern', name: 'Modern', style: 'gradient' },
  { id: 'pro', name: 'Professional', style: 'blue' },
]
export const EXPERIENCE_OPTIONS = ['<1yr', '1-3yr', '3-5yr', '5-10yr', '10+yr']

// ===== QR code sizes =====
export const QR_SIZES = [200, 300, 400]

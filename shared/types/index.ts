// ===== Core Data Models =====

export interface Tool {
  id: string
  nameKey: string
  descKey: string
  icon: string
  href: string
  category: 'ai' | 'utility'
  pro: boolean
  color: string
}

export interface VipPlan {
  id: string
  nameKey: string
  price: number
  original: number | null
  recommended: boolean
  periodKey: string
  featuresKey: string
}

export interface UserSettings {
  locale: 'zh-CN' | 'en'
  theme: 'light' | 'dark'
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
  time: string
}

export interface TranslationResult {
  sourceText: string
  resultText: string
  fromLang: string
  toLang: string
}

export interface CalcResult {
  monthlyPayment: number
  totalInterest: number
  totalPayment: number
  loanAmount: number
}

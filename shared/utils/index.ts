// ===== Pure utility functions =====

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '...' : str
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function calcMonthlyPayment(
  total: number,
  downRatio: number,
  years: number,
  annualRate: number
): { monthly: number; totalInterest: number; totalPayment: number; loanAmount: number } {
  const loanAmount = total * (1 - downRatio / 100)
  const monthlyRate = annualRate / 100 / 12
  const months = years * 12
  if (monthlyRate === 0) return { monthly: loanAmount / months, totalInterest: 0, totalPayment: loanAmount, loanAmount }
  const monthly = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = monthly * months
  return { monthly, totalInterest: totalPayment - loanAmount, totalPayment, loanAmount }
}

export function formatCurrency(n: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'zh-CN' ? 'zh-CN' : 'en-US', {
    style: 'currency',
    currency: locale === 'zh-CN' ? 'CNY' : 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

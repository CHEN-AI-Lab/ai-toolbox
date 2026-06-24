// ===== Input validation schemas =====

export function validateChatInput(text: string): { valid: boolean; error?: string } {
  if (!text.trim()) return { valid: false, error: 'Input cannot be empty' }
  if (text.length > 2000) return { valid: false, error: 'Input too long (max 2000)' }
  return { valid: true }
}

export function validateTranslateInput(text: string): { valid: boolean; error?: string } {
  if (!text.trim()) return { valid: false, error: 'Text cannot be empty' }
  if (text.length > 2000) return { valid: false, error: 'Text too long (max 2000)' }
  return { valid: true }
}

export function validateResumeForm(form: { name?: string; position?: string }): { valid: boolean; error?: string } {
  if (!form.name?.trim()) return { valid: false, error: 'Name is required' }
  return { valid: true }
}

export function validateCalcPrice(price: string): { valid: boolean; parsed?: number; error?: string } {
  const n = parseFloat(price)
  if (isNaN(n) || n <= 0) return { valid: false, error: 'Invalid price' }
  return { valid: true, parsed: n }
}

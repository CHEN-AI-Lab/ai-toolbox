// ===== API Client wrappers (mock-enabled) =====

const MOCK_MODE = true
const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (MOCK_MODE) {
    // Return mock data based on path
    return mockResponse<T>(path, options)
  }
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

function mockResponse<T>(_path: string, options?: RequestInit): T {
  const body = options?.body ? JSON.parse(options.body as string) : {}

  return {
    success: true,
    data: { reply: `Mock reply for: "${body.text || 'hello'}"` },
  } as T
}

// Type-safe API functions
export const api = {
  chat: (text: string) => request<{ success: boolean; data: { reply: string } }>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ text }),
  }),
  translate: (text: string, from: string, to: string) => request<{ success: boolean; data: string }>('/api/translate', {
    method: 'POST',
    body: JSON.stringify({ text, from, to }),
  }),
  processImage: (file: File, type: string) => request<{ success: boolean; data: string }>('/api/image', {
    method: 'POST',
    body: JSON.stringify({ type, fileName: file.name }),
  }),
}

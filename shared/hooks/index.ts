'use client'

import { useState, useCallback, useEffect } from 'react'

/**
 * Generic async action with loading/error state
 */
export function useAsyncAction<T, A extends any[]>(
  fn: (...args: A) => Promise<T>
): {
  execute: (...args: A) => Promise<T | undefined>
  isLoading: boolean
  error: string | null
  clearError: () => void
} {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const clearError = useCallback(() => setError(null), [])

  const execute = useCallback(async (...args: A) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await fn(...args)
      return result
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error'
      setError(msg)
      return undefined
    } finally {
      setIsLoading(false)
    }
  }, [fn])

  return { execute, isLoading, error, clearError }
}

/**
 * Daily usage limit (localStorage-backed)
 */
export function useDailyLimit(max: number): {
  remaining: number
  used: number
  increment: () => boolean
  reset: () => void
} {
  const today = new Date().toISOString().slice(0, 10)

  const [used, setUsed] = useState(() => {
    try {
      const stored = localStorage.getItem('daily_usage')
      if (stored) {
        const { date, count } = JSON.parse(stored)
        return date === today ? count : 0
      }
    } catch { /* SSR safe */ }
    return 0
  })

  const increment = useCallback(() => {
    if (used >= max) return false
    const newUsed = used + 1
    setUsed(newUsed)
    try {
      localStorage.setItem('daily_usage', JSON.stringify({ date: today, count: newUsed }))
    } catch { /* SSR safe */ }
    return true
  }, [used, max, today])

  const reset = useCallback(() => {
    setUsed(0)
    try { localStorage.setItem('daily_usage', JSON.stringify({ date: today, count: 0 })) }
    catch { /* SSR safe */ }
  }, [today])

  return { remaining: Math.max(0, max - used), used, increment, reset }
}

/**
 * Local storage hook
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initial
    } catch { return initial }
  })

  const set = useCallback((v: T) => {
    setValue(v)
    try { localStorage.setItem(key, JSON.stringify(v)) }
    catch { /* SSR safe */ }
  }, [key])

  return [value, set]
}

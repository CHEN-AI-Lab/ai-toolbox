'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const LANGUAGES = [
  { code: 'zh-CN', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
]

export default function TranslatePage() {
  const t = useTranslations('translate')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('zh-CN')
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [translating, setTranslating] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setInputText(result)
    setResult(inputText)
  }

  const handleTranslate = async () => {
    const text = inputText.trim()
    if (!text || translating) return
    setTranslating(true)
    setError('')
    setCopied(false)

    // Simulate translation
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setResult(
        `[${LANGUAGES.find((l) => l.code === sourceLang)?.label} → ${LANGUAGES.find((l) => l.code === targetLang)?.label}] Simulated translation of: "${text}"`
      )
    } catch {
      setError(t('error'))
    } finally {
      setTranslating(false)
    }
  }

  const handleCopy = async () => {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = result
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    setInputText('')
    setResult('')
    setError('')
    setCopied(false)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="page-header-icon">🌐</span>
        <h1 className="page-header-title">{t('title')}</h1>
      </div>

      {/* Language selectors */}
      <div className="content-card p-4 sm:p-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              {t('from')}
            </label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="input-base appearance-none bg-no-repeat pr-8"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.25rem',
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <button
            onClick={swapLanguages}
            className="mt-6 w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0"
            title="Swap languages"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              {t('to')}
            </label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="input-base appearance-none bg-no-repeat pr-8"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.25rem',
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="content-card p-4 sm:p-6 mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('placeholder')}
          rows={5}
          className="input-base resize-none min-h-[120px]"
        />
        <div className="flex gap-3 mt-3">
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || translating}
            className="btn-primary flex-1"
          >
            {translating ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {t('translating')}
              </span>
            ) : (
              t('translate')
            )}
          </button>
          {inputText && (
            <button onClick={handleClear} className="btn-secondary !w-auto px-5">
              {t('clear')}
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="content-card p-4 sm:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500">{t('result')}</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>{t('copy')}</span>
                </>
              )}
            </button>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {result}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
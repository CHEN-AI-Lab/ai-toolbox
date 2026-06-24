'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUICK_QUESTIONS = ['quick1', 'quick2', 'quick3', 'quick4'] as const

export default function ChatPage() {
  const t = useTranslations('chat')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dailyQuota, setDailyQuota] = useState(10)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('ai_chat_quota')
    if (stored) {
      const { date, quota } = JSON.parse(stored)
      const today = new Date().toDateString()
      setDailyQuota(date === today ? quota : 10)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const updateQuota = (newQuota: number) => {
    setDailyQuota(newQuota)
    localStorage.setItem(
      'ai_chat_quota',
      JSON.stringify({ date: new Date().toDateString(), quota: newQuota })
    )
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading || dailyQuota <= 0) return

    const userMessage: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setError('')

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const reply: Message = {
        role: 'assistant',
        content: `You said: "${text}". This is a simulated AI response — the real integration will be added later.`,
      }
      setMessages([...updatedMessages, reply])
      updateQuota(dailyQuota - 1)
    } catch {
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }

  const handleQuickQuestion = (q: string) => {
    setInput(t(q))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="page-header-icon">💬</span>
        <h1 className="page-header-title">{t('title')}</h1>
      </div>

      {/* Quota bar */}
      <div className="mb-4 flex items-center justify-between px-1">
        <span className="text-sm text-gray-500">
          {t('quotaRemaining', { count: dailyQuota })}
        </span>
        {dailyQuota <= 3 && (
          <Link
            href="/member"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {t('upgradeUnlimited')}
          </Link>
        )}
      </div>

      {/* Messages area */}
      <div className="content-card mb-4 p-4 sm:p-6 min-h-[400px] max-h-[60vh] overflow-y-auto flex flex-col gap-4">
        {messages.length === 0 && !loading ? (
          /* Welcome card */
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-indigo-200">
              🤖
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {t('welcomeTitle')}
            </h2>
            <p className="text-sm text-gray-500 max-w-xs">
              {t('welcomeDesc')}
            </p>

            {/* Quick questions */}
            <div className="grid grid-cols-2 gap-2 mt-6 w-full max-w-sm">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickQuestion(q)}
                  className="p-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 text-left hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
                >
                  {t(q)}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-indigo-500 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-5 py-4">
                  <div className="loading-dots flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full inline-block" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
      )}

      {/* Input area */}
      <div className="content-card p-3 sm:p-4">
        <div className="flex gap-3 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder')}
            rows={2}
            disabled={loading || dailyQuota <= 0}
            className="input-base flex-1 resize-none min-h-[48px]"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading || dailyQuota <= 0}
            className="btn-primary !w-auto px-6 py-3.5"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
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
                <span>...</span>
              </span>
            ) : (
              t('send')
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

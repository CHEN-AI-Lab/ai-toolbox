'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

type ImageAction = 'enhance' | 'restore' | 'style' | 'removebg'

const ACTIONS: { key: ImageAction; emoji: string; vip: boolean }[] = [
  { key: 'enhance', emoji: '✨', vip: false },
  { key: 'restore', emoji: '🖼️', vip: true },
  { key: 'style', emoji: '🎨', vip: true },
  { key: 'removebg', emoji: '✂️', vip: true },
]

export default function ImagePage() {
  const t = useTranslations('image')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<ImageAction | null>(null)
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setResultUrl(null)
    setError('')
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setResultUrl(null)
    setError('')
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleProcess = async () => {
    if (!selectedFile || !selectedAction || processing) return
    setProcessing(true)
    setError('')
    setResultUrl(null)

    // Simulate processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Use preview as simulated result
      setResultUrl(previewUrl)
    } catch {
      setError(t('error'))
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <span className="page-header-icon">🖼️</span>
        <h1 className="page-header-title">{t('title')}</h1>
      </div>

      {/* Upload card */}
      <div className="content-card p-6 mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileSelect}
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
            previewUrl
              ? 'border-indigo-300 bg-indigo-50/30'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
          }`}
        >
          {previewUrl ? (
            <div className="space-y-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 mx-auto rounded-xl object-contain shadow-sm"
              />
              <p className="text-sm text-gray-500">
                {selectedFile?.name} ({(selectedFile!.size / 1024).toFixed(1)} KB)
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedFile(null)
                  setPreviewUrl(null)
                  setResultUrl(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-5xl block">📤</span>
              <p className="font-medium text-gray-700">{t('upload')}</p>
              <p className="text-sm text-gray-400">{t('uploadHint')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">
          {t('selectType')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACTIONS.map((action) => (
            <button
              key={action.key}
              onClick={() => setSelectedAction(action.key)}
              disabled={action.vip}
              className={`relative content-card p-4 text-center transition-all duration-200 ${
                selectedAction === action.key
                  ? 'ring-2 ring-indigo-500 border-indigo-300 bg-indigo-50'
                  : action.vip
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:border-indigo-200 hover:shadow-sm'
              }`}
            >
              {action.vip && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                  VIP
                </span>
              )}
              <span className="text-3xl block mb-1">{action.emoji}</span>
              <span className="text-sm font-medium text-gray-700">
                {t(action.key)}
              </span>
              {action.vip && (
                <span className="text-[10px] text-gray-400 block mt-1">
                  {t('vipOnly')}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Process button */}
      <button
        onClick={handleProcess}
        disabled={!selectedFile || !selectedAction || processing}
        className="btn-primary mb-6"
      >
        {processing ? (
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
            {t('processing')}
          </span>
        ) : (
          t('process')
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      {/* Result area */}
      {resultUrl && (
        <div className="content-card p-6 animate-fade-in">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            {t('result')}
          </h3>
          <img
            src={resultUrl}
            alt="Processed result"
            className="w-full max-h-80 object-contain rounded-xl shadow-sm"
          />
          <div className="mt-4 flex gap-3">
            <a
              href={resultUrl}
              download="processed-image.png"
              className="btn-secondary !w-auto px-6"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
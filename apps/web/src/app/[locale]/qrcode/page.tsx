'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { QR_SIZES } from 'shared/constants'

export default function QRCodePage() {
  const t = useTranslations()
  const [text, setText] = useState('')
  const [size, setSize] = useState(300)
  const [qrCode, setQrCode] = useState('')
  const [generating, setGenerating] = useState(false)

  const generate = () => {
    if (!text.trim()) return
    setGenerating(true)
    setTimeout(() => {
      setQrCode('/placeholder-qr.svg')
      setGenerating(false)
    }, 800)
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <span className="page-header-icon">📱</span>
        <h1 className="page-header-title">{t('qrcode.title')}</h1>
        <p className="page-header-desc">{t('qrcode.desc')}</p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="content-card p-6 mb-5">
          <textarea
            className="input-base min-h-[100px]"
            placeholder={t('qrcode.placeholder')}
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
          />
        </div>

        <div className="flex gap-2 mb-5">
          {QR_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                size === s ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {s}px
            </button>
          ))}
        </div>

        <button onClick={generate} disabled={!text.trim() || generating} className="btn-primary mb-6">
          {generating ? <span className="flex items-center justify-center gap-2"><Spinner />{t('common.loading')}</span> : t('qrcode.generate')}
        </button>

        {qrCode && (
          <div className="content-card p-8 text-center">
            <div className="w-[200px] h-[200px] mx-auto mb-6 bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-6xl opacity-20">◼</span>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary flex-1 py-2.5">{t('qrcode.save')}</button>
              <button className="btn-secondary flex-1 py-2.5">{t('qrcode.share')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Spinner() {
  return <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function CompressPage() {
  const t = useTranslations()
  const [image, setImage] = useState('')
  const [quality, setQuality] = useState(70)
  const [compressing, setCompressing] = useState(false)
  const [result, setResult] = useState('')

  const upload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      const file = e.target.files?.[0]
      if (file) {
        setImage(URL.createObjectURL(file))
        setResult('')
      }
    }
    input.click()
  }

  const startCompress = () => {
    setCompressing(true)
    setTimeout(() => {
      setResult(image)
      setCompressing(false)
    }, 1500)
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <span className="page-header-icon">📦</span>
        <h1 className="page-header-title">{t('compress.title')}</h1>
        <p className="page-header-desc">{t('compress.desc')}</p>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Upload */}
        <div onClick={upload} className={`content-card p-10 text-center cursor-pointer mb-5 transition-all ${image ? 'border-indigo-200' : 'hover:border-gray-200'}`}>
          {image ? (
            <img src={image} alt="" className="max-h-[200px] mx-auto rounded-xl object-contain" />
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📁</span>
              </div>
              <p className="font-semibold text-gray-900">{t('compress.upload')}</p>
            </>
          )}
        </div>

        {image && (
          <>
            <div className="content-card p-5 mb-5">
              <p className="text-sm font-medium text-gray-600 mb-3">{t('compress.quality')}: {quality}%</p>
              <input type="range" min="10" max="100" step="5" value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-indigo-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-3">
                <span>{t('compress.originalSize')}: 2.3 MB</span>
                <span>{t('compress.expectedSize')}: {quality > 70 ? '1.4 MB' : quality > 40 ? '920 KB' : '460 KB'}</span>
              </div>
            </div>

            <button onClick={startCompress} disabled={compressing} className="btn-primary mb-6">
              {compressing ? <span className="flex items-center justify-center gap-2"><Spinner />{t('compress.quality')}...</span> : t('compress.compress')}
            </button>
          </>
        )}

        {result && (
          <div className="content-card p-6 text-center">
            <img src={result} alt="" className="max-h-[200px] mx-auto rounded-xl mb-4" />
            <div className="flex gap-3">
              <button className="btn-secondary flex-1 py-2.5">{t('common.save')}</button>
              <button className="btn-secondary flex-1 py-2.5">{t('common.share')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Spinner() { return <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> }

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function OCRPage() {
  const t = useTranslations()
  const [image, setImage] = useState('')
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

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

  const recognize = () => {
    setProcessing(true)
    setTimeout(() => {
      setResult('Sample OCR text:\nProject: AI Toolbox\nStatus: Active\nVersion: 1.0.0')
      setProcessing(false)
    }, 2000)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <span className="page-header-icon">📝</span>
        <h1 className="page-header-title">{t('ocr.title')}</h1>
        <p className="page-header-desc">{t('ocr.desc')}</p>
      </div>

      <div className="max-w-lg mx-auto">
        <div onClick={upload} className={`content-card p-10 text-center cursor-pointer mb-5 transition-all ${image ? 'border-indigo-200' : 'hover:border-gray-200'}`}>
          {image ? (
            <img src={image} alt="" className="max-h-[200px] mx-auto rounded-xl object-contain" />
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📄</span>
              </div>
              <p className="font-semibold text-gray-900">{t('ocr.upload')}</p>
              <p className="text-sm text-gray-400 mt-1">{t('ocr.uploadHint')}</p>
            </>
          )}
        </div>

        {image && (
          <button onClick={recognize} disabled={processing} className="btn-primary mb-6">
            {processing ? <span className="flex items-center justify-center gap-2"><Spinner />{t('ocr.processing')}</span> : t('ocr.recognize')}
          </button>
        )}

        {result && (
          <div className="content-card p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">{t('ocr.result')}</h3>
              <button onClick={copy} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                {copied ? '✓ ' + t('ocr.copied') : t('ocr.copy')}
              </button>
            </div>
            <pre className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

function Spinner() { return <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> }

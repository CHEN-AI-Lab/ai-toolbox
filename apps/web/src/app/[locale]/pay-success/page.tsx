'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function PaySuccessPage() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center animate-fade-in">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-white shadow-lg shadow-green-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl text-green-500">✓</span>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t('paySuccess.title')}</h1>
        <p className="text-gray-500 mb-8">{t('paySuccess.desc')}</p>

        {/* Info card */}
        <div className="content-card p-6 text-left mb-8">
          <div className="flex justify-between py-3">
            <span className="text-sm text-gray-500">{t('paySuccess.title')}</span>
            <span className="text-sm font-semibold text-gray-900">VIP</span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex justify-between py-3">
            <span className="text-sm text-gray-500">{t('paySuccess.title')}</span>
            <span className="text-sm font-semibold text-gray-900">{t('mine.vip')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href={'/' + locale + '/chat'} className="btn-primary block">
            {t('paySuccess.startUsing')}
          </Link>
          <Link href={'/' + locale + '/tools'} className="btn-secondary block text-center">
            {t('paySuccess.browseTools')}
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

const menuItems = [
  { key: 'memberCenter', href: '/member', icon: '👑', color: 'bg-amber-50 text-amber-600' },
  { key: 'usageHistory', href: '#', icon: '📊', color: 'bg-blue-50 text-blue-600' },
  { key: 'favorites', href: '#', icon: '❤️', color: 'bg-red-50 text-red-600' },
  { key: 'feedback', href: '#', icon: '💬', color: 'bg-green-50 text-green-600' },
  { key: 'about', href: '#', icon: 'ℹ️', color: 'bg-gray-50 text-gray-600' },
]

export default function MinePage() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string
  const [isVip, _setIsVip] = useState(false)

  const handleLogout = () => {
    if (confirm(t('mine.confirmLogout'))) {
      // logout logic
    }
  }

  return (
    <div className="page-container animate-fade-in">
      {/* Profile Card */}
      <div className="content-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            G
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{isVip ? t('mine.vip') : t('mine.guest')}</h2>
            <p className={`text-sm font-medium mt-0.5 ${isVip ? 'text-amber-600' : 'text-gray-400'}`}>
              {isVip ? 'VIP' : t('mine.free')}
            </p>
          </div>
          {!isVip && (
            <Link href={'/' + locale + '/member'} className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all">
              {t('mine.upgradeVip')}
            </Link>
          )}
        </div>

        {/* Quota */}
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">{t('mine.quotaToday')}</span>
            <span className="font-semibold text-gray-900">{isVip ? '∞' : '10'}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${isVip ? 'w-full bg-gradient-to-r from-amber-400 to-amber-500' : 'w-3/4 bg-indigo-400'}`} />
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="content-card overflow-hidden mb-6">
        {menuItems.map((item, i) => (
          <Link
            key={item.key}
            href={item.href.startsWith('/') ? '/' + locale + item.href : item.href}
            className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${i < menuItems.length - 1 ? 'border-b border-gray-50' : ''}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${item.color}`}>
              {item.icon}
            </div>
            <span className="flex-1 text-sm font-medium text-gray-700">{t('mine.' + item.key)}</span>
            <span className="text-gray-300 text-sm">→</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button onClick={handleLogout} className="w-full py-3.5 text-sm font-medium text-red-500 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-red-50 transition-all">
        {t('mine.logout')}
      </button>

      <p className="text-center text-xs text-gray-300 mt-4">{t('mine.version')}</p>
    </div>
  )
}

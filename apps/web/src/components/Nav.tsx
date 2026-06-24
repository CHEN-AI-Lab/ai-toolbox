'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useSwitchLocale, getLocaleLabel, type Locale } from '@/lib/i18n/client'

export function Nav() {
  const t = useTranslations()
  const pathname = usePathname()
  const { locale, switchLocale } = useSwitchLocale()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: '', label: t('nav.home') },
    { href: '/tools', label: t('nav.tools') },
    { href: '/mine', label: t('nav.mine') },
  ]

  const isActive = (href: string) => {
    if (!href) return pathname === '/' + locale || pathname === '/' + locale + '/'
    return pathname.startsWith('/' + locale + href)
  }

  const otherLocale: Locale = locale === 'zh-CN' ? 'en' : 'zh-CN'

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href={"/" + locale} className="flex items-center gap-2 group">
            <span className="text-xl">✦</span>
            <span className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
              {t('app.name')}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href || '/'}
                href={'/' + locale + link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => switchLocale(otherLocale)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors px-2 py-1"
            >
              {getLocaleLabel(otherLocale)}
            </button>
            <Link
              href={'/' + locale + '/member'}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
                text-white text-sm font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 
                transition-all duration-200 shadow-sm"
            >
              {t('nav.upgradeVip')}
            </Link>
            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href || '/'}
                href={'/' + locale + link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href) ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={'/' + locale + '/member'}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 mt-2 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold text-sm"
            >
              {t('nav.upgradeVip')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

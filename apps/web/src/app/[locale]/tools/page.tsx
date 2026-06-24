'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { TOOLS } from 'shared/constants'
import type { Tool } from 'shared/types'

export default function ToolsPage() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string

  const aiTools = TOOLS.filter((t: Tool) => t.category === 'ai')
  const utilityTools = TOOLS.filter((t: Tool) => t.category === 'utility')

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <span className="page-header-icon">🔧</span>
        <h1 className="page-header-title">{t('tools.title')}</h1>
        <p className="page-header-desc">{t('home.aiToolsDesc')}</p>
      </div>

      {/* AI Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>⚡</span>
          {t('tools.aiTools')}
          <span className="text-sm font-normal text-gray-400">({aiTools.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiTools.map((tool: Tool) => (
            <Link
              key={tool.id}
              href={'/' + locale + tool.href}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tool.icon}</span>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {t(tool.nameKey)}
                </h3>
                {tool.pro && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{t(tool.descKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Utility Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span>🔧</span>
          {t('tools.utilityTools')}
          <span className="text-sm font-normal text-gray-400">({utilityTools.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {utilityTools.map((tool: Tool) => (
            <Link
              key={tool.id}
              href={'/' + locale + tool.href}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{tool.icon}</span>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {t(tool.nameKey)}
                </h3>
                {tool.pro && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                    PRO
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{t(tool.descKey)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Upgrade banner */}
      <section>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">{t('tools.upgradeVip')}</h2>
          <p className="text-white/70 mb-5">{t('tools.yearPrice', { price: '99' })}</p>
          <Link
            href={'/' + locale + '/member'}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            {t('nav.upgradeVip')}
          </Link>
        </div>
      </section>
    </div>
  )
}

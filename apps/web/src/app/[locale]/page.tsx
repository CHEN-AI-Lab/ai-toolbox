'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { TOOLS } from 'shared/constants'
import type { Tool } from 'shared/types'

const stats = [
  { key: 'allTools', value: '8', icon: '🔧' },
  { key: 'uptime', value: '99.9%', icon: '📈' },
  { key: 'users', value: '10,000+', icon: '👥' },
]

export default function HomePage() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string

  const aiTools = TOOLS.filter((t: Tool) => t.category === 'ai')
  const utilityTools = TOOLS.filter((t: Tool) => t.category === 'utility')

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/70 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t('home.realTime')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">
                {t('app.name')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
              {t('app.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={'/' + locale + '/chat'}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                {t('home.startNow')}
              </Link>
              <Link
                href={'/' + locale + '/tools'}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                {t('home.browseTools')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <span className="text-2xl block mb-2">{s.icon}</span>
              <span className="text-2xl font-bold text-gray-900 block">{s.value}</span>
              <span className="text-sm text-gray-400">{t('home.' + s.key)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Tools */}
      <section className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('tools.aiTools')}</h2>
          <p className="text-gray-500">{t('home.aiToolsDesc')}</p>
        </div>
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
      <section className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('tools.utilityTools')}</h2>
          <p className="text-gray-500">{t('home.aiToolsDesc')}</p>
        </div>
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

      {/* CTA Banner */}
      <section className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t('home.vipTitle')}</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">{t('home.vipDesc')}</p>
          <Link
            href={'/' + locale + '/member'}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            {t('home.upgradeNow')}
          </Link>
        </div>
      </section>
    </div>
  )
}

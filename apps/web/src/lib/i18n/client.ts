'use client'

import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { useLocale } from 'next-intl'

export const locales = ['zh-CN', 'en'] as const
export type Locale = (typeof locales)[number]

export const { Link, useRouter, usePathname } = createSharedPathnamesNavigation({ locales })

export function getLocaleLabel(l: Locale): string {
  return l === 'zh-CN' ? '中文' : 'English'
}

export { useLocale }

// Switch language from client
export function useSwitchLocale() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`
    router.replace(pathname, { locale: newLocale })
    router.refresh()
  }

  return { locale, switchLocale }
}

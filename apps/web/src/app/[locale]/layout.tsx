import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Nav } from '@/components/Nav'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </NextIntlClientProvider>
  )
}

async function Footer({ locale }: { locale: string }) {
  const messages = await getMessages()
  const t = (key: string) => {
    const keys = key.split('.')
    let obj = messages as any
    for (const k of keys) obj = obj?.[k]
    return obj || key
  }

  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-sm text-gray-400">
          {t('common.copyright').replace('{year}', String(year)).replace('{name}', t('app.name'))}
        </p>
      </div>
    </footer>
  )
}

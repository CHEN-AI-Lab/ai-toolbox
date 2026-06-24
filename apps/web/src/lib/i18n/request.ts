import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value || 'zh-CN'

  const messages = locale === 'en'
    ? (await import(`../../../messages/en.json`)).default
    : (await import(`../../../messages/zh-CN.json`)).default

  return { locale, messages }
})
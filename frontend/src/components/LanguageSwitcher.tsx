'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { locales, type Locale } from '@/i18n'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const t = useTranslations('language')
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const switchLocale = (newLocale: Locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    // Add the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">{t('switch')}:</span>
      <select
        value={currentLocale}
        onChange={(e) => switchLocale(e.target.value as Locale)}
        className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option value="en">🇬🇧 {t('english')}</option>
        <option value="ro">🇷🇴 {t('romanian')}</option>
      </select>
    </div>
  )
}


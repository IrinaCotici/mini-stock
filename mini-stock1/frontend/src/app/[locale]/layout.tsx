import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { locales } from '@/i18n'
import '../globals.css'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MiniStock - Inventory Management',
  description: 'A lightweight, cloud-based inventory management tool for small retail shops',
  manifest: '/manifest.json',
  themeColor: '#0ea5e9',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen">
            <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </header>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}


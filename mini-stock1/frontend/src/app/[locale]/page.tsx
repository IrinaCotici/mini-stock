import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Home({ params }: { params: { locale: string } }) {
  const t = useTranslations('home')
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-primary-600">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {t('subtitle')}
        </p>
        
        <div className="mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
            >
              {t('viewProducts')}
            </Link>
            <Link
              href="/scan"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              📷 {t('scanBarcode')}
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {t('manageInventory')}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{t('features.realtime.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('features.realtime.description')}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{t('features.barcode.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('features.barcode.description')}
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{t('features.alerts.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('features.alerts.description')}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


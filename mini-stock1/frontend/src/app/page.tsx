import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold text-primary-600">
          MiniStock
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Lightweight inventory management for small retail shops
        </p>
        
        <div className="mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
            >
              View Products
            </Link>
            <Link
              href="/scan"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              📷 Scan Barcode
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Manage your inventory with ease
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track inventory changes in real-time across all devices
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Barcode Scanning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use your phone camera to scan barcodes quickly
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Low Stock Alerts</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get notified when products are running low
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


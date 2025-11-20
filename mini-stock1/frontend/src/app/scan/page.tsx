'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Product } from '@/types/product'
import api from '@/lib/api'

// Dynamically import BarcodeScanner to avoid SSR issues
const BarcodeScanner = dynamic(() => import('@/components/BarcodeScanner'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg" style={{ minHeight: '300px' }}>
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600 dark:text-gray-400">Loading scanner...</p>
      </div>
    </div>
  ),
})

export default function ScanPage() {
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stockAdjustment, setStockAdjustment] = useState<number>(0)
  const [showStockForm, setShowStockForm] = useState(false)

  useEffect(() => {
    // Reset state when barcode changes
    if (scannedBarcode) {
      setProduct(null)
      setError(null)
      setShowStockForm(false)
      fetchProductByBarcode(scannedBarcode)
    }
  }, [scannedBarcode])

  const fetchProductByBarcode = async (barcode: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.get(`/products/barcode/${barcode}`)
      setProduct(response.data)
      setStockAdjustment(0)
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError(`Product with barcode "${barcode}" not found. Would you like to create it?`)
        setProduct(null)
      } else {
        setError('Failed to fetch product. Please try again.')
        console.error('Error fetching product:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleScanSuccess = (barcode: string) => {
    setScannedBarcode(barcode)
    // Small delay to show the scan result
    setTimeout(() => {
      // Optionally auto-fetch or show feedback
    }, 500)
  }

  const handleStockUpdate = async (operation: 'add' | 'subtract' | 'set') => {
    if (!product || stockAdjustment <= 0) {
      setError('Please enter a valid stock amount')
      return
    }

    setLoading(true)
    setError(null)

    try {
      let newStock: number
      if (operation === 'add') {
        newStock = product.stock + stockAdjustment
      } else if (operation === 'subtract') {
        newStock = Math.max(0, product.stock - stockAdjustment)
      } else {
        newStock = stockAdjustment
      }

      const response = await api.patch(`/products/${product._id}/stock`, {
        stock: newStock,
        operation: 'set',
      })

      setProduct(response.data)
      setStockAdjustment(0)
      setShowStockForm(false)
      setError(null)
    } catch (err: any) {
      setError('Failed to update stock. Please try again.')
      console.error('Error updating stock:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleManualBarcode = () => {
    const barcode = prompt('Enter barcode manually:')
    if (barcode) {
      setScannedBarcode(barcode.trim())
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 mb-2 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Barcode Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Scan a barcode to find or update a product
          </p>
        </div>

        <div className="mb-6">
          <BarcodeScanner
            onScanSuccess={handleScanSuccess}
            onScanError={(err) => {
              // Silently handle scan errors (not found is normal)
              if (!err.includes('NotFoundException')) {
                console.log('Scan error:', err)
              }
            }}
            qrbox={{ width: 300, height: 300 }}
          />
        </div>

        {scannedBarcode && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200">
              📷 Scanned: <strong>{scannedBarcode}</strong>
            </p>
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={handleManualBarcode}
            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium"
          >
            Or Enter Barcode Manually
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-200">{error}</p>
            {error.includes('not found') && (
              <Link
                href={`/products/new?barcode=${scannedBarcode}`}
                className="mt-2 inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Create New Product
              </Link>
            )}
          </div>
        )}

        {product && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">SKU</p>
                <p className="font-semibold text-gray-900 dark:text-white">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Barcode</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {product.barcode || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stock</p>
                <p
                  className={`font-bold text-lg ${
                    product.stock <= product.lowStockThreshold
                      ? 'text-red-600'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  {product.stock} {product.unit}
                </p>
                {product.stock <= product.lowStockThreshold && (
                  <p className="text-xs text-red-600">⚠️ Low Stock!</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>

            {product.category && (
              <div className="mb-4">
                <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
            )}

            {!showStockForm ? (
              <button
                onClick={() => setShowStockForm(true)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-semibold mb-3"
              >
                Update Stock
              </button>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stock Amount
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockAdjustment || ''}
                    onChange={(e) => setStockAdjustment(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleStockUpdate('add')}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => handleStockUpdate('subtract')}
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    - Subtract
                  </button>
                  <button
                    onClick={() => handleStockUpdate('set')}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    = Set
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowStockForm(false)
                    setStockAdjustment(0)
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            )}

            <Link
              href={`/products/${product._id}`}
              className="block w-full text-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-medium mt-3"
            >
              View Full Details
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}


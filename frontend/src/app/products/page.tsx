'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/types/product'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
      const response = await fetch(`${apiUrl}/products`)
      const data = await response.json()
      setProducts(data.products || [])
      setError(null)
    } catch (err) {
      setError('Failed to fetch products')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 mb-2 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Products
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/products/new"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              + New Product
            </Link>
            <Link
              href="/scan"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              📷 Scan
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              No products found. Add your first product to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
                  product.stock <= product.lowStockThreshold
                    ? 'border-l-4 border-red-500'
                    : ''
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="font-medium">SKU:</span> {product.sku}
                  </p>
                  <p>
                    <span className="font-medium">Stock:</span>{' '}
                    <span
                      className={
                        product.stock <= product.lowStockThreshold
                          ? 'text-red-600 font-bold'
                          : ''
                      }
                    >
                      {product.stock}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> ${product.price.toFixed(2)}
                  </p>
                  {product.category && (
                    <p>
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                  )}
                  {product.stock <= product.lowStockThreshold && (
                    <p className="text-red-600 font-semibold">
                      ⚠️ Low Stock Alert!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}


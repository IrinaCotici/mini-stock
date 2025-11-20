export interface Product {
  _id: string
  name: string
  description?: string
  sku: string
  barcode?: string
  category?: string
  price: number
  cost: number
  stock: number
  lowStockThreshold: number
  unit: string
  imageUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductCreateInput {
  name: string
  description?: string
  sku: string
  barcode?: string
  category?: string
  price: number
  cost: number
  stock?: number
  lowStockThreshold?: number
  unit?: string
  imageUrl?: string
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {}


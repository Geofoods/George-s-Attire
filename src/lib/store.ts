import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  productType: 'TSHIRT' | 'SWEATSHIRT' | 'HOODIE'
  productName: string
  size: 'S' | 'M' | 'L' | 'XL'
  color: string
  quantity: number
  basePrice: number
  extraPrintCharge: number
  xlSurcharge: number
  printLocations: string[]
  designUrl?: string
  designFile?: string
  locationDesigns?: Array<{ location: string; designUrl?: string; designFile?: string }>
  shippingMethod: 'STANDARD' | 'RUSH'
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  getSubtotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({
        items: [...state.items, { ...item, id: Date.now().toString() + Math.random().toString(36).substr(2, 9) }]
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateItem: (id, updates) => set((state) => ({
        items: state.items.map(item => item.id === id ? { ...item, ...updates } : item)
      })),
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.basePrice + item.extraPrintCharge + item.xlSurcharge) * item.quantity
        }, 0)
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'georges-attire-cart',
    }
  )
)

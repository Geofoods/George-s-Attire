export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.trim())
}

export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return true // optional
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '')
  return /^\d{7,15}$/.test(cleaned)
}

export function sanitizeString(str: string): string {
  if (!str || typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

interface OrderInput {
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: string
  shippingMethod?: string
  items?: Array<{
    productType?: string
    size?: string
    color?: string
    quantity?: number
    numberOfExtraPrints?: number
  }>
}

export function validateOrderInput(data: OrderInput): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.customerName || sanitizeString(data.customerName).length < 2) {
    errors.push('Customer name is required (min 2 characters)')
  }

  if (!validateEmail(data.customerEmail || '')) {
    errors.push('Valid email is required')
  }

  if (data.customerPhone && !validatePhone(data.customerPhone)) {
    errors.push('Invalid phone number format')
  }

  if (!data.shippingAddress || sanitizeString(data.shippingAddress).length < 10) {
    errors.push('Shipping address is required (min 10 characters)')
  }

  if (!data.shippingMethod || !['STANDARD', 'RUSH'].includes(data.shippingMethod)) {
    errors.push('Shipping method must be STANDARD or RUSH')
  }

  if (!data.items || data.items.length === 0) {
    errors.push('At least one item is required')
  } else {
    data.items.forEach((item, i) => {
      if (!item.productType || !['TSHIRT', 'SWEATSHIRT', 'HOODIE'].includes(item.productType)) {
        errors.push(`Item ${i + 1}: Invalid product type`)
      }
      if (!item.size || !['S', 'M', 'L', 'XL'].includes(item.size)) {
        errors.push(`Item ${i + 1}: Invalid size`)
      }
      if (!item.color || item.color.trim().length === 0) {
        errors.push(`Item ${i + 1}: Color is required`)
      }
      if (!item.quantity || item.quantity < 1 || item.quantity > 100) {
        errors.push(`Item ${i + 1}: Quantity must be between 1 and 100`)
      }
      if (item.numberOfExtraPrints !== undefined && (item.numberOfExtraPrints < 0 || item.numberOfExtraPrints > 5)) {
        errors.push(`Item ${i + 1}: Extra prints must be between 0 and 5`)
      }
    })
  }

  return { valid: errors.length === 0, errors }
}

interface BulkQuoteInput {
  name?: string
  email?: string
  phone?: string
  apparelType?: string
  quantity?: number
  sizes?: string
  colors?: string
  numberOfPrints?: number
}

export function validateBulkQuoteInput(data: BulkQuoteInput): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name || sanitizeString(data.name).length < 2) {
    errors.push('Name is required (min 2 characters)')
  }

  if (!validateEmail(data.email || '')) {
    errors.push('Valid email is required')
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.push('Invalid phone number format')
  }

  if (!data.apparelType || !['TSHIRT', 'SWEATSHIRT', 'HOODIE'].includes(data.apparelType)) {
    errors.push('Valid apparel type is required')
  }

  if (!data.quantity || data.quantity < 10) {
    errors.push('Minimum quantity for bulk order is 10')
  }

  if (!data.sizes || data.sizes.trim().length === 0) {
    errors.push('At least one size is required')
  }

  if (!data.colors || data.colors.trim().length === 0) {
    errors.push('At least one color is required')
  }

  if (data.numberOfPrints === undefined || data.numberOfPrints < 1) {
    errors.push('Number of prints must be at least 1')
  }

  return { valid: errors.length === 0, errors }
}

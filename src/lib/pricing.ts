import prisma from '@/lib/prisma'

const DEFAULTS: Record<string, number> = {
  tshirt_base: 1000,
  sweatshirt_base: 2000,
  hoodie_base: 3000,
  extra_print: 300,
  xl_surcharge: 500,
  standard_shipping: 1200,
  rush_shipping: 1700,
  tax_rate: 1300,
}

async function getConfig(key: string): Promise<number> {
  try {
    const config = await prisma.pricingConfig.findUnique({ where: { key } })
    if (config) return config.value
  } catch {
    // fallback to default if DB unavailable
  }
  return DEFAULTS[key] ?? 0
}

export async function calculateBasePrice(productType: 'TSHIRT' | 'SWEATSHIRT' | 'HOODIE'): Promise<number> {
  const key = `${productType.toLowerCase()}_base`
  return getConfig(key)
}

export async function calculateExtraPrintCost(numberOfExtraPrints: number): Promise<number> {
  const costPerPrint = await getConfig('extra_print')
  return numberOfExtraPrints * costPerPrint
}

export async function calculateXlSurcharge(size: string): Promise<number> {
  if (size === 'XL') {
    return getConfig('xl_surcharge')
  }
  return 0
}

export async function calculateShippingCost(method: 'STANDARD' | 'RUSH'): Promise<number> {
  const standard = await getConfig('standard_shipping')
  if (method === 'STANDARD') return standard
  return standard
}

export async function calculateRushSurcharge(): Promise<number> {
  const standard = await getConfig('standard_shipping')
  const rush = await getConfig('rush_shipping')
  return rush - standard
}

export async function calculateTax(subtotal: number, shipping: number): Promise<number> {
  const taxRate = await getConfig('tax_rate')
  const taxable = subtotal + shipping
  return Math.round((taxable * taxRate) / 10000)
}

interface TotalBreakdown {
  subtotal: number
  extraPrints: number
  xlSurcharge: number
  shipping: number
  rushSurcharge: number
  tax: number
  total: number
}

interface TotalInput {
  productType: 'TSHIRT' | 'SWEATSHIRT' | 'HOODIE'
  size: string
  numberOfExtraPrints: number
  shippingMethod: 'STANDARD' | 'RUSH'
  quantity: number
}

export async function calculateTotal({
  productType,
  size,
  numberOfExtraPrints,
  shippingMethod,
  quantity,
}: TotalInput): Promise<TotalBreakdown> {
  const basePrice = await calculateBasePrice(productType)
  const extraPrintCost = await calculateExtraPrintCost(numberOfExtraPrints)
  const xlSurcharge = await calculateXlSurcharge(size)
  const shipping = await calculateShippingCost(shippingMethod)
  const rushSurcharge = shippingMethod === 'RUSH' ? await calculateRushSurcharge() : 0

  const itemTotal = (basePrice + extraPrintCost + xlSurcharge) * quantity
  const subtotal = itemTotal + shipping

  const tax = await calculateTax(itemTotal, shipping)
  const total = itemTotal + shipping + tax

  return {
    subtotal,
    extraPrints: extraPrintCost * quantity,
    xlSurcharge: xlSurcharge * quantity,
    shipping,
    rushSurcharge,
    tax,
    total,
  }
}

interface CartItemValidation {
  productType: 'TSHIRT' | 'SWEATSHIRT' | 'HOODIE'
  size: string
  numberOfExtraPrints: number
  shippingMethod: 'STANDARD' | 'RUSH'
  quantity: number
  clientTotal: number
}

export async function validateCartItem(item: CartItemValidation): Promise<{
  valid: boolean
  serverTotal: number
  breakdown: TotalBreakdown
}> {
  const breakdown = await calculateTotal({
    productType: item.productType,
    size: item.size,
    numberOfExtraPrints: item.numberOfExtraPrints,
    shippingMethod: item.shippingMethod,
    quantity: item.quantity,
  })

  const valid = breakdown.total === item.clientTotal

  return {
    valid,
    serverTotal: breakdown.total,
    breakdown,
  }
}

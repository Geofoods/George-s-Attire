import { v4 as uuidv4 } from 'uuid'

export function generateOrderNumber(): string {
  const id = uuidv4().replace(/-/g, '').substring(0, 5).toUpperCase()
  return `GA-${id}`
}

export function formatPrice(cents: number): string {
  const dollars = (cents / 100).toFixed(2)
  return `$${dollars} CAD`
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING_PAYMENT: 'text-neutral-700 bg-neutral-100',
    PAID: 'text-neutral-700 bg-neutral-100',
    IN_PRODUCTION: 'text-neutral-800 bg-neutral-200',
    READY: 'text-neutral-800 bg-neutral-200',
    SHIPPED: 'text-neutral-800 bg-neutral-200',
    COMPLETED: 'text-white bg-black',
    CANCELLED: 'text-neutral-500 bg-neutral-100',
    PENDING: 'text-neutral-700 bg-neutral-100',
    QUOTED: 'text-neutral-700 bg-neutral-100',
    ACCEPTED: 'text-white bg-black',
    REJECTED: 'text-neutral-800 bg-neutral-200',
  }
  return colors[status] || 'text-gray-600 bg-gray-50'
}

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
    PENDING_PAYMENT: 'text-yellow-600 bg-yellow-50',
    PAID: 'text-blue-600 bg-blue-50',
    IN_PRODUCTION: 'text-purple-600 bg-purple-50',
    READY: 'text-indigo-600 bg-indigo-50',
    SHIPPED: 'text-cyan-600 bg-cyan-50',
    COMPLETED: 'text-green-600 bg-green-50',
    CANCELLED: 'text-red-600 bg-red-50',
    PENDING: 'text-yellow-600 bg-yellow-50',
    QUOTED: 'text-blue-600 bg-blue-50',
    ACCEPTED: 'text-green-600 bg-green-50',
    REJECTED: 'text-red-600 bg-red-50',
  }
  return colors[status] || 'text-gray-600 bg-gray-50'
}

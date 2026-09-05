"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"

interface OrderItemDetail {
  id: string
  productName: string
  productType: string
  color: string
  size: string
  quantity: number
  basePrice: number
  extraPrintCharge: number
  xlSurcharge: number
  printLocations: string
  customizations: string
  designUrl?: string | null
}

interface OrderDetail {
  id: string
  orderNumber: string
  status: string
  shippingMethod: string
  shippingAddress: string
  customerName: string
  customerEmail: string
  customerPhone?: string | null
  subtotal: number
  shippingCost: number
  rushSurcharge: number
  tax: number
  total: number
  createdAt: string
  paidAt?: string | null
  items: OrderItemDetail[]
}

const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAID: "Paid",
  IN_PRODUCTION: "In Production",
  READY: "Ready",
  SHIPPED: "Shipped",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
}

const STATUS_COLORS: Record<string, string> = {
  PENDING_PAYMENT: "bg-yellow-50 text-yellow-700 border-yellow-200",
  PAID: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PRODUCTION: "bg-purple-50 text-purple-700 border-purple-200",
  READY: "bg-indigo-50 text-indigo-700 border-indigo-200",
  SHIPPED: "bg-cyan-50 text-cyan-700 border-cyan-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)} CAD`
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso))
}

function parseCustomizations(raw: string): Record<string, string> {
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed === "object" && parsed !== null) return parsed
  } catch {}
  return {}
}

export default function OrderDetailPage() {
  const { data: session, status: sessionStatus } = useSession()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login?callbackUrl=/account")
    }
  }, [sessionStatus, router])

  useEffect(() => {
    if (session && params?.id) {
      setLoading(true)
      fetch(`/api/orders/${params.id}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to load order")
          return res.json()
        })
        .then((data) => setOrder(data.order ?? data))
        .catch(() => setError("Could not load order details."))
        .finally(() => setLoading(false))
    }
  }, [session, params?.id])

  if (sessionStatus === "loading" || loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-4 text-sm text-red-600">{error || "Order not found"}</p>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Account
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="animate-fade-in">
        <Link
          href="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-accent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Account
        </Link>

        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-black">
                {order.orderNumber}
              </h1>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || "bg-neutral-50 text-neutral-700 border-neutral-200"}`}
              >
                {STATUS_LABELS[order.status] || order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500">Total</p>
            <p className="text-xl font-bold text-black">{formatPrice(order.total)}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-100 px-6 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Items ({order.items.length})
              </h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {order.items.map((item) => {
                const customizations = parseCustomizations(item.customizations)
                return (
                  <div key={item.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-black">
                          {item.productName}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-neutral-500">
                          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5">
                            {item.productType}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5">
                            {item.color}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5">
                            Size {item.size}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5">
                            Qty {item.quantity}
                          </span>
                        </div>
                        {item.printLocations && (
                          <p className="mt-2 text-xs text-neutral-500">
                            <span className="font-medium text-neutral-600">Print locations:</span> {item.printLocations}
                          </p>
                        )}
                        {Object.keys(customizations).length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {Object.entries(customizations).map(([key, val]) => (
                              <span key={key} className="text-xs text-neutral-500">
                                <span className="font-medium text-neutral-600">{key}:</span> {String(val)}
                              </span>
                            ))}
                          </div>
                        )}
                        {item.designUrl && (
                          <a
                            href={item.designUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
                          >
                            View uploaded design
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-3 w-3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-black">
                          {formatPrice((item.basePrice + item.extraPrintCharge + item.xlSurcharge) * item.quantity)}
                        </p>
                        {(item.extraPrintCharge > 0 || item.xlSurcharge > 0) && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {formatPrice(item.basePrice)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Pricing Breakdown
              </h2>
              <dl className="space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-neutral-500">Subtotal</dt>
                  <dd className="font-medium text-black">{formatPrice(order.subtotal)}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-neutral-500">Shipping</dt>
                  <dd className="font-medium text-black">{formatPrice(order.shippingCost)}</dd>
                </div>
                {order.rushSurcharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-neutral-500">Rush Surcharge</dt>
                    <dd className="font-medium text-black">{formatPrice(order.rushSurcharge)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <dt className="text-neutral-500">Tax</dt>
                  <dd className="font-medium text-black">{formatPrice(order.tax)}</dd>
                </div>
                <div className="border-t border-neutral-100 pt-2 flex justify-between">
                  <dt className="text-sm font-semibold text-black">Total</dt>
                  <dd className="text-sm font-bold text-black">{formatPrice(order.total)}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Shipping Information
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-neutral-400">Name</dt>
                  <dd className="text-sm font-medium text-black">{order.customerName}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-400">Email</dt>
                  <dd className="text-sm font-medium text-black">{order.customerEmail}</dd>
                </div>
                {order.customerPhone && (
                  <div>
                    <dt className="text-xs text-neutral-400">Phone</dt>
                    <dd className="text-sm font-medium text-black">{order.customerPhone}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-neutral-400">Address</dt>
                  <dd className="text-sm font-medium text-black whitespace-pre-line">{order.shippingAddress}</dd>
                </div>
                <div>
                  <dt className="text-xs text-neutral-400">Shipping Method</dt>
                  <dd className="text-sm font-medium text-black">
                    {order.shippingMethod === "RUSH" ? "Rush Delivery" : "Standard Shipping"}
                  </dd>
                </div>
                {order.paidAt && (
                  <div>
                    <dt className="text-xs text-neutral-400">Paid</dt>
                    <dd className="text-sm font-medium text-black">{formatDate(order.paidAt)}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)} CAD`
}

interface OrderItem {
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
}

interface OrderData {
  orderNumber: string
  shippingMethod: string
  total: number
  items: OrderItem[]
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!sessionId) {
      setLoading(false)
      setError("No session found. Please check your email for order confirmation.")
      return
    }

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to verify payment")
        return res.json()
      })
      .then((data) => {
        setOrder(data.order ?? data)
        setLoading(false)
      })
      .catch(() => {
        setError("Unable to load order details. Please check your email for confirmation.")
        setLoading(false)
      })
  }, [sessionId])

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 shadow-sm">
          <p className="text-sm text-red-600">{error || "Order not found"}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isRush = order.shippingMethod === "RUSH"

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="animate-fade-in text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="white"
            className="h-10 w-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Order Confirmed!
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mt-4 inline-flex items-center rounded-full bg-neutral-100 px-4 py-1.5">
          <span className="text-xs font-medium text-neutral-600">Order </span>
          <span className="ml-1 text-xs font-bold text-black">{order.orderNumber}</span>
        </div>

        {/* Order Details */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Order Details
          </h2>

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-black">{item.productName}</p>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-neutral-500">
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                      {item.productType}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                      {item.color}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                      Size {item.size}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                      Qty {item.quantity}
                    </span>
                  </div>
                  {item.printLocations && (
                    <p className="mt-1.5 text-xs text-neutral-500">
                      <span className="font-medium text-neutral-600">Print:</span>{" "}
                      {item.printLocations}
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold text-black shrink-0">
                  {formatPrice((item.basePrice + item.extraPrintCharge + item.xlSurcharge) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-neutral-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500">Shipping Method</p>
                <p className="text-sm font-medium text-black">
                  {isRush ? "Rush Delivery" : "Standard Shipping"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500">Total Paid</p>
                <p className="text-lg font-bold text-black">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-neutral-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <div className="text-left">
              <p className="text-sm font-medium text-black">Estimated Delivery</p>
              <p className="text-xs text-neutral-500">
                {isRush ? "3-5 business days" : "7-10 business days"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Back to Home
          </Link>
          <Link
            href="/account"
            className="inline-flex h-11 items-center rounded-full border border-neutral-200 px-7 text-sm font-medium text-neutral-600 transition-colors hover:border-accent hover:text-accent"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

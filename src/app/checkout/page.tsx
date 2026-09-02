"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useCartStore } from "@/lib/store"

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)} CAD`
}

const TYPE_LABELS: Record<string, string> = {
  TSHIRT: "T-Shirt",
  SWEATSHIRT: "Sweatshirt",
  HOODIE: "Hoodie",
}

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [shippingMethod, setShippingMethod] = useState<"STANDARD" | "RUSH">("STANDARD")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  if (items.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    )
  }

  const subtotal = items.reduce(
    (total, item) => total + (item.basePrice + item.extraPrintCharge + item.xlSurcharge) * item.quantity,
    0
  )
  const hasRush = shippingMethod === "RUSH"
  const shippingCost = hasRush ? 1999 : 999
  const rushSurcharge = hasRush ? 1500 : 0
  const tax = Math.round((subtotal + shippingCost) * 0.13)
  const total = subtotal + shippingCost + rushSurcharge + tax

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const orderItems = items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      productType: item.productType,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      numberOfExtraPrints: Math.max(0, (item.printLocations?.length ?? 1) - 1),
      basePrice: item.basePrice,
      extraPrintCharge: item.extraPrintCharge,
      xlSurcharge: item.xlSurcharge,
      printLocations: item.printLocations,
      designUrl: item.designUrl,
      shippingMethod: shippingMethod,
    }))

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerInfo: {
            name,
            email,
            phone,
          },
          shippingAddress: address,
          shippingMethod,
          items: orderItems,
          subtotal,
          shippingCost,
          rushSurcharge,
          tax,
          total,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="animate-fade-in">
        <Link
          href="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Cart
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Customer Information
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-xs font-medium text-neutral-600">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-neutral-600">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-neutral-600">
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Shipping Address
              </h2>
              <div className="mt-5">
                <label htmlFor="address" className="block text-xs font-medium text-neutral-600">
                  Full Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1.5 block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-black focus:bg-white resize-none"
                  placeholder="123 Main St, Apt 4&#10;Toronto, ON M5V 2T6&#10;Canada"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Shipping Method
              </h2>
              <div className="mt-5 space-y-3">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    shippingMethod === "STANDARD"
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="STANDARD"
                      checked={shippingMethod === "STANDARD"}
                      onChange={() => setShippingMethod("STANDARD")}
                      className="h-4 w-4 border-neutral-300 text-black accent-black"
                    />
                    <div>
                      <p className="text-sm font-medium text-black">Standard Shipping</p>
                      <p className="text-xs text-neutral-500">7-10 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-black">{formatPrice(999)}</span>
                </label>

                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                    shippingMethod === "RUSH"
                      ? "border-black bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="RUSH"
                      checked={shippingMethod === "RUSH"}
                      onChange={() => setShippingMethod("RUSH")}
                      className="h-4 w-4 border-neutral-300 text-black accent-black"
                    />
                    <div>
                      <p className="text-sm font-medium text-black">Rush Delivery</p>
                      <p className="text-xs text-neutral-500">3-5 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-black">{formatPrice(1999)}</span>
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Order Summary
              </h2>

              <div className="mt-4 max-h-64 space-y-4 overflow-y-auto">
                {items.map((item) => {
                  const unitPrice = item.basePrice + item.extraPrintCharge + item.xlSurcharge
                  return (
                    <div key={item.id} className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-black truncate">
                          {item.productName}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {TYPE_LABELS[item.productType] || item.productType} / {item.color} / {item.size}
                        </p>
                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-medium text-black shrink-0">
                        {formatPrice(unitPrice * item.quantity)}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-medium text-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="font-medium text-black">{formatPrice(shippingCost)}</span>
                </div>
                {rushSurcharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Rush Surcharge</span>
                    <span className="font-medium text-black">{formatPrice(rushSurcharge)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax (13%)</span>
                  <span className="font-medium text-black">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-neutral-100 pt-2 flex justify-between">
                  <span className="text-sm font-semibold text-black">Total</span>
                  <span className="text-base font-bold text-black">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-white" />
                ) : (
                  `Pay ${formatPrice(total)}`
                )}
              </button>

              <p className="mt-3 text-center text-[11px] text-neutral-400">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

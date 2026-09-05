"use client"

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

export default function CartPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateItem = useCartStore((s) => s.updateItem)

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="mx-auto h-16 w-16 text-neutral-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-black">
            Your cart is empty
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = items.reduce(
    (total, item) => total + (item.basePrice + item.extraPrintCharge + item.xlSurcharge) * item.quantity,
    0
  )
  const hasRush = items.some((item) => item.shippingMethod === "RUSH")
  const shippingCost = hasRush ? 1999 : 999
  const rushSurcharge = hasRush ? 1500 : 0
  const tax = Math.round((subtotal + shippingCost) * 0.13)
  const total = subtotal + shippingCost + rushSurcharge + tax

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const unitPrice = item.basePrice + item.extraPrintCharge + item.xlSurcharge
              const lineTotal = unitPrice * item.quantity

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-sm font-semibold text-black">
                          {item.productName}
                        </h2>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-3.5 w-3.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-neutral-500">
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                          {TYPE_LABELS[item.productType] || item.productType}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                          {item.color}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5">
                          Size {item.size}
                        </span>
                        {item.shippingMethod === "RUSH" && (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-700">
                            Rush
                          </span>
                        )}
                      </div>

                      {item.printLocations.length > 0 && (
                        <p className="mt-2 text-xs text-neutral-500">
                          <span className="font-medium text-neutral-600">Print locations:</span>{" "}
                          {item.printLocations.join(", ")}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-3">
                        <span className="text-xs text-neutral-500">Qty:</span>
                        <div className="inline-flex items-center rounded-full border border-neutral-200">
                          <button
                            onClick={() =>
                              updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-8 w-8 items-center justify-center rounded-l-full text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-3 w-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14"
                              />
                            </svg>
                          </button>
                          <span className="flex h-8 w-10 items-center justify-center border-x border-neutral-200 text-sm font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateItem(item.id, { quantity: item.quantity + 1 })
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-r-full text-neutral-500 transition-colors hover:bg-neutral-50"
                            aria-label="Increase quantity"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="h-3 w-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-black">
                        {formatPrice(lineTotal)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {formatPrice(unitPrice)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Order Summary
              </h2>

              <dl className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <dt className="text-neutral-500">Subtotal</dt>
                  <dd className="font-medium text-black">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-neutral-500">Shipping</dt>
                  <dd className="font-medium text-black">{formatPrice(shippingCost)}</dd>
                </div>
                {rushSurcharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-neutral-500">Rush Surcharge</dt>
                    <dd className="font-medium text-black">{formatPrice(rushSurcharge)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <dt className="text-neutral-500">Tax (13%)</dt>
                  <dd className="font-medium text-black">{formatPrice(tax)}</dd>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between">
                  <dt className="text-sm font-semibold text-black">Total</dt>
                  <dd className="text-base font-bold text-black">{formatPrice(total)}</dd>
                </div>
              </dl>

              <button
                onClick={() => router.push("/checkout")}
                className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/shop"
                className="mt-3 flex w-full items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-600 transition-colors hover:border-black hover:text-black"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

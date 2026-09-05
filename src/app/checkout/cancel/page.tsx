"use client"

import Link from "next/link"

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="animate-fade-in text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-neutral-200 bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 text-neutral-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-black sm:text-3xl">
          Payment Cancelled
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Your order was not processed.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/checkout"
            className="inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Return to Checkout
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center rounded-full border border-neutral-200 px-7 text-sm font-medium text-neutral-600 transition-colors hover:border-accent hover:text-accent"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

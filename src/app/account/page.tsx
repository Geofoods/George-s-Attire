"use client"

import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
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
  }).format(new Date(iso))
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState<"profile" | "orders">("profile")
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState("")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account")
    }
  }, [status, router])

  useEffect(() => {
    if (tab === "orders" && session) {
      setOrdersLoading(true)
      setOrdersError("")
      fetch("/api/orders")
        .then(async (res) => {
          if (!res.ok) throw new Error("Failed to load orders")
          return res.json()
        })
        .then((data) => setOrders(data.orders ?? data ?? []))
        .catch(() => setOrdersError("Could not load your orders."))
        .finally(() => setOrdersLoading(false))
    }
  }, [tab, session])

  if (status === "loading") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    )
  }

  if (!session) return null

  const user = session.user

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-black">
            My Account
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your profile and view orders
          </p>
        </div>

        <div className="mb-8 flex gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1">
          <button
            onClick={() => setTab("profile")}
            className={`flex-1 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              tab === "profile"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex-1 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              tab === "orders"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Orders
          </button>
        </div>

        {tab === "profile" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-black">{user?.name || "User"}</p>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Account Actions
              </h2>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-black hover:text-black"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            {ordersLoading && (
              <div className="flex items-center justify-center py-16">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
              </div>
            )}

            {ordersError && (
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
                <p className="text-sm text-red-600">{ordersError}</p>
              </div>
            )}

            {!ordersLoading && !ordersError && orders.length === 0 && (
              <div className="rounded-2xl border border-neutral-200 bg-white px-8 py-16 text-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="mx-auto mb-4 h-12 w-12 text-neutral-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <h3 className="mb-1 text-base font-semibold text-black">No orders yet</h3>
                <p className="mb-6 text-sm text-neutral-500">
                  When you place an order, it will appear here.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  Browse Shop
                </Link>
              </div>
            )}

            {!ordersLoading && !ordersError && orders.length > 0 && (
              <div className="space-y-3">
                {orders.map((order) => {
                  const expanded = expandedOrder === order.id
                  return (
                    <div
                      key={order.id}
                      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <button
                        onClick={() => setExpandedOrder(expanded ? null : order.id)}
                        className="flex w-full items-center justify-between p-5 text-left"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-sm font-semibold text-black">
                              {order.orderNumber}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || "bg-neutral-50 text-neutral-700 border-neutral-200"}`}
                            >
                              {STATUS_LABELS[order.status] || order.status}
                            </span>
                          </div>
                          <div className="mt-1.5 flex items-center gap-4 text-xs text-neutral-500">
                            <span>{formatDate(order.createdAt)}</span>
                            <span>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-black">
                            {formatPrice(order.total)}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`h-4 w-4 text-neutral-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                        </div>
                      </button>

                      {expanded && (
                        <div className="border-t border-neutral-100 px-5 pb-5">
                          <div className="space-y-3 pt-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3"
                              >
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-black truncate">
                                    {item.productName}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {item.color} · {item.size} · Qty {item.quantity}
                                  </p>
                                </div>
                                <span className="ml-4 text-sm font-medium text-black whitespace-nowrap">
                                  {formatPrice((item.basePrice + item.extraPrintCharge + item.xlSurcharge) * item.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Link
                              href={`/account/orders/${order.id}`}
                              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:underline"
                            >
                              View full details
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-3.5 w-3.5"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

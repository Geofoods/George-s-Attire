"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  productName: string;
  productType: string;
  color: string;
  size: string;
  quantity: number;
  basePrice: number;
  extraPrintCharge: number;
  xlSurcharge: number;
  printLocations: string;
  customizations: string;
  designUrl?: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  status: string;
  shippingMethod: string;
  shippingAddress: string;
  subtotal: number;
  shippingCost: number;
  rushSurcharge: number;
  tax: number;
  total: number;
  createdAt: string;
  paidAt?: string | null;
  items: OrderItem[];
}

interface PricingConfig {
  key: string;
  value: number;
  description?: string | null;
}

interface BulkQuote {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  business?: string | null;
  apparelType: string;
  quantity: number;
  sizes: string;
  colors: string;
  numberOfPrints: number;
  desiredDate?: string | null;
  additionalInfo?: string | null;
  status: string;
  adminNotes?: string | null;
  quotedPrice?: number | null;
  createdAt: string;
}

const ORDER_STATUSES = [
  "PENDING_PAYMENT",
  "PAID",
  "IN_PRODUCTION",
  "READY",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
];

const QUOTE_STATUSES = ["PENDING", "QUOTED", "ACCEPTED", "REJECTED"];

const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Pending Payment",
  PAID: "Paid",
  IN_PRODUCTION: "In Production",
  READY: "Ready",
  SHIPPED: "Shipped",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  PENDING: "Pending",
  QUOTED: "Quoted",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING_PAYMENT: "bg-yellow-50 text-yellow-700",
  PAID: "bg-blue-50 text-blue-700",
  IN_PRODUCTION: "bg-purple-50 text-purple-700",
  READY: "bg-indigo-50 text-indigo-700",
  SHIPPED: "bg-cyan-50 text-cyan-700",
  COMPLETED: "bg-green-50 text-green-700",
  CANCELLED: "bg-red-50 text-red-700",
  PENDING: "bg-yellow-50 text-yellow-700",
  QUOTED: "bg-blue-50 text-blue-700",
  ACCEPTED: "bg-green-50 text-green-700",
  REJECTED: "bg-red-50 text-red-700",
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)} CAD`;
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

type Tab = "orders" | "pricing" | "bulkquotes";

export default function AdminDashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router.push("/login?callbackUrl=/admin");
    }
    if (
      sessionStatus === "authenticated" &&
      (session?.user as { role?: string })?.role !== "ADMIN"
    ) {
      router.push("/");
    }
  }, [sessionStatus, session, router]);

  if (
    sessionStatus === "loading" ||
    sessionStatus !== "authenticated" ||
    (session?.user as { role?: string })?.role !== "ADMIN"
  ) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-black">
        Admin Dashboard
      </h1>

      <div className="mb-6 flex gap-1 rounded-lg border border-neutral-200 bg-white p-1">
        {(
          [
            { key: "orders", label: "Orders" },
            { key: "pricing", label: "Pricing" },
            { key: "bulkquotes", label: "Bulk Quotes" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-black text-white"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "orders" && <OrdersTab />}
      {activeTab === "pricing" && <PricingTab />}
      {activeTab === "bulkquotes" && <BulkQuotesTab />}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      status: statusFilter,
      search,
    });
    try {
      const res = await fetch(`/api/admin/orders?${params}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
        >
          <option value="ALL">All Statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <span className="text-sm text-neutral-500">{total} orders</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center text-sm text-neutral-500">
          No orders found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="px-4 py-3 font-medium text-neutral-600">Order</th>
                <th className="px-4 py-3 font-medium text-neutral-600">Customer</th>
                <th className="px-4 py-3 font-medium text-neutral-600">Date</th>
                <th className="px-4 py-3 font-medium text-neutral-600">Status</th>
                <th className="px-4 py-3 text-right font-medium text-neutral-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <OrdersRow
                  key={order.id}
                  order={order}
                  expanded={expandedId === order.id}
                  onToggle={() =>
                    setExpandedId(expandedId === order.id ? null : order.id)
                  }
                  onStatusChange={updateStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-neutral-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function OrdersRow({
  order,
  expanded,
  onToggle,
  onStatusChange,
}: {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: string) => void;
}) {
  return (
    <>
      <tr
        className="cursor-pointer transition-colors hover:bg-neutral-50"
        onClick={onToggle}
      >
        <td className="px-4 py-3 font-medium text-black">{order.orderNumber}</td>
        <td className="px-4 py-3 text-neutral-600">{order.customerName}</td>
        <td className="px-4 py-3 text-neutral-500">
          {formatDate(order.createdAt)}
        </td>
        <td className="px-4 py-3">
          <select
            value={order.status}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className={`rounded-full border-0 px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] || "bg-neutral-50 text-neutral-700"}`}
          >
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-3 text-right font-medium text-black">
          {formatPrice(order.total)}
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} className="border-t border-neutral-100 bg-neutral-50 px-4 py-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Customer
                </h4>
                <p className="text-sm text-neutral-700">{order.customerEmail}</p>
                {order.customerPhone && (
                  <p className="text-sm text-neutral-700">{order.customerPhone}</p>
                )}
                <p className="mt-1 whitespace-pre-line text-sm text-neutral-600">
                  {order.shippingAddress}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {order.shippingMethod === "RUSH" ? "Rush" : "Standard"} shipping
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Items
                </h4>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-700">
                        {item.productName} ({item.color}, {item.size}) x{item.quantity}
                      </span>
                      <span className="font-medium text-black">
                        {formatPrice(
                          (item.basePrice + item.extraPrintCharge + item.xlSurcharge) *
                            item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 border-t border-neutral-200 pt-3 space-y-1">
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Shipping</span>
                    <span>{formatPrice(order.shippingCost)}</span>
                  </div>
                  {order.rushSurcharge > 0 && (
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Rush</span>
                      <span>{formatPrice(order.rushSurcharge)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>Tax</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-1 text-sm font-semibold text-black">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function PricingTab() {
  const [configs, setConfigs] = useState<PricingConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/pricing")
      .then((res) => res.json())
      .then((data) => setConfigs(data.configs || []))
      .catch(() => setMessage("Failed to load pricing"))
      .finally(() => setLoading(false));
  }, []);

  const updateValue = (key: string, value: string) => {
    setConfigs((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value: parseInt(value) || 0 } : c))
    );
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          configs: configs.map((c) => ({ key: c.key, value: c.value })),
        }),
      });
      if (res.ok) {
        setMessage("Pricing saved successfully.");
      } else {
        setMessage("Failed to save pricing.");
      }
    } catch {
      setMessage("Failed to save pricing.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-400">
        Pricing Configuration
      </h2>
      <p className="mb-6 text-xs text-neutral-500">
        All values are in cents (e.g., 1000 = $10.00). Tax rate is in basis points
        (1300 = 13%).
      </p>
      <div className="space-y-4">
        {configs.map((config) => (
          <div key={config.key} className="flex items-center gap-4">
            <label className="w-48 text-sm font-medium text-neutral-700">
              {config.key.replace(/_/g, " ")}
            </label>
            <input
              type="number"
              value={config.value}
              onChange={(e) => updateValue(config.key, e.target.value)}
              className="w-32 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
            {config.description && (
              <span className="text-xs text-neutral-400">{config.description}</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Pricing"}
        </button>
        {message && (
          <span
            className={`text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </span>
        )}
      </div>
    </div>
  );
}

function BulkQuotesTab() {
  const [quotes, setQuotes] = useState<BulkQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/bulk-quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data.quotes || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const updateQuote = async (
    id: string,
    data: { status?: string; adminNotes?: string; quotedPrice?: number }
  ) => {
    try {
      const res = await fetch(`/api/admin/bulk-quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, ...updated.quote } : q))
        );
      }
    } catch {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center text-sm text-neutral-500">
          No bulk quote requests found.
        </div>
      ) : (
        quotes.map((quote) => (
          <div
            key={quote.id}
            className="rounded-xl border border-neutral-200 bg-white"
          >
            <div
              className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors hover:bg-neutral-50"
              onClick={() =>
                setExpandedId(expandedId === quote.id ? null : quote.id)
              }
            >
              <div className="flex items-center gap-4">
                <span className="font-medium text-black">{quote.name}</span>
                <span className="text-sm text-neutral-500">{quote.email}</span>
                <span className="text-sm text-neutral-500">
                  {quote.apparelType} x{quote.quantity}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[quote.status] || "bg-neutral-50 text-neutral-700"}`}
                >
                  {STATUS_LABELS[quote.status]}
                </span>
                <span className="text-xs text-neutral-400">
                  {formatDate(quote.createdAt)}
                </span>
              </div>
            </div>

            {expandedId === quote.id && (
              <div className="border-t border-neutral-100 px-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium text-neutral-600">Sizes:</span>{" "}
                      {quote.sizes}
                    </p>
                    <p>
                      <span className="font-medium text-neutral-600">Colors:</span>{" "}
                      {quote.colors}
                    </p>
                    <p>
                      <span className="font-medium text-neutral-600">Prints:</span>{" "}
                      {quote.numberOfPrints}
                    </p>
                    {quote.phone && (
                      <p>
                        <span className="font-medium text-neutral-600">Phone:</span>{" "}
                        {quote.phone}
                      </p>
                    )}
                    {quote.business && (
                      <p>
                        <span className="font-medium text-neutral-600">
                          Business:
                        </span>{" "}
                        {quote.business}
                      </p>
                    )}
                    {quote.additionalInfo && (
                      <p>
                        <span className="font-medium text-neutral-600">Notes:</span>{" "}
                        {quote.additionalInfo}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-neutral-500">
                        Status
                      </label>
                      <select
                        value={quote.status}
                        onChange={(e) => updateQuote(quote.id, { status: e.target.value })}
                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
                      >
                        {QUOTE_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-neutral-500">
                        Quoted Price (cents)
                      </label>
                      <input
                        type="number"
                        defaultValue={quote.quotedPrice ?? ""}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) updateQuote(quote.id, { quotedPrice: val });
                        }}
                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
                        placeholder="e.g. 50000 for $500"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-neutral-500">
                        Admin Notes
                      </label>
                      <textarea
                        defaultValue={quote.adminNotes ?? ""}
                        onBlur={(e) =>
                          updateQuote(quote.id, { adminNotes: e.target.value })
                        }
                        rows={3}
                        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-black"
                        placeholder="Internal notes..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

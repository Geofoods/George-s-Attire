"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const BASE_PRICES: Record<string, number> = {
  TSHIRT: 10,
  SWEATSHIRT: 20,
  HOODIE: 30,
};

const EXTRA_PRINT_COST = 3;
const XL_SURCHARGE = 5;
const STANDARD_SHIPPING = 12;
const RUSH_SHIPPING = 17;
const TAX_RATE = 0.13;

export default function QuoteCalculator() {
  const [product, setProduct] = useState("TSHIRT");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [prints, setPrints] = useState(1);
  const [rush, setRush] = useState(false);

  const { itemTotal, extraPrints, xlSurcharge, shipping, rushSurcharge, tax, total } =
    useMemo(() => {
      const base = BASE_PRICES[product] ?? 0;
      const extra = Math.max(0, prints - 1) * EXTRA_PRINT_COST;
      const xl = size === "XL" ? XL_SURCHARGE : 0;
      const itemTotal = (base + extra + xl) * quantity;
      const shipping = rush ? RUSH_SHIPPING : STANDARD_SHIPPING;
      const rushSurcharge = rush ? RUSH_SHIPPING - STANDARD_SHIPPING : 0;
      const tax = Math.round((itemTotal + shipping) * TAX_RATE * 100) / 100;
      const total = itemTotal + shipping + tax;
      return { itemTotal, extraPrints: extra * quantity, xlSurcharge: xl * quantity, shipping, rushSurcharge, tax, total };
    }, [product, quantity, size, prints, rush]);

  const formatPrice = (amount: number) => `$${amount.toFixed(2)} CAD`;

  const products = [
    { value: "TSHIRT", label: "T-Shirt", price: "$10" },
    { value: "SWEATSHIRT", label: "Sweatshirt", price: "$20" },
    { value: "HOODIE", label: "Hoodie", price: "$30" },
  ];

  const selectClass =
    "mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <h3 className="text-lg font-bold text-black">Quote Calculator</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Estimate your price in seconds. No account required.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="qc-product" className="block text-sm font-medium text-black">
            Product
          </label>
          <select id="qc-product" value={product} onChange={(e) => setProduct(e.target.value)} className={selectClass}>
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} — from {p.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qc-qty" className="block text-sm font-medium text-black">
            Quantity
          </label>
          <input
            id="qc-qty"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className={selectClass}
          />
        </div>

        <div>
          <label htmlFor="qc-size" className="block text-sm font-medium text-black">
            Size
          </label>
          <select id="qc-size" value={size} onChange={(e) => setSize(e.target.value)} className={selectClass}>
            {["S", "M", "L", "XL"].map((s) => (
              <option key={s} value={s}>
                {s === "XL" ? "XL (+$5)" : s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="qc-prints" className="block text-sm font-medium text-black">
            Print locations
          </label>
          <select id="qc-prints" value={prints} onChange={(e) => setPrints(parseInt(e.target.value, 10))} className={selectClass}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "(included)" : `(+$${(n - 1) * EXTRA_PRINT_COST})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-5 flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={rush}
          onChange={(e) => setRush(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black"
        />
        <span className="text-sm font-medium text-black">
          Rush shipping <span className="text-neutral-500">(+$5)</span>
        </span>
      </label>

      <div className="mt-6 rounded-xl bg-neutral-50 p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Items ({quantity} × {products.find((p) => p.value === product)?.label})</span>
            <span className="font-medium text-black">{formatPrice(itemTotal)}</span>
          </div>
          {extraPrints > 0 && (
            <div className="flex justify-between text-neutral-600">
              <span>Extra print locations</span>
              <span className="font-medium text-black">+{formatPrice(extraPrints)}</span>
            </div>
          )}
          {xlSurcharge > 0 && (
            <div className="flex justify-between text-neutral-600">
              <span>XL surcharge</span>
              <span className="font-medium text-black">+{formatPrice(xlSurcharge)}</span>
            </div>
          )}
          <div className="flex justify-between text-neutral-600">
            <span>Shipping</span>
            <span className="font-medium text-black">{formatPrice(shipping)}</span>
          </div>
          {rushSurcharge > 0 && (
            <div className="flex justify-between text-neutral-600">
              <span>Rush surcharge</span>
              <span className="font-medium text-black">+{formatPrice(rushSurcharge)}</span>
            </div>
          )}
          <div className="flex justify-between text-neutral-600">
            <span>Tax (13% HST)</span>
            <span className="font-medium text-black">{formatPrice(tax)}</span>
          </div>
          <div className="my-2 border-t border-neutral-200" />
          <div className="flex items-baseline justify-between">
            <span className="text-base font-semibold text-black">Estimated total</span>
            <span className="text-xl font-bold text-black">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Link
        href="/custom-apparel"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-colors hover:bg-neutral-800"
      >
        Continue to Order
      </Link>
      <p className="mt-4 text-center text-sm text-neutral-500">
        Need 50+ pieces?{" "}
        <Link href="/bulk-orders" className="font-medium text-accent underline underline-offset-2 hover:text-neutral-700">
          Request a bulk quote →
        </Link>
      </p>
    </div>
  );
}
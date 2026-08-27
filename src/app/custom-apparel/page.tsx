"use client"

import { useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/store"

type ApparelType = "TSHIRT" | "SWEATSHIRT" | "HOODIE"
type Size = "S" | "M" | "L" | "XL"
type ShippingMethod = "STANDARD" | "RUSH"
type PrintLocation =
  | "Front"
  | "Back"
  | "Left Chest"
  | "Right Chest"
  | "Sleeve"

interface ApparelOption {
  type: ApparelType
  label: string
  basePrice: number
}

interface ColorOption {
  name: string
  hex: string
}

const APPAREL_OPTIONS: ApparelOption[] = [
  { type: "TSHIRT", label: "T-Shirt", basePrice: 10.0 },
  { type: "SWEATSHIRT", label: "Sweatshirt", basePrice: 20.0 },
  { type: "HOODIE", label: "Hoodie", basePrice: 30.0 },
]

const SIZE_OPTIONS: Size[] = ["S", "M", "L", "XL"]

const COLOR_OPTIONS: ColorOption[] = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Navy", hex: "#1a1a2e" },
]

const PRINT_LOCATIONS: PrintLocation[] = [
  "Front",
  "Back",
  "Left Chest",
  "Right Chest",
  "Sleeve",
]

const EXTRA_PRINT_COST = 3.0
const XL_SURCHARGE = 5.0
const STANDARD_SHIPPING = 12.0
const RUSH_SHIPPING = 17.0
const TAX_RATE = 0.13

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"]
const MAX_FILE_SIZE = 10 * 1024 * 1024

function tshirtSVG(color: string, borderColor: string) {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full">
      <path
        d="M50 40 L30 60 L50 80 L50 220 L150 220 L150 80 L170 60 L150 40 L130 55 C120 35 80 35 70 55 Z"
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
    </svg>
  )
}

function sweatshirtSVG(color: string, borderColor: string) {
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full">
      <path
        d="M50 40 L25 65 L45 85 L45 220 L155 220 L155 85 L175 65 L150 40 L135 50 C125 30 75 30 65 50 Z"
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
      <path
        d="M45 220 L155 220 L155 230 L45 230 Z"
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
    </svg>
  )
}

function hoodieSVG(color: string, borderColor: string) {
  return (
    <svg viewBox="0 0 200 260" className="w-full h-full">
      <path
        d="M55 55 L25 75 L45 95 L45 230 L155 230 L155 95 L175 75 L145 55 L130 65 C120 40 80 40 70 65 Z"
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
      <path
        d="M70 65 C70 30 85 15 100 15 C115 15 130 30 130 65 L125 62 C125 38 113 25 100 25 C87 25 75 38 75 62 Z"
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
      <path
        d="M85 230 L85 255 C85 258 90 260 100 260 C110 260 115 258 115 255 L115 230"
        fill="none"
        stroke={borderColor}
        strokeWidth="2"
      />
    </svg>
  )
}

export default function CustomApparelPage() {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [apparelType, setApparelType] = useState<ApparelType>("TSHIRT")
  const [size, setSize] = useState<Size>("M")
  const [color, setColor] = useState("#000000")
  const [numPrints, setNumPrints] = useState(1)
  const [locations, setLocations] = useState<PrintLocation[]>(["Front"])
  const [designFile, setDesignFile] = useState<File | null>(null)
  const [designPreview, setDesignPreview] = useState<string | null>(null)
  const [shipping, setShipping] = useState<ShippingMethod>("STANDARD")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const basePrice = APPAREL_OPTIONS.find((o) => o.type === apparelType)!.basePrice
  const additionalPrints = Math.max(0, locations.length - numPrints)
  const extraPrintCost = additionalPrints * EXTRA_PRINT_COST
  const xlSurcharge = size === "XL" ? XL_SURCHARGE : 0
  const shippingCost = shipping === "STANDARD" ? STANDARD_SHIPPING : RUSH_SHIPPING
  const rushSurcharge = shipping === "RUSH" ? RUSH_SHIPPING - STANDARD_SHIPPING : 0
  const subtotal = basePrice + extraPrintCost + xlSurcharge
  const tax = Math.round((subtotal + shippingCost) * TAX_RATE * 100) / 100
  const total = subtotal + shippingCost + tax

  const formatPrice = (amount: number) => `$${amount.toFixed(2)} CAD`

  const handleToggleLocation = useCallback(
    (loc: PrintLocation) => {
      setLocations((prev) => {
        if (prev.includes(loc)) {
          return prev.filter((l) => l !== loc)
        }
        if (prev.length >= numPrints + 5) return prev
        return [...prev, loc]
      })
    },
    [numPrints]
  )

  const processFile = useCallback((file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Please upload a PNG, JPG, JPEG, or SVG file.")
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File must be under 10MB.")
      return
    }
    setDesignFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setDesignPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const removeDesign = useCallback(() => {
    setDesignFile(null)
    setDesignPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  const handleAddToCart = useCallback(() => {
    const productName = APPAREL_OPTIONS.find((o) => o.type === apparelType)!.label

    addItem({
      id: "",
      productId: `custom-${apparelType.toLowerCase()}-${Date.now()}`,
      productType: apparelType,
      productName: `Custom ${productName}`,
      size,
      color,
      quantity: 1,
      basePrice: Math.round(basePrice * 100),
      extraPrintCharge: Math.round(extraPrintCost * 100),
      xlSurcharge: Math.round(xlSurcharge * 100),
      printLocations: locations,
      designUrl: designPreview || undefined,
      designFile: designFile?.name || undefined,
      shippingMethod: shipping,
    })

    setShowSuccess(true)
    setTimeout(() => {
      router.push("/cart")
    }, 1200)
  }, [
    apparelType,
    size,
    color,
    basePrice,
    extraPrintCost,
    xlSurcharge,
    locations,
    designPreview,
    designFile,
    shipping,
    addItem,
    router,
  ])

  const borderColor =
    color === "#FFFFFF" || color === "#808080" ? "#e5e5e5" : color

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Custom Apparel Builder
          </h1>
          <p className="mt-2 text-neutral-500">
            Design your perfect piece. Select options and see your creation come
            to life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - Live Preview */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                    Live Preview
                  </span>
                  <span className="text-xs text-neutral-400">
                    {APPAREL_OPTIONS.find((o) => o.type === apparelType)!.label}{" "}
                    &middot; {size} &middot;{" "}
                    {COLOR_OPTIONS.find((c) => c.hex === color)?.name}
                  </span>
                </div>

                <div className="relative flex aspect-[3/4] items-center justify-center rounded-xl bg-neutral-100 overflow-hidden">
                  <div className="relative w-3/4 h-3/4">
                    {apparelType === "TSHIRT" && tshirtSVG(color, borderColor)}
                    {apparelType === "SWEATSHIRT" &&
                      sweatshirtSVG(color, borderColor)}
                    {apparelType === "HOODIE" && hoodieSVG(color, borderColor)}

                    {designPreview && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={designPreview}
                          alt="Your design"
                          className="max-h-[45%] max-w-[50%] object-contain drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {locations.map((loc) => (
                    <span
                      key={loc}
                      className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Options */}
          <div className="lg:col-span-3 space-y-6">
            {/* Apparel Type */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                Apparel Type
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {APPAREL_OPTIONS.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setApparelType(option.type)}
                    className={`relative rounded-xl border-2 p-4 text-center transition-all duration-150 ${
                      apparelType === option.type
                        ? "border-black bg-black text-white shadow-md"
                        : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                    }`}
                  >
                    <span className="block text-sm font-semibold">
                      {option.label}
                    </span>
                    <span
                      className={`block mt-1 text-xs ${
                        apparelType === option.type
                          ? "text-neutral-300"
                          : "text-neutral-500"
                      }`}
                    >
                      {formatPrice(option.basePrice)}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Size */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                Size
              </h2>
              <div className="flex gap-3">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`relative flex-1 rounded-xl border-2 py-3 text-sm font-semibold transition-all duration-150 ${
                      size === s
                        ? "border-black bg-black text-white"
                        : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                    }`}
                  >
                    {s}
                    {s === "XL" && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900 px-1.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">
                        +${XL_SURCHARGE.toFixed(0)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Color */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                Color
              </h2>
              <div className="flex gap-4">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(c.hex)}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className={`relative h-10 w-10 rounded-full transition-all duration-150 ${
                        color === c.hex
                          ? "ring-2 ring-offset-2 ring-black"
                          : "ring-1 ring-offset-1 ring-neutral-300 hover:ring-neutral-400"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-xs text-neutral-500">{c.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Prints & Locations */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-2">
                Prints &amp; Locations
              </h2>
              <p className="text-xs text-neutral-500 mb-4">
                1 included, +${EXTRA_PRINT_COST.toFixed(0)} each additional
              </p>

              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={() =>
                    setNumPrints((p) => {
                      const next = Math.max(1, p - 1)
                      if (locations.length > next) {
                        setLocations((l) => l.slice(0, next))
                      }
                      return next
                    })
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-lg font-medium text-black hover:bg-neutral-100 transition-colors"
                >
                  &minus;
                </button>
                <span className="w-8 text-center text-lg font-semibold text-black">
                  {numPrints}
                </span>
                <button
                  onClick={() => setNumPrints((p) => Math.min(6, p + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-300 text-lg font-medium text-black hover:bg-neutral-100 transition-colors"
                >
                  +
                </button>
                <span className="text-xs text-neutral-400 ml-1">
                  prints
                </span>
              </div>

              <div className="space-y-2.5">
                {PRINT_LOCATIONS.map((loc) => {
                  const checked = locations.includes(loc)
                  return (
                    <label
                      key={loc}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 cursor-pointer transition-all duration-150 ${
                        checked
                          ? "border-black bg-neutral-50"
                          : "border-neutral-200 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleLocation(loc)}
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-150 ${
                          checked
                            ? "border-black bg-black"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {checked && (
                          <svg
                            className="h-3 w-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M2.5 6L5 8.5L9.5 3.5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium text-black">
                        {loc}
                      </span>
                      <span className="ml-auto text-xs text-neutral-400">
                        {checked && locations[0] === loc ? (
                          <span className="text-green-600 font-medium">
                            Included
                          </span>
                        ) : checked ? (
                          <span className="text-amber-600 font-medium">
                            +${EXTRA_PRINT_COST.toFixed(2)}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  )
                })}
              </div>
            </section>

            {/* Design Upload */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                Design Upload
              </h2>

              {designPreview ? (
                <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <img
                    src={designPreview}
                    alt="Uploaded design preview"
                    className="h-16 w-16 rounded-lg object-contain bg-white border border-neutral-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {designFile?.name}
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {designFile &&
                        `${(designFile.size / 1024).toFixed(1)} KB`}
                    </p>
                  </div>
                  <button
                    onClick={removeDesign}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-200 hover:text-black transition-colors"
                    aria-label="Remove design"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 4L12 12M12 4L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-150 ${
                    isDragging
                      ? "border-black bg-neutral-100"
                      : "border-neutral-300 bg-neutral-50 hover:border-neutral-400 hover:bg-neutral-100"
                  }`}
                >
                  <svg
                    className="h-10 w-10 text-neutral-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="text-sm font-medium text-black">
                    Click to browse or drag &amp; drop
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    PNG, JPG, JPEG, SVG &middot; Max 10MB
                  </p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={handleFileChange}
                className="hidden"
              />
            </section>

            {/* Shipping */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                Shipping
              </h2>
              <div className="space-y-3">
                {(
                  [
                    {
                      method: "STANDARD" as ShippingMethod,
                      label: "Standard Shipping",
                      price: STANDARD_SHIPPING,
                    },
                    {
                      method: "RUSH" as ShippingMethod,
                      label: "Rush Shipping",
                      price: RUSH_SHIPPING,
                      badge: "+$5 rush",
                    },
                  ] as { method: ShippingMethod; label: string; price: number; badge?: string }[]
                ).map((opt) => (
                  <label
                    key={opt.method}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-150 ${
                      shipping === opt.method
                        ? "border-black bg-neutral-50"
                        : "border-neutral-200 bg-white hover:border-neutral-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === opt.method}
                      onChange={() => setShipping(opt.method)}
                      className="sr-only"
                    />
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-150 ${
                        shipping === opt.method
                          ? "border-black"
                          : "border-neutral-300"
                      }`}
                    >
                      {shipping === opt.method && (
                        <div className="h-2.5 w-2.5 rounded-full bg-black" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-black">
                      {opt.label}
                    </span>
                    {opt.badge && (
                      <span className="ml-auto mr-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase">
                        {opt.badge}
                      </span>
                    )}
                    <span className="text-sm text-neutral-500 ml-auto">
                      {formatPrice(opt.price)}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Price Breakdown */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900 mb-4">
                Price Breakdown
              </h2>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Base price</span>
                  <span className="font-medium text-black">
                    {formatPrice(basePrice)}
                  </span>
                </div>

                {extraPrintCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">
                      Extra prints ({locations.length - numPrints} &times; $
                      {EXTRA_PRINT_COST.toFixed(0)})
                    </span>
                    <span className="font-medium text-black">
                      +{formatPrice(extraPrintCost)}
                    </span>
                  </div>
                )}

                {xlSurcharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">XL surcharge</span>
                    <span className="font-medium text-black">
                      +{formatPrice(xlSurcharge)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="font-medium text-black">
                    {formatPrice(shippingCost)}
                  </span>
                </div>

                {rushSurcharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Rush surcharge</span>
                    <span className="font-medium text-black">
                      +{formatPrice(rushSurcharge)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax (13% HST)</span>
                  <span className="font-medium text-black">
                    {formatPrice(tax)}
                  </span>
                </div>

                <div className="my-3 border-t border-neutral-200" />

                <div className="flex justify-between">
                  <span className="text-base font-semibold text-black">
                    Total
                  </span>
                  <span className="text-lg font-bold text-black">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={showSuccess}
              className="w-full rounded-xl bg-black py-4 text-base font-semibold text-white transition-all duration-150 hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {showSuccess ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Added to Cart!
                </span>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white shadow-2xl">
            <svg
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Item added to cart! Redirecting...
          </div>
        </div>
      )}
    </div>
  )
}

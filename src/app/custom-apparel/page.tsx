"use client"

import { useState, useRef, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/store"

type ApparelType = "TSHIRT" | "SWEATSHIRT" | "HOODIE"
type Size = "S" | "M" | "L" | "XL"
type ShippingMethod = "STANDARD" | "RUSH"
export type GarmentView = "FRONT" | "BACK" | "LEFT_SLEEVE" | "RIGHT_SLEEVE"

export interface PlacementPreset {
  id: string
  label: string
  category: "Front" | "Back" | "Left Sleeve" | "Right Sleeve"
  view: GarmentView
  xPercent: number
  yPercent: number
  baseWidthPercent: number
  baseHeightPercent: number
}

interface LocationDesign {
  file: File | null
  preview: string | null
  scale: number
}

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

const PLACEMENT_PRESETS: PlacementPreset[] = [
  // FRONT
  {
    id: "front-center",
    label: "Center Chest",
    category: "Front",
    view: "FRONT",
    xPercent: 50,
    yPercent: 48,
    baseWidthPercent: 36,
    baseHeightPercent: 36,
  },
  {
    id: "front-left-chest",
    label: "Left Chest (Heart)",
    category: "Front",
    view: "FRONT",
    xPercent: 38,
    yPercent: 40,
    baseWidthPercent: 18,
    baseHeightPercent: 18,
  },
  {
    id: "front-right-chest",
    label: "Right Chest",
    category: "Front",
    view: "FRONT",
    xPercent: 62,
    yPercent: 40,
    baseWidthPercent: 18,
    baseHeightPercent: 18,
  },
  {
    id: "front-stomach",
    label: "Lower Stomach / Hem",
    category: "Front",
    view: "FRONT",
    xPercent: 50,
    yPercent: 68,
    baseWidthPercent: 36,
    baseHeightPercent: 26,
  },
  // BACK
  {
    id: "back-center",
    label: "Full Center Back",
    category: "Back",
    view: "BACK",
    xPercent: 50,
    yPercent: 50,
    baseWidthPercent: 38,
    baseHeightPercent: 38,
  },
  {
    id: "back-upper",
    label: "Upper Back / Yoke",
    category: "Back",
    view: "BACK",
    xPercent: 50,
    yPercent: 32,
    baseWidthPercent: 34,
    baseHeightPercent: 20,
  },
  {
    id: "back-lower",
    label: "Lower Back",
    category: "Back",
    view: "BACK",
    xPercent: 50,
    yPercent: 70,
    baseWidthPercent: 36,
    baseHeightPercent: 25,
  },
  // LEFT SLEEVE
  {
    id: "left-sleeve-shoulder",
    label: "Upper Shoulder / Bicep",
    category: "Left Sleeve",
    view: "LEFT_SLEEVE",
    xPercent: 45,
    yPercent: 38,
    baseWidthPercent: 24,
    baseHeightPercent: 24,
  },
  {
    id: "left-sleeve-cuff",
    label: "Lower Forearm / Cuff",
    category: "Left Sleeve",
    view: "LEFT_SLEEVE",
    xPercent: 45,
    yPercent: 64,
    baseWidthPercent: 20,
    baseHeightPercent: 20,
  },
  // RIGHT SLEEVE
  {
    id: "right-sleeve-shoulder",
    label: "Upper Shoulder / Bicep",
    category: "Right Sleeve",
    view: "RIGHT_SLEEVE",
    xPercent: 55,
    yPercent: 38,
    baseWidthPercent: 24,
    baseHeightPercent: 24,
  },
  {
    id: "right-sleeve-cuff",
    label: "Lower Forearm / Cuff",
    category: "Right Sleeve",
    view: "RIGHT_SLEEVE",
    xPercent: 55,
    yPercent: 64,
    baseWidthPercent: 20,
    baseHeightPercent: 20,
  },
]

const EXTRA_PRINT_COST = 3.0
const XL_SURCHARGE = 5.0
const STANDARD_SHIPPING = 12.0
const RUSH_SHIPPING = 17.0
const TAX_RATE = 0.13

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/svg+xml"]
const MAX_FILE_SIZE = 10 * 1024 * 1024

function RenderGarmentSVG({
  type,
  view,
  color,
  borderColor,
}: {
  type: ApparelType
  view: GarmentView
  color: string
  borderColor: string
}) {
  if (view === "FRONT") {
    if (type === "TSHIRT") {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <path
            d="M50 40 L30 60 L50 80 L50 220 L150 220 L150 80 L170 60 L150 40 L130 55 C120 70 80 70 70 55 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
          <path
            d="M70 55 C80 70 120 70 130 55"
            fill="none"
            stroke={borderColor}
            strokeWidth="2"
          />
        </svg>
      )
    }
    if (type === "SWEATSHIRT") {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <path
            d="M50 40 L25 65 L45 85 L45 220 L155 220 L155 85 L175 65 L150 40 L135 50 C125 65 75 65 65 50 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
          <path
            d="M65 50 C75 65 125 65 135 50"
            fill="none"
            stroke={borderColor}
            strokeWidth="2"
          />
          <path
            d="M45 215 L155 215 L155 225 L45 225 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
        </svg>
      )
    }
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
          d="M65 170 L135 170 L145 220 L55 220 Z"
          fill={color}
          stroke={borderColor}
          strokeWidth="2"
        />
      </svg>
    )
  }

  if (view === "BACK") {
    if (type === "TSHIRT") {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <path
            d="M50 40 L30 60 L50 80 L50 220 L150 220 L150 80 L170 60 L150 40 L130 46 C120 44 80 44 70 46 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
          <path
            d="M70 46 C80 50 120 50 130 46"
            fill="none"
            stroke={borderColor}
            strokeWidth="1.5"
          />
          <line x1="100" y1="48" x2="100" y2="58" stroke={borderColor} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    }
    if (type === "SWEATSHIRT") {
      return (
        <svg viewBox="0 0 200 240" className="w-full h-full">
          <path
            d="M50 40 L25 65 L45 85 L45 220 L155 220 L155 85 L175 65 L150 40 L135 45 C125 42 75 42 65 45 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
          <path
            d="M65 45 C75 48 125 48 135 45"
            fill="none"
            stroke={borderColor}
            strokeWidth="1.5"
          />
          <path
            d="M45 215 L155 215 L155 225 L45 225 Z"
            fill={color}
            stroke={borderColor}
            strokeWidth="2"
          />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 200 260" className="w-full h-full">
        <path
          d="M55 55 L25 75 L45 95 L45 230 L155 230 L155 95 L175 75 L145 55 L130 50 C120 42 80 42 70 50 Z"
          fill={color}
          stroke={borderColor}
          strokeWidth="2"
        />
        <path
          d="M70 50 C60 70 65 110 100 115 C135 110 140 70 130 50 C115 58 85 58 70 50 Z"
          fill={color}
          stroke={borderColor}
          strokeWidth="2"
        />
      </svg>
    )
  }

  const isLeft = view === "LEFT_SLEEVE"
  return (
    <svg viewBox="0 0 200 240" className="w-full h-full">
      <path
        d={isLeft ? "M110 40 L170 40 L170 220 L110 220 Z" : "M30 40 L90 40 L90 220 L30 220 Z"}
        fill={color}
        fillOpacity="0.4"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d={
          isLeft
            ? "M50 40 L110 40 L110 210 L50 210 Z"
            : "M90 40 L150 40 L150 210 L90 210 Z"
        }
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
      <path
        d={
          isLeft
            ? "M50 40 C75 30 100 30 110 40"
            : "M90 40 C100 30 125 30 150 40"
        }
        fill={color}
        stroke={borderColor}
        strokeWidth="2"
      />
      <path
        d={
          isLeft
            ? "M50 200 L110 200 L110 210 L50 210 Z"
            : "M90 200 L150 200 L150 210 L90 210 Z"
        }
        fill={color}
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
  const [activeView, setActiveView] = useState<GarmentView>("FRONT")
  
  // Array of chosen location preset IDs
  const [selectedPlacementIds, setSelectedPlacementIds] = useState<string[]>([
    "front-center",
  ])

  // Active location preset targeted for uploading / editing
  const [activeTargetId, setActiveTargetId] = useState<string>("front-center")

  // Per-location image data map (presetId -> { file, preview, scale })
  const [designsByLocation, setDesignsByLocation] = useState<
    Record<string, LocationDesign>
  >({})

  const [shipping, setShipping] = useState<ShippingMethod>("STANDARD")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Ensure activeTargetId is valid within selectedPlacementIds
  const currentActiveTargetId = useMemo(() => {
    if (selectedPlacementIds.includes(activeTargetId)) {
      return activeTargetId
    }
    return selectedPlacementIds[0] || "front-center"
  }, [activeTargetId, selectedPlacementIds])

  const activeTargetPreset = useMemo(() => {
    return PLACEMENT_PRESETS.find((p) => p.id === currentActiveTargetId)
  }, [currentActiveTargetId])

  // All presets belonging to current activeView that are currently selected
  const presetsInActiveView = useMemo(() => {
    return PLACEMENT_PRESETS.filter(
      (p) => p.view === activeView && selectedPlacementIds.includes(p.id)
    )
  }, [activeView, selectedPlacementIds])

  // Readable labels for selected placements
  const selectedPlacementLabels = useMemo(() => {
    return selectedPlacementIds.map((id) => {
      const preset = PLACEMENT_PRESETS.find((p) => p.id === id)
      return preset ? `${preset.category} (${preset.label})` : id
    })
  }, [selectedPlacementIds])

  const basePrice = APPAREL_OPTIONS.find((o) => o.type === apparelType)!.basePrice
  const additionalPrintsCount = Math.max(0, selectedPlacementIds.length - 1)
  const extraPrintCost = additionalPrintsCount * EXTRA_PRINT_COST
  const xlSurcharge = size === "XL" ? XL_SURCHARGE : 0
  const shippingCost = shipping === "STANDARD" ? STANDARD_SHIPPING : RUSH_SHIPPING
  const rushSurcharge = shipping === "RUSH" ? RUSH_SHIPPING - STANDARD_SHIPPING : 0
  const subtotal = basePrice + extraPrintCost + xlSurcharge
  const tax = Math.round((subtotal + shippingCost) * TAX_RATE * 100) / 100
  const total = subtotal + shippingCost + tax

  const formatPrice = (amount: number) => `$${amount.toFixed(2)} CAD`

  const handleTogglePreset = useCallback((preset: PlacementPreset) => {
    setSelectedPlacementIds((prev) => {
      if (prev.includes(preset.id)) {
        if (prev.length === 1) return prev
        const updated = prev.filter((id) => id !== preset.id)
        return updated
      }
      return [...prev, preset.id]
    })
    setActiveTargetId(preset.id)
    setActiveView(preset.view)
  }, [])

  const processFileForLocation = useCallback(
    (file: File, locationId: string) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert("Please upload a PNG, JPG, JPEG, or SVG file.")
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        alert("File must be under 10MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string
        setDesignsByLocation((prev) => ({
          ...prev,
          [locationId]: {
            file,
            preview: previewUrl,
            scale: prev[locationId]?.scale || 1.0,
          },
        }))
      }
      reader.readAsDataURL(file)
    },
    []
  )

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFileForLocation(file, currentActiveTargetId)
    },
    [processFileForLocation, currentActiveTargetId]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFileForLocation(file, currentActiveTargetId)
    },
    [processFileForLocation, currentActiveTargetId]
  )

  const removeDesignForLocation = useCallback((locationId: string) => {
    setDesignsByLocation((prev) => {
      const updated = { ...prev }
      delete updated[locationId]
      return updated
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [])

  const updateScaleForLocation = useCallback((locationId: string, scale: number) => {
    setDesignsByLocation((prev) => ({
      ...prev,
      [locationId]: {
        file: prev[locationId]?.file || null,
        preview: prev[locationId]?.preview || null,
        scale,
      },
    }))
  }, [])

  const handleAddToCart = useCallback(() => {
    const productName = APPAREL_OPTIONS.find((o) => o.type === apparelType)!.label

    // Build per-location design payload
    const locationDesigns = selectedPlacementIds.map((id) => {
      const preset = PLACEMENT_PRESETS.find((p) => p.id === id)
      const label = preset ? `${preset.category} (${preset.label})` : id
      const design = designsByLocation[id]
      return {
        location: label,
        designUrl: design?.preview || undefined,
        designFile: design?.file?.name || undefined,
      }
    })

    // Find primary design for fallback compatibility
    const firstDesignWithPreview = Object.values(designsByLocation).find(
      (d) => d.preview
    )

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
      printLocations: selectedPlacementLabels,
      designUrl: firstDesignWithPreview?.preview || undefined,
      designFile: firstDesignWithPreview?.file?.name || undefined,
      locationDesigns,
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
    selectedPlacementIds,
    selectedPlacementLabels,
    designsByLocation,
    shipping,
    addItem,
    router,
  ])

  const borderColor =
    color === "#FFFFFF" || color === "#808080" ? "#d4d4d4" : color

  const currentLocationDesign = designsByLocation[currentActiveTargetId]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Custom Apparel Builder
          </h1>
          <p className="mt-2 text-neutral-500">
            Select your print locations and upload unique photos for each placement!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left Column - Live Preview with Garment View Angle Tabs */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                
                {/* View Switcher Header Tabs */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Garment View Angle
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {COLOR_OPTIONS.find((c) => c.hex === color)?.name} &middot; {size}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 rounded-xl bg-neutral-100 p-1">
                    {(
                      [
                        { id: "FRONT", label: "Front" },
                        { id: "BACK", label: "Back" },
                        { id: "LEFT_SLEEVE", label: "L. Sleeve" },
                        { id: "RIGHT_SLEEVE", label: "R. Sleeve" },
                      ] as { id: GarmentView; label: string }[]
                    ).map((tab) => {
                      const isActive = activeView === tab.id
                      const hasPlacementInView = PLACEMENT_PRESETS.some(
                        (p) => p.view === tab.id && selectedPlacementIds.includes(p.id)
                      )
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveView(tab.id)
                            const matchingPreset = PLACEMENT_PRESETS.find(
                              (p) => p.view === tab.id && selectedPlacementIds.includes(p.id)
                            )
                            if (matchingPreset) setActiveTargetId(matchingPreset.id)
                          }}
                          className={`relative rounded-lg py-1.5 text-xs font-semibold transition-all ${
                            isActive
                              ? "bg-white text-black shadow-sm"
                              : "text-neutral-500 hover:text-black"
                          }`}
                        >
                          {tab.label}
                          {hasPlacementInView && (
                            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-black" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* SVG Live Canvas Container */}
                <div className="relative flex aspect-[3/4] items-center justify-center rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200">
                  <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                    <RenderGarmentSVG
                      type={apparelType}
                      view={activeView}
                      color={color}
                      borderColor={borderColor}
                    />

                    {/* Render all selected placement bounding boxes and images for the current active view */}
                    {presetsInActiveView.map((preset) => {
                      const design = designsByLocation[preset.id]
                      const isTargeted = preset.id === currentActiveTargetId
                      const scale = design?.scale || 1.0

                      return (
                        <div
                          key={preset.id}
                          onClick={() => setActiveTargetId(preset.id)}
                          className={`absolute transition-all duration-300 flex items-center justify-center cursor-pointer ${
                            isTargeted
                              ? "border-2 border-dashed border-black/80 bg-black/10 z-20 shadow-sm"
                              : "border border-dashed border-black/30 bg-black/5 z-10"
                          } rounded-md`}
                          style={{
                            left: `${preset.xPercent}%`,
                            top: `${preset.yPercent}%`,
                            width: `${preset.baseWidthPercent * scale}%`,
                            height: `${preset.baseHeightPercent * scale}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {design?.preview ? (
                            <img
                              src={design.preview}
                              alt={preset.label}
                              className="max-h-full max-w-full object-contain drop-shadow-md"
                            />
                          ) : (
                            <span
                              className={`text-[9px] font-semibold px-1 py-0.5 rounded text-center leading-tight ${
                                isTargeted
                                  ? "bg-black text-white"
                                  : "bg-white/80 text-neutral-600"
                              }`}
                            >
                              {preset.label}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Active Target Scale Control */}
                {currentLocationDesign?.preview && (
                  <div className="mt-4 rounded-xl bg-neutral-50 p-3 border border-neutral-200">
                    <div className="flex justify-between text-xs font-medium text-neutral-600 mb-1.5">
                      <span>
                        Photo Size ({activeTargetPreset?.category} - {activeTargetPreset?.label})
                      </span>
                      <span>{Math.round((currentLocationDesign.scale || 1.0) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.05"
                      value={currentLocationDesign.scale || 1.0}
                      onChange={(e) =>
                        updateScaleForLocation(
                          currentActiveTargetId,
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full accent-black cursor-pointer"
                    />
                  </div>
                )}

                {/* Selected Placements Summary Badge List */}
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Selected Placements &amp; Images ({selectedPlacementIds.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPlacementIds.map((id) => {
                      const preset = PLACEMENT_PRESETS.find((p) => p.id === id)
                      const hasImage = !!designsByLocation[id]?.preview
                      const isTargeted = id === currentActiveTargetId
                      return (
                        <button
                          key={id}
                          onClick={() => {
                            setActiveTargetId(id)
                            if (preset) setActiveView(preset.view)
                          }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
                            isTargeted
                              ? "bg-black text-white ring-2 ring-offset-1 ring-black"
                              : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                          }`}
                        >
                          <span>
                            {preset?.category} ({preset?.label})
                          </span>
                          <span
                            className={`h-2 w-2 rounded-full ${
                              hasImage ? "bg-green-400" : "bg-amber-400"
                            }`}
                            title={hasImage ? "Image uploaded" : "No image uploaded yet"}
                          />
                        </button>
                      )
                    })}
                  </div>
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

            {/* Print Placements (Front, Back, Sleeves) */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Select Print Locations
                </h2>
                <span className="text-xs font-semibold text-neutral-500">
                  1st included, +${EXTRA_PRINT_COST.toFixed(0)} each extra
                </span>
              </div>
              <p className="text-xs text-neutral-500 mb-4">
                Select one or more print locations on your garment.
              </p>

              <div className="space-y-4">
                {(["Front", "Back", "Left Sleeve", "Right Sleeve"] as const).map(
                  (cat) => {
                    const presetsForCat = PLACEMENT_PRESETS.filter(
                      (p) => p.category === cat
                    )
                    return (
                      <div
                        key={cat}
                        className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-black uppercase tracking-wider">
                            {cat} Locations
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {presetsForCat.map((preset) => {
                            const isChecked = selectedPlacementIds.includes(
                              preset.id
                            )
                            const isTargeted = preset.id === currentActiveTargetId
                            const hasImage = !!designsByLocation[preset.id]?.preview

                            return (
                              <button
                                key={preset.id}
                                onClick={() => handleTogglePreset(preset)}
                                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left transition-all ${
                                  isTargeted && isChecked
                                    ? "border-black bg-white shadow-md ring-2 ring-black"
                                    : isChecked
                                    ? "border-black bg-white shadow-sm"
                                    : "border-neutral-200 bg-white hover:border-neutral-300"
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <div
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                                      isChecked
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-300 bg-white"
                                    }`}
                                  >
                                    {isChecked && (
                                      <svg
                                        className="h-3 w-3"
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
                                  <span className="text-xs font-semibold text-neutral-900 truncate">
                                    {preset.label}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 ml-1 shrink-0">
                                  {hasImage && (
                                    <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[9px] font-bold text-green-700">
                                      Photo Added
                                    </span>
                                  )}
                                  {isChecked && (
                                    <span className="text-[10px] font-medium text-neutral-500">
                                      {selectedPlacementIds[0] === preset.id
                                        ? "Primary"
                                        : `+$${EXTRA_PRINT_COST}`}
                                    </span>
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </section>

            {/* Per-Location Multi-Image Upload Manager */}
            <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-900">
                  Upload Photo for Location
                </h2>
                <span className="text-xs font-semibold text-black bg-neutral-100 px-2 py-1 rounded-md">
                  {activeTargetPreset?.category} &middot; {activeTargetPreset?.label}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mb-4">
                Select which location you are uploading a photo for below:
              </p>

              {/* Location Target Selection Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPlacementIds.map((id) => {
                  const preset = PLACEMENT_PRESETS.find((p) => p.id === id)
                  const isSelected = id === currentActiveTargetId
                  const hasImage = !!designsByLocation[id]?.preview
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveTargetId(id)
                        if (preset) setActiveView(preset.view)
                      }}
                      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-black bg-black text-white shadow-sm"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-300"
                      }`}
                    >
                      <span>
                        {preset?.category} - {preset?.label}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          hasImage ? "bg-green-400" : "bg-amber-400"
                        }`}
                      />
                    </button>
                  )
                })}
              </div>

              {/* Upload Drop Zone for Active Location Target */}
              {currentLocationDesign?.preview ? (
                <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                  <img
                    src={currentLocationDesign.preview}
                    alt={activeTargetPreset?.label}
                    className="h-16 w-16 rounded-lg object-contain bg-white border border-neutral-200 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      {activeTargetPreset?.category} &middot; {activeTargetPreset?.label}
                    </p>
                    <p className="text-sm font-medium text-black truncate mt-0.5">
                      {currentLocationDesign.file?.name || "Uploaded Photo"}
                    </p>
                    {currentLocationDesign.file && (
                      <p className="text-xs text-neutral-400">
                        {(currentLocationDesign.file.size / 1024).toFixed(1)} KB
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeDesignForLocation(currentActiveTargetId)}
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
                    Upload photo for <span className="underline font-semibold">{activeTargetPreset?.category} ({activeTargetPreset?.label})</span>
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
                Shipping Option
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
                      Extra placements ({additionalPrintsCount} &times; ${EXTRA_PRINT_COST.toFixed(0)})
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
              className="w-full rounded-xl bg-black py-4 text-base font-semibold text-white transition-all duration-150 hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
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
                "Add Custom Garment to Cart"
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

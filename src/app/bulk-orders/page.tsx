"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

type Status = "idle" | "submitting" | "success" | "error";

interface SizeQty {
  S: number;
  M: number;
  L: number;
  XL: number;
}

export default function BulkOrdersPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [apparelType, setApparelType] = useState("");
  const [quantity, setQuantity] = useState<number>(10);
  const [sizes, setSizes] = useState<SizeQty>({ S: 0, M: 0, L: 0, XL: 0 });
  const [colors, setColors] = useState<string[]>([]);
  const [numberOfPrints, setNumberOfPrints] = useState(1);
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [desiredDate, setDesiredDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const availableColors = ["Black", "White", "Gray", "Navy"];

  function toggleColor(color: string) {
    setColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  }

  function updateSize(size: keyof SizeQty, value: string) {
    const num = parseInt(value, 10);
    setSizes((prev) => ({
      ...prev,
      [size]: isNaN(num) || num < 0 ? 0 : num,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const payload = {
      name,
      email,
      phone,
      business,
      apparelType,
      quantity,
      sizes: Object.entries(sizes)
        .filter(([, qty]) => qty > 0)
        .map(([size, qty]) => `${size}:${qty}`)
        .join(", "),
      colors: colors.join(", "),
      numberOfPrints,
      desiredDate: desiredDate || undefined,
      additionalInfo,
    };

    try {
      const res = await fetch("/api/bulk-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white">
        <section className="mx-auto max-w-3xl px-6 pt-24 pb-20 lg:px-8">
          <div className="rounded-2xl border border-neutral-200 p-10 text-center sm:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <h1 className="mt-6 text-2xl font-bold text-black">
              Quote Request Received
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
              We&apos;ve received your bulk order request and will review it
              shortly. Expect a custom quote in your inbox within 1–2 business
              days.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Bulk Orders
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Request a Quote
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-500">
          Ordering 10 or more pieces? Fill out the form below and we&apos;ll
          send you a custom quote.
        </p>
      </section>

      {/* Process Steps */}
      <section className="border-y border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid gap-6 text-center sm:grid-cols-4">
            {[
              { step: "1", label: "Submit your request" },
              { step: "2", label: "We review & send a custom quote" },
              { step: "3", label: "Approve and pay" },
              { step: "4", label: "We create your order" },
            ].map((item, i) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-xs font-bold text-black">
                  {item.step}
                </div>
                <p className="mt-3 text-sm font-medium text-black">
                  {item.label}
                </p>
                {i < 3 && (
                  <div className="mt-4 hidden h-px w-full bg-neutral-200 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-3xl space-y-10"
        >
          {/* Pricing Reference */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starting prices", value: "T-Shirts $10 · Sweatshirts $20 · Hoodies $30" },
              { label: "Bulk minimum", value: "Quotes start at 10 pieces" },
              { label: "Response time", value: "Custom quote in 1–2 business days" },
            ].map((card) => (
              <div
                key={card.label}
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {card.label}
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-black">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm text-neutral-500">
            Looking for a single item instead?{" "}
            <Link
              href="/custom-apparel"
              className="font-medium text-accent underline underline-offset-2 hover:text-neutral-700"
            >
              Build one in the custom apparel studio →
            </Link>
          </p>
          <div className="h-px bg-neutral-100" />

          {/* Contact Info */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
              Contact Information
            </legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bo-name"
                  className="block text-sm font-medium text-black"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="bo-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                />
              </div>
              <div>
                <label
                  htmlFor="bo-email"
                  className="block text-sm font-medium text-black"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="bo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                />
              </div>
              <div>
                <label
                  htmlFor="bo-phone"
                  className="block text-sm font-medium text-black"
                >
                  Phone
                </label>
                <input
                  id="bo-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                />
              </div>
              <div>
                <label
                  htmlFor="bo-business"
                  className="block text-sm font-medium text-black"
                >
                  Business / Organization
                </label>
                <input
                  id="bo-business"
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                />
              </div>
            </div>
          </fieldset>

          {/* Apparel Details */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
              Apparel Details
            </legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bo-type"
                  className="block text-sm font-medium text-black"
                >
                  Apparel Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="bo-type"
                  required
                  value={apparelType}
                  onChange={(e) => setApparelType(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="TSHIRT">T-Shirt</option>
                  <option value="SWEATSHIRT">Sweatshirt</option>
                  <option value="HOODIE">Hoodie</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="bo-quantity"
                  className="block text-sm font-medium text-black"
                >
                  Total Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  id="bo-quantity"
                  type="number"
                  min={10}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 10)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                />
                <p className="mt-1 text-xs text-neutral-400">
                  Minimum 10 pieces
                </p>
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <p className="text-sm font-medium text-black">
                Sizes & Quantities <span className="text-red-500">*</span>
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(["S", "M", "L", "XL"] as const).map((size) => (
                  <div key={size}>
                    <label
                      htmlFor={`bo-size-${size}`}
                      className="block text-xs font-medium text-neutral-500"
                    >
                      {size}
                    </label>
                    <input
                      id={`bo-size-${size}`}
                      type="number"
                      min={0}
                      value={sizes[size]}
                      onChange={(e) => updateSize(size, e.target.value)}
                      className="mt-1 block w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-black outline-none transition-colors focus:border-black"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mt-6">
              <p className="text-sm font-medium text-black">
                Colors <span className="text-red-500">*</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {availableColors.map((color) => {
                  const selected = colors.includes(color);
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => toggleColor(color)}
                      className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-white text-black hover:border-neutral-400"
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prints */}
            <div className="mt-6">
              <label
                htmlFor="bo-prints"
                className="block text-sm font-medium text-black"
              >
                Number of Prints per Item{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="bo-prints"
                type="number"
                min={1}
                max={10}
                required
                value={numberOfPrints}
                onChange={(e) =>
                  setNumberOfPrints(parseInt(e.target.value, 10) || 1)
                }
                className="mt-2 block w-full max-w-xs rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
              />
            </div>
          </fieldset>

          {/* Design & Schedule */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
              Design & Schedule
            </legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="bo-design"
                  className="block text-sm font-medium text-black"
                >
                  Upload Design
                </label>
                <input
                  id="bo-design"
                  type="file"
                  accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
                  onChange={(e) => setDesignFile(e.target.files?.[0] ?? null)}
                  className="mt-2 block w-full text-sm text-neutral-500 file:mr-4 file:rounded-lg file:border file:border-neutral-200 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black file:transition-colors hover:file:border-black"
                />
                <p className="mt-1 text-xs text-neutral-400">
                  PNG, JPG, SVG, PDF, AI, or EPS
                </p>
              </div>
              <div>
                <label
                  htmlFor="bo-date"
                  className="block text-sm font-medium text-black"
                >
                  Desired Completion Date
                </label>
                <input
                  id="bo-date"
                  type="date"
                  value={desiredDate}
                  onChange={(e) => setDesiredDate(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                />
              </div>
            </div>
          </fieldset>

          {/* Additional Info */}
          <fieldset>
            <legend className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
              Additional Information
            </legend>
            <textarea
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Anything else we should know? Special requirements, logo placement, sizing notes..."
              className="mt-6 block w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
            />
          </fieldset>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
            >
              {status === "submitting"
                ? "Submitting..."
                : "Request Quote"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

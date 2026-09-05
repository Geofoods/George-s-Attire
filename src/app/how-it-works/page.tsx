import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works | George's Attire",
  description:
    "From choosing your apparel to delivery — see exactly how custom orders work at George's Attire.",
};

const steps = [
  {
    number: "01",
    title: "Choose Your Apparel",
    description:
      "Select from our premium t-shirts, sweatshirts, and hoodies. Pick your color and size.",
  },
  {
    number: "02",
    title: "Add Your Design",
    description:
      "Upload your artwork, choose your print locations (front, back, or sleeves), and see it live on your shirt.",
  },
  {
    number: "03",
    title: "Check Out",
    description:
      "Get an instant, transparent price. Check out securely and your order goes straight into production.",
  },
  {
    number: "04",
    title: "We Deliver",
    description:
      "We print, package, and ship your custom apparel right to your door — or check out the production steps below.",
  },
];

const processSteps = [
  {
    title: "Upload",
    description: "Send us your artwork, logo, or photo.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    title: "Prepare",
    description: "We check your file and prep it for printing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813 2.846a4.5 4.5 0 0 1-3.09 3.09L2.25 22.5M18.259 8.715 18.9 6.09l.641-2.625a4.5 4.5 0 0 1 3.09-3.09L24.375 0m-16.5 7.5 11.25-11.25M4.875 11.25l7.5-7.5 6.75 6.75-7.5 7.5a4.5 4.5 0 0 1-6.75 0Z" />
      </svg>
    ),
  },
  {
    title: "Print",
    description: "Your design is printed with premium quality.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Package",
    description: "Carefully folded and packed for safe delivery.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "Deliver",
    description: "Shipped to your door right across Canada.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Simple by Design
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
          How It Works
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
          Four easy steps from idea to doorstep — with transparent pricing the
          whole way.
        </p>
      </section>

      {/* Steps */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-neutral-200 bg-white p-8"
              >
                <span className="text-sm font-bold tracking-widest text-neutral-300">
                  {step.number}
                </span>
                <h2 className="mt-3 text-xl font-bold text-black">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              From Your Design to Your Shirt
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              The Production Process
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 text-black">
                  {step.icon}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-neutral-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-black">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing + CTA */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Clear pricing, up front
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-500">
            T-Shirts from $10, Sweatshirts from $20, Hoodies from $30 — with a
            calculator that shows the exact price before you order.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/custom-apparel"
              className="inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Start an Order
            </Link>
            <Link
              href="/bulk-orders"
              className="inline-flex h-11 items-center rounded-full border border-neutral-200 px-7 text-sm font-medium text-black transition-colors hover:border-black"
            >
              Request a Bulk Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
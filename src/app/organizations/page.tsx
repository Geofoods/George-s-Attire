import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom Apparel for Teams & Organizations | George's Attire",
  description:
    "Outfit your club, team, business, or event with custom apparel. Transparent bulk pricing, fast turnaround, and a dedicated quote process.",
};

const audiences = [
  {
    title: "School Clubs",
    description:
      "Graduation teams, student councils, spirit week, and club uniforms — apparel your whole group will be proud to wear.",
  },
  {
    title: "Sports Teams",
    description:
      "Pre-game layers, fan gear, and practice kits for teams of every size, from rec leagues to competitive programs.",
  },
  {
    title: "Businesses",
    description:
      "Staff uniforms, swag for clients and onboarding kits that keep your brand visible and professional.",
  },
  {
    title: "Events",
    description:
      "Merch for conferences, fundraisers, charity runs, and festivals — ordered once, delivered on time.",
  },
  {
    title: "Organizations",
    description:
      "Non-profits, churches, and community groups looking for quality apparel without the markup.",
  },
];

const bulkInfo = [
  {
    title: "Bulk pricing",
    description:
      "T-Shirts from $10, Sweatshirts from $20, Hoodies from $30 per piece. Volume pricing gets better with quantity.",
  },
  {
    title: "Minimum order",
    description: "Bulk quotes start at 10 pieces. Need more? We love those orders.",
  },
  {
    title: "Turnaround time",
    description:
      "Most bulk orders are quoted within 1–2 business days and produced in 1–2 weeks after approval.",
  },
  {
    title: "Available products",
    description: "T-Shirts, Sweatshirts, and Hoodies in a variety of colors.",
  },
  {
    title: "Sizes",
    description: "S, M, L, and XL with an XL surcharge of +$5 per piece.",
  },
  {
    title: "Printing options",
    description:
      "Print on the front, back, and sleeves. First print location included, +$3 per additional location.",
  },
  {
    title: "Delivery & pickup",
    description:
      "Free pickup available, or ship anywhere in Canada. Rush delivery available for time-sensitive events.",
  },
];

export default function OrganizationsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          For Organizations
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-6xl">
          Custom Apparel for Teams &amp; Organizations
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
          Outfit your club, team, business, or event with custom apparel.
          Transparent pricing, a simple quote process, and quality you can
          count on.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/bulk-orders"
            className="inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Request a Bulk Quote
          </Link>
          <Link
            href="/custom-apparel"
            className="inline-flex h-12 items-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-black transition-colors hover:border-accent"
          >
            Build a Single Item
          </Link>
        </div>
      </section>

      {/* Audiences */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Who We Serve
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              One partner for every kind of group
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-neutral-200 bg-white p-7"
              >
                <h3 className="text-lg font-semibold text-black">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {a.description}
                </p>
              </div>
            ))}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-black bg-black p-7 text-center">
              <h3 className="text-lg font-semibold text-white">
                Not sure where you fit?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                Talk to us — we&apos;ll help you figure out the right setup.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex h-10 items-center rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-neutral-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Info */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              No Surprises
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Everything you need to know
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bulkInfo.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200 bg-white p-7"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-neutral-200 bg-neutral-50 p-10 text-center">
            <h3 className="text-xl font-bold text-black sm:text-2xl">
              Ordering 50+ pieces?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              Send a quote request and we&apos;ll get back to you within 1–2
              business days with a custom, volume-priced quote.
            </p>
            <Link
              href="/bulk-orders"
              className="mt-6 inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Request a Bulk Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Transparent pricing */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Transparent Pricing
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              The same pricing, up front
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            {[
              { item: "T-Shirt", price: "$10" },
              { item: "Sweatshirt", price: "$20" },
              { item: "Hoodie", price: "$30" },
              { item: "Extra print location", price: "+$3" },
              { item: "XL size", price: "+$5" },
              { item: "Rush shipping", price: "+$5" },
            ].map((row, i) => (
              <div
                key={row.item}
                className={`flex items-center justify-between px-6 py-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-neutral-50"
                }`}
              >
                <span className="text-sm font-medium text-black">
                  {row.item}
                </span>
                <span className="text-sm font-semibold text-black">
                  {row.price} CAD
                </span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm text-neutral-500">
            Have a different budget in mind? Bulk orders receive volume
            pricing — request a quote and we&apos;ll find a way to make it work.
          </p>
        </div>
      </section>
    </div>
  );
}
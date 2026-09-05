import type { Metadata } from "next";
import Image from "next/image";
import photoMiles from "../../../photos/meandmileseom.webp";

export const metadata: Metadata = {
  title: "About | George's Attire",
  description:
    "Learn about George's Attire — custom apparel made your way, right here in Canada.",
};

const values = [
  {
    title: "Quality",
    description:
      "Every garment is crafted with premium materials and meticulous attention to detail. We never cut corners — because your brand deserves the best.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-7 w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    title: "Customization",
    description:
      "From single tees to full-team outfits, every order is built around your vision. Choose your colors, designs, and prints — we bring them to life.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-7 w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    title: "Customer Service",
    description:
      "We're a small team that cares. From your first inquiry to the moment your order arrives, we're here to make the process effortless.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-7 w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
        />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Our Story
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
          About George&apos;s Attire
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
          Custom Apparel Made Your Way
        </p>
      </section>

      {/* Story */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                Built on craft, driven by you.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-500">
                <p>
                  George&apos;s Attire was born from a simple idea: everyone
                  deserves access to high-quality custom apparel without the
                  hassle. Based in Canada, we work with individuals, teams, and
                  businesses who want their clothing to reflect who they are.
                </p>
                <p>
                  Whether you need a single personalized tee or five hundred
                  hoodies for your organization, we handle every order with the
                  same care and precision. Our process is straightforward — you
                  bring the vision, we handle the rest.
                </p>
                <p>
                  We believe custom apparel should feel premium, look sharp, and
                  be accessible. That&apos;s what we deliver.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={photoMiles}
                  alt="George's Attire team"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              What We Stand For
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Our Values
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-neutral-200 bg-white p-8 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 text-black">
                  {value.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-black">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-500">
            Browse our shop or request a custom quote — we&apos;re here to help
            bring your ideas to life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/shop"
              className="inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="inline-flex h-11 items-center rounded-full border border-neutral-200 px-7 text-sm font-medium text-black transition-colors hover:border-accent"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

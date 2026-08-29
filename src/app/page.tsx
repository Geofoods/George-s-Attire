import Link from "next/link";
import QuoteCalculator from "@/components/QuoteCalculator";

const pricingRows = [
  { item: "T-Shirt", price: "$10" },
  { item: "Sweatshirt", price: "$20" },
  { item: "Hoodie", price: "$30" },
  { item: "Extra print location", price: "+$3" },
  { item: "XL size", price: "+$5" },
  { item: "Rush shipping", price: "+$5" },
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

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-32 pb-28 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Custom Apparel
        </p>
        <h1 className="mt-6 text-5xl font-bold uppercase tracking-[0.15em] text-black sm:text-7xl">
          George&apos;s Attire
        </h1>
        <p className="mt-6 text-xl font-medium tracking-wide text-black">
          Custom Apparel Made Your Way
        </p>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-neutral-500">
          Premium quality custom clothing, designed and created just for you.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Shop Apparel
          </Link>
          <Link
            href="/custom-apparel"
            className="inline-flex h-12 items-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-black transition-colors hover:border-black"
          >
            Create Custom Apparel
          </Link>
          <Link
            href="/organizations"
            className="inline-flex h-12 items-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-black transition-colors hover:border-black"
          >
            For Organizations
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Featured
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Popular Products
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {/* T-Shirt */}
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="flex h-64 items-center justify-center rounded-t-2xl bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="h-20 w-20 text-neutral-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM8.25 21h7.5M12 3.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.168.78.44 1.052l1.81 1.81a2.25 2.25 0 0 1 .659 1.591V21h4.5v-2.544c0-.637.236-1.246.659-1.591l1.81-1.81a1.501 1.501 0 0 0 .44-1.052A2.25 2.25 0 0 0 12 3.75Z"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-black">
                  Custom T-Shirt
                </h3>
                <p className="mt-1 text-sm text-neutral-500">From</p>
                <p className="mt-1 text-lg font-bold text-black">$10 CAD</p>
                <Link
                  href="/custom-apparel?product=TSHIRT"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Customize
                </Link>
              </div>
            </div>

            {/* Sweatshirt */}
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="flex h-64 items-center justify-center rounded-t-2xl bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="h-20 w-20 text-neutral-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM8.25 21h7.5M12 3.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.168.78.44 1.052l1.81 1.81a2.25 2.25 0 0 1 .659 1.591V21h4.5v-2.544c0-.637.236-1.246.659-1.591l1.81-1.81a1.501 1.501 0 0 0 .44-1.052A2.25 2.25 0 0 0 12 3.75Z"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-black">
                  Custom Sweatshirt
                </h3>
                <p className="mt-1 text-sm text-neutral-500">From</p>
                <p className="mt-1 text-lg font-bold text-black">$20 CAD</p>
                <Link
                  href="/custom-apparel?product=SWEATSHIRT"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Customize
                </Link>
              </div>
            </div>

            {/* Hoodie */}
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="flex h-64 items-center justify-center rounded-t-2xl bg-neutral-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="h-20 w-20 text-neutral-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5ZM8.25 21h7.5M12 3.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.168.78.44 1.052l1.81 1.81a2.25 2.25 0 0 1 .659 1.591V21h4.5v-2.544c0-.637.236-1.246.659-1.591l1.81-1.81a1.501 1.501 0 0 0 .44-1.052A2.25 2.25 0 0 0 12 3.75Z"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-black">
                  Custom Hoodie
                </h3>
                <p className="mt-1 text-sm text-neutral-500">From</p>
                <p className="mt-1 text-lg font-bold text-black">$30 CAD</p>
                <Link
                  href="/custom-apparel?product=HOODIE"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Customize
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing + Quote Calculator */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Transparent Pricing
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              Know your price before you order
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              No hidden fees. Use the calculator to estimate your order in
              seconds.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
                {pricingRows.map((row, i) => (
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
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                First print location is included on every item. Pricing is
                identical on the custom apparel builder — what you see here is
                what you pay.
              </p>
            </div>
            <QuoteCalculator />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Simple Process
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              How It Works
            </h2>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 text-lg font-bold text-black">
                1
              </div>
              <h3 className="mt-5 text-lg font-semibold text-black">
                Choose Your Apparel
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                Select from our range of premium t-shirts, sweatshirts, and
                hoodies. Pick your size, color, and style.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 text-lg font-bold text-black">
                2
              </div>
              <h3 className="mt-5 text-lg font-semibold text-black">
                Add Your Design
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                Upload your artwork or work with us to create something unique.
                Choose your print locations and preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 text-lg font-bold text-black">
                3
              </div>
              <h3 className="mt-5 text-lg font-semibold text-black">
                We Create &amp; Ship
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                We craft your custom apparel with care and ship it directly to
                your door. Premium quality, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
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

      {/* Organizations Banner */}
      <section className="border-t border-neutral-100 bg-black">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Teams, Clubs & Businesses
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ordering for a group?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-neutral-400">
            Get bulk pricing, dedicated quotes, and on-time delivery for your
            school, team, business, or event.
          </p>
          <Link
            href="/organizations"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Explore Organizations
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
              Testimonials
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black sm:text-3xl">
              What customers are saying
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                quote:
                  "Your first review goes right here. Tell the world what you loved about your custom gear.",
                author: "Your name goes here",
              },
              {
                quote:
                  "Your first review goes right here. Tell the world what you loved about your custom gear.",
                author: "Your name goes here",
              },
              {
                quote:
                  "Your first review goes right here. Tell the world what you loved about your custom gear.",
                author: "Your name goes here",
              },
            ].map((t) => (
              <figure
                key={t.author}
                className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-8 w-8 text-neutral-200"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <blockquote className="mt-4 text-sm leading-relaxed text-neutral-600">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-400">
                  — {t.author}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-neutral-500">
            Just got your order?{" "}
            <Link
              href="/contact"
              className="font-medium text-black underline underline-offset-2 hover:text-neutral-700"
            >
              Share your review
            </Link>{" "}
            and you could be featured here.
          </p>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Ready to create something?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-500">
            Bring your vision to life with premium custom apparel, designed and
            crafted just for you.
          </p>
          <Link
            href="/custom-apparel"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Start Designing
          </Link>
        </div>
      </section>
    </div>
  );
}
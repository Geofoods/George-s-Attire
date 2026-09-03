import Link from "next/link";
import QuoteCalculator from "@/components/QuoteCalculator";
import Image from "next/image";
import blackShirt from "../../shirts/black.webp";
import blackSweatshirt from "../../sweatshirts/black.webp";
import blackHoodie from "../../hoddies/black.jpg";
import photo1908 from "../../photos/IMG_1908 (1).webp";
import photoMiles from "../../photos/meandmileseom.webp";
import photoUnnamed3 from "../../photos/unnamed (3).webp";
import photoRemoveBg from "../../photos/unnamed__1_-removebg-preview (1) (1).webp";
import photoTransformed from "../../photos/unnamed_(2)-aRGsShNkV-transformed.png";
import photo2427 from "../../photos/IMG_2427.jpg";

const REVIEWS_URL = "https://g.page/r/CXtdMKndtrHkEAE/review";

const reviews = [
  {
    quote:
      "Incredible experience from start to finish — I'd recommend George's Attire without hesitation.",
    author: "Theodore Short",
    image: photo1908,
    imageAlt: "Custom printed t-shirt from George's Attire",
  },
  {
    quote:
      "Excellent customer service, and my shirt came out looking great.",
    author: "Miles Wang",
    image: photoMiles,
    imageAlt: "Printed shirt from George's Attire",
  },
  {
    quote:
      "My hoodie was warm, looked great, and the quality was excellent.",
    author: "Amir Ishkaev",
    image: photoUnnamed3,
    imageAlt: "Custom printed shirt from George's Attire",
  },
  {
    quote:
      "Great quality that was absolutely worth the wait — I'd order again in a heartbeat.",
    author: "Alvin Tan",
    image: photoRemoveBg,
    imageAlt: "Printed apparel from George's Attire",
  },
  {
    quote:
      "Very good and friendly customer service, from the first message to delivery.",
    author: "Avik Joshi",
    image: photoTransformed,
    imageAlt: "Custom printed shirt from George's Attire",
  },
  {
    quote:
      "The best clothes ever — quality you can feel the moment you put them on.",
    author: "Arush Shrivastava",
    image: photo2427,
    imageAlt: "Custom printed shirt from George's Attire",
  },
];

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
        <Image
          src="/georgeattire-logo.png"
          alt="George's Attire logo"
          width={160}
          height={160}
          className="mx-auto h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
          priority
        />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
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
              <div className="relative h-64 overflow-hidden rounded-t-2xl bg-white">
                <Image
                  src={blackShirt}
                  alt="Black custom t-shirt"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain p-6 mix-blend-multiply"
                />
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
              <div className="relative h-64 overflow-hidden rounded-t-2xl bg-white">
                <Image
                  src={blackSweatshirt}
                  alt="Black custom sweatshirt"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain p-6 mix-blend-multiply"
                />
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
              <div className="relative h-64 overflow-hidden rounded-t-2xl bg-white">
                <Image
                  src={blackHoodie}
                  alt="Black custom hoodie"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain p-6 mix-blend-multiply"
                />
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
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-black px-7 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Leave a Review
              </a>
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full border border-neutral-200 px-7 text-sm font-medium text-black transition-colors hover:border-black"
              >
                See Reviews on Google
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.author}
                className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white"
              >
                {review.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={review.image}
                      alt={review.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-xs font-medium uppercase tracking-wide text-neutral-400">
                    — {review.author} · Verified Google review
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-neutral-500">
            Just got your order?{" "}
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-black underline underline-offset-2 hover:text-neutral-700"
            >
              Share your review on Google
            </a>{" "}
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
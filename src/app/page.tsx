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
          <a
            href="/shop"
            className="inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Shop Apparel
          </a>
          <a
            href="/custom-apparel"
            className="inline-flex h-12 items-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-black transition-colors hover:border-black"
          >
            Create Custom Apparel
          </a>
          <a
            href="/bulk-orders"
            className="inline-flex h-12 items-center rounded-full border border-neutral-200 px-8 text-sm font-medium text-black transition-colors hover:border-black"
          >
            Bulk Orders
          </a>
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
                <a
                  href="/custom-apparel?product=TSHIRT"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Customize
                </a>
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
                <a
                  href="/custom-apparel?product=SWEATSHIRT"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Customize
                </a>
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
                <a
                  href="/custom-apparel?product=HOODIE"
                  className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  Customize
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-neutral-100">
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

      {/* CTA Banner */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Ready to create something?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-500">
            Bring your vision to life with premium custom apparel, designed and
            crafted just for you.
          </p>
          <a
            href="/custom-apparel"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Start Designing
          </a>
        </div>
      </section>
    </div>
  );
}

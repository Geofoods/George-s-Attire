import Link from "next/link";
import Image from "next/image";

const shopLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/custom-apparel?product=TSHIRT", label: "T-Shirts" },
  { href: "/custom-apparel?product=SWEATSHIRT", label: "Sweatshirts" },
  { href: "/custom-apparel?product=HOODIE", label: "Hoodies" },
];

const businessLinks = [
  { href: "/organizations", label: "Organizations" },
  { href: "/bulk-orders", label: "Bulk Orders" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/custom-apparel", label: "Start an Order" },
];

const supportLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/contact", label: "FAQ" },
  { href: "/contact", label: "Shipping & Returns" },
];

const REVIEWS_URL = "https://g.page/r/CXtdMKndtrHkEAE/review";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/georgeattire-logo.png"
                alt="George's Attire logo"
                width={80}
                height={80}
                className="h-14 w-14 rounded-full object-cover"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              Custom apparel made your way. T-shirts, sweatshirts, and hoodies
              designed by you and printed in Canada with care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Business
            </h3>
            <ul className="mt-4 space-y-3">
              {businessLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {year} George&apos;s Attire. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href={REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
            >
              Leave a Review
            </a>
            <p className="text-sm text-neutral-500">Made in Canada</p>
            <Link
              href="/terms"
              className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
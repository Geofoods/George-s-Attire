import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | George's Attire",
  description: "The cookies and browser storage used by George's Attire.",
};

export default function CookiesPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">Site technology</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">Cookie Policy</h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-500">
          George&apos;s Attire currently uses only technologies needed to operate
          accounts, security, checkout, and the shopping experience.
        </p>
        <p className="mt-3 text-sm text-neutral-400">Effective date: September 11, 2026</p>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-3xl space-y-10 px-6 py-16 lg:px-8">
          <div>
            <h2 className="text-lg font-bold text-black">Essential cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Authentication and security cookies from NextAuth are required for
              sign-in and account features. Without them, protected account and
              order pages cannot work. These are not used for advertising.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Browser storage</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              The cart may use browser storage to remember items while you shop.
              This is functional storage, not analytics or advertising tracking.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Stripe checkout</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              When you continue to payment, Stripe may set or read cookies and
              similar technologies on its checkout experience. Stripe controls
              those technologies under its own privacy and cookie policies.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">No optional tracking today</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              We do not currently use Google Analytics, advertising pixels,
              behavioral analytics, or embedded social/video players. Because
              there are no optional trackers to activate, this site does not
              display a consent banner today. If that changes, we will update
              this policy and add an appropriate choice mechanism before using
              non-essential tracking where consent is required.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Managing storage</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              You can clear cookies and browser storage through your browser
              settings. Clearing essential storage may sign you out or remove
              your cart. Questions can be sent to{" "}
              <a className="font-medium text-black underline underline-offset-2" href="mailto:georgesunreal@gmail.com">
                georgesunreal@gmail.com
              </a>.
            </p>
          </div>
          <p className="text-sm text-neutral-500">
            See the <Link className="font-medium text-black underline underline-offset-2" href="/privacy">Privacy Policy</Link> for information handling and the <Link className="font-medium text-black underline underline-offset-2" href="/terms">Terms of Service</Link> for use of the site.
          </p>
        </div>
      </section>
    </div>
  );
}

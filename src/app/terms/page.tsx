import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | George's Attire",
  description:
    "The terms and conditions that govern your use of George's Attire and our custom apparel services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the George's Attire website and placing an order, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, please do not use our website or services.",
  },
  {
    title: "2. Products & Custom Apparel",
    body: "All apparel is custom-made to your specifications. Since every order is produced specifically for you, colors, prints, and products may vary slightly from what is displayed on screen due to differences in screen calibration and production processes. We make every effort to accurately represent our products but cannot guarantee exact color matching.",
  },
  {
    title: "3. Orders & Payment",
    body: "Prices are listed in Canadian dollars (CAD) unless otherwise stated. By placing an order, you agree to pay all charges associated with it, including taxes and shipping. We reserve the right to refuse or cancel any order at our discretion, including orders that contain errors or suspected fraudulent activity.",
  },
  {
    title: "4. Artwork & Content",
    body: "You confirm that you own or have the rights to any artwork, logos, or images you submit. You agree not to upload content that infringes on the intellectual property rights of others, is unlawful, or violates the rights of any third party. George's Attire is not responsible for any designs you submit, and you assume full responsibility for their legality.",
  },
  {
    title: "5. Custom Order Cancellations & Changes",
    body: "Because every item is made to order, once production begins your order cannot be cancelled, changed, or refunded. If you need to make changes, please contact us as soon as possible before your order enters production. We will make every effort to accommodate requests received prior to production.",
  },
  {
    title: "6. Shipping & Delivery",
    body: "Production and shipping times are estimates and may change. We are not responsible for delays caused by carriers, customs, or events outside our control. Please contact us promptly about delivery problems so we can investigate with the carrier.",
  },
  {
    title: "7. No Returns or Refunds",
    body: "Custom items may not be eligible for return because they are made to your specifications. Nothing in this section limits any mandatory consumer rights or remedies that apply under the law. If an item arrives defective, damaged, or materially different from the order, contact us promptly so we can review the issue and provide any remedy required by law.",
  },
  {
    title: "8. Intellectual Property",
    body: "Content on this website, including text, graphics, logos, photographs, and software, is owned by George's Attire or used with permission and may be protected by copyright and trademark laws. You may not reproduce, distribute, or use it without permission from the applicable rights holder.",
  },
  {
    title: "9. Limitation of Liability",
    body: "To the maximum extent permitted by law, George's Attire shall not be liable for any indirect, incidental, special, or consequential damages arising out of or related to your use of our website or services.",
  },
  {
    title: "10. Governing Law",
    body: "These Terms of Service are governed by the laws of Canada and the Province of Ontario, without regard to conflict of law principles. Any disputes arising from these terms or your use of our services shall be resolved in the courts of Ontario.",
  },
  {
    title: "11. Changes to These Terms",
    body: "We may update these Terms of Service from time to time. Any changes will be posted on this page with a revised effective date. Your continued use of the website after changes are posted constitutes acceptance of the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Legalese, Explained
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500">
          The fine print behind George&apos;s Attire read on to understand
          what to expect when ordering with us.
        </p>
        <p className="mt-3 text-sm text-neutral-400">
          Effective date: September 11, 2026
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-5 text-center sm:px-8">
          <h2 className="text-base font-bold text-black">
            Custom order policy
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Custom items may not be eligible for return because they are made
            to your specifications. Any mandatory consumer rights still apply.
            Contact us promptly if an item is defective, damaged, or materially
            different from your order.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-10 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-5 text-sm leading-relaxed text-neutral-600 sm:px-8">
          <p className="font-semibold text-black">Business contact</p>
          <p className="mt-2">George&apos;s Attire, Canada</p>
          <p>georgesunreal@gmail.com | 613 619 5185</p>
          <p className="mt-3 text-xs text-neutral-500">
            These terms are general information and are not legal advice. Have
            them reviewed for your business, location, products, and consumer
            obligations before relying on them.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-bold tracking-tight text-black">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-8 text-center">
            <h2 className="text-xl font-bold tracking-tight text-black">
              Have a question?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              We&apos;re happy to clarify any of these terms just reach out
              and we&apos;ll help.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
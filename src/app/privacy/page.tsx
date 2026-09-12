import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | George's Attire",
  description: "How George's Attire collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect only information needed to provide the service: name, email address, phone number when provided, shipping address, account credentials, order and quote details, messages sent through the contact form, and artwork or files you choose to upload. Payment card details are entered directly with Stripe; we do not store full card numbers.",
  },
  {
    title: "How we use information",
    body: "We use information to create and manage accounts, process orders and payments, prepare quotes, communicate about requests and orders, deliver products, prevent fraud and abuse, provide customer support, and meet legal or accounting obligations. We do not currently use analytics, advertising trackers, or personal information for targeted advertising.",
  },
  {
    title: "Service providers",
    body: "We use service providers needed to operate the site. Stripe processes checkout payments. Our email delivery provider sends contact messages. Our hosting, database, and authentication providers may process information required to run the site. These providers may process information outside your province or Canada and are expected to protect it under their own terms and privacy practices.",
  },
  {
    title: "Uploaded artwork",
    body: "Files you upload are stored so we can create your order or review your quote. Uploaded design URLs may be accessible to anyone who obtains the URL. Do not upload confidential information, government identifiers, or artwork you are not authorized to use. We are reviewing storage access and deletion controls as part of our ongoing security work.",
  },
  {
    title: "Cookies and similar technologies",
    body: "The site uses essential cookies, including authentication and security session cookies, to support sign-in and account features. The cart may also use browser storage to keep items you selected. We do not currently set optional analytics or advertising cookies. See our Cookie Policy for more detail.",
  },
  {
    title: "Disclosure and retention",
    body: "We disclose information only to service providers, payment and delivery partners, professional advisers, or authorities where needed to provide the service, protect the site, or comply with law. We keep information only as long as reasonably necessary for these purposes, including tax, accounting, dispute, and security needs. Exact retention periods are not yet configured for every record type.",
  },
  {
    title: "Your choices and access requests",
    body: "You may ask what personal information we hold about you, request correction, or ask about deletion where the law allows. Some information must be kept to complete an order or meet legal obligations. Contact us at georgesunreal@gmail.com and include enough information for us to identify your request. We may need to verify your identity before responding.",
  },
  {
    title: "Children",
    body: "The site is not directed to children under 13. Do not submit a child’s personal information unless you are authorized to do so.",
  },
  {
    title: "Changes and contact",
    body: "We may update this policy when our services or legal obligations change. The effective date below will be updated when changes are made. Questions or privacy requests can be sent to georgesunreal@gmail.com or 613 619 5185.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Your Information
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-neutral-500">
          This policy explains how George&apos;s Attire handles information when
          you browse, contact us, request a quote, create an account, or place
          an order.
        </p>
        <p className="mt-3 text-sm text-neutral-400">Effective date: September 11, 2026</p>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-3xl space-y-10 px-6 py-16 lg:px-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold tracking-tight text-black">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">{section.body}</p>
            </div>
          ))}
          <div className="border-t border-neutral-200 pt-8 text-sm text-neutral-600">
            <p className="font-semibold text-black">Business contact</p>
            <p className="mt-2">George&apos;s Attire</p>
            <p>Canada</p>
            <p>
              <a className="underline underline-offset-2" href="mailto:georgesunreal@gmail.com">
                georgesunreal@gmail.com
              </a>
              {" "}| 613 619 5185
            </p>
          </div>
          <p className="text-sm text-neutral-500">
            Read the <Link className="font-medium text-black underline underline-offset-2" href="/cookies">Cookie Policy</Link> and <Link className="font-medium text-black underline underline-offset-2" href="/terms">Terms of Service</Link> too.
          </p>
        </div>
      </section>
    </div>
  );
}

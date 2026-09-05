"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Get in Touch
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
            Have a question, want to place an order, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div className="rounded-2xl border border-neutral-200 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-7 w-7 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-black">
                  Message Sent
                </h2>
                <p className="mt-3 text-sm text-neutral-500">
                  Thanks for reaching out. We&apos;ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 inline-flex h-10 items-center rounded-full border border-neutral-200 px-6 text-sm font-medium text-black transition-colors hover:border-accent"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-neutral-200 p-8 sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-black"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-black"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2 block w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-black"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 block w-full resize-none rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-black outline-none transition-colors focus:border-black"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-600">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-8"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
                  Email
                </h3>
                <a
                  href="mailto:georgesunreal@gmail.com"
                  className="mt-2 block text-sm text-neutral-500 transition-colors hover:text-accent"
                >
                  georgesunreal@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
                  Phone
                </h3>
                <a
                  href="tel:+16136195185"
                  className="mt-2 block text-sm text-neutral-500 transition-colors hover:text-accent"
                >
                  613 619 5185
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
                  Social
                </h3>
                <div className="mt-3 flex gap-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-accent hover:text-accent"
                    aria-label="Instagram"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-accent hover:text-accent"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition-colors hover:border-accent hover:text-accent"
                    aria-label="TikTok"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.57a8.27 8.27 0 0 0 4.76 1.5V6.62a4.83 4.83 0 0 1-1-.07Z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                <h3 className="text-sm font-semibold text-black">
                  Looking for a bulk order?
                </h3>
                <p className="mt-2 text-sm text-neutral-500">
                  For orders of 10 or more, visit our dedicated bulk order page
                  for a streamlined quote process.
                </p>
                <a
                  href="/bulk-orders"
                  className="mt-4 inline-flex h-9 items-center rounded-full border border-neutral-200 px-5 text-xs font-medium text-black transition-colors hover:border-accent"
                >
                  Request a Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

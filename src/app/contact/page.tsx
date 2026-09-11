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
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8">
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

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useCartStore } from "@/lib/store"

const shopCategories = [
  { href: "/shop/tshirts", label: "T-Shirts" },
  { href: "/shop/sweatshirts", label: "Sweatshirts" },
  { href: "/shop/hoodies", label: "Hoodies" },
]

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/organizations", label: "Organizations" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const itemCount = useCartStore((s) => s.getItemCount())

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
    setShopOpen(false)
    setMobileShopOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
          scrolled ? "shadow-sm" : ""
        } border-b border-neutral-200`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/georgeattire-logo.png"
              alt="George's Attire logo"
              width={80}
              height={80}
              className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
            />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-base font-medium transition-colors duration-150 ${
                      active
                        ? "text-black"
                        : "text-neutral-500 hover:text-accent"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-[1px] h-0.5 bg-black" />
                    )}
                  </Link>
                </li>
              )
            })}
            <li className="relative">
              <button
                onClick={() => setShopOpen((o) => !o)}
                aria-expanded={shopOpen}
                aria-haspopup="true"
                className={`relative flex items-center gap-1 px-3 py-2 text-base font-medium transition-colors duration-150 ${
                  pathname.startsWith("/shop")
                    ? "text-black"
                    : "text-neutral-500 hover:text-accent"
                }`}
              >
                Shop
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`h-3 w-3 transition-transform duration-150 ${
                    shopOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
                {pathname.startsWith("/shop") && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-0.5 bg-black" />
                )}
              </button>
              {shopOpen && (
                <>
                  <button
                    aria-label="Close Shop menu"
                    onClick={() => setShopOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                    tabIndex={-1}
                  />
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg">
                      {shopCategories.map((cat) => {
                        const active = pathname === cat.href
                        return (
                          <Link
                            key={cat.href}
                            href={cat.href}
                            className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                              active
                                ? "bg-neutral-50 text-black"
                                : "text-neutral-600 hover:bg-neutral-50 hover:text-accent"
                            }`}
                          >
                            {cat.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/custom-apparel"
              className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-neutral-800 lg:inline-flex"
            >
              Start an Order
            </Link>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors duration-150 hover:bg-neutral-100 hover:text-accent"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold leading-none text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              className="hidden items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-accent hover:text-accent sm:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Account
            </Link>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors duration-150 hover:bg-neutral-100 hover:text-accent md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex h-16 items-center justify-between px-4 border-b border-neutral-200">
            <Link href="/" className="flex items-center">
              <Image
                src="/georgeattire-logo.png"
                alt="George's Attire logo"
                width={80}
                height={80}
                className="h-9 w-9 rounded-full object-cover"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-150 ${
                        active
                          ? "bg-neutral-100 text-black"
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-accent"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              <li>
                <button
                  onClick={() => setMobileShopOpen((o) => !o)}
                  aria-expanded={mobileShopOpen}
                  className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors duration-150 ${
                    pathname.startsWith("/shop")
                      ? "bg-neutral-100 text-black"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-accent"
                  }`}
                >
                  <span>Shop</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`h-4 w-4 transition-transform duration-150 ${
                      mobileShopOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {mobileShopOpen && (
                  <div className="mt-1 flex flex-col gap-1 pl-4">
                    {shopCategories.map((cat) => {
                      const active = pathname === cat.href
                      return (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-150 ${
                            active
                              ? "bg-neutral-100 text-black"
                              : "text-neutral-600 hover:bg-neutral-50 hover:text-accent"
                          }`}
                        >
                          {cat.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </li>
            </ul>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              <Link
                href="/account"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-50 hover:text-accent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Account
              </Link>
            </div>
          </div>

          <div className="border-t border-neutral-200 px-4 py-4">
            <Link
              href="/custom-apparel"
              className="mb-3 flex w-full items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-neutral-800"
            >
              Start an Order
            </Link>
            <Link
              href="/cart"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-neutral-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              View Cart{itemCount > 0 ? ` (${itemCount})` : ""}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

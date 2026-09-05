import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import blackShirt from "../../../shirts/black.webp";
import blackSweatshirt from "../../../sweatshirts/black.webp";
import blackHoodie from "../../../hoddies/black.jpg";

export const metadata = {
  title: "Shop | George's Attire",
  description:
    "Browse our collection of premium custom apparel t-shirts, sweatshirts, and hoodies made just for you.",
};

export const dynamic = "force-dynamic";

function ProductPlaceholder({ type }: { type: string }) {
  const image =
    type === "TSHIRT"
      ? blackShirt
      : type === "SWEATSHIRT"
        ? blackSweatshirt
        : blackHoodie;

  return (
    <div className="relative h-72 overflow-hidden rounded-t-2xl bg-white">
      <Image
        src={image}
        alt={`${type.toLowerCase()} apparel`}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-contain p-6 mix-blend-multiply"
      />
    </div>
  );
}

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Our Collection
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Shop
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
            Find your perfect custom apparel
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 p-16 text-center">
              <p className="text-sm text-neutral-500">
                No products available yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: Prisma.ProductGetPayload<object>) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-neutral-200 bg-white"
                >
                  <ProductPlaceholder type={product.type} />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-black">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-3 text-lg font-bold text-black">
                      ${(product.basePrice / 100).toFixed(0)} CAD
                    </p>
                    <a
                      href={`/custom-apparel?product=${product.type}`}
                      className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-white transition-colors hover:bg-accent/90"
                    >
                      Customize
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

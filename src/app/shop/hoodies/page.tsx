import ShopCategoryPage from "@/components/ShopCategoryPage";
import { ProductType } from "@prisma/client";

export const metadata = {
  title: "Hoodies | George's Attire",
  description:
    "Shop premium custom hoodies, designed and created just for you.",
};

export const dynamic = "force-dynamic";

export default function HoodiesPage() {
  return (
    <ShopCategoryPage
      eyebrow="Hoodies"
      title="Hoodies"
      description="Premium custom hoodies, made your way."
      type={ProductType.HOODIE}
    />
  );
}
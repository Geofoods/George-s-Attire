import ShopCategoryPage from "@/components/ShopCategoryPage";
import { ProductType } from "@prisma/client";

export const metadata = {
  title: "T-Shirts | George's Attire",
  description:
    "Shop custom t-shirts, designed and created just for you.",
};

export const dynamic = "force-dynamic";

export default function TShirtsPage() {
  return (
    <ShopCategoryPage
      eyebrow="T-Shirts"
      title="T-Shirts"
      description="Custom t-shirts, made your way."
      type={ProductType.TSHIRT}
    />
  );
}
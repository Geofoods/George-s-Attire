import ShopCategoryPage from "@/components/ShopCategoryPage";
import { ProductType } from "@prisma/client";

export const metadata = {
  title: "T-Shirts | George's Attire",
  description:
    "Shop premium custom t-shirts, designed and created just for you.",
};

export const dynamic = "force-dynamic";

export default function TShirtsPage() {
  return (
    <ShopCategoryPage
      eyebrow="T-Shirts"
      title="T-Shirts"
      description="Premium custom t-shirts, made your way."
      type={ProductType.TSHIRT}
    />
  );
}
import ShopCategoryPage from "@/components/ShopCategoryPage";
import { ProductType } from "@prisma/client";

export const metadata = {
  title: "Sweatshirts | George's Attire",
  description:
    "Shop custom sweatshirts, designed and created just for you.",
};

export const dynamic = "force-dynamic";

export default function SweatshirtsPage() {
  return (
    <ShopCategoryPage
      eyebrow="Sweatshirts"
      title="Sweatshirts"
      description="Custom sweatshirts, made your way."
      type={ProductType.SWEATSHIRT}
    />
  );
}
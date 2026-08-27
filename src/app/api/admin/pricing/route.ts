import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const configs = await prisma.pricingConfig.findMany();

    const defaults: Record<string, { value: number; description: string }> = {
      tshirt_base: { value: 1000, description: "T-Shirt base price (cents)" },
      sweatshirt_base: {
        value: 2000,
        description: "Sweatshirt base price (cents)",
      },
      hoodie_base: { value: 3000, description: "Hoodie base price (cents)" },
      extra_print: {
        value: 300,
        description: "Extra print charge per location (cents)",
      },
      xl_surcharge: { value: 500, description: "XL size surcharge (cents)" },
      standard_shipping: {
        value: 1200,
        description: "Standard shipping cost (cents)",
      },
      rush_shipping: {
        value: 1700,
        description: "Rush shipping cost (cents)",
      },
      tax_rate: { value: 1300, description: "Tax rate (basis points, 1300 = 13%)" },
    };

    for (const [key, def] of Object.entries(defaults)) {
      const existing = configs.find((c) => c.key === key);
      if (!existing) {
        await prisma.pricingConfig.create({
          data: { key, value: def.value, description: def.description },
        });
      }
    }

    const allConfigs = await prisma.pricingConfig.findMany();

    return NextResponse.json({ configs: allConfigs });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch pricing" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();

    const userId = (session?.user as { id?: string })?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const role = (session!.user as { role?: string }).role;
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { configs } = body as {
      configs: Array<{ key: string; value: number }>;
    };

    if (!Array.isArray(configs) || configs.length === 0) {
      return NextResponse.json(
        { error: "Configs array is required" },
        { status: 400 }
      );
    }

    for (const config of configs) {
      if (!config.key || typeof config.value !== "number") {
        return NextResponse.json(
          { error: "Each config must have a key and numeric value" },
          { status: 400 }
        );
      }
    }

    for (const config of configs) {
      await prisma.pricingConfig.upsert({
        where: { key: config.key },
        update: { value: config.value },
        create: { key: config.key, value: config.value },
      });
    }

    const updated = await prisma.pricingConfig.findMany();

    return NextResponse.json({ configs: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update pricing" },
      { status: 500 }
    );
  }
}

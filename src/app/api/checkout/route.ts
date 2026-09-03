import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import {
  calculateTotal,
  calculateBasePrice,
  calculateExtraPrintCost,
  calculateXlSurcharge,
  calculateShippingCost,
  calculateRushSurcharge,
} from "@/lib/pricing";
import { validateOrderInput, sanitizeString } from "@/lib/validations";
import { generateOrderNumber } from "@/lib/order-utils";

interface CartItemPayload {
  productId: string;
  productType: "TSHIRT" | "SWEATSHIRT" | "HOODIE";
  productName: string;
  size: string;
  color: string;
  quantity: number;
  numberOfExtraPrints: number;
  printLocations: string[];
  designUrl?: string;
  shippingMethod: "STANDARD" | "RUSH";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      items,
      customerInfo,
      shippingAddress,
      shippingMethod,
    } = body as {
      items: CartItemPayload[];
      customerInfo: { name: string; email: string; phone?: string };
      shippingAddress: string;
      shippingMethod: "STANDARD" | "RUSH";
    };

    const validation = validateOrderInput({
      customerName: customerInfo?.name,
      customerEmail: customerInfo?.email,
      customerPhone: customerInfo?.phone,
      shippingAddress,
      shippingMethod,
      items: items?.map((i) => ({
        productType: i.productType,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        numberOfExtraPrints: i.numberOfExtraPrints,
      })),
    });

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400 }
      );
    }

    const session = await getServerSession();

    let totalAmount = 0;
    let totalShipping = 0;
    let totalTax = 0;
    let totalRush = 0;

    const orderItems: Array<{
      productId: string;
      productName: string;
      productType: string;
      color: string;
      size: string;
      quantity: number;
      basePrice: number;
      extraPrintCharge: number;
      xlSurcharge: number;
      printLocations: string;
      customizations: string;
      designUrl?: string;
      stripePriceId: number;
    }> = [];

    for (const item of items) {
      const breakdown = await calculateTotal({
        productType: item.productType,
        size: item.size,
        numberOfExtraPrints: item.numberOfExtraPrints,
        shippingMethod,
        quantity: item.quantity,
      });

      const basePrice = await calculateBasePrice(item.productType);
      const extraCost = await calculateExtraPrintCost(item.numberOfExtraPrints);
      const xlCost = await calculateXlSurcharge(item.size);

      orderItems.push({
        productId: item.productId,
        productName: item.productName,
        productType: item.productType,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        basePrice,
        extraPrintCharge: extraCost,
        xlSurcharge: xlCost,
        printLocations: JSON.stringify(item.printLocations),
        customizations: JSON.stringify({}),
        designUrl: item.designUrl,
        stripePriceId: basePrice + extraCost + xlCost,
      });

      totalAmount += breakdown.subtotal;
      totalShipping += breakdown.shipping;
      totalTax += breakdown.tax;
      totalRush += breakdown.rushSurcharge;
    }

    const grandTotal = totalAmount + totalShipping + totalTax;

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: (session?.user as { id?: string })?.id ?? null,
        customerName: sanitizeString(customerInfo.name),
        customerEmail: sanitizeString(customerInfo.email),
        customerPhone: customerInfo.phone
          ? sanitizeString(customerInfo.phone)
          : null,
        status: "PENDING_PAYMENT",
        shippingMethod,
        shippingAddress: sanitizeString(shippingAddress),
        subtotal: totalAmount,
        shippingCost: totalShipping,
        rushSurcharge: totalRush,
        tax: totalTax,
        total: grandTotal,
        items: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productType: item.productType,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            basePrice: item.basePrice,
            extraPrintCharge: item.extraPrintCharge,
            xlSurcharge: item.xlSurcharge,
            printLocations: item.printLocations,
            customizations: item.customizations,
            designUrl: item.designUrl ?? null,
          })),
        },
      },
      include: { items: true },
    });

    const stripeLineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = orderItems.map((item) => ({
      price_data: {
        currency: "cad" as const,
        product_data: {
          name: item.productName,
          metadata: {
            productType: item.productType,
            color: item.color,
            size: item.size,
          },
        },
        unit_amount: item.stripePriceId,
      },
      quantity: item.quantity,
    }));

    if (totalShipping > 0) {
      stripeLineItems.push({
        price_data: {
          currency: "cad" as const,
          product_data: {
            name:
              shippingMethod === "RUSH" ? "Rush Shipping" : "Standard Shipping",
          },
          unit_amount: totalShipping,
        },
        quantity: 1,
      });
    }

    if (totalRush > 0) {
      stripeLineItems.push({
        price_data: {
          currency: "cad" as const,
          product_data: { name: "Rush Surcharge" },
          unit_amount: totalRush,
        },
        quantity: 1,
      });
    }

    if (totalTax > 0) {
      stripeLineItems.push({
        price_data: {
          currency: "cad" as const,
          product_data: { name: "Tax (HST)" },
          unit_amount: totalTax,
        },
        quantity: 1,
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: customerInfo.email,
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: stripeSession.id },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("[checkout] failed:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

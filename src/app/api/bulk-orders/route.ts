import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateBulkQuoteInput, sanitizeString } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = validateBulkQuoteInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors[0] },
        { status: 400 }
      );
    }

    const quote = await prisma.bulkQuote.create({
      data: {
        name: sanitizeString(body.name),
        email: sanitizeString(body.email),
        phone: body.phone ? sanitizeString(body.phone) : null,
        business: body.business ? sanitizeString(body.business) : null,
        apparelType: body.apparelType,
        quantity: body.quantity,
        sizes: sanitizeString(body.sizes),
        colors: sanitizeString(body.colors),
        numberOfPrints: body.numberOfPrints,
        desiredDate: body.desiredDate ? new Date(body.desiredDate) : null,
        additionalInfo: body.additionalInfo
          ? sanitizeString(body.additionalInfo)
          : null,
      },
    });

    return NextResponse.json({ success: true, quoteId: quote.id });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

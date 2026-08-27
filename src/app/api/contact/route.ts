import { NextResponse } from "next/server";
import { validateEmail, sanitizeString } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const errors: string[] = [];

    if (!name || sanitizeString(name).length < 2) {
      errors.push("Name is required (min 2 characters)");
    }

    if (!validateEmail(email || "")) {
      errors.push("Valid email is required");
    }

    if (!subject || sanitizeString(subject).length < 2) {
      errors.push("Subject is required");
    }

    if (!message || sanitizeString(message).length < 10) {
      errors.push("Message is required (min 10 characters)");
    }

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    // TODO: store message in database or send email notification

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { validateEmail, sanitizeString } from "@/lib/validations";

const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL || "georgesunreal@gmail.com";

const authUser = process.env.SMTP_USER || "";
const authPass = process.env.SMTP_PASS || "";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || "true") === "true",
  auth: authUser ? { user: authUser, pass: authPass } : undefined,
});

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

    const from = process.env.SMTP_FROM || authUser;
    if (!from) {
      console.error("Contact email not sent: SMTP_USER is not configured");
      return NextResponse.json(
        { error: "Something went wrong sending your message. Please try again." },
        { status: 500 }
      );
    }

    const cleanName = sanitizeString(name);
    const cleanSubject = sanitizeString(subject);

    await transporter.sendMail({
      from,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New website contact: ${cleanSubject}`,
      text: `You received a new message from your website contact form.\n\nName: ${cleanName}\nEmail: ${email}\nSubject: ${cleanSubject}\n\nMessage:\n${message}`,
      html: `
        <h2>New contact form submission</h2>
        <table cellpadding="6" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px">
          <tr><td><strong>Name:</strong></td><td>${cleanName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Subject:</strong></td><td>${cleanSubject}</td></tr>
        </table>
        <p style="font-family:Arial,sans-serif;font-size:14px"><strong>Message:</strong></p>
        <div style="font-family:Arial,sans-serif;font-size:14px;background:#f5f5f5;padding:12px;border-radius:6px">
          ${message}
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}

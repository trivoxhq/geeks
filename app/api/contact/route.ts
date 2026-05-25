import { NextResponse } from "next/server";
import {
  CONTACT_FORM_TYPES,
  type ContactFormPayload,
  type ContactFormType,
} from "@/data/contactForm";
import {
  buildAdminEmailHtml,
  buildAdminEmailText,
  buildAutoReplyHtml,
  buildAutoReplyText,
} from "@/lib/email";
import { getAdminEmail, getMailFrom, getMailTransporter } from "@/lib/smtp";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TYPES = new Set<string>(Object.values(CONTACT_FORM_TYPES));

function isValidPayload(body: unknown): body is ContactFormPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.name === "string" &&
    typeof data.email === "string" &&
    typeof data.message === "string" &&
    typeof data.type === "string" &&
    VALID_TYPES.has(data.type) &&
    (data.phone === undefined || typeof data.phone === "string") &&
    (data.service === undefined || typeof data.service === "string")
  );
}

function normalizePayload(body: ContactFormPayload): ContactFormPayload {
  return {
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone?.trim() || undefined,
    service: body.service?.trim() || undefined,
    message: body.message.trim(),
    type: body.type as ContactFormType,
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid form data. Please check all required fields." },
        { status: 400 }
      );
    }

    const payload = normalizePayload(body);

    if (!payload.name) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!payload.email || !EMAIL_RE.test(payload.email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!payload.message) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }

    const transporter = getMailTransporter();
    const adminEmail = getAdminEmail();
    const from = getMailFrom();

    await transporter.sendMail({
      from,
      to: adminEmail,
      replyTo: payload.email,
      subject: `[${payload.type}] New lead from ${payload.name}`,
      text: buildAdminEmailText(payload),
      html: buildAdminEmailHtml(payload),
    });

    await transporter.sendMail({
      from,
      to: payload.email,
      subject: "We received your request — EcomScaled",
      text: buildAutoReplyText(payload.name),
      html: buildAutoReplyHtml(payload.name),
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("[api/contact]", error);

    const message =
      error instanceof Error && error.message.includes("SMTP")
        ? "Email service is not configured. Please contact support."
        : "Unable to send your message right now. Please try again later.";

    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

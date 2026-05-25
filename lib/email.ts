import type { ContactFormPayload } from "@/data/contactForm";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildAdminEmailHtml(payload: ContactFormPayload): string {
  const rows = [
    ["Form type", payload.type],
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Service", payload.service || "—"],
    ["Message", payload.message],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e8eef5;font-weight:600;color:#4a70a9;vertical-align:top;width:140px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e8eef5;color:#1a1a1a;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#1a1a1a;margin:0 0 8px;">New lead — ${escapeHtml(payload.type)}</h2>
      <p style="color:#64748b;margin:0 0 24px;font-size:14px;">Submitted via amz-greeks website</p>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:12px;overflow:hidden;">${tableRows}</table>
    </div>
  `;
}

export function buildAdminEmailText(payload: ContactFormPayload): string {
  return [
    `New lead — ${payload.type}`,
    "",
    `Form type: ${payload.type}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "—"}`,
    `Service: ${payload.service || "—"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export function buildAutoReplyHtml(name: string): string {
  const firstName = name.split(" ")[0] || "there";
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;">
      <h2 style="color:#4a70a9;margin:0 0 16px;">We received your request</h2>
      <p style="line-height:1.6;margin:0 0 12px;">Hi ${escapeHtml(firstName)},</p>
      <p style="line-height:1.6;margin:0 0 12px;">
        Thank you for reaching out to EcomScaled. We received your request and our team will contact you soon.
      </p>
      <p style="line-height:1.6;margin:0;color:#64748b;font-size:14px;">— The EcomScaled Team</p>
    </div>
  `;
}

export function buildAutoReplyText(name: string): string {
  const firstName = name.split(" ")[0] || "there";
  return [
    `Hi ${firstName},`,
    "",
    "Thank you for reaching out to EcomScaled. We received your request and our team will contact you soon.",
    "",
    "— The EcomScaled Team",
  ].join("\n");
}

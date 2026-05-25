import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!host || !port || !user || !pass || !adminEmail) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and ADMIN_EMAIL."
    );
  }

  return {
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
    adminEmail,
    from: process.env.SMTP_FROM ?? user,
  };
}

/** Reusable Gmail SMTP transporter (singleton) */
export function getMailTransporter(): Transporter {
  if (transporter) return transporter;

  const config = getSmtpConfig();
  transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  return transporter;
}

export function getAdminEmail(): string {
  return getSmtpConfig().adminEmail;
}

export function getMailFrom(): string {
  const config = getSmtpConfig();
  return `"EcomScaled" <${config.from}>`;
}

import type { ContactFormPayload } from "@/data/contactForm";

export interface SubmitContactFormResult {
  success: boolean;
  message?: string;
}

export class ContactFormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactFormError";
  }
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<SubmitContactFormResult> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  let data: SubmitContactFormResult & { error?: string };

  try {
    data = (await response.json()) as SubmitContactFormResult & { error?: string };
  } catch {
    throw new ContactFormError("Invalid response from server. Please try again.");
  }

  if (!response.ok) {
    throw new ContactFormError(data.error ?? "Failed to send your message. Please try again.");
  }

  return data;
}

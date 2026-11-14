import { httpUrl, str } from "./format";

export interface FormValues {
  name: string;
  email: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof FormValues, string>>;

export const LIMITS = { name: 100, email: 254, message: 5000 } as const;

/**
 * The form service URL, set at build time through VITE_CONTACT_ENDPOINT.
 * Empty when it is not configured. Nothing is sent anywhere in that case.
 */
export function contactEndpoint(): string {
  return httpUrl(import.meta.env.VITE_CONTACT_ENDPOINT);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns one message per invalid field. An empty object means the values are valid. */
export function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = str(values.name);
  const email = str(values.email);
  const message = str(values.message);

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Please keep your name under " + LIMITS.name + " characters.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email) || email.length > LIMITS.email) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }

  if (!message) errors.message = "Please write a message.";
  else if (message.length > LIMITS.message) {
    errors.message = "Please keep your message under " + LIMITS.message + " characters.";
  }

  return errors;
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; kind: "network" | "timeout" | "rejected"; detail: string };

const TIMEOUT_MS = 15000;

/**
 * POSTs the message as JSON to the configured service. This matches the
 * Formspree JSON API and any endpoint that accepts the same shape and answers
 * with a 2xx status when it has accepted the message.
 *
 * `trap` is a honeypot field that real visitors never see or fill in.
 */
export async function submitMessage(
  endpoint: string,
  values: FormValues,
  trap: string,
): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: str(values.name),
        email: str(values.email),
        message: str(values.message),
        _gotcha: trap,
      }),
      signal: controller.signal,
    });

    if (response.ok) return { ok: true };

    let detail = "The service answered with status " + response.status + ".";
    try {
      const data: unknown = await response.json();
      const errors = (data as { errors?: { message?: unknown }[] } | null)?.errors;
      const first = Array.isArray(errors) ? str(errors[0]?.message) : "";
      if (first) detail = first;
    } catch {
      /* The body was not JSON. The status text above is enough. */
    }
    return { ok: false, kind: "rejected", detail };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, kind: "timeout", detail: "The request took too long." };
    }
    return { ok: false, kind: "network", detail: "The request could not be sent." };
  } finally {
    window.clearTimeout(timer);
  }
}

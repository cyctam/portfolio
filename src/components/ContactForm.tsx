import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import {
  LIMITS,
  contactEndpoint,
  submitMessage,
  validate,
} from "../lib/contact";
import type { FieldErrors, FormValues } from "../lib/contact";
import { ArrowRight } from "./Icons";

type Status = "idle" | "sending" | "sent" | "failed" | "unconfigured";

const EMPTY: FormValues = { name: "", email: "", message: "" };
const ORDER: (keyof FormValues)[] = ["name", "email", "message"];

const FAILURE: Record<"network" | "timeout" | "rejected", string> = {
  network: "Your message could not be sent. Check your connection and try again.",
  timeout: "The message service took too long to answer, so nothing was sent. Please try again.",
  rejected: "The message service did not accept your message, so nothing was sent.",
};

export function ContactForm() {
  const endpoint = contactEndpoint();

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  const fields = useRef<Record<keyof FormValues, HTMLInputElement | HTMLTextAreaElement | null>>({
    name: null,
    email: null,
    message: null,
  });
  const trap = useRef<HTMLInputElement>(null);
  const sentHeading = useRef<HTMLHeadingElement>(null);
  const refocus = useRef(false);

  useEffect(() => {
    if (status === "sent") sentHeading.current?.focus();
    if (status === "idle" && refocus.current) {
      refocus.current = false;
      fields.current.name?.focus();
    }
  }, [status]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof FormValues;
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    // Clear a shown error as soon as the field becomes valid. Never add one while typing.
    if (errors[field] && !validate(next)[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof FormValues;
    // An empty untouched field is not an error yet. Only check what was entered.
    if (!values[field].trim()) return;
    const message = validate(values)[field];
    setErrors((current) => ({ ...current, [field]: message }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    const firstInvalid = ORDER.find((field) => found[field]);
    if (firstInvalid) {
      setStatus("idle");
      fields.current[firstInvalid]?.focus();
      return;
    }

    if (!endpoint) {
      // Nothing is configured to receive messages. Say so; do not pretend.
      setStatus("unconfigured");
      return;
    }

    setStatus("sending");
    const result = await submitMessage(endpoint, values, trap.current?.value ?? "");
    if (result.ok) {
      setValues(EMPTY);
      setErrors({});
      setStatus("sent");
    } else {
      setFailure(FAILURE[result.kind]);
      setStatus("failed");
    }
  };

  const invalidCount = ORDER.filter((field) => errors[field]).length;
  const sending = status === "sending";

  if (status === "sent") {
    return (
      <div className="card form-card form-done" id="contact-form-done">
        <span className="done-mark" aria-hidden="true" />
        <h3 ref={sentHeading} tabIndex={-1}>
          Message sent
        </h3>
        <p>Thanks for writing. Your message has been delivered.</p>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            refocus.current = true;
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="card form-card"
      id="contact-form"
      noValidate
      aria-busy={sending}
      aria-describedby="contact-form-hint"
      onSubmit={onSubmit}
    >
      <p className="form-hint" id="contact-form-hint">
        All fields are required.
      </p>

      <div className={errors.name ? "field has-error" : "field"}>
        <label htmlFor="contact-name">Name</label>
        <input
          ref={(node) => {
            fields.current.name = node;
          }}
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          maxLength={LIMITS.name + 20}
          required
          aria-required="true"
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.name && (
          <p className="field-error" id="contact-name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className={errors.email ? "field has-error" : "field"}>
        <label htmlFor="contact-email">Email</label>
        <input
          ref={(node) => {
            fields.current.email = node;
          }}
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="name@example.com"
          required
          aria-required="true"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.email && (
          <p className="field-error" id="contact-email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className={errors.message ? "field has-error" : "field"}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          ref={(node) => {
            fields.current.message = node;
          }}
          id="contact-message"
          name="message"
          rows={6}
          placeholder="What would you like to talk about?"
          required
          aria-required="true"
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.message && (
          <p className="field-error" id="contact-message-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from people and from assistive technology. Bots fill it in. */}
      <div className="trap" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input ref={trap} id="contact-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-foot">
        <button
          className="btn btn-primary btn-send"
          type="submit"
          aria-disabled={sending}
          data-sending={sending || undefined}
        >
          {sending ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <ArrowRight />
            </>
          )}
        </button>

        <div className="form-status" role="status" aria-live="polite">
          {sending && <span className="sr-only">Sending your message.</span>}
          {invalidCount > 0 && status === "idle" && (
            <span className="note is-error">
              {invalidCount === 1
                ? "One field needs your attention."
                : invalidCount + " fields need your attention."}
            </span>
          )}
        </div>
      </div>

      <div role="alert" className="form-alert-slot">
        {status === "unconfigured" && (
          <p className="form-alert" id="contact-unconfigured">
            This form is not connected to a message service yet, so your message was not sent. Please
            use one of the links on this page to get in touch instead.
          </p>
        )}
        {status === "failed" && <p className="form-alert">{failure}</p>}
      </div>
    </form>
  );
}

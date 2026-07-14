"use client";

import { FormEvent, MouseEvent, ReactNode, useEffect, useState } from "react";
import {
  BUSINESS,
  DEFAULT_WHATSAPP_QUOTE_URL,
  SERVICE_OPTIONS,
  getServiceLabel,
  isServiceOption,
} from "./site-config";

type FieldName = "name" | "email" | "phone" | "service" | "location" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldIds: Record<FieldName, string> = {
  name: "quote-name",
  email: "quote-email",
  phone: "quote-phone",
  service: "quote-service",
  location: "quote-location",
  message: "quote-message",
};

function describedBy(field: FieldName, errors: FieldErrors) {
  return errors[field] ? `${fieldIds[field]}-error` : undefined;
}

export function QuoteRequestLink({
  service,
  children,
}: {
  service: string;
  children: ReactNode;
}) {
  return (
    <a
      href={`/?service=${encodeURIComponent(service)}#request-service`}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        if (window.location.pathname !== "/") return;

        event.preventDefault();
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("service", service);
        nextUrl.hash = "request-service";
        window.history.replaceState(null, "", nextUrl);
        window.dispatchEvent(
          new CustomEvent("evolura:select-service", { detail: { service } }),
        );
        const requestSection = document.getElementById("request-service");
        requestSection?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        window.setTimeout(
          () => requestSection?.focus({ preventScroll: true }),
          0,
        );
      }}
    >
      {children}
    </a>
  );
}

export function QuoteRequestForm() {
  const [formStatus, setFormStatus] = useState("");
  const [formStatusType, setFormStatusType] = useState<
    "success" | "error" | ""
  >("");
  const [selectedService, setSelectedService] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isInteractive, setIsInteractive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.queueMicrotask(() => setIsInteractive(true));
    const requestedService = new URLSearchParams(window.location.search).get(
      "service",
    );
    if (requestedService && isServiceOption(requestedService)) {
      window.queueMicrotask(() => setSelectedService(requestedService));
    }

    const selectService = (event: Event) => {
      const service = (event as CustomEvent<{ service?: string }>).detail
        ?.service;
      if (!service || !isServiceOption(service)) return;
      setSelectedService(service);
      setFieldErrors((current) => ({ ...current, service: undefined }));
    };

    window.addEventListener("evolura:select-service", selectService);
    return () =>
      window.removeEventListener("evolura:select-service", selectService);
  }, []);

  const clearError = (field: FieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: undefined };
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: FieldName) => String(data.get(name) ?? "").trim();
    const errors: FieldErrors = {};
    if (!value("name")) errors.name = "Enter your full name.";
    const email = value("email").toLowerCase();

if (!email) {
  errors.email = "Enter your email address.";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  errors.email = "Enter a valid email address.";
}
    if (!value("name")) errors.name = "Enter your full name.";
    const phone = value("phone");
    if (!phone) {
      errors.phone = "Enter your phone or WhatsApp number.";
    } else if (!/^[+()\d\s-]+$/.test(phone)) {
      errors.phone = "Use only numbers, spaces, +, parentheses or hyphens.";
    } else if (
      phone.replace(/\D/g, "").length < 7 ||
      phone.replace(/\D/g, "").length > 15
    ) {
      errors.phone = "Enter a phone number containing 7 to 15 digits.";
    }
    if (!value("service")) errors.service = "Choose the service you need.";
    if (!value("location")) errors.location = "Enter the property location.";
    if (!value("message"))
      errors.message = "Describe the space, issue or timing.";

    const firstInvalidField = (Object.keys(fieldIds) as FieldName[]).find(
      (field) => errors[field],
    );

    if (firstInvalidField) {
      setFieldErrors(errors);
      setFormStatus("Please review the highlighted fields.");
      setFormStatusType("error");
      window.setTimeout(
        () => document.getElementById(fieldIds[firstInvalidField])?.focus(),
        0,
      );
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setFormStatus("Sending your request...");
    setFormStatusType("");

const payload = {
  name: value("name"),
  email: value("email").toLowerCase(),
  phone: value("phone"),
  service: value("service"),
  serviceLabel: getServiceLabel(value("service")),
  location: value("location"),
  message: value("message"),
  source: "website_quote_form",
  pageUrl: window.location.href,
  submittedAt: new Date().toISOString(),
};

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.message || "The request could not be sent.");
      }

      form.reset();
      setSelectedService("");
      setFormStatus(
        "Thank you. Your request has been received and the Evolura team will contact you shortly.",
      );
      setFormStatusType("success");
    } catch (error) {
      setFormStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setFormStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="request-form reveal reveal--delay"
      aria-labelledby="quote-form-heading"
      aria-describedby="quote-form-instructions quote-form-privacy"
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-heading">
        <h3 id="quote-form-heading">Quote request</h3>
        <span>Fields marked * are required</span>
      </div>

      <p id="quote-form-instructions" className="form-instructions">
        Complete the form and submit your request directly to the Evolura
        service team.
      </p>

      <noscript>
        <p className="form-noscript">
          This interactive form requires JavaScript. Please call or email
          Evolura instead.
        </p>
      </noscript>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={fieldIds.name}>Full name *</label>
          <input
            id={fieldIds.name}
            name="name"
            type="text"
            disabled={!isInteractive}
            autoComplete="name"
            placeholder="Your name"
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={describedBy("name", fieldErrors)}
            onInput={() => clearError("name")}
            required
          />
          {fieldErrors.name ? (
            <span className="field-error" id={`${fieldIds.name}-error`}>
              {fieldErrors.name}
            </span>
          ) : null}
        </div>
        <div className="form-field">
  <label htmlFor={fieldIds.email}>Email address *</label>

  <input
    id={fieldIds.email}
    name="email"
    type="email"
    disabled={!isInteractive}
    autoComplete="email"
    placeholder="name@example.com"
    maxLength={120}
    aria-invalid={Boolean(fieldErrors.email)}
    aria-describedby={describedBy("email", fieldErrors)}
    onInput={() => clearError("email")}
    required
  />

  {fieldErrors.email ? (
    <span className="field-error" id={`${fieldIds.email}-error`}>
      {fieldErrors.email}
    </span>
  ) : null}
</div>
        <div className="form-field">
          <label htmlFor={fieldIds.phone}>Phone / WhatsApp *</label>
          <input
            id={fieldIds.phone}
            name="phone"
            type="tel"
            disabled={!isInteractive}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+971 50 123 4567"
            pattern="[+() 0-9-]{7,20}"
            maxLength={20}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={describedBy("phone", fieldErrors)}
            onInput={() => clearError("phone")}
            required
          />
          {fieldErrors.phone ? (
            <span className="field-error" id={`${fieldIds.phone}-error`}>
              {fieldErrors.phone}
            </span>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor={fieldIds.service}>Service needed *</label>
          <select
            id={fieldIds.service}
            name="service"
            disabled={!isInteractive}
            value={selectedService}
            aria-invalid={Boolean(fieldErrors.service)}
            aria-describedby={describedBy("service", fieldErrors)}
            onChange={(event) => {
              setSelectedService(event.currentTarget.value);
              clearError("service");
            }}
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((service) => (
              <option value={service.value} key={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {fieldErrors.service ? (
            <span className="field-error" id={`${fieldIds.service}-error`}>
              {fieldErrors.service}
            </span>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor={fieldIds.location}>Property location *</label>
          <input
            id={fieldIds.location}
            name="location"
            type="text"
            disabled={!isInteractive}
            autoComplete="street-address"
            placeholder="Area, building or full address"
            maxLength={140}
            aria-invalid={Boolean(fieldErrors.location)}
            aria-describedby={describedBy("location", fieldErrors)}
            onInput={() => clearError("location")}
            required
          />
          {fieldErrors.location ? (
            <span className="field-error" id={`${fieldIds.location}-error`}>
              {fieldErrors.location}
            </span>
          ) : null}
        </div>
        <div className="form-field form-field--full">
          <label htmlFor={fieldIds.message}>How can we help? *</label>
          <textarea
            id={fieldIds.message}
            name="message"
            rows={4}
            disabled={!isInteractive}
            placeholder="Tell us about the space, issue, size or timing..."
            maxLength={500}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={describedBy("message", fieldErrors)}
            onInput={() => clearError("message")}
            required
          />
          {fieldErrors.message ? (
            <span className="field-error" id={`${fieldIds.message}-error`}>
              {fieldErrors.message}
            </span>
          ) : null}
        </div>
      </div>

      <p id="quote-form-privacy" className="form-privacy-note">
        Your details are sent securely to Evolura's contact workflow so the team
        can review your request and respond.{" "}
        <a href="/privacy">Read the privacy explanation.</a>
      </p>

      <div className="form-submit-row">
       <div className="form-submit-actions">
  <button type="submit" disabled={!isInteractive || isSubmitting}>
    {isSubmitting ? "Sending..." : "Submit request"}
  </button>

  <a
    href={DEFAULT_WHATSAPP_QUOTE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-only-button"
  >
    WhatsApp us
  </a>
</div>
        <p
          className={
            formStatusType
              ? `form-status form-status--${formStatusType}`
              : "form-status"
          }
          role={formStatusType === "error" ? "alert" : "status"}
          aria-live={formStatusType === "error" ? "assertive" : "polite"}
        >
          {formStatus}
        </p>
      </div>
      <span className="sr-only">Contact number: {BUSINESS.phoneDisplay}</span>
    </form>
  );
}
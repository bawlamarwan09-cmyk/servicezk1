"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { ReviewFieldErrors, ReviewFieldName } from "./reviews";
import { SERVICE_OPTIONS } from "./site-config";

const fieldIds: Record<ReviewFieldName, string> = {
  name: "review-name",
  email: "review-email",
  rating: "review-rating-1",
  review: "review-message",
  service: "review-service",
  consentToPublish: "review-consent",
};

function describedBy(field: ReviewFieldName, errors: ReviewFieldErrors) {
  return errors[field] ? `${fieldIds[field]}-error` : undefined;
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ReviewForm() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<ReviewFieldErrors>({});
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");
  const formStartedAt = useRef(0);

  useEffect(() => {
    formStartedAt.current = Date.now();
    window.queueMicrotask(() => setIsInteractive(true));
  }, []);

  function clearError(field: ReviewFieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      return { ...current, [field]: undefined };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const name = value("name");
    const email = value("email").toLowerCase();
    const review = value("review");
    const service = value("service");
    const consentToPublish = data.get("consentToPublish") === "on";
    const errors: ReviewFieldErrors = {};

    if (name.length < 2) errors.name = "Enter your name using at least 2 characters.";
    if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      errors.rating = "Choose a rating from 1 to 5 stars.";
    }
    if (review.length < 20) {
      errors.review = "Write at least 20 characters about your experience.";
    }
    if (!consentToPublish) {
      errors.consentToPublish = "Confirm that Evolura may publish your review.";
    }

    const order: ReviewFieldName[] = [
      "name",
      "email",
      "rating",
      "service",
      "review",
      "consentToPublish",
    ];
    const firstInvalidField = order.find((field) => errors[field]);

    if (firstInvalidField) {
      setFieldErrors(errors);
      setStatus("Please review the highlighted fields.");
      setStatusType("error");
      window.setTimeout(
        () => document.getElementById(fieldIds[firstInvalidField])?.focus(),
        0,
      );
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setStatus("Submitting your review securely...");
    setStatusType("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rating,
          review,
          service,
          consentToPublish,
          website: value("website"),
          formStartedAt: formStartedAt.current,
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | {
            message?: string;
            fieldErrors?: ReviewFieldErrors;
          }
        | null;

      if (!response.ok) {
        if (result?.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          const firstServerInvalidField = order.find(
            (field) => result.fieldErrors?.[field],
          );
          if (firstServerInvalidField) {
            window.setTimeout(
              () => document.getElementById(fieldIds[firstServerInvalidField])?.focus(),
              0,
            );
          }
        }
        throw new Error(result?.message || "The review could not be submitted.");
      }

      form.reset();
      setRating(0);
      formStartedAt.current = Date.now();
      setStatus(
        result?.message ||
          "Thank you. Your review was received and will appear after it is checked.",
      );
      setStatusType("success");
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "The review could not be submitted. Please try again.",
      );
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="review-form"
      aria-labelledby="review-form-heading"
      aria-describedby="review-form-instructions review-form-privacy"
      action="/api/reviews"
      method="post"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-heading">
        <h3 id="review-form-heading">Share your experience</h3>
        <span>Fields marked * are required</span>
      </div>

      <p id="review-form-instructions" className="form-instructions">
        Tell us about a genuine Evolura service experience. Every review is checked
        before it can appear publicly.
      </p>

      <noscript>
        <p className="form-noscript">
          This review form requires JavaScript. Please email Evolura instead.
        </p>
      </noscript>

      <div className="review-honeypot" aria-hidden="true">
        <label htmlFor="review-website">Website</label>
        <input
          id="review-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          disabled={!isInteractive}
        />
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor={fieldIds.name}>Name *</label>
          <input
            id={fieldIds.name}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            minLength={2}
            maxLength={80}
            disabled={!isInteractive}
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
            autoComplete="email"
            inputMode="email"
            placeholder="name@example.com"
            maxLength={254}
            disabled={!isInteractive}
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

        <fieldset
          className="review-rating form-field form-field--full"
          aria-invalid={Boolean(fieldErrors.rating)}
          aria-describedby={describedBy("rating", fieldErrors)}
        >
          <legend>Your rating *</legend>
          <div className="review-rating__options">
            {[1, 2, 3, 4, 5].map((value) => (
              <label className="review-rating__option" key={value}>
                <input
                  id={`review-rating-${value}`}
                  name="rating"
                  type="radio"
                  value={value}
                  checked={rating === value}
                  disabled={!isInteractive}
                  onChange={() => {
                    setRating(value);
                    clearError("rating");
                  }}
                  required
                />
                <span className="review-rating__visual" aria-hidden="true">
                  <strong>{value}</strong> ★
                </span>
                <span className="sr-only">
                  {value} {value === 1 ? "star" : "stars"}
                </span>
              </label>
            ))}
          </div>
          {fieldErrors.rating ? (
            <span className="field-error" id={`${fieldIds.rating}-error`}>
              {fieldErrors.rating}
            </span>
          ) : null}
        </fieldset>

        <div className="form-field form-field--full">
          <label htmlFor={fieldIds.service}>Service received (optional)</label>
          <select
            id={fieldIds.service}
            name="service"
            disabled={!isInteractive}
            aria-invalid={Boolean(fieldErrors.service)}
            aria-describedby={describedBy("service", fieldErrors)}
            onChange={() => clearError("service")}
          >
            <option value="">Choose a service</option>
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

        <div className="form-field form-field--full">
          <label htmlFor={fieldIds.review}>Your review *</label>
          <textarea
            id={fieldIds.review}
            name="review"
            rows={5}
            placeholder="Tell us what went well and what we could improve..."
            minLength={20}
            maxLength={1_000}
            disabled={!isInteractive}
            aria-invalid={Boolean(fieldErrors.review)}
            aria-describedby={describedBy("review", fieldErrors)}
            onInput={() => clearError("review")}
            required
          />
          {fieldErrors.review ? (
            <span className="field-error" id={`${fieldIds.review}-error`}>
              {fieldErrors.review}
            </span>
          ) : null}
        </div>

        <div className="review-consent form-field form-field--full">
          <label htmlFor={fieldIds.consentToPublish}>
            <input
              id={fieldIds.consentToPublish}
              name="consentToPublish"
              type="checkbox"
              disabled={!isInteractive}
              aria-invalid={Boolean(fieldErrors.consentToPublish)}
              aria-describedby={describedBy("consentToPublish", fieldErrors)}
              onChange={() => clearError("consentToPublish")}
              required
            />
            <span>
              I confirm this is my genuine experience and agree that Evolura may
              publish my name, star rating and review. My email stays private. *
            </span>
          </label>
          {fieldErrors.consentToPublish ? (
            <span className="field-error" id={`${fieldIds.consentToPublish}-error`}>
              {fieldErrors.consentToPublish}
            </span>
          ) : null}
        </div>
      </div>

      <p id="review-form-privacy" className="form-privacy-note">
        Your email is used only for confirmation, moderation or service follow-up and
        is never shown with your public review. <a href="/privacy">Read our privacy information.</a>
      </p>

      <div className="form-submit-row">
        <button type="submit" disabled={!isInteractive || isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit review"}
          <span aria-hidden="true">→</span>
        </button>
        <p
          className={
            statusType ? `form-status form-status--${statusType}` : "form-status"
          }
          role={statusType === "error" ? "alert" : "status"}
          aria-live={statusType === "error" ? "assertive" : "polite"}
        >
          {status}
        </p>
      </div>
    </form>
  );
}

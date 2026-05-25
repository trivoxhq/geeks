"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import {
  CONTACT_FORM_TYPES,
  expertFormToPayload,
  type ContactFormType,
} from "@/data/contactForm";
import {
  initialExpertFormData,
  revenueOptions,
  serviceOptions,
  type ExpertFormData,
} from "@/data/speakToExpert";
import { ContactFormError, submitContactForm } from "@/lib/submitContactForm";
import {
  animateButtonHover,
  formFieldItem,
  formFieldsStagger,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

const inputClass =
  "font-primary w-full rounded-xl border border-primary/15 bg-white/90 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:shadow-[0_0_0_3px_rgba(74,112,169,0.18)]";

const labelClass = "font-primary mb-1.5 block text-sm font-medium text-foreground";

const selectChevronStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a70a9' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
};

interface ExpertContactFormProps {
  formType: ContactFormType;
  idPrefix?: string;
  showWebsiteUrl?: boolean;
  /** immediate: animate on mount (contact page); inView: scroll-triggered (home section) */
  animationMode?: "immediate" | "inView";
  /** Set false when parent already handles page entrance (e.g. contact page transition) */
  staggerFields?: boolean;
  className?: string;
}

export function ExpertContactForm({
  formType = CONTACT_FORM_TYPES.SPEAK_TO_EXPERT,
  idPrefix = "expert",
  showWebsiteUrl = false,
  animationMode = "inView",
  staggerFields = true,
  className,
}: ExpertContactFormProps) {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState<ExpertFormData>(initialExpertFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ExpertFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const motionProps = !staggerFields
    ? {}
    : animationMode === "immediate"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-80px" as const },
        };


  const update = (field: keyof ExpertFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ExpertFormData, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.service) next.service = "Please select a service.";
    if (!form.message.trim()) next.message = "Please share your requirements.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitContactForm(expertFormToPayload(form, formType));
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof ContactFormError
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-primary/10 bg-white/90 p-8 text-center shadow-[0_24px_56px_-28px_rgba(74,112,169,0.35)] backdrop-blur-sm sm:rounded-3xl",
          className
        )}
      >
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="font-secondary text-2xl font-semibold">Request received</h3>
        <p className="font-primary mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you, {form.fullName.split(" ")[0]}. Our team will reach out shortly with next
          steps.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/10 bg-white/90 p-5 shadow-[0_24px_56px_-28px_rgba(74,112,169,0.35)] backdrop-blur-sm sm:rounded-3xl sm:p-8",
        className
      )}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col">
        <motion.div
          variants={staggerFields ? formFieldsStagger : undefined}
          {...(staggerFields ? motionProps : {})}
          className="space-y-4 sm:space-y-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <motion.div
              variants={staggerFields ? formFieldItem : undefined}
              className="min-w-0 flex-1"
            >
              <label htmlFor={`${idPrefix}-name`} className={labelClass}>
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                id={`${idPrefix}-name`}
                type="text"
                name="fullName"
                required
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={cn(inputClass, errors.fullName && "border-red-400")}
                placeholder="Your name"
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </motion.div>

            <motion.div
              variants={staggerFields ? formFieldItem : undefined}
              className="min-w-0 flex-1"
            >
              <label htmlFor={`${idPrefix}-email`} className={labelClass}>
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                id={`${idPrefix}-email`}
                type="email"
                name="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={cn(inputClass, errors.email && "border-red-400")}
                placeholder="you@company.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <motion.div variants={staggerFields ? formFieldItem : undefined}>
              <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
                Phone Number{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id={`${idPrefix}-phone`}
                type="tel"
                name="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                placeholder="+1 (555) 000-0000"
              />
            </motion.div>

            <motion.div variants={staggerFields ? formFieldItem : undefined}>
              <label htmlFor={`${idPrefix}-business`} className={labelClass}>
                Business Name
              </label>
              <input
                id={`${idPrefix}-business`}
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                className={inputClass}
                placeholder="Your brand or store"
              />
            </motion.div>
          </div>

          {showWebsiteUrl && (
            <motion.div variants={staggerFields ? formFieldItem : undefined}>
              <label htmlFor={`${idPrefix}-website`} className={labelClass}>
                Website URL{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id={`${idPrefix}-website`}
                type="url"
                name="websiteUrl"
                autoComplete="url"
                value={form.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
                className={inputClass}
                placeholder="https://yourstore.com"
              />
            </motion.div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <motion.div variants={staggerFields ? formFieldItem : undefined}>
              <label htmlFor={`${idPrefix}-service`} className={labelClass}>
                Service Interested In <span className="text-primary">*</span>
              </label>
              <select
                id={`${idPrefix}-service`}
                name="service"
                required
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
                className={cn(
                  inputClass,
                  "appearance-none bg-[length:1rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-10",
                  errors.service && "border-red-400"
                )}
                style={selectChevronStyle}
                aria-invalid={!!errors.service}
              >
                {serviceOptions.map((opt) => (
                  <option key={opt.value || "default"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-xs text-red-500">{errors.service}</p>
              )}
            </motion.div>

            <motion.div variants={staggerFields ? formFieldItem : undefined}>
              <label htmlFor={`${idPrefix}-revenue`} className={labelClass}>
                Monthly Revenue{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <select
                id={`${idPrefix}-revenue`}
                name="monthlyRevenue"
                value={form.monthlyRevenue}
                onChange={(e) => update("monthlyRevenue", e.target.value)}
                className={cn(
                  inputClass,
                  "appearance-none bg-[length:1rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-10"
                )}
                style={selectChevronStyle}
              >
                {revenueOptions.map((opt) => (
                  <option key={opt.value || "rev-default"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          <motion.div variants={staggerFields ? formFieldItem : undefined}>
            <label htmlFor={`${idPrefix}-message`} className={labelClass}>
              Message / Requirements <span className="text-primary">*</span>
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={cn(
                inputClass,
                "min-h-[120px] resize-y",
                errors.message && "border-red-400"
              )}
              placeholder="Tell us about your goals, challenges, and timeline..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
          </motion.div>
        </motion.div>

        <motion.p
          variants={staggerFields ? formFieldItem : undefined}
          {...(staggerFields ? motionProps : {})}
          className="font-primary mt-5 text-center text-xs leading-relaxed text-muted-foreground"
        >
          By submitting, you agree to our{" "}
          <Link href="/privacy" className="text-primary underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-primary underline-offset-2 hover:underline">
            Terms of Service
          </Link>
          . If you opt in to receive SMS communications from Ecomscaled, we will not share your
          phone number or related information with any external parties.
        </motion.p>

        {submitError && (
          <p
            role="alert"
            className="font-primary mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-600"
          >
            {submitError}
          </p>
        )}

        <motion.div
          className="mt-6"
          whileHover={isSubmitting ? undefined : { scale: 1.02 }}
          whileTap={isSubmitting ? undefined : { scale: 0.98 }}
        >
          <button
            ref={submitRef}
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg group flex w-full items-center justify-center gap-2 bg-linear-to-r from-primary to-primary-light shadow-[0_0_40px_-10px_rgba(74,112,169,0.55)] transition-all duration-300 hover:shadow-[0_0_48px_-6px_rgba(74,112,169,0.65)] disabled:cursor-not-allowed disabled:opacity-70"
            onMouseEnter={() => animateButtonHover(submitRef.current, true)}
            onMouseLeave={() => animateButtonHover(submitRef.current, false)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                Submit Request
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
}

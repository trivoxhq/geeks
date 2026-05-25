"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { useModalOverlay } from "@/components/layout/ModalOverlayProvider";
import {
  CONTACT_FORM_TYPES,
  formatServiceLabel,
  type ContactFormType,
} from "@/data/contactForm";
import {
  consultationModalContent,
  initialConsultationFormData,
  type ConsultationFormData,
} from "@/data/consultationForm";
import { serviceOptions } from "@/data/speakToExpert";
import { overlayFade } from "@/lib/animations";
import { ContactFormError, submitContactForm } from "@/lib/submitContactForm";
import { cn } from "@/lib/utils";

const inputClass =
  "font-primary w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:shadow-[0_0_0_3px_rgba(74,112,169,0.18)]";

const labelClass = "font-primary mb-1.5 block text-sm font-medium text-foreground";

const selectChevronStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234a70a9' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
};

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-select a service value when opening from a pricing plan */
  defaultService?: string;
  planName?: string;
  formType?: ContactFormType;
}

function buildInitialFormData(
  defaultService: string,
  planName?: string
): ConsultationFormData {
  return {
    ...initialConsultationFormData,
    service: defaultService,
    comments: planName ? `Interested in the ${planName} plan.` : "",
  };
}

function ConsultationModalBody({
  defaultService,
  planName,
  formType,
  onClose,
}: {
  defaultService: string;
  planName?: string;
  formType: ContactFormType;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ConsultationFormData>(() =>
    buildInitialFormData(defaultService, planName)
  );
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: Partial<Record<keyof ConsultationFormData, string>> = {};
    if (!form.name.trim()) next.name = "Your name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address.";
    if (!form.service) next.service = "Please select a service.";
    if (!form.comments.trim()) next.comments = "Please add a comment.";
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
      await submitContactForm({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        service: formatServiceLabel(form.service),
        message: form.comments.trim(),
        type: formType,
      });
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
      <div className="py-8 text-center">
        <p className="font-secondary text-lg font-semibold text-foreground">
          Consultation request sent
        </p>
        <p className="font-primary mt-2 text-sm text-muted-foreground">
          We&apos;ll reach out shortly to schedule your free consultation.
        </p>
        <button type="button" className="btn btn-primary mt-6" onClick={onClose}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="min-w-0 flex-1">
          <label htmlFor="consult-name" className={labelClass}>
            Your Name <span className="text-primary">*</span>
          </label>
          <input
            id="consult-name"
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm((p) => ({ ...p, name: e.target.value }));
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
            }}
            className={cn(inputClass, errors.name && "border-red-400")}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="font-primary mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="consult-email" className={labelClass}>
            Your Email Address <span className="text-primary">*</span>
          </label>
          <input
            id="consult-email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm((p) => ({ ...p, email: e.target.value }));
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            className={cn(inputClass, errors.email && "border-red-400")}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="font-primary mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="consult-phone" className={labelClass}>
          Contact Number <span className="text-muted-foreground">(Optional)</span>
        </label>
        <input
          id="consult-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor="consult-service" className={labelClass}>
          Service(s) You&apos;re Interested In <span className="text-primary">*</span>
        </label>
        <select
          id="consult-service"
          name="service"
          required
          value={form.service}
          onChange={(e) => {
            setForm((p) => ({ ...p, service: e.target.value }));
            if (errors.service) setErrors((p) => ({ ...p, service: undefined }));
          }}
          className={cn(
            inputClass,
            "appearance-none bg-[length:1rem] bg-position-[right_0.75rem_center] bg-no-repeat pr-10",
            errors.service && "border-red-400"
          )}
          style={selectChevronStyle}
          aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "consult-service-error" : undefined}
        >
          {serviceOptions.map((opt) => (
            <option key={opt.value || "default"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="consult-service-error" className="font-primary mt-1 text-xs text-red-600">
            {errors.service}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="consult-comments" className={labelClass}>
          Additional Comments <span className="text-primary">*</span>
        </label>
        <textarea
          id="consult-comments"
          rows={4}
          value={form.comments}
          onChange={(e) => {
            setForm((p) => ({ ...p, comments: e.target.value }));
            if (errors.comments) setErrors((p) => ({ ...p, comments: undefined }));
          }}
          className={cn(inputClass, "resize-y min-h-[100px]")}
        />
        {errors.comments && (
          <p className="font-primary mt-1 text-xs text-red-600">{errors.comments}</p>
        )}
      </div>

      <p className="font-primary text-center text-xs text-muted-foreground">
        {consultationModalContent.footnote}
      </p>

      {submitError && (
        <p
          role="alert"
          className="font-primary rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-xs text-red-600"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending…
          </span>
        ) : (
          consultationModalContent.submitLabel
        )}
      </button>

      <p className="font-primary text-center text-xs text-muted-foreground">
        <Link href={consultationModalContent.privacyHref} className="hover:text-primary">
          {consultationModalContent.privacyLabel}
        </Link>
        <span className="mx-2">·</span>
        <Link href={consultationModalContent.termsHref} className="hover:text-primary">
          {consultationModalContent.termsLabel}
        </Link>
      </p>
    </form>
  );
}

export function ConsultationModal({
  isOpen,
  onClose,
  defaultService = "amazon",
  planName,
  formType = CONTACT_FORM_TYPES.PRICING_FORM,
}: ConsultationModalProps) {
  const { setOpen: setModalOverlayOpen } = useModalOverlay();
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(isOpen);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setModalOverlayOpen(true);
  }, [isOpen, setModalOverlayOpen]);

  useEffect(() => {
    return () => setModalOverlayOpen(false);
  }, [setModalOverlayOpen]);

  const handleExitComplete = () => {
    if (!isOpenRef.current) setModalOverlayOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleClose = () => {
    onClose();
  };

  const sessionKey = `${formType}-${defaultService}-${planName ?? ""}`;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-end justify-center overscroll-none p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            variants={overlayFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            aria-label="Close consultation form"
            onClick={handleClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[min(92dvh,900px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-primary/15 bg-white/95 shadow-[0_32px_80px_-24px_rgba(74,112,169,0.45)] backdrop-blur-xl sm:max-h-[90dvh] sm:rounded-3xl"
          >
            <div className="flex items-start justify-between border-b border-primary/10 px-5 py-4 sm:px-6 sm:py-5">
              <h2
                id="consultation-modal-title"
                className="font-secondary pr-8 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                {consultationModalContent.title}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <ConsultationModalBody
                key={sessionKey}
                defaultService={defaultService}
                planName={planName}
                formType={formType}
                onClose={handleClose}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

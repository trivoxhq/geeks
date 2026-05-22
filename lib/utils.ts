type ClassValue = string | number | boolean | undefined | null;

/**
 * Merge class names into a single string.
 * Filters falsy values — useful for conditional Tailwind classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

/** Reusable site container utility class name */
export const SITE_CONTAINER_CLASS = "site-container";

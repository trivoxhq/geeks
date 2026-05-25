let lockCount = 0;

/** Locks page scroll without shifting layout; call the returned function to release. */
export function lockBodyScroll(): () => void {
  lockCount += 1;

  if (lockCount === 1) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.classList.add("scroll-locked");
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("scroll-locked");
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight =
      scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
  }

  return () => {
    lockCount = Math.max(0, lockCount - 1);

    if (lockCount === 0) {
      document.documentElement.classList.remove("scroll-locked");
      document.documentElement.style.overflow = "";
      document.body.classList.remove("scroll-locked");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  };
}

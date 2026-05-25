"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { lockBodyScroll } from "@/lib/scrollLock";

type ModalOverlayContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const ModalOverlayContext = createContext<ModalOverlayContextValue | null>(null);

export function ModalOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      setOpen,
    }),
    [isOpen, setOpen]
  );

  return (
    <ModalOverlayContext.Provider value={value}>{children}</ModalOverlayContext.Provider>
  );
}

export function useModalOverlay() {
  const ctx = useContext(ModalOverlayContext);
  if (!ctx) {
    throw new Error("useModalOverlay must be used within ModalOverlayProvider");
  }
  return ctx;
}

export function useModalOverlayOptional() {
  return useContext(ModalOverlayContext);
}

"use client";

import { useEffect } from "react";

/**
 * Site-wide accessibility layer.
 *
 * Intentionally isolated from the particle engine and chapter content.
 * Provides a keyboard skip link, focus-visible behavior, and a temporary
 * "keyboard navigation" state so the cinematic UI can remain mouse-first
 * without hiding focus from keyboard users.
 */
export default function AccessibilityLayer() {
  useEffect(() => {
    const root = document.documentElement;
    let keyboard = false;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Enter" || event.key === " ") {
        keyboard = true;
        root.dataset.inputMode = "keyboard";
      }
    };

    const onPointerDown = () => {
      keyboard = false;
      root.dataset.inputMode = "pointer";
    };

    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("pointerdown", onPointerDown, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("pointerdown", onPointerDown, true);
      delete root.dataset.inputMode;
      void keyboard;
    };
  }, []);

  return (
    <a className="accessibility-skip-link" href="#main-content">
      Skip to main content
    </a>
  );
}

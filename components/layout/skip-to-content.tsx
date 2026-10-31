import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10002] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-white focus:rounded focus:shadow-lg focus:font-mono focus:text-sm font-semibold"
    >
      Skip to main content
    </a>
  );
}

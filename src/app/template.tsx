"use client";

import { ViewTransition, type ReactNode } from "react";

/*
 * Page transitions: React <ViewTransition> + the browser View Transitions API.
 * BRAND.md section 9 keeps motion quiet, so this is a short cross-fade only
 * (see ::view-transition-* in globals.css); the header stays anchored.
 * Browsers without the API simply swap pages.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

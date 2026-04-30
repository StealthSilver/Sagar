"use client";

import { createContext, useContext } from "react";

export type LandingState = {
  aboutOpen: boolean;
  worksRevealing: boolean;
  setAboutOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
};

export const LandingContext = createContext<LandingState | null>(null);

export function useLanding(): LandingState {
  const ctx = useContext(LandingContext);
  if (!ctx) {
    throw new Error("useLanding must be used inside <LandingShell>");
  }
  return ctx;
}

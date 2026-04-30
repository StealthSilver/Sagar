"use client";

import Navigation from "@/components/Navigation";
import SagarLogo from "@/components/SagarLogo";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const pendingHashRef = useRef(false);

  useEffect(() => {
    if (!aboutOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [aboutOpen]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f9f6eb]">
      <div
        className="absolute inset-y-0 right-0 w-[30%] bg-[#12263a]"
        style={{
          boxShadow: "-28px 0 64px rgba(18, 38, 58, 0.55)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-50 mx-auto min-h-screen max-w-7xl px-6 pt-8">
        <SagarLogo
          textClassName={[
            "font-sekuya",
            "font-black",
            "text-[clamp(40px,6vw,88px)]",
            "leading-[1] tracking-[-0.01em]",
          ].join(" ")}
          secondaryText="MISHRA"
          secondaryActive={aboutOpen}
          className={[
            "relative z-50",
            "transition-colors duration-300 ease-out motion-reduce:transition-none",
            aboutOpen ? "text-white" : "text-black",
          ].join(" ")}
        />

        <div className="absolute bottom-8 right-0">
          <Navigation
            onAboutClick={() => {
              setAboutOpen((v) => {
                const next = !v;
                if (next) pendingHashRef.current = true;
                return next;
              });
            }}
          />
        </div>
      </div>

      <div
        aria-hidden={!aboutOpen}
        className={[
          "fixed inset-0 z-40 bg-[#12263a]",
          "transform-gpu",
          aboutOpen ? "translate-x-0" : "translate-x-full",
          "transition-transform motion-reduce:transition-none",
          "duration-700",
          "ease-[cubic-bezier(0.16,1,0.3,1)]",
        ].join(" ")}
        onTransitionEnd={(e) => {
          if (e.propertyName !== "transform") return;
          if (!aboutOpen) return;
          if (!pendingHashRef.current) return;
          pendingHashRef.current = false;
          // App Router doesn't reliably "navigate" for hash-only changes.
          // Using History API guarantees URL becomes `/#about` without reload.
          const base =
            typeof window !== "undefined"
              ? `${window.location.pathname}${window.location.search}`
              : "/";
          window.history.replaceState(null, "", `${base}#about`);
        }}
      />
    </section>
  );
}


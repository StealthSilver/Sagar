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
        className="absolute inset-y-0 right-0 w-[25%] bg-[#0b1722]"
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

        <div className="absolute left-6 top-1/2 -translate-y-1/2 font-satoshi text-black">
          <div className="text-[clamp(16px,1.7vw,22px)] font-medium leading-tight">
            crafting
          </div>
          <div className="mt-1 text-[clamp(34px,4vw,54px)] font-black leading-[1.02] tracking-[-0.02em]">
            DIGITAL WORLDS
          </div>
          <div className="mt-2 text-[clamp(16px,1.7vw,22px)] font-medium leading-tight">
            for the
          </div>
          <div className="mt-1 whitespace-nowrap text-[clamp(34px,4vw,54px)] font-black leading-[1.02] tracking-[-0.02em]">
            BRANDS OF TOMORROW
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-12 left-6 font-satoshi text-[clamp(13px,1.2vw,16px)] font-light uppercase tracking-[0.08em] text-black/60">
          Digital Content Manager based in Bengaluru.
        </div>

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
          "fixed inset-0 z-40 bg-[#0b1722]",
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


"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Hero from "@/sections/Hero";
import Works from "@/sections/Works";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";
import MarqueeWhatIDo from "@/sections/MarqueeWhatIDo";
import { LandingContext } from "@/state/landing";

export default function LandingShell() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [worksRevealing, setWorksRevealing] = useState(false);
  const [worksOverlayCovering, setWorksOverlayCovering] = useState(false);
  const triggeredRef = useRef(false);

  // If the page was loaded directly at /#about, open the about state.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#about") {
      setAboutOpen(true);
    }
  }, []);

  // Lock page scroll while about is open so the only way out (apart from
  // clicking HOME) is the works reveal animation.
  useEffect(() => {
    if (!aboutOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [aboutOpen]);

  // When the user attempts to scroll while on #about, kick off the works reveal.
  useEffect(() => {
    if (!aboutOpen || worksRevealing) return;

    let touchStartY: number | null = null;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setWorksRevealing(true);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 4) trigger();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY == null) return;
      const dy = touchStartY - (e.touches[0]?.clientY ?? touchStartY);
      if (dy > 8) trigger();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === "End" ||
        (e.key === " " && !e.shiftKey)
      ) {
        trigger();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [aboutOpen, worksRevealing]);

  // After the overlay mounts at translate-x-[-100%], flip it to translate-x-0
  // on the next paint to play the slide-in transition.
  useEffect(() => {
    if (!worksRevealing) {
      setWorksOverlayCovering(false);
      return;
    }
    let id1 = 0;
    let id2 = 0;
    id1 = window.requestAnimationFrame(() => {
      id2 = window.requestAnimationFrame(() => setWorksOverlayCovering(true));
    });
    return () => {
      window.cancelAnimationFrame(id1);
      window.cancelAnimationFrame(id2);
    };
  }, [worksRevealing]);

  // If about is closed any other way, make sure reveal state resets.
  useEffect(() => {
    if (!aboutOpen) {
      triggeredRef.current = false;
      setWorksRevealing(false);
    }
  }, [aboutOpen]);

  const settleWorksReveal = useCallback(() => {
    // Unlock scroll synchronously so we can move the viewport.
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    const worksEl = document.getElementById("works");
    if (worksEl) {
      const top = window.scrollY + worksEl.getBoundingClientRect().top;
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    }

    const base = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", `${base}#works`);

    triggeredRef.current = false;
    setAboutOpen(false);
    setWorksRevealing(false);
  }, []);

  return (
    <LandingContext.Provider
      value={{ aboutOpen, worksRevealing, setAboutOpen }}
    >
      <Hero />
      <Works />
      <CTA />
      <Footer />

      {worksRevealing ? (
        <div
          aria-hidden="true"
          className={[
            "fixed inset-0 z-[60] overflow-hidden bg-[#f9f6eb]",
            "transform-gpu",
            "transition-transform motion-reduce:transition-none",
            "duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            worksOverlayCovering ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
          onTransitionEnd={(e) => {
            // Tailwind v4 emits `propertyName === "translate"` for
            // `translate-x-*` utilities. Accept either name so the reveal
            // actually settles on browsers using the new CSS `translate`
            // property.
            if (e.propertyName !== "transform" && e.propertyName !== "translate")
              return;
            if (e.target !== e.currentTarget) return;
            if (!worksOverlayCovering) return;
            settleWorksReveal();
          }}
        >
          <MarqueeWhatIDo sectionId={null} />
        </div>
      ) : null}
    </LandingContext.Provider>
  );
}

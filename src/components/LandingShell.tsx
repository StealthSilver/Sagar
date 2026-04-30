"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/sections/Hero";
import Works from "@/sections/Works";
import CTA from "@/sections/CTA";
import Footer from "@/sections/Footer";
import PageLoader from "@/components/PageLoader";
import { LandingContext } from "@/state/landing";

export default function LandingShell() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const triggeredRef = useRef(false);

  // If the page was loaded directly at /#about, open the about state.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#about") {
      setAboutOpen(true);
    }
  }, []);

  // Lock page scroll while about is open. The only way out (apart from
  // clicking HOME) is to scroll, which closes about and slides the page
  // into Works in one continuous motion.
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

  // Reset the one-shot trigger whenever about closes by any other means.
  useEffect(() => {
    if (!aboutOpen) {
      triggeredRef.current = false;
    }
  }, [aboutOpen]);

  // When the user attempts to scroll while on #about, close the about
  // overlay and smooth-scroll into Works at the same time so the
  // transition mirrors a normal hero -> works scroll (no separate
  // marquee reveal step).
  useEffect(() => {
    if (!aboutOpen) return;

    let touchStartY: number | null = null;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;

      // Unlock scroll synchronously so window.scrollTo can move the page.
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      // Close about — the dark panel slides out to the right (Hero owns
      // that animation) at the same time the page scrolls down.
      setAboutOpen(false);

      const worksEl = document.getElementById("works");
      if (worksEl) {
        const top = window.scrollY + worksEl.getBoundingClientRect().top;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }

      const base = `${window.location.pathname}${window.location.search}`;
      if (window.location.hash === "#about") {
        window.history.replaceState(null, "", `${base}#works`);
      }
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
  }, [aboutOpen]);

  return (
    <>
      <PageLoader />
      <LandingContext.Provider value={{ aboutOpen, setAboutOpen }}>
        <Hero />
        <Works />
        <CTA />
        <Footer />
      </LandingContext.Provider>
    </>
  );
}

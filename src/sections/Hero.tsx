"use client";

import Navigation from "@/components/Navigation";
import SagarLogo from "@/components/SagarLogo";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Hero() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutTextIn, setAboutTextIn] = useState(false);
  const [mishraWidth, setMishraWidth] = useState<number | null>(null);
  const pendingHashRef = useRef(false);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);

  const aboutCopy = useMemo(
    () => `Design found me before I fully found it. I thought I was just drawn to
how things looked turns out I was obsessed with how they felt.
There's a difference, and it took me a while to name it.
The way I see it design is translation. You're taking something that
lives only in someone's head and making it land in someone else's chest.
That gap? That's where I live.
I get unreasonably excited about small things. A kerning decision. The
pause before a reel cuts. The weight of a word choice. Most people
wouldn't notice but they'd feel it. That's kind of the whole point.
I'm not trying to make things pretty. I'm trying to make them mean
something. If you finish looking at something I made and feel nothing,
I haven't done my job yet.
— still figuring it out, but loving the process.`,
    [],
  );

  useEffect(() => {
    if (!aboutOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [aboutOpen]);

  useEffect(() => {
    if (aboutOpen) return;
    setMishraWidth(null);
    setAboutTextIn(false);
  }, [aboutOpen]);

  useEffect(() => {
    if (!aboutOpen) return;
    setAboutTextIn(false);
    const id = window.requestAnimationFrame(() => setAboutTextIn(true));
    return () => window.cancelAnimationFrame(id);
  }, [aboutOpen]);

  useEffect(() => {
    if (!aboutOpen) return;

    const measure = () => {
      const root = logoWrapRef.current;
      if (!root) return;
      const mishraEl = root.querySelector(
        ".sagar-logo__secondary .sagar-logo__text",
      ) as HTMLElement | null;
      if (!mishraEl) return;
      const w = mishraEl.getBoundingClientRect().width;
      if (w > 0) setMishraWidth(w);
    };

    let raf = 0;
    let tries = 0;
    const tick = () => {
      tries += 1;
      measure();
      if (tries < 20 && !mishraWidth) {
        raf = window.requestAnimationFrame(tick);
      }
    };

    tick();
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [aboutOpen, mishraWidth]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f9f6eb]">
      <div
        className="absolute inset-y-0 right-0 w-[25%] bg-[#0b1722]"
        style={{
          boxShadow: "-28px 0 64px rgba(18, 38, 58, 0.55)",
        }}
        aria-hidden="true"
      />

      <div
        className="relative z-50 mx-auto min-h-screen max-w-7xl px-6 pt-8"
      >
        <div ref={logoWrapRef} className="inline-block">
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

          {aboutOpen ? (
            <div
              className={[
                "mt-16",
                "font-satoshi italic font-extralight",
                "text-[clamp(13px,1.05vw,15px)] leading-[1.65] tracking-[0.01em]",
                "text-white/95",
                "whitespace-pre-line",
                "transition-[opacity,transform] motion-reduce:transition-none",
                "duration-300 ease-out",
                aboutTextIn
                  ? "delay-400 opacity-100 translate-y-0"
                  : "delay-0 opacity-0 translate-y-2",
              ].join(" ")}
              style={mishraWidth ? { width: mishraWidth } : undefined}
            >
              {aboutCopy}
            </div>
          ) : null}
        </div>

        <div
          aria-hidden={aboutOpen}
          className={[
            "absolute left-6 top-1/2 -translate-y-1/2 font-satoshi text-black",
            "transition-opacity duration-300 ease-out motion-reduce:transition-none",
            aboutOpen ? "pointer-events-none opacity-0" : "opacity-100",
          ].join(" ")}
        >
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

        <div
          className={[
            "pointer-events-none absolute left-6 bottom-12 z-50",
            "font-satoshi text-[clamp(13px,1.2vw,16px)] font-light uppercase tracking-[0.08em]",
            "transition-colors motion-reduce:transition-none",
            "duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            aboutOpen ? "text-white/70" : "text-black/60",
          ].join(" ")}
        >
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
          if (pendingHashRef.current) {
            pendingHashRef.current = false;
            // App Router doesn't reliably "navigate" for hash-only changes.
            // Using History API guarantees URL becomes `/#about` without reload.
            const base =
              typeof window !== "undefined"
                ? `${window.location.pathname}${window.location.search}`
                : "/";
            window.history.replaceState(null, "", `${base}#about`);
          }
        }}
      />
    </section>
  );
}


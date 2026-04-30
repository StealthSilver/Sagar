"use client";

import { useEffect, useRef, useState } from "react";

const MIN_DURATION = 1400;
const HOLD_AFTER_FULL = 240;
const EXIT_DURATION = 900;

type WordProps = {
  text: string;
  sweep: string;
  baseDelay?: number;
};

function Word({ text, sweep, baseDelay = 0 }: WordProps) {
  const letters = text.split("");
  const letterClass =
    "inline-block translate-y-[0.55em] opacity-0 [animation:sagar-loader-letter-in_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:[animation:none]";
  const wordClass =
    "block font-sekuya font-black tracking-[-0.02em] text-[clamp(56px,15vw,220px)] leading-[0.95]";

  return (
    <div className="relative inline-block">
      <span className={[wordClass, "text-[#0b1722]/[0.12]"].join(" ")}>
        {letters.map((ch, i) => (
          <span
            key={`base-${i}`}
            className={letterClass}
            style={{ animationDelay: `${baseDelay + i * 70}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>

      <span
        aria-hidden="true"
        className={[wordClass, "absolute inset-0 text-[#0b1722]"].join(" ")}
        style={{ clipPath: sweep, WebkitClipPath: sweep }}
      >
        {letters.map((ch, i) => (
          <span
            key={`fill-${i}`}
            className={letterClass}
            style={{ animationDelay: `${baseDelay + i * 70}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [removed, setRemoved] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    if (removed) return;
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
  }, [removed]);

  useEffect(() => {
    if (removed) return;

    let docReady =
      typeof document !== "undefined" && document.readyState === "complete";
    const onLoad = () => {
      docReady = true;
    };
    if (!docReady) window.addEventListener("load", onLoad);

    const start = performance.now();
    let raf = 0;
    let exitTimer: number | undefined;

    const tick = (now: number) => {
      const elapsed = now - start;
      const cap = Math.min(0.96, elapsed / MIN_DURATION);
      const target = docReady && elapsed >= MIN_DURATION ? 1 : cap;
      const cur = progressRef.current;
      const next = cur + (target - cur) * 0.07;
      const value = next > target - 0.0008 ? target : next;
      progressRef.current = value;
      setProgress(value);
      if (value < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        exitTimer = window.setTimeout(
          () => setExiting(true),
          HOLD_AFTER_FULL,
        );
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (exitTimer) clearTimeout(exitTimer);
      window.removeEventListener("load", onLoad);
    };
  }, [removed]);

  // Safety net: ensure the loader unmounts even if transitionend never fires
  // (e.g. when prefers-reduced-motion disables the slide).
  useEffect(() => {
    if (!exiting) return;
    const t = window.setTimeout(() => setRemoved(true), EXIT_DURATION + 80);
    return () => clearTimeout(t);
  }, [exiting]);

  if (removed) return null;

  const percent = Math.round(progress * 100);
  const sweep = `inset(0 ${Math.max(0, (1 - progress) * 100)}% 0 0)`;
  const percentStr = String(percent).padStart(3, "0");

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      aria-label="Loading SAGAR MISHRA portfolio"
      className={[
        "fixed inset-0 z-[100] overflow-hidden bg-[#f9f6eb]",
        "transform-gpu transition-transform motion-reduce:transition-none",
        "duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        exiting ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      onTransitionEnd={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.propertyName !== "transform" && e.propertyName !== "translate")
          return;
        if (exiting) setRemoved(true);
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[25%] bg-[#0b1722]/[0.04] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 h-px bg-[#0b1722]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-24 h-px bg-[#0b1722]/10"
      />

      <div
        className={[
          "relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-6 pb-8 sm:px-6 sm:pt-8 sm:pb-10",
          "transition-opacity duration-300 ease-out motion-reduce:transition-none",
          exiting ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <div className="flex items-start justify-between font-satoshi text-[10px] uppercase tracking-[0.2em] text-black/55 sm:text-[11px] sm:tracking-[0.24em]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3E7CB1]" />
            <span>Sagar Mishra — Portfolio</span>
          </div>
          <div className="hidden sm:block">Bengaluru © 2026</div>
        </div>

        <div className="flex flex-1 flex-col items-start justify-center">
          <Word text="SAGAR" sweep={sweep} baseDelay={0} />
          <div className="mt-1">
            <Word text="MISHRA" sweep={sweep} baseDelay={420} />
          </div>

          <div
            className={[
              "mt-6 max-w-[52ch] sm:mt-10",
              "font-satoshi italic font-extralight",
              "text-[clamp(12px,3.2vw,16px)] leading-[1.65] tracking-[0.01em]",
              "text-black/65",
              "opacity-0 [animation:sagar-loader-fade-in_0.7s_cubic-bezier(0.16,1,0.3,1)_forwards]",
              "motion-reduce:opacity-100 motion-reduce:[animation:none]",
            ].join(" ")}
            style={{ animationDelay: "900ms" }}
          >
            Crafting digital worlds for the brands of tomorrow.
            <br />
            — still figuring it out, but loving the process.
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 font-satoshi text-[10px] uppercase tracking-[0.22em] text-black/60 sm:text-[11px] sm:tracking-[0.28em]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#0b1722] [animation:sagar-loader-pulse_1.4s_ease-in-out_infinite] motion-reduce:[animation:none]"
            />
            Loading
          </div>

          <div
            className="relative h-[2px] flex-1 overflow-hidden bg-[#0b1722]/15"
            aria-hidden="true"
          >
            <div
              className="absolute inset-y-0 left-0 bg-[#0b1722]"
              style={{ width: `${percent}%` }}
            />
            <div
              className="absolute inset-y-[-3px] w-[2px] bg-[#3E7CB1]"
              style={{ left: `calc(${percent}% - 1px)` }}
            />
          </div>

          <div className="font-satoshi text-[10px] uppercase tracking-[0.22em] text-black/60 sm:text-[11px] sm:tracking-[0.28em]">
            <span className="tabular-nums text-[#0b1722]">{percentStr}</span>
            <span className="text-black/35"> / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

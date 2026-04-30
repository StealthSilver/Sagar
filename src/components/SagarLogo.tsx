"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useRef } from "react";

type Props = {
  className?: string;
  textClassName?: string;
};

export default function SagarLogo({ className, textClassName }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const setVarsFromEvent = useCallback((e: ReactMouseEvent) => {
    const el = rootRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = rect.width ? (x / rect.width) * 100 : 50;
    const py = rect.height ? (y / rect.height) * 100 : 50;

    el.style.setProperty("--reveal-x", `${x}px`);
    el.style.setProperty("--reveal-y", `${y}px`);
    el.style.setProperty("--ocean-x", `${px}%`);
    el.style.setProperty("--ocean-y", `${py}%`);
  }, []);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setVarsFromEvent(e));
    },
    [setVarsFromEvent],
  );

  const onMouseEnter = useCallback((e: ReactMouseEvent) => {
    setVarsFromEvent(e);
  }, [setVarsFromEvent]);

  const onMouseLeave = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    el.style.removeProperty("--reveal-x");
    el.style.removeProperty("--reveal-y");
    el.style.removeProperty("--ocean-x");
    el.style.removeProperty("--ocean-y");
  }, []);

  return (
    <div
      ref={rootRef}
      className={["sagar-logo", className].filter(Boolean).join(" ")}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label="Sagar"
    >
      <span className={["sagar-logo__text", textClassName].filter(Boolean).join(" ")}>
        SAGAR
      </span>
      <span
        className={[
          "sagar-logo__text",
          "sagar-logo__text--ocean",
          textClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      >
        SAGAR
      </span>
      <span className="sagar-logo__cursor" aria-hidden="true" />
    </div>
  );
}


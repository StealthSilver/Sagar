"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Props = {
  active: boolean;
};

// Pendulum tuning. Units: angle in radians, time in milliseconds.
// gravityOverLength chosen so the natural period feels like a real picture
// (~1.8s). We then dial in damping to produce a calm, inviting decay.
const GRAVITY_OVER_LENGTH = 1.2e-5;
const DAMPING_PER_MS = 0.9994;
const MAX_ANGLE = (Math.PI / 180) * 65;

const STRING_LENGTH = 260; // px from pivot to top of frame
const FRAME_WIDTH = 184;
const FRAME_HEIGHT = 220;
const FRAME_PADDING = 14;
const PIVOT_OFFSET_TOP = -28; // pivot lifted above the panel edge

export default function HangingPhoto({ active }: Props) {
  const pivotRef = useRef<HTMLDivElement | null>(null);
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);
  const lastDragAngleRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Reveal the photo a beat after the about panel slides in, then nudge it
  // so it has a tiny "just hung up" sway.
  useEffect(() => {
    if (!active) {
      setMounted(false);
      angleRef.current = 0;
      velocityRef.current = 0;
      setAngle(0);
      return;
    }
    const reveal = window.setTimeout(() => {
      setMounted(true);
      // Small initial swing.
      angleRef.current = (Math.PI / 180) * 6;
      velocityRef.current = -1.2e-4;
    }, 520);
    return () => window.clearTimeout(reveal);
  }, [active]);

  // Pendulum integration loop.
  useEffect(() => {
    if (!active) return;

    const tick = (time: number) => {
      if (lastTickRef.current == null) {
        lastTickRef.current = time;
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min(48, time - lastTickRef.current);
      lastTickRef.current = time;

      if (!draggingRef.current) {
        const acc = -GRAVITY_OVER_LENGTH * Math.sin(angleRef.current);
        velocityRef.current += acc * dt;
        velocityRef.current *= Math.pow(DAMPING_PER_MS, dt);
        angleRef.current += velocityRef.current * dt;

        // Clamp to keep things physical even after a hard flick.
        if (angleRef.current > MAX_ANGLE) {
          angleRef.current = MAX_ANGLE;
          velocityRef.current = -Math.abs(velocityRef.current) * 0.4;
        } else if (angleRef.current < -MAX_ANGLE) {
          angleRef.current = -MAX_ANGLE;
          velocityRef.current = Math.abs(velocityRef.current) * 0.4;
        }

        // Rest threshold: stop ticking state updates once truly still.
        if (
          Math.abs(angleRef.current) < 1e-4 &&
          Math.abs(velocityRef.current) < 1e-6
        ) {
          angleRef.current = 0;
          velocityRef.current = 0;
        }

        setAngle(angleRef.current);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTickRef.current = null;
    };
  }, [active]);

  const getPivot = useCallback((): { x: number; y: number } | null => {
    const el = pivotRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  const angleFromPointer = useCallback(
    (clientX: number, clientY: number): number | null => {
      const pivot = getPivot();
      if (!pivot) return null;
      const dx = clientX - pivot.x;
      const dy = clientY - pivot.y;
      // atan2(dx, dy) gives 0 when straight down, positive to the right —
      // exactly the angle the SVG/transform expects.
      const raw = Math.atan2(dx, dy);
      return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw));
    },
    [getPivot],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!mounted) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Some browsers reject capture mid-frame; the move/up handlers still fire.
    }
    const next = angleFromPointer(e.clientX, e.clientY);
    if (next == null) return;
    angleRef.current = next;
    velocityRef.current = 0;
    draggingRef.current = true;
    lastDragAngleRef.current = next;
    lastDragTimeRef.current = performance.now();
    setDragging(true);
    setAngle(next);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const next = angleFromPointer(e.clientX, e.clientY);
    if (next == null) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    velocityRef.current = (next - lastDragAngleRef.current) / dt;
    lastDragAngleRef.current = next;
    lastDragTimeRef.current = now;
    angleRef.current = next;
    setAngle(next);
  };

  const finishDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Safe to ignore — capture may have already been released.
    }
  };

  const stringPath = `M0 0 L0 ${STRING_LENGTH}`;

  return (
    <div
      className={[
        "pointer-events-none absolute z-[55]",
        "transition-opacity duration-500 ease-out motion-reduce:transition-none",
        mounted ? "opacity-100" : "opacity-0",
      ].join(" ")}
      style={{
        top: PIVOT_OFFSET_TOP,
        right: "9%",
        width: 0,
        height: 0,
      }}
      aria-hidden={!active}
    >
      <div
        ref={pivotRef}
        className="absolute"
        style={{ top: 0, left: 0, width: 1, height: 1 }}
      />

      {/* Nail / anchor sticking out of the page edge. */}
      <div
        className="absolute"
        style={{
          top: -3,
          left: -7,
          width: 14,
          height: 14,
          borderRadius: 999,
          background:
            "radial-gradient(circle at 35% 30%, #f4ead0 0%, #c8b27a 45%, #6e5a2c 100%)",
          boxShadow:
            "0 1px 2px rgba(0,0,0,0.55), inset 0 -1px 1px rgba(0,0,0,0.4)",
        }}
      />

      {/* Swinging body: string + frame, rotated about the pivot. */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: -FRAME_WIDTH / 2,
          width: FRAME_WIDTH,
          height: STRING_LENGTH + FRAME_HEIGHT + 24,
          transform: `rotate(${angle}rad)`,
          transformOrigin: `${FRAME_WIDTH / 2}px 0px`,
          willChange: "transform",
        }}
      >
        {/* String. SVG keeps the line crisp and lets us draw a subtle knot. */}
        <svg
          className="absolute"
          style={{
            top: 0,
            left: FRAME_WIDTH / 2 - 6,
            width: 12,
            height: STRING_LENGTH + 4,
            overflow: "visible",
          }}
          viewBox={`-6 0 12 ${STRING_LENGTH + 4}`}
        >
          <path
            d={stringPath}
            stroke="#e7dcb6"
            strokeWidth={1.4}
            strokeLinecap="round"
            fill="none"
            opacity={0.9}
          />
          <path
            d={stringPath}
            stroke="#1a1208"
            strokeWidth={0.6}
            strokeLinecap="round"
            fill="none"
            opacity={0.55}
            transform="translate(0.4 0)"
          />
          {/* knot where string meets the frame */}
          <circle
            cx={0}
            cy={STRING_LENGTH}
            r={2.5}
            fill="#3b2a10"
            opacity={0.85}
          />
        </svg>

        {/* Picture frame. */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerLeave={(e) => {
            // Pointer capture means leave fires only after release; safe.
            if (!draggingRef.current) return;
            finishDrag(e);
          }}
          className={[
            "pointer-events-auto absolute select-none",
            "transition-shadow duration-300 ease-out motion-reduce:transition-none",
            dragging ? "cursor-grabbing" : "cursor-grab",
          ].join(" ")}
          style={{
            top: STRING_LENGTH,
            left: 0,
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            padding: FRAME_PADDING,
            borderRadius: 6,
            background:
              "linear-gradient(180deg, #f0e6c6 0%, #e2d2a3 45%, #c9b377 100%)",
            boxShadow: dragging
              ? "0 18px 36px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.18)"
              : "0 14px 28px rgba(0,0,0,0.45), 0 3px 8px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.18)",
            touchAction: "none",
          }}
          role="img"
          aria-label="Photograph of Sagar Mishra. Drag to swing it."
        >
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              background: "#f9f6eb",
              boxShadow:
                "inset 0 0 0 1px rgba(0,0,0,0.18), inset 0 2px 6px rgba(0,0,0,0.35)",
            }}
          >
            <Image
              src="/sagar.png"
              alt="Sagar Mishra"
              fill
              draggable={false}
              sizes={`${FRAME_WIDTH}px`}
              style={{ objectFit: "cover", pointerEvents: "none" }}
              priority={false}
            />
            {/* Soft highlight across the glass for realism. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0) 60%)",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

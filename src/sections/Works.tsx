"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MarqueeWhatIDo from "@/sections/MarqueeWhatIDo";
import worksData from "@/data/works.data.json";

type Work = {
  company: string;
  designation: string;
  dates: string;
  city: string;
  description: string;
};

const works = worksData as Work[];

const imageByCompany: Record<string, string> = {
  "Lavender.ai": "/lavender.png",
  Comet: "/comet.png",
  Atomberg: "/atomberg.png",
  "Campus Clash India": "/campus%20clash.png",
  "The Fifth Estate": "/fifth%20estate.png",
  "River AI": "/river.png",
};

function renderDescription(work: Work) {
  const idx = work.description.indexOf(" ,");
  if (idx === -1) return work.description;
  const before = work.description.slice(0, idx);
  const after = work.description.slice(idx + 1);
  return (
    <>
      {before}{" "}
      <span className="font-bold text-black">{work.company}</span>
      {after}
    </>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = works.length;

  const computeIndexFromScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;
    const rect = section.getBoundingClientRect();
    const maxTravel = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / maxTravel));
    return Math.min(total - 1, Math.floor(progress * total + 0.0001));
  }, [total]);

  useEffect(() => {
    const update = () => setActiveIndex(computeIndexFromScroll());
    update();

    let rafId = 0;
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [computeIndexFromScroll]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const maxTravel = Math.max(1, section.offsetHeight - window.innerHeight);
      // Aim for the middle of the chunk for the requested index.
      const targetProgress = (index + 0.5) / total;
      const top = sectionTop + targetProgress * maxTravel;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [total],
  );

  const activeWork = works[activeIndex];

  const counter = useMemo(
    () =>
      `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    [activeIndex, total],
  );

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full bg-[#f9f6eb]"
      style={{ minHeight: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <MarqueeWhatIDo />

        <div className="relative mx-auto flex h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-10 px-6 pb-10 pt-6 md:gap-14">
          <div className="relative aspect-[4/5] w-[42%] max-w-[460px] shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-[0_30px_60px_-20px_rgba(11,23,34,0.35)]">
            {works.map((work, index) => {
              const src = imageByCompany[work.company];
              if (!src) return null;
              const isActive = index === activeIndex;
              return (
                <Image
                  key={work.company}
                  src={src}
                  alt={`${work.company} — ${work.designation}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 80vw, 460px"
                  className={[
                    "object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-[1.04]",
                  ].join(" ")}
                />
              );
            })}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <span className="rounded-full bg-black/70 px-3 py-1 font-satoshi text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                {counter}
              </span>
              <span className="rounded-full bg-white/85 px-3 py-1 font-satoshi text-[10px] font-medium uppercase tracking-[0.22em] text-black backdrop-blur-sm">
                {activeWork.city || "—"}
              </span>
            </div>
          </div>

          <div className="relative grid min-w-0 flex-1">
            <div className="col-start-1 row-start-1 self-start font-satoshi text-xs uppercase tracking-[0.28em] text-black/55">
              Selected works
            </div>

            {works.map((work, index) => {
              const isActive = index === activeIndex;
              return (
                <article
                  key={work.company}
                  aria-hidden={!isActive}
                  className={[
                    "col-start-1 row-start-1 pt-8",
                    "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-3 pointer-events-none",
                  ].join(" ")}
                >
                  <h3 className="font-satoshi text-[clamp(36px,4.6vw,64px)] font-black leading-[1] tracking-[-0.02em] text-black">
                    {work.company}
                  </h3>

                  <div className="mt-4 font-satoshi text-[clamp(15px,1.15vw,18px)] font-semibold text-[#3E7CB1]">
                    {work.designation}
                  </div>

                  <div className="mt-2 font-satoshi text-[11px] uppercase tracking-[0.22em] text-black/50">
                    {[work.dates, work.city].filter(Boolean).join(" — ") || "Selected engagement"}
                  </div>

                  <div className="mt-6 h-px w-16 bg-black/20" />

                  <p className="mt-6 max-w-[58ch] font-satoshi text-[clamp(14px,1.05vw,16px)] leading-[1.7] text-black/75">
                    {renderDescription(work)}
                  </p>
                </article>
              );
            })}
          </div>

          <aside
            aria-label="Works progression"
            className="hidden min-w-12 items-center justify-end pr-1 md:flex"
          >
            <div className="flex flex-col gap-3">
              {works.map((work, index) => {
                const isActive = index === activeIndex;
                const reached = index <= activeIndex;
                return (
                  <button
                    key={work.company}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    aria-label={`View ${work.company}`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "group relative flex items-center justify-end",
                      "py-1.5 cursor-pointer",
                      "focus-visible:outline-none",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap",
                        "rounded-md bg-black/85 px-2.5 py-1 font-satoshi text-[10px] uppercase tracking-[0.18em] text-white",
                        "opacity-0 translate-x-1 transition-all duration-200 ease-out",
                        "group-hover:opacity-100 group-hover:translate-x-0",
                        "group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                      ].join(" ")}
                    >
                      {work.company}
                    </span>
                    <span
                      className={[
                        "block h-[2px] rounded-full transition-all duration-300 ease-out",
                        isActive
                          ? "w-20 bg-[#0b1722]"
                          : reached
                            ? "w-14 bg-[#0b1722]/70 group-hover:w-16"
                            : "w-10 bg-[#0b1722]/30 group-hover:w-14 group-hover:bg-[#0b1722]/55",
                      ].join(" ")}
                    />
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

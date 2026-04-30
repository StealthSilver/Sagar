export default function Works() {
  const works = [
    {
      title: "Brand Story Microsite",
      role: "Content + Creative Direction",
      year: "2026",
      tags: ["Strategy", "Copy", "Motion"],
    },
    {
      title: "Campaign Content System",
      role: "Digital Content Manager",
      year: "2025",
      tags: ["Content Ops", "Social", "Guidelines"],
    },
    {
      title: "Launch Narrative & Visuals",
      role: "Creative Producer",
      year: "2025",
      tags: ["Narrative", "Design", "Production"],
    },
  ] as const;

  return (
    <section id="works" className="relative w-full overflow-hidden bg-[#f9f6eb]">
      <div
        className="absolute inset-y-0 left-0 w-[10%] bg-[#0b1722]/[0.06]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="font-satoshi text-xs uppercase tracking-[0.28em] text-black/55">
              Selected works
            </div>
            <h2 className="mt-4 font-satoshi text-[clamp(28px,3.2vw,44px)] font-black leading-[1.04] tracking-[-0.02em] text-black">
              Minimal outputs,
              <span className="text-[#3E7CB1]"> maximum signal</span>.
            </h2>
          </div>

          <div className="hidden sm:block font-satoshi text-sm uppercase tracking-[0.22em] text-black/50">
            03 pieces
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {works.map((work) => (
            <article
              key={work.title}
              className={[
                "group rounded-2xl border border-black/10 bg-white/55 p-6",
                "backdrop-blur-sm",
                "transition-transform duration-300 ease-out motion-reduce:transition-none",
                "hover:-translate-y-1",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-satoshi text-lg font-black tracking-[-0.01em] text-black">
                  {work.title}
                </h3>
                <div className="font-satoshi text-xs font-medium uppercase tracking-[0.18em] text-black/45">
                  {work.year}
                </div>
              </div>

              <div className="mt-2 font-satoshi text-sm font-medium text-black/60">
                {work.role}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className={[
                      "inline-flex items-center rounded-full px-3 py-1",
                      "border border-[#3E7CB1]/30 bg-[#3E7CB1]/[0.06]",
                      "font-satoshi text-xs font-medium uppercase tracking-[0.16em]",
                      "text-[#2b6fa6]",
                    ].join(" ")}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-black/10 via-black/5 to-transparent" />

              <div className="mt-4 flex items-center justify-between">
                <div className="font-satoshi text-xs uppercase tracking-[0.22em] text-black/45">
                  View case
                </div>
                <div
                  className={[
                    "h-10 w-10 rounded-full border border-black/10 bg-white/65",
                    "grid place-items-center",
                    "transition-colors duration-300 ease-out motion-reduce:transition-none",
                    "group-hover:border-[#3E7CB1]/40 group-hover:bg-[#3E7CB1]/[0.08]",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  <span className="text-[#0b1722] group-hover:text-[#3E7CB1]">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <div className="font-satoshi text-sm text-black/60">
            Want the full list?{" "}
            <a
              href="#contact"
              className="font-black text-[#3E7CB1] underline decoration-[#3E7CB1]/40 underline-offset-4 hover:decoration-[#3E7CB1]"
            >
              Let’s talk
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  );
}


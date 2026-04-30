import Link from "next/link";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0b1722]"
    >
      <div
        className="absolute inset-y-0 right-0 w-[28%] bg-[#3E7CB1]/[0.10]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <div className="font-satoshi text-xs uppercase tracking-[0.28em] text-white/65">
            Contact
          </div>
          <h2 className="mt-4 font-satoshi text-[clamp(30px,3.4vw,48px)] font-black leading-[1.04] tracking-[-0.02em] text-white">
            Let’s build something that feels inevitable.
          </h2>
          <p className="mt-5 font-satoshi text-[15px] leading-relaxed text-white/70 sm:text-base">
            I help teams shape content, campaigns, and creative systems — from
            the first line of copy to the final rollout.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="mailto:hello@sagar.work"
            className={[
              "inline-flex w-fit items-center justify-center rounded-full px-6 py-3",
              "bg-[#3E7CB1] text-[#0b1722]",
              "font-satoshi text-sm font-black uppercase tracking-[0.18em]",
              "transition-transform duration-300 ease-out motion-reduce:transition-none",
              "hover:-translate-y-0.5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1722]",
            ].join(" ")}
          >
            Email me
          </Link>

          <a
            href="#works"
            className={[
              "inline-flex w-fit items-center justify-center rounded-full px-6 py-3",
              "border border-white/15 bg-white/[0.04]",
              "font-satoshi text-sm font-black uppercase tracking-[0.18em]",
              "text-white/90",
              "transition-colors duration-300 ease-out motion-reduce:transition-none",
              "hover:bg-white/[0.08] hover:border-white/20",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1722]",
            ].join(" ")}
          >
            See works
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {[
            { k: "Location", v: "Bengaluru, IN" },
            { k: "Availability", v: "Freelance / Full-time" },
            { k: "Focus", v: "Content, campaigns, systems" },
          ].map((item) => (
            <div
              key={item.k}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="font-satoshi text-xs uppercase tracking-[0.24em] text-white/55">
                {item.k}
              </div>
              <div className="mt-2 font-satoshi text-sm font-medium text-white/80">
                {item.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


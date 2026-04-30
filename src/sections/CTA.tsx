import Link from "next/link";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

export default function CTA() {
  const buildCtaText = (textClassName: string) => (
    <>
      <div className={`mb-28 flex justify-end text-right ${textClassName}`}>
        <div>
          <div className="whitespace-nowrap text-[clamp(34px,4vw,54px)] font-black leading-[1.02] tracking-[-0.02em]">
            BRIDGING THE GAP
          </div>
          <div className="mt-2 text-[clamp(16px,1.7vw,22px)] font-medium leading-tight">
            between
          </div>
          <div className="mt-1 whitespace-nowrap text-[clamp(34px,4vw,54px)] font-black leading-[1.02] tracking-[-0.02em]">
            TECHNOLOGY & ARTISARY
          </div>
        </div>
      </div>

      <div className={`max-w-4xl font-satoshi ${textClassName}`}>
        <div className="text-[clamp(34px,4vw,54px)] font-black leading-[1.02] tracking-[-0.02em] uppercase">
          Designing brands
        </div>
        <div className="mt-2 text-[clamp(16px,1.7vw,22px)] font-medium leading-tight">
          that
        </div>
        <div className="mt-1 text-[clamp(34px,4vw,54px)] font-black leading-[1.02] tracking-[-0.02em] uppercase">
          Grow
        </div>
      </div>
    </>
  );

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0b1722]"
    >
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 sm:pb-24 sm:pt-32">
        <MaskContainer
          className="w-full"
          size={48}
          revealSize={380}
          revealText={buildCtaText("text-[#78d6ff]")}
        >
          {buildCtaText("text-white")}
        </MaskContainer>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="mailto:hello@sagar.work"
            className={[
              "inline-flex w-fit items-center justify-center rounded-[8px] px-6 py-3",
              "border border-white/20 bg-white/[0.06] text-white/90",
              "font-satoshi text-sm font-black uppercase tracking-[0.18em]",
              "transition-colors duration-300 ease-out motion-reduce:transition-none",
              "hover:bg-white/[0.10] hover:border-white/30 hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1722]",
            ].join(" ")}
          >
            Email me
          </Link>
        </div>
      </div>
    </section>
  );
}


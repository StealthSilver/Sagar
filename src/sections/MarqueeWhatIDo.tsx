"use client";

import { useId } from "react";

type MarqueeWhatIDoProps = {
  text?: string;
  speedSeconds?: number;
};

export default function MarqueeWhatIDo({
  text = "WHAT I CREATE",
  speedSeconds = 22,
}: MarqueeWhatIDoProps) {
  const labelId = useId();
  const repeatCount = 10;
  const content = Array.from({ length: repeatCount }, (_, i) => (
    <span key={i} className="inline-flex items-center gap-[28px]">
      <span className="sagar-marquee__item">{text}</span>
      <span className="sagar-marquee__sep">•</span>
    </span>
  ));

  return (
    <section
      id="what-i-create"
      aria-labelledby={labelId}
      className="w-full overflow-hidden bg-[#f9f6eb]"
    >
      <h2 id={labelId} className="sr-only">
        {text}
      </h2>

      <div className="border-y-2 border-black">
        <div
          className="sagar-marquee"
          style={
            {
              ["--sagar-marquee-duration" as unknown as string]:
                `${Math.max(6, speedSeconds)}s`,
            } as React.CSSProperties
          }
        >
          <div className="sagar-marquee__inner" aria-hidden="true">
            <div className="sagar-marquee__track">{content}</div>
            <div className="sagar-marquee__track">{content}</div>
          </div>

          <div className="sr-only">{text}</div>
        </div>
      </div>
    </section>
  );
}


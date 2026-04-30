import Image from "next/image";
import Link from "next/link";
import SagarLogo from "@/components/SagarLogo";
import { FaXTwitter } from "react-icons/fa6";

function IconMail(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M4.5 7.25h15A2.25 2.25 0 0 1 21.75 9.5v9A2.25 2.25 0 0 1 19.5 20.75h-15A2.25 2.25 0 0 1 2.25 18.5v-9A2.25 2.25 0 0 1 4.5 7.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3.2 8.4 12 14.2l8.8-5.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLinkedIn(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M5.7 7.6a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z"
        fill="currentColor"
      />
      <path
        d="M4.2 9.2h3v10.6h-3V9.2Z"
        fill="currentColor"
      />
      <path
        d="M10 9.2h2.9v1.45c.42-.86 1.45-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.85v6.98h-3v-6.2c0-1.48-.03-3.4-2.16-3.4-2.16 0-2.49 1.64-2.49 3.29v6.31H10V9.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconInstagram(props: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={props.className}
    >
      <path
        d="M8 3.75h8A4.25 4.25 0 0 1 20.25 8v8A4.25 4.25 0 0 1 16 20.25H8A4.25 4.25 0 0 1 3.75 16V8A4.25 4.25 0 0 1 8 3.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 16.05a4.05 4.05 0 1 0 0-8.1 4.05 4.05 0 0 0 0 8.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M17.2 6.95h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="flex min-h-screen w-full flex-col md:h-[100vh]">
        <div className="relative h-[42vh] w-full overflow-hidden bg-[#0b1722] md:h-1/2">
          <Image
            src="/footer.png"
            alt=""
            fill
            priority={false}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Diffused color overlay */}
          <div
            className={[
              "pointer-events-none absolute inset-0",
              "bg-[#0b1722]/65",
              "mix-blend-multiply",
            ].join(" ")}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(120% 80% at 20% 30%, rgba(62,124,177,0.22) 0%, rgba(11,23,34,0.05) 52%, rgba(11,23,34,0.55) 100%)",
              mixBlendMode: "soft-light",
            }}
            aria-hidden="true"
          />

          {/* Low-opacity noise */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat",
              backgroundSize: "220px 220px",
              mixBlendMode: "overlay",
            }}
            aria-hidden="true"
          />

          <div className="absolute inset-0">
            <div className="mx-auto h-full max-w-7xl px-5 sm:px-6">
              <div className="relative h-full w-full">
                <div className="absolute left-0 top-6 sm:top-10">
                  <div className="max-w-[18ch] text-left font-satoshi text-[clamp(26px,7.4vw,56px)] italic font-light leading-snug tracking-[-0.01em] text-[#f9f6eb]/90 sm:max-w-[26ch]">
                    Because good enough
                    <br />
                    is not that good
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col bg-[#f9f6eb] text-black md:h-1/2 md:flex-none">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-8 sm:px-6 sm:pt-10">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="mt-2">
                  <Link href="/" aria-label="Go to home">
                    <SagarLogo
                      textClassName={[
                        "font-sekuya",
                        "font-black",
                        "text-[clamp(30px,9vw,56px)]",
                        "leading-[1] tracking-[-0.01em]",
                      ].join(" ")}
                      secondaryText="MISHRA"
                      secondaryActive={false}
                      className="text-black"
                    />
                  </Link>
                </div>

                <div className="mt-1 flex items-start sm:mt-2 sm:items-start">
                  <div className="flex flex-col items-start gap-3">
                    <div className="flex flex-row gap-2.5 sm:gap-3">
                    <Link
                      href="mailto:sagarmishra4132@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Email"
                      className={[
                        "group inline-flex h-9 w-9 items-center justify-center rounded-[10px] sm:h-11 sm:w-11",
                        "border border-black/20 bg-black/[0.03]",
                        "text-black/80",
                        "transition-colors duration-300 ease-out motion-reduce:transition-none",
                        "hover:bg-black/[0.06] hover:border-black/30 hover:text-black",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f6eb]",
                      ].join(" ")}
                    >
                      <IconMail className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" />
                    </Link>

                    <Link
                      href="https://x.com/Sagar_mishra_0"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="X"
                      className={[
                        "group inline-flex h-9 w-9 items-center justify-center rounded-[10px] sm:h-11 sm:w-11",
                        "border border-black/20 bg-black/[0.03]",
                        "text-black/80",
                        "transition-colors duration-300 ease-out motion-reduce:transition-none",
                        "hover:bg-black/[0.06] hover:border-black/30 hover:text-black",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f6eb]",
                      ].join(" ")}
                    >
                      <FaXTwitter className="h-[15px] w-[15px] sm:h-[18px] sm:w-[18px]" aria-hidden="true" />
                    </Link>

                    <Link
                      href="https://www.linkedin.com/in/sagar-mishra-3824a9287/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className={[
                        "group inline-flex h-9 w-9 items-center justify-center rounded-[10px] sm:h-11 sm:w-11",
                        "border border-black/20 bg-black/[0.03]",
                        "text-black/80",
                        "transition-colors duration-300 ease-out motion-reduce:transition-none",
                        "hover:bg-black/[0.06] hover:border-black/30 hover:text-black",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f6eb]",
                      ].join(" ")}
                    >
                      <IconLinkedIn className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" />
                    </Link>

                    <Link
                      href="https://www.instagram.com/sagar_mishra_01/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className={[
                        "group inline-flex h-9 w-9 items-center justify-center rounded-[10px] sm:h-11 sm:w-11",
                        "border border-black/20 bg-black/[0.03]",
                        "text-black/80",
                        "transition-colors duration-300 ease-out motion-reduce:transition-none",
                        "hover:bg-black/[0.06] hover:border-black/30 hover:text-black",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f6eb]",
                      ].join(" ")}
                    >
                      <IconInstagram className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]" />
                    </Link>
                    </div>

                    <div className="font-satoshi text-[10px] font-light uppercase tracking-[0.14em] text-black/65 sm:text-[11px] sm:tracking-[0.16em]">
                      BASED IN BENGALURU
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="max-w-md font-satoshi text-[13px] leading-relaxed text-black/70 sm:text-[15px]">
                  Open to content-led design, campaigns, and creative systems
                  from first idea to final rollout.
                </div>

                <div className="mt-5 flex flex-wrap gap-3 sm:mt-7">
                  <a
                    href="#works"
                    className={[
                      "inline-flex w-fit items-center justify-center rounded-[8px] px-5 py-2.5 sm:px-6 sm:py-3",
                      "border border-black/20 bg-black/[0.03]",
                      "font-satoshi text-xs font-black uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.18em]",
                      "text-black/90",
                      "transition-colors duration-300 ease-out motion-reduce:transition-none",
                      "hover:bg-black/[0.06] hover:border-black/30",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/35 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f6eb]",
                    ].join(" ")}
                  >
                    See works
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Full-bleed divider above the copyright row */}
          <div className="mt-8 h-px w-full bg-black/25 sm:mt-0" aria-hidden="true" />

          <div className="mx-auto w-full max-w-7xl px-5 pb-4 pt-3 sm:px-6 sm:pb-4 sm:pt-4">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div className="font-satoshi text-[10px] uppercase tracking-[0.18em] text-black/70 sm:text-xs sm:tracking-[0.22em]">
                © {new Date().getFullYear()} Sagar Mishra
              </div>
              <div className="font-satoshi text-[10px] uppercase tracking-[0.18em] text-black/70 sm:text-xs sm:tracking-[0.22em]">
                An Indie Digital Designer
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


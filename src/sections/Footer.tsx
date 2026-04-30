export default function Footer() {
  return (
    <footer className="w-full bg-[#f9f6eb]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="h-px w-full bg-black/10" />

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="font-satoshi text-sm font-black tracking-[-0.01em] text-black">
              Sagar Mishra
            </div>
            <div className="mt-2 max-w-md font-satoshi text-sm text-black/60">
              A minimal portfolio for content, campaigns, and digital craft.
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "About", href: "#about" },
              { label: "Works", href: "#works" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={[
                  "font-satoshi text-xs font-black uppercase tracking-[0.22em]",
                  "text-black/55",
                  "transition-colors duration-200 ease-out motion-reduce:transition-none",
                  "hover:text-[#3E7CB1]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7CB1]/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f6eb]",
                ].join(" ")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-satoshi text-xs uppercase tracking-[0.22em] text-black/45">
            © {new Date().getFullYear()} Sagar Mishra
          </div>
          <div className="font-satoshi text-xs uppercase tracking-[0.22em] text-black/45">
            Built with Next.js + Tailwind
          </div>
        </div>
      </div>
    </footer>
  );
}


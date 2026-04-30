"use client";

import Link from "next/link";
import { satoshi } from "@/fonts/satoshi";

type NavItem = { label: string; href: string };

const items: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "WORKS", href: "#works" },
  { label: "CONTACT", href: "#contact" },
];

type Props = {
  onAboutClick?: () => void;
  aboutOpen?: boolean;
};

export default function Navigation({ onAboutClick }: Props) {
  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col items-end gap-4 sm:gap-5">
        {items.map((item) => (
          <li key={item.href}>
            {item.label === "ABOUT" ? (
              <button
                type="button"
                onClick={onAboutClick}
                className={[
                  satoshi.className,
                  "text-base sm:text-lg md:text-xl",
                  "uppercase tracking-[0.18em]",
                  "text-[#3E7CB1]",
                  "relative inline-block",
                  "transition-all duration-300 ease-out",
                  "hover:text-[#8fc1ea]",
                  "hover:tracking-[0.24em]",
                  "before:content-[''] before:absolute before:-inset-x-2 before:inset-y-0",
                  "before:rounded-md before:bg-[#3E7CB1]/10",
                  "before:scale-x-0 before:origin-left",
                  "before:transition-transform before:duration-300 before:ease-out",
                  "hover:before:scale-x-100",
                  "focus-visible:before:scale-x-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7CB1]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#12263a]",
                ].join(" ")}
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href}
                className={[
                  satoshi.className,
                  "text-base sm:text-lg md:text-xl",
                  "uppercase tracking-[0.18em]",
                  "text-[#3E7CB1]",
                  "relative inline-block",
                  "transition-all duration-300 ease-out",
                  "hover:text-[#8fc1ea]",
                  "hover:tracking-[0.24em]",
                  "before:content-[''] before:absolute before:-inset-x-2 before:inset-y-0",
                  "before:rounded-md before:bg-[#3E7CB1]/10",
                  "before:scale-x-0 before:origin-left",
                  "before:transition-transform before:duration-300 before:ease-out",
                  "hover:before:scale-x-100",
                  "focus-visible:before:scale-x-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7CB1]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#12263a]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
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

export default function Navigation({ onAboutClick, aboutOpen = false }: Props) {
  const onWorksClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const worksSection = document.getElementById("works");
    if (!worksSection) return;

    const marqueeSection =
      document.getElementById("what-i-create") ?? worksSection;
    const targetTop = window.scrollY + marqueeSection.getBoundingClientRect().top;

    window.history.replaceState(null, "", "#works");
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  };

  const onContactClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const doc = document.documentElement;
    const targetTop = Math.max(
      0,
      (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight,
    );

    window.history.replaceState(null, "", "#contact");
    // Jump instantly so the works section isn't shown while scrolling.
    window.scrollTo({
      top: targetTop,
      behavior: "auto",
    });
  };

  const linkClasses = [
    satoshi.className,
    "text-base sm:text-lg md:text-xl",
    "uppercase tracking-[0.18em]",
    "text-[#3E7CB1]",
    "relative inline-block",
    "transition-colors duration-300 ease-out",
    "hover:text-[#8fc1ea]",
    "before:content-[''] before:absolute before:-inset-x-2 before:inset-y-0",
    "before:rounded-md before:bg-[#3E7CB1]/10",
    "before:scale-x-0 before:origin-left",
    "before:transition-transform before:duration-300 before:ease-out",
    "hover:before:scale-x-100",
    "focus-visible:before:scale-x-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7CB1]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1722]",
  ].join(" ");

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col items-end gap-4 sm:gap-5">
        {items.map((item) => {
          if (item.label === "ABOUT") {
            const label = aboutOpen ? "HOME" : "ABOUT";
            return (
              <li key="about-toggle">
                <button
                  type="button"
                  onClick={onAboutClick}
                  aria-pressed={aboutOpen}
                  aria-label={aboutOpen ? "Return to home" : "Open about"}
                  className={linkClasses}
                >
                  {label}
                </button>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={
                  item.href === "#works"
                    ? onWorksClick
                    : item.href === "#contact"
                      ? onContactClick
                      : undefined
                }
                className={linkClasses}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

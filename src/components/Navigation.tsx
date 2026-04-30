import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

type NavItem = { label: string; href: string };

const items: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "WORKS", href: "#works" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  return (
    <nav aria-label="Primary">
      <ul className="flex flex-col items-end gap-4 sm:gap-5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={[
                playfair.className,
                "text-sm sm:text-base",
                "uppercase tracking-[0.22em]",
                "text-[#3E7CB1]",
                "transition-all duration-200 ease-out",
                "hover:text-[#74a9d6]",
                "hover:underline hover:underline-offset-8 hover:decoration-[#3E7CB1]/60",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7CB1]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#12263a]",
              ].join(" ")}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

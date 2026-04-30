import localFont from "next/font/local";

export const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "./satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./satoshi/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-VariableItalic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  display: "swap",
});


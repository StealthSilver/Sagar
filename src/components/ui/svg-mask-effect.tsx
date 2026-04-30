"use client";

import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useRef,
  useState,
} from "react";

type MaskContainerProps = {
  children?: ReactNode;
  revealText?: ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
};

export const MaskContainer = ({
  children,
  revealText,
  size = 24,
  revealSize = 360,
  className,
}: MaskContainerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const maskSize = isHovered ? revealSize : size;

  const maskStyles: CSSProperties = {
    maskImage: "url('/mask.svg')",
    WebkitMaskImage: "url('/mask.svg')",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
    WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
    maskSize: `${maskSize}px`,
    WebkitMaskSize: `${maskSize}px`,
    transition: "mask-size 300ms ease-in-out, -webkit-mask-size 300ms ease-in-out",
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 z-20" style={maskStyles}>
        {revealText}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

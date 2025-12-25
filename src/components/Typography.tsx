import { ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export const H1 = ({ children, className = "" }: TypographyProps) => (
  <h1 className={`font-heading text-[clamp(3rem,6vw,4.5rem)] leading-[1.15] tracking-[-0.01em] font-semibold ${className}`}>
    {children}
  </h1>
);

export const H2 = ({ children, className = "" }: TypographyProps) => (
  <h2 className={`font-heading text-[clamp(2.2rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em] font-semibold ${className}`}>
    {children}
  </h2>
);

export const H3 = ({ children, className = "" }: TypographyProps) => (
  <h3 className={`font-heading text-[1.75rem] leading-[1.15] tracking-[-0.01em] font-semibold ${className}`}>
    {children}
  </h3>
);

export const H4 = ({ children, className = "" }: TypographyProps) => (
  <h4 className={`font-heading text-[1.4rem] leading-[1.2] tracking-[-0.01em] font-semibold ${className}`}>
    {children}
  </h4>
);

export const Body = ({ children, className = "" }: TypographyProps) => (
  <p className={`font-body text-base leading-[1.7] text-gray-custom ${className}`}>
    {children}
  </p>
);

export const Label = ({ children, className = "" }: TypographyProps) => (
  <span className={`font-body text-[0.85rem] font-medium tracking-[0.04em] uppercase text-[#6b6b6b] ${className}`}>
    {children}
  </span>
);

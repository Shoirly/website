import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[background-color,color,border-color,transform] duration-150 ease-out active:translate-y-px select-none";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-[#21363a]",
  secondary: "border border-ink/80 text-ink hover:bg-ink-soft",
  quiet: "text-ink hover:text-seal-deep underline decoration-rule-strong underline-offset-[0.22em] hover:decoration-current",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  const sizeClass = variant === "quiet" ? "text-base" : sizes[size];
  return `${base} ${variants[variant]} ${sizeClass} ${className}`;
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Internal routes use next/link; mailto and external links use a plain anchor. */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}

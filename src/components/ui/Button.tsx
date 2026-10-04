import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-[background-color,color,border-color] duration-[var(--sh-dur-fast)] ease-[var(--sh-ease)] select-none";

const variants: Record<Variant, string> = {
  // Brand buttons (BRAND.md section 8): primary = blue fill, one per view.
  primary: "bg-sh-accent text-sh-on-accent hover:bg-sh-accent-hover",
  secondary: "border border-sh-text text-sh-text hover:bg-sh-bg-subtle",
  quiet: "text-sh-accent-text underline-offset-[0.22em] hover:underline",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-base",
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

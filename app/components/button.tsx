import { ReactNode, ButtonHTMLAttributes } from "react";
type ButtonVariant = "ghost" | "secondary" | "primary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: ButtonVariant;
  isActive?: boolean;
  icon?: ReactNode;
  badge?: number | string;
}

export default function Button({
  title,
  variant = "ghost",
  isActive = false,
  icon,
  badge,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    ghost: "bg-transparent text-stone-800 hover:bg-stone-200/50",
    secondary: "bg-[#F3D7C6] text-[#5C2303] hover:bg-[#ebd0be]",
    primary: "bg-[#7A2E05] text-white hover:bg-[#662604]",
  };

  const currentVariant = isActive ? "secondary" : variant;

  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-medium transition-colors cursor-pointer ${variantStyles[currentVariant]} ${className}`}
    >
      {icon && (
        <span className="inline-flex items-center justify-center size-5 shrink-0">
          {icon}
        </span>
      )}

      {title || children}

      {badge !== undefined && (
        <span className="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-[#7A2E05] text-xs font-bold text-white leading-none">
          {badge}
        </span>
      )}
    </button>
  );
}

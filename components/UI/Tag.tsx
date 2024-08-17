import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const randomColor = () => {
  const colors = [
    "bg-rose-50",
    "bg-amber-50",
    "bg-lime-50",
    "bg-cyan-50",
    "bg-sky-50",
    "bg-violet-50",
    "bg-fuchsia-50",
    "bg-emerald-50",

  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors shadow-md",
  {
    variants: {
      variant: {
        default: `bg-gray-300 text-gray-900`,
      },
      size: {
        default: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type Props = {} & ComponentProps<"span"> & VariantProps<typeof tagVariants>;
const Tag = async ({ className, variant, size, children, ...props }: Props) => {
  return (
    <span className={cn(tagVariants({ variant, size }),randomColor(), className)} {...props}>
      {" "}
      {children}
    </span>
  );
};

export default Tag;

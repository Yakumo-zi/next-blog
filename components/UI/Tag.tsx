import { cn, randomColors } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
const tagVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
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
    <span className={cn(tagVariants({ variant, size }), className)} {...props}>
      {" "}
      {children}
    </span>
  );
};

export default Tag;

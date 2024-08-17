"use client";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useEffect, useState } from "react";

const tagVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all ease-in-out shadow-md hover:-translate-y-1 cursor-pointer",
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
const Tag = ({ className, variant, size, children, ...props }: Props) => {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  );
};

export default Tag;

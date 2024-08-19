"use client";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, useEffect, useState } from "react";

const tagVariants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium shadow-md transition-all ease-in-out hover:-translate-y-1",
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
  },
);

type Props = {
  callback?: Function;
} & ComponentProps<"span"> &
  VariantProps<typeof tagVariants>;
const Tag = ({
  className,
  variant,
  size,
  children,
  callback,
  ...props
}: Props) => {
  return (
    <span
      onClick={(e) => callback && callback(e)}
      className={cn(tagVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Tag;

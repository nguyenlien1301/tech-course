"use client";
import React from "react";

import { cn } from "@/shared/utils/common";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}
const Heading = ({ children, className }: HeadingProps) => {
  return (
    <h2 className={cn("text-2xl lg:text-3xl font-bold mb-5", className)}>
      {children}
    </h2>
  );
};

export default Heading;

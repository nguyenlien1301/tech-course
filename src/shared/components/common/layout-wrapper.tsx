"use client";
import React from "react";

import { useSidebarContext } from "@/shared/contexts";
import { cn } from "@/shared/utils";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isButtonActive } = useSidebarContext();

  return (
    <div
      className={cn(
        "wrapper block h-screen pb-20 lg:grid lg:pb-0 lg:grid-cols-[300px,minmax(0,1fr)] transition-all duration-300 ease-in-out",
        isButtonActive
          ? "lg:grid-cols-[80px,minmax(0,1fr)]"
          : "lg:grid-cols-[300px,minmax(0,1fr)]",
      )}
    >
      {children}
    </div>
  );
};

export default LayoutWrapper;

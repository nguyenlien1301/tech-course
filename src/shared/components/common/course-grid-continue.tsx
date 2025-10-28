"use client";
import React from "react";

import CourseItemSkeleton from "@/modules/course/components/course-item-skeleton";

const CourseGridContinue = ({
  children,
  isLoading,
  layout,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  layout: string;
}) => {
  if (layout === "grid") {
    if (isLoading) {
      return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 lg:gap-8">
          {Array.from({ length: 3 })
            .fill(0)
            .map((_, index) => (
              <CourseItemSkeleton key={index} />
            ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 lg:gap-8">
        {children}
      </div>
    );
  }

  if (layout === "row" && isLoading) {
    return (
      <div className="grid grid-cols-[repeat(minmax(300px,1fr))] gap-4 xl:grid-cols-[repeat(2,minmax(300px,1fr))] xl:gap-8">
        {Array.from({ length: 4 })
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="borderDarkMode bgDarkMode flex gap-5 rounded-2xl p-4"
            >
              <div className="aspect-square h-32 animate-pulse rounded-lg bg-gray-200" />
              <div className="flex flex-1 flex-col">
                <div className="mb-3 h-6 max-w-96 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-5 w-52 animate-pulse rounded-lg bg-gray-200" />
                <div className="ml-auto mt-auto h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(minmax(300px,1fr))] gap-4 xl:grid-cols-[repeat(2,minmax(300px,1fr))] xl:gap-8">
      {children}
    </div>
  );
};

export default CourseGridContinue;

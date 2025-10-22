"use client";
import React from "react";

import CourseItemSkeleton from "@/modules/course/components/course-item-skeleton";

const CourseGrid = ({
  children,
  isFetching,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
  isFetching?: boolean;
}) => {
  if (isLoading || isFetching) {
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
};

export default CourseGrid;

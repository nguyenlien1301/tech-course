"use client";

import { useSearchParams } from "next/navigation";

import { IconArrowDownCircle, IconClock } from "@/shared/components/icons";
import { useQueryString } from "@/shared/hooks";
import { cn } from "@/shared/utils";

const CommentSorting = () => {
  const params = useSearchParams();
  const sortValue = params.get("sort");
  const { createQueryString } = useQueryString();
  const handleSortCommentRecent = () => {
    createQueryString("sort", "recent");
  };
  const handleSortCommentOldest = () => {
    createQueryString("sort", "oldest");
  };

  return (
    <div className="w-35 flex items-center gap-3">
      <p className="mb-2 text-sm font-medium">Sort by</p>
      <div className="rounded-md border border-gray-200 bg-white">
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50",
            sortValue === "recent" ? "text-secondary font-bold" : "",
          )}
          onClick={handleSortCommentRecent}
        >
          <IconClock className="size-4" />
          <span className="text-xs">Mới nhất</span>
        </button>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50",
            sortValue === "oldest" ? "text-secondary font-bold" : "",
          )}
          onClick={handleSortCommentOldest}
        >
          <IconArrowDownCircle className="size-4" />
          <span className="text-xs">Cũ nhất</span>
        </button>
      </div>
    </div>
  );
};

export default CommentSorting;

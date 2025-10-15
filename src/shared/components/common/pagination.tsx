"use client";

import { debounce } from "lodash";
import { ChangeEvent, useMemo } from "react";

import {
  IconChevronDoubleLeft,
  IconChevronDoubleRight,
  IconChevronLeft,
  IconChevronRight,
} from "@/shared/components/icons";
import { ITEM_PER_PAGE } from "@/shared/constants";
import { useQueryString } from "@/shared/hooks";

import { Input } from "../ui";

interface PaginationProps {
  total: number; // tổng số sản phẩm
}

const PAGE_STEP = 1; // số page hiển thị 2 bên currentPage

const Pagination = ({ total }: PaginationProps) => {
  const { currentPage, handleChangePage } = useQueryString();

  // tổng số trang
  const totalPages = useMemo(() => {
    return Math.ceil(total / ITEM_PER_PAGE) || 1;
  }, [total]);

  // list các page cần hiển thị
  const pageList = useMemo(() => {
    let start = currentPage - PAGE_STEP;
    let end = currentPage + PAGE_STEP;

    if (start < 1) {
      start = 1;
      end = Math.min(start + PAGE_STEP * 2, totalPages);
    }
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - PAGE_STEP * 2, 1);
    }

    const list: number[] = [];

    for (let i = start; i <= end; i++) {
      list.push(i);
    }

    return list;
  }, [currentPage, totalPages]);

  const onInputChangePage = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const inputVal = event.target.value;

    // Nếu rỗng thì cho phép, không ép về 1
    if (inputVal === "") return;

    let value = Number(inputVal);

    if (value < 1) value = 1;
    if (value > totalPages) value = totalPages;

    event.target.value = value.toString();
    handleChangePage(value);
  }, 250);

  if (total <= ITEM_PER_PAGE) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* First */}
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(1)}
      >
        <IconChevronDoubleLeft className="size-4" />
      </PaginationButton>

      {/* Prev */}
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        <IconChevronLeft className="size-4" />
      </PaginationButton>

      {/* Page numbers */}
      {pageList.map((pageNum) => (
        <button
          key={pageNum}
          className={`flex size-10 items-center justify-center rounded-full font-medium shadow-sm ${
            currentPage === pageNum
              ? "bg-secondary text-white dark:bg-primary"
              : "bgDarkMode bg-white hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => handleChangePage(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {/* Next */}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        <IconChevronRight className="size-4" />
      </PaginationButton>

      {/* Last */}
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleChangePage(totalPages)}
      >
        <IconChevronDoubleRight className="size-4" />
      </PaginationButton>

      {/* Jump input */}
      <Input
        className="ml-3 h-8 w-20 rounded-full border bg-white px-2 text-center font-medium shadow-sm outline-none"
        defaultValue={currentPage}
        max={totalPages}
        min={1}
        placeholder="1"
        type="number"
        onChange={onInputChangePage}
      />
    </div>
  );
};

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

function PaginationButton({
  children,
  disabled,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      className="bgDarkMode flex size-10 items-center justify-center rounded-full bg-white p-2 shadow-sm hover:bg-gray-200 disabled:bg-gray-300 dark:hover:bg-gray-600 dark:disabled:bg-gray-700 dark:disabled:hover:bg-gray-700"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Pagination;

"use client";
import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const params = useSearchParams();

  return {
    page: Number.parseInt(params.get("page") || "1", 10),
    limit: Number.parseInt(params.get("limit") || "10", 10),
    search: params.get("search") || "",
    status: params.get("status") || "",
    active: params.get("active") || "",
  };
};

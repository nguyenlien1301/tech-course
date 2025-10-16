"use client";

import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

import SkeletonTableRating from "@/modules/rating/components/skeleton-table-rating";
import {
  useMutationUpdateRating,
  useQueryFetchRating,
  useQueryFetchRatingSummary,
} from "@/modules/rating/libs";
import { useMutationDeleteRating } from "@/modules/rating/libs/mutation/mutation-rating.data";
import {
  BadgeStatus,
  EmptyData,
  Heading,
  Pagination,
  TableAction,
  TableActionItem,
  TotalCount,
} from "@/shared/components/common";
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui";
import { allValue, ITEM_PER_PAGE, RatingStatus } from "@/shared/constants";
import { ratingList, ratingStatus } from "@/shared/constants/rating-constant";
import { formatDate } from "@/shared/helper";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";

import RatingSummary from "./components/rating-summary";

const RatingManageContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleSearchData, handleSelectStatus, handleSetDefaultStatus } =
    useQueryString();
  const { data: ratingSummaryData } = useQueryFetchRatingSummary();
  const mutationUpdateRating = useMutationUpdateRating();
  const mutationDeleteRating = useMutationDeleteRating();
  const { data, isFetching } = useQueryFetchRating({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  const ratings = data?.ratings || [];
  const total = data?.total || 0;
  const handleUpdateRating = async (id: string) => {
    try {
      await mutationUpdateRating.mutateAsync(id);
    } catch (error) {
      console.log("🚀error handleUpdateRating ---->", error);
    }
  };

  const handleDeleteRating = (id: string) => {
    Swal.fire({
      title: "Bạn có muốn xoá đánh giá này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutationDeleteRating.mutateAsync(id);
      }
    });
  };

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading>Quản lý đánh giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
          </div>
          <Select
            defaultValue={handleSetDefaultStatus("status")}
            onValueChange={(value) => handleSelectStatus(value as RatingStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {ratingStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TotalCount text="Tổng số đánh giá" total={total} />
      <Table className="table-reponsive">
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khoá học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!isFetching && <SkeletonTableRating />}
          {!isFetching && ratings.length === 0 && (
            <EmptyData text="Không có đánh giá nào" />
          )}
          {!isFetching &&
            ratings.length > 0 &&
            ratings.map((rating) => {
              // ratingStatusItem: lấy ratingStatus đã tạo bên constant dùng find để lấy ra status (phần tử đầu tiên thoả mãn điều kiện) lấy value nếu bằng với rating.status trong api thì lấy cái status đó.
              const ratingStatusItem = ratingStatus.find(
                (status) => status.value === rating.status,
              );
              const icon = ratingList.find(
                (item) => item.value === rating.rate,
              )?.title;

              return (
                <TableRow key={rating.rate}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <strong>{rating.content}</strong>
                        <Image
                          alt="icon"
                          height={20}
                          src={`/rating/${icon}.png`}
                          width={20}
                        />
                      </div>
                      <time className="text-xs text-slate-500 lg:text-sm">
                        {formatDate(rating.created_at)}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="font-semibold transition-all hover:text-secondary"
                      href={`/course/${rating.course.slug}`}
                      target="_blank"
                    >
                      {rating.course.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user.name}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={ratingStatusItem?.title}
                      variant={ratingStatusItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      {rating.status !== RatingStatus.ACTIVE && (
                        <TableActionItem
                          type="approve"
                          onClick={() => handleUpdateRating(rating._id)}
                        />
                      )}
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteRating(rating._id)}
                      />
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination total={total} />
      <RatingSummary ratings={ratingSummaryData} />
    </>
  );
};

export default RatingManageContainer;

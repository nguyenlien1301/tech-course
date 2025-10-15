"use client";

import Swal from "sweetalert2";

import SkeletonTableCoupon from "@/modules/coupon/components/skeleton-table-coupon";
import {
  useMutationDeleteCoupon,
  useQueryFetchCoupon,
} from "@/modules/coupon/libs";
import {
  BadgeStatus,
  BouncedLink,
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
import {
  allValue,
  couponStatus,
  CouponType,
  ITEM_PER_PAGE,
} from "@/shared/constants";
import { formatCurrency, formatDate } from "@/shared/helper";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";

const ManageCouponContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleChangeQs, handleSearchData, handleSetDefaultStatus } =
    useQueryString();
  const { data, isFetching } = useQueryFetchCoupon({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    active: searchParams.active,
  });

  const mutationDeleteCoupon = useMutationDeleteCoupon();

  const coupons = data?.coupons || [];
  const total = data?.total || 0;
  const handleDeleteCoupon = async (code: string) => {
    Swal.fire({
      title: "Bạn có muốn xoá mã giảm giá này không?",
      text: "Bạn sẽ không thể hoàn tác đều này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Huỷ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutationDeleteCoupon.mutateAsync(code);
      }
    });
  };

  return (
    <>
      <BouncedLink url="/manage/coupon/new" />
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading>Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
          </div>
          <Select
            defaultValue={handleSetDefaultStatus("status")}
            onValueChange={(value) => handleChangeQs("active", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {couponStatus.map((status) => (
                  <SelectItem key={status.value} value={`${status.value}`}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TotalCount text="Tổng số mã giảm giá" total={total} />
      <Table className="table-reponsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Hạn sử dụng</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!isFetching && <SkeletonTableCoupon />}
          {!isFetching && coupons.length === 0 && (
            <EmptyData text="Không mã giảm giá hàng nào" />
          )}
          {!isFetching &&
            coupons.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon.code}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>{coupon.title}</TableCell>
                <TableCell>
                  {coupon.type === CouponType.AMOUNT ? (
                    <>{formatCurrency(coupon.value)} vnd</>
                  ) : (
                    <>{coupon.value} %</>
                  )}
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {formatDate(coupon.start_date)} --{" "}
                    {formatDate(coupon.end_date)}
                  </span>
                </TableCell>
                <TableCell>
                  {coupon.used === coupon.limit ? (
                    <strong>{coupon.used}</strong>
                  ) : (
                    <>{coupon.used}</>
                  )}{" "}
                  / <strong>{coupon.limit}</strong>
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <BadgeStatus title="Đang hoạt động" variant="success" />
                  ) : (
                    <BadgeStatus title="Chưa kích hoạt" variant="warning" />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    />
                    <TableActionItem
                      type="delete"
                      onClick={() => handleDeleteCoupon(coupon.code)}
                    />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination total={total} />
    </>
  );
};

export default ManageCouponContainer;

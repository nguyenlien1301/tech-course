"use client";

import { SelectGroup } from "@radix-ui/react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import SkeletonTableOrder from "@/modules/order/components/skeleton-table-order";
import {
  useMutationUpdateOrder,
  useQueryFetchOrder,
  useQueryFetchOrderSummary,
} from "@/modules/order/libs";
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
import { allValue, ITEM_PER_PAGE, OrderStatus } from "@/shared/constants";
import { orderStatus } from "@/shared/constants/order-constant";
import { formatCurrency } from "@/shared/helper";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";
import { cn } from "@/shared/utils/common";

import OrderSummary from "./components/order-summary";

const OrderManageContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleSearchData, handleSelectStatus, handleSetDefaultStatus } =
    useQueryString();
  const mutationUpdateOrder = useMutationUpdateOrder();
  const { data: orderSummaryData } = useQueryFetchOrderSummary();

  console.log("🚀orderSummaryData---->", orderSummaryData);
  const { data, isFetching } = useQueryFetchOrder({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  const orders = data?.orders || [];
  const total = data?.total || 0;
  const handleUpdateOrder = async ({
    orderId,
    status,
  }: {
    orderId: string;
    status: OrderStatus;
  }) => {
    try {
      if (status === OrderStatus.CANCELED) {
        Swal.fire({
          title: "Bạn có muốn huỷ đơn hàng không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Thoát",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const hasResult = await mutationUpdateOrder.mutateAsync({
              orderId,
              status,
            });

            if (hasResult?.success) {
              toast.success("Huỷ đơn hàng thành công");
            }
          }
        });
      }
      //   if (status === OrderStatus.PENDING) {
      //     Swal.fire({
      //       title: "Bạn có muốn quay lại chờ duyệt đơn hàng không?",
      //       icon: "warning",
      //       showCancelButton: true,
      //       confirmButtonColor: "#3085d6",
      //       cancelButtonColor: "#d33",
      //       confirmButtonText: "Đồng ý",
      //       cancelButtonText: "Thoát",
      //     }).then(async (result) => {
      //       if (result.isConfirmed) {
      //         const response = await updateOrder({
      //           orderId,
      //           status,
      //         });
      //         if (response?.success) {
      //           toast.success("Quay lại chờ duyệt đơn hàng thành công");
      //         }
      //       }
      //     });
      //   }
      if (status === OrderStatus.COMPLETED) {
        const hasResult = await mutationUpdateOrder.mutateAsync({
          orderId,
          status,
        });

        if (hasResult?.success) {
          toast.success("Duyệt đơn hàng thành công");
        }
      }
    } catch (error) {
      console.log("🚀error handleCompleteOrder ---->", error);
    }
  };

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
          </div>
          <Select
            defaultValue={handleSetDefaultStatus("status")}
            onValueChange={(value) => handleSelectStatus(value as OrderStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {orderStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TotalCount text="Tổng số đơn hàng" total={total} />
      <Table className="table-reponsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khoá học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!isFetching && <SkeletonTableOrder />}
          {!isFetching && orders.length === 0 && (
            <EmptyData text="Không có đơn hàng nào" />
          )}
          {!isFetching &&
            orders.length > 0 &&
            orders.map((order) => {
              const orderStatusItem = orderStatus.find(
                (status) => status.value === order.status,
              );

              return (
                <TableRow key={order.code}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.username}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{formatCurrency(order.amount)}</span>
                      {order.discount > 0 && (
                        <span>{formatCurrency(order.discount)}</span>
                      )}
                      <span
                        className={cn(
                          `${orderStatusItem?.className}`,
                          "font-bold bg-transparent",
                        )}
                      >
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{order.coupon?.code}</strong>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={orderStatusItem?.title}
                      variant={orderStatusItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    {order.status !== OrderStatus.CANCELED && (
                      <TableAction>
                        {order.status !== OrderStatus.COMPLETED && (
                          <TableActionItem
                            type="approve"
                            onClick={() =>
                              handleUpdateOrder({
                                orderId: order._id,
                                status: OrderStatus.COMPLETED,
                              })
                            }
                          />
                        )}
                        <TableActionItem
                          type="cancel"
                          onClick={() =>
                            handleUpdateOrder({
                              orderId: order._id,
                              status: OrderStatus.CANCELED,
                            })
                          }
                        />
                      </TableAction>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination total={total} />
      <OrderSummary orders={orderSummaryData} />
    </>
  );
};

export default OrderManageContainer;

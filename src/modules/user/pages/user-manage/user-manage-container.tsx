"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { deleteUser, updateUser } from "@/modules/user/actions";
import SkeletonTableUser from "@/modules/user/components/skeleton-table-user";
import { useQueryFetchUser } from "@/modules/user/libs";
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
import {
  allValue,
  ITEM_PER_PAGE,
  UserRole,
  UserStatus,
} from "@/shared/constants";
import { userStatus } from "@/shared/constants/user-constant";
import { formatDate } from "@/shared/helper";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";

const UserManageContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleSearchData, handleSelectStatus, handleSetDefaultStatus } =
    useQueryString();

  const { data, isFetching } = useQueryFetchUser({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  const users = data?.users || [];
  const total = data?.total || 0;
  const handleCompleteUser = async ({
    status,
    userId,
  }: {
    userId: string;
    status: UserStatus;
  }) => {
    try {
      if (status === UserStatus.BANED) {
        Swal.fire({
          title: "Bạn có muốn cấm tài khoản này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Thoát",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await updateUser({
              userId,
              status,
            });
          }
        });
      }
      if (status === UserStatus.UNACTIVE) {
        Swal.fire({
          title: "Bạn có muốn quay lại chưa kích hoạt không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Thoát",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await updateUser({
              userId,
              status,
            });

            if (response?.success) {
              toast.success("Quay lại trạng thái chưa kích hoạt thành công");
            }
          }
        });
      }
      if (status === UserStatus.ACTIVE) {
        const hasResult = await updateUser({
          userId,
          status,
        });

        if (hasResult?.success) {
          toast.success("Duyệt thành viên thành công");
        }
      }
    } catch (error) {
      console.log("🚀error handleCompleteUser ---->", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      Swal.fire({
        title: "Bạn có muốn xoá tài khoản này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Thoát",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(userId);
        }
      });
    } catch (error) {
      console.log("🚀error handleDeleteUser ---->", error);
    }
  };

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading>Quản lý thành viên</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
          </div>
          <Select
            defaultValue={handleSetDefaultStatus("status")}
            onValueChange={(value) => handleSelectStatus(value as UserStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {userStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TotalCount text="Tổng số thành viên" total={total} />
      <Table className="table-reponsive">
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Tên người dùng</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!isFetching && <SkeletonTableUser />}
          {!isFetching && users.length === 0 && (
            <EmptyData text="Không có người dùng nào" />
          )}
          {!isFetching &&
            users.length > 0 &&
            users.map((user) => {
              // ratingStatusItem: lấy ratingStatus đã tạo bên constant dùng find để lấy ra status (phần tử đầu tiên thoả mãn điều kiện) lấy value nếu bằng với rating.status trong api thì lấy cái status đó.
              const userStatusItem = userStatus.find(
                (status) => status.value === user.status,
              );

              return (
                <TableRow key={user._id}>
                  <TableCell>
                    <Image
                      alt="avatar"
                      className="rounded-full"
                      height={50}
                      src={user.avatar}
                      width={50}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <strong>{user.role}</strong>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={userStatusItem?.title}
                      variant={userStatusItem?.variant}
                    />
                  </TableCell>
                  <TableCell>
                    {user.role !== UserRole.ADMIN && (
                      <TableAction>
                        {user.status === UserStatus.UNACTIVE && (
                          <>
                            <TableActionItem
                              type="approve"
                              onClick={() =>
                                handleCompleteUser({
                                  userId: user._id,
                                  status: UserStatus.ACTIVE,
                                })
                              }
                            />
                          </>
                        )}
                        {user.status !== UserStatus.UNACTIVE && (
                          <TableActionItem
                            type="back"
                            onClick={() =>
                              handleCompleteUser({
                                userId: user._id,
                                status: UserStatus.UNACTIVE,
                              })
                            }
                          />
                        )}
                        {user.status !== UserStatus.BANED && (
                          <TableActionItem
                            type="cancel"
                            onClick={() =>
                              handleCompleteUser({
                                userId: user._id,
                                status: UserStatus.BANED,
                              })
                            }
                          />
                        )}
                        {user.status === UserStatus.BANED && (
                          <TableActionItem
                            type="delete"
                            onClick={() => handleDeleteUser(user._id)}
                          />
                        )}
                      </TableAction>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination total={total} />
    </>
  );
};

export default UserManageContainer;

// trang thái mới tạo là unactive thì phải có icon check (duyệt).
//

"use client";

import { SelectGroup } from "@radix-ui/react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import SkeletonTableComment from "@/modules/comment/components/skeleton-table-comment";
import {
  useMutationDeleteComment,
  useMutationUpdateComment,
  useQueryFetchComment,
  useQueryFetchCommentsSummary,
} from "@/modules/comment/libs";
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
import { allValue, CommentStatus, ITEM_PER_PAGE } from "@/shared/constants";
import { commentStatus } from "@/shared/constants/comment-constant";
import { formatDate, timeAgo } from "@/shared/helper";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";

import CommentSummary from "./components/comment-summary";

const CommentManageContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleSearchData, handleSelectStatus, handleSetDefaultStatus } =
    useQueryString();
  const { data: commentSummaryData } = useQueryFetchCommentsSummary();
  const mutationUpdateComment = useMutationUpdateComment();
  const mutationDeleteComment = useMutationDeleteComment();
  const { data, isFetching } = useQueryFetchComment({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  const comments = data?.comments || [];
  const total = data?.total || 0;
  const handleUpdateComment = async ({
    commentId,
    status,
  }: {
    commentId: string;
    status: CommentStatus;
  }) => {
    try {
      if (status === CommentStatus.CANCELED) {
        Swal.fire({
          title: "Bạn có muốn huỷ bình luận này không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Thoát",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await mutationUpdateComment.mutateAsync({
              commentId,
              status,
            });
          }
        });
      }
      if (status === CommentStatus.COMPLETED) {
        const hasResult = await mutationUpdateComment.mutateAsync({
          commentId,
          status,
        });

        if (hasResult?.success) {
          toast.success("Duyệt bình luận thành công");
        }
      }
    } catch (error) {
      console.log("🚀error handleUpdateComment ---->", error);
    }
  };

  const handleChangeStatusComment = ({
    commentId,
    status,
  }: {
    commentId: string;
    status: CommentStatus;
  }): void => {
    try {
      if (status === CommentStatus.COMPLETED) {
        Swal.fire({
          title: "Bạn có muốn cập nhật trạng thái không?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Đồng ý",
          cancelButtonText: "Thoát",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const hasResult = await mutationUpdateComment.mutateAsync({
              commentId,
              status:
                status === CommentStatus.COMPLETED
                  ? CommentStatus.PENDING
                  : CommentStatus.COMPLETED,
            });

            if (hasResult?.success) {
              toast.success("Cập nhật trạng thái thành công");
            }
          }
        });
      }
    } catch (error) {
      console.log("🚀error handleChangeStatusComment ---->", error);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    try {
      Swal.fire({
        title: "Bạn có muốn xoá bình luận này không?",
        text: "Bạn sẽ không thể hoàn tác đều này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Thoát",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hasResult = await mutationDeleteComment.mutateAsync(commentId);

          if (hasResult?.success) {
            toast.success("Xoá bình luận thành công");
          }
        }
      });
    } catch (error) {
      console.log("🚀error handleDeleteComment---->", error);
    }
  };

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading>Quản lý bình luận</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
          </div>
          <Select
            defaultValue={handleSetDefaultStatus("status")}
            onValueChange={(value) =>
              handleSelectStatus(value as CommentStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {commentStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TotalCount text="Tổng số bình luận" total={total} />
      <Table className="table-reponsive">
        <TableHeader>
          <TableRow>
            <TableHead>Nội dung</TableHead>
            <TableHead>Bài học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!isFetching && <SkeletonTableComment />}
          {!isFetching && comments.length === 0 && (
            <EmptyData text="Không có bình luận nào" />
          )}
          {!isFetching &&
            comments.length > 0 &&
            comments.map((comment) => {
              const commentStatusItem = commentStatus.find(
                (item) => item.value === comment.status,
              );

              return (
                <TableRow key={comment._id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <strong>{comment.content}</strong>
                      <div className="flex items-center gap-5 text-xs">
                        <time>{formatDate(comment.created_at)}</time>
                        <div className="size-1 rounded-full bg-gray-300" />
                        <time>{timeAgo(comment.created_at)}</time>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{comment.lesson?.title}</TableCell>
                  <TableCell>{comment.user.name}</TableCell>
                  <TableCell>
                    <BadgeStatus
                      title={commentStatusItem?.title}
                      variant={commentStatusItem?.variant}
                      onClick={() =>
                        handleChangeStatusComment({
                          commentId: comment._id,
                          status: comment.status,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {comment.status !== CommentStatus.CANCELED && (
                      <TableAction>
                        {comment.status !== CommentStatus.COMPLETED && (
                          <TableActionItem
                            type="approve"
                            onClick={() =>
                              handleUpdateComment({
                                commentId: comment._id,
                                status: CommentStatus.COMPLETED,
                              })
                            }
                          />
                        )}
                        <TableActionItem
                          type="cancel"
                          onClick={() =>
                            handleUpdateComment({
                              commentId: comment._id,
                              status: CommentStatus.CANCELED,
                            })
                          }
                        />
                      </TableAction>
                    )}
                    {comment.status === CommentStatus.CANCELED && (
                      <TableAction>
                        <TableActionItem
                          type="delete"
                          onClick={() => handleDeleteComment(comment._id)}
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
      <CommentSummary comments={commentSummaryData} />
    </>
  );
};

export default CommentManageContainer;

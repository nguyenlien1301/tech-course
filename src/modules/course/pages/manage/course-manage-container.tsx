"use client";

import { SelectGroup } from "@radix-ui/react-select";
import Image from "next/image";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { deleteCourse, updateCourse } from "@/modules/course/actions";
import SkeletonTableRows from "@/modules/course/components/skeleton-table-rows";
import {
  useQueryFetchCourses,
  useQueryFetchCoursesSummary,
} from "@/modules/course/libs/react-query";
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
import { allValue, CourseStatus, ITEM_PER_PAGE } from "@/shared/constants";
import { courseStatus } from "@/shared/constants/course-constant";
import { formatCurrency, formatDate } from "@/shared/helper";
import { useQueryString } from "@/shared/hooks";
import { QuerySearchParams } from "@/shared/types";

import CourseSummary from "./components/course-summary";

const CourseManageContainer = ({ searchParams }: QuerySearchParams) => {
  const { handleSearchData, handleSelectStatus, handleSetDefaultStatus } =
    useQueryString();
  const { data, isFetching } = useQueryFetchCourses({
    page: searchParams.page || 1,
    limit: ITEM_PER_PAGE,
    search: searchParams.search,
    status: searchParams.status,
  });
  const { data: courseSummaryData } = useQueryFetchCoursesSummary();

  const courses = data?.courses || [];
  const total = data?.total || 0;
  // fucntion chức năng xoá khoá học
  const handleCancelCourse = (slug: string, status?: CourseStatus) => {
    try {
      Swal.fire({
        title: "Bạn có muốn chuyển sang chờ duyệt không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Huỷ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === CourseStatus.PENDING
                  ? CourseStatus.REJECTED
                  : CourseStatus.PENDING,
              _destroy: true,
            },
            path: "/manage/course",
          });
          toast.success("Xoá khoá học thành công");
        }
      });
    } catch (error) {
      console.log("🚀error handleDeleteCourse ---->", error);
    }
  };
  //   function đổi trang thái khoá học
  const handleChangeStatus = (slug: string, status: CourseStatus) => {
    try {
      Swal.fire({
        title: "Bạn có muốn cập nhật trạng thái mới không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Huỷ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateCourse({
            slug,
            updateData: {
              status:
                status === CourseStatus.PENDING
                  ? CourseStatus.APPROVED
                  : CourseStatus.PENDING,
              _destroy: false,
            },
            path: "/manage/course",
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      });
    } catch (error) {
      console.log("🚀error handleChangeStatus ---->", error);
    }
  };
  const handleDeleteStatus = (slug: string) => {
    try {
      Swal.fire({
        title: "Bạn có xoá khoá học này không?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Huỷ",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCourse(slug);
          toast.success("Xoá khoá học thành công");
        }
      });
    } catch (error) {
      console.log("🚀error handleChangeStatus ---->", error);
    }
  };

  return (
    <>
      <BouncedLink url="/manage/course/new" />
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <Heading>Quản lý khoá học</Heading>

        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm..." onChange={handleSearchData} />
          </div>
          <Select
            defaultValue={handleSetDefaultStatus("status")}
            onValueChange={(value) => handleSelectStatus(value as CourseStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {courseStatus.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TotalCount text="Tổng số khoá học" total={total} />
      <Table className="table-reponsive">
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!isFetching && <SkeletonTableRows />}
          {!isFetching && courses.length === 0 && (
            <EmptyData text="Không có khoá học nào" />
          )}
          {!isFetching &&
            courses?.length > 0 &&
            courses.map((course) => {
              const courseStatusItem = courseStatus.find(
                (item) => item.value === course.status,
              );

              return (
                <TableRow key={course._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt={course.title}
                        className="size-20 shrink-0 rounded-lg object-cover"
                        height={80}
                        src={course.image}
                        width={80}
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="whitespace-nowrap text-sm font-bold lg:text-base">
                          {course.title}
                        </h3>
                        <h4 className="text-xs text-slate-500 lg:text-sm">
                          {formatDate(course.created_at)}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-bold lg:text-base">
                      {formatCurrency(course.price)}đ
                    </span>
                  </TableCell>
                  <TableCell>
                    <BadgeStatus
                      className="cursor-pointer"
                      title={courseStatusItem?.title}
                      variant={courseStatusItem?.variant}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TableAction>
                      <TableActionItem
                        type="study"
                        url={`/manage/course/outline?slug=${course.slug}`}
                      />
                      <TableActionItem
                        blank="_blank"
                        type="view"
                        url={`/course/${course.slug}`}
                      />
                      <TableActionItem
                        blank="_blank"
                        type="edit"
                        url={`/manage/course/update?slug=${course.slug}`}
                      />
                      {course.status === CourseStatus.PENDING && (
                        <TableActionItem
                          type="approve"
                          onClick={() =>
                            handleChangeStatus(course.slug, course.status)
                          }
                        />
                      )}
                      {course.status === CourseStatus.APPROVED && (
                        <TableActionItem
                          type="back"
                          onClick={() => handleCancelCourse(course.slug)}
                        />
                      )}
                      {course.status === CourseStatus.PENDING && (
                        <TableActionItem
                          type="cancel"
                          onClick={() =>
                            handleCancelCourse(course.slug, course.status)
                          }
                        />
                      )}
                      {course.status === CourseStatus.REJECTED && (
                        <TableActionItem
                          type="delete"
                          onClick={() => handleDeleteStatus(course.slug)}
                        />
                      )}
                    </TableAction>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination total={total} />
      <CourseSummary courses={courseSummaryData} />
    </>
  );
};

export default CourseManageContainer;

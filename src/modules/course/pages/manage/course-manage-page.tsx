import { QuerySearchParams } from "@/shared/types";

import CourseManageContainer from "./components";

const CourseManagePage = async ({ searchParams }: QuerySearchParams) => {
  // Từ hàm fetchAllCourses: truyền vào các tham số cần filter
  // Bên course.action sẽ nhận đc params
  // const coursesData = await fetchCourses({
  //   page: searchParams.page || 1,
  //   limit: ITEM_PER_PAGE,
  //   search: searchParams.search,
  //   status: searchParams.status,
  // });

  // if (!coursesData) return null;
  // const { courses, total } = coursesData;

  return <CourseManageContainer searchParams={searchParams} />;
};

export default CourseManagePage;

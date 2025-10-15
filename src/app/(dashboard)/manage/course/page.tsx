import { CourseManagePage } from "@/modules/course/pages";
import { QuerySearchParams } from "@/shared/types";

const CourseManagePageRoot = ({ searchParams }: QuerySearchParams) => {
  return <CourseManagePage searchParams={searchParams} />;
};

export default CourseManagePageRoot;

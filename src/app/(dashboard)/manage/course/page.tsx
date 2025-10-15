import { CourseManageContainer } from "@/modules/course/pages";
import { QuerySearchParams } from "@/shared/types";

const CourseManagePageRoot = ({ searchParams }: QuerySearchParams) => {
  return <CourseManageContainer searchParams={searchParams} />;
};

export default CourseManagePageRoot;

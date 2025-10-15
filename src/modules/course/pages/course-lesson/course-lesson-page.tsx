import { CourseLessonPageRootProps } from "@/shared/types/course.type";

import { CourseLessonContainer } from "./components";

const CourseLessonPage = ({
  params,
  searchParams,
}: CourseLessonPageRootProps) => {
  return <CourseLessonContainer params={params} searchParams={searchParams} />;
};

export default CourseLessonPage;

import { OutlineCoursePage } from "@/modules/course/pages";

export interface OutlineCoursePageRootProps {
  searchParams: {
    slug: string;
  };
}
const OutlineCoursePageRoot = async ({
  searchParams,
}: OutlineCoursePageRootProps) => {
  return <OutlineCoursePage slug={searchParams.slug} />;
};

export default OutlineCoursePageRoot;

import { UpdateCoursePage } from "@/modules/course/pages";
import { Heading } from "@/shared/components/common";

interface UpdateCoursePageRootProps {
  searchParams: {
    slug: string;
  };
}
const UpdateCoursePageRoot = async ({
  searchParams,
}: UpdateCoursePageRootProps) => {
  return (
    <div>
      <Heading>Cập nhật khoá học</Heading>
      <UpdateCoursePage slug={searchParams.slug} />
    </div>
  );
};

export default UpdateCoursePageRoot;

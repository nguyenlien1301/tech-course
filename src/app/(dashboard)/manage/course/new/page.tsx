import { CreateCoursePage } from "@/modules/course/pages";
import { Heading } from "@/shared/components/common";

const CreateCoursePageRoot = () => {
  return (
    <>
      <Heading>Tạo khoá học mới</Heading>
      <CreateCoursePage />
    </>
  );
};

export default CreateCoursePageRoot;

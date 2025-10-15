import { fetchCourseBySlug } from "../../actions";
import OutlineCourseContainer from "./components";

const OutlineCoursePage = async ({ slug }: { slug: string }) => {
  const findCourses = await fetchCourseBySlug({
    slug,
  });

  if (!findCourses) return <div>Không tìm thấy khoá học</div>;

  return <OutlineCourseContainer course={findCourses} />;
};

export default OutlineCoursePage;

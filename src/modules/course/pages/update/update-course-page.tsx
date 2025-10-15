import { fetchCourseBySlug } from "../../actions";
import UpdateCourseContainer from "./components";

interface UpdateCoursePageProps {
  slug: string;
}
const UpdateCoursePage = async ({ slug }: UpdateCoursePageProps) => {
  const foundCourse = await fetchCourseBySlug({
    slug,
  });

  if (!foundCourse) return null;

  return <UpdateCourseContainer course={foundCourse} />;
};

export default UpdateCoursePage;

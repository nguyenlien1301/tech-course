import { auth } from "@clerk/nextjs/server";

import { fetchCourseBySlug } from "../../actions";
import CourseDetailsContainer from "./components";

interface CourseDetailPageProps {
  slug: string;
}

const CourseDetailPage = async ({ slug }: CourseDetailPageProps) => {
  const courseDetails = await fetchCourseBySlug({ slug });
  const { userId } = await auth();

  return (
    <CourseDetailsContainer courseDetails={courseDetails} userId={userId} />
  );
};

export default CourseDetailPage;

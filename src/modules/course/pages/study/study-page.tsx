import { auth } from "@clerk/nextjs/server";

import { fetchCourseOfUser } from "../../actions";
import StudyPageContainer from "./components/study-page-container";

const StudyPage = async () => {
  const { userId } = await auth();
  const courses = (await fetchCourseOfUser(userId || "")) || [];

  return <StudyPageContainer courses={courses} />;
};

export default StudyPage;

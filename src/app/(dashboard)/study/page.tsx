import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/course-item";
import Heading from "@/components/Typography/Heading";

const page = () => {
  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
};

export default page;

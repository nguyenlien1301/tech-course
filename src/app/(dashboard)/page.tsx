import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/course-item";
import Heading from "@/components/Typography/Heading";

const page = async () => {
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
};

export default page;

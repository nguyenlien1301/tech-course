import { CourseDetailsContainer } from "@/modules/course/pages";

const CourseDetailPagaRoot = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  return <CourseDetailsContainer slug={params.slug} />;
};

export default CourseDetailPagaRoot;

import { CourseDetailsPage } from "@/modules/course/pages";

const CourseDetailPagaRoot = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  return <CourseDetailsPage slug={params.slug} />;
};

export default CourseDetailPagaRoot;

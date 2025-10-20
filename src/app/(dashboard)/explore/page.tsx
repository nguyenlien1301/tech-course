import { ExplorePageContainer } from "@/modules/course/pages";
import { QuerySearchParams } from "@/shared/types";

const ExplorePageRoot = ({ searchParams }: QuerySearchParams) => {
  return <ExplorePageContainer searchParams={searchParams} />;
};

export default ExplorePageRoot;

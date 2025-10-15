import { RatingManageContainer } from "@/modules/rating/pages";
import { QuerySearchParams } from "@/shared/types";

function RatingPageRoot({ searchParams }: QuerySearchParams) {
  return <RatingManageContainer searchParams={searchParams} />;
}

export default RatingPageRoot;

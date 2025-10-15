import { QuerySearchParams } from "@/shared/types";

import RatingManageContainer from "./components";

const RatingManagePage = async ({ searchParams }: QuerySearchParams) => {
  // const ratingsData = await fetchRatings({
  //   page: searchParams.page || 1,
  //   limit: ITEM_PER_PAGE,
  //   search: searchParams.search,
  //   status: searchParams.status,
  // });

  // if (!ratingsData) return null;
  // const { ratings, total } = ratingsData;

  return <RatingManageContainer searchParams={searchParams} />;
};

export default RatingManagePage;

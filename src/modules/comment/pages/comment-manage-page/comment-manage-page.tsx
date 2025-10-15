import { QuerySearchParams } from "@/shared/types";

import CommentManageContainer from "./components";

const CommentManagePage = async ({ searchParams }: QuerySearchParams) => {
  // const commentData = await fetchComments({
  //   page: searchParams.page || 1,
  //   limit: ITEM_PER_PAGE,
  //   search: searchParams.search,
  //   status: searchParams.status,
  // });

  // if (!commentData) return null;
  // const { comments, total } = commentData;

  return <CommentManageContainer searchParams={searchParams} />;
};

export default CommentManagePage;

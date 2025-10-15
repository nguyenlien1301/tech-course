import { CommentManageContainer } from "@/modules/comment/pages";
import { QuerySearchParams } from "@/shared/types";

function CommentPageRoot({ searchParams }: QuerySearchParams) {
  return <CommentManageContainer searchParams={searchParams} />;
}

export default CommentPageRoot;

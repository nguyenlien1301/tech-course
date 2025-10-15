import { CommentManagePage } from "@/modules/comment/pages";
import { QuerySearchParams } from "@/shared/types";

function CommentPageRoot({ searchParams }: QuerySearchParams) {
  return <CommentManagePage searchParams={searchParams} />;
}

export default CommentPageRoot;

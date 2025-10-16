import { getCommentByLesson } from "@/modules/comment/actions";
import { getLessonBySlug } from "@/modules/lesson/actions";
import { QuerySortFilter } from "@/shared/types";

import CommentForm from "./comment-form";
import CommentItem from "./comment-item";
import CommentSorting from "./comment-sorting";

interface CourseLessonCommentProps {
  courseId: string;
  lessonId: string;
  sort: QuerySortFilter;
}

const CourseLessonComment = async ({
  courseId,
  lessonId,
  sort,
}: CourseLessonCommentProps) => {
  const lesson = await getLessonBySlug({
    lessonId: lessonId,
    course: courseId,
  });

  const lessonIdString = lesson?._id.toString();

  if (!lessonIdString) return null;
  //   Danh sách comments
  const comments = await getCommentByLesson(lessonIdString, sort);

  const commentLessonId = lesson?._id.toString() || "";

  //   rootComments: tức là sẽ lấy các comment level 0 trước sau đó map ra ở commentItem. trong comment Item sẽ truyền vào một comments và viết function là getRepliesComment. cái getRepliesComment truyền vào một comments list ban đầu cả comment level 0 luôn và sẽ filter và khi nó chạy như vậy thì lần đầu nó sẽ ko có vì nó chưa chạy đệ quy hết tại nó phải so sánh từng thằng với nhau thì mới lấy ra đc.
  const rootComments = comments?.filter((item) => !item.parentId);

  return (
    <div>
      <CommentForm lessonId={commentLessonId} />
      {!!rootComments && rootComments.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span>Bình luận</span>
              <span className="flex items-center justify-center rounded-full bg-secondary px-3 py-0.5 text-sm font-semibold text-white">
                {comments?.length}
              </span>
            </h2>
            <CommentSorting />
          </div>
          <div className="flex flex-col gap-5">
            {rootComments?.map((item) => (
              // CommentItem: là render ra những comment level 0 trước sau đó với viết một hàm getRepliesComment để lấy ra những comment level 1
              <CommentItem
                key={item._id}
                comment={item}
                comments={comments ?? []}
                // comment: này là comment đã đc map qua (comment số ít )
                lessonId={commentLessonId}
                // Truyền danh sách comments qua CommentItem
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLessonComment;

"use client";

import { ObjectId } from "mongoose";
import Image from "next/image";

import { CommentStatus } from "@/shared/constants";
import { timeAgo } from "@/shared/helper";
import { CommentItemData } from "@/shared/types";
import { cn } from "@/shared/utils/common";

import CommentReply from "./comment-reply";

interface CommentItemProps {
  comment: CommentItemData;
  lessonId: string;
  comments: CommentItemData[];
}
const CommentItem = ({
  comment,
  comments = [],
  lessonId,
  // comments: nhận comment từ page server để truyền vào getRepliesComment
}: CommentItemProps) => {
  // getRepliesComment: hàm này sẽ nhận vào một mảng các comment và nhận vào một parentId
  // Dùng comment nhận vào filter ra các phần tử có parentId === parentId đc nhận vào ở tham số thứ 2 của getRepliesComment

  const getRepliesComment = (
    // comments: này nhận từ danh sách comments từ page và truyền qua comment-item qua đây
    //  parentId.toString(): là comment._id của thằng khác nó tìm ra những thằng đó chạy đệ quy để tìm ra sau đó trả ra đc danh sách cho chúng ta. Chính là trả ra những cái replies
    comments: CommentItemData[],
    parentId: string | ObjectId,
  ) => {
    return comments.filter(
      (item) => item.parentId?.toString() === parentId.toString(),
    );
  };

  //  comment._id: là comment đc map qua bên kia id này là id của comment đc map truyền qua làm parentId
  // replies: là những level ở dưới và render ra sau đây là lần chạy thứ 2
  //Nói dễ hiểu hơn: Nó giống như một vòng lặp nó sẽ render ra các comment level 0 trước, sau đó sẽ dùng hàm getRepliesComment để lấy ra comment level 1 và render ra, sau đó nó sẽ so sánh tiếp một dãy comment bằng parentId nếu nó có _id của comment level 0 thì nó sẽ là comment level 1 tiếp, nhưng nếu ko có _id của comment level 0 mà nó có _id của level 1 thì nó sẽ là nested comment.
  // replies: này là đệ quy nó sẽ gọi mãi, và gọi lại cả function thì chính replies cũng sẽ bị gọi lại
  const replies = getRepliesComment(comments, comment._id);

  const level = comment.level || 0;
  // const commentBorderClassName: { [key: string]: string } = {
  //   "0": "border-gray-200",
  //   "1": "border-blue-200",
  //   "2": "border-green-200",
  //   "3": "border-yellow-200",
  // };
  //  className={cn(
  //         `flex items-start gap-3 p-3 rounded-xl border borderDarkMode bgDarkMode shadow-sm ml-auto`,
  //         commentBorderClassName[level.toString()]
  //       )}
  const COMMENT_SPACING = 55;
  const isPending = comment.status === CommentStatus.PENDING;

  return (
    <>
      <div
        style={{ width: `calc(100% - ${level * COMMENT_SPACING}px)` }}
        className={cn(
          "flex items-start gap-3 p-3 rounded-xl border borderDarkMode bgDarkMode shadow-sm ml-auto",
          {
            "opacity-50 pointer-events-none": isPending,
            "mt-5 first:mt-0": level === 0,
          },
        )}
      >
        <div className="borderDarkMode size-10 shrink-0 rounded-full border shadow-sm">
          <Image
            alt={comment.user.name}
            className="rounded-full"
            height={40}
            src={comment.user.avatar}
            width={40}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-5">
            <h4 className="font-bold">{comment.user.name}</h4>
            <span className="text-xs font-medium text-gray-400">
              {timeAgo(comment.created_at)}
            </span>
          </div>
          <p className="mb-3 text-base leading-relaxed">{comment.content}</p>
          {!isPending && <CommentReply comment={comment} lessonId={lessonId} />}
        </div>
      </div>
      {!!replies &&
        replies.length > 0 &&
        replies.map((reply) => (
          <CommentItem
            key={reply._id}
            comment={reply}
            comments={comments}
            lessonId={lessonId}
          />
        ))}
    </>
  );
};

export default CommentItem;

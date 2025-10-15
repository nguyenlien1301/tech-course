"use client";

import { useState } from "react";

import { IconReply } from "@/shared/components/icons";
import { MAX_COMMENT_LEVEL } from "@/shared/constants";
import { formatDate } from "@/shared/helper";
import { CommentItemData } from "@/shared/types";

import CommentForm from "./comment-form";

interface CommentReplyProps {
  comment: CommentItemData;
  lessonId: string;
}
const CommentReply = ({ comment, lessonId }: CommentReplyProps) => {
  const [isShowReply, setIsShowReply] = useState(false);

  return (
    <>
      <div className="flex items-center gap-5 text-sm font-medium text-gray-500">
        <span>{formatDate(comment.created_at)}</span>
        {comment.level <= MAX_COMMENT_LEVEL && (
          <>
            <span className="size-1 rounded-full bg-gray-500" />
            <button
              className="flex items-center gap-1 transition-all hover:text-primary"
              type="button"
              onClick={() => setIsShowReply(!isShowReply)}
            >
              <IconReply className="size-5" />
              <span>Trả lời</span>
            </button>
          </>
        )}
      </div>
      {!!isShowReply && (
        <CommentForm
          closeReply={() => setIsShowReply(false)}
          comment={comment}
          isReply
          lessonId={lessonId}
        />
      )}
    </>
  );
};

export default CommentReply;

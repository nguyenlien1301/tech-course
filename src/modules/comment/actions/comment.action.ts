"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { CommentStatus } from "@/shared/constants";
import { connectToDatabase } from "@/shared/lib";
import { CommentModel, LessonModel, UserModel } from "@/shared/schemas";
import {
  CommentItemData,
  CreateCommentParams,
  QueryFilter,
  QuerySortFilter,
} from "@/shared/types";

export async function fetchComments(params: QueryFilter): Promise<
  | {
      comments: CommentItemData[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof CommentModel> = {};

    if (search) {
      query.$or = [{ content: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const comments = await CommentModel.find(query)
      .populate({
        path: "lesson",
        model: LessonModel,
        select: "title",
      })
      .populate({
        path: "user",
        model: UserModel,
        select: "name",
      })
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    const total = await CommentModel.countDocuments(query);

    return {
      comments: JSON.parse(JSON.stringify(comments)),
      total,
    };
  } catch (error) {
    console.log("🚀error---->", error);
  }
}

// getCommentByLesson: lấy comment theo bài học
export async function getCommentByLesson(
  lessonIdString: string,
  sort: QuerySortFilter,
): Promise<CommentItemData[] | undefined> {
  try {
    connectToDatabase();
    const comments = await CommentModel.find<CommentItemData>({
      lesson: lessonIdString,
    })
      .populate({
        path: "user",
        model: UserModel,
        select: "name avatar",
      })
      .sort({ created_at: sort === "recent" ? -1 : 1 });

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.log("🚀error getCommentByLesson ---->", error);
  }
}

export async function createComment(
  params: CreateCommentParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newComment = await CommentModel.create(params);

    console.log("🚀newComment---->", newComment);
    if (!newComment) return false;
    revalidatePath(params.path || "/");

    return true;
  } catch (error) {
    console.log("🚀error createComment ---->", error);
  }
}

export async function updateComment({
  commentId,
  status,
}: {
  commentId: string;
  status: CommentStatus;
}) {
  try {
    connectToDatabase();
    await CommentModel.findByIdAndUpdate(commentId, {
      status,
    });
    revalidatePath("/manage/comment");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error updateComment ---->", error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    connectToDatabase();
    const deleteComment = await CommentModel.findByIdAndDelete(commentId);

    if (!deleteComment)
      return {
        success: false,
      };
    revalidatePath("/manage/comment");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error deleteComment ---->", error);
  }
}

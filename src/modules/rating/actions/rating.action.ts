"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { RatingStatus } from "@/shared/constants";
import { connectToDatabase } from "@/shared/lib";
import { CourseModel, RatingModel, UserModel } from "@/shared/schemas";
import {
  CreateRatingParams,
  QueryFilter,
  RatingItemData,
} from "@/shared/types";

export async function fetchRatingSummary() {
  try {
    connectToDatabase();

    // Đếm theo trạng thái
    const [active, unactive] = await Promise.all([
      RatingModel.countDocuments({ status: RatingStatus.ACTIVE }),
      RatingModel.countDocuments({ status: RatingStatus.UNACTIVE }),
    ]);

    return {
      active,
      unactive,
    };
  } catch (error) {
    console.error("🚀 error fetchRatingSummary --->", error);
    throw error;
  }
}

export async function fetchRatings(params: QueryFilter): Promise<
  | {
      ratings: RatingItemData[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof RatingModel> = {};

    if (search) {
      query.$or = [{ content: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const ratings = await RatingModel.find(query)
      .populate({
        path: "course",
        model: CourseModel,
        select: "title slug",
      })
      .populate({ path: "user", model: UserModel, select: "name" })
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: -1,
      });
    const total = await RatingModel.countDocuments(query);

    return {
      ratings: JSON.parse(JSON.stringify(ratings)),
      total,
    };
  } catch (error) {
    console.log("🚀error fetchRatings ---->", error);
  }
}

export async function createRating(
  params: CreateRatingParams,
): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    const newRating = await RatingModel.create(params);
    const findCourse = await CourseModel.findOne({
      _id: params.course,
    }).populate({
      path: "rating",
      model: RatingModel,
    });

    if (findCourse.rating) {
      await findCourse.rating.push(newRating._id);
      await findCourse.save();
    }
    if (!newRating) return false;
    revalidatePath("/manage/rating");

    return true;
  } catch (error) {
    console.log("🚀error createRating ---->", error);
  }
}

export async function updateRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await RatingModel.findByIdAndUpdate(id, {
      status: RatingStatus.ACTIVE,
    });

    return true;
  } catch (error) {
    console.log("🚀error updateRating ---->", error);
  }
}

export async function deleteRating(id: string): Promise<boolean | undefined> {
  try {
    connectToDatabase();
    await RatingModel.findByIdAndDelete(id);

    return true;
  } catch (error) {
    console.log("🚀error deleteRating---->", error);
  }
}

export async function getRatingByUserId(
  userId: string,
): Promise<boolean | undefined> {
  console.log("🚀userId---->", userId);
  try {
    connectToDatabase();
    const findRating = await RatingModel.findOne({ user: userId });

    return findRating?._id ? true : false;
  } catch (error) {
    console.log("🚀error getRatingByUserId ---->", error);
  }
}

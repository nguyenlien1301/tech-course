"use server";

import { parseData } from "@/shared/helper";
import { connectToDatabase } from "@/shared/lib";
import { FavoriteModel } from "@/shared/schemas";
import { AddFavoriteParams } from "@/shared/types";

export async function fetchFavorites(userId: string) {
  await connectToDatabase();
  const favorites = await FavoriteModel.find({ user: userId }).lean();

  return parseData(favorites); // [{ _id, user, course }]
}
export async function fetchFavoritesInfo() {
  await connectToDatabase();
  const favorites = await FavoriteModel.find();

  return parseData(favorites); // [{ _id, user, course }]
}

export async function addFavorite(params: AddFavoriteParams) {
  try {
    await connectToDatabase();

    const existing = await FavoriteModel.findOne({
      user: params.user,
      course: params.course,
    });

    // 🔁 Nếu đã có → Xoá (bỏ yêu thích)
    if (existing) {
      await FavoriteModel.findByIdAndDelete(existing._id);

      return {
        status: "removed",
        course: params.course,
      };
    }

    // ❤️ Nếu chưa có → Thêm mới
    const newFavorite = await FavoriteModel.create(params);

    return {
      status: "added",
      course: parseData(newFavorite.course), // luôn có cùng key `course`
      favorite: parseData(newFavorite),
    };
  } catch (error) {
    console.error("🚀error addFavorite ---->", error);
    throw new Error("Lỗi khi thêm/xóa yêu thích");
  }
}

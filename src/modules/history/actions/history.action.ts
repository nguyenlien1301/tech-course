"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/shared/lib";
import { HistoryModel, UserModel } from "@/shared/schemas";
import { CreateHistoryParams } from "@/shared/types";
import { History } from "@/shared/types/models";

export async function createHistory(params: CreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = await auth();
    const findUser = await UserModel.findOne({ clerkId: userId });

    if (!findUser) return;
    if (params.checked) {
      await HistoryModel.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await HistoryModel.findOneAndDelete({
        // Khoá học nào
        course: params.course,
        // Bài học nào
        lesson: params.lesson,
        // user nào
        user: findUser._id,
      });
    }
    revalidatePath(params.path || "/");
  } catch (error) {
    console.log("🚀error function createHistory ---->", error);
  }
}

// Hàm lấy history theo khoá học
export async function fetchHistory(params: {
  course: string;
}): Promise<History[] | undefined> {
  try {
    connectToDatabase();
    // Ở đây getHistory chỉ lấy ra dựa trên chỉ course thì nó sẽ ko đúng.
    // Vì khi có nhiều user học cùng 1 khoá học thì có user sẽ complete nhưng có user lại ko complete thì nếu chỉ lấy theo khoá học thì nhiều ng học nó sẽ lấy ra hết luôn và những user nào chưa complete nó cũng tính luôn. Vì chung 1 khoá học thì chung id đồng nghĩa nó sẽ lấy hết tất cả những khoá học chekc true luôn, Vì vậy phải lấy theo user nữa.
    const { userId } = await auth();
    const findUser = await UserModel.findOne({ clerkId: userId });

    if (!findUser) return;
    const histories = await HistoryModel.find({
      course: params.course,
      user: findUser._id,
    });

    return JSON.parse(JSON.stringify(histories));
  } catch (error) {
    console.log("🚀error function fetchHistory ---->", error);
  }
}

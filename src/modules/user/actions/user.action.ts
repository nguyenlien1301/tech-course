"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { UserStatus } from "@/shared/constants";
import { connectToDatabase } from "@/shared/lib";
import { UserModel } from "@/shared/schemas";
import { CreateUserParams, QueryFilter, UserItemData } from "@/shared/types";
import { User } from "@/shared/types/models";

export async function fetchUserSummary() {
  try {
    connectToDatabase();

    // Đếm theo trạng thái
    const [active, unactive, baned] = await Promise.all([
      UserModel.countDocuments({ status: UserStatus.ACTIVE }),
      UserModel.countDocuments({ status: UserStatus.UNACTIVE }),
      UserModel.countDocuments({ status: UserStatus.BANED }),
    ]);

    return {
      active,
      unactive,
      baned,
    };
  } catch (error) {
    console.error("🚀 error fetchUserSummary --->", error);
    throw error;
  }
}

export async function fetchUsers(params: QueryFilter): Promise<
  | {
      users: UserItemData[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof UserModel> = {};

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    if (status) {
      query.status = status;
    }
    const users = await UserModel.find(query).skip(skip).limit(limit).sort({
      created_at: -1,
    });
    const total = await UserModel.countDocuments(query);

    return {
      users: JSON.parse(JSON.stringify(users)),
      total,
    };
  } catch (error) {
    console.log("🚀error fetchUsers---->", error);
  }
}
// Vì dữ liệu nó trả về any vì vậy nên dùng Promise<User | undefined> vì nó là asyn await và mong muốn nó sẽ trả về đúng với mong mún của mình
// Hàm tạo user
export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await UserModel.create(params);

    console.log("🚀newUser---->", newUser);

    return newUser;
  } catch (error) {
    console.log("🚀error function createUser ---->", error);
  }
}

// Lấy ra thông tin user
export async function getUserInfo({
  userId,
}: {
  userId: string;
}): Promise<User | null | undefined> {
  // clerkId: này là clerkId của dữ liệu user
  try {
    connectToDatabase();
    const findUser = await UserModel.findOne({ clerkId: userId });

    if (!findUser) return null;

    return JSON.parse(JSON.stringify(findUser));
  } catch (error) {
    console.log("🚀error function getUserInfo ---->", error);
  }
}

export async function updateUser({
  status,
  userId,
}: {
  userId: string;
  status: UserStatus;
}) {
  try {
    connectToDatabase();
    // Tìm user dựa trên _id truyền vào từ findOrder.user._id vì trong findOrder có populate ra _id của user thay vì phải dùng auth() để tìm.
    const findUser = await UserModel.findById(userId);

    if (!findUser) return;
    // Kiếm tra nếu findOrder.status bằng với OrderStatus.CANCELED thì dừng chương trình.
    // if (findUser.status === UserStatus.BANED) return;

    //  OrderModel.findByIdAndUpdate: cập nhật trạng thái truyền vào _id của đơn hàng, và truyền vào trạng thái cần cập nhật
    await UserModel.findByIdAndUpdate(userId, {
      status,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error updateOrder ---->", error);
  }
}

export async function deleteUser(userId: string) {
  try {
    connectToDatabase();
    const findUser = await UserModel.findById(userId);

    if (!findUser) return;
    await UserModel.findByIdAndDelete(userId);
    revalidatePath("/manage/user");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error deleteUser --->", error);
  }
}

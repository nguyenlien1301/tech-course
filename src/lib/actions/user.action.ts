"use server";

import UserModel from "@/database/user.model";

import { CreateUserParams } from "@/types";
import connectToDatabase from "../mongoose";

// Vì dữ liệu nó trả về any vì vậy nên dùng Promise<User | undefined> vì nó là asyn await và mong muốn nó sẽ trả về đúng với mong mún của mình
export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await UserModel.create(params);
    return newUser;
  } catch (error) {
    console.log("🚀error function createUser ---->", error);
  }
}

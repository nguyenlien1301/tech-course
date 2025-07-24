"use server";

import mongoose from "mongoose";

// singleton connect: chạy 1 lần
// Nó sẽ check là nếu đã kết nối rồi thì nó sẽ ko kết nối nữa.
let isConnected: boolean = false;
// Mặc định là chưa kết nối
const connectToDatabase = async () => {
  // Nếu chưa kết nối sẽ báo lỗi
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }
  // Nếu đã kết nối thì thông báo
  if (isConnected) {
    console.log("🚀MONGODB is already connected");
    return;
  }
  // Nếu chưa có gì hết thì thử kết nối
  // Nếu kết nối thì sẽ chạy xuống isConnect = true
  // tech-course là tên mà chúng ta tạo trên db compass
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "tech-course",
    });
    // Kết nối đc rồi thì cho
    isConnected = true;
    console.log("Using new database connection");
  } catch (error) {
    console.log("Error while connecting to database", error);
  }
};

export default connectToDatabase;

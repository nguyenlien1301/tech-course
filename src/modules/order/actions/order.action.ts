"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { OrderStatus } from "@/shared/constants";
import { connectToDatabase } from "@/shared/lib";
import {
  CouponModel,
  CourseModel,
  OrderModel,
  UserModel,
} from "@/shared/schemas";
import { QueryFilter } from "@/shared/types";
import { CreateOrderParams, OrderItemData } from "@/shared/types/order.type";

interface FetchOrdersResponse {
  total: number;
  orders: OrderItemData[];
}
export async function fetchOrders(
  params: QueryFilter,
): Promise<FetchOrdersResponse | undefined> {
  try {
    connectToDatabase();
    const { limit = 10, page = 1, search, status } = params;
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof OrderModel> = {};

    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    if (status) {
      query.status = status;
    }
    const orders = await OrderModel.find(query)
      .populate({
        path: "course",
        model: CourseModel,
        select: "title",
      })
      .populate({
        path: "user",
        model: UserModel,
        select: "username",
      })
      .populate({
        path: "coupon",
        model: CouponModel,
        select: "code",
      })
      .skip(skip)
      .limit(limit)
      .sort({
        created_at: -1,
      });

    const total = await OrderModel.countDocuments(query);

    return {
      orders: JSON.parse(JSON.stringify(orders)),
      total,
    };
  } catch (error) {
    console.log("🚀error fetchOrders---->", error);
  }
}
export async function getOrderDetail({ code }: { code: string }) {
  try {
    connectToDatabase();
    const order = await OrderModel.findOne({ code }).populate({
      path: "course",
      model: CourseModel,
      select: "title",
    });

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.log("🚀error getOrderDetail ---->", error);
  }
}

export async function createOrder(params: CreateOrderParams) {
  try {
    connectToDatabase();
    // Vì ở trong order.model lưu coupon là ObjectId vì vậy khi tạo mà ko nhập coupon vào mà mua khoá học luôn nó sẽ ko hiểu là ObjectId mà nó sẽ hiểu là string. Vì vậy thêm dòng này vào nếu ko có nhập coupon vào thì nó sẽ xoá coupon params đc truyền vào luôn
    if (!params.coupon) delete params.coupon;
    const newOrder = await OrderModel.create(params);

    if (params.coupon) {
      await CouponModel.findByIdAndUpdate(params.coupon, {
        // increment used time
        // để khi nếu 1 tài khoản sử dụng coupon thì tăng số lần sử dụng coupon đó lên 1
        $inc: { used: 1 },
      });
    }

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    console.log("🚀error createdOrder ---->", error);
  }
}

export async function updateOrder({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  try {
    connectToDatabase();
    // Tìm đơn hàng và populate ra _id của course và _id của user mục đích đẩy vào order
    const findOrder = await OrderModel.findById(orderId)
      .populate({
        path: "course",
        model: CourseModel,
        select: "_id",
      })
      .populate({
        path: "user",
        model: UserModel,
        select: "_id",
      });

    console.log("🚀 findOrder---->", findOrder);
    if (!findOrder) return;
    // Kiếm tra nếu findOrder.status bằng với OrderStatus.CANCELED thì dừng chương trình.
    if (findOrder.status === OrderStatus.CANCELED) return;
    // Tìm user dựa trên _id truyền vào từ findOrder.user._id vì trong findOrder có populate ra _id của user thay vì phải dùng auth() để tìm.
    const findUser = await UserModel.findById(findOrder.user._id);

    // const filterCourse = findUser.courses.some(
    //   (item: string) => item.toString() === findOrder.course._id.toString()
    // );
    //  OrderModel.findByIdAndUpdate: cập nhật trạng thái truyền vào _id của đơn hàng, và truyền vào trạng thái cần cập nhật
    await OrderModel.findByIdAndUpdate(orderId, {
      status,
    });
    if (
      status === OrderStatus.COMPLETED &&
      findOrder.status === OrderStatus.PENDING
    ) {
      findUser.courses.push(findOrder.course._id);
      findUser.save();
    }
    if (
      status === OrderStatus.CANCELED &&
      findOrder.status === OrderStatus.COMPLETED
    ) {
      // C1: dùng filter để lọc ra
      findUser.courses = findUser.courses.filter(
        (item: string) => item.toString() !== findOrder.course._id.toString(),
      );
      // C2: có thể dùng pull để xoá đi object bên trong user
      // findUser.courses.pull(findOrder.course._id);
      findUser.save();
    }
    revalidatePath("/manage/order");

    return {
      success: true,
    };
  } catch (error) {
    console.log("🚀error updateOrder ---->", error);
  }
}

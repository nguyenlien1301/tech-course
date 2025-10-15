"use server";

import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/shared/lib";
import { CouponModel, CourseModel } from "@/shared/schemas";
import {
  CouponItemData,
  CreateCouponParams,
  QueryFilter,
  UpdateCouponParams,
} from "@/shared/types";

export async function fetchCoupons(params: QueryFilter): Promise<
  | {
      coupons: CouponItemData[] | undefined;
      total: number;
    }
  | undefined
> {
  try {
    connectToDatabase();
    const { active: isActive, limit = 10, page = 1, search } = params;
    // active: ở đây hiện tại cũng là string và là 0, 1
    const skip = (page - 1) * limit;
    const query: FilterQuery<typeof CouponModel> = {};

    if (search) {
      query.$or = [{ code: { $regex: search, $options: "i" } }];
    }
    // là active bên kia truyền qua hiện tại đang là chuỗi 0 và 1 nhưng cái cần là nó phải ra true false
    // active !== undefined: là trạng thái tất cả là undefined vì vậy ở đây check nếu active khác undefined là khác trạng thái tất cả thì mới làm cái này
    if (isActive) {
      // query.active = active: này đang là 0,1 là string
      //   query.active = Boolean(active): chuyển nó thành dạng boolean nên giờ đang là true (nhưng hiện tại bên kia đang active = 0 mà 0 thì nó phải là false vì vậy ko đúng)
      // query.active = Boolean(Number(active)): chuyển đổi nó về false thì tương ứng với 0.
      query.active = Boolean(Number(isActive));
    }
    const coupons = await CouponModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ created_at: -1 });
    const total = await CouponModel.countDocuments(query);

    return { coupons: JSON.parse(JSON.stringify(coupons)), total };
  } catch (error) {
    console.log("🚀error fetchCoupons ---->", error);
  }
}

export async function getCouponByCode(params: {
  code: string;
}): Promise<CouponItemData | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await CouponModel.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      model: CourseModel,
      select: "_id title",
    });
    const coupon = JSON.parse(JSON.stringify(findCoupon));

    return coupon;
  } catch (error) {
    console.log("🚀error getCouponByCode ---->", error);
  }
}
export async function getValidateCoupon(params: {
  code: string;
  courseId: string;
}): Promise<CouponItemData | undefined> {
  try {
    connectToDatabase();
    const findCoupon = await CouponModel.findOne({
      code: params.code,
    }).populate({
      path: "courses",
      model: CourseModel,
      select: "_id title",
    });

    const coupon: CouponItemData = JSON.parse(JSON.stringify(findCoupon));
    const couponCourses = coupon.courses.map((course) => course._id);
    // isActive: là biến để check các điều kiện
    let isActive = true;

    // Check mã coupon có đúng với khoá học đó không
    if (!couponCourses.includes(params.courseId)) isActive = false;
    // check nó có đang hoạt động hay không
    if (!coupon?.active) isActive = false;
    // Check coupon sử dụng nếu lớn hơn hoặc bằng coupon cho phép sử dụng thì sẽ bằng false
    if (coupon?.used >= coupon?.limit) isActive = false;
    // Check ngày bắt đầu, nếu ngày bắt đầu cho phép sử dụng lớn hơn ngày hiện tại thì sẽ bằng false (VD: ngày cho phép sử dụng là ngày 20 nhưng hiện tại là ngày 10 thì ko đc dùng);
    if (coupon?.start_date && new Date(coupon?.start_date) > new Date())
      isActive = false;
    // Check ngày kết thúc, nếu ngày kết thúc của coupon nhỏ hơn ngày hiện tại thì bằng false.
    if (coupon?.end_date && new Date(coupon?.end_date) < new Date())
      isActive = false;

    return isActive ? coupon : undefined;
  } catch (error) {
    console.log("🚀error getValidateCoupon ---->", error);
  }
}

export async function createCoupon(params: CreateCouponParams) {
  try {
    connectToDatabase();
    const existingCoupon = await CouponModel.findOne({ code: params.code });

    if (existingCoupon?.code) {
      return { error: "Mã giảm giá đã tồn tại!" };
    }
    const couponRegex = /^[\dA-Z]{3,10}$/;

    if (!couponRegex.test(params.code)) {
      return { error: "Mã giảm giá không hợp lệ" };
    }
    const newCoupon = await CouponModel.create(params);

    revalidatePath("/manage/coupon");

    return {
      success: true,
      newCoupons: JSON.parse(JSON.stringify(newCoupon)),
    };
  } catch (error) {
    console.log("🚀error createCoupon ---->", error);
  }
}

export async function updateCoupon(params: UpdateCouponParams) {
  try {
    connectToDatabase();
    const updatedCoupon = await CouponModel.findByIdAndUpdate(
      params._id,
      params.updateData,
    );

    revalidatePath("/manage/coupon");

    return JSON.parse(JSON.stringify(updatedCoupon));
  } catch (error) {
    console.log("🚀error updateCoupon ---->", error);
  }
}

export async function deleteCoupon(code: string) {
  try {
    connectToDatabase();
    await CouponModel.findOneAndDelete({ code });

    return { success: true };
  } catch (error) {
    console.log("🚀error deleteCoupon ---->", error);
  }
}

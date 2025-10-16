import { z } from "zod";

import { CouponType } from "@/shared/constants";

export const couponCreateSchema = z.object({
  title: z.string().nonempty({ message: "Tiêu đề không được bỏ trống" }),
  code: z
    .string()
    .nonempty({ message: "Mã giảm giá không được bỏ trống" })
    .min(3, { message: "Mã giảm giá phải ít nhất 3 kí tự" })
    .max(20, { message: "Mã giảm giá tối đa 20 kí tự" }),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  active: z.boolean().optional(),
  value: z.string().optional(),
  type: z.enum([CouponType.PERCENT, CouponType.AMOUNT]),
  courses: z.array(z.string()).optional(),
  limit: z.number().optional(),
});

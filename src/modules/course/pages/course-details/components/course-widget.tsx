"use client";

import { useState } from "react";

import {
  IconPlay,
  IconStudy,
  IconUsers,
  IconVideo,
} from "@/shared/components/icons";
import { useUserContext } from "@/shared/contexts";
import { formatCurrency } from "@/shared/helper";
import { CourseItemData } from "@/shared/types";

import AlreadyEnroll from "./already-enroll";
import ButtonEnroll from "./button-enroll";
import CouponForm from "./coupon-form";

interface CourseWidgetProps {
  data: CourseItemData;
  duration: string;
}
const CourseWidget = ({ data, duration }: CourseWidgetProps) => {
  // dùng state để lưu lại giá trị total hiện tại
  const [price, setPrice] = useState<number>(data.price);
  // setCoupon: là state để lưu id của coupon đó và id này sẽ gửi qua button-enroll và truyền vào createOrder khi tạo => trong đơn hàng sẽ lưu id của coupon
  const [coupon, setCoupon] = useState("");
  const { userInfo } = useUserContext();

  const isAlreadyEnrolled = userInfo?.courses
    ? JSON.parse(JSON.stringify(userInfo?.courses)).includes(data._id)
    : false;

  if (isAlreadyEnrolled) {
    return userInfo && <AlreadyEnroll userInfo={userInfo} />;
  }

  return (
    <div className="bgDarkMode borderDarkMode rounded-lg bg-white p-5">
      <h3 className="textDarkMode mb-2 text-base font-semibold text-slate-500">
        khóa học đầy đủ
      </h3>
      <div className="mb-3 flex items-center gap-2">
        {data?.sale_price === 0 ? (
          <strong className="text-md font-bold text-primary">Miễn phí</strong>
        ) : (
          <strong className="text-xl font-bold text-primary">
            {formatCurrency(price)} đ
          </strong>
        )}
        <span className="text-sm text-slate-500 line-through">
          {formatCurrency(data.sale_price)} đ
        </span>
        {data?.sale_price !== 0 && (
          <span className="ml-auto inline-block rounded-xl bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
            {Math.floor((data.price / data.sale_price) * 100)} %
          </span>
        )}
      </div>
      <h3 className="mb-3 text-sm font-semibold">Khoá học bao gồm:</h3>
      <ul className="mb-5 flex flex-col gap-2 text-sm text-slate-500">
        <li className="flex items-center gap-2">
          <IconPlay className="size-4" />
          <span className="textDarkMode">{duration} học</span>
        </li>
        <li className="flex items-center gap-2">
          <IconVideo className="size-4" />
          <span className="textDarkMode">Video Full HD</span>
        </li>
        <li className="flex items-center gap-2">
          <IconUsers className="size-4" />
          <span className="textDarkMode">Có nhóm hỗ trợ</span>
        </li>
        <li className="flex items-center gap-2">
          <IconStudy className="size-4" />
          <span className="textDarkMode">Tài liệu kèm theo</span>
        </li>
      </ul>
      <ButtonEnroll amount={price} coupon={coupon} courseId={data._id} />
      {data?.sale_price !== 0 && (
        <CouponForm
          courseId={data._id}
          originalPrice={data.price}
          setCouponId={setCoupon}
          setPrice={setPrice}
        />
      )}
    </div>
  );
};

export default CourseWidget;

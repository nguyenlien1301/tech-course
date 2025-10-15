"use client";

import { debounce } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getValidateCoupon } from "@/modules/coupon/actions";
import { Input } from "@/shared/components/ui";
import { CouponType } from "@/shared/constants";

interface CouponFormProps {
  setCouponId: Dispatch<SetStateAction<string>>;
  originalPrice: number;
  setPrice: Dispatch<SetStateAction<number>>;
  courseId: string;
}
const CouponForm = ({
  courseId,
  originalPrice,
  setCouponId,
  setPrice,
}: CouponFormProps) => {
  // setCouponCode: state này để lưu mã code ng dùng nhập vào input và gửi couponCode lên server sử lí

  // setIsApplied: state này để làm trạng thái disable nút áp dụng khi đã áp dụng code rồi sẽ ko áp dụng đc nữa
  const [isApplied, setIsApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  // const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setIsApplied(false);
  }, [couponCode]);
  const handleApplyCoupon = async () => {
    if (isApplied) return;
    if (!couponCode) return;
    try {
      // response: trả về thông tin của coupon đó
      const hasResult = await getValidateCoupon({
        code: couponCode.toUpperCase(),
        courseId,
      });
      // couponType: là percent hay amount
      const couponType = hasResult?.type;
      // finalPrice: là cái giá price hiện tại gán vào
      let finalPrice = originalPrice;

      if (!hasResult) {
        toast.error("Mã giảm giá không hợp lệ");
        setCouponCode("");
        setCouponId("");

        return;
      }
      // price: là số tiền giảm giá khi tạo coupon
      // Nếu couponType là percent bằng với CouponType.PERCENT
      // Thì lấy giá tiền hiện tại - giá tiền hiện tại và nhân cho giá tiền gốc trong db và chia cho 100 (tính tiền khi áp mã là %)
      //
      if (couponType === CouponType.PERCENT) {
        finalPrice = originalPrice - (originalPrice * hasResult?.value) / 100;
      } else if (couponType === CouponType.AMOUNT) {
        finalPrice = originalPrice - hasResult?.value;
      }
      setPrice(finalPrice);
      toast.success("Áp dụng mã giảm giá thành công");
      setCouponCode("");
      // if (inputRef.current) inputRef.current.value = "";
      // inputRef.current?.value && (inputRef.current.value = "");
      setIsApplied(true);
      // setCouponId(response?._id): truyền id của coupon đó cho setCouponId bên file course-widget.tsx
      setCouponId(hasResult?._id);
    } catch (error) {
      console.log("🚀error handleApplyCoupon ---->", error);
    }
  };
  const handleChangeCoupon = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCouponCode(event?.target.value);
    },
    300,
  );

  return (
    <div className="relative mt-5">
      <Input
        className="pr-24 font-bold uppercase"
        defaultValue={couponCode}
        placeholder="Nhập mã giảm giá"
        onChange={handleChangeCoupon}
        // ref={inputRef}
      />
      <button
        className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-blue p-2 text-xs font-semibold text-white transition-all hover:bg-blue/20 hover:text-blue"
        onClick={handleApplyCoupon}
      >
        Áp dụng
      </button>
    </div>
  );
};

export default CouponForm;

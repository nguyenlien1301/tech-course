"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useMutationCreateOrder } from "@/modules/order/libs";
import { Button } from "@/shared/components/ui";
import { useUserContext } from "@/shared/contexts";

interface ButtonEnrollProps {
  courseId: string;
  amount: number;
  coupon: string;
}
const ButtonEnroll = ({ amount, coupon, courseId }: ButtonEnrollProps) => {
  const { userInfo } = useUserContext();
  const mutationCreateOrder = useMutationCreateOrder();
  const router = useRouter();
  const createOrderCode = () => `DH-${Date.now().toString().slice(-6)}`;
  const handleEnrollCourse = async () => {
    if (!userInfo?.name) {
      toast.error("Vui lòng đăng nhập để mua khoá học");

      return;
    }
    const newOrder = await mutationCreateOrder.mutateAsync({
      code: createOrderCode(),
      course: courseId,
      user: userInfo._id,
      amount,
      total: amount,
      coupon,
    });

    console.log("🚀newOrder---->", newOrder);
    if (newOrder?.code) {
      router.push(`/order/${newOrder.code}`);
    }
    // try {
    //   const newOrder = await createOrder({
    //     code: createOrderCode(),
    //     course: courseId,
    //     user: userInfo._id,
    //     amount,
    //     total: amount,
    //     coupon,
    //   });

    //   if (newOrder?.code) {
    //     toast.success("Mua khoá học thành công");
    //     router.push(`/order/${newOrder.code}`);
    //   }
    // } catch (error) {
    //   console.log("🚀error handleEnrollCourse ---->", error);
    // }
  };

  return (
    <Button className="w-full" variant="primary" onClick={handleEnrollCourse}>
      Mua khoá học
    </Button>
  );
};

export default ButtonEnroll;

import { CreateCouponPage } from "@/modules/coupon/pages";
import { Heading } from "@/shared/components/common";

export interface CreateCouponPageRootProps {}

function CreateCouponPageRoot(_props: CreateCouponPageRootProps) {
  return (
    <>
      <Heading>Tạo mới mã giảm giá</Heading>
      <CreateCouponPage />
    </>
  );
}

export default CreateCouponPageRoot;

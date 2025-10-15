import { UpdateCouponContainer } from "@/modules/coupon/pages";
import { Heading } from "@/shared/components/common";

export interface UpdateCouponPageRootProps {
  searchParams: {
    code: string;
  };
}

function UpdateCouponPageRoot({ searchParams }: UpdateCouponPageRootProps) {
  return (
    <>
      <Heading>Cập nhật mã giảm giá</Heading>
      <UpdateCouponContainer code={searchParams.code} />;
    </>
  );
}

export default UpdateCouponPageRoot;

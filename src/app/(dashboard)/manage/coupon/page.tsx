import { ManageCouponContainer } from "@/modules/coupon/pages";
import { QuerySearchParams } from "@/shared/types";

export interface ManageCouponPageRootProps {}

function ManageCouponPageRoot({ searchParams }: QuerySearchParams) {
  return <ManageCouponContainer searchParams={searchParams} />;
}

export default ManageCouponPageRoot;

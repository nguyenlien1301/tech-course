import { QuerySearchParams } from "@/shared/types";

import ManageCouponContainer from "./components";

const ManageCouponPage = async ({ searchParams }: QuerySearchParams) => {
  // const couponsData = await fetchCoupons({
  //   page: searchParams.page || 1,
  //   limit: ITEM_PER_PAGE,
  //   search: searchParams.search,
  //   active: searchParams.active,
  // });

  // // searchParams.active: ở đây đang là string <=> 0 là chưa kích hoạt và 1 là đã kích hoạt
  // if (!couponsData) return null;
  // const { coupons, total } = couponsData;

  return <ManageCouponContainer searchParams={searchParams} />;
};

export default ManageCouponPage;

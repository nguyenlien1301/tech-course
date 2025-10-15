import { QuerySearchParams } from "@/shared/types";

import OrderManageContainer from "./components";

const OrderManagePage = async ({ searchParams }: QuerySearchParams) => {
  // const ordersData = await fetchOrders({
  //   page: searchParams.page || 1,
  //   limit: ITEM_PER_PAGE,
  //   search: searchParams.search,
  //   status: searchParams.status,
  // });

  // // data: trả về có thể là undefined vì vậy nên check có data hay ko
  // if (!ordersData) return null;
  // const { orders, total } = ordersData;

  return <OrderManageContainer searchParams={searchParams} />;
};

export default OrderManagePage;

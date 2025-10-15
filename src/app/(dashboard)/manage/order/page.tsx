import { OrderManageContainer } from "@/modules/order/pages";
import { QuerySearchParams } from "@/shared/types";

function OrderPageRoot({ searchParams }: QuerySearchParams) {
  return <OrderManageContainer searchParams={searchParams} />;
}

export default OrderPageRoot;

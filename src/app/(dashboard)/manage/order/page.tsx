import { OrderManagePage } from "@/modules/order/pages";
import { QuerySearchParams } from "@/shared/types";

function OrderPageRoot({ searchParams }: QuerySearchParams) {
  return <OrderManagePage searchParams={searchParams} />;
}

export default OrderPageRoot;

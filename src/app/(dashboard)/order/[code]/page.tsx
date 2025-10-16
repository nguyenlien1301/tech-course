import { OrderDetailContainer } from "@/modules/order/pages";

interface OrderDetailsPageRoot {
  params: {
    code: string;
  };
}
const OrderDetailPage = ({ params }: OrderDetailsPageRoot) => {
  return <OrderDetailContainer code={params.code} />;
};

export default OrderDetailPage;

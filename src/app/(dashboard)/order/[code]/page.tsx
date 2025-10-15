import PageNotFound from "@/app/not-found";
import { getOrderDetail } from "@/modules/order/actions";
import { formatCurrency } from "@/shared/helper";

interface OrderDetailsPageRoot {
  params: {
    code: string;
  };
}
const OrderDetail = async ({ params }: OrderDetailsPageRoot) => {
  const orderDetail = await getOrderDetail({ code: params.code });

  if (!orderDetail) return <PageNotFound />;

  return (
    <div className="flex flex-col gap-5">
      <p>
        Cám ơn bạn đã mua khoá học{" "}
        <strong className="text-primary">{orderDetail.course.title}</strong> với
        số tiền là:{" "}
        <strong className="rounded-lg bg-secondary/20 px-3 py-1 font-bold text-secondary">
          {formatCurrency(orderDetail.total)} vnd
        </strong>
      </p>
      <p>
        Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung:{" "}
        <strong className="text-blue">{orderDetail.code}</strong>
      </p>
    </div>
  );
};

export default OrderDetail;

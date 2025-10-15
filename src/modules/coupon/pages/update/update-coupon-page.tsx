import { getCouponByCode } from "../../actions";
import UpdateCouponContainer from "./components";

interface UpdateCouponPageProps {
  code: string;
}
const UpdateCouponPage = async ({ code }: UpdateCouponPageProps) => {
  const couponDetails = await getCouponByCode({ code });

  if (!couponDetails) return null;

  return <UpdateCouponContainer couponDetails={couponDetails} />;
};

export default UpdateCouponPage;

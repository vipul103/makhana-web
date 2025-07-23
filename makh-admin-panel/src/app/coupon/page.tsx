import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import CouponArea from "../components/coupon/coupon-area";

const CouponPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Coupon" subtitle="Coupon List" />
        {/* breadcrumb end */}

        {/* coupon area start */}
        <CouponArea />
        {/* coupon area end */}
      </div>
    </Wrapper>
  );
};

export default CouponPage;

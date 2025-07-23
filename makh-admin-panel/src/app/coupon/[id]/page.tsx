import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import CouponEditArea from "@/app/components/coupon/coupon-edit-area";

const CouponDynamicPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Coupon" subtitle="Coupon List" />
        {/* breadcrumb end */}

        {/* coupon area start */}
        <CouponEditArea id={params.id} />
        {/* coupon area end */}
      </div>
    </Wrapper>
  );
};

export default CouponDynamicPage;

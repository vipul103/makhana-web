import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import OrderDetailsArea from "@/app/components/order-details/order-details-area";

const OrdersPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Order Details" subtitle="Order Details" />
        {/* breadcrumb end */}

        {/* order details area */}
        <OrderDetailsArea id={params.id} />
        {/* order details area */}
      </div>
    </Wrapper>
  );
};

export default OrdersPage;

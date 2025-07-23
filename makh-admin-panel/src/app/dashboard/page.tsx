import Wrapper from "@/layout/wrapper";
import CardItems from "../components/dashboard/card-items";
import SalesReport from "../components/dashboard/sales-report";
import RecentOrders from "../components/dashboard/recent-orders";

export default function DashboardPage() {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <div className="flex justify-between items-end flex-wrap">
          <div className="page-title mb-7">
            <h3 className="mb-0 text-4xl">Dashboard</h3>
            <p className="text-textBody m-0">Welcome to your dashboard</p>
          </div>
        </div>

        {/* card item start  */}
        <CardItems />
        {/* card item end  */}

        {/* chart start */}
        <SalesReport />
        {/* chart end */}

        {/* recent orders start */}
        <RecentOrders />
        {/* recent orders end */}
      </div>
    </Wrapper>
  );
}

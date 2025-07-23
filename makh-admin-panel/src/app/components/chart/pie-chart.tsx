import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// internal
import { useGetMostSellingCategoryQuery } from "@/redux/order/orderApi";
import ErrorMsg from "../common/error-msg";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const {
    data: sellingCategory,
    isError,
    isLoading,
  } = useGetMostSellingCategoryQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && sellingCategory?.categoryData) {

    const data = {
      labels: sellingCategory?.categoryData.map((c) => c._id),
      datasets: [
        {
          label: "# of Votes",
          data: sellingCategory?.categoryData.map((c) => c.count),
          backgroundColor: ["#50CD89", "#F1416C", "#3E97FF", "#ff9800"],
          borderColor: ["#50CD89", "#F1416C", "#3E97FF", "#ff9800"],
          borderWidth: 1,
        },
      ],
    };

    content = (
      <div className="mx-auto md:!w-[240px] md:!h-[240px] 2xl:!w-[360px] 2xl:!h-[380px]">
        <Pie data={data} />
      </div>
    );
  }

  return <div className="md:h-[252px] 2xl:h-[454px] w-full">{content}</div>;
};

export default PieChart;

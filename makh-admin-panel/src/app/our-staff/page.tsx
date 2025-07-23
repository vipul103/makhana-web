import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddStaffArea from "../components/our-staff/staff-area";

const CategoryPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Staff" subtitle="Staff List" />
        {/* breadcrumb end */}

        {/*staff area start */}
        <AddStaffArea/>
        {/*staff area end */}
      </div>
    </Wrapper>
  );
};

export default CategoryPage;

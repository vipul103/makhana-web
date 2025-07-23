import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import EditStaffArea from "@/app/components/our-staff/stuff-edit-area";

const CategoryEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Staff" subtitle="Staff List" />
        {/* breadcrumb end */}

        {/*staff area start */}
        <EditStaffArea id={params.id}/>
        {/*staff area end */}
      </div>
    </Wrapper>
  );
};

export default CategoryEditPage;

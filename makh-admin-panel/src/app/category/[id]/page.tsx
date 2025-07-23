import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import EditCategory from "@/app/components/category/edit-category";
import Wrapper from "@/layout/wrapper";

const EditCategoryPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Product" subtitle="Edit Product" />
        {/* breadcrumb end */}

        {/* edit category start */}
        <EditCategory id={params.id} />
        {/* edit category end */}
      </div>
    </Wrapper>
  );
};

export default EditCategoryPage;

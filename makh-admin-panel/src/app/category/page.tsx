import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddCategory from "../components/category/add-category";

const CategoryPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Category" subtitle="Category List" />
        {/* breadcrumb end */}

        {/*add category area start */}
        <AddCategory />
        {/*add category area end */}
      </div>
    </Wrapper>
  );
};

export default CategoryPage;

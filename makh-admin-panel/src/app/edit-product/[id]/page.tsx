import Wrapper from "@/layout/wrapper";
import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import EditProductSubmit from "@/app/components/products/edit-product/edit-product-submit";

const EditProduct = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Edit Product" subtitle="Edit Product" />
        {/* breadcrumb end */}

        {/* add a product start */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 2xl:col-span-10">
            <EditProductSubmit id={params.id} />
          </div>
        </div>
        {/* add a product end */}
      </div>
    </Wrapper>
  );
};

export default EditProduct;

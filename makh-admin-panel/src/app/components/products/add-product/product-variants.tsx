import React, { useState, useEffect } from "react";
import VariantImgUpload from "./variant-img-upload";
import { SmClose } from "@/svg";

// prop type
type IPropType = {
  isSubmitted: boolean;
  relatedImages: string[];
  setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};

const ProductVariants = ({
  isSubmitted,
  setImageURLs,
  default_value,
  relatedImages,
}: IPropType) => {
  // set default value
  const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);
  // default value set
  useEffect(() => {
    if (default_value && !hasDefaultValues) {
      setImageURLs(default_value);
      setHasDefaultValues(true);
    }
  }, [default_value, hasDefaultValues, setImageURLs]);
  // handle add field
  const handleAddField = () => {
    setImageURLs((prevFormData) => [...prevFormData, ""]);
  };

  // handle remove product
  const handleRemoveProduct = (index: number) => {
    const updatedFormData = [...relatedImages];
    updatedFormData.splice(index, 1);
    setImageURLs(updatedFormData);
  };

  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <h4 className="text-[22px]">Product Variations</h4>
      {relatedImages.map((field, i) => (
        <div key={i} className="mt-10 pt-10 border-t border-gray relative">
          <div className="text-end">
            <button
              className="h-[44px] w-[44px] rounded-md border border-gray6 hover:border-red "
              type="button"
              onClick={() => handleRemoveProduct(i)}
            >
              <SmClose />
            </button>
          </div>
          <div
            className={`grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-x-6`}
          >
            <VariantImgUpload
              setImageURLs={setImageURLs}
              index={i}
              relatedImages={relatedImages}
              isSubmitted={isSubmitted}
            />
          </div>
        </div>
      ))}

      <div className="flex justify-between flex-wrap">
        <button
          className="tp-btn px-5 py-2 mt-5"
          type="button"
          onClick={handleAddField}
        >
          Add Field
        </button>
      </div>
    </div>
  );
};

export default ProductVariants;

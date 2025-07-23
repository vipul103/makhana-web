import { SmClose } from "@/svg";
import { notifySuccess } from "@/utils/toast";
import { useState, ChangeEvent, SetStateAction, useEffect } from "react";

interface FormData {
  key: string;
  value: string;
}

type IPropType = {
  setAdditionalInformation: React.Dispatch<
    SetStateAction<
      {
        key: string;
        value: string;
      }[]
    >
  >;
  default_value?: FormData[];
};

const AdditionalInformation = ({
  setAdditionalInformation,
  default_value,
}: IPropType) => {
  const [formData, setFormData] = useState<FormData[]>(
    default_value ? default_value : [{ key: "", value: "" }]
  );
  const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);
  // default value set
  useEffect(() => {
    if (default_value && !hasDefaultValues) {
      setAdditionalInformation(default_value);
      setHasDefaultValues(true);
    }
  }, [default_value, hasDefaultValues, setAdditionalInformation]);
  // handle change field
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormData(updatedFormData);
  };
  // handle add field
  const handleAddField = () => {
    const lastField = formData[formData.length - 1];
    if (lastField.key.trim() !== "" || lastField.value.trim() !== "") {
      setFormData([...formData, { key: "", value: "" }]);
      setAdditionalInformation([...formData]);
    }
  };
  // handleRemoveField
  const handleRemoveField = (index: number) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
    setAdditionalInformation(updatedFormData);
  };

  return (
    <>
      <div className="bg-white px-8 py-8 rounded-md mb-6">
        <h4 className="text-[22px]">Additional Information</h4>
        <div>
          {formData.map((data, index) => {
            const col = index === 0 ? 'col-span-6' : 'col-span-5';
            return (
              <div
                key={index}
                className={`grid grid-cols-12 gap-x-6 relative mb-6 last:mb-0`}
              >
                <div className="col-span-6">
                  <p className="mb-0 text-base text-black">Key</p>
                  <input
                    className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                    type="text"
                    name="key"
                    placeholder="Enter key"
                    value={data.key}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className={col}>
                  <p className="mb-0 text-base text-black">Value</p>
                  <input
                    className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                    type="text"
                    name="value"
                    placeholder="Enter value"
                    value={data.value}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                {index > 0 && (
                  <div className="col-span-1">
                    <p className="mb-0 text-base text-black">Remove</p>
                    <button
                      className="h-[44px] w-[44px] rounded-md border border-gray6 hover:border-red "
                      type="button"
                      onClick={() => handleRemoveField(index)}
                    >
                      <SmClose/>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <div className="flex items-center justify-between mt-8">
            <button
              className=" tp-btn px-5 py-2"
              type="button"
              onClick={handleAddField}
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInformation;

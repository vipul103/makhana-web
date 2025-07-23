import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

type IPropType = {
  offerDate: {
    startDate: null;
    endDate: null;
  };
  setOfferDate: React.Dispatch<
    React.SetStateAction<{
      startDate: null;
      endDate: null;
    }>
  >;
  defaultValue?: {
    startDate: string | null;
    endDate: string | null;
  };
  isRange?: boolean;
};

const OfferDatePicker = ({
  offerDate,
  setOfferDate,
  defaultValue,
  isRange = true,
}: IPropType) => {
  const handleValueChange = (newValue: any) => {
    setOfferDate(newValue);
  };

  return (
    <Datepicker
      useRange={isRange ? true : false}
      inputClassName="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
      value={defaultValue ? defaultValue : offerDate}
      onChange={handleValueChange}
    />
  );
};

export default OfferDatePicker;

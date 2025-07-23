import React from "react";

const EditTooltip = ({ showEdit }: { showEdit: boolean }) => {
  return (
    <div
      className={`${
        showEdit ? "flex" : "hidden"
      } flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1`}
    >
      <span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
        Edit
      </span>
      <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
    </div>
  );
};

export default EditTooltip;

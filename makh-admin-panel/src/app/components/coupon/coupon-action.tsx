import { Delete, Edit } from "@/svg";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteTooltip from "../tooltip/delete-tooltip";
import EditTooltip from "../tooltip/edit-tooltip";
import { useDeleteCouponMutation } from "@/redux/coupon/couponApi";

// prop type 
type IPropType = {
  id:string;
  setOpenSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponAction = ({ id,setOpenSidebar }: IPropType) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const router = useRouter();

  const [deleteCoupon,{data:delData,error:delErr}] = useDeleteCouponMutation();

  // handle Delete
  const handleDelete = async (delId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this coupon ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCoupon(delId);
          if ("data" in res) {
            if ("success" in res.data) {
              Swal.fire("Deleted!", `Your coupon has been deleted.`, "success");
              if(res.data.success){
                router.push('/coupon')
              }
            }
          }
        } catch (error) {
          // Handle error or show error message
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="relative">
        <Link href={`/coupon/${id}`}>
        <button
          onMouseEnter={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
          className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
        >
          <Edit />
        </button>
        </Link>
        <EditTooltip showEdit={showEdit} />
      </div>
      <div className="relative">
        <button
          onClick={() => handleDelete(id)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          <Delete />
        </button>
        <DeleteTooltip showDelete={showDelete} />
      </div>
    </div>
  );
};

export default CouponAction;

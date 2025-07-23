import { Delete, Edit } from "@/svg";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import DeleteTooltip from "../tooltip/delete-tooltip";
import EditTooltip from "../tooltip/edit-tooltip";
import { useDeleteCategoryMutation } from "@/redux/category/categoryApi";
import { useDeleteStaffMutation } from "@/redux/auth/authApi";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/navigation";

// prop type
type IPropType = {
  id: string;
};

const StaffAction = ({ id }: IPropType) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleteStaff, { data: delData }] = useDeleteStaffMutation();
  const router = useRouter()

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete this staff ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteStaff(id);
          if ("error" in res) {
            if ("data" in res.error) {
              const errorData = res.error.data as { message?: string };
              if (typeof errorData.message === "string") {
                return notifyError(errorData.message);
              }
            }
          } else {
            Swal.fire("Deleted!", `Your stuff has been deleted.`, "success");
            router.push('/our-staff')
          }
        } catch (error) {
          // Handle error or show error message
        }
      }
    });
  };

  return (
    <>
      <div className="relative">
        <Link href={`/our-staff/${id}`}>
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
    </>
  );
};

export default StaffAction;

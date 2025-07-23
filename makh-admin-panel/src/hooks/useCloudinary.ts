import { useState, useEffect } from "react";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useDeleteCloudinaryImgMutation } from "@/redux/cloudinary/cloudinaryApi";

const useCloudinary = (
  file: { url: string; id: string },
  setFormData?: React.Dispatch<React.SetStateAction<string[]>>,
  setImgUrl?: React.Dispatch<React.SetStateAction<string>>
) => {
  const [
    deleteCloudinaryImg,
    { data: delData, isError: delError, isLoading: delLoading },
  ] = useDeleteCloudinaryImgMutation();
  const [item, setItem] = useState<{ url: string; id: string }>(file);

  // set image url
  useEffect(() => {
    setItem({url:file.url,id:file.id})
  },[file.id, file.url])

  // update state when delData was changes
  useEffect(() => {
    if (delData && setFormData) {
      setFormData((prevFormData) => {
        const updatedFormData = [...prevFormData];
        const index = updatedFormData.findIndex(
          (item) => item === file.url
        );
        console.log('index',index)
        if (index !== -1) {
          updatedFormData.splice(index, 1);
        } 
        return updatedFormData;
      });
    }
    if (delData && !delError && setImgUrl) {
      setItem({ url: "", id: "" });
      setImgUrl("");
    }
  }, [delData, delError, file.url, setFormData, setImgUrl]);

  // handle delete image 
  const handleDeleteImg = (file: { url: string; id: string }) => {
    try {
      const { id } = file;
      const folder_name = id.split("/")[0];
      const public_id = id.split("/")[1];
      deleteCloudinaryImg({
        folder_name: folder_name,
        id: public_id,
      });
      notifySuccess("Image deleted successfully");
      setItem({ url: "", id: "" });
    } catch (error) {
      // Handle the error
      console.log(error)
      notifyError("Something went wrong");
    }
  };

  return {
    handleDeleteImg,
    delError,
    delLoading,
    item,
    setItem,
  };
};

export default useCloudinary;

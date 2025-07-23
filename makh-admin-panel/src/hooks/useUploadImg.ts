import { useUploadImageMutation } from "@/redux/cloudinary/cloudinaryApi";

const useUploadImage = () => {
  const [uploadImage, { data: uploadData, isError, isLoading, error }] =
    useUploadImageMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData);
    }
  };
  

  return {
    handleImageUpload,
    uploadData,
    isError,
    isLoading,
    error,
  };
};

export default useUploadImage;

import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMsg from "../common/error-msg";

export default function FormField({
  title,
  isRequired,
  bottomTitle,
  type = "text",
  placeHolder,
  register,
  errors,
  defaultValue,
}: {
  title: string;
  isRequired: boolean;
  bottomTitle?: string;
  type?: string;
  placeHolder: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  defaultValue?:string | number;
}) {
  return (
    <div className="mb-5">
      {title && (
        <p className="mb-0 text-base text-black capitalize">
          {title} {isRequired && <span className="text-red">*</span>}
        </p>
      )}
      <input
        {...register(title.split(" ").join("_"), {
          required: isRequired ? `${title} is required!` : false,
        })}
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
        type={type}
        name={title}
        id={title}
        placeholder={placeHolder}
        defaultValue={defaultValue}
      />
      {isRequired && (
        <ErrorMsg msg={(errors?.[title]?.message as string) || ""} />
      )}
      {bottomTitle && (
        <span className="text-tiny leading-4">{bottomTitle}</span>
      )}
    </div>
  );
}

import { BsCloudUploadFill } from "react-icons/bs";

function FormInput({
  extraclass,
  title,
  value = "",
  placeHolder,
  handleChange,
  id,
  type,
  name,
  box,
  min,
  required = true,
}) {
  return (
    <div className={`w-full px-3 ${extraclass}`}>
      <label
        className="flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {title}
      </label>
      {box == "textarea" ? (
        <textarea
          rows={4}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
          id={id}
          name={name}
          value={value}
          type="textarea"
          aria-rowcount={4}
          placeholder={placeHolder}
          required={required ? required : false}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={id}
          value={value}
          name={name}
          type={type}
          placeholder={placeHolder}
          required={required ? required : false}
          onChange={handleChange}
          min={min}
        />
      )}
    </div>
  );
}
function FileInput({ value = "", change, extraClass }) {
  return (
    <div
      className={`upload mb-6 mx-3 outline-2 bg-purple-50 dark:bg-purple-900/30 outline-dotted outline-purple-600 p-3 rounded-lg transition-colors ${extraClass}`}
    >
      <p
        className="mt-1  text-gray-500 dark:text-gray-300 font-bold text-xl"
        id="user_avatar_help"
      >
        Please upload a picture for your course banner
      </p>
      <label
        htmlFor="banner"
        className="flex gap-4 items-center justify-center text-center bg-violet-400 text-white px-3 py-2 rounded-md w-full ml-2 mt-6 mb-3 cursor-pointer hover:bg-violet-500 ease-in transition-colors"
      >
        Upload file <BsCloudUploadFill />
      </label>

      <input hidden id="banner" type="file" required onChange={change} />
      {value && (
        <div>
          <img
            className="mx-auto aspect-auto mt-4 p-4"
            src={URL.createObjectURL(value)}
            width={250}
            alt="image file"
          />
          <p className="text-violet-700 font-bold dark:text-violet-200 rounded-md uppercase">
            SIZE: {(value?.size / 1024 / 1024).toFixed(3)} MB
          </p>
        </div>
      )}
    </div>
  );
}
export { FormInput, FileInput };

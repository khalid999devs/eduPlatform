import { BsCloudUploadFill } from "react-icons/bs";

function FormInput({
  extraclass,
  title,
  value,
  placeHolder,
  handleChange,
  id,
  type,
  box,
}) {
  return (
    <div className={`w-full px-3 ${extraclass}`}>
      <label
        className="flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={id}
      >
        {title}
      </label>
      {box == "textarea" ? (
        <textarea
          rows={4}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
          id={id}
          value={value}
          type="textarea"
          aria-rowcount={4}
          placeholder={placeHolder}
          required
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={id}
          value={value}
          type={type}
          placeholder={placeHolder}
          required
          onChange={handleChange}
        />
      )}
    </div>
  );
}
function FileInput({ value, change, extraClass }) {
  // console.log(value);
  return (
    <div
      className={`upload mb-6 mx-3 outline-2 bg-purple-500/50 outline-dotted outline-purple-600 p-3 rounded-lg transition-colors ${extraClass}`}
    >
      <p className="mt-1  text-purple-50 font-bold text-xl">
        Please upload a picture for your course banner
      </p>
      <label
        htmlFor="banner"
        className="flex gap-4 items-center justify-center text-center bg-violet-400 text-white px-3 py-2 rounded-md w-full ml-2 mt-6 mb-3 cursor-pointer hover:bg-violet-500 ease-in transition-colors"
      >
        Upload file <BsCloudUploadFill />
      </label>

      <input
        hidden
        id="banner"
        type="file"
        accept="image/jpg,image/jpeg,image/png"
        required
        onChange={change}
      />
      {value && (
        <div>
          <p className="text-darkText font-bold rounded-md uppercase">
            {value?.name}
          </p>
          <p className="text-darkText font-bold rounded-md uppercase">
            SIZE:{" "}
            {(
              value?.size /
              1024 /
              (value?.size > 1024 * 1024 ? 1024 : 1)
            ).toFixed(2)}{" "}
            {value?.size > 1024 * 1024 ? "MB" : "KB"}
          </p>
        </div>
      )}
    </div>
  );
}
export { FormInput, FileInput };

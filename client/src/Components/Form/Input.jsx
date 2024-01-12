import { useEffect } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
function Input({
  id,
  title,
  value,
  setVal,
  placeHolder,
  type,
  autoComplete,
  show,
  handlePass,
  required,
  labelClass,
  inputClass,
  onChange,
  name,
  props,
  error = { state: "severe", text: "" },
}) {
  return (
    <section className="relative">
      <label
        className={"flex-1 text-left font-bold " + labelClass}
        htmlFor={id}
      >
        {title}
        <b>:</b>
      </label>

      <input
        className={`placeholder:text-yellow-50/50 w-full md:w-auto mb-2 ${
          value?.length ? "ring-slate-600 ring " : ""
        } ${inputClass}`}
        type={type ? (show ? "text" : type) : "text"}
        id={id}
        autoComplete={autoComplete ? "on" : "off"}
        placeholder={placeHolder}
        maxLength={type == "password" ? 20 : 100}
        minLength={type == "password" ? 3 : 1}
        value={value}
        required={required}
        onChange={(e) => {
          setVal(e.target.value);
          onChange && onChange(e);
        }}
        name={name}
        {...props}
      />
      {error.state && (
        <p
          className={`absolute right-0 top-[95%] md:top-[90%] text-xs ${
            error.state === "severe" ? "text-red-700" : "text-orange-500"
          }`}
        >
          {error.text}
        </p>
      )}

      {type === "password" && (
        <span
          className="absolute top-[50%] md:top-[10%] my-2 right-2"
          onClick={handlePass}
        >
          {show ? (
            <AiFillEyeInvisible fontSize={"1.2rem"} />
          ) : (
            <AiOutlineEye fontSize={"1.2rem"} />
          )}
        </span>
      )}
    </section>
  );
}

export default Input;

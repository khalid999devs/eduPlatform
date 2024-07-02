import React from 'react';

const OptionField = ({
  id,
  label,
  value,
  setValue,
  optionsObjs,
  name,
  labelClass,
  selectClass,
  classes,
  variant = 'normal', //small
}) => {
  return (
    <div
      className={`w-full relative inline-block after:content-["\\25BC"] after:absolute after:top-[55%] after:right-[10px] after:translate-[-50%,-50%] after:pointer-events-none after:!text-white ${
        variant === 'small' ? 'after:!top-[22%] after:!right-[4%]' : ''
      } ${classes}`}
    >
      {label && (
        <label htmlFor={id} className={'text-sm ' + labelClass}>
          {label}
        </label>
      )}
      <select
        value={value}
        name={name}
        id={id}
        className={
          `mt-2 p-1 text-lg b-none rounded-sm appearance-none bg-onPrimary-main text-white cursor-pointer w-full ${
            variant === 'small' ? '!text-sm !px-2 !pr-5 mr-3 !mt-0 ' : ''
          }` + selectClass
        }
        onChange={setValue}
      >
        {optionsObjs.map((option, key) => {
          return (
            <option value={option.value} key={key}>
              {option.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default OptionField;

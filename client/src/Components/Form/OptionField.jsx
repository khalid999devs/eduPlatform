import React from 'react';

const OptionField = ({ id, label, setValue, optionsObjs, name }) => {
  return (
    <div className='w-full relative inline-block after:content-["\25BC"] after:absolute after:top-[55%] after:right-[10px] after:translate-[-50%,-50%] after:pointer-events-none after:text-white '>
      <label htmlFor={id} className=' text-sm'>
        {label}
      </label>
      <select
        name={name}
        id={id}
        className='mt-2 p-1 text-lg b-none rounded-sm appearance-none bg-onPrimary-main text-white cursor-pointer w-full'
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

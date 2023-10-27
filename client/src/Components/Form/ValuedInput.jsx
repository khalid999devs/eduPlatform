import React from 'react';

const ValuedInput = ({ inputProps, label }) => {
  return (
    <div className='grid gap-2 w-full'>
      <label
        htmlFor={inputProps.name}
        className='text-sm font-medium opacity-60'
      >
        {label}
      </label>
      <input
        type='text'
        {...inputProps}
        className='p-3 text-md border border-opacity-30 border-onPrimary-main outline-none rounded-md w-fu;'
      />
    </div>
  );
};

export default ValuedInput;

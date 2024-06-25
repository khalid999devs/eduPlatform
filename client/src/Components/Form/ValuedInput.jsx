import { IoEye } from 'react-icons/io5';
import { IoEyeOff } from 'react-icons/io5';

const ValuedInput = ({ inputProps, label, alert, type, show, onShowClick }) => {
  return (
    <div className='grid gap-2 w-full'>
      <label
        htmlFor={inputProps.name}
        className='text-sm font-medium opacity-60'
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type={type || 'text'}
          {...inputProps}
          className='p-3 text-md border border-opacity-30 border-onPrimary-main outline-none rounded-md w-full'
        />
        {(show === true || show === false) && (
          <div
            className={`absolute right-[3%] top-[50%] cursor-pointer`}
            style={{ transform: 'translate(-50%,-50%)' }}
            onClick={onShowClick}
          >
            {show ? <IoEye /> : <IoEyeOff />}
          </div>
        )}
      </div>

      {alert?.msg && (
        <p
          className={`${
            alert.state === 'error'
              ? 'text-red-700'
              : alert.state === 'normal'
              ? 'text-onPrimary-main opacity-60'
              : 'text-orange-600'
          } text-xs ml-1 -mt-1.5`}
        >
          {alert.msg}
        </p>
      )}
    </div>
  );
};

export default ValuedInput;

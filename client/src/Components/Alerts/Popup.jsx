import React from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';

const Popup = ({
  state,
  text,
  buttonLable,
  onClick,
  btnDisabled = false,
  loading = false,
}) => {
  return (
    <div className='fixed z-50 h-screen w-full bg-[rgba(0,0,0,.3)] left-0 top-0'>
      <div
        className='fixed top-[50%] left-[50%] p-2 z-51 bg-primary-main rounded-lg max-w-[350px] w-[100%]'
        style={{ transform: 'translate(-50%,-50%)' }}
      >
        <div className='mb-6 p-4 pt-3'>
          <p
            className={`text-mg text-${
              state === 'error'
                ? 'red-700'
                : state === 'warning'
                ? 'orange-700'
                : state === 'success'
                ? 'green-600'
                : 'onPrimary-main'
            } `}
          >
            {text}
          </p>
          {loading && (
            <div className='w-[150px] m-auto my-6'>
              <img src='/Images/loading.gif' alt='Loading...' width={'100%'} />
            </div>
          )}
        </div>
        <div className='flex flex-row justify-center items-center my-2'>
          <PrimaryButton
            onClick={onClick}
            text={buttonLable || 'ok'}
            disabled={loading || btnDisabled}
            classes={`bg-onPrimary-main text-white`}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;

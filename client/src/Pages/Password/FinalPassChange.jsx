import React, { useState } from 'react';
import Input from '../../Components/Form/Input';
import ValuedInput from '../../Components/Form/ValuedInput';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';

const FinalPassChange = ({
  handleNewPassChange,
  changeInfo,
  handleChangePass,
  alert,
  setAlert,
}) => {
  const [show, setShow] = useState(false);
  const onShowClick = () => {
    setShow(!show);
  };
  return (
    <form>
      <div className='flex flex-col gap-6 '>
        <ValuedInput
          label={'New Password'}
          type={!show ? 'password' : 'text'}
          show={show}
          onShowClick={onShowClick}
          inputProps={{
            name: 'pass',
            onChange: (e) => {
              const input = e.target.value;
              handleNewPassChange(e);
              if (input && input.length < 4) {
                setAlert({
                  msg: 'password must be greater than 3 characters',
                  state: 'error',
                });
              } else {
                if (alert.msg !== '') setAlert({ mag: '', state: '' });
              }
            },
            placeholder: 'Password',
            value: changeInfo.pass,
            required: true,
          }}
          alert={alert}
        />
        <ValuedInput
          label={'Confirm new Password'}
          type={!show ? 'password' : 'text'}
          show={show}
          onShowClick={onShowClick}
          inputProps={{
            name: 'cPass',
            onChange: (e) => {
              handleNewPassChange(e);
              const input = e.target.value;
              if (
                input.length > 0 &&
                changeInfo.pass.length > 0 &&
                input !== changeInfo.pass
              ) {
                setAlert({ msg: 'Password did not match', state: 'error' });
              } else {
                if (alert.msg !== '') setAlert({ mag: '', state: '' });
              }
            },
            placeholder: 'Confirm Password',
            value: changeInfo.cPass,
            required: true,
          }}
          alert={alert}
        />
      </div>

      <div className='flex items-center justify-center mt-8'>
        <PrimaryButton
          classes={'bg-onPrimary-main p-3'}
          textClasses={'text-center w-full text-white'}
          text={'Set Password'}
          type={'submit'}
          onClick={handleChangePass}
        />
      </div>
    </form>
  );
};

export default FinalPassChange;

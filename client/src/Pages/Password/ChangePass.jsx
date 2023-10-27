import React, { useState } from 'react';
import Input from '../../Components/Form/Input';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import ValuedInput from '../../Components/Form/ValuedInput';
import { ContextConsumer } from '../../App';
import SendOTP from './SendOTP';
import VerifyOTP from './VerifyOTP';

const ChangePass = () => {
  const { user } = ContextConsumer();
  const [info, setInfo] = useState({
    email: user.email,
    mobileNo: user.mobileNo,
  });
  const [changeMode, setChangeMode] = useState('SendOTP');
  const [mode, setMode] = useState('email');

  const handleSetOtp = () => {
    console.log(`otp sent`);
    setChangeMode('VerifyOTP');
  };
  const handleChange = (e) => {
    setInfo((info) => {
      return { ...info, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className='px-3 m-auto w-max my-10 min-h-[300px]'>
      <div className='create backdrop-blur-lg bg-slate-100/10 w-full md:px-20 shadow-lg p-6 pt-0 py-12'>
        <h1 className=' text-center text-3xl underline font-bold my-10 mx-auto'>
          Change Password
        </h1>

        {changeMode === 'SendOTP' ? (
          <SendOTP
            info={info}
            setInfo={setInfo}
            mode={mode}
            setMode={setMode}
            handleSetOtp={handleSetOtp}
            handleChange={handleChange}
          />
        ) : (
          <VerifyOTP />
        )}
      </div>
    </div>
  );
};

export default ChangePass;

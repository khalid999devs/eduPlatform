import React, { useState } from 'react';
import Input from '../../Components/Form/Input';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import ValuedInput from '../../Components/Form/ValuedInput';
import { ContextConsumer } from '../../App';
import SendOTP from './SendOTP';
import axios from 'axios';
import reqs from '../../assets/requests';
import FinalPassChange from './FinalPassChange';

const ChangePass = () => {
  const { user } = ContextConsumer();
  const [info, setInfo] = useState({
    email: user.email,
    mobileNo: user.mobileNo,
  });
  const [changeMode, setChangeMode] = useState('finalPassChange'); //SendOTP|VerifyOTP|finalPassChange
  const [mode, setMode] = useState('email');
  const [changeInfo, setChangeInfo] = useState({
    pass: '',
    cPass: '',
  });
  const [otp, setOtp] = useState('');
  const [alert, setAlert] = useState({ msg: '', state: '' });

  const handleSetOtp = () => {
    const data =
      mode == 'email'
        ? { email: info.email, sendMode: mode }
        : { number: info.mobileNo, sendMode: mode };

    axios
      .post(reqs.RESET_PASS_SET_TOKEN, data)
      .then((res) => {
        if (res.data.succeed) {
          console.log(res.data);
          setAlert({ msg: res.data.msg, state: 'success' });
          setChangeMode('VerifyOTP');
        } else {
          throw new Error(res.data.msg);
        }
      })
      .catch((err) => {
        setAlert({
          msg: err.response.data.msg || err.message || 'Error sending OTP',
          state: 'error',
        });
        console.log(err);
      });
  };

  const handleOTPVerify = (onChangeOTP) => {
    axios
      .post(reqs.RESET_PASS_OTP_VERIFY, {
        [info.email ? 'email' : 'phone']: info.email || info.mobileNo,
        otp: onChangeOTP.length === 4 ? onChangeOTP : otp,
        mode: 'ov',
        sendMode: mode,
      })
      .then((res) => {
        if (res.data.succeed) {
          console.log(res.data);
          setAlert({ msg: res.data?.msg, state: 'success' });
          setChangeMode('finalPassChange');
        } else {
          throw new Error(res.data.msg);
        }
      })
      .catch((err) => {
        setAlert({
          msg: err.response?.data.msg || err.message || 'Error sending OTP',
          state: 'error',
        });
        console.log(err);
      });
  };

  const handleChangePass = () => {
    console.log('pads');
    //axios.post(reqs.RESET_PASS_OTP_VERIFY,{})
  };

  const handleChange = (e) => {
    setInfo((info) => {
      return { ...info, [e.target.name]: e.target.value };
    });
  };

  const handleNewPassChange = (e) => {
    setChangeInfo((changeInfo) => {
      return { ...changeInfo, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className='px-3 m-auto w-max my-10 min-h-[300px]'>
      <div className='create backdrop-blur-lg bg-slate-100/10 w-full md:px-20 shadow-lg p-6 pt-0 py-12'>
        <h1 className=' text-center text-3xl underline font-bold my-10 mx-auto'>
          Change Password
        </h1>

        {changeMode === 'SendOTP' || changeMode === 'VerifyOTP' ? (
          <SendOTP
            info={info}
            setInfo={setInfo}
            mode={mode}
            setMode={setMode}
            handleSetOtp={handleSetOtp}
            handleChange={handleChange}
            changeMode={changeMode}
            otp={otp}
            setOtp={setOtp}
            handleOTPVerify={handleOTPVerify}
            alert={alert}
          />
        ) : (
          <FinalPassChange
            changeInfo={changeInfo}
            handleNewPassChange={handleNewPassChange}
            handleChangePass={handleChangePass}
          />
        )}
      </div>
    </div>
  );
};

export default ChangePass;

import React, { useEffect, useRef, useState } from 'react';
import Input from '../../Components/Form/Input';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import ValuedInput from '../../Components/Form/ValuedInput';
import { ContextConsumer } from '../../App';
import SendOTP from './SendOTP';
import axios from 'axios';
import reqs from '../../assets/requests';
import FinalPassChange from './FinalPassChange';
import PopUp from '../../Components/Alerts/Popup';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
  const navigate = useNavigate();
  const { user } = ContextConsumer();
  const [info, setInfo] = useState({
    email: user.email,
    mobileNo: user.mobileNo,
  });
  const [changeMode, setChangeMode] = useState('SendOTP'); //SendOTP|VerifyOTP|finalPassChange
  const [mode, setMode] = useState('email');
  const [changeInfo, setChangeInfo] = useState({
    pass: '',
    cPass: '',
  });
  const [otp, setOtp] = useState('');
  const [alert, setAlert] = useState({ msg: '', state: '' });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [otpClicked, setOtpClicked] = useState(false);
  const countDownRef = useRef();

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
          setOtpClicked(true);
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
          setAlert({ msg: '', state: '' });
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

  const handleChangePass = (e) => {
    e.preventDefault();
    if (changeInfo.pass && changeInfo.cPass) {
      setLoading(true);
      setPopup(true);
      axios
        .post(reqs.RESET_PASS_OTP_VERIFY, {
          [info.email ? 'email' : 'phone']: info.email || info.mobileNo,
          otp: otp,
          mode: 'rp',
          password: changeInfo.pass,
          sendMode: mode,
        })
        .then((res) => {
          setLoading(false);
          if (res.data.succeed) {
            setAlert({ msg: res.data.msg, state: 'success' });
            console.log(res.data);
          } else {
            throw new Error(res.data.msg);
          }
        })
        .catch((err) => {
          setLoading(false);
          setAlert({
            msg:
              err.response?.data.msg ||
              err.message ||
              'something went wrong.Please try again',
            state: 'error',
          });
          console.log(err);
        });
    } else {
      setAlert({
        msg: 'Please Enter the new Pass',
        state: 'error',
      });
    }
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

  useEffect(() => {
    let id;
    if (otpClicked) {
      const finalTime = Date.now() + 30 * 1000;
      let differT;
      id = setInterval(() => {
        differT = Math.round((finalTime - Date.now()) / 1000);
        if (countDownRef) countDownRef.current.textContent = differT || '';
        if (differT < 1 || changeMode === 'finalPassChange') {
          clearInterval(id);
          setOtpClicked(false);
        }
      }, [1000]);
    }
    return () => clearInterval(id);
  }, [otpClicked]);

  return (
    <div className='px-3 m-auto w-max my-10 min-h-[300px]'>
      {popup && (
        <PopUp
          loading={loading}
          onClick={() => {
            setPopup(false);
            if (changeMode === 'finalPassChange' && alert.state === 'success') {
              navigate('/login');
            }
          }}
          state={alert.state}
          text={alert.msg}
        />
      )}
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
            setChangeMode={setChangeMode}
            otp={otp}
            setOtp={setOtp}
            handleOTPVerify={handleOTPVerify}
            alert={alert}
            otpClicked={otpClicked}
            countDownRef={countDownRef}
          />
        ) : (
          <FinalPassChange
            changeInfo={changeInfo}
            handleNewPassChange={handleNewPassChange}
            handleChangePass={handleChangePass}
            alert={alert}
            setAlert={setAlert}
          />
        )}
      </div>
    </div>
  );
};

export default ChangePass;

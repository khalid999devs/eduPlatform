import { useEffect, useState } from 'react';
import Input from '../../Form/Input';
import PrimaryButton from '../../Buttons/PrimaryButton';
import AlertBox from '../../Form/AlertBox';
import { Link } from 'react-router-dom';
import { emailResExp, mobileResExp } from '../../../assets/utils';
import { ContextConsumer } from '../../../App';

function LoginForm({ children }) {
  const { setUser, user } = ContextConsumer();
  const [emailMob, setemailMob] = useState('');
  const [pass, setpass] = useState('');
  const [check, setchk] = useState(false);
  const [show, handlePass] = useState(false);
  const [error, setError] = useState({ text: '', alert: '', state: false });
  const setErrorToInit = () => {
    setError({ text: '', alert: '', state: false });
  };

  function handlesubmit(e) {
    e.preventDefault();
    if (emailMob && pass) {
      let passed = false;
      if (emailMob.includes('@')) {
        if (!emailResExp.test(emailMob)) {
          setError({
            text: 'Invalid Email address provided',
            state: true,
            alert: 'error',
          });
          passed = false;
        } else passed = true;
      } else {
        if (!mobileResExp.test(emailMob)) {
          setError({
            text: 'Invalid Mobile no. provided',
            state: true,
            alert: 'error',
          });
          passed = false;
        } else passed = true;
      }

      if (passed === true) {
        if (error.state) setErrorToInit();
        const data = {
          emailMob,
          pass,
          isCookieLong: check,
        };
        console.log(data);
        //api call here
      } else {
        return;
      }
      //api req
    } else {
      setError({
        text: 'Email or password must not be empty',
        state: true,
        alert: 'error',
      });
    }
  }

  return (
    <>
      {error.state && (
        <AlertBox setAlert={setError} text={error.text} alert={error.alert} />
      )}
      <form className='create backdrop-blur-lg bg-slate-100/10 w-full md:px-20 shadow-lg p-6 pt-0'>
        <h1 className=' text-center text-3xl underline font-bold my-10 mx-auto'>
          Sign in
        </h1>
        {/* email */}
        <Input
          id={'emailMob'}
          placeHolder={'example@gmail.com/01XXXXXXXXX'}
          setVal={setemailMob}
          value={emailMob}
          autoComplete={true}
          title={'Email/Mobile no'}
          required={true}
        />
        {/* password */}
        <Input
          id={'pass'}
          placeHolder={'enter your password'}
          setVal={setpass}
          value={pass}
          autoComplete={false}
          type={'password'}
          title={'Password'}
          show={show}
          required={true}
          handlePass={() => handlePass((pre) => !pre)}
        />
        {/* check box */}
        <PrimaryButton
          classes={
            'flex justify-start gap-4 items-center select-none -mx-2 hover:scale-100'
          }
          onClick={(e) => {
            e.preventDefault();
            setchk((pre) => !pre);
          }}
          children={
            <>
              <div
                className={`w-3 h-3 p-1 rounded-full ring-1 ring-offset-1 duration-150 ease-linear ${
                  check
                    ? 'bg-sky-500 ring-sky-400'
                    : 'bg-transparent ring-gray-400'
                }`}
              ></div>
              <p className='text-xs capitalize'>Remember me</p>
            </>
          }
        />
        {/* button */}
        <PrimaryButton
          classes={'bg-onPrimary-main p-3'}
          textClasses={'text-center w-full text-white'}
          text={'Login'}
          type={'submit'}
          onClick={handlesubmit}
        />

        <p className='underline text-right '>
          <Link
            to={'/change-pass'}
            className='text-sm hover:text-secondary-dark duration-150 ease-out'
          >
            forget password?
          </Link>
        </p>
        <div className='mt-4'>{children}</div>
      </form>
    </>
  );
}

export default LoginForm;

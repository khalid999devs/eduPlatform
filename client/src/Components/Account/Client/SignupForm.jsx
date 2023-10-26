import { useEffect, useState } from 'react';
import Input from '../../Form/Input';
import AlertBox from '../../Form/AlertBox';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { mobileResExp } from '../../../assets/utils';
import { ContextConsumer } from '../../../App';

function SignupForm() {
  const { user, setUser } = ContextConsumer();
  const [fullName, setFullName] = useState('');
  const [email, setemail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [pass, setpass] = useState('');
  const [conpass, setConpass] = useState('');
  const [passvalid, setpv] = useState(null);
  const [show, handlePass] = useState(false);
  const [inputError, setInputError] = useState({
    mobileNo: {
      name: '',
      state: '',
      text: '',
    },
    fullName: {
      name: '',
      state: '',
      text: '',
    },
  });
  const [error, setError] = useState({ text: '', alert: '', state: false });
  const setErrorToInit = () => {
    setError({ text: '', alert: '', state: false });
  };

  function handlesubmit(e) {
    e.preventDefault();
    if (
      (mobileNo || email) &&
      fullName &&
      pass &&
      conpass &&
      !inputError.state
    ) {
      setErrorToInit();
      const data = {
        fullName,
        mobileNo,
        email,
        pass,
      };
      console.log(data);
    } else {
      if (inputError.state)
        setError({
          text: inputError.text,
          alert: 'error',
          state: true,
        });
      else if (!email || !mobileNo)
        setError({
          text: 'You must provide either email or mobile no.',
          alert: 'error',
          state: true,
        });
    }
  }
  useEffect(() => {
    if (conpass.length !== 0 && pass !== conpass) {
      setpv(false);
    } else if (conpass.length !== 0 && pass == conpass) {
      setpv(true);
    } else {
      setpv(null);
    }
  });

  return (
    <>
      {error.state && (
        <AlertBox setAlert={setError} text={error.text} alert={error.alert} />
      )}
      <form
        onSubmit={handlesubmit}
        className='create backdrop-blur-lg shadow-lg w-full px-10 md:px-20 pt-6 pb-14'
      >
        <h1 className='text-center text-3xl font-bold my-5 mb-8 '>
          Create a new account
        </h1>

        {/* Fullname */}
        <Input
          id={'fullName'}
          placeHolder={'your full name'}
          setVal={setFullName}
          value={fullName}
          autoComplete={true}
          type={'text'}
          title={'Full name'}
          name={'fullName'}
          required={true}
          onChange={(e) => {
            if (e.target.value.length > 40) {
              setInputError((inputError) => {
                return {
                  ...inputError,
                  [e.target.name]: {
                    ...inputError.fullName,
                    state: 'severe',
                    text: 'Name is too long',
                    name: e.target.name,
                  },
                };
              });
            } else
              setInputError((inputError) => {
                return {
                  ...inputError,
                  [e.target.name]: {
                    state: '',
                    text: '',
                    name: '',
                  },
                };
              });
          }}
          error={inputError.fullName}
        />

        {/* email */}
        <Input
          id={'email'}
          placeHolder={'example@gmail.com'}
          setVal={setemail}
          value={email}
          autoComplete={false}
          type={'email'}
          title={'Email'}
          name={'email'}
        />

        {/* Mobile no */}
        <Input
          id={'mobile'}
          placeHolder={'01XXXXXXXXX'}
          setVal={setMobileNo}
          name={'mobileNo'}
          onChange={(e) => {
            if (
              !mobileResExp.test(e.target.value) &&
              e.target.value.length !== 0
            )
              setInputError({
                state: 'severe',
                text: 'Enter a valid mobile no.',
                name: e.target.name,
              });
            else setInputError({ state: '', text: '', name: '' });
          }}
          value={mobileNo}
          autoComplete={true}
          type={'text'}
          error={inputError.name === 'mobileNo' ? inputError : {}}
          title={'Mobile no'}
        />

        {/* password */}
        <Input
          id={'pass'}
          placeHolder={'type your password'}
          setVal={setpass}
          value={pass}
          autoComplete={false}
          type={'password'}
          title={'Password'}
          name={'password'}
          show={show}
          required={true}
          handlePass={() => handlePass((pre) => !pre)}
        />
        {/* confirm password */}
        <Input
          id={'conPass'}
          placeHolder={'retype password'}
          setVal={setConpass}
          value={conpass}
          autoComplete={false}
          type={'password'}
          title={'Confirm Password'}
          name={'confirmPass'}
          show={show}
          required={true}
          handlePass={() => handlePass((pre) => !pre)}
        />

        {!passvalid && passvalid != null ? (
          <p className='text-red-500 font-semibold mb-5 -my-2 text-sm'>
            *Password do not match
          </p>
        ) : (
          passvalid && (
            <p className='text-green-600 font-semibold mb-5 -my-2 text-sm'>
              *Password is matched
            </p>
          )
        )}
        {pass.length < 4 && pass.length != 0 && (
          <p className='text-yellow-600 font-semibold -mt-5 mb-5 text-sm'>
            *password must be greater than 3 character
          </p>
        )}
        {/* button */}
        {/* button */}
        <PrimaryButton
          classes={'bg-onPrimary-main p-3 mt-4'}
          textClasses={'text-center w-full text-white'}
          text={'Sign Up'}
          type={'submit'}
        />
      </form>
    </>
  );
}

export default SignupForm;

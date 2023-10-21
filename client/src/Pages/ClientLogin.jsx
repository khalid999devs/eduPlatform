import { useState } from 'react';
import Input from '../Components/Form/Input';

function ClientLogin() {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [check, setchk] = useState(false);
  function handlesubmit(e) {
    e.preventDefault();
  }
  return (
    <div className='signin'>
      <h1 className='title'>Sign in</h1>
      <form onSubmit={handlesubmit}>
        <div className='create'>
          {/* email */}
          <Input
            id={'email'}
            placeHolder={'enter your email'}
            setVal={setemail}
            value={email}
            autoComplete={false}
            type={'email'}
            title={'Email'}
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
          />
          {/* check box */}
          <div className='flex justify-start gap-4 items-center select-none  '>
            <div
              className={`w-3 h-3 p-1 rounded-sm ring-1 ring-gray-400 ring-offset-1 duration-150 ease-linear ${
                check ? 'bg-sky-500 ' : 'bg-transparent '
              }`}
            ></div>
            <p className='text-xs' onClick={() => setchk((pre) => !pre)}>
              Remember me
            </p>
          </div>
          {/* button */}
          <button
            className='bg-slate-900 text-slate-100 rounded-md p-3 hover:bg-blue-600 hover:shadow-blue-500/40 hover:shadow-lg duration-100 ease-out'
            type='submit'
          >
            Login
          </button>
          <p className='underline text-right text-sm hover:text-blue-600 duration-150 ease-out'>
            <a href='/forgetPassword'>forget password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ClientLogin;

import {  useState } from "react"; 
import Input from '../../Components/Form/Input';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import AlertBox from '../../Components/Form/AlertBox';
 
import Popup from '../../Components/Alerts/Popup';
 
function AdminLogin({ children }) {
   
  const [loading, setLoading] = useState(false);

 
  const [emailMob, setemailMob] = useState('');
  const [pass, setpass] = useState('');
  const [check, setchk] = useState(false);
  const [show, handlePass] = useState(false);
  const [error, setError] = useState({ text: '', alert: '', state: false });
  const [popup, setPopup] = useState({ text: '', state: '' }); //state: error,warning,success
  

   

  return (
    <>
      {popup.text && (
        <Popup
          state={popup.state}
          text={popup.text}
          loading={loading}
          onClick={() => {
            setLoading(false);
            setPopup({ text: '', state: '' });
          }}
        />
      )}
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
          placeHolder={'example@gmail.com'}
          setVal={setemailMob}
          value={emailMob}
          autoComplete={true}
          title={'Email'}
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
                className={`w-3 h-3 p-1 rounded-full ring-1 ring-offset-1 duration-150 ease-linear ${check
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
        />
        <div className='mt-4'>{children}</div>
      </form>
    </>
  );
}

export default AdminLogin;

import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import ValuedInput from '../../Components/Form/ValuedInput';

const SendOTP = ({
  info,
  setInfo,
  mode,
  setMode,
  handleSetOtp,
  handleChange,
}) => {
  return (
    <>
      <div className='flex flex-col gap-8 mb-3'>
        {mode === 'email' ? (
          <ValuedInput
            label={'Your Email'}
            inputProps={{
              value: info.email,
              name: 'email',
              onChange: handleChange,
              placeholder: 'example@gmail.com',
            }}
          />
        ) : (
          <ValuedInput
            label={'Your Mobile no.'}
            inputProps={{
              value: info.mobileNo,
              name: 'mobileNo',
              onChange: handleChange,
              placeholder: '01XXXXXXXXX',
            }}
          />
        )}

        <button
          className='text-secondary-dark hover:text-orange-600 transition-transform p-1'
          onClick={() => {
            setMode((mode) => (mode === 'email' ? 'sms' : 'email'));
          }}
        >
          {mode === 'email'
            ? `Send with SMS instead`
            : `Send with email instead`}
        </button>
      </div>

      {/* button */}
      <PrimaryButton
        classes={'bg-onPrimary-main p-3'}
        textClasses={'text-center w-full text-white'}
        text={'get otp'}
        type={'submit'}
        onClick={handleSetOtp}
      />
    </>
  );
};

export default SendOTP;

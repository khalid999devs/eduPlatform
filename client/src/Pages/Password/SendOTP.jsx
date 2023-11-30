import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import ValuedInput from '../../Components/Form/ValuedInput';

const SendOTP = ({
  info,
  setInfo,
  mode,
  setMode,
  handleSetOtp,
  handleChange,
  changeMode,
  otp,
  setOtp,
  alert,
  handleOTPVerify,
}) => {
  return (
    <>
      <div className='flex flex-col gap-8 mb-3'>
        {changeMode === 'SendOTP' ? (
          <>
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
          </>
        ) : (
          <>
            <ValuedInput
              label={'Enter the 4 digit OTP'}
              inputProps={{
                value: otp,
                name: 'otp',
                onChange: (e) => {
                  const input = e.target.value;
                  setOtp(input);
                  if (input.length === 4) {
                    handleOTPVerify(input);
                  }
                },
                placeholder: 'XXXX',
              }}
            />
          </>
        )}

        {alert.msg && (
          <div
            className={`my-3 p-2 ${
              alert.state === 'success' ? 'green-300' : 'red-300'
            }`}
          >
            <p
              className={`text-sm text-${
                alert.state === 'success' ? 'green-700' : 'red-700'
              }`}
            >
              {alert.msg || 'Some text for the alert msg sent from server'}
            </p>
          </div>
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
      {changeMode === 'SendOTP' ? (
        <PrimaryButton
          classes={'bg-onPrimary-main p-3'}
          textClasses={'text-center w-full text-white'}
          text={'get otp'}
          type={'submit'}
          onClick={handleSetOtp}
        />
      ) : (
        <PrimaryButton
          classes={'bg-onPrimary-main p-3'}
          textClasses={'text-center w-full text-white'}
          text={'Verify OTP'}
          type={'submit'}
          onClick={handleOTPVerify}
        />
      )}
    </>
  );
};

export default SendOTP;

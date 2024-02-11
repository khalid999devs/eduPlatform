import { useState } from 'react';
import ValuedInput from '../../Components/Form/ValuedInput';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({
    name: '',
    email: '',
    phone: '',
    fbId: '',
    address: '',
  });
  const handleChange = (e) => {
    setProfileInfo((profileInfo) => {
      return { ...profileInfo, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = profileInfo;
    console.log(data);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-5 mb-6 w-full' aria-disabled>
        <h1 className='text-xl font-medium '>My Profile</h1>
        <form className='p-2 opacity-70 pointer-events-none relative select-none'>
          <div className=' flex w-full flex-col lg:grid lg:grid-cols-2 gap-6 max-w-md md:w-full lg:max-w-full lg:gap-8 mb-10'>
            <ValuedInput
              label={'Full Name'}
              inputProps={{
                value: profileInfo?.name,
                name: 'name',
                onChange: handleChange,
                placeholder: 'Enter your Full Name',
              }}
            />
            <ValuedInput
              label={'Email Address'}
              inputProps={{
                value: profileInfo.email,
                name: 'email',
                onChange: handleChange,
                placeholder: 'example@gmail.com',
              }}
            />
            <ValuedInput
              label={'Mobile no.'}
              inputProps={{
                value: profileInfo.phone,
                name: 'phone',
                onChange: handleChange,
                placeholder: '01XXXXXXXXX',
              }}
            />

            <ValuedInput
              label={'Address'}
              inputProps={{
                value: profileInfo.address,
                name: 'address',
                onChange: handleChange,
                placeholder: 'Enter your address',
              }}
            />

            <ValuedInput
              label={'Facebook ID'}
              inputProps={{
                value: profileInfo.fbId,
                name: 'fbId',
                onChange: handleChange,
                placeholder: 'https://facebook.com/example',
              }}
            />
          </div>

          <div className='flex flex-col gap-4 md:flex-row w-full'>
            <PrimaryButton
              text={'Update Profile'}
              classes={'bg-onPrimary-main text-white'}
              props={{ type: 'Submit' }}
              onClick={handleSubmit}
            />
          </div>
          {/* alert box */}
          <div className='ring ring-rose-500 rounded-md p-14 text-center absolute top-1/2 translate-x-1/4 bg-white -translate-y-1/2'>
            <p className='text-red-500'>Will be available soon</p>
          </div>
        </form>
        <div className='mt-1 w-full'>
          <PrimaryButton
            text={'Change Password'}
            classes={'border border-secondary-dark text-secondary-dark'}
            onClick={(e) => {
              e.preventDefault();
              navigate('/change-pass');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

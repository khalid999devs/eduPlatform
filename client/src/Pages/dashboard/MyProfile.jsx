import { useEffect, useState } from 'react';
import ValuedInput from '../../Components/Form/ValuedInput';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import { ProfileContextConsumer } from './Dashboard';
import axios from 'axios';
import reqs from '../../assets/requests';
import AlertBox from '../../Components/Form/AlertBox';

const MyProfile = () => {
  const navigate = useNavigate();
  const { userProfile, setProfileFetchTrigger } = ProfileContextConsumer();
  const [profileInfo, setProfileInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    fb: '',
    address: '',
  });
  const [alertbox, setAlertBox] = useState({
    alert: '',
    text: '',
    state: false,
  });

  const handleChange = (e) => {
    setProfileInfo((profileInfo) => {
      return { ...profileInfo, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (userProfile?.userName) {
      setProfileInfo({
        fullName: userProfile.fullName,
        email: userProfile.email,
        phone: userProfile.phone,
        fb: userProfile.fb,
        address: userProfile.address,
      });
    }
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = { ...profileInfo };
    if (profileInfo.email && !profileInfo.phone) delete data.phone;
    else if (!profileInfo.email && profileInfo.phone) delete data.email;

    if (!profileInfo.phone && !profileInfo.email) {
      setAlertBox({
        text: 'Email or Phone no. must be provided!',
        alert: 'error',
        state: true,
      });
      return;
    }

    axios
      .put(reqs.EDIT_PROFILE_INFO, { data }, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) {
          setProfileFetchTrigger((profileFetchTrigger) => !profileFetchTrigger);
        }
        setAlertBox({
          text: res.data.msg,
          alert: res.data.succeed ? 'success' : 'error',
          state: true,
        });
      })
      .catch((err) => {
        setAlertBox({
          text: err.response.data.msg,
          alert: 'error',
          state: true,
        });
        setProfileFetchTrigger((profileFetchTrigger) => !profileFetchTrigger);
      });
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-5 mb-6 w-full' aria-disabled>
        <h1 className='text-xl font-medium '>My Profile</h1>
        <form className='p-2 relative' onSubmit={handleSubmit}>
          {alertbox.state && (
            <AlertBox
              alert={alertbox.alert}
              text={alertbox.text}
              setAlert={setAlertBox}
            />
          )}
          <div className=' flex w-full flex-col lg:grid lg:grid-cols-2 gap-6 max-w-md md:w-full lg:max-w-full lg:gap-8 mb-10'>
            <ValuedInput
              label={'Full Name*'}
              inputProps={{
                value: profileInfo?.fullName || '',
                name: 'fullName',
                onChange: handleChange,
                placeholder: 'Enter your Full Name',
                required: true,
              }}
            />
            <ValuedInput
              label={'Email Address'}
              inputProps={{
                value: profileInfo.email || '',
                name: 'email',
                onChange: handleChange,
                placeholder: 'example@gmail.com',
              }}
            />
            <ValuedInput
              label={'Mobile no.'}
              inputProps={{
                value: profileInfo.phone || '',
                name: 'phone',
                onChange: handleChange,
                placeholder: '01XXXXXXXXX',
              }}
            />

            <ValuedInput
              label={'Address'}
              inputProps={{
                value: profileInfo.address || '',
                name: 'address',
                onChange: handleChange,
                placeholder: 'Enter your address',
              }}
            />

            <ValuedInput
              label={'Facebook ID'}
              inputProps={{
                value: profileInfo.fb || '',
                name: 'fb',
                onChange: handleChange,
                placeholder: 'https://facebook.com/example',
              }}
            />
          </div>

          <div className='flex flex-col gap-4 md:flex-row w-full'>
            <PrimaryButton
              type={'submit'}
              text={'Update Profile'}
              classes={'bg-onPrimary-main text-white'}
              props={{ type: 'Submit' }}
            />
          </div>
          {/* alert box */}
          {/* <div className='ring ring-rose-500 rounded-md p-14 text-center absolute top-1/2 translate-x-1/4 bg-white -translate-y-1/2'>
            <p className='text-red-500'>Will be available soon</p>
          </div> */}
        </form>
        {/* <div className='mt-1 w-full'>
          <PrimaryButton
            text={'Change Password'}
            classes={'border border-secondary-dark text-secondary-dark'}
            onClick={(e) => {
              e.preventDefault();
              navigate('/change-pass');
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default MyProfile;

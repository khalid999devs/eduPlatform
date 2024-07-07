import { useState } from 'react';
import { ContextConsumer } from '../../App';
import { FaCamera } from 'react-icons/fa';
import { handleCompressImg } from '../Utils/ImageCompression';
import axios from 'axios';
import reqs, { reqImgWrapper } from '../../assets/requests';

const Header = () => {
  const { user, setUser } = ContextConsumer();
  const [avatar, setAvatar] = useState({});
  const [loading, setLoading] = useState(false);

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    let compressedAvt;
    try {
      compressedAvt = await handleCompressImg(e.target.files[0], 0.08, 1920);
    } catch (error) {
      alert(
        'An unexpected error happenned while processing your avatar! Please try again.'
      );
    }

    const fd = new FormData();
    fd.append('fullName', user.name);
    fd.append('students', compressedAvt, user.userName);
    axios
      .put(reqs.UPDATE_PROFILE_IMAGE, fd, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed)
          setUser((user) => ({ ...user, img: res.data.image }));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className='w-full flex flex-row gap-4 md:gap-6 items-center justify-start border-b-2 border-b-gray-300 p-2 pb-4 md:pb-6'>
      <div className='w-[80px] h-[80px] relative group rounded-full overflow-hidden'>
        <img
          src={user?.img ? reqImgWrapper(user.img) : '/Images/avatar.webp'}
          alt={'Avater'}
          width={'100%'}
          className='h-full w-full object-cover'
        />
        {loading && (
          <div className='absolute top-0 left-0 h-full w-full bg-[rgba(255,255,255,.7)] flex items-center justify-center rounded-full'>
            <img
              src='/Images/loading.gif'
              className='w-[40px] h-[40px]'
              alt=''
            />
          </div>
        )}

        <div
          className='absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,.5)] flex items-center justify-center gap-1 flex-col rounded-full text-xs z-10 font-medium text-white transition-all duration-200 opacity-0 group-hover:opacity-100 text-center cursor-pointer'
          // onClick={() => {}}
        >
          <input
            type='file'
            onChange={handleAvatarUpload}
            className='hidden'
            id='avatarUpload'
            accept='image/*'
          />
          <input type='file' onChange={handleAvatarUpload} hidden />
          <label
            htmlFor='avatarUpload'
            className='cursor-pointer flex items-center justify-center gap-1 flex-col w-full h-full'
          >
            <FaCamera className='text-lg' />
            <p className='text-xs'>{user?.img ? 'Change' : 'Upload'}</p>
          </label>
        </div>
      </div>
      <div className='flex flex-col '>
        <p className='text-md  lg:text-lg'>Hello,</p>
        <h1 className='text-md md:text-xl  lg:text-2xl font-[500]'>
          {user.name || 'Example Full Name'}
        </h1>
      </div>
    </div>
  );
};

export default Header;

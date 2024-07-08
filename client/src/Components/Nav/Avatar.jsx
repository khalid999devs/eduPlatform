import { Link, useNavigate } from 'react-router-dom';
import { dashboardLinks } from '../../assets/LinkInfo';
import { reqImgWrapper } from '../../assets/requests';

const Avatar = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-row gap-2 w-max h-full p-1 py-0 relative [&:hover>#tooltip]:block [&:hover>#tooltip]:opacity-100 items-center z-50 cursor-pointer px-2 md:px-1 lg:px-2'>
      <div
        className={`w-[40px] h-[40px] border-2 border-solid rounded-full overflow-hidden ${
          window.location.pathname.includes('/dashboard')
            ? '!border-secondary-dark'
            : '!border-primary-dark'
        }`}
      >
        <img
          src={user?.img ? reqImgWrapper(user.img) : '/Images/avatar.webp'}
          alt={'Avatar'}
          width={'100%'}
          height={'100%'}
          className={`border-[1px] border-solid h-full w-full object-cover rounded-full`}
        />
      </div>
      <div className='hidden md:flex flex-col '>
        <p className='text-xs -mb-0.5 font-light'>Hello</p>
        <h1 className='text-sm font-semibold'>
          {user.name?.length > 16
            ? `${user.name.substring(0, 16)}..`
            : user.name || 'Example FullName'}
        </h1>
      </div>

      <section
        id='tooltip'
        className='rounded-md shadow-md overflow-hidden hidden opacity-0 absolute top-[100%] right-[-100%] md:right-0 max-w-[350px] w-max bg-secondary-main transition-opacity duration-500 z-50 '
      >
        <div className='grid md:grid-cols-[1fr,1.5fr] '>
          <div className=' w-[100%] h-[70px] md:h-[100%]'>
            <img
              src='/Images/welcome.jpg'
              width={'100%'}
              style={{
                height: '100%',
              }}
              className='object-cover'
              alt='welcome image'
            />
          </div>
          <div className='flex flex-col gap-4 text-sm p-8 md:pt-6 md:p-1 md:pl-5 md:pb-8 font-medium'>
            {dashboardLinks.map((item, value) => {
              return (
                <Link
                  key={value}
                  to={item.path}
                  className='hover:text-secondary-dark transition-colors duration-200'
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              className='w-fit hover:text-secondary-dark transition-colors duration-200 mt-3'
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Avatar;

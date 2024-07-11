import { FaChevronDown } from 'react-icons/fa6';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='m-auto max-w-6xl px-3 mt-[10px] md:mt-[50px]'>
      <div className='grid md:grid-cols-2 p-3 gap-14 md:gap-6'>
        <div className='flex flex-col gap-4 md:gap-6 md:mt-14 lg:mt-16'>
          <h1
            className='font-bold text-5xl lg:text-6xl'
            style={{ lineHeight: '115%' }}
          >
            Chemistry With Afnan
          </h1>
          <p className='text-md'>
          By understanding how students learn best, we create engaging lessons and a deeper understanding of this scientific field.
          </p>
          <PrimaryButton
            text={'Start Learning'}
            icon={<FaChevronDown />}
            classes={'bg-secondary-main w-fit gap-4 text-xl'}
            textClasses={'text-lg'}
            onClick={() => {
              navigate('/courses');
            }}
          />
        </div>
        <div className=' overflow-hidden grid md:place-items-center'>
          <img
            src={'/Images/bannerPic.jpg'}
            className='w-[90%] lg:w-[80%] rounded-2xl'
            alt=''
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

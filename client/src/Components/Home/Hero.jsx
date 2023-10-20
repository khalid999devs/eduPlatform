import { FaChevronDown } from 'react-icons/fa6';
import PrimaryButton from '../Buttons/PrimaryButton';

const Hero = () => {
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
            accusantium error voluptas.
          </p>
          <PrimaryButton
            text={'Start Learning'}
            icon={<FaChevronDown />}
            classes={'bg-secondary-main w-fit gap-4 text-xl'}
            textClasses={'text-lg'}
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

import { BiBookReader } from 'react-icons/bi';
import { FaArrowRight, FaChevronRight } from 'react-icons/fa';
import Coursecard from '../Courses/CourseCard';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useState } from 'react';

const MyCourses = () => {
  const [courses, setCourses] = useState([
    {
      name: '',
      desc: '',
      price: '',
      id: '',
      rating: '',
      img: '',
    },
    {
      name: '',
      desc: '',
      price: '',
      id: '',
      rating: '',
      img: '',
    },
    {
      name: '',
      desc: '',
      price: '',
      id: '',
      rating: '',
      img: '',
    },
  ]);

  return (
    <div
      id='courses'
      className='mt-[100px] grid place-items-center w-full m-auto gap-5 px-3'
    >
      <h1 className='inline-flex font-bold text-5xl pb-2'>
        Explore Courses &nbsp; <BiBookReader className='text-cyan-500 ' />
      </h1>
      <div className='flex flex-row m-auto items-center justify-center w-full flex-wrap lg:flex-nowrap py-6 gap-6'>
        {courses.map((course, value) => {
          return <Coursecard key={value} cardDetails={course} />;
        })}
      </div>

      {/* <a
        href='#'
        className='mb-10 px-32 py-4 bg-stone-200 hover:bg-stone-300 hover:outline-none hover:text-black text-black   font-medium rounded-lg text-base text-center  '
      >
        See all <FaArrowRight className='inline-block' />{' '}
      </a> */}
      <PrimaryButton
        text={'See all'}
        icon={<FaChevronRight fontSize={'1rem'} />}
        classes={'bg-secondary-main py-3 mt-2 px-10'}
        textClasses={'text-[1.05rem]'}
      />
    </div>
  );
};

export default MyCourses;

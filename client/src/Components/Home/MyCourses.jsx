import { BiBookReader } from 'react-icons/bi';
import { FaChevronRight } from 'react-icons/fa';
import Coursecard from '../Courses/CourseCard';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../../axios/fetchCourses';

const MyCourses = ({ user }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses(setCourses);
  }, []);
  return (
    <div
      id='courses'
      className='mt-[100px] grid place-items-center w-full m-auto gap-5 px-3'
    >
      <h1 className='inline-flex font-bold text-4xl md:text-5xl pb-2'>
        Explore Courses &nbsp; <BiBookReader className='text-cyan-500 ' />
      </h1>
      <div className='flex flex-row m-auto items-center justify-center lg:justify-start flex-wrap lg:flex-nowrap px-2 py-6 gap-6 w-full'>
        {courses
          .sort((a, b) => {
            let x = new Date(a.createdAt).getTime();
            let y = new Date(b.createdAt).getTime();

            if (x > y) return -1;
            else if (x < y) return 1;
            else if (x == y) return 0;
          })
          .map((course, value) => {
            let hasEnrolled = user?.enrolledCourses?.findIndex(
              (ele) => ele?.courseId === course?.id
            );
            if (value < 5)
              return (
                <Coursecard
                  key={value}
                  cardDetails={course}
                  onClick={(_) => {
                    if (hasEnrolled === -1) navigate(`/courses/${course.id}`);
                    else navigate(`/courses/onClientReq/${course.id}`);
                  }}
                  hasEnrolled={hasEnrolled !== -1}
                />
              );
          })}
      </div>

      <PrimaryButton
        text={'See all'}
        icon={<FaChevronRight fontSize={'1rem'} />}
        classes={'bg-secondary-main py-3 mt-2 px-10'}
        textClasses={'text-[1.05rem]'}
        onClick={() => {
          navigate('/courses');
        }}
      />
    </div>
  );
};

export default MyCourses;

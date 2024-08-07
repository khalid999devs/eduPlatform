import React, { useEffect, useState } from 'react';
import Coursecard from '../Components/Courses/CourseCard';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../axios/global';
import { ContextConsumer } from '../App';

const AllCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { user } = ContextConsumer();
  useEffect(() => {
    fetchCourses(setCourses);
  }, []);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-row mx-auto items-center justify-center w-full flex-wrap lg:flex-nowrap py-10 mt-8 px-3 gap-6'>
      {courses.map((course, value) => {
        let hasEnrolled = user?.enrolledCourses?.findIndex(
          (ele) => ele?.courseId === course?.id
        );
        return (
          <Coursecard
            onClick={(_) => {
              if (hasEnrolled === -1) navigate(`/courses/${course.id}`);
              else navigate(`/courses/onClientReq/${course.id}`);
            }}
            key={value}
            cardDetails={course}
            hasEnrolled={hasEnrolled !== -1}
          />
        );
      })}
      {courses?.length === 0 && (
        <>
          <h2 className='text-rose-700 text-center font-extrabold text-xl'>
            Course are not available right now.
          </h2>
        </>
      )}
    </div>
  );
};

export default AllCourses;

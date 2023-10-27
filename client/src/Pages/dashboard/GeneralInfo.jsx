import { BsBookFill } from 'react-icons/bs';
import IconNumCard from '../../Components/ClientDashboard/IconNumCard';
import { ProfileContextConsumer } from './Dashboard';
import { GiGraduateCap } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import CourseProCard from '../../Components/ClientDashboard/CourseProCard';

const GeneralInfo = () => {
  const { userProfile } = ProfileContextConsumer();

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-5 mb-6 w-full'>
        <h1 className='text-xl font-medium '>Dashboard</h1>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-5 w-full'>
          <IconNumCard
            icon={<GiGraduateCap />}
            text={'Active Courses'}
            number={userProfile.activeCourses?.length}
          />
          <IconNumCard
            icon={<BsBookFill />}
            text={'Enrolled Courses'}
            number={userProfile.enrolledCourses?.length}
          />
        </div>
      </div>

      <div className='flex flex-col gap-5 mb-6 w-full'>
        <h1 className='text-xl font-medium '>In Progress Courses</h1>
        <div className='flex flex-col gap-6 w-full'>
          {userProfile.activeCourses?.map((course, value) => {
            return (
              <CourseProCard
                key={value}
                img={course.img || '/Images/cardPH.jpg'}
                title={course.name}
                id={course.id}
                rating={course.rating}
                progress={course.progress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;

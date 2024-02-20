import FixedCard from '../Components/CourseDetails/FixedCard';
import CourseInfo from '../Components/ClientCourseDetails/CourseInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clientFCourse } from '../axios/fetchCourses';
import { ContextConsumer } from '../App';
import PrimaryButton from '../Components/Buttons/PrimaryButton';

const CourseClientdetails = () => {
  const { cid: id } = useParams();
  const { user } = ContextConsumer();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    clientFCourse(id, setData);
  }, [id]);
  if (!user?.enrolledCourses?.find(() => ({ courseId: id })))
    return (
      <div className='min-h-screen'>
        <h1 className='text-red-600 text-center text-2xl font-bold mt-24'>
          You are not allowed to view this page.
        </h1>
        <section className='p-20'>
          <p>It seems you have not enrolled this course.</p>
          <PrimaryButton
            classes={'bg-yellow-400 text-black m-5 hover:bg-yellow-300'}
            text={'Visit now'}
            onClick={() => {
              navigate(`/courses/${id}`);
            }}
          />
        </section>
      </div>
    );
  return (
    <div className='px-3 w-full m-auto my-10 relative'>
      {!user?.enrolledCourses.find(() => ({ courseId: id })) && (
        <FixedCard
          cardDetails={{
            id: data?.id,
            img: data?.image,
            rating: data?.ratings,
            price: data?.price,
          }}
        />
      )}
      <CourseInfo courseInfo={data} />
    </div>
  );
};

export default CourseClientdetails;

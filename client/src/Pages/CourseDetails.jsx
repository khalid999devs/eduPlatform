import FixedCard from '../Components/CourseDetails/FixedCard';
import CourseInfo from '../Components/CourseDetails/CourseInfo';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCourse } from '../axios/fetchCourses';

const Coursedetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    fetchCourse(id, setData);
  }, []);
  console.log(data);
  return (
    <div className='px-3 w-full m-auto my-10 relative'>
      <FixedCard
        cardDetails={{
          id: data?.id,
          img: data?.image,
          rating: data?.ratings,
          price: data?.price,
        }}
      />
      <CourseInfo
        courseInfo={{
          title: data?.title,
          desc: data?.description,
          schedule: data?.schedule,
          demoLink: data?.demoVideoUrl,
          instruct: data?.instructor,
        }}
      />
    </div>
  );
};

export default Coursedetails;

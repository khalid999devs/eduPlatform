import FixedCard from "../Components/CourseDetails/FixedCard";
import CourseInfo from "../Components/ClientCourseDetails/CourseInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { clientFCourse } from "../axios/fetchCourses";
import { ContextConsumer } from "../App";

const CourseClientdetails = () => {
  const { id } = useParams();
  const { user } = ContextConsumer();

  const [data, setData] = useState({});
  useEffect(() => {
    clientFCourse(id, setData);
  }, [id]);

  return (
    <div className="px-3 w-full m-auto my-10 relative">
      {/* {!user?.enrolledCourses.find(() => ({ courseId: id })) && (
        <FixedCard
          cardDetails={{
            id: data?.id,
            img: data?.image,
            rating: data?.ratings,
            price: data?.price,
          }}
        />
      )} */}
      {user?.enrolledCourses.find(() => ({ courseId: id })) && (
        <CourseInfo courseInfo={data} />
      )}
    </div>
  );
};

export default CourseClientdetails;

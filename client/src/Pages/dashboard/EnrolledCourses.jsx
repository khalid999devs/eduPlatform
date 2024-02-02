import React from "react";
import CourseProCard from "../../Components/ClientDashboard/CourseProCard";
import { useOutletContext } from "react-router-dom";

const EnrolledCourses = () => {
  const { userProfile } = useOutletContext();

  return (
    <div className="flex flex-col gap-5 mb-6 w-full">
      <h1 className="text-xl font-medium ">Enrolled Courses</h1>
      <div className="flex flex-col gap-6 w-full">
        {userProfile?.clientcourses?.map((course, value) => {
          return (
            <CourseProCard
              key={value}
              img={course.img || "/Images/cardPH.jpg"}
              title={course.name}
              id={course.id}
              rating={course.rating}
              progress={course.progress}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EnrolledCourses;

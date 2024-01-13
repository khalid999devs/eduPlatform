import React, { useEffect, useState } from "react";
import Coursecard from "../Components/Courses/CourseCard";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../axios/global";

const AllCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses(setCourses);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 flex-row m-auto items-center justify-center w-full flex-wrap lg:flex-nowrap py-10 mt-8 px-3 gap-6">
      {courses.map((course, value) => {
        return (
          <Coursecard
            onClick={(_) => {
              navigate(`/courses/${course.id}`);
            }}
            key={value}
            cardDetails={course}
          />
        );
      })}
    </div>
  );
};

export default AllCourses;

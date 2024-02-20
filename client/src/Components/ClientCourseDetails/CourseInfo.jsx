import StudentCoursePage from "./StudentCoursePage";
import { ContextConsumer } from "../../App";
import { useParams } from "react-router-dom";

const CourseInfo = ({
  courseInfo = { title: "", desc: "", schedule: "", demoLink: "" },
}) => {
  const { user } = ContextConsumer();
  const { cid } = useParams();
  if (user?.enrolledCourses.find(() => ({ courseId: cid })))
    return <StudentCoursePage courseInfo={courseInfo} />;
};

export default CourseInfo;

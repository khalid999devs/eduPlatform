import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";
import { postCourse } from "./postCourse";
import { fetchCourse, fetchCourses } from "./fetchCourses";
import { deleteCourse } from "./deleteCourse";
import { updateCourse } from "./updateCourse";
import { fetchStudents } from "./fetchStudents";

export {
  fetchCourse,
  fetchCourses,
  deleteCourse,
  postCourse,
  updateCourse,
  fetchStudents,
};
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

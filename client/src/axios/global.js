import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";
import { postCourse } from "./postCourse";
import { adminFCourse, fetchCourse, fetchCourses } from "./fetchCourses";
import { deleteCourse } from "./deleteCourse";
import { updateCourse, deleteClass } from "./updateCourse";
import { fetchStudents } from "./fetchStudents";
import { addClass } from "./addRecord";
import { addExam } from "./addExam";
import { getExamAdmin } from "./fetchExams";

export {
  addClass,
  addExam,
  adminFCourse,
  deleteCourse,
  fetchCourse,
  fetchCourses,
  fetchStudents,
  postCourse,
  updateCourse,
  deleteClass,
  getExamAdmin,
};
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

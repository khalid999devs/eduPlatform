import axios from "axios";

axios.defaults.baseURL = "http://localhost:8001";
import { postCourse } from "./postCourse";
import { adminFCourse, fetchCourse, fetchCourses } from "./fetchCourses";
import { deleteCourse } from "./deleteCourse";
import { updateCourse, deleteClass } from "./updateCourse";
import { fetchStudents } from "./fetchStudents";
import { addClass } from "./addRecord";
import { addExam, addSingleQues } from "./addExam";
import { getExamAdmin, getSingleExamAdmin } from "./fetchExams";
import { deleteExam, deleteQuestion } from "./deleteExam";

export {
  addClass,
  addExam,
  addSingleQues,
  adminFCourse,
  deleteCourse,
  deleteClass,
  deleteExam,
  deleteQuestion,
  fetchCourse,
  fetchCourses,
  fetchStudents,
  getExamAdmin,
  getSingleExamAdmin,
  updateCourse,
  postCourse,
};
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded';

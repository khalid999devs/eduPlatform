const so = "http://localhost:8001";

export const reqImgWrapper = (src) => {
  if (!src) return null;
  else return so + "/" + src;
};
export const reqPdfWrapper = (src) => {
  if (!src) return null;
  else return so + "/" + src;
};

const reqs = {
  //admin auth
  ADMIN_LOGIN: "/api/admin/login",
  ADMIN_LOGOUT: "/api/admin/logout",
  IS_ADMIN_VALID: "/api/admin/auth",
  ADMIN_VALID_COURSE: "/api/course/valid-admin-course",

  //client auth
  CLIENT_REG: "/api/client/reg",
  CLIENT_LOGIN: "/api/client/login",
  CLIENT_LOGOUT: "/api/client/logout",
  CLIENT_VALID_COURSE: "/api/course/valid-course",
  IS_CLIENT_VALID: "/api/client/getClient",
  DELETE_ACCOUNT: "/api/client/deleteAcc",
  RESET_PASS_SET_TOKEN: "/api/client/rPassToken",
  RESET_PASS_OTP_VERIFY: "/api/client/rPassVerify",

  //courses
  ADD_RECORD_CLASS: "/api/course/add-recorded-class",
  ADD_RESOURCES: "/api/course/add-resource",
  DELETE_CLASS: "/api/course/delete-recorded-class",
  CREATE_COURSE: "/api/course/create",
  DELETE_COURSE: "/api/course/delete-course",
  GET_COURSES: "/api/course/get-pub-courses",
  GET_SINGLE_COURSE: "/api/course/get-pub-course",
  GET_STUDENTS: "/api/client/getAll",
  UPDATE_COURSE: "/api/course/edit-course",
  UPDATE_IMAGE: "/api/course/update-image",
  ZOOM_CRED: "/api/course/zoom-creds",

  //exams
  ADD_EXAM: "/api/exam/add-exam",
  ADD_SINGLE_QUES: "/api/exam/add-single-ques-ans",
  DELETE_EXAM: "/api/exam/delete-exam-info",
  GET_EXAM_ADMIN: "/api/exam/get-exam-admin",
  GET_QUES_ADMIN: "/api/exam/get-all-ques-admin",
  GET_EXAM_CLIENT: "/api/exam/get-exam-info-client",
  DEL_SINGLE_QUES: "/api/exam/delete-single-ques",
};

export default reqs;

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

  //client auth
  CLIENT_REG: "/api/client/reg",
  CLIENT_LOGIN: "/api/client/login",
  CLIENT_LOGOUT: "/api/client/logout",
  IS_CLIENT_VALID: "/api/client/getClient",
  DELETE_ACCOUNT: "/api/client/deleteAcc",
  RESET_PASS_SET_TOKEN: "/api/client/rPassToken",
  RESET_PASS_OTP_VERIFY: "/api/client/rPassVerify",

  //courses
  ADD_RECORD_CLASS: "/api/course/add-recorded-class",
  ADD_RESOURCES: "/api/course/add-resource",
  ADMIN_VALID_COURSE: "/api/course/valid-admin-course", //admin
  CLIENT_VALID_COURSE: "/api/course/valid-course", //client
  DELETE_CLASS: "/api/course/delete-recorded-class",
  CREATE_COURSE: "/api/course/create",
  DELETE_COURSE: "/api/course/delete-course",
  GET_COURSES: "/api/course/get-pub-courses", //public
  GET_SINGLE_COURSE: "/api/course/get-pub-course", //public
  GET_STUDENTS: "/api/client/getAll", //admin
  UPDATE_COURSE: "/api/course/edit-course",
  UPDATE_IMAGE: "/api/course/update-image",
  ZOOM_CRED: "/api/course/zoom-creds",

  //gallery
  ADD_IMAGE_G: "/api/gallery/addImage",
  DELETE_IMAGE_G: "/api/gallery/delete",
  GET_IMAGE_G: "/api/gallery/",
  UPDATE_IMAGE_G: "/api/gallery/update",

  //exams
  ADD_EXAM: "/api/exam/add-exam",
  ADD_SINGLE_QUES: "/api/exam/add-single-ques-ans",
  DELETE_EXAM: "/api/exam/delete-exam-info",
  GET_EXAM_ADMIN: "/api/exam/get-exam-admin",
  GET_QUES_ADMIN: "/api/exam/get-all-ques-admin",
  GET_EXAM_CLIENT: "/api/exam/get-exam-info-client",
  DEL_SINGLE_QUES: "/api/exam/delete-single-ques",

  //discussions
  ADD_DISC_ADMIN: "/api/course/add-discussion-ques-admin",
  DEL_DISC_ADMIN: "/api/course/delete-discussion-admin",
  EDIT_DISC_ADMIN: "/api/course/edit-discussion-admin",
  GET_DISC_ADMIN: "/api/course/get-valid-discussions-admin",

  //faqs
  FAQ: "/api/faq",
};

export default reqs;

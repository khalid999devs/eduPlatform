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
  ZOOM_CRED: "/api/course/zoom-creds",
  GET_COURSES: "/api/course/get-pub-courses",
  GET_SINGLE_COURSE: "/api/course/get-pub-course",
  CREATE_COURSE: "/api/course/create",
  UPDATE_IMAGE: "/api/course/update-image",
};

export default reqs;

import axios from "axios";
import reqs from "../assets/requests";
//public
const fetchCourses = async (setData) => {
  try {
    axios.get(reqs.GET_COURSES).then((res) => {
      if (res.status == 200) setData(res.data?.courses);
    });
  } catch (error) {
    console.log(error.response);
  }
};
//public
const fetchCourse = async (id, setData) => {
  try {
    axios.get(`${reqs.GET_SINGLE_COURSE}/${id}`).then((res) => {
      if (res.status == 200) setData(res.data?.course);
    });
  } catch (error) {
    console.log(error.response);
  }
};
//client
const clientFCourse = async (id, setData) => {
  try {
    axios
      .get(`${reqs.CLIENT_VALID_COURSE}/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.status == 200) setData(res.data?.course);
      });
  } catch (error) {
    console.log(error.response);
  }
};
//admin
const adminFCourse = async (id, setData) => {
  try {
    axios
      .get(`${reqs.ADMIN_VALID_COURSE}/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.status == 200) setData(res.data?.course);
      });
  } catch (error) {
    console.log(error.response);
  }
};
export { fetchCourses, fetchCourse, adminFCourse, clientFCourse };

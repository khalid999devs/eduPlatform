import axios from 'axios';
import reqs from '../assets/requests';
//public
const fetchCourses = async (setData, setLoading) => {
  try {
    const res = await axios.get(reqs.GET_COURSES);
    if (res.data.succeed) setData(res.data?.courses);
    setLoading && setLoading(false);
  } catch (error) {
    setLoading && setLoading(false);
    alert(error.response.data.msg);
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

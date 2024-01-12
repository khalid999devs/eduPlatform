import axios from "axios";
import reqs from "../assets/requests";
const postCourse = async (data) => {
  try {
    axios
      .post(reqs.CREATE_COURSE, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed) window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
export { postCourse };

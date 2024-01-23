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
        if (res.data.succeed) alert("New course has been added");
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};
export { postCourse };

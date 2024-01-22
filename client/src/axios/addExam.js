import axios from "axios";
import reqs from "../assets/requests";

const addExam = async (data) => {
  try {
    axios
      .post(reqs.ADD_EXAM, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed) {
          alert(res.data.msg);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
export { addExam };

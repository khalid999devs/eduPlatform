import axios from "axios";
import reqs from "../assets/requests";

const addClass = async (id, data) => {
  try {
    axios
      .post(`${reqs.ADD_RECORD_CLASS}/${id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed) {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
export { addClass };

import axios from "axios";
import reqs from "../assets/requests";

const addExam = async (data) => {
  try {
    axios
      .post(reqs.ADD_EXAM, data, {
        withCredentials: true,
      })
      .then((res) => {
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
const addSingleQues = async (data) => {
  console.log(data);
  try {
    axios
      .put(reqs.ADD_SINGLE_QUES, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
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
export { addExam, addSingleQues };

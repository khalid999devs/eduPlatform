import axios from "axios";
import reqs from "../assets/requests";

const getExamAdmin = async (mode, setData, id) => {
  try {
    axios
      .post(
        reqs.GET_EXAM_ADMIN,
        { mode: mode },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed) {
          setData(res.data?.result?.[id]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
export { getExamAdmin };

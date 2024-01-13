import axios from "axios";
import reqs from "../assets/requests";
const fetchStudents = async (skip, row, setData) => {
  try {
    axios
      .post(
        reqs.GET_STUDENTS,
        {
          skip: skip,
          rowNum: row,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("done");
        setData((pre) => res.data?.result);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
};
export { fetchStudents };

import axios from "axios";
import reqs from "../assets/requests";

const getExamAdmin = async (mode, setData, cid) => {
  try {
    axios
      .post(
        reqs.GET_EXAM_ADMIN,
        { mode: "all" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.succeed) {
          setData(res.data?.result?.[cid] || []);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
const getSingleExamAdmin = async (setData, eid) => {
  try {
    axios
      .post(
        reqs.GET_QUES_ADMIN,
        { mode: "answer", examId: eid },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.succeed) {
          const objData = Object.keys(res.data?.result);
          const newArr = objData.map((ele) => res.data.result[ele]);
          setData({ questions: newArr });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};

const getExamClient = async (mode, setData, id) => {
  try {
    axios
      .post(
        reqs.GET_EXAM_CLIENT,
        { mode: mode },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.succeed) {
          // setData(res.data?.result?.[id]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
export { getExamAdmin, getExamClient, getSingleExamAdmin };

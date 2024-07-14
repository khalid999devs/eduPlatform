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
const getSingleExamClient = async (cid, eid, setData) => {
  try {
    axios
      .post(
        reqs.GET_EXAM_CLIENT,
        { mode: "single", examId: eid, courseId: cid },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.succeed) setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
const getAllExamClient = async (courseId, setData) => {
  try {
    axios
      .post(
        reqs.GET_EXAM_CLIENT,
        { courseId: courseId, mode: "all" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.succeed) {
          // setData(res.data?.result?.[id]);
          setData(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
const getQuesClient = async (examId, mode, setData) => {
  /*question | answer */
  try {
    axios
      .post(
        reqs.GET_QUES_CLIENT,
        { mode: mode, examId: examId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.succeed) {
          // setData(res.data?.result?.[id]);
          setData(res.data.result);
          // console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
const getExamResultClient = async (examId, mode, setData, setMessage) => {
  /*question | answer */
  try {
    axios
      .post(
        reqs.GET_EXAMRES_CLIENT,
        { mode: mode, examId: examId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.succeed) {
          // setData(res.data?.result?.[id]);
          setData(res.data.result);
          // console.log(res.data);
        }
      })
      .catch((err) => {
        setMessage(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export {
  getExamAdmin,
  getQuesClient,
  getAllExamClient,
  getSingleExamAdmin,
  getSingleExamClient,
  getExamResultClient,
};

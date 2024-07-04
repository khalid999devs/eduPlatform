import axios from "axios";
import reqs from "../assets/requests";

const addExam = async (data, setExamListData) => {
  try {
    axios
      .post(reqs.ADD_EXAM, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) {
          alert(
            "Exam added successfully. Now you can add questions and answers to it."
          );
          setExamListData((examData) => {
            return [...examData, res.data.exam];
          });
        }
      })
      .catch((err) => {
        alert(err.response.data.msg);
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};

const addSingleQues = async (data, toggleQues) => {
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
          //here instead of reloading, we should set the ques data here.
          window.location.reload();
          // toggleQues(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};
const addStudentAns = async (data, examId, setMessage) => {
  alert("called");
  try {
    axios
      .post(
        reqs.ADD_STU_ANS,
        {
          fullAns: data,
          examId: examId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("examdone1", examId);
        setMessage(res.data?.msg);
      });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("examdone", examId);
  }
};
const addStdFilesAns = async (data, setmsg) => {
  try {
    axios
      .post(reqs.ADD_STU_FANS, data, {
        withCredentials: true,
      })
      .then((res) => {
        setmsg(res.data?.msg);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
export { addExam, addSingleQues, addStudentAns, addStdFilesAns };

import axios from 'axios';
import reqs from '../assets/requests';

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
  try {
    axios
      .put(reqs.ADD_SINGLE_QUES, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.succeed) {
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
const addStudentAns = async (data, examId) => {
  try {
    axios.post(reqs.ADD_STU_ANS, {
      fullAns: data,
      examId: examId,
    });
  } catch (error) {
    console.log(error);
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

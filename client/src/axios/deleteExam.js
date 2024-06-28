import axios from 'axios';
import reqs from '../assets/requests';
const deleteExam = async (id) => {
  try {
    axios
      .delete(`${reqs.DELETE_EXAM}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.msg);
        if (res.data.succeed) window.location.reload();
      });
  } catch (error) {
    console.log(error);
  }
};
const deleteQuestion = async (qid, eid) => {
  try {
    axios
      .put(
        reqs.DEL_SINGLE_QUES,
        {
          questionId: qid,
          examId: eid,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.succeed) {
          // alert(res.data.msg, "refresh the page to see update");
          window.location.reload();
        } else {
          alert(res.data.msg);
        }
      });
  } catch (error) {
    console.log(error);
  }
};
export { deleteExam, deleteQuestion };

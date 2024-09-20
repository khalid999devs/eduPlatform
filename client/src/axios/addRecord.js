import axios from 'axios';
import reqs from '../assets/requests';

const addClass = async (id, data, prevClassId, setAddClassState) => {
  try {
    axios
      .post(
        `${reqs.ADD_RECORD_CLASS}/${id}`,
        { ...data, prevClassId: prevClassId },
        {
          withCredentials: true,
        }
      )
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
export { addClass };

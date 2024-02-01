import axios from "axios";
import reqs from "../assets/requests";
const addFaq = async (data) => {
  try {
    axios
      .post(reqs.FAQ, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) {
          window.location.reload();
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteFaq = async (id) => {
  try {
    axios
      .delete(`${reqs.FAQ}/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) {
          window.location.reload();
        }
      });
  } catch (error) {
    console.log(error);
  }
};

const getFaq = async (setData) => {
  try {
    axios.get(reqs.FAQ).then((res) => {
      console.log(res.data.succeed);
      setData(res.data.result);
    });
  } catch (error) {
    console.log(error);
  }
};
const updateFaq = async (id, data) => {
  try {
    axios
      .put(`${reqs.FAQ}/${id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) {
          window.location.reload();
          // console.log(res.data);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export { addFaq, updateFaq, deleteFaq, getFaq };

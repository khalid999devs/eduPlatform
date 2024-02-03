import reqs from "../assets/requests";
import axios from "axios";
export const admin = {
  //POST request for ADD Discussion
  addDiscussion: async (data) => {
    try {
      axios
        .post(reqs.ADD_DISC_ADMIN, data, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);
        });
    } catch (error) {}
  },
  //POST request for REPLY Discussion
  reply: async (data) => {
    try {
      axios
        .post(reqs.REPLY_DISC_CLIENT, data, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
  //GET request for Discussion
  getDiscussion: async (courseId, setData) => {
    try {
      axios
        .get(`${reqs.GET_DISC_ADMIN}/${courseId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.result);
        });
    } catch (error) {}
  },
  //PUT request for EDIT Discussion
  editDiscussion: async (data) => {
    try {
      axios
        .put(reqs.EDIT_DISC_ADMIN, data, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
  //DELETE request for EDIT Discussion
  deleteChat: async (data) => {
    try {
      axios
        .delete(reqs.DEL_DISC_ADMIN, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
};
export const client = {
  //POST request for ADD Discussion
  addDiscussion: async (data) => {
    try {
      axios
        .post(reqs.ADD_DISC_CLIENT, data, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
  //POST request for REPLY Discussion
  reply: async (data) => {
    try {
      axios
        .post(reqs.REPLY_DISC_CLIENT, data, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
  //GET request for Discussion
  getDiscussion: async (courseId, setData) => {
    try {
      axios
        .get(`${reqs.GET_DISC_CLIENT}/${courseId}`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.result);
        });
    } catch (error) {}
  },
  //PUT request for EDIT Discussion
  editDiscussion: async (data) => {
    try {
      axios
        .put(reqs.EDIT_DISC_CLIENT, data, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
  //DELETE request for EDIT Discussion
  deleteChat: async (data) => {
    try {
      axios
        .delete(reqs.DEL_DISC_CLIENT, {
          withCredentials: true,
        })
        .then((res) => {
          // window.location.reload()
        });
    } catch (error) {}
  },
};

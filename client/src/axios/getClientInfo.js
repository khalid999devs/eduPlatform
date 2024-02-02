import axios from "axios";
import reqs from "../assets/requests";

const getClient = async (setUser) => {
  try {
    axios
      .get(reqs.IS_CLIENT_VALID, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) setUser(res.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
export { getClient };

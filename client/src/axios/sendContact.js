import axios from "axios";
import reqs from "../assets/requests";

const sendMessage = async (contactData, setResponse) => {
  try {
    axios.post(reqs.SEND_MESSAGE, contactData).then((res) => {
      if (res.data.succeed) setResponse(res.data.msg);
      else setResponse("Failed to send message");
    });
  } catch (error) {
    console.log(error);
  }
};
const sendReply = async (contactData, setResponse) => {
  try {
    axios
      .post(reqs.SEND_EMAIL_REPLY, contactData, { withCredentials: true })
      .then((res) => {
        if (res.data.succeed) setResponse(res.data.msg);
        else setResponse("Failed to send message");
      });
  } catch (error) {
    console.log(error);
  }
};
const getMessage = async (setdata) => {
  try {
    axios.get(reqs.GET_MESSAGE, { withCredentials: true }).then((res) => {
      setdata(res.data.result);
    });
  } catch (error) {
    console.log(error);
  }
};
export { sendMessage, getMessage, sendReply };

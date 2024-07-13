import axios from 'axios';
import reqs from '../assets/requests';

const sendMessage = async (contactData, setResponse) => {
  axios
    .post(reqs.SEND_MESSAGE, contactData)
    .then((res) => {
      if (res.data.succeed) setResponse(res.data.msg);
      else setResponse('Failed to send message');
    })
    .catch((error) => {
      console.log(error);
      setResponse('Failed to send message');
    });
};
const sendReply = async (contactData, setResponse, setLoader, setmsg) => {
  setLoader(true);
  axios
    .post(`${reqs.SEND_EMAIL_REPLY}/contact`, contactData, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.succeed) {
        setResponse(res.data.msg);
        setmsg((messages) =>
          messages.map((item) => {
            if (item.id === contactData.msgId) item.replied = true;
            return item;
          })
        );
      } else setResponse('Failed to send message');
    })
    .catch((err) => {
      setResponse('Failed to send message');
    })
    .finally(() => {
      setLoader(false);
    });
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

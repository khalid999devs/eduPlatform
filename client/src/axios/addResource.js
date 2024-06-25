import axios from 'axios';
import reqs from '../assets/requests';

const addResources = async (courseid, formData) => {
  try {
    axios
      .post(`${reqs.ADD_RESOURCES}/${courseid}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data.succeed) alert('New Resource has been added');
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
export { addResources };

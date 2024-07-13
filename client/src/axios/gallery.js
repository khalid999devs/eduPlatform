import axios from 'axios';
import reqs from '../assets/requests';
const addImage = async (data) => {
  try {
    axios
      .post(reqs.ADD_IMAGE_G, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

const deleteImage = async (id) => {
  try {
    axios
      .delete(`${reqs.DELETE_IMAGE_G}/${id}`, {
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

const getImageGallery = async (setData) => {
  try {
    axios.get(reqs.GET_IMAGE_G).then((res) => {
      // console.log(res.data.succeed);
      setData(res.data.result);
    });
  } catch (error) {
    console.log(error);
  }
};
const updateImage = async (id, data) => {
  try {
    axios
      .patch(`${reqs.UPDATE_IMAGE_G}/${id}`, data, {
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

export { addImage, deleteImage, getImageGallery, updateImage };

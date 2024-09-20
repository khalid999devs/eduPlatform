import axios from 'axios';
import reqs from '../assets/requests';
const updateCourse = async (id, data, zoomInfo, setFetchTrigger) => {
  axios
    .patch(
      `${reqs.UPDATE_COURSE}/${id}`,
      {
        title: data.title,
        price: data.price,
        tags: data.tags,
        description: data.description,
        schedule: data.schedule,
        updatedAt: new Date(),
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return axios.post(
        reqs.EDIT_CLASS_INFO,
        { courseId: id, classInfo: zoomInfo },
        { withCredentials: true }
      );
    })
    .then((res) => {
      setFetchTrigger((fetchTrigger) => !fetchTrigger);
      alert(`Successfully updated "${data.title}"`);
    })
    .catch((err) => {
      alert(err.response.data.msg);
    });
};

const deleteClass = async (id, nextClassId, courseId) => {
  try {
    axios
      .delete(`${reqs.DELETE_CLASS}/${id}`, {
        params: {
          nextClassId: nextClassId,
          courseId: courseId,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.succeed) alert(`Recorded class ${id} has been DELETED`);
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
};

export { updateCourse, deleteClass };

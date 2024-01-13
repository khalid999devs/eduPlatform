import axios from "axios";
import reqs from "../assets/requests";
const updateCourse = async (id, data) => {
  try {
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
          // /api/course/delete-course/14
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed) alert(`Course ID ${id} has been UPDATED`);
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
export { updateCourse };

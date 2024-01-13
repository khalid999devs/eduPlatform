import axios from "axios";
import reqs from "../assets/requests";
const deleteCourse = async (id, title) => {
  try {
    axios
      .delete(`${reqs.DELETE_COURSE}/${id}`, {
        // /api/course/delete-course/14
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.succeed)
          alert(`Course ID ${id} {${title}} has been deleted`);
      })
      .then(() => {
        window.location.assign("/admin/course");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  } catch (err) {
    console.log(err);
  }
};
export { deleteCourse };

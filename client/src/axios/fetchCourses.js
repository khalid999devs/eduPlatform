import axios from 'axios'
import reqs from '../assets/requests'
const fetchCourses = async (setData) => {

    try {
        axios.get(reqs.GET_COURSES ).then(res => {
            if (res.status == 200)
                setData(res.data?.courses);
        });

    } catch (error) {
        console.log(error.response);
    }
}
const fetchCourse = async (id, setData) => {
    try {
        axios.get(`${reqs.GET_SINGLE_COURSE}/${id}`).then(res => {
            if (res.status == 200)
                setData(res.data?.course)
        });

    } catch (error) {
        console.log(error.response);
    }
}
export { fetchCourses, fetchCourse }
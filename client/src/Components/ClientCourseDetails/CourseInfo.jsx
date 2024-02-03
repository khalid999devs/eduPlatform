import { AiOutlineSchedule } from "react-icons/ai";
import { GoDiscussionClosed } from "react-icons/go";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { PiNotePencil, PiNotebook, PiVideoBold } from "react-icons/pi";
import StudentCoursePage from "./StudentCoursePage";
import { ContextConsumer } from "../../App";
import { useParams } from "react-router-dom";

const CourseInfo = ({
  courseInfo = { title: "", desc: "", schedule: "", demoLink: "" },
}) => {
  const { user } = ContextConsumer();
  const { id } = useParams();
  if (user?.enrolledCourses.find(() => ({ courseId: id })))
    return <StudentCoursePage courseInfo={courseInfo} />;
  else
    return (
      <div className="left-side md:w-3/5">
        {/* course title........... */}
        <h1 className="text-left text-4xl font-bold mb-10 ">
          {courseInfo.title}
        </h1>
        {/* course description- long.... */}
        <p className="text-left mb-10">{courseInfo.desc}</p>
        {/* schedule section */}
        <div className="flex flex-col gap-6 my-16">
          <h4 className=" text-left text-xl border-l-4 border-secondary-dark px-5  flex items-center">
            <AiOutlineSchedule className="inline-block text-4xl text-secondary-dark mr-5" />
            {/* this scehdule section is dynamic ................*/}
            Schedule: {courseInfo.schedule}
          </h4>
          {/* demo video section */}
          <h4 className=" text-left text-xl border-l-4 border-violet-400 px-5 flex items-center ">
            <PiVideoBold className="inline-block text-4xl text-violet-400 mr-5" />
            Free demo class
            {/* demo class link will be provided here......... */}
            <a
              href={courseInfo.demoLink || "#"}
              className="px-11 py-2.5 ml-6 bg-stone-200 hover:bg-stone-300 hover:outline-none hover:text-black text-black   font-medium rounded-lg text-base text-center  "
            >
              Watch video <MdOutlineSlowMotionVideo className="inline-block" />{" "}
            </a>
          </h4>
        </div>
        {/* course component section */}
        <div>
          <h1 className="font-bold text-left text-4xl text-blue-900 mb-5">
            Course components
          </h1>{" "}
          <hr className="mb-10 " />
          <div className="border-gray-700 bg-onPrimary-main rounded-lg p-5 mb-10 flex flex-col gap-1">
            <h4 className="text-white text-left">
              <HiOutlineAcademicCap className="inline-block text-3xl text-yellow-300" />{" "}
              Live classes & recorded previous classes.
            </h4>
            <h4 className="text-white text-left">
              <PiNotebook className="inline-block text-3xl text-lime-300" />{" "}
              Notes made by the Instructor
            </h4>
            <h4 className="text-white text-left">
              <PiNotePencil className="inline-block text-3xl text-pink-600" />{" "}
              Online exams
            </h4>
            <h4 className="text-white text-left">
              <GoDiscussionClosed className="inline-block text-3xl text-cyan-400" />{" "}
              Discussion forum to solve your problems
            </h4>
          </div>
        </div>
        {/* instructor section ..................*/}
        <h1 className="font-bold text-left text-4xl text-blue-900 mb-5">
          Instructor
        </h1>{" "}
        <hr className="mb-10" />
        <div className="flex flex-col items-center border  rounded-lg shadow md:flex-row md:max-w-xl  border-gray-700 bg-onPrimary-main hover:bg-gray-700 mb-16">
          <img
            className="w-24 h-24 m-5 rounded-full shadow-lg "
            src={"/Images/bannerPic.jpg"}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-left text-white max-[767px]:text-center">
              Afnan Bin Siddique
            </h5>
            <p className="mb-3 font-normal text-gray-400 text-left max-[767px]:text-center">
              Here are the biggest enterprise <br />
              technology acquisitions of 2021 so far,
              <br />
              in reverse chronological order.
            </p>
          </div>
        </div>
      </div>
    );
};

export default CourseInfo;

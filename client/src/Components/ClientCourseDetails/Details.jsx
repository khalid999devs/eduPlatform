import { ContextConsumer } from "../../App";
import ZoomLink from "./live/LivePage";
import { AiOutlineSchedule } from "react-icons/ai";
import Notes from "./notes/note";
const Details = ({ courseInfo }) => {
  const { user } = ContextConsumer();

  return (
    <div>
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
      </div>
      <div>
        {
          <ZoomLink
            val={{
              link: `live-zoom.${window.location.host}.com/${user.userName}/${courseInfo.id}`,
            }}
          />
        }
      </div>
      {/* course component section */}
      <div className="">
        <h1 className="font-bold text-left text-4xl text-blue-900 mb-5">
          Course components
        </h1>{" "}
        <hr className="mb-10 " />
        <div className="border-gray-700 bg-onPrimary-main text-primary-main rounded-lg p-5 mb-10 flex flex-col gap-10">
          {/* <ZoomLink /> */}
          {/* <hr /> */}
          {/* <ExamLinks /> */}

          <Notes notes={courseInfo?.resources} />
        </div>
      </div>
    </div>
  );
};
export default Details;

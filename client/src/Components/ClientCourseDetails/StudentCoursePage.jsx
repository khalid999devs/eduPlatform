import {
  AiFillExperiment,
  AiFillPlayCircle,
  AiFillWechat,
  AiOutlineSchedule,
} from "react-icons/ai";
import { PiNotebook } from "react-icons/pi";
import ZoomLink from "./live/LivePage";
import ExamPage from "./exams/ExamPage";
import Notes from "./notes/note";
import { useEffect, useState } from "react";
import ChatBox from "./Discussion/chat";
import RecordVideo from "./Records/Record";
import { ContextConsumer } from "../../App";

const StudentCoursePage = ({ courseInfo = {} }) => {
  const { user } = ContextConsumer();
  const curTime = new Date();
  const [currentTab, setCurTab] = useState(localStorage?.value);

  const localTab = JSON.parse(localStorage.getItem("clientCourseTab"));
  useEffect(() => {
    if (localTab?.expireDate > curTime.getTime())
      if (localTab?.value?.length > 0) {
        setCurTab(localTab?.value);
      } else setCurTab(tabs[0]);
    else localStorage.removeItem("clientCourseTab");
  }, [localTab]);
  function handleTab(e) {
    setCurTab(e);
    let result = {
      value: e,
      expireDate:
        localTab?.expireDate > curTime.getTime()
          ? localTab?.expireDate
          : curTime.getTime() + 86400000 / 2,
    };
    localStorage.setItem("clientCourseTab", JSON.stringify(result));
  }
  return (
    <div
      className={`left-side ${currentTab == "chat" ? "h-[75vh] mb-10" : ""}`}
    >
      <nav
        className="bg-primary-main rounded-b-lg p-2 border border-t-transparent border-onPrimary-main shadow-lg shadow-onPrimary-main/20 my-8
      "
      >
        <ul className="capitalize flex gap-5 justify-center">
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "details" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("details");
              }}
            >
              <span className="hidden md:inline-block">Details</span>{" "}
              <PiNotebook className="text-lg" />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "record" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("record");
              }}
            >
              <span className="hidden md:inline-block">record</span>{" "}
              <AiFillPlayCircle className="text-lg" />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "exam" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("exam");
              }}
            >
              <span className="hidden md:inline-block">Exam</span>{" "}
              <AiFillExperiment className="text-lg" />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "chat" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("chat");
              }}
            >
              <span className="hidden md:inline-block">Discussion</span>{" "}
              <AiFillWechat className="text-lg" />
            </button>
          </li>
        </ul>
      </nav>
      {currentTab == "details" && (
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
      )}
      {currentTab == "record" && (
        <RecordVideo rcdClass={courseInfo?.recordedclasses} />
      )}
      {currentTab == "chat" && (
        <ChatBox courseId={courseInfo?.id} isAdmin={false} />
      )}
      {currentTab == "exam" && (
        <div className="p-5">
          <ExamPage cid={courseInfo?.id} />
        </div>
      )}
    </div>
  );
};

export default StudentCoursePage;

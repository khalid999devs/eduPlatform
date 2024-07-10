import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  AiFillPlayCircle,
  AiFillWechat,
} from "react-icons/ai";
import { PiNotebook } from "react-icons/pi";
import { CourseContextConsumer } from "../../Pages/CourseClientDetails";
import { FaBook } from "react-icons/fa";

const StudentCoursePage = () => {
  const [currentTab, setCurTab] = useState(localStorage?.value);
  const navigate = useNavigate();
  const { courseInfo } = CourseContextConsumer();
  function handleTab(e) {
    setCurTab(e);
    navigate(e);
  }
  return (
    <div
      className={`left-side ${currentTab == "chat" ? "h-[75vh] mb-10" : ""}`}
    >
      <nav
        className="bg-primary-main rounded-b-lg p-2 border border-t-transparent border-onPrimary-main shadow-lg shadow-onPrimary-main/20 my-8
      "
      >
        <ul className="capitalize flex gap-5 justify-center clientDash">
          <li>
            <NavLink
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold`}
              to={"details"}
              onClick={() => {
                handleTab("details");
              }}
            >
              <span className="hidden md:inline-block">Details</span>{" "}
              <PiNotebook className="text-lg" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold`}
              to={"record"}
              onClick={() => {
                handleTab("record");
              }}
            >
              <span className="hidden md:inline-block">record</span>{" "}
              <AiFillPlayCircle className="text-lg" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold`}
              to={'exam'}
              onClick={() => {
                handleTab("exam");
              }}
            >
              <span className="hidden md:inline-block">Exam</span>{" "}
              <FaBook className="text-lg" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold `}
              to={'chat'}
              onClick={() => {
                handleTab("chat");
              }}
            >
              <span className="hidden md:inline-block">Discussion</span>{" "}
              <AiFillWechat className="text-lg" />
            </NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <Outlet context={courseInfo} />
      </div>
    </div>
  );
};

export default StudentCoursePage;

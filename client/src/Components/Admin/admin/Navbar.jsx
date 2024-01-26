import { useState } from "react";
import {
  TbMessage2,
  TbLogin2,
  TbMenu,
  TbCross,
  TbPlus,
  TbLogout2,
} from "react-icons/tb";
import { PiImage, PiStudentFill } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi";
import { AdminConsumer } from "../../../Pages/admin/Admin";
import { Link } from "react-router-dom";

const dashList = [
  // {
  //     title: "Chat",
  //     link: "/chat",
  //     icon: <TbMessage2 />,
  // },
  {
    title: "Add Course",
    link: "addcourse",
    icon: <PiStudentFill />,
  },
  {
    title: "Students",
    link: "students",
    icon: <PiStudentFill />,
  },
  {
    title: "Courses",
    link: "course",
    icon: <HiAcademicCap />,
  },
  {
    title: "Gallery",
    link: "gallery",
    icon: <PiImage />,
  },
  {
    title: "FAQ",
    link: "faq",
    icon: <PiImage />,
  },
];

const AdminNavbar = () => {
  return <LeftPanel />;
};

const LeftPanel = () => {
  const { isAdmin, logout } = AdminConsumer();
  const [toggle, setToggle] = useState(false);
  function toggleMenu() {
    setToggle((pre) => !pre);
  }
  return (
    <div
      className={`w-full px-5 py-2 top-0 left-0 mx-auto h-16 min-h-max pointer-events-auto flex items-center my-5 duration-700 ease-out rounded-xl border-0 shadow-lg bg-trans_bluish/70 backdrop-blur z-10 text-sm`}
    >
      <button
        className="justify-center items-center p-1 transition-transform duration-200 text-slate-600 text-lg font-semibold mx-5 bg-white rounded-md"
        style={{
          transform: `${toggle ? "rotate(45deg)" : "rotate(0deg)"}`,
          display: !isAdmin ? "none" : "flex",
        }}
        onClick={toggleMenu}
      >
        {!toggle ? <TbMenu /> : <TbPlus />}
      </button>
      {/* dahsboard titlebar */}
      <div className="h-auto flex items-center w-fit ">
        <a
          className="block m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
          href="/abs-admin"
        >
          <span className="mx-1 font-bold transition-all duration-200 ease-nav-brand">
            Admin page
          </span>
        </a>

        <a
          className="px-8 text-sm mx-auto whitespace-nowrap dark:text-white text-slate-700"
          href="/"
        >
          <span className="ml-1 font-bold transition-all duration-200 ease-nav-brand">
            Client page
          </span>
        </a>
      </div>

      <ul
        className={`flex flex-col absolute left-10 top-20 w-fit bg-slate-500 rounded-lg ransition-all h-auto ${
          toggle
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-1/2 pointer-events-none"
        }`}
        onClick={toggleMenu}
      >
        {dashList.map((val, id) => {
          return (
            <PanelItem
              key={id}
              title={val.title}
              link={val.link}
              icon={val.icon}
              isAdmin={isAdmin}
              logout={logout}
            />
          );
        })}
      </ul>
      {/* login button */}
      <Link
        to={"login"}
        className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 ml-auto flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer shadow-md shadow-root_bluish/50 bg-green-500 hover:bg-green-400 text-black ${
          isAdmin && "hidden"
        }`}
      >
        <span>
          <TbLogin2 />
        </span>

        <span
          className={`ml-2 duration-700 opacity-100 pointer-events-none ease w-full text-left`}
        >
          Login
        </span>
      </Link>

      <button
        className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 ml-auto flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 bg-red-500 hover:bg-rose-600 ${
          !isAdmin && "hidden"
        } `}
        onClick={logout}
      >
        <span>
          <TbLogout2 />
        </span>

        <span
          className={`ml-2 duration-700 opacity-100 pointer-events-none ease w-full text-left`}
        >
          Logout
        </span>
      </button>
    </div>
  );
};
const PanelItem = ({ title, link, icon, isAdmin }) => {
  return (
    <li className="h-fit">
      <Link
        to={link}
        className={`py-2.5 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 bg-slate-700 hover:bg-slate-500 `}
      >
        <span>{icon}</span>

        <span
          className={`ml-2 duration-700 opacity-100 pointer-events-none ease w-full text-left`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};
export default AdminNavbar;

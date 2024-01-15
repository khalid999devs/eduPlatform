import { TbLayoutDashboard, TbMessage2, TbLogin2 } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi";
import { MdClose, MdPeople } from "react-icons/md";
import { AdminConsumer } from "../../../Pages/admin/Admin";
import { Link } from "react-router-dom";

const dashList = [
  // {
  //     title: "Chat",
  //     link: "/chat",
  //     icon: <TbMessage2 />,
  // },
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
    title: "Login",
    link: "login",
    icon: <TbLogin2 />,
  },
];

const AdminNavbar = () => {
  return <LeftPanel />;
};

const LeftPanel = () => {
  const { isAdmin, logout } = AdminConsumer();

  return (
    <aside
      className={`w-auto sticky top-0 left-0 mx-auto min-h-max translate-x-0 overflow-hidden pointer-events-auto flex items-center justify-evenly p-0 my-5 duration-700 ease-out rounded-xl border-0 shadow-lg bg-trans_bluish/70 backdrop-blur z-50 `}
    >
      {/* dahsboard titlebar */}
      <div className="h-auto flex items-center w-fit mx-2">
        <a
          className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
          href="/abs-admin"
        >
          <span className="ml-1 text-xl font-bold transition-all duration-200 ease-nav-brand">
            Admin page
          </span>
        </a>

        <a
          className="px-8 text-sm mx-auto whitespace-nowrap dark:text-white text-slate-700"
          href="/"
        >
          <span className="ml-1 text-xl font-bold transition-all duration-200 ease-nav-brand">
            Client page
          </span>
        </a>
      </div>

      <div className="items-center flex w-auto">
        {isAdmin && (
          <Link
            to={"addcourse"}
            className={`py-2.5 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white shadow-root_bluish/50 bg-yellow-500 hover:bg-yellow-400 hover:shadow-yellow-700/50 shadow-xl `}
          >
            Add course
          </Link>
        )}
        <ul className="flex">
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
      </div>
    </aside>
  );
};
const PanelItem = ({ title, link, icon, isAdmin, logout }) => {
  if (isAdmin && link == "login")
    return (
      <li className="my-0.5 h-fit">
        <p
          className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 bg-red-500 hover:bg-rose-600 `}
          onClick={logout}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-blue-300 text-root_bluish dark:shadow-none shadow-md shadow-root_bluish/50
                dark:bg-root_bluish/80 dark:text-white
             bg-center stroke-0 text-center`}
          >
            {icon}
          </span>

          <span
            className={`ml-2 duration-700 opacity-100 pointer-events-none ease w-full text-left`}
          >
            Logout
          </span>
        </p>
      </li>
    );
  else if (!isAdmin && link == "login")
    return (
      <li className="my-0.5 h-fit">
        <Link
          to={link}
          className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer shadow-md shadow-root_bluish/50 bg-green-500 hover:bg-green-400 text-black`}
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md shadow-root_bluish/50 bg-root_bluish/80 text-white bg-center stroke-0 text-center`}
          >
            {icon}
          </span>

          <span
            className={`ml-2 duration-700 opacity-100 pointer-events-none ease w-full text-left`}
          >
            {title}
          </span>
        </Link>
      </li>
    );
  else if (isAdmin)
    return (
      <li className="my-0.5 h-fit">
        <Link
          to={link}
          className={`py-2.5 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 bg-slate-700 hover:bg-slate-500 `}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-blue-300 text-root_bluish dark:shadow-none shadow-md shadow-root_bluish/50
            dark:bg-root_bluish/80 dark:text-white
         bg-center stroke-0 text-center`}
          >
            {icon}
          </span>

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

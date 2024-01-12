import { TbLayoutDashboard, TbMessage2, TbLogin2 } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi";
import { MdClose, MdPeople } from "react-icons/md";
import { AdminConsumer } from "../../../Pages/admin/Admin";
import { Link } from "react-router-dom";

const dashList = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <TbLayoutDashboard />,
  },
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
  return (
    <>
      <LeftPanel />
    </>
  );
};

const LeftPanel = () => {
  const { isAdmin, logout } = AdminConsumer();

  return (
    <aside
      className={`w-full sticky h-[95%] opacity-100 translate-x-0 overflow-hidden xl:opacity-100 xl:translate-x-0 pointer-events-auto top-2 flex-wrap items-center justify-between p-0 my-4 overflow-y-auto duration-700 ease-out rounded-xl bg-white border-0 shadow-lg dark:bg-trans_bluish/50 backdrop-blur-md max-w-xs z-50 left-2 xl:min-w-min`}
    >
      {/* dahsboard titlebar */}
      <div className="h-auto w-fit mx-auto">
        <a
          className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
          href="/admin"
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

      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        {isAdmin && (
          <Link to={"addcourse"}>
            <button className="bg-yellow-400 text-black w-11/12 px-3 py-2 my-3 ml-3 rounded-sm shadow-yellow-500/10 hover:shadow-yellow-500  shadow-lg duration-200">
              Add course
            </button>
          </Link>
        )}
        <ul className="flex flex-col pl-0 mb-0 pb-6">
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
          className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 dark:bg-root_bluish/80 hover:bg-slate-950 `}
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
          className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 dark:bg-root_bluish/80 hover:bg-slate-950 `}
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
  else if (isAdmin)
    return (
      <li className="my-0.5 h-fit">
        <Link
          to={link}
          className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white  shadow-md shadow-root_bluish/50 dark:bg-root_bluish/80 hover:bg-slate-950 `}
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

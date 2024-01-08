import { TbLayoutDashboard, TbMessage2, TbX, TbMenu2 } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { HiAcademicCap } from "react-icons/hi";
import { MdClose, MdPeople } from "react-icons/md";
import { user } from "../context/authContext";
import { Link } from "react-router-dom";
import { useState } from "react";


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
        link: "courses",
        icon: <HiAcademicCap />,
    },
];

const AdminNavbar = () => {
    const [showMenu, setMenu] = useState(false);

    return (<>
        <LeftPanel showMenu={showMenu} setMenu={setMenu} />

        <nav className="sticky w-full hidden top-0 right-0 z-50  flex-wrap items-center justify-between px-3 py-2 mx-6 transition-all ease-in duration-250 rounded-2xl lg:flex-nowrap lg:justify-start dark:bg-trans_bluish/40 shadow-xl shadow-root_bluish/10   text-root_bluish dark:text-white">
            <div className="flex items-center justify-between w-full px-4 py-1 mx-auto">
                <div className="flex items-center justify-between grow">
                    <div
                        className="menu cursor-pointer hover:scale-110 duration-200 ease-in-out xl:hidden"
                        onClick={() => setMenu((pre) => !pre)}
                    >
                        {!showMenu ? (
                            <TbMenu2
                                className="text-root_bluish dark:text-white"
                                size={20}
                            />
                        ) : (
                            <TbX className="text-root_bluish dark:text-white" size={20} />
                        )}
                    </div>
                    <h2 className="m-4 font-bold text-lg xl:text-2xl dark:text-white capitalize">
                        {'rootTitle'}
                    </h2>
                    {/* sign in route setup is required */}
                    <div className="flex items-center bg-blue-500 px-2 rounded-full hover:bg-blue-600 duration-100 ease-in w-10 h-10 md:w-fit justify-center ">
                        <a
                            href="#"
                            className="px-0 py-2 text-sm font-semibold dark:text-white transition-colors duration-150 flex items-center gap-2  "
                        >
                            <span className="text-root_bluish duration-150 ease-out rounded-full w-auto min-w-fit h-auto flex justify-center items-center py-1 ">
                                <MdPeople />
                            </span>

                            <span className="hidden md:inline">{user?.name}</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </>)
}

const LeftPanel = ({ showMenu, setMenu }) => {
    return (
        <aside
            className={`fixed z-[100] w-full xl:sticky h-[95%] ${showMenu
                ? "opacity-100 translate-x-0 "
                : "opacity-0 -translate-x-1/2 w-0 overflow-hidden xl:opacity-100 xl:translate-x-0 pointer-events-none xl:pointer-events-auto"
                } top-2 flex-wrap items-center justify-between p-0 my-4 overflow-y-auto duration-700 ease-out rounded-xl bg-white border-0 shadow-lg dark:bg-trans_bluish/50 backdrop-blur-md max-w-xs z-50 left-2 xl:min-w-min`}
        >
            {/* dahsboard titlebar */}
            <div className="h-auto w-fit mx-auto">
                <a
                    className="block px-8 py-6 m-0 text-sm whitespace-nowrap dark:text-white text-slate-700"
                    href="/admin"
                >
                    <span className="ml-1 text-xl font-bold transition-all duration-200 ease-nav-brand">
                        Chemgenie
                    </span>
                </a>

                <a
                    className="px-8 text-sm mx-auto whitespace-nowrap dark:text-white text-slate-700"
                    href="/"
                >
                    <span className="ml-1 text-xl font-bold transition-all duration-200 ease-nav-brand">
                        main page
                    </span>
                </a>
            </div>

            <div
                className="w-2/3 h-px p-px mx-auto mb-2 bg-gradient-to-r from-transparent 
        via-slate-300 dark:via-slate-300/50 to-transparent rounded-tl-full rounded-tr-full"
            > <span
                className="absolute right-2 top-2  xl:hidden dark:text-white z-[500] cursor-pointer "
                onClick={() => {
                    setMenu(!showMenu);
                }}
            >
                    <MdClose size={20} />
                </span> </div>

            <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
                <Link to={"addcourse"}>
                    <button
                        className="bg-yellow-400 text-black w-11/12 px-3 py-2 my-3 ml-3 rounded-sm shadow-yellow-500/10 hover:shadow-yellow-500  shadow-lg duration-200"
                    >
                        Add course
                    </button>
                </Link>
                <ul className="flex flex-col pl-0 mb-0 pb-6">
                    {dashList.map((val, id) => {
                        return (
                            <PanelItem
                                key={id}
                                title={val.title}
                                link={val.link}
                                icon={val.icon}
                            />
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
};
const PanelItem = ({ title, link, icon, state }) => {
    return (
        <li className="my-0.5 h-fit">
            <Link
                to={link}
                className={`py-2.5 dark:opacity-80 text-sm ease-nav-brand my-2 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold transition-colors hover:cursor-pointer dark:text-white ${state == title
                    ? "shadow-md shadow-root_bluish/50"
                    : "dark:bg-root_bluish/80 hover:bg-slate-200 dark:hover:bg-blue-800 "
                    } `}
            >
                <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${state == title
                        ? "bg-blue-300 text-root_bluish dark:shadow-none shadow-md shadow-root_bluish/50"
                        : "dark:bg-root_bluish/80 dark:text-white"
                        } bg-center stroke-0 text-center  `}
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